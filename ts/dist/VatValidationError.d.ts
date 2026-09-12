import { Context } from './Context';
declare class VatValidationError extends Error {
    isVatValidationError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { VatValidationError };
