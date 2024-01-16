/**
 * Extracts and returns a modified object path string by removing the last
 * property from the given path.
 *
 * @template TPath - A string type representing an object path (e.g., "a.b.c").
 *
 *   This type works by recursively splitting the path string into two parts (Head
 *   and Tail) using template literal types. It then proceeds to check if the
 *   Tail itself contains a dot ('.'). If it does, it means there are more than
 *   two segments in the path, and the process repeats with the Tail part. If
 *   the Tail doesn't contain a dot, it indicates that we've reached the
 *   second-to-last segment, and the type then resolves to the Head part,
 *   effectively 'popping' the last segment off the path.
 *
 *   It's important to note that this type will resolve to 'never' if the input
 *   string doesn't follow the structure of an object path (i.e., a string with
 *   properties separated by dots).
 *
 *   Examples:
 *
 *   - PopPath<"a.b.c"> will yield "a.b".
 *   - PopPath<"x.y"> will yield "x".
 *   - PopPath<"single"> will yield 'never' as there's no dot to split the string.
 */

export type PopPath<TPath extends string> =
	TPath extends `${infer Head}.${infer Tail}`
		? Tail extends `${string}.${string}`
			? `${Head}.${PopPath<Tail>}`
			: Head
		: never
