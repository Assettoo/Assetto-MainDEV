import { Signer, Message } from '.';
import { Provider } from '../providers';
export declare class DefaultSigner extends Signer {
    readonly provider: Provider;
    constructor(provider: Provider);
    signMessages(messages: Message[]): Promise<string[]>;
}
