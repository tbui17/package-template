/**
 * Returns the last segment of a dot-separated path.
 *
 * @template TPath - The type of the path.
 * @param {TPath} path - The dot-separated path.
 * @returns {LastPath<TPath>} - The last segment of the path.
 */
export type LastPath<TPath extends string> =
	TPath extends `${string}.${infer Tail}` ? LastPath<Tail> : TPath
