import { readContract } from '@wagmi/core';
import { Abi } from 'abitype'
import { RelayerParams } from 'defender-relay-client';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { config } from 'dotenv'

import './wagmi.js';

// Entrypoint for the Autotask
export async function handler(event: RelayerParams) {
  const provider = new DefenderRelayProvider(event)
  const signer = new DefenderRelaySigner(event, provider, { speed: 'fast' })
  console.log(`Relayer address is ${signer.getAddress()}`);

  const abi = process.env.ABI as string;
  const json = JSON.parse(abi) as Abi

  const data = await readContract({
    address: '0xcc4fad6F82AeAcdD27De0e3A50d80d5De108c284',
    abi: json,
    functionName: 'startPreSale',
    chainId: 5,
  })
  console.log(data)
}

// Sample typescript type definitions
type EnvInfo = {
  API_KEY: string;
  API_SECRET: string;
}

// To run locally (this code will not be executed in Autotasks)
function main() {
  config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env as EnvInfo;
  handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch((error: Error) => { console.error(error); process.exit(1); });
}
main()
