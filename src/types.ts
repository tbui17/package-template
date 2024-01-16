import { type UnionToIntersection } from "type-fest"

/**
 * GetMethodKeys<T> Extracts the keys of an object T where the value is a
 * function type.
 *
 * @template T - The type to extract method keys from.
 * @returns The keys of T where the value is a function type.
 */
export type GetMethodKeys<T> = {
	[K in keyof T]: T[K] extends AnyFunction ? ExcludeStringValues<T, K> : never
}[keyof T]

/**
 * ExcludeStringValues<T, K> Excludes keys from an object type T where the value
 * type is assignable to string.
 *
 * @template T - The object type to process.
 * @template K - The key to be checked in object T.
 * @returns The key K if its value in T is not a string type; otherwise, never.
 */
export type ExcludeStringValues<T, K extends keyof T> = string extends T[K]
	? never
	: K

/**
 * ExcludeMethods<T> Creates a type with all properties of T excluding those
 * which are functions.
 *
 * @template T - The object type to process.
 * @returns An object type similar to T but without function properties.
 */
export type ExcludeMethods<T> = {
	[K in keyof T as T[K] extends AnyFunction ? never : K]: T[K]
}

/** AnyFunction Represents a function type with any number of arguments. */
export type AnyFunction = (...args: any[]) => any

/**
 * UnionToPartialIntersection<T> Converts a union type of objects to an
 * intersection type of partial objects.
 *
 * @template T - A union type of object types.
 * @returns An intersection type where each type in the union T is made partial.
 */
export type UnionToPartialIntersection<T extends object> = UnionToIntersection<
	Partial<T>
>

/**
 * ExcludeNullable<T> Creates a type by excluding null and undefined from the
 * property types of T.
 *
 * @template T - An object type.
 * @returns An object type where each property of T is non-nullable.
 */
export type ExcludeNullable<T extends Record<string, any>> = {
	[K in keyof T]: NonNullable<T[K]>
}


// https://github.com/type-challenges/type-challenges/issues/1140
/**
 * Checks if a type is a union type.
 *
 * @typeParam T - The type to check.
 * @typeParam C - A candidate type that is a subtype of T.
 * @returns `true` if the type is a union type, `false` otherwise.
 */
export type IsUnion<T, C extends T = T> = (
	T extends T ? (C extends T ? true : unknown) : never
) extends true
	? false
	: true