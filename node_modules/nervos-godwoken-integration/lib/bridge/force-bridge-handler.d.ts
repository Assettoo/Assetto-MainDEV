import { IBridgeRPCHandler, GenerateBridgeInTransactionPayload, GenerateBridgeOutNervosTransactionPayload, GenerateTransactionResponse, GetBalancePayload, GetBalanceResponse, GetBridgeInNervosBridgeFeePayload, GetBridgeInNervosBridgeFeeResponse, GetBridgeOutNervosBridgeFeePayload, GetBridgeOutNervosBridgeFeeResponse, GetBridgeTransactionStatusPayload, GetBridgeTransactionStatusResponse, GetBridgeTransactionSummariesPayload, GetConfigResponse, NetworkBase, NetworkTypes, RequiredAsset, SignedTransactionPayload, TransactionIdent, TransactionSummaryWithStatus } from "./types";
import { JSONRPCClient } from "json-rpc-2.0";
export declare class BridgeRPCHandler implements IBridgeRPCHandler {
    client: JSONRPCClient;
    constructor(forceBridgeUrl: string);
    getBridgeInNervosBridgeFee(payload: GetBridgeInNervosBridgeFeePayload): Promise<GetBridgeInNervosBridgeFeeResponse>;
    getBridgeOutNervosBridgeFee(payload: GetBridgeOutNervosBridgeFeePayload): Promise<GetBridgeOutNervosBridgeFeeResponse>;
    generateBridgeInNervosTransaction<T extends NetworkTypes>(payload: GenerateBridgeInTransactionPayload): Promise<GenerateTransactionResponse<T>>;
    generateBridgeOutNervosTransaction<T extends NetworkTypes>(payload: GenerateBridgeOutNervosTransactionPayload): Promise<GenerateTransactionResponse<T>>;
    sendSignedTransaction<T extends NetworkBase>(payload: SignedTransactionPayload<T>): Promise<TransactionIdent>;
    getBridgeTransactionStatus(payload: GetBridgeTransactionStatusPayload): Promise<GetBridgeTransactionStatusResponse>;
    getBridgeTransactionSummaries(payload: GetBridgeTransactionSummariesPayload): Promise<TransactionSummaryWithStatus[]>;
    getAssetList(name?: string): Promise<RequiredAsset<"info">[]>;
    getBalance(payload: GetBalancePayload): Promise<GetBalanceResponse>;
    getBridgeConfig(): Promise<GetConfigResponse>;
}
