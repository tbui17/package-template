import type { NativeObject } from ".."

/** Internal */
export type ObjectType<T> = T extends Array<any>
	? never
	: T extends Record<string, any>
		? T extends NativeObject
			? never
			: T
		: never
