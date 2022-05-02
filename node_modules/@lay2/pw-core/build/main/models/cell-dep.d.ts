import { OutPoint } from '.';
import { DepType, CKBModel } from '..';
export declare class CellDep implements CKBModel {
    depType: DepType;
    outPoint: OutPoint;
    static fromRPC(data: any): CellDep | undefined;
    constructor(depType: DepType, outPoint: OutPoint);
    validate(): boolean;
    sameWith(cellDep: CellDep): boolean;
    serializeJson(): object;
}
