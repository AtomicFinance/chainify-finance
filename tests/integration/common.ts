/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
// TOOD: Connector does not work for EIP1193
import Client from '@liquality/client'
import * as crypto from '@liquality/crypto'
import * as errors from '@liquality/errors'
import * as utils from '@liquality/utils'
import BitcoinNodeWalletProvider from '@liquality/bitcoin-node-wallet-provider'
import BitcoinJsWalletProvider from '@liquality/bitcoin-js-wallet-provider'
import BitcoinRpcProvider from '@liquality/bitcoin-rpc-provider'
import * as BitcoinUtils from '@liquality/bitcoin-utils'
import { Client as FinanceClient } from '../../packages/client/lib'
import BitcoinCfdProvider from '../../packages/bitcoin-cfd-provider/lib'
import BitcoinDlcProvider from '../../packages/bitcoin-dlc-provider/lib'
import BitcoinWalletProvider from '../../packages/bitcoin-wallet-provider/lib'
import { findLast } from 'lodash'
import { generateMnemonic } from 'bip39'
import config from './config'
import BigNumber from 'bignumber.js'

import * as cfdJs from 'cfd-js'
import * as cfdDlcJs from 'cfd-dlc-js'

// const cfdDlcJs = require('cfd-dlc-js')

// console.log('cfdDlcJs', cfdDlcJs)

const providers = {
  bitcoin: {
    BitcoinRpcProvider,
    BitcoinNodeWalletProvider,
    BitcoinJsWalletProvider,
    BitcoinUtils
  }
}

const sleep = utils.sleep

chai.use(chaiAsPromised)

const CONSTANTS = {
  BITCOIN_FEE_PER_BYTE: 3,
  BITCOIN_ADDRESS_DEFAULT_BALANCE: 50 * 1e8
}

const { network, rpc} = config.bitcoin

console.warn = () => {} // Silence warnings

function mockedBitcoinRpcProvider () {
  const bitcoinRpcProvider = new BitcoinRpcProvider(rpc.host, rpc.username, rpc.password)
  // Mock Fee Per Byte to prevent from changing
  bitcoinRpcProvider.getFeePerByte = async () => CONSTANTS.BITCOIN_FEE_PER_BYTE
  return bitcoinRpcProvider
}

const bitcoinWithNode = new Client()
const bitcoinWithNodeFinance = new FinanceClient(bitcoinWithNode);
bitcoinWithNode.finance = bitcoinWithNodeFinance
bitcoinWithNode.addProvider(mockedBitcoinRpcProvider())
bitcoinWithNode.addProvider(new BitcoinNodeWalletProvider(network, rpc.host, rpc.username, rpc.password, 'bech32'))
bitcoinWithNode.finance.addProvider(new BitcoinCfdProvider(network, cfdJs));
bitcoinWithNode.finance.addProvider(new BitcoinDlcProvider(network, cfdDlcJs));
bitcoinWithNode.finance.addProvider(new BitcoinWalletProvider(network));

const bitcoinWithJs = new Client()
const bitcoinWithJsFinance = new FinanceClient(bitcoinWithJs);
bitcoinWithJs.finance = bitcoinWithJsFinance
bitcoinWithJs.addProvider(mockedBitcoinRpcProvider())
bitcoinWithJs.addProvider(new BitcoinJsWalletProvider(network, generateMnemonic(256), 'bech32'))
bitcoinWithJs.finance.addProvider(new BitcoinCfdProvider(network, cfdJs));
bitcoinWithJs.finance.addProvider(new BitcoinDlcProvider(network, cfdDlcJs));
bitcoinWithJs.finance.addProvider(new BitcoinWalletProvider(network));

const bitcoinWithJs2 = new Client()
const bitcoinWithJsFinance2 = new FinanceClient(bitcoinWithJs2);
bitcoinWithJs2.finance = bitcoinWithJsFinance2
bitcoinWithJs2.addProvider(mockedBitcoinRpcProvider())
bitcoinWithJs2.addProvider(new BitcoinJsWalletProvider(network, generateMnemonic(256), 'bech32'))
bitcoinWithJs2.finance.addProvider(new BitcoinCfdProvider(network, cfdJs));
bitcoinWithJs2.finance.addProvider(new BitcoinDlcProvider(network, cfdDlcJs));
bitcoinWithJs2.finance.addProvider(new BitcoinWalletProvider(network));

const chains = {
  bitcoinWithNode: { id: 'Bitcoin Node', name: 'bitcoin', client: bitcoinWithNode, network: network, segwitFeeImplemented: true },
  bitcoinWithJs: { id: 'Bitcoin Js', name: 'bitcoin', client: bitcoinWithJs, network: network },
  bitcoinWithJs2: { id: 'Bitcoin Js', name: 'bitcoin', client: bitcoinWithJs, network: network },
}

async function fundAddress (address: string) {
  console.log('sendfunds to ', address)
  const tx = await chains.bitcoinWithNode.client.chain.sendTransaction(address, CONSTANTS.BITCOIN_ADDRESS_DEFAULT_BALANCE)
  await mineBlock()
  return tx
}

async function importAddresses (chain: Chain) {
  return chain.client.getMethod('importAddresses')()
}

async function mineBlock () {
  try {
    await chains.bitcoinWithNode.client.chain.generateBlock(1)
  } catch (e) {
    if (!(e instanceof errors.UnimplementedMethodError)) throw e
    console.log('Skipped mining block - not implement for chain - probably client automines')
  }
}

interface Chain {
  id: string;
  name: string;
  client: Client;
  network: any;
  segwitFeeImplemented?: boolean;
}

export {
  CONSTANTS,
  chains,
  sleep,
  fundAddress,
  importAddresses
}
