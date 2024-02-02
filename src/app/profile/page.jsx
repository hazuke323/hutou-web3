import { Details } from '@/lib/details'

export default function LinkPage() {
  return (
    <div className='text-2xl'>
      <Details>
        <div className='flex flex-col'>
          <div className='flex justify-between text-lg mb-2'>
            <div>你的流动性代币总额</div>
            <div>{0.5999}</div>
          </div>
          <div className='flex justify-between text-lg mb-2'>
            <div>您的流动性份额</div>
            <div>{'<0.01%'}</div>
          </div>
          <div className='flex justify-between text-lg mb-2'>
            <div>EOS</div>
            <div>{0.0000068838}</div>
          </div>
          <div className='flex justify-between text-lg mb-2'>
            <div>MIXD</div>
            <div>{81800.4}</div>
          </div>
          <div className='flex justify-between mt-8 px-4'>
            <button className='px-4 py-2 rounded-lg bg-white text-lg text-black'>添加流动性</button>
            <button className='px-4 py-2 rounded-lg border border-white text-lg'>移除流动性</button>
          </div>
        </div>
      </Details>

      <Details open={true}>
        <div className='flex flex-col'>
          <div className='flex justify-between text-lg mb-2'>
            <div>你的流动性代币总额</div>
            <div>{0.5999}</div>
          </div>
          <div className='flex justify-between text-lg mb-2'>
            <div>您的流动性份额</div>
            <div>{'<0.01%'}</div>
          </div>
          <div className='flex justify-between text-lg mb-2'>
            <div>EOS</div>
            <div>{0.0000068838}</div>
          </div>
          <div className='flex justify-between text-lg mb-2'>
            <div>MIXD</div>
            <div>{81800.4}</div>
          </div>
          <div className='flex justify-between mt-8 px-4'>
            <button className='px-4 py-2 rounded-lg bg-white text-lg text-black'>添加流动性</button>
            <button className='px-4 py-2 rounded-lg border border-white text-lg'>移除流动性</button>
          </div>
        </div>
      </Details>
    </div>
  )
}
