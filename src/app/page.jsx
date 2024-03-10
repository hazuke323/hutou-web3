import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'

export default function HuTouPage() {
  return (
    <div className='text-2xl'>
      <Panel className='text-[1.75rem]'>
        <div className='w-full whitespace-pre-wrap flex justify-start flex-col gap-10'>
          <div className='indent-8 text-left px-4 text-2xl'>
            Hutou Community 是由无数热爱区块链技术的兴趣爱好者自发组建，社区致力于区块链金融的应用与实践探索。欢迎更多区块链兴趣爱好者的加入！
          </div>
          <div className='flex flex-col px-4'>
            <div className='flex justify-start items-start text-lg'>
              <div className='text-nowrap text-left font-black text-lg w-36 flex-none'>代币名称：</div>
              <div className='text-left'>Hutou Community</div>
            </div>
            <div className='flex justify-start items-start text-lg'>
              <div className='text-nowrap text-left font-black text-lg w-36 flex-none'>简称：</div>
              <div className='text-left'>Hutou</div>
            </div>
            <div className='flex justify-start items-start text-lg'>
              <div className='text-nowrap text-left font-black text-lg w-36 flex-none'>发行总量：</div>
              <div className='text-left'>10亿，1亿建初始底池，9亿通过Hutou单币定期10天矿池释放（每天释放24万，3750天释放完毕）
              </div>
            </div>
            <div className='flex justify-start items-start text-lg'>
              <div className='text-nowrap text-left font-black text-lg w-36 flex-none'>精度：</div>
              <div className='text-left'>16</div>
            </div>
            <div className='flex justify-start items-start text-lg'>
              <div className='text-nowrap text-left font-black text-lg w-36 flex-none'>税收和燃烧机制：</div>
              <div className='text-left'>买卖税5%
                <div>0.5%税 黑洞销</div>
                <div>1.0%税 进入营销钱</div>
                <div>1.5%税 回流底</div>
                <div>2%税 用于hutou/usdt的LP分</div>
              </div>
            </div>
          </div>

      </div>
      </Panel>
      {/* <div className='flex flex-col items-center justify-center my-4'>
        <div className='flex gap-4'>
          <Button className='text-2xl'>stake</Button>
          <Button className='text-2xl'>withdraw</Button>
        </div>
        <div className='text-xs my-1'>质押后须10天才能取出，请注意控制风险</div>
      </div>
      <Panel className='text-xl leading-8'>
        <div className='text-left mx-auto max-w-max'>
          当前质押总量：{420}HUTOU<br/>
          您的当前质押量：{420}HUTOU<br/>
          质押收益：{38}HUTOU
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <Button className='text-[1.625rem] !px-8'>领取</Button>
        <div className='text-xl my-4'>矿池剩余总量：8亿</div>
        <div className='text-2xl my-4'>挖矿倒计时</div>
        <div className='text-2xl my-1'>剩余 | 420 day 4 Hrs 20 Min</div>
      </div> */}
    </div>
  )
}
