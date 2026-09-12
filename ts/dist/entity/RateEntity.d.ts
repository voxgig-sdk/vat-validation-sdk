import { VatValidationEntityBase } from '../VatValidationEntityBase';
import type { VatValidationSDK } from '../VatValidationSDK';
import type { Control } from '../types';
import type { Rate, RateLoadMatch } from '../VatValidationTypes';
declare class RateEntity extends VatValidationEntityBase<Rate> {
    constructor(client: VatValidationSDK, entopts: any);
    make(this: RateEntity): RateEntity;
    load(this: any, reqmatch?: RateLoadMatch, ctrl?: Control): Promise<RateEntity>;
}
export { RateEntity };
