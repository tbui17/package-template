import { type AnyFunction } from "../types"
import type { NonFunctionPropertyNames } from "./NonFunctionPropertyNames"

/**
 * OmitObjectFunctions<T> Creates a type by omitting functions from an object
 * type T recursively.
 *
 * @template T - The object type to process.
 * @returns An object type similar to T but without function properties.
 */

export type OmitObjectFunctions<T> = T extends Date
	? T
	: T extends object
		? T extends Array<infer U>
			? Array<OmitObjectFunctions<U>>
			: T extends AnyFunction
				? never
				: {
						[K in NonFunctionPropertyNames<T>]: OmitObjectFunctions<
							T[K]
						>
					}
		: T
