// 导入Web3.js库
const {Web3} = require('web3');

// 创建一个新的Web3实例，连接到区块链节点
// const web3 = new Web3(new Web3.providers.HttpProvider('https://go.getblock.io/541835f2ac774d30bdb437bc4d21cab5'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://api-testnet.bscscan.com/api'))



// const web3 = new Web3('https://13.125.172.137:26656');

// 合约地址
// const contractAddress = '0x20d62923Ac342ac21d483323661bF1247151e3C5';
const contractAddress = '0x854a4f6f5227ad6C8Be5c4b89e2b5bd22fAb6f0B'

// 合约ABI
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdtToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_highestAuthority",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EmergencyWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "daily_interest_rate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "emergencyWithdrawUSDT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getInterest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRemainingStakingPoolCapacity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestAuthority",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "max_staking_pool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_highestAuthority",
				"type": "address"
			}
		],
		"name": "setAuthority",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "stakeUSDT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "staked_amounts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "staking_apr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "staking_duration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "staking_start_times",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_staked_amount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "usdtBalanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdtToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawInterest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawUSDT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// 创建一个新的合约实例
const contract = new web3.eth.Contract(abi, contractAddress);

// 质押USDT函数
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

// main函数
async function main() {
    // 调用合约方法获取剩余质押总量
    // const capacity = await contract.methods.getRemainingStakingPoolCapacity().call();
    // console.log('剩余质押总量：', capacity);

    // 调用合约方法获取利息
    // const address = "0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077";
    // const Interest = await contract.methods.getInterest(address).call();
    // console.log('剩余利息：', Interest);

    // 调用 staked_amounts() 方法
    // const address = "0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077";
    // const stakedAmounts = await contract.methods.staked_amounts(address).call();
    // console.log('用户质押数量', stakedAmounts);

    // 调用 staking_start_times() 方法
    // const address = "0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077";
    // const stakedTime = await contract.methods.staking_start_times(address).call();
    // console.log('质押开始时间：', stakedTime);

    // 调用合约方法查询用户USDT余额
    const address = "0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077";
    const balance = await contract.methods.usdtBalanceOf(address).call();
    console.log('usdt余额：', balance);

    // 调用质押
    // const a = [1];
    // await stakeUSDT(a);

    // 调用释放
    // await withdrawUSDT();
    
    // 提取利息
    // await withdrawInterest();

    // 紧急提取usdt
    // const address = "0x9Cecc6cd57FFee9dB4de9DA7548ebf5af1E9E077";
    // await emergencyWithdrawUSDT(address);
}

// 运行main函数
main();
