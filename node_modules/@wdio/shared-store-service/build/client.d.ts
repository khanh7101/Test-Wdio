import type { JsonCompatible, JsonPrimitive, JsonObject, JsonArray } from '@wdio/types';
import type { GetValueOptions } from './types.js';
export declare const setPort: (port: number) => void;
/**
 * make a request to the server to get a value from the store
 * @param   {string} key
 * @returns {*}
 */
export declare const getValue: (key: string) => Promise<string | number | boolean | JsonObject | JsonArray | null | undefined>;
/**
 * make a request to the server to set a value to the store
 * @param {string}  key
 * @param {*}       value `store[key]` value (plain object)
 */
export declare const setValue: (key: string, value: JsonCompatible | JsonPrimitive) => Promise<number | void>;
/**
 *
 * @param {string}  key
 * @param {*}       value
 */
export declare const setResourcePool: (key: string, value: JsonArray) => Promise<number | void>;
/**
 *
 * @param {string}  key
 * @param {*}       value
 */
export declare const getValueFromPool: (key: string, options?: GetValueOptions) => Promise<any>;
/**
 *
 * @param {string}  key
 * @param {*}       value
 */
export declare const addValueToPool: (key: string, value: JsonPrimitive | JsonCompatible) => Promise<number>;
//# sourceMappingURL=client.d.ts.map