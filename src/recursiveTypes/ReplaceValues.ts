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
