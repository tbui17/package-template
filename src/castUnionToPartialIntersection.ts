import { type UnionToPartialIntersection } from "."

export function $P<T extends object>(obj: T) {
	return obj as unknown as UnionToPartialIntersection<T>
}
