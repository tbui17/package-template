import { type ReplaceDeep } from "./ReplaceDeep"

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
