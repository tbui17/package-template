import type { Get, Paths } from "type-fest"
import type { IsUnion } from ".."

/**
 * Extracts the discriminant paths from a nested object type. Discriminant paths
 * are the paths in the object type where the value is a union of discriminant
 * values.
 *
 * @template T - The object type to extract discriminant paths from.
 * @template _Paths - Internal helper type for recursive path extraction.
 * @returns The discriminant paths from the object type.
 */
export type DiscriminantPaths<T, _Paths = Paths<T>> = _Paths extends string
	? IsUnion<Get<T, _Paths>> extends true
		? Get<T, _Paths> extends string
			? _Paths
			: never
		: never
	: never
