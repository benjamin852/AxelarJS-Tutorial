import { ethers } from 'hardhat'
import chains from '../chains.json'
import MockERC20 from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json'

import { getWallet } from '../utils/getWallet'


async function main() {

    const connectedWallet = getWallet(chains[1].rpc, ethers)
    const gmpDistribution = await ethers.deployContract('GMPDistribution', [
        chains[1].gateway,
        chains[1].gasService,
    ])

    const mockERC20 = new ethers.Contract(
        chains[1].aUSDC,
        MockERC20.abi,
        connectedWallet
    )

    await gmpDistribution.waitForDeployment()

    await mockERC20.approve(gmpDistribution.target, '1234567895')

    console.log(`fantom contract address: ${gmpDistribution.target}`)
}



main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})