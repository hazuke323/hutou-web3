import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'

export default function ConnectPage() {
  return (
    <div className='text-2xl'>
      <Panel>
        质押HUTOU以赢得<br/>
        HUTOU奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <Button className='text-3xl'>STAK HUTOU</Button>
        <div className='text-xs my-1'>质押后须10天才能取出，请注意控制风险</div>
      </div>
      <Panel className='text-lg'>
        <div className='text-left mx-auto max-w-max'>
          当前质押总量：{420}HUTOU<br/>
          您的当前质押量：{420}HUTOU<br/>
          质押收益：{38}HUTOU
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <Button className='text-xl !px-8'>领取</Button>
        <div className='text-xl my-4'>矿池剩余总量：8亿</div>
        <div className='text-2xl my-4'>挖矿倒计时</div>
        <div className='text-2xl my-1'>剩余 | 420 day 4 Hrs 20 Min</div>
      </div>
    </div>
  )
}



