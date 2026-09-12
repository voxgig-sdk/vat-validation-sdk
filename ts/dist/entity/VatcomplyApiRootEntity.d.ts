import { VatValidationEntityBase } from '../VatValidationEntityBase';
import type { VatValidationSDK } from '../VatValidationSDK';
import type { Control } from '../types';
import type { VatcomplyApiRoot, VatcomplyApiRootLoadMatch } from '../VatValidationTypes';
declare class VatcomplyApiRootEntity extends VatValidationEntityBase<VatcomplyApiRoot> {
    constructor(client: VatValidationSDK, entopts: any);
    make(this: VatcomplyApiRootEntity): VatcomplyApiRootEntity;
    load(this: any, reqmatch?: VatcomplyApiRootLoadMatch, ctrl?: Control): Promise<VatcomplyApiRootEntity>;
}
export { VatcomplyApiRootEntity };
