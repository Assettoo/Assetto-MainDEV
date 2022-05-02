import { CKBModel } from '..';
export declare class OutPoint implements CKBModel {
    txHash: string;
    index: string;
    static fromRPC(data: any): OutPoint | undefined;
    constructor(txHash: string, index: string);
    sameWith(outPoint: OutPoint): boolean;
    validate(): OutPoint;
    serializeJson(): object;
}
