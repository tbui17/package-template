import { type UnionToIntersection } from "type-fest"

export type GetMethodKeys<T> = {
	[K in keyof T]: T[K] extends AnyFunction ? ExcludeStringValues<T, K> : never
}[keyof T]
export type ExcludeStringValues<T, K extends keyof T> = string extends T[K]
	? never
	: K
export type ExcludeMethods<T> = {
	[K in keyof T as T[K] extends AnyFunction ? never : K]: T[K]
}
export type AnyFunction = (...args: any[]) => any

export type UnionToPartialIntersection<T extends object> = UnionToIntersection<
	Partial<T>
>

export type CallbackParams<T> = T extends (fn: (...args: infer P) => any) => any
	? P
	: never

export type CallbackType<T> = T extends (fn: infer P) => any
	? P extends (...args: any[]) => any
		? P
		: never
	: never

export type ExcludeNullable<T extends Record<string, any>> = {
	[K in keyof T]: NonNullable<T[K]>
}
