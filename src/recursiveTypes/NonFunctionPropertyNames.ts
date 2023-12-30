import { type AnyFunction } from "../types"

/**
 * NonFunctionPropertyNames<T> Extracts the property names from type T that are
 * not functions.
 *
 * @template T - The type to extract non-function property names from.
 * @returns The non-function property names of T.
 */

export type NonFunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends AnyFunction ? never : K
}[keyof T]
