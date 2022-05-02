import { CKBModel, CellDep, Cell } from '..';
import { CellInput } from './cell-input';
export declare class RawTransaction implements CKBModel {
    inputCells: Cell[];
    outputs: Cell[];
    cellDeps: CellDep[];
    headerDeps: string[];
    readonly version: string;
    inputs: CellInput[];
    outputsData: string[];
    constructor(inputCells: Cell[], outputs: Cell[], cellDeps?: CellDep[], headerDeps?: string[], version?: string);
    sameWith(raw: RawTransaction): boolean;
    toHash(): string;
    validate(): boolean;
    serializeJson(): object;
}
