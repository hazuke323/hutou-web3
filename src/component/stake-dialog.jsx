import { SVGIconClose } from '@/lib/svg-icons'
import classNames from 'classnames'
import { useState, useRef } from 'react'

export default function StakeDialog(
    {
      onClose = () => {}
      , info = {}
      , onStake
      , onWithdraw
    }
  ) {
  const [ type, setType ] = useState(0)
  const [ value0, setValue0 ] = useState(info.bal)
  const [ value1, setValue1 ] = useState(info.deposited)
  const inputRef = useRef()

  return (
    <div className='absolute -top-8 -bottom-8 w-full backdrop-blur'>
      <div className='absolute top-1/4 left-6 right-6 bg-[#A3B2FA] rounded-[21px] px-6 py-4'>
        <div className='flex flex-col gap-5'>
          <div className='text-black text-xl'>管理质押</div>
          <div className='flex justify-between gap-[34px]'>
            <button className={classNames('flex-1 text-xl py-2 rounded-[6px] border border-white text-black', type === 0 && 'bg-white')}
              onClick={ () => {
                setType(0)
                delete inputRef.current.value
              } }
            >增加质押</button>
            <button className={classNames('flex-1 text-xl py-2 rounded-[6px] border border-white text-black', type === 1 && 'bg-white')}
              onClick={ () => {
                setType(1)
                inputRef.current.value = ''
              } }
            >减少质押</button>
          </div>
          <div className='flex flex-col rounded-md bg-[#899AEB] p-3 gap-3'>
            <div className='flex justify-between'>
              <div className='text-black text-sm'>{ type ? '解押' : '质押'}</div>
              <div className='text-white text-sm'>{ type ? `已质押：${value1}` : `余额：${value0}` }</div>
            </div>
            <div className='flex justify-between'>
              <div className='text-white text-sm'>
                <input
                  ref={inputRef}
                  className='text-white text-sm bg-transparent'
                  type='number'
                  defaultValue={''}
                />
              </div>
              {/* <div className='text-white text-sm'>HUTOU/USDT  LP</div> */}
              <div className='text-white text-sm'>{ info.symbol }</div>
            </div>
            <div className='flex gap-4'>
              <button className='border rounded border-[#7586D6] text-black flex-1'
                onClick={() => { inputRef.current.value = (type ? value1 : value0) * .25 }}
              >25%</button>
              <button className='border rounded border-[#7586D6] text-black flex-1'
                onClick={() => { inputRef.current.value = (type ? value1 : value0) * .5 }}
              >50%</button>
              <button className='border rounded border-[#7586D6] text-black flex-1'
                onClick={() => { inputRef.current.value = (type ? value1 : value0) * .75 }}
              >75%</button>
              <button className='border rounded border-[#7586D6] text-black flex-1'
                onClick={() => { inputRef.current.value = (type ? value1 : value0) * 1 }}
              >100%</button>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='text-white text-sm'>已质押</div>
            {/* <div className='text-white text-sm'>{Number(0.0000008008).toFixed(9)} EOS/USDT LP</div> */}
            <div className='text-white text-sm'>{ info.deposited } { info.symbol }</div>
          </div>
          <div className='flex'>
            <button className='text-xl py-1 text-white placeholder:text-[#ACBADC] block bg-[#7586D6] rounded text-center w-full'
              onClick={ () => type ? onWithdraw() : onStake(inputRef.current.value) }
            >确认</button>
            {/*  */}
          </div>
          <div className='flex'>

          </div>
        </div>
        <div className='absolute top-4 right-6 text-black cursor-pointer' onClick={() => { onClose() }} >
          <SVGIconClose className='w-4'/>
        </div>
      </div>
    </div>

  )
}