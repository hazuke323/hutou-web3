'use client'
import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'
import { BrowserProvider, Contract } from 'ethers'
import { useMetaMask } from 'metamask-react'
import { useState, useEffect } from 'react'
import abi from '../abi.json'

export default function USDTPage() {
  const { ethereum, account } = useMetaMask()
  const [ remain, setRemain ] = useState(0)

  useEffect(() => {
    if(account && ethereum) {
      const provider = new BrowserProvider(ethereum)
      provider.getSigner().then(async signer => {
        const contract = new Contract(
          '0x20d62923Ac342ac21d483323661bF1247151e3C5',
          abi, signer
        )
        const result = await contract.getRemainingStakingPoolCapacity()
        console.log(result)
        setRemain(result)
      })
    }
  }, [ account, ethereum, abi ])

  return (
    <div>
      <Panel className='text-[1.75rem]'>
        质押USDT以赢得<br/>
        USDT奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <div className='text-bg mb-4 text-lg'>APR: {14.6}%</div>
        <div className='flex gap-4'>
          <Button className='text-2xl'
            onClick={ async () => {
              // const provider = new BrowserProvider(ethereum)
              // const signer = await provider.getSigner()

              // // getSigner
              // const contract = new Contract(
              //   '0x20d62923Ac342ac21d483323661bF1247151e3C5',
              //   abi, signer
              // )
              // console.log(contract)
              // // const result = await contract.stakeUSDT(10n)
              // // console.log(result)
            } }
          >质押USDT</Button>
          <Button className='text-2xl'>解锁USDT</Button>
        </div>
      </div>
      <Panel className='text-[1.375rem]'>
        <div className='text-left mx-auto max-w-max'>
          您的质押：{199}USDT<br/>
          当前收益：{2.5}USDT
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <Button className='text-[1.625rem] !px-8'>领取收益</Button>
        <div className='text-[1.375rem] mt-4'>42000/500000 USDT</div>
        <div className='text-[1.375rem] mb-4'>当前质押量/质押量上限</div>
        <div className='text-lg my-1'>质押后须7天才能取回，请注意控制风险</div>
      </div>
      <div className=''></div>
    </div>
  )
}



