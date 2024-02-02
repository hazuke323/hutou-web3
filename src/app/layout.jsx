import './global.css'
import { SVGIconLogo, SVGIconQQ, SVGIconTelegram, SVGIconBar3, SVGIconGlobe } from '@/lib/svg-icons'
import GlobeAltIcon from '@heroicons/react/16/solid/GlobeAltIcon'

export const metadata = {
  title: 'Hutou'
}

export default function RootLayout({
  children
}) {
  return (
    <html lang='zh'>
      <body className='bg-black text-white'>
        <div className='mx-auto p-8 sm:max-w-screen-sm min-w-[320px] min-h-screen overflow-x-hidden'>
          <header className='flex justify-between relative'>
            <div className='flex gap-3 items-center'>
              <div className='group relative'>
                <SVGIconBar3 className='w-6 cursor-pointer' />
                <menu className='group-hover:-translate-x-8 absolute z-40 left-0 -top-14 pt-24 h-screen transition-transform ease-out -translate-x-[150%]'>
                  <div className='h-full bg-black'>
                    <ul className='flex gap-4 flex-col pt-8 p-8'>
                      <li className='cursor-pointer'><a className='whitespace-nowrap'>HuTOU挖矿</a></li>
                      <li className='cursor-pointer'><a className='whitespace-nowrap'>LP质押分红</a></li>
                      <li className='cursor-pointer'><a className='whitespace-nowrap'>USDT理财</a></li>
                      <li className='cursor-pointer'><a className='whitespace-nowrap'>社区</a></li>
                      <li className='cursor-pointer'><a className='whitespace-nowrap'>合约地址</a></li>
                    </ul>
                    <hr className='border-[#131D59] my-2' />
                    <div className='flex gap-4 p-8'>
                      <a className='cursor-pointer'><SVGIconQQ className='w-8' /></a>
                      <a className='cursor-pointer'><SVGIconTelegram className='w-8' /></a>
                    </div>
                  </div>
                </menu>
              </div>
              <div className='size-12 bg-no-repeat bg-contain bg-[url("/logo.png")]'></div>
              <SVGIconLogo className='w-[84px]' />
            </div>
            <div className='flex gap-4 items-center'>
              <div className='text-white text-sm'>连接钱包</div>
              <SVGIconGlobe className='w-8' />
            </div>
          </header>
          <main
            className='bg-gradient-to-b rounded-b-[32px] mb-8 py-6
              from-[rgba(0,0,0,0.9)] from-[-14%] via-[rgba(0,10,42,0.8)] via-[48%] to-[rgba(0,16,67,0.9)]
            '
          >{children}</main>
        </div>
      </body>
    </html>
  )
}
