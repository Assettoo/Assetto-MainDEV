import { Provider } from './provider';
import { Address } from '../models';
export declare class Web3ModalProvider extends Provider {
    readonly web3: any;
    onAddressChanged: (newAddress: Address) => void;
    constructor(web3: any, onAddressChanged?: (newAddress: Address) => void);
    init(): Promise<Provider>;
    ensResolver(ens: string): Promise<string>;
    sign(message: string): Promise<string>;
    close(): Promise<void>;
}
