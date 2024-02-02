import { SVGIconArrow } from './svg-icons'

export function Details({ children, open = false }) {
  return (
    <div className='bg-white bg-gradient-to-l from-[#001D77] from-[0%] via-[#237DEC] via-[97%] to-[#59A4FF] to-[100%] shadow-[inset_0_4px_1px_0_rgba(112,120,168,0.3)] rounded-xl m-4'>
      <details className='group p-4' open={open}>
        <summary className='flex items-center justify-between text-lg'>
          <div className='flex items-center'>
            <div className='size-7 rounded-full bg-[#0D2464]'></div>
            <div className='size-7 rounded-full bg-white -translate-x-2'></div>
            EOS/MIXD
          </div>
          <div className='flex items-center gap-3.5'>
            管理
            <SVGIconArrow className='w-3.5 group-open:rotate-180' />
          </div>
        </summary>
        <div className='py-4'>{children}</div>
      </details>
    </div>
  )
}