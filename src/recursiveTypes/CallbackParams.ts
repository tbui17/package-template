/**
 * CallbackParams<T, TPosition> Extracts the parameters of a callback function
 * from a function type T, where the callback function is at a specific position
 * (TPosition) in the argument list.
 *
 * @template T - A function type to extract parameters from.
 * @template TPosition - The position of the callback function in the argument
 *   list ('auto' to auto-detect the first function type, or a specific number
 *   for a fixed position).
 * @returns The parameters of the callback function found at position TPosition
 *   in the arguments of T.
 */

import type { GetFunctionType } from "./GetFunctionType"

export type CallbackParams<
	T,
	TPosition extends number | "auto" = 0,
> = T extends (...args: infer P) => any
	? Parameters<GetFunctionType<P, TPosition>>
	: never
