import CfddlcHelper from './cfddlcjsHelper'
import Provider from '@atomicfinance/provider'
import { sleep } from '@liquality/utils'
import {
  AddSignatureToFundTransactionRequest, AddSignatureToFundTransactionResponse,
  AddSignaturesToCetRequest, AddSignaturesToCetResponse,
  AddSignaturesToMutualClosingTxRequest, AddSignaturesToMutualClosingTxResponse,
  AddSignaturesToRefundTxRequest, AddSignaturesToRefundTxResponse,
  CreateCetRequest, CreateCetResponse,
  CreateClosingTransactionRequest, CreateClosingTransactionResponse,
  CreateDlcTransactionsRequest, CreateDlcTransactionsResponse,
  CreateFundTransactionRequest, CreateFundTransactionResponse,
  CreateMutualClosingTransactionRequest, CreateMutualClosingTransactionResponse,
  CreatePenaltyTransactionRequest, CreatePenaltyTransactionResponse,
  CreateRefundTransactionRequest, CreateRefundTransactionResponse,
  GetRawCetSignatureRequest, GetRawCetSignatureResponse,
  GetRawCetSignaturesRequest, GetRawCetSignaturesResponse,
  GetRawFundTxSignatureRequest, GetRawFundTxSignatureResponse,
  GetRawMutualClosingTxSignatureRequest, GetRawMutualClosingTxSignatureResponse,
  GetRawRefundTxSignatureRequest, GetRawRefundTxSignatureResponse,
  GetSchnorrPublicNonceRequest, GetSchnorrPublicNonceResponse,
  SchnorrSignRequest, SchnorrSignResponse,
  SignClosingTransactionRequest, SignClosingTransactionResponse,
  SignFundTransactionRequest, SignFundTransactionResponse,
  VerifyCetSignatureRequest, VerifyCetSignatureResponse,
  VerifyCetSignaturesRequest, VerifyCetSignaturesResponse,
  VerifyFundTxSignatureRequest, VerifyFundTxSignatureResponse,
  VerifyMutualClosingTxSignatureRequest, VerifyMutualClosingTxSignatureResponse,
  VerifyRefundTxSignatureRequest, VerifyRefundTxSignatureResponse
} from 'cfd-dlc-js-wasm'

export default class BitcoinCfdDlcProvider extends Provider {
  _network: any;
  _cfdDlcJs: any;

  constructor(network: any) {
    super('BitcoinCfdDlcProvider')

    this._network = network

    CfddlcHelper.initialized(() => {
      this._cfdDlcJs = CfddlcHelper.getCfddlcjs();
    }) 
  }

  async CfdLoaded () {
    while (!this._cfdDlcJs) {
      await sleep(10)
    }
  }

  async AddSignatureToFundTransaction(jsonObject: AddSignatureToFundTransactionRequest): Promise<AddSignatureToFundTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.AddSignatureToFundTransaction(jsonObject)
  }

  async AddSignaturesToCet(jsonObject: AddSignaturesToCetRequest): Promise<AddSignaturesToCetResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.AddSignaturesToCet(jsonObject)
  }

  async AddSignaturesToMutualClosingTx(jsonObject: AddSignaturesToMutualClosingTxRequest): Promise<AddSignaturesToMutualClosingTxResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.AddSignaturesToMutualClosingTx(jsonObject)
  }

  async AddSignaturesToRefundTx(jsonObject: AddSignaturesToRefundTxRequest): Promise<AddSignaturesToRefundTxResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.AddSignaturesToRefundTx(jsonObject)
  }

  async CreateCet(jsonObject: CreateCetRequest): Promise<CreateCetResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.CreateCet(jsonObject)
  }

  async CreateClosingTransaction(jsonObject: CreateClosingTransactionRequest): Promise<CreateClosingTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.CreateClosingTransaction(jsonObject)
  }

  async CreateDlcTransactions(jsonObject: CreateDlcTransactionsRequest): Promise<CreateDlcTransactionsResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.CreateDlcTransactions(jsonObject)
  }

  async CreateFundTransaction(jsonObject: CreateFundTransactionRequest): Promise<CreateFundTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.CreateFundTransaction(jsonObject)
  }

  async CreateMutualClosingTransaction(jsonObject: CreateMutualClosingTransactionRequest): Promise<CreateMutualClosingTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.CreateMutualClosingTransaction(jsonObject)
  }

  async CreatePenaltyTransaction(jsonObject: CreatePenaltyTransactionRequest): Promise<CreatePenaltyTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.CreatePenaltyTransaction(jsonObject)
  }

  async CreateRefundTransaction(jsonObject: CreateRefundTransactionRequest): Promise<CreateRefundTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.CreateRefundTransaction(jsonObject)
  }

  async GetRawCetSignature(jsonObject: GetRawCetSignatureRequest): Promise<GetRawCetSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.GetRawCetSignature(jsonObject)
  }

  async GetRawCetSignatures(jsonObject: GetRawCetSignaturesRequest): Promise<GetRawCetSignaturesResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.GetRawCetSignatures(jsonObject)
  }

  async GetRawFundTxSignature(jsonObject: GetRawFundTxSignatureRequest): Promise<GetRawFundTxSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.GetRawFundTxSignature(jsonObject)
  }

  async GetRawMutualClosingTxSignature(jsonObject: GetRawMutualClosingTxSignatureRequest): Promise<GetRawMutualClosingTxSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.GetRawMutualClosingTxSignature(jsonObject)
  }

  async GetRawRefundTxSignature(jsonObject: GetRawRefundTxSignatureRequest): Promise<GetRawRefundTxSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.GetRawRefundTxSignature(jsonObject)
  }

  async GetSchnorrPublicNonce(jsonObject: GetSchnorrPublicNonceRequest): Promise<GetSchnorrPublicNonceResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.GetSchnorrPublicNonce(jsonObject)
  }

  async SchnorrSign(jsonObject: SchnorrSignRequest): Promise<SchnorrSignResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.SchnorrSign(jsonObject)
  }

  async SignClosingTransaction(jsonObject: SignClosingTransactionRequest): Promise<SignClosingTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.SignClosingTransaction(jsonObject)
  }

  async SignFundTransaction(jsonObject: SignFundTransactionRequest): Promise<SignFundTransactionResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.SignFundTransaction(jsonObject)
  }

  async VerifyCetSignature(jsonObject: VerifyCetSignatureRequest): Promise<VerifyCetSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.VerifyCetSignature(jsonObject)
  }

  async VerifyCetSignatures(jsonObject: VerifyCetSignaturesRequest): Promise<VerifyCetSignaturesResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.VerifyCetSignatures(jsonObject)
  }

  async VerifyFundTxSignature(jsonObject: VerifyFundTxSignatureRequest): Promise<VerifyFundTxSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.VerifyFundTxSignature(jsonObject)
  }

  async VerifyMutualClosingTxSignature(jsonObject: VerifyMutualClosingTxSignatureRequest): Promise<VerifyMutualClosingTxSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.VerifyMutualClosingTxSignature(jsonObject)
  }

  async VerifyRefundTxSignature(jsonObject: VerifyRefundTxSignatureRequest): Promise<VerifyRefundTxSignatureResponse> {
    await this.CfdLoaded()

    return this._cfdDlcJs.VerifyRefundTxSignature(jsonObject)
  }
}
