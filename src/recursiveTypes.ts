import { type Spread } from "type-fest"

import { type AnyFunction } from "./types"

/**
 * ReplaceDeepObject<T, TCondition, TValue> Recursively replaces objects in T
 * that match TCondition with TValue.
 *
 * See SpreadDeepObject for more details on recursive behavior.
 *
 * @template T - The type to be modified.
 * @template TCondition - The condition used to identify which objects in T
 *   should be replaced.
 * @template TValue - The type to replace the matching objects with.
 * @returns The modified type with objects replaced as specified.
 */
export type ReplaceDeepObject<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>,
> = RecursiveObjectModification<T, TCondition, TValue, "replace">

/**
 * RecursiveObjectModification<T, TCondition, TValue, TReplaceOrSpread> Internal
 * utility type for recursively modifying an object type T.
 *
 * @template T - The type to be modified.
 * @template TCondition - The condition used to identify objects in T for
 *   modification.
 * @template TValue - The type to apply in the modification.
 * @template TReplaceOrSpread - Specifies whether to replace or spread the type.
 * @returns The modified type as per the specified operation.
 */
type RecursiveObjectModification<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>,
	TReplaceOrSpread extends "spread" | "replace",
> = T extends Array<infer U>
	? Array<
			RecursiveObjectModification<U, TCondition, TValue, TReplaceOrSpread>
		>
	: T extends NotRecursable
		? T
		: T extends Record<string, any>
			? T extends TCondition
				? TReplaceOrSpread extends "spread"
					? Spread<T, TValue>
					: TValue
				: {
						[K in keyof T]: RecursiveObjectModification<
							T[K],
							TCondition,
							TValue,
							TReplaceOrSpread
						>
					}
			: T

/**
 * ReplaceDeep<T, TCondition, TValue> Recursively replaces values in type T that
 * match TCondition with TValue.
 *
 * See SpreadDeepObject for more details on recursive behavior.
 *
 * @template T - The type to be modified.
 * @template TCondition - The condition to match for replacement.
 * @template TValue - The type to replace with.
 * @returns The modified type.
 */
export type ReplaceDeep<T, TCondition, TValue> = T extends TCondition
	? TValue
	: T extends Record<string, any>
		? {
				[K in keyof T]: ReplaceDeep<T[K], TCondition, TValue>
			}
		: T

/**
 * ReplaceDeepWithinObject<T, TCondition, TValue> Applies ReplaceDeep to each
 * property of an object type T.
 *
 * See SpreadDeepObject for more details on recursive behavior.
 *
 * Typically used when the condition also applies to the outer object type, but
 * you need to replace values within the object.
 *
 * @template T - An object type.
 * @template TCondition - The condition for replacement.
 * @template TValue - The type to replace with.
 * @returns An object type with modified properties as per ReplaceDeep.
 */
export type ReplaceDeepWithinObject<T extends object, TCondition, TValue> = {
	[K in keyof T]: ReplaceDeep<T[K], TCondition, TValue>
}

/**
 * ReplaceValues<T, TCondition, TValue> Replaces the values of type TCondition
 * in T with TValue.
 *
 * @template T - The type to be modified.
 * @template TCondition - The condition to match for replacement.
 * @template TValue - The type to replace with.
 * @returns The modified type.
 */
export type ReplaceValues<T, TCondition, TValue> = {
	[K in keyof T]: T[K] extends TCondition ? TValue : T[K]
}

/**
 * Recursively traverses a type `T`, returning a union of all sub-types that
 * match a specified condition, `TCondition`. `TCondition` is a constraint that
 * extends `Record<string, any>`. The type checks each sub-type of `T` against
 * this constraint. If a sub-type extends `TCondition`, it is included in the
 * resulting union. The type also traverses arrays and objects (except those
 * specified in `NotRecursable`) to check their elements or properties.
 *
 * @example
 * 	// Define a specific condition type
 * 	type SpecificCondition = { specialKey: string }
 *
 * 	// Example object type to analyze
 * 	type Example = {
 * 		a: number
 * 		b: { specialKey: string; otherKey: number }
 * 		c: { nested: { specialKey: string }; other: number }
 * 		d: string[]
 * 	}
 *
 * 	// Using `MatchObjectDeep`, the result will be a union of `b` and `nested` from `c`,
 * 	// as they are the only sub-types that match `SpecificCondition`.
 * 	type Result = MatchObjectDeep<Example, SpecificCondition>
 * 	type ResultType =
 * 		| {
 * 				specialKey: string
 * 				otherKey: number
 * 		  }
 * 		| {
 * 				specialKey: string
 * 		  }
 *
 * @typeParam T - The type to be recursively analyzed.
 * @typeParam TCondition - The condition type that sub-types of `T` must extend
 *   to be included in the resulting union. Must extend `Record<string, any>`.
 * @note
 * The type excludes non-recursable types specified in `NotRecursable`, like `Date`, `RegExp`, etc., to prevent irrelevant type inclusions.
 */
export type MatchObjectDeep<
	T,
	TCondition extends Record<string, any>,
> = T extends TCondition
	? T
	: T extends Array<infer U>
		? U extends Record<string, any>
			? MatchObjectDeep<U, TCondition>
			: never
		: T extends Record<string, any>
			? T extends NotRecursable
				? T
				: {
						[K in keyof T]: MatchObjectDeep<T[K], TCondition>
					}[keyof T]
			: never

/**
 * Recursively generates a type that mimics spreading object T with object
 * TValue, and replaces (plain) objects within a complex object whose shape
 * matches TCondition.
 *
 * @example
 * 	type DbConfig = {
 * 		host: string
 * 		port: number
 * 		credentials: {
 * 			username: string
 * 			password: string
 * 		}
 * 	}
 *
 * 	type Config = {
 * 		database: DbConfig
 * 		service: {
 * 			gcRun: {
 * 				auth: {
 * 					username: string
 * 					password: string
 * 					key: string
 * 					prop1: string
 * 					prop2: string
 * 				}
 * 			}
 * 		}
 * 		dbConfigs: DbConfig[]
 * 		logging: {
 * 			level: string
 * 			format: "json" | "text"
 * 		}
 * 	}
 *
 * 	type Condition = {
 * 		username: string
 * 		password: string
 * 	}
 *
 * 	type NewProperties = {
 * 		encrypted: boolean
 * 		password: number
 * 	}
 *
 * 	// Using SpreadDeepObject to spread NewProperties onto parts of Config that match Condition
 * 	type UpdatedConfig = SpreadDeepObject<Config, Condition, NewProperties>
 *
 * 	// The resulting type would look like this:
 *
 * 	type UpdatedConfigResult = {
 * 		database: {
 * 			host: string
 * 			port: number
 * 			credentials: {
 * 				username: string
 * 				password: number // <-- Replaced
 * 				encrypted: boolean // <-- New property
 * 			}
 * 		}
 * 		service: {
 * 			gcRun: {
 * 				auth: {
 * 					username: string
 * 					password: number // <-- Replaced
 * 					key: string
 * 					prop1: string
 * 					prop2: string
 * 					encrypted: boolean // <-- New property
 * 				}
 * 			}
 * 		}
 * 		dbConfigs: {
 * 			// Also recurses into arrays
 * 			host: string
 * 			port: number
 * 			credentials: {
 * 				username: string
 * 				password: number // <-- Replaced
 * 				encrypted: boolean // <-- New property
 * 			}
 * 		}[]
 * 		logging: {
 * 			level: string
 * 			format: "json" | "text"
 * 		}
 * 	}
 *
 * @template T - The type to be modified.
 * @template TCondition - The condition used to identify objects for spreading.
 * @template TValue - The type to spread onto the matching objects.
 * @returns The modified type.
 */
export type SpreadDeepObject<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>,
> = RecursiveObjectModification<T, TCondition, TValue, "spread">

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

/**
 * NotRecursable Represents types that should not be subjected to recursive type
 * operations.
 */
type NotRecursable =
	| Date
	| AnyFunction
	| RegExp
	| Error
	| Buffer
	| Map<any, any>
	| Set<any>

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

/**
 * CallbackParams<T, TPosition> Extracts the parameters of a callback function
 * from a function type T, where the callback function is at a specific position
 * (TPosition) in the argument list.
 *
 * @template T - A function type to extract parameters from.
 * @template TPosition - The position of the callback function in the argument
 *   list ('auto' to auto-detect the first function type, or a specific number
 *   for a fixed position).
 * @returns The parameters of the callback function found at position TPosition
 *   in the arguments of T.
 */
export type CallbackParams<
	T,
	TPosition extends number | "auto" = 0,
> = T extends (...args: infer P) => any
	? Parameters<GetFunctionType<P, TPosition>>
	: never

/**
 * CallbackType<T, TPosition> Extracts a function type from the arguments of a
 * function T, where the function is at a specific position (TPosition) in the
 * argument list.
 *
 * @template T - A function type to extract another function type from.
 * @template TPosition - The position of the target function in the argument
 *   list ('auto' to auto-detect the first function type, or a specific number
 *   for a fixed position).
 * @returns The function type found at position TPosition in the arguments of T.
 */
export type Callbacktype<
	T extends AnyFunction,
	TPosition extends number | "auto" = 0,
> = GetFunctionType<Parameters<T>, TPosition>

/**
 * GetFunctionType<T, TPosition> Extracts a function type from a tuple T at a
 * specific position (TPosition). If TPosition is 'auto', the type of the first
 * function in the tuple is returned. If TPosition is a number, the function
 * type at that index is returned.
 *
 * @template T - A tuple type (typically the arguments of a function).
 * @template TPosition - The position in the tuple to extract the function type
 *   from ('auto' for the first function type, or a number for a specific
 *   position).
 * @returns The function type at the specified position in the tuple T.
 */
export type GetFunctionType<
	T,
	TPosition extends number | "auto" = 0,
> = TPosition extends "auto"
	? T extends [infer TArg, ...infer TRest]
		? TArg extends (...args: any[]) => any
			? TArg
			: GetFunctionType<TRest>
		: never
	: TPosition extends keyof T
		? T[TPosition] extends AnyFunction
			? T[TPosition]
			: never
		: never
