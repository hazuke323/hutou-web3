'use client'
import { Button } from '@/lib/button'
import { Panel } from '@/lib/panel'
import { useState } from 'react'
import { BrowserProvider, Contract } from 'ethers'
import { useMetaMask } from 'metamask-react'
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi'
import abi from '../abi.json'
import Web3 from 'web3'
import StakeDialog from '@/component/stake-dialog'

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://go.getblock.io/541835f2ac774d30bdb437bc4d21cab5')
)

const contractAddress = '0x20d62923Ac342ac21d483323661bF1247151e3C5'
const address = '0x20d62923Ac342ac21d483323661bF1247151e3C5'


const contract = new web3.eth.Contract(abi, contractAddress)


async function stakeUSDT(amount) {

  const decimals = 16; // USDT使用的小数位
  const amountInUSDTUnits = (BigInt(amount) * BigInt(10 ** decimals)).toString();

  // 创建交易对象
  const tx = {
      from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
      to: contractAddress,
      value: 0,
      data: contract.methods.stakeUSDT(amountInUSDTUnits).encodeABI(),
  };

  // 签名交易
  const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

  // 发送交易
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  // 打印交易哈希
  console.log('交易哈希：', receipt.transactionHash);

  // 检查交易是否成功
  if (receipt.status) {
      console.log('USDT质押成功');
  } else {
      console.log('USDT质押失败');
  }
}

async function withdrawUSDT() {
  // 创建交易对象
  const tx = {
      from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
      to: contractAddress,
      value: 0,
      data: contract.methods.withdrawUSDT().encodeABI(),
  };

  // 签名交易
  const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

  // 发送交易
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  // 打印交易哈希
  console.log('交易哈希：', receipt.transactionHash);

  // 检查交易是否成功
  if (receipt.status) {
      console.log('USDT质押成功');
  } else {
      console.log('USDT质押失败');
  }
}


async function withdrawInterest(amount) {
  // 创建交易对象
  const tx = {
      from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
      to: contractAddress,
      value: 0,
      data: contract.methods.withdrawInterest().encodeABI(),
  };

  // 签名交易
  const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

  // 发送交易
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  // 打印交易哈希
  console.log('交易哈希：', receipt.transactionHash);

  // 检查交易是否成功
  if (receipt.status) {
      console.log('USDT质押成功');
  } else {
      console.log('USDT质押失败');
  }
}


async function emergencyWithdrawUSDT(amount) {
  // 创建交易对象
  const tx = {
      from: '0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077',
      to: contractAddress,
      value: 0,
      data: contract.methods.emergencyWithdrawUSDT(amount).encodeABI(),
  };

  // 签名交易
  const signedTx = await web3.eth.accounts.signTransaction(tx, '0x4c565217d97300coe2mdfcc26e0e133cd55a482555d61l1e3ee8bcfabcaad74f');

  // 发送交易
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  // 打印交易哈希
  console.log('交易哈希：', receipt.transactionHash);

  // 检查交易是否成功
  if (receipt.status) {
      console.log('USDT质押成功');
  } else {
      console.log('USDT质押失败');
  }
}


export default function USDTPage() {
  const { address: account, isConnected } = useAccount()
  const [ showStakeDialog, setShowStakeDialog ] = useState(false)

  const { data: total } = useReadContract({
    address,
    abi,
    functionName: 'getRemainingStakingPoolCapacity',
  })

  const { data: hash, writeContract, writeContractAsync } = useWriteContract()

  

  const balance = useBalance({ address: account })
  const balance2 = useReadContract({
    address: '0x55d398326f99059fF775485246999027B3197955',
    abi,
    functionName: 'balanceof',
    arguments: [account]
  })
  const balance3 = useReadContract({
    address: '0x55d398326f99059fF775485246999027B3197955',
    abi,
    functionName: 'balanceOf',
    arguments: [account]
  })

  const data = useReadContract({
    address,
    abi,
    functionName: 'getInterest',
    arguments: [account]
  })


  const address2 = "0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077";
  contract.methods.usdtBalanceOf(address2).call().then(balance => {
    console.log('usdt余额：', balance)
  })



  console.log(data.data, balance.data, balance2.data, balance3.data, '>>><<<')

  return (
    <div className='relative'>
      <Panel className='text-[1.75rem]'>
        质押USDT以赢得<br/>
        USDT奖励
      </Panel>
      <div className='flex flex-col items-center justify-center my-4'>
        <div className='text-bg mb-4 text-lg'>APR: {14.6}%</div>
        <div className='flex gap-4'>
          <Button className='text-2xl'
            onClick={ () => { setShowStakeDialog(true) } }
          >质押USDT</Button>
          <Button className='text-2xl'
            onClick={ () => { setShowStakeDialog(true) } }
          >解锁USDT</Button>
        </div>
      </div>
      <Panel className='text-[1.375rem]'>
        <div className='text-left mx-auto max-w-max'>
          您的质押：{199}USDT<br/>
          当前收益：{2.5}USDT
        </div>
      </Panel>
      <div className='flex flex-col items-center justify-center'>
        <Button className='text-[1.625rem] !px-8'>领取收益</Button>
        <div className='text-[1.375rem] mt-4'>{String(500000n - (total || 0n) / BigInt(1e18))}/500000 USDT</div>
        <div className='text-[1.375rem] mb-4'>当前质押量/质押量上限</div>
        <div className='text-lg my-1'>质押后须7天才能取回，请注意控制风险</div>
      </div>
      { showStakeDialog && <StakeDialog onClose={ () => setShowStakeDialog(false) }/>}
    </div>
  )
}



