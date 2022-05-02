import { OutPoint } from '.';
import { CKBModel } from '..';
export declare class CellInput implements CKBModel {
    previousOutput: OutPoint;
    since: string;
    static fromRPC(data: any): CellInput;
    constructor(previousOutput: OutPoint, since?: string);
    sameWith(cellInput: CellInput): boolean;
    validate(): boolean;
    serializeJson(): object;
}
