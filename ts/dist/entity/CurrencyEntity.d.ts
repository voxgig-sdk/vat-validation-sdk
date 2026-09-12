import { VatValidationEntityBase } from '../VatValidationEntityBase';
import type { VatValidationSDK } from '../VatValidationSDK';
import type { Control } from '../types';
import type { Currency, CurrencyLoadMatch } from '../VatValidationTypes';
declare class CurrencyEntity extends VatValidationEntityBase<Currency> {
    constructor(client: VatValidationSDK, entopts: any);
    make(this: CurrencyEntity): CurrencyEntity;
    load(this: any, reqmatch?: CurrencyLoadMatch, ctrl?: Control): Promise<CurrencyEntity>;
}
export { CurrencyEntity };
