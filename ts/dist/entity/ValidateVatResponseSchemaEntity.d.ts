import { VatValidationEntityBase } from '../VatValidationEntityBase';
import type { VatValidationSDK } from '../VatValidationSDK';
import type { Control } from '../types';
import type { ValidateVatResponseSchema, ValidateVatResponseSchemaLoadMatch } from '../VatValidationTypes';
declare class ValidateVatResponseSchemaEntity extends VatValidationEntityBase<ValidateVatResponseSchema> {
    constructor(client: VatValidationSDK, entopts: any);
    make(this: ValidateVatResponseSchemaEntity): ValidateVatResponseSchemaEntity;
    load(this: any, reqmatch?: ValidateVatResponseSchemaLoadMatch, ctrl?: Control): Promise<ValidateVatResponseSchemaEntity>;
}
export { ValidateVatResponseSchemaEntity };
