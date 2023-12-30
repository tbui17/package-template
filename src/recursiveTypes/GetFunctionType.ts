import { type AnyFunction } from "../types"

/**
 * GetFunctionType<T, TPosition> Extracts a function type from a tuple T at a
 * specific position (TPosition). If TPosition is 'auto', the type of the first
 * function in the tuple is returned. If TPosition is a number, the function
 * type at that index is returned.
 *
 * @template T - A tuple type (typically the arguments of a function).
 * @template TPosition - The position in the tuple to extract the function type
 *   from ('auto' for the first function type, or a number for a specific
 *   position).
 * @returns The function type at the specified position in the tuple T.
 */

export type GetFunctionType<
	T,
	TPosition extends number | "auto" = 0,
> = TPosition extends "auto"
	? T extends [infer TArg, ...infer TRest]
		? TArg extends (...args: any[]) => any
			? TArg
			: GetFunctionType<TRest>
		: never
	: TPosition extends keyof T
		? T[TPosition] extends AnyFunction
			? T[TPosition]
			: never
		: never
