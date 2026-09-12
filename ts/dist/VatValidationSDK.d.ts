import { CountryEntity } from './entity/CountryEntity';
import { CurrencyEntity } from './entity/CurrencyEntity';
import { GeolocateEntity } from './entity/GeolocateEntity';
import { RateEntity } from './entity/RateEntity';
import { ValidateIbanResponseSchemaEntity } from './entity/ValidateIbanResponseSchemaEntity';
import { ValidateVatResponseSchemaEntity } from './entity/ValidateVatResponseSchemaEntity';
import { VatcomplyApiRootEntity } from './entity/VatcomplyApiRootEntity';
export type * from './VatValidationTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { VatValidationEntityBase } from './VatValidationEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class VatValidationSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Country(entopts?: Record<string, any>): CountryEntity;
    Currency(entopts?: Record<string, any>): CurrencyEntity;
    Geolocate(entopts?: Record<string, any>): GeolocateEntity;
    Rate(entopts?: Record<string, any>): RateEntity;
    ValidateIbanResponseSchema(entopts?: Record<string, any>): ValidateIbanResponseSchemaEntity;
    ValidateVatResponseSchema(entopts?: Record<string, any>): ValidateVatResponseSchemaEntity;
    VatcomplyApiRoot(entopts?: Record<string, any>): VatcomplyApiRootEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): VatValidationSDK;
    tester(testopts?: any, sdkopts?: any): VatValidationSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof VatValidationSDK;
export { stdutil, config, BaseFeature, VatValidationEntityBase, VatValidationSDK, SDK, };
