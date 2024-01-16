/**
 * NativeObject Represents types that should not be subjected to recursive type
 * operations.
 */
export type NativeObject =
	| Date
	| ((...args: any[]) => any)
	| RegExp
	| Error
	| Buffer
	| Map<any, any>
	| Set<any>



