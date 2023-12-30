import { type SpreadDeepObject } from "./SpreadDeepObject"

/**
 * Applies SpreadDeep to each property of an object type T with value type of
 * object.
 *
 * Typically used when the condition also applies to the outer object type, but
 * you need to spread values within the object.
 *
 * @example
 * 	type ArrayExampleCondition = {
 * 		length: number
 * 	}
 *
 * 	type Value = {
 * 		prop1: string
 * 	}
 *
 * 	type Data = {
 * 		length: number
 *
 * 		inner: { a: string; length: number }
 * 	}
 *
 * 	type NewType = SpreadDeepWithinObject<Data, ArrayExampleCondition, Value>
 *
 * 	type NewTypeResult = {
 * 		// outer object remains unchanged
 * 		length: number
 * 		inner: {
 * 			a: string
 * 			length: number
 * 			prop1: string // <-- New property
 * 		}
 * 	}
 *
 * @template T - The object type to spread.
 * @template TCondition - The condition type used to determine which properties
 *   to spread.
 * @template TValue - The value type used to spread the properties.
 */

export type SpreadDeepWithinObject<
	T extends object,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>,
> = {
	[K in keyof T]: SpreadDeepObject<T[K], TCondition, TValue>
}
