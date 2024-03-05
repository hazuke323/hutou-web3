import './global.css'
import CustomWrapper from './wrapper'

export const metadata = {
  title: 'Hutou'
}

export default function RootLayout({
  children
}) {
  return (
    <html lang='zh'>
      <body className='bg-black text-white'>
        <div className='mx-auto px-8 py-6 sm:max-w-screen-sm min-w-[320px] min-h-screen overflow-x-hidden relative'>
          <CustomWrapper>
            <main
              className='bg-gradient-to-t rounded-b-[32px] mb-8 py-6 from-[rgba(31,49,122,0.84)] to-[rgba(19,29,71,0.63)] min-h-full'
            >{children}</main>
          </CustomWrapper>
        </div>
      </body>
    </html>
  )
}
