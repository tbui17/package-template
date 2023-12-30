import type { NativeObject } from "./types"

/**
 * Recursively traverses a type `T`, returning a union of all sub-types that
 * match a specified condition, `TCondition`. `TCondition` is a constraint that
 * extends `Record<string, any>`. The type checks each sub-type of `T` against
 * this constraint. If a sub-type extends `TCondition`, it is included in the
 * resulting union. The type also traverses arrays and objects (except those
 * specified in `NativeObject`) to check their elements or properties.
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
 * The type excludes non-recursable types specified in `NativeObject`, like `Date`, `RegExp`, etc., to prevent irrelevant type inclusions.
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
			? T extends NativeObject
				? T
				: {
						[K in keyof T]: MatchObjectDeep<T[K], TCondition>
					}[keyof T]
			: never
