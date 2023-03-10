import { createClient, configureChains, mainnet, goerli } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [publicProvider()],
)

createClient({
  provider,
  webSocketProvider,
})
