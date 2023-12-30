import { type RecursiveObjectModification } from "./RecursiveObjectModification"

/**
 * Recursively generates a type that mimics spreading object T with object
 * TValue, and replaces (plain) objects within a complex object whose shape
 * matches TCondition.
 *
 * @example
 * 	type DbConfig = {
 * 		host: string
 * 		port: number
 * 		credentials: {
 * 			username: string
 * 			password: string
 * 		}
 * 	}
 *
 * 	type Config = {
 * 		database: DbConfig
 * 		service: {
 * 			gcRun: {
 * 				auth: {
 * 					username: string
 * 					password: string
 * 					key: string
 * 					prop1: string
 * 					prop2: string
 * 				}
 * 			}
 * 		}
 * 		dbConfigs: DbConfig[]
 * 		logging: {
 * 			level: string
 * 			format: "json" | "text"
 * 		}
 * 	}
 *
 * 	type Condition = {
 * 		username: string
 * 		password: string
 * 	}
 *
 * 	type NewProperties = {
 * 		encrypted: boolean
 * 		password: number
 * 	}
 *
 * 	// Using SpreadDeepObject to spread NewProperties onto parts of Config that match Condition
 * 	type UpdatedConfig = SpreadDeepObject<Config, Condition, NewProperties>
 *
 * 	// The resulting type would look like this:
 *
 * 	type UpdatedConfigResult = {
 * 		database: {
 * 			host: string
 * 			port: number
 * 			credentials: {
 * 				username: string
 * 				password: number // <-- Replaced
 * 				encrypted: boolean // <-- New property
 * 			}
 * 		}
 * 		service: {
 * 			gcRun: {
 * 				auth: {
 * 					username: string
 * 					password: number // <-- Replaced
 * 					key: string
 * 					prop1: string
 * 					prop2: string
 * 					encrypted: boolean // <-- New property
 * 				}
 * 			}
 * 		}
 * 		dbConfigs: {
 * 			// Also recurses into arrays
 * 			host: string
 * 			port: number
 * 			credentials: {
 * 				username: string
 * 				password: number // <-- Replaced
 * 				encrypted: boolean // <-- New property
 * 			}
 * 		}[]
 * 		logging: {
 * 			level: string
 * 			format: "json" | "text"
 * 		}
 * 	}
 *
 * @template T - The type to be modified.
 * @template TCondition - The condition used to identify objects for spreading.
 * @template TValue - The type to spread onto the matching objects.
 * @returns The modified type.
 */

export type SpreadDeepObject<
	T,
	TCondition extends Record<string, any>,
	TValue extends Record<string, any>,
> = RecursiveObjectModification<T, TCondition, TValue, "spread">
