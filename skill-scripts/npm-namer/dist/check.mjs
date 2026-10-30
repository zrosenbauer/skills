#!/usr/bin/env node
// AUTO-GENERATED bundle from skill-scripts/npm-namer/src/check.mjs — do not edit by hand.
// Run `pnpm --filter @zrosenbauer/skill-scripts-npm-namer build` to regenerate.
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
// \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
// ../../node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/predicate/isNil.mjs
/**
* Checks if a given value is null or undefined.
*
* This function tests whether the provided value is either `null` or `undefined`.
* It returns `true` if the value is `null` or `undefined`, and `false` otherwise.
*
* This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `null` or `undefined`.
*
* @param x - The value to test for null or undefined.
* @returns `true` if the value is null or undefined, `false` otherwise.
*
* @example
* const value1 = null;
* const value2 = undefined;
* const value3 = 42;
* const result1 = isNil(value1); // true
* const result2 = isNil(value2); // true
* const result3 = isNil(value3); // false
*/
function isNil(x) {
	return x == null;
}
// ../../node_modules/.pnpm/ts-pattern@5.9.2/node_modules/ts-pattern/dist/index.js
const t = Symbol.for("@ts-pattern/matcher");
const e = Symbol.for("@ts-pattern/isVariadic");
const n = "@ts-pattern/anonymous-select-key";
const r = (t) => Boolean(t && "object" == typeof t);
const i = (e) => e && !!e[t];
const o = (n, s, c) => {
	if (i(n)) {
		const { matched: r, selections: i } = n[t]().match(s);
		return r && i && Object.keys(i).forEach((t) => c(t, i[t])), r;
	}
	if (r(n)) {
		if (!r(s)) return !1;
		if (Array.isArray(n)) {
			if (!Array.isArray(s)) return !1;
			let t = [], r = [], u = [];
			for (const o of n.keys()) {
				const s = n[o];
				i(s) && s[e] ? u.push(s) : u.length ? r.push(s) : t.push(s);
			}
			if (u.length) {
				if (u.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
				if (s.length < t.length + r.length) return !1;
				const e = s.slice(0, t.length), n = 0 === r.length ? [] : s.slice(-r.length), i = s.slice(t.length, 0 === r.length ? Infinity : -r.length);
				return t.every((t, n) => o(t, e[n], c)) && r.every((t, e) => o(t, n[e], c)) && (0 === u.length || o(u[0], i, c));
			}
			return n.length === s.length && n.every((t, e) => o(t, s[e], c));
		}
		return Reflect.ownKeys(n).every((e) => {
			const r = n[e];
			return (e in s || i(u = r) && "optional" === u[t]().matcherType) && o(r, s[e], c);
			var u;
		});
	}
	return Object.is(s, n);
};
const s = (e) => {
	var n, o, u;
	return r(e) ? i(e) ? null != (n = null == (o = (u = e[t]()).getSelectionKeys) ? void 0 : o.call(u)) ? n : [] : Array.isArray(e) ? c(e, s) : c(Object.values(e), s) : [];
};
const c = (t, e) => t.reduce((t, n) => t.concat(e(n)), []);
function u(...t) {
	if (1 === t.length) {
		const [e] = t;
		return (t) => o(e, t, () => {});
	}
	if (2 === t.length) {
		const [e, n] = t;
		return o(e, n, () => {});
	}
	throw new Error(`isMatching wasn't given the right number of arguments: expected 1 or 2, received ${t.length}.`);
}
function a(t) {
	return Object.assign(t, {
		optional: () => h(t),
		and: (e) => d(t, e),
		or: (e) => y(t, e),
		select: (e) => void 0 === e ? v(t) : v(e, t)
	});
}
function l(t) {
	return Object.assign(((t) => Object.assign(t, { [Symbol.iterator]() {
		let n = 0;
		const r = [{
			value: Object.assign(t, { [e]: !0 }),
			done: !1
		}, {
			done: !0,
			value: void 0
		}];
		return { next: () => {
			var t;
			return null != (t = r[n++]) ? t : r.at(-1);
		} };
	} }))(t), {
		optional: () => l(h(t)),
		select: (e) => l(void 0 === e ? v(t) : v(e, t))
	});
}
function h(e) {
	return a({ [t]: () => ({
		match: (t) => {
			let n = {};
			const r = (t, e) => {
				n[t] = e;
			};
			return void 0 === t ? (s(e).forEach((t) => r(t, void 0)), {
				matched: !0,
				selections: n
			}) : {
				matched: o(e, t, r),
				selections: n
			};
		},
		getSelectionKeys: () => s(e),
		matcherType: "optional"
	}) });
}
const f = (t, e) => {
	for (const n of t) if (!e(n)) return !1;
	return !0;
};
const g = (t, e) => {
	for (const [n, r] of t.entries()) if (!e(r, n)) return !1;
	return !0;
};
const m = (t, e) => {
	const n = Reflect.ownKeys(t);
	for (const r of n) if (!e(r, t[r])) return !1;
	return !0;
};
function d(...e) {
	return a({ [t]: () => ({
		match: (t) => {
			let n = {};
			const r = (t, e) => {
				n[t] = e;
			};
			return {
				matched: e.every((e) => o(e, t, r)),
				selections: n
			};
		},
		getSelectionKeys: () => c(e, s),
		matcherType: "and"
	}) });
}
function y(...e) {
	return a({ [t]: () => ({
		match: (t) => {
			let n = {};
			const r = (t, e) => {
				n[t] = e;
			};
			return c(e, s).forEach((t) => r(t, void 0)), {
				matched: e.some((e) => o(e, t, r)),
				selections: n
			};
		},
		getSelectionKeys: () => c(e, s),
		matcherType: "or"
	}) });
}
function p(e) {
	return { [t]: () => ({ match: (t) => ({ matched: Boolean(e(t)) }) }) };
}
function v(...e) {
	const r = "string" == typeof e[0] ? e[0] : void 0, i = 2 === e.length ? e[1] : "string" == typeof e[0] ? void 0 : e[0];
	return a({ [t]: () => ({
		match: (t) => {
			let e = { [null != r ? r : n]: t };
			return {
				matched: void 0 === i || o(i, t, (t, n) => {
					e[t] = n;
				}),
				selections: e
			};
		},
		getSelectionKeys: () => [null != r ? r : n].concat(void 0 === i ? [] : s(i))
	}) });
}
function b(t) {
	return !0;
}
function w(t) {
	return "number" == typeof t;
}
function S(t) {
	return "string" == typeof t;
}
function j(t) {
	return "bigint" == typeof t;
}
const K = a(p(b));
const O = a(p(b));
const E = K;
const x = (t) => Object.assign(a(t), {
	startsWith: (e) => {
		return x(d(t, (n = e, p((t) => S(t) && t.startsWith(n)))));
		var n;
	},
	endsWith: (e) => {
		return x(d(t, (n = e, p((t) => S(t) && t.endsWith(n)))));
		var n;
	},
	minLength: (e) => x(d(t, ((t) => p((e) => S(e) && e.length >= t))(e))),
	length: (e) => x(d(t, ((t) => p((e) => S(e) && e.length === t))(e))),
	maxLength: (e) => x(d(t, ((t) => p((e) => S(e) && e.length <= t))(e))),
	includes: (e) => {
		return x(d(t, (n = e, p((t) => S(t) && t.includes(n)))));
		var n;
	},
	regex: (e) => {
		return x(d(t, (n = e, p((t) => S(t) && Boolean(t.match(n))))));
		var n;
	}
});
const A = x(p(S));
const N = (t) => Object.assign(a(t), {
	between: (e, n) => N(d(t, ((t, e) => p((n) => w(n) && t <= n && e >= n))(e, n))),
	lt: (e) => N(d(t, ((t) => p((e) => w(e) && e < t))(e))),
	gt: (e) => N(d(t, ((t) => p((e) => w(e) && e > t))(e))),
	lte: (e) => N(d(t, ((t) => p((e) => w(e) && e <= t))(e))),
	gte: (e) => N(d(t, ((t) => p((e) => w(e) && e >= t))(e))),
	int: () => N(d(t, p((t) => w(t) && Number.isInteger(t)))),
	finite: () => N(d(t, p((t) => w(t) && Number.isFinite(t)))),
	positive: () => N(d(t, p((t) => w(t) && t > 0))),
	negative: () => N(d(t, p((t) => w(t) && t < 0)))
});
const P = N(p(w));
const k = (t) => Object.assign(a(t), {
	between: (e, n) => k(d(t, ((t, e) => p((n) => j(n) && t <= n && e >= n))(e, n))),
	lt: (e) => k(d(t, ((t) => p((e) => j(e) && e < t))(e))),
	gt: (e) => k(d(t, ((t) => p((e) => j(e) && e > t))(e))),
	lte: (e) => k(d(t, ((t) => p((e) => j(e) && e <= t))(e))),
	gte: (e) => k(d(t, ((t) => p((e) => j(e) && e >= t))(e))),
	positive: () => k(d(t, p((t) => j(t) && t > 0))),
	negative: () => k(d(t, p((t) => j(t) && t < 0)))
});
var z = {
	__proto__: null,
	matcher: t,
	optional: h,
	array: function(...e) {
		return l({ [t]: () => ({
			match: (t) => {
				if (!Array.isArray(t)) return { matched: !1 };
				if (0 === e.length) return { matched: !0 };
				const n = e[0];
				let r = {};
				if (0 === t.length) return s(n).forEach((t) => {
					r[t] = [];
				}), {
					matched: !0,
					selections: r
				};
				const i = (t, e) => {
					r[t] = (r[t] || []).concat([e]);
				};
				return {
					matched: t.every((t) => o(n, t, i)),
					selections: r
				};
			},
			getSelectionKeys: () => 0 === e.length ? [] : s(e[0])
		}) });
	},
	set: function(...e) {
		return a({ [t]: () => ({
			match: (t) => {
				if (!(t instanceof Set)) return { matched: !1 };
				let n = {};
				if (0 === t.size) return {
					matched: !0,
					selections: n
				};
				if (0 === e.length) return { matched: !0 };
				const r = (t, e) => {
					n[t] = (n[t] || []).concat([e]);
				}, i = e[0];
				return {
					matched: f(t, (t) => o(i, t, r)),
					selections: n
				};
			},
			getSelectionKeys: () => 0 === e.length ? [] : s(e[0])
		}) });
	},
	map: function(...e) {
		return a({ [t]: () => ({
			match: (t) => {
				if (!(t instanceof Map)) return { matched: !1 };
				let n = {};
				if (0 === t.size) return {
					matched: !0,
					selections: n
				};
				const r = (t, e) => {
					n[t] = (n[t] || []).concat([e]);
				};
				if (0 === e.length) return { matched: !0 };
				var i;
				if (1 === e.length) throw new Error(`\`P.map\` wasn't given enough arguments. Expected (key, value), received ${null == (i = e[0]) ? void 0 : i.toString()}`);
				const [s, c] = e;
				return {
					matched: g(t, (t, e) => {
						const n = o(s, e, r), i = o(c, t, r);
						return n && i;
					}),
					selections: n
				};
			},
			getSelectionKeys: () => 0 === e.length ? [] : [...s(e[0]), ...s(e[1])]
		}) });
	},
	record: function(...e) {
		return a({ [t]: () => ({
			match: (t) => {
				if (null === t || "object" != typeof t || Array.isArray(t)) return { matched: !1 };
				var n;
				if (0 === e.length) throw new Error(`\`P.record\` wasn't given enough arguments. Expected (value) or (key, value), received ${null == (n = e[0]) ? void 0 : n.toString()}`);
				let r = {};
				const i = (t, e) => {
					r[t] = (r[t] || []).concat([e]);
				}, [s, c] = 1 === e.length ? [A, e[0]] : e;
				return {
					matched: m(t, (t, e) => {
						const n = "string" != typeof t || Number.isNaN(Number(t)) ? null : Number(t), r = null !== n && o(s, n, i), u = o(s, t, i), a = o(c, e, i);
						return (u || r) && a;
					}),
					selections: r
				};
			},
			getSelectionKeys: () => 0 === e.length ? [] : [...s(e[0]), ...s(e[1])]
		}) });
	},
	intersection: d,
	union: y,
	not: function(e) {
		return a({ [t]: () => ({
			match: (t) => ({ matched: !o(e, t, () => {}) }),
			getSelectionKeys: () => [],
			matcherType: "not"
		}) });
	},
	when: p,
	select: v,
	any: K,
	unknown: O,
	_: E,
	string: A,
	number: P,
	bigint: k(p(j)),
	boolean: a(p(function(t) {
		return "boolean" == typeof t;
	})),
	symbol: a(p(function(t) {
		return "symbol" == typeof t;
	})),
	nullish: a(p(function(t) {
		return null == t;
	})),
	nonNullable: a(p(function(t) {
		return null != t;
	})),
	instanceOf: function(t) {
		return a(p(function(t) {
			return (e) => e instanceof t;
		}(t)));
	},
	shape: function(t) {
		return a(p(u(t)));
	}
};
var I = class extends Error {
	constructor(t) {
		let e;
		try {
			e = JSON.stringify(t);
		} catch (n) {
			e = t;
		}
		super(`Pattern matching error: no pattern matches value ${e}`), this.input = void 0, this.input = t;
	}
};
const L = {
	matched: !1,
	value: void 0
};
function M(t) {
	return new R(t, L);
}
var R = class R {
	constructor(t, e) {
		this.input = void 0, this.state = void 0, this.input = t, this.state = e;
	}
	with(...t) {
		if (this.state.matched) return this;
		const e = t[t.length - 1], r = [t[0]];
		let i;
		3 === t.length && "function" == typeof t[1] ? i = t[1] : t.length > 2 && r.push(...t.slice(1, t.length - 1));
		let s = !1, c = {};
		const u = (t, e) => {
			s = !0, c[t] = e;
		}, a = !r.some((t) => o(t, this.input, u)) || i && !Boolean(i(this.input)) ? L : {
			matched: !0,
			value: e(s ? n in c ? c[n] : c : this.input, this.input)
		};
		return new R(this.input, a);
	}
	when(t, e) {
		if (this.state.matched) return this;
		const n = Boolean(t(this.input));
		return new R(this.input, n ? {
			matched: !0,
			value: e(this.input, this.input)
		} : L);
	}
	otherwise(t) {
		return this.state.matched ? this.state.value : t(this.input);
	}
	exhaustive(t = F) {
		return this.state.matched ? this.state.value : t(this.input);
	}
	run() {
		return this.exhaustive();
	}
	returnType() {
		return this;
	}
	narrow() {
		return this;
	}
};
function F(t) {
	throw new I(t);
}
// ../../node_modules/.pnpm/massaman@0.5.5/node_modules/massaman/dist/control-BlL7TmA7.mjs
/**
* Checks whether a value exposes the required structural `Error` fields.
* @param value - The value to inspect
* @returns Whether the value has string `name` and `message` fields
* @private
*/
function isErrorLike(value) {
	return typeof value === "object" && !isNil(value) && "name" in value && typeof value.name === "string" && "message" in value && typeof value.message === "string";
}
/**
* Minimal error coercion used internally by `err()`. Kept local to avoid
* pulling the full conversion module into the `massaman/control` bundle.
*/
function coerceError(thrown) {
	if (thrown instanceof Error) return thrown;
	if (isErrorLike(thrown)) return Object.defineProperties(new Error(thrown.message, { cause: thrown }), Object.getOwnPropertyDescriptors(thrown));
	if (typeof thrown === "string") return new Error(thrown);
	try {
		const message = JSON.stringify(thrown) ?? String(thrown);
		return new Error(message, { cause: thrown });
	} catch {
		return new Error(String(thrown), { cause: thrown });
	}
}
/**
* Creates a success result wrapping the given value.
*
* @param value - The success value
* @returns An `Ok` result containing the value
*
* @example
* ```ts
* const result = ok(42)
* // { ok: true, value: 42 }
* ```
*/
function ok(value) {
	return {
		ok: true,
		value,
		error: null
	};
}
function err(error) {
	return {
		ok: false,
		value: null,
		error: coerceError(error)
	};
}
/**
* Type guard that narrows a `Result` to `Ok`.
*
* @param result - The result to check
* @returns `true` if the result is `Ok`
*
* @example
* ```ts
* const result = attempt(() => JSON.parse('{}'))
* if (isOk(result)) {
*   console.log(result.value)
* }
* ```
*/
function isOk(result) {
	return result.ok === true;
}
/**
* Type guard that narrows a `Result` to `Err`.
*
* @param result - The result to check
* @returns `true` if the result is `Err`
*
* @example
* ```ts
* const result = attempt(() => JSON.parse('bad'))
* if (isErr(result)) {
*   console.error(result.error)
* }
* ```
*/
function isErr(result) {
	return result.ok === false;
}
/**
* Executes a synchronous function and wraps the outcome in a `Result`.
* Returns `Ok` with the return value on success, `Err` with the thrown value on failure.
*
* @param fn - The function to execute
* @returns A `Result` containing either the value or the error
*
* @example
* ```ts
* const result = attempt(() => JSON.parse('{"a":1}'))
* if (isOk(result)) {
*   console.log(result.value) // { a: 1 }
* }
* ```
*/
function attempt(fn) {
	try {
		return ok(fn());
	} catch (error) {
		return err(error);
	}
}
// ../../node_modules/.pnpm/massaman@0.5.5/node_modules/massaman/dist/match-fBetfaIa.mjs
/**
* Extends ts-pattern's `P` namespace with `P.ok()` and `P.err()` — pattern
* factories for matching a `Result` and its contained value or error.
*
* Mirrors Rust's `Ok(value)` / `Err(error)` match arms, but uses the
* namespace-method form (`P.ok()` / `P.err()`) so it doesn't collide with
* the lowercase `ok()` / `err()` constructors from `massaman/control`.
*
* @example
* ```ts
* import { match, P, attempt } from 'massaman'
*
* match(attempt(() => JSON.parse(raw)))
*   .with(P.ok(), ({ value }) => use(value))
*   .with(P.err(), ({ error }) => log(error))
*   .exhaustive()
* ```
*/
function okPattern(...patterns) {
	return M(patterns).with([], () => ({ ok: true })).otherwise(([pattern]) => ({
		ok: true,
		value: pattern
	}));
}
function errPattern(...patterns) {
	return M(patterns).with([], () => ({ ok: false })).otherwise(([pattern]) => ({
		ok: false,
		error: pattern
	}));
}
/**
* Extended ts-pattern `P` namespace. Carries everything ts-pattern exports
* (`P.string`, `P.number`, `P.array`, `P.when`, …) plus `P.ok()` / `P.err()`
* for matching `Result` values and their contents.
*
* For the `P.Pattern<T>` type shorthand, import `Pattern` standalone from
* `massaman/match` — it's the form ts-pattern's own docs recommend.
*/
const P$1 = {
	...z,
	ok: okPattern,
	err: errPattern
};
/** npm registry base URL; overridable via NPM_REGISTRY_URL env. */
const DEFAULT_REGISTRY_BASE = process.env.NPM_REGISTRY_URL || "https://registry.npmjs.org";
const MONIKER_2INSERT_CAP_MAX_DEFAULT = 1500;
const MONIKER_2INSERT_CAP_MAX_EXHAUSTIVE = 5e3;
// src/corpus.mjs
const HERE = dirname(fileURLToPath(import.meta.url));
/**
* @typedef {Object} Corpus
* @property {string} source - provenance string, e.g. "nice-registry/download-counts"
* @property {string} [sourceVersion]
* @property {string} generated - ISO date the snapshot was built
* @property {number} size - corpus name count
* @property {string[]} names - unscoped package names, descending by downloads
*/
let cache = null;
/**
* Try the same-dir and parent-dir locations for `popular-names.json`. Both
* the built bundle (`dist/check.mjs`) and the unbundled source live one
* level below the canonical JSON file's location.
*
* @returns {string[]}
*/
function candidatePaths() {
	return [join(HERE, "..", "popular-names.json"), join(HERE, "popular-names.json")];
}
/**
* Load the popular-names corpus. Returns Ok(corpus) on success, Err on a
* read or parse failure. Result is cached after the first Ok; Err results
* are not cached so transient failures can be retried.
*
* @returns {import('massaman').Result<Corpus, Error>}
* @example
* const result = loadCorpus()
* if (isOk(result)) for (const name of result.value.names) { … }
*/
function loadCorpus() {
	if (cache && cache.ok) return cache;
	for (const path of candidatePaths()) {
		const read = attempt(() => readFileSync(path, "utf8"));
		if (!read.ok) continue;
		const parsed = attempt(() => JSON.parse(read.value));
		if (!parsed.ok) {
			cache = err(/* @__PURE__ */ new Error(`popular-names.json at ${path} is malformed: ${parsed.error.message}`));
			return cache;
		}
		const shapeError = validateShape(parsed.value, path);
		if (shapeError) {
			cache = err(shapeError);
			return cache;
		}
		cache = ok(parsed.value);
		return cache;
	}
	cache = err(/* @__PURE__ */ new Error(`popular-names.json not found in any of: ${candidatePaths().join(", ")}`));
	return cache;
}
/**
* Confirm the parsed JSON has the shape `Corpus` expects. Returns an
* Error describing the first missing field, or null if the shape is valid.
*
* @param {unknown} value
* @param {string} path
* @returns {Error | null}
* @private
*/
function validateShape(value, path) {
	if (!value || typeof value !== "object") return /* @__PURE__ */ new Error(`popular-names.json at ${path} is not an object`);
	for (const [field, expectedType] of Object.entries({
		source: "string",
		generated: "string",
		names: "array"
	})) {
		const actual = value[field];
		if (!(expectedType === "array" ? Array.isArray(actual) : typeof actual === expectedType)) return /* @__PURE__ */ new Error(`popular-names.json at ${path} missing or wrong-typed field "${field}" (expected ${expectedType})`);
	}
	if (value.names.length === 0) return /* @__PURE__ */ new Error(`popular-names.json at ${path} has an empty names array`);
	const badEntry = value.names.findIndex((name) => typeof name !== "string" || !name);
	if (badEntry >= 0) return /* @__PURE__ */ new Error(`popular-names.json at ${path} has a non-string or empty entry at index ${badEntry}`);
	if (typeof value.size === "number" && value.size !== value.names.length) return /* @__PURE__ */ new Error(`popular-names.json at ${path}: size field (${value.size}) doesn't match names.length (${value.names.length})`);
	return null;
}
// src/permute.mjs
const DEFAULT_PREFIXES = [
	"tiny",
	"mini",
	"pico",
	"nano",
	"lite",
	"micro",
	"fast",
	"lean",
	"quick",
	"slim",
	"pure",
	"super",
	"ultra",
	"meta",
	"auto",
	"smart"
];
const DEFAULT_SUFFIXES = [
	"js",
	"ts",
	"lib",
	"kit",
	"core",
	"pro",
	"cli",
	"tools",
	"utils",
	"forge",
	"smith",
	"craft",
	"lab",
	"box",
	"engine",
	"studio"
];
const CONNECTORS = ["", "-"];
/**
* @typedef {Object} PermuteOptions
* @property {string[]} [prefixes] - override default prefix list
* @property {string[]} [suffixes] - override default suffix list
* @property {string[]} [connectors] - separators between parts (default: '', '-')
* @property {boolean} [shouldIncludeUnderscore] - also use '_' as a connector (default: false)
* @property {boolean} [shouldCombineTwoSeeds] - join pairs of seeds (default: true)
* @property {string} [scope] - if set, also emit `@scope/<name>` variants
*/
/**
* Generate package name candidates from seed words.
*
* For seeds=['tiny','log'], produces things like:
*   log, tiny, tinylog, tiny-log, mini-log, nano-log, log-cli, logjs, ...
*
* Output is deduplicated; order is roughly: bare seeds, two-seed combos,
* prefix+seed, seed+suffix. Caller applies any limit.
*
* @param {string[]} seeds
* @param {PermuteOptions} [opts]
* @returns {string[]}
* @example
* permute(['log'])                              // ['log', 'tiny-log', 'tinylog', …]
* permute(['log'], { scope: '@me' })            // ['@me/log', '@me/tiny-log', …]
* permute(['log'], { prefixes: ['ultra'] })     // ['log', 'ultra-log', 'ultralog', …]
*/
function permute(seeds, opts = {}) {
	if (!Array.isArray(seeds) || seeds.length === 0) return [];
	const prefixes = opts.prefixes ?? DEFAULT_PREFIXES;
	const suffixes = opts.suffixes ?? DEFAULT_SUFFIXES;
	const connectors = opts.connectors ?? (opts.shouldIncludeUnderscore ? [...CONNECTORS, "_"] : CONNECTORS);
	const shouldCombineTwoSeeds = opts.shouldCombineTwoSeeds !== false;
	const scope = opts.scope;
	const cleaned = seeds.map((s) => String(s).trim().toLowerCase()).filter((s) => s.length > 0 && /^[a-z0-9]+$/.test(s));
	const out = /* @__PURE__ */ new Set();
	for (const s of cleaned) out.add(s);
	if (shouldCombineTwoSeeds) for (const a of cleaned) for (const b of cleaned) {
		if (a === b) continue;
		for (const sep of connectors) out.add(a + sep + b);
	}
	for (const p of prefixes) for (const s of cleaned) {
		if (p === s) continue;
		for (const sep of connectors) out.add(p + sep + s);
	}
	for (const s of cleaned) for (const sf of suffixes) {
		if (sf === s) continue;
		for (const sep of connectors) out.add(s + sep + sf);
	}
	let names = [...out];
	if (scope) names = names.map((n) => `${scope}/${n}`);
	return names;
}
/**
* Score a candidate name for ranking. Lower is better.
*   - shorter names rank lower (preferred)
*   - hyphenated names rank lower than concatenated (more readable)
*   - names containing a seed rank lower (anchor relevance)
*
* @param {string} name
* @param {string[]} seeds
* @returns {number}
* @example
* score('log')                       // 3
* score('tiny-log', ['log'])         // 8 - 2 (hyphen) - 3 (contains seed) = 3
* score('logger_pro', ['log'])       // 10 + 1 (underscore) - 3 (contains seed) = 8
*/
function score(name, seeds = []) {
	const lower = name.toLowerCase();
	let result = lower.length;
	if (lower.includes("-")) result -= 2;
	if (lower.includes("_")) result += 1;
	for (const seed of seeds) if (lower.includes(seed.toLowerCase())) {
		result -= 3;
		break;
	}
	return result;
}
// src/moniker.mjs
const SEPARATORS = [
	"-",
	"_",
	"."
];
/**
* Normalize a name the way npm's moniker collision check does: lowercase
* and strip the punctuation chars `.`, `-`, `_`. Scoped names keep their
* scope segment.
*
* **ASCII precondition.** This mirrors npm's server-side rule exactly, which
* predates Unicode-aware normalization. Names with Unicode (e.g. `İ` → `i̇`
* in some locales, `ß` → `ss`) are *not* canonicalized here; they're already
* rejected upstream by `validate-npm-package-name`'s URL-safety check. If
* non-ASCII slips through, equivalence may not match the registry's behavior.
*
* Returns `''` for non-string / empty input so callers can branch without
* a separate guard.
*
* @param {unknown} name
* @returns {string}
* @example
* normalize('Pico-Log')         // 'picolog'
* normalize('js-on-stream')     // 'jsonstream'  (collides with `jsonstream`)
* normalize('@Zac/Pico-Log')    // '@zac/picolog'
* normalize(null)               // ''
*/
function normalize(name) {
	if (typeof name !== "string" || !name) return "";
	if (name.startsWith("@")) {
		const slash = name.indexOf("/");
		if (slash < 0) return name.toLowerCase();
		return name.slice(0, slash + 1).toLowerCase() + name.slice(slash + 1).toLowerCase().replace(/[._-]/g, "");
	}
	return name.toLowerCase().replace(/[._-]/g, "");
}
/**
* Reject inputs containing whitespace or ASCII control bytes. The check is
* written as a code-point loop rather than a regex with control chars so
* the source file stays free of literal control bytes (which would also
* trip oxlint's no-control-regex rule).
*
* @param {string} name
* @returns {boolean}
* @private
*/
function hasInvalidChars(name) {
	for (let i = 0; i < name.length; i++) {
		const code = name.charCodeAt(i);
		if (code <= 32 || code === 127) return true;
	}
	return false;
}
/**
* Generate names that share the candidate's normalized form. The caller
* queries each variant against the registry to detect collisions. The
* 2-insertion cap scales with name length so longer multi-morpheme names
* (`reactnativenavigation` → `react-native-navigation`) reach their
* realistic morpheme splits before the cap exhausts.
*
* Boundary guards reject inputs `validateName` would also reject — keeping
* this function honest when called in isolation rather than relying on
* upstream filtering.
*
* @param {string} name
* @param {{ isExhaustive?: boolean }} [opts] - widens 2-insertion coverage
* @returns {string[]}
* @example
* variants('picolog')           // ['pico-log', 'pico_log', 'pico.log', 'p-icolog', …]
* variants('jsonstream').includes('js-on-stream')                    // true (canonical blog example)
* variants('reactnativenavigation').includes('react-native-navigation') // true (long-name morpheme split)
*/
function variants(name, opts = {}) {
	if (typeof name !== "string" || !name) return [];
	if (hasInvalidChars(name)) return [];
	const lower = name.toLowerCase();
	let scope = "";
	let bareInput = lower;
	if (lower.startsWith("@")) {
		const slash = lower.indexOf("/");
		if (slash < 0) return [];
		if (slash === 1) return [];
		scope = lower.slice(0, slash + 1);
		bareInput = lower.slice(slash + 1);
		if (bareInput.includes("/")) return [];
	}
	if (/^[-._]/.test(bareInput)) return [];
	const bare = bareInput.replace(/[._-]/g, "");
	if (!bare) return [];
	const out = /* @__PURE__ */ new Set();
	out.add(scope + bare);
	for (let i = 1; i < bare.length; i++) for (const sep of SEPARATORS) out.add(scope + bare.slice(0, i) + sep + bare.slice(i));
	if (bare.length > 1) {
		out.add(scope + bare.split("").join("-"));
		out.add(scope + bare.split("").join("_"));
	}
	if (bare.length >= 4) {
		let added = 0;
		const cap = capForLength(bare.length, opts.isExhaustive === true);
		outer: for (let gap = 1; gap < bare.length - 1; gap++) for (let i = 1; i + gap < bare.length; i++) {
			const j = i + gap;
			for (const sepA of SEPARATORS) for (const sepB of SEPARATORS) {
				const candidate = scope + bare.slice(0, i) + sepA + bare.slice(i, j) + sepB + bare.slice(j);
				if (!out.has(candidate)) {
					out.add(candidate);
					added++;
					if (added >= cap) break outer;
				}
			}
		}
	}
	out.delete(name);
	return [...out];
}
/**
* Compute the per-call 2-insertion variant cap. Scales linearly with name
* length, bounded by a base floor and a hard ceiling.
*
* @param {number} bareLength
* @param {boolean} isExhaustive
* @returns {number}
* @private
*/
function capForLength(bareLength, isExhaustive) {
	return Math.min(isExhaustive ? MONIKER_2INSERT_CAP_MAX_EXHAUSTIVE : MONIKER_2INSERT_CAP_MAX_DEFAULT, Math.max(isExhaustive ? 600 : 250, bareLength * (isExhaustive ? 120 : 40)));
}
// src/near-match.mjs
var import_damerau_levenshtein = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(__this, that, limit) {
		var thisLength = __this.length, thatLength = that.length, matrix = [];
		limit = (limit || (thatLength > thisLength ? thatLength : thisLength)) + 1;
		for (var i = 0; i < limit; i++) {
			matrix[i] = [i];
			matrix[i].length = limit;
		}
		for (i = 0; i < limit; i++) matrix[0][i] = i;
		if (Math.abs(thisLength - thatLength) > (limit || 100)) return prepare(limit || 100);
		if (thisLength === 0) return prepare(thatLength);
		if (thatLength === 0) return prepare(thisLength);
		var j, this_i, that_j, cost, min, t;
		for (i = 1; i <= thisLength; ++i) {
			this_i = __this[i - 1];
			for (j = 1; j <= thatLength; ++j) {
				if (i === j && matrix[i][j] > 4) return prepare(thisLength);
				that_j = that[j - 1];
				cost = this_i === that_j ? 0 : 1;
				min = matrix[i - 1][j] + 1;
				if ((t = matrix[i][j - 1] + 1) < min) min = t;
				if ((t = matrix[i - 1][j - 1] + cost) < min) min = t;
				matrix[i][j] = i > 1 && j > 1 && this_i === that[j - 2] && __this[i - 2] === that_j && (t = matrix[i - 2][j - 2] + cost) < min ? t : min;
			}
		}
		return prepare(matrix[thisLength][thatLength]);
		/**
		*
		*/
		function prepare(steps) {
			var length = Math.max(thisLength, thatLength);
			var relative = length === 0 ? 0 : steps / length;
			return {
				steps,
				relative,
				similarity: 1 - relative
			};
		}
	};
})))(), 1);
/**
* @typedef {Object} NearMatch
* @property {string} name - the popular package the candidate resembles
* @property {number} distance - edit distance between normalized forms
*/
/**
* Optimal String Alignment distance — insertions, deletions, substitutions,
* and adjacent transpositions count as one edit each. For distance ≤ 2 this
* equals unrestricted Damerau-Levenshtein; the two differ only at distance
* 3+, which is outside our typosquat budget anyway.
*
* @param {string} a
* @param {string} b
* @returns {number}
* @example
* osaDistance('react', 'raect')  // 1  (adjacent transposition)
* osaDistance('cat', 'cart')     // 1  (insertion)
* osaDistance('ca', 'abc')       // 3  (true DL would be 2 — OSA's restriction)
*/
function osaDistance(a, b) {
	return (0, import_damerau_levenshtein.default)(a, b).steps;
}
/**
* Find popular npm packages within `maxDistance` edits of `candidate`,
* comparing on normalized forms (`lowercase + strip [._-]`). Names that
* normalize identically to the candidate are excluded — those are moniker
* collisions and are reported by the moniker layer.
*
* Results dedupe by normalized form (keeping the highest-ranked variant)
* and sort by distance ascending, then by corpus rank ascending.
*
* @param {string} candidate
* @param {string[]} corpus - popular package names, descending by rank
* @param {{ maxDistance?: number, minCorpusLen?: number }} [opts]
* @returns {NearMatch[]}
* @example
* findNearMatches('extoolkit', ['es-toolkit', 'react'])
* // [{ name: 'es-toolkit', distance: 1 }]
*
* findNearMatches('estoolkit', ['es-toolkit'])
* // []  (same normalized form — that's a moniker collision, not a near-match)
*/
function findNearMatches(candidate, corpus, opts = {}) {
	if (typeof candidate !== "string" || !candidate) return [];
	if (!Array.isArray(corpus)) return [];
	const maxDistance = opts.maxDistance ?? 2;
	const minCorpusLen = opts.minCorpusLen ?? 3;
	const candBare = scopeStrip(candidate);
	if (candBare === null) return [];
	const candNorm = normalize(candBare);
	if (!candNorm) return [];
	/** @type {Map<string, { name: string, distance: number, rank: number }>} */
	const bestByNorm = /* @__PURE__ */ new Map();
	for (let i = 0; i < corpus.length; i++) {
		const pkg = corpus[i];
		if (typeof pkg !== "string" || !pkg) continue;
		if (pkg.length < minCorpusLen) continue;
		const pkgNorm = normalize(pkg);
		if (pkgNorm === candNorm) continue;
		if (Math.abs(pkgNorm.length - candNorm.length) > maxDistance) continue;
		const editDistance = osaDistance(candNorm, pkgNorm);
		if (editDistance <= 0 || editDistance > maxDistance) continue;
		const prev = bestByNorm.get(pkgNorm);
		if (!prev || i < prev.rank) bestByNorm.set(pkgNorm, {
			name: pkg,
			distance: editDistance,
			rank: i
		});
	}
	return [...bestByNorm.values()].sort((a, b) => a.distance - b.distance || a.rank - b.rank).map(({ name, distance: d }) => ({
		name,
		distance: d
	}));
}
/**
* Return the bare (post-scope) portion of a candidate, or null if the input
* has an invalid structure (e.g., multi-slash like `@scope/foo/bar`).
*
* @param {string} name
* @returns {string | null}
* @private
*/
function scopeStrip(name) {
	if (!name.startsWith("@")) {
		if (name.includes("/")) return null;
		return name;
	}
	const slash = name.indexOf("/");
	if (slash < 0) return null;
	const rest = name.slice(slash + 1);
	if (rest.includes("/")) return null;
	return rest;
}
// ../../node_modules/.pnpm/validate-npm-package-name@8.0.0/node_modules/validate-npm-package-name/lib/builtin-modules.json
var require_builtin_modules = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
		"_http_agent",
		"_http_client",
		"_http_common",
		"_http_incoming",
		"_http_outgoing",
		"_http_server",
		"_stream_duplex",
		"_stream_passthrough",
		"_stream_readable",
		"_stream_transform",
		"_stream_wrap",
		"_stream_writable",
		"_tls_common",
		"_tls_wrap",
		"assert",
		"assert/strict",
		"async_hooks",
		"buffer",
		"child_process",
		"cluster",
		"console",
		"constants",
		"crypto",
		"dgram",
		"diagnostics_channel",
		"dns",
		"dns/promises",
		"domain",
		"events",
		"fs",
		"fs/promises",
		"http",
		"http2",
		"https",
		"inspector",
		"inspector/promises",
		"module",
		"net",
		"os",
		"path",
		"path/posix",
		"path/win32",
		"perf_hooks",
		"process",
		"punycode",
		"querystring",
		"readline",
		"readline/promises",
		"repl",
		"stream",
		"stream/consumers",
		"stream/promises",
		"stream/web",
		"string_decoder",
		"sys",
		"timers",
		"timers/promises",
		"tls",
		"trace_events",
		"tty",
		"url",
		"util",
		"util/types",
		"v8",
		"vm",
		"wasi",
		"worker_threads",
		"zlib",
		"node:sea",
		"node:sqlite",
		"node:test",
		"node:test/reporters"
	];
}));
// src/validate.mjs
var import_lib = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	const builtins = require_builtin_modules();
	var scopedPackagePattern = /* @__PURE__ */ new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$");
	var exclusionList = ["node_modules", "favicon.ico"];
	function validate(name) {
		var warnings = [];
		var errors = [];
		if (name === null) {
			errors.push("name cannot be null");
			return done(warnings, errors);
		}
		if (name === void 0) {
			errors.push("name cannot be undefined");
			return done(warnings, errors);
		}
		if (typeof name !== "string") {
			errors.push("name must be a string");
			return done(warnings, errors);
		}
		if (!name.length) errors.push("name length must be greater than zero");
		if (name.startsWith(".")) errors.push("name cannot start with a period");
		if (name.startsWith("-")) errors.push("name cannot start with a hyphen");
		if (name.match(/^_/)) errors.push("name cannot start with an underscore");
		if (name.trim() !== name) errors.push("name cannot contain leading or trailing spaces");
		exclusionList.forEach(function(excludedName) {
			if (name.toLowerCase() === excludedName) errors.push(excludedName + " is not a valid package name");
		});
		if (builtins.includes(name.toLowerCase())) warnings.push(name + " is a core module name");
		if (name.length > 214) warnings.push("name can no longer contain more than 214 characters");
		if (name.toLowerCase() !== name) warnings.push("name can no longer contain capital letters");
		if (/[~'!()*]/.test(name.split("/").slice(-1)[0])) warnings.push("name can no longer contain special characters (\"~'!()*\")");
		if (encodeURIComponent(name) !== name) {
			var nameMatch = name.match(scopedPackagePattern);
			if (nameMatch) {
				var user = nameMatch[1];
				var pkg = nameMatch[2];
				if (pkg.startsWith(".")) errors.push("name cannot start with a period");
				if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) return done(warnings, errors);
			}
			errors.push("name can only contain URL-friendly characters");
		}
		return done(warnings, errors);
	}
	var done = function(warnings, errors) {
		var result = {
			validForNewPackages: errors.length === 0 && warnings.length === 0,
			validForOldPackages: errors.length === 0,
			warnings,
			errors
		};
		if (!result.warnings.length) delete result.warnings;
		if (!result.errors.length) delete result.errors;
		return result;
	};
	module.exports = validate;
})))(), 1);
/**
* @typedef {Object} ValidateResult
* @property {boolean} isValid - true only if the name is valid for NEW publishes
* @property {string[]} reasons - human-readable rejection reasons; empty when valid
* @property {boolean} isScoped - true if the name is in the `@scope/name` form
*/
/**
* Validate an npm package name. Combines errors and warnings into a single
* reasons[] array because for *new* publishes both are blockers.
*
* @param {unknown} name
* @returns {ValidateResult}
* @example
* validateName('tiny-log')      // { isValid: true,  reasons: [], isScoped: false }
* validateName('TinyLog')       // { isValid: false, reasons: ['…capital letters'], isScoped: false }
* validateName('@me/.foo')      // { isValid: false, reasons: ['…period'], isScoped: true }
*/
function validateName(name) {
	if (typeof name !== "string") return {
		isValid: false,
		reasons: ["name must be a string"],
		isScoped: false
	};
	const result = (0, import_lib.default)(name);
	const reasons = [...result.errors ?? [], ...result.warnings ?? []];
	const isScoped = name.startsWith("@") && name.includes("/");
	return {
		isValid: Boolean(result.validForNewPackages),
		reasons,
		isScoped
	};
}
// src/pipeline.mjs
/**
* @typedef {Object} VerdictAvailable
* @property {'available'} status
* @property {string} name
* @property {Array<{name: string, distance: number}>} [nearMatches]
*
* @typedef {Object} VerdictTaken
* @property {'taken'} status
* @property {string} name
*
* @typedef {Object} VerdictMoniker
* @property {'moniker'} status
* @property {string} name
* @property {string[]} conflicts
*
* @typedef {Object} VerdictUnverified
* @property {'unverified'} status
* @property {string} name
* @property {string[]} unverified - sample (capped at VERDICT_UNVERIFIED_SAMPLE)
* @property {number} unverifiedTotal
*
* @typedef {Object} VerdictInvalid
* @property {'invalid'} status
* @property {string} name
* @property {string[]} reasons
*
* @typedef {Object} VerdictUnknown
* @property {'unknown'} status
* @property {string} name
* @property {number} httpStatus
* @property {string} [error]
*
* @typedef {VerdictAvailable | VerdictTaken | VerdictMoniker | VerdictUnverified | VerdictInvalid | VerdictUnknown} Verdict
*/
/**
* @typedef {Object} MonikerProbe
* @property {string[]} conflicts - existing names that share the candidate's normalized form
* @property {string[]} unverified - variant names whose lookup didn't return taken/free
*/
/**
* @typedef {Object} TriageResult
* @property {string[]} valid - syntactically valid candidate names
* @property {VerdictInvalid[]} invalid - already-formed invalid verdicts
* @property {Set<string>} scoped - subset of `valid` whose names are `@scope/name`
*/
/** Frozen sentinel for candidates that weren't probed (e.g. scoped). */
const EMPTY_PROBE = Object.freeze({
	conflicts: Object.freeze([]),
	unverified: Object.freeze([])
});
/**
* Split candidates into syntactically-valid + already-rejected. The scoped
* subset is tagged separately so later phases can skip moniker probing.
*
* @param {string[]} candidates
* @returns {TriageResult}
* @example
* triage(['tiny-log', 'TinyLog', '@me/foo'])
* // { valid: ['tiny-log', '@me/foo'], invalid: [{status:'invalid', ...}], scoped: Set { '@me/foo' } }
*/
function triage(candidates) {
	const valid = [];
	const invalid = [];
	const scoped = /* @__PURE__ */ new Set();
	for (const name of candidates) {
		const result = validateName(name);
		if (result.isValid) {
			valid.push(name);
			if (result.isScoped) scoped.add(name);
		} else invalid.push({
			status: "invalid",
			name,
			reasons: result.reasons
		});
	}
	return {
		valid,
		invalid,
		scoped
	};
}
/**
* Select which unscoped, literal-free candidates should be moniker-probed
* and enumerate their variants. Returns the variant list per candidate
* plus the deduplicated set the caller should send to the registry.
*
* @param {{
*   valid: string[],
*   scoped: Set<string>,
*   existence: Map<string, import('./registry.mjs').Existence>,
*   isExhaustive: boolean,
* }} input
* @returns {{ variantsByName: Map<string, string[]>, allVariants: Set<string> }}
* @example
* selectMonikerCandidates({
*   valid: ['picolog', '@me/scoped'],
*   scoped: new Set(['@me/scoped']),
*   existence: new Map([['picolog', { kind: 'free', name: 'picolog', status: 404 }]]),
*   isExhaustive: false,
* })
* // { variantsByName: Map { 'picolog' → ['pico-log', 'pico_log', …] }, allVariants: Set { ... } }
*/
function selectMonikerCandidates({ valid, scoped, existence, isExhaustive }) {
	const variantsByName = /* @__PURE__ */ new Map();
	const allVariants = /* @__PURE__ */ new Set();
	for (const name of valid) {
		if (scoped.has(name)) continue;
		if (existence.get(name)?.kind !== "free") continue;
		const variants$1 = variants(name, { isExhaustive });
		variantsByName.set(name, variants$1);
		for (const variant of variants$1) allVariants.add(variant);
	}
	return {
		variantsByName,
		allVariants
	};
}
/**
* Bucket each candidate's variant results into `{ conflicts, unverified }`.
* Unknown probes go to `unverified` so callers don't conflate "registry
* couldn't say" with "registry confirmed free."
*
* @param {{
*   variantsByName: Map<string, string[]>,
*   variantResults: import('./registry.mjs').Existence[],
* }} input
* @returns {Map<string, MonikerProbe>}
* @example
* assembleMonikerProbes({
*   variantsByName: new Map([['picolog', ['pico-log', 'pico_log']]]),
*   variantResults: [
*     { kind: 'taken', name: 'pico-log', status: 200 },
*     { kind: 'unknown', name: 'pico_log', status: 429 },
*   ],
* })
* // Map { 'picolog' → { conflicts: ['pico-log'], unverified: ['pico_log'] } }
*/
function assembleMonikerProbes({ variantsByName, variantResults }) {
	const byVariant = new Map(variantResults.map((result) => [result.name, result]));
	const probes = /* @__PURE__ */ new Map();
	for (const [name, variants] of variantsByName) {
		const conflicts = [];
		const unverified = [];
		for (const variant of variants) {
			const kind = byVariant.get(variant)?.kind;
			if (kind === "taken") conflicts.push(variant);
			else if (kind === "unknown") unverified.push(variant);
		}
		probes.set(name, {
			conflicts,
			unverified
		});
	}
	return probes;
}
/**
* Build the final verdict map by merging triage results, registry
* existence, and moniker probes.
*
* @param {{
*   valid: string[],
*   invalid: VerdictInvalid[],
*   existence: Map<string, import('./registry.mjs').Existence>,
*   monikerProbes: Map<string, MonikerProbe>,
* }} input
* @returns {Map<string, Verdict>}
* @example
* decide({
*   valid: ['picolog'],
*   invalid: [],
*   existence: new Map([['picolog', { kind: 'free', name: 'picolog', status: 404 }]]),
*   monikerProbes: new Map([['picolog', { conflicts: [], unverified: ['pico_log'] }]]),
* })
* // Map { 'picolog' → { status: 'unverified', name: 'picolog', unverified: ['pico_log'], unverifiedTotal: 1 } }
*/
function decide({ valid, invalid, existence, monikerProbes }) {
	const verdicts = new Map(invalid.map((verdict) => [verdict.name, verdict]));
	for (const name of valid) {
		const literal = existence.get(name);
		if (!literal) throw new Error(`decide: missing existence result for ${name}`);
		verdicts.set(name, decideOne({
			name,
			existence: literal,
			probe: monikerProbes.get(name) ?? EMPTY_PROBE
		}));
	}
	return verdicts;
}
/**
* Map one candidate's existence + moniker probe into a single Verdict.
* Pure — matches exhaustively on `existence.kind`. Within `free`, the
* verdict is `moniker` (definitive collision), `unverified` (some variant
* probes failed and no collisions were definitively found), or `available`
* (all variant probes completed cleanly).
*
* @param {{ name: string, existence: import('./registry.mjs').Existence, probe: MonikerProbe }} input
* @returns {Verdict}
* @example
* decideOne({
*   name: 'extoolkit',
*   existence: { kind: 'free', name: 'extoolkit', status: 404 },
*   probe: { conflicts: [], unverified: [] },
* })
* // { status: 'available', name: 'extoolkit' }
*/
function decideOne({ name, existence, probe }) {
	return M(existence).with({ kind: "taken" }, () => ({
		status: "taken",
		name
	})).with({ kind: "unknown" }, (result) => ({
		status: "unknown",
		name,
		httpStatus: result.status,
		...result.error !== void 0 && { error: result.error }
	})).with({ kind: "free" }, () => {
		if (probe.conflicts.length > 0) return {
			status: "moniker",
			name,
			conflicts: probe.conflicts
		};
		if (probe.unverified.length > 0) return {
			status: "unverified",
			name,
			unverified: probe.unverified.slice(0, 10),
			unverifiedTotal: probe.unverified.length
		};
		return {
			status: "available",
			name
		};
	}).exhaustive();
}
/**
* Annotate `available` verdicts with up to `NEAR_MATCH_MAX_NEIGHBORS`
* typosquat-shaped neighbors from the popular-names corpus. The name is
* still publishable; this is a soft warning the user can override.
*
* @param {{
*   verdicts: Map<string, Verdict>,
*   candidates: string[],
*   corpus: string[],
*   maxDistance: number,
* }} input
* @returns {Map<string, Verdict>}
* @example
* flagTyposquats({
*   verdicts: new Map([['extoolkit', { status: 'available', name: 'extoolkit' }]]),
*   candidates: ['extoolkit'],
*   corpus: ['es-toolkit'],
*   maxDistance: 2,
* })
* // Map { 'extoolkit' → { status: 'available', name: 'extoolkit', nearMatches: [{ name: 'es-toolkit', distance: 1 }] } }
*/
function flagTyposquats({ verdicts, candidates, corpus, maxDistance }) {
	const annotated = new Map(verdicts);
	for (const name of candidates) {
		const verdict = annotated.get(name);
		if (verdict?.status !== "available") continue;
		const matches = findNearMatches(name, corpus, { maxDistance });
		if (matches.length > 0) annotated.set(name, {
			...verdict,
			nearMatches: matches.slice(0, 3)
		});
	}
	return annotated;
}
// src/registry.mjs
/**
* @typedef {Object} Taken
* @property {'taken'} kind
* @property {string} name
* @property {200} status
*
* @typedef {Object} Free
* @property {'free'} kind
* @property {string} name
* @property {404} status
*
* @typedef {Object} Unknown
* @property {'unknown'} kind
* @property {string} name
* @property {number} status - 0 when the network failed outright
* @property {string} [error] - present when status === 0
*
* @typedef {Taken | Free | Unknown} Existence
*/
/** @returns {Taken} */
const taken = (name) => ({
	kind: "taken",
	name,
	status: 200
});
/** @returns {Free} */
const free = (name) => ({
	kind: "free",
	name,
	status: 404
});
/** @returns {Unknown} */
const unknown = (name, status, error) => error === void 0 ? {
	kind: "unknown",
	name,
	status
} : {
	kind: "unknown",
	name,
	status,
	error
};
/**
* Check whether a single name exists on the registry. Never throws — every
* outcome (200 / 404 / other / network error) maps to a discriminated
* `Existence` value.
*
* @param {string} name
* @param {{ base?: string, timeoutMs?: number, fetchImpl?: typeof fetch }} [opts]
* @returns {Promise<Existence>}
* @example
* await checkOne('react')        // { kind: 'taken', name: 'react', status: 200 }
* await checkOne('novel-xyz')    // { kind: 'free',  name: 'novel-xyz', status: 404 }
*/
async function checkOne(name, opts = {}) {
	const base = opts.base ?? DEFAULT_REGISTRY_BASE;
	const timeoutMs = opts.timeoutMs ?? 8e3;
	const fetchImpl = opts.fetchImpl ?? fetch;
	const url = `${base}/${encodeURIComponent(name)}`;
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), timeoutMs);
	try {
		const res = await fetchImpl(url, {
			method: "HEAD",
			signal: ctrl.signal
		});
		clearTimeout(timer);
		const status = res?.status;
		if (!Number.isInteger(status)) return unknown(name, 0, "fetch returned response without numeric status");
		if (status === 200) return taken(name);
		if (status === 404) return free(name);
		return unknown(name, status);
	} catch (e) {
		clearTimeout(timer);
		return unknown(name, 0, e?.message ?? String(e));
	}
}
/**
* Bounded-concurrency pool runner. Runs `tasks` (functions returning Promises)
* with at most `concurrency` in-flight at once. Preserves input order.
*
* @template T
* @param {Array<() => Promise<T>>} tasks
* @param {number} [concurrency]
* @returns {Promise<T[]>}
* @example
* const tasks = urls.map((url) => () => fetch(url))
* const responses = await pool(tasks, 8)  // at most 8 in flight, results in input order
*/
async function pool(tasks, concurrency = 12) {
	if (concurrency != null && (!Number.isInteger(concurrency) || concurrency < 0)) throw new TypeError(`pool: concurrency must be a non-negative integer (got ${concurrency})`);
	const effectiveConcurrency = Number.isInteger(concurrency) && concurrency > 0 ? concurrency : 12;
	const results = Array.from({ length: tasks.length });
	let next = 0;
	async function worker() {
		while (true) {
			const i = next++;
			if (i >= tasks.length) return;
			results[i] = await tasks[i]();
		}
	}
	const workers = Array.from({ length: Math.min(effectiveConcurrency, tasks.length) }, worker);
	await Promise.all(workers);
	return results;
}
/**
* Check existence for a batch of names with bounded concurrency. Results
* are returned in input order regardless of completion order.
*
* @param {string[]} names
* @param {{ concurrency?: number, base?: string, timeoutMs?: number, fetchImpl?: typeof fetch }} [opts]
* @returns {Promise<Existence[]>}
* @example
* await checkMany(['react', 'vue', 'novel-xyz'], { concurrency: 4 })
* // [{ kind: 'taken', name: 'react', … }, { kind: 'taken', name: 'vue', … }, { kind: 'free', name: 'novel-xyz', … }]
*/
async function checkMany(names, opts = {}) {
	return pool(names.map((name) => () => checkOne(name, opts)), opts.concurrency ?? 12);
}
// src/check.mjs
const USAGE = `npm-namer — find available npm package names

Usage:
  node check.mjs [options] [seeds...]

Modes:
  (seeds given)        Permute the seeds, check each candidate.
  --check <names...>   Skip permutation; check the given names directly.
  --stdin              Read names from stdin (one per line); skip permutation.
  --file <path>        Read names from file (one per line); skip permutation.

Options:
  --limit <n>          Max candidates to check (default: 50).
  --concurrency <n>    Parallel registry requests (default: 12).
  --scope <@scope>     Generate scoped variants (default: unscoped).
  --no-moniker         Skip moniker collision check (the npm publish-time rule).
  --exhaustive         Wider 2-insertion moniker variants (slower, more thorough).
  --no-near-match      Skip typosquat-style similarity check against popular packages.
  --near-distance <n>  Max edit distance for near-match warnings (default: 2).
  --json               Output JSON instead of text.
  --help, -h           Show this help.

Names that look like options (leading hyphen) must be passed after a literal
\`--\` separator:
  node check.mjs --check -- -foo .bar _baz

Verdicts:
  ✓ available    free on registry + no moniker collision (may carry near-match warning)
  ⚠ moniker      free literally but normalized form collides — npm publish will reject
  ⚠ unverified   free literally but moniker check incomplete (some variants couldn't be probed)
  ✗ taken        the exact name is published
  ✗ invalid      fails syntactic rules
  ? unknown      registry returned a non-200/404 status for the literal name

Limitation:
  The moniker check enumerates 1- and 2-separator variants. 3+ morpheme
  splits (e.g. \`eslint-plugin-react-hooks\` vs \`eslintpluginreacthooks\`)
  are NOT covered even with --exhaustive. For authoritative pre-flight on
  multi-morpheme names, run \`npm publish --dry-run\`.

Examples:
  node check.mjs tiny log
  node check.mjs --check picolog microlog jslog
  echo "picolog" | node check.mjs --stdin
  node check.mjs --scope @me logger fast
`;
const SYMBOLS = {
	available: "✓",
	taken: "✗",
	moniker: "⚠",
	unverified: "⚠",
	invalid: "✗",
	unknown: "?"
};
const DIVIDER = "─".repeat(64);
/**
* @typedef {Object} Config
* @property {string[]} positionals
* @property {boolean} shouldSkipPermute
* @property {string[]} inputNames
* @property {number} limit
* @property {number} concurrency
* @property {string} [scope]
* @property {boolean} isMonikerEnabled
* @property {boolean} isExhaustive
* @property {boolean} isNearMatchEnabled
* @property {number} nearDistance
* @property {boolean} shouldOutputJson
* @property {boolean} shouldShowHelp
*/
async function main() {
	const config = parseCli(process.argv.slice(2));
	if (config.shouldShowHelp) {
		process.stdout.write(USAGE);
		return;
	}
	const prepared = prepareCandidates(config);
	if (isErr(prepared)) return die(prepared.error.message);
	const { seeds, candidates, consideredCount } = prepared.value;
	const corpus = config.isNearMatchEnabled ? loadCorpus() : err(/* @__PURE__ */ new Error("disabled"));
	const hasCorpus = isOk(corpus);
	const { valid, invalid, scoped } = triage(candidates);
	const existence = await probeRegistry(valid, config);
	const decided = decide({
		valid,
		invalid,
		existence,
		monikerProbes: config.isMonikerEnabled ? await probeMonikerCollisions({
			valid,
			scoped,
			existence,
			config
		}) : /* @__PURE__ */ new Map()
	});
	const annotated = hasCorpus ? flagTyposquats({
		verdicts: decided,
		candidates,
		corpus: corpus.value.names,
		maxDistance: config.nearDistance
	}) : decided;
	const output = shapeOutput({
		mode: config.shouldSkipPermute ? "check" : "find",
		seeds,
		consideredCount,
		candidates,
		verdicts: annotated,
		isMonikerEnabled: config.isMonikerEnabled,
		isExhaustive: config.isExhaustive,
		isNearMatchEnabled: config.isNearMatchEnabled && hasCorpus
	});
	process.stdout.write(config.shouldOutputJson ? `${JSON.stringify(output, null, 2)}\n` : renderText(output));
}
/**
* Parse CLI argv into a structured config. Throws nothing — invalid CLI
* usage surfaces later as an empty input or a `prepareCandidates` error.
*
* @param {string[]} argv
* @returns {Config}
* @private
*/
function parseCli(argv) {
	const { values, positionals } = parseArgs({
		args: argv,
		allowPositionals: true,
		options: {
			check: {
				type: "boolean",
				default: false
			},
			stdin: {
				type: "boolean",
				default: false
			},
			file: { type: "string" },
			limit: {
				type: "string",
				default: String(50)
			},
			concurrency: {
				type: "string",
				default: String(12)
			},
			scope: { type: "string" },
			"no-moniker": {
				type: "boolean",
				default: false
			},
			exhaustive: {
				type: "boolean",
				default: false
			},
			"no-near-match": {
				type: "boolean",
				default: false
			},
			"near-distance": {
				type: "string",
				default: String(2)
			},
			json: {
				type: "boolean",
				default: false
			},
			help: {
				type: "boolean",
				short: "h",
				default: false
			}
		}
	});
	return {
		shouldShowHelp: values.help,
		positionals,
		shouldSkipPermute: values.check || values.stdin || Boolean(values.file),
		inputNames: gatherInputNames(values),
		limit: parseIntOr(values.limit, 50),
		concurrency: parseIntOr(values.concurrency, 12),
		scope: values.scope,
		isMonikerEnabled: !values["no-moniker"],
		isExhaustive: values.exhaustive,
		isNearMatchEnabled: !values["no-near-match"],
		nearDistance: parseIntOr(values["near-distance"], 2),
		shouldOutputJson: values.json
	};
}
function gatherInputNames(values) {
	if (values.stdin) return readListFromStdin();
	if (values.file) return readFileSync(values.file, "utf8").split("\n").map((line) => line.trim()).filter(Boolean);
	return [];
}
/**
* Read newline-separated names from stdin. Returns `[]` only when nothing
* is piped (interactive TTY). Real read failures bubble — silent catches
* mask data-loss bugs we'd rather see than swallow.
*
* @returns {string[]}
* @private
*/
function readListFromStdin() {
	if (process.stdin.isTTY) return [];
	return readFileSync(0, "utf8").split("\n").map((line) => line.trim()).filter(Boolean);
}
function parseIntOr(raw, fallback) {
	const parsed = parseInt(raw, 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
/**
* Resolve the candidate list from the CLI inputs. In `check` mode the
* positionals + stdin/file lines are the candidates; in `find` mode the
* positionals are seeds that we permute. Either path ranks and trims to
* `config.limit`.
*
* `consideredCount` is the total candidate space before the `--limit`
* trim — input count in check mode, permutation count in find mode.
*
* @param {Config} config
* @returns {import('massaman').Result<{seeds: string[], candidates: string[], consideredCount: number}, Error>}
* @private
*/
function prepareCandidates(config) {
	if (config.shouldSkipPermute) {
		const supplied = [...config.inputNames, ...config.positionals].map((name) => name.trim()).filter(Boolean);
		if (supplied.length === 0) return err(/* @__PURE__ */ new Error("no names provided — pass names as args, via --stdin, or via --file"));
		const deduped = [...new Set(supplied)];
		return ok({
			seeds: [],
			candidates: trim(deduped, [], config.limit),
			consideredCount: deduped.length
		});
	}
	if (config.positionals.length === 0) return err(/* @__PURE__ */ new Error("no seeds provided. See --help."));
	const seeds = config.positionals;
	const permutedCandidates = [...new Set(permute(seeds, { scope: config.scope }))];
	if (permutedCandidates.length === 0) return err(/* @__PURE__ */ new Error(`all seeds were filtered (seeds must be alphanumeric — try \`--check -- ${seeds.join(" ")}\` to check them as literal names instead)`));
	return ok({
		seeds,
		candidates: trim(permutedCandidates, seeds, config.limit),
		consideredCount: permutedCandidates.length
	});
}
function trim(candidates, seeds, limit) {
	const ranked = [...candidates].sort((a, b) => score(a, seeds) - score(b, seeds));
	return ranked.length > limit ? ranked.slice(0, limit) : ranked;
}
/**
* HEAD each name in parallel against the npm registry. Returns a lookup
* map keyed by name; values are discriminated `Existence` values.
*
* @param {string[]} names
* @param {{ concurrency: number }} config
* @returns {Promise<Map<string, import('./registry.mjs').Existence>>}
* @private
*/
async function probeRegistry(names, config) {
	const results = await checkMany(names, { concurrency: config.concurrency });
	return new Map(results.map((result) => [result.name, result]));
}
/**
* Network-bound half of the moniker check. The pure selection + assembly
* lives in pipeline.mjs; this function bridges them with the registry
* round-trip in the middle.
*
* @param {{
*   valid: string[],
*   scoped: Set<string>,
*   existence: Map<string, import('./registry.mjs').Existence>,
*   config: { isExhaustive: boolean, concurrency: number },
* }} input
* @returns {Promise<Map<string, import('./pipeline.mjs').MonikerProbe>>}
* @private
*/
async function probeMonikerCollisions({ valid, scoped, existence, config }) {
	const { variantsByName, allVariants } = selectMonikerCandidates({
		valid,
		scoped,
		existence,
		isExhaustive: config.isExhaustive
	});
	return assembleMonikerProbes({
		variantsByName,
		variantResults: await checkMany([...allVariants], { concurrency: config.concurrency })
	});
}
function shapeOutput({ mode, seeds, consideredCount, candidates, verdicts, isMonikerEnabled, isExhaustive, isNearMatchEnabled }) {
	return {
		mode,
		seeds,
		considered: consideredCount,
		checked: candidates.length,
		isMonikerEnabled,
		isExhaustive,
		isNearMatchEnabled,
		results: candidates.map((name) => verdicts.get(name)).filter(Boolean)
	};
}
function renderText(output) {
	const header = output.mode === "find" ? [`seeds:    ${output.seeds.join(", ")}`, `considered: ${output.considered} candidates`] : [];
	header.push(`checked:  ${output.checked} candidates`, output.isMonikerEnabled ? `moniker:  ${output.isExhaustive ? "exhaustive" : "standard"} collision check` : "moniker:  skipped (--no-moniker)", output.isNearMatchEnabled ? "near:     typosquat similarity against popular packages" : "near:     skipped (--no-near-match)", DIVIDER);
	const rows = output.results.map(renderVerdictLine);
	const winners = output.results.filter((verdict) => verdict.status === "available");
	const clean = winners.filter((verdict) => !verdict.nearMatches?.length);
	const risky = winners.filter((verdict) => verdict.nearMatches?.length);
	const unverified = output.results.filter((verdict) => verdict.status === "unverified");
	const sections = [
		renderShortlist(output.isMonikerEnabled ? "Available + moniker-clear + no typosquat shape" : "Available + no typosquat shape (moniker check skipped)", clean, (winner) => `  • ${winner.name}`),
		renderShortlist("Available but typosquat-shaped", risky, (winner) => `  • ${winner.name}  ~  ${formatNearMatches(winner.nearMatches)}`, " — publishable, but close to popular packages"),
		renderShortlist("Moniker check incomplete", unverified, (verdict) => `  • ${verdict.name}  (${verdict.unverifiedTotal} variant${verdict.unverifiedTotal === 1 ? "" : "s"} not probed)`, " — try again or run `npm publish --dry-run`")
	].filter(Boolean);
	const footer = clean.length === 0 && risky.length === 0 && unverified.length === 0 ? [DIVIDER, "No available + moniker-clear candidates. Try broader seeds or --scope."] : [];
	return [
		...header,
		...rows,
		...sections,
		...footer
	].join("\n") + "\n";
}
function renderVerdictLine(verdict) {
	return `${`${SYMBOLS[verdict.status]} ${verdict.status}`.padEnd(14)}${verdict.name.padEnd(28)}${M(verdict).with({ status: "taken" }, () => "").with({ status: "moniker" }, (result) => `collides with: ${result.conflicts.join(", ")}`).with({ status: "unverified" }, (result) => `moniker incomplete: ${result.unverifiedTotal} variant${result.unverifiedTotal === 1 ? "" : "s"} not probed`).with({ status: "invalid" }, (result) => `(${result.reasons.join("; ")})`).with({ status: "unknown" }, (result) => `(http ${result.httpStatus}${result.error ? `: ${result.error}` : ""})`).with({
		status: "available",
		nearMatches: P$1.array()
	}, (result) => `near: ${formatNearMatches(result.nearMatches)}`).with({ status: "available" }, () => "").exhaustive()}`;
}
function formatNearMatches(matches) {
	return matches.map((neighbor) => `${neighbor.name} (d=${neighbor.distance})`).join(", ");
}
function renderShortlist(label, items, lineFn, suffix = "") {
	if (items.length === 0) return null;
	return `${`${DIVIDER}\n${label} (${items.length})${suffix}:`}\n${items.slice(0, 10).map(lineFn).join("\n")}${items.length > 10 ? `\n  … and ${items.length - 10} more` : ""}`;
}
function die(message) {
	process.stderr.write(`error: ${message}\n\nRun --help for usage.\n`);
	process.exit(2);
}
main().catch((error) => {
	process.stderr.write(`error: ${error?.stack ?? error}\n`);
	process.exit(1);
});
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2subWpzIiwibmFtZXMiOlsibWF0Y2giLCJQIiwiZGFtZXJhdUxldmVuc2h0ZWluIiwidmFsaWRhdGUiLCJ2YXJpYW50cyIsIm1vbmlrZXJWYXJpYW50cyIsIm1hdGNoIiwibWF0Y2giLCJQIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2VzLXRvb2xraXRAMS41Mi4wL25vZGVfbW9kdWxlcy9lcy10b29sa2l0L2Rpc3QvcHJlZGljYXRlL2lzTmlsLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS90cy1wYXR0ZXJuQDUuOS4yL25vZGVfbW9kdWxlcy90cy1wYXR0ZXJuL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWFzc2FtYW5AMC41LjUvbm9kZV9tb2R1bGVzL21hc3NhbWFuL2Rpc3QvY29udHJvbC1CbEw3VG1BNy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWFzc2FtYW5AMC41LjUvbm9kZV9tb2R1bGVzL21hc3NhbWFuL2Rpc3QvbWF0Y2gtZkJldGZhSWEubWpzIiwiLi4vc3JjL2NvbnN0YW50cy5tanMiLCIuLi9zcmMvY29ycHVzLm1qcyIsIi4uL3NyYy9wZXJtdXRlLm1qcyIsIi4uL3NyYy9tb25pa2VyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYW1lcmF1LWxldmVuc2h0ZWluQDEuMC44L25vZGVfbW9kdWxlcy9kYW1lcmF1LWxldmVuc2h0ZWluL2luZGV4LmpzIiwiLi4vc3JjL25lYXItbWF0Y2gubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVAOC4wLjAvbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWUvbGliL2J1aWx0aW4tbW9kdWxlcy5qc29uIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVAOC4wLjAvbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWUvbGliL2luZGV4LmpzIiwiLi4vc3JjL3ZhbGlkYXRlLm1qcyIsIi4uL3NyYy9waXBlbGluZS5tanMiLCIuLi9zcmMvcmVnaXN0cnkubWpzIiwiLi4vc3JjL2NoZWNrLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3JjL3ByZWRpY2F0ZS9pc05pbC50c1xuLyoqXG4qIENoZWNrcyBpZiBhIGdpdmVuIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuKlxuKiBUaGlzIGZ1bmN0aW9uIHRlc3RzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVpdGhlciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4qIEl0IHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbipcbiogVGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBzZXJ2ZSBhcyBhIHR5cGUgcHJlZGljYXRlIGluIFR5cGVTY3JpcHQsIG5hcnJvd2luZyB0aGUgdHlwZSBvZiB0aGUgYXJndW1lbnQgdG8gYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuKlxuKiBAcGFyYW0geCAtIFRoZSB2YWx1ZSB0byB0ZXN0IGZvciBudWxsIG9yIHVuZGVmaW5lZC5cbiogQHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZCwgYGZhbHNlYCBvdGhlcndpc2UuXG4qXG4qIEBleGFtcGxlXG4qIGNvbnN0IHZhbHVlMSA9IG51bGw7XG4qIGNvbnN0IHZhbHVlMiA9IHVuZGVmaW5lZDtcbiogY29uc3QgdmFsdWUzID0gNDI7XG4qIGNvbnN0IHJlc3VsdDEgPSBpc05pbCh2YWx1ZTEpOyAvLyB0cnVlXG4qIGNvbnN0IHJlc3VsdDIgPSBpc05pbCh2YWx1ZTIpOyAvLyB0cnVlXG4qIGNvbnN0IHJlc3VsdDMgPSBpc05pbCh2YWx1ZTMpOyAvLyBmYWxzZVxuKi9cbmZ1bmN0aW9uIGlzTmlsKHgpIHtcblx0cmV0dXJuIHggPT0gbnVsbDtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgaXNOaWwgfTtcbiIsImNvbnN0IHQ9U3ltYm9sLmZvcihcIkB0cy1wYXR0ZXJuL21hdGNoZXJcIiksZT1TeW1ib2wuZm9yKFwiQHRzLXBhdHRlcm4vaXNWYXJpYWRpY1wiKSxuPVwiQHRzLXBhdHRlcm4vYW5vbnltb3VzLXNlbGVjdC1rZXlcIixyPXQ9PkJvb2xlYW4odCYmXCJvYmplY3RcIj09dHlwZW9mIHQpLGk9ZT0+ZSYmISFlW3RdLG89KG4scyxjKT0+e2lmKGkobikpe2NvbnN0IGU9blt0XSgpLHttYXRjaGVkOnIsc2VsZWN0aW9uczppfT1lLm1hdGNoKHMpO3JldHVybiByJiZpJiZPYmplY3Qua2V5cyhpKS5mb3JFYWNoKHQ9PmModCxpW3RdKSkscn1pZihyKG4pKXtpZighcihzKSlyZXR1cm4hMTtpZihBcnJheS5pc0FycmF5KG4pKXtpZighQXJyYXkuaXNBcnJheShzKSlyZXR1cm4hMTtsZXQgdD1bXSxyPVtdLHU9W107Zm9yKGNvbnN0IG8gb2Ygbi5rZXlzKCkpe2NvbnN0IHM9bltvXTtpKHMpJiZzW2VdP3UucHVzaChzKTp1Lmxlbmd0aD9yLnB1c2gocyk6dC5wdXNoKHMpfWlmKHUubGVuZ3RoKXtpZih1Lmxlbmd0aD4xKXRocm93IG5ldyBFcnJvcihcIlBhdHRlcm4gZXJyb3I6IFVzaW5nIGAuLi5QLmFycmF5KC4uLilgIHNldmVyYWwgdGltZXMgaW4gYSBzaW5nbGUgcGF0dGVybiBpcyBub3QgYWxsb3dlZC5cIik7aWYocy5sZW5ndGg8dC5sZW5ndGgrci5sZW5ndGgpcmV0dXJuITE7Y29uc3QgZT1zLnNsaWNlKDAsdC5sZW5ndGgpLG49MD09PXIubGVuZ3RoP1tdOnMuc2xpY2UoLXIubGVuZ3RoKSxpPXMuc2xpY2UodC5sZW5ndGgsMD09PXIubGVuZ3RoP0luZmluaXR5Oi1yLmxlbmd0aCk7cmV0dXJuIHQuZXZlcnkoKHQsbik9Pm8odCxlW25dLGMpKSYmci5ldmVyeSgodCxlKT0+byh0LG5bZV0sYykpJiYoMD09PXUubGVuZ3RofHxvKHVbMF0saSxjKSl9cmV0dXJuIG4ubGVuZ3RoPT09cy5sZW5ndGgmJm4uZXZlcnkoKHQsZSk9Pm8odCxzW2VdLGMpKX1yZXR1cm4gUmVmbGVjdC5vd25LZXlzKG4pLmV2ZXJ5KGU9Pntjb25zdCByPW5bZV07cmV0dXJuKGUgaW4gc3x8aSh1PXIpJiZcIm9wdGlvbmFsXCI9PT11W3RdKCkubWF0Y2hlclR5cGUpJiZvKHIsc1tlXSxjKTt2YXIgdX0pfXJldHVybiBPYmplY3QuaXMocyxuKX0scz1lPT57dmFyIG4sbyx1O3JldHVybiByKGUpP2koZSk/bnVsbCE9KG49bnVsbD09KG89KHU9ZVt0XSgpKS5nZXRTZWxlY3Rpb25LZXlzKT92b2lkIDA6by5jYWxsKHUpKT9uOltdOkFycmF5LmlzQXJyYXkoZSk/YyhlLHMpOmMoT2JqZWN0LnZhbHVlcyhlKSxzKTpbXX0sYz0odCxlKT0+dC5yZWR1Y2UoKHQsbik9PnQuY29uY2F0KGUobikpLFtdKTtmdW5jdGlvbiB1KC4uLnQpe2lmKDE9PT10Lmxlbmd0aCl7Y29uc3RbZV09dDtyZXR1cm4gdD0+byhlLHQsKCk9Pnt9KX1pZigyPT09dC5sZW5ndGgpe2NvbnN0W2Usbl09dDtyZXR1cm4gbyhlLG4sKCk9Pnt9KX10aHJvdyBuZXcgRXJyb3IoYGlzTWF0Y2hpbmcgd2Fzbid0IGdpdmVuIHRoZSByaWdodCBudW1iZXIgb2YgYXJndW1lbnRzOiBleHBlY3RlZCAxIG9yIDIsIHJlY2VpdmVkICR7dC5sZW5ndGh9LmApfWZ1bmN0aW9uIGEodCl7cmV0dXJuIE9iamVjdC5hc3NpZ24odCx7b3B0aW9uYWw6KCk9PmgodCksYW5kOmU9PmQodCxlKSxvcjplPT55KHQsZSksc2VsZWN0OmU9PnZvaWQgMD09PWU/dih0KTp2KGUsdCl9KX1mdW5jdGlvbiBsKHQpe3JldHVybiBPYmplY3QuYXNzaWduKCh0PT5PYmplY3QuYXNzaWduKHQse1tTeW1ib2wuaXRlcmF0b3JdKCl7bGV0IG49MDtjb25zdCByPVt7dmFsdWU6T2JqZWN0LmFzc2lnbih0LHtbZV06ITB9KSxkb25lOiExfSx7ZG9uZTohMCx2YWx1ZTp2b2lkIDB9XTtyZXR1cm57bmV4dDooKT0+e3ZhciB0O3JldHVybiBudWxsIT0odD1yW24rK10pP3Q6ci5hdCgtMSl9fX19KSkodCkse29wdGlvbmFsOigpPT5sKGgodCkpLHNlbGVjdDplPT5sKHZvaWQgMD09PWU/dih0KTp2KGUsdCkpfSl9ZnVuY3Rpb24gaChlKXtyZXR1cm4gYSh7W3RdOigpPT4oe21hdGNoOnQ9PntsZXQgbj17fTtjb25zdCByPSh0LGUpPT57blt0XT1lfTtyZXR1cm4gdm9pZCAwPT09dD8ocyhlKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59KTp7bWF0Y2hlZDpvKGUsdCxyKSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT5zKGUpLG1hdGNoZXJUeXBlOlwib3B0aW9uYWxcIn0pfSl9Y29uc3QgZj0odCxlKT0+e2Zvcihjb25zdCBuIG9mIHQpaWYoIWUobikpcmV0dXJuITE7cmV0dXJuITB9LGc9KHQsZSk9Pntmb3IoY29uc3RbbixyXW9mIHQuZW50cmllcygpKWlmKCFlKHIsbikpcmV0dXJuITE7cmV0dXJuITB9LG09KHQsZSk9Pntjb25zdCBuPVJlZmxlY3Qub3duS2V5cyh0KTtmb3IoY29uc3QgciBvZiBuKWlmKCFlKHIsdFtyXSkpcmV0dXJuITE7cmV0dXJuITB9O2Z1bmN0aW9uIGQoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJue21hdGNoZWQ6ZS5ldmVyeShlPT5vKGUsdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+YyhlLHMpLG1hdGNoZXJUeXBlOlwiYW5kXCJ9KX0pfWZ1bmN0aW9uIHkoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJuIGMoZSxzKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDplLnNvbWUoZT0+byhlLHQscikpLHNlbGVjdGlvbnM6bn19LGdldFNlbGVjdGlvbktleXM6KCk9PmMoZSxzKSxtYXRjaGVyVHlwZTpcIm9yXCJ9KX0pfWZ1bmN0aW9uIHAoZSl7cmV0dXJue1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6Qm9vbGVhbihlKHQpKX0pfSl9fWZ1bmN0aW9uIHYoLi4uZSl7Y29uc3Qgcj1cInN0cmluZ1wiPT10eXBlb2YgZVswXT9lWzBdOnZvaWQgMCxpPTI9PT1lLmxlbmd0aD9lWzFdOlwic3RyaW5nXCI9PXR5cGVvZiBlWzBdP3ZvaWQgMDplWzBdO3JldHVybiBhKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2xldCBlPXtbbnVsbCE9cj9yOm5dOnR9O3JldHVybnttYXRjaGVkOnZvaWQgMD09PWl8fG8oaSx0LCh0LG4pPT57ZVt0XT1ufSksc2VsZWN0aW9uczplfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+W251bGwhPXI/cjpuXS5jb25jYXQodm9pZCAwPT09aT9bXTpzKGkpKX0pfSl9ZnVuY3Rpb24gYih0KXtyZXR1cm4hMH1mdW5jdGlvbiB3KHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0fWZ1bmN0aW9uIFModCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR9ZnVuY3Rpb24gaih0KXtyZXR1cm5cImJpZ2ludFwiPT10eXBlb2YgdH1jb25zdCBLPWEocChiKSksTz1hKHAoYikpLEU9Syx4PXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7c3RhcnRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LnN0YXJ0c1dpdGgobikpKSkpO3ZhciBufSxlbmRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LmVuZHNXaXRoKG4pKSkpKTt2YXIgbn0sbWluTGVuZ3RoOmU9PngoZCh0LCh0PT5wKGU9PlMoZSkmJmUubGVuZ3RoPj10KSkoZSkpKSxsZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg9PT10KSkoZSkpKSxtYXhMZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg8PXQpKShlKSkpLGluY2x1ZGVzOmU9PntyZXR1cm4geChkKHQsKG49ZSxwKHQ9PlModCkmJnQuaW5jbHVkZXMobikpKSkpO3ZhciBufSxyZWdleDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZCb29sZWFuKHQubWF0Y2gobikpKSkpKTt2YXIgbn19KSxBPXgocChTKSksTj10PT5PYmplY3QuYXNzaWduKGEodCkse2JldHdlZW46KGUsbik9Pk4oZCh0LCgodCxlKT0+cChuPT53KG4pJiZ0PD1uJiZlPj1uKSkoZSxuKSkpLGx0OmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU8dCkpKGUpKSksZ3Q6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZT50KSkoZSkpKSxsdGU6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZTw9dCkpKGUpKSksZ3RlOmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU+PXQpKShlKSkpLGludDooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNJbnRlZ2VyKHQpKSkpLGZpbml0ZTooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNGaW5pdGUodCkpKSkscG9zaXRpdmU6KCk9Pk4oZCh0LHAodD0+dyh0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5OKGQodCxwKHQ9PncodCkmJnQ8MCkpKX0pLFA9TihwKHcpKSxrPXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7YmV0d2VlbjooZSxuKT0+ayhkKHQsKCh0LGUpPT5wKG49PmoobikmJnQ8PW4mJmU+PW4pKShlLG4pKSksbHQ6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZTx0KSkoZSkpKSxndDplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPnQpKShlKSkpLGx0ZTplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPD10KSkoZSkpKSxndGU6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZT49dCkpKGUpKSkscG9zaXRpdmU6KCk9PmsoZCh0LHAodD0+aih0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5rKGQodCxwKHQ9PmoodCkmJnQ8MCkpKX0pLFQ9ayhwKGopKSxCPWEocChmdW5jdGlvbih0KXtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIHR9KSksXz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9KSksVz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXR9KSksJD1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXR9KSk7dmFyIHo9e19fcHJvdG9fXzpudWxsLG1hdGNoZXI6dCxvcHRpb25hbDpoLGFycmF5OmZ1bmN0aW9uKC4uLmUpe3JldHVybiBsKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2lmKCFBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTtpZigwPT09ZS5sZW5ndGgpcmV0dXJue21hdGNoZWQ6ITB9O2NvbnN0IG49ZVswXTtsZXQgcj17fTtpZigwPT09dC5sZW5ndGgpcmV0dXJuIHMobikuZm9yRWFjaCh0PT57clt0XT1bXX0pLHttYXRjaGVkOiEwLHNlbGVjdGlvbnM6cn07Y29uc3QgaT0odCxlKT0+e3JbdF09KHJbdF18fFtdKS5jb25jYXQoW2VdKX07cmV0dXJue21hdGNoZWQ6dC5ldmVyeSh0PT5vKG4sdCxpKSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxzZXQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgU2V0KSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07Y29uc3Qgcj0odCxlKT0+e25bdF09KG5bdF18fFtdKS5jb25jYXQoW2VdKX0saT1lWzBdO3JldHVybnttYXRjaGVkOmYodCx0PT5vKGksdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxtYXA6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgTWFwKSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2NvbnN0IHI9KHQsZSk9PntuW3RdPShuW3RdfHxbXSkuY29uY2F0KFtlXSl9O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07dmFyIGk7aWYoMT09PWUubGVuZ3RoKXRocm93IG5ldyBFcnJvcihgXFxgUC5tYXBcXGAgd2Fzbid0IGdpdmVuIGVub3VnaCBhcmd1bWVudHMuIEV4cGVjdGVkIChrZXksIHZhbHVlKSwgcmVjZWl2ZWQgJHtudWxsPT0oaT1lWzBdKT92b2lkIDA6aS50b1N0cmluZygpfWApO2NvbnN0W3MsY109ZTtyZXR1cm57bWF0Y2hlZDpnKHQsKHQsZSk9Pntjb25zdCBuPW8ocyxlLHIpLGk9byhjLHQscik7cmV0dXJuIG4mJml9KSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT4wPT09ZS5sZW5ndGg/W106Wy4uLnMoZVswXSksLi4ucyhlWzFdKV19KX0pfSxyZWNvcmQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0fHxBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTt2YXIgbjtpZigwPT09ZS5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBcXGBQLnJlY29yZFxcYCB3YXNuJ3QgZ2l2ZW4gZW5vdWdoIGFyZ3VtZW50cy4gRXhwZWN0ZWQgKHZhbHVlKSBvciAoa2V5LCB2YWx1ZSksIHJlY2VpdmVkICR7bnVsbD09KG49ZVswXSk/dm9pZCAwOm4udG9TdHJpbmcoKX1gKTtsZXQgcj17fTtjb25zdCBpPSh0LGUpPT57clt0XT0oclt0XXx8W10pLmNvbmNhdChbZV0pfSxbcyxjXT0xPT09ZS5sZW5ndGg/W0EsZVswXV06ZTtyZXR1cm57bWF0Y2hlZDptKHQsKHQsZSk9Pntjb25zdCBuPVwic3RyaW5nXCIhPXR5cGVvZiB0fHxOdW1iZXIuaXNOYU4oTnVtYmVyKHQpKT9udWxsOk51bWJlcih0KSxyPW51bGwhPT1uJiZvKHMsbixpKSx1PW8ocyx0LGkpLGE9byhjLGUsaSk7cmV0dXJuKHV8fHIpJiZhfSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOlsuLi5zKGVbMF0pLC4uLnMoZVsxXSldfSl9KX0saW50ZXJzZWN0aW9uOmQsdW5pb246eSxub3Q6ZnVuY3Rpb24oZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6IW8oZSx0LCgpPT57fSl9KSxnZXRTZWxlY3Rpb25LZXlzOigpPT5bXSxtYXRjaGVyVHlwZTpcIm5vdFwifSl9KX0sd2hlbjpwLHNlbGVjdDp2LGFueTpLLHVua25vd246TyxfOkUsc3RyaW5nOkEsbnVtYmVyOlAsYmlnaW50OlQsYm9vbGVhbjpCLHN5bWJvbDpfLG51bGxpc2g6Vyxub25OdWxsYWJsZTokLGluc3RhbmNlT2Y6ZnVuY3Rpb24odCl7cmV0dXJuIGEocChmdW5jdGlvbih0KXtyZXR1cm4gZT0+ZSBpbnN0YW5jZW9mIHR9KHQpKSl9LHNoYXBlOmZ1bmN0aW9uKHQpe3JldHVybiBhKHAodSh0KSkpfX07Y2xhc3MgSSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQpe2xldCBlO3RyeXtlPUpTT04uc3RyaW5naWZ5KHQpfWNhdGNoKG4pe2U9dH1zdXBlcihgUGF0dGVybiBtYXRjaGluZyBlcnJvcjogbm8gcGF0dGVybiBtYXRjaGVzIHZhbHVlICR7ZX1gKSx0aGlzLmlucHV0PXZvaWQgMCx0aGlzLmlucHV0PXR9fWNvbnN0IEw9e21hdGNoZWQ6ITEsdmFsdWU6dm9pZCAwfTtmdW5jdGlvbiBNKHQpe3JldHVybiBuZXcgUih0LEwpfWNsYXNzIFJ7Y29uc3RydWN0b3IodCxlKXt0aGlzLmlucHV0PXZvaWQgMCx0aGlzLnN0YXRlPXZvaWQgMCx0aGlzLmlucHV0PXQsdGhpcy5zdGF0ZT1lfXdpdGgoLi4udCl7aWYodGhpcy5zdGF0ZS5tYXRjaGVkKXJldHVybiB0aGlzO2NvbnN0IGU9dFt0Lmxlbmd0aC0xXSxyPVt0WzBdXTtsZXQgaTszPT09dC5sZW5ndGgmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRbMV0/aT10WzFdOnQubGVuZ3RoPjImJnIucHVzaCguLi50LnNsaWNlKDEsdC5sZW5ndGgtMSkpO2xldCBzPSExLGM9e307Y29uc3QgdT0odCxlKT0+e3M9ITAsY1t0XT1lfSxhPSFyLnNvbWUodD0+byh0LHRoaXMuaW5wdXQsdSkpfHxpJiYhQm9vbGVhbihpKHRoaXMuaW5wdXQpKT9MOnttYXRjaGVkOiEwLHZhbHVlOmUocz9uIGluIGM/Y1tuXTpjOnRoaXMuaW5wdXQsdGhpcy5pbnB1dCl9O3JldHVybiBuZXcgUih0aGlzLmlucHV0LGEpfXdoZW4odCxlKXtpZih0aGlzLnN0YXRlLm1hdGNoZWQpcmV0dXJuIHRoaXM7Y29uc3Qgbj1Cb29sZWFuKHQodGhpcy5pbnB1dCkpO3JldHVybiBuZXcgUih0aGlzLmlucHV0LG4/e21hdGNoZWQ6ITAsdmFsdWU6ZSh0aGlzLmlucHV0LHRoaXMuaW5wdXQpfTpMKX1vdGhlcndpc2UodCl7cmV0dXJuIHRoaXMuc3RhdGUubWF0Y2hlZD90aGlzLnN0YXRlLnZhbHVlOnQodGhpcy5pbnB1dCl9ZXhoYXVzdGl2ZSh0PUYpe3JldHVybiB0aGlzLnN0YXRlLm1hdGNoZWQ/dGhpcy5zdGF0ZS52YWx1ZTp0KHRoaXMuaW5wdXQpfXJ1bigpe3JldHVybiB0aGlzLmV4aGF1c3RpdmUoKX1yZXR1cm5UeXBlKCl7cmV0dXJuIHRoaXN9bmFycm93KCl7cmV0dXJuIHRoaXN9fWZ1bmN0aW9uIEYodCl7dGhyb3cgbmV3IEkodCl9ZXhwb3J0e0kgYXMgTm9uRXhoYXVzdGl2ZUVycm9yLHogYXMgUCx6IGFzIFBhdHRlcm4sdSBhcyBpc01hdGNoaW5nLE0gYXMgbWF0Y2h9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gXCJlcy10b29sa2l0L3ByZWRpY2F0ZVwiO1xuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tIFwidHMtcGF0dGVyblwiO1xuaW1wb3J0IHsgYXNzZXJ0LCBpbnZhcmlhbnQgfSBmcm9tIFwiZXMtdG9vbGtpdC91dGlsXCI7XG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvcmVzdWx0LnRzXG4vKipcbiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBleHBvc2VzIHRoZSByZXF1aXJlZCBzdHJ1Y3R1cmFsIGBFcnJvcmAgZmllbGRzLlxuKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gaW5zcGVjdFxuKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB2YWx1ZSBoYXMgc3RyaW5nIGBuYW1lYCBhbmQgYG1lc3NhZ2VgIGZpZWxkc1xuKiBAcHJpdmF0ZVxuKi9cbmZ1bmN0aW9uIGlzRXJyb3JMaWtlKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIWlzTmlsKHZhbHVlKSAmJiBcIm5hbWVcIiBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBcIm1lc3NhZ2VcIiBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubWVzc2FnZSA9PT0gXCJzdHJpbmdcIjtcbn1cbi8qKlxuKiBNaW5pbWFsIGVycm9yIGNvZXJjaW9uIHVzZWQgaW50ZXJuYWxseSBieSBgZXJyKClgLiBLZXB0IGxvY2FsIHRvIGF2b2lkXG4qIHB1bGxpbmcgdGhlIGZ1bGwgY29udmVyc2lvbiBtb2R1bGUgaW50byB0aGUgYG1hc3NhbWFuL2NvbnRyb2xgIGJ1bmRsZS5cbiovXG5mdW5jdGlvbiBjb2VyY2VFcnJvcih0aHJvd24pIHtcblx0aWYgKHRocm93biBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdGhyb3duO1xuXHRpZiAoaXNFcnJvckxpa2UodGhyb3duKSkgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG5ldyBFcnJvcih0aHJvd24ubWVzc2FnZSwgeyBjYXVzZTogdGhyb3duIH0pLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0aHJvd24pKTtcblx0aWYgKHR5cGVvZiB0aHJvd24gPT09IFwic3RyaW5nXCIpIHJldHVybiBuZXcgRXJyb3IodGhyb3duKTtcblx0dHJ5IHtcblx0XHRjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkodGhyb3duKSA/PyBTdHJpbmcodGhyb3duKTtcblx0XHRyZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UsIHsgY2F1c2U6IHRocm93biB9KTtcblx0fSBjYXRjaCB7XG5cdFx0cmV0dXJuIG5ldyBFcnJvcihTdHJpbmcodGhyb3duKSwgeyBjYXVzZTogdGhyb3duIH0pO1xuXHR9XG59XG4vKipcbiogQ3JlYXRlcyBhIHN1Y2Nlc3MgcmVzdWx0IHdyYXBwaW5nIHRoZSBnaXZlbiB2YWx1ZS5cbipcbiogQHBhcmFtIHZhbHVlIC0gVGhlIHN1Y2Nlc3MgdmFsdWVcbiogQHJldHVybnMgQW4gYE9rYCByZXN1bHQgY29udGFpbmluZyB0aGUgdmFsdWVcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgcmVzdWx0ID0gb2soNDIpXG4qIC8vIHsgb2s6IHRydWUsIHZhbHVlOiA0MiB9XG4qIGBgYFxuKi9cbmZ1bmN0aW9uIG9rKHZhbHVlKSB7XG5cdHJldHVybiB7XG5cdFx0b2s6IHRydWUsXG5cdFx0dmFsdWUsXG5cdFx0ZXJyb3I6IG51bGxcblx0fTtcbn1cbmZ1bmN0aW9uIGVycihlcnJvcikge1xuXHRyZXR1cm4ge1xuXHRcdG9rOiBmYWxzZSxcblx0XHR2YWx1ZTogbnVsbCxcblx0XHRlcnJvcjogY29lcmNlRXJyb3IoZXJyb3IpXG5cdH07XG59XG4vKipcbiogVHlwZSBndWFyZCB0aGF0IG5hcnJvd3MgYSBgUmVzdWx0YCB0byBgT2tgLlxuKlxuKiBAcGFyYW0gcmVzdWx0IC0gVGhlIHJlc3VsdCB0byBjaGVja1xuKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHJlc3VsdCBpcyBgT2tgXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZSgne30nKSlcbiogaWYgKGlzT2socmVzdWx0KSkge1xuKiAgIGNvbnNvbGUubG9nKHJlc3VsdC52YWx1ZSlcbiogfVxuKiBgYGBcbiovXG5mdW5jdGlvbiBpc09rKHJlc3VsdCkge1xuXHRyZXR1cm4gcmVzdWx0Lm9rID09PSB0cnVlO1xufVxuLyoqXG4qIFR5cGUgZ3VhcmQgdGhhdCBuYXJyb3dzIGEgYFJlc3VsdGAgdG8gYEVycmAuXG4qXG4qIEBwYXJhbSByZXN1bHQgLSBUaGUgcmVzdWx0IHRvIGNoZWNrXG4qIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgcmVzdWx0IGlzIGBFcnJgXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZSgnYmFkJykpXG4qIGlmIChpc0VycihyZXN1bHQpKSB7XG4qICAgY29uc29sZS5lcnJvcihyZXN1bHQuZXJyb3IpXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gaXNFcnIocmVzdWx0KSB7XG5cdHJldHVybiByZXN1bHQub2sgPT09IGZhbHNlO1xufVxuLyoqXG4qIEV4dHJhY3QgdGhlIHZhbHVlIGZyb20gYW4gYE9rYCByZXN1bHQsIG9yIHRocm93IG9uIGBFcnJgLlxuKlxuKiBXaGVuIGNhbGxlZCB3aXRob3V0IGEgbWVzc2FnZSwgdGhyb3dzIHRoZSBvcmlnaW5hbCBlcnJvci5cbiogV2hlbiBjYWxsZWQgd2l0aCBhIG1lc3NhZ2UsIHRocm93cyBhIG5ldyBFcnJvciB3aXRoIHRoYXQgbWVzc2FnZVxuKiBhbmQgdGhlIG9yaWdpbmFsIGVycm9yIGFzIGBjYXVzZWAgKGxpa2UgUnVzdCdzIGBleHBlY3RgKS5cbipcbiogQHBhcmFtIHJlc3VsdCAtIFRoZSByZXN1bHQgdG8gdW53cmFwXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY3VzdG9tIGVycm9yIG1lc3NhZ2UgKFJ1c3QgYGV4cGVjdGAgYmVoYXZpb3IpXG4qIEByZXR1cm5zIFRoZSB1bndyYXBwZWQgdmFsdWVcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgdmFsdWUgPSB1bndyYXAob2soNDIpKSAgICAgICAgICAgLy8gNDJcbiogdW53cmFwKGVycignZmFpbCcpKSAgICAgICAgICAgICAgICAgICAgLy8gdGhyb3dzIEVycm9yKCdmYWlsJylcbiogdW53cmFwKGVycignZmFpbCcpLCAnY29uZmlnIHJlcXVpcmVkJykgLy8gdGhyb3dzIEVycm9yKCdjb25maWcgcmVxdWlyZWQnLCB7IGNhdXNlOiBFcnJvcignZmFpbCcpIH0pXG4qIGBgYFxuKi9cbmZ1bmN0aW9uIHVud3JhcChyZXN1bHQsIG1lc3NhZ2UpIHtcblx0aWYgKHJlc3VsdC5vaykgcmV0dXJuIHJlc3VsdC52YWx1ZTtcblx0aWYgKCFpc05pbChtZXNzYWdlKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UsIHsgY2F1c2U6IHJlc3VsdC5lcnJvciB9KTtcblx0dGhyb3cgcmVzdWx0LmVycm9yO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvYXR0ZW1wdC50c1xuLyoqXG4qIEV4ZWN1dGVzIGEgc3luY2hyb25vdXMgZnVuY3Rpb24gYW5kIHdyYXBzIHRoZSBvdXRjb21lIGluIGEgYFJlc3VsdGAuXG4qIFJldHVybnMgYE9rYCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb24gc3VjY2VzcywgYEVycmAgd2l0aCB0aGUgdGhyb3duIHZhbHVlIG9uIGZhaWx1cmUuXG4qXG4qIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlXG4qIEByZXR1cm5zIEEgYFJlc3VsdGAgY29udGFpbmluZyBlaXRoZXIgdGhlIHZhbHVlIG9yIHRoZSBlcnJvclxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBjb25zdCByZXN1bHQgPSBhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UoJ3tcImFcIjoxfScpKVxuKiBpZiAoaXNPayhyZXN1bHQpKSB7XG4qICAgY29uc29sZS5sb2cocmVzdWx0LnZhbHVlKSAvLyB7IGE6IDEgfVxuKiB9XG4qIGBgYFxuKi9cbmZ1bmN0aW9uIGF0dGVtcHQoZm4pIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gb2soZm4oKSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIGVycihlcnJvcik7XG5cdH1cbn1cbi8qKlxuKiBFeGVjdXRlcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gYW5kIHdyYXBzIHRoZSBvdXRjb21lIGluIGEgYFJlc3VsdGAuXG4qIFJldHVybnMgYE9rYCB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZSBvbiBzdWNjZXNzLCBgRXJyYCB3aXRoIHRoZSByZWplY3Rpb24gcmVhc29uIG9uIGZhaWx1cmUuXG4qXG4qIEBwYXJhbSBmbiAtIFRoZSBhc3luYyBmdW5jdGlvbiB0byBleGVjdXRlXG4qIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYSBgUmVzdWx0YCBjb250YWluaW5nIGVpdGhlciB0aGUgdmFsdWUgb3IgdGhlIGVycm9yXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF0dGVtcHRBc3luYygoKSA9PiBmZXRjaCgnL2FwaS9kYXRhJykpXG4qIGlmIChpc0VycihyZXN1bHQpKSB7XG4qICAgY29uc29sZS5lcnJvcihyZXN1bHQuZXJyb3IpXG4qIH1cbiogYGBgXG4qL1xuYXN5bmMgZnVuY3Rpb24gYXR0ZW1wdEFzeW5jKGZuKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG9rKGF3YWl0IGZuKCkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBlcnIoZXJyb3IpO1xuXHR9XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9hbmRUaGVuLnRzXG5mdW5jdGlvbiBhbmRUaGVuKHJlc3VsdCwgbmV4dCkge1xuXHRyZXR1cm4gbWF0Y2gocmVzdWx0KS53aXRoKHsgb2s6IHRydWUgfSwgKHsgdmFsdWUgfSkgPT4gbmV4dCh2YWx1ZSkpLm90aGVyd2lzZSgoZmFpbHVyZSkgPT4gZmFpbHVyZSk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9jb2xsZWN0UmVzdWx0cy50c1xuZnVuY3Rpb24gY29sbGVjdFJlc3VsdHMocmVzdWx0cykge1xuXHRyZXR1cm4gbWF0Y2gocmVzdWx0cy5maW5kKGlzRXJyKSkud2l0aCh2b2lkIDAsICgpID0+IG9rKHJlc3VsdHMuZmlsdGVyKGlzT2spLm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSkpKS5vdGhlcndpc2UoKGZhaWx1cmUpID0+IGZhaWx1cmUpO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvb3JFbHNlLnRzXG5mdW5jdGlvbiBvckVsc2UocmVzdWx0LCByZWNvdmVyKSB7XG5cdHJldHVybiBtYXRjaChyZXN1bHQpLndpdGgoeyBvazogZmFsc2UgfSwgKHsgZXJyb3IgfSkgPT4gcmVjb3ZlcihlcnJvcikpLm90aGVyd2lzZSgoc3VjY2VzcykgPT4gc3VjY2Vzcyk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9wYXJ0aXRpb25SZXN1bHRzLnRzXG5mdW5jdGlvbiBwYXJ0aXRpb25SZXN1bHRzKHJlc3VsdHMpIHtcblx0cmV0dXJuIHtcblx0XHR2YWx1ZXM6IHJlc3VsdHMuZmlsdGVyKGlzT2spLm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSksXG5cdFx0ZXJyb3JzOiByZXN1bHRzLmZpbHRlcihpc0VycikubWFwKCh7IGVycm9yIH0pID0+IGVycm9yKVxuXHR9O1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvdG9kby50c1xuLyoqXG4qIFN0dWIgZm9yIGEgY29kZSBwYXRoIHlvdSBpbnRlbmQgdG8gd3JpdGUgYnV0IGhhdmVuJ3QuIFRocm93cyBhdCBydW50aW1lLFxuKiByZXR1cm5zIGBuZXZlcmAgc28gaXQgdHlwZWNoZWNrcyBpbiBhbnkgcG9zaXRpb24uXG4qXG4qIEZvciBwYXRocyB5b3UgaW50ZW50aW9uYWxseSBkb24ndCBzdXBwb3J0LCBzZWUgYHVuaW1wbGVtZW50ZWRgLlxuKiBGb3IgcGF0aHMgdGhhdCBzaG91bGQgYmUgaW1wb3NzaWJsZSwgc2VlIGB1bnJlYWNoYWJsZWAuXG4qXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY29udGV4dCBhcHBlbmRlZCB0byB0aGUgdGhyb3duIGVycm9yXG4qIEByZXR1cm5zIE5ldmVyIHJldHVybnMg4oCUIGFsd2F5cyB0aHJvd3NcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogZnVuY3Rpb24gcGFyc2VDb25maWcocmF3OiBzdHJpbmcpOiBDb25maWcge1xuKiAgIHJldHVybiB0b2RvKCd3YWl0aW5nIG9uIHNjaGVtYSBkZWNpc2lvbicpXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gdG9kbyhtZXNzYWdlKSB7XG5cdGlmIChpc05pbChtZXNzYWdlKSkgdGhyb3cgbmV3IEVycm9yKFwibm90IHlldCBpbXBsZW1lbnRlZFwiKTtcblx0dGhyb3cgbmV3IEVycm9yKGBub3QgeWV0IGltcGxlbWVudGVkOiAke21lc3NhZ2V9YCk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC91bmltcGxlbWVudGVkLnRzXG4vKipcbiogTWFya3MgYSBjb2RlIHBhdGggYXMgaW50ZW50aW9uYWxseSB1bnN1cHBvcnRlZC4gVGhyb3dzIGF0IHJ1bnRpbWUsIHJldHVybnNcbiogYG5ldmVyYCBzbyBpdCB0eXBlY2hlY2tzIGluIGFueSBwb3NpdGlvbi5cbipcbiogRm9yIHdvcmsgeW91IHBsYW4gdG8gZmluaXNoIGxhdGVyLCBzZWUgYHRvZG9gLlxuKiBGb3IgcGF0aHMgdGhhdCBzaG91bGQgYmUgaW1wb3NzaWJsZSwgc2VlIGB1bnJlYWNoYWJsZWAuXG4qXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY29udGV4dCBhcHBlbmRlZCB0byB0aGUgdGhyb3duIGVycm9yXG4qIEByZXR1cm5zIE5ldmVyIHJldHVybnMg4oCUIGFsd2F5cyB0aHJvd3NcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogdHlwZSBEcml2ZXIgPSAncG9zdGdyZXMnIHwgJ3NxbGl0ZScgfCAnbXlzcWwnXG4qXG4qIGZ1bmN0aW9uIG1pZ3JhdGUoZHJpdmVyOiBEcml2ZXIpOiB2b2lkIHtcbiogICByZXR1cm4gbWF0Y2goZHJpdmVyKVxuKiAgICAgLndpdGgoJ3Bvc3RncmVzJywgcnVuUGdNaWdyYXRpb24pXG4qICAgICAud2l0aCgnc3FsaXRlJywgcnVuU3FsaXRlTWlncmF0aW9uKVxuKiAgICAgLndpdGgoJ215c3FsJywgKCkgPT4gdW5pbXBsZW1lbnRlZCgnbXlzcWwgZHJpdmVyIGludGVudGlvbmFsbHkgdW5zdXBwb3J0ZWQnKSlcbiogICAgIC5leGhhdXN0aXZlKClcbiogfVxuKiBgYGBcbiovXG5mdW5jdGlvbiB1bmltcGxlbWVudGVkKG1lc3NhZ2UpIHtcblx0aWYgKGlzTmlsKG1lc3NhZ2UpKSB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cdHRocm93IG5ldyBFcnJvcihgbm90IGltcGxlbWVudGVkOiAke21lc3NhZ2V9YCk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC91bnJlYWNoYWJsZS50c1xuLyoqXG4qIE1hcmtzIGEgY29kZSBwYXRoIGFzIGxvZ2ljYWxseSBpbXBvc3NpYmxlLiBUaHJvd3MgYXQgcnVudGltZSBpZiBleGVjdXRpb25cbiogZ2V0cyB0aGVyZS4gUmV0dXJucyBgbmV2ZXJgIHNvIGl0IHR5cGVjaGVja3MgaW4gYW55IHBvc2l0aW9uLlxuKlxuKiBGb3Igd29yayB5b3UgcGxhbiB0byBmaW5pc2ggbGF0ZXIsIHNlZSBgdG9kb2AuXG4qIEZvciBwYXRocyB5b3UgaW50ZW50aW9uYWxseSBkb24ndCBzdXBwb3J0LCBzZWUgYHVuaW1wbGVtZW50ZWRgLlxuKlxuKiBAcGFyYW0gbWVzc2FnZSAtIE9wdGlvbmFsIGNvbnRleHQgYXBwZW5kZWQgdG8gdGhlIHRocm93biBlcnJvclxuKiBAcmV0dXJucyBOZXZlciByZXR1cm5zIOKAlCBhbHdheXMgdGhyb3dzXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGZ1bmN0aW9uIHBhcnNlRGlnaXQoaW5wdXQ6IHN0cmluZyk6IG51bWJlciB7XG4qICAgY29uc3QgcGFyc2VkID0gTnVtYmVyLnBhcnNlSW50KGlucHV0LCAxMClcbiogICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiogICAgIHJldHVybiB1bnJlYWNoYWJsZSgnY2FsbGVyIHByZS12YWxpZGF0ZWQnKVxuKiAgIH1cbiogICByZXR1cm4gcGFyc2VkXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gdW5yZWFjaGFibGUobWVzc2FnZSkge1xuXHRpZiAoaXNOaWwobWVzc2FnZSkpIHRocm93IG5ldyBFcnJvcihcImVudGVyZWQgdW5yZWFjaGFibGUgY29kZVwiKTtcblx0dGhyb3cgbmV3IEVycm9yKGBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6ICR7bWVzc2FnZX1gKTtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9jb250cm9sL3Vud3JhcE9yLnRzXG5mdW5jdGlvbiB1bndyYXBPcihyZXN1bHQsIGZhbGxiYWNrKSB7XG5cdHJldHVybiBtYXRjaChyZXN1bHQpLndpdGgoeyBvazogdHJ1ZSB9LCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSkub3RoZXJ3aXNlKCgpID0+IGZhbGxiYWNrKTtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgdW53cmFwIGFzIF8sIHVuaW1wbGVtZW50ZWQgYXMgYSwgb3JFbHNlIGFzIGMsIGF0dGVtcHQgYXMgZCwgYXR0ZW1wdEFzeW5jIGFzIGYsIG9rIGFzIGcsIGlzT2sgYXMgaCwgdW5yZWFjaGFibGUgYXMgaSwgY29sbGVjdFJlc3VsdHMgYXMgbCwgaXNFcnIgYXMgbSwgaW52YXJpYW50IGFzIG4sIHRvZG8gYXMgbywgZXJyIGFzIHAsIHVud3JhcE9yIGFzIHIsIHBhcnRpdGlvblJlc3VsdHMgYXMgcywgYXNzZXJ0IGFzIHQsIGFuZFRoZW4gYXMgdSB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250cm9sLUJsTDdUbUE3Lm1qcy5tYXAiLCJpbXBvcnQgeyBOb25FeGhhdXN0aXZlRXJyb3IsIFAsIFBhdHRlcm4sIGlzTWF0Y2hpbmcsIG1hdGNoLCBtYXRjaCBhcyBtYXRjaCQxIH0gZnJvbSBcInRzLXBhdHRlcm5cIjtcbi8vI3JlZ2lvbiBzcmMvbWF0Y2gvbWF0Y2gudHNcbi8qKlxuKiBFeHRlbmRzIHRzLXBhdHRlcm4ncyBgUGAgbmFtZXNwYWNlIHdpdGggYFAub2soKWAgYW5kIGBQLmVycigpYCDigJQgcGF0dGVyblxuKiBmYWN0b3JpZXMgZm9yIG1hdGNoaW5nIGEgYFJlc3VsdGAgYW5kIGl0cyBjb250YWluZWQgdmFsdWUgb3IgZXJyb3IuXG4qXG4qIE1pcnJvcnMgUnVzdCdzIGBPayh2YWx1ZSlgIC8gYEVycihlcnJvcilgIG1hdGNoIGFybXMsIGJ1dCB1c2VzIHRoZVxuKiBuYW1lc3BhY2UtbWV0aG9kIGZvcm0gKGBQLm9rKClgIC8gYFAuZXJyKClgKSBzbyBpdCBkb2Vzbid0IGNvbGxpZGUgd2l0aFxuKiB0aGUgbG93ZXJjYXNlIGBvaygpYCAvIGBlcnIoKWAgY29uc3RydWN0b3JzIGZyb20gYG1hc3NhbWFuL2NvbnRyb2xgLlxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBpbXBvcnQgeyBtYXRjaCwgUCwgYXR0ZW1wdCB9IGZyb20gJ21hc3NhbWFuJ1xuKlxuKiBtYXRjaChhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UocmF3KSkpXG4qICAgLndpdGgoUC5vaygpLCAoeyB2YWx1ZSB9KSA9PiB1c2UodmFsdWUpKVxuKiAgIC53aXRoKFAuZXJyKCksICh7IGVycm9yIH0pID0+IGxvZyhlcnJvcikpXG4qICAgLmV4aGF1c3RpdmUoKVxuKiBgYGBcbiovXG5mdW5jdGlvbiBva1BhdHRlcm4oLi4ucGF0dGVybnMpIHtcblx0cmV0dXJuIG1hdGNoKHBhdHRlcm5zKS53aXRoKFtdLCAoKSA9PiAoeyBvazogdHJ1ZSB9KSkub3RoZXJ3aXNlKChbcGF0dGVybl0pID0+ICh7XG5cdFx0b2s6IHRydWUsXG5cdFx0dmFsdWU6IHBhdHRlcm5cblx0fSkpO1xufVxuZnVuY3Rpb24gZXJyUGF0dGVybiguLi5wYXR0ZXJucykge1xuXHRyZXR1cm4gbWF0Y2gocGF0dGVybnMpLndpdGgoW10sICgpID0+ICh7IG9rOiBmYWxzZSB9KSkub3RoZXJ3aXNlKChbcGF0dGVybl0pID0+ICh7XG5cdFx0b2s6IGZhbHNlLFxuXHRcdGVycm9yOiBwYXR0ZXJuXG5cdH0pKTtcbn1cbi8qKlxuKiBFeHRlbmRlZCB0cy1wYXR0ZXJuIGBQYCBuYW1lc3BhY2UuIENhcnJpZXMgZXZlcnl0aGluZyB0cy1wYXR0ZXJuIGV4cG9ydHNcbiogKGBQLnN0cmluZ2AsIGBQLm51bWJlcmAsIGBQLmFycmF5YCwgYFAud2hlbmAsIOKApikgcGx1cyBgUC5vaygpYCAvIGBQLmVycigpYFxuKiBmb3IgbWF0Y2hpbmcgYFJlc3VsdGAgdmFsdWVzIGFuZCB0aGVpciBjb250ZW50cy5cbipcbiogRm9yIHRoZSBgUC5QYXR0ZXJuPFQ+YCB0eXBlIHNob3J0aGFuZCwgaW1wb3J0IGBQYXR0ZXJuYCBzdGFuZGFsb25lIGZyb21cbiogYG1hc3NhbWFuL21hdGNoYCDigJQgaXQncyB0aGUgZm9ybSB0cy1wYXR0ZXJuJ3Mgb3duIGRvY3MgcmVjb21tZW5kLlxuKi9cbmNvbnN0IFAkMSA9IHtcblx0Li4uUCxcblx0b2s6IG9rUGF0dGVybixcblx0ZXJyOiBlcnJQYXR0ZXJuXG59O1xuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBQJDEgYXMgYSwgbWF0Y2gkMSBhcyBpLCBQYXR0ZXJuIGFzIG4sIGlzTWF0Y2hpbmcgYXMgciwgTm9uRXhoYXVzdGl2ZUVycm9yIGFzIHQgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0Y2gtZkJldGZhSWEubWpzLm1hcCIsIi8vIFR1bmFibGUgZGVmYXVsdHMgZm9yIHRoZSBucG0tbmFtZXIgcGlwZWxpbmUuIENlbnRyYWxpemVkIHNvIGRvY3MsIHRoZSBDTEksXG4vLyBhbmQgdGVzdHMgY2FuIHJlZmVyZW5jZSBhIHNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGguXG5cbi8qKiBEZWZhdWx0IGNhcCBvbiBjYW5kaWRhdGVzIGNoZWNrZWQgcGVyIHJ1bi4gQ0xJOiAtLWxpbWl0LiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElNSVQgPSA1MFxuXG4vKiogRGVmYXVsdCBwYXJhbGxlbCBIRUFEIHJlcXVlc3RzIGFnYWluc3QgdGhlIHJlZ2lzdHJ5LiBDTEk6IC0tY29uY3VycmVuY3kuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05DVVJSRU5DWSA9IDEyXG5cbi8qKiBOZXR3b3JrIHRpbWVvdXQgcGVyIHJlZ2lzdHJ5IEhFQUQgcmVxdWVzdCAobXMpLiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVHSVNUUllfVElNRU9VVF9NUyA9IDgwMDBcblxuLyoqIG5wbSByZWdpc3RyeSBiYXNlIFVSTDsgb3ZlcnJpZGFibGUgdmlhIE5QTV9SRUdJU1RSWV9VUkwgZW52LiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVHSVNUUllfQkFTRSA9IHByb2Nlc3MuZW52Lk5QTV9SRUdJU1RSWV9VUkwgfHwgJ2h0dHBzOi8vcmVnaXN0cnkubnBtanMub3JnJ1xuXG4vKiogTW9uaWtlciAyLWluc2VydGlvbiBjYXAsIHNjYWxlZCBwZXIgYGJhcmUubGVuZ3RoYCBzbyBsb25nZXIgbmFtZXMgc3RpbGxcbiAqIHJlYWNoIG1pZC1zdHJpbmcgbW9ycGhlbWUgc3BsaXRzIChlLmcuIGBxdWljay1qc29uLXBhcnNlcmAgYXQgZ2FwPTUsXG4gKiBgcmVhY3QtbmF0aXZlLW5hdmlnYXRpb25gIGF0IGdhcD02KS4gVmFyaWFudHMgPSBwYWlycyDDlyA5IHNlcGFyYXRvciBjb21ib3MuICovXG5leHBvcnQgY29uc3QgTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0RFRkFVTFQgPSAyNTBcbmV4cG9ydCBjb25zdCBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0RFRkFVTFQgPSA0MFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0RFRkFVTFQgPSAxNTAwXG5cbi8qKiBNb25pa2VyIDItaW5zZXJ0aW9uIGNhcCAoLS1leGhhdXN0aXZlKTogd2lkZXIgY292ZXJhZ2UsIHNsb3dlci4gKi9cbmV4cG9ydCBjb25zdCBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfRVhIQVVTVElWRSA9IDYwMFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfRVhIQVVTVElWRSA9IDEyMFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0VYSEFVU1RJVkUgPSA1MDAwXG5cbi8qKiBEZWZhdWx0IGVkaXQtZGlzdGFuY2UgdGhyZXNob2xkIGZvciBuZWFyLW1hdGNoIHdhcm5pbmdzLiBDTEk6IC0tbmVhci1kaXN0YW5jZS4gKi9cbmV4cG9ydCBjb25zdCBORUFSX01BVENIX01BWF9ESVNUQU5DRSA9IDJcblxuLyoqIE1pbmltdW0gY29ycHVzLW5hbWUgbGVuZ3RoIGZvciBuZWFyLW1hdGNoIGNvbXBhcmlzb24uIEJlbG93IDMgdGhlIGZhbHNlXG4gKiBwb3NpdGl2ZSByYXRlIHNwaWtlcy4gS2VlcHMgcG9wdWxhciAzLWNoYXIgbmFtZXMgKGB6b2RgLCBgYWp2YCwgYHRzeGApIGluXG4gKiBzY29wZTsgMi1jaGFyIG5hbWVzIGxpa2UgYHFzYCBhcmUgaW50ZW50aW9uYWxseSBiZWxvdyB0aGlzIGZsb29yLiAqL1xuZXhwb3J0IGNvbnN0IE5FQVJfTUFUQ0hfTUlOX0NPUlBVU19MRU4gPSAzXG5cbi8qKiBNYXggbnVtYmVyIG9mIG5lYXItbWF0Y2ggbmVpZ2hib3JzIHN1cmZhY2VkIHBlciBhdmFpbGFibGUgY2FuZGlkYXRlLiAqL1xuZXhwb3J0IGNvbnN0IE5FQVJfTUFUQ0hfTUFYX05FSUdIQk9SUyA9IDNcblxuLyoqIFNob3J0bGlzdCBzaXplIGluIHRoZSBcImF2YWlsYWJsZSArIGNsZWFuXCIgZ3JvdXAgcHJpbnRlZCBhdCB0aGUgZW5kLiAqL1xuZXhwb3J0IGNvbnN0IFNIT1JUTElTVF9MSU1JVCA9IDEwXG5cbi8qKiBNYXggc2FtcGxlIHNpemUgaW4gdGhlIGB1bnZlcmlmaWVkYCBmaWVsZCBvbiBhIHZlcmRpY3QuIEZ1bGwgY291bnQgaXNcbiAqIHByZXNlcnZlZCBpbiBgdW52ZXJpZmllZFRvdGFsYC4gV2l0aG91dCB0cnVuY2F0aW9uLCBhIGhhbW1lcmVkIHJlZ2lzdHJ5XG4gKiByZXR1cm5pbmcgNDI5IGFjcm9zcyBodW5kcmVkcyBvZiB2YXJpYW50cyB3b3VsZCBkdW1wIGtpbG9ieXRlcyBvZlxuICogdXNlbGVzcyB2YXJpYW50IG5hbWVzIHBlciBjYW5kaWRhdGUgaW50byAtLWpzb24gb3V0cHV0LiAqL1xuZXhwb3J0IGNvbnN0IFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUgPSAxMFxuIiwiLy8gUG9wdWxhci1uYW1lcyBjb3JwdXMgbG9hZGVyLiBSZWFkcyBgcG9wdWxhci1uYW1lcy5qc29uYCAoY29tbWl0dGVkXG4vLyBidWlsZCBhcnRpZmFjdCkgYW5kIHJldHVybnMgaXQgYXMgYSBSZXN1bHQuIE1lbW9pemVkIGFmdGVyIGZpcnN0XG4vLyBzdWNjZXNzZnVsIHJlYWQgYmVjYXVzZSB0aGUgZmlsZSBpcyB+MjYwIEtCIGFuZCB0aGUgQ0xJIG1heSBjYWxsXG4vLyB0aGlzIG1hbnkgdGltZXMgaW4gYSBzaW5nbGUgcnVuLlxuLy9cbi8vIFNvdXJjZTogdG9wIH4xNSBLIHVuc2NvcGVkIG5wbSBwYWNrYWdlcyBieSBtb250aGx5IGRvd25sb2Fkcywgc25hcHNob3Rcbi8vIGZyb20gYG5pY2UtcmVnaXN0cnkvZG93bmxvYWQtY291bnRzYC4gU2VlIHJlZnJlc2gtcG9wdWxhci1uYW1lcy5tanMuXG5cbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgeyBhdHRlbXB0LCBlcnIsIG9rIH0gZnJvbSAnbWFzc2FtYW4nXG5cbmNvbnN0IEhFUkUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb3JwdXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzb3VyY2UgLSBwcm92ZW5hbmNlIHN0cmluZywgZS5nLiBcIm5pY2UtcmVnaXN0cnkvZG93bmxvYWQtY291bnRzXCJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc291cmNlVmVyc2lvbl1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBnZW5lcmF0ZWQgLSBJU08gZGF0ZSB0aGUgc25hcHNob3Qgd2FzIGJ1aWx0XG4gKiBAcHJvcGVydHkge251bWJlcn0gc2l6ZSAtIGNvcnB1cyBuYW1lIGNvdW50XG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBuYW1lcyAtIHVuc2NvcGVkIHBhY2thZ2UgbmFtZXMsIGRlc2NlbmRpbmcgYnkgZG93bmxvYWRzXG4gKi9cblxuLy8gSW52YXJpYW50OiBjYWNoZSBob2xkcyB0aGUgRklSU1Qgc3VjY2Vzc2Z1bCBsb2FkLiBJZiBgbG9hZENvcnB1c2AgaXNcbi8vIGNhbGxlZCBhZ2Fpbiwgd2UgcmV0dXJuIHRoZSBzYW1lIFJlc3VsdC4gTW9kdWxlLWxldmVsIG11dGF0aW9uIGhlcmUgaXNcbi8vIHB1cmUgbWVtb2l6YXRpb24g4oCUIHRoZSBjb3JwdXMgbmV2ZXIgY2hhbmdlcyB3aXRoaW4gYSBwcm9jZXNzLlxubGV0IGNhY2hlID0gbnVsbFxuXG4vKipcbiAqIFRyeSB0aGUgc2FtZS1kaXIgYW5kIHBhcmVudC1kaXIgbG9jYXRpb25zIGZvciBgcG9wdWxhci1uYW1lcy5qc29uYC4gQm90aFxuICogdGhlIGJ1aWx0IGJ1bmRsZSAoYGRpc3QvY2hlY2subWpzYCkgYW5kIHRoZSB1bmJ1bmRsZWQgc291cmNlIGxpdmUgb25lXG4gKiBsZXZlbCBiZWxvdyB0aGUgY2Fub25pY2FsIEpTT04gZmlsZSdzIGxvY2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAqL1xuZnVuY3Rpb24gY2FuZGlkYXRlUGF0aHMoKSB7XG4gIHJldHVybiBbam9pbihIRVJFLCAnLi4nLCAncG9wdWxhci1uYW1lcy5qc29uJyksIGpvaW4oSEVSRSwgJ3BvcHVsYXItbmFtZXMuanNvbicpXVxufVxuXG4vKipcbiAqIExvYWQgdGhlIHBvcHVsYXItbmFtZXMgY29ycHVzLiBSZXR1cm5zIE9rKGNvcnB1cykgb24gc3VjY2VzcywgRXJyIG9uIGFcbiAqIHJlYWQgb3IgcGFyc2UgZmFpbHVyZS4gUmVzdWx0IGlzIGNhY2hlZCBhZnRlciB0aGUgZmlyc3QgT2s7IEVyciByZXN1bHRzXG4gKiBhcmUgbm90IGNhY2hlZCBzbyB0cmFuc2llbnQgZmFpbHVyZXMgY2FuIGJlIHJldHJpZWQuXG4gKlxuICogQHJldHVybnMge2ltcG9ydCgnbWFzc2FtYW4nKS5SZXN1bHQ8Q29ycHVzLCBFcnJvcj59XG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVzdWx0ID0gbG9hZENvcnB1cygpXG4gKiBpZiAoaXNPayhyZXN1bHQpKSBmb3IgKGNvbnN0IG5hbWUgb2YgcmVzdWx0LnZhbHVlLm5hbWVzKSB7IOKApiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29ycHVzKCkge1xuICBpZiAoY2FjaGUgJiYgY2FjaGUub2spIHJldHVybiBjYWNoZVxuXG4gIGZvciAoY29uc3QgcGF0aCBvZiBjYW5kaWRhdGVQYXRocygpKSB7XG4gICAgY29uc3QgcmVhZCA9IGF0dGVtcHQoKCkgPT4gcmVhZEZpbGVTeW5jKHBhdGgsICd1dGY4JykpXG4gICAgaWYgKCFyZWFkLm9rKSBjb250aW51ZVxuICAgIGNvbnN0IHBhcnNlZCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZShyZWFkLnZhbHVlKSlcbiAgICBpZiAoIXBhcnNlZC5vaykge1xuICAgICAgY2FjaGUgPSBlcnIobmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBpcyBtYWxmb3JtZWQ6ICR7cGFyc2VkLmVycm9yLm1lc3NhZ2V9YCkpXG4gICAgICByZXR1cm4gY2FjaGVcbiAgICB9XG4gICAgY29uc3Qgc2hhcGVFcnJvciA9IHZhbGlkYXRlU2hhcGUocGFyc2VkLnZhbHVlLCBwYXRoKVxuICAgIGlmIChzaGFwZUVycm9yKSB7XG4gICAgICBjYWNoZSA9IGVycihzaGFwZUVycm9yKVxuICAgICAgcmV0dXJuIGNhY2hlXG4gICAgfVxuICAgIGNhY2hlID0gb2socGFyc2VkLnZhbHVlKVxuICAgIHJldHVybiBjYWNoZVxuICB9XG5cbiAgY2FjaGUgPSBlcnIobmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gbm90IGZvdW5kIGluIGFueSBvZjogJHtjYW5kaWRhdGVQYXRocygpLmpvaW4oJywgJyl9YCkpXG4gIHJldHVybiBjYWNoZVxufVxuXG4vKipcbiAqIENvbmZpcm0gdGhlIHBhcnNlZCBKU09OIGhhcyB0aGUgc2hhcGUgYENvcnB1c2AgZXhwZWN0cy4gUmV0dXJucyBhblxuICogRXJyb3IgZGVzY3JpYmluZyB0aGUgZmlyc3QgbWlzc2luZyBmaWVsZCwgb3IgbnVsbCBpZiB0aGUgc2hhcGUgaXMgdmFsaWQuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtFcnJvciB8IG51bGx9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVNoYXBlKHZhbHVlLCBwYXRoKSB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYHBvcHVsYXItbmFtZXMuanNvbiBhdCAke3BhdGh9IGlzIG5vdCBhbiBvYmplY3RgKVxuICB9XG4gIGNvbnN0IHJlcXVpcmVkID0geyBzb3VyY2U6ICdzdHJpbmcnLCBnZW5lcmF0ZWQ6ICdzdHJpbmcnLCBuYW1lczogJ2FycmF5JyB9XG4gIGZvciAoY29uc3QgW2ZpZWxkLCBleHBlY3RlZFR5cGVdIG9mIE9iamVjdC5lbnRyaWVzKHJlcXVpcmVkKSkge1xuICAgIGNvbnN0IGFjdHVhbCA9IHZhbHVlW2ZpZWxkXVxuICAgIGNvbnN0IG1hdGNoZXMgPVxuICAgICAgZXhwZWN0ZWRUeXBlID09PSAnYXJyYXknID8gQXJyYXkuaXNBcnJheShhY3R1YWwpIDogdHlwZW9mIGFjdHVhbCA9PT0gZXhwZWN0ZWRUeXBlXG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICBgcG9wdWxhci1uYW1lcy5qc29uIGF0ICR7cGF0aH0gbWlzc2luZyBvciB3cm9uZy10eXBlZCBmaWVsZCBcIiR7ZmllbGR9XCIgKGV4cGVjdGVkICR7ZXhwZWN0ZWRUeXBlfSlgXG4gICAgICApXG4gICAgfVxuICB9XG4gIGlmICh2YWx1ZS5uYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBoYXMgYW4gZW1wdHkgbmFtZXMgYXJyYXlgKVxuICB9XG4gIGNvbnN0IGJhZEVudHJ5ID0gdmFsdWUubmFtZXMuZmluZEluZGV4KChuYW1lKSA9PiB0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIW5hbWUpXG4gIGlmIChiYWRFbnRyeSA+PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgIGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBoYXMgYSBub24tc3RyaW5nIG9yIGVtcHR5IGVudHJ5IGF0IGluZGV4ICR7YmFkRW50cnl9YFxuICAgIClcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlLnNpemUgPT09ICdudW1iZXInICYmIHZhbHVlLnNpemUgIT09IHZhbHVlLm5hbWVzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICBgcG9wdWxhci1uYW1lcy5qc29uIGF0ICR7cGF0aH06IHNpemUgZmllbGQgKCR7dmFsdWUuc2l6ZX0pIGRvZXNuJ3QgbWF0Y2ggbmFtZXMubGVuZ3RoICgke3ZhbHVlLm5hbWVzLmxlbmd0aH0pYFxuICAgIClcbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIFRlc3Qtb25seSBlc2NhcGUgaGF0Y2gg4oCUIGNsZWFycyB0aGUgbWVtb2l6YXRpb24gY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZXNldENvcnB1c0NhY2hlKCkge1xuICBjYWNoZSA9IG51bGxcbn1cbiIsIi8vIERldGVybWluaXN0aWMgcGVybXV0YXRpb24gZW5naW5lLiBHaXZlbiBzZWVkIHdvcmRzIChhbmQgb3B0aW9uYWwgcHJlZml4IC9cbi8vIHN1ZmZpeCBsaXN0cyksIHByb2R1Y2UgY2FuZGlkYXRlIHBhY2thZ2UgbmFtZXMgYnkgam9pbmluZywgcHJlZml4aW5nLFxuLy8gc3VmZml4aW5nLCBhbmQgcmUtc2VwYXJhdGluZy4gVGhlIGFnZW50IGZlZWRzIGluIGl0cyBicmFpbnN0b3JtZWQgc2VlZHM7XG4vLyB0aGlzIGV4cGFuZHMgdGhlbSBpbnRvIHRoZSBzZWFyY2ggc3BhY2Ugd2l0aG91dCBoYWxsdWNpbmF0aW5nIG5ldyB0b2tlbnMuXG5cbmNvbnN0IERFRkFVTFRfUFJFRklYRVMgPSBbXG4gICd0aW55JyxcbiAgJ21pbmknLFxuICAncGljbycsXG4gICduYW5vJyxcbiAgJ2xpdGUnLFxuICAnbWljcm8nLFxuICAnZmFzdCcsXG4gICdsZWFuJyxcbiAgJ3F1aWNrJyxcbiAgJ3NsaW0nLFxuICAncHVyZScsXG4gICdzdXBlcicsXG4gICd1bHRyYScsXG4gICdtZXRhJyxcbiAgJ2F1dG8nLFxuICAnc21hcnQnLFxuXVxuXG5jb25zdCBERUZBVUxUX1NVRkZJWEVTID0gW1xuICAnanMnLFxuICAndHMnLFxuICAnbGliJyxcbiAgJ2tpdCcsXG4gICdjb3JlJyxcbiAgJ3BybycsXG4gICdjbGknLFxuICAndG9vbHMnLFxuICAndXRpbHMnLFxuICAnZm9yZ2UnLFxuICAnc21pdGgnLFxuICAnY3JhZnQnLFxuICAnbGFiJyxcbiAgJ2JveCcsXG4gICdlbmdpbmUnLFxuICAnc3R1ZGlvJyxcbl1cblxuY29uc3QgQ09OTkVDVE9SUyA9IFsnJywgJy0nXVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBlcm11dGVPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBbcHJlZml4ZXNdIC0gb3ZlcnJpZGUgZGVmYXVsdCBwcmVmaXggbGlzdFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gW3N1ZmZpeGVzXSAtIG92ZXJyaWRlIGRlZmF1bHQgc3VmZml4IGxpc3RcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IFtjb25uZWN0b3JzXSAtIHNlcGFyYXRvcnMgYmV0d2VlbiBwYXJ0cyAoZGVmYXVsdDogJycsICctJylcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Nob3VsZEluY2x1ZGVVbmRlcnNjb3JlXSAtIGFsc28gdXNlICdfJyBhcyBhIGNvbm5lY3RvciAoZGVmYXVsdDogZmFsc2UpXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtzaG91bGRDb21iaW5lVHdvU2VlZHNdIC0gam9pbiBwYWlycyBvZiBzZWVkcyAoZGVmYXVsdDogdHJ1ZSlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc2NvcGVdIC0gaWYgc2V0LCBhbHNvIGVtaXQgYEBzY29wZS88bmFtZT5gIHZhcmlhbnRzXG4gKi9cblxuLyoqXG4gKiBHZW5lcmF0ZSBwYWNrYWdlIG5hbWUgY2FuZGlkYXRlcyBmcm9tIHNlZWQgd29yZHMuXG4gKlxuICogRm9yIHNlZWRzPVsndGlueScsJ2xvZyddLCBwcm9kdWNlcyB0aGluZ3MgbGlrZTpcbiAqICAgbG9nLCB0aW55LCB0aW55bG9nLCB0aW55LWxvZywgbWluaS1sb2csIG5hbm8tbG9nLCBsb2ctY2xpLCBsb2dqcywgLi4uXG4gKlxuICogT3V0cHV0IGlzIGRlZHVwbGljYXRlZDsgb3JkZXIgaXMgcm91Z2hseTogYmFyZSBzZWVkcywgdHdvLXNlZWQgY29tYm9zLFxuICogcHJlZml4K3NlZWQsIHNlZWQrc3VmZml4LiBDYWxsZXIgYXBwbGllcyBhbnkgbGltaXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc2VlZHNcbiAqIEBwYXJhbSB7UGVybXV0ZU9wdGlvbnN9IFtvcHRzXVxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICogQGV4YW1wbGVcbiAqIHBlcm11dGUoWydsb2cnXSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbJ2xvZycsICd0aW55LWxvZycsICd0aW55bG9nJywg4oCmXVxuICogcGVybXV0ZShbJ2xvZyddLCB7IHNjb3BlOiAnQG1lJyB9KSAgICAgICAgICAgIC8vIFsnQG1lL2xvZycsICdAbWUvdGlueS1sb2cnLCDigKZdXG4gKiBwZXJtdXRlKFsnbG9nJ10sIHsgcHJlZml4ZXM6IFsndWx0cmEnXSB9KSAgICAgLy8gWydsb2cnLCAndWx0cmEtbG9nJywgJ3VsdHJhbG9nJywg4oCmXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGVybXV0ZShzZWVkcywgb3B0cyA9IHt9KSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShzZWVkcykgfHwgc2VlZHMubGVuZ3RoID09PSAwKSByZXR1cm4gW11cblxuICBjb25zdCBwcmVmaXhlcyA9IG9wdHMucHJlZml4ZXMgPz8gREVGQVVMVF9QUkVGSVhFU1xuICBjb25zdCBzdWZmaXhlcyA9IG9wdHMuc3VmZml4ZXMgPz8gREVGQVVMVF9TVUZGSVhFU1xuICBjb25zdCBjb25uZWN0b3JzID1cbiAgICBvcHRzLmNvbm5lY3RvcnMgPz8gKG9wdHMuc2hvdWxkSW5jbHVkZVVuZGVyc2NvcmUgPyBbLi4uQ09OTkVDVE9SUywgJ18nXSA6IENPTk5FQ1RPUlMpXG4gIGNvbnN0IHNob3VsZENvbWJpbmVUd29TZWVkcyA9IG9wdHMuc2hvdWxkQ29tYmluZVR3b1NlZWRzICE9PSBmYWxzZVxuICBjb25zdCBzY29wZSA9IG9wdHMuc2NvcGVcblxuICBjb25zdCBjbGVhbmVkID0gc2VlZHNcbiAgICAubWFwKChzKSA9PiBTdHJpbmcocykudHJpbSgpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmZpbHRlcigocykgPT4gcy5sZW5ndGggPiAwICYmIC9eW2EtejAtOV0rJC8udGVzdChzKSlcblxuICBjb25zdCBvdXQgPSBuZXcgU2V0KClcblxuICBmb3IgKGNvbnN0IHMgb2YgY2xlYW5lZCkgb3V0LmFkZChzKVxuXG4gIGlmIChzaG91bGRDb21iaW5lVHdvU2VlZHMpIHtcbiAgICBmb3IgKGNvbnN0IGEgb2YgY2xlYW5lZCkge1xuICAgICAgZm9yIChjb25zdCBiIG9mIGNsZWFuZWQpIHtcbiAgICAgICAgaWYgKGEgPT09IGIpIGNvbnRpbnVlXG4gICAgICAgIGZvciAoY29uc3Qgc2VwIG9mIGNvbm5lY3RvcnMpIG91dC5hZGQoYSArIHNlcCArIGIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBwIG9mIHByZWZpeGVzKSB7XG4gICAgZm9yIChjb25zdCBzIG9mIGNsZWFuZWQpIHtcbiAgICAgIGlmIChwID09PSBzKSBjb250aW51ZVxuICAgICAgZm9yIChjb25zdCBzZXAgb2YgY29ubmVjdG9ycykgb3V0LmFkZChwICsgc2VwICsgcylcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHMgb2YgY2xlYW5lZCkge1xuICAgIGZvciAoY29uc3Qgc2Ygb2Ygc3VmZml4ZXMpIHtcbiAgICAgIGlmIChzZiA9PT0gcykgY29udGludWVcbiAgICAgIGZvciAoY29uc3Qgc2VwIG9mIGNvbm5lY3RvcnMpIG91dC5hZGQocyArIHNlcCArIHNmKVxuICAgIH1cbiAgfVxuXG4gIGxldCBuYW1lcyA9IFsuLi5vdXRdXG4gIGlmIChzY29wZSkgbmFtZXMgPSBuYW1lcy5tYXAoKG4pID0+IGAke3Njb3BlfS8ke259YClcbiAgcmV0dXJuIG5hbWVzXG59XG5cbi8qKlxuICogU2NvcmUgYSBjYW5kaWRhdGUgbmFtZSBmb3IgcmFua2luZy4gTG93ZXIgaXMgYmV0dGVyLlxuICogICAtIHNob3J0ZXIgbmFtZXMgcmFuayBsb3dlciAocHJlZmVycmVkKVxuICogICAtIGh5cGhlbmF0ZWQgbmFtZXMgcmFuayBsb3dlciB0aGFuIGNvbmNhdGVuYXRlZCAobW9yZSByZWFkYWJsZSlcbiAqICAgLSBuYW1lcyBjb250YWluaW5nIGEgc2VlZCByYW5rIGxvd2VyIChhbmNob3IgcmVsZXZhbmNlKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzZWVkc1xuICogQHJldHVybnMge251bWJlcn1cbiAqIEBleGFtcGxlXG4gKiBzY29yZSgnbG9nJykgICAgICAgICAgICAgICAgICAgICAgIC8vIDNcbiAqIHNjb3JlKCd0aW55LWxvZycsIFsnbG9nJ10pICAgICAgICAgLy8gOCAtIDIgKGh5cGhlbikgLSAzIChjb250YWlucyBzZWVkKSA9IDNcbiAqIHNjb3JlKCdsb2dnZXJfcHJvJywgWydsb2cnXSkgICAgICAgLy8gMTAgKyAxICh1bmRlcnNjb3JlKSAtIDMgKGNvbnRhaW5zIHNlZWQpID0gOFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NvcmUobmFtZSwgc2VlZHMgPSBbXSkge1xuICBjb25zdCBsb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICBsZXQgcmVzdWx0ID0gbG93ZXIubGVuZ3RoXG4gIGlmIChsb3dlci5pbmNsdWRlcygnLScpKSByZXN1bHQgLT0gMlxuICBpZiAobG93ZXIuaW5jbHVkZXMoJ18nKSkgcmVzdWx0ICs9IDFcbiAgZm9yIChjb25zdCBzZWVkIG9mIHNlZWRzKSB7XG4gICAgaWYgKGxvd2VyLmluY2x1ZGVzKHNlZWQudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIHJlc3VsdCAtPSAzXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCB7IERFRkFVTFRfUFJFRklYRVMsIERFRkFVTFRfU1VGRklYRVMgfVxuIiwiLy8gbnBtIG1vbmlrZXIgY29sbGlzaW9uIHJ1bGUuIFdoZW4geW91IHB1Ymxpc2ggYSBuZXcgdW5zY29wZWQgcGFja2FnZSwgdGhlXG4vLyByZWdpc3RyeSByZWplY3RzIG5hbWVzIHdob3NlIGBsb3dlcmNhc2UgKyBzdHJpcCBbLl8tXWAgZm9ybSBjb2xsaWRlcyB3aXRoXG4vLyBhbiBleGlzdGluZyBwYWNrYWdlLiBTb3VyY2U6IGh0dHBzOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xNjg5NzgzNzc1NzAvbmV3LXBhY2thZ2UtbW9uaWtlci1ydWxlc1xuLy9cbi8vIElNUE9SVEFOVCDigJQgdmFyaWFudCBlbnVtZXJhdGlvbiBpcyAqcHJvYmFiaWxpc3RpYyosIG5vdCBleGhhdXN0aXZlLiBXZVxuLy8gZW51bWVyYXRlIG9uZS0gYW5kIHR3by1wb3NpdGlvbiBzZXBhcmF0b3IgaW5zZXJ0aW9ucyBwbHVzIGZ1bGwtc3BsaXRcbi8vIGZvcm1zLiBQYXRob2xvZ2ljYWwgbXVsdGktaW5zZXJ0aW9uIHZhcmlhbnRzIChgYS5iLWNfZGVmYC1zdHlsZSkgYW5kXG4vLyBtaXhlZC1zZXBhcmF0b3IgMysgaW5zZXJ0aW9ucyBjYW4gbm9ybWFsaXplIHRvIHRoZSBzYW1lIGZvcm0gYnV0IHdvbid0XG4vLyBiZSBxdWVyaWVkLiBGb3IgYXV0aG9yaXRhdGl2ZSBwcmUtZmxpZ2h0LCB1c2UgYG5wbSBwdWJsaXNoIC0tZHJ5LXJ1bmAuXG5cbmltcG9ydCB7IGF0dGVtcHRBc3luYyB9IGZyb20gJ21hc3NhbWFuJ1xuXG5pbXBvcnQge1xuICBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfREVGQVVMVCxcbiAgTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0VYSEFVU1RJVkUsXG4gIE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0RFRkFVTFQsXG4gIE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0VYSEFVU1RJVkUsXG4gIE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfREVGQVVMVCxcbiAgTU9OSUtFUl8ySU5TRVJUX0NBUF9TQ0FMRV9FWEhBVVNUSVZFLFxufSBmcm9tICcuL2NvbnN0YW50cy5tanMnXG5cbmNvbnN0IFNFUEFSQVRPUlMgPSBbJy0nLCAnXycsICcuJ11cblxuLyoqXG4gKiBOb3JtYWxpemUgYSBuYW1lIHRoZSB3YXkgbnBtJ3MgbW9uaWtlciBjb2xsaXNpb24gY2hlY2sgZG9lczogbG93ZXJjYXNlXG4gKiBhbmQgc3RyaXAgdGhlIHB1bmN0dWF0aW9uIGNoYXJzIGAuYCwgYC1gLCBgX2AuIFNjb3BlZCBuYW1lcyBrZWVwIHRoZWlyXG4gKiBzY29wZSBzZWdtZW50LlxuICpcbiAqICoqQVNDSUkgcHJlY29uZGl0aW9uLioqIFRoaXMgbWlycm9ycyBucG0ncyBzZXJ2ZXItc2lkZSBydWxlIGV4YWN0bHksIHdoaWNoXG4gKiBwcmVkYXRlcyBVbmljb2RlLWF3YXJlIG5vcm1hbGl6YXRpb24uIE5hbWVzIHdpdGggVW5pY29kZSAoZS5nLiBgxLBgIOKGkiBgacyHYFxuICogaW4gc29tZSBsb2NhbGVzLCBgw59gIOKGkiBgc3NgKSBhcmUgKm5vdCogY2Fub25pY2FsaXplZCBoZXJlOyB0aGV5J3JlIGFscmVhZHlcbiAqIHJlamVjdGVkIHVwc3RyZWFtIGJ5IGB2YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lYCdzIFVSTC1zYWZldHkgY2hlY2suIElmXG4gKiBub24tQVNDSUkgc2xpcHMgdGhyb3VnaCwgZXF1aXZhbGVuY2UgbWF5IG5vdCBtYXRjaCB0aGUgcmVnaXN0cnkncyBiZWhhdmlvci5cbiAqXG4gKiBSZXR1cm5zIGAnJ2AgZm9yIG5vbi1zdHJpbmcgLyBlbXB0eSBpbnB1dCBzbyBjYWxsZXJzIGNhbiBicmFuY2ggd2l0aG91dFxuICogYSBzZXBhcmF0ZSBndWFyZC5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAZXhhbXBsZVxuICogbm9ybWFsaXplKCdQaWNvLUxvZycpICAgICAgICAgLy8gJ3BpY29sb2cnXG4gKiBub3JtYWxpemUoJ2pzLW9uLXN0cmVhbScpICAgICAvLyAnanNvbnN0cmVhbScgIChjb2xsaWRlcyB3aXRoIGBqc29uc3RyZWFtYClcbiAqIG5vcm1hbGl6ZSgnQFphYy9QaWNvLUxvZycpICAgIC8vICdAemFjL3BpY29sb2cnXG4gKiBub3JtYWxpemUobnVsbCkgICAgICAgICAgICAgICAvLyAnJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhbmFtZSkgcmV0dXJuICcnXG4gIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ0AnKSkge1xuICAgIGNvbnN0IHNsYXNoID0gbmFtZS5pbmRleE9mKCcvJylcbiAgICBpZiAoc2xhc2ggPCAwKSByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3Qgc2NvcGUgPSBuYW1lLnNsaWNlKDAsIHNsYXNoICsgMSkudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IGJhcmUgPSBuYW1lXG4gICAgICAuc2xpY2Uoc2xhc2ggKyAxKVxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC5yZXBsYWNlKC9bLl8tXS9nLCAnJylcbiAgICByZXR1cm4gc2NvcGUgKyBiYXJlXG4gIH1cbiAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLl8tXS9nLCAnJylcbn1cblxuLyoqXG4gKiBSZWplY3QgaW5wdXRzIGNvbnRhaW5pbmcgd2hpdGVzcGFjZSBvciBBU0NJSSBjb250cm9sIGJ5dGVzLiBUaGUgY2hlY2sgaXNcbiAqIHdyaXR0ZW4gYXMgYSBjb2RlLXBvaW50IGxvb3AgcmF0aGVyIHRoYW4gYSByZWdleCB3aXRoIGNvbnRyb2wgY2hhcnMgc29cbiAqIHRoZSBzb3VyY2UgZmlsZSBzdGF5cyBmcmVlIG9mIGxpdGVyYWwgY29udHJvbCBieXRlcyAod2hpY2ggd291bGQgYWxzb1xuICogdHJpcCBveGxpbnQncyBuby1jb250cm9sLXJlZ2V4IHJ1bGUpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGhhc0ludmFsaWRDaGFycyhuYW1lKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNvZGUgPSBuYW1lLmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoY29kZSA8PSAweDIwIHx8IGNvZGUgPT09IDB4N2YpIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogR2VuZXJhdGUgbmFtZXMgdGhhdCBzaGFyZSB0aGUgY2FuZGlkYXRlJ3Mgbm9ybWFsaXplZCBmb3JtLiBUaGUgY2FsbGVyXG4gKiBxdWVyaWVzIGVhY2ggdmFyaWFudCBhZ2FpbnN0IHRoZSByZWdpc3RyeSB0byBkZXRlY3QgY29sbGlzaW9ucy4gVGhlXG4gKiAyLWluc2VydGlvbiBjYXAgc2NhbGVzIHdpdGggbmFtZSBsZW5ndGggc28gbG9uZ2VyIG11bHRpLW1vcnBoZW1lIG5hbWVzXG4gKiAoYHJlYWN0bmF0aXZlbmF2aWdhdGlvbmAg4oaSIGByZWFjdC1uYXRpdmUtbmF2aWdhdGlvbmApIHJlYWNoIHRoZWlyXG4gKiByZWFsaXN0aWMgbW9ycGhlbWUgc3BsaXRzIGJlZm9yZSB0aGUgY2FwIGV4aGF1c3RzLlxuICpcbiAqIEJvdW5kYXJ5IGd1YXJkcyByZWplY3QgaW5wdXRzIGB2YWxpZGF0ZU5hbWVgIHdvdWxkIGFsc28gcmVqZWN0IOKAlCBrZWVwaW5nXG4gKiB0aGlzIGZ1bmN0aW9uIGhvbmVzdCB3aGVuIGNhbGxlZCBpbiBpc29sYXRpb24gcmF0aGVyIHRoYW4gcmVseWluZyBvblxuICogdXBzdHJlYW0gZmlsdGVyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3sgaXNFeGhhdXN0aXZlPzogYm9vbGVhbiB9fSBbb3B0c10gLSB3aWRlbnMgMi1pbnNlcnRpb24gY292ZXJhZ2VcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAqIEBleGFtcGxlXG4gKiB2YXJpYW50cygncGljb2xvZycpICAgICAgICAgICAvLyBbJ3BpY28tbG9nJywgJ3BpY29fbG9nJywgJ3BpY28ubG9nJywgJ3AtaWNvbG9nJywg4oCmXVxuICogdmFyaWFudHMoJ2pzb25zdHJlYW0nKS5pbmNsdWRlcygnanMtb24tc3RyZWFtJykgICAgICAgICAgICAgICAgICAgIC8vIHRydWUgKGNhbm9uaWNhbCBibG9nIGV4YW1wbGUpXG4gKiB2YXJpYW50cygncmVhY3RuYXRpdmVuYXZpZ2F0aW9uJykuaW5jbHVkZXMoJ3JlYWN0LW5hdGl2ZS1uYXZpZ2F0aW9uJykgLy8gdHJ1ZSAobG9uZy1uYW1lIG1vcnBoZW1lIHNwbGl0KVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFyaWFudHMobmFtZSwgb3B0cyA9IHt9KSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIW5hbWUpIHJldHVybiBbXVxuICBpZiAoaGFzSW52YWxpZENoYXJzKG5hbWUpKSByZXR1cm4gW11cblxuICBjb25zdCBsb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICAvLyBTY29wZS1hd2FyZSBzcGxpdCDigJQgZW1wdHkgc2NvcGUgKGBAL2Zvb2ApLCBtaXNzaW5nIHNsYXNoIChgQG1lYCksIG9yXG4gIC8vIG11bHRpLXNsYXNoIChgQG1lL2Zvby9iYXJgKSBhbGwgZmFpbCB2YWxpZGF0ZU5hbWUgdXBzdHJlYW0uXG4gIGxldCBzY29wZSA9ICcnXG4gIGxldCBiYXJlSW5wdXQgPSBsb3dlclxuICBpZiAobG93ZXIuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgY29uc3Qgc2xhc2ggPSBsb3dlci5pbmRleE9mKCcvJylcbiAgICBpZiAoc2xhc2ggPCAwKSByZXR1cm4gW10gLy8gYEBtZWAg4oCUIG5vIHNsYXNoXG4gICAgaWYgKHNsYXNoID09PSAxKSByZXR1cm4gW10gLy8gYEAvZm9vYCDigJQgZW1wdHkgc2NvcGVcbiAgICBzY29wZSA9IGxvd2VyLnNsaWNlKDAsIHNsYXNoICsgMSlcbiAgICBiYXJlSW5wdXQgPSBsb3dlci5zbGljZShzbGFzaCArIDEpXG4gICAgaWYgKGJhcmVJbnB1dC5pbmNsdWRlcygnLycpKSByZXR1cm4gW10gLy8gYEBtZS9mb28vYmFyYCDigJQgbXVsdGktc2xhc2hcbiAgfVxuICBpZiAoL15bLS5fXS8udGVzdChiYXJlSW5wdXQpKSByZXR1cm4gW10gLy8gbGVhZGluZyBzZXBhcmF0b3Igb24gdGhlIHBrZyBzZWdtZW50XG4gIGNvbnN0IGJhcmUgPSBiYXJlSW5wdXQucmVwbGFjZSgvWy5fLV0vZywgJycpXG4gIGlmICghYmFyZSkgcmV0dXJuIFtdXG5cbiAgY29uc3Qgb3V0ID0gbmV3IFNldCgpXG4gIG91dC5hZGQoc2NvcGUgKyBiYXJlKVxuXG4gIC8vIDEtaW5zZXJ0aW9uOiBjb3ZlciB0aGUgbW9zdCBjb21tb24gbW9uaWtlciBzaGFwZSAoYGZvby1iYXJgIOKGlCBgZm9vYmFyYCkuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYmFyZS5sZW5ndGg7IGkrKykge1xuICAgIGZvciAoY29uc3Qgc2VwIG9mIFNFUEFSQVRPUlMpIHtcbiAgICAgIG91dC5hZGQoc2NvcGUgKyBiYXJlLnNsaWNlKDAsIGkpICsgc2VwICsgYmFyZS5zbGljZShpKSlcbiAgICB9XG4gIH1cblxuICAvLyBGdWxsLXNwbGl0OiBgZi1vLW8tYi1hLXJgIC8gYGZfb19vX2JfYV9yYCBmb3Jtcy5cbiAgaWYgKGJhcmUubGVuZ3RoID4gMSkge1xuICAgIG91dC5hZGQoc2NvcGUgKyBiYXJlLnNwbGl0KCcnKS5qb2luKCctJykpXG4gICAgb3V0LmFkZChzY29wZSArIGJhcmUuc3BsaXQoJycpLmpvaW4oJ18nKSlcbiAgfVxuXG4gIC8vIDItaW5zZXJ0aW9uOiBjYXRjaGVzIG11bHRpLW1vcnBoZW1lIHNwbGl0cyAoYGpzLW9uLXN0cmVhbWAg4oaUIGBqc29uc3RyZWFtYCxcbiAgLy8gYHJlYWN0LW5hdGl2ZS1uYXZpZ2F0aW9uYCDihpQgYHJlYWN0bmF0aXZlbmF2aWdhdGlvbmApLiBJdGVyYXRlcyBieSBnYXAgc2l6ZVxuICAvLyBhc2NlbmRpbmcgc28gY29tbW9uIG1vcnBoZW1lIHNwbGl0cyBhcmUgcmVhY2hlZCBmaXJzdDsgdGhlIGNhcCBzY2FsZXNcbiAgLy8gd2l0aCBiYXJlLmxlbmd0aCBzbyBsb25nZXIgbmFtZXMgZ2V0IGEgYnVkZ2V0IHByb3BvcnRpb25hbCB0byB0aGVpclxuICAvLyByZWFsaXN0aWMgaW5zZXJ0aW9uIHNwYWNlLlxuICBpZiAoYmFyZS5sZW5ndGggPj0gNCkge1xuICAgIGxldCBhZGRlZCA9IDBcbiAgICBjb25zdCBjYXAgPSBjYXBGb3JMZW5ndGgoYmFyZS5sZW5ndGgsIG9wdHMuaXNFeGhhdXN0aXZlID09PSB0cnVlKVxuICAgIG91dGVyOiBmb3IgKGxldCBnYXAgPSAxOyBnYXAgPCBiYXJlLmxlbmd0aCAtIDE7IGdhcCsrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSArIGdhcCA8IGJhcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaiA9IGkgKyBnYXBcbiAgICAgICAgZm9yIChjb25zdCBzZXBBIG9mIFNFUEFSQVRPUlMpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHNlcEIgb2YgU0VQQVJBVE9SUykge1xuICAgICAgICAgICAgY29uc3QgY2FuZGlkYXRlID1cbiAgICAgICAgICAgICAgc2NvcGUgKyBiYXJlLnNsaWNlKDAsIGkpICsgc2VwQSArIGJhcmUuc2xpY2UoaSwgaikgKyBzZXBCICsgYmFyZS5zbGljZShqKVxuICAgICAgICAgICAgaWYgKCFvdXQuaGFzKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgICAgb3V0LmFkZChjYW5kaWRhdGUpXG4gICAgICAgICAgICAgIGFkZGVkKytcbiAgICAgICAgICAgICAgaWYgKGFkZGVkID49IGNhcCkgYnJlYWsgb3V0ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBFeGNsdWRlIHRoZSBsaXRlcmFsIGlucHV0IOKAlCBpdHMgZXhpc3RlbmNlIGlzIGNoZWNrZWQgc2VwYXJhdGVseSwgbm90IGFzXG4gIC8vIGEgbW9uaWtlciBjb2xsaXNpb24uIFdlIGRlbGV0ZSB0aGUgb3JpZ2luYWwgYG5hbWVgLCBub3QgYGxvd2VyYCwgc28gdGhlXG4gIC8vIGJhcmUgbG93ZXJjYXNlIGZvcm0gKGEgKmRpZmZlcmVudCogc3RyaW5nKSBzdXJ2aXZlcyBmb3IgaW5wdXRzIGxpa2VcbiAgLy8gYEZvb0JhcmAgd2hlcmUgYGZvb2JhcmAgaXMgYSByZWFsIG1vbmlrZXIgY29sbGlkZXIgdG8gcXVlcnkuXG4gIG91dC5kZWxldGUobmFtZSlcbiAgcmV0dXJuIFsuLi5vdXRdXG59XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgcGVyLWNhbGwgMi1pbnNlcnRpb24gdmFyaWFudCBjYXAuIFNjYWxlcyBsaW5lYXJseSB3aXRoIG5hbWVcbiAqIGxlbmd0aCwgYm91bmRlZCBieSBhIGJhc2UgZmxvb3IgYW5kIGEgaGFyZCBjZWlsaW5nLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBiYXJlTGVuZ3RoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzRXhoYXVzdGl2ZVxuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNhcEZvckxlbmd0aChiYXJlTGVuZ3RoLCBpc0V4aGF1c3RpdmUpIHtcbiAgY29uc3QgYmFzZSA9IGlzRXhoYXVzdGl2ZSA/IE1PTklLRVJfMklOU0VSVF9DQVBfQkFTRV9FWEhBVVNUSVZFIDogTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0RFRkFVTFRcbiAgY29uc3Qgc2NhbGUgPSBpc0V4aGF1c3RpdmVcbiAgICA/IE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfRVhIQVVTVElWRVxuICAgIDogTU9OSUtFUl8ySU5TRVJUX0NBUF9TQ0FMRV9ERUZBVUxUXG4gIGNvbnN0IGNlaWxpbmcgPSBpc0V4aGF1c3RpdmVcbiAgICA/IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0VYSEFVU1RJVkVcbiAgICA6IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0RFRkFVTFRcbiAgcmV0dXJuIE1hdGgubWluKGNlaWxpbmcsIE1hdGgubWF4KGJhc2UsIGJhcmVMZW5ndGggKiBzY2FsZSkpXG59XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ29sbGlzaW9uUmVwb3J0XG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBjb25mbGljdHMgLSB2YXJpYW50cyB0aGUgcHJlZGljYXRlIGNvbmZpcm1lZCBhcyBleGlzdGluZ1xuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gdW52ZXJpZmllZCAtIHZhcmlhbnRzIHdoZXJlIHRoZSBwcmVkaWNhdGUgdGhyZXc7IHRoZWlyXG4gKiAgIGNvbGxpc2lvbiBzdGF0dXMgaXMgdW5rbm93bi4gQ2FsbGVycyBpbmZlciBcImNvbGxpZGVzXCIgZnJvbVxuICogICBgY29uZmxpY3RzLmxlbmd0aCA+IDBgLlxuICovXG5cbmNvbnN0IEZJTkRfQ09MTElTSU9OU19ERUZBVUxUX0NPTkNVUlJFTkNZID0gMTJcblxuLyoqXG4gKiBHaXZlbiBhIGNhbmRpZGF0ZSBhbmQgYW4gYGV4aXN0cyhuYW1lKSA9PiBQcm9taXNlPGJvb2xlYW4+YCBwcmVkaWNhdGUsXG4gKiByZXR1cm4gYW55IG1vbmlrZXIgY29sbGlzaW9ucyBmb3VuZCBwbHVzIGFueSB2YXJpYW50cyB3aG9zZSBsb29rdXBcbiAqIHRocmV3LiBDYWxsZXJzIHNob3VsZCB0cmVhdCBhIG5vbi1lbXB0eSBgdW52ZXJpZmllZGAgYXMgXCJtb25pa2VyIGNoZWNrXG4gKiBpbmNvbXBsZXRlXCIgcmF0aGVyIHRoYW4gaWdub3JpbmcgaXQuXG4gKlxuICogVmFyaWFudCBwcm9iZXMgcnVuIHdpdGggYm91bmRlZCBjb25jdXJyZW5jeSAoZGVmYXVsdCAxMikgc28gYVxuICogbmV0d29yay1iYWNrZWQgYGV4aXN0c2AgZG9lc24ndCB1bmxlYXNoIHRob3VzYW5kcyBvZiBwYXJhbGxlbCByZXF1ZXN0c1xuICogZm9yIGxvbmcgbmFtZXMgd2l0aCBgLS1leGhhdXN0aXZlYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FuZGlkYXRlXG4gKiBAcGFyYW0geyhuYW1lOiBzdHJpbmcpID0+IFByb21pc2U8Ym9vbGVhbj59IGV4aXN0c1xuICogQHBhcmFtIHt7IGlzRXhoYXVzdGl2ZT86IGJvb2xlYW4sIGNvbmN1cnJlbmN5PzogbnVtYmVyIH19IFtvcHRzXVxuICogQHJldHVybnMge1Byb21pc2U8Q29sbGlzaW9uUmVwb3J0Pn1cbiAqIEBleGFtcGxlXG4gKiBjb25zdCB0YWtlbiA9IG5ldyBTZXQoWydqcy1vbi1zdHJlYW0nXSlcbiAqIGF3YWl0IGZpbmRDb2xsaXNpb25zKCdqc29uc3RyZWFtJywgYXN5bmMgKG5hbWUpID0+IHRha2VuLmhhcyhuYW1lKSlcbiAqIC8vIHsgY29uZmxpY3RzOiBbJ2pzLW9uLXN0cmVhbSddLCB1bnZlcmlmaWVkOiBbXSB9XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kQ29sbGlzaW9ucyhjYW5kaWRhdGUsIGV4aXN0cywgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IHRvQ2hlY2sgPSB2YXJpYW50cyhjYW5kaWRhdGUsIG9wdHMpXG4gIGNvbnN0IGNvbmN1cnJlbmN5ID1cbiAgICBOdW1iZXIuaXNJbnRlZ2VyKG9wdHMuY29uY3VycmVuY3kpICYmIG9wdHMuY29uY3VycmVuY3kgPiAwXG4gICAgICA/IG9wdHMuY29uY3VycmVuY3lcbiAgICAgIDogRklORF9DT0xMSVNJT05TX0RFRkFVTFRfQ09OQ1VSUkVOQ1lcbiAgY29uc3QgcHJvYmVzID0gYXdhaXQgcnVuQm91bmRlZCh0b0NoZWNrLCBjb25jdXJyZW5jeSwgYXN5bmMgKHZhcmlhbnQpID0+ICh7XG4gICAgdmFyaWFudCxcbiAgICByZXN1bHQ6IGF3YWl0IGF0dGVtcHRBc3luYygoKSA9PiBleGlzdHModmFyaWFudCkpLFxuICB9KSlcbiAgLy8gYHJlc3VsdC5va2AgbWVhbnMgdGhlIHByb2JlIHJldHVybmVkIChkaWRuJ3QgdGhyb3cpOyBgcmVzdWx0LnZhbHVlYFxuICAvLyBtZWFucyB0aGUgcHJlZGljYXRlIHJlcG9ydGVkIHRoZSB2YXJpYW50IGFzIGV4aXN0aW5nIG9uIHRoZSByZWdpc3RyeS5cbiAgLy8gQm90aCBtdXN0IGJlIHRydXRoeSB0byBjb3VudCBhcyBhIGNvbmZpcm1lZCBjb2xsaXNpb24uXG4gIGNvbnN0IGNvbmZsaWN0cyA9IHByb2Jlc1xuICAgIC5maWx0ZXIoKHsgcmVzdWx0IH0pID0+IHJlc3VsdC5vayAmJiByZXN1bHQudmFsdWUpXG4gICAgLm1hcCgoeyB2YXJpYW50IH0pID0+IHZhcmlhbnQpXG4gIGNvbnN0IHVudmVyaWZpZWQgPSBwcm9iZXMuZmlsdGVyKCh7IHJlc3VsdCB9KSA9PiAhcmVzdWx0Lm9rKS5tYXAoKHsgdmFyaWFudCB9KSA9PiB2YXJpYW50KVxuICByZXR1cm4geyBjb25mbGljdHMsIHVudmVyaWZpZWQgfVxufVxuXG4vKipcbiAqIFJ1biBgdGFzayhpdGVtKWAgYWdhaW5zdCBldmVyeSBpbnB1dCB3aXRoIGF0IG1vc3QgYGNvbmN1cnJlbmN5YCBpblxuICogZmxpZ2h0LiBUaW55IHN0cnVjdHVyZWQtY29uY3VycmVuY3kgcHJpbWl0aXZlIOKAlCBkdXBsaWNhdGVkIGZyb21cbiAqIGByZWdpc3RyeS5tanM6cG9vbGAgc28gdGhpcyBtb2R1bGUgc3RheXMgc3RhbmRhbG9uZSBmb3IgbGlicmFyeVxuICogY29uc3VtZXJzIHdobyBkb24ndCBpbXBvcnQgdGhlIHJlZ2lzdHJ5LlxuICpcbiAqIEB0ZW1wbGF0ZSBULCBVXG4gKiBAcGFyYW0ge1RbXX0gaXRlbXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb25jdXJyZW5jeVxuICogQHBhcmFtIHsoaXRlbTogVCkgPT4gUHJvbWlzZTxVPn0gdGFza1xuICogQHJldHVybnMge1Byb21pc2U8VVtdPn1cbiAqIEBwcml2YXRlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHJ1bkJvdW5kZWQoaXRlbXMsIGNvbmN1cnJlbmN5LCB0YXNrKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBpdGVtcy5sZW5ndGggfSlcbiAgbGV0IG5leHQgPSAwXG4gIGFzeW5jIGZ1bmN0aW9uIHdvcmtlcigpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgaW5kZXggPSBuZXh0KytcbiAgICAgIGlmIChpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHJldHVyblxuICAgICAgcmVzdWx0c1tpbmRleF0gPSBhd2FpdCB0YXNrKGl0ZW1zW2luZGV4XSlcbiAgICB9XG4gIH1cbiAgY29uc3Qgd29ya2VycyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IE1hdGgubWluKGNvbmN1cnJlbmN5LCBpdGVtcy5sZW5ndGgpIH0sIHdvcmtlcilcbiAgYXdhaXQgUHJvbWlzZS5hbGwod29ya2VycylcbiAgcmV0dXJuIHJlc3VsdHNcbn1cbiIsIi8vIFRoZVNwYW5pc2hJbnF1aXNpdGlvblxuXG4vLyBDYWNoZSB0aGUgbWF0cml4LiBOb3RlIHRoYXQgaWYgeW91IG5vdCBwYXNzIGEgbGltaXQgdGhpcyBpbXBsZW1lbnRhdGlvbiB3aWxsIHVzZSBhIGR5bmFtaWNhbGx5IGNhbGN1bGF0ZSBvbmUuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oX190aGlzLCB0aGF0LCBsaW1pdCkge1xuXG4gIHZhciB0aGlzTGVuZ3RoID0gX190aGlzLmxlbmd0aCxcbiAgICAgIHRoYXRMZW5ndGggPSB0aGF0Lmxlbmd0aCxcbiAgICAgIG1hdHJpeCA9IFtdO1xuXG4gIC8vIElmIHRoZSBsaW1pdCBpcyBub3QgZGVmaW5lZCBpdCB3aWxsIGJlIGNhbGN1bGF0ZSBmcm9tIHRoaXMgYW5kIHRoYXQgYXJncy5cbiAgbGltaXQgPSAobGltaXQgfHwgKCh0aGF0TGVuZ3RoID4gdGhpc0xlbmd0aCA/IHRoYXRMZW5ndGggOiB0aGlzTGVuZ3RoKSkpKzE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW1pdDsgaSsrKSB7XG4gICAgbWF0cml4W2ldID0gW2ldO1xuICAgIG1hdHJpeFtpXS5sZW5ndGggPSBsaW1pdDtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgbGltaXQ7IGkrKykge1xuICAgIG1hdHJpeFswXVtpXSA9IGk7XG4gIH1cblxuICBpZiAoTWF0aC5hYnModGhpc0xlbmd0aCAtIHRoYXRMZW5ndGgpID4gKGxpbWl0IHx8IDEwMCkpe1xuICAgIHJldHVybiBwcmVwYXJlIChsaW1pdCB8fCAxMDApO1xuICB9XG4gIGlmICh0aGlzTGVuZ3RoID09PSAwKXtcbiAgICByZXR1cm4gcHJlcGFyZSAodGhhdExlbmd0aCk7XG4gIH1cbiAgaWYgKHRoYXRMZW5ndGggPT09IDApe1xuICAgIHJldHVybiBwcmVwYXJlICh0aGlzTGVuZ3RoKTtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBtYXRyaXguXG4gIHZhciBqLCB0aGlzX2ksIHRoYXRfaiwgY29zdCwgbWluLCB0O1xuICBmb3IgKGkgPSAxOyBpIDw9IHRoaXNMZW5ndGg7ICsraSkge1xuICAgIHRoaXNfaSA9IF9fdGhpc1tpLTFdO1xuXG4gICAgLy8gU3RlcCA0XG4gICAgZm9yIChqID0gMTsgaiA8PSB0aGF0TGVuZ3RoOyArK2opIHtcbiAgICAgIC8vIENoZWNrIHRoZSBqYWdnZWQgbGQgdG90YWwgc28gZmFyXG4gICAgICBpZiAoaSA9PT0gaiAmJiBtYXRyaXhbaV1bal0gPiA0KSByZXR1cm4gcHJlcGFyZSAodGhpc0xlbmd0aCk7XG5cbiAgICAgIHRoYXRfaiA9IHRoYXRbai0xXTtcbiAgICAgIGNvc3QgPSAodGhpc19pID09PSB0aGF0X2opID8gMCA6IDE7IC8vIFN0ZXAgNVxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBtaW5pbXVtIChtdWNoIGZhc3RlciB0aGFuIE1hdGgubWluKC4uLikpLlxuICAgICAgbWluICAgID0gbWF0cml4W2kgLSAxXVtqICAgIF0gKyAxOyAvLyBEZWxldGlvbi5cbiAgICAgIGlmICgodCA9IG1hdHJpeFtpICAgIF1baiAtIDFdICsgMSAgICkgPCBtaW4pIG1pbiA9IHQ7ICAgLy8gSW5zZXJ0aW9uLlxuICAgICAgaWYgKCh0ID0gbWF0cml4W2kgLSAxXVtqIC0gMV0gKyBjb3N0KSA8IG1pbikgbWluID0gdDsgICAvLyBTdWJzdGl0dXRpb24uXG5cbiAgICAgIC8vIFVwZGF0ZSBtYXRyaXguXG4gICAgICBtYXRyaXhbaV1bal0gPSAoaSA+IDEgJiYgaiA+IDEgJiYgdGhpc19pID09PSB0aGF0W2otMl0gJiYgX190aGlzW2ktMl0gPT09IHRoYXRfaiAmJiAodCA9IG1hdHJpeFtpLTJdW2otMl0rY29zdCkgPCBtaW4pID8gdCA6IG1pbjsgLy8gVHJhbnNwb3NpdGlvbi5cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJlcGFyZSAobWF0cml4W3RoaXNMZW5ndGhdW3RoYXRMZW5ndGhdKTtcblxuLyoqXG4gKlxuICovXG4gIGZ1bmN0aW9uIHByZXBhcmUoc3RlcHMpIHtcbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgodGhpc0xlbmd0aCwgdGhhdExlbmd0aClcbiAgICB2YXIgcmVsYXRpdmUgPSBsZW5ndGggPT09IDBcbiAgICAgID8gMFxuICAgICAgOiAoc3RlcHMgLyBsZW5ndGgpO1xuICAgIHZhciBzaW1pbGFyaXR5ID0gMSAtIHJlbGF0aXZlXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0ZXBzOiBzdGVwcyxcbiAgICAgIHJlbGF0aXZlOiByZWxhdGl2ZSxcbiAgICAgIHNpbWlsYXJpdHk6IHNpbWlsYXJpdHlcbiAgICB9O1xuICB9XG5cbn07XG4iLCIvLyBOZWFyLW1hdGNoICh0eXBvc3F1YXQpIGRldGVjdGlvbiDigJQgZmxhZ3MgY2FuZGlkYXRlcyB3aXRoaW4g4omkIE4gZWRpdHMgb2Zcbi8vIGEgcG9wdWxhciBucG0gcGFja2FnZS4gRGlzdGluY3QgZnJvbSBucG0ncyBtb25pa2VyIHJ1bGUgKHdoaWNoIG9ubHlcbi8vIGNhdGNoZXMgbmFtZXMgdGhhdCAqbm9ybWFsaXplKiBpZGVudGljYWxseSkuIFNpbmdsZS1sZXR0ZXIgc3Vic3RpdHV0aW9uc1xuLy8gbGlrZSBgZXh0b29sa2l0YCB2cyBgZXMtdG9vbGtpdGAgd291bGQgcHVibGlzaCBmaW5lIHBlciB0aGUgbW9uaWtlciBydWxlXG4vLyBidXQgYXJlIGNsYXNzaWMgdHlwb3NxdWF0IHNoYXBlcy5cbi8vXG4vLyBEaXN0YW5jZSBpcyBPcHRpbWFsIFN0cmluZyBBbGlnbm1lbnQgKE9TQSkgZnJvbSB0aGUgYGRhbWVyYXUtbGV2ZW5zaHRlaW5gXG4vLyBwYWNrYWdlIOKAlCBjb3VudHMgaW5zZXJ0aW9ucywgZGVsZXRpb25zLCBzdWJzdGl0dXRpb25zLCBhbmQgYWRqYWNlbnRcbi8vIHRyYW5zcG9zaXRpb25zIGFzIG9uZSBlZGl0IGVhY2gsIGJ1dCBkb2VzIG5vdCBhbGxvdyBhIHN1YnN0cmluZyB0byBiZVxuLy8gZWRpdGVkIG1vcmUgdGhhbiBvbmNlLiBGb3IgdHlwb3NxdWF0IGRldGVjdGlvbiBhdCBkaXN0YW5jZSDiiaQgMiB0aGlzIGlzXG4vLyBpbmRpc3Rpbmd1aXNoYWJsZSBmcm9tIHVucmVzdHJpY3RlZCBEYW1lcmF1LUxldmVuc2h0ZWluOyB0aGUgZGlzdGluY3Rpb25cbi8vIG9ubHkgbWF0dGVycyBhdCBkaXN0YW5jZSAzKyAoZS5nLiwgYG9zYURpc3RhbmNlKCdjYScsICdhYmMnKSA9PT0gM2Bcbi8vIHdoaWxlIHRydWUgREwgd291bGQgc2F5IDIpLlxuLy9cbi8vIFRoaXMgbW9kdWxlIGlzICpwdXJlKjogY2FsbGVycyBwYXNzIHRoZSBjb3JwdXMuIFRoZSBjb3JwdXMgbG9hZGVyIGlzIGluXG4vLyBgY29ycHVzLm1qc2AgYW5kIHJldHVybnMgYSBSZXN1bHQgc28gQ0xJIC8gY29uc3VtZXJzIGhhbmRsZSBmYWlsdXJlIGF0XG4vLyB0aGVpciBvd24gYm91bmRhcnkuXG5cbmltcG9ydCBkYW1lcmF1TGV2ZW5zaHRlaW4gZnJvbSAnZGFtZXJhdS1sZXZlbnNodGVpbidcblxuaW1wb3J0IHsgTkVBUl9NQVRDSF9NQVhfRElTVEFOQ0UsIE5FQVJfTUFUQ0hfTUlOX0NPUlBVU19MRU4gfSBmcm9tICcuL2NvbnN0YW50cy5tanMnXG5pbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICcuL21vbmlrZXIubWpzJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE5lYXJNYXRjaFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgLSB0aGUgcG9wdWxhciBwYWNrYWdlIHRoZSBjYW5kaWRhdGUgcmVzZW1ibGVzXG4gKiBAcHJvcGVydHkge251bWJlcn0gZGlzdGFuY2UgLSBlZGl0IGRpc3RhbmNlIGJldHdlZW4gbm9ybWFsaXplZCBmb3Jtc1xuICovXG5cbi8qKlxuICogT3B0aW1hbCBTdHJpbmcgQWxpZ25tZW50IGRpc3RhbmNlIOKAlCBpbnNlcnRpb25zLCBkZWxldGlvbnMsIHN1YnN0aXR1dGlvbnMsXG4gKiBhbmQgYWRqYWNlbnQgdHJhbnNwb3NpdGlvbnMgY291bnQgYXMgb25lIGVkaXQgZWFjaC4gRm9yIGRpc3RhbmNlIOKJpCAyIHRoaXNcbiAqIGVxdWFscyB1bnJlc3RyaWN0ZWQgRGFtZXJhdS1MZXZlbnNodGVpbjsgdGhlIHR3byBkaWZmZXIgb25seSBhdCBkaXN0YW5jZVxuICogMyssIHdoaWNoIGlzIG91dHNpZGUgb3VyIHR5cG9zcXVhdCBidWRnZXQgYW55d2F5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhXG4gKiBAcGFyYW0ge3N0cmluZ30gYlxuICogQHJldHVybnMge251bWJlcn1cbiAqIEBleGFtcGxlXG4gKiBvc2FEaXN0YW5jZSgncmVhY3QnLCAncmFlY3QnKSAgLy8gMSAgKGFkamFjZW50IHRyYW5zcG9zaXRpb24pXG4gKiBvc2FEaXN0YW5jZSgnY2F0JywgJ2NhcnQnKSAgICAgLy8gMSAgKGluc2VydGlvbilcbiAqIG9zYURpc3RhbmNlKCdjYScsICdhYmMnKSAgICAgICAvLyAzICAodHJ1ZSBETCB3b3VsZCBiZSAyIOKAlCBPU0EncyByZXN0cmljdGlvbilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9zYURpc3RhbmNlKGEsIGIpIHtcbiAgcmV0dXJuIGRhbWVyYXVMZXZlbnNodGVpbihhLCBiKS5zdGVwc1xufVxuXG4vKipcbiAqIEZpbmQgcG9wdWxhciBucG0gcGFja2FnZXMgd2l0aGluIGBtYXhEaXN0YW5jZWAgZWRpdHMgb2YgYGNhbmRpZGF0ZWAsXG4gKiBjb21wYXJpbmcgb24gbm9ybWFsaXplZCBmb3JtcyAoYGxvd2VyY2FzZSArIHN0cmlwIFsuXy1dYCkuIE5hbWVzIHRoYXRcbiAqIG5vcm1hbGl6ZSBpZGVudGljYWxseSB0byB0aGUgY2FuZGlkYXRlIGFyZSBleGNsdWRlZCDigJQgdGhvc2UgYXJlIG1vbmlrZXJcbiAqIGNvbGxpc2lvbnMgYW5kIGFyZSByZXBvcnRlZCBieSB0aGUgbW9uaWtlciBsYXllci5cbiAqXG4gKiBSZXN1bHRzIGRlZHVwZSBieSBub3JtYWxpemVkIGZvcm0gKGtlZXBpbmcgdGhlIGhpZ2hlc3QtcmFua2VkIHZhcmlhbnQpXG4gKiBhbmQgc29ydCBieSBkaXN0YW5jZSBhc2NlbmRpbmcsIHRoZW4gYnkgY29ycHVzIHJhbmsgYXNjZW5kaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYW5kaWRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nW119IGNvcnB1cyAtIHBvcHVsYXIgcGFja2FnZSBuYW1lcywgZGVzY2VuZGluZyBieSByYW5rXG4gKiBAcGFyYW0ge3sgbWF4RGlzdGFuY2U/OiBudW1iZXIsIG1pbkNvcnB1c0xlbj86IG51bWJlciB9fSBbb3B0c11cbiAqIEByZXR1cm5zIHtOZWFyTWF0Y2hbXX1cbiAqIEBleGFtcGxlXG4gKiBmaW5kTmVhck1hdGNoZXMoJ2V4dG9vbGtpdCcsIFsnZXMtdG9vbGtpdCcsICdyZWFjdCddKVxuICogLy8gW3sgbmFtZTogJ2VzLXRvb2xraXQnLCBkaXN0YW5jZTogMSB9XVxuICpcbiAqIGZpbmROZWFyTWF0Y2hlcygnZXN0b29sa2l0JywgWydlcy10b29sa2l0J10pXG4gKiAvLyBbXSAgKHNhbWUgbm9ybWFsaXplZCBmb3JtIOKAlCB0aGF0J3MgYSBtb25pa2VyIGNvbGxpc2lvbiwgbm90IGEgbmVhci1tYXRjaClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmROZWFyTWF0Y2hlcyhjYW5kaWRhdGUsIGNvcnB1cywgb3B0cyA9IHt9KSB7XG4gIGlmICh0eXBlb2YgY2FuZGlkYXRlICE9PSAnc3RyaW5nJyB8fCAhY2FuZGlkYXRlKSByZXR1cm4gW11cbiAgaWYgKCFBcnJheS5pc0FycmF5KGNvcnB1cykpIHJldHVybiBbXVxuXG4gIGNvbnN0IG1heERpc3RhbmNlID0gb3B0cy5tYXhEaXN0YW5jZSA/PyBORUFSX01BVENIX01BWF9ESVNUQU5DRVxuICBjb25zdCBtaW5Db3JwdXNMZW4gPSBvcHRzLm1pbkNvcnB1c0xlbiA/PyBORUFSX01BVENIX01JTl9DT1JQVVNfTEVOXG5cbiAgY29uc3QgY2FuZEJhcmUgPSBzY29wZVN0cmlwKGNhbmRpZGF0ZSlcbiAgaWYgKGNhbmRCYXJlID09PSBudWxsKSByZXR1cm4gW11cbiAgY29uc3QgY2FuZE5vcm0gPSBub3JtYWxpemUoY2FuZEJhcmUpXG4gIGlmICghY2FuZE5vcm0pIHJldHVybiBbXVxuXG4gIC8vIERlZHVwZSBieSBub3JtYWxpemVkIGZvcm0g4oCUIGtlZXBzIHRoZSBoaWdoZXN0LXJhbmtlZCBjb3JwdXMgdmFyaWFudFxuICAvLyAobG93ZXN0IGluZGV4KSB3aGVuIG11bHRpcGxlIG5hbWVzIGNvbGxhcHNlIChlLmcuIGBvYmplY3QtYXNzaWduYCBhbmRcbiAgLy8gYG9iamVjdC5hc3NpZ25gIGJvdGggbm9ybWFsaXplIHRvIGBvYmplY3Rhc3NpZ25gKS5cbiAgLyoqIEB0eXBlIHtNYXA8c3RyaW5nLCB7IG5hbWU6IHN0cmluZywgZGlzdGFuY2U6IG51bWJlciwgcmFuazogbnVtYmVyIH0+fSAqL1xuICBjb25zdCBiZXN0QnlOb3JtID0gbmV3IE1hcCgpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29ycHVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcGtnID0gY29ycHVzW2ldXG4gICAgaWYgKHR5cGVvZiBwa2cgIT09ICdzdHJpbmcnIHx8ICFwa2cpIGNvbnRpbnVlXG4gICAgaWYgKHBrZy5sZW5ndGggPCBtaW5Db3JwdXNMZW4pIGNvbnRpbnVlXG4gICAgY29uc3QgcGtnTm9ybSA9IG5vcm1hbGl6ZShwa2cpXG4gICAgaWYgKHBrZ05vcm0gPT09IGNhbmROb3JtKSBjb250aW51ZVxuICAgIGlmIChNYXRoLmFicyhwa2dOb3JtLmxlbmd0aCAtIGNhbmROb3JtLmxlbmd0aCkgPiBtYXhEaXN0YW5jZSkgY29udGludWVcbiAgICBjb25zdCBlZGl0RGlzdGFuY2UgPSBvc2FEaXN0YW5jZShjYW5kTm9ybSwgcGtnTm9ybSlcbiAgICBpZiAoZWRpdERpc3RhbmNlIDw9IDAgfHwgZWRpdERpc3RhbmNlID4gbWF4RGlzdGFuY2UpIGNvbnRpbnVlXG4gICAgY29uc3QgcHJldiA9IGJlc3RCeU5vcm0uZ2V0KHBrZ05vcm0pXG4gICAgaWYgKCFwcmV2IHx8IGkgPCBwcmV2LnJhbmspIHtcbiAgICAgIGJlc3RCeU5vcm0uc2V0KHBrZ05vcm0sIHsgbmFtZTogcGtnLCBkaXN0YW5jZTogZWRpdERpc3RhbmNlLCByYW5rOiBpIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFsuLi5iZXN0QnlOb3JtLnZhbHVlcygpXVxuICAgIC5zb3J0KChhLCBiKSA9PiBhLmRpc3RhbmNlIC0gYi5kaXN0YW5jZSB8fCBhLnJhbmsgLSBiLnJhbmspXG4gICAgLm1hcCgoeyBuYW1lLCBkaXN0YW5jZTogZCB9KSA9PiAoeyBuYW1lLCBkaXN0YW5jZTogZCB9KSlcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhcmUgKHBvc3Qtc2NvcGUpIHBvcnRpb24gb2YgYSBjYW5kaWRhdGUsIG9yIG51bGwgaWYgdGhlIGlucHV0XG4gKiBoYXMgYW4gaW52YWxpZCBzdHJ1Y3R1cmUgKGUuZy4sIG11bHRpLXNsYXNoIGxpa2UgYEBzY29wZS9mb28vYmFyYCkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2NvcGVTdHJpcChuYW1lKSB7XG4gIGlmICghbmFtZS5zdGFydHNXaXRoKCdAJykpIHtcbiAgICBpZiAobmFtZS5pbmNsdWRlcygnLycpKSByZXR1cm4gbnVsbFxuICAgIHJldHVybiBuYW1lXG4gIH1cbiAgY29uc3Qgc2xhc2ggPSBuYW1lLmluZGV4T2YoJy8nKVxuICBpZiAoc2xhc2ggPCAwKSByZXR1cm4gbnVsbFxuICBjb25zdCByZXN0ID0gbmFtZS5zbGljZShzbGFzaCArIDEpXG4gIGlmIChyZXN0LmluY2x1ZGVzKCcvJykpIHJldHVybiBudWxsXG4gIHJldHVybiByZXN0XG59XG4iLCIiLCIndXNlIHN0cmljdCdcbmNvbnN0IGJ1aWx0aW5zID0gcmVxdWlyZSgnLi9idWlsdGluLW1vZHVsZXMuanNvbicpXG5cbnZhciBzY29wZWRQYWNrYWdlUGF0dGVybiA9IG5ldyBSZWdFeHAoJ14oPzpAKFteL10rPylbL10pPyhbXi9dKz8pJCcpXG52YXIgZXhjbHVzaW9uTGlzdCA9IFtcbiAgJ25vZGVfbW9kdWxlcycsXG4gICdmYXZpY29uLmljbycsXG5dXG5cbmZ1bmN0aW9uIHZhbGlkYXRlIChuYW1lKSB7XG4gIHZhciB3YXJuaW5ncyA9IFtdXG4gIHZhciBlcnJvcnMgPSBbXVxuXG4gIGlmIChuYW1lID09PSBudWxsKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IGJlIG51bGwnKVxuICAgIHJldHVybiBkb25lKHdhcm5pbmdzLCBlcnJvcnMpXG4gIH1cblxuICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IGJlIHVuZGVmaW5lZCcpXG4gICAgcmV0dXJuIGRvbmUod2FybmluZ3MsIGVycm9ycylcbiAgfVxuXG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICByZXR1cm4gZG9uZSh3YXJuaW5ncywgZXJyb3JzKVxuICB9XG5cbiAgaWYgKCFuYW1lLmxlbmd0aCkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGxlbmd0aCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvJylcbiAgfVxuXG4gIGlmIChuYW1lLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBzdGFydCB3aXRoIGEgcGVyaW9kJylcbiAgfVxuXG4gIGlmIChuYW1lLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBzdGFydCB3aXRoIGEgaHlwaGVuJylcbiAgfVxuXG4gIGlmIChuYW1lLm1hdGNoKC9eXy8pKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IHN0YXJ0IHdpdGggYW4gdW5kZXJzY29yZScpXG4gIH1cblxuICBpZiAobmFtZS50cmltKCkgIT09IG5hbWUpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3QgY29udGFpbiBsZWFkaW5nIG9yIHRyYWlsaW5nIHNwYWNlcycpXG4gIH1cblxuICAvLyBObyBmdW5ueSBidXNpbmVzc1xuICBleGNsdXNpb25MaXN0LmZvckVhY2goZnVuY3Rpb24gKGV4Y2x1ZGVkTmFtZSkge1xuICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgPT09IGV4Y2x1ZGVkTmFtZSkge1xuICAgICAgZXJyb3JzLnB1c2goZXhjbHVkZWROYW1lICsgJyBpcyBub3QgYSB2YWxpZCBwYWNrYWdlIG5hbWUnKVxuICAgIH1cbiAgfSlcblxuICAvLyBHZW5lcmF0ZSB3YXJuaW5ncyBmb3Igc3R1ZmYgdGhhdCB1c2VkIHRvIGJlIGFsbG93ZWRcblxuICAvLyBjb3JlIG1vZHVsZSBuYW1lcyBsaWtlIGh0dHAsIGV2ZW50cywgdXRpbCwgZXRjXG4gIGlmIChidWlsdGlucy5pbmNsdWRlcyhuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgd2FybmluZ3MucHVzaChuYW1lICsgJyBpcyBhIGNvcmUgbW9kdWxlIG5hbWUnKVxuICB9XG5cbiAgaWYgKG5hbWUubGVuZ3RoID4gMjE0KSB7XG4gICAgd2FybmluZ3MucHVzaCgnbmFtZSBjYW4gbm8gbG9uZ2VyIGNvbnRhaW4gbW9yZSB0aGFuIDIxNCBjaGFyYWN0ZXJzJylcbiAgfVxuXG4gIC8vIG1JeGVEIENhU2UgbkFNRXNcbiAgaWYgKG5hbWUudG9Mb3dlckNhc2UoKSAhPT0gbmFtZSkge1xuICAgIHdhcm5pbmdzLnB1c2goJ25hbWUgY2FuIG5vIGxvbmdlciBjb250YWluIGNhcGl0YWwgbGV0dGVycycpXG4gIH1cblxuICBpZiAoL1t+JyEoKSpdLy50ZXN0KG5hbWUuc3BsaXQoJy8nKS5zbGljZSgtMSlbMF0pKSB7XG4gICAgd2FybmluZ3MucHVzaCgnbmFtZSBjYW4gbm8gbG9uZ2VyIGNvbnRhaW4gc3BlY2lhbCBjaGFyYWN0ZXJzIChcIn5cXCchKCkqXCIpJylcbiAgfVxuXG4gIGlmIChlbmNvZGVVUklDb21wb25lbnQobmFtZSkgIT09IG5hbWUpIHtcbiAgICAvLyBNYXliZSBpdCdzIGEgc2NvcGVkIHBhY2thZ2UgbmFtZSwgbGlrZSBAdXNlci9wYWNrYWdlXG4gICAgdmFyIG5hbWVNYXRjaCA9IG5hbWUubWF0Y2goc2NvcGVkUGFja2FnZVBhdHRlcm4pXG4gICAgaWYgKG5hbWVNYXRjaCkge1xuICAgICAgdmFyIHVzZXIgPSBuYW1lTWF0Y2hbMV1cbiAgICAgIHZhciBwa2cgPSBuYW1lTWF0Y2hbMl1cblxuICAgICAgaWYgKHBrZy5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IHN0YXJ0IHdpdGggYSBwZXJpb2QnKVxuICAgICAgfVxuXG4gICAgICBpZiAoZW5jb2RlVVJJQ29tcG9uZW50KHVzZXIpID09PSB1c2VyICYmIGVuY29kZVVSSUNvbXBvbmVudChwa2cpID09PSBwa2cpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUod2FybmluZ3MsIGVycm9ycylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW4gb25seSBjb250YWluIFVSTC1mcmllbmRseSBjaGFyYWN0ZXJzJylcbiAgfVxuXG4gIHJldHVybiBkb25lKHdhcm5pbmdzLCBlcnJvcnMpXG59XG5cbnZhciBkb25lID0gZnVuY3Rpb24gKHdhcm5pbmdzLCBlcnJvcnMpIHtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICB2YWxpZEZvck5ld1BhY2thZ2VzOiBlcnJvcnMubGVuZ3RoID09PSAwICYmIHdhcm5pbmdzLmxlbmd0aCA9PT0gMCxcbiAgICB2YWxpZEZvck9sZFBhY2thZ2VzOiBlcnJvcnMubGVuZ3RoID09PSAwLFxuICAgIHdhcm5pbmdzOiB3YXJuaW5ncyxcbiAgICBlcnJvcnM6IGVycm9ycyxcbiAgfVxuICBpZiAoIXJlc3VsdC53YXJuaW5ncy5sZW5ndGgpIHtcbiAgICBkZWxldGUgcmVzdWx0Lndhcm5pbmdzXG4gIH1cbiAgaWYgKCFyZXN1bHQuZXJyb3JzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSByZXN1bHQuZXJyb3JzXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlXG4iLCIvLyBUaGluIHdyYXBwZXIgYXJvdW5kIHRoZSBvZmZpY2lhbCBgdmFsaWRhdGUtbnBtLXBhY2thZ2UtbmFtZWAgcGFja2FnZS5cbi8vIFdlIHByZXZpb3VzbHkgaGFuZC1wb3J0ZWQgdGhlIHJ1bGVzOyB0aGUgdXBzdHJlYW0gcGFja2FnZSBpcyB0aGUgc291cmNlXG4vLyBvZiB0cnV0aCBhbmQgc3RheXMgaW4gc3luYyB3aXRoIG5wbSBpdHNlbGYuXG5cbmltcG9ydCB2YWxpZGF0ZSBmcm9tICd2YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZhbGlkYXRlUmVzdWx0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzVmFsaWQgLSB0cnVlIG9ubHkgaWYgdGhlIG5hbWUgaXMgdmFsaWQgZm9yIE5FVyBwdWJsaXNoZXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHJlYXNvbnMgLSBodW1hbi1yZWFkYWJsZSByZWplY3Rpb24gcmVhc29uczsgZW1wdHkgd2hlbiB2YWxpZFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1Njb3BlZCAtIHRydWUgaWYgdGhlIG5hbWUgaXMgaW4gdGhlIGBAc2NvcGUvbmFtZWAgZm9ybVxuICovXG5cbi8qKlxuICogVmFsaWRhdGUgYW4gbnBtIHBhY2thZ2UgbmFtZS4gQ29tYmluZXMgZXJyb3JzIGFuZCB3YXJuaW5ncyBpbnRvIGEgc2luZ2xlXG4gKiByZWFzb25zW10gYXJyYXkgYmVjYXVzZSBmb3IgKm5ldyogcHVibGlzaGVzIGJvdGggYXJlIGJsb2NrZXJzLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gbmFtZVxuICogQHJldHVybnMge1ZhbGlkYXRlUmVzdWx0fVxuICogQGV4YW1wbGVcbiAqIHZhbGlkYXRlTmFtZSgndGlueS1sb2cnKSAgICAgIC8vIHsgaXNWYWxpZDogdHJ1ZSwgIHJlYXNvbnM6IFtdLCBpc1Njb3BlZDogZmFsc2UgfVxuICogdmFsaWRhdGVOYW1lKCdUaW55TG9nJykgICAgICAgLy8geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uczogWyfigKZjYXBpdGFsIGxldHRlcnMnXSwgaXNTY29wZWQ6IGZhbHNlIH1cbiAqIHZhbGlkYXRlTmFtZSgnQG1lLy5mb28nKSAgICAgIC8vIHsgaXNWYWxpZDogZmFsc2UsIHJlYXNvbnM6IFsn4oCmcGVyaW9kJ10sIGlzU2NvcGVkOiB0cnVlIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uczogWyduYW1lIG11c3QgYmUgYSBzdHJpbmcnXSwgaXNTY29wZWQ6IGZhbHNlIH1cbiAgfVxuICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZShuYW1lKVxuICBjb25zdCByZWFzb25zID0gWy4uLihyZXN1bHQuZXJyb3JzID8/IFtdKSwgLi4uKHJlc3VsdC53YXJuaW5ncyA/PyBbXSldXG4gIGNvbnN0IGlzU2NvcGVkID0gbmFtZS5zdGFydHNXaXRoKCdAJykgJiYgbmFtZS5pbmNsdWRlcygnLycpXG4gIHJldHVybiB7IGlzVmFsaWQ6IEJvb2xlYW4ocmVzdWx0LnZhbGlkRm9yTmV3UGFja2FnZXMpLCByZWFzb25zLCBpc1Njb3BlZCB9XG59XG4iLCIvLyBQdXJlIHBpcGVsaW5lIHBpZWNlcyBmb3IgdGhlIG5wbS1uYW1lciBDTEkuIE5ldHdvcmsgSS9PIGxpdmVzIGluXG4vLyBgY2hlY2subWpzOm1haW4oKWAgd2hpY2ggc2VxdWVuY2VzIHRoZXNlIGluIG9yZGVyOyBldmVyeXRoaW5nIGhlcmUgaXNcbi8vIGRhdGEtaW4gLyBkYXRhLW91dCBzbyB1bml0IHRlc3RzIGNhbiBjb3ZlciB0aGUgdW52ZXJpZmllZC1tb25pa2VyIHBhdGhcbi8vIHdpdGhvdXQgdG91Y2hpbmcgdGhlIHJlZ2lzdHJ5LlxuXG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gJ21hc3NhbWFuJ1xuXG5pbXBvcnQgeyBORUFSX01BVENIX01BWF9ORUlHSEJPUlMsIFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUgfSBmcm9tICcuL2NvbnN0YW50cy5tanMnXG5pbXBvcnQgeyB2YXJpYW50cyBhcyBtb25pa2VyVmFyaWFudHMgfSBmcm9tICcuL21vbmlrZXIubWpzJ1xuaW1wb3J0IHsgZmluZE5lYXJNYXRjaGVzIH0gZnJvbSAnLi9uZWFyLW1hdGNoLm1qcydcbmltcG9ydCB7IHZhbGlkYXRlTmFtZSB9IGZyb20gJy4vdmFsaWRhdGUubWpzJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RBdmFpbGFibGVcbiAqIEBwcm9wZXJ0eSB7J2F2YWlsYWJsZSd9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8e25hbWU6IHN0cmluZywgZGlzdGFuY2U6IG51bWJlcn0+fSBbbmVhck1hdGNoZXNdXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdFRha2VuXG4gKiBAcHJvcGVydHkgeyd0YWtlbid9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWZXJkaWN0TW9uaWtlclxuICogQHByb3BlcnR5IHsnbW9uaWtlcid9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNvbmZsaWN0c1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RVbnZlcmlmaWVkXG4gKiBAcHJvcGVydHkgeyd1bnZlcmlmaWVkJ30gc3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gdW52ZXJpZmllZCAtIHNhbXBsZSAoY2FwcGVkIGF0IFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUpXG4gKiBAcHJvcGVydHkge251bWJlcn0gdW52ZXJpZmllZFRvdGFsXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdEludmFsaWRcbiAqIEBwcm9wZXJ0eSB7J2ludmFsaWQnfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSByZWFzb25zXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdFVua25vd25cbiAqIEBwcm9wZXJ0eSB7J3Vua25vd24nfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge251bWJlcn0gaHR0cFN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtlcnJvcl1cbiAqXG4gKiBAdHlwZWRlZiB7VmVyZGljdEF2YWlsYWJsZSB8IFZlcmRpY3RUYWtlbiB8IFZlcmRpY3RNb25pa2VyIHwgVmVyZGljdFVudmVyaWZpZWQgfCBWZXJkaWN0SW52YWxpZCB8IFZlcmRpY3RVbmtub3dufSBWZXJkaWN0XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNb25pa2VyUHJvYmVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNvbmZsaWN0cyAtIGV4aXN0aW5nIG5hbWVzIHRoYXQgc2hhcmUgdGhlIGNhbmRpZGF0ZSdzIG5vcm1hbGl6ZWQgZm9ybVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gdW52ZXJpZmllZCAtIHZhcmlhbnQgbmFtZXMgd2hvc2UgbG9va3VwIGRpZG4ndCByZXR1cm4gdGFrZW4vZnJlZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVHJpYWdlUmVzdWx0XG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSB2YWxpZCAtIHN5bnRhY3RpY2FsbHkgdmFsaWQgY2FuZGlkYXRlIG5hbWVzXG4gKiBAcHJvcGVydHkge1ZlcmRpY3RJbnZhbGlkW119IGludmFsaWQgLSBhbHJlYWR5LWZvcm1lZCBpbnZhbGlkIHZlcmRpY3RzXG4gKiBAcHJvcGVydHkge1NldDxzdHJpbmc+fSBzY29wZWQgLSBzdWJzZXQgb2YgYHZhbGlkYCB3aG9zZSBuYW1lcyBhcmUgYEBzY29wZS9uYW1lYFxuICovXG5cbi8qKiBGcm96ZW4gc2VudGluZWwgZm9yIGNhbmRpZGF0ZXMgdGhhdCB3ZXJlbid0IHByb2JlZCAoZS5nLiBzY29wZWQpLiAqL1xuY29uc3QgRU1QVFlfUFJPQkUgPSBPYmplY3QuZnJlZXplKHsgY29uZmxpY3RzOiBPYmplY3QuZnJlZXplKFtdKSwgdW52ZXJpZmllZDogT2JqZWN0LmZyZWV6ZShbXSkgfSlcblxuLyoqXG4gKiBTcGxpdCBjYW5kaWRhdGVzIGludG8gc3ludGFjdGljYWxseS12YWxpZCArIGFscmVhZHktcmVqZWN0ZWQuIFRoZSBzY29wZWRcbiAqIHN1YnNldCBpcyB0YWdnZWQgc2VwYXJhdGVseSBzbyBsYXRlciBwaGFzZXMgY2FuIHNraXAgbW9uaWtlciBwcm9iaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IGNhbmRpZGF0ZXNcbiAqIEByZXR1cm5zIHtUcmlhZ2VSZXN1bHR9XG4gKiBAZXhhbXBsZVxuICogdHJpYWdlKFsndGlueS1sb2cnLCAnVGlueUxvZycsICdAbWUvZm9vJ10pXG4gKiAvLyB7IHZhbGlkOiBbJ3RpbnktbG9nJywgJ0BtZS9mb28nXSwgaW52YWxpZDogW3tzdGF0dXM6J2ludmFsaWQnLCAuLi59XSwgc2NvcGVkOiBTZXQgeyAnQG1lL2ZvbycgfSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmlhZ2UoY2FuZGlkYXRlcykge1xuICBjb25zdCB2YWxpZCA9IFtdXG4gIGNvbnN0IGludmFsaWQgPSBbXVxuICBjb25zdCBzY29wZWQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCBuYW1lIG9mIGNhbmRpZGF0ZXMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZU5hbWUobmFtZSlcbiAgICBpZiAocmVzdWx0LmlzVmFsaWQpIHtcbiAgICAgIHZhbGlkLnB1c2gobmFtZSlcbiAgICAgIGlmIChyZXN1bHQuaXNTY29wZWQpIHNjb3BlZC5hZGQobmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgaW52YWxpZC5wdXNoKHsgc3RhdHVzOiAnaW52YWxpZCcsIG5hbWUsIHJlYXNvbnM6IHJlc3VsdC5yZWFzb25zIH0pXG4gICAgfVxuICB9XG4gIHJldHVybiB7IHZhbGlkLCBpbnZhbGlkLCBzY29wZWQgfVxufVxuXG4vKipcbiAqIFNlbGVjdCB3aGljaCB1bnNjb3BlZCwgbGl0ZXJhbC1mcmVlIGNhbmRpZGF0ZXMgc2hvdWxkIGJlIG1vbmlrZXItcHJvYmVkXG4gKiBhbmQgZW51bWVyYXRlIHRoZWlyIHZhcmlhbnRzLiBSZXR1cm5zIHRoZSB2YXJpYW50IGxpc3QgcGVyIGNhbmRpZGF0ZVxuICogcGx1cyB0aGUgZGVkdXBsaWNhdGVkIHNldCB0aGUgY2FsbGVyIHNob3VsZCBzZW5kIHRvIHRoZSByZWdpc3RyeS5cbiAqXG4gKiBAcGFyYW0ge3tcbiAqICAgdmFsaWQ6IHN0cmluZ1tdLFxuICogICBzY29wZWQ6IFNldDxzdHJpbmc+LFxuICogICBleGlzdGVuY2U6IE1hcDxzdHJpbmcsIGltcG9ydCgnLi9yZWdpc3RyeS5tanMnKS5FeGlzdGVuY2U+LFxuICogICBpc0V4aGF1c3RpdmU6IGJvb2xlYW4sXG4gKiB9fSBpbnB1dFxuICogQHJldHVybnMge3sgdmFyaWFudHNCeU5hbWU6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiwgYWxsVmFyaWFudHM6IFNldDxzdHJpbmc+IH19XG4gKiBAZXhhbXBsZVxuICogc2VsZWN0TW9uaWtlckNhbmRpZGF0ZXMoe1xuICogICB2YWxpZDogWydwaWNvbG9nJywgJ0BtZS9zY29wZWQnXSxcbiAqICAgc2NvcGVkOiBuZXcgU2V0KFsnQG1lL3Njb3BlZCddKSxcbiAqICAgZXhpc3RlbmNlOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ3BpY29sb2cnLCBzdGF0dXM6IDQwNCB9XV0pLFxuICogICBpc0V4aGF1c3RpdmU6IGZhbHNlLFxuICogfSlcbiAqIC8vIHsgdmFyaWFudHNCeU5hbWU6IE1hcCB7ICdwaWNvbG9nJyDihpIgWydwaWNvLWxvZycsICdwaWNvX2xvZycsIOKApl0gfSwgYWxsVmFyaWFudHM6IFNldCB7IC4uLiB9IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdE1vbmlrZXJDYW5kaWRhdGVzKHsgdmFsaWQsIHNjb3BlZCwgZXhpc3RlbmNlLCBpc0V4aGF1c3RpdmUgfSkge1xuICBjb25zdCB2YXJpYW50c0J5TmFtZSA9IG5ldyBNYXAoKVxuICBjb25zdCBhbGxWYXJpYW50cyA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsaWQpIHtcbiAgICBpZiAoc2NvcGVkLmhhcyhuYW1lKSkgY29udGludWVcbiAgICBjb25zdCBsaXRlcmFsID0gZXhpc3RlbmNlLmdldChuYW1lKVxuICAgIGlmIChsaXRlcmFsPy5raW5kICE9PSAnZnJlZScpIGNvbnRpbnVlXG4gICAgY29uc3QgdmFyaWFudHMgPSBtb25pa2VyVmFyaWFudHMobmFtZSwgeyBpc0V4aGF1c3RpdmUgfSlcbiAgICB2YXJpYW50c0J5TmFtZS5zZXQobmFtZSwgdmFyaWFudHMpXG4gICAgZm9yIChjb25zdCB2YXJpYW50IG9mIHZhcmlhbnRzKSBhbGxWYXJpYW50cy5hZGQodmFyaWFudClcbiAgfVxuICByZXR1cm4geyB2YXJpYW50c0J5TmFtZSwgYWxsVmFyaWFudHMgfVxufVxuXG4vKipcbiAqIEJ1Y2tldCBlYWNoIGNhbmRpZGF0ZSdzIHZhcmlhbnQgcmVzdWx0cyBpbnRvIGB7IGNvbmZsaWN0cywgdW52ZXJpZmllZCB9YC5cbiAqIFVua25vd24gcHJvYmVzIGdvIHRvIGB1bnZlcmlmaWVkYCBzbyBjYWxsZXJzIGRvbid0IGNvbmZsYXRlIFwicmVnaXN0cnlcbiAqIGNvdWxkbid0IHNheVwiIHdpdGggXCJyZWdpc3RyeSBjb25maXJtZWQgZnJlZS5cIlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2YXJpYW50c0J5TmFtZTogTWFwPHN0cmluZywgc3RyaW5nW10+LFxuICogICB2YXJpYW50UmVzdWx0czogaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZVtdLFxuICogfX0gaW5wdXRcbiAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCBNb25pa2VyUHJvYmU+fVxuICogQGV4YW1wbGVcbiAqIGFzc2VtYmxlTW9uaWtlclByb2Jlcyh7XG4gKiAgIHZhcmlhbnRzQnlOYW1lOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCBbJ3BpY28tbG9nJywgJ3BpY29fbG9nJ11dXSksXG4gKiAgIHZhcmlhbnRSZXN1bHRzOiBbXG4gKiAgICAgeyBraW5kOiAndGFrZW4nLCBuYW1lOiAncGljby1sb2cnLCBzdGF0dXM6IDIwMCB9LFxuICogICAgIHsga2luZDogJ3Vua25vd24nLCBuYW1lOiAncGljb19sb2cnLCBzdGF0dXM6IDQyOSB9LFxuICogICBdLFxuICogfSlcbiAqIC8vIE1hcCB7ICdwaWNvbG9nJyDihpIgeyBjb25mbGljdHM6IFsncGljby1sb2cnXSwgdW52ZXJpZmllZDogWydwaWNvX2xvZyddIH0gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVNb25pa2VyUHJvYmVzKHsgdmFyaWFudHNCeU5hbWUsIHZhcmlhbnRSZXN1bHRzIH0pIHtcbiAgY29uc3QgYnlWYXJpYW50ID0gbmV3IE1hcCh2YXJpYW50UmVzdWx0cy5tYXAoKHJlc3VsdCkgPT4gW3Jlc3VsdC5uYW1lLCByZXN1bHRdKSlcbiAgY29uc3QgcHJvYmVzID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgW25hbWUsIHZhcmlhbnRzXSBvZiB2YXJpYW50c0J5TmFtZSkge1xuICAgIGNvbnN0IGNvbmZsaWN0cyA9IFtdXG4gICAgY29uc3QgdW52ZXJpZmllZCA9IFtdXG4gICAgZm9yIChjb25zdCB2YXJpYW50IG9mIHZhcmlhbnRzKSB7XG4gICAgICBjb25zdCBraW5kID0gYnlWYXJpYW50LmdldCh2YXJpYW50KT8ua2luZFxuICAgICAgaWYgKGtpbmQgPT09ICd0YWtlbicpIGNvbmZsaWN0cy5wdXNoKHZhcmlhbnQpXG4gICAgICBlbHNlIGlmIChraW5kID09PSAndW5rbm93bicpIHVudmVyaWZpZWQucHVzaCh2YXJpYW50KVxuICAgIH1cbiAgICBwcm9iZXMuc2V0KG5hbWUsIHsgY29uZmxpY3RzLCB1bnZlcmlmaWVkIH0pXG4gIH1cbiAgcmV0dXJuIHByb2Jlc1xufVxuXG4vKipcbiAqIEJ1aWxkIHRoZSBmaW5hbCB2ZXJkaWN0IG1hcCBieSBtZXJnaW5nIHRyaWFnZSByZXN1bHRzLCByZWdpc3RyeVxuICogZXhpc3RlbmNlLCBhbmQgbW9uaWtlciBwcm9iZXMuXG4gKlxuICogQHBhcmFtIHt7XG4gKiAgIHZhbGlkOiBzdHJpbmdbXSxcbiAqICAgaW52YWxpZDogVmVyZGljdEludmFsaWRbXSxcbiAqICAgZXhpc3RlbmNlOiBNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlPixcbiAqICAgbW9uaWtlclByb2JlczogTWFwPHN0cmluZywgTW9uaWtlclByb2JlPixcbiAqIH19IGlucHV0XG4gKiBAcmV0dXJucyB7TWFwPHN0cmluZywgVmVyZGljdD59XG4gKiBAZXhhbXBsZVxuICogZGVjaWRlKHtcbiAqICAgdmFsaWQ6IFsncGljb2xvZyddLFxuICogICBpbnZhbGlkOiBbXSxcbiAqICAgZXhpc3RlbmNlOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ3BpY29sb2cnLCBzdGF0dXM6IDQwNCB9XV0pLFxuICogICBtb25pa2VyUHJvYmVzOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCB7IGNvbmZsaWN0czogW10sIHVudmVyaWZpZWQ6IFsncGljb19sb2cnXSB9XV0pLFxuICogfSlcbiAqIC8vIE1hcCB7ICdwaWNvbG9nJyDihpIgeyBzdGF0dXM6ICd1bnZlcmlmaWVkJywgbmFtZTogJ3BpY29sb2cnLCB1bnZlcmlmaWVkOiBbJ3BpY29fbG9nJ10sIHVudmVyaWZpZWRUb3RhbDogMSB9IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2lkZSh7IHZhbGlkLCBpbnZhbGlkLCBleGlzdGVuY2UsIG1vbmlrZXJQcm9iZXMgfSkge1xuICBjb25zdCB2ZXJkaWN0cyA9IG5ldyBNYXAoaW52YWxpZC5tYXAoKHZlcmRpY3QpID0+IFt2ZXJkaWN0Lm5hbWUsIHZlcmRpY3RdKSlcbiAgZm9yIChjb25zdCBuYW1lIG9mIHZhbGlkKSB7XG4gICAgY29uc3QgbGl0ZXJhbCA9IGV4aXN0ZW5jZS5nZXQobmFtZSlcbiAgICAvLyB2YWxpZCBjYW5kaWRhdGVzIG11c3QgaGF2ZSBhbiBleGlzdGVuY2UgZW50cnkg4oCUIHRoZSB1cHN0cmVhbSBwaGFzZVxuICAgIC8vIGNvdmVycyBleGFjdGx5IGB2YWxpZGAuIElmIHRoaXMgZmlyZXMsIHRoZSBpbnZhcmlhbnQgYnJva2UuXG4gICAgaWYgKCFsaXRlcmFsKSB0aHJvdyBuZXcgRXJyb3IoYGRlY2lkZTogbWlzc2luZyBleGlzdGVuY2UgcmVzdWx0IGZvciAke25hbWV9YClcbiAgICB2ZXJkaWN0cy5zZXQoXG4gICAgICBuYW1lLFxuICAgICAgZGVjaWRlT25lKHsgbmFtZSwgZXhpc3RlbmNlOiBsaXRlcmFsLCBwcm9iZTogbW9uaWtlclByb2Jlcy5nZXQobmFtZSkgPz8gRU1QVFlfUFJPQkUgfSlcbiAgICApXG4gIH1cbiAgcmV0dXJuIHZlcmRpY3RzXG59XG5cbi8qKlxuICogTWFwIG9uZSBjYW5kaWRhdGUncyBleGlzdGVuY2UgKyBtb25pa2VyIHByb2JlIGludG8gYSBzaW5nbGUgVmVyZGljdC5cbiAqIFB1cmUg4oCUIG1hdGNoZXMgZXhoYXVzdGl2ZWx5IG9uIGBleGlzdGVuY2Uua2luZGAuIFdpdGhpbiBgZnJlZWAsIHRoZVxuICogdmVyZGljdCBpcyBgbW9uaWtlcmAgKGRlZmluaXRpdmUgY29sbGlzaW9uKSwgYHVudmVyaWZpZWRgIChzb21lIHZhcmlhbnRcbiAqIHByb2JlcyBmYWlsZWQgYW5kIG5vIGNvbGxpc2lvbnMgd2VyZSBkZWZpbml0aXZlbHkgZm91bmQpLCBvciBgYXZhaWxhYmxlYFxuICogKGFsbCB2YXJpYW50IHByb2JlcyBjb21wbGV0ZWQgY2xlYW5seSkuXG4gKlxuICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgZXhpc3RlbmNlOiBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlLCBwcm9iZTogTW9uaWtlclByb2JlIH19IGlucHV0XG4gKiBAcmV0dXJucyB7VmVyZGljdH1cbiAqIEBleGFtcGxlXG4gKiBkZWNpZGVPbmUoe1xuICogICBuYW1lOiAnZXh0b29sa2l0JyxcbiAqICAgZXhpc3RlbmNlOiB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ2V4dG9vbGtpdCcsIHN0YXR1czogNDA0IH0sXG4gKiAgIHByb2JlOiB7IGNvbmZsaWN0czogW10sIHVudmVyaWZpZWQ6IFtdIH0sXG4gKiB9KVxuICogLy8geyBzdGF0dXM6ICdhdmFpbGFibGUnLCBuYW1lOiAnZXh0b29sa2l0JyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpZGVPbmUoeyBuYW1lLCBleGlzdGVuY2UsIHByb2JlIH0pIHtcbiAgcmV0dXJuIG1hdGNoKGV4aXN0ZW5jZSlcbiAgICAud2l0aCh7IGtpbmQ6ICd0YWtlbicgfSwgKCkgPT4gKHsgc3RhdHVzOiAndGFrZW4nLCBuYW1lIH0pKVxuICAgIC53aXRoKHsga2luZDogJ3Vua25vd24nIH0sIChyZXN1bHQpID0+ICh7XG4gICAgICBzdGF0dXM6ICd1bmtub3duJyxcbiAgICAgIG5hbWUsXG4gICAgICBodHRwU3RhdHVzOiByZXN1bHQuc3RhdHVzLFxuICAgICAgLi4uKHJlc3VsdC5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHsgZXJyb3I6IHJlc3VsdC5lcnJvciB9KSxcbiAgICB9KSlcbiAgICAud2l0aCh7IGtpbmQ6ICdmcmVlJyB9LCAoKSA9PiB7XG4gICAgICBpZiAocHJvYmUuY29uZmxpY3RzLmxlbmd0aCA+IDApIHJldHVybiB7IHN0YXR1czogJ21vbmlrZXInLCBuYW1lLCBjb25mbGljdHM6IHByb2JlLmNvbmZsaWN0cyB9XG4gICAgICBpZiAocHJvYmUudW52ZXJpZmllZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzOiAndW52ZXJpZmllZCcsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICB1bnZlcmlmaWVkOiBwcm9iZS51bnZlcmlmaWVkLnNsaWNlKDAsIFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUpLFxuICAgICAgICAgIHVudmVyaWZpZWRUb3RhbDogcHJvYmUudW52ZXJpZmllZC5sZW5ndGgsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHN0YXR1czogJ2F2YWlsYWJsZScsIG5hbWUgfVxuICAgIH0pXG4gICAgLmV4aGF1c3RpdmUoKVxufVxuXG4vKipcbiAqIEFubm90YXRlIGBhdmFpbGFibGVgIHZlcmRpY3RzIHdpdGggdXAgdG8gYE5FQVJfTUFUQ0hfTUFYX05FSUdIQk9SU2BcbiAqIHR5cG9zcXVhdC1zaGFwZWQgbmVpZ2hib3JzIGZyb20gdGhlIHBvcHVsYXItbmFtZXMgY29ycHVzLiBUaGUgbmFtZSBpc1xuICogc3RpbGwgcHVibGlzaGFibGU7IHRoaXMgaXMgYSBzb2Z0IHdhcm5pbmcgdGhlIHVzZXIgY2FuIG92ZXJyaWRlLlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2ZXJkaWN0czogTWFwPHN0cmluZywgVmVyZGljdD4sXG4gKiAgIGNhbmRpZGF0ZXM6IHN0cmluZ1tdLFxuICogICBjb3JwdXM6IHN0cmluZ1tdLFxuICogICBtYXhEaXN0YW5jZTogbnVtYmVyLFxuICogfX0gaW5wdXRcbiAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCBWZXJkaWN0Pn1cbiAqIEBleGFtcGxlXG4gKiBmbGFnVHlwb3NxdWF0cyh7XG4gKiAgIHZlcmRpY3RzOiBuZXcgTWFwKFtbJ2V4dG9vbGtpdCcsIHsgc3RhdHVzOiAnYXZhaWxhYmxlJywgbmFtZTogJ2V4dG9vbGtpdCcgfV1dKSxcbiAqICAgY2FuZGlkYXRlczogWydleHRvb2xraXQnXSxcbiAqICAgY29ycHVzOiBbJ2VzLXRvb2xraXQnXSxcbiAqICAgbWF4RGlzdGFuY2U6IDIsXG4gKiB9KVxuICogLy8gTWFwIHsgJ2V4dG9vbGtpdCcg4oaSIHsgc3RhdHVzOiAnYXZhaWxhYmxlJywgbmFtZTogJ2V4dG9vbGtpdCcsIG5lYXJNYXRjaGVzOiBbeyBuYW1lOiAnZXMtdG9vbGtpdCcsIGRpc3RhbmNlOiAxIH1dIH0gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhZ1R5cG9zcXVhdHMoeyB2ZXJkaWN0cywgY2FuZGlkYXRlcywgY29ycHVzLCBtYXhEaXN0YW5jZSB9KSB7XG4gIGNvbnN0IGFubm90YXRlZCA9IG5ldyBNYXAodmVyZGljdHMpXG4gIGZvciAoY29uc3QgbmFtZSBvZiBjYW5kaWRhdGVzKSB7XG4gICAgY29uc3QgdmVyZGljdCA9IGFubm90YXRlZC5nZXQobmFtZSlcbiAgICBpZiAodmVyZGljdD8uc3RhdHVzICE9PSAnYXZhaWxhYmxlJykgY29udGludWVcbiAgICBjb25zdCBtYXRjaGVzID0gZmluZE5lYXJNYXRjaGVzKG5hbWUsIGNvcnB1cywgeyBtYXhEaXN0YW5jZSB9KVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGFubm90YXRlZC5zZXQobmFtZSwgeyAuLi52ZXJkaWN0LCBuZWFyTWF0Y2hlczogbWF0Y2hlcy5zbGljZSgwLCBORUFSX01BVENIX01BWF9ORUlHSEJPUlMpIH0pXG4gICAgfVxuICB9XG4gIHJldHVybiBhbm5vdGF0ZWRcbn1cbiIsIi8vIG5wbSByZWdpc3RyeSBleGlzdGVuY2UgY2hlY2sgKyBib3VuZGVkLWNvbmN1cnJlbmN5IHJlcXVlc3QgcG9vbC5cbi8vXG4vLyBgY2hlY2tPbmVgIHJldHVybnMgYSBkaXNjcmltaW5hdGVkIGBFeGlzdGVuY2VgIHZhbHVlIChUYWtlbiAvIEZyZWUgL1xuLy8gVW5rbm93bikgc28gY2FsbGVycyBjYW4gcGF0dGVybi1tYXRjaCBpbnN0ZWFkIG9mIGRpc3BhdGNoaW5nIG9uXG4vLyBgYm9vbGVhbiB8IG51bGxgLiBUaGUgcG9vbCBydW5uZXIgaXMgYSB0aW55IHN0cnVjdHVyZWQtY29uY3VycmVuY3lcbi8vIHByaW1pdGl2ZSDigJQgbm8gZXh0ZXJuYWwgc2NoZWR1bGVyIG5lZWRlZCBmb3IgdGhlIHJlcXVlc3Qgdm9sdW1lcyB3ZSBoaXQuXG5cbmltcG9ydCB7XG4gIERFRkFVTFRfQ09OQ1VSUkVOQ1ksXG4gIERFRkFVTFRfUkVHSVNUUllfQkFTRSxcbiAgREVGQVVMVF9SRUdJU1RSWV9USU1FT1VUX01TLFxufSBmcm9tICcuL2NvbnN0YW50cy5tanMnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGFrZW5cbiAqIEBwcm9wZXJ0eSB7J3Rha2VuJ30ga2luZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7MjAwfSBzdGF0dXNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGcmVlXG4gKiBAcHJvcGVydHkgeydmcmVlJ30ga2luZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7NDA0fSBzdGF0dXNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBVbmtub3duXG4gKiBAcHJvcGVydHkgeyd1bmtub3duJ30ga2luZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGF0dXMgLSAwIHdoZW4gdGhlIG5ldHdvcmsgZmFpbGVkIG91dHJpZ2h0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Vycm9yXSAtIHByZXNlbnQgd2hlbiBzdGF0dXMgPT09IDBcbiAqXG4gKiBAdHlwZWRlZiB7VGFrZW4gfCBGcmVlIHwgVW5rbm93bn0gRXhpc3RlbmNlXG4gKi9cblxuLyoqIEByZXR1cm5zIHtUYWtlbn0gKi9cbmNvbnN0IHRha2VuID0gKG5hbWUpID0+ICh7IGtpbmQ6ICd0YWtlbicsIG5hbWUsIHN0YXR1czogMjAwIH0pXG4vKiogQHJldHVybnMge0ZyZWV9ICovXG5jb25zdCBmcmVlID0gKG5hbWUpID0+ICh7IGtpbmQ6ICdmcmVlJywgbmFtZSwgc3RhdHVzOiA0MDQgfSlcbi8qKiBAcmV0dXJucyB7VW5rbm93bn0gKi9cbmNvbnN0IHVua25vd24gPSAobmFtZSwgc3RhdHVzLCBlcnJvcikgPT5cbiAgZXJyb3IgPT09IHVuZGVmaW5lZCA/IHsga2luZDogJ3Vua25vd24nLCBuYW1lLCBzdGF0dXMgfSA6IHsga2luZDogJ3Vua25vd24nLCBuYW1lLCBzdGF0dXMsIGVycm9yIH1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgc2luZ2xlIG5hbWUgZXhpc3RzIG9uIHRoZSByZWdpc3RyeS4gTmV2ZXIgdGhyb3dzIOKAlCBldmVyeVxuICogb3V0Y29tZSAoMjAwIC8gNDA0IC8gb3RoZXIgLyBuZXR3b3JrIGVycm9yKSBtYXBzIHRvIGEgZGlzY3JpbWluYXRlZFxuICogYEV4aXN0ZW5jZWAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7eyBiYXNlPzogc3RyaW5nLCB0aW1lb3V0TXM/OiBudW1iZXIsIGZldGNoSW1wbD86IHR5cGVvZiBmZXRjaCB9fSBbb3B0c11cbiAqIEByZXR1cm5zIHtQcm9taXNlPEV4aXN0ZW5jZT59XG4gKiBAZXhhbXBsZVxuICogYXdhaXQgY2hlY2tPbmUoJ3JlYWN0JykgICAgICAgIC8vIHsga2luZDogJ3Rha2VuJywgbmFtZTogJ3JlYWN0Jywgc3RhdHVzOiAyMDAgfVxuICogYXdhaXQgY2hlY2tPbmUoJ25vdmVsLXh5eicpICAgIC8vIHsga2luZDogJ2ZyZWUnLCAgbmFtZTogJ25vdmVsLXh5eicsIHN0YXR1czogNDA0IH1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrT25lKG5hbWUsIG9wdHMgPSB7fSkge1xuICBjb25zdCBiYXNlID0gb3B0cy5iYXNlID8/IERFRkFVTFRfUkVHSVNUUllfQkFTRVxuICBjb25zdCB0aW1lb3V0TXMgPSBvcHRzLnRpbWVvdXRNcyA/PyBERUZBVUxUX1JFR0lTVFJZX1RJTUVPVVRfTVNcbiAgY29uc3QgZmV0Y2hJbXBsID0gb3B0cy5mZXRjaEltcGwgPz8gZmV0Y2hcblxuICBjb25zdCB1cmwgPSBgJHtiYXNlfS8ke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX1gXG4gIGNvbnN0IGN0cmwgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGN0cmwuYWJvcnQoKSwgdGltZW91dE1zKVxuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSW1wbCh1cmwsIHsgbWV0aG9kOiAnSEVBRCcsIHNpZ25hbDogY3RybC5zaWduYWwgfSlcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgLy8gQSBjdXN0b20gZmV0Y2hJbXBsIGNhbiByZXR1cm4gbm9uLVJlc3BvbnNlIHNoYXBlcyAoZS5nLiBhIHN0cmVhbSkuXG4gICAgLy8gR3VhcmQgdGhlIHN0YXR1cyByZWFkIHNvIGFuIHVudXNhYmxlIHJlc3BvbnNlIHN1cmZhY2VzIGFzIGB1bmtub3duYFxuICAgIC8vIHJhdGhlciB0aGFuIGVtaXR0aW5nIGB7c3RhdHVzOiB1bmRlZmluZWR9YCBhbmQgdmlvbGF0aW5nIHRoZSB0eXBlZGVmLlxuICAgIGNvbnN0IHN0YXR1cyA9IHJlcz8uc3RhdHVzXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHN0YXR1cykpIHtcbiAgICAgIHJldHVybiB1bmtub3duKG5hbWUsIDAsICdmZXRjaCByZXR1cm5lZCByZXNwb25zZSB3aXRob3V0IG51bWVyaWMgc3RhdHVzJylcbiAgICB9XG4gICAgaWYgKHN0YXR1cyA9PT0gMjAwKSByZXR1cm4gdGFrZW4obmFtZSlcbiAgICBpZiAoc3RhdHVzID09PSA0MDQpIHJldHVybiBmcmVlKG5hbWUpXG4gICAgcmV0dXJuIHVua25vd24obmFtZSwgc3RhdHVzKVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIHJldHVybiB1bmtub3duKG5hbWUsIDAsIGU/Lm1lc3NhZ2UgPz8gU3RyaW5nKGUpKVxuICB9XG59XG5cbi8qKlxuICogQm91bmRlZC1jb25jdXJyZW5jeSBwb29sIHJ1bm5lci4gUnVucyBgdGFza3NgIChmdW5jdGlvbnMgcmV0dXJuaW5nIFByb21pc2VzKVxuICogd2l0aCBhdCBtb3N0IGBjb25jdXJyZW5jeWAgaW4tZmxpZ2h0IGF0IG9uY2UuIFByZXNlcnZlcyBpbnB1dCBvcmRlci5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtBcnJheTwoKSA9PiBQcm9taXNlPFQ+Pn0gdGFza3NcbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVuY3ldXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxUW10+fVxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHRhc2tzID0gdXJscy5tYXAoKHVybCkgPT4gKCkgPT4gZmV0Y2godXJsKSlcbiAqIGNvbnN0IHJlc3BvbnNlcyA9IGF3YWl0IHBvb2wodGFza3MsIDgpICAvLyBhdCBtb3N0IDggaW4gZmxpZ2h0LCByZXN1bHRzIGluIGlucHV0IG9yZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb29sKHRhc2tzLCBjb25jdXJyZW5jeSA9IERFRkFVTFRfQ09OQ1VSUkVOQ1kpIHtcbiAgLy8gTmVnYXRpdmUgb3Igbm9uLWludGVnZXIgY29uY3VycmVuY3kgaXMgYSBjYWxsZXIgYnVnIOKAlCBmYWlsIGxvdWQgcmF0aGVyXG4gIC8vIHRoYW4gcnVubmluZyBub3RoaW5nIG9yIHByb2R1Y2luZyBhIHJlc3VsdHMgYXJyYXkgd2l0aCBob2xlcy5cbiAgaWYgKGNvbmN1cnJlbmN5ICE9IG51bGwgJiYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbmN1cnJlbmN5KSB8fCBjb25jdXJyZW5jeSA8IDApKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgcG9vbDogY29uY3VycmVuY3kgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIChnb3QgJHtjb25jdXJyZW5jeX0pYClcbiAgfVxuICAvLyBgMGAgaXMgdHJlYXRlZCBhcyBcInVzZSBkZWZhdWx0XCIg4oCUIHRoZSBwYXJzZUludCBwYXRoIGluIGNoZWNrLm1qcyBjYW5cbiAgLy8gc3VyZmFjZSAwIHdoZW4gdGhlIHVzZXIgcGFzc2VzIGAtLWNvbmN1cnJlbmN5IDBgLCB3aGljaCB3ZSByZWFkIGFzXG4gIC8vIFwibGV0IHRoZSBsaWJyYXJ5IHBpY2tcIiByYXRoZXIgdGhhbiBcImRvIG5vdCBydW5cIi5cbiAgY29uc3QgZWZmZWN0aXZlQ29uY3VycmVuY3kgPVxuICAgIE51bWJlci5pc0ludGVnZXIoY29uY3VycmVuY3kpICYmIGNvbmN1cnJlbmN5ID4gMCA/IGNvbmN1cnJlbmN5IDogREVGQVVMVF9DT05DVVJSRU5DWVxuICBjb25zdCByZXN1bHRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGFza3MubGVuZ3RoIH0pXG4gIGxldCBuZXh0ID0gMFxuICBhc3luYyBmdW5jdGlvbiB3b3JrZXIoKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGkgPSBuZXh0KytcbiAgICAgIGlmIChpID49IHRhc2tzLmxlbmd0aCkgcmV0dXJuXG4gICAgICByZXN1bHRzW2ldID0gYXdhaXQgdGFza3NbaV0oKVxuICAgIH1cbiAgfVxuICBjb25zdCB3b3JrZXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogTWF0aC5taW4oZWZmZWN0aXZlQ29uY3VycmVuY3ksIHRhc2tzLmxlbmd0aCkgfSwgd29ya2VyKVxuICBhd2FpdCBQcm9taXNlLmFsbCh3b3JrZXJzKVxuICByZXR1cm4gcmVzdWx0c1xufVxuXG4vKipcbiAqIENoZWNrIGV4aXN0ZW5jZSBmb3IgYSBiYXRjaCBvZiBuYW1lcyB3aXRoIGJvdW5kZWQgY29uY3VycmVuY3kuIFJlc3VsdHNcbiAqIGFyZSByZXR1cm5lZCBpbiBpbnB1dCBvcmRlciByZWdhcmRsZXNzIG9mIGNvbXBsZXRpb24gb3JkZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gbmFtZXNcbiAqIEBwYXJhbSB7eyBjb25jdXJyZW5jeT86IG51bWJlciwgYmFzZT86IHN0cmluZywgdGltZW91dE1zPzogbnVtYmVyLCBmZXRjaEltcGw/OiB0eXBlb2YgZmV0Y2ggfX0gW29wdHNdXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxFeGlzdGVuY2VbXT59XG4gKiBAZXhhbXBsZVxuICogYXdhaXQgY2hlY2tNYW55KFsncmVhY3QnLCAndnVlJywgJ25vdmVsLXh5eiddLCB7IGNvbmN1cnJlbmN5OiA0IH0pXG4gKiAvLyBbeyBraW5kOiAndGFrZW4nLCBuYW1lOiAncmVhY3QnLCDigKYgfSwgeyBraW5kOiAndGFrZW4nLCBuYW1lOiAndnVlJywg4oCmIH0sIHsga2luZDogJ2ZyZWUnLCBuYW1lOiAnbm92ZWwteHl6Jywg4oCmIH1dXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01hbnkobmFtZXMsIG9wdHMgPSB7fSkge1xuICBjb25zdCB0YXNrcyA9IG5hbWVzLm1hcCgobmFtZSkgPT4gKCkgPT4gY2hlY2tPbmUobmFtZSwgb3B0cykpXG4gIHJldHVybiBwb29sKHRhc2tzLCBvcHRzLmNvbmN1cnJlbmN5ID8/IERFRkFVTFRfQ09OQ1VSUkVOQ1kpXG59XG4iLCIjIS91c3IvYmluL2VudiBub2RlXG4vLyBDTEkgZW50cnkgZm9yIHRoZSBucG0tbmFtZXIgc2tpbGwuIE9yY2hlc3RyYXRlcyB0aGUgcHVyZSBwaXBlbGluZSBwaGFzZXNcbi8vIGZyb20gYHBpcGVsaW5lLm1qc2AgYWdhaW5zdCB0aGUgbmV0d29yay4gVGhlIHBpcGVsaW5lOlxuLy8gICB0cmlhZ2Ug4oaSIHByb2JlUmVnaXN0cnkg4oaSIHNlbGVjdE1vbmlrZXJDYW5kaWRhdGVzIOKGkiBjaGVja01hbnkodmFyaWFudHMpXG4vLyAgICAgICAgICDihpIgYXNzZW1ibGVNb25pa2VyUHJvYmVzIOKGkiBkZWNpZGUg4oaSIGZsYWdUeXBvc3F1YXRzXG4vLyBgbWFpbmAgdGhyZWFkcyBuYW1lZCBpbnRlcm1lZGlhdGUgdmFsdWVzIHRocm91Z2g7IHB1cmUgdHJhbnNmb3JtcyBsaXZlXG4vLyBpbiBwaXBlbGluZS5tanMgYW5kIGFyZSB1bml0LXRlc3RlZCBpbmRlcGVuZGVudGx5LlxuXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHsgcGFyc2VBcmdzIH0gZnJvbSAnbm9kZTp1dGlsJ1xuXG5pbXBvcnQgeyBlcnIsIGlzRXJyLCBpc09rLCBvayB9IGZyb20gJ21hc3NhbWFuJ1xuaW1wb3J0IHsgbWF0Y2gsIFAgfSBmcm9tICdtYXNzYW1hbidcblxuaW1wb3J0IHtcbiAgREVGQVVMVF9DT05DVVJSRU5DWSxcbiAgREVGQVVMVF9MSU1JVCxcbiAgTkVBUl9NQVRDSF9NQVhfRElTVEFOQ0UsXG4gIFNIT1JUTElTVF9MSU1JVCxcbn0gZnJvbSAnLi9jb25zdGFudHMubWpzJ1xuaW1wb3J0IHsgbG9hZENvcnB1cyB9IGZyb20gJy4vY29ycHVzLm1qcydcbmltcG9ydCB7IHBlcm11dGUsIHNjb3JlIH0gZnJvbSAnLi9wZXJtdXRlLm1qcydcbmltcG9ydCB7XG4gIGFzc2VtYmxlTW9uaWtlclByb2JlcyxcbiAgZGVjaWRlLFxuICBmbGFnVHlwb3NxdWF0cyxcbiAgc2VsZWN0TW9uaWtlckNhbmRpZGF0ZXMsXG4gIHRyaWFnZSxcbn0gZnJvbSAnLi9waXBlbGluZS5tanMnXG5pbXBvcnQgeyBjaGVja01hbnkgfSBmcm9tICcuL3JlZ2lzdHJ5Lm1qcydcblxuY29uc3QgVVNBR0UgPSBgbnBtLW5hbWVyIOKAlCBmaW5kIGF2YWlsYWJsZSBucG0gcGFja2FnZSBuYW1lc1xuXG5Vc2FnZTpcbiAgbm9kZSBjaGVjay5tanMgW29wdGlvbnNdIFtzZWVkcy4uLl1cblxuTW9kZXM6XG4gIChzZWVkcyBnaXZlbikgICAgICAgIFBlcm11dGUgdGhlIHNlZWRzLCBjaGVjayBlYWNoIGNhbmRpZGF0ZS5cbiAgLS1jaGVjayA8bmFtZXMuLi4+ICAgU2tpcCBwZXJtdXRhdGlvbjsgY2hlY2sgdGhlIGdpdmVuIG5hbWVzIGRpcmVjdGx5LlxuICAtLXN0ZGluICAgICAgICAgICAgICBSZWFkIG5hbWVzIGZyb20gc3RkaW4gKG9uZSBwZXIgbGluZSk7IHNraXAgcGVybXV0YXRpb24uXG4gIC0tZmlsZSA8cGF0aD4gICAgICAgIFJlYWQgbmFtZXMgZnJvbSBmaWxlIChvbmUgcGVyIGxpbmUpOyBza2lwIHBlcm11dGF0aW9uLlxuXG5PcHRpb25zOlxuICAtLWxpbWl0IDxuPiAgICAgICAgICBNYXggY2FuZGlkYXRlcyB0byBjaGVjayAoZGVmYXVsdDogJHtERUZBVUxUX0xJTUlUfSkuXG4gIC0tY29uY3VycmVuY3kgPG4+ICAgIFBhcmFsbGVsIHJlZ2lzdHJ5IHJlcXVlc3RzIChkZWZhdWx0OiAke0RFRkFVTFRfQ09OQ1VSUkVOQ1l9KS5cbiAgLS1zY29wZSA8QHNjb3BlPiAgICAgR2VuZXJhdGUgc2NvcGVkIHZhcmlhbnRzIChkZWZhdWx0OiB1bnNjb3BlZCkuXG4gIC0tbm8tbW9uaWtlciAgICAgICAgIFNraXAgbW9uaWtlciBjb2xsaXNpb24gY2hlY2sgKHRoZSBucG0gcHVibGlzaC10aW1lIHJ1bGUpLlxuICAtLWV4aGF1c3RpdmUgICAgICAgICBXaWRlciAyLWluc2VydGlvbiBtb25pa2VyIHZhcmlhbnRzIChzbG93ZXIsIG1vcmUgdGhvcm91Z2gpLlxuICAtLW5vLW5lYXItbWF0Y2ggICAgICBTa2lwIHR5cG9zcXVhdC1zdHlsZSBzaW1pbGFyaXR5IGNoZWNrIGFnYWluc3QgcG9wdWxhciBwYWNrYWdlcy5cbiAgLS1uZWFyLWRpc3RhbmNlIDxuPiAgTWF4IGVkaXQgZGlzdGFuY2UgZm9yIG5lYXItbWF0Y2ggd2FybmluZ3MgKGRlZmF1bHQ6ICR7TkVBUl9NQVRDSF9NQVhfRElTVEFOQ0V9KS5cbiAgLS1qc29uICAgICAgICAgICAgICAgT3V0cHV0IEpTT04gaW5zdGVhZCBvZiB0ZXh0LlxuICAtLWhlbHAsIC1oICAgICAgICAgICBTaG93IHRoaXMgaGVscC5cblxuTmFtZXMgdGhhdCBsb29rIGxpa2Ugb3B0aW9ucyAobGVhZGluZyBoeXBoZW4pIG11c3QgYmUgcGFzc2VkIGFmdGVyIGEgbGl0ZXJhbFxuXFxgLS1cXGAgc2VwYXJhdG9yOlxuICBub2RlIGNoZWNrLm1qcyAtLWNoZWNrIC0tIC1mb28gLmJhciBfYmF6XG5cblZlcmRpY3RzOlxuICDinJMgYXZhaWxhYmxlICAgIGZyZWUgb24gcmVnaXN0cnkgKyBubyBtb25pa2VyIGNvbGxpc2lvbiAobWF5IGNhcnJ5IG5lYXItbWF0Y2ggd2FybmluZylcbiAg4pqgIG1vbmlrZXIgICAgICBmcmVlIGxpdGVyYWxseSBidXQgbm9ybWFsaXplZCBmb3JtIGNvbGxpZGVzIOKAlCBucG0gcHVibGlzaCB3aWxsIHJlamVjdFxuICDimqAgdW52ZXJpZmllZCAgIGZyZWUgbGl0ZXJhbGx5IGJ1dCBtb25pa2VyIGNoZWNrIGluY29tcGxldGUgKHNvbWUgdmFyaWFudHMgY291bGRuJ3QgYmUgcHJvYmVkKVxuICDinJcgdGFrZW4gICAgICAgIHRoZSBleGFjdCBuYW1lIGlzIHB1Ymxpc2hlZFxuICDinJcgaW52YWxpZCAgICAgIGZhaWxzIHN5bnRhY3RpYyBydWxlc1xuICA/IHVua25vd24gICAgICByZWdpc3RyeSByZXR1cm5lZCBhIG5vbi0yMDAvNDA0IHN0YXR1cyBmb3IgdGhlIGxpdGVyYWwgbmFtZVxuXG5MaW1pdGF0aW9uOlxuICBUaGUgbW9uaWtlciBjaGVjayBlbnVtZXJhdGVzIDEtIGFuZCAyLXNlcGFyYXRvciB2YXJpYW50cy4gMysgbW9ycGhlbWVcbiAgc3BsaXRzIChlLmcuIFxcYGVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcXGAgdnMgXFxgZXNsaW50cGx1Z2lucmVhY3Rob29rc1xcYClcbiAgYXJlIE5PVCBjb3ZlcmVkIGV2ZW4gd2l0aCAtLWV4aGF1c3RpdmUuIEZvciBhdXRob3JpdGF0aXZlIHByZS1mbGlnaHQgb25cbiAgbXVsdGktbW9ycGhlbWUgbmFtZXMsIHJ1biBcXGBucG0gcHVibGlzaCAtLWRyeS1ydW5cXGAuXG5cbkV4YW1wbGVzOlxuICBub2RlIGNoZWNrLm1qcyB0aW55IGxvZ1xuICBub2RlIGNoZWNrLm1qcyAtLWNoZWNrIHBpY29sb2cgbWljcm9sb2cganNsb2dcbiAgZWNobyBcInBpY29sb2dcIiB8IG5vZGUgY2hlY2subWpzIC0tc3RkaW5cbiAgbm9kZSBjaGVjay5tanMgLS1zY29wZSBAbWUgbG9nZ2VyIGZhc3RcbmBcblxuY29uc3QgU1lNQk9MUyA9IHtcbiAgYXZhaWxhYmxlOiAn4pyTJyxcbiAgdGFrZW46ICfinJcnLFxuICBtb25pa2VyOiAn4pqgJyxcbiAgdW52ZXJpZmllZDogJ+KaoCcsXG4gIGludmFsaWQ6ICfinJcnLFxuICB1bmtub3duOiAnPycsXG59XG5jb25zdCBESVZJREVSID0gJ+KUgCcucmVwZWF0KDY0KVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbmZpZ1xuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gcG9zaXRpb25hbHNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvdWxkU2tpcFBlcm11dGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGlucHV0TmFtZXNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaW1pdFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbmN1cnJlbmN5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3Njb3BlXVxuICogQHByb3BlcnR5IHtib29sZWFufSBpc01vbmlrZXJFbmFibGVkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzRXhoYXVzdGl2ZVxuICogQHByb3BlcnR5IHtib29sZWFufSBpc05lYXJNYXRjaEVuYWJsZWRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBuZWFyRGlzdGFuY2VcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvdWxkT3V0cHV0SnNvblxuICogQHByb3BlcnR5IHtib29sZWFufSBzaG91bGRTaG93SGVscFxuICovXG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHBhcnNlQ2xpKHByb2Nlc3MuYXJndi5zbGljZSgyKSlcbiAgaWYgKGNvbmZpZy5zaG91bGRTaG93SGVscCkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFVTQUdFKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgcHJlcGFyZWQgPSBwcmVwYXJlQ2FuZGlkYXRlcyhjb25maWcpXG4gIGlmIChpc0VycihwcmVwYXJlZCkpIHJldHVybiBkaWUocHJlcGFyZWQuZXJyb3IubWVzc2FnZSlcbiAgY29uc3QgeyBzZWVkcywgY2FuZGlkYXRlcywgY29uc2lkZXJlZENvdW50IH0gPSBwcmVwYXJlZC52YWx1ZVxuXG4gIGNvbnN0IGNvcnB1cyA9IGNvbmZpZy5pc05lYXJNYXRjaEVuYWJsZWQgPyBsb2FkQ29ycHVzKCkgOiBlcnIobmV3IEVycm9yKCdkaXNhYmxlZCcpKVxuICBjb25zdCBoYXNDb3JwdXMgPSBpc09rKGNvcnB1cylcblxuICBjb25zdCB7IHZhbGlkLCBpbnZhbGlkLCBzY29wZWQgfSA9IHRyaWFnZShjYW5kaWRhdGVzKVxuICBjb25zdCBleGlzdGVuY2UgPSBhd2FpdCBwcm9iZVJlZ2lzdHJ5KHZhbGlkLCBjb25maWcpXG4gIGNvbnN0IG1vbmlrZXJQcm9iZXMgPSBjb25maWcuaXNNb25pa2VyRW5hYmxlZFxuICAgID8gYXdhaXQgcHJvYmVNb25pa2VyQ29sbGlzaW9ucyh7IHZhbGlkLCBzY29wZWQsIGV4aXN0ZW5jZSwgY29uZmlnIH0pXG4gICAgOiBuZXcgTWFwKClcblxuICBjb25zdCBkZWNpZGVkID0gZGVjaWRlKHsgdmFsaWQsIGludmFsaWQsIGV4aXN0ZW5jZSwgbW9uaWtlclByb2JlcyB9KVxuICBjb25zdCBhbm5vdGF0ZWQgPSBoYXNDb3JwdXNcbiAgICA/IGZsYWdUeXBvc3F1YXRzKHtcbiAgICAgICAgdmVyZGljdHM6IGRlY2lkZWQsXG4gICAgICAgIGNhbmRpZGF0ZXMsXG4gICAgICAgIGNvcnB1czogY29ycHVzLnZhbHVlLm5hbWVzLFxuICAgICAgICBtYXhEaXN0YW5jZTogY29uZmlnLm5lYXJEaXN0YW5jZSxcbiAgICAgIH0pXG4gICAgOiBkZWNpZGVkXG5cbiAgY29uc3Qgb3V0cHV0ID0gc2hhcGVPdXRwdXQoe1xuICAgIG1vZGU6IGNvbmZpZy5zaG91bGRTa2lwUGVybXV0ZSA/ICdjaGVjaycgOiAnZmluZCcsXG4gICAgc2VlZHMsXG4gICAgY29uc2lkZXJlZENvdW50LFxuICAgIGNhbmRpZGF0ZXMsXG4gICAgdmVyZGljdHM6IGFubm90YXRlZCxcbiAgICBpc01vbmlrZXJFbmFibGVkOiBjb25maWcuaXNNb25pa2VyRW5hYmxlZCxcbiAgICBpc0V4aGF1c3RpdmU6IGNvbmZpZy5pc0V4aGF1c3RpdmUsXG4gICAgaXNOZWFyTWF0Y2hFbmFibGVkOiBjb25maWcuaXNOZWFyTWF0Y2hFbmFibGVkICYmIGhhc0NvcnB1cyxcbiAgfSlcblxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShcbiAgICBjb25maWcuc2hvdWxkT3V0cHV0SnNvbiA/IGAke0pTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMil9XFxuYCA6IHJlbmRlclRleHQob3V0cHV0KVxuICApXG59XG5cbi8qKlxuICogUGFyc2UgQ0xJIGFyZ3YgaW50byBhIHN0cnVjdHVyZWQgY29uZmlnLiBUaHJvd3Mgbm90aGluZyDigJQgaW52YWxpZCBDTElcbiAqIHVzYWdlIHN1cmZhY2VzIGxhdGVyIGFzIGFuIGVtcHR5IGlucHV0IG9yIGEgYHByZXBhcmVDYW5kaWRhdGVzYCBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBhcmd2XG4gKiBAcmV0dXJucyB7Q29uZmlnfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VDbGkoYXJndikge1xuICBjb25zdCB7IHZhbHVlcywgcG9zaXRpb25hbHMgfSA9IHBhcnNlQXJncyh7XG4gICAgYXJnczogYXJndixcbiAgICBhbGxvd1Bvc2l0aW9uYWxzOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNoZWNrOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgIHN0ZGluOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgIGZpbGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgIGxpbWl0OiB7IHR5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiBTdHJpbmcoREVGQVVMVF9MSU1JVCkgfSxcbiAgICAgIGNvbmN1cnJlbmN5OiB7IHR5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiBTdHJpbmcoREVGQVVMVF9DT05DVVJSRU5DWSkgfSxcbiAgICAgIHNjb3BlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAnbm8tbW9uaWtlcic6IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgZXhoYXVzdGl2ZTogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICAnbm8tbmVhci1tYXRjaCc6IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgJ25lYXItZGlzdGFuY2UnOiB7IHR5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiBTdHJpbmcoTkVBUl9NQVRDSF9NQVhfRElTVEFOQ0UpIH0sXG4gICAgICBqc29uOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgIGhlbHA6IHsgdHlwZTogJ2Jvb2xlYW4nLCBzaG9ydDogJ2gnLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIH0sXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBzaG91bGRTaG93SGVscDogdmFsdWVzLmhlbHAsXG4gICAgcG9zaXRpb25hbHMsXG4gICAgc2hvdWxkU2tpcFBlcm11dGU6IHZhbHVlcy5jaGVjayB8fCB2YWx1ZXMuc3RkaW4gfHwgQm9vbGVhbih2YWx1ZXMuZmlsZSksXG4gICAgaW5wdXROYW1lczogZ2F0aGVySW5wdXROYW1lcyh2YWx1ZXMpLFxuICAgIGxpbWl0OiBwYXJzZUludE9yKHZhbHVlcy5saW1pdCwgREVGQVVMVF9MSU1JVCksXG4gICAgY29uY3VycmVuY3k6IHBhcnNlSW50T3IodmFsdWVzLmNvbmN1cnJlbmN5LCBERUZBVUxUX0NPTkNVUlJFTkNZKSxcbiAgICBzY29wZTogdmFsdWVzLnNjb3BlLFxuICAgIGlzTW9uaWtlckVuYWJsZWQ6ICF2YWx1ZXNbJ25vLW1vbmlrZXInXSxcbiAgICBpc0V4aGF1c3RpdmU6IHZhbHVlcy5leGhhdXN0aXZlLFxuICAgIGlzTmVhck1hdGNoRW5hYmxlZDogIXZhbHVlc1snbm8tbmVhci1tYXRjaCddLFxuICAgIG5lYXJEaXN0YW5jZTogcGFyc2VJbnRPcih2YWx1ZXNbJ25lYXItZGlzdGFuY2UnXSwgTkVBUl9NQVRDSF9NQVhfRElTVEFOQ0UpLFxuICAgIHNob3VsZE91dHB1dEpzb246IHZhbHVlcy5qc29uLFxuICB9XG59XG5cbmZ1bmN0aW9uIGdhdGhlcklucHV0TmFtZXModmFsdWVzKSB7XG4gIGlmICh2YWx1ZXMuc3RkaW4pIHJldHVybiByZWFkTGlzdEZyb21TdGRpbigpXG4gIGlmICh2YWx1ZXMuZmlsZSkge1xuICAgIHJldHVybiByZWFkRmlsZVN5bmModmFsdWVzLmZpbGUsICd1dGY4JylcbiAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgIC5tYXAoKGxpbmUpID0+IGxpbmUudHJpbSgpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICB9XG4gIHJldHVybiBbXVxufVxuXG4vKipcbiAqIFJlYWQgbmV3bGluZS1zZXBhcmF0ZWQgbmFtZXMgZnJvbSBzdGRpbi4gUmV0dXJucyBgW11gIG9ubHkgd2hlbiBub3RoaW5nXG4gKiBpcyBwaXBlZCAoaW50ZXJhY3RpdmUgVFRZKS4gUmVhbCByZWFkIGZhaWx1cmVzIGJ1YmJsZSDigJQgc2lsZW50IGNhdGNoZXNcbiAqIG1hc2sgZGF0YS1sb3NzIGJ1Z3Mgd2UnZCByYXRoZXIgc2VlIHRoYW4gc3dhbGxvdy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWFkTGlzdEZyb21TdGRpbigpIHtcbiAgaWYgKHByb2Nlc3Muc3RkaW4uaXNUVFkpIHJldHVybiBbXVxuICByZXR1cm4gcmVhZEZpbGVTeW5jKDAsICd1dGY4JylcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLm1hcCgobGluZSkgPT4gbGluZS50cmltKCkpXG4gICAgLmZpbHRlcihCb29sZWFuKVxufVxuXG5mdW5jdGlvbiBwYXJzZUludE9yKHJhdywgZmFsbGJhY2spIHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQocmF3LCAxMClcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpICYmIHBhcnNlZCA+IDAgPyBwYXJzZWQgOiBmYWxsYmFja1xufVxuXG4vKipcbiAqIFJlc29sdmUgdGhlIGNhbmRpZGF0ZSBsaXN0IGZyb20gdGhlIENMSSBpbnB1dHMuIEluIGBjaGVja2AgbW9kZSB0aGVcbiAqIHBvc2l0aW9uYWxzICsgc3RkaW4vZmlsZSBsaW5lcyBhcmUgdGhlIGNhbmRpZGF0ZXM7IGluIGBmaW5kYCBtb2RlIHRoZVxuICogcG9zaXRpb25hbHMgYXJlIHNlZWRzIHRoYXQgd2UgcGVybXV0ZS4gRWl0aGVyIHBhdGggcmFua3MgYW5kIHRyaW1zIHRvXG4gKiBgY29uZmlnLmxpbWl0YC5cbiAqXG4gKiBgY29uc2lkZXJlZENvdW50YCBpcyB0aGUgdG90YWwgY2FuZGlkYXRlIHNwYWNlIGJlZm9yZSB0aGUgYC0tbGltaXRgXG4gKiB0cmltIOKAlCBpbnB1dCBjb3VudCBpbiBjaGVjayBtb2RlLCBwZXJtdXRhdGlvbiBjb3VudCBpbiBmaW5kIG1vZGUuXG4gKlxuICogQHBhcmFtIHtDb25maWd9IGNvbmZpZ1xuICogQHJldHVybnMge2ltcG9ydCgnbWFzc2FtYW4nKS5SZXN1bHQ8e3NlZWRzOiBzdHJpbmdbXSwgY2FuZGlkYXRlczogc3RyaW5nW10sIGNvbnNpZGVyZWRDb3VudDogbnVtYmVyfSwgRXJyb3I+fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcHJlcGFyZUNhbmRpZGF0ZXMoY29uZmlnKSB7XG4gIGlmIChjb25maWcuc2hvdWxkU2tpcFBlcm11dGUpIHtcbiAgICBjb25zdCBzdXBwbGllZCA9IFsuLi5jb25maWcuaW5wdXROYW1lcywgLi4uY29uZmlnLnBvc2l0aW9uYWxzXVxuICAgICAgLm1hcCgobmFtZSkgPT4gbmFtZS50cmltKCkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgaWYgKHN1cHBsaWVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGVycihuZXcgRXJyb3IoJ25vIG5hbWVzIHByb3ZpZGVkIOKAlCBwYXNzIG5hbWVzIGFzIGFyZ3MsIHZpYSAtLXN0ZGluLCBvciB2aWEgLS1maWxlJykpXG4gICAgfVxuICAgIGNvbnN0IGRlZHVwZWQgPSBbLi4ubmV3IFNldChzdXBwbGllZCldXG4gICAgcmV0dXJuIG9rKHtcbiAgICAgIHNlZWRzOiBbXSxcbiAgICAgIGNhbmRpZGF0ZXM6IHRyaW0oZGVkdXBlZCwgW10sIGNvbmZpZy5saW1pdCksXG4gICAgICBjb25zaWRlcmVkQ291bnQ6IGRlZHVwZWQubGVuZ3RoLFxuICAgIH0pXG4gIH1cblxuICBpZiAoY29uZmlnLnBvc2l0aW9uYWxzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBlcnIobmV3IEVycm9yKCdubyBzZWVkcyBwcm92aWRlZC4gU2VlIC0taGVscC4nKSlcbiAgfVxuICBjb25zdCBzZWVkcyA9IGNvbmZpZy5wb3NpdGlvbmFsc1xuICBjb25zdCBwZXJtdXRlZENhbmRpZGF0ZXMgPSBbLi4ubmV3IFNldChwZXJtdXRlKHNlZWRzLCB7IHNjb3BlOiBjb25maWcuc2NvcGUgfSkpXVxuICBpZiAocGVybXV0ZWRDYW5kaWRhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIHBlcm11dGUoKSByZWplY3RzIG5vbi1hbHBoYW51bWVyaWMgdG9rZW5zLiBJZiBldmVyeSBzZWVkIGdvdCBmaWx0ZXJlZCxcbiAgICAvLyBnaXZlIHRoZSB1c2VyIGFjdGlvbmFibGUgZmVlZGJhY2sgaW5zdGVhZCBvZiBhIHNpbGVudCB6ZXJvLXJlc3VsdCBydW4uXG4gICAgLy8gVXNlIGAtLSBgIGJlZm9yZSB0aGUgbmFtZXMgc28gdGhlIGxlYWRpbmctaHlwaGVuIC8gbGVhZGluZy1kb3QgY2FzZXNcbiAgICAvLyBtYWtlIGl0IHRocm91Z2ggcGFyc2VBcmdzIGFzIHBvc2l0aW9uYWxzLlxuICAgIHJldHVybiBlcnIoXG4gICAgICBuZXcgRXJyb3IoXG4gICAgICAgIGBhbGwgc2VlZHMgd2VyZSBmaWx0ZXJlZCAoc2VlZHMgbXVzdCBiZSBhbHBoYW51bWVyaWMg4oCUIHRyeSBgICtcbiAgICAgICAgICBgXFxgLS1jaGVjayAtLSAke3NlZWRzLmpvaW4oJyAnKX1cXGAgdG8gY2hlY2sgdGhlbSBhcyBsaXRlcmFsIG5hbWVzIGluc3RlYWQpYFxuICAgICAgKVxuICAgIClcbiAgfVxuICByZXR1cm4gb2soe1xuICAgIHNlZWRzLFxuICAgIGNhbmRpZGF0ZXM6IHRyaW0ocGVybXV0ZWRDYW5kaWRhdGVzLCBzZWVkcywgY29uZmlnLmxpbWl0KSxcbiAgICBjb25zaWRlcmVkQ291bnQ6IHBlcm11dGVkQ2FuZGlkYXRlcy5sZW5ndGgsXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHRyaW0oY2FuZGlkYXRlcywgc2VlZHMsIGxpbWl0KSB7XG4gIGNvbnN0IHJhbmtlZCA9IFsuLi5jYW5kaWRhdGVzXS5zb3J0KChhLCBiKSA9PiBzY29yZShhLCBzZWVkcykgLSBzY29yZShiLCBzZWVkcykpXG4gIHJldHVybiByYW5rZWQubGVuZ3RoID4gbGltaXQgPyByYW5rZWQuc2xpY2UoMCwgbGltaXQpIDogcmFua2VkXG59XG5cbi8qKlxuICogSEVBRCBlYWNoIG5hbWUgaW4gcGFyYWxsZWwgYWdhaW5zdCB0aGUgbnBtIHJlZ2lzdHJ5LiBSZXR1cm5zIGEgbG9va3VwXG4gKiBtYXAga2V5ZWQgYnkgbmFtZTsgdmFsdWVzIGFyZSBkaXNjcmltaW5hdGVkIGBFeGlzdGVuY2VgIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBuYW1lc1xuICogQHBhcmFtIHt7IGNvbmN1cnJlbmN5OiBudW1iZXIgfX0gY29uZmlnXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlPj59XG4gKiBAcHJpdmF0ZVxuICovXG5hc3luYyBmdW5jdGlvbiBwcm9iZVJlZ2lzdHJ5KG5hbWVzLCBjb25maWcpIHtcbiAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGNoZWNrTWFueShuYW1lcywgeyBjb25jdXJyZW5jeTogY29uZmlnLmNvbmN1cnJlbmN5IH0pXG4gIHJldHVybiBuZXcgTWFwKHJlc3VsdHMubWFwKChyZXN1bHQpID0+IFtyZXN1bHQubmFtZSwgcmVzdWx0XSkpXG59XG5cbi8qKlxuICogTmV0d29yay1ib3VuZCBoYWxmIG9mIHRoZSBtb25pa2VyIGNoZWNrLiBUaGUgcHVyZSBzZWxlY3Rpb24gKyBhc3NlbWJseVxuICogbGl2ZXMgaW4gcGlwZWxpbmUubWpzOyB0aGlzIGZ1bmN0aW9uIGJyaWRnZXMgdGhlbSB3aXRoIHRoZSByZWdpc3RyeVxuICogcm91bmQtdHJpcCBpbiB0aGUgbWlkZGxlLlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2YWxpZDogc3RyaW5nW10sXG4gKiAgIHNjb3BlZDogU2V0PHN0cmluZz4sXG4gKiAgIGV4aXN0ZW5jZTogTWFwPHN0cmluZywgaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZT4sXG4gKiAgIGNvbmZpZzogeyBpc0V4aGF1c3RpdmU6IGJvb2xlYW4sIGNvbmN1cnJlbmN5OiBudW1iZXIgfSxcbiAqIH19IGlucHV0XG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcGlwZWxpbmUubWpzJykuTW9uaWtlclByb2JlPj59XG4gKiBAcHJpdmF0ZVxuICovXG5hc3luYyBmdW5jdGlvbiBwcm9iZU1vbmlrZXJDb2xsaXNpb25zKHsgdmFsaWQsIHNjb3BlZCwgZXhpc3RlbmNlLCBjb25maWcgfSkge1xuICBjb25zdCB7IHZhcmlhbnRzQnlOYW1lLCBhbGxWYXJpYW50cyB9ID0gc2VsZWN0TW9uaWtlckNhbmRpZGF0ZXMoe1xuICAgIHZhbGlkLFxuICAgIHNjb3BlZCxcbiAgICBleGlzdGVuY2UsXG4gICAgaXNFeGhhdXN0aXZlOiBjb25maWcuaXNFeGhhdXN0aXZlLFxuICB9KVxuICBjb25zdCB2YXJpYW50UmVzdWx0cyA9IGF3YWl0IGNoZWNrTWFueShbLi4uYWxsVmFyaWFudHNdLCB7IGNvbmN1cnJlbmN5OiBjb25maWcuY29uY3VycmVuY3kgfSlcbiAgcmV0dXJuIGFzc2VtYmxlTW9uaWtlclByb2Jlcyh7IHZhcmlhbnRzQnlOYW1lLCB2YXJpYW50UmVzdWx0cyB9KVxufVxuXG5mdW5jdGlvbiBzaGFwZU91dHB1dCh7XG4gIG1vZGUsXG4gIHNlZWRzLFxuICBjb25zaWRlcmVkQ291bnQsXG4gIGNhbmRpZGF0ZXMsXG4gIHZlcmRpY3RzLFxuICBpc01vbmlrZXJFbmFibGVkLFxuICBpc0V4aGF1c3RpdmUsXG4gIGlzTmVhck1hdGNoRW5hYmxlZCxcbn0pIHtcbiAgcmV0dXJuIHtcbiAgICBtb2RlLFxuICAgIHNlZWRzLFxuICAgIGNvbnNpZGVyZWQ6IGNvbnNpZGVyZWRDb3VudCxcbiAgICBjaGVja2VkOiBjYW5kaWRhdGVzLmxlbmd0aCxcbiAgICBpc01vbmlrZXJFbmFibGVkLFxuICAgIGlzRXhoYXVzdGl2ZSxcbiAgICBpc05lYXJNYXRjaEVuYWJsZWQsXG4gICAgcmVzdWx0czogY2FuZGlkYXRlcy5tYXAoKG5hbWUpID0+IHZlcmRpY3RzLmdldChuYW1lKSkuZmlsdGVyKEJvb2xlYW4pLFxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRleHQob3V0cHV0KSB7XG4gIGNvbnN0IGhlYWRlciA9XG4gICAgb3V0cHV0Lm1vZGUgPT09ICdmaW5kJ1xuICAgICAgPyBbYHNlZWRzOiAgICAke291dHB1dC5zZWVkcy5qb2luKCcsICcpfWAsIGBjb25zaWRlcmVkOiAke291dHB1dC5jb25zaWRlcmVkfSBjYW5kaWRhdGVzYF1cbiAgICAgIDogW11cbiAgaGVhZGVyLnB1c2goXG4gICAgYGNoZWNrZWQ6ICAke291dHB1dC5jaGVja2VkfSBjYW5kaWRhdGVzYCxcbiAgICBvdXRwdXQuaXNNb25pa2VyRW5hYmxlZFxuICAgICAgPyBgbW9uaWtlcjogICR7b3V0cHV0LmlzRXhoYXVzdGl2ZSA/ICdleGhhdXN0aXZlJyA6ICdzdGFuZGFyZCd9IGNvbGxpc2lvbiBjaGVja2BcbiAgICAgIDogJ21vbmlrZXI6ICBza2lwcGVkICgtLW5vLW1vbmlrZXIpJyxcbiAgICBvdXRwdXQuaXNOZWFyTWF0Y2hFbmFibGVkXG4gICAgICA/ICduZWFyOiAgICAgdHlwb3NxdWF0IHNpbWlsYXJpdHkgYWdhaW5zdCBwb3B1bGFyIHBhY2thZ2VzJ1xuICAgICAgOiAnbmVhcjogICAgIHNraXBwZWQgKC0tbm8tbmVhci1tYXRjaCknLFxuICAgIERJVklERVJcbiAgKVxuXG4gIGNvbnN0IHJvd3MgPSBvdXRwdXQucmVzdWx0cy5tYXAocmVuZGVyVmVyZGljdExpbmUpXG4gIGNvbnN0IHdpbm5lcnMgPSBvdXRwdXQucmVzdWx0cy5maWx0ZXIoKHZlcmRpY3QpID0+IHZlcmRpY3Quc3RhdHVzID09PSAnYXZhaWxhYmxlJylcbiAgY29uc3QgY2xlYW4gPSB3aW5uZXJzLmZpbHRlcigodmVyZGljdCkgPT4gIXZlcmRpY3QubmVhck1hdGNoZXM/Lmxlbmd0aClcbiAgY29uc3Qgcmlza3kgPSB3aW5uZXJzLmZpbHRlcigodmVyZGljdCkgPT4gdmVyZGljdC5uZWFyTWF0Y2hlcz8ubGVuZ3RoKVxuICBjb25zdCB1bnZlcmlmaWVkID0gb3V0cHV0LnJlc3VsdHMuZmlsdGVyKCh2ZXJkaWN0KSA9PiB2ZXJkaWN0LnN0YXR1cyA9PT0gJ3VudmVyaWZpZWQnKVxuXG4gIGNvbnN0IGNsZWFuTGFiZWwgPSBvdXRwdXQuaXNNb25pa2VyRW5hYmxlZFxuICAgID8gJ0F2YWlsYWJsZSArIG1vbmlrZXItY2xlYXIgKyBubyB0eXBvc3F1YXQgc2hhcGUnXG4gICAgOiAnQXZhaWxhYmxlICsgbm8gdHlwb3NxdWF0IHNoYXBlIChtb25pa2VyIGNoZWNrIHNraXBwZWQpJ1xuXG4gIGNvbnN0IHNlY3Rpb25zID0gW1xuICAgIHJlbmRlclNob3J0bGlzdChjbGVhbkxhYmVsLCBjbGVhbiwgKHdpbm5lcikgPT4gYCAg4oCiICR7d2lubmVyLm5hbWV9YCksXG4gICAgcmVuZGVyU2hvcnRsaXN0KFxuICAgICAgJ0F2YWlsYWJsZSBidXQgdHlwb3NxdWF0LXNoYXBlZCcsXG4gICAgICByaXNreSxcbiAgICAgICh3aW5uZXIpID0+IGAgIOKAoiAke3dpbm5lci5uYW1lfSAgfiAgJHtmb3JtYXROZWFyTWF0Y2hlcyh3aW5uZXIubmVhck1hdGNoZXMpfWAsXG4gICAgICAnIOKAlCBwdWJsaXNoYWJsZSwgYnV0IGNsb3NlIHRvIHBvcHVsYXIgcGFja2FnZXMnXG4gICAgKSxcbiAgICByZW5kZXJTaG9ydGxpc3QoXG4gICAgICAnTW9uaWtlciBjaGVjayBpbmNvbXBsZXRlJyxcbiAgICAgIHVudmVyaWZpZWQsXG4gICAgICAodmVyZGljdCkgPT5cbiAgICAgICAgYCAg4oCiICR7dmVyZGljdC5uYW1lfSAgKCR7dmVyZGljdC51bnZlcmlmaWVkVG90YWx9IHZhcmlhbnQke3ZlcmRpY3QudW52ZXJpZmllZFRvdGFsID09PSAxID8gJycgOiAncyd9IG5vdCBwcm9iZWQpYCxcbiAgICAgICcg4oCUIHRyeSBhZ2FpbiBvciBydW4gYG5wbSBwdWJsaXNoIC0tZHJ5LXJ1bmAnXG4gICAgKSxcbiAgXS5maWx0ZXIoQm9vbGVhbilcblxuICBjb25zdCBmb290ZXIgPVxuICAgIGNsZWFuLmxlbmd0aCA9PT0gMCAmJiByaXNreS5sZW5ndGggPT09IDAgJiYgdW52ZXJpZmllZC5sZW5ndGggPT09IDBcbiAgICAgID8gW0RJVklERVIsICdObyBhdmFpbGFibGUgKyBtb25pa2VyLWNsZWFyIGNhbmRpZGF0ZXMuIFRyeSBicm9hZGVyIHNlZWRzIG9yIC0tc2NvcGUuJ11cbiAgICAgIDogW11cblxuICByZXR1cm4gWy4uLmhlYWRlciwgLi4ucm93cywgLi4uc2VjdGlvbnMsIC4uLmZvb3Rlcl0uam9pbignXFxuJykgKyAnXFxuJ1xufVxuXG5mdW5jdGlvbiByZW5kZXJWZXJkaWN0TGluZSh2ZXJkaWN0KSB7XG4gIGNvbnN0IHRhZyA9IGAke1NZTUJPTFNbdmVyZGljdC5zdGF0dXNdfSAke3ZlcmRpY3Quc3RhdHVzfWAucGFkRW5kKDE0KVxuICBjb25zdCBuYW1lID0gdmVyZGljdC5uYW1lLnBhZEVuZCgyOClcbiAgY29uc3QgZGV0YWlsID0gbWF0Y2godmVyZGljdClcbiAgICAud2l0aCh7IHN0YXR1czogJ3Rha2VuJyB9LCAoKSA9PiAnJylcbiAgICAud2l0aCh7IHN0YXR1czogJ21vbmlrZXInIH0sIChyZXN1bHQpID0+IGBjb2xsaWRlcyB3aXRoOiAke3Jlc3VsdC5jb25mbGljdHMuam9pbignLCAnKX1gKVxuICAgIC53aXRoKFxuICAgICAgeyBzdGF0dXM6ICd1bnZlcmlmaWVkJyB9LFxuICAgICAgKHJlc3VsdCkgPT5cbiAgICAgICAgYG1vbmlrZXIgaW5jb21wbGV0ZTogJHtyZXN1bHQudW52ZXJpZmllZFRvdGFsfSB2YXJpYW50JHtyZXN1bHQudW52ZXJpZmllZFRvdGFsID09PSAxID8gJycgOiAncyd9IG5vdCBwcm9iZWRgXG4gICAgKVxuICAgIC53aXRoKHsgc3RhdHVzOiAnaW52YWxpZCcgfSwgKHJlc3VsdCkgPT4gYCgke3Jlc3VsdC5yZWFzb25zLmpvaW4oJzsgJyl9KWApXG4gICAgLndpdGgoXG4gICAgICB7IHN0YXR1czogJ3Vua25vd24nIH0sXG4gICAgICAocmVzdWx0KSA9PiBgKGh0dHAgJHtyZXN1bHQuaHR0cFN0YXR1c30ke3Jlc3VsdC5lcnJvciA/IGA6ICR7cmVzdWx0LmVycm9yfWAgOiAnJ30pYFxuICAgIClcbiAgICAud2l0aChcbiAgICAgIHsgc3RhdHVzOiAnYXZhaWxhYmxlJywgbmVhck1hdGNoZXM6IFAuYXJyYXkoKSB9LFxuICAgICAgKHJlc3VsdCkgPT4gYG5lYXI6ICR7Zm9ybWF0TmVhck1hdGNoZXMocmVzdWx0Lm5lYXJNYXRjaGVzKX1gXG4gICAgKVxuICAgIC53aXRoKHsgc3RhdHVzOiAnYXZhaWxhYmxlJyB9LCAoKSA9PiAnJylcbiAgICAuZXhoYXVzdGl2ZSgpXG4gIHJldHVybiBgJHt0YWd9JHtuYW1lfSR7ZGV0YWlsfWBcbn1cblxuZnVuY3Rpb24gZm9ybWF0TmVhck1hdGNoZXMobWF0Y2hlcykge1xuICByZXR1cm4gbWF0Y2hlcy5tYXAoKG5laWdoYm9yKSA9PiBgJHtuZWlnaGJvci5uYW1lfSAoZD0ke25laWdoYm9yLmRpc3RhbmNlfSlgKS5qb2luKCcsICcpXG59XG5cbmZ1bmN0aW9uIHJlbmRlclNob3J0bGlzdChsYWJlbCwgaXRlbXMsIGxpbmVGbiwgc3VmZml4ID0gJycpIHtcbiAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGxcbiAgY29uc3QgaGVhZGVyID0gYCR7RElWSURFUn1cXG4ke2xhYmVsfSAoJHtpdGVtcy5sZW5ndGh9KSR7c3VmZml4fTpgXG4gIGNvbnN0IGJvZHkgPSBpdGVtcy5zbGljZSgwLCBTSE9SVExJU1RfTElNSVQpLm1hcChsaW5lRm4pLmpvaW4oJ1xcbicpXG4gIGNvbnN0IG1vcmUgPVxuICAgIGl0ZW1zLmxlbmd0aCA+IFNIT1JUTElTVF9MSU1JVCA/IGBcXG4gIOKApiBhbmQgJHtpdGVtcy5sZW5ndGggLSBTSE9SVExJU1RfTElNSVR9IG1vcmVgIDogJydcbiAgcmV0dXJuIGAke2hlYWRlcn1cXG4ke2JvZHl9JHttb3JlfWBcbn1cblxuZnVuY3Rpb24gZGllKG1lc3NhZ2UpIHtcbiAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoYGVycm9yOiAke21lc3NhZ2V9XFxuXFxuUnVuIC0taGVscCBmb3IgdXNhZ2UuXFxuYClcbiAgcHJvY2Vzcy5leGl0KDIpXG59XG5cbm1haW4oKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoYGVycm9yOiAke2Vycm9yPy5zdGFjayA/PyBlcnJvcn1cXG5gKVxuICBwcm9jZXNzLmV4aXQoMSlcbn0pXG4iXSwiaWdub3JlTGlzdCI6WzAsMSwyLDMsOCwxMCwxMV0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLFNBQVMsTUFBTSxHQUFHO0NBQ2pCLE9BQU8sS0FBSztBQUNiOztBQ3RCQSxNQUFNLElBQUUsT0FBTyxJQUFJLHFCQUFxQjtBQUFFLE1BQUEsSUFBRSxPQUFPLElBQUksd0JBQXdCO0FBQUUsTUFBQSxJQUFFO0FBQW1DLE1BQUEsS0FBRSxNQUFHLFFBQVEsS0FBRyxZQUFVLE9BQU8sQ0FBQztBQUFFLE1BQUEsS0FBRSxNQUFHLEtBQUcsQ0FBQyxDQUFDLEVBQUU7QUFBRyxNQUFBLEtBQUcsR0FBRSxHQUFFLE1BQUk7Q0FBQyxJQUFHLEVBQUUsQ0FBQyxHQUFFO0VBQUMsTUFBZSxFQUFDLFNBQVEsR0FBRSxZQUFXLE1BQTdCLEVBQUUsRUFBRSxDQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDO0VBQUUsT0FBTyxLQUFHLEtBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVEsTUFBRyxFQUFFLEdBQUUsRUFBRSxFQUFFLENBQUMsR0FBRTtDQUFDO0NBQUMsSUFBRyxFQUFFLENBQUMsR0FBRTtFQUFDLElBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxPQUFNLENBQUM7RUFBRSxJQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUU7R0FBQyxJQUFHLENBQUMsTUFBTSxRQUFRLENBQUMsR0FBRSxPQUFNLENBQUM7R0FBRSxJQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQztHQUFFLEtBQUksTUFBTSxLQUFLLEVBQUUsS0FBSyxHQUFFO0lBQUMsTUFBTSxJQUFFLEVBQUU7SUFBRyxFQUFFLENBQUMsS0FBRyxFQUFFLEtBQUcsRUFBRSxLQUFLLENBQUMsSUFBRSxFQUFFLFNBQU8sRUFBRSxLQUFLLENBQUMsSUFBRSxFQUFFLEtBQUssQ0FBQztHQUFDO0dBQUMsSUFBRyxFQUFFLFFBQU87SUFBQyxJQUFHLEVBQUUsU0FBTyxHQUFFLE1BQU0sSUFBSSxNQUFNLDBGQUEwRjtJQUFFLElBQUcsRUFBRSxTQUFPLEVBQUUsU0FBTyxFQUFFLFFBQU8sT0FBTSxDQUFDO0lBQUUsTUFBTSxJQUFFLEVBQUUsTUFBTSxHQUFFLEVBQUUsTUFBTSxHQUFFLElBQUUsTUFBSSxFQUFFLFNBQU8sQ0FBQyxJQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxHQUFFLElBQUUsRUFBRSxNQUFNLEVBQUUsUUFBTyxNQUFJLEVBQUUsU0FBTyxXQUFTLENBQUMsRUFBRSxNQUFNO0lBQUUsT0FBTyxFQUFFLE9BQU8sR0FBRSxNQUFJLEVBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQyxDQUFDLEtBQUcsRUFBRSxPQUFPLEdBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFHLENBQUMsQ0FBQyxNQUFJLE1BQUksRUFBRSxVQUFRLEVBQUUsRUFBRSxJQUFHLEdBQUUsQ0FBQztHQUFFO0dBQUMsT0FBTyxFQUFFLFdBQVMsRUFBRSxVQUFRLEVBQUUsT0FBTyxHQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRyxDQUFDLENBQUM7RUFBQztFQUFDLE9BQU8sUUFBUSxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU0sTUFBRztHQUFDLE1BQU0sSUFBRSxFQUFFO0dBQUcsUUFBTyxLQUFLLEtBQUcsRUFBRSxJQUFFLENBQUMsS0FBRyxlQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBYyxFQUFFLEdBQUUsRUFBRSxJQUFHLENBQUM7T0FBTTtFQUFDLENBQUM7Q0FBQztDQUFDLE9BQU8sT0FBTyxHQUFHLEdBQUUsQ0FBQztBQUFDO0FBQUUsTUFBQSxLQUFFLE1BQUc7Q0FBQyxJQUFJLEdBQUUsR0FBRTtDQUFFLE9BQU8sRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsU0FBTyxJQUFFLFNBQU8sS0FBRyxJQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUEsQ0FBRyxvQkFBa0IsS0FBSyxJQUFFLEVBQUUsS0FBSyxDQUFDLEtBQUcsSUFBRSxDQUFDLElBQUUsTUFBTSxRQUFRLENBQUMsSUFBRSxFQUFFLEdBQUUsQ0FBQyxJQUFFLEVBQUUsT0FBTyxPQUFPLENBQUMsR0FBRSxDQUFDLElBQUUsQ0FBQztBQUFDO0FBQUUsTUFBQSxLQUFHLEdBQUUsTUFBSSxFQUFFLFFBQVEsR0FBRSxNQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUU7Q0FBQyxJQUFHLE1BQUksRUFBRSxRQUFPO0VBQUMsTUFBSyxDQUFDLEtBQUc7RUFBRSxRQUFPLE1BQUcsRUFBRSxHQUFFLFNBQU0sQ0FBQyxDQUFDO0NBQUM7Q0FBQyxJQUFHLE1BQUksRUFBRSxRQUFPO0VBQUMsTUFBSyxDQUFDLEdBQUUsS0FBRztFQUFFLE9BQU8sRUFBRSxHQUFFLFNBQU0sQ0FBQyxDQUFDO0NBQUM7Q0FBQyxNQUFNLElBQUksTUFBTSxvRkFBb0YsRUFBRSxPQUFPLEVBQUU7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTyxPQUFPLE9BQU8sR0FBRTtFQUFDLGdCQUFhLEVBQUUsQ0FBQztFQUFFLE1BQUksTUFBRyxFQUFFLEdBQUUsQ0FBQztFQUFFLEtBQUcsTUFBRyxFQUFFLEdBQUUsQ0FBQztFQUFFLFNBQU8sTUFBRyxLQUFLLE1BQUksSUFBRSxFQUFFLENBQUMsSUFBRSxFQUFFLEdBQUUsQ0FBQztDQUFDLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTyxPQUFPLFNBQVEsTUFBRyxPQUFPLE9BQU8sR0FBRSxFQUFDLENBQUMsT0FBTyxZQUFXO0VBQUMsSUFBSSxJQUFFO0VBQUUsTUFBTSxJQUFFLENBQUM7R0FBQyxPQUFNLE9BQU8sT0FBTyxHQUFFLEdBQUUsSUFBRyxDQUFDLEVBQUMsQ0FBQztHQUFFLE1BQUssQ0FBQztFQUFDLEdBQUU7R0FBQyxNQUFLLENBQUM7R0FBRSxPQUFNLEtBQUs7RUFBQyxDQUFDO0VBQUUsT0FBTSxFQUFDLFlBQVM7R0FBQyxJQUFJO0dBQUUsT0FBTyxTQUFPLElBQUUsRUFBRSxRQUFNLElBQUUsRUFBRSxHQUFHLEVBQUU7RUFBQyxFQUFDO0NBQUMsRUFBQyxDQUFDLEVBQUEsQ0FBRyxDQUFDLEdBQUU7RUFBQyxnQkFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQUUsU0FBTyxNQUFHLEVBQUUsS0FBSyxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztDQUFDLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtFQUFDLFFBQU0sTUFBRztHQUFDLElBQUksSUFBRSxDQUFDO0dBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtJQUFDLEVBQUUsS0FBRztHQUFDO0dBQUUsT0FBTyxLQUFLLE1BQUksS0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVEsTUFBRyxFQUFFLEdBQUUsS0FBSyxDQUFDLENBQUMsR0FBRTtJQUFDLFNBQVEsQ0FBQztJQUFFLFlBQVc7R0FBQyxLQUFHO0lBQUMsU0FBUSxFQUFFLEdBQUUsR0FBRSxDQUFDO0lBQUUsWUFBVztHQUFDO0VBQUM7RUFBRSx3QkFBcUIsRUFBRSxDQUFDO0VBQUUsYUFBWTtDQUFVLEdBQUUsQ0FBQztBQUFDO0FBQUMsTUFBTSxLQUFHLEdBQUUsTUFBSTtDQUFDLEtBQUksTUFBTSxLQUFLLEdBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLE9BQU0sQ0FBQztDQUFFLE9BQU0sQ0FBQztBQUFDO0FBQUUsTUFBQSxLQUFHLEdBQUUsTUFBSTtDQUFDLEtBQUksTUFBSyxDQUFDLEdBQUUsTUFBSyxFQUFFLFFBQVEsR0FBRSxJQUFHLENBQUMsRUFBRSxHQUFFLENBQUMsR0FBRSxPQUFNLENBQUM7Q0FBRSxPQUFNLENBQUM7QUFBQztBQUFFLE1BQUEsS0FBRyxHQUFFLE1BQUk7Q0FBQyxNQUFNLElBQUUsUUFBUSxRQUFRLENBQUM7Q0FBRSxLQUFJLE1BQU0sS0FBSyxHQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUUsRUFBRSxFQUFFLEdBQUUsT0FBTSxDQUFDO0NBQUUsT0FBTSxDQUFDO0FBQUM7QUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFFO0NBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtFQUFDLFFBQU0sTUFBRztHQUFDLElBQUksSUFBRSxDQUFDO0dBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtJQUFDLEVBQUUsS0FBRztHQUFDO0dBQUUsT0FBTTtJQUFDLFNBQVEsRUFBRSxPQUFNLE1BQUcsRUFBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQUUsWUFBVztHQUFDO0VBQUM7RUFBRSx3QkFBcUIsRUFBRSxHQUFFLENBQUM7RUFBRSxhQUFZO0NBQUssR0FBRSxDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRyxHQUFFO0NBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtFQUFDLFFBQU0sTUFBRztHQUFDLElBQUksSUFBRSxDQUFDO0dBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtJQUFDLEVBQUUsS0FBRztHQUFDO0dBQUUsT0FBTyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUSxNQUFHLEVBQUUsR0FBRSxLQUFLLENBQUMsQ0FBQyxHQUFFO0lBQUMsU0FBUSxFQUFFLE1BQUssTUFBRyxFQUFFLEdBQUUsR0FBRSxDQUFDLENBQUM7SUFBRSxZQUFXO0dBQUM7RUFBQztFQUFFLHdCQUFxQixFQUFFLEdBQUUsQ0FBQztFQUFFLGFBQVk7Q0FBSSxHQUFFLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTSxHQUFFLFdBQVEsRUFBQyxRQUFNLE9BQUksRUFBQyxTQUFRLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBQyxHQUFFLEdBQUU7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUU7Q0FBQyxNQUFNLElBQUUsWUFBVSxPQUFPLEVBQUUsS0FBRyxFQUFFLEtBQUcsS0FBSyxHQUFFLElBQUUsTUFBSSxFQUFFLFNBQU8sRUFBRSxLQUFHLFlBQVUsT0FBTyxFQUFFLEtBQUcsS0FBSyxJQUFFLEVBQUU7Q0FBRyxPQUFPLEVBQUUsR0FBRSxXQUFRO0VBQUMsUUFBTSxNQUFHO0dBQUMsSUFBSSxJQUFFLEdBQUUsUUFBTSxJQUFFLElBQUUsSUFBRyxFQUFDO0dBQUUsT0FBTTtJQUFDLFNBQVEsS0FBSyxNQUFJLEtBQUcsRUFBRSxHQUFFLElBQUcsR0FBRSxNQUFJO0tBQUMsRUFBRSxLQUFHO0lBQUMsQ0FBQztJQUFFLFlBQVc7R0FBQztFQUFDO0VBQUUsd0JBQXFCLENBQUMsUUFBTSxJQUFFLElBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQUksSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxHQUFFLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTSxDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU0sWUFBVSxPQUFPO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU0sWUFBVSxPQUFPO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU0sWUFBVSxPQUFPO0FBQUM7QUFBQyxNQUFNLElBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFFLE1BQUEsSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsTUFBQSxJQUFFO0FBQUUsTUFBQSxLQUFFLE1BQUcsT0FBTyxPQUFPLEVBQUUsQ0FBQyxHQUFFO0NBQUMsYUFBVyxNQUFHO0VBQUMsT0FBTyxFQUFFLEVBQUUsSUFBRyxJQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDO01BQU07Q0FBQztDQUFFLFdBQVMsTUFBRztFQUFDLE9BQU8sRUFBRSxFQUFFLElBQUcsSUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztNQUFNO0NBQUM7Q0FBRSxZQUFVLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxVQUFRLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsU0FBTyxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsV0FBUyxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLFlBQVUsTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFVBQVEsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxXQUFTLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7TUFBTTtDQUFDO0NBQUUsUUFBTSxNQUFHO0VBQUMsT0FBTyxFQUFFLEVBQUUsSUFBRyxJQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztNQUFNO0NBQUM7QUFBQyxDQUFDO0FBQUUsTUFBQSxJQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFBRSxNQUFBLEtBQUUsTUFBRyxPQUFPLE9BQU8sRUFBRSxDQUFDLEdBQUU7Q0FBQyxVQUFTLEdBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLE1BQUksR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEtBQUcsS0FBRyxLQUFHLENBQUMsRUFBQSxDQUFHLEdBQUUsQ0FBQyxDQUFDLENBQUM7Q0FBRSxLQUFHLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLEtBQUcsTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsTUFBSSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEtBQUcsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxNQUFJLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsS0FBRyxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLFdBQVEsRUFBRSxFQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQUUsY0FBVyxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FBRSxnQkFBYSxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztDQUFFLGdCQUFhLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsQ0FBQyxDQUFDO0FBQUMsQ0FBQztBQUFFLE1BQUEsSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsTUFBQSxLQUFFLE1BQUcsT0FBTyxPQUFPLEVBQUUsQ0FBQyxHQUFFO0NBQUMsVUFBUyxHQUFFLE1BQUksRUFBRSxFQUFFLEtBQUksR0FBRSxNQUFJLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxLQUFHLEtBQUcsS0FBRyxDQUFDLEVBQUEsQ0FBRyxHQUFFLENBQUMsQ0FBQyxDQUFDO0NBQUUsS0FBRyxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxLQUFHLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLE1BQUksTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxLQUFHLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsTUFBSSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEtBQUcsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxnQkFBYSxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztDQUFFLGdCQUFhLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsQ0FBQyxDQUFDO0FBQUMsQ0FBQztBQUFpTCxJQUFJLElBQUU7Q0FBQyxXQUFVO0NBQUssU0FBUTtDQUFFLFVBQVM7Q0FBRSxPQUFNLFNBQVMsR0FBRyxHQUFFO0VBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtHQUFDLFFBQU0sTUFBRztJQUFDLElBQUcsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxHQUFFLE9BQU0sRUFBQyxTQUFRLENBQUMsRUFBQztJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sT0FBTSxFQUFDLFNBQVEsQ0FBQyxFQUFDO0lBQUUsTUFBTSxJQUFFLEVBQUU7SUFBRyxJQUFJLElBQUUsQ0FBQztJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVEsTUFBRztLQUFDLEVBQUUsS0FBRyxDQUFDO0lBQUMsQ0FBQyxHQUFFO0tBQUMsU0FBUSxDQUFDO0tBQUUsWUFBVztJQUFDO0lBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtLQUFDLEVBQUUsTUFBSSxFQUFFLE1BQUksQ0FBQyxFQUFBLENBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFDO0lBQUUsT0FBTTtLQUFDLFNBQVEsRUFBRSxPQUFNLE1BQUcsRUFBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDO0tBQUUsWUFBVztJQUFDO0dBQUM7R0FBRSx3QkFBcUIsTUFBSSxFQUFFLFNBQU8sQ0FBQyxJQUFFLEVBQUUsRUFBRSxFQUFFO0VBQUMsR0FBRSxDQUFDO0NBQUM7Q0FBRSxLQUFJLFNBQVMsR0FBRyxHQUFFO0VBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtHQUFDLFFBQU0sTUFBRztJQUFDLElBQUcsRUFBRSxhQUFhLE1BQUssT0FBTSxFQUFDLFNBQVEsQ0FBQyxFQUFDO0lBQUUsSUFBSSxJQUFFLENBQUM7SUFBRSxJQUFHLE1BQUksRUFBRSxNQUFLLE9BQU07S0FBQyxTQUFRLENBQUM7S0FBRSxZQUFXO0lBQUM7SUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLE9BQU0sRUFBQyxTQUFRLENBQUMsRUFBQztJQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7S0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLENBQUMsRUFBQSxDQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFBQyxHQUFFLElBQUUsRUFBRTtJQUFHLE9BQU07S0FBQyxTQUFRLEVBQUUsSUFBRSxNQUFHLEVBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztLQUFFLFlBQVc7SUFBQztHQUFDO0dBQUUsd0JBQXFCLE1BQUksRUFBRSxTQUFPLENBQUMsSUFBRSxFQUFFLEVBQUUsRUFBRTtFQUFDLEdBQUUsQ0FBQztDQUFDO0NBQUUsS0FBSSxTQUFTLEdBQUcsR0FBRTtFQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7R0FBQyxRQUFNLE1BQUc7SUFBQyxJQUFHLEVBQUUsYUFBYSxNQUFLLE9BQU0sRUFBQyxTQUFRLENBQUMsRUFBQztJQUFFLElBQUksSUFBRSxDQUFDO0lBQUUsSUFBRyxNQUFJLEVBQUUsTUFBSyxPQUFNO0tBQUMsU0FBUSxDQUFDO0tBQUUsWUFBVztJQUFDO0lBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtLQUFDLEVBQUUsTUFBSSxFQUFFLE1BQUksQ0FBQyxFQUFBLENBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFDO0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxPQUFNLEVBQUMsU0FBUSxDQUFDLEVBQUM7SUFBRSxJQUFJO0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxNQUFNLElBQUksTUFBTSw0RUFBNEUsU0FBTyxJQUFFLEVBQUUsTUFBSSxLQUFLLElBQUUsRUFBRSxTQUFTLEdBQUc7SUFBRSxNQUFLLENBQUMsR0FBRSxLQUFHO0lBQUUsT0FBTTtLQUFDLFNBQVEsRUFBRSxJQUFHLEdBQUUsTUFBSTtNQUFDLE1BQU0sSUFBRSxFQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxDQUFDO01BQUUsT0FBTyxLQUFHO0tBQUMsQ0FBQztLQUFFLFlBQVc7SUFBQztHQUFDO0dBQUUsd0JBQXFCLE1BQUksRUFBRSxTQUFPLENBQUMsSUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFBQyxHQUFFLENBQUM7Q0FBQztDQUFFLFFBQU8sU0FBUyxHQUFHLEdBQUU7RUFBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0dBQUMsUUFBTSxNQUFHO0lBQUMsSUFBRyxTQUFPLEtBQUcsWUFBVSxPQUFPLEtBQUcsTUFBTSxRQUFRLENBQUMsR0FBRSxPQUFNLEVBQUMsU0FBUSxDQUFDLEVBQUM7SUFBRSxJQUFJO0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxNQUFNLElBQUksTUFBTSwwRkFBMEYsU0FBTyxJQUFFLEVBQUUsTUFBSSxLQUFLLElBQUUsRUFBRSxTQUFTLEdBQUc7SUFBRSxJQUFJLElBQUUsQ0FBQztJQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7S0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLENBQUMsRUFBQSxDQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFBQyxHQUFFLENBQUMsR0FBRSxLQUFHLE1BQUksRUFBRSxTQUFPLENBQUMsR0FBRSxFQUFFLEVBQUUsSUFBRTtJQUFFLE9BQU07S0FBQyxTQUFRLEVBQUUsSUFBRyxHQUFFLE1BQUk7TUFBQyxNQUFNLElBQUUsWUFBVSxPQUFPLEtBQUcsT0FBTyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUUsT0FBSyxPQUFPLENBQUMsR0FBRSxJQUFFLFNBQU8sS0FBRyxFQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxDQUFDO01BQUUsUUFBTyxLQUFHLE1BQUk7S0FBQyxDQUFDO0tBQUUsWUFBVztJQUFDO0dBQUM7R0FBRSx3QkFBcUIsTUFBSSxFQUFFLFNBQU8sQ0FBQyxJQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDLEdBQUUsQ0FBQztDQUFDO0NBQUUsY0FBYTtDQUFFLE9BQU07Q0FBRSxLQUFJLFNBQVMsR0FBRTtFQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7R0FBQyxRQUFNLE9BQUksRUFBQyxTQUFRLENBQUMsRUFBRSxHQUFFLFNBQU0sQ0FBQyxDQUFDLEVBQUM7R0FBRyx3QkFBcUIsQ0FBQztHQUFFLGFBQVk7RUFBSyxHQUFFLENBQUM7Q0FBQztDQUFFLE1BQUs7Q0FBRSxRQUFPO0NBQUUsS0FBSTtDQUFFLFNBQVE7Q0FBRSxHQUFFO0NBQUUsUUFBTztDQUFFLFFBQU87Q0FBRSxRQUFwdEUsRUFBRSxFQUFFLENBQUMsQ0FBc3RFO0NBQUUsU0FBbnRFLEVBQUUsRUFBRSxTQUFTLEdBQUU7RUFBQyxPQUFNLGFBQVcsT0FBTztDQUFDLENBQUMsQ0FBaXJFO0NBQUUsUUFBOXFFLEVBQUUsRUFBRSxTQUFTLEdBQUU7RUFBQyxPQUFNLFlBQVUsT0FBTztDQUFDLENBQUMsQ0FBNG9FO0NBQUUsU0FBem9FLEVBQUUsRUFBRSxTQUFTLEdBQUU7RUFBQyxPQUFPLFFBQU07Q0FBQyxDQUFDLENBQWtuRTtDQUFFLGFBQS9tRSxFQUFFLEVBQUUsU0FBUyxHQUFFO0VBQUMsT0FBTyxRQUFNO0NBQUMsQ0FBQyxDQUE0bEU7Q0FBRSxZQUFXLFNBQVMsR0FBRTtFQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsR0FBRTtHQUFDLFFBQU8sTUFBRyxhQUFhO0VBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUFDO0NBQUUsT0FBTSxTQUFTLEdBQUU7RUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQUM7QUFBQztBQUFFLElBQU0sSUFBTixjQUFnQixNQUFLO0NBQUMsWUFBWSxHQUFFO0VBQUMsSUFBSTtFQUFFLElBQUc7R0FBQyxJQUFFLEtBQUssVUFBVSxDQUFDO0VBQUMsU0FBTyxHQUFFO0dBQUMsSUFBRTtFQUFDO0VBQUMsTUFBTSxvREFBb0QsR0FBRyxHQUFFLEtBQUssUUFBTSxLQUFLLEdBQUUsS0FBSyxRQUFNO0NBQUM7QUFBQztBQUFDLE1BQU0sSUFBRTtDQUFDLFNBQVEsQ0FBQztDQUFFLE9BQU0sS0FBSztBQUFDO0FBQUUsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFPLElBQUksRUFBRSxHQUFFLENBQUM7QUFBQztBQUFDLElBQU0sSUFBTixNQUFNLEVBQUM7Q0FBQyxZQUFZLEdBQUUsR0FBRTtFQUFDLEtBQUssUUFBTSxLQUFLLEdBQUUsS0FBSyxRQUFNLEtBQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU07Q0FBQztDQUFDLEtBQUssR0FBRyxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQU0sU0FBUSxPQUFPO0VBQUssTUFBTSxJQUFFLEVBQUUsRUFBRSxTQUFPLElBQUcsSUFBRSxDQUFDLEVBQUUsRUFBRTtFQUFFLElBQUk7RUFBRSxNQUFJLEVBQUUsVUFBUSxjQUFZLE9BQU8sRUFBRSxLQUFHLElBQUUsRUFBRSxLQUFHLEVBQUUsU0FBTyxLQUFHLEVBQUUsS0FBSyxHQUFHLEVBQUUsTUFBTSxHQUFFLEVBQUUsU0FBTyxDQUFDLENBQUM7RUFBRSxJQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQztFQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7R0FBQyxJQUFFLENBQUMsR0FBRSxFQUFFLEtBQUc7RUFBQyxHQUFFLElBQUUsQ0FBQyxFQUFFLE1BQUssTUFBRyxFQUFFLEdBQUUsS0FBSyxPQUFNLENBQUMsQ0FBQyxLQUFHLEtBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLENBQUMsSUFBRSxJQUFFO0dBQUMsU0FBUSxDQUFDO0dBQUUsT0FBTSxFQUFFLElBQUUsS0FBSyxJQUFFLEVBQUUsS0FBRyxJQUFFLEtBQUssT0FBTSxLQUFLLEtBQUs7RUFBQztFQUFFLE9BQU8sSUFBSSxFQUFFLEtBQUssT0FBTSxDQUFDO0NBQUM7Q0FBQyxLQUFLLEdBQUUsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFNLFNBQVEsT0FBTztFQUFLLE1BQU0sSUFBRSxRQUFRLEVBQUUsS0FBSyxLQUFLLENBQUM7RUFBRSxPQUFPLElBQUksRUFBRSxLQUFLLE9BQU0sSUFBRTtHQUFDLFNBQVEsQ0FBQztHQUFFLE9BQU0sRUFBRSxLQUFLLE9BQU0sS0FBSyxLQUFLO0VBQUMsSUFBRSxDQUFDO0NBQUM7Q0FBQyxVQUFVLEdBQUU7RUFBQyxPQUFPLEtBQUssTUFBTSxVQUFRLEtBQUssTUFBTSxRQUFNLEVBQUUsS0FBSyxLQUFLO0NBQUM7Q0FBQyxXQUFXLElBQUUsR0FBRTtFQUFDLE9BQU8sS0FBSyxNQUFNLFVBQVEsS0FBSyxNQUFNLFFBQU0sRUFBRSxLQUFL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