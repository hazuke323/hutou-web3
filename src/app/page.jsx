import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'

export default function LinkPage() {
  return (
    <div className='text-2xl'>
      <Panel>
        质押HUTOU以赢得<br/>
        HUTOU奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <Button className='text-3xl'>连接钱包</Button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-xl my-8'>当前矿池总量：{42000} USDT</div>
        <div className='text-sm my-1'>矿池将按当日矿池事实总量的1/36进行释放</div>
      </div>
    </div>
  )
}



