import { type RecursiveObjectModification } from "./RecursiveObjectModification"

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
