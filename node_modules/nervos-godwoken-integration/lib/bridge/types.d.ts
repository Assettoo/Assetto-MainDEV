/// <reference types="@nervosnetwork/ckb-types" />
export declare const NERVOS_NETWORK: "Nervos";
export declare type NetworkKeyNervos = typeof NERVOS_NETWORK;
export declare enum BridgeTransactionStatus {
    Pending = "Pending",
    Successful = "Successful",
    Failed = "Failed"
}
export declare type NetworkBase = {
    Network: string;
    UserIdent: string;
    DerivedAssetIdent?: string;
    NativeAssetIdent?: string;
    RawTransaction?: unknown;
    SignedTransaction?: unknown;
};
export declare type AmountWithoutDecimals = string;
export declare type FungibleBaseInfo = {
    decimals: number;
    name: string;
    symbol: string;
    logoURI: string;
    shadow: {
        network: string;
        ident: string;
    };
};
export declare type AssetType = {
    network: string;
    ident: string;
    amount?: AmountWithoutDecimals;
    info?: FungibleBaseInfo;
};
export declare type NetworkTypes<T extends NetworkBase = NetworkBase> = Required<T>;
export declare type RequiredAsset<T extends keyof AssetType> = AssetType & Required<Pick<AssetType, T>>;
export declare type NervosNetwork = NetworkTypes<{
    Network: NetworkKeyNervos;
    NativeAssetIdent: string;
    DerivedAssetIdent: string;
    UserIdent: string;
    RawTransaction: CKBComponents.RawTransactionToSign;
    SignedTransaction: CKBComponents.RawTransaction;
}>;
export declare type GenerateBridgeInTransactionPayload = {
    asset: RequiredAsset<"amount">;
    recipient: NervosNetwork["UserIdent"];
    sender: string;
};
export declare type GenerateBridgeOutNervosTransactionPayload = {
    network: string;
    asset: string;
    amount: string;
    recipient: string;
    sender: NervosNetwork["UserIdent"];
};
export declare type TransactionIdent = {
    txId: string;
};
export declare type GenerateTransactionResponse<N extends NetworkTypes> = {
    network: string;
    rawTransaction: N["RawTransaction"];
};
export declare type SignedTransactionPayload<N extends NetworkBase> = {
    network: N["Network"];
    signedTransaction: N["SignedTransaction"];
};
export declare type GetBridgeTransactionStatusPayload = {
    network: string;
    txId: string;
};
export declare type GetBridgeTransactionStatusResponse = {
    network: string;
    status: BridgeTransactionStatus;
};
export declare type GetBridgeTransactionSummariesPayload = {
    network: string;
    xchainAssetIdent: string;
    user: {
        network: string;
        ident: string;
    };
};
declare type Timestamp = number;
export declare type TransactionSummary = {
    txSummary: {
        fromAsset: RequiredAsset<"amount">;
        toAsset: RequiredAsset<"amount">;
        fromTransaction: TransactionIdent & {
            timestamp: Timestamp;
        } & {
            confirmStatus: "pending" | number | "confirmed";
        };
        toTransaction?: TransactionIdent & {
            timestamp?: Timestamp;
        };
    };
};
export declare type FailedTransactionSummary = TransactionSummary & {
    status: BridgeTransactionStatus.Failed;
    message: string;
};
export declare type UnFailedTransactionSummary = TransactionSummary & {
    status: BridgeTransactionStatus.Pending | BridgeTransactionStatus.Successful;
};
export declare type TransactionSummaryWithStatus = UnFailedTransactionSummary | FailedTransactionSummary;
export declare type GetBalancePayload = Array<{
    network: string;
    userIdent: string;
    assetIdent: string;
}>;
export declare type GetBalanceResponse = Array<RequiredAsset<"amount">>;
export interface GetBridgeInNervosBridgeFeePayload {
    network: string;
    xchainAssetIdent: string;
    amount: string;
}
export interface GetBridgeOutNervosBridgeFeePayload {
    network: string;
    xchainAssetIdent: string;
    amount: string;
}
export interface GetBridgeInNervosBridgeFeeResponse {
    fee: RequiredAsset<"amount">;
}
export interface GetBridgeOutNervosBridgeFeeResponse {
    fee: RequiredAsset<"amount">;
}
export interface EthereumConfig {
    contractAddress: string;
}
export interface GetConfigResponse {
    xchains: {
        Ethereum: EthereumConfig;
    };
}
export interface IBridgeRPCHandler {
    generateBridgeInNervosTransaction: <T extends NetworkTypes>(payload: GenerateBridgeInTransactionPayload) => Promise<GenerateTransactionResponse<T>>;
    generateBridgeOutNervosTransaction: <T extends NetworkTypes>(payload: GenerateBridgeOutNervosTransactionPayload) => Promise<GenerateTransactionResponse<T>>;
    sendSignedTransaction: <T extends NetworkBase>(payload: SignedTransactionPayload<T>) => Promise<TransactionIdent>;
    /**
     * get the status of a transaction
     */
    getBridgeTransactionStatus: (payload: GetBridgeTransactionStatusPayload) => Promise<GetBridgeTransactionStatusResponse>;
    getBridgeTransactionSummaries: (payload: GetBridgeTransactionSummariesPayload) => Promise<TransactionSummaryWithStatus[]>;
    getAssetList: (name?: string) => Promise<RequiredAsset<"info">[]>;
    getBalance: (payload: GetBalancePayload) => Promise<GetBalanceResponse>;
    getBridgeInNervosBridgeFee: (payload: GetBridgeInNervosBridgeFeePayload) => Promise<GetBridgeInNervosBridgeFeeResponse>;
    getBridgeOutNervosBridgeFee: (payload: GetBridgeOutNervosBridgeFeePayload) => Promise<GetBridgeOutNervosBridgeFeeResponse>;
    getBridgeConfig: () => Promise<GetConfigResponse>;
}
export {};
