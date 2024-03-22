'use client'
import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'
import { useEffect, useState, useContext } from 'react'
import { dialogContext } from '@/component/dialog'
import StakeDialog from '@/component/stake-dialog'
import { BrowserProvider, Contract, formatUnits, parseEther } from 'ethers'
import { useMetaMask } from 'metamask-react'
import hutoudepositabi from '../config/hutoudepositabi.json'
import hutouabi from '../config/hutouabi.json'
import { Contract_Hutou_Addr, Contract_Hutou_Deposit_Addr } from '../config/contract'

const formatEndTime = ts => {
  if (ts <= 0) {
    return ''
  }
  const dayTime = 86400
  const dayNum = Math.floor(ts / dayTime)
  const hourNum = Math.floor((ts % dayTime) / 3600)
  const minuteNum = Math.floor(((ts % dayTime) % 3600) / 60)
  const secondsNum = ((ts % dayTime) % 3600) % 60

  return (dayNum > 0 ? (dayNum + '天') : '')
    + (hourNum > 0 ? (hourNum + '时') : '')
    + (minuteNum > 0 ? (minuteNum + '分') : '')
    + (secondsNum > 0 ? (secondsNum + '秒') : '')
}

export default function HuTouPage() {
  const [ showStakeDialog, setShowStakeDialog ] = useState(false)
  const [ deposited, setDeposited ] = useState(0)
  const [ duration, setDuration ] = useState(7*86400)
  const [ poolTokenBal, setPoolTokenBal ] = useState(0)
  const [ poolStarttime, setPoolStarttime ] = useState(0)
  const [ remainTxt, setRemainTxt ] = useState('')
  const [ userApproved, setUserApproved ] = useState(0)
  const [ userTokenBal, setUserTokenBal ] = useState(0)
  const [ userDeposited, setUserDeposited ] = useState(0)
  const [ userDepositTime, setUserDepositTime ] = useState(Math.floor(Date.now() / 1000))
  const [ userInterest, setUserInterest ] = useState(0)

  const { showDialog } = useContext(dialogContext)

  const { ethereum, account } = useMetaMask()

  useEffect(() => {
    getPoolBal()
    getPoolStart()
    getDuration()
    getTokenDeposited()
    getDepositStartTimestamp()

    getTokenBalance()
    getTokenAllowanceWei()
    getUserDeposit()
    getUserInterest()

  }, [account])

  useEffect(() => {
    updateRemainTime()
  }, [poolStarttime])

  function getContract() {
    if (account && ethereum) {
      const provider = new BrowserProvider(ethereum)

      return new Promise((resolve, reject) => {
        provider.getSigner()
          .then(signer => {
            const contract = new Contract(Contract_Hutou_Deposit_Addr, hutoudepositabi, signer)
            resolve(contract)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
    return Promise.reject('no account')
  }

  function getTokenContract() {
    if (account && ethereum) {
      const provider = new BrowserProvider(ethereum)

      return new Promise((resolve, reject) => {
        provider.getSigner()
          .then(signer => {
            const contract = new Contract(Contract_Hutou_Addr, hutouabi, signer)
            resolve(contract)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
    return Promise.reject('no account')
  }

  function updateRemainTime() {
    const txt = formatEndTime(poolStarttime + (365 * 10 * 86400) - Math.floor(Date.now() / 1000))
    if (txt) {
      setRemainTxt(txt)
    }
    setTimeout(() => {
      updateRemainTime()
    }, 500);
  }

  function getPoolStart() {
    getContract()
      .then(contract => {
        return contract.deploy_time()
      })
      .then(stime => {
        const st = Number(stime)
        if (st) {
          setPoolStarttime(st)
        }
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getTokenDeposited() {
    getContract()
      .then(contract => {
        return contract.staking_totalSupply()
      })
      .then(deposited => {
        // console.log('token deposited deposit', deposited, formatUnits(deposited))
        setDeposited(formatUnits(deposited))
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getPoolBal() {
    getTokenContract()
      .then(contract => {
        return contract.balanceOf(Contract_Hutou_Deposit_Addr)
      })
      .then(bal => {
        // console.log('pool bal', bal, formatUnits(bal))

        setPoolTokenBal(formatUnits(bal))
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getTokenBalance() {
    getTokenContract()
      .then(contract => {
        contract.balanceOf(account)
          .then(res => {
            // console.log('res contract get', res, formatUnits(res))

            setUserTokenBal(formatUnits(res))
          })
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getTokenAllowanceWei() {
    getTokenContract()
      .then(contract => {
        contract.allowance(account, Contract_Hutou_Deposit_Addr)
          .then(res => {
            // console.log('allowance wei', res, formatUnits(res))
            setUserApproved(formatUnits(res))
          })
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function tokenApprove() {
    getTokenContract()
      .then(contract => {
        contract.approve(Contract_Hutou_Deposit_Addr, '115792089237316195423570985008687907853269984665640564039457584007913129639935')
          .then(res => {
            // console.log('授权成功', res)
            
            // 更新授权数量
            getTokenAllowanceWei()
          })
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function tokenDeposit(amount) {
    getContract()
      .then(contract => {
        contract.stakeHutou(parseEther(String(amount)))
          .then(res => {
            // console.log('res', res)

            // 更新抵押数量
            getUserDeposit()
            // 更新页面数据
            getTokenDeposited()
            getTokenBalance()
            getDepositStartTimestamp()

            showDialog({content: '抵押成功'})
          })
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getUserDeposit() {
    getContract()
      .then(contract => {
        contract.staked_amounts(account)
          .then(res => {
            console.log('staked_amounts', res, formatUnits(res))
            setUserDeposited(formatUnits(res))
          })
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getUserInterest() {
    getContract()
      .then(contract => {
        contract.getInterest(account)
          .then(insterest => {
            console.log('getInterest', insterest, formatUnits(insterest))
            setUserInterest(formatUnits(insterest))
          }, err => {
            console.log('err', err)
          })
          .catch(e => {
            console.log('e', e)
          })
      })
  }

  function withdrawInterest() {
    getContract()
    .then(contract => {
      contract.withdrawInterest()
        .then(res => {
          console.log('withdraw interest', res)

          // 更新收益数据
          setUserInterest(0)

          showDialog({content: '提取收益成功'})
        }, err => {
          console.log('err', err)
        })
        .catch(e => {
          console.log('e', e)
        })
    })
  }

  function getDuration() {
    getContract()
      .then(contract => {
        contract.staking_duration()
          .then(res => {
            console.log('staking duration', res)
            setDuration(Number(res))
          }, err => {
            console.log('err', err)
          })
          .catch(e => {
            console.log('e', e)
          })
      })
  }

  function getDepositStartTimestamp() {
    getContract()
      .then(contract => {
        contract.staking_start_times(account)
          .then(res => {
            setUserDepositTime(Number(res))
          }, err => {
            console.log('err', err)
          })
          .catch(e => {
            console.log('e', e)
          })
      })
  }

  function withdraw() {
    if (Math.floor(Math.floor(Date.now() / 1000)) - userDepositTime < duration) {
      showDialog({content: '抵押时间不足'})
      return
    }
    getContract()
      .then(contract => {
        contract.withdrawUSDT()
          .then(res => {
            console.log('withdraw', res)

            // 更新页面数据
            setUserDeposited(0)
            setUserInterest(0)
            getTokenDeposited()
            getTokenBalance()

            showDialog({content: '提取成功'})
          })
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getStakeInfo() {
    return {
      symbol: 'HUTOU'
      , bal: userTokenBal
      , deposited: userDeposited
    }
  }

  function ttt() {
    getTokenDeposited()
    getPoolBal()

    getTokenBalance()
    getTokenAllowanceWei()
  }

  return (
    <div className='text-2xl'>
      <Panel className='text-[1.75rem]'>
        质押HUTOU以赢得<br/>
        HUTOU奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <div className='flex gap-4'>
          <Button className='text-2xl'
            onClick={ () => { userApproved > 0 ? setShowStakeDialog(true) : tokenApprove() } }
          >{userApproved > 0 ? '质押HUTOU' : '授权' }</Button>
          <Button className='text-2xl'
            onClick={ () => setShowStakeDialog(true) }
          >解锁HUTOU</Button>
          {/* <Button className='text-2xl'
            onClick={() => getPoolStart()}
          >ttt</Button> */}
        </div>
        <div className='text-xs my-1'>质押后须10天才能取出，请注意控制风险</div>
      </div>
      <Panel className='text-xl leading-8'>
        <div className='text-left mx-auto max-w-max'>
          当前质押总量：{deposited}HUTOU<br/>
          您的当前质押量：{userDeposited}HUTOU<br/>
          质押收益：{userInterest}HUTOU
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <Button className='text-[1.625rem] !px-8'
          onClick={() => withdrawInterest() }
        >领取</Button>
        <div className='text-xl my-4'>矿池剩余总量：{poolTokenBal}</div>
        <div className='text-2xl my-4'>挖矿倒计时</div>
        <div className='text-2xl my-1'>剩余 | { remainTxt }</div>
        {/* <div className='text-2xl my-1'>剩余 | 420 day 4 Hrs 20 Min</div> */}
      </div>
      { showStakeDialog && <StakeDialog
          info={ getStakeInfo() }
          onClose={ () => setShowStakeDialog(false) }
          onStake={ (amount) => tokenDeposit(amount) }
          onWithdraw={ () => withdraw() }
        />}
    </div>
  )
}
