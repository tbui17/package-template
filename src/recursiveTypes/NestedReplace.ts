import type { Paths } from "type-fest"

/**
 * Replaces the value at the specified path in the object type T with
 * the provided value.
 *
 * @template T - The object type.
 * @template TPath - The path to the value to be replaced.
 * @template TValue - The type of the value to replace with.
 */
export type NestedReplace<
	T,
	TPath extends Paths<T>,
	TValue,
> = TPath extends keyof T
	? {
			[K in keyof T]: K extends TPath ? TValue : T[K]
		}
	: TPath extends `${infer Head}.${infer Tail}`
		? Head extends keyof T
			? {
					[K in keyof T]: K extends Head
						? NestedReplace<
								T[K],
								Tail extends Paths<T[K]> ? Tail : never,
								TValue
							>
						: T[K]
				}
			: never
		: never
