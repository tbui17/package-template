import { type Spread } from "type-fest"
import type { NativeObject } from "./types"

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

export type RecursiveObjectModification<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>,
	TReplaceOrSpread extends "spread" | "replace",
> = T extends Array<infer U>
	? Array<
			RecursiveObjectModification<U, TCondition, TValue, TReplaceOrSpread>
		>
	: T extends NativeObject
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
