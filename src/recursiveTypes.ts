import { type Spread } from "type-fest"

import { type AnyFunction } from "./types"

export type ReplaceDeepObject<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>
> = RecursiveObjectModification<T, TCondition, TValue, "replace">

export type RecursiveObjectModification<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>,
	TReplaceOrSpread extends "spread" | "replace"
> = T extends Array<infer U>
	? Array<
			RecursiveObjectModification<U, TCondition, TValue, TReplaceOrSpread>
	  >
	: T extends NotRecursable
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
export type ReplaceDeep<T, TCondition, TValue> = T extends TCondition
	? TValue
	: T extends Record<string, any>
	? {
			[K in keyof T]: ReplaceDeep<T[K], TCondition, TValue>
	  }
	: T

export type ReplaceDeepWithinObject<T extends object, TCondition, TValue> = {
	[K in keyof T]: ReplaceDeep<T[K], TCondition, TValue>
}
export type ReplaceValues<T, TCondition, TValue> = {
	[K in keyof T]: T[K] extends TCondition ? TValue : T[K]
}
export type SpreadDeepObject<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>
> = RecursiveObjectModification<T, TCondition, TValue, "spread">

export type NotRecursable =
	| Date
	| AnyFunction
	| RegExp
	| Error
	| Buffer
	| Map<any, any>
	| Set<any>
export type SpreadDeep<T, TCondition, TValue> = {
	[K in keyof T]: T[K] extends TCondition ? T[K] & TValue : T[K]
}
export type OmitObjectFunctions<T> = T extends Date
	? T
	: T extends object
	? T extends Array<infer U>
		? Array<OmitObjectFunctions<U>>
		: T extends AnyFunction
		? never
		: {
				[K in NonFunctionPropertyNames<T>]: OmitObjectFunctions<T[K]>
		  }
	: T
export type NonFunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends AnyFunction ? never : K
}[keyof T]
