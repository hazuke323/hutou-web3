import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'

export default function USDTPage() {
  return (
    <div className='text-2xl'>
      <Panel>
        质押USDT以赢得<br/>
        USDT奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <div className='text-bg my-4'>APR: {14.6}%</div>
        <div className='flex gap-4'>
          <Button className='text-xl'>质押USDT</Button>
          <Button className='text-xl'>解锁USDT</Button>
        </div>
      </div>
      <Panel className='text-lg'>
        <div className='text-left mx-auto max-w-max'>
          您的质押：{199}USDT<br/>
          当前收益：{2.5}USDT
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <Button className='text-xl !px-8'>领取收益</Button>
        <div className='text-xl mt-4'>42000/150000 USDT</div>
        <div className='text-xl mb-4'>当前质押量/质押量上限</div>
        <div className='text-sm my-1'>质押后须7天才能取回，请注意控制风险</div>
      </div>
    </div>
  )
}



