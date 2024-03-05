import { Button } from '@/lib/button'
import { SVGIconClose } from '@/lib/svg-icons'
import { createContext } from 'react'

export const dialogContext = createContext({
  showDialog() {},
  hideDialog() {}
})

export default function Dialog({ dialog }) {
  return (
    <div className='absolute inset-0 backdrop-blur'>
      <div className='absolute top-1/4 left-6 right-6 bg-[#A3B2FA] rounded-[21px] px-6 py-4'>
        <div className='flex flex-col'>
          <div className='py-8'>{dialog.content}</div>
          <div className='flex justify-center'>
            <Button onClick={ () => {
              dialog.resolve('ok')
            } }>OK</Button>
          </div>
        </div>
        <div className='absolute top-4 right-6 text-black cursor-pointer' onClick={() => { dialog.resolve('close') }} >
          <SVGIconClose className='w-4'/>
        </div>
      </div>
    </div>

  )
}