import { type AnyFunction } from "../types"
import type { GetFunctionType } from "./GetFunctionType"

/**
 * CallbackType<T, TPosition> Extracts a function type from the arguments of a
 * function T, where the function is at a specific position (TPosition) in the
 * argument list.
 *
 * @template T - A function type to extract another function type from.
 * @template TPosition - The position of the target function in the argument
 *   list ('auto' to auto-detect the first function type, or a specific number
 *   for a fixed position).
 * @returns The function type found at position TPosition in the arguments of T.
 */

export type Callbacktype<
	T extends AnyFunction,
	TPosition extends number | "auto" = 0,
> = GetFunctionType<Parameters<T>, TPosition>
