import { VatValidationEntityBase } from '../VatValidationEntityBase';
import type { VatValidationSDK } from '../VatValidationSDK';
import type { Control } from '../types';
import type { Geolocate, GeolocateLoadMatch } from '../VatValidationTypes';
declare class GeolocateEntity extends VatValidationEntityBase<Geolocate> {
    constructor(client: VatValidationSDK, entopts: any);
    make(this: GeolocateEntity): GeolocateEntity;
    load(this: any, reqmatch?: GeolocateLoadMatch, ctrl?: Control): Promise<GeolocateEntity>;
}
export { GeolocateEntity };
