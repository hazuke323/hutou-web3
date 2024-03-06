'use client'
import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'
import { useEffect, useState, useContext } from 'react'
import { BrowserProvider, Contract, ethers, formatEther, formatUnits, parseEther } from 'ethers'
import { useMetaMask } from 'metamask-react'
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi'
import abi from '../abi.json'
import Web3 from 'web3'
import StakeDialog from '@/component/stake-dialog'

import usdtabi from '@/config/usdtabi.json'
import { Contract_Addr, Contract_USDT_Addr } from '@/config/contract'
import { dialogContext } from '@/component/dialog'

// const web3 = new Web3(
//   new Web3.providers.HttpProvider('https://go.getblock.io/541835f2ac774d30bdb437bc4d21cab5')
// )

// const contractAddress = '0x20d62923Ac342ac21d483323661bF1247151e3C5'
// const address = '0x20d62923Ac342ac21d483323661bF1247151e3C5'


// const contract = new web3.eth.Contract(abi, contractAddress)


// async function stakeUSDT(amount) {

//   const decimals = 16; // USDT使用的小数位
//   const amountInUSDTUnits = (BigInt(amount) * BigInt(10 ** decimals)).toString();

//   // 创建交易对象
//   const tx = {
//       from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
//       to: contractAddress,
//       value: 0,
//       data: contract.methods.stakeUSDT(amountInUSDTUnits).encodeABI(),
//   };

//   // 签名交易
//   const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

//   // 发送交易
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//   // 打印交易哈希
//   console.log('交易哈希：', receipt.transactionHash);

//   // 检查交易是否成功
//   if (receipt.status) {
//       console.log('USDT质押成功');
//   } else {
//       console.log('USDT质押失败');
//   }
// }

// async function withdrawUSDT() {
//   // 创建交易对象
//   const tx = {
//       from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
//       to: contractAddress,
//       value: 0,
//       data: contract.methods.withdrawUSDT().encodeABI(),
//   };

//   // 签名交易
//   const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

//   // 发送交易
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//   // 打印交易哈希
//   console.log('交易哈希：', receipt.transactionHash);

//   // 检查交易是否成功
//   if (receipt.status) {
//       console.log('USDT质押成功');
//   } else {
//       console.log('USDT质押失败');
//   }
// }


// async function withdrawInterest(amount) {
//   // 创建交易对象
//   const tx = {
//       from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
//       to: contractAddress,
//       value: 0,
//       data: contract.methods.withdrawInterest().encodeABI(),
//   };

//   // 签名交易
//   const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

//   // 发送交易
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//   // 打印交易哈希
//   console.log('交易哈希：', receipt.transactionHash);

//   // 检查交易是否成功
//   if (receipt.status) {
//       console.log('USDT质押成功');
//   } else {
//       console.log('USDT质押失败');
//   }
// }


// async function emergencyWithdrawUSDT(amount) {
//   // 创建交易对象
//   const tx = {
//       from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
//       to: contractAddress,
//       value: 0,
//       data: contract.methods.emergencyWithdrawUSDT(amount).encodeABI(),
//   };

//   // 签名交易
//   const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

//   // 发送交易
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//   // 打印交易哈希
//   console.log('交易哈希：', receipt.transactionHash);

//   // 检查交易是否成功
//   if (receipt.status) {
//       console.log('USDT质押成功');
//   } else {
//       console.log('USDT质押失败');
//   }
// }


export default function USDTPage() {
  // const { address: account, isConnected } = useAccount()
  const [ showStakeDialog, setShowStakeDialog ] = useState(false)
  const [ maxDeposit, setMaxDeposit ] = useState(50000)
  const [ deposited, setDeposited ] = useState(0)
  const [ userTokenBal, setUserTokenBal ] = useState(0)
  const [ userApproved, setUserApproved ] = useState(0)
  const [ userDeposited, setUserDeposited ] = useState(0)
  const [ userInterest, setUserInterest ] = useState(0)
  const { showDialog } = useContext(dialogContext)

  // const { data: total } = useReadContract({
  //   address,
  //   abi,
  //   functionName: 'getRemainingStakingPoolCapacity',
  // })

  // const { data: hash, writeContract, writeContractAsync } = useWriteContract()

  

  // const balance = useBalance({ address: account })
  // const balance2 = useReadContract({
  //   address: '0x55d398326f99059fF775485246999027B3197955',
  //   abi,
  //   functionName: 'balanceof',
  //   arguments: [account]
  // })
  // const balance3 = useReadContract({
  //   address: '0x55d398326f99059fF775485246999027B3197955',
  //   abi,
  //   functionName: 'balanceOf',
  //   arguments: [account]
  // })

  // const data = useReadContract({
  //   address,
  //   abi,
  //   functionName: 'getInterest',
  //   arguments: [account]
  // })


  // const address2 = "0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077";
  // contract.methods.usdtBalanceOf(address2).call().then(balance => {
  //   console.log('usdt余额：', balance)
  // })



  // console.log(data.data, balance.data, balance2.data, balance3.data, '>>><<<')

  const { ethereum, account } = useMetaMask()

  useEffect(() => {
    getTokenMaxDeposit()
    
    getTokenBalance()
    getTokenAllowanceWei()

    getTokenDeposited()

    getUserDeposit()
    getUserInterest()
  }, [account])

  function getContract() {
    if (account && ethereum) {
      const provider = new BrowserProvider(ethereum)

      return new Promise((resolve, reject) => {
        provider.getSigner()
          .then(signer => {
            const contract = new Contract(Contract_Addr, abi, signer)
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
            const contract = new Contract(Contract_USDT_Addr, usdtabi, signer)
            resolve(contract)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
    return Promise.reject('no account')
  }

  function getTokenMaxDeposit() {
    getContract()
      .then(contract => {
        return contract.max_staking_pool()
      })
      .then(max => {
        console.log('token max deposit', max, formatUnits(max))
        setMaxDeposit(formatUnits(max))
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
        return contract.getRemainingStakingPoolCapacity()
      })
      .then(deposited => {
        console.log('token deposited deposit', deposited, formatUnits(deposited))
        setDeposited(formatUnits(deposited))
      }, err => {
        console.log('err', err)
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  function getTokenBalance() {
    getContract()
      .then(contract => {
        contract.usdtBalanceOf(account)
          .then(res => {
            console.log('res contract get', res, formatUnits(res))
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
        contract.allowance(account, Contract_Addr)
          .then(res => {
            console.log('allowance wei', res, formatUnits(res))
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
        contract.approve(Contract_Addr, '115792089237316195423570985008687907853269984665640564039457584007913129639935')
          .then(res => {
            console.log('授权成功', res)
            
            // 更新授权数量
            getTokenAllowanceWei()

            showDialog({content: '授权成功'})
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
        contract.stakeUSDT(parseEther(String(amount)))
          .then(res => {
            console.log('res', res)

            // 更新抵押数量
            getUserDeposit()
            // 更新页面数据
            getTokenDeposited()
            getTokenBalance()

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

  function withdraw() {
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
      symbol: 'USDT'
      , bal: userTokenBal
      , deposited: userDeposited
    }
  }

  return (
    <div className='relative'>
      <Panel className='text-[1.75rem]'>
        质押USDT以赢得<br/>
        USDT奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <div className='text-bg mb-4 text-lg'>APR: {14.6}%</div>
        <div className='flex gap-4'>
          <Button className='text-2xl'
            onClick={ () => { userApproved > 0 ? setShowStakeDialog(true) : tokenApprove() } }
          >{userApproved > 0 ? '质押USDT' : '授权' }</Button>
          <Button className='text-2xl'
            onClick={ () => { setShowStakeDialog(true) } }
          >解锁USDT</Button>
        </div>
      </div>
      <Panel className='text-[1.375rem]'>
        <div className='text-left mx-auto max-w-max'>
          您的质押：{ userDeposited }USDT<br/>
          当前收益：{ userInterest }USDT
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <Button className='text-[1.625rem] !px-8'
          onClick={ async () => {
            // 对话框调用case，返回一个Promise对象，关闭对话框时 resolve
            // await showDialog({ content: <div>内容1</div> })
            // await showDialog({ content: '内容2 失败' })
            // await showDialog({ content: '内容3 123123' })
            withdrawInterest()
          } }
        >领取收益</Button>
        {/* <div className='text-[1.375rem] mt-4'>{String(500000n - (total || 0n) / BigInt(1e18))}/500000 USDT</div> */}
        <div className='text-[1.375rem] mt-4'>{String(maxDeposit - deposited)}/{ maxDeposit } USDT</div>
        <div className='text-[1.375rem] mb-4'>当前质押量/质押量上限</div>
        <div className='text-lg my-1'>质押后须7天才能取回，请注意控制风险</div>
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



