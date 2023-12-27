# util-types



## GetMethodKeys

\`GetMethodKeys<T>\` - Extracts the keys of an object \`T\` that correspond to methods (functions). It excludes keys where the value is of type string.

## ExcludeStringValues

\`ExcludeStringValues<T, K>\` - Given an object type \`T\` and a key \`K\`, this type excludes keys from \`T\` where the value type is a string.

## ExcludeMethods

\`ExcludeMethods<T>\` - Creates a type from an object type \`T\` by excluding all the keys that correspond to methods (functions).

## AnyFunction

\`AnyFunction\` - Represents a type for any function, regardless of its parameters and return type. Alias for \`(...args: any[]) => any\`.

## UnionToPartialIntersection

\`UnionToPartialIntersection<T>\` - Converts a union type \`T\` of objects into an intersection type. Each member of the intersection is a partial type of the corresponding member in the union. Can be used as an alternative with type casting using `as`

## CallbackParams

\`CallbackParams<T>\` - Extracts the parameter types of a callback function within a higher-order function type \`T\`.

## CallbackType

\`CallbackType<T>\` - Determines the type of a callback function passed to a higher-order function type \`T\`.

## ExcludeNullable

\`ExcludeNullable<T>\` - Constructs a type by making all properties of an object type \`T\` non-nullable.

## ReplaceDeepObject

\`ReplaceDeepObject<T, TCondition, TValue>\` - Recursively replaces properties in an object type \`T\` that match a condition type \`TCondition\` with a new type \`TValue\`.

## RecursiveObjectModification

\`RecursiveObjectModification<T, TCondition, TValue, TReplaceOrSpread>\` - A generic utility for recursively modifying an object type \`T\`. It applies a modification based on a condition \`TCondition\`, replacing or spreading with \`TValue\` depending on \`TReplaceOrSpread\`.

## ReplaceDeep

\`ReplaceDeep<T, TCondition, TValue>\` - Recursively replaces types within an object type \`T\` that match a condition type \`TCondition\` with a new type \`TValue\`.

## ReplaceDeepWithinObject

\`ReplaceDeepWithinObject<T, TCondition, TValue>\` - Similar to \`ReplaceDeep\`, but specifically targets properties within an object type \`T\`.

## ReplaceValues

\`ReplaceValues<T, TCondition, TValue>\` - Replaces the type of properties in an object type \`T\` that match the condition type \`TCondition\` with a new type \`TValue\`.

## SpreadDeepObject

\`SpreadDeepObject<T, TCondition, TValue>\` - A variant of \`RecursiveObjectModification\` that specifically uses the "spread" operation to merge properties of matching condition types with \`TValue\`.

## NotRecursable

\`NotRecursable\` - A type representing values that should not be recursively processed, including \`Date\`, \`AnyFunction\`, \`RegExp\`, \`Error\`, \`Buffer\`, \`Map\`, and \`Set\`.

## SpreadDeep

\`SpreadDeep<T, TCondition, TValue>\` - Recursively spreads properties in an object type \`T\` that match a condition type \`TCondition\` with properties from \`TValue\`.

## OmitObjectFunctions

\`OmitObjectFunctions<T>\` - Constructs a type by omitting function properties from an object type \`T\`.

## NonFunctionPropertyNames

\`NonFunctionPropertyNames<T>\` - Extracts the names of properties from an object type \`T\` that are not functions.