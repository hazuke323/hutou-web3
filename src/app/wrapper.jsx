'use client'
import { MetaMaskProvider, useMetaMask } from 'metamask-react'
import { SVGIconLogo, SVGIconQQ, SVGIconTelegram, SVGIconBar3, SVGIconGlobe } from '@/lib/svg-icons'
import ConnectPage from './connect_page'
import Link from 'next/link'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dialog, { dialogContext } from '@/component/dialog'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const config = createConfig({
  chains: [bsc],
  // connectors: [
  //   // injected(),
  //   metaMask(),
  //   // safe(),
  // ],
  transports: {
    [bsc.id]: http()
  }
})

const queryClient = new QueryClient()


function WalletWrapper() {
  const { status, connect, account, chainId, ethereum } = useMetaMask()

  console.log({ status, connect, account, chainId, ethereum })

  if(status === 'initializing') {
    return <div>Synchronisation with MetaMask ongoing...</div>
  }
  if(status === 'unavailable') {
    return <div>MetaMask not available</div>
  }
  if(status === 'notConnected') {
    return (
      <div className='flex gap-4 items-center' onClick={connect}>
        <div className='text-white text-sm'>连接钱包</div>
        <SVGIconGlobe className='w-8' />
      </div>
    )
  }
  if(status === 'connecting') {
    return <div>Connecting...</div>
  }
  if(status === 'connected') {
    return (
      <div className='flex gap-4 items-center'>{account.slice(0, 4)}...{account.slice(-4)}</div>
    )
  }
  return null
}

function MainContent({ children }) {
  const { status } = useMetaMask()
  const pathname = usePathname()
  console.log(pathname)
  if(status === 'connected' || pathname === '/community') return children
  return <ConnectPage />
}

export default function CustomWrapper({ children }) {
  const [ dialog, setDialog ] = useState(null)
  // const [ dialogEnabled, setDialogEnabled ] = useState(false)

  const dialogProviderValue = {
    async showDialog({ content }) {
      // setDialogEnabled(true)
      return new Promise((resolve) => {
        setDialog({
          content,
          resolve: (reason) => {
            setDialog(null)
            resolve({ reason })
          }
        })
      })
    }
  }

  return (
    <MetaMaskProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <dialogContext.Provider value={dialogProviderValue}>
          <header className='flex justify-between relative mb-8'>
            <div className='flex gap-3 items-center'>
              <div className='group relative'>
                <SVGIconBar3 className='w-5 cursor-pointer' />
                <menu className='group-hover:-translate-x-8 absolute z-40 left-0 -top-14 pt-24 text-2xl h-screen transition-transform ease-out -translate-x-[150%]'>
                  <div className='h-full bg-black'>
                    <ul className='flex gap-8 flex-col p-8 pt-20 pr-16'>
                      <li className='cursor-pointer'><Link className='whitespace-nowrap' href='/'>Hutou挖矿</Link></li>
                      <li className='cursor-pointer'><Link className='whitespace-nowrap' target='_blank' href='https://pancakeswap.finance/swap?inputCurrency=0xBC470E3d506df49e3498Dac3Df57d9DbB746CAa6'>购买Hutou</Link></li>
                      <li className='cursor-pointer'><Link className='whitespace-nowrap' href='/usdt'>USDT理财</Link></li>
                      <li className='cursor-pointer'><Link className='whitespace-nowrap' href='/community'>社区</Link></li>
                      {/* <li className='cursor-pointer'><Link className='whitespace-nowrap' href='/'>合约地址</Link></li> */}
                    </ul>
                    <hr className='border-[#131D59] border-t-2 my-2' />
                    <div className='flex gap-4 p-8'>
                      <a className='cursor-pointer' target='_blank' href='https://qm.qq.com/q/VHKxeQLsAg'><SVGIconQQ className='w-11' /></a>
                      <a className='cursor-pointer' target='_blank' href='https://btok360.com/Hutou2024'><SVGIconTelegram className='w-11' /></a>
                    </div>
                  </div>
                </menu>
              </div>
              <div className='size-12 bg-no-repeat bg-contain bg-[url("/logo.png")]'></div>
              <SVGIconLogo className='w-[84px]' />
            </div>
            <WalletWrapper />
          </header>
          <MainContent>{ children }</MainContent>
          { dialog && (
            <Dialog dialog={ dialog } />
          ) }
          </dialogContext.Provider>
        </QueryClientProvider>
      </WagmiProvider>
    </MetaMaskProvider>
  )
}