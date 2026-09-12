import { VatValidationEntityBase } from '../VatValidationEntityBase';
import type { VatValidationSDK } from '../VatValidationSDK';
import type { Control } from '../types';
import type { ValidateIbanResponseSchema, ValidateIbanResponseSchemaLoadMatch } from '../VatValidationTypes';
declare class ValidateIbanResponseSchemaEntity extends VatValidationEntityBase<ValidateIbanResponseSchema> {
    constructor(client: VatValidationSDK, entopts: any);
    make(this: ValidateIbanResponseSchemaEntity): ValidateIbanResponseSchemaEntity;
    load(this: any, reqmatch?: ValidateIbanResponseSchemaLoadMatch, ctrl?: Control): Promise<ValidateIbanResponseSchemaEntity>;
}
export { ValidateIbanResponseSchemaEntity };
