import type { ObjectType } from "./ObjectType"

type Unionify<T> = T extends ObjectType<T> ? T | UnionObjectProps<T> : never

type UnionObjectProps<T> = {
	[K in keyof T]: T[K] extends Array<infer U> ? Unionify<U> : Unionify<T[K]>
}[keyof T]

/** Similar to Flatten, but only extracts objects, not arrays. */
export type ExtractObjectsDeep<T extends object> = (
	T extends Array<infer U>
		? U extends ObjectType<U>
			? UnionObjectProps<U> | U
			: never
		: T extends ObjectType<T>
			? UnionObjectProps<T> | T
			: never
) extends infer V
	? Exclude<V, undefined>
	: never
