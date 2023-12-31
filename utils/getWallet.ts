export const getWallet = (rpc: string, ethers: any) => {
  const phrase = process.env.MNEMONIC

  if (!phrase) throw new Error('invalid mnemonic. Make sure the mnemonic environment variable is set.')

  const newMnemonic = ethers.Mnemonic.fromPhrase(phrase)
  const path = `m/44'/60'/0'/0/1`
  const wallet = ethers.HDNodeWallet.fromMnemonic(newMnemonic, path)
  const provider = ethers.getDefaultProvider(rpc)
  const connectedWallet = wallet.connect(provider)

  return connectedWallet
}
