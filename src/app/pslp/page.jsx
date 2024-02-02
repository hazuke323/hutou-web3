import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'

export default function PSLPPage() {
  return (
    <div className='text-2xl'>
      <Panel>
        质押PancakeSwao LP<br/>
        赢取奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <Button className='text-2xl !px-16'>质押</Button>
      </div>
      <Panel className='text-lg'>
        <div className='text-left mx-auto max-w-max'>
          您的LP质押量：{102010}<br/>
          当前矿池总量：{42000} USDT
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-sm my-1'>矿池将按当日矿池事实总量的1/36进行释放</div>
      </div>
    </div>
  )
}



