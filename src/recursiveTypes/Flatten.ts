import type { NativeObject } from ".."
import { type ObjectType } from "./ObjectType"

type Unionify<T> = T extends Array<infer U>
	? T | Unionify<U>
	: T extends Record<string, any>
		? T extends NativeObject
			? never
			: T | UnionObjectProps<T>
		: never

type UnionObjectProps<T extends Record<string, any>> = {
	[K in keyof T]: Unionify<T[K]>
}[keyof T]

/**
 * Creates a union type of all possible recursive child nodes (arrays and
 * objects) of an object type T. Also includes T itself if it is not an array or native object type. Does not recurse into native objects.
 */
export type Flatten<T extends object> = (
	T extends Array<infer U>
		? U extends ObjectType<U>
			? UnionObjectProps<U> | U
			: never
		: T extends ObjectType<T>
			? UnionObjectProps<T> | T
			: never
) extends infer V // https://stackoverflow.com/questions/73629302/how-to-improve-typescripts-performance-in-the-following-scenario
	? Exclude<V, undefined>
	: never
