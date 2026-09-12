import { VatValidationEntityBase } from '../VatValidationEntityBase';
import type { VatValidationSDK } from '../VatValidationSDK';
import type { Control } from '../types';
import type { Country, CountryListMatch } from '../VatValidationTypes';
declare class CountryEntity extends VatValidationEntityBase<Country> {
    constructor(client: VatValidationSDK, entopts: any);
    make(this: CountryEntity): CountryEntity;
    list(this: any, reqmatch?: CountryListMatch, ctrl?: Control): Promise<CountryEntity[]>;
}
export { CountryEntity };
