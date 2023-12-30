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
