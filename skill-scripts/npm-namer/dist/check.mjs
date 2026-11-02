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
	return [...bestByNorm.values()].toSorted((a, b) => a.distance - b.distance || a.rank - b.rank).map(({ name, distance: d }) => ({
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
  The moniker check enumerates 1- and 2-separator variants. Names requiring
  3+ separator insertions (e.g. \`eslint-plugin-react-hooks\`) can be missed
  even with --exhaustive. Treat every available verdict as provisional.
  npm publish --dry-run does NOT exercise the registry's server-side moniker
  check. Never publish just to test availability.

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
	const ranked = candidates.toSorted((a, b) => score(a, seeds) - score(b, seeds));
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
		renderShortlist("Moniker check incomplete", unverified, (verdict) => `  • ${verdict.name}  (${verdict.unverifiedTotal} variant${verdict.unverifiedTotal === 1 ? "" : "s"} not probed)`, " — retry failed probes; availability remains provisional")
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2subWpzIiwibmFtZXMiOlsibWF0Y2giLCJQIiwiZGFtZXJhdUxldmVuc2h0ZWluIiwidmFsaWRhdGUiLCJ2YXJpYW50cyIsIm1vbmlrZXJWYXJpYW50cyIsIm1hdGNoIiwibWF0Y2giLCJQIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2VzLXRvb2xraXRAMS41Mi4wL25vZGVfbW9kdWxlcy9lcy10b29sa2l0L2Rpc3QvcHJlZGljYXRlL2lzTmlsLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS90cy1wYXR0ZXJuQDUuOS4yL25vZGVfbW9kdWxlcy90cy1wYXR0ZXJuL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWFzc2FtYW5AMC41LjUvbm9kZV9tb2R1bGVzL21hc3NhbWFuL2Rpc3QvY29udHJvbC1CbEw3VG1BNy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWFzc2FtYW5AMC41LjUvbm9kZV9tb2R1bGVzL21hc3NhbWFuL2Rpc3QvbWF0Y2gtZkJldGZhSWEubWpzIiwiLi4vc3JjL2NvbnN0YW50cy5tanMiLCIuLi9zcmMvY29ycHVzLm1qcyIsIi4uL3NyYy9wZXJtdXRlLm1qcyIsIi4uL3NyYy9tb25pa2VyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYW1lcmF1LWxldmVuc2h0ZWluQDEuMC44L25vZGVfbW9kdWxlcy9kYW1lcmF1LWxldmVuc2h0ZWluL2luZGV4LmpzIiwiLi4vc3JjL25lYXItbWF0Y2gubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVAOC4wLjAvbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWUvbGliL2J1aWx0aW4tbW9kdWxlcy5qc29uIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVAOC4wLjAvbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWUvbGliL2luZGV4LmpzIiwiLi4vc3JjL3ZhbGlkYXRlLm1qcyIsIi4uL3NyYy9waXBlbGluZS5tanMiLCIuLi9zcmMvcmVnaXN0cnkubWpzIiwiLi4vc3JjL2NoZWNrLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3JjL3ByZWRpY2F0ZS9pc05pbC50c1xuLyoqXG4qIENoZWNrcyBpZiBhIGdpdmVuIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuKlxuKiBUaGlzIGZ1bmN0aW9uIHRlc3RzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVpdGhlciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4qIEl0IHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbipcbiogVGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBzZXJ2ZSBhcyBhIHR5cGUgcHJlZGljYXRlIGluIFR5cGVTY3JpcHQsIG5hcnJvd2luZyB0aGUgdHlwZSBvZiB0aGUgYXJndW1lbnQgdG8gYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuKlxuKiBAcGFyYW0geCAtIFRoZSB2YWx1ZSB0byB0ZXN0IGZvciBudWxsIG9yIHVuZGVmaW5lZC5cbiogQHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZCwgYGZhbHNlYCBvdGhlcndpc2UuXG4qXG4qIEBleGFtcGxlXG4qIGNvbnN0IHZhbHVlMSA9IG51bGw7XG4qIGNvbnN0IHZhbHVlMiA9IHVuZGVmaW5lZDtcbiogY29uc3QgdmFsdWUzID0gNDI7XG4qIGNvbnN0IHJlc3VsdDEgPSBpc05pbCh2YWx1ZTEpOyAvLyB0cnVlXG4qIGNvbnN0IHJlc3VsdDIgPSBpc05pbCh2YWx1ZTIpOyAvLyB0cnVlXG4qIGNvbnN0IHJlc3VsdDMgPSBpc05pbCh2YWx1ZTMpOyAvLyBmYWxzZVxuKi9cbmZ1bmN0aW9uIGlzTmlsKHgpIHtcblx0cmV0dXJuIHggPT0gbnVsbDtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgaXNOaWwgfTtcbiIsImNvbnN0IHQ9U3ltYm9sLmZvcihcIkB0cy1wYXR0ZXJuL21hdGNoZXJcIiksZT1TeW1ib2wuZm9yKFwiQHRzLXBhdHRlcm4vaXNWYXJpYWRpY1wiKSxuPVwiQHRzLXBhdHRlcm4vYW5vbnltb3VzLXNlbGVjdC1rZXlcIixyPXQ9PkJvb2xlYW4odCYmXCJvYmplY3RcIj09dHlwZW9mIHQpLGk9ZT0+ZSYmISFlW3RdLG89KG4scyxjKT0+e2lmKGkobikpe2NvbnN0IGU9blt0XSgpLHttYXRjaGVkOnIsc2VsZWN0aW9uczppfT1lLm1hdGNoKHMpO3JldHVybiByJiZpJiZPYmplY3Qua2V5cyhpKS5mb3JFYWNoKHQ9PmModCxpW3RdKSkscn1pZihyKG4pKXtpZighcihzKSlyZXR1cm4hMTtpZihBcnJheS5pc0FycmF5KG4pKXtpZighQXJyYXkuaXNBcnJheShzKSlyZXR1cm4hMTtsZXQgdD1bXSxyPVtdLHU9W107Zm9yKGNvbnN0IG8gb2Ygbi5rZXlzKCkpe2NvbnN0IHM9bltvXTtpKHMpJiZzW2VdP3UucHVzaChzKTp1Lmxlbmd0aD9yLnB1c2gocyk6dC5wdXNoKHMpfWlmKHUubGVuZ3RoKXtpZih1Lmxlbmd0aD4xKXRocm93IG5ldyBFcnJvcihcIlBhdHRlcm4gZXJyb3I6IFVzaW5nIGAuLi5QLmFycmF5KC4uLilgIHNldmVyYWwgdGltZXMgaW4gYSBzaW5nbGUgcGF0dGVybiBpcyBub3QgYWxsb3dlZC5cIik7aWYocy5sZW5ndGg8dC5sZW5ndGgrci5sZW5ndGgpcmV0dXJuITE7Y29uc3QgZT1zLnNsaWNlKDAsdC5sZW5ndGgpLG49MD09PXIubGVuZ3RoP1tdOnMuc2xpY2UoLXIubGVuZ3RoKSxpPXMuc2xpY2UodC5sZW5ndGgsMD09PXIubGVuZ3RoP0luZmluaXR5Oi1yLmxlbmd0aCk7cmV0dXJuIHQuZXZlcnkoKHQsbik9Pm8odCxlW25dLGMpKSYmci5ldmVyeSgodCxlKT0+byh0LG5bZV0sYykpJiYoMD09PXUubGVuZ3RofHxvKHVbMF0saSxjKSl9cmV0dXJuIG4ubGVuZ3RoPT09cy5sZW5ndGgmJm4uZXZlcnkoKHQsZSk9Pm8odCxzW2VdLGMpKX1yZXR1cm4gUmVmbGVjdC5vd25LZXlzKG4pLmV2ZXJ5KGU9Pntjb25zdCByPW5bZV07cmV0dXJuKGUgaW4gc3x8aSh1PXIpJiZcIm9wdGlvbmFsXCI9PT11W3RdKCkubWF0Y2hlclR5cGUpJiZvKHIsc1tlXSxjKTt2YXIgdX0pfXJldHVybiBPYmplY3QuaXMocyxuKX0scz1lPT57dmFyIG4sbyx1O3JldHVybiByKGUpP2koZSk/bnVsbCE9KG49bnVsbD09KG89KHU9ZVt0XSgpKS5nZXRTZWxlY3Rpb25LZXlzKT92b2lkIDA6by5jYWxsKHUpKT9uOltdOkFycmF5LmlzQXJyYXkoZSk/YyhlLHMpOmMoT2JqZWN0LnZhbHVlcyhlKSxzKTpbXX0sYz0odCxlKT0+dC5yZWR1Y2UoKHQsbik9PnQuY29uY2F0KGUobikpLFtdKTtmdW5jdGlvbiB1KC4uLnQpe2lmKDE9PT10Lmxlbmd0aCl7Y29uc3RbZV09dDtyZXR1cm4gdD0+byhlLHQsKCk9Pnt9KX1pZigyPT09dC5sZW5ndGgpe2NvbnN0W2Usbl09dDtyZXR1cm4gbyhlLG4sKCk9Pnt9KX10aHJvdyBuZXcgRXJyb3IoYGlzTWF0Y2hpbmcgd2Fzbid0IGdpdmVuIHRoZSByaWdodCBudW1iZXIgb2YgYXJndW1lbnRzOiBleHBlY3RlZCAxIG9yIDIsIHJlY2VpdmVkICR7dC5sZW5ndGh9LmApfWZ1bmN0aW9uIGEodCl7cmV0dXJuIE9iamVjdC5hc3NpZ24odCx7b3B0aW9uYWw6KCk9PmgodCksYW5kOmU9PmQodCxlKSxvcjplPT55KHQsZSksc2VsZWN0OmU9PnZvaWQgMD09PWU/dih0KTp2KGUsdCl9KX1mdW5jdGlvbiBsKHQpe3JldHVybiBPYmplY3QuYXNzaWduKCh0PT5PYmplY3QuYXNzaWduKHQse1tTeW1ib2wuaXRlcmF0b3JdKCl7bGV0IG49MDtjb25zdCByPVt7dmFsdWU6T2JqZWN0LmFzc2lnbih0LHtbZV06ITB9KSxkb25lOiExfSx7ZG9uZTohMCx2YWx1ZTp2b2lkIDB9XTtyZXR1cm57bmV4dDooKT0+e3ZhciB0O3JldHVybiBudWxsIT0odD1yW24rK10pP3Q6ci5hdCgtMSl9fX19KSkodCkse29wdGlvbmFsOigpPT5sKGgodCkpLHNlbGVjdDplPT5sKHZvaWQgMD09PWU/dih0KTp2KGUsdCkpfSl9ZnVuY3Rpb24gaChlKXtyZXR1cm4gYSh7W3RdOigpPT4oe21hdGNoOnQ9PntsZXQgbj17fTtjb25zdCByPSh0LGUpPT57blt0XT1lfTtyZXR1cm4gdm9pZCAwPT09dD8ocyhlKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59KTp7bWF0Y2hlZDpvKGUsdCxyKSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT5zKGUpLG1hdGNoZXJUeXBlOlwib3B0aW9uYWxcIn0pfSl9Y29uc3QgZj0odCxlKT0+e2Zvcihjb25zdCBuIG9mIHQpaWYoIWUobikpcmV0dXJuITE7cmV0dXJuITB9LGc9KHQsZSk9Pntmb3IoY29uc3RbbixyXW9mIHQuZW50cmllcygpKWlmKCFlKHIsbikpcmV0dXJuITE7cmV0dXJuITB9LG09KHQsZSk9Pntjb25zdCBuPVJlZmxlY3Qub3duS2V5cyh0KTtmb3IoY29uc3QgciBvZiBuKWlmKCFlKHIsdFtyXSkpcmV0dXJuITE7cmV0dXJuITB9O2Z1bmN0aW9uIGQoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJue21hdGNoZWQ6ZS5ldmVyeShlPT5vKGUsdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+YyhlLHMpLG1hdGNoZXJUeXBlOlwiYW5kXCJ9KX0pfWZ1bmN0aW9uIHkoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJuIGMoZSxzKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDplLnNvbWUoZT0+byhlLHQscikpLHNlbGVjdGlvbnM6bn19LGdldFNlbGVjdGlvbktleXM6KCk9PmMoZSxzKSxtYXRjaGVyVHlwZTpcIm9yXCJ9KX0pfWZ1bmN0aW9uIHAoZSl7cmV0dXJue1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6Qm9vbGVhbihlKHQpKX0pfSl9fWZ1bmN0aW9uIHYoLi4uZSl7Y29uc3Qgcj1cInN0cmluZ1wiPT10eXBlb2YgZVswXT9lWzBdOnZvaWQgMCxpPTI9PT1lLmxlbmd0aD9lWzFdOlwic3RyaW5nXCI9PXR5cGVvZiBlWzBdP3ZvaWQgMDplWzBdO3JldHVybiBhKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2xldCBlPXtbbnVsbCE9cj9yOm5dOnR9O3JldHVybnttYXRjaGVkOnZvaWQgMD09PWl8fG8oaSx0LCh0LG4pPT57ZVt0XT1ufSksc2VsZWN0aW9uczplfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+W251bGwhPXI/cjpuXS5jb25jYXQodm9pZCAwPT09aT9bXTpzKGkpKX0pfSl9ZnVuY3Rpb24gYih0KXtyZXR1cm4hMH1mdW5jdGlvbiB3KHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0fWZ1bmN0aW9uIFModCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR9ZnVuY3Rpb24gaih0KXtyZXR1cm5cImJpZ2ludFwiPT10eXBlb2YgdH1jb25zdCBLPWEocChiKSksTz1hKHAoYikpLEU9Syx4PXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7c3RhcnRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LnN0YXJ0c1dpdGgobikpKSkpO3ZhciBufSxlbmRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LmVuZHNXaXRoKG4pKSkpKTt2YXIgbn0sbWluTGVuZ3RoOmU9PngoZCh0LCh0PT5wKGU9PlMoZSkmJmUubGVuZ3RoPj10KSkoZSkpKSxsZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg9PT10KSkoZSkpKSxtYXhMZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg8PXQpKShlKSkpLGluY2x1ZGVzOmU9PntyZXR1cm4geChkKHQsKG49ZSxwKHQ9PlModCkmJnQuaW5jbHVkZXMobikpKSkpO3ZhciBufSxyZWdleDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZCb29sZWFuKHQubWF0Y2gobikpKSkpKTt2YXIgbn19KSxBPXgocChTKSksTj10PT5PYmplY3QuYXNzaWduKGEodCkse2JldHdlZW46KGUsbik9Pk4oZCh0LCgodCxlKT0+cChuPT53KG4pJiZ0PD1uJiZlPj1uKSkoZSxuKSkpLGx0OmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU8dCkpKGUpKSksZ3Q6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZT50KSkoZSkpKSxsdGU6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZTw9dCkpKGUpKSksZ3RlOmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU+PXQpKShlKSkpLGludDooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNJbnRlZ2VyKHQpKSkpLGZpbml0ZTooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNGaW5pdGUodCkpKSkscG9zaXRpdmU6KCk9Pk4oZCh0LHAodD0+dyh0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5OKGQodCxwKHQ9PncodCkmJnQ8MCkpKX0pLFA9TihwKHcpKSxrPXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7YmV0d2VlbjooZSxuKT0+ayhkKHQsKCh0LGUpPT5wKG49PmoobikmJnQ8PW4mJmU+PW4pKShlLG4pKSksbHQ6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZTx0KSkoZSkpKSxndDplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPnQpKShlKSkpLGx0ZTplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPD10KSkoZSkpKSxndGU6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZT49dCkpKGUpKSkscG9zaXRpdmU6KCk9PmsoZCh0LHAodD0+aih0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5rKGQodCxwKHQ9PmoodCkmJnQ8MCkpKX0pLFQ9ayhwKGopKSxCPWEocChmdW5jdGlvbih0KXtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIHR9KSksXz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9KSksVz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXR9KSksJD1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXR9KSk7dmFyIHo9e19fcHJvdG9fXzpudWxsLG1hdGNoZXI6dCxvcHRpb25hbDpoLGFycmF5OmZ1bmN0aW9uKC4uLmUpe3JldHVybiBsKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2lmKCFBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTtpZigwPT09ZS5sZW5ndGgpcmV0dXJue21hdGNoZWQ6ITB9O2NvbnN0IG49ZVswXTtsZXQgcj17fTtpZigwPT09dC5sZW5ndGgpcmV0dXJuIHMobikuZm9yRWFjaCh0PT57clt0XT1bXX0pLHttYXRjaGVkOiEwLHNlbGVjdGlvbnM6cn07Y29uc3QgaT0odCxlKT0+e3JbdF09KHJbdF18fFtdKS5jb25jYXQoW2VdKX07cmV0dXJue21hdGNoZWQ6dC5ldmVyeSh0PT5vKG4sdCxpKSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxzZXQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgU2V0KSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07Y29uc3Qgcj0odCxlKT0+e25bdF09KG5bdF18fFtdKS5jb25jYXQoW2VdKX0saT1lWzBdO3JldHVybnttYXRjaGVkOmYodCx0PT5vKGksdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxtYXA6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgTWFwKSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2NvbnN0IHI9KHQsZSk9PntuW3RdPShuW3RdfHxbXSkuY29uY2F0KFtlXSl9O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07dmFyIGk7aWYoMT09PWUubGVuZ3RoKXRocm93IG5ldyBFcnJvcihgXFxgUC5tYXBcXGAgd2Fzbid0IGdpdmVuIGVub3VnaCBhcmd1bWVudHMuIEV4cGVjdGVkIChrZXksIHZhbHVlKSwgcmVjZWl2ZWQgJHtudWxsPT0oaT1lWzBdKT92b2lkIDA6aS50b1N0cmluZygpfWApO2NvbnN0W3MsY109ZTtyZXR1cm57bWF0Y2hlZDpnKHQsKHQsZSk9Pntjb25zdCBuPW8ocyxlLHIpLGk9byhjLHQscik7cmV0dXJuIG4mJml9KSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT4wPT09ZS5sZW5ndGg/W106Wy4uLnMoZVswXSksLi4ucyhlWzFdKV19KX0pfSxyZWNvcmQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0fHxBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTt2YXIgbjtpZigwPT09ZS5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBcXGBQLnJlY29yZFxcYCB3YXNuJ3QgZ2l2ZW4gZW5vdWdoIGFyZ3VtZW50cy4gRXhwZWN0ZWQgKHZhbHVlKSBvciAoa2V5LCB2YWx1ZSksIHJlY2VpdmVkICR7bnVsbD09KG49ZVswXSk/dm9pZCAwOm4udG9TdHJpbmcoKX1gKTtsZXQgcj17fTtjb25zdCBpPSh0LGUpPT57clt0XT0oclt0XXx8W10pLmNvbmNhdChbZV0pfSxbcyxjXT0xPT09ZS5sZW5ndGg/W0EsZVswXV06ZTtyZXR1cm57bWF0Y2hlZDptKHQsKHQsZSk9Pntjb25zdCBuPVwic3RyaW5nXCIhPXR5cGVvZiB0fHxOdW1iZXIuaXNOYU4oTnVtYmVyKHQpKT9udWxsOk51bWJlcih0KSxyPW51bGwhPT1uJiZvKHMsbixpKSx1PW8ocyx0LGkpLGE9byhjLGUsaSk7cmV0dXJuKHV8fHIpJiZhfSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOlsuLi5zKGVbMF0pLC4uLnMoZVsxXSldfSl9KX0saW50ZXJzZWN0aW9uOmQsdW5pb246eSxub3Q6ZnVuY3Rpb24oZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6IW8oZSx0LCgpPT57fSl9KSxnZXRTZWxlY3Rpb25LZXlzOigpPT5bXSxtYXRjaGVyVHlwZTpcIm5vdFwifSl9KX0sd2hlbjpwLHNlbGVjdDp2LGFueTpLLHVua25vd246TyxfOkUsc3RyaW5nOkEsbnVtYmVyOlAsYmlnaW50OlQsYm9vbGVhbjpCLHN5bWJvbDpfLG51bGxpc2g6Vyxub25OdWxsYWJsZTokLGluc3RhbmNlT2Y6ZnVuY3Rpb24odCl7cmV0dXJuIGEocChmdW5jdGlvbih0KXtyZXR1cm4gZT0+ZSBpbnN0YW5jZW9mIHR9KHQpKSl9LHNoYXBlOmZ1bmN0aW9uKHQpe3JldHVybiBhKHAodSh0KSkpfX07Y2xhc3MgSSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQpe2xldCBlO3RyeXtlPUpTT04uc3RyaW5naWZ5KHQpfWNhdGNoKG4pe2U9dH1zdXBlcihgUGF0dGVybiBtYXRjaGluZyBlcnJvcjogbm8gcGF0dGVybiBtYXRjaGVzIHZhbHVlICR7ZX1gKSx0aGlzLmlucHV0PXZvaWQgMCx0aGlzLmlucHV0PXR9fWNvbnN0IEw9e21hdGNoZWQ6ITEsdmFsdWU6dm9pZCAwfTtmdW5jdGlvbiBNKHQpe3JldHVybiBuZXcgUih0LEwpfWNsYXNzIFJ7Y29uc3RydWN0b3IodCxlKXt0aGlzLmlucHV0PXZvaWQgMCx0aGlzLnN0YXRlPXZvaWQgMCx0aGlzLmlucHV0PXQsdGhpcy5zdGF0ZT1lfXdpdGgoLi4udCl7aWYodGhpcy5zdGF0ZS5tYXRjaGVkKXJldHVybiB0aGlzO2NvbnN0IGU9dFt0Lmxlbmd0aC0xXSxyPVt0WzBdXTtsZXQgaTszPT09dC5sZW5ndGgmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRbMV0/aT10WzFdOnQubGVuZ3RoPjImJnIucHVzaCguLi50LnNsaWNlKDEsdC5sZW5ndGgtMSkpO2xldCBzPSExLGM9e307Y29uc3QgdT0odCxlKT0+e3M9ITAsY1t0XT1lfSxhPSFyLnNvbWUodD0+byh0LHRoaXMuaW5wdXQsdSkpfHxpJiYhQm9vbGVhbihpKHRoaXMuaW5wdXQpKT9MOnttYXRjaGVkOiEwLHZhbHVlOmUocz9uIGluIGM/Y1tuXTpjOnRoaXMuaW5wdXQsdGhpcy5pbnB1dCl9O3JldHVybiBuZXcgUih0aGlzLmlucHV0LGEpfXdoZW4odCxlKXtpZih0aGlzLnN0YXRlLm1hdGNoZWQpcmV0dXJuIHRoaXM7Y29uc3Qgbj1Cb29sZWFuKHQodGhpcy5pbnB1dCkpO3JldHVybiBuZXcgUih0aGlzLmlucHV0LG4/e21hdGNoZWQ6ITAsdmFsdWU6ZSh0aGlzLmlucHV0LHRoaXMuaW5wdXQpfTpMKX1vdGhlcndpc2UodCl7cmV0dXJuIHRoaXMuc3RhdGUubWF0Y2hlZD90aGlzLnN0YXRlLnZhbHVlOnQodGhpcy5pbnB1dCl9ZXhoYXVzdGl2ZSh0PUYpe3JldHVybiB0aGlzLnN0YXRlLm1hdGNoZWQ/dGhpcy5zdGF0ZS52YWx1ZTp0KHRoaXMuaW5wdXQpfXJ1bigpe3JldHVybiB0aGlzLmV4aGF1c3RpdmUoKX1yZXR1cm5UeXBlKCl7cmV0dXJuIHRoaXN9bmFycm93KCl7cmV0dXJuIHRoaXN9fWZ1bmN0aW9uIEYodCl7dGhyb3cgbmV3IEkodCl9ZXhwb3J0e0kgYXMgTm9uRXhoYXVzdGl2ZUVycm9yLHogYXMgUCx6IGFzIFBhdHRlcm4sdSBhcyBpc01hdGNoaW5nLE0gYXMgbWF0Y2h9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gXCJlcy10b29sa2l0L3ByZWRpY2F0ZVwiO1xuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tIFwidHMtcGF0dGVyblwiO1xuaW1wb3J0IHsgYXNzZXJ0LCBpbnZhcmlhbnQgfSBmcm9tIFwiZXMtdG9vbGtpdC91dGlsXCI7XG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvcmVzdWx0LnRzXG4vKipcbiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBleHBvc2VzIHRoZSByZXF1aXJlZCBzdHJ1Y3R1cmFsIGBFcnJvcmAgZmllbGRzLlxuKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gaW5zcGVjdFxuKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB2YWx1ZSBoYXMgc3RyaW5nIGBuYW1lYCBhbmQgYG1lc3NhZ2VgIGZpZWxkc1xuKiBAcHJpdmF0ZVxuKi9cbmZ1bmN0aW9uIGlzRXJyb3JMaWtlKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIWlzTmlsKHZhbHVlKSAmJiBcIm5hbWVcIiBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBcIm1lc3NhZ2VcIiBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubWVzc2FnZSA9PT0gXCJzdHJpbmdcIjtcbn1cbi8qKlxuKiBNaW5pbWFsIGVycm9yIGNvZXJjaW9uIHVzZWQgaW50ZXJuYWxseSBieSBgZXJyKClgLiBLZXB0IGxvY2FsIHRvIGF2b2lkXG4qIHB1bGxpbmcgdGhlIGZ1bGwgY29udmVyc2lvbiBtb2R1bGUgaW50byB0aGUgYG1hc3NhbWFuL2NvbnRyb2xgIGJ1bmRsZS5cbiovXG5mdW5jdGlvbiBjb2VyY2VFcnJvcih0aHJvd24pIHtcblx0aWYgKHRocm93biBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdGhyb3duO1xuXHRpZiAoaXNFcnJvckxpa2UodGhyb3duKSkgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG5ldyBFcnJvcih0aHJvd24ubWVzc2FnZSwgeyBjYXVzZTogdGhyb3duIH0pLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0aHJvd24pKTtcblx0aWYgKHR5cGVvZiB0aHJvd24gPT09IFwic3RyaW5nXCIpIHJldHVybiBuZXcgRXJyb3IodGhyb3duKTtcblx0dHJ5IHtcblx0XHRjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkodGhyb3duKSA/PyBTdHJpbmcodGhyb3duKTtcblx0XHRyZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UsIHsgY2F1c2U6IHRocm93biB9KTtcblx0fSBjYXRjaCB7XG5cdFx0cmV0dXJuIG5ldyBFcnJvcihTdHJpbmcodGhyb3duKSwgeyBjYXVzZTogdGhyb3duIH0pO1xuXHR9XG59XG4vKipcbiogQ3JlYXRlcyBhIHN1Y2Nlc3MgcmVzdWx0IHdyYXBwaW5nIHRoZSBnaXZlbiB2YWx1ZS5cbipcbiogQHBhcmFtIHZhbHVlIC0gVGhlIHN1Y2Nlc3MgdmFsdWVcbiogQHJldHVybnMgQW4gYE9rYCByZXN1bHQgY29udGFpbmluZyB0aGUgdmFsdWVcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgcmVzdWx0ID0gb2soNDIpXG4qIC8vIHsgb2s6IHRydWUsIHZhbHVlOiA0MiB9XG4qIGBgYFxuKi9cbmZ1bmN0aW9uIG9rKHZhbHVlKSB7XG5cdHJldHVybiB7XG5cdFx0b2s6IHRydWUsXG5cdFx0dmFsdWUsXG5cdFx0ZXJyb3I6IG51bGxcblx0fTtcbn1cbmZ1bmN0aW9uIGVycihlcnJvcikge1xuXHRyZXR1cm4ge1xuXHRcdG9rOiBmYWxzZSxcblx0XHR2YWx1ZTogbnVsbCxcblx0XHRlcnJvcjogY29lcmNlRXJyb3IoZXJyb3IpXG5cdH07XG59XG4vKipcbiogVHlwZSBndWFyZCB0aGF0IG5hcnJvd3MgYSBgUmVzdWx0YCB0byBgT2tgLlxuKlxuKiBAcGFyYW0gcmVzdWx0IC0gVGhlIHJlc3VsdCB0byBjaGVja1xuKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHJlc3VsdCBpcyBgT2tgXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZSgne30nKSlcbiogaWYgKGlzT2socmVzdWx0KSkge1xuKiAgIGNvbnNvbGUubG9nKHJlc3VsdC52YWx1ZSlcbiogfVxuKiBgYGBcbiovXG5mdW5jdGlvbiBpc09rKHJlc3VsdCkge1xuXHRyZXR1cm4gcmVzdWx0Lm9rID09PSB0cnVlO1xufVxuLyoqXG4qIFR5cGUgZ3VhcmQgdGhhdCBuYXJyb3dzIGEgYFJlc3VsdGAgdG8gYEVycmAuXG4qXG4qIEBwYXJhbSByZXN1bHQgLSBUaGUgcmVzdWx0IHRvIGNoZWNrXG4qIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgcmVzdWx0IGlzIGBFcnJgXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZSgnYmFkJykpXG4qIGlmIChpc0VycihyZXN1bHQpKSB7XG4qICAgY29uc29sZS5lcnJvcihyZXN1bHQuZXJyb3IpXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gaXNFcnIocmVzdWx0KSB7XG5cdHJldHVybiByZXN1bHQub2sgPT09IGZhbHNlO1xufVxuLyoqXG4qIEV4dHJhY3QgdGhlIHZhbHVlIGZyb20gYW4gYE9rYCByZXN1bHQsIG9yIHRocm93IG9uIGBFcnJgLlxuKlxuKiBXaGVuIGNhbGxlZCB3aXRob3V0IGEgbWVzc2FnZSwgdGhyb3dzIHRoZSBvcmlnaW5hbCBlcnJvci5cbiogV2hlbiBjYWxsZWQgd2l0aCBhIG1lc3NhZ2UsIHRocm93cyBhIG5ldyBFcnJvciB3aXRoIHRoYXQgbWVzc2FnZVxuKiBhbmQgdGhlIG9yaWdpbmFsIGVycm9yIGFzIGBjYXVzZWAgKGxpa2UgUnVzdCdzIGBleHBlY3RgKS5cbipcbiogQHBhcmFtIHJlc3VsdCAtIFRoZSByZXN1bHQgdG8gdW53cmFwXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY3VzdG9tIGVycm9yIG1lc3NhZ2UgKFJ1c3QgYGV4cGVjdGAgYmVoYXZpb3IpXG4qIEByZXR1cm5zIFRoZSB1bndyYXBwZWQgdmFsdWVcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgdmFsdWUgPSB1bndyYXAob2soNDIpKSAgICAgICAgICAgLy8gNDJcbiogdW53cmFwKGVycignZmFpbCcpKSAgICAgICAgICAgICAgICAgICAgLy8gdGhyb3dzIEVycm9yKCdmYWlsJylcbiogdW53cmFwKGVycignZmFpbCcpLCAnY29uZmlnIHJlcXVpcmVkJykgLy8gdGhyb3dzIEVycm9yKCdjb25maWcgcmVxdWlyZWQnLCB7IGNhdXNlOiBFcnJvcignZmFpbCcpIH0pXG4qIGBgYFxuKi9cbmZ1bmN0aW9uIHVud3JhcChyZXN1bHQsIG1lc3NhZ2UpIHtcblx0aWYgKHJlc3VsdC5vaykgcmV0dXJuIHJlc3VsdC52YWx1ZTtcblx0aWYgKCFpc05pbChtZXNzYWdlKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UsIHsgY2F1c2U6IHJlc3VsdC5lcnJvciB9KTtcblx0dGhyb3cgcmVzdWx0LmVycm9yO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvYXR0ZW1wdC50c1xuLyoqXG4qIEV4ZWN1dGVzIGEgc3luY2hyb25vdXMgZnVuY3Rpb24gYW5kIHdyYXBzIHRoZSBvdXRjb21lIGluIGEgYFJlc3VsdGAuXG4qIFJldHVybnMgYE9rYCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb24gc3VjY2VzcywgYEVycmAgd2l0aCB0aGUgdGhyb3duIHZhbHVlIG9uIGZhaWx1cmUuXG4qXG4qIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlXG4qIEByZXR1cm5zIEEgYFJlc3VsdGAgY29udGFpbmluZyBlaXRoZXIgdGhlIHZhbHVlIG9yIHRoZSBlcnJvclxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBjb25zdCByZXN1bHQgPSBhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UoJ3tcImFcIjoxfScpKVxuKiBpZiAoaXNPayhyZXN1bHQpKSB7XG4qICAgY29uc29sZS5sb2cocmVzdWx0LnZhbHVlKSAvLyB7IGE6IDEgfVxuKiB9XG4qIGBgYFxuKi9cbmZ1bmN0aW9uIGF0dGVtcHQoZm4pIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gb2soZm4oKSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIGVycihlcnJvcik7XG5cdH1cbn1cbi8qKlxuKiBFeGVjdXRlcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gYW5kIHdyYXBzIHRoZSBvdXRjb21lIGluIGEgYFJlc3VsdGAuXG4qIFJldHVybnMgYE9rYCB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZSBvbiBzdWNjZXNzLCBgRXJyYCB3aXRoIHRoZSByZWplY3Rpb24gcmVhc29uIG9uIGZhaWx1cmUuXG4qXG4qIEBwYXJhbSBmbiAtIFRoZSBhc3luYyBmdW5jdGlvbiB0byBleGVjdXRlXG4qIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYSBgUmVzdWx0YCBjb250YWluaW5nIGVpdGhlciB0aGUgdmFsdWUgb3IgdGhlIGVycm9yXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF0dGVtcHRBc3luYygoKSA9PiBmZXRjaCgnL2FwaS9kYXRhJykpXG4qIGlmIChpc0VycihyZXN1bHQpKSB7XG4qICAgY29uc29sZS5lcnJvcihyZXN1bHQuZXJyb3IpXG4qIH1cbiogYGBgXG4qL1xuYXN5bmMgZnVuY3Rpb24gYXR0ZW1wdEFzeW5jKGZuKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG9rKGF3YWl0IGZuKCkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBlcnIoZXJyb3IpO1xuXHR9XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9hbmRUaGVuLnRzXG5mdW5jdGlvbiBhbmRUaGVuKHJlc3VsdCwgbmV4dCkge1xuXHRyZXR1cm4gbWF0Y2gocmVzdWx0KS53aXRoKHsgb2s6IHRydWUgfSwgKHsgdmFsdWUgfSkgPT4gbmV4dCh2YWx1ZSkpLm90aGVyd2lzZSgoZmFpbHVyZSkgPT4gZmFpbHVyZSk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9jb2xsZWN0UmVzdWx0cy50c1xuZnVuY3Rpb24gY29sbGVjdFJlc3VsdHMocmVzdWx0cykge1xuXHRyZXR1cm4gbWF0Y2gocmVzdWx0cy5maW5kKGlzRXJyKSkud2l0aCh2b2lkIDAsICgpID0+IG9rKHJlc3VsdHMuZmlsdGVyKGlzT2spLm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSkpKS5vdGhlcndpc2UoKGZhaWx1cmUpID0+IGZhaWx1cmUpO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvb3JFbHNlLnRzXG5mdW5jdGlvbiBvckVsc2UocmVzdWx0LCByZWNvdmVyKSB7XG5cdHJldHVybiBtYXRjaChyZXN1bHQpLndpdGgoeyBvazogZmFsc2UgfSwgKHsgZXJyb3IgfSkgPT4gcmVjb3ZlcihlcnJvcikpLm90aGVyd2lzZSgoc3VjY2VzcykgPT4gc3VjY2Vzcyk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9wYXJ0aXRpb25SZXN1bHRzLnRzXG5mdW5jdGlvbiBwYXJ0aXRpb25SZXN1bHRzKHJlc3VsdHMpIHtcblx0cmV0dXJuIHtcblx0XHR2YWx1ZXM6IHJlc3VsdHMuZmlsdGVyKGlzT2spLm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSksXG5cdFx0ZXJyb3JzOiByZXN1bHRzLmZpbHRlcihpc0VycikubWFwKCh7IGVycm9yIH0pID0+IGVycm9yKVxuXHR9O1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvdG9kby50c1xuLyoqXG4qIFN0dWIgZm9yIGEgY29kZSBwYXRoIHlvdSBpbnRlbmQgdG8gd3JpdGUgYnV0IGhhdmVuJ3QuIFRocm93cyBhdCBydW50aW1lLFxuKiByZXR1cm5zIGBuZXZlcmAgc28gaXQgdHlwZWNoZWNrcyBpbiBhbnkgcG9zaXRpb24uXG4qXG4qIEZvciBwYXRocyB5b3UgaW50ZW50aW9uYWxseSBkb24ndCBzdXBwb3J0LCBzZWUgYHVuaW1wbGVtZW50ZWRgLlxuKiBGb3IgcGF0aHMgdGhhdCBzaG91bGQgYmUgaW1wb3NzaWJsZSwgc2VlIGB1bnJlYWNoYWJsZWAuXG4qXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY29udGV4dCBhcHBlbmRlZCB0byB0aGUgdGhyb3duIGVycm9yXG4qIEByZXR1cm5zIE5ldmVyIHJldHVybnMg4oCUIGFsd2F5cyB0aHJvd3NcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogZnVuY3Rpb24gcGFyc2VDb25maWcocmF3OiBzdHJpbmcpOiBDb25maWcge1xuKiAgIHJldHVybiB0b2RvKCd3YWl0aW5nIG9uIHNjaGVtYSBkZWNpc2lvbicpXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gdG9kbyhtZXNzYWdlKSB7XG5cdGlmIChpc05pbChtZXNzYWdlKSkgdGhyb3cgbmV3IEVycm9yKFwibm90IHlldCBpbXBsZW1lbnRlZFwiKTtcblx0dGhyb3cgbmV3IEVycm9yKGBub3QgeWV0IGltcGxlbWVudGVkOiAke21lc3NhZ2V9YCk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC91bmltcGxlbWVudGVkLnRzXG4vKipcbiogTWFya3MgYSBjb2RlIHBhdGggYXMgaW50ZW50aW9uYWxseSB1bnN1cHBvcnRlZC4gVGhyb3dzIGF0IHJ1bnRpbWUsIHJldHVybnNcbiogYG5ldmVyYCBzbyBpdCB0eXBlY2hlY2tzIGluIGFueSBwb3NpdGlvbi5cbipcbiogRm9yIHdvcmsgeW91IHBsYW4gdG8gZmluaXNoIGxhdGVyLCBzZWUgYHRvZG9gLlxuKiBGb3IgcGF0aHMgdGhhdCBzaG91bGQgYmUgaW1wb3NzaWJsZSwgc2VlIGB1bnJlYWNoYWJsZWAuXG4qXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY29udGV4dCBhcHBlbmRlZCB0byB0aGUgdGhyb3duIGVycm9yXG4qIEByZXR1cm5zIE5ldmVyIHJldHVybnMg4oCUIGFsd2F5cyB0aHJvd3NcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogdHlwZSBEcml2ZXIgPSAncG9zdGdyZXMnIHwgJ3NxbGl0ZScgfCAnbXlzcWwnXG4qXG4qIGZ1bmN0aW9uIG1pZ3JhdGUoZHJpdmVyOiBEcml2ZXIpOiB2b2lkIHtcbiogICByZXR1cm4gbWF0Y2goZHJpdmVyKVxuKiAgICAgLndpdGgoJ3Bvc3RncmVzJywgcnVuUGdNaWdyYXRpb24pXG4qICAgICAud2l0aCgnc3FsaXRlJywgcnVuU3FsaXRlTWlncmF0aW9uKVxuKiAgICAgLndpdGgoJ215c3FsJywgKCkgPT4gdW5pbXBsZW1lbnRlZCgnbXlzcWwgZHJpdmVyIGludGVudGlvbmFsbHkgdW5zdXBwb3J0ZWQnKSlcbiogICAgIC5leGhhdXN0aXZlKClcbiogfVxuKiBgYGBcbiovXG5mdW5jdGlvbiB1bmltcGxlbWVudGVkKG1lc3NhZ2UpIHtcblx0aWYgKGlzTmlsKG1lc3NhZ2UpKSB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cdHRocm93IG5ldyBFcnJvcihgbm90IGltcGxlbWVudGVkOiAke21lc3NhZ2V9YCk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC91bnJlYWNoYWJsZS50c1xuLyoqXG4qIE1hcmtzIGEgY29kZSBwYXRoIGFzIGxvZ2ljYWxseSBpbXBvc3NpYmxlLiBUaHJvd3MgYXQgcnVudGltZSBpZiBleGVjdXRpb25cbiogZ2V0cyB0aGVyZS4gUmV0dXJucyBgbmV2ZXJgIHNvIGl0IHR5cGVjaGVja3MgaW4gYW55IHBvc2l0aW9uLlxuKlxuKiBGb3Igd29yayB5b3UgcGxhbiB0byBmaW5pc2ggbGF0ZXIsIHNlZSBgdG9kb2AuXG4qIEZvciBwYXRocyB5b3UgaW50ZW50aW9uYWxseSBkb24ndCBzdXBwb3J0LCBzZWUgYHVuaW1wbGVtZW50ZWRgLlxuKlxuKiBAcGFyYW0gbWVzc2FnZSAtIE9wdGlvbmFsIGNvbnRleHQgYXBwZW5kZWQgdG8gdGhlIHRocm93biBlcnJvclxuKiBAcmV0dXJucyBOZXZlciByZXR1cm5zIOKAlCBhbHdheXMgdGhyb3dzXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGZ1bmN0aW9uIHBhcnNlRGlnaXQoaW5wdXQ6IHN0cmluZyk6IG51bWJlciB7XG4qICAgY29uc3QgcGFyc2VkID0gTnVtYmVyLnBhcnNlSW50KGlucHV0LCAxMClcbiogICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiogICAgIHJldHVybiB1bnJlYWNoYWJsZSgnY2FsbGVyIHByZS12YWxpZGF0ZWQnKVxuKiAgIH1cbiogICByZXR1cm4gcGFyc2VkXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gdW5yZWFjaGFibGUobWVzc2FnZSkge1xuXHRpZiAoaXNOaWwobWVzc2FnZSkpIHRocm93IG5ldyBFcnJvcihcImVudGVyZWQgdW5yZWFjaGFibGUgY29kZVwiKTtcblx0dGhyb3cgbmV3IEVycm9yKGBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6ICR7bWVzc2FnZX1gKTtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9jb250cm9sL3Vud3JhcE9yLnRzXG5mdW5jdGlvbiB1bndyYXBPcihyZXN1bHQsIGZhbGxiYWNrKSB7XG5cdHJldHVybiBtYXRjaChyZXN1bHQpLndpdGgoeyBvazogdHJ1ZSB9LCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSkub3RoZXJ3aXNlKCgpID0+IGZhbGxiYWNrKTtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgdW53cmFwIGFzIF8sIHVuaW1wbGVtZW50ZWQgYXMgYSwgb3JFbHNlIGFzIGMsIGF0dGVtcHQgYXMgZCwgYXR0ZW1wdEFzeW5jIGFzIGYsIG9rIGFzIGcsIGlzT2sgYXMgaCwgdW5yZWFjaGFibGUgYXMgaSwgY29sbGVjdFJlc3VsdHMgYXMgbCwgaXNFcnIgYXMgbSwgaW52YXJpYW50IGFzIG4sIHRvZG8gYXMgbywgZXJyIGFzIHAsIHVud3JhcE9yIGFzIHIsIHBhcnRpdGlvblJlc3VsdHMgYXMgcywgYXNzZXJ0IGFzIHQsIGFuZFRoZW4gYXMgdSB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250cm9sLUJsTDdUbUE3Lm1qcy5tYXAiLCJpbXBvcnQgeyBOb25FeGhhdXN0aXZlRXJyb3IsIFAsIFBhdHRlcm4sIGlzTWF0Y2hpbmcsIG1hdGNoLCBtYXRjaCBhcyBtYXRjaCQxIH0gZnJvbSBcInRzLXBhdHRlcm5cIjtcbi8vI3JlZ2lvbiBzcmMvbWF0Y2gvbWF0Y2gudHNcbi8qKlxuKiBFeHRlbmRzIHRzLXBhdHRlcm4ncyBgUGAgbmFtZXNwYWNlIHdpdGggYFAub2soKWAgYW5kIGBQLmVycigpYCDigJQgcGF0dGVyblxuKiBmYWN0b3JpZXMgZm9yIG1hdGNoaW5nIGEgYFJlc3VsdGAgYW5kIGl0cyBjb250YWluZWQgdmFsdWUgb3IgZXJyb3IuXG4qXG4qIE1pcnJvcnMgUnVzdCdzIGBPayh2YWx1ZSlgIC8gYEVycihlcnJvcilgIG1hdGNoIGFybXMsIGJ1dCB1c2VzIHRoZVxuKiBuYW1lc3BhY2UtbWV0aG9kIGZvcm0gKGBQLm9rKClgIC8gYFAuZXJyKClgKSBzbyBpdCBkb2Vzbid0IGNvbGxpZGUgd2l0aFxuKiB0aGUgbG93ZXJjYXNlIGBvaygpYCAvIGBlcnIoKWAgY29uc3RydWN0b3JzIGZyb20gYG1hc3NhbWFuL2NvbnRyb2xgLlxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBpbXBvcnQgeyBtYXRjaCwgUCwgYXR0ZW1wdCB9IGZyb20gJ21hc3NhbWFuJ1xuKlxuKiBtYXRjaChhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UocmF3KSkpXG4qICAgLndpdGgoUC5vaygpLCAoeyB2YWx1ZSB9KSA9PiB1c2UodmFsdWUpKVxuKiAgIC53aXRoKFAuZXJyKCksICh7IGVycm9yIH0pID0+IGxvZyhlcnJvcikpXG4qICAgLmV4aGF1c3RpdmUoKVxuKiBgYGBcbiovXG5mdW5jdGlvbiBva1BhdHRlcm4oLi4ucGF0dGVybnMpIHtcblx0cmV0dXJuIG1hdGNoKHBhdHRlcm5zKS53aXRoKFtdLCAoKSA9PiAoeyBvazogdHJ1ZSB9KSkub3RoZXJ3aXNlKChbcGF0dGVybl0pID0+ICh7XG5cdFx0b2s6IHRydWUsXG5cdFx0dmFsdWU6IHBhdHRlcm5cblx0fSkpO1xufVxuZnVuY3Rpb24gZXJyUGF0dGVybiguLi5wYXR0ZXJucykge1xuXHRyZXR1cm4gbWF0Y2gocGF0dGVybnMpLndpdGgoW10sICgpID0+ICh7IG9rOiBmYWxzZSB9KSkub3RoZXJ3aXNlKChbcGF0dGVybl0pID0+ICh7XG5cdFx0b2s6IGZhbHNlLFxuXHRcdGVycm9yOiBwYXR0ZXJuXG5cdH0pKTtcbn1cbi8qKlxuKiBFeHRlbmRlZCB0cy1wYXR0ZXJuIGBQYCBuYW1lc3BhY2UuIENhcnJpZXMgZXZlcnl0aGluZyB0cy1wYXR0ZXJuIGV4cG9ydHNcbiogKGBQLnN0cmluZ2AsIGBQLm51bWJlcmAsIGBQLmFycmF5YCwgYFAud2hlbmAsIOKApikgcGx1cyBgUC5vaygpYCAvIGBQLmVycigpYFxuKiBmb3IgbWF0Y2hpbmcgYFJlc3VsdGAgdmFsdWVzIGFuZCB0aGVpciBjb250ZW50cy5cbipcbiogRm9yIHRoZSBgUC5QYXR0ZXJuPFQ+YCB0eXBlIHNob3J0aGFuZCwgaW1wb3J0IGBQYXR0ZXJuYCBzdGFuZGFsb25lIGZyb21cbiogYG1hc3NhbWFuL21hdGNoYCDigJQgaXQncyB0aGUgZm9ybSB0cy1wYXR0ZXJuJ3Mgb3duIGRvY3MgcmVjb21tZW5kLlxuKi9cbmNvbnN0IFAkMSA9IHtcblx0Li4uUCxcblx0b2s6IG9rUGF0dGVybixcblx0ZXJyOiBlcnJQYXR0ZXJuXG59O1xuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBQJDEgYXMgYSwgbWF0Y2gkMSBhcyBpLCBQYXR0ZXJuIGFzIG4sIGlzTWF0Y2hpbmcgYXMgciwgTm9uRXhoYXVzdGl2ZUVycm9yIGFzIHQgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0Y2gtZkJldGZhSWEubWpzLm1hcCIsIi8vIFR1bmFibGUgZGVmYXVsdHMgZm9yIHRoZSBucG0tbmFtZXIgcGlwZWxpbmUuIENlbnRyYWxpemVkIHNvIGRvY3MsIHRoZSBDTEksXG4vLyBhbmQgdGVzdHMgY2FuIHJlZmVyZW5jZSBhIHNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGguXG5cbi8qKiBEZWZhdWx0IGNhcCBvbiBjYW5kaWRhdGVzIGNoZWNrZWQgcGVyIHJ1bi4gQ0xJOiAtLWxpbWl0LiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElNSVQgPSA1MFxuXG4vKiogRGVmYXVsdCBwYXJhbGxlbCBIRUFEIHJlcXVlc3RzIGFnYWluc3QgdGhlIHJlZ2lzdHJ5LiBDTEk6IC0tY29uY3VycmVuY3kuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05DVVJSRU5DWSA9IDEyXG5cbi8qKiBOZXR3b3JrIHRpbWVvdXQgcGVyIHJlZ2lzdHJ5IEhFQUQgcmVxdWVzdCAobXMpLiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVHSVNUUllfVElNRU9VVF9NUyA9IDgwMDBcblxuLyoqIG5wbSByZWdpc3RyeSBiYXNlIFVSTDsgb3ZlcnJpZGFibGUgdmlhIE5QTV9SRUdJU1RSWV9VUkwgZW52LiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVHSVNUUllfQkFTRSA9IHByb2Nlc3MuZW52Lk5QTV9SRUdJU1RSWV9VUkwgfHwgJ2h0dHBzOi8vcmVnaXN0cnkubnBtanMub3JnJ1xuXG4vKiogTW9uaWtlciAyLWluc2VydGlvbiBjYXAsIHNjYWxlZCBwZXIgYGJhcmUubGVuZ3RoYCBzbyBsb25nZXIgbmFtZXMgc3RpbGxcbiAqIHJlYWNoIG1pZC1zdHJpbmcgbW9ycGhlbWUgc3BsaXRzIChlLmcuIGBxdWljay1qc29uLXBhcnNlcmAgYXQgZ2FwPTUsXG4gKiBgcmVhY3QtbmF0aXZlLW5hdmlnYXRpb25gIGF0IGdhcD02KS4gVmFyaWFudHMgPSBwYWlycyDDlyA5IHNlcGFyYXRvciBjb21ib3MuICovXG5leHBvcnQgY29uc3QgTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0RFRkFVTFQgPSAyNTBcbmV4cG9ydCBjb25zdCBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0RFRkFVTFQgPSA0MFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0RFRkFVTFQgPSAxNTAwXG5cbi8qKiBNb25pa2VyIDItaW5zZXJ0aW9uIGNhcCAoLS1leGhhdXN0aXZlKTogd2lkZXIgY292ZXJhZ2UsIHNsb3dlci4gKi9cbmV4cG9ydCBjb25zdCBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfRVhIQVVTVElWRSA9IDYwMFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfRVhIQVVTVElWRSA9IDEyMFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0VYSEFVU1RJVkUgPSA1MDAwXG5cbi8qKiBEZWZhdWx0IGVkaXQtZGlzdGFuY2UgdGhyZXNob2xkIGZvciBuZWFyLW1hdGNoIHdhcm5pbmdzLiBDTEk6IC0tbmVhci1kaXN0YW5jZS4gKi9cbmV4cG9ydCBjb25zdCBORUFSX01BVENIX01BWF9ESVNUQU5DRSA9IDJcblxuLyoqIE1pbmltdW0gY29ycHVzLW5hbWUgbGVuZ3RoIGZvciBuZWFyLW1hdGNoIGNvbXBhcmlzb24uIEJlbG93IDMgdGhlIGZhbHNlXG4gKiBwb3NpdGl2ZSByYXRlIHNwaWtlcy4gS2VlcHMgcG9wdWxhciAzLWNoYXIgbmFtZXMgKGB6b2RgLCBgYWp2YCwgYHRzeGApIGluXG4gKiBzY29wZTsgMi1jaGFyIG5hbWVzIGxpa2UgYHFzYCBhcmUgaW50ZW50aW9uYWxseSBiZWxvdyB0aGlzIGZsb29yLiAqL1xuZXhwb3J0IGNvbnN0IE5FQVJfTUFUQ0hfTUlOX0NPUlBVU19MRU4gPSAzXG5cbi8qKiBNYXggbnVtYmVyIG9mIG5lYXItbWF0Y2ggbmVpZ2hib3JzIHN1cmZhY2VkIHBlciBhdmFpbGFibGUgY2FuZGlkYXRlLiAqL1xuZXhwb3J0IGNvbnN0IE5FQVJfTUFUQ0hfTUFYX05FSUdIQk9SUyA9IDNcblxuLyoqIFNob3J0bGlzdCBzaXplIGluIHRoZSBcImF2YWlsYWJsZSArIGNsZWFuXCIgZ3JvdXAgcHJpbnRlZCBhdCB0aGUgZW5kLiAqL1xuZXhwb3J0IGNvbnN0IFNIT1JUTElTVF9MSU1JVCA9IDEwXG5cbi8qKiBNYXggc2FtcGxlIHNpemUgaW4gdGhlIGB1bnZlcmlmaWVkYCBmaWVsZCBvbiBhIHZlcmRpY3QuIEZ1bGwgY291bnQgaXNcbiAqIHByZXNlcnZlZCBpbiBgdW52ZXJpZmllZFRvdGFsYC4gV2l0aG91dCB0cnVuY2F0aW9uLCBhIGhhbW1lcmVkIHJlZ2lzdHJ5XG4gKiByZXR1cm5pbmcgNDI5IGFjcm9zcyBodW5kcmVkcyBvZiB2YXJpYW50cyB3b3VsZCBkdW1wIGtpbG9ieXRlcyBvZlxuICogdXNlbGVzcyB2YXJpYW50IG5hbWVzIHBlciBjYW5kaWRhdGUgaW50byAtLWpzb24gb3V0cHV0LiAqL1xuZXhwb3J0IGNvbnN0IFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUgPSAxMFxuIiwiLy8gUG9wdWxhci1uYW1lcyBjb3JwdXMgbG9hZGVyLiBSZWFkcyBgcG9wdWxhci1uYW1lcy5qc29uYCAoY29tbWl0dGVkXG4vLyBidWlsZCBhcnRpZmFjdCkgYW5kIHJldHVybnMgaXQgYXMgYSBSZXN1bHQuIE1lbW9pemVkIGFmdGVyIGZpcnN0XG4vLyBzdWNjZXNzZnVsIHJlYWQgYmVjYXVzZSB0aGUgZmlsZSBpcyB+MjYwIEtCIGFuZCB0aGUgQ0xJIG1heSBjYWxsXG4vLyB0aGlzIG1hbnkgdGltZXMgaW4gYSBzaW5nbGUgcnVuLlxuLy9cbi8vIFNvdXJjZTogdG9wIH4xNSBLIHVuc2NvcGVkIG5wbSBwYWNrYWdlcyBieSBtb250aGx5IGRvd25sb2Fkcywgc25hcHNob3Rcbi8vIGZyb20gYG5pY2UtcmVnaXN0cnkvZG93bmxvYWQtY291bnRzYC4gU2VlIHJlZnJlc2gtcG9wdWxhci1uYW1lcy5tanMuXG5cbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgeyBhdHRlbXB0LCBlcnIsIG9rIH0gZnJvbSAnbWFzc2FtYW4nXG5cbmNvbnN0IEhFUkUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb3JwdXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzb3VyY2UgLSBwcm92ZW5hbmNlIHN0cmluZywgZS5nLiBcIm5pY2UtcmVnaXN0cnkvZG93bmxvYWQtY291bnRzXCJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc291cmNlVmVyc2lvbl1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBnZW5lcmF0ZWQgLSBJU08gZGF0ZSB0aGUgc25hcHNob3Qgd2FzIGJ1aWx0XG4gKiBAcHJvcGVydHkge251bWJlcn0gc2l6ZSAtIGNvcnB1cyBuYW1lIGNvdW50XG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBuYW1lcyAtIHVuc2NvcGVkIHBhY2thZ2UgbmFtZXMsIGRlc2NlbmRpbmcgYnkgZG93bmxvYWRzXG4gKi9cblxuLy8gSW52YXJpYW50OiBjYWNoZSBob2xkcyB0aGUgRklSU1Qgc3VjY2Vzc2Z1bCBsb2FkLiBJZiBgbG9hZENvcnB1c2AgaXNcbi8vIGNhbGxlZCBhZ2Fpbiwgd2UgcmV0dXJuIHRoZSBzYW1lIFJlc3VsdC4gTW9kdWxlLWxldmVsIG11dGF0aW9uIGhlcmUgaXNcbi8vIHB1cmUgbWVtb2l6YXRpb24g4oCUIHRoZSBjb3JwdXMgbmV2ZXIgY2hhbmdlcyB3aXRoaW4gYSBwcm9jZXNzLlxubGV0IGNhY2hlID0gbnVsbFxuXG4vKipcbiAqIFRyeSB0aGUgc2FtZS1kaXIgYW5kIHBhcmVudC1kaXIgbG9jYXRpb25zIGZvciBgcG9wdWxhci1uYW1lcy5qc29uYC4gQm90aFxuICogdGhlIGJ1aWx0IGJ1bmRsZSAoYGRpc3QvY2hlY2subWpzYCkgYW5kIHRoZSB1bmJ1bmRsZWQgc291cmNlIGxpdmUgb25lXG4gKiBsZXZlbCBiZWxvdyB0aGUgY2Fub25pY2FsIEpTT04gZmlsZSdzIGxvY2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAqL1xuZnVuY3Rpb24gY2FuZGlkYXRlUGF0aHMoKSB7XG4gIHJldHVybiBbam9pbihIRVJFLCAnLi4nLCAncG9wdWxhci1uYW1lcy5qc29uJyksIGpvaW4oSEVSRSwgJ3BvcHVsYXItbmFtZXMuanNvbicpXVxufVxuXG4vKipcbiAqIExvYWQgdGhlIHBvcHVsYXItbmFtZXMgY29ycHVzLiBSZXR1cm5zIE9rKGNvcnB1cykgb24gc3VjY2VzcywgRXJyIG9uIGFcbiAqIHJlYWQgb3IgcGFyc2UgZmFpbHVyZS4gUmVzdWx0IGlzIGNhY2hlZCBhZnRlciB0aGUgZmlyc3QgT2s7IEVyciByZXN1bHRzXG4gKiBhcmUgbm90IGNhY2hlZCBzbyB0cmFuc2llbnQgZmFpbHVyZXMgY2FuIGJlIHJldHJpZWQuXG4gKlxuICogQHJldHVybnMge2ltcG9ydCgnbWFzc2FtYW4nKS5SZXN1bHQ8Q29ycHVzLCBFcnJvcj59XG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVzdWx0ID0gbG9hZENvcnB1cygpXG4gKiBpZiAoaXNPayhyZXN1bHQpKSBmb3IgKGNvbnN0IG5hbWUgb2YgcmVzdWx0LnZhbHVlLm5hbWVzKSB7IOKApiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29ycHVzKCkge1xuICBpZiAoY2FjaGUgJiYgY2FjaGUub2spIHJldHVybiBjYWNoZVxuXG4gIGZvciAoY29uc3QgcGF0aCBvZiBjYW5kaWRhdGVQYXRocygpKSB7XG4gICAgY29uc3QgcmVhZCA9IGF0dGVtcHQoKCkgPT4gcmVhZEZpbGVTeW5jKHBhdGgsICd1dGY4JykpXG4gICAgaWYgKCFyZWFkLm9rKSBjb250aW51ZVxuICAgIGNvbnN0IHBhcnNlZCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZShyZWFkLnZhbHVlKSlcbiAgICBpZiAoIXBhcnNlZC5vaykge1xuICAgICAgY2FjaGUgPSBlcnIobmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBpcyBtYWxmb3JtZWQ6ICR7cGFyc2VkLmVycm9yLm1lc3NhZ2V9YCkpXG4gICAgICByZXR1cm4gY2FjaGVcbiAgICB9XG4gICAgY29uc3Qgc2hhcGVFcnJvciA9IHZhbGlkYXRlU2hhcGUocGFyc2VkLnZhbHVlLCBwYXRoKVxuICAgIGlmIChzaGFwZUVycm9yKSB7XG4gICAgICBjYWNoZSA9IGVycihzaGFwZUVycm9yKVxuICAgICAgcmV0dXJuIGNhY2hlXG4gICAgfVxuICAgIGNhY2hlID0gb2socGFyc2VkLnZhbHVlKVxuICAgIHJldHVybiBjYWNoZVxuICB9XG5cbiAgY2FjaGUgPSBlcnIobmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gbm90IGZvdW5kIGluIGFueSBvZjogJHtjYW5kaWRhdGVQYXRocygpLmpvaW4oJywgJyl9YCkpXG4gIHJldHVybiBjYWNoZVxufVxuXG4vKipcbiAqIENvbmZpcm0gdGhlIHBhcnNlZCBKU09OIGhhcyB0aGUgc2hhcGUgYENvcnB1c2AgZXhwZWN0cy4gUmV0dXJucyBhblxuICogRXJyb3IgZGVzY3JpYmluZyB0aGUgZmlyc3QgbWlzc2luZyBmaWVsZCwgb3IgbnVsbCBpZiB0aGUgc2hhcGUgaXMgdmFsaWQuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtFcnJvciB8IG51bGx9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVNoYXBlKHZhbHVlLCBwYXRoKSB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYHBvcHVsYXItbmFtZXMuanNvbiBhdCAke3BhdGh9IGlzIG5vdCBhbiBvYmplY3RgKVxuICB9XG4gIGNvbnN0IHJlcXVpcmVkID0geyBzb3VyY2U6ICdzdHJpbmcnLCBnZW5lcmF0ZWQ6ICdzdHJpbmcnLCBuYW1lczogJ2FycmF5JyB9XG4gIGZvciAoY29uc3QgW2ZpZWxkLCBleHBlY3RlZFR5cGVdIG9mIE9iamVjdC5lbnRyaWVzKHJlcXVpcmVkKSkge1xuICAgIGNvbnN0IGFjdHVhbCA9IHZhbHVlW2ZpZWxkXVxuICAgIGNvbnN0IG1hdGNoZXMgPVxuICAgICAgZXhwZWN0ZWRUeXBlID09PSAnYXJyYXknID8gQXJyYXkuaXNBcnJheShhY3R1YWwpIDogdHlwZW9mIGFjdHVhbCA9PT0gZXhwZWN0ZWRUeXBlXG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICBgcG9wdWxhci1uYW1lcy5qc29uIGF0ICR7cGF0aH0gbWlzc2luZyBvciB3cm9uZy10eXBlZCBmaWVsZCBcIiR7ZmllbGR9XCIgKGV4cGVjdGVkICR7ZXhwZWN0ZWRUeXBlfSlgXG4gICAgICApXG4gICAgfVxuICB9XG4gIGlmICh2YWx1ZS5uYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBoYXMgYW4gZW1wdHkgbmFtZXMgYXJyYXlgKVxuICB9XG4gIGNvbnN0IGJhZEVudHJ5ID0gdmFsdWUubmFtZXMuZmluZEluZGV4KChuYW1lKSA9PiB0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIW5hbWUpXG4gIGlmIChiYWRFbnRyeSA+PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgIGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBoYXMgYSBub24tc3RyaW5nIG9yIGVtcHR5IGVudHJ5IGF0IGluZGV4ICR7YmFkRW50cnl9YFxuICAgIClcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlLnNpemUgPT09ICdudW1iZXInICYmIHZhbHVlLnNpemUgIT09IHZhbHVlLm5hbWVzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICBgcG9wdWxhci1uYW1lcy5qc29uIGF0ICR7cGF0aH06IHNpemUgZmllbGQgKCR7dmFsdWUuc2l6ZX0pIGRvZXNuJ3QgbWF0Y2ggbmFtZXMubGVuZ3RoICgke3ZhbHVlLm5hbWVzLmxlbmd0aH0pYFxuICAgIClcbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIFRlc3Qtb25seSBlc2NhcGUgaGF0Y2gg4oCUIGNsZWFycyB0aGUgbWVtb2l6YXRpb24gY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuLy8gUHJlc2VydmUgdGhlIGV4aXN0aW5nIHRlc3QtaGVscGVyIGV4cG9ydCBmb3Igc291cmNlIGNvbnN1bWVycy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuZXhwb3J0IGZ1bmN0aW9uIF9yZXNldENvcnB1c0NhY2hlKCkge1xuICBjYWNoZSA9IG51bGxcbn1cbiIsIi8vIERldGVybWluaXN0aWMgcGVybXV0YXRpb24gZW5naW5lLiBHaXZlbiBzZWVkIHdvcmRzIChhbmQgb3B0aW9uYWwgcHJlZml4IC9cbi8vIHN1ZmZpeCBsaXN0cyksIHByb2R1Y2UgY2FuZGlkYXRlIHBhY2thZ2UgbmFtZXMgYnkgam9pbmluZywgcHJlZml4aW5nLFxuLy8gc3VmZml4aW5nLCBhbmQgcmUtc2VwYXJhdGluZy4gVGhlIGFnZW50IGZlZWRzIGluIGl0cyBicmFpbnN0b3JtZWQgc2VlZHM7XG4vLyB0aGlzIGV4cGFuZHMgdGhlbSBpbnRvIHRoZSBzZWFyY2ggc3BhY2Ugd2l0aG91dCBoYWxsdWNpbmF0aW5nIG5ldyB0b2tlbnMuXG5cbmNvbnN0IERFRkFVTFRfUFJFRklYRVMgPSBbXG4gICd0aW55JyxcbiAgJ21pbmknLFxuICAncGljbycsXG4gICduYW5vJyxcbiAgJ2xpdGUnLFxuICAnbWljcm8nLFxuICAnZmFzdCcsXG4gICdsZWFuJyxcbiAgJ3F1aWNrJyxcbiAgJ3NsaW0nLFxuICAncHVyZScsXG4gICdzdXBlcicsXG4gICd1bHRyYScsXG4gICdtZXRhJyxcbiAgJ2F1dG8nLFxuICAnc21hcnQnLFxuXVxuXG5jb25zdCBERUZBVUxUX1NVRkZJWEVTID0gW1xuICAnanMnLFxuICAndHMnLFxuICAnbGliJyxcbiAgJ2tpdCcsXG4gICdjb3JlJyxcbiAgJ3BybycsXG4gICdjbGknLFxuICAndG9vbHMnLFxuICAndXRpbHMnLFxuICAnZm9yZ2UnLFxuICAnc21pdGgnLFxuICAnY3JhZnQnLFxuICAnbGFiJyxcbiAgJ2JveCcsXG4gICdlbmdpbmUnLFxuICAnc3R1ZGlvJyxcbl1cblxuY29uc3QgQ09OTkVDVE9SUyA9IFsnJywgJy0nXVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBlcm11dGVPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBbcHJlZml4ZXNdIC0gb3ZlcnJpZGUgZGVmYXVsdCBwcmVmaXggbGlzdFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gW3N1ZmZpeGVzXSAtIG92ZXJyaWRlIGRlZmF1bHQgc3VmZml4IGxpc3RcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IFtjb25uZWN0b3JzXSAtIHNlcGFyYXRvcnMgYmV0d2VlbiBwYXJ0cyAoZGVmYXVsdDogJycsICctJylcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Nob3VsZEluY2x1ZGVVbmRlcnNjb3JlXSAtIGFsc28gdXNlICdfJyBhcyBhIGNvbm5lY3RvciAoZGVmYXVsdDogZmFsc2UpXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtzaG91bGRDb21iaW5lVHdvU2VlZHNdIC0gam9pbiBwYWlycyBvZiBzZWVkcyAoZGVmYXVsdDogdHJ1ZSlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc2NvcGVdIC0gaWYgc2V0LCBhbHNvIGVtaXQgYEBzY29wZS88bmFtZT5gIHZhcmlhbnRzXG4gKi9cblxuLyoqXG4gKiBHZW5lcmF0ZSBwYWNrYWdlIG5hbWUgY2FuZGlkYXRlcyBmcm9tIHNlZWQgd29yZHMuXG4gKlxuICogRm9yIHNlZWRzPVsndGlueScsJ2xvZyddLCBwcm9kdWNlcyB0aGluZ3MgbGlrZTpcbiAqICAgbG9nLCB0aW55LCB0aW55bG9nLCB0aW55LWxvZywgbWluaS1sb2csIG5hbm8tbG9nLCBsb2ctY2xpLCBsb2dqcywgLi4uXG4gKlxuICogT3V0cHV0IGlzIGRlZHVwbGljYXRlZDsgb3JkZXIgaXMgcm91Z2hseTogYmFyZSBzZWVkcywgdHdvLXNlZWQgY29tYm9zLFxuICogcHJlZml4K3NlZWQsIHNlZWQrc3VmZml4LiBDYWxsZXIgYXBwbGllcyBhbnkgbGltaXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc2VlZHNcbiAqIEBwYXJhbSB7UGVybXV0ZU9wdGlvbnN9IFtvcHRzXVxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICogQGV4YW1wbGVcbiAqIHBlcm11dGUoWydsb2cnXSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbJ2xvZycsICd0aW55LWxvZycsICd0aW55bG9nJywg4oCmXVxuICogcGVybXV0ZShbJ2xvZyddLCB7IHNjb3BlOiAnQG1lJyB9KSAgICAgICAgICAgIC8vIFsnQG1lL2xvZycsICdAbWUvdGlueS1sb2cnLCDigKZdXG4gKiBwZXJtdXRlKFsnbG9nJ10sIHsgcHJlZml4ZXM6IFsndWx0cmEnXSB9KSAgICAgLy8gWydsb2cnLCAndWx0cmEtbG9nJywgJ3VsdHJhbG9nJywg4oCmXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGVybXV0ZShzZWVkcywgb3B0cyA9IHt9KSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShzZWVkcykgfHwgc2VlZHMubGVuZ3RoID09PSAwKSByZXR1cm4gW11cblxuICBjb25zdCBwcmVmaXhlcyA9IG9wdHMucHJlZml4ZXMgPz8gREVGQVVMVF9QUkVGSVhFU1xuICBjb25zdCBzdWZmaXhlcyA9IG9wdHMuc3VmZml4ZXMgPz8gREVGQVVMVF9TVUZGSVhFU1xuICBjb25zdCBjb25uZWN0b3JzID1cbiAgICBvcHRzLmNvbm5lY3RvcnMgPz8gKG9wdHMuc2hvdWxkSW5jbHVkZVVuZGVyc2NvcmUgPyBbLi4uQ09OTkVDVE9SUywgJ18nXSA6IENPTk5FQ1RPUlMpXG4gIGNvbnN0IHNob3VsZENvbWJpbmVUd29TZWVkcyA9IG9wdHMuc2hvdWxkQ29tYmluZVR3b1NlZWRzICE9PSBmYWxzZVxuICBjb25zdCBzY29wZSA9IG9wdHMuc2NvcGVcblxuICBjb25zdCBjbGVhbmVkID0gc2VlZHNcbiAgICAubWFwKChzKSA9PiBTdHJpbmcocykudHJpbSgpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmZpbHRlcigocykgPT4gcy5sZW5ndGggPiAwICYmIC9eW2EtejAtOV0rJC8udGVzdChzKSlcblxuICBjb25zdCBvdXQgPSBuZXcgU2V0KClcblxuICBmb3IgKGNvbnN0IHMgb2YgY2xlYW5lZCkgb3V0LmFkZChzKVxuXG4gIGlmIChzaG91bGRDb21iaW5lVHdvU2VlZHMpIHtcbiAgICBmb3IgKGNvbnN0IGEgb2YgY2xlYW5lZCkge1xuICAgICAgZm9yIChjb25zdCBiIG9mIGNsZWFuZWQpIHtcbiAgICAgICAgaWYgKGEgPT09IGIpIGNvbnRpbnVlXG4gICAgICAgIGZvciAoY29uc3Qgc2VwIG9mIGNvbm5lY3RvcnMpIG91dC5hZGQoYSArIHNlcCArIGIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBwIG9mIHByZWZpeGVzKSB7XG4gICAgZm9yIChjb25zdCBzIG9mIGNsZWFuZWQpIHtcbiAgICAgIGlmIChwID09PSBzKSBjb250aW51ZVxuICAgICAgZm9yIChjb25zdCBzZXAgb2YgY29ubmVjdG9ycykgb3V0LmFkZChwICsgc2VwICsgcylcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHMgb2YgY2xlYW5lZCkge1xuICAgIGZvciAoY29uc3Qgc2Ygb2Ygc3VmZml4ZXMpIHtcbiAgICAgIGlmIChzZiA9PT0gcykgY29udGludWVcbiAgICAgIGZvciAoY29uc3Qgc2VwIG9mIGNvbm5lY3RvcnMpIG91dC5hZGQocyArIHNlcCArIHNmKVxuICAgIH1cbiAgfVxuXG4gIGxldCBuYW1lcyA9IFsuLi5vdXRdXG4gIGlmIChzY29wZSkgbmFtZXMgPSBuYW1lcy5tYXAoKG4pID0+IGAke3Njb3BlfS8ke259YClcbiAgcmV0dXJuIG5hbWVzXG59XG5cbi8qKlxuICogU2NvcmUgYSBjYW5kaWRhdGUgbmFtZSBmb3IgcmFua2luZy4gTG93ZXIgaXMgYmV0dGVyLlxuICogICAtIHNob3J0ZXIgbmFtZXMgcmFuayBsb3dlciAocHJlZmVycmVkKVxuICogICAtIGh5cGhlbmF0ZWQgbmFtZXMgcmFuayBsb3dlciB0aGFuIGNvbmNhdGVuYXRlZCAobW9yZSByZWFkYWJsZSlcbiAqICAgLSBuYW1lcyBjb250YWluaW5nIGEgc2VlZCByYW5rIGxvd2VyIChhbmNob3IgcmVsZXZhbmNlKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzZWVkc1xuICogQHJldHVybnMge251bWJlcn1cbiAqIEBleGFtcGxlXG4gKiBzY29yZSgnbG9nJykgICAgICAgICAgICAgICAgICAgICAgIC8vIDNcbiAqIHNjb3JlKCd0aW55LWxvZycsIFsnbG9nJ10pICAgICAgICAgLy8gOCAtIDIgKGh5cGhlbikgLSAzIChjb250YWlucyBzZWVkKSA9IDNcbiAqIHNjb3JlKCdsb2dnZXJfcHJvJywgWydsb2cnXSkgICAgICAgLy8gMTAgKyAxICh1bmRlcnNjb3JlKSAtIDMgKGNvbnRhaW5zIHNlZWQpID0gOFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NvcmUobmFtZSwgc2VlZHMgPSBbXSkge1xuICBjb25zdCBsb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICBsZXQgcmVzdWx0ID0gbG93ZXIubGVuZ3RoXG4gIGlmIChsb3dlci5pbmNsdWRlcygnLScpKSByZXN1bHQgLT0gMlxuICBpZiAobG93ZXIuaW5jbHVkZXMoJ18nKSkgcmVzdWx0ICs9IDFcbiAgZm9yIChjb25zdCBzZWVkIG9mIHNlZWRzKSB7XG4gICAgaWYgKGxvd2VyLmluY2x1ZGVzKHNlZWQudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIHJlc3VsdCAtPSAzXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCB7IERFRkFVTFRfUFJFRklYRVMsIERFRkFVTFRfU1VGRklYRVMgfVxuIiwiLy8gbnBtIG1vbmlrZXIgY29sbGlzaW9uIHJ1bGUuIFdoZW4geW91IHB1Ymxpc2ggYSBuZXcgdW5zY29wZWQgcGFja2FnZSwgdGhlXG4vLyByZWdpc3RyeSByZWplY3RzIG5hbWVzIHdob3NlIGBsb3dlcmNhc2UgKyBzdHJpcCBbLl8tXWAgZm9ybSBjb2xsaWRlcyB3aXRoXG4vLyBhbiBleGlzdGluZyBwYWNrYWdlLiBTb3VyY2U6IGh0dHBzOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xNjg5NzgzNzc1NzAvbmV3LXBhY2thZ2UtbW9uaWtlci1ydWxlc1xuLy9cbi8vIElNUE9SVEFOVCDigJQgdmFyaWFudCBlbnVtZXJhdGlvbiBpcyAqcHJvYmFiaWxpc3RpYyosIG5vdCBleGhhdXN0aXZlLiBXZVxuLy8gZW51bWVyYXRlIG9uZS0gYW5kIHR3by1wb3NpdGlvbiBzZXBhcmF0b3IgaW5zZXJ0aW9ucyBwbHVzIGZ1bGwtc3BsaXRcbi8vIGZvcm1zLiBQYXRob2xvZ2ljYWwgbXVsdGktaW5zZXJ0aW9uIHZhcmlhbnRzIChgYS5iLWNfZGVmYC1zdHlsZSkgYW5kXG4vLyBtaXhlZC1zZXBhcmF0b3IgMysgaW5zZXJ0aW9ucyBjYW4gbm9ybWFsaXplIHRvIHRoZSBzYW1lIGZvcm0gYnV0IHdvbid0XG4vLyBiZSBxdWVyaWVkLiBEcnktcnVuIHB1Ymxpc2hpbmcgZG9lcyBub3QgaW52b2tlIHRoZSBzZXJ2ZXItc2lkZSBtb25pa2VyIGNoZWNrLlxuXG5pbXBvcnQgeyBhdHRlbXB0QXN5bmMgfSBmcm9tICdtYXNzYW1hbidcblxuaW1wb3J0IHtcbiAgTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0RFRkFVTFQsXG4gIE1PTklLRVJfMklOU0VSVF9DQVBfQkFTRV9FWEhBVVNUSVZFLFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9ERUZBVUxULFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9FWEhBVVNUSVZFLFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0RFRkFVTFQsXG4gIE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfRVhIQVVTVElWRSxcbn0gZnJvbSAnLi9jb25zdGFudHMubWpzJ1xuXG5jb25zdCBTRVBBUkFUT1JTID0gWyctJywgJ18nLCAnLiddXG5cbi8qKlxuICogTm9ybWFsaXplIGEgbmFtZSB0aGUgd2F5IG5wbSdzIG1vbmlrZXIgY29sbGlzaW9uIGNoZWNrIGRvZXM6IGxvd2VyY2FzZVxuICogYW5kIHN0cmlwIHRoZSBwdW5jdHVhdGlvbiBjaGFycyBgLmAsIGAtYCwgYF9gLiBTY29wZWQgbmFtZXMga2VlcCB0aGVpclxuICogc2NvcGUgc2VnbWVudC5cbiAqXG4gKiAqKkFTQ0lJIHByZWNvbmRpdGlvbi4qKiBUaGlzIG1pcnJvcnMgbnBtJ3Mgc2VydmVyLXNpZGUgcnVsZSBleGFjdGx5LCB3aGljaFxuICogcHJlZGF0ZXMgVW5pY29kZS1hd2FyZSBub3JtYWxpemF0aW9uLiBOYW1lcyB3aXRoIFVuaWNvZGUgKGUuZy4gYMSwYCDihpIgYGnMh2BcbiAqIGluIHNvbWUgbG9jYWxlcywgYMOfYCDihpIgYHNzYCkgYXJlICpub3QqIGNhbm9uaWNhbGl6ZWQgaGVyZTsgdGhleSdyZSBhbHJlYWR5XG4gKiByZWplY3RlZCB1cHN0cmVhbSBieSBgdmFsaWRhdGUtbnBtLXBhY2thZ2UtbmFtZWAncyBVUkwtc2FmZXR5IGNoZWNrLiBJZlxuICogbm9uLUFTQ0lJIHNsaXBzIHRocm91Z2gsIGVxdWl2YWxlbmNlIG1heSBub3QgbWF0Y2ggdGhlIHJlZ2lzdHJ5J3MgYmVoYXZpb3IuXG4gKlxuICogUmV0dXJucyBgJydgIGZvciBub24tc3RyaW5nIC8gZW1wdHkgaW5wdXQgc28gY2FsbGVycyBjYW4gYnJhbmNoIHdpdGhvdXRcbiAqIGEgc2VwYXJhdGUgZ3VhcmQuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQGV4YW1wbGVcbiAqIG5vcm1hbGl6ZSgnUGljby1Mb2cnKSAgICAgICAgIC8vICdwaWNvbG9nJ1xuICogbm9ybWFsaXplKCdqcy1vbi1zdHJlYW0nKSAgICAgLy8gJ2pzb25zdHJlYW0nICAoY29sbGlkZXMgd2l0aCBganNvbnN0cmVhbWApXG4gKiBub3JtYWxpemUoJ0BaYWMvUGljby1Mb2cnKSAgICAvLyAnQHphYy9waWNvbG9nJ1xuICogbm9ybWFsaXplKG51bGwpICAgICAgICAgICAgICAgLy8gJydcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIW5hbWUpIHJldHVybiAnJ1xuICBpZiAobmFtZS5zdGFydHNXaXRoKCdAJykpIHtcbiAgICBjb25zdCBzbGFzaCA9IG5hbWUuaW5kZXhPZignLycpXG4gICAgaWYgKHNsYXNoIDwgMCkgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IHNjb3BlID0gbmFtZS5zbGljZSgwLCBzbGFzaCArIDEpLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBiYXJlID0gbmFtZVxuICAgICAgLnNsaWNlKHNsYXNoICsgMSlcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAucmVwbGFjZSgvWy5fLV0vZywgJycpXG4gICAgcmV0dXJuIHNjb3BlICsgYmFyZVxuICB9XG4gIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy5fLV0vZywgJycpXG59XG5cbi8qKlxuICogUmVqZWN0IGlucHV0cyBjb250YWluaW5nIHdoaXRlc3BhY2Ugb3IgQVNDSUkgY29udHJvbCBieXRlcy4gVGhlIGNoZWNrIGlzXG4gKiB3cml0dGVuIGFzIGEgY29kZS1wb2ludCBsb29wIHJhdGhlciB0aGFuIGEgcmVnZXggd2l0aCBjb250cm9sIGNoYXJzIHNvXG4gKiB0aGUgc291cmNlIGZpbGUgc3RheXMgZnJlZSBvZiBsaXRlcmFsIGNvbnRyb2wgYnl0ZXMgKHdoaWNoIHdvdWxkIGFsc29cbiAqIHRyaXAgb3hsaW50J3Mgbm8tY29udHJvbC1yZWdleCBydWxlKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYXNJbnZhbGlkQ2hhcnMobmFtZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjb2RlID0gbmFtZS5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGNvZGUgPD0gMHgyMCB8fCBjb2RlID09PSAweDdmKSByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIG5hbWVzIHRoYXQgc2hhcmUgdGhlIGNhbmRpZGF0ZSdzIG5vcm1hbGl6ZWQgZm9ybS4gVGhlIGNhbGxlclxuICogcXVlcmllcyBlYWNoIHZhcmlhbnQgYWdhaW5zdCB0aGUgcmVnaXN0cnkgdG8gZGV0ZWN0IGNvbGxpc2lvbnMuIFRoZVxuICogMi1pbnNlcnRpb24gY2FwIHNjYWxlcyB3aXRoIG5hbWUgbGVuZ3RoIHNvIGxvbmdlciBtdWx0aS1tb3JwaGVtZSBuYW1lc1xuICogKGByZWFjdG5hdGl2ZW5hdmlnYXRpb25gIOKGkiBgcmVhY3QtbmF0aXZlLW5hdmlnYXRpb25gKSByZWFjaCB0aGVpclxuICogcmVhbGlzdGljIG1vcnBoZW1lIHNwbGl0cyBiZWZvcmUgdGhlIGNhcCBleGhhdXN0cy5cbiAqXG4gKiBCb3VuZGFyeSBndWFyZHMgcmVqZWN0IGlucHV0cyBgdmFsaWRhdGVOYW1lYCB3b3VsZCBhbHNvIHJlamVjdCDigJQga2VlcGluZ1xuICogdGhpcyBmdW5jdGlvbiBob25lc3Qgd2hlbiBjYWxsZWQgaW4gaXNvbGF0aW9uIHJhdGhlciB0aGFuIHJlbHlpbmcgb25cbiAqIHVwc3RyZWFtIGZpbHRlcmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHt7IGlzRXhoYXVzdGl2ZT86IGJvb2xlYW4gfX0gW29wdHNdIC0gd2lkZW5zIDItaW5zZXJ0aW9uIGNvdmVyYWdlXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKiBAZXhhbXBsZVxuICogdmFyaWFudHMoJ3BpY29sb2cnKSAgICAgICAgICAgLy8gWydwaWNvLWxvZycsICdwaWNvX2xvZycsICdwaWNvLmxvZycsICdwLWljb2xvZycsIOKApl1cbiAqIHZhcmlhbnRzKCdqc29uc3RyZWFtJykuaW5jbHVkZXMoJ2pzLW9uLXN0cmVhbScpICAgICAgICAgICAgICAgICAgICAvLyB0cnVlIChjYW5vbmljYWwgYmxvZyBleGFtcGxlKVxuICogdmFyaWFudHMoJ3JlYWN0bmF0aXZlbmF2aWdhdGlvbicpLmluY2x1ZGVzKCdyZWFjdC1uYXRpdmUtbmF2aWdhdGlvbicpIC8vIHRydWUgKGxvbmctbmFtZSBtb3JwaGVtZSBzcGxpdClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhbnRzKG5hbWUsIG9wdHMgPSB7fSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8ICFuYW1lKSByZXR1cm4gW11cbiAgaWYgKGhhc0ludmFsaWRDaGFycyhuYW1lKSkgcmV0dXJuIFtdXG5cbiAgY29uc3QgbG93ZXIgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgLy8gU2NvcGUtYXdhcmUgc3BsaXQg4oCUIGVtcHR5IHNjb3BlIChgQC9mb29gKSwgbWlzc2luZyBzbGFzaCAoYEBtZWApLCBvclxuICAvLyBtdWx0aS1zbGFzaCAoYEBtZS9mb28vYmFyYCkgYWxsIGZhaWwgdmFsaWRhdGVOYW1lIHVwc3RyZWFtLlxuICBsZXQgc2NvcGUgPSAnJ1xuICBsZXQgYmFyZUlucHV0ID0gbG93ZXJcbiAgaWYgKGxvd2VyLnN0YXJ0c1dpdGgoJ0AnKSkge1xuICAgIGNvbnN0IHNsYXNoID0gbG93ZXIuaW5kZXhPZignLycpXG4gICAgaWYgKHNsYXNoIDwgMCkgcmV0dXJuIFtdIC8vIGBAbWVgIOKAlCBubyBzbGFzaFxuICAgIGlmIChzbGFzaCA9PT0gMSkgcmV0dXJuIFtdIC8vIGBAL2Zvb2Ag4oCUIGVtcHR5IHNjb3BlXG4gICAgc2NvcGUgPSBsb3dlci5zbGljZSgwLCBzbGFzaCArIDEpXG4gICAgYmFyZUlucHV0ID0gbG93ZXIuc2xpY2Uoc2xhc2ggKyAxKVxuICAgIGlmIChiYXJlSW5wdXQuaW5jbHVkZXMoJy8nKSkgcmV0dXJuIFtdIC8vIGBAbWUvZm9vL2JhcmAg4oCUIG11bHRpLXNsYXNoXG4gIH1cbiAgaWYgKC9eWy0uX10vLnRlc3QoYmFyZUlucHV0KSkgcmV0dXJuIFtdIC8vIGxlYWRpbmcgc2VwYXJhdG9yIG9uIHRoZSBwa2cgc2VnbWVudFxuICBjb25zdCBiYXJlID0gYmFyZUlucHV0LnJlcGxhY2UoL1suXy1dL2csICcnKVxuICBpZiAoIWJhcmUpIHJldHVybiBbXVxuXG4gIGNvbnN0IG91dCA9IG5ldyBTZXQoKVxuICBvdXQuYWRkKHNjb3BlICsgYmFyZSlcblxuICAvLyAxLWluc2VydGlvbjogY292ZXIgdGhlIG1vc3QgY29tbW9uIG1vbmlrZXIgc2hhcGUgKGBmb28tYmFyYCDihpQgYGZvb2JhcmApLlxuICBmb3IgKGxldCBpID0gMTsgaSA8IGJhcmUubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGNvbnN0IHNlcCBvZiBTRVBBUkFUT1JTKSB7XG4gICAgICBvdXQuYWRkKHNjb3BlICsgYmFyZS5zbGljZSgwLCBpKSArIHNlcCArIGJhcmUuc2xpY2UoaSkpXG4gICAgfVxuICB9XG5cbiAgLy8gRnVsbC1zcGxpdDogYGYtby1vLWItYS1yYCAvIGBmX29fb19iX2FfcmAgZm9ybXMuXG4gIGlmIChiYXJlLmxlbmd0aCA+IDEpIHtcbiAgICBvdXQuYWRkKHNjb3BlICsgYmFyZS5zcGxpdCgnJykuam9pbignLScpKVxuICAgIG91dC5hZGQoc2NvcGUgKyBiYXJlLnNwbGl0KCcnKS5qb2luKCdfJykpXG4gIH1cblxuICAvLyAyLWluc2VydGlvbjogY2F0Y2hlcyBtdWx0aS1tb3JwaGVtZSBzcGxpdHMgKGBqcy1vbi1zdHJlYW1gIOKGlCBganNvbnN0cmVhbWAsXG4gIC8vIGByZWFjdC1uYXRpdmUtbmF2aWdhdGlvbmAg4oaUIGByZWFjdG5hdGl2ZW5hdmlnYXRpb25gKS4gSXRlcmF0ZXMgYnkgZ2FwIHNpemVcbiAgLy8gYXNjZW5kaW5nIHNvIGNvbW1vbiBtb3JwaGVtZSBzcGxpdHMgYXJlIHJlYWNoZWQgZmlyc3Q7IHRoZSBjYXAgc2NhbGVzXG4gIC8vIHdpdGggYmFyZS5sZW5ndGggc28gbG9uZ2VyIG5hbWVzIGdldCBhIGJ1ZGdldCBwcm9wb3J0aW9uYWwgdG8gdGhlaXJcbiAgLy8gcmVhbGlzdGljIGluc2VydGlvbiBzcGFjZS5cbiAgaWYgKGJhcmUubGVuZ3RoID49IDQpIHtcbiAgICBsZXQgYWRkZWQgPSAwXG4gICAgY29uc3QgY2FwID0gY2FwRm9yTGVuZ3RoKGJhcmUubGVuZ3RoLCBvcHRzLmlzRXhoYXVzdGl2ZSA9PT0gdHJ1ZSlcbiAgICBvdXRlcjogZm9yIChsZXQgZ2FwID0gMTsgZ2FwIDwgYmFyZS5sZW5ndGggLSAxOyBnYXArKykge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgKyBnYXAgPCBiYXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGogPSBpICsgZ2FwXG4gICAgICAgIGZvciAoY29uc3Qgc2VwQSBvZiBTRVBBUkFUT1JTKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBzZXBCIG9mIFNFUEFSQVRPUlMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9XG4gICAgICAgICAgICAgIHNjb3BlICsgYmFyZS5zbGljZSgwLCBpKSArIHNlcEEgKyBiYXJlLnNsaWNlKGksIGopICsgc2VwQiArIGJhcmUuc2xpY2UoailcbiAgICAgICAgICAgIGlmICghb3V0LmhhcyhjYW5kaWRhdGUpKSB7XG4gICAgICAgICAgICAgIG91dC5hZGQoY2FuZGlkYXRlKVxuICAgICAgICAgICAgICBhZGRlZCsrXG4gICAgICAgICAgICAgIGlmIChhZGRlZCA+PSBjYXApIGJyZWFrIG91dGVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRXhjbHVkZSB0aGUgbGl0ZXJhbCBpbnB1dCDigJQgaXRzIGV4aXN0ZW5jZSBpcyBjaGVja2VkIHNlcGFyYXRlbHksIG5vdCBhc1xuICAvLyBhIG1vbmlrZXIgY29sbGlzaW9uLiBXZSBkZWxldGUgdGhlIG9yaWdpbmFsIGBuYW1lYCwgbm90IGBsb3dlcmAsIHNvIHRoZVxuICAvLyBiYXJlIGxvd2VyY2FzZSBmb3JtIChhICpkaWZmZXJlbnQqIHN0cmluZykgc3Vydml2ZXMgZm9yIGlucHV0cyBsaWtlXG4gIC8vIGBGb29CYXJgIHdoZXJlIGBmb29iYXJgIGlzIGEgcmVhbCBtb25pa2VyIGNvbGxpZGVyIHRvIHF1ZXJ5LlxuICBvdXQuZGVsZXRlKG5hbWUpXG4gIHJldHVybiBbLi4ub3V0XVxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIHBlci1jYWxsIDItaW5zZXJ0aW9uIHZhcmlhbnQgY2FwLiBTY2FsZXMgbGluZWFybHkgd2l0aCBuYW1lXG4gKiBsZW5ndGgsIGJvdW5kZWQgYnkgYSBiYXNlIGZsb29yIGFuZCBhIGhhcmQgY2VpbGluZy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gYmFyZUxlbmd0aFxuICogQHBhcmFtIHtib29sZWFufSBpc0V4aGF1c3RpdmVcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYXBGb3JMZW5ndGgoYmFyZUxlbmd0aCwgaXNFeGhhdXN0aXZlKSB7XG4gIGNvbnN0IGJhc2UgPSBpc0V4aGF1c3RpdmUgPyBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfRVhIQVVTVElWRSA6IE1PTklLRVJfMklOU0VSVF9DQVBfQkFTRV9ERUZBVUxUXG4gIGNvbnN0IHNjYWxlID0gaXNFeGhhdXN0aXZlXG4gICAgPyBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0VYSEFVU1RJVkVcbiAgICA6IE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfREVGQVVMVFxuICBjb25zdCBjZWlsaW5nID0gaXNFeGhhdXN0aXZlXG4gICAgPyBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9FWEhBVVNUSVZFXG4gICAgOiBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9ERUZBVUxUXG4gIHJldHVybiBNYXRoLm1pbihjZWlsaW5nLCBNYXRoLm1heChiYXNlLCBiYXJlTGVuZ3RoICogc2NhbGUpKVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbGxpc2lvblJlcG9ydFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gY29uZmxpY3RzIC0gdmFyaWFudHMgdGhlIHByZWRpY2F0ZSBjb25maXJtZWQgYXMgZXhpc3RpbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHVudmVyaWZpZWQgLSB2YXJpYW50cyB3aGVyZSB0aGUgcHJlZGljYXRlIHRocmV3OyB0aGVpclxuICogICBjb2xsaXNpb24gc3RhdHVzIGlzIHVua25vd24uIENhbGxlcnMgaW5mZXIgXCJjb2xsaWRlc1wiIGZyb21cbiAqICAgYGNvbmZsaWN0cy5sZW5ndGggPiAwYC5cbiAqL1xuXG5jb25zdCBGSU5EX0NPTExJU0lPTlNfREVGQVVMVF9DT05DVVJSRU5DWSA9IDEyXG5cbi8qKlxuICogR2l2ZW4gYSBjYW5kaWRhdGUgYW5kIGFuIGBleGlzdHMobmFtZSkgPT4gUHJvbWlzZTxib29sZWFuPmAgcHJlZGljYXRlLFxuICogcmV0dXJuIGFueSBtb25pa2VyIGNvbGxpc2lvbnMgZm91bmQgcGx1cyBhbnkgdmFyaWFudHMgd2hvc2UgbG9va3VwXG4gKiB0aHJldy4gQ2FsbGVycyBzaG91bGQgdHJlYXQgYSBub24tZW1wdHkgYHVudmVyaWZpZWRgIGFzIFwibW9uaWtlciBjaGVja1xuICogaW5jb21wbGV0ZVwiIHJhdGhlciB0aGFuIGlnbm9yaW5nIGl0LlxuICpcbiAqIFZhcmlhbnQgcHJvYmVzIHJ1biB3aXRoIGJvdW5kZWQgY29uY3VycmVuY3kgKGRlZmF1bHQgMTIpIHNvIGFcbiAqIG5ldHdvcmstYmFja2VkIGBleGlzdHNgIGRvZXNuJ3QgdW5sZWFzaCB0aG91c2FuZHMgb2YgcGFyYWxsZWwgcmVxdWVzdHNcbiAqIGZvciBsb25nIG5hbWVzIHdpdGggYC0tZXhoYXVzdGl2ZWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNhbmRpZGF0ZVxuICogQHBhcmFtIHsobmFtZTogc3RyaW5nKSA9PiBQcm9taXNlPGJvb2xlYW4+fSBleGlzdHNcbiAqIEBwYXJhbSB7eyBpc0V4aGF1c3RpdmU/OiBib29sZWFuLCBjb25jdXJyZW5jeT86IG51bWJlciB9fSBbb3B0c11cbiAqIEByZXR1cm5zIHtQcm9taXNlPENvbGxpc2lvblJlcG9ydD59XG4gKiBAZXhhbXBsZVxuICogY29uc3QgdGFrZW4gPSBuZXcgU2V0KFsnanMtb24tc3RyZWFtJ10pXG4gKiBhd2FpdCBmaW5kQ29sbGlzaW9ucygnanNvbnN0cmVhbScsIGFzeW5jIChuYW1lKSA9PiB0YWtlbi5oYXMobmFtZSkpXG4gKiAvLyB7IGNvbmZsaWN0czogWydqcy1vbi1zdHJlYW0nXSwgdW52ZXJpZmllZDogW10gfVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZENvbGxpc2lvbnMoY2FuZGlkYXRlLCBleGlzdHMsIG9wdHMgPSB7fSkge1xuICBjb25zdCB0b0NoZWNrID0gdmFyaWFudHMoY2FuZGlkYXRlLCBvcHRzKVxuICBjb25zdCBjb25jdXJyZW5jeSA9XG4gICAgTnVtYmVyLmlzSW50ZWdlcihvcHRzLmNvbmN1cnJlbmN5KSAmJiBvcHRzLmNvbmN1cnJlbmN5ID4gMFxuICAgICAgPyBvcHRzLmNvbmN1cnJlbmN5XG4gICAgICA6IEZJTkRfQ09MTElTSU9OU19ERUZBVUxUX0NPTkNVUlJFTkNZXG4gIGNvbnN0IHByb2JlcyA9IGF3YWl0IHJ1bkJvdW5kZWQodG9DaGVjaywgY29uY3VycmVuY3ksIGFzeW5jICh2YXJpYW50KSA9PiAoe1xuICAgIHZhcmlhbnQsXG4gICAgcmVzdWx0OiBhd2FpdCBhdHRlbXB0QXN5bmMoKCkgPT4gZXhpc3RzKHZhcmlhbnQpKSxcbiAgfSkpXG4gIC8vIGByZXN1bHQub2tgIG1lYW5zIHRoZSBwcm9iZSByZXR1cm5lZCAoZGlkbid0IHRocm93KTsgYHJlc3VsdC52YWx1ZWBcbiAgLy8gbWVhbnMgdGhlIHByZWRpY2F0ZSByZXBvcnRlZCB0aGUgdmFyaWFudCBhcyBleGlzdGluZyBvbiB0aGUgcmVnaXN0cnkuXG4gIC8vIEJvdGggbXVzdCBiZSB0cnV0aHkgdG8gY291bnQgYXMgYSBjb25maXJtZWQgY29sbGlzaW9uLlxuICBjb25zdCBjb25mbGljdHMgPSBwcm9iZXNcbiAgICAuZmlsdGVyKCh7IHJlc3VsdCB9KSA9PiByZXN1bHQub2sgJiYgcmVzdWx0LnZhbHVlKVxuICAgIC5tYXAoKHsgdmFyaWFudCB9KSA9PiB2YXJpYW50KVxuICBjb25zdCB1bnZlcmlmaWVkID0gcHJvYmVzLmZpbHRlcigoeyByZXN1bHQgfSkgPT4gIXJlc3VsdC5vaykubWFwKCh7IHZhcmlhbnQgfSkgPT4gdmFyaWFudClcbiAgcmV0dXJuIHsgY29uZmxpY3RzLCB1bnZlcmlmaWVkIH1cbn1cblxuLyoqXG4gKiBSdW4gYHRhc2soaXRlbSlgIGFnYWluc3QgZXZlcnkgaW5wdXQgd2l0aCBhdCBtb3N0IGBjb25jdXJyZW5jeWAgaW5cbiAqIGZsaWdodC4gVGlueSBzdHJ1Y3R1cmVkLWNvbmN1cnJlbmN5IHByaW1pdGl2ZSDigJQgZHVwbGljYXRlZCBmcm9tXG4gKiBgcmVnaXN0cnkubWpzOnBvb2xgIHNvIHRoaXMgbW9kdWxlIHN0YXlzIHN0YW5kYWxvbmUgZm9yIGxpYnJhcnlcbiAqIGNvbnN1bWVycyB3aG8gZG9uJ3QgaW1wb3J0IHRoZSByZWdpc3RyeS5cbiAqXG4gKiBAdGVtcGxhdGUgVCwgVVxuICogQHBhcmFtIHtUW119IGl0ZW1zXG4gKiBAcGFyYW0ge251bWJlcn0gY29uY3VycmVuY3lcbiAqIEBwYXJhbSB7KGl0ZW06IFQpID0+IFByb21pc2U8VT59IHRhc2tcbiAqIEByZXR1cm5zIHtQcm9taXNlPFVbXT59XG4gKiBAcHJpdmF0ZVxuICovXG5hc3luYyBmdW5jdGlvbiBydW5Cb3VuZGVkKGl0ZW1zLCBjb25jdXJyZW5jeSwgdGFzaykge1xuICBjb25zdCByZXN1bHRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogaXRlbXMubGVuZ3RoIH0pXG4gIGxldCBuZXh0ID0gMFxuICBhc3luYyBmdW5jdGlvbiB3b3JrZXIoKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gbmV4dCsrXG4gICAgICBpZiAoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIC8vIEVhY2ggd29ya2VyIG11c3QgZmluaXNoIGl0cyBjdXJyZW50IHJlcXVlc3QgYmVmb3JlIGNsYWltaW5nIGFub3RoZXIgc2xvdC5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICByZXN1bHRzW2luZGV4XSA9IGF3YWl0IHRhc2soaXRlbXNbaW5kZXhdKVxuICAgIH1cbiAgfVxuICBjb25zdCB3b3JrZXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogTWF0aC5taW4oY29uY3VycmVuY3ksIGl0ZW1zLmxlbmd0aCkgfSwgd29ya2VyKVxuICBhd2FpdCBQcm9taXNlLmFsbCh3b3JrZXJzKVxuICByZXR1cm4gcmVzdWx0c1xufVxuIiwiLy8gVGhlU3BhbmlzaElucXVpc2l0aW9uXG5cbi8vIENhY2hlIHRoZSBtYXRyaXguIE5vdGUgdGhhdCBpZiB5b3Ugbm90IHBhc3MgYSBsaW1pdCB0aGlzIGltcGxlbWVudGF0aW9uIHdpbGwgdXNlIGEgZHluYW1pY2FsbHkgY2FsY3VsYXRlIG9uZS5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfX3RoaXMsIHRoYXQsIGxpbWl0KSB7XG5cbiAgdmFyIHRoaXNMZW5ndGggPSBfX3RoaXMubGVuZ3RoLFxuICAgICAgdGhhdExlbmd0aCA9IHRoYXQubGVuZ3RoLFxuICAgICAgbWF0cml4ID0gW107XG5cbiAgLy8gSWYgdGhlIGxpbWl0IGlzIG5vdCBkZWZpbmVkIGl0IHdpbGwgYmUgY2FsY3VsYXRlIGZyb20gdGhpcyBhbmQgdGhhdCBhcmdzLlxuICBsaW1pdCA9IChsaW1pdCB8fCAoKHRoYXRMZW5ndGggPiB0aGlzTGVuZ3RoID8gdGhhdExlbmd0aCA6IHRoaXNMZW5ndGgpKSkrMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbWl0OyBpKyspIHtcbiAgICBtYXRyaXhbaV0gPSBbaV07XG4gICAgbWF0cml4W2ldLmxlbmd0aCA9IGxpbWl0O1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCBsaW1pdDsgaSsrKSB7XG4gICAgbWF0cml4WzBdW2ldID0gaTtcbiAgfVxuXG4gIGlmIChNYXRoLmFicyh0aGlzTGVuZ3RoIC0gdGhhdExlbmd0aCkgPiAobGltaXQgfHwgMTAwKSl7XG4gICAgcmV0dXJuIHByZXBhcmUgKGxpbWl0IHx8IDEwMCk7XG4gIH1cbiAgaWYgKHRoaXNMZW5ndGggPT09IDApe1xuICAgIHJldHVybiBwcmVwYXJlICh0aGF0TGVuZ3RoKTtcbiAgfVxuICBpZiAodGhhdExlbmd0aCA9PT0gMCl7XG4gICAgcmV0dXJuIHByZXBhcmUgKHRoaXNMZW5ndGgpO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIG1hdHJpeC5cbiAgdmFyIGosIHRoaXNfaSwgdGhhdF9qLCBjb3N0LCBtaW4sIHQ7XG4gIGZvciAoaSA9IDE7IGkgPD0gdGhpc0xlbmd0aDsgKytpKSB7XG4gICAgdGhpc19pID0gX190aGlzW2ktMV07XG5cbiAgICAvLyBTdGVwIDRcbiAgICBmb3IgKGogPSAxOyBqIDw9IHRoYXRMZW5ndGg7ICsraikge1xuICAgICAgLy8gQ2hlY2sgdGhlIGphZ2dlZCBsZCB0b3RhbCBzbyBmYXJcbiAgICAgIGlmIChpID09PSBqICYmIG1hdHJpeFtpXVtqXSA+IDQpIHJldHVybiBwcmVwYXJlICh0aGlzTGVuZ3RoKTtcblxuICAgICAgdGhhdF9qID0gdGhhdFtqLTFdO1xuICAgICAgY29zdCA9ICh0aGlzX2kgPT09IHRoYXRfaikgPyAwIDogMTsgLy8gU3RlcCA1XG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIG1pbmltdW0gKG11Y2ggZmFzdGVyIHRoYW4gTWF0aC5taW4oLi4uKSkuXG4gICAgICBtaW4gICAgPSBtYXRyaXhbaSAtIDFdW2ogICAgXSArIDE7IC8vIERlbGV0aW9uLlxuICAgICAgaWYgKCh0ID0gbWF0cml4W2kgICAgXVtqIC0gMV0gKyAxICAgKSA8IG1pbikgbWluID0gdDsgICAvLyBJbnNlcnRpb24uXG4gICAgICBpZiAoKHQgPSBtYXRyaXhbaSAtIDFdW2ogLSAxXSArIGNvc3QpIDwgbWluKSBtaW4gPSB0OyAgIC8vIFN1YnN0aXR1dGlvbi5cblxuICAgICAgLy8gVXBkYXRlIG1hdHJpeC5cbiAgICAgIG1hdHJpeFtpXVtqXSA9IChpID4gMSAmJiBqID4gMSAmJiB0aGlzX2kgPT09IHRoYXRbai0yXSAmJiBfX3RoaXNbaS0yXSA9PT0gdGhhdF9qICYmICh0ID0gbWF0cml4W2ktMl1bai0yXStjb3N0KSA8IG1pbikgPyB0IDogbWluOyAvLyBUcmFuc3Bvc2l0aW9uLlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcmVwYXJlIChtYXRyaXhbdGhpc0xlbmd0aF1bdGhhdExlbmd0aF0pO1xuXG4vKipcbiAqXG4gKi9cbiAgZnVuY3Rpb24gcHJlcGFyZShzdGVwcykge1xuICAgIHZhciBsZW5ndGggPSBNYXRoLm1heCh0aGlzTGVuZ3RoLCB0aGF0TGVuZ3RoKVxuICAgIHZhciByZWxhdGl2ZSA9IGxlbmd0aCA9PT0gMFxuICAgICAgPyAwXG4gICAgICA6IChzdGVwcyAvIGxlbmd0aCk7XG4gICAgdmFyIHNpbWlsYXJpdHkgPSAxIC0gcmVsYXRpdmVcbiAgICByZXR1cm4ge1xuICAgICAgc3RlcHM6IHN0ZXBzLFxuICAgICAgcmVsYXRpdmU6IHJlbGF0aXZlLFxuICAgICAgc2ltaWxhcml0eTogc2ltaWxhcml0eVxuICAgIH07XG4gIH1cblxufTtcbiIsIi8vIE5lYXItbWF0Y2ggKHR5cG9zcXVhdCkgZGV0ZWN0aW9uIOKAlCBmbGFncyBjYW5kaWRhdGVzIHdpdGhpbiDiiaQgTiBlZGl0cyBvZlxuLy8gYSBwb3B1bGFyIG5wbSBwYWNrYWdlLiBEaXN0aW5jdCBmcm9tIG5wbSdzIG1vbmlrZXIgcnVsZSAod2hpY2ggb25seVxuLy8gY2F0Y2hlcyBuYW1lcyB0aGF0ICpub3JtYWxpemUqIGlkZW50aWNhbGx5KS4gU2luZ2xlLWxldHRlciBzdWJzdGl0dXRpb25zXG4vLyBsaWtlIGBleHRvb2xraXRgIHZzIGBlcy10b29sa2l0YCB3b3VsZCBwdWJsaXNoIGZpbmUgcGVyIHRoZSBtb25pa2VyIHJ1bGVcbi8vIGJ1dCBhcmUgY2xhc3NpYyB0eXBvc3F1YXQgc2hhcGVzLlxuLy9cbi8vIERpc3RhbmNlIGlzIE9wdGltYWwgU3RyaW5nIEFsaWdubWVudCAoT1NBKSBmcm9tIHRoZSBgZGFtZXJhdS1sZXZlbnNodGVpbmBcbi8vIHBhY2thZ2Ug4oCUIGNvdW50cyBpbnNlcnRpb25zLCBkZWxldGlvbnMsIHN1YnN0aXR1dGlvbnMsIGFuZCBhZGphY2VudFxuLy8gdHJhbnNwb3NpdGlvbnMgYXMgb25lIGVkaXQgZWFjaCwgYnV0IGRvZXMgbm90IGFsbG93IGEgc3Vic3RyaW5nIHRvIGJlXG4vLyBlZGl0ZWQgbW9yZSB0aGFuIG9uY2UuIEZvciB0eXBvc3F1YXQgZGV0ZWN0aW9uIGF0IGRpc3RhbmNlIOKJpCAyIHRoaXMgaXNcbi8vIGluZGlzdGluZ3Vpc2hhYmxlIGZyb20gdW5yZXN0cmljdGVkIERhbWVyYXUtTGV2ZW5zaHRlaW47IHRoZSBkaXN0aW5jdGlvblxuLy8gb25seSBtYXR0ZXJzIGF0IGRpc3RhbmNlIDMrIChlLmcuLCBgb3NhRGlzdGFuY2UoJ2NhJywgJ2FiYycpID09PSAzYFxuLy8gd2hpbGUgdHJ1ZSBETCB3b3VsZCBzYXkgMikuXG4vL1xuLy8gVGhpcyBtb2R1bGUgaXMgKnB1cmUqOiBjYWxsZXJzIHBhc3MgdGhlIGNvcnB1cy4gVGhlIGNvcnB1cyBsb2FkZXIgaXMgaW5cbi8vIGBjb3JwdXMubWpzYCBhbmQgcmV0dXJucyBhIFJlc3VsdCBzbyBDTEkgLyBjb25zdW1lcnMgaGFuZGxlIGZhaWx1cmUgYXRcbi8vIHRoZWlyIG93biBib3VuZGFyeS5cblxuaW1wb3J0IGRhbWVyYXVMZXZlbnNodGVpbiBmcm9tICdkYW1lcmF1LWxldmVuc2h0ZWluJ1xuXG5pbXBvcnQgeyBORUFSX01BVENIX01BWF9ESVNUQU5DRSwgTkVBUl9NQVRDSF9NSU5fQ09SUFVTX0xFTiB9IGZyb20gJy4vY29uc3RhbnRzLm1qcydcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gJy4vbW9uaWtlci5tanMnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTmVhck1hdGNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIHRoZSBwb3B1bGFyIHBhY2thZ2UgdGhlIGNhbmRpZGF0ZSByZXNlbWJsZXNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXN0YW5jZSAtIGVkaXQgZGlzdGFuY2UgYmV0d2VlbiBub3JtYWxpemVkIGZvcm1zXG4gKi9cblxuLyoqXG4gKiBPcHRpbWFsIFN0cmluZyBBbGlnbm1lbnQgZGlzdGFuY2Ug4oCUIGluc2VydGlvbnMsIGRlbGV0aW9ucywgc3Vic3RpdHV0aW9ucyxcbiAqIGFuZCBhZGphY2VudCB0cmFuc3Bvc2l0aW9ucyBjb3VudCBhcyBvbmUgZWRpdCBlYWNoLiBGb3IgZGlzdGFuY2Ug4omkIDIgdGhpc1xuICogZXF1YWxzIHVucmVzdHJpY3RlZCBEYW1lcmF1LUxldmVuc2h0ZWluOyB0aGUgdHdvIGRpZmZlciBvbmx5IGF0IGRpc3RhbmNlXG4gKiAzKywgd2hpY2ggaXMgb3V0c2lkZSBvdXIgdHlwb3NxdWF0IGJ1ZGdldCBhbnl3YXkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFcbiAqIEBwYXJhbSB7c3RyaW5nfSBiXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQGV4YW1wbGVcbiAqIG9zYURpc3RhbmNlKCdyZWFjdCcsICdyYWVjdCcpICAvLyAxICAoYWRqYWNlbnQgdHJhbnNwb3NpdGlvbilcbiAqIG9zYURpc3RhbmNlKCdjYXQnLCAnY2FydCcpICAgICAvLyAxICAoaW5zZXJ0aW9uKVxuICogb3NhRGlzdGFuY2UoJ2NhJywgJ2FiYycpICAgICAgIC8vIDMgICh0cnVlIERMIHdvdWxkIGJlIDIg4oCUIE9TQSdzIHJlc3RyaWN0aW9uKVxuICovXG5leHBvcnQgZnVuY3Rpb24gb3NhRGlzdGFuY2UoYSwgYikge1xuICByZXR1cm4gZGFtZXJhdUxldmVuc2h0ZWluKGEsIGIpLnN0ZXBzXG59XG5cbi8qKlxuICogRmluZCBwb3B1bGFyIG5wbSBwYWNrYWdlcyB3aXRoaW4gYG1heERpc3RhbmNlYCBlZGl0cyBvZiBgY2FuZGlkYXRlYCxcbiAqIGNvbXBhcmluZyBvbiBub3JtYWxpemVkIGZvcm1zIChgbG93ZXJjYXNlICsgc3RyaXAgWy5fLV1gKS4gTmFtZXMgdGhhdFxuICogbm9ybWFsaXplIGlkZW50aWNhbGx5IHRvIHRoZSBjYW5kaWRhdGUgYXJlIGV4Y2x1ZGVkIOKAlCB0aG9zZSBhcmUgbW9uaWtlclxuICogY29sbGlzaW9ucyBhbmQgYXJlIHJlcG9ydGVkIGJ5IHRoZSBtb25pa2VyIGxheWVyLlxuICpcbiAqIFJlc3VsdHMgZGVkdXBlIGJ5IG5vcm1hbGl6ZWQgZm9ybSAoa2VlcGluZyB0aGUgaGlnaGVzdC1yYW5rZWQgdmFyaWFudClcbiAqIGFuZCBzb3J0IGJ5IGRpc3RhbmNlIGFzY2VuZGluZywgdGhlbiBieSBjb3JwdXMgcmFuayBhc2NlbmRpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNhbmRpZGF0ZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gY29ycHVzIC0gcG9wdWxhciBwYWNrYWdlIG5hbWVzLCBkZXNjZW5kaW5nIGJ5IHJhbmtcbiAqIEBwYXJhbSB7eyBtYXhEaXN0YW5jZT86IG51bWJlciwgbWluQ29ycHVzTGVuPzogbnVtYmVyIH19IFtvcHRzXVxuICogQHJldHVybnMge05lYXJNYXRjaFtdfVxuICogQGV4YW1wbGVcbiAqIGZpbmROZWFyTWF0Y2hlcygnZXh0b29sa2l0JywgWydlcy10b29sa2l0JywgJ3JlYWN0J10pXG4gKiAvLyBbeyBuYW1lOiAnZXMtdG9vbGtpdCcsIGRpc3RhbmNlOiAxIH1dXG4gKlxuICogZmluZE5lYXJNYXRjaGVzKCdlc3Rvb2xraXQnLCBbJ2VzLXRvb2xraXQnXSlcbiAqIC8vIFtdICAoc2FtZSBub3JtYWxpemVkIGZvcm0g4oCUIHRoYXQncyBhIG1vbmlrZXIgY29sbGlzaW9uLCBub3QgYSBuZWFyLW1hdGNoKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE5lYXJNYXRjaGVzKGNhbmRpZGF0ZSwgY29ycHVzLCBvcHRzID0ge30pIHtcbiAgaWYgKHR5cGVvZiBjYW5kaWRhdGUgIT09ICdzdHJpbmcnIHx8ICFjYW5kaWRhdGUpIHJldHVybiBbXVxuICBpZiAoIUFycmF5LmlzQXJyYXkoY29ycHVzKSkgcmV0dXJuIFtdXG5cbiAgY29uc3QgbWF4RGlzdGFuY2UgPSBvcHRzLm1heERpc3RhbmNlID8/IE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFXG4gIGNvbnN0IG1pbkNvcnB1c0xlbiA9IG9wdHMubWluQ29ycHVzTGVuID8/IE5FQVJfTUFUQ0hfTUlOX0NPUlBVU19MRU5cblxuICBjb25zdCBjYW5kQmFyZSA9IHNjb3BlU3RyaXAoY2FuZGlkYXRlKVxuICBpZiAoY2FuZEJhcmUgPT09IG51bGwpIHJldHVybiBbXVxuICBjb25zdCBjYW5kTm9ybSA9IG5vcm1hbGl6ZShjYW5kQmFyZSlcbiAgaWYgKCFjYW5kTm9ybSkgcmV0dXJuIFtdXG5cbiAgLy8gRGVkdXBlIGJ5IG5vcm1hbGl6ZWQgZm9ybSDigJQga2VlcHMgdGhlIGhpZ2hlc3QtcmFua2VkIGNvcnB1cyB2YXJpYW50XG4gIC8vIChsb3dlc3QgaW5kZXgpIHdoZW4gbXVsdGlwbGUgbmFtZXMgY29sbGFwc2UgKGUuZy4gYG9iamVjdC1hc3NpZ25gIGFuZFxuICAvLyBgb2JqZWN0LmFzc2lnbmAgYm90aCBub3JtYWxpemUgdG8gYG9iamVjdGFzc2lnbmApLlxuICAvKiogQHR5cGUge01hcDxzdHJpbmcsIHsgbmFtZTogc3RyaW5nLCBkaXN0YW5jZTogbnVtYmVyLCByYW5rOiBudW1iZXIgfT59ICovXG4gIGNvbnN0IGJlc3RCeU5vcm0gPSBuZXcgTWFwKClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3JwdXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwa2cgPSBjb3JwdXNbaV1cbiAgICBpZiAodHlwZW9mIHBrZyAhPT0gJ3N0cmluZycgfHwgIXBrZykgY29udGludWVcbiAgICBpZiAocGtnLmxlbmd0aCA8IG1pbkNvcnB1c0xlbikgY29udGludWVcbiAgICBjb25zdCBwa2dOb3JtID0gbm9ybWFsaXplKHBrZylcbiAgICBpZiAocGtnTm9ybSA9PT0gY2FuZE5vcm0pIGNvbnRpbnVlXG4gICAgaWYgKE1hdGguYWJzKHBrZ05vcm0ubGVuZ3RoIC0gY2FuZE5vcm0ubGVuZ3RoKSA+IG1heERpc3RhbmNlKSBjb250aW51ZVxuICAgIGNvbnN0IGVkaXREaXN0YW5jZSA9IG9zYURpc3RhbmNlKGNhbmROb3JtLCBwa2dOb3JtKVxuICAgIGlmIChlZGl0RGlzdGFuY2UgPD0gMCB8fCBlZGl0RGlzdGFuY2UgPiBtYXhEaXN0YW5jZSkgY29udGludWVcbiAgICBjb25zdCBwcmV2ID0gYmVzdEJ5Tm9ybS5nZXQocGtnTm9ybSlcbiAgICBpZiAoIXByZXYgfHwgaSA8IHByZXYucmFuaykge1xuICAgICAgYmVzdEJ5Tm9ybS5zZXQocGtnTm9ybSwgeyBuYW1lOiBwa2csIGRpc3RhbmNlOiBlZGl0RGlzdGFuY2UsIHJhbms6IGkgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gWy4uLmJlc3RCeU5vcm0udmFsdWVzKCldXG4gICAgLnRvU29ydGVkKChhLCBiKSA9PiBhLmRpc3RhbmNlIC0gYi5kaXN0YW5jZSB8fCBhLnJhbmsgLSBiLnJhbmspXG4gICAgLm1hcCgoeyBuYW1lLCBkaXN0YW5jZTogZCB9KSA9PiAoeyBuYW1lLCBkaXN0YW5jZTogZCB9KSlcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhcmUgKHBvc3Qtc2NvcGUpIHBvcnRpb24gb2YgYSBjYW5kaWRhdGUsIG9yIG51bGwgaWYgdGhlIGlucHV0XG4gKiBoYXMgYW4gaW52YWxpZCBzdHJ1Y3R1cmUgKGUuZy4sIG11bHRpLXNsYXNoIGxpa2UgYEBzY29wZS9mb28vYmFyYCkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2NvcGVTdHJpcChuYW1lKSB7XG4gIGlmICghbmFtZS5zdGFydHNXaXRoKCdAJykpIHtcbiAgICBpZiAobmFtZS5pbmNsdWRlcygnLycpKSByZXR1cm4gbnVsbFxuICAgIHJldHVybiBuYW1lXG4gIH1cbiAgY29uc3Qgc2xhc2ggPSBuYW1lLmluZGV4T2YoJy8nKVxuICBpZiAoc2xhc2ggPCAwKSByZXR1cm4gbnVsbFxuICBjb25zdCByZXN0ID0gbmFtZS5zbGljZShzbGFzaCArIDEpXG4gIGlmIChyZXN0LmluY2x1ZGVzKCcvJykpIHJldHVybiBudWxsXG4gIHJldHVybiByZXN0XG59XG4iLCIiLCIndXNlIHN0cmljdCdcbmNvbnN0IGJ1aWx0aW5zID0gcmVxdWlyZSgnLi9idWlsdGluLW1vZHVsZXMuanNvbicpXG5cbnZhciBzY29wZWRQYWNrYWdlUGF0dGVybiA9IG5ldyBSZWdFeHAoJ14oPzpAKFteL10rPylbL10pPyhbXi9dKz8pJCcpXG52YXIgZXhjbHVzaW9uTGlzdCA9IFtcbiAgJ25vZGVfbW9kdWxlcycsXG4gICdmYXZpY29uLmljbycsXG5dXG5cbmZ1bmN0aW9uIHZhbGlkYXRlIChuYW1lKSB7XG4gIHZhciB3YXJuaW5ncyA9IFtdXG4gIHZhciBlcnJvcnMgPSBbXVxuXG4gIGlmIChuYW1lID09PSBudWxsKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IGJlIG51bGwnKVxuICAgIHJldHVybiBkb25lKHdhcm5pbmdzLCBlcnJvcnMpXG4gIH1cblxuICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IGJlIHVuZGVmaW5lZCcpXG4gICAgcmV0dXJuIGRvbmUod2FybmluZ3MsIGVycm9ycylcbiAgfVxuXG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICByZXR1cm4gZG9uZSh3YXJuaW5ncywgZXJyb3JzKVxuICB9XG5cbiAgaWYgKCFuYW1lLmxlbmd0aCkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGxlbmd0aCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvJylcbiAgfVxuXG4gIGlmIChuYW1lLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBzdGFydCB3aXRoIGEgcGVyaW9kJylcbiAgfVxuXG4gIGlmIChuYW1lLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBzdGFydCB3aXRoIGEgaHlwaGVuJylcbiAgfVxuXG4gIGlmIChuYW1lLm1hdGNoKC9eXy8pKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IHN0YXJ0IHdpdGggYW4gdW5kZXJzY29yZScpXG4gIH1cblxuICBpZiAobmFtZS50cmltKCkgIT09IG5hbWUpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3QgY29udGFpbiBsZWFkaW5nIG9yIHRyYWlsaW5nIHNwYWNlcycpXG4gIH1cblxuICAvLyBObyBmdW5ueSBidXNpbmVzc1xuICBleGNsdXNpb25MaXN0LmZvckVhY2goZnVuY3Rpb24gKGV4Y2x1ZGVkTmFtZSkge1xuICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgPT09IGV4Y2x1ZGVkTmFtZSkge1xuICAgICAgZXJyb3JzLnB1c2goZXhjbHVkZWROYW1lICsgJyBpcyBub3QgYSB2YWxpZCBwYWNrYWdlIG5hbWUnKVxuICAgIH1cbiAgfSlcblxuICAvLyBHZW5lcmF0ZSB3YXJuaW5ncyBmb3Igc3R1ZmYgdGhhdCB1c2VkIHRvIGJlIGFsbG93ZWRcblxuICAvLyBjb3JlIG1vZHVsZSBuYW1lcyBsaWtlIGh0dHAsIGV2ZW50cywgdXRpbCwgZXRjXG4gIGlmIChidWlsdGlucy5pbmNsdWRlcyhuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgd2FybmluZ3MucHVzaChuYW1lICsgJyBpcyBhIGNvcmUgbW9kdWxlIG5hbWUnKVxuICB9XG5cbiAgaWYgKG5hbWUubGVuZ3RoID4gMjE0KSB7XG4gICAgd2FybmluZ3MucHVzaCgnbmFtZSBjYW4gbm8gbG9uZ2VyIGNvbnRhaW4gbW9yZSB0aGFuIDIxNCBjaGFyYWN0ZXJzJylcbiAgfVxuXG4gIC8vIG1JeGVEIENhU2UgbkFNRXNcbiAgaWYgKG5hbWUudG9Mb3dlckNhc2UoKSAhPT0gbmFtZSkge1xuICAgIHdhcm5pbmdzLnB1c2goJ25hbWUgY2FuIG5vIGxvbmdlciBjb250YWluIGNhcGl0YWwgbGV0dGVycycpXG4gIH1cblxuICBpZiAoL1t+JyEoKSpdLy50ZXN0KG5hbWUuc3BsaXQoJy8nKS5zbGljZSgtMSlbMF0pKSB7XG4gICAgd2FybmluZ3MucHVzaCgnbmFtZSBjYW4gbm8gbG9uZ2VyIGNvbnRhaW4gc3BlY2lhbCBjaGFyYWN0ZXJzIChcIn5cXCchKCkqXCIpJylcbiAgfVxuXG4gIGlmIChlbmNvZGVVUklDb21wb25lbnQobmFtZSkgIT09IG5hbWUpIHtcbiAgICAvLyBNYXliZSBpdCdzIGEgc2NvcGVkIHBhY2thZ2UgbmFtZSwgbGlrZSBAdXNlci9wYWNrYWdlXG4gICAgdmFyIG5hbWVNYXRjaCA9IG5hbWUubWF0Y2goc2NvcGVkUGFja2FnZVBhdHRlcm4pXG4gICAgaWYgKG5hbWVNYXRjaCkge1xuICAgICAgdmFyIHVzZXIgPSBuYW1lTWF0Y2hbMV1cbiAgICAgIHZhciBwa2cgPSBuYW1lTWF0Y2hbMl1cblxuICAgICAgaWYgKHBrZy5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IHN0YXJ0IHdpdGggYSBwZXJpb2QnKVxuICAgICAgfVxuXG4gICAgICBpZiAoZW5jb2RlVVJJQ29tcG9uZW50KHVzZXIpID09PSB1c2VyICYmIGVuY29kZVVSSUNvbXBvbmVudChwa2cpID09PSBwa2cpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUod2FybmluZ3MsIGVycm9ycylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW4gb25seSBjb250YWluIFVSTC1mcmllbmRseSBjaGFyYWN0ZXJzJylcbiAgfVxuXG4gIHJldHVybiBkb25lKHdhcm5pbmdzLCBlcnJvcnMpXG59XG5cbnZhciBkb25lID0gZnVuY3Rpb24gKHdhcm5pbmdzLCBlcnJvcnMpIHtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICB2YWxpZEZvck5ld1BhY2thZ2VzOiBlcnJvcnMubGVuZ3RoID09PSAwICYmIHdhcm5pbmdzLmxlbmd0aCA9PT0gMCxcbiAgICB2YWxpZEZvck9sZFBhY2thZ2VzOiBlcnJvcnMubGVuZ3RoID09PSAwLFxuICAgIHdhcm5pbmdzOiB3YXJuaW5ncyxcbiAgICBlcnJvcnM6IGVycm9ycyxcbiAgfVxuICBpZiAoIXJlc3VsdC53YXJuaW5ncy5sZW5ndGgpIHtcbiAgICBkZWxldGUgcmVzdWx0Lndhcm5pbmdzXG4gIH1cbiAgaWYgKCFyZXN1bHQuZXJyb3JzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSByZXN1bHQuZXJyb3JzXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlXG4iLCIvLyBUaGluIHdyYXBwZXIgYXJvdW5kIHRoZSBvZmZpY2lhbCBgdmFsaWRhdGUtbnBtLXBhY2thZ2UtbmFtZWAgcGFja2FnZS5cbi8vIFdlIHByZXZpb3VzbHkgaGFuZC1wb3J0ZWQgdGhlIHJ1bGVzOyB0aGUgdXBzdHJlYW0gcGFja2FnZSBpcyB0aGUgc291cmNlXG4vLyBvZiB0cnV0aCBhbmQgc3RheXMgaW4gc3luYyB3aXRoIG5wbSBpdHNlbGYuXG5cbmltcG9ydCB2YWxpZGF0ZSBmcm9tICd2YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZhbGlkYXRlUmVzdWx0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzVmFsaWQgLSB0cnVlIG9ubHkgaWYgdGhlIG5hbWUgaXMgdmFsaWQgZm9yIE5FVyBwdWJsaXNoZXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHJlYXNvbnMgLSBodW1hbi1yZWFkYWJsZSByZWplY3Rpb24gcmVhc29uczsgZW1wdHkgd2hlbiB2YWxpZFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1Njb3BlZCAtIHRydWUgaWYgdGhlIG5hbWUgaXMgaW4gdGhlIGBAc2NvcGUvbmFtZWAgZm9ybVxuICovXG5cbi8qKlxuICogVmFsaWRhdGUgYW4gbnBtIHBhY2thZ2UgbmFtZS4gQ29tYmluZXMgZXJyb3JzIGFuZCB3YXJuaW5ncyBpbnRvIGEgc2luZ2xlXG4gKiByZWFzb25zW10gYXJyYXkgYmVjYXVzZSBmb3IgKm5ldyogcHVibGlzaGVzIGJvdGggYXJlIGJsb2NrZXJzLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gbmFtZVxuICogQHJldHVybnMge1ZhbGlkYXRlUmVzdWx0fVxuICogQGV4YW1wbGVcbiAqIHZhbGlkYXRlTmFtZSgndGlueS1sb2cnKSAgICAgIC8vIHsgaXNWYWxpZDogdHJ1ZSwgIHJlYXNvbnM6IFtdLCBpc1Njb3BlZDogZmFsc2UgfVxuICogdmFsaWRhdGVOYW1lKCdUaW55TG9nJykgICAgICAgLy8geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uczogWyfigKZjYXBpdGFsIGxldHRlcnMnXSwgaXNTY29wZWQ6IGZhbHNlIH1cbiAqIHZhbGlkYXRlTmFtZSgnQG1lLy5mb28nKSAgICAgIC8vIHsgaXNWYWxpZDogZmFsc2UsIHJlYXNvbnM6IFsn4oCmcGVyaW9kJ10sIGlzU2NvcGVkOiB0cnVlIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uczogWyduYW1lIG11c3QgYmUgYSBzdHJpbmcnXSwgaXNTY29wZWQ6IGZhbHNlIH1cbiAgfVxuICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZShuYW1lKVxuICBjb25zdCByZWFzb25zID0gWy4uLihyZXN1bHQuZXJyb3JzID8/IFtdKSwgLi4uKHJlc3VsdC53YXJuaW5ncyA/PyBbXSldXG4gIGNvbnN0IGlzU2NvcGVkID0gbmFtZS5zdGFydHNXaXRoKCdAJykgJiYgbmFtZS5pbmNsdWRlcygnLycpXG4gIHJldHVybiB7IGlzVmFsaWQ6IEJvb2xlYW4ocmVzdWx0LnZhbGlkRm9yTmV3UGFja2FnZXMpLCByZWFzb25zLCBpc1Njb3BlZCB9XG59XG4iLCIvLyBQdXJlIHBpcGVsaW5lIHBpZWNlcyBmb3IgdGhlIG5wbS1uYW1lciBDTEkuIE5ldHdvcmsgSS9PIGxpdmVzIGluXG4vLyBgY2hlY2subWpzOm1haW4oKWAgd2hpY2ggc2VxdWVuY2VzIHRoZXNlIGluIG9yZGVyOyBldmVyeXRoaW5nIGhlcmUgaXNcbi8vIGRhdGEtaW4gLyBkYXRhLW91dCBzbyB1bml0IHRlc3RzIGNhbiBjb3ZlciB0aGUgdW52ZXJpZmllZC1tb25pa2VyIHBhdGhcbi8vIHdpdGhvdXQgdG91Y2hpbmcgdGhlIHJlZ2lzdHJ5LlxuXG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gJ21hc3NhbWFuJ1xuXG5pbXBvcnQgeyBORUFSX01BVENIX01BWF9ORUlHSEJPUlMsIFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUgfSBmcm9tICcuL2NvbnN0YW50cy5tanMnXG5pbXBvcnQgeyB2YXJpYW50cyBhcyBtb25pa2VyVmFyaWFudHMgfSBmcm9tICcuL21vbmlrZXIubWpzJ1xuaW1wb3J0IHsgZmluZE5lYXJNYXRjaGVzIH0gZnJvbSAnLi9uZWFyLW1hdGNoLm1qcydcbmltcG9ydCB7IHZhbGlkYXRlTmFtZSB9IGZyb20gJy4vdmFsaWRhdGUubWpzJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RBdmFpbGFibGVcbiAqIEBwcm9wZXJ0eSB7J2F2YWlsYWJsZSd9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8e25hbWU6IHN0cmluZywgZGlzdGFuY2U6IG51bWJlcn0+fSBbbmVhck1hdGNoZXNdXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdFRha2VuXG4gKiBAcHJvcGVydHkgeyd0YWtlbid9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWZXJkaWN0TW9uaWtlclxuICogQHByb3BlcnR5IHsnbW9uaWtlcid9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNvbmZsaWN0c1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RVbnZlcmlmaWVkXG4gKiBAcHJvcGVydHkgeyd1bnZlcmlmaWVkJ30gc3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gdW52ZXJpZmllZCAtIHNhbXBsZSAoY2FwcGVkIGF0IFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUpXG4gKiBAcHJvcGVydHkge251bWJlcn0gdW52ZXJpZmllZFRvdGFsXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdEludmFsaWRcbiAqIEBwcm9wZXJ0eSB7J2ludmFsaWQnfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSByZWFzb25zXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdFVua25vd25cbiAqIEBwcm9wZXJ0eSB7J3Vua25vd24nfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge251bWJlcn0gaHR0cFN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtlcnJvcl1cbiAqXG4gKiBAdHlwZWRlZiB7VmVyZGljdEF2YWlsYWJsZSB8IFZlcmRpY3RUYWtlbiB8IFZlcmRpY3RNb25pa2VyIHwgVmVyZGljdFVudmVyaWZpZWQgfCBWZXJkaWN0SW52YWxpZCB8IFZlcmRpY3RVbmtub3dufSBWZXJkaWN0XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNb25pa2VyUHJvYmVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNvbmZsaWN0cyAtIGV4aXN0aW5nIG5hbWVzIHRoYXQgc2hhcmUgdGhlIGNhbmRpZGF0ZSdzIG5vcm1hbGl6ZWQgZm9ybVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gdW52ZXJpZmllZCAtIHZhcmlhbnQgbmFtZXMgd2hvc2UgbG9va3VwIGRpZG4ndCByZXR1cm4gdGFrZW4vZnJlZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVHJpYWdlUmVzdWx0XG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSB2YWxpZCAtIHN5bnRhY3RpY2FsbHkgdmFsaWQgY2FuZGlkYXRlIG5hbWVzXG4gKiBAcHJvcGVydHkge1ZlcmRpY3RJbnZhbGlkW119IGludmFsaWQgLSBhbHJlYWR5LWZvcm1lZCBpbnZhbGlkIHZlcmRpY3RzXG4gKiBAcHJvcGVydHkge1NldDxzdHJpbmc+fSBzY29wZWQgLSBzdWJzZXQgb2YgYHZhbGlkYCB3aG9zZSBuYW1lcyBhcmUgYEBzY29wZS9uYW1lYFxuICovXG5cbi8qKiBGcm96ZW4gc2VudGluZWwgZm9yIGNhbmRpZGF0ZXMgdGhhdCB3ZXJlbid0IHByb2JlZCAoZS5nLiBzY29wZWQpLiAqL1xuY29uc3QgRU1QVFlfUFJPQkUgPSBPYmplY3QuZnJlZXplKHsgY29uZmxpY3RzOiBPYmplY3QuZnJlZXplKFtdKSwgdW52ZXJpZmllZDogT2JqZWN0LmZyZWV6ZShbXSkgfSlcblxuLyoqXG4gKiBTcGxpdCBjYW5kaWRhdGVzIGludG8gc3ludGFjdGljYWxseS12YWxpZCArIGFscmVhZHktcmVqZWN0ZWQuIFRoZSBzY29wZWRcbiAqIHN1YnNldCBpcyB0YWdnZWQgc2VwYXJhdGVseSBzbyBsYXRlciBwaGFzZXMgY2FuIHNraXAgbW9uaWtlciBwcm9iaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IGNhbmRpZGF0ZXNcbiAqIEByZXR1cm5zIHtUcmlhZ2VSZXN1bHR9XG4gKiBAZXhhbXBsZVxuICogdHJpYWdlKFsndGlueS1sb2cnLCAnVGlueUxvZycsICdAbWUvZm9vJ10pXG4gKiAvLyB7IHZhbGlkOiBbJ3RpbnktbG9nJywgJ0BtZS9mb28nXSwgaW52YWxpZDogW3tzdGF0dXM6J2ludmFsaWQnLCAuLi59XSwgc2NvcGVkOiBTZXQgeyAnQG1lL2ZvbycgfSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmlhZ2UoY2FuZGlkYXRlcykge1xuICBjb25zdCB2YWxpZCA9IFtdXG4gIGNvbnN0IGludmFsaWQgPSBbXVxuICBjb25zdCBzY29wZWQgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCBuYW1lIG9mIGNhbmRpZGF0ZXMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZU5hbWUobmFtZSlcbiAgICBpZiAocmVzdWx0LmlzVmFsaWQpIHtcbiAgICAgIHZhbGlkLnB1c2gobmFtZSlcbiAgICAgIGlmIChyZXN1bHQuaXNTY29wZWQpIHNjb3BlZC5hZGQobmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgaW52YWxpZC5wdXNoKHsgc3RhdHVzOiAnaW52YWxpZCcsIG5hbWUsIHJlYXNvbnM6IHJlc3VsdC5yZWFzb25zIH0pXG4gICAgfVxuICB9XG4gIHJldHVybiB7IHZhbGlkLCBpbnZhbGlkLCBzY29wZWQgfVxufVxuXG4vKipcbiAqIFNlbGVjdCB3aGljaCB1bnNjb3BlZCwgbGl0ZXJhbC1mcmVlIGNhbmRpZGF0ZXMgc2hvdWxkIGJlIG1vbmlrZXItcHJvYmVkXG4gKiBhbmQgZW51bWVyYXRlIHRoZWlyIHZhcmlhbnRzLiBSZXR1cm5zIHRoZSB2YXJpYW50IGxpc3QgcGVyIGNhbmRpZGF0ZVxuICogcGx1cyB0aGUgZGVkdXBsaWNhdGVkIHNldCB0aGUgY2FsbGVyIHNob3VsZCBzZW5kIHRvIHRoZSByZWdpc3RyeS5cbiAqXG4gKiBAcGFyYW0ge3tcbiAqICAgdmFsaWQ6IHN0cmluZ1tdLFxuICogICBzY29wZWQ6IFNldDxzdHJpbmc+LFxuICogICBleGlzdGVuY2U6IE1hcDxzdHJpbmcsIGltcG9ydCgnLi9yZWdpc3RyeS5tanMnKS5FeGlzdGVuY2U+LFxuICogICBpc0V4aGF1c3RpdmU6IGJvb2xlYW4sXG4gKiB9fSBpbnB1dFxuICogQHJldHVybnMge3sgdmFyaWFudHNCeU5hbWU6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiwgYWxsVmFyaWFudHM6IFNldDxzdHJpbmc+IH19XG4gKiBAZXhhbXBsZVxuICogc2VsZWN0TW9uaWtlckNhbmRpZGF0ZXMoe1xuICogICB2YWxpZDogWydwaWNvbG9nJywgJ0BtZS9zY29wZWQnXSxcbiAqICAgc2NvcGVkOiBuZXcgU2V0KFsnQG1lL3Njb3BlZCddKSxcbiAqICAgZXhpc3RlbmNlOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ3BpY29sb2cnLCBzdGF0dXM6IDQwNCB9XV0pLFxuICogICBpc0V4aGF1c3RpdmU6IGZhbHNlLFxuICogfSlcbiAqIC8vIHsgdmFyaWFudHNCeU5hbWU6IE1hcCB7ICdwaWNvbG9nJyDihpIgWydwaWNvLWxvZycsICdwaWNvX2xvZycsIOKApl0gfSwgYWxsVmFyaWFudHM6IFNldCB7IC4uLiB9IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdE1vbmlrZXJDYW5kaWRhdGVzKHsgdmFsaWQsIHNjb3BlZCwgZXhpc3RlbmNlLCBpc0V4aGF1c3RpdmUgfSkge1xuICBjb25zdCB2YXJpYW50c0J5TmFtZSA9IG5ldyBNYXAoKVxuICBjb25zdCBhbGxWYXJpYW50cyA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsaWQpIHtcbiAgICBpZiAoc2NvcGVkLmhhcyhuYW1lKSkgY29udGludWVcbiAgICBjb25zdCBsaXRlcmFsID0gZXhpc3RlbmNlLmdldChuYW1lKVxuICAgIGlmIChsaXRlcmFsPy5raW5kICE9PSAnZnJlZScpIGNvbnRpbnVlXG4gICAgY29uc3QgdmFyaWFudHMgPSBtb25pa2VyVmFyaWFudHMobmFtZSwgeyBpc0V4aGF1c3RpdmUgfSlcbiAgICB2YXJpYW50c0J5TmFtZS5zZXQobmFtZSwgdmFyaWFudHMpXG4gICAgZm9yIChjb25zdCB2YXJpYW50IG9mIHZhcmlhbnRzKSBhbGxWYXJpYW50cy5hZGQodmFyaWFudClcbiAgfVxuICByZXR1cm4geyB2YXJpYW50c0J5TmFtZSwgYWxsVmFyaWFudHMgfVxufVxuXG4vKipcbiAqIEJ1Y2tldCBlYWNoIGNhbmRpZGF0ZSdzIHZhcmlhbnQgcmVzdWx0cyBpbnRvIGB7IGNvbmZsaWN0cywgdW52ZXJpZmllZCB9YC5cbiAqIFVua25vd24gcHJvYmVzIGdvIHRvIGB1bnZlcmlmaWVkYCBzbyBjYWxsZXJzIGRvbid0IGNvbmZsYXRlIFwicmVnaXN0cnlcbiAqIGNvdWxkbid0IHNheVwiIHdpdGggXCJyZWdpc3RyeSBjb25maXJtZWQgZnJlZS5cIlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2YXJpYW50c0J5TmFtZTogTWFwPHN0cmluZywgc3RyaW5nW10+LFxuICogICB2YXJpYW50UmVzdWx0czogaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZVtdLFxuICogfX0gaW5wdXRcbiAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCBNb25pa2VyUHJvYmU+fVxuICogQGV4YW1wbGVcbiAqIGFzc2VtYmxlTW9uaWtlclByb2Jlcyh7XG4gKiAgIHZhcmlhbnRzQnlOYW1lOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCBbJ3BpY28tbG9nJywgJ3BpY29fbG9nJ11dXSksXG4gKiAgIHZhcmlhbnRSZXN1bHRzOiBbXG4gKiAgICAgeyBraW5kOiAndGFrZW4nLCBuYW1lOiAncGljby1sb2cnLCBzdGF0dXM6IDIwMCB9LFxuICogICAgIHsga2luZDogJ3Vua25vd24nLCBuYW1lOiAncGljb19sb2cnLCBzdGF0dXM6IDQyOSB9LFxuICogICBdLFxuICogfSlcbiAqIC8vIE1hcCB7ICdwaWNvbG9nJyDihpIgeyBjb25mbGljdHM6IFsncGljby1sb2cnXSwgdW52ZXJpZmllZDogWydwaWNvX2xvZyddIH0gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZW1ibGVNb25pa2VyUHJvYmVzKHsgdmFyaWFudHNCeU5hbWUsIHZhcmlhbnRSZXN1bHRzIH0pIHtcbiAgY29uc3QgYnlWYXJpYW50ID0gbmV3IE1hcCh2YXJpYW50UmVzdWx0cy5tYXAoKHJlc3VsdCkgPT4gW3Jlc3VsdC5uYW1lLCByZXN1bHRdKSlcbiAgY29uc3QgcHJvYmVzID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgW25hbWUsIHZhcmlhbnRzXSBvZiB2YXJpYW50c0J5TmFtZSkge1xuICAgIGNvbnN0IGNvbmZsaWN0cyA9IFtdXG4gICAgY29uc3QgdW52ZXJpZmllZCA9IFtdXG4gICAgZm9yIChjb25zdCB2YXJpYW50IG9mIHZhcmlhbnRzKSB7XG4gICAgICBjb25zdCBraW5kID0gYnlWYXJpYW50LmdldCh2YXJpYW50KT8ua2luZFxuICAgICAgaWYgKGtpbmQgPT09ICd0YWtlbicpIGNvbmZsaWN0cy5wdXNoKHZhcmlhbnQpXG4gICAgICBlbHNlIGlmIChraW5kID09PSAndW5rbm93bicpIHVudmVyaWZpZWQucHVzaCh2YXJpYW50KVxuICAgIH1cbiAgICBwcm9iZXMuc2V0KG5hbWUsIHsgY29uZmxpY3RzLCB1bnZlcmlmaWVkIH0pXG4gIH1cbiAgcmV0dXJuIHByb2Jlc1xufVxuXG4vKipcbiAqIEJ1aWxkIHRoZSBmaW5hbCB2ZXJkaWN0IG1hcCBieSBtZXJnaW5nIHRyaWFnZSByZXN1bHRzLCByZWdpc3RyeVxuICogZXhpc3RlbmNlLCBhbmQgbW9uaWtlciBwcm9iZXMuXG4gKlxuICogQHBhcmFtIHt7XG4gKiAgIHZhbGlkOiBzdHJpbmdbXSxcbiAqICAgaW52YWxpZDogVmVyZGljdEludmFsaWRbXSxcbiAqICAgZXhpc3RlbmNlOiBNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlPixcbiAqICAgbW9uaWtlclByb2JlczogTWFwPHN0cmluZywgTW9uaWtlclByb2JlPixcbiAqIH19IGlucHV0XG4gKiBAcmV0dXJucyB7TWFwPHN0cmluZywgVmVyZGljdD59XG4gKiBAZXhhbXBsZVxuICogZGVjaWRlKHtcbiAqICAgdmFsaWQ6IFsncGljb2xvZyddLFxuICogICBpbnZhbGlkOiBbXSxcbiAqICAgZXhpc3RlbmNlOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ3BpY29sb2cnLCBzdGF0dXM6IDQwNCB9XV0pLFxuICogICBtb25pa2VyUHJvYmVzOiBuZXcgTWFwKFtbJ3BpY29sb2cnLCB7IGNvbmZsaWN0czogW10sIHVudmVyaWZpZWQ6IFsncGljb19sb2cnXSB9XV0pLFxuICogfSlcbiAqIC8vIE1hcCB7ICdwaWNvbG9nJyDihpIgeyBzdGF0dXM6ICd1bnZlcmlmaWVkJywgbmFtZTogJ3BpY29sb2cnLCB1bnZlcmlmaWVkOiBbJ3BpY29fbG9nJ10sIHVudmVyaWZpZWRUb3RhbDogMSB9IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2lkZSh7IHZhbGlkLCBpbnZhbGlkLCBleGlzdGVuY2UsIG1vbmlrZXJQcm9iZXMgfSkge1xuICBjb25zdCB2ZXJkaWN0cyA9IG5ldyBNYXAoaW52YWxpZC5tYXAoKHZlcmRpY3QpID0+IFt2ZXJkaWN0Lm5hbWUsIHZlcmRpY3RdKSlcbiAgZm9yIChjb25zdCBuYW1lIG9mIHZhbGlkKSB7XG4gICAgY29uc3QgbGl0ZXJhbCA9IGV4aXN0ZW5jZS5nZXQobmFtZSlcbiAgICAvLyB2YWxpZCBjYW5kaWRhdGVzIG11c3QgaGF2ZSBhbiBleGlzdGVuY2UgZW50cnkg4oCUIHRoZSB1cHN0cmVhbSBwaGFzZVxuICAgIC8vIGNvdmVycyBleGFjdGx5IGB2YWxpZGAuIElmIHRoaXMgZmlyZXMsIHRoZSBpbnZhcmlhbnQgYnJva2UuXG4gICAgaWYgKCFsaXRlcmFsKSB0aHJvdyBuZXcgRXJyb3IoYGRlY2lkZTogbWlzc2luZyBleGlzdGVuY2UgcmVzdWx0IGZvciAke25hbWV9YClcbiAgICB2ZXJkaWN0cy5zZXQoXG4gICAgICBuYW1lLFxuICAgICAgZGVjaWRlT25lKHsgbmFtZSwgZXhpc3RlbmNlOiBsaXRlcmFsLCBwcm9iZTogbW9uaWtlclByb2Jlcy5nZXQobmFtZSkgPz8gRU1QVFlfUFJPQkUgfSlcbiAgICApXG4gIH1cbiAgcmV0dXJuIHZlcmRpY3RzXG59XG5cbi8qKlxuICogTWFwIG9uZSBjYW5kaWRhdGUncyBleGlzdGVuY2UgKyBtb25pa2VyIHByb2JlIGludG8gYSBzaW5nbGUgVmVyZGljdC5cbiAqIFB1cmUg4oCUIG1hdGNoZXMgZXhoYXVzdGl2ZWx5IG9uIGBleGlzdGVuY2Uua2luZGAuIFdpdGhpbiBgZnJlZWAsIHRoZVxuICogdmVyZGljdCBpcyBgbW9uaWtlcmAgKGRlZmluaXRpdmUgY29sbGlzaW9uKSwgYHVudmVyaWZpZWRgIChzb21lIHZhcmlhbnRcbiAqIHByb2JlcyBmYWlsZWQgYW5kIG5vIGNvbGxpc2lvbnMgd2VyZSBkZWZpbml0aXZlbHkgZm91bmQpLCBvciBgYXZhaWxhYmxlYFxuICogKGFsbCB2YXJpYW50IHByb2JlcyBjb21wbGV0ZWQgY2xlYW5seSkuXG4gKlxuICogQHBhcmFtIHt7IG5hbWU6IHN0cmluZywgZXhpc3RlbmNlOiBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlLCBwcm9iZTogTW9uaWtlclByb2JlIH19IGlucHV0XG4gKiBAcmV0dXJucyB7VmVyZGljdH1cbiAqIEBleGFtcGxlXG4gKiBkZWNpZGVPbmUoe1xuICogICBuYW1lOiAnZXh0b29sa2l0JyxcbiAqICAgZXhpc3RlbmNlOiB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ2V4dG9vbGtpdCcsIHN0YXR1czogNDA0IH0sXG4gKiAgIHByb2JlOiB7IGNvbmZsaWN0czogW10sIHVudmVyaWZpZWQ6IFtdIH0sXG4gKiB9KVxuICogLy8geyBzdGF0dXM6ICdhdmFpbGFibGUnLCBuYW1lOiAnZXh0b29sa2l0JyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpZGVPbmUoeyBuYW1lLCBleGlzdGVuY2UsIHByb2JlIH0pIHtcbiAgcmV0dXJuIG1hdGNoKGV4aXN0ZW5jZSlcbiAgICAud2l0aCh7IGtpbmQ6ICd0YWtlbicgfSwgKCkgPT4gKHsgc3RhdHVzOiAndGFrZW4nLCBuYW1lIH0pKVxuICAgIC53aXRoKHsga2luZDogJ3Vua25vd24nIH0sIChyZXN1bHQpID0+ICh7XG4gICAgICBzdGF0dXM6ICd1bmtub3duJyxcbiAgICAgIG5hbWUsXG4gICAgICBodHRwU3RhdHVzOiByZXN1bHQuc3RhdHVzLFxuICAgICAgLi4uKHJlc3VsdC5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHsgZXJyb3I6IHJlc3VsdC5lcnJvciB9KSxcbiAgICB9KSlcbiAgICAud2l0aCh7IGtpbmQ6ICdmcmVlJyB9LCAoKSA9PiB7XG4gICAgICBpZiAocHJvYmUuY29uZmxpY3RzLmxlbmd0aCA+IDApIHJldHVybiB7IHN0YXR1czogJ21vbmlrZXInLCBuYW1lLCBjb25mbGljdHM6IHByb2JlLmNvbmZsaWN0cyB9XG4gICAgICBpZiAocHJvYmUudW52ZXJpZmllZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzOiAndW52ZXJpZmllZCcsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICB1bnZlcmlmaWVkOiBwcm9iZS51bnZlcmlmaWVkLnNsaWNlKDAsIFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUpLFxuICAgICAgICAgIHVudmVyaWZpZWRUb3RhbDogcHJvYmUudW52ZXJpZmllZC5sZW5ndGgsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHN0YXR1czogJ2F2YWlsYWJsZScsIG5hbWUgfVxuICAgIH0pXG4gICAgLmV4aGF1c3RpdmUoKVxufVxuXG4vKipcbiAqIEFubm90YXRlIGBhdmFpbGFibGVgIHZlcmRpY3RzIHdpdGggdXAgdG8gYE5FQVJfTUFUQ0hfTUFYX05FSUdIQk9SU2BcbiAqIHR5cG9zcXVhdC1zaGFwZWQgbmVpZ2hib3JzIGZyb20gdGhlIHBvcHVsYXItbmFtZXMgY29ycHVzLiBUaGUgbmFtZSBpc1xuICogc3RpbGwgcHVibGlzaGFibGU7IHRoaXMgaXMgYSBzb2Z0IHdhcm5pbmcgdGhlIHVzZXIgY2FuIG92ZXJyaWRlLlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2ZXJkaWN0czogTWFwPHN0cmluZywgVmVyZGljdD4sXG4gKiAgIGNhbmRpZGF0ZXM6IHN0cmluZ1tdLFxuICogICBjb3JwdXM6IHN0cmluZ1tdLFxuICogICBtYXhEaXN0YW5jZTogbnVtYmVyLFxuICogfX0gaW5wdXRcbiAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCBWZXJkaWN0Pn1cbiAqIEBleGFtcGxlXG4gKiBmbGFnVHlwb3NxdWF0cyh7XG4gKiAgIHZlcmRpY3RzOiBuZXcgTWFwKFtbJ2V4dG9vbGtpdCcsIHsgc3RhdHVzOiAnYXZhaWxhYmxlJywgbmFtZTogJ2V4dG9vbGtpdCcgfV1dKSxcbiAqICAgY2FuZGlkYXRlczogWydleHRvb2xraXQnXSxcbiAqICAgY29ycHVzOiBbJ2VzLXRvb2xraXQnXSxcbiAqICAgbWF4RGlzdGFuY2U6IDIsXG4gKiB9KVxuICogLy8gTWFwIHsgJ2V4dG9vbGtpdCcg4oaSIHsgc3RhdHVzOiAnYXZhaWxhYmxlJywgbmFtZTogJ2V4dG9vbGtpdCcsIG5lYXJNYXRjaGVzOiBbeyBuYW1lOiAnZXMtdG9vbGtpdCcsIGRpc3RhbmNlOiAxIH1dIH0gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhZ1R5cG9zcXVhdHMoeyB2ZXJkaWN0cywgY2FuZGlkYXRlcywgY29ycHVzLCBtYXhEaXN0YW5jZSB9KSB7XG4gIGNvbnN0IGFubm90YXRlZCA9IG5ldyBNYXAodmVyZGljdHMpXG4gIGZvciAoY29uc3QgbmFtZSBvZiBjYW5kaWRhdGVzKSB7XG4gICAgY29uc3QgdmVyZGljdCA9IGFubm90YXRlZC5nZXQobmFtZSlcbiAgICBpZiAodmVyZGljdD8uc3RhdHVzICE9PSAnYXZhaWxhYmxlJykgY29udGludWVcbiAgICBjb25zdCBtYXRjaGVzID0gZmluZE5lYXJNYXRjaGVzKG5hbWUsIGNvcnB1cywgeyBtYXhEaXN0YW5jZSB9KVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGFubm90YXRlZC5zZXQobmFtZSwgeyAuLi52ZXJkaWN0LCBuZWFyTWF0Y2hlczogbWF0Y2hlcy5zbGljZSgwLCBORUFSX01BVENIX01BWF9ORUlHSEJPUlMpIH0pXG4gICAgfVxuICB9XG4gIHJldHVybiBhbm5vdGF0ZWRcbn1cbiIsIi8vIG5wbSByZWdpc3RyeSBleGlzdGVuY2UgY2hlY2sgKyBib3VuZGVkLWNvbmN1cnJlbmN5IHJlcXVlc3QgcG9vbC5cbi8vXG4vLyBgY2hlY2tPbmVgIHJldHVybnMgYSBkaXNjcmltaW5hdGVkIGBFeGlzdGVuY2VgIHZhbHVlIChUYWtlbiAvIEZyZWUgL1xuLy8gVW5rbm93bikgc28gY2FsbGVycyBjYW4gcGF0dGVybi1tYXRjaCBpbnN0ZWFkIG9mIGRpc3BhdGNoaW5nIG9uXG4vLyBgYm9vbGVhbiB8IG51bGxgLiBUaGUgcG9vbCBydW5uZXIgaXMgYSB0aW55IHN0cnVjdHVyZWQtY29uY3VycmVuY3lcbi8vIHByaW1pdGl2ZSDigJQgbm8gZXh0ZXJuYWwgc2NoZWR1bGVyIG5lZWRlZCBmb3IgdGhlIHJlcXVlc3Qgdm9sdW1lcyB3ZSBoaXQuXG5cbmltcG9ydCB7XG4gIERFRkFVTFRfQ09OQ1VSUkVOQ1ksXG4gIERFRkFVTFRfUkVHSVNUUllfQkFTRSxcbiAgREVGQVVMVF9SRUdJU1RSWV9USU1FT1VUX01TLFxufSBmcm9tICcuL2NvbnN0YW50cy5tanMnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGFrZW5cbiAqIEBwcm9wZXJ0eSB7J3Rha2VuJ30ga2luZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7MjAwfSBzdGF0dXNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGcmVlXG4gKiBAcHJvcGVydHkgeydmcmVlJ30ga2luZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7NDA0fSBzdGF0dXNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBVbmtub3duXG4gKiBAcHJvcGVydHkgeyd1bmtub3duJ30ga2luZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGF0dXMgLSAwIHdoZW4gdGhlIG5ldHdvcmsgZmFpbGVkIG91dHJpZ2h0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Vycm9yXSAtIHByZXNlbnQgd2hlbiBzdGF0dXMgPT09IDBcbiAqXG4gKiBAdHlwZWRlZiB7VGFrZW4gfCBGcmVlIHwgVW5rbm93bn0gRXhpc3RlbmNlXG4gKi9cblxuLyoqIEByZXR1cm5zIHtUYWtlbn0gKi9cbmNvbnN0IHRha2VuID0gKG5hbWUpID0+ICh7IGtpbmQ6ICd0YWtlbicsIG5hbWUsIHN0YXR1czogMjAwIH0pXG4vKiogQHJldHVybnMge0ZyZWV9ICovXG5jb25zdCBmcmVlID0gKG5hbWUpID0+ICh7IGtpbmQ6ICdmcmVlJywgbmFtZSwgc3RhdHVzOiA0MDQgfSlcbi8qKiBAcmV0dXJucyB7VW5rbm93bn0gKi9cbmNvbnN0IHVua25vd24gPSAobmFtZSwgc3RhdHVzLCBlcnJvcikgPT5cbiAgZXJyb3IgPT09IHVuZGVmaW5lZCA/IHsga2luZDogJ3Vua25vd24nLCBuYW1lLCBzdGF0dXMgfSA6IHsga2luZDogJ3Vua25vd24nLCBuYW1lLCBzdGF0dXMsIGVycm9yIH1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgc2luZ2xlIG5hbWUgZXhpc3RzIG9uIHRoZSByZWdpc3RyeS4gTmV2ZXIgdGhyb3dzIOKAlCBldmVyeVxuICogb3V0Y29tZSAoMjAwIC8gNDA0IC8gb3RoZXIgLyBuZXR3b3JrIGVycm9yKSBtYXBzIHRvIGEgZGlzY3JpbWluYXRlZFxuICogYEV4aXN0ZW5jZWAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7eyBiYXNlPzogc3RyaW5nLCB0aW1lb3V0TXM/OiBudW1iZXIsIGZldGNoSW1wbD86IHR5cGVvZiBmZXRjaCB9fSBbb3B0c11cbiAqIEByZXR1cm5zIHtQcm9taXNlPEV4aXN0ZW5jZT59XG4gKiBAZXhhbXBsZVxuICogYXdhaXQgY2hlY2tPbmUoJ3JlYWN0JykgICAgICAgIC8vIHsga2luZDogJ3Rha2VuJywgbmFtZTogJ3JlYWN0Jywgc3RhdHVzOiAyMDAgfVxuICogYXdhaXQgY2hlY2tPbmUoJ25vdmVsLXh5eicpICAgIC8vIHsga2luZDogJ2ZyZWUnLCAgbmFtZTogJ25vdmVsLXh5eicsIHN0YXR1czogNDA0IH1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrT25lKG5hbWUsIG9wdHMgPSB7fSkge1xuICBjb25zdCBiYXNlID0gb3B0cy5iYXNlID8/IERFRkFVTFRfUkVHSVNUUllfQkFTRVxuICBjb25zdCB0aW1lb3V0TXMgPSBvcHRzLnRpbWVvdXRNcyA/PyBERUZBVUxUX1JFR0lTVFJZX1RJTUVPVVRfTVNcbiAgY29uc3QgZmV0Y2hJbXBsID0gb3B0cy5mZXRjaEltcGwgPz8gZmV0Y2hcblxuICBjb25zdCB1cmwgPSBgJHtiYXNlfS8ke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX1gXG4gIGNvbnN0IGN0cmwgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGN0cmwuYWJvcnQoKSwgdGltZW91dE1zKVxuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSW1wbCh1cmwsIHsgbWV0aG9kOiAnSEVBRCcsIHNpZ25hbDogY3RybC5zaWduYWwgfSlcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgLy8gQSBjdXN0b20gZmV0Y2hJbXBsIGNhbiByZXR1cm4gbm9uLVJlc3BvbnNlIHNoYXBlcyAoZS5nLiBhIHN0cmVhbSkuXG4gICAgLy8gR3VhcmQgdGhlIHN0YXR1cyByZWFkIHNvIGFuIHVudXNhYmxlIHJlc3BvbnNlIHN1cmZhY2VzIGFzIGB1bmtub3duYFxuICAgIC8vIHJhdGhlciB0aGFuIGVtaXR0aW5nIGB7c3RhdHVzOiB1bmRlZmluZWR9YCBhbmQgdmlvbGF0aW5nIHRoZSB0eXBlZGVmLlxuICAgIGNvbnN0IHN0YXR1cyA9IHJlcz8uc3RhdHVzXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHN0YXR1cykpIHtcbiAgICAgIHJldHVybiB1bmtub3duKG5hbWUsIDAsICdmZXRjaCByZXR1cm5lZCByZXNwb25zZSB3aXRob3V0IG51bWVyaWMgc3RhdHVzJylcbiAgICB9XG4gICAgaWYgKHN0YXR1cyA9PT0gMjAwKSByZXR1cm4gdGFrZW4obmFtZSlcbiAgICBpZiAoc3RhdHVzID09PSA0MDQpIHJldHVybiBmcmVlKG5hbWUpXG4gICAgcmV0dXJuIHVua25vd24obmFtZSwgc3RhdHVzKVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIHJldHVybiB1bmtub3duKG5hbWUsIDAsIGU/Lm1lc3NhZ2UgPz8gU3RyaW5nKGUpKVxuICB9XG59XG5cbi8qKlxuICogQm91bmRlZC1jb25jdXJyZW5jeSBwb29sIHJ1bm5lci4gUnVucyBgdGFza3NgIChmdW5jdGlvbnMgcmV0dXJuaW5nIFByb21pc2VzKVxuICogd2l0aCBhdCBtb3N0IGBjb25jdXJyZW5jeWAgaW4tZmxpZ2h0IGF0IG9uY2UuIFByZXNlcnZlcyBpbnB1dCBvcmRlci5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtBcnJheTwoKSA9PiBQcm9taXNlPFQ+Pn0gdGFza3NcbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVuY3ldXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxUW10+fVxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHRhc2tzID0gdXJscy5tYXAoKHVybCkgPT4gKCkgPT4gZmV0Y2godXJsKSlcbiAqIGNvbnN0IHJlc3BvbnNlcyA9IGF3YWl0IHBvb2wodGFza3MsIDgpICAvLyBhdCBtb3N0IDggaW4gZmxpZ2h0LCByZXN1bHRzIGluIGlucHV0IG9yZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb29sKHRhc2tzLCBjb25jdXJyZW5jeSA9IERFRkFVTFRfQ09OQ1VSUkVOQ1kpIHtcbiAgLy8gTmVnYXRpdmUgb3Igbm9uLWludGVnZXIgY29uY3VycmVuY3kgaXMgYSBjYWxsZXIgYnVnIOKAlCBmYWlsIGxvdWQgcmF0aGVyXG4gIC8vIHRoYW4gcnVubmluZyBub3RoaW5nIG9yIHByb2R1Y2luZyBhIHJlc3VsdHMgYXJyYXkgd2l0aCBob2xlcy5cbiAgaWYgKGNvbmN1cnJlbmN5ICE9IG51bGwgJiYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbmN1cnJlbmN5KSB8fCBjb25jdXJyZW5jeSA8IDApKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgcG9vbDogY29uY3VycmVuY3kgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIChnb3QgJHtjb25jdXJyZW5jeX0pYClcbiAgfVxuICAvLyBgMGAgaXMgdHJlYXRlZCBhcyBcInVzZSBkZWZhdWx0XCIg4oCUIHRoZSBwYXJzZUludCBwYXRoIGluIGNoZWNrLm1qcyBjYW5cbiAgLy8gc3VyZmFjZSAwIHdoZW4gdGhlIHVzZXIgcGFzc2VzIGAtLWNvbmN1cnJlbmN5IDBgLCB3aGljaCB3ZSByZWFkIGFzXG4gIC8vIFwibGV0IHRoZSBsaWJyYXJ5IHBpY2tcIiByYXRoZXIgdGhhbiBcImRvIG5vdCBydW5cIi5cbiAgY29uc3QgZWZmZWN0aXZlQ29uY3VycmVuY3kgPVxuICAgIE51bWJlci5pc0ludGVnZXIoY29uY3VycmVuY3kpICYmIGNvbmN1cnJlbmN5ID4gMCA/IGNvbmN1cnJlbmN5IDogREVGQVVMVF9DT05DVVJSRU5DWVxuICBjb25zdCByZXN1bHRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGFza3MubGVuZ3RoIH0pXG4gIGxldCBuZXh0ID0gMFxuICBhc3luYyBmdW5jdGlvbiB3b3JrZXIoKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGkgPSBuZXh0KytcbiAgICAgIGlmIChpID49IHRhc2tzLmxlbmd0aCkgcmV0dXJuXG4gICAgICAvLyBFYWNoIHdvcmtlciBtdXN0IGZpbmlzaCBpdHMgY3VycmVudCByZXF1ZXN0IGJlZm9yZSBjbGFpbWluZyBhbm90aGVyIHNsb3QuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgcmVzdWx0c1tpXSA9IGF3YWl0IHRhc2tzW2ldKClcbiAgICB9XG4gIH1cbiAgY29uc3Qgd29ya2VycyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IE1hdGgubWluKGVmZmVjdGl2ZUNvbmN1cnJlbmN5LCB0YXNrcy5sZW5ndGgpIH0sIHdvcmtlcilcbiAgYXdhaXQgUHJvbWlzZS5hbGwod29ya2VycylcbiAgcmV0dXJuIHJlc3VsdHNcbn1cblxuLyoqXG4gKiBDaGVjayBleGlzdGVuY2UgZm9yIGEgYmF0Y2ggb2YgbmFtZXMgd2l0aCBib3VuZGVkIGNvbmN1cnJlbmN5LiBSZXN1bHRzXG4gKiBhcmUgcmV0dXJuZWQgaW4gaW5wdXQgb3JkZXIgcmVnYXJkbGVzcyBvZiBjb21wbGV0aW9uIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IG5hbWVzXG4gKiBAcGFyYW0ge3sgY29uY3VycmVuY3k/OiBudW1iZXIsIGJhc2U/OiBzdHJpbmcsIHRpbWVvdXRNcz86IG51bWJlciwgZmV0Y2hJbXBsPzogdHlwZW9mIGZldGNoIH19IFtvcHRzXVxuICogQHJldHVybnMge1Byb21pc2U8RXhpc3RlbmNlW10+fVxuICogQGV4YW1wbGVcbiAqIGF3YWl0IGNoZWNrTWFueShbJ3JlYWN0JywgJ3Z1ZScsICdub3ZlbC14eXonXSwgeyBjb25jdXJyZW5jeTogNCB9KVxuICogLy8gW3sga2luZDogJ3Rha2VuJywgbmFtZTogJ3JlYWN0Jywg4oCmIH0sIHsga2luZDogJ3Rha2VuJywgbmFtZTogJ3Z1ZScsIOKApiB9LCB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ25vdmVsLXh5eicsIOKApiB9XVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tNYW55KG5hbWVzLCBvcHRzID0ge30pIHtcbiAgY29uc3QgdGFza3MgPSBuYW1lcy5tYXAoKG5hbWUpID0+ICgpID0+IGNoZWNrT25lKG5hbWUsIG9wdHMpKVxuICByZXR1cm4gcG9vbCh0YXNrcywgb3B0cy5jb25jdXJyZW5jeSA/PyBERUZBVUxUX0NPTkNVUlJFTkNZKVxufVxuIiwiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLy8gQ0xJIGVudHJ5IGZvciB0aGUgbnBtLW5hbWVyIHNraWxsLiBPcmNoZXN0cmF0ZXMgdGhlIHB1cmUgcGlwZWxpbmUgcGhhc2VzXG4vLyBmcm9tIGBwaXBlbGluZS5tanNgIGFnYWluc3QgdGhlIG5ldHdvcmsuIFRoZSBwaXBlbGluZTpcbi8vICAgdHJpYWdlIOKGkiBwcm9iZVJlZ2lzdHJ5IOKGkiBzZWxlY3RNb25pa2VyQ2FuZGlkYXRlcyDihpIgY2hlY2tNYW55KHZhcmlhbnRzKVxuLy8gICAgICAgICAg4oaSIGFzc2VtYmxlTW9uaWtlclByb2JlcyDihpIgZGVjaWRlIOKGkiBmbGFnVHlwb3NxdWF0c1xuLy8gYG1haW5gIHRocmVhZHMgbmFtZWQgaW50ZXJtZWRpYXRlIHZhbHVlcyB0aHJvdWdoOyBwdXJlIHRyYW5zZm9ybXMgbGl2ZVxuLy8gaW4gcGlwZWxpbmUubWpzIGFuZCBhcmUgdW5pdC10ZXN0ZWQgaW5kZXBlbmRlbnRseS5cblxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IHBhcnNlQXJncyB9IGZyb20gJ25vZGU6dXRpbCdcblxuaW1wb3J0IHsgZXJyLCBpc0VyciwgaXNPaywgb2sgfSBmcm9tICdtYXNzYW1hbidcbmltcG9ydCB7IG1hdGNoLCBQIH0gZnJvbSAnbWFzc2FtYW4nXG5cbmltcG9ydCB7XG4gIERFRkFVTFRfQ09OQ1VSUkVOQ1ksXG4gIERFRkFVTFRfTElNSVQsXG4gIE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFLFxuICBTSE9SVExJU1RfTElNSVQsXG59IGZyb20gJy4vY29uc3RhbnRzLm1qcydcbmltcG9ydCB7IGxvYWRDb3JwdXMgfSBmcm9tICcuL2NvcnB1cy5tanMnXG5pbXBvcnQgeyBwZXJtdXRlLCBzY29yZSB9IGZyb20gJy4vcGVybXV0ZS5tanMnXG5pbXBvcnQge1xuICBhc3NlbWJsZU1vbmlrZXJQcm9iZXMsXG4gIGRlY2lkZSxcbiAgZmxhZ1R5cG9zcXVhdHMsXG4gIHNlbGVjdE1vbmlrZXJDYW5kaWRhdGVzLFxuICB0cmlhZ2UsXG59IGZyb20gJy4vcGlwZWxpbmUubWpzJ1xuaW1wb3J0IHsgY2hlY2tNYW55IH0gZnJvbSAnLi9yZWdpc3RyeS5tanMnXG5cbmNvbnN0IFVTQUdFID0gYG5wbS1uYW1lciDigJQgZmluZCBhdmFpbGFibGUgbnBtIHBhY2thZ2UgbmFtZXNcblxuVXNhZ2U6XG4gIG5vZGUgY2hlY2subWpzIFtvcHRpb25zXSBbc2VlZHMuLi5dXG5cbk1vZGVzOlxuICAoc2VlZHMgZ2l2ZW4pICAgICAgICBQZXJtdXRlIHRoZSBzZWVkcywgY2hlY2sgZWFjaCBjYW5kaWRhdGUuXG4gIC0tY2hlY2sgPG5hbWVzLi4uPiAgIFNraXAgcGVybXV0YXRpb247IGNoZWNrIHRoZSBnaXZlbiBuYW1lcyBkaXJlY3RseS5cbiAgLS1zdGRpbiAgICAgICAgICAgICAgUmVhZCBuYW1lcyBmcm9tIHN0ZGluIChvbmUgcGVyIGxpbmUpOyBza2lwIHBlcm11dGF0aW9uLlxuICAtLWZpbGUgPHBhdGg+ICAgICAgICBSZWFkIG5hbWVzIGZyb20gZmlsZSAob25lIHBlciBsaW5lKTsgc2tpcCBwZXJtdXRhdGlvbi5cblxuT3B0aW9uczpcbiAgLS1saW1pdCA8bj4gICAgICAgICAgTWF4IGNhbmRpZGF0ZXMgdG8gY2hlY2sgKGRlZmF1bHQ6ICR7REVGQVVMVF9MSU1JVH0pLlxuICAtLWNvbmN1cnJlbmN5IDxuPiAgICBQYXJhbGxlbCByZWdpc3RyeSByZXF1ZXN0cyAoZGVmYXVsdDogJHtERUZBVUxUX0NPTkNVUlJFTkNZfSkuXG4gIC0tc2NvcGUgPEBzY29wZT4gICAgIEdlbmVyYXRlIHNjb3BlZCB2YXJpYW50cyAoZGVmYXVsdDogdW5zY29wZWQpLlxuICAtLW5vLW1vbmlrZXIgICAgICAgICBTa2lwIG1vbmlrZXIgY29sbGlzaW9uIGNoZWNrICh0aGUgbnBtIHB1Ymxpc2gtdGltZSBydWxlKS5cbiAgLS1leGhhdXN0aXZlICAgICAgICAgV2lkZXIgMi1pbnNlcnRpb24gbW9uaWtlciB2YXJpYW50cyAoc2xvd2VyLCBtb3JlIHRob3JvdWdoKS5cbiAgLS1uby1uZWFyLW1hdGNoICAgICAgU2tpcCB0eXBvc3F1YXQtc3R5bGUgc2ltaWxhcml0eSBjaGVjayBhZ2FpbnN0IHBvcHVsYXIgcGFja2FnZXMuXG4gIC0tbmVhci1kaXN0YW5jZSA8bj4gIE1heCBlZGl0IGRpc3RhbmNlIGZvciBuZWFyLW1hdGNoIHdhcm5pbmdzIChkZWZhdWx0OiAke05FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFfSkuXG4gIC0tanNvbiAgICAgICAgICAgICAgIE91dHB1dCBKU09OIGluc3RlYWQgb2YgdGV4dC5cbiAgLS1oZWxwLCAtaCAgICAgICAgICAgU2hvdyB0aGlzIGhlbHAuXG5cbk5hbWVzIHRoYXQgbG9vayBsaWtlIG9wdGlvbnMgKGxlYWRpbmcgaHlwaGVuKSBtdXN0IGJlIHBhc3NlZCBhZnRlciBhIGxpdGVyYWxcblxcYC0tXFxgIHNlcGFyYXRvcjpcbiAgbm9kZSBjaGVjay5tanMgLS1jaGVjayAtLSAtZm9vIC5iYXIgX2JhelxuXG5WZXJkaWN0czpcbiAg4pyTIGF2YWlsYWJsZSAgICBmcmVlIG9uIHJlZ2lzdHJ5ICsgbm8gbW9uaWtlciBjb2xsaXNpb24gKG1heSBjYXJyeSBuZWFyLW1hdGNoIHdhcm5pbmcpXG4gIOKaoCBtb25pa2VyICAgICAgZnJlZSBsaXRlcmFsbHkgYnV0IG5vcm1hbGl6ZWQgZm9ybSBjb2xsaWRlcyDigJQgbnBtIHB1Ymxpc2ggd2lsbCByZWplY3RcbiAg4pqgIHVudmVyaWZpZWQgICBmcmVlIGxpdGVyYWxseSBidXQgbW9uaWtlciBjaGVjayBpbmNvbXBsZXRlIChzb21lIHZhcmlhbnRzIGNvdWxkbid0IGJlIHByb2JlZClcbiAg4pyXIHRha2VuICAgICAgICB0aGUgZXhhY3QgbmFtZSBpcyBwdWJsaXNoZWRcbiAg4pyXIGludmFsaWQgICAgICBmYWlscyBzeW50YWN0aWMgcnVsZXNcbiAgPyB1bmtub3duICAgICAgcmVnaXN0cnkgcmV0dXJuZWQgYSBub24tMjAwLzQwNCBzdGF0dXMgZm9yIHRoZSBsaXRlcmFsIG5hbWVcblxuTGltaXRhdGlvbjpcbiAgVGhlIG1vbmlrZXIgY2hlY2sgZW51bWVyYXRlcyAxLSBhbmQgMi1zZXBhcmF0b3IgdmFyaWFudHMuIE5hbWVzIHJlcXVpcmluZ1xuICAzKyBzZXBhcmF0b3IgaW5zZXJ0aW9ucyAoZS5nLiBcXGBlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXFxgKSBjYW4gYmUgbWlzc2VkXG4gIGV2ZW4gd2l0aCAtLWV4aGF1c3RpdmUuIFRyZWF0IGV2ZXJ5IGF2YWlsYWJsZSB2ZXJkaWN0IGFzIHByb3Zpc2lvbmFsLlxuICBucG0gcHVibGlzaCAtLWRyeS1ydW4gZG9lcyBOT1QgZXhlcmNpc2UgdGhlIHJlZ2lzdHJ5J3Mgc2VydmVyLXNpZGUgbW9uaWtlclxuICBjaGVjay4gTmV2ZXIgcHVibGlzaCBqdXN0IHRvIHRlc3QgYXZhaWxhYmlsaXR5LlxuXG5FeGFtcGxlczpcbiAgbm9kZSBjaGVjay5tanMgdGlueSBsb2dcbiAgbm9kZSBjaGVjay5tanMgLS1jaGVjayBwaWNvbG9nIG1pY3JvbG9nIGpzbG9nXG4gIGVjaG8gXCJwaWNvbG9nXCIgfCBub2RlIGNoZWNrLm1qcyAtLXN0ZGluXG4gIG5vZGUgY2hlY2subWpzIC0tc2NvcGUgQG1lIGxvZ2dlciBmYXN0XG5gXG5cbmNvbnN0IFNZTUJPTFMgPSB7XG4gIGF2YWlsYWJsZTogJ+KckycsXG4gIHRha2VuOiAn4pyXJyxcbiAgbW9uaWtlcjogJ+KaoCcsXG4gIHVudmVyaWZpZWQ6ICfimqAnLFxuICBpbnZhbGlkOiAn4pyXJyxcbiAgdW5rbm93bjogJz8nLFxufVxuY29uc3QgRElWSURFUiA9ICfilIAnLnJlcGVhdCg2NClcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHBvc2l0aW9uYWxzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3VsZFNraXBQZXJtdXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBpbnB1dE5hbWVzXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGltaXRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb25jdXJyZW5jeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzY29wZV1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNNb25pa2VyRW5hYmxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0V4aGF1c3RpdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNOZWFyTWF0Y2hFbmFibGVkXG4gKiBAcHJvcGVydHkge251bWJlcn0gbmVhckRpc3RhbmNlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3VsZE91dHB1dEpzb25cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvdWxkU2hvd0hlbHBcbiAqL1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBjb25maWcgPSBwYXJzZUNsaShwcm9jZXNzLmFyZ3Yuc2xpY2UoMikpXG4gIGlmIChjb25maWcuc2hvdWxkU2hvd0hlbHApIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShVU0FHRSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHByZXBhcmVkID0gcHJlcGFyZUNhbmRpZGF0ZXMoY29uZmlnKVxuICBpZiAoaXNFcnIocHJlcGFyZWQpKSByZXR1cm4gZGllKHByZXBhcmVkLmVycm9yLm1lc3NhZ2UpXG4gIGNvbnN0IHsgc2VlZHMsIGNhbmRpZGF0ZXMsIGNvbnNpZGVyZWRDb3VudCB9ID0gcHJlcGFyZWQudmFsdWVcblxuICBjb25zdCBjb3JwdXMgPSBjb25maWcuaXNOZWFyTWF0Y2hFbmFibGVkID8gbG9hZENvcnB1cygpIDogZXJyKG5ldyBFcnJvcignZGlzYWJsZWQnKSlcbiAgY29uc3QgaGFzQ29ycHVzID0gaXNPayhjb3JwdXMpXG5cbiAgY29uc3QgeyB2YWxpZCwgaW52YWxpZCwgc2NvcGVkIH0gPSB0cmlhZ2UoY2FuZGlkYXRlcylcbiAgY29uc3QgZXhpc3RlbmNlID0gYXdhaXQgcHJvYmVSZWdpc3RyeSh2YWxpZCwgY29uZmlnKVxuICBjb25zdCBtb25pa2VyUHJvYmVzID0gY29uZmlnLmlzTW9uaWtlckVuYWJsZWRcbiAgICA/IGF3YWl0IHByb2JlTW9uaWtlckNvbGxpc2lvbnMoeyB2YWxpZCwgc2NvcGVkLCBleGlzdGVuY2UsIGNvbmZpZyB9KVxuICAgIDogbmV3IE1hcCgpXG5cbiAgY29uc3QgZGVjaWRlZCA9IGRlY2lkZSh7IHZhbGlkLCBpbnZhbGlkLCBleGlzdGVuY2UsIG1vbmlrZXJQcm9iZXMgfSlcbiAgY29uc3QgYW5ub3RhdGVkID0gaGFzQ29ycHVzXG4gICAgPyBmbGFnVHlwb3NxdWF0cyh7XG4gICAgICAgIHZlcmRpY3RzOiBkZWNpZGVkLFxuICAgICAgICBjYW5kaWRhdGVzLFxuICAgICAgICBjb3JwdXM6IGNvcnB1cy52YWx1ZS5uYW1lcyxcbiAgICAgICAgbWF4RGlzdGFuY2U6IGNvbmZpZy5uZWFyRGlzdGFuY2UsXG4gICAgICB9KVxuICAgIDogZGVjaWRlZFxuXG4gIGNvbnN0IG91dHB1dCA9IHNoYXBlT3V0cHV0KHtcbiAgICBtb2RlOiBjb25maWcuc2hvdWxkU2tpcFBlcm11dGUgPyAnY2hlY2snIDogJ2ZpbmQnLFxuICAgIHNlZWRzLFxuICAgIGNvbnNpZGVyZWRDb3VudCxcbiAgICBjYW5kaWRhdGVzLFxuICAgIHZlcmRpY3RzOiBhbm5vdGF0ZWQsXG4gICAgaXNNb25pa2VyRW5hYmxlZDogY29uZmlnLmlzTW9uaWtlckVuYWJsZWQsXG4gICAgaXNFeGhhdXN0aXZlOiBjb25maWcuaXNFeGhhdXN0aXZlLFxuICAgIGlzTmVhck1hdGNoRW5hYmxlZDogY29uZmlnLmlzTmVhck1hdGNoRW5hYmxlZCAmJiBoYXNDb3JwdXMsXG4gIH0pXG5cbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXG4gICAgY29uZmlnLnNob3VsZE91dHB1dEpzb24gPyBgJHtKU09OLnN0cmluZ2lmeShvdXRwdXQsIG51bGwsIDIpfVxcbmAgOiByZW5kZXJUZXh0KG91dHB1dClcbiAgKVxufVxuXG4vKipcbiAqIFBhcnNlIENMSSBhcmd2IGludG8gYSBzdHJ1Y3R1cmVkIGNvbmZpZy4gVGhyb3dzIG5vdGhpbmcg4oCUIGludmFsaWQgQ0xJXG4gKiB1c2FnZSBzdXJmYWNlcyBsYXRlciBhcyBhbiBlbXB0eSBpbnB1dCBvciBhIGBwcmVwYXJlQ2FuZGlkYXRlc2AgZXJyb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gYXJndlxuICogQHJldHVybnMge0NvbmZpZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ2xpKGFyZ3YpIHtcbiAgY29uc3QgeyB2YWx1ZXMsIHBvc2l0aW9uYWxzIH0gPSBwYXJzZUFyZ3Moe1xuICAgIGFyZ3M6IGFyZ3YsXG4gICAgYWxsb3dQb3NpdGlvbmFsczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBjaGVjazogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICBzdGRpbjogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICBmaWxlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICBsaW1pdDogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogU3RyaW5nKERFRkFVTFRfTElNSVQpIH0sXG4gICAgICBjb25jdXJyZW5jeTogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogU3RyaW5nKERFRkFVTFRfQ09OQ1VSUkVOQ1kpIH0sXG4gICAgICBzY29wZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgJ25vLW1vbmlrZXInOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgIGV4aGF1c3RpdmU6IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgJ25vLW5lYXItbWF0Y2gnOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgICduZWFyLWRpc3RhbmNlJzogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogU3RyaW5nKE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFKSB9LFxuICAgICAganNvbjogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICBoZWxwOiB7IHR5cGU6ICdib29sZWFuJywgc2hvcnQ6ICdoJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICB9LFxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgc2hvdWxkU2hvd0hlbHA6IHZhbHVlcy5oZWxwLFxuICAgIHBvc2l0aW9uYWxzLFxuICAgIHNob3VsZFNraXBQZXJtdXRlOiB2YWx1ZXMuY2hlY2sgfHwgdmFsdWVzLnN0ZGluIHx8IEJvb2xlYW4odmFsdWVzLmZpbGUpLFxuICAgIGlucHV0TmFtZXM6IGdhdGhlcklucHV0TmFtZXModmFsdWVzKSxcbiAgICBsaW1pdDogcGFyc2VJbnRPcih2YWx1ZXMubGltaXQsIERFRkFVTFRfTElNSVQpLFxuICAgIGNvbmN1cnJlbmN5OiBwYXJzZUludE9yKHZhbHVlcy5jb25jdXJyZW5jeSwgREVGQVVMVF9DT05DVVJSRU5DWSksXG4gICAgc2NvcGU6IHZhbHVlcy5zY29wZSxcbiAgICBpc01vbmlrZXJFbmFibGVkOiAhdmFsdWVzWyduby1tb25pa2VyJ10sXG4gICAgaXNFeGhhdXN0aXZlOiB2YWx1ZXMuZXhoYXVzdGl2ZSxcbiAgICBpc05lYXJNYXRjaEVuYWJsZWQ6ICF2YWx1ZXNbJ25vLW5lYXItbWF0Y2gnXSxcbiAgICBuZWFyRGlzdGFuY2U6IHBhcnNlSW50T3IodmFsdWVzWyduZWFyLWRpc3RhbmNlJ10sIE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFKSxcbiAgICBzaG91bGRPdXRwdXRKc29uOiB2YWx1ZXMuanNvbixcbiAgfVxufVxuXG5mdW5jdGlvbiBnYXRoZXJJbnB1dE5hbWVzKHZhbHVlcykge1xuICBpZiAodmFsdWVzLnN0ZGluKSByZXR1cm4gcmVhZExpc3RGcm9tU3RkaW4oKVxuICBpZiAodmFsdWVzLmZpbGUpIHtcbiAgICByZXR1cm4gcmVhZEZpbGVTeW5jKHZhbHVlcy5maWxlLCAndXRmOCcpXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAubWFwKChsaW5lKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgfVxuICByZXR1cm4gW11cbn1cblxuLyoqXG4gKiBSZWFkIG5ld2xpbmUtc2VwYXJhdGVkIG5hbWVzIGZyb20gc3RkaW4uIFJldHVybnMgYFtdYCBvbmx5IHdoZW4gbm90aGluZ1xuICogaXMgcGlwZWQgKGludGVyYWN0aXZlIFRUWSkuIFJlYWwgcmVhZCBmYWlsdXJlcyBidWJibGUg4oCUIHNpbGVudCBjYXRjaGVzXG4gKiBtYXNrIGRhdGEtbG9zcyBidWdzIHdlJ2QgcmF0aGVyIHNlZSB0aGFuIHN3YWxsb3cuXG4gKlxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVhZExpc3RGcm9tU3RkaW4oKSB7XG4gIGlmIChwcm9jZXNzLnN0ZGluLmlzVFRZKSByZXR1cm4gW11cbiAgcmV0dXJuIHJlYWRGaWxlU3luYygwLCAndXRmOCcpXG4gICAgLnNwbGl0KCdcXG4nKVxuICAgIC5tYXAoKGxpbmUpID0+IGxpbmUudHJpbSgpKVxuICAgIC5maWx0ZXIoQm9vbGVhbilcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnRPcihyYXcsIGZhbGxiYWNrKSB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHJhdywgMTApXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwID8gcGFyc2VkIDogZmFsbGJhY2tcbn1cblxuLyoqXG4gKiBSZXNvbHZlIHRoZSBjYW5kaWRhdGUgbGlzdCBmcm9tIHRoZSBDTEkgaW5wdXRzLiBJbiBgY2hlY2tgIG1vZGUgdGhlXG4gKiBwb3NpdGlvbmFscyArIHN0ZGluL2ZpbGUgbGluZXMgYXJlIHRoZSBjYW5kaWRhdGVzOyBpbiBgZmluZGAgbW9kZSB0aGVcbiAqIHBvc2l0aW9uYWxzIGFyZSBzZWVkcyB0aGF0IHdlIHBlcm11dGUuIEVpdGhlciBwYXRoIHJhbmtzIGFuZCB0cmltcyB0b1xuICogYGNvbmZpZy5saW1pdGAuXG4gKlxuICogYGNvbnNpZGVyZWRDb3VudGAgaXMgdGhlIHRvdGFsIGNhbmRpZGF0ZSBzcGFjZSBiZWZvcmUgdGhlIGAtLWxpbWl0YFxuICogdHJpbSDigJQgaW5wdXQgY291bnQgaW4gY2hlY2sgbW9kZSwgcGVybXV0YXRpb24gY291bnQgaW4gZmluZCBtb2RlLlxuICpcbiAqIEBwYXJhbSB7Q29uZmlnfSBjb25maWdcbiAqIEByZXR1cm5zIHtpbXBvcnQoJ21hc3NhbWFuJykuUmVzdWx0PHtzZWVkczogc3RyaW5nW10sIGNhbmRpZGF0ZXM6IHN0cmluZ1tdLCBjb25zaWRlcmVkQ291bnQ6IG51bWJlcn0sIEVycm9yPn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHByZXBhcmVDYW5kaWRhdGVzKGNvbmZpZykge1xuICBpZiAoY29uZmlnLnNob3VsZFNraXBQZXJtdXRlKSB7XG4gICAgY29uc3Qgc3VwcGxpZWQgPSBbLi4uY29uZmlnLmlucHV0TmFtZXMsIC4uLmNvbmZpZy5wb3NpdGlvbmFsc11cbiAgICAgIC5tYXAoKG5hbWUpID0+IG5hbWUudHJpbSgpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgIGlmIChzdXBwbGllZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBlcnIobmV3IEVycm9yKCdubyBuYW1lcyBwcm92aWRlZCDigJQgcGFzcyBuYW1lcyBhcyBhcmdzLCB2aWEgLS1zdGRpbiwgb3IgdmlhIC0tZmlsZScpKVxuICAgIH1cbiAgICBjb25zdCBkZWR1cGVkID0gWy4uLm5ldyBTZXQoc3VwcGxpZWQpXVxuICAgIHJldHVybiBvayh7XG4gICAgICBzZWVkczogW10sXG4gICAgICBjYW5kaWRhdGVzOiB0cmltKGRlZHVwZWQsIFtdLCBjb25maWcubGltaXQpLFxuICAgICAgY29uc2lkZXJlZENvdW50OiBkZWR1cGVkLmxlbmd0aCxcbiAgICB9KVxuICB9XG5cbiAgaWYgKGNvbmZpZy5wb3NpdGlvbmFscy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZXJyKG5ldyBFcnJvcignbm8gc2VlZHMgcHJvdmlkZWQuIFNlZSAtLWhlbHAuJykpXG4gIH1cbiAgY29uc3Qgc2VlZHMgPSBjb25maWcucG9zaXRpb25hbHNcbiAgY29uc3QgcGVybXV0ZWRDYW5kaWRhdGVzID0gWy4uLm5ldyBTZXQocGVybXV0ZShzZWVkcywgeyBzY29wZTogY29uZmlnLnNjb3BlIH0pKV1cbiAgaWYgKHBlcm11dGVkQ2FuZGlkYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAvLyBwZXJtdXRlKCkgcmVqZWN0cyBub24tYWxwaGFudW1lcmljIHRva2Vucy4gSWYgZXZlcnkgc2VlZCBnb3QgZmlsdGVyZWQsXG4gICAgLy8gZ2l2ZSB0aGUgdXNlciBhY3Rpb25hYmxlIGZlZWRiYWNrIGluc3RlYWQgb2YgYSBzaWxlbnQgemVyby1yZXN1bHQgcnVuLlxuICAgIC8vIFVzZSBgLS0gYCBiZWZvcmUgdGhlIG5hbWVzIHNvIHRoZSBsZWFkaW5nLWh5cGhlbiAvIGxlYWRpbmctZG90IGNhc2VzXG4gICAgLy8gbWFrZSBpdCB0aHJvdWdoIHBhcnNlQXJncyBhcyBwb3NpdGlvbmFscy5cbiAgICByZXR1cm4gZXJyKFxuICAgICAgbmV3IEVycm9yKFxuICAgICAgICBgYWxsIHNlZWRzIHdlcmUgZmlsdGVyZWQgKHNlZWRzIG11c3QgYmUgYWxwaGFudW1lcmljIOKAlCB0cnkgYCArXG4gICAgICAgICAgYFxcYC0tY2hlY2sgLS0gJHtzZWVkcy5qb2luKCcgJyl9XFxgIHRvIGNoZWNrIHRoZW0gYXMgbGl0ZXJhbCBuYW1lcyBpbnN0ZWFkKWBcbiAgICAgIClcbiAgICApXG4gIH1cbiAgcmV0dXJuIG9rKHtcbiAgICBzZWVkcyxcbiAgICBjYW5kaWRhdGVzOiB0cmltKHBlcm11dGVkQ2FuZGlkYXRlcywgc2VlZHMsIGNvbmZpZy5saW1pdCksXG4gICAgY29uc2lkZXJlZENvdW50OiBwZXJtdXRlZENhbmRpZGF0ZXMubGVuZ3RoLFxuICB9KVxufVxuXG5mdW5jdGlvbiB0cmltKGNhbmRpZGF0ZXMsIHNlZWRzLCBsaW1pdCkge1xuICBjb25zdCByYW5rZWQgPSBjYW5kaWRhdGVzLnRvU29ydGVkKChhLCBiKSA9PiBzY29yZShhLCBzZWVkcykgLSBzY29yZShiLCBzZWVkcykpXG4gIHJldHVybiByYW5rZWQubGVuZ3RoID4gbGltaXQgPyByYW5rZWQuc2xpY2UoMCwgbGltaXQpIDogcmFua2VkXG59XG5cbi8qKlxuICogSEVBRCBlYWNoIG5hbWUgaW4gcGFyYWxsZWwgYWdhaW5zdCB0aGUgbnBtIHJlZ2lzdHJ5LiBSZXR1cm5zIGEgbG9va3VwXG4gKiBtYXAga2V5ZWQgYnkgbmFtZTsgdmFsdWVzIGFyZSBkaXNjcmltaW5hdGVkIGBFeGlzdGVuY2VgIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBuYW1lc1xuICogQHBhcmFtIHt7IGNvbmN1cnJlbmN5OiBudW1iZXIgfX0gY29uZmlnXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlPj59XG4gKiBAcHJpdmF0ZVxuICovXG5hc3luYyBmdW5jdGlvbiBwcm9iZVJlZ2lzdHJ5KG5hbWVzLCBjb25maWcpIHtcbiAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGNoZWNrTWFueShuYW1lcywgeyBjb25jdXJyZW5jeTogY29uZmlnLmNvbmN1cnJlbmN5IH0pXG4gIHJldHVybiBuZXcgTWFwKHJlc3VsdHMubWFwKChyZXN1bHQpID0+IFtyZXN1bHQubmFtZSwgcmVzdWx0XSkpXG59XG5cbi8qKlxuICogTmV0d29yay1ib3VuZCBoYWxmIG9mIHRoZSBtb25pa2VyIGNoZWNrLiBUaGUgcHVyZSBzZWxlY3Rpb24gKyBhc3NlbWJseVxuICogbGl2ZXMgaW4gcGlwZWxpbmUubWpzOyB0aGlzIGZ1bmN0aW9uIGJyaWRnZXMgdGhlbSB3aXRoIHRoZSByZWdpc3RyeVxuICogcm91bmQtdHJpcCBpbiB0aGUgbWlkZGxlLlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2YWxpZDogc3RyaW5nW10sXG4gKiAgIHNjb3BlZDogU2V0PHN0cmluZz4sXG4gKiAgIGV4aXN0ZW5jZTogTWFwPHN0cmluZywgaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZT4sXG4gKiAgIGNvbmZpZzogeyBpc0V4aGF1c3RpdmU6IGJvb2xlYW4sIGNvbmN1cnJlbmN5OiBudW1iZXIgfSxcbiAqIH19IGlucHV0XG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcGlwZWxpbmUubWpzJykuTW9uaWtlclByb2JlPj59XG4gKiBAcHJpdmF0ZVxuICovXG5hc3luYyBmdW5jdGlvbiBwcm9iZU1vbmlrZXJDb2xsaXNpb25zKHsgdmFsaWQsIHNjb3BlZCwgZXhpc3RlbmNlLCBjb25maWcgfSkge1xuICBjb25zdCB7IHZhcmlhbnRzQnlOYW1lLCBhbGxWYXJpYW50cyB9ID0gc2VsZWN0TW9uaWtlckNhbmRpZGF0ZXMoe1xuICAgIHZhbGlkLFxuICAgIHNjb3BlZCxcbiAgICBleGlzdGVuY2UsXG4gICAgaXNFeGhhdXN0aXZlOiBjb25maWcuaXNFeGhhdXN0aXZlLFxuICB9KVxuICBjb25zdCB2YXJpYW50UmVzdWx0cyA9IGF3YWl0IGNoZWNrTWFueShbLi4uYWxsVmFyaWFudHNdLCB7IGNvbmN1cnJlbmN5OiBjb25maWcuY29uY3VycmVuY3kgfSlcbiAgcmV0dXJuIGFzc2VtYmxlTW9uaWtlclByb2Jlcyh7IHZhcmlhbnRzQnlOYW1lLCB2YXJpYW50UmVzdWx0cyB9KVxufVxuXG5mdW5jdGlvbiBzaGFwZU91dHB1dCh7XG4gIG1vZGUsXG4gIHNlZWRzLFxuICBjb25zaWRlcmVkQ291bnQsXG4gIGNhbmRpZGF0ZXMsXG4gIHZlcmRpY3RzLFxuICBpc01vbmlrZXJFbmFibGVkLFxuICBpc0V4aGF1c3RpdmUsXG4gIGlzTmVhck1hdGNoRW5hYmxlZCxcbn0pIHtcbiAgcmV0dXJuIHtcbiAgICBtb2RlLFxuICAgIHNlZWRzLFxuICAgIGNvbnNpZGVyZWQ6IGNvbnNpZGVyZWRDb3VudCxcbiAgICBjaGVja2VkOiBjYW5kaWRhdGVzLmxlbmd0aCxcbiAgICBpc01vbmlrZXJFbmFibGVkLFxuICAgIGlzRXhoYXVzdGl2ZSxcbiAgICBpc05lYXJNYXRjaEVuYWJsZWQsXG4gICAgcmVzdWx0czogY2FuZGlkYXRlcy5tYXAoKG5hbWUpID0+IHZlcmRpY3RzLmdldChuYW1lKSkuZmlsdGVyKEJvb2xlYW4pLFxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRleHQob3V0cHV0KSB7XG4gIGNvbnN0IGhlYWRlciA9XG4gICAgb3V0cHV0Lm1vZGUgPT09ICdmaW5kJ1xuICAgICAgPyBbYHNlZWRzOiAgICAke291dHB1dC5zZWVkcy5qb2luKCcsICcpfWAsIGBjb25zaWRlcmVkOiAke291dHB1dC5jb25zaWRlcmVkfSBjYW5kaWRhdGVzYF1cbiAgICAgIDogW11cbiAgaGVhZGVyLnB1c2goXG4gICAgYGNoZWNrZWQ6ICAke291dHB1dC5jaGVja2VkfSBjYW5kaWRhdGVzYCxcbiAgICBvdXRwdXQuaXNNb25pa2VyRW5hYmxlZFxuICAgICAgPyBgbW9uaWtlcjogICR7b3V0cHV0LmlzRXhoYXVzdGl2ZSA/ICdleGhhdXN0aXZlJyA6ICdzdGFuZGFyZCd9IGNvbGxpc2lvbiBjaGVja2BcbiAgICAgIDogJ21vbmlrZXI6ICBza2lwcGVkICgtLW5vLW1vbmlrZXIpJyxcbiAgICBvdXRwdXQuaXNOZWFyTWF0Y2hFbmFibGVkXG4gICAgICA/ICduZWFyOiAgICAgdHlwb3NxdWF0IHNpbWlsYXJpdHkgYWdhaW5zdCBwb3B1bGFyIHBhY2thZ2VzJ1xuICAgICAgOiAnbmVhcjogICAgIHNraXBwZWQgKC0tbm8tbmVhci1tYXRjaCknLFxuICAgIERJVklERVJcbiAgKVxuXG4gIGNvbnN0IHJvd3MgPSBvdXRwdXQucmVzdWx0cy5tYXAocmVuZGVyVmVyZGljdExpbmUpXG4gIGNvbnN0IHdpbm5lcnMgPSBvdXRwdXQucmVzdWx0cy5maWx0ZXIoKHZlcmRpY3QpID0+IHZlcmRpY3Quc3RhdHVzID09PSAnYXZhaWxhYmxlJylcbiAgY29uc3QgY2xlYW4gPSB3aW5uZXJzLmZpbHRlcigodmVyZGljdCkgPT4gIXZlcmRpY3QubmVhck1hdGNoZXM/Lmxlbmd0aClcbiAgY29uc3Qgcmlza3kgPSB3aW5uZXJzLmZpbHRlcigodmVyZGljdCkgPT4gdmVyZGljdC5uZWFyTWF0Y2hlcz8ubGVuZ3RoKVxuICBjb25zdCB1bnZlcmlmaWVkID0gb3V0cHV0LnJlc3VsdHMuZmlsdGVyKCh2ZXJkaWN0KSA9PiB2ZXJkaWN0LnN0YXR1cyA9PT0gJ3VudmVyaWZpZWQnKVxuXG4gIGNvbnN0IGNsZWFuTGFiZWwgPSBvdXRwdXQuaXNNb25pa2VyRW5hYmxlZFxuICAgID8gJ0F2YWlsYWJsZSArIG1vbmlrZXItY2xlYXIgKyBubyB0eXBvc3F1YXQgc2hhcGUnXG4gICAgOiAnQXZhaWxhYmxlICsgbm8gdHlwb3NxdWF0IHNoYXBlIChtb25pa2VyIGNoZWNrIHNraXBwZWQpJ1xuXG4gIGNvbnN0IHNlY3Rpb25zID0gW1xuICAgIHJlbmRlclNob3J0bGlzdChjbGVhbkxhYmVsLCBjbGVhbiwgKHdpbm5lcikgPT4gYCAg4oCiICR7d2lubmVyLm5hbWV9YCksXG4gICAgcmVuZGVyU2hvcnRsaXN0KFxuICAgICAgJ0F2YWlsYWJsZSBidXQgdHlwb3NxdWF0LXNoYXBlZCcsXG4gICAgICByaXNreSxcbiAgICAgICh3aW5uZXIpID0+IGAgIOKAoiAke3dpbm5lci5uYW1lfSAgfiAgJHtmb3JtYXROZWFyTWF0Y2hlcyh3aW5uZXIubmVhck1hdGNoZXMpfWAsXG4gICAgICAnIOKAlCBwdWJsaXNoYWJsZSwgYnV0IGNsb3NlIHRvIHBvcHVsYXIgcGFja2FnZXMnXG4gICAgKSxcbiAgICByZW5kZXJTaG9ydGxpc3QoXG4gICAgICAnTW9uaWtlciBjaGVjayBpbmNvbXBsZXRlJyxcbiAgICAgIHVudmVyaWZpZWQsXG4gICAgICAodmVyZGljdCkgPT5cbiAgICAgICAgYCAg4oCiICR7dmVyZGljdC5uYW1lfSAgKCR7dmVyZGljdC51bnZlcmlmaWVkVG90YWx9IHZhcmlhbnQke3ZlcmRpY3QudW52ZXJpZmllZFRvdGFsID09PSAxID8gJycgOiAncyd9IG5vdCBwcm9iZWQpYCxcbiAgICAgICcg4oCUIHJldHJ5IGZhaWxlZCBwcm9iZXM7IGF2YWlsYWJpbGl0eSByZW1haW5zIHByb3Zpc2lvbmFsJ1xuICAgICksXG4gIF0uZmlsdGVyKEJvb2xlYW4pXG5cbiAgY29uc3QgZm9vdGVyID1cbiAgICBjbGVhbi5sZW5ndGggPT09IDAgJiYgcmlza3kubGVuZ3RoID09PSAwICYmIHVudmVyaWZpZWQubGVuZ3RoID09PSAwXG4gICAgICA/IFtESVZJREVSLCAnTm8gYXZhaWxhYmxlICsgbW9uaWtlci1jbGVhciBjYW5kaWRhdGVzLiBUcnkgYnJvYWRlciBzZWVkcyBvciAtLXNjb3BlLiddXG4gICAgICA6IFtdXG5cbiAgcmV0dXJuIFsuLi5oZWFkZXIsIC4uLnJvd3MsIC4uLnNlY3Rpb25zLCAuLi5mb290ZXJdLmpvaW4oJ1xcbicpICsgJ1xcbidcbn1cblxuZnVuY3Rpb24gcmVuZGVyVmVyZGljdExpbmUodmVyZGljdCkge1xuICBjb25zdCB0YWcgPSBgJHtTWU1CT0xTW3ZlcmRpY3Quc3RhdHVzXX0gJHt2ZXJkaWN0LnN0YXR1c31gLnBhZEVuZCgxNClcbiAgY29uc3QgbmFtZSA9IHZlcmRpY3QubmFtZS5wYWRFbmQoMjgpXG4gIGNvbnN0IGRldGFpbCA9IG1hdGNoKHZlcmRpY3QpXG4gICAgLndpdGgoeyBzdGF0dXM6ICd0YWtlbicgfSwgKCkgPT4gJycpXG4gICAgLndpdGgoeyBzdGF0dXM6ICdtb25pa2VyJyB9LCAocmVzdWx0KSA9PiBgY29sbGlkZXMgd2l0aDogJHtyZXN1bHQuY29uZmxpY3RzLmpvaW4oJywgJyl9YClcbiAgICAud2l0aChcbiAgICAgIHsgc3RhdHVzOiAndW52ZXJpZmllZCcgfSxcbiAgICAgIChyZXN1bHQpID0+XG4gICAgICAgIGBtb25pa2VyIGluY29tcGxldGU6ICR7cmVzdWx0LnVudmVyaWZpZWRUb3RhbH0gdmFyaWFudCR7cmVzdWx0LnVudmVyaWZpZWRUb3RhbCA9PT0gMSA/ICcnIDogJ3MnfSBub3QgcHJvYmVkYFxuICAgIClcbiAgICAud2l0aCh7IHN0YXR1czogJ2ludmFsaWQnIH0sIChyZXN1bHQpID0+IGAoJHtyZXN1bHQucmVhc29ucy5qb2luKCc7ICcpfSlgKVxuICAgIC53aXRoKFxuICAgICAgeyBzdGF0dXM6ICd1bmtub3duJyB9LFxuICAgICAgKHJlc3VsdCkgPT4gYChodHRwICR7cmVzdWx0Lmh0dHBTdGF0dXN9JHtyZXN1bHQuZXJyb3IgPyBgOiAke3Jlc3VsdC5lcnJvcn1gIDogJyd9KWBcbiAgICApXG4gICAgLndpdGgoXG4gICAgICB7IHN0YXR1czogJ2F2YWlsYWJsZScsIG5lYXJNYXRjaGVzOiBQLmFycmF5KCkgfSxcbiAgICAgIChyZXN1bHQpID0+IGBuZWFyOiAke2Zvcm1hdE5lYXJNYXRjaGVzKHJlc3VsdC5uZWFyTWF0Y2hlcyl9YFxuICAgIClcbiAgICAud2l0aCh7IHN0YXR1czogJ2F2YWlsYWJsZScgfSwgKCkgPT4gJycpXG4gICAgLmV4aGF1c3RpdmUoKVxuICByZXR1cm4gYCR7dGFnfSR7bmFtZX0ke2RldGFpbH1gXG59XG5cbmZ1bmN0aW9uIGZvcm1hdE5lYXJNYXRjaGVzKG1hdGNoZXMpIHtcbiAgcmV0dXJuIG1hdGNoZXMubWFwKChuZWlnaGJvcikgPT4gYCR7bmVpZ2hib3IubmFtZX0gKGQ9JHtuZWlnaGJvci5kaXN0YW5jZX0pYCkuam9pbignLCAnKVxufVxuXG5mdW5jdGlvbiByZW5kZXJTaG9ydGxpc3QobGFiZWwsIGl0ZW1zLCBsaW5lRm4sIHN1ZmZpeCA9ICcnKSB7XG4gIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBudWxsXG4gIGNvbnN0IGhlYWRlciA9IGAke0RJVklERVJ9XFxuJHtsYWJlbH0gKCR7aXRlbXMubGVuZ3RofSkke3N1ZmZpeH06YFxuICBjb25zdCBib2R5ID0gaXRlbXMuc2xpY2UoMCwgU0hPUlRMSVNUX0xJTUlUKS5tYXAobGluZUZuKS5qb2luKCdcXG4nKVxuICBjb25zdCBtb3JlID1cbiAgICBpdGVtcy5sZW5ndGggPiBTSE9SVExJU1RfTElNSVQgPyBgXFxuICDigKYgYW5kICR7aXRlbXMubGVuZ3RoIC0gU0hPUlRMSVNUX0xJTUlUfSBtb3JlYCA6ICcnXG4gIHJldHVybiBgJHtoZWFkZXJ9XFxuJHtib2R5fSR7bW9yZX1gXG59XG5cbmZ1bmN0aW9uIGRpZShtZXNzYWdlKSB7XG4gIHByb2Nlc3Muc3RkZXJyLndyaXRlKGBlcnJvcjogJHttZXNzYWdlfVxcblxcblJ1biAtLWhlbHAgZm9yIHVzYWdlLlxcbmApXG4gIHByb2Nlc3MuZXhpdCgyKVxufVxuXG5tYWluKCkuY2F0Y2goKGVycm9yKSA9PiB7XG4gIHByb2Nlc3Muc3RkZXJyLndyaXRlKGBlcnJvcjogJHtlcnJvcj8uc3RhY2sgPz8gZXJyb3J9XFxuYClcbiAgcHJvY2Vzcy5leGl0KDEpXG59KVxuIl0sImlnbm9yZUxpc3QiOlswLDEsMiwzLDgsMTAsMTFdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxTQUFTLE1BQU0sR0FBRztDQUNqQixPQUFPLEtBQUs7QUFDYjs7QUN0QkEsTUFBTSxJQUFFLE9BQU8sSUFBSSxxQkFBcUI7QUFBRSxNQUFBLElBQUUsT0FBTyxJQUFJLHdCQUF3QjtBQUFFLE1BQUEsSUFBRTtBQUFtQyxNQUFBLEtBQUUsTUFBRyxRQUFRLEtBQUcsWUFBVSxPQUFPLENBQUM7QUFBRSxNQUFBLEtBQUUsTUFBRyxLQUFHLENBQUMsQ0FBQyxFQUFFO0FBQUcsTUFBQSxLQUFHLEdBQUUsR0FBRSxNQUFJO0NBQUMsSUFBRyxFQUFFLENBQUMsR0FBRTtFQUFDLE1BQWUsRUFBQyxTQUFRLEdBQUUsWUFBVyxNQUE3QixFQUFFLEVBQUUsQ0FBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztFQUFFLE9BQU8sS0FBRyxLQUFHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFRLE1BQUcsRUFBRSxHQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUU7Q0FBQztDQUFDLElBQUcsRUFBRSxDQUFDLEdBQUU7RUFBQyxJQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsT0FBTSxDQUFDO0VBQUUsSUFBRyxNQUFNLFFBQVEsQ0FBQyxHQUFFO0dBQUMsSUFBRyxDQUFDLE1BQU0sUUFBUSxDQUFDLEdBQUUsT0FBTSxDQUFDO0dBQUUsSUFBSSxJQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxJQUFFLENBQUM7R0FBRSxLQUFJLE1BQU0sS0FBSyxFQUFFLEtBQUssR0FBRTtJQUFDLE1BQU0sSUFBRSxFQUFFO0lBQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxLQUFHLEVBQUUsS0FBSyxDQUFDLElBQUUsRUFBRSxTQUFPLEVBQUUsS0FBSyxDQUFDLElBQUUsRUFBRSxLQUFLLENBQUM7R0FBQztHQUFDLElBQUcsRUFBRSxRQUFPO0lBQUMsSUFBRyxFQUFFLFNBQU8sR0FBRSxNQUFNLElBQUksTUFBTSwwRkFBMEY7SUFBRSxJQUFHLEVBQUUsU0FBTyxFQUFFLFNBQU8sRUFBRSxRQUFPLE9BQU0sQ0FBQztJQUFFLE1BQU0sSUFBRSxFQUFFLE1BQU0sR0FBRSxFQUFFLE1BQU0sR0FBRSxJQUFFLE1BQUksRUFBRSxTQUFPLENBQUMsSUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRSxJQUFFLEVBQUUsTUFBTSxFQUFFLFFBQU8sTUFBSSxFQUFFLFNBQU8sV0FBUyxDQUFDLEVBQUUsTUFBTTtJQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFHLENBQUMsQ0FBQyxLQUFHLEVBQUUsT0FBTyxHQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRyxDQUFDLENBQUMsTUFBSSxNQUFJLEVBQUUsVUFBUSxFQUFFLEVBQUUsSUFBRyxHQUFFLENBQUM7R0FBRTtHQUFDLE9BQU8sRUFBRSxXQUFTLEVBQUUsVUFBUSxFQUFFLE9BQU8sR0FBRSxNQUFJLEVBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQyxDQUFDO0VBQUM7RUFBQyxPQUFPLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFNLE1BQUc7R0FBQyxNQUFNLElBQUUsRUFBRTtHQUFHLFFBQU8sS0FBSyxLQUFHLEVBQUUsSUFBRSxDQUFDLEtBQUcsZUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWMsRUFBRSxHQUFFLEVBQUUsSUFBRyxDQUFDO09BQU07RUFBQyxDQUFDO0NBQUM7Q0FBQyxPQUFPLE9BQU8sR0FBRyxHQUFFLENBQUM7QUFBQztBQUFFLE1BQUEsS0FBRSxNQUFHO0NBQUMsSUFBSSxHQUFFLEdBQUU7Q0FBRSxPQUFPLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLFNBQU8sSUFBRSxTQUFPLEtBQUcsSUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFBLENBQUcsb0JBQWtCLEtBQUssSUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFHLElBQUUsQ0FBQyxJQUFFLE1BQU0sUUFBUSxDQUFDLElBQUUsRUFBRSxHQUFFLENBQUMsSUFBRSxFQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUUsQ0FBQyxJQUFFLENBQUM7QUFBQztBQUFFLE1BQUEsS0FBRyxHQUFFLE1BQUksRUFBRSxRQUFRLEdBQUUsTUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7QUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFFO0NBQUMsSUFBRyxNQUFJLEVBQUUsUUFBTztFQUFDLE1BQUssQ0FBQyxLQUFHO0VBQUUsUUFBTyxNQUFHLEVBQUUsR0FBRSxTQUFNLENBQUMsQ0FBQztDQUFDO0NBQUMsSUFBRyxNQUFJLEVBQUUsUUFBTztFQUFDLE1BQUssQ0FBQyxHQUFFLEtBQUc7RUFBRSxPQUFPLEVBQUUsR0FBRSxTQUFNLENBQUMsQ0FBQztDQUFDO0NBQUMsTUFBTSxJQUFJLE1BQU0sb0ZBQW9GLEVBQUUsT0FBTyxFQUFFO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU8sT0FBTyxPQUFPLEdBQUU7RUFBQyxnQkFBYSxFQUFFLENBQUM7RUFBRSxNQUFJLE1BQUcsRUFBRSxHQUFFLENBQUM7RUFBRSxLQUFHLE1BQUcsRUFBRSxHQUFFLENBQUM7RUFBRSxTQUFPLE1BQUcsS0FBSyxNQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxHQUFFLENBQUM7Q0FBQyxDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU8sT0FBTyxTQUFRLE1BQUcsT0FBTyxPQUFPLEdBQUUsRUFBQyxDQUFDLE9BQU8sWUFBVztFQUFDLElBQUksSUFBRTtFQUFFLE1BQU0sSUFBRSxDQUFDO0dBQUMsT0FBTSxPQUFPLE9BQU8sR0FBRSxHQUFFLElBQUcsQ0FBQyxFQUFDLENBQUM7R0FBRSxNQUFLLENBQUM7RUFBQyxHQUFFO0dBQUMsTUFBSyxDQUFDO0dBQUUsT0FBTSxLQUFLO0VBQUMsQ0FBQztFQUFFLE9BQU0sRUFBQyxZQUFTO0dBQUMsSUFBSTtHQUFFLE9BQU8sU0FBTyxJQUFFLEVBQUUsUUFBTSxJQUFFLEVBQUUsR0FBRyxFQUFFO0VBQUMsRUFBQztDQUFDLEVBQUMsQ0FBQyxFQUFBLENBQUcsQ0FBQyxHQUFFO0VBQUMsZ0JBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUFFLFNBQU8sTUFBRyxFQUFFLEtBQUssTUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7Q0FBQyxDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7RUFBQyxRQUFNLE1BQUc7R0FBQyxJQUFJLElBQUUsQ0FBQztHQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7SUFBQyxFQUFFLEtBQUc7R0FBQztHQUFFLE9BQU8sS0FBSyxNQUFJLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFRLE1BQUcsRUFBRSxHQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUU7SUFBQyxTQUFRLENBQUM7SUFBRSxZQUFXO0dBQUMsS0FBRztJQUFDLFNBQVEsRUFBRSxHQUFFLEdBQUUsQ0FBQztJQUFFLFlBQVc7R0FBQztFQUFDO0VBQUUsd0JBQXFCLEVBQUUsQ0FBQztFQUFFLGFBQVk7Q0FBVSxHQUFFLENBQUM7QUFBQztBQUFDLE1BQU0sS0FBRyxHQUFFLE1BQUk7Q0FBQyxLQUFJLE1BQU0sS0FBSyxHQUFFLElBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRSxPQUFNLENBQUM7Q0FBRSxPQUFNLENBQUM7QUFBQztBQUFFLE1BQUEsS0FBRyxHQUFFLE1BQUk7Q0FBQyxLQUFJLE1BQUssQ0FBQyxHQUFFLE1BQUssRUFBRSxRQUFRLEdBQUUsSUFBRyxDQUFDLEVBQUUsR0FBRSxDQUFDLEdBQUUsT0FBTSxDQUFDO0NBQUUsT0FBTSxDQUFDO0FBQUM7QUFBRSxNQUFBLEtBQUcsR0FBRSxNQUFJO0NBQUMsTUFBTSxJQUFFLFFBQVEsUUFBUSxDQUFDO0NBQUUsS0FBSSxNQUFNLEtBQUssR0FBRSxJQUFHLENBQUMsRUFBRSxHQUFFLEVBQUUsRUFBRSxHQUFFLE9BQU0sQ0FBQztDQUFFLE9BQU0sQ0FBQztBQUFDO0FBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRTtDQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7RUFBQyxRQUFNLE1BQUc7R0FBQyxJQUFJLElBQUUsQ0FBQztHQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7SUFBQyxFQUFFLEtBQUc7R0FBQztHQUFFLE9BQU07SUFBQyxTQUFRLEVBQUUsT0FBTSxNQUFHLEVBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztJQUFFLFlBQVc7R0FBQztFQUFDO0VBQUUsd0JBQXFCLEVBQUUsR0FBRSxDQUFDO0VBQUUsYUFBWTtDQUFLLEdBQUUsQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRTtDQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7RUFBQyxRQUFNLE1BQUc7R0FBQyxJQUFJLElBQUUsQ0FBQztHQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7SUFBQyxFQUFFLEtBQUc7R0FBQztHQUFFLE9BQU8sRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVEsTUFBRyxFQUFFLEdBQUUsS0FBSyxDQUFDLENBQUMsR0FBRTtJQUFDLFNBQVEsRUFBRSxNQUFLLE1BQUcsRUFBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQUUsWUFBVztHQUFDO0VBQUM7RUFBRSx3QkFBcUIsRUFBRSxHQUFFLENBQUM7RUFBRSxhQUFZO0NBQUksR0FBRSxDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU0sR0FBRSxXQUFRLEVBQUMsUUFBTSxPQUFJLEVBQUMsU0FBUSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRSxHQUFFO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRyxHQUFFO0NBQUMsTUFBTSxJQUFFLFlBQVUsT0FBTyxFQUFFLEtBQUcsRUFBRSxLQUFHLEtBQUssR0FBRSxJQUFFLE1BQUksRUFBRSxTQUFPLEVBQUUsS0FBRyxZQUFVLE9BQU8sRUFBRSxLQUFHLEtBQUssSUFBRSxFQUFFO0NBQUcsT0FBTyxFQUFFLEdBQUUsV0FBUTtFQUFDLFFBQU0sTUFBRztHQUFDLElBQUksSUFBRSxHQUFFLFFBQU0sSUFBRSxJQUFFLElBQUcsRUFBQztHQUFFLE9BQU07SUFBQyxTQUFRLEtBQUssTUFBSSxLQUFHLEVBQUUsR0FBRSxJQUFHLEdBQUUsTUFBSTtLQUFDLEVBQUUsS0FBRztJQUFDLENBQUM7SUFBRSxZQUFXO0dBQUM7RUFBQztFQUFFLHdCQUFxQixDQUFDLFFBQU0sSUFBRSxJQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxNQUFJLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsR0FBRSxDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU0sQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFNLFlBQVUsT0FBTztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFNLFlBQVUsT0FBTztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFNLFlBQVUsT0FBTztBQUFDO0FBQUMsTUFBTSxJQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFBRSxNQUFBLElBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFFLE1BQUEsSUFBRTtBQUFFLE1BQUEsS0FBRSxNQUFHLE9BQU8sT0FBTyxFQUFFLENBQUMsR0FBRTtDQUFDLGFBQVcsTUFBRztFQUFDLE9BQU8sRUFBRSxFQUFFLElBQUcsSUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztNQUFNO0NBQUM7Q0FBRSxXQUFTLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7TUFBTTtDQUFDO0NBQUUsWUFBVSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsVUFBUSxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLFNBQU8sTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFdBQVMsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxZQUFVLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxVQUFRLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsV0FBUyxNQUFHO0VBQUMsT0FBTyxFQUFFLEVBQUUsSUFBRyxJQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO01BQU07Q0FBQztDQUFFLFFBQU0sTUFBRztFQUFDLE9BQU8sRUFBRSxFQUFFLElBQUcsSUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7TUFBTTtDQUFDO0FBQUMsQ0FBQztBQUFFLE1BQUEsSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsTUFBQSxLQUFFLE1BQUcsT0FBTyxPQUFPLEVBQUUsQ0FBQyxHQUFFO0NBQUMsVUFBUyxHQUFFLE1BQUksRUFBRSxFQUFFLEtBQUksR0FBRSxNQUFJLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxLQUFHLEtBQUcsS0FBRyxDQUFDLEVBQUEsQ0FBRyxHQUFFLENBQUMsQ0FBQyxDQUFDO0NBQUUsS0FBRyxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxLQUFHLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLE1BQUksTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxLQUFHLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsTUFBSSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEtBQUcsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxXQUFRLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUFFLGNBQVcsRUFBRSxFQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQUUsZ0JBQWEsRUFBRSxFQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxDQUFDLENBQUM7Q0FBRSxnQkFBYSxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztBQUFDLENBQUM7QUFBRSxNQUFBLElBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFFLE1BQUEsS0FBRSxNQUFHLE9BQU8sT0FBTyxFQUFFLENBQUMsR0FBRTtDQUFDLFVBQVMsR0FBRSxNQUFJLEVBQUUsRUFBRSxLQUFJLEdBQUUsTUFBSSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsS0FBRyxLQUFHLEtBQUcsQ0FBQyxFQUFBLENBQUcsR0FBRSxDQUFDLENBQUMsQ0FBQztDQUFFLEtBQUcsTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsS0FBRyxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxNQUFJLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsS0FBRyxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLE1BQUksTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxLQUFHLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsZ0JBQWEsRUFBRSxFQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxDQUFDLENBQUM7Q0FBRSxnQkFBYSxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztBQUFDLENBQUM7QUFBaUwsSUFBSSxJQUFFO0NBQUMsV0FBVTtDQUFLLFNBQVE7Q0FBRSxVQUFTO0NBQUUsT0FBTSxTQUFTLEdBQUcsR0FBRTtFQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7R0FBQyxRQUFNLE1BQUc7SUFBQyxJQUFHLENBQUMsTUFBTSxRQUFRLENBQUMsR0FBRSxPQUFNLEVBQUMsU0FBUSxDQUFDLEVBQUM7SUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLE9BQU0sRUFBQyxTQUFRLENBQUMsRUFBQztJQUFFLE1BQU0sSUFBRSxFQUFFO0lBQUcsSUFBSSxJQUFFLENBQUM7SUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFRLE1BQUc7S0FBQyxFQUFFLEtBQUcsQ0FBQztJQUFDLENBQUMsR0FBRTtLQUFDLFNBQVEsQ0FBQztLQUFFLFlBQVc7SUFBQztJQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7S0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLENBQUMsRUFBQSxDQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFBQztJQUFFLE9BQU07S0FBQyxTQUFRLEVBQUUsT0FBTSxNQUFHLEVBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztLQUFFLFlBQVc7SUFBQztHQUFDO0dBQUUsd0JBQXFCLE1BQUksRUFBRSxTQUFPLENBQUMsSUFBRSxFQUFFLEVBQUUsRUFBRTtFQUFDLEdBQUUsQ0FBQztDQUFDO0NBQUUsS0FBSSxTQUFTLEdBQUcsR0FBRTtFQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7R0FBQyxRQUFNLE1BQUc7SUFBQyxJQUFHLEVBQUUsYUFBYSxNQUFLLE9BQU0sRUFBQyxTQUFRLENBQUMsRUFBQztJQUFFLElBQUksSUFBRSxDQUFDO0lBQUUsSUFBRyxNQUFJLEVBQUUsTUFBSyxPQUFNO0tBQUMsU0FBUSxDQUFDO0tBQUUsWUFBVztJQUFDO0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxPQUFNLEVBQUMsU0FBUSxDQUFDLEVBQUM7SUFBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0tBQUMsRUFBRSxNQUFJLEVBQUUsTUFBSSxDQUFDLEVBQUEsQ0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQUMsR0FBRSxJQUFFLEVBQUU7SUFBRyxPQUFNO0tBQUMsU0FBUSxFQUFFLElBQUUsTUFBRyxFQUFFLEdBQUUsR0FBRSxDQUFDLENBQUM7S0FBRSxZQUFXO0lBQUM7R0FBQztHQUFFLHdCQUFxQixNQUFJLEVBQUUsU0FBTyxDQUFDLElBQUUsRUFBRSxFQUFFLEVBQUU7RUFBQyxHQUFFLENBQUM7Q0FBQztDQUFFLEtBQUksU0FBUyxHQUFHLEdBQUU7RUFBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0dBQUMsUUFBTSxNQUFHO0lBQUMsSUFBRyxFQUFFLGFBQWEsTUFBSyxPQUFNLEVBQUMsU0FBUSxDQUFDLEVBQUM7SUFBRSxJQUFJLElBQUUsQ0FBQztJQUFFLElBQUcsTUFBSSxFQUFFLE1BQUssT0FBTTtLQUFDLFNBQVEsQ0FBQztLQUFFLFlBQVc7SUFBQztJQUFFLE1BQU0sS0FBRyxHQUFFLE1BQUk7S0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLENBQUMsRUFBQSxDQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFBQztJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sT0FBTSxFQUFDLFNBQVEsQ0FBQyxFQUFDO0lBQUUsSUFBSTtJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sTUFBTSxJQUFJLE1BQU0sNEVBQTRFLFNBQU8sSUFBRSxFQUFFLE1BQUksS0FBSyxJQUFFLEVBQUUsU0FBUyxHQUFHO0lBQUUsTUFBSyxDQUFDLEdBQUUsS0FBRztJQUFFLE9BQU07S0FBQyxTQUFRLEVBQUUsSUFBRyxHQUFFLE1BQUk7TUFBQyxNQUFNLElBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQztNQUFFLE9BQU8sS0FBRztLQUFDLENBQUM7S0FBRSxZQUFXO0lBQUM7R0FBQztHQUFFLHdCQUFxQixNQUFJLEVBQUUsU0FBTyxDQUFDLElBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQUMsR0FBRSxDQUFDO0NBQUM7Q0FBRSxRQUFPLFNBQVMsR0FBRyxHQUFFO0VBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtHQUFDLFFBQU0sTUFBRztJQUFDLElBQUcsU0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUUsT0FBTSxFQUFDLFNBQVEsQ0FBQyxFQUFDO0lBQUUsSUFBSTtJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sTUFBTSxJQUFJLE1BQU0sMEZBQTBGLFNBQU8sSUFBRSxFQUFFLE1BQUksS0FBSyxJQUFFLEVBQUUsU0FBUyxHQUFHO0lBQUUsSUFBSSxJQUFFLENBQUM7SUFBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0tBQUMsRUFBRSxNQUFJLEVBQUUsTUFBSSxDQUFDLEVBQUEsQ0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQUMsR0FBRSxDQUFDLEdBQUUsS0FBRyxNQUFJLEVBQUUsU0FBTyxDQUFDLEdBQUUsRUFBRSxFQUFFLElBQUU7SUFBRSxPQUFNO0tBQUMsU0FBUSxFQUFFLElBQUcsR0FBRSxNQUFJO01BQUMsTUFBTSxJQUFFLFlBQVUsT0FBTyxLQUFHLE9BQU8sTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFFLE9BQUssT0FBTyxDQUFDLEdBQUUsSUFBRSxTQUFPLEtBQUcsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQztNQUFFLFFBQU8sS0FBRyxNQUFJO0tBQUMsQ0FBQztLQUFFLFlBQVc7SUFBQztHQUFDO0dBQUUsd0JBQXFCLE1BQUksRUFBRSxTQUFPLENBQUMsSUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFBQyxHQUFFLENBQUM7Q0FBQztDQUFFLGNBQWE7Q0FBRSxPQUFNO0NBQUUsS0FBSSxTQUFTLEdBQUU7RUFBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0dBQUMsUUFBTSxPQUFJLEVBQUMsU0FBUSxDQUFDLEVBQUUsR0FBRSxTQUFNLENBQUMsQ0FBQyxFQUFDO0dBQUcsd0JBQXFCLENBQUM7R0FBRSxhQUFZO0VBQUssR0FBRSxDQUFDO0NBQUM7Q0FBRSxNQUFLO0NBQUUsUUFBTztDQUFFLEtBQUk7Q0FBRSxTQUFRO0NBQUUsR0FBRTtDQUFFLFFBQU87Q0FBRSxRQUFPO0NBQUUsUUFBcHRFLEVBQUUsRUFBRSxDQUFDLENBQXN0RTtDQUFFLFNBQW50RSxFQUFFLEVBQUUsU0FBUyxHQUFFO0VBQUMsT0FBTSxhQUFXLE9BQU87Q0FBQyxDQUFDLENBQWlyRTtDQUFFLFFBQTlxRSxFQUFFLEVBQUUsU0FBUyxHQUFFO0VBQUMsT0FBTSxZQUFVLE9BQU87Q0FBQyxDQUFDLENBQTRvRTtDQUFFLFNBQXpvRSxFQUFFLEVBQUUsU0FBUyxHQUFFO0VBQUMsT0FBTyxRQUFNO0NBQUMsQ0FBQyxDQUFrbkU7Q0FBRSxhQUEvbUUsRUFBRSxFQUFFLFNBQVMsR0FBRTtFQUFDLE9BQU8sUUFBTTtDQUFDLENBQUMsQ0FBNGxFO0NBQUUsWUFBVyxTQUFTLEdBQUU7RUFBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEdBQUU7R0FBQyxRQUFPLE1BQUcsYUFBYTtFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FBQztDQUFFLE9BQU0sU0FBUyxHQUFFO0VBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUFDO0FBQUM7QUFBRSxJQUFNLElBQU4sY0FBZ0IsTUFBSztDQUFDLFlBQVksR0FBRTtFQUFDLElBQUk7RUFBRSxJQUFHO0dBQUMsSUFBRSxLQUFLLFVBQVUsQ0FBQztFQUFDLFNBQU8sR0FBRTtHQUFDLElBQUU7RUFBQztFQUFDLE1BQU0sb0RBQW9ELEdBQUcsR0FBRSxLQUFLLFFBQU0sS0FBSyxHQUFFLEtBQUssUUFBTTtDQUFDO0FBQUM7QUFBQyxNQUFNLElBQUU7Q0FBQyxTQUFRLENBQUM7Q0FBRSxPQUFNLEtBQUs7QUFBQztBQUFFLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTyxJQUFJLEVBQUUsR0FBRSxDQUFDO0FBQUM7QUFBQyxJQUFNLElBQU4sTUFBTSxFQUFDO0NBQUMsWUFBWSxHQUFFLEdBQUU7RUFBQyxLQUFLLFFBQU0sS0FBSyxHQUFFLEtBQUssUUFBTSxLQUFLLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNO0NBQUM7Q0FBQyxLQUFLLEdBQUcsR0FBRTtFQUFDLElBQUcsS0FBSyxNQUFNLFNBQVEsT0FBTztFQUFLLE1BQU0sSUFBRSxFQUFFLEVBQUUsU0FBTyxJQUFHLElBQUUsQ0FBQyxFQUFFLEVBQUU7RUFBRSxJQUFJO0VBQUUsTUFBSSxFQUFFLFVBQVEsY0FBWSxPQUFPLEVBQUUsS0FBRyxJQUFFLEVBQUUsS0FBRyxFQUFFLFNBQU8sS0FBRyxFQUFFLEtBQUssR0FBRyxFQUFFLE1BQU0sR0FBRSxFQUFFLFNBQU8sQ0FBQyxDQUFDO0VBQUUsSUFBSSxJQUFFLENBQUMsR0FBRSxJQUFFLENBQUM7RUFBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0dBQUMsSUFBRSxDQUFDLEdBQUUsRUFBRSxLQUFHO0VBQUMsR0FBRSxJQUFFLENBQUMsRUFBRSxNQUFLLE1BQUcsRUFBRSxHQUFFLEtBQUssT0FBTSxDQUFDLENBQUMsS0FBRyxLQUFHLENBQUMsUUFBUSxFQUFFLEtBQUss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