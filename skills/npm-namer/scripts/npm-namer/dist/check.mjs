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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2subWpzIiwibmFtZXMiOlsibWF0Y2giLCJQIiwiZGFtZXJhdUxldmVuc2h0ZWluIiwidmFsaWRhdGUiLCJ2YXJpYW50cyIsIm1vbmlrZXJWYXJpYW50cyIsIm1hdGNoIiwibWF0Y2giLCJQIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2VzLXRvb2xraXRAMS41Mi4wL25vZGVfbW9kdWxlcy9lcy10b29sa2l0L2Rpc3QvcHJlZGljYXRlL2lzTmlsLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS90cy1wYXR0ZXJuQDUuOS4yL25vZGVfbW9kdWxlcy90cy1wYXR0ZXJuL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWFzc2FtYW5AMC41LjUvbm9kZV9tb2R1bGVzL21hc3NhbWFuL2Rpc3QvY29udHJvbC1CbEw3VG1BNy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWFzc2FtYW5AMC41LjUvbm9kZV9tb2R1bGVzL21hc3NhbWFuL2Rpc3QvbWF0Y2gtZkJldGZhSWEubWpzIiwiLi4vc3JjL2NvbnN0YW50cy5tanMiLCIuLi9zcmMvY29ycHVzLm1qcyIsIi4uL3NyYy9wZXJtdXRlLm1qcyIsIi4uL3NyYy9tb25pa2VyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYW1lcmF1LWxldmVuc2h0ZWluQDEuMC44L25vZGVfbW9kdWxlcy9kYW1lcmF1LWxldmVuc2h0ZWluL2luZGV4LmpzIiwiLi4vc3JjL25lYXItbWF0Y2gubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVAOC4wLjAvbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWUvbGliL2J1aWx0aW4tbW9kdWxlcy5qc29uIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVAOC4wLjAvbm9kZV9tb2R1bGVzL3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWUvbGliL2luZGV4LmpzIiwiLi4vc3JjL3ZhbGlkYXRlLm1qcyIsIi4uL3NyYy9waXBlbGluZS5tanMiLCIuLi9zcmMvcmVnaXN0cnkubWpzIiwiLi4vc3JjL2NoZWNrLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3JjL3ByZWRpY2F0ZS9pc05pbC50c1xuLyoqXG4qIENoZWNrcyBpZiBhIGdpdmVuIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuKlxuKiBUaGlzIGZ1bmN0aW9uIHRlc3RzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVpdGhlciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4qIEl0IHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbipcbiogVGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBzZXJ2ZSBhcyBhIHR5cGUgcHJlZGljYXRlIGluIFR5cGVTY3JpcHQsIG5hcnJvd2luZyB0aGUgdHlwZSBvZiB0aGUgYXJndW1lbnQgdG8gYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuKlxuKiBAcGFyYW0geCAtIFRoZSB2YWx1ZSB0byB0ZXN0IGZvciBudWxsIG9yIHVuZGVmaW5lZC5cbiogQHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZCwgYGZhbHNlYCBvdGhlcndpc2UuXG4qXG4qIEBleGFtcGxlXG4qIGNvbnN0IHZhbHVlMSA9IG51bGw7XG4qIGNvbnN0IHZhbHVlMiA9IHVuZGVmaW5lZDtcbiogY29uc3QgdmFsdWUzID0gNDI7XG4qIGNvbnN0IHJlc3VsdDEgPSBpc05pbCh2YWx1ZTEpOyAvLyB0cnVlXG4qIGNvbnN0IHJlc3VsdDIgPSBpc05pbCh2YWx1ZTIpOyAvLyB0cnVlXG4qIGNvbnN0IHJlc3VsdDMgPSBpc05pbCh2YWx1ZTMpOyAvLyBmYWxzZVxuKi9cbmZ1bmN0aW9uIGlzTmlsKHgpIHtcblx0cmV0dXJuIHggPT0gbnVsbDtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgaXNOaWwgfTtcbiIsImNvbnN0IHQ9U3ltYm9sLmZvcihcIkB0cy1wYXR0ZXJuL21hdGNoZXJcIiksZT1TeW1ib2wuZm9yKFwiQHRzLXBhdHRlcm4vaXNWYXJpYWRpY1wiKSxuPVwiQHRzLXBhdHRlcm4vYW5vbnltb3VzLXNlbGVjdC1rZXlcIixyPXQ9PkJvb2xlYW4odCYmXCJvYmplY3RcIj09dHlwZW9mIHQpLGk9ZT0+ZSYmISFlW3RdLG89KG4scyxjKT0+e2lmKGkobikpe2NvbnN0IGU9blt0XSgpLHttYXRjaGVkOnIsc2VsZWN0aW9uczppfT1lLm1hdGNoKHMpO3JldHVybiByJiZpJiZPYmplY3Qua2V5cyhpKS5mb3JFYWNoKHQ9PmModCxpW3RdKSkscn1pZihyKG4pKXtpZighcihzKSlyZXR1cm4hMTtpZihBcnJheS5pc0FycmF5KG4pKXtpZighQXJyYXkuaXNBcnJheShzKSlyZXR1cm4hMTtsZXQgdD1bXSxyPVtdLHU9W107Zm9yKGNvbnN0IG8gb2Ygbi5rZXlzKCkpe2NvbnN0IHM9bltvXTtpKHMpJiZzW2VdP3UucHVzaChzKTp1Lmxlbmd0aD9yLnB1c2gocyk6dC5wdXNoKHMpfWlmKHUubGVuZ3RoKXtpZih1Lmxlbmd0aD4xKXRocm93IG5ldyBFcnJvcihcIlBhdHRlcm4gZXJyb3I6IFVzaW5nIGAuLi5QLmFycmF5KC4uLilgIHNldmVyYWwgdGltZXMgaW4gYSBzaW5nbGUgcGF0dGVybiBpcyBub3QgYWxsb3dlZC5cIik7aWYocy5sZW5ndGg8dC5sZW5ndGgrci5sZW5ndGgpcmV0dXJuITE7Y29uc3QgZT1zLnNsaWNlKDAsdC5sZW5ndGgpLG49MD09PXIubGVuZ3RoP1tdOnMuc2xpY2UoLXIubGVuZ3RoKSxpPXMuc2xpY2UodC5sZW5ndGgsMD09PXIubGVuZ3RoP0luZmluaXR5Oi1yLmxlbmd0aCk7cmV0dXJuIHQuZXZlcnkoKHQsbik9Pm8odCxlW25dLGMpKSYmci5ldmVyeSgodCxlKT0+byh0LG5bZV0sYykpJiYoMD09PXUubGVuZ3RofHxvKHVbMF0saSxjKSl9cmV0dXJuIG4ubGVuZ3RoPT09cy5sZW5ndGgmJm4uZXZlcnkoKHQsZSk9Pm8odCxzW2VdLGMpKX1yZXR1cm4gUmVmbGVjdC5vd25LZXlzKG4pLmV2ZXJ5KGU9Pntjb25zdCByPW5bZV07cmV0dXJuKGUgaW4gc3x8aSh1PXIpJiZcIm9wdGlvbmFsXCI9PT11W3RdKCkubWF0Y2hlclR5cGUpJiZvKHIsc1tlXSxjKTt2YXIgdX0pfXJldHVybiBPYmplY3QuaXMocyxuKX0scz1lPT57dmFyIG4sbyx1O3JldHVybiByKGUpP2koZSk/bnVsbCE9KG49bnVsbD09KG89KHU9ZVt0XSgpKS5nZXRTZWxlY3Rpb25LZXlzKT92b2lkIDA6by5jYWxsKHUpKT9uOltdOkFycmF5LmlzQXJyYXkoZSk/YyhlLHMpOmMoT2JqZWN0LnZhbHVlcyhlKSxzKTpbXX0sYz0odCxlKT0+dC5yZWR1Y2UoKHQsbik9PnQuY29uY2F0KGUobikpLFtdKTtmdW5jdGlvbiB1KC4uLnQpe2lmKDE9PT10Lmxlbmd0aCl7Y29uc3RbZV09dDtyZXR1cm4gdD0+byhlLHQsKCk9Pnt9KX1pZigyPT09dC5sZW5ndGgpe2NvbnN0W2Usbl09dDtyZXR1cm4gbyhlLG4sKCk9Pnt9KX10aHJvdyBuZXcgRXJyb3IoYGlzTWF0Y2hpbmcgd2Fzbid0IGdpdmVuIHRoZSByaWdodCBudW1iZXIgb2YgYXJndW1lbnRzOiBleHBlY3RlZCAxIG9yIDIsIHJlY2VpdmVkICR7dC5sZW5ndGh9LmApfWZ1bmN0aW9uIGEodCl7cmV0dXJuIE9iamVjdC5hc3NpZ24odCx7b3B0aW9uYWw6KCk9PmgodCksYW5kOmU9PmQodCxlKSxvcjplPT55KHQsZSksc2VsZWN0OmU9PnZvaWQgMD09PWU/dih0KTp2KGUsdCl9KX1mdW5jdGlvbiBsKHQpe3JldHVybiBPYmplY3QuYXNzaWduKCh0PT5PYmplY3QuYXNzaWduKHQse1tTeW1ib2wuaXRlcmF0b3JdKCl7bGV0IG49MDtjb25zdCByPVt7dmFsdWU6T2JqZWN0LmFzc2lnbih0LHtbZV06ITB9KSxkb25lOiExfSx7ZG9uZTohMCx2YWx1ZTp2b2lkIDB9XTtyZXR1cm57bmV4dDooKT0+e3ZhciB0O3JldHVybiBudWxsIT0odD1yW24rK10pP3Q6ci5hdCgtMSl9fX19KSkodCkse29wdGlvbmFsOigpPT5sKGgodCkpLHNlbGVjdDplPT5sKHZvaWQgMD09PWU/dih0KTp2KGUsdCkpfSl9ZnVuY3Rpb24gaChlKXtyZXR1cm4gYSh7W3RdOigpPT4oe21hdGNoOnQ9PntsZXQgbj17fTtjb25zdCByPSh0LGUpPT57blt0XT1lfTtyZXR1cm4gdm9pZCAwPT09dD8ocyhlKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59KTp7bWF0Y2hlZDpvKGUsdCxyKSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT5zKGUpLG1hdGNoZXJUeXBlOlwib3B0aW9uYWxcIn0pfSl9Y29uc3QgZj0odCxlKT0+e2Zvcihjb25zdCBuIG9mIHQpaWYoIWUobikpcmV0dXJuITE7cmV0dXJuITB9LGc9KHQsZSk9Pntmb3IoY29uc3RbbixyXW9mIHQuZW50cmllcygpKWlmKCFlKHIsbikpcmV0dXJuITE7cmV0dXJuITB9LG09KHQsZSk9Pntjb25zdCBuPVJlZmxlY3Qub3duS2V5cyh0KTtmb3IoY29uc3QgciBvZiBuKWlmKCFlKHIsdFtyXSkpcmV0dXJuITE7cmV0dXJuITB9O2Z1bmN0aW9uIGQoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJue21hdGNoZWQ6ZS5ldmVyeShlPT5vKGUsdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+YyhlLHMpLG1hdGNoZXJUeXBlOlwiYW5kXCJ9KX0pfWZ1bmN0aW9uIHkoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJuIGMoZSxzKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDplLnNvbWUoZT0+byhlLHQscikpLHNlbGVjdGlvbnM6bn19LGdldFNlbGVjdGlvbktleXM6KCk9PmMoZSxzKSxtYXRjaGVyVHlwZTpcIm9yXCJ9KX0pfWZ1bmN0aW9uIHAoZSl7cmV0dXJue1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6Qm9vbGVhbihlKHQpKX0pfSl9fWZ1bmN0aW9uIHYoLi4uZSl7Y29uc3Qgcj1cInN0cmluZ1wiPT10eXBlb2YgZVswXT9lWzBdOnZvaWQgMCxpPTI9PT1lLmxlbmd0aD9lWzFdOlwic3RyaW5nXCI9PXR5cGVvZiBlWzBdP3ZvaWQgMDplWzBdO3JldHVybiBhKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2xldCBlPXtbbnVsbCE9cj9yOm5dOnR9O3JldHVybnttYXRjaGVkOnZvaWQgMD09PWl8fG8oaSx0LCh0LG4pPT57ZVt0XT1ufSksc2VsZWN0aW9uczplfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+W251bGwhPXI/cjpuXS5jb25jYXQodm9pZCAwPT09aT9bXTpzKGkpKX0pfSl9ZnVuY3Rpb24gYih0KXtyZXR1cm4hMH1mdW5jdGlvbiB3KHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0fWZ1bmN0aW9uIFModCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR9ZnVuY3Rpb24gaih0KXtyZXR1cm5cImJpZ2ludFwiPT10eXBlb2YgdH1jb25zdCBLPWEocChiKSksTz1hKHAoYikpLEU9Syx4PXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7c3RhcnRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LnN0YXJ0c1dpdGgobikpKSkpO3ZhciBufSxlbmRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LmVuZHNXaXRoKG4pKSkpKTt2YXIgbn0sbWluTGVuZ3RoOmU9PngoZCh0LCh0PT5wKGU9PlMoZSkmJmUubGVuZ3RoPj10KSkoZSkpKSxsZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg9PT10KSkoZSkpKSxtYXhMZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg8PXQpKShlKSkpLGluY2x1ZGVzOmU9PntyZXR1cm4geChkKHQsKG49ZSxwKHQ9PlModCkmJnQuaW5jbHVkZXMobikpKSkpO3ZhciBufSxyZWdleDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZCb29sZWFuKHQubWF0Y2gobikpKSkpKTt2YXIgbn19KSxBPXgocChTKSksTj10PT5PYmplY3QuYXNzaWduKGEodCkse2JldHdlZW46KGUsbik9Pk4oZCh0LCgodCxlKT0+cChuPT53KG4pJiZ0PD1uJiZlPj1uKSkoZSxuKSkpLGx0OmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU8dCkpKGUpKSksZ3Q6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZT50KSkoZSkpKSxsdGU6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZTw9dCkpKGUpKSksZ3RlOmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU+PXQpKShlKSkpLGludDooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNJbnRlZ2VyKHQpKSkpLGZpbml0ZTooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNGaW5pdGUodCkpKSkscG9zaXRpdmU6KCk9Pk4oZCh0LHAodD0+dyh0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5OKGQodCxwKHQ9PncodCkmJnQ8MCkpKX0pLFA9TihwKHcpKSxrPXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7YmV0d2VlbjooZSxuKT0+ayhkKHQsKCh0LGUpPT5wKG49PmoobikmJnQ8PW4mJmU+PW4pKShlLG4pKSksbHQ6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZTx0KSkoZSkpKSxndDplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPnQpKShlKSkpLGx0ZTplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPD10KSkoZSkpKSxndGU6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZT49dCkpKGUpKSkscG9zaXRpdmU6KCk9PmsoZCh0LHAodD0+aih0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5rKGQodCxwKHQ9PmoodCkmJnQ8MCkpKX0pLFQ9ayhwKGopKSxCPWEocChmdW5jdGlvbih0KXtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIHR9KSksXz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9KSksVz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXR9KSksJD1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXR9KSk7dmFyIHo9e19fcHJvdG9fXzpudWxsLG1hdGNoZXI6dCxvcHRpb25hbDpoLGFycmF5OmZ1bmN0aW9uKC4uLmUpe3JldHVybiBsKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2lmKCFBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTtpZigwPT09ZS5sZW5ndGgpcmV0dXJue21hdGNoZWQ6ITB9O2NvbnN0IG49ZVswXTtsZXQgcj17fTtpZigwPT09dC5sZW5ndGgpcmV0dXJuIHMobikuZm9yRWFjaCh0PT57clt0XT1bXX0pLHttYXRjaGVkOiEwLHNlbGVjdGlvbnM6cn07Y29uc3QgaT0odCxlKT0+e3JbdF09KHJbdF18fFtdKS5jb25jYXQoW2VdKX07cmV0dXJue21hdGNoZWQ6dC5ldmVyeSh0PT5vKG4sdCxpKSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxzZXQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgU2V0KSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07Y29uc3Qgcj0odCxlKT0+e25bdF09KG5bdF18fFtdKS5jb25jYXQoW2VdKX0saT1lWzBdO3JldHVybnttYXRjaGVkOmYodCx0PT5vKGksdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxtYXA6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgTWFwKSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2NvbnN0IHI9KHQsZSk9PntuW3RdPShuW3RdfHxbXSkuY29uY2F0KFtlXSl9O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07dmFyIGk7aWYoMT09PWUubGVuZ3RoKXRocm93IG5ldyBFcnJvcihgXFxgUC5tYXBcXGAgd2Fzbid0IGdpdmVuIGVub3VnaCBhcmd1bWVudHMuIEV4cGVjdGVkIChrZXksIHZhbHVlKSwgcmVjZWl2ZWQgJHtudWxsPT0oaT1lWzBdKT92b2lkIDA6aS50b1N0cmluZygpfWApO2NvbnN0W3MsY109ZTtyZXR1cm57bWF0Y2hlZDpnKHQsKHQsZSk9Pntjb25zdCBuPW8ocyxlLHIpLGk9byhjLHQscik7cmV0dXJuIG4mJml9KSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT4wPT09ZS5sZW5ndGg/W106Wy4uLnMoZVswXSksLi4ucyhlWzFdKV19KX0pfSxyZWNvcmQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0fHxBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTt2YXIgbjtpZigwPT09ZS5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBcXGBQLnJlY29yZFxcYCB3YXNuJ3QgZ2l2ZW4gZW5vdWdoIGFyZ3VtZW50cy4gRXhwZWN0ZWQgKHZhbHVlKSBvciAoa2V5LCB2YWx1ZSksIHJlY2VpdmVkICR7bnVsbD09KG49ZVswXSk/dm9pZCAwOm4udG9TdHJpbmcoKX1gKTtsZXQgcj17fTtjb25zdCBpPSh0LGUpPT57clt0XT0oclt0XXx8W10pLmNvbmNhdChbZV0pfSxbcyxjXT0xPT09ZS5sZW5ndGg/W0EsZVswXV06ZTtyZXR1cm57bWF0Y2hlZDptKHQsKHQsZSk9Pntjb25zdCBuPVwic3RyaW5nXCIhPXR5cGVvZiB0fHxOdW1iZXIuaXNOYU4oTnVtYmVyKHQpKT9udWxsOk51bWJlcih0KSxyPW51bGwhPT1uJiZvKHMsbixpKSx1PW8ocyx0LGkpLGE9byhjLGUsaSk7cmV0dXJuKHV8fHIpJiZhfSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOlsuLi5zKGVbMF0pLC4uLnMoZVsxXSldfSl9KX0saW50ZXJzZWN0aW9uOmQsdW5pb246eSxub3Q6ZnVuY3Rpb24oZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6IW8oZSx0LCgpPT57fSl9KSxnZXRTZWxlY3Rpb25LZXlzOigpPT5bXSxtYXRjaGVyVHlwZTpcIm5vdFwifSl9KX0sd2hlbjpwLHNlbGVjdDp2LGFueTpLLHVua25vd246TyxfOkUsc3RyaW5nOkEsbnVtYmVyOlAsYmlnaW50OlQsYm9vbGVhbjpCLHN5bWJvbDpfLG51bGxpc2g6Vyxub25OdWxsYWJsZTokLGluc3RhbmNlT2Y6ZnVuY3Rpb24odCl7cmV0dXJuIGEocChmdW5jdGlvbih0KXtyZXR1cm4gZT0+ZSBpbnN0YW5jZW9mIHR9KHQpKSl9LHNoYXBlOmZ1bmN0aW9uKHQpe3JldHVybiBhKHAodSh0KSkpfX07Y2xhc3MgSSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQpe2xldCBlO3RyeXtlPUpTT04uc3RyaW5naWZ5KHQpfWNhdGNoKG4pe2U9dH1zdXBlcihgUGF0dGVybiBtYXRjaGluZyBlcnJvcjogbm8gcGF0dGVybiBtYXRjaGVzIHZhbHVlICR7ZX1gKSx0aGlzLmlucHV0PXZvaWQgMCx0aGlzLmlucHV0PXR9fWNvbnN0IEw9e21hdGNoZWQ6ITEsdmFsdWU6dm9pZCAwfTtmdW5jdGlvbiBNKHQpe3JldHVybiBuZXcgUih0LEwpfWNsYXNzIFJ7Y29uc3RydWN0b3IodCxlKXt0aGlzLmlucHV0PXZvaWQgMCx0aGlzLnN0YXRlPXZvaWQgMCx0aGlzLmlucHV0PXQsdGhpcy5zdGF0ZT1lfXdpdGgoLi4udCl7aWYodGhpcy5zdGF0ZS5tYXRjaGVkKXJldHVybiB0aGlzO2NvbnN0IGU9dFt0Lmxlbmd0aC0xXSxyPVt0WzBdXTtsZXQgaTszPT09dC5sZW5ndGgmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRbMV0/aT10WzFdOnQubGVuZ3RoPjImJnIucHVzaCguLi50LnNsaWNlKDEsdC5sZW5ndGgtMSkpO2xldCBzPSExLGM9e307Y29uc3QgdT0odCxlKT0+e3M9ITAsY1t0XT1lfSxhPSFyLnNvbWUodD0+byh0LHRoaXMuaW5wdXQsdSkpfHxpJiYhQm9vbGVhbihpKHRoaXMuaW5wdXQpKT9MOnttYXRjaGVkOiEwLHZhbHVlOmUocz9uIGluIGM/Y1tuXTpjOnRoaXMuaW5wdXQsdGhpcy5pbnB1dCl9O3JldHVybiBuZXcgUih0aGlzLmlucHV0LGEpfXdoZW4odCxlKXtpZih0aGlzLnN0YXRlLm1hdGNoZWQpcmV0dXJuIHRoaXM7Y29uc3Qgbj1Cb29sZWFuKHQodGhpcy5pbnB1dCkpO3JldHVybiBuZXcgUih0aGlzLmlucHV0LG4/e21hdGNoZWQ6ITAsdmFsdWU6ZSh0aGlzLmlucHV0LHRoaXMuaW5wdXQpfTpMKX1vdGhlcndpc2UodCl7cmV0dXJuIHRoaXMuc3RhdGUubWF0Y2hlZD90aGlzLnN0YXRlLnZhbHVlOnQodGhpcy5pbnB1dCl9ZXhoYXVzdGl2ZSh0PUYpe3JldHVybiB0aGlzLnN0YXRlLm1hdGNoZWQ/dGhpcy5zdGF0ZS52YWx1ZTp0KHRoaXMuaW5wdXQpfXJ1bigpe3JldHVybiB0aGlzLmV4aGF1c3RpdmUoKX1yZXR1cm5UeXBlKCl7cmV0dXJuIHRoaXN9bmFycm93KCl7cmV0dXJuIHRoaXN9fWZ1bmN0aW9uIEYodCl7dGhyb3cgbmV3IEkodCl9ZXhwb3J0e0kgYXMgTm9uRXhoYXVzdGl2ZUVycm9yLHogYXMgUCx6IGFzIFBhdHRlcm4sdSBhcyBpc01hdGNoaW5nLE0gYXMgbWF0Y2h9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gXCJlcy10b29sa2l0L3ByZWRpY2F0ZVwiO1xuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tIFwidHMtcGF0dGVyblwiO1xuaW1wb3J0IHsgYXNzZXJ0LCBpbnZhcmlhbnQgfSBmcm9tIFwiZXMtdG9vbGtpdC91dGlsXCI7XG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvcmVzdWx0LnRzXG4vKipcbiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBleHBvc2VzIHRoZSByZXF1aXJlZCBzdHJ1Y3R1cmFsIGBFcnJvcmAgZmllbGRzLlxuKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gaW5zcGVjdFxuKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB2YWx1ZSBoYXMgc3RyaW5nIGBuYW1lYCBhbmQgYG1lc3NhZ2VgIGZpZWxkc1xuKiBAcHJpdmF0ZVxuKi9cbmZ1bmN0aW9uIGlzRXJyb3JMaWtlKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIWlzTmlsKHZhbHVlKSAmJiBcIm5hbWVcIiBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBcIm1lc3NhZ2VcIiBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubWVzc2FnZSA9PT0gXCJzdHJpbmdcIjtcbn1cbi8qKlxuKiBNaW5pbWFsIGVycm9yIGNvZXJjaW9uIHVzZWQgaW50ZXJuYWxseSBieSBgZXJyKClgLiBLZXB0IGxvY2FsIHRvIGF2b2lkXG4qIHB1bGxpbmcgdGhlIGZ1bGwgY29udmVyc2lvbiBtb2R1bGUgaW50byB0aGUgYG1hc3NhbWFuL2NvbnRyb2xgIGJ1bmRsZS5cbiovXG5mdW5jdGlvbiBjb2VyY2VFcnJvcih0aHJvd24pIHtcblx0aWYgKHRocm93biBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdGhyb3duO1xuXHRpZiAoaXNFcnJvckxpa2UodGhyb3duKSkgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG5ldyBFcnJvcih0aHJvd24ubWVzc2FnZSwgeyBjYXVzZTogdGhyb3duIH0pLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0aHJvd24pKTtcblx0aWYgKHR5cGVvZiB0aHJvd24gPT09IFwic3RyaW5nXCIpIHJldHVybiBuZXcgRXJyb3IodGhyb3duKTtcblx0dHJ5IHtcblx0XHRjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkodGhyb3duKSA/PyBTdHJpbmcodGhyb3duKTtcblx0XHRyZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UsIHsgY2F1c2U6IHRocm93biB9KTtcblx0fSBjYXRjaCB7XG5cdFx0cmV0dXJuIG5ldyBFcnJvcihTdHJpbmcodGhyb3duKSwgeyBjYXVzZTogdGhyb3duIH0pO1xuXHR9XG59XG4vKipcbiogQ3JlYXRlcyBhIHN1Y2Nlc3MgcmVzdWx0IHdyYXBwaW5nIHRoZSBnaXZlbiB2YWx1ZS5cbipcbiogQHBhcmFtIHZhbHVlIC0gVGhlIHN1Y2Nlc3MgdmFsdWVcbiogQHJldHVybnMgQW4gYE9rYCByZXN1bHQgY29udGFpbmluZyB0aGUgdmFsdWVcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgcmVzdWx0ID0gb2soNDIpXG4qIC8vIHsgb2s6IHRydWUsIHZhbHVlOiA0MiB9XG4qIGBgYFxuKi9cbmZ1bmN0aW9uIG9rKHZhbHVlKSB7XG5cdHJldHVybiB7XG5cdFx0b2s6IHRydWUsXG5cdFx0dmFsdWUsXG5cdFx0ZXJyb3I6IG51bGxcblx0fTtcbn1cbmZ1bmN0aW9uIGVycihlcnJvcikge1xuXHRyZXR1cm4ge1xuXHRcdG9rOiBmYWxzZSxcblx0XHR2YWx1ZTogbnVsbCxcblx0XHRlcnJvcjogY29lcmNlRXJyb3IoZXJyb3IpXG5cdH07XG59XG4vKipcbiogVHlwZSBndWFyZCB0aGF0IG5hcnJvd3MgYSBgUmVzdWx0YCB0byBgT2tgLlxuKlxuKiBAcGFyYW0gcmVzdWx0IC0gVGhlIHJlc3VsdCB0byBjaGVja1xuKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHJlc3VsdCBpcyBgT2tgXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZSgne30nKSlcbiogaWYgKGlzT2socmVzdWx0KSkge1xuKiAgIGNvbnNvbGUubG9nKHJlc3VsdC52YWx1ZSlcbiogfVxuKiBgYGBcbiovXG5mdW5jdGlvbiBpc09rKHJlc3VsdCkge1xuXHRyZXR1cm4gcmVzdWx0Lm9rID09PSB0cnVlO1xufVxuLyoqXG4qIFR5cGUgZ3VhcmQgdGhhdCBuYXJyb3dzIGEgYFJlc3VsdGAgdG8gYEVycmAuXG4qXG4qIEBwYXJhbSByZXN1bHQgLSBUaGUgcmVzdWx0IHRvIGNoZWNrXG4qIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgcmVzdWx0IGlzIGBFcnJgXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZSgnYmFkJykpXG4qIGlmIChpc0VycihyZXN1bHQpKSB7XG4qICAgY29uc29sZS5lcnJvcihyZXN1bHQuZXJyb3IpXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gaXNFcnIocmVzdWx0KSB7XG5cdHJldHVybiByZXN1bHQub2sgPT09IGZhbHNlO1xufVxuLyoqXG4qIEV4dHJhY3QgdGhlIHZhbHVlIGZyb20gYW4gYE9rYCByZXN1bHQsIG9yIHRocm93IG9uIGBFcnJgLlxuKlxuKiBXaGVuIGNhbGxlZCB3aXRob3V0IGEgbWVzc2FnZSwgdGhyb3dzIHRoZSBvcmlnaW5hbCBlcnJvci5cbiogV2hlbiBjYWxsZWQgd2l0aCBhIG1lc3NhZ2UsIHRocm93cyBhIG5ldyBFcnJvciB3aXRoIHRoYXQgbWVzc2FnZVxuKiBhbmQgdGhlIG9yaWdpbmFsIGVycm9yIGFzIGBjYXVzZWAgKGxpa2UgUnVzdCdzIGBleHBlY3RgKS5cbipcbiogQHBhcmFtIHJlc3VsdCAtIFRoZSByZXN1bHQgdG8gdW53cmFwXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY3VzdG9tIGVycm9yIG1lc3NhZ2UgKFJ1c3QgYGV4cGVjdGAgYmVoYXZpb3IpXG4qIEByZXR1cm5zIFRoZSB1bndyYXBwZWQgdmFsdWVcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgdmFsdWUgPSB1bndyYXAob2soNDIpKSAgICAgICAgICAgLy8gNDJcbiogdW53cmFwKGVycignZmFpbCcpKSAgICAgICAgICAgICAgICAgICAgLy8gdGhyb3dzIEVycm9yKCdmYWlsJylcbiogdW53cmFwKGVycignZmFpbCcpLCAnY29uZmlnIHJlcXVpcmVkJykgLy8gdGhyb3dzIEVycm9yKCdjb25maWcgcmVxdWlyZWQnLCB7IGNhdXNlOiBFcnJvcignZmFpbCcpIH0pXG4qIGBgYFxuKi9cbmZ1bmN0aW9uIHVud3JhcChyZXN1bHQsIG1lc3NhZ2UpIHtcblx0aWYgKHJlc3VsdC5vaykgcmV0dXJuIHJlc3VsdC52YWx1ZTtcblx0aWYgKCFpc05pbChtZXNzYWdlKSkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UsIHsgY2F1c2U6IHJlc3VsdC5lcnJvciB9KTtcblx0dGhyb3cgcmVzdWx0LmVycm9yO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvYXR0ZW1wdC50c1xuLyoqXG4qIEV4ZWN1dGVzIGEgc3luY2hyb25vdXMgZnVuY3Rpb24gYW5kIHdyYXBzIHRoZSBvdXRjb21lIGluIGEgYFJlc3VsdGAuXG4qIFJldHVybnMgYE9rYCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb24gc3VjY2VzcywgYEVycmAgd2l0aCB0aGUgdGhyb3duIHZhbHVlIG9uIGZhaWx1cmUuXG4qXG4qIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlXG4qIEByZXR1cm5zIEEgYFJlc3VsdGAgY29udGFpbmluZyBlaXRoZXIgdGhlIHZhbHVlIG9yIHRoZSBlcnJvclxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBjb25zdCByZXN1bHQgPSBhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UoJ3tcImFcIjoxfScpKVxuKiBpZiAoaXNPayhyZXN1bHQpKSB7XG4qICAgY29uc29sZS5sb2cocmVzdWx0LnZhbHVlKSAvLyB7IGE6IDEgfVxuKiB9XG4qIGBgYFxuKi9cbmZ1bmN0aW9uIGF0dGVtcHQoZm4pIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gb2soZm4oKSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIGVycihlcnJvcik7XG5cdH1cbn1cbi8qKlxuKiBFeGVjdXRlcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gYW5kIHdyYXBzIHRoZSBvdXRjb21lIGluIGEgYFJlc3VsdGAuXG4qIFJldHVybnMgYE9rYCB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZSBvbiBzdWNjZXNzLCBgRXJyYCB3aXRoIHRoZSByZWplY3Rpb24gcmVhc29uIG9uIGZhaWx1cmUuXG4qXG4qIEBwYXJhbSBmbiAtIFRoZSBhc3luYyBmdW5jdGlvbiB0byBleGVjdXRlXG4qIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYSBgUmVzdWx0YCBjb250YWluaW5nIGVpdGhlciB0aGUgdmFsdWUgb3IgdGhlIGVycm9yXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF0dGVtcHRBc3luYygoKSA9PiBmZXRjaCgnL2FwaS9kYXRhJykpXG4qIGlmIChpc0VycihyZXN1bHQpKSB7XG4qICAgY29uc29sZS5lcnJvcihyZXN1bHQuZXJyb3IpXG4qIH1cbiogYGBgXG4qL1xuYXN5bmMgZnVuY3Rpb24gYXR0ZW1wdEFzeW5jKGZuKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG9rKGF3YWl0IGZuKCkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBlcnIoZXJyb3IpO1xuXHR9XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9hbmRUaGVuLnRzXG5mdW5jdGlvbiBhbmRUaGVuKHJlc3VsdCwgbmV4dCkge1xuXHRyZXR1cm4gbWF0Y2gocmVzdWx0KS53aXRoKHsgb2s6IHRydWUgfSwgKHsgdmFsdWUgfSkgPT4gbmV4dCh2YWx1ZSkpLm90aGVyd2lzZSgoZmFpbHVyZSkgPT4gZmFpbHVyZSk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9jb2xsZWN0UmVzdWx0cy50c1xuZnVuY3Rpb24gY29sbGVjdFJlc3VsdHMocmVzdWx0cykge1xuXHRyZXR1cm4gbWF0Y2gocmVzdWx0cy5maW5kKGlzRXJyKSkud2l0aCh2b2lkIDAsICgpID0+IG9rKHJlc3VsdHMuZmlsdGVyKGlzT2spLm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSkpKS5vdGhlcndpc2UoKGZhaWx1cmUpID0+IGZhaWx1cmUpO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvb3JFbHNlLnRzXG5mdW5jdGlvbiBvckVsc2UocmVzdWx0LCByZWNvdmVyKSB7XG5cdHJldHVybiBtYXRjaChyZXN1bHQpLndpdGgoeyBvazogZmFsc2UgfSwgKHsgZXJyb3IgfSkgPT4gcmVjb3ZlcihlcnJvcikpLm90aGVyd2lzZSgoc3VjY2VzcykgPT4gc3VjY2Vzcyk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC9wYXJ0aXRpb25SZXN1bHRzLnRzXG5mdW5jdGlvbiBwYXJ0aXRpb25SZXN1bHRzKHJlc3VsdHMpIHtcblx0cmV0dXJuIHtcblx0XHR2YWx1ZXM6IHJlc3VsdHMuZmlsdGVyKGlzT2spLm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSksXG5cdFx0ZXJyb3JzOiByZXN1bHRzLmZpbHRlcihpc0VycikubWFwKCh7IGVycm9yIH0pID0+IGVycm9yKVxuXHR9O1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnRyb2wvdG9kby50c1xuLyoqXG4qIFN0dWIgZm9yIGEgY29kZSBwYXRoIHlvdSBpbnRlbmQgdG8gd3JpdGUgYnV0IGhhdmVuJ3QuIFRocm93cyBhdCBydW50aW1lLFxuKiByZXR1cm5zIGBuZXZlcmAgc28gaXQgdHlwZWNoZWNrcyBpbiBhbnkgcG9zaXRpb24uXG4qXG4qIEZvciBwYXRocyB5b3UgaW50ZW50aW9uYWxseSBkb24ndCBzdXBwb3J0LCBzZWUgYHVuaW1wbGVtZW50ZWRgLlxuKiBGb3IgcGF0aHMgdGhhdCBzaG91bGQgYmUgaW1wb3NzaWJsZSwgc2VlIGB1bnJlYWNoYWJsZWAuXG4qXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY29udGV4dCBhcHBlbmRlZCB0byB0aGUgdGhyb3duIGVycm9yXG4qIEByZXR1cm5zIE5ldmVyIHJldHVybnMg4oCUIGFsd2F5cyB0aHJvd3NcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogZnVuY3Rpb24gcGFyc2VDb25maWcocmF3OiBzdHJpbmcpOiBDb25maWcge1xuKiAgIHJldHVybiB0b2RvKCd3YWl0aW5nIG9uIHNjaGVtYSBkZWNpc2lvbicpXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gdG9kbyhtZXNzYWdlKSB7XG5cdGlmIChpc05pbChtZXNzYWdlKSkgdGhyb3cgbmV3IEVycm9yKFwibm90IHlldCBpbXBsZW1lbnRlZFwiKTtcblx0dGhyb3cgbmV3IEVycm9yKGBub3QgeWV0IGltcGxlbWVudGVkOiAke21lc3NhZ2V9YCk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC91bmltcGxlbWVudGVkLnRzXG4vKipcbiogTWFya3MgYSBjb2RlIHBhdGggYXMgaW50ZW50aW9uYWxseSB1bnN1cHBvcnRlZC4gVGhyb3dzIGF0IHJ1bnRpbWUsIHJldHVybnNcbiogYG5ldmVyYCBzbyBpdCB0eXBlY2hlY2tzIGluIGFueSBwb3NpdGlvbi5cbipcbiogRm9yIHdvcmsgeW91IHBsYW4gdG8gZmluaXNoIGxhdGVyLCBzZWUgYHRvZG9gLlxuKiBGb3IgcGF0aHMgdGhhdCBzaG91bGQgYmUgaW1wb3NzaWJsZSwgc2VlIGB1bnJlYWNoYWJsZWAuXG4qXG4qIEBwYXJhbSBtZXNzYWdlIC0gT3B0aW9uYWwgY29udGV4dCBhcHBlbmRlZCB0byB0aGUgdGhyb3duIGVycm9yXG4qIEByZXR1cm5zIE5ldmVyIHJldHVybnMg4oCUIGFsd2F5cyB0aHJvd3NcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogdHlwZSBEcml2ZXIgPSAncG9zdGdyZXMnIHwgJ3NxbGl0ZScgfCAnbXlzcWwnXG4qXG4qIGZ1bmN0aW9uIG1pZ3JhdGUoZHJpdmVyOiBEcml2ZXIpOiB2b2lkIHtcbiogICByZXR1cm4gbWF0Y2goZHJpdmVyKVxuKiAgICAgLndpdGgoJ3Bvc3RncmVzJywgcnVuUGdNaWdyYXRpb24pXG4qICAgICAud2l0aCgnc3FsaXRlJywgcnVuU3FsaXRlTWlncmF0aW9uKVxuKiAgICAgLndpdGgoJ215c3FsJywgKCkgPT4gdW5pbXBsZW1lbnRlZCgnbXlzcWwgZHJpdmVyIGludGVudGlvbmFsbHkgdW5zdXBwb3J0ZWQnKSlcbiogICAgIC5leGhhdXN0aXZlKClcbiogfVxuKiBgYGBcbiovXG5mdW5jdGlvbiB1bmltcGxlbWVudGVkKG1lc3NhZ2UpIHtcblx0aWYgKGlzTmlsKG1lc3NhZ2UpKSB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cdHRocm93IG5ldyBFcnJvcihgbm90IGltcGxlbWVudGVkOiAke21lc3NhZ2V9YCk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29udHJvbC91bnJlYWNoYWJsZS50c1xuLyoqXG4qIE1hcmtzIGEgY29kZSBwYXRoIGFzIGxvZ2ljYWxseSBpbXBvc3NpYmxlLiBUaHJvd3MgYXQgcnVudGltZSBpZiBleGVjdXRpb25cbiogZ2V0cyB0aGVyZS4gUmV0dXJucyBgbmV2ZXJgIHNvIGl0IHR5cGVjaGVja3MgaW4gYW55IHBvc2l0aW9uLlxuKlxuKiBGb3Igd29yayB5b3UgcGxhbiB0byBmaW5pc2ggbGF0ZXIsIHNlZSBgdG9kb2AuXG4qIEZvciBwYXRocyB5b3UgaW50ZW50aW9uYWxseSBkb24ndCBzdXBwb3J0LCBzZWUgYHVuaW1wbGVtZW50ZWRgLlxuKlxuKiBAcGFyYW0gbWVzc2FnZSAtIE9wdGlvbmFsIGNvbnRleHQgYXBwZW5kZWQgdG8gdGhlIHRocm93biBlcnJvclxuKiBAcmV0dXJucyBOZXZlciByZXR1cm5zIOKAlCBhbHdheXMgdGhyb3dzXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGZ1bmN0aW9uIHBhcnNlRGlnaXQoaW5wdXQ6IHN0cmluZyk6IG51bWJlciB7XG4qICAgY29uc3QgcGFyc2VkID0gTnVtYmVyLnBhcnNlSW50KGlucHV0LCAxMClcbiogICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiogICAgIHJldHVybiB1bnJlYWNoYWJsZSgnY2FsbGVyIHByZS12YWxpZGF0ZWQnKVxuKiAgIH1cbiogICByZXR1cm4gcGFyc2VkXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gdW5yZWFjaGFibGUobWVzc2FnZSkge1xuXHRpZiAoaXNOaWwobWVzc2FnZSkpIHRocm93IG5ldyBFcnJvcihcImVudGVyZWQgdW5yZWFjaGFibGUgY29kZVwiKTtcblx0dGhyb3cgbmV3IEVycm9yKGBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6ICR7bWVzc2FnZX1gKTtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9jb250cm9sL3Vud3JhcE9yLnRzXG5mdW5jdGlvbiB1bndyYXBPcihyZXN1bHQsIGZhbGxiYWNrKSB7XG5cdHJldHVybiBtYXRjaChyZXN1bHQpLndpdGgoeyBvazogdHJ1ZSB9LCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSkub3RoZXJ3aXNlKCgpID0+IGZhbGxiYWNrKTtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgdW53cmFwIGFzIF8sIHVuaW1wbGVtZW50ZWQgYXMgYSwgb3JFbHNlIGFzIGMsIGF0dGVtcHQgYXMgZCwgYXR0ZW1wdEFzeW5jIGFzIGYsIG9rIGFzIGcsIGlzT2sgYXMgaCwgdW5yZWFjaGFibGUgYXMgaSwgY29sbGVjdFJlc3VsdHMgYXMgbCwgaXNFcnIgYXMgbSwgaW52YXJpYW50IGFzIG4sIHRvZG8gYXMgbywgZXJyIGFzIHAsIHVud3JhcE9yIGFzIHIsIHBhcnRpdGlvblJlc3VsdHMgYXMgcywgYXNzZXJ0IGFzIHQsIGFuZFRoZW4gYXMgdSB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250cm9sLUJsTDdUbUE3Lm1qcy5tYXAiLCJpbXBvcnQgeyBOb25FeGhhdXN0aXZlRXJyb3IsIFAsIFBhdHRlcm4sIGlzTWF0Y2hpbmcsIG1hdGNoLCBtYXRjaCBhcyBtYXRjaCQxIH0gZnJvbSBcInRzLXBhdHRlcm5cIjtcbi8vI3JlZ2lvbiBzcmMvbWF0Y2gvbWF0Y2gudHNcbi8qKlxuKiBFeHRlbmRzIHRzLXBhdHRlcm4ncyBgUGAgbmFtZXNwYWNlIHdpdGggYFAub2soKWAgYW5kIGBQLmVycigpYCDigJQgcGF0dGVyblxuKiBmYWN0b3JpZXMgZm9yIG1hdGNoaW5nIGEgYFJlc3VsdGAgYW5kIGl0cyBjb250YWluZWQgdmFsdWUgb3IgZXJyb3IuXG4qXG4qIE1pcnJvcnMgUnVzdCdzIGBPayh2YWx1ZSlgIC8gYEVycihlcnJvcilgIG1hdGNoIGFybXMsIGJ1dCB1c2VzIHRoZVxuKiBuYW1lc3BhY2UtbWV0aG9kIGZvcm0gKGBQLm9rKClgIC8gYFAuZXJyKClgKSBzbyBpdCBkb2Vzbid0IGNvbGxpZGUgd2l0aFxuKiB0aGUgbG93ZXJjYXNlIGBvaygpYCAvIGBlcnIoKWAgY29uc3RydWN0b3JzIGZyb20gYG1hc3NhbWFuL2NvbnRyb2xgLlxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBpbXBvcnQgeyBtYXRjaCwgUCwgYXR0ZW1wdCB9IGZyb20gJ21hc3NhbWFuJ1xuKlxuKiBtYXRjaChhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UocmF3KSkpXG4qICAgLndpdGgoUC5vaygpLCAoeyB2YWx1ZSB9KSA9PiB1c2UodmFsdWUpKVxuKiAgIC53aXRoKFAuZXJyKCksICh7IGVycm9yIH0pID0+IGxvZyhlcnJvcikpXG4qICAgLmV4aGF1c3RpdmUoKVxuKiBgYGBcbiovXG5mdW5jdGlvbiBva1BhdHRlcm4oLi4ucGF0dGVybnMpIHtcblx0cmV0dXJuIG1hdGNoKHBhdHRlcm5zKS53aXRoKFtdLCAoKSA9PiAoeyBvazogdHJ1ZSB9KSkub3RoZXJ3aXNlKChbcGF0dGVybl0pID0+ICh7XG5cdFx0b2s6IHRydWUsXG5cdFx0dmFsdWU6IHBhdHRlcm5cblx0fSkpO1xufVxuZnVuY3Rpb24gZXJyUGF0dGVybiguLi5wYXR0ZXJucykge1xuXHRyZXR1cm4gbWF0Y2gocGF0dGVybnMpLndpdGgoW10sICgpID0+ICh7IG9rOiBmYWxzZSB9KSkub3RoZXJ3aXNlKChbcGF0dGVybl0pID0+ICh7XG5cdFx0b2s6IGZhbHNlLFxuXHRcdGVycm9yOiBwYXR0ZXJuXG5cdH0pKTtcbn1cbi8qKlxuKiBFeHRlbmRlZCB0cy1wYXR0ZXJuIGBQYCBuYW1lc3BhY2UuIENhcnJpZXMgZXZlcnl0aGluZyB0cy1wYXR0ZXJuIGV4cG9ydHNcbiogKGBQLnN0cmluZ2AsIGBQLm51bWJlcmAsIGBQLmFycmF5YCwgYFAud2hlbmAsIOKApikgcGx1cyBgUC5vaygpYCAvIGBQLmVycigpYFxuKiBmb3IgbWF0Y2hpbmcgYFJlc3VsdGAgdmFsdWVzIGFuZCB0aGVpciBjb250ZW50cy5cbipcbiogRm9yIHRoZSBgUC5QYXR0ZXJuPFQ+YCB0eXBlIHNob3J0aGFuZCwgaW1wb3J0IGBQYXR0ZXJuYCBzdGFuZGFsb25lIGZyb21cbiogYG1hc3NhbWFuL21hdGNoYCDigJQgaXQncyB0aGUgZm9ybSB0cy1wYXR0ZXJuJ3Mgb3duIGRvY3MgcmVjb21tZW5kLlxuKi9cbmNvbnN0IFAkMSA9IHtcblx0Li4uUCxcblx0b2s6IG9rUGF0dGVybixcblx0ZXJyOiBlcnJQYXR0ZXJuXG59O1xuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBQJDEgYXMgYSwgbWF0Y2gkMSBhcyBpLCBQYXR0ZXJuIGFzIG4sIGlzTWF0Y2hpbmcgYXMgciwgTm9uRXhoYXVzdGl2ZUVycm9yIGFzIHQgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0Y2gtZkJldGZhSWEubWpzLm1hcCIsIi8vIFR1bmFibGUgZGVmYXVsdHMgZm9yIHRoZSBucG0tbmFtZXIgcGlwZWxpbmUuIENlbnRyYWxpemVkIHNvIGRvY3MsIHRoZSBDTEksXG4vLyBhbmQgdGVzdHMgY2FuIHJlZmVyZW5jZSBhIHNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGguXG5cbi8qKiBEZWZhdWx0IGNhcCBvbiBjYW5kaWRhdGVzIGNoZWNrZWQgcGVyIHJ1bi4gQ0xJOiAtLWxpbWl0LiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElNSVQgPSA1MFxuXG4vKiogRGVmYXVsdCBwYXJhbGxlbCBIRUFEIHJlcXVlc3RzIGFnYWluc3QgdGhlIHJlZ2lzdHJ5LiBDTEk6IC0tY29uY3VycmVuY3kuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05DVVJSRU5DWSA9IDEyXG5cbi8qKiBOZXR3b3JrIHRpbWVvdXQgcGVyIHJlZ2lzdHJ5IEhFQUQgcmVxdWVzdCAobXMpLiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVHSVNUUllfVElNRU9VVF9NUyA9IDgwMDBcblxuLyoqIG5wbSByZWdpc3RyeSBiYXNlIFVSTDsgb3ZlcnJpZGFibGUgdmlhIE5QTV9SRUdJU1RSWV9VUkwgZW52LiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVHSVNUUllfQkFTRSA9IHByb2Nlc3MuZW52Lk5QTV9SRUdJU1RSWV9VUkwgfHwgJ2h0dHBzOi8vcmVnaXN0cnkubnBtanMub3JnJ1xuXG4vKiogTW9uaWtlciAyLWluc2VydGlvbiBjYXAsIHNjYWxlZCBwZXIgYGJhcmUubGVuZ3RoYCBzbyBsb25nZXIgbmFtZXMgc3RpbGxcbiAqIHJlYWNoIG1pZC1zdHJpbmcgbW9ycGhlbWUgc3BsaXRzIChlLmcuIGBxdWljay1qc29uLXBhcnNlcmAgYXQgZ2FwPTUsXG4gKiBgcmVhY3QtbmF0aXZlLW5hdmlnYXRpb25gIGF0IGdhcD02KS4gVmFyaWFudHMgPSBwYWlycyDDlyA5IHNlcGFyYXRvciBjb21ib3MuICovXG5leHBvcnQgY29uc3QgTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0RFRkFVTFQgPSAyNTBcbmV4cG9ydCBjb25zdCBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0RFRkFVTFQgPSA0MFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0RFRkFVTFQgPSAxNTAwXG5cbi8qKiBNb25pa2VyIDItaW5zZXJ0aW9uIGNhcCAoLS1leGhhdXN0aXZlKTogd2lkZXIgY292ZXJhZ2UsIHNsb3dlci4gKi9cbmV4cG9ydCBjb25zdCBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfRVhIQVVTVElWRSA9IDYwMFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfRVhIQVVTVElWRSA9IDEyMFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfTUFYX0VYSEFVU1RJVkUgPSA1MDAwXG5cbi8qKiBEZWZhdWx0IGVkaXQtZGlzdGFuY2UgdGhyZXNob2xkIGZvciBuZWFyLW1hdGNoIHdhcm5pbmdzLiBDTEk6IC0tbmVhci1kaXN0YW5jZS4gKi9cbmV4cG9ydCBjb25zdCBORUFSX01BVENIX01BWF9ESVNUQU5DRSA9IDJcblxuLyoqIE1pbmltdW0gY29ycHVzLW5hbWUgbGVuZ3RoIGZvciBuZWFyLW1hdGNoIGNvbXBhcmlzb24uIEJlbG93IDMgdGhlIGZhbHNlXG4gKiBwb3NpdGl2ZSByYXRlIHNwaWtlcy4gS2VlcHMgcG9wdWxhciAzLWNoYXIgbmFtZXMgKGB6b2RgLCBgYWp2YCwgYHRzeGApIGluXG4gKiBzY29wZTsgMi1jaGFyIG5hbWVzIGxpa2UgYHFzYCBhcmUgaW50ZW50aW9uYWxseSBiZWxvdyB0aGlzIGZsb29yLiAqL1xuZXhwb3J0IGNvbnN0IE5FQVJfTUFUQ0hfTUlOX0NPUlBVU19MRU4gPSAzXG5cbi8qKiBNYXggbnVtYmVyIG9mIG5lYXItbWF0Y2ggbmVpZ2hib3JzIHN1cmZhY2VkIHBlciBhdmFpbGFibGUgY2FuZGlkYXRlLiAqL1xuZXhwb3J0IGNvbnN0IE5FQVJfTUFUQ0hfTUFYX05FSUdIQk9SUyA9IDNcblxuLyoqIFNob3J0bGlzdCBzaXplIGluIHRoZSBcImF2YWlsYWJsZSArIGNsZWFuXCIgZ3JvdXAgcHJpbnRlZCBhdCB0aGUgZW5kLiAqL1xuZXhwb3J0IGNvbnN0IFNIT1JUTElTVF9MSU1JVCA9IDEwXG5cbi8qKiBNYXggc2FtcGxlIHNpemUgaW4gdGhlIGB1bnZlcmlmaWVkYCBmaWVsZCBvbiBhIHZlcmRpY3QuIEZ1bGwgY291bnQgaXNcbiAqIHByZXNlcnZlZCBpbiBgdW52ZXJpZmllZFRvdGFsYC4gV2l0aG91dCB0cnVuY2F0aW9uLCBhIGhhbW1lcmVkIHJlZ2lzdHJ5XG4gKiByZXR1cm5pbmcgNDI5IGFjcm9zcyBodW5kcmVkcyBvZiB2YXJpYW50cyB3b3VsZCBkdW1wIGtpbG9ieXRlcyBvZlxuICogdXNlbGVzcyB2YXJpYW50IG5hbWVzIHBlciBjYW5kaWRhdGUgaW50byAtLWpzb24gb3V0cHV0LiAqL1xuZXhwb3J0IGNvbnN0IFZFUkRJQ1RfVU5WRVJJRklFRF9TQU1QTEUgPSAxMFxuIiwiLy8gUG9wdWxhci1uYW1lcyBjb3JwdXMgbG9hZGVyLiBSZWFkcyBgcG9wdWxhci1uYW1lcy5qc29uYCAoY29tbWl0dGVkXG4vLyBidWlsZCBhcnRpZmFjdCkgYW5kIHJldHVybnMgaXQgYXMgYSBSZXN1bHQuIE1lbW9pemVkIGFmdGVyIGZpcnN0XG4vLyBzdWNjZXNzZnVsIHJlYWQgYmVjYXVzZSB0aGUgZmlsZSBpcyB+MjYwIEtCIGFuZCB0aGUgQ0xJIG1heSBjYWxsXG4vLyB0aGlzIG1hbnkgdGltZXMgaW4gYSBzaW5nbGUgcnVuLlxuLy9cbi8vIFNvdXJjZTogdG9wIH4xNSBLIHVuc2NvcGVkIG5wbSBwYWNrYWdlcyBieSBtb250aGx5IGRvd25sb2Fkcywgc25hcHNob3Rcbi8vIGZyb20gYG5pY2UtcmVnaXN0cnkvZG93bmxvYWQtY291bnRzYC4gU2VlIHJlZnJlc2gtcG9wdWxhci1uYW1lcy5tanMuXG5cbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgeyBhdHRlbXB0LCBlcnIsIG9rIH0gZnJvbSAnbWFzc2FtYW4nXG5cbmNvbnN0IEhFUkUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb3JwdXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzb3VyY2UgLSBwcm92ZW5hbmNlIHN0cmluZywgZS5nLiBcIm5pY2UtcmVnaXN0cnkvZG93bmxvYWQtY291bnRzXCJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc291cmNlVmVyc2lvbl1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBnZW5lcmF0ZWQgLSBJU08gZGF0ZSB0aGUgc25hcHNob3Qgd2FzIGJ1aWx0XG4gKiBAcHJvcGVydHkge251bWJlcn0gc2l6ZSAtIGNvcnB1cyBuYW1lIGNvdW50XG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBuYW1lcyAtIHVuc2NvcGVkIHBhY2thZ2UgbmFtZXMsIGRlc2NlbmRpbmcgYnkgZG93bmxvYWRzXG4gKi9cblxuLy8gSW52YXJpYW50OiBjYWNoZSBob2xkcyB0aGUgRklSU1Qgc3VjY2Vzc2Z1bCBsb2FkLiBJZiBgbG9hZENvcnB1c2AgaXNcbi8vIGNhbGxlZCBhZ2Fpbiwgd2UgcmV0dXJuIHRoZSBzYW1lIFJlc3VsdC4gTW9kdWxlLWxldmVsIG11dGF0aW9uIGhlcmUgaXNcbi8vIHB1cmUgbWVtb2l6YXRpb24g4oCUIHRoZSBjb3JwdXMgbmV2ZXIgY2hhbmdlcyB3aXRoaW4gYSBwcm9jZXNzLlxubGV0IGNhY2hlID0gbnVsbFxuXG4vKipcbiAqIFRyeSB0aGUgc2FtZS1kaXIgYW5kIHBhcmVudC1kaXIgbG9jYXRpb25zIGZvciBgcG9wdWxhci1uYW1lcy5qc29uYC4gQm90aFxuICogdGhlIGJ1aWx0IGJ1bmRsZSAoYGRpc3QvY2hlY2subWpzYCkgYW5kIHRoZSB1bmJ1bmRsZWQgc291cmNlIGxpdmUgb25lXG4gKiBsZXZlbCBiZWxvdyB0aGUgY2Fub25pY2FsIEpTT04gZmlsZSdzIGxvY2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAqL1xuZnVuY3Rpb24gY2FuZGlkYXRlUGF0aHMoKSB7XG4gIHJldHVybiBbam9pbihIRVJFLCAnLi4nLCAncG9wdWxhci1uYW1lcy5qc29uJyksIGpvaW4oSEVSRSwgJ3BvcHVsYXItbmFtZXMuanNvbicpXVxufVxuXG4vKipcbiAqIExvYWQgdGhlIHBvcHVsYXItbmFtZXMgY29ycHVzLiBSZXR1cm5zIE9rKGNvcnB1cykgb24gc3VjY2VzcywgRXJyIG9uIGFcbiAqIHJlYWQgb3IgcGFyc2UgZmFpbHVyZS4gUmVzdWx0IGlzIGNhY2hlZCBhZnRlciB0aGUgZmlyc3QgT2s7IEVyciByZXN1bHRzXG4gKiBhcmUgbm90IGNhY2hlZCBzbyB0cmFuc2llbnQgZmFpbHVyZXMgY2FuIGJlIHJldHJpZWQuXG4gKlxuICogQHJldHVybnMge2ltcG9ydCgnbWFzc2FtYW4nKS5SZXN1bHQ8Q29ycHVzLCBFcnJvcj59XG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVzdWx0ID0gbG9hZENvcnB1cygpXG4gKiBpZiAoaXNPayhyZXN1bHQpKSBmb3IgKGNvbnN0IG5hbWUgb2YgcmVzdWx0LnZhbHVlLm5hbWVzKSB7IOKApiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29ycHVzKCkge1xuICBpZiAoY2FjaGUgJiYgY2FjaGUub2spIHJldHVybiBjYWNoZVxuXG4gIGZvciAoY29uc3QgcGF0aCBvZiBjYW5kaWRhdGVQYXRocygpKSB7XG4gICAgY29uc3QgcmVhZCA9IGF0dGVtcHQoKCkgPT4gcmVhZEZpbGVTeW5jKHBhdGgsICd1dGY4JykpXG4gICAgaWYgKCFyZWFkLm9rKSBjb250aW51ZVxuICAgIGNvbnN0IHBhcnNlZCA9IGF0dGVtcHQoKCkgPT4gSlNPTi5wYXJzZShyZWFkLnZhbHVlKSlcbiAgICBpZiAoIXBhcnNlZC5vaykge1xuICAgICAgY2FjaGUgPSBlcnIobmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBpcyBtYWxmb3JtZWQ6ICR7cGFyc2VkLmVycm9yLm1lc3NhZ2V9YCkpXG4gICAgICByZXR1cm4gY2FjaGVcbiAgICB9XG4gICAgY29uc3Qgc2hhcGVFcnJvciA9IHZhbGlkYXRlU2hhcGUocGFyc2VkLnZhbHVlLCBwYXRoKVxuICAgIGlmIChzaGFwZUVycm9yKSB7XG4gICAgICBjYWNoZSA9IGVycihzaGFwZUVycm9yKVxuICAgICAgcmV0dXJuIGNhY2hlXG4gICAgfVxuICAgIGNhY2hlID0gb2socGFyc2VkLnZhbHVlKVxuICAgIHJldHVybiBjYWNoZVxuICB9XG5cbiAgY2FjaGUgPSBlcnIobmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gbm90IGZvdW5kIGluIGFueSBvZjogJHtjYW5kaWRhdGVQYXRocygpLmpvaW4oJywgJyl9YCkpXG4gIHJldHVybiBjYWNoZVxufVxuXG4vKipcbiAqIENvbmZpcm0gdGhlIHBhcnNlZCBKU09OIGhhcyB0aGUgc2hhcGUgYENvcnB1c2AgZXhwZWN0cy4gUmV0dXJucyBhblxuICogRXJyb3IgZGVzY3JpYmluZyB0aGUgZmlyc3QgbWlzc2luZyBmaWVsZCwgb3IgbnVsbCBpZiB0aGUgc2hhcGUgaXMgdmFsaWQuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtFcnJvciB8IG51bGx9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVNoYXBlKHZhbHVlLCBwYXRoKSB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYHBvcHVsYXItbmFtZXMuanNvbiBhdCAke3BhdGh9IGlzIG5vdCBhbiBvYmplY3RgKVxuICB9XG4gIGNvbnN0IHJlcXVpcmVkID0geyBzb3VyY2U6ICdzdHJpbmcnLCBnZW5lcmF0ZWQ6ICdzdHJpbmcnLCBuYW1lczogJ2FycmF5JyB9XG4gIGZvciAoY29uc3QgW2ZpZWxkLCBleHBlY3RlZFR5cGVdIG9mIE9iamVjdC5lbnRyaWVzKHJlcXVpcmVkKSkge1xuICAgIGNvbnN0IGFjdHVhbCA9IHZhbHVlW2ZpZWxkXVxuICAgIGNvbnN0IG1hdGNoZXMgPVxuICAgICAgZXhwZWN0ZWRUeXBlID09PSAnYXJyYXknID8gQXJyYXkuaXNBcnJheShhY3R1YWwpIDogdHlwZW9mIGFjdHVhbCA9PT0gZXhwZWN0ZWRUeXBlXG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICBgcG9wdWxhci1uYW1lcy5qc29uIGF0ICR7cGF0aH0gbWlzc2luZyBvciB3cm9uZy10eXBlZCBmaWVsZCBcIiR7ZmllbGR9XCIgKGV4cGVjdGVkICR7ZXhwZWN0ZWRUeXBlfSlgXG4gICAgICApXG4gICAgfVxuICB9XG4gIGlmICh2YWx1ZS5uYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBoYXMgYW4gZW1wdHkgbmFtZXMgYXJyYXlgKVxuICB9XG4gIGNvbnN0IGJhZEVudHJ5ID0gdmFsdWUubmFtZXMuZmluZEluZGV4KChuYW1lKSA9PiB0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIW5hbWUpXG4gIGlmIChiYWRFbnRyeSA+PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgIGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBoYXMgYSBub24tc3RyaW5nIG9yIGVtcHR5IGVudHJ5IGF0IGluZGV4ICR7YmFkRW50cnl9YFxuICAgIClcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlLnNpemUgPT09ICdudW1iZXInICYmIHZhbHVlLnNpemUgIT09IHZhbHVlLm5hbWVzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICBgcG9wdWxhci1uYW1lcy5qc29uIGF0ICR7cGF0aH06IHNpemUgZmllbGQgKCR7dmFsdWUuc2l6ZX0pIGRvZXNuJ3QgbWF0Y2ggbmFtZXMubGVuZ3RoICgke3ZhbHVlLm5hbWVzLmxlbmd0aH0pYFxuICAgIClcbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIFRlc3Qtb25seSBlc2NhcGUgaGF0Y2gg4oCUIGNsZWFycyB0aGUgbWVtb2l6YXRpb24gY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZXNldENvcnB1c0NhY2hlKCkge1xuICBjYWNoZSA9IG51bGxcbn1cbiIsIi8vIERldGVybWluaXN0aWMgcGVybXV0YXRpb24gZW5naW5lLiBHaXZlbiBzZWVkIHdvcmRzIChhbmQgb3B0aW9uYWwgcHJlZml4IC9cbi8vIHN1ZmZpeCBsaXN0cyksIHByb2R1Y2UgY2FuZGlkYXRlIHBhY2thZ2UgbmFtZXMgYnkgam9pbmluZywgcHJlZml4aW5nLFxuLy8gc3VmZml4aW5nLCBhbmQgcmUtc2VwYXJhdGluZy4gVGhlIGFnZW50IGZlZWRzIGluIGl0cyBicmFpbnN0b3JtZWQgc2VlZHM7XG4vLyB0aGlzIGV4cGFuZHMgdGhlbSBpbnRvIHRoZSBzZWFyY2ggc3BhY2Ugd2l0aG91dCBoYWxsdWNpbmF0aW5nIG5ldyB0b2tlbnMuXG5cbmNvbnN0IERFRkFVTFRfUFJFRklYRVMgPSBbXG4gICd0aW55JyxcbiAgJ21pbmknLFxuICAncGljbycsXG4gICduYW5vJyxcbiAgJ2xpdGUnLFxuICAnbWljcm8nLFxuICAnZmFzdCcsXG4gICdsZWFuJyxcbiAgJ3F1aWNrJyxcbiAgJ3NsaW0nLFxuICAncHVyZScsXG4gICdzdXBlcicsXG4gICd1bHRyYScsXG4gICdtZXRhJyxcbiAgJ2F1dG8nLFxuICAnc21hcnQnLFxuXVxuXG5jb25zdCBERUZBVUxUX1NVRkZJWEVTID0gW1xuICAnanMnLFxuICAndHMnLFxuICAnbGliJyxcbiAgJ2tpdCcsXG4gICdjb3JlJyxcbiAgJ3BybycsXG4gICdjbGknLFxuICAndG9vbHMnLFxuICAndXRpbHMnLFxuICAnZm9yZ2UnLFxuICAnc21pdGgnLFxuICAnY3JhZnQnLFxuICAnbGFiJyxcbiAgJ2JveCcsXG4gICdlbmdpbmUnLFxuICAnc3R1ZGlvJyxcbl1cblxuY29uc3QgQ09OTkVDVE9SUyA9IFsnJywgJy0nXVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBlcm11dGVPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBbcHJlZml4ZXNdIC0gb3ZlcnJpZGUgZGVmYXVsdCBwcmVmaXggbGlzdFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gW3N1ZmZpeGVzXSAtIG92ZXJyaWRlIGRlZmF1bHQgc3VmZml4IGxpc3RcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IFtjb25uZWN0b3JzXSAtIHNlcGFyYXRvcnMgYmV0d2VlbiBwYXJ0cyAoZGVmYXVsdDogJycsICctJylcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Nob3VsZEluY2x1ZGVVbmRlcnNjb3JlXSAtIGFsc28gdXNlICdfJyBhcyBhIGNvbm5lY3RvciAoZGVmYXVsdDogZmFsc2UpXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtzaG91bGRDb21iaW5lVHdvU2VlZHNdIC0gam9pbiBwYWlycyBvZiBzZWVkcyAoZGVmYXVsdDogdHJ1ZSlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc2NvcGVdIC0gaWYgc2V0LCBhbHNvIGVtaXQgYEBzY29wZS88bmFtZT5gIHZhcmlhbnRzXG4gKi9cblxuLyoqXG4gKiBHZW5lcmF0ZSBwYWNrYWdlIG5hbWUgY2FuZGlkYXRlcyBmcm9tIHNlZWQgd29yZHMuXG4gKlxuICogRm9yIHNlZWRzPVsndGlueScsJ2xvZyddLCBwcm9kdWNlcyB0aGluZ3MgbGlrZTpcbiAqICAgbG9nLCB0aW55LCB0aW55bG9nLCB0aW55LWxvZywgbWluaS1sb2csIG5hbm8tbG9nLCBsb2ctY2xpLCBsb2dqcywgLi4uXG4gKlxuICogT3V0cHV0IGlzIGRlZHVwbGljYXRlZDsgb3JkZXIgaXMgcm91Z2hseTogYmFyZSBzZWVkcywgdHdvLXNlZWQgY29tYm9zLFxuICogcHJlZml4K3NlZWQsIHNlZWQrc3VmZml4LiBDYWxsZXIgYXBwbGllcyBhbnkgbGltaXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc2VlZHNcbiAqIEBwYXJhbSB7UGVybXV0ZU9wdGlvbnN9IFtvcHRzXVxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICogQGV4YW1wbGVcbiAqIHBlcm11dGUoWydsb2cnXSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbJ2xvZycsICd0aW55LWxvZycsICd0aW55bG9nJywg4oCmXVxuICogcGVybXV0ZShbJ2xvZyddLCB7IHNjb3BlOiAnQG1lJyB9KSAgICAgICAgICAgIC8vIFsnQG1lL2xvZycsICdAbWUvdGlueS1sb2cnLCDigKZdXG4gKiBwZXJtdXRlKFsnbG9nJ10sIHsgcHJlZml4ZXM6IFsndWx0cmEnXSB9KSAgICAgLy8gWydsb2cnLCAndWx0cmEtbG9nJywgJ3VsdHJhbG9nJywg4oCmXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGVybXV0ZShzZWVkcywgb3B0cyA9IHt9KSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShzZWVkcykgfHwgc2VlZHMubGVuZ3RoID09PSAwKSByZXR1cm4gW11cblxuICBjb25zdCBwcmVmaXhlcyA9IG9wdHMucHJlZml4ZXMgPz8gREVGQVVMVF9QUkVGSVhFU1xuICBjb25zdCBzdWZmaXhlcyA9IG9wdHMuc3VmZml4ZXMgPz8gREVGQVVMVF9TVUZGSVhFU1xuICBjb25zdCBjb25uZWN0b3JzID1cbiAgICBvcHRzLmNvbm5lY3RvcnMgPz8gKG9wdHMuc2hvdWxkSW5jbHVkZVVuZGVyc2NvcmUgPyBbLi4uQ09OTkVDVE9SUywgJ18nXSA6IENPTk5FQ1RPUlMpXG4gIGNvbnN0IHNob3VsZENvbWJpbmVUd29TZWVkcyA9IG9wdHMuc2hvdWxkQ29tYmluZVR3b1NlZWRzICE9PSBmYWxzZVxuICBjb25zdCBzY29wZSA9IG9wdHMuc2NvcGVcblxuICBjb25zdCBjbGVhbmVkID0gc2VlZHNcbiAgICAubWFwKChzKSA9PiBTdHJpbmcocykudHJpbSgpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmZpbHRlcigocykgPT4gcy5sZW5ndGggPiAwICYmIC9eW2EtejAtOV0rJC8udGVzdChzKSlcblxuICBjb25zdCBvdXQgPSBuZXcgU2V0KClcblxuICBmb3IgKGNvbnN0IHMgb2YgY2xlYW5lZCkgb3V0LmFkZChzKVxuXG4gIGlmIChzaG91bGRDb21iaW5lVHdvU2VlZHMpIHtcbiAgICBmb3IgKGNvbnN0IGEgb2YgY2xlYW5lZCkge1xuICAgICAgZm9yIChjb25zdCBiIG9mIGNsZWFuZWQpIHtcbiAgICAgICAgaWYgKGEgPT09IGIpIGNvbnRpbnVlXG4gICAgICAgIGZvciAoY29uc3Qgc2VwIG9mIGNvbm5lY3RvcnMpIG91dC5hZGQoYSArIHNlcCArIGIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBwIG9mIHByZWZpeGVzKSB7XG4gICAgZm9yIChjb25zdCBzIG9mIGNsZWFuZWQpIHtcbiAgICAgIGlmIChwID09PSBzKSBjb250aW51ZVxuICAgICAgZm9yIChjb25zdCBzZXAgb2YgY29ubmVjdG9ycykgb3V0LmFkZChwICsgc2VwICsgcylcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHMgb2YgY2xlYW5lZCkge1xuICAgIGZvciAoY29uc3Qgc2Ygb2Ygc3VmZml4ZXMpIHtcbiAgICAgIGlmIChzZiA9PT0gcykgY29udGludWVcbiAgICAgIGZvciAoY29uc3Qgc2VwIG9mIGNvbm5lY3RvcnMpIG91dC5hZGQocyArIHNlcCArIHNmKVxuICAgIH1cbiAgfVxuXG4gIGxldCBuYW1lcyA9IFsuLi5vdXRdXG4gIGlmIChzY29wZSkgbmFtZXMgPSBuYW1lcy5tYXAoKG4pID0+IGAke3Njb3BlfS8ke259YClcbiAgcmV0dXJuIG5hbWVzXG59XG5cbi8qKlxuICogU2NvcmUgYSBjYW5kaWRhdGUgbmFtZSBmb3IgcmFua2luZy4gTG93ZXIgaXMgYmV0dGVyLlxuICogICAtIHNob3J0ZXIgbmFtZXMgcmFuayBsb3dlciAocHJlZmVycmVkKVxuICogICAtIGh5cGhlbmF0ZWQgbmFtZXMgcmFuayBsb3dlciB0aGFuIGNvbmNhdGVuYXRlZCAobW9yZSByZWFkYWJsZSlcbiAqICAgLSBuYW1lcyBjb250YWluaW5nIGEgc2VlZCByYW5rIGxvd2VyIChhbmNob3IgcmVsZXZhbmNlKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzZWVkc1xuICogQHJldHVybnMge251bWJlcn1cbiAqIEBleGFtcGxlXG4gKiBzY29yZSgnbG9nJykgICAgICAgICAgICAgICAgICAgICAgIC8vIDNcbiAqIHNjb3JlKCd0aW55LWxvZycsIFsnbG9nJ10pICAgICAgICAgLy8gOCAtIDIgKGh5cGhlbikgLSAzIChjb250YWlucyBzZWVkKSA9IDNcbiAqIHNjb3JlKCdsb2dnZXJfcHJvJywgWydsb2cnXSkgICAgICAgLy8gMTAgKyAxICh1bmRlcnNjb3JlKSAtIDMgKGNvbnRhaW5zIHNlZWQpID0gOFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NvcmUobmFtZSwgc2VlZHMgPSBbXSkge1xuICBjb25zdCBsb3dlciA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICBsZXQgcmVzdWx0ID0gbG93ZXIubGVuZ3RoXG4gIGlmIChsb3dlci5pbmNsdWRlcygnLScpKSByZXN1bHQgLT0gMlxuICBpZiAobG93ZXIuaW5jbHVkZXMoJ18nKSkgcmVzdWx0ICs9IDFcbiAgZm9yIChjb25zdCBzZWVkIG9mIHNlZWRzKSB7XG4gICAgaWYgKGxvd2VyLmluY2x1ZGVzKHNlZWQudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIHJlc3VsdCAtPSAzXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCB7IERFRkFVTFRfUFJFRklYRVMsIERFRkFVTFRfU1VGRklYRVMgfVxuIiwiLy8gbnBtIG1vbmlrZXIgY29sbGlzaW9uIHJ1bGUuIFdoZW4geW91IHB1Ymxpc2ggYSBuZXcgdW5zY29wZWQgcGFja2FnZSwgdGhlXG4vLyByZWdpc3RyeSByZWplY3RzIG5hbWVzIHdob3NlIGBsb3dlcmNhc2UgKyBzdHJpcCBbLl8tXWAgZm9ybSBjb2xsaWRlcyB3aXRoXG4vLyBhbiBleGlzdGluZyBwYWNrYWdlLiBTb3VyY2U6IGh0dHBzOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xNjg5NzgzNzc1NzAvbmV3LXBhY2thZ2UtbW9uaWtlci1ydWxlc1xuLy9cbi8vIElNUE9SVEFOVCDigJQgdmFyaWFudCBlbnVtZXJhdGlvbiBpcyAqcHJvYmFiaWxpc3RpYyosIG5vdCBleGhhdXN0aXZlLiBXZVxuLy8gZW51bWVyYXRlIG9uZS0gYW5kIHR3by1wb3NpdGlvbiBzZXBhcmF0b3IgaW5zZXJ0aW9ucyBwbHVzIGZ1bGwtc3BsaXRcbi8vIGZvcm1zLiBQYXRob2xvZ2ljYWwgbXVsdGktaW5zZXJ0aW9uIHZhcmlhbnRzIChgYS5iLWNfZGVmYC1zdHlsZSkgYW5kXG4vLyBtaXhlZC1zZXBhcmF0b3IgMysgaW5zZXJ0aW9ucyBjYW4gbm9ybWFsaXplIHRvIHRoZSBzYW1lIGZvcm0gYnV0IHdvbid0XG4vLyBiZSBxdWVyaWVkLiBEcnktcnVuIHB1Ymxpc2hpbmcgZG9lcyBub3QgaW52b2tlIHRoZSBzZXJ2ZXItc2lkZSBtb25pa2VyIGNoZWNrLlxuXG5pbXBvcnQgeyBhdHRlbXB0QXN5bmMgfSBmcm9tICdtYXNzYW1hbidcblxuaW1wb3J0IHtcbiAgTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0RFRkFVTFQsXG4gIE1PTklLRVJfMklOU0VSVF9DQVBfQkFTRV9FWEhBVVNUSVZFLFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9ERUZBVUxULFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9FWEhBVVNUSVZFLFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0RFRkFVTFQsXG4gIE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfRVhIQVVTVElWRSxcbn0gZnJvbSAnLi9jb25zdGFudHMubWpzJ1xuXG5jb25zdCBTRVBBUkFUT1JTID0gWyctJywgJ18nLCAnLiddXG5cbi8qKlxuICogTm9ybWFsaXplIGEgbmFtZSB0aGUgd2F5IG5wbSdzIG1vbmlrZXIgY29sbGlzaW9uIGNoZWNrIGRvZXM6IGxvd2VyY2FzZVxuICogYW5kIHN0cmlwIHRoZSBwdW5jdHVhdGlvbiBjaGFycyBgLmAsIGAtYCwgYF9gLiBTY29wZWQgbmFtZXMga2VlcCB0aGVpclxuICogc2NvcGUgc2VnbWVudC5cbiAqXG4gKiAqKkFTQ0lJIHByZWNvbmRpdGlvbi4qKiBUaGlzIG1pcnJvcnMgbnBtJ3Mgc2VydmVyLXNpZGUgcnVsZSBleGFjdGx5LCB3aGljaFxuICogcHJlZGF0ZXMgVW5pY29kZS1hd2FyZSBub3JtYWxpemF0aW9uLiBOYW1lcyB3aXRoIFVuaWNvZGUgKGUuZy4gYMSwYCDihpIgYGnMh2BcbiAqIGluIHNvbWUgbG9jYWxlcywgYMOfYCDihpIgYHNzYCkgYXJlICpub3QqIGNhbm9uaWNhbGl6ZWQgaGVyZTsgdGhleSdyZSBhbHJlYWR5XG4gKiByZWplY3RlZCB1cHN0cmVhbSBieSBgdmFsaWRhdGUtbnBtLXBhY2thZ2UtbmFtZWAncyBVUkwtc2FmZXR5IGNoZWNrLiBJZlxuICogbm9uLUFTQ0lJIHNsaXBzIHRocm91Z2gsIGVxdWl2YWxlbmNlIG1heSBub3QgbWF0Y2ggdGhlIHJlZ2lzdHJ5J3MgYmVoYXZpb3IuXG4gKlxuICogUmV0dXJucyBgJydgIGZvciBub24tc3RyaW5nIC8gZW1wdHkgaW5wdXQgc28gY2FsbGVycyBjYW4gYnJhbmNoIHdpdGhvdXRcbiAqIGEgc2VwYXJhdGUgZ3VhcmQuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQGV4YW1wbGVcbiAqIG5vcm1hbGl6ZSgnUGljby1Mb2cnKSAgICAgICAgIC8vICdwaWNvbG9nJ1xuICogbm9ybWFsaXplKCdqcy1vbi1zdHJlYW0nKSAgICAgLy8gJ2pzb25zdHJlYW0nICAoY29sbGlkZXMgd2l0aCBganNvbnN0cmVhbWApXG4gKiBub3JtYWxpemUoJ0BaYWMvUGljby1Mb2cnKSAgICAvLyAnQHphYy9waWNvbG9nJ1xuICogbm9ybWFsaXplKG51bGwpICAgICAgICAgICAgICAgLy8gJydcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIW5hbWUpIHJldHVybiAnJ1xuICBpZiAobmFtZS5zdGFydHNXaXRoKCdAJykpIHtcbiAgICBjb25zdCBzbGFzaCA9IG5hbWUuaW5kZXhPZignLycpXG4gICAgaWYgKHNsYXNoIDwgMCkgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IHNjb3BlID0gbmFtZS5zbGljZSgwLCBzbGFzaCArIDEpLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBiYXJlID0gbmFtZVxuICAgICAgLnNsaWNlKHNsYXNoICsgMSlcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAucmVwbGFjZSgvWy5fLV0vZywgJycpXG4gICAgcmV0dXJuIHNjb3BlICsgYmFyZVxuICB9XG4gIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy5fLV0vZywgJycpXG59XG5cbi8qKlxuICogUmVqZWN0IGlucHV0cyBjb250YWluaW5nIHdoaXRlc3BhY2Ugb3IgQVNDSUkgY29udHJvbCBieXRlcy4gVGhlIGNoZWNrIGlzXG4gKiB3cml0dGVuIGFzIGEgY29kZS1wb2ludCBsb29wIHJhdGhlciB0aGFuIGEgcmVnZXggd2l0aCBjb250cm9sIGNoYXJzIHNvXG4gKiB0aGUgc291cmNlIGZpbGUgc3RheXMgZnJlZSBvZiBsaXRlcmFsIGNvbnRyb2wgYnl0ZXMgKHdoaWNoIHdvdWxkIGFsc29cbiAqIHRyaXAgb3hsaW50J3Mgbm8tY29udHJvbC1yZWdleCBydWxlKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYXNJbnZhbGlkQ2hhcnMobmFtZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjb2RlID0gbmFtZS5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGNvZGUgPD0gMHgyMCB8fCBjb2RlID09PSAweDdmKSByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIG5hbWVzIHRoYXQgc2hhcmUgdGhlIGNhbmRpZGF0ZSdzIG5vcm1hbGl6ZWQgZm9ybS4gVGhlIGNhbGxlclxuICogcXVlcmllcyBlYWNoIHZhcmlhbnQgYWdhaW5zdCB0aGUgcmVnaXN0cnkgdG8gZGV0ZWN0IGNvbGxpc2lvbnMuIFRoZVxuICogMi1pbnNlcnRpb24gY2FwIHNjYWxlcyB3aXRoIG5hbWUgbGVuZ3RoIHNvIGxvbmdlciBtdWx0aS1tb3JwaGVtZSBuYW1lc1xuICogKGByZWFjdG5hdGl2ZW5hdmlnYXRpb25gIOKGkiBgcmVhY3QtbmF0aXZlLW5hdmlnYXRpb25gKSByZWFjaCB0aGVpclxuICogcmVhbGlzdGljIG1vcnBoZW1lIHNwbGl0cyBiZWZvcmUgdGhlIGNhcCBleGhhdXN0cy5cbiAqXG4gKiBCb3VuZGFyeSBndWFyZHMgcmVqZWN0IGlucHV0cyBgdmFsaWRhdGVOYW1lYCB3b3VsZCBhbHNvIHJlamVjdCDigJQga2VlcGluZ1xuICogdGhpcyBmdW5jdGlvbiBob25lc3Qgd2hlbiBjYWxsZWQgaW4gaXNvbGF0aW9uIHJhdGhlciB0aGFuIHJlbHlpbmcgb25cbiAqIHVwc3RyZWFtIGZpbHRlcmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHt7IGlzRXhoYXVzdGl2ZT86IGJvb2xlYW4gfX0gW29wdHNdIC0gd2lkZW5zIDItaW5zZXJ0aW9uIGNvdmVyYWdlXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKiBAZXhhbXBsZVxuICogdmFyaWFudHMoJ3BpY29sb2cnKSAgICAgICAgICAgLy8gWydwaWNvLWxvZycsICdwaWNvX2xvZycsICdwaWNvLmxvZycsICdwLWljb2xvZycsIOKApl1cbiAqIHZhcmlhbnRzKCdqc29uc3RyZWFtJykuaW5jbHVkZXMoJ2pzLW9uLXN0cmVhbScpICAgICAgICAgICAgICAgICAgICAvLyB0cnVlIChjYW5vbmljYWwgYmxvZyBleGFtcGxlKVxuICogdmFyaWFudHMoJ3JlYWN0bmF0aXZlbmF2aWdhdGlvbicpLmluY2x1ZGVzKCdyZWFjdC1uYXRpdmUtbmF2aWdhdGlvbicpIC8vIHRydWUgKGxvbmctbmFtZSBtb3JwaGVtZSBzcGxpdClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhbnRzKG5hbWUsIG9wdHMgPSB7fSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8ICFuYW1lKSByZXR1cm4gW11cbiAgaWYgKGhhc0ludmFsaWRDaGFycyhuYW1lKSkgcmV0dXJuIFtdXG5cbiAgY29uc3QgbG93ZXIgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgLy8gU2NvcGUtYXdhcmUgc3BsaXQg4oCUIGVtcHR5IHNjb3BlIChgQC9mb29gKSwgbWlzc2luZyBzbGFzaCAoYEBtZWApLCBvclxuICAvLyBtdWx0aS1zbGFzaCAoYEBtZS9mb28vYmFyYCkgYWxsIGZhaWwgdmFsaWRhdGVOYW1lIHVwc3RyZWFtLlxuICBsZXQgc2NvcGUgPSAnJ1xuICBsZXQgYmFyZUlucHV0ID0gbG93ZXJcbiAgaWYgKGxvd2VyLnN0YXJ0c1dpdGgoJ0AnKSkge1xuICAgIGNvbnN0IHNsYXNoID0gbG93ZXIuaW5kZXhPZignLycpXG4gICAgaWYgKHNsYXNoIDwgMCkgcmV0dXJuIFtdIC8vIGBAbWVgIOKAlCBubyBzbGFzaFxuICAgIGlmIChzbGFzaCA9PT0gMSkgcmV0dXJuIFtdIC8vIGBAL2Zvb2Ag4oCUIGVtcHR5IHNjb3BlXG4gICAgc2NvcGUgPSBsb3dlci5zbGljZSgwLCBzbGFzaCArIDEpXG4gICAgYmFyZUlucHV0ID0gbG93ZXIuc2xpY2Uoc2xhc2ggKyAxKVxuICAgIGlmIChiYXJlSW5wdXQuaW5jbHVkZXMoJy8nKSkgcmV0dXJuIFtdIC8vIGBAbWUvZm9vL2JhcmAg4oCUIG11bHRpLXNsYXNoXG4gIH1cbiAgaWYgKC9eWy0uX10vLnRlc3QoYmFyZUlucHV0KSkgcmV0dXJuIFtdIC8vIGxlYWRpbmcgc2VwYXJhdG9yIG9uIHRoZSBwa2cgc2VnbWVudFxuICBjb25zdCBiYXJlID0gYmFyZUlucHV0LnJlcGxhY2UoL1suXy1dL2csICcnKVxuICBpZiAoIWJhcmUpIHJldHVybiBbXVxuXG4gIGNvbnN0IG91dCA9IG5ldyBTZXQoKVxuICBvdXQuYWRkKHNjb3BlICsgYmFyZSlcblxuICAvLyAxLWluc2VydGlvbjogY292ZXIgdGhlIG1vc3QgY29tbW9uIG1vbmlrZXIgc2hhcGUgKGBmb28tYmFyYCDihpQgYGZvb2JhcmApLlxuICBmb3IgKGxldCBpID0gMTsgaSA8IGJhcmUubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGNvbnN0IHNlcCBvZiBTRVBBUkFUT1JTKSB7XG4gICAgICBvdXQuYWRkKHNjb3BlICsgYmFyZS5zbGljZSgwLCBpKSArIHNlcCArIGJhcmUuc2xpY2UoaSkpXG4gICAgfVxuICB9XG5cbiAgLy8gRnVsbC1zcGxpdDogYGYtby1vLWItYS1yYCAvIGBmX29fb19iX2FfcmAgZm9ybXMuXG4gIGlmIChiYXJlLmxlbmd0aCA+IDEpIHtcbiAgICBvdXQuYWRkKHNjb3BlICsgYmFyZS5zcGxpdCgnJykuam9pbignLScpKVxuICAgIG91dC5hZGQoc2NvcGUgKyBiYXJlLnNwbGl0KCcnKS5qb2luKCdfJykpXG4gIH1cblxuICAvLyAyLWluc2VydGlvbjogY2F0Y2hlcyBtdWx0aS1tb3JwaGVtZSBzcGxpdHMgKGBqcy1vbi1zdHJlYW1gIOKGlCBganNvbnN0cmVhbWAsXG4gIC8vIGByZWFjdC1uYXRpdmUtbmF2aWdhdGlvbmAg4oaUIGByZWFjdG5hdGl2ZW5hdmlnYXRpb25gKS4gSXRlcmF0ZXMgYnkgZ2FwIHNpemVcbiAgLy8gYXNjZW5kaW5nIHNvIGNvbW1vbiBtb3JwaGVtZSBzcGxpdHMgYXJlIHJlYWNoZWQgZmlyc3Q7IHRoZSBjYXAgc2NhbGVzXG4gIC8vIHdpdGggYmFyZS5sZW5ndGggc28gbG9uZ2VyIG5hbWVzIGdldCBhIGJ1ZGdldCBwcm9wb3J0aW9uYWwgdG8gdGhlaXJcbiAgLy8gcmVhbGlzdGljIGluc2VydGlvbiBzcGFjZS5cbiAgaWYgKGJhcmUubGVuZ3RoID49IDQpIHtcbiAgICBsZXQgYWRkZWQgPSAwXG4gICAgY29uc3QgY2FwID0gY2FwRm9yTGVuZ3RoKGJhcmUubGVuZ3RoLCBvcHRzLmlzRXhoYXVzdGl2ZSA9PT0gdHJ1ZSlcbiAgICBvdXRlcjogZm9yIChsZXQgZ2FwID0gMTsgZ2FwIDwgYmFyZS5sZW5ndGggLSAxOyBnYXArKykge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgKyBnYXAgPCBiYXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGogPSBpICsgZ2FwXG4gICAgICAgIGZvciAoY29uc3Qgc2VwQSBvZiBTRVBBUkFUT1JTKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBzZXBCIG9mIFNFUEFSQVRPUlMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9XG4gICAgICAgICAgICAgIHNjb3BlICsgYmFyZS5zbGljZSgwLCBpKSArIHNlcEEgKyBiYXJlLnNsaWNlKGksIGopICsgc2VwQiArIGJhcmUuc2xpY2UoailcbiAgICAgICAgICAgIGlmICghb3V0LmhhcyhjYW5kaWRhdGUpKSB7XG4gICAgICAgICAgICAgIG91dC5hZGQoY2FuZGlkYXRlKVxuICAgICAgICAgICAgICBhZGRlZCsrXG4gICAgICAgICAgICAgIGlmIChhZGRlZCA+PSBjYXApIGJyZWFrIG91dGVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRXhjbHVkZSB0aGUgbGl0ZXJhbCBpbnB1dCDigJQgaXRzIGV4aXN0ZW5jZSBpcyBjaGVja2VkIHNlcGFyYXRlbHksIG5vdCBhc1xuICAvLyBhIG1vbmlrZXIgY29sbGlzaW9uLiBXZSBkZWxldGUgdGhlIG9yaWdpbmFsIGBuYW1lYCwgbm90IGBsb3dlcmAsIHNvIHRoZVxuICAvLyBiYXJlIGxvd2VyY2FzZSBmb3JtIChhICpkaWZmZXJlbnQqIHN0cmluZykgc3Vydml2ZXMgZm9yIGlucHV0cyBsaWtlXG4gIC8vIGBGb29CYXJgIHdoZXJlIGBmb29iYXJgIGlzIGEgcmVhbCBtb25pa2VyIGNvbGxpZGVyIHRvIHF1ZXJ5LlxuICBvdXQuZGVsZXRlKG5hbWUpXG4gIHJldHVybiBbLi4ub3V0XVxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIHBlci1jYWxsIDItaW5zZXJ0aW9uIHZhcmlhbnQgY2FwLiBTY2FsZXMgbGluZWFybHkgd2l0aCBuYW1lXG4gKiBsZW5ndGgsIGJvdW5kZWQgYnkgYSBiYXNlIGZsb29yIGFuZCBhIGhhcmQgY2VpbGluZy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gYmFyZUxlbmd0aFxuICogQHBhcmFtIHtib29sZWFufSBpc0V4aGF1c3RpdmVcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYXBGb3JMZW5ndGgoYmFyZUxlbmd0aCwgaXNFeGhhdXN0aXZlKSB7XG4gIGNvbnN0IGJhc2UgPSBpc0V4aGF1c3RpdmUgPyBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfRVhIQVVTVElWRSA6IE1PTklLRVJfMklOU0VSVF9DQVBfQkFTRV9ERUZBVUxUXG4gIGNvbnN0IHNjYWxlID0gaXNFeGhhdXN0aXZlXG4gICAgPyBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0VYSEFVU1RJVkVcbiAgICA6IE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfREVGQVVMVFxuICBjb25zdCBjZWlsaW5nID0gaXNFeGhhdXN0aXZlXG4gICAgPyBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9FWEhBVVNUSVZFXG4gICAgOiBNT05JS0VSXzJJTlNFUlRfQ0FQX01BWF9ERUZBVUxUXG4gIHJldHVybiBNYXRoLm1pbihjZWlsaW5nLCBNYXRoLm1heChiYXNlLCBiYXJlTGVuZ3RoICogc2NhbGUpKVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbGxpc2lvblJlcG9ydFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gY29uZmxpY3RzIC0gdmFyaWFudHMgdGhlIHByZWRpY2F0ZSBjb25maXJtZWQgYXMgZXhpc3RpbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHVudmVyaWZpZWQgLSB2YXJpYW50cyB3aGVyZSB0aGUgcHJlZGljYXRlIHRocmV3OyB0aGVpclxuICogICBjb2xsaXNpb24gc3RhdHVzIGlzIHVua25vd24uIENhbGxlcnMgaW5mZXIgXCJjb2xsaWRlc1wiIGZyb21cbiAqICAgYGNvbmZsaWN0cy5sZW5ndGggPiAwYC5cbiAqL1xuXG5jb25zdCBGSU5EX0NPTExJU0lPTlNfREVGQVVMVF9DT05DVVJSRU5DWSA9IDEyXG5cbi8qKlxuICogR2l2ZW4gYSBjYW5kaWRhdGUgYW5kIGFuIGBleGlzdHMobmFtZSkgPT4gUHJvbWlzZTxib29sZWFuPmAgcHJlZGljYXRlLFxuICogcmV0dXJuIGFueSBtb25pa2VyIGNvbGxpc2lvbnMgZm91bmQgcGx1cyBhbnkgdmFyaWFudHMgd2hvc2UgbG9va3VwXG4gKiB0aHJldy4gQ2FsbGVycyBzaG91bGQgdHJlYXQgYSBub24tZW1wdHkgYHVudmVyaWZpZWRgIGFzIFwibW9uaWtlciBjaGVja1xuICogaW5jb21wbGV0ZVwiIHJhdGhlciB0aGFuIGlnbm9yaW5nIGl0LlxuICpcbiAqIFZhcmlhbnQgcHJvYmVzIHJ1biB3aXRoIGJvdW5kZWQgY29uY3VycmVuY3kgKGRlZmF1bHQgMTIpIHNvIGFcbiAqIG5ldHdvcmstYmFja2VkIGBleGlzdHNgIGRvZXNuJ3QgdW5sZWFzaCB0aG91c2FuZHMgb2YgcGFyYWxsZWwgcmVxdWVzdHNcbiAqIGZvciBsb25nIG5hbWVzIHdpdGggYC0tZXhoYXVzdGl2ZWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNhbmRpZGF0ZVxuICogQHBhcmFtIHsobmFtZTogc3RyaW5nKSA9PiBQcm9taXNlPGJvb2xlYW4+fSBleGlzdHNcbiAqIEBwYXJhbSB7eyBpc0V4aGF1c3RpdmU/OiBib29sZWFuLCBjb25jdXJyZW5jeT86IG51bWJlciB9fSBbb3B0c11cbiAqIEByZXR1cm5zIHtQcm9taXNlPENvbGxpc2lvblJlcG9ydD59XG4gKiBAZXhhbXBsZVxuICogY29uc3QgdGFrZW4gPSBuZXcgU2V0KFsnanMtb24tc3RyZWFtJ10pXG4gKiBhd2FpdCBmaW5kQ29sbGlzaW9ucygnanNvbnN0cmVhbScsIGFzeW5jIChuYW1lKSA9PiB0YWtlbi5oYXMobmFtZSkpXG4gKiAvLyB7IGNvbmZsaWN0czogWydqcy1vbi1zdHJlYW0nXSwgdW52ZXJpZmllZDogW10gfVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZENvbGxpc2lvbnMoY2FuZGlkYXRlLCBleGlzdHMsIG9wdHMgPSB7fSkge1xuICBjb25zdCB0b0NoZWNrID0gdmFyaWFudHMoY2FuZGlkYXRlLCBvcHRzKVxuICBjb25zdCBjb25jdXJyZW5jeSA9XG4gICAgTnVtYmVyLmlzSW50ZWdlcihvcHRzLmNvbmN1cnJlbmN5KSAmJiBvcHRzLmNvbmN1cnJlbmN5ID4gMFxuICAgICAgPyBvcHRzLmNvbmN1cnJlbmN5XG4gICAgICA6IEZJTkRfQ09MTElTSU9OU19ERUZBVUxUX0NPTkNVUlJFTkNZXG4gIGNvbnN0IHByb2JlcyA9IGF3YWl0IHJ1bkJvdW5kZWQodG9DaGVjaywgY29uY3VycmVuY3ksIGFzeW5jICh2YXJpYW50KSA9PiAoe1xuICAgIHZhcmlhbnQsXG4gICAgcmVzdWx0OiBhd2FpdCBhdHRlbXB0QXN5bmMoKCkgPT4gZXhpc3RzKHZhcmlhbnQpKSxcbiAgfSkpXG4gIC8vIGByZXN1bHQub2tgIG1lYW5zIHRoZSBwcm9iZSByZXR1cm5lZCAoZGlkbid0IHRocm93KTsgYHJlc3VsdC52YWx1ZWBcbiAgLy8gbWVhbnMgdGhlIHByZWRpY2F0ZSByZXBvcnRlZCB0aGUgdmFyaWFudCBhcyBleGlzdGluZyBvbiB0aGUgcmVnaXN0cnkuXG4gIC8vIEJvdGggbXVzdCBiZSB0cnV0aHkgdG8gY291bnQgYXMgYSBjb25maXJtZWQgY29sbGlzaW9uLlxuICBjb25zdCBjb25mbGljdHMgPSBwcm9iZXNcbiAgICAuZmlsdGVyKCh7IHJlc3VsdCB9KSA9PiByZXN1bHQub2sgJiYgcmVzdWx0LnZhbHVlKVxuICAgIC5tYXAoKHsgdmFyaWFudCB9KSA9PiB2YXJpYW50KVxuICBjb25zdCB1bnZlcmlmaWVkID0gcHJvYmVzLmZpbHRlcigoeyByZXN1bHQgfSkgPT4gIXJlc3VsdC5vaykubWFwKCh7IHZhcmlhbnQgfSkgPT4gdmFyaWFudClcbiAgcmV0dXJuIHsgY29uZmxpY3RzLCB1bnZlcmlmaWVkIH1cbn1cblxuLyoqXG4gKiBSdW4gYHRhc2soaXRlbSlgIGFnYWluc3QgZXZlcnkgaW5wdXQgd2l0aCBhdCBtb3N0IGBjb25jdXJyZW5jeWAgaW5cbiAqIGZsaWdodC4gVGlueSBzdHJ1Y3R1cmVkLWNvbmN1cnJlbmN5IHByaW1pdGl2ZSDigJQgZHVwbGljYXRlZCBmcm9tXG4gKiBgcmVnaXN0cnkubWpzOnBvb2xgIHNvIHRoaXMgbW9kdWxlIHN0YXlzIHN0YW5kYWxvbmUgZm9yIGxpYnJhcnlcbiAqIGNvbnN1bWVycyB3aG8gZG9uJ3QgaW1wb3J0IHRoZSByZWdpc3RyeS5cbiAqXG4gKiBAdGVtcGxhdGUgVCwgVVxuICogQHBhcmFtIHtUW119IGl0ZW1zXG4gKiBAcGFyYW0ge251bWJlcn0gY29uY3VycmVuY3lcbiAqIEBwYXJhbSB7KGl0ZW06IFQpID0+IFByb21pc2U8VT59IHRhc2tcbiAqIEByZXR1cm5zIHtQcm9taXNlPFVbXT59XG4gKiBAcHJpdmF0ZVxuICovXG5hc3luYyBmdW5jdGlvbiBydW5Cb3VuZGVkKGl0ZW1zLCBjb25jdXJyZW5jeSwgdGFzaykge1xuICBjb25zdCByZXN1bHRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogaXRlbXMubGVuZ3RoIH0pXG4gIGxldCBuZXh0ID0gMFxuICBhc3luYyBmdW5jdGlvbiB3b3JrZXIoKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gbmV4dCsrXG4gICAgICBpZiAoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIHJlc3VsdHNbaW5kZXhdID0gYXdhaXQgdGFzayhpdGVtc1tpbmRleF0pXG4gICAgfVxuICB9XG4gIGNvbnN0IHdvcmtlcnMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBNYXRoLm1pbihjb25jdXJyZW5jeSwgaXRlbXMubGVuZ3RoKSB9LCB3b3JrZXIpXG4gIGF3YWl0IFByb21pc2UuYWxsKHdvcmtlcnMpXG4gIHJldHVybiByZXN1bHRzXG59XG4iLCIvLyBUaGVTcGFuaXNoSW5xdWlzaXRpb25cblxuLy8gQ2FjaGUgdGhlIG1hdHJpeC4gTm90ZSB0aGF0IGlmIHlvdSBub3QgcGFzcyBhIGxpbWl0IHRoaXMgaW1wbGVtZW50YXRpb24gd2lsbCB1c2UgYSBkeW5hbWljYWxseSBjYWxjdWxhdGUgb25lLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKF9fdGhpcywgdGhhdCwgbGltaXQpIHtcblxuICB2YXIgdGhpc0xlbmd0aCA9IF9fdGhpcy5sZW5ndGgsXG4gICAgICB0aGF0TGVuZ3RoID0gdGhhdC5sZW5ndGgsXG4gICAgICBtYXRyaXggPSBbXTtcblxuICAvLyBJZiB0aGUgbGltaXQgaXMgbm90IGRlZmluZWQgaXQgd2lsbCBiZSBjYWxjdWxhdGUgZnJvbSB0aGlzIGFuZCB0aGF0IGFyZ3MuXG4gIGxpbWl0ID0gKGxpbWl0IHx8ICgodGhhdExlbmd0aCA+IHRoaXNMZW5ndGggPyB0aGF0TGVuZ3RoIDogdGhpc0xlbmd0aCkpKSsxO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGltaXQ7IGkrKykge1xuICAgIG1hdHJpeFtpXSA9IFtpXTtcbiAgICBtYXRyaXhbaV0ubGVuZ3RoID0gbGltaXQ7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGxpbWl0OyBpKyspIHtcbiAgICBtYXRyaXhbMF1baV0gPSBpO1xuICB9XG5cbiAgaWYgKE1hdGguYWJzKHRoaXNMZW5ndGggLSB0aGF0TGVuZ3RoKSA+IChsaW1pdCB8fCAxMDApKXtcbiAgICByZXR1cm4gcHJlcGFyZSAobGltaXQgfHwgMTAwKTtcbiAgfVxuICBpZiAodGhpc0xlbmd0aCA9PT0gMCl7XG4gICAgcmV0dXJuIHByZXBhcmUgKHRoYXRMZW5ndGgpO1xuICB9XG4gIGlmICh0aGF0TGVuZ3RoID09PSAwKXtcbiAgICByZXR1cm4gcHJlcGFyZSAodGhpc0xlbmd0aCk7XG4gIH1cblxuICAvLyBDYWxjdWxhdGUgbWF0cml4LlxuICB2YXIgaiwgdGhpc19pLCB0aGF0X2osIGNvc3QsIG1pbiwgdDtcbiAgZm9yIChpID0gMTsgaSA8PSB0aGlzTGVuZ3RoOyArK2kpIHtcbiAgICB0aGlzX2kgPSBfX3RoaXNbaS0xXTtcblxuICAgIC8vIFN0ZXAgNFxuICAgIGZvciAoaiA9IDE7IGogPD0gdGhhdExlbmd0aDsgKytqKSB7XG4gICAgICAvLyBDaGVjayB0aGUgamFnZ2VkIGxkIHRvdGFsIHNvIGZhclxuICAgICAgaWYgKGkgPT09IGogJiYgbWF0cml4W2ldW2pdID4gNCkgcmV0dXJuIHByZXBhcmUgKHRoaXNMZW5ndGgpO1xuXG4gICAgICB0aGF0X2ogPSB0aGF0W2otMV07XG4gICAgICBjb3N0ID0gKHRoaXNfaSA9PT0gdGhhdF9qKSA/IDAgOiAxOyAvLyBTdGVwIDVcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbWluaW11bSAobXVjaCBmYXN0ZXIgdGhhbiBNYXRoLm1pbiguLi4pKS5cbiAgICAgIG1pbiAgICA9IG1hdHJpeFtpIC0gMV1baiAgICBdICsgMTsgLy8gRGVsZXRpb24uXG4gICAgICBpZiAoKHQgPSBtYXRyaXhbaSAgICBdW2ogLSAxXSArIDEgICApIDwgbWluKSBtaW4gPSB0OyAgIC8vIEluc2VydGlvbi5cbiAgICAgIGlmICgodCA9IG1hdHJpeFtpIC0gMV1baiAtIDFdICsgY29zdCkgPCBtaW4pIG1pbiA9IHQ7ICAgLy8gU3Vic3RpdHV0aW9uLlxuXG4gICAgICAvLyBVcGRhdGUgbWF0cml4LlxuICAgICAgbWF0cml4W2ldW2pdID0gKGkgPiAxICYmIGogPiAxICYmIHRoaXNfaSA9PT0gdGhhdFtqLTJdICYmIF9fdGhpc1tpLTJdID09PSB0aGF0X2ogJiYgKHQgPSBtYXRyaXhbaS0yXVtqLTJdK2Nvc3QpIDwgbWluKSA/IHQgOiBtaW47IC8vIFRyYW5zcG9zaXRpb24uXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByZXBhcmUgKG1hdHJpeFt0aGlzTGVuZ3RoXVt0aGF0TGVuZ3RoXSk7XG5cbi8qKlxuICpcbiAqL1xuICBmdW5jdGlvbiBwcmVwYXJlKHN0ZXBzKSB7XG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KHRoaXNMZW5ndGgsIHRoYXRMZW5ndGgpXG4gICAgdmFyIHJlbGF0aXZlID0gbGVuZ3RoID09PSAwXG4gICAgICA/IDBcbiAgICAgIDogKHN0ZXBzIC8gbGVuZ3RoKTtcbiAgICB2YXIgc2ltaWxhcml0eSA9IDEgLSByZWxhdGl2ZVxuICAgIHJldHVybiB7XG4gICAgICBzdGVwczogc3RlcHMsXG4gICAgICByZWxhdGl2ZTogcmVsYXRpdmUsXG4gICAgICBzaW1pbGFyaXR5OiBzaW1pbGFyaXR5XG4gICAgfTtcbiAgfVxuXG59O1xuIiwiLy8gTmVhci1tYXRjaCAodHlwb3NxdWF0KSBkZXRlY3Rpb24g4oCUIGZsYWdzIGNhbmRpZGF0ZXMgd2l0aGluIOKJpCBOIGVkaXRzIG9mXG4vLyBhIHBvcHVsYXIgbnBtIHBhY2thZ2UuIERpc3RpbmN0IGZyb20gbnBtJ3MgbW9uaWtlciBydWxlICh3aGljaCBvbmx5XG4vLyBjYXRjaGVzIG5hbWVzIHRoYXQgKm5vcm1hbGl6ZSogaWRlbnRpY2FsbHkpLiBTaW5nbGUtbGV0dGVyIHN1YnN0aXR1dGlvbnNcbi8vIGxpa2UgYGV4dG9vbGtpdGAgdnMgYGVzLXRvb2xraXRgIHdvdWxkIHB1Ymxpc2ggZmluZSBwZXIgdGhlIG1vbmlrZXIgcnVsZVxuLy8gYnV0IGFyZSBjbGFzc2ljIHR5cG9zcXVhdCBzaGFwZXMuXG4vL1xuLy8gRGlzdGFuY2UgaXMgT3B0aW1hbCBTdHJpbmcgQWxpZ25tZW50IChPU0EpIGZyb20gdGhlIGBkYW1lcmF1LWxldmVuc2h0ZWluYFxuLy8gcGFja2FnZSDigJQgY291bnRzIGluc2VydGlvbnMsIGRlbGV0aW9ucywgc3Vic3RpdHV0aW9ucywgYW5kIGFkamFjZW50XG4vLyB0cmFuc3Bvc2l0aW9ucyBhcyBvbmUgZWRpdCBlYWNoLCBidXQgZG9lcyBub3QgYWxsb3cgYSBzdWJzdHJpbmcgdG8gYmVcbi8vIGVkaXRlZCBtb3JlIHRoYW4gb25jZS4gRm9yIHR5cG9zcXVhdCBkZXRlY3Rpb24gYXQgZGlzdGFuY2Ug4omkIDIgdGhpcyBpc1xuLy8gaW5kaXN0aW5ndWlzaGFibGUgZnJvbSB1bnJlc3RyaWN0ZWQgRGFtZXJhdS1MZXZlbnNodGVpbjsgdGhlIGRpc3RpbmN0aW9uXG4vLyBvbmx5IG1hdHRlcnMgYXQgZGlzdGFuY2UgMysgKGUuZy4sIGBvc2FEaXN0YW5jZSgnY2EnLCAnYWJjJykgPT09IDNgXG4vLyB3aGlsZSB0cnVlIERMIHdvdWxkIHNheSAyKS5cbi8vXG4vLyBUaGlzIG1vZHVsZSBpcyAqcHVyZSo6IGNhbGxlcnMgcGFzcyB0aGUgY29ycHVzLiBUaGUgY29ycHVzIGxvYWRlciBpcyBpblxuLy8gYGNvcnB1cy5tanNgIGFuZCByZXR1cm5zIGEgUmVzdWx0IHNvIENMSSAvIGNvbnN1bWVycyBoYW5kbGUgZmFpbHVyZSBhdFxuLy8gdGhlaXIgb3duIGJvdW5kYXJ5LlxuXG5pbXBvcnQgZGFtZXJhdUxldmVuc2h0ZWluIGZyb20gJ2RhbWVyYXUtbGV2ZW5zaHRlaW4nXG5cbmltcG9ydCB7IE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFLCBORUFSX01BVENIX01JTl9DT1JQVVNfTEVOIH0gZnJvbSAnLi9jb25zdGFudHMubWpzJ1xuaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSAnLi9tb25pa2VyLm1qcydcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBOZWFyTWF0Y2hcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gdGhlIHBvcHVsYXIgcGFja2FnZSB0aGUgY2FuZGlkYXRlIHJlc2VtYmxlc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGRpc3RhbmNlIC0gZWRpdCBkaXN0YW5jZSBiZXR3ZWVuIG5vcm1hbGl6ZWQgZm9ybXNcbiAqL1xuXG4vKipcbiAqIE9wdGltYWwgU3RyaW5nIEFsaWdubWVudCBkaXN0YW5jZSDigJQgaW5zZXJ0aW9ucywgZGVsZXRpb25zLCBzdWJzdGl0dXRpb25zLFxuICogYW5kIGFkamFjZW50IHRyYW5zcG9zaXRpb25zIGNvdW50IGFzIG9uZSBlZGl0IGVhY2guIEZvciBkaXN0YW5jZSDiiaQgMiB0aGlzXG4gKiBlcXVhbHMgdW5yZXN0cmljdGVkIERhbWVyYXUtTGV2ZW5zaHRlaW47IHRoZSB0d28gZGlmZmVyIG9ubHkgYXQgZGlzdGFuY2VcbiAqIDMrLCB3aGljaCBpcyBvdXRzaWRlIG91ciB0eXBvc3F1YXQgYnVkZ2V0IGFueXdheS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYVxuICogQHBhcmFtIHtzdHJpbmd9IGJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAZXhhbXBsZVxuICogb3NhRGlzdGFuY2UoJ3JlYWN0JywgJ3JhZWN0JykgIC8vIDEgIChhZGphY2VudCB0cmFuc3Bvc2l0aW9uKVxuICogb3NhRGlzdGFuY2UoJ2NhdCcsICdjYXJ0JykgICAgIC8vIDEgIChpbnNlcnRpb24pXG4gKiBvc2FEaXN0YW5jZSgnY2EnLCAnYWJjJykgICAgICAgLy8gMyAgKHRydWUgREwgd291bGQgYmUgMiDigJQgT1NBJ3MgcmVzdHJpY3Rpb24pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvc2FEaXN0YW5jZShhLCBiKSB7XG4gIHJldHVybiBkYW1lcmF1TGV2ZW5zaHRlaW4oYSwgYikuc3RlcHNcbn1cblxuLyoqXG4gKiBGaW5kIHBvcHVsYXIgbnBtIHBhY2thZ2VzIHdpdGhpbiBgbWF4RGlzdGFuY2VgIGVkaXRzIG9mIGBjYW5kaWRhdGVgLFxuICogY29tcGFyaW5nIG9uIG5vcm1hbGl6ZWQgZm9ybXMgKGBsb3dlcmNhc2UgKyBzdHJpcCBbLl8tXWApLiBOYW1lcyB0aGF0XG4gKiBub3JtYWxpemUgaWRlbnRpY2FsbHkgdG8gdGhlIGNhbmRpZGF0ZSBhcmUgZXhjbHVkZWQg4oCUIHRob3NlIGFyZSBtb25pa2VyXG4gKiBjb2xsaXNpb25zIGFuZCBhcmUgcmVwb3J0ZWQgYnkgdGhlIG1vbmlrZXIgbGF5ZXIuXG4gKlxuICogUmVzdWx0cyBkZWR1cGUgYnkgbm9ybWFsaXplZCBmb3JtIChrZWVwaW5nIHRoZSBoaWdoZXN0LXJhbmtlZCB2YXJpYW50KVxuICogYW5kIHNvcnQgYnkgZGlzdGFuY2UgYXNjZW5kaW5nLCB0aGVuIGJ5IGNvcnB1cyByYW5rIGFzY2VuZGluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FuZGlkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBjb3JwdXMgLSBwb3B1bGFyIHBhY2thZ2UgbmFtZXMsIGRlc2NlbmRpbmcgYnkgcmFua1xuICogQHBhcmFtIHt7IG1heERpc3RhbmNlPzogbnVtYmVyLCBtaW5Db3JwdXNMZW4/OiBudW1iZXIgfX0gW29wdHNdXG4gKiBAcmV0dXJucyB7TmVhck1hdGNoW119XG4gKiBAZXhhbXBsZVxuICogZmluZE5lYXJNYXRjaGVzKCdleHRvb2xraXQnLCBbJ2VzLXRvb2xraXQnLCAncmVhY3QnXSlcbiAqIC8vIFt7IG5hbWU6ICdlcy10b29sa2l0JywgZGlzdGFuY2U6IDEgfV1cbiAqXG4gKiBmaW5kTmVhck1hdGNoZXMoJ2VzdG9vbGtpdCcsIFsnZXMtdG9vbGtpdCddKVxuICogLy8gW10gIChzYW1lIG5vcm1hbGl6ZWQgZm9ybSDigJQgdGhhdCdzIGEgbW9uaWtlciBjb2xsaXNpb24sIG5vdCBhIG5lYXItbWF0Y2gpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTmVhck1hdGNoZXMoY2FuZGlkYXRlLCBjb3JwdXMsIG9wdHMgPSB7fSkge1xuICBpZiAodHlwZW9mIGNhbmRpZGF0ZSAhPT0gJ3N0cmluZycgfHwgIWNhbmRpZGF0ZSkgcmV0dXJuIFtdXG4gIGlmICghQXJyYXkuaXNBcnJheShjb3JwdXMpKSByZXR1cm4gW11cblxuICBjb25zdCBtYXhEaXN0YW5jZSA9IG9wdHMubWF4RGlzdGFuY2UgPz8gTkVBUl9NQVRDSF9NQVhfRElTVEFOQ0VcbiAgY29uc3QgbWluQ29ycHVzTGVuID0gb3B0cy5taW5Db3JwdXNMZW4gPz8gTkVBUl9NQVRDSF9NSU5fQ09SUFVTX0xFTlxuXG4gIGNvbnN0IGNhbmRCYXJlID0gc2NvcGVTdHJpcChjYW5kaWRhdGUpXG4gIGlmIChjYW5kQmFyZSA9PT0gbnVsbCkgcmV0dXJuIFtdXG4gIGNvbnN0IGNhbmROb3JtID0gbm9ybWFsaXplKGNhbmRCYXJlKVxuICBpZiAoIWNhbmROb3JtKSByZXR1cm4gW11cblxuICAvLyBEZWR1cGUgYnkgbm9ybWFsaXplZCBmb3JtIOKAlCBrZWVwcyB0aGUgaGlnaGVzdC1yYW5rZWQgY29ycHVzIHZhcmlhbnRcbiAgLy8gKGxvd2VzdCBpbmRleCkgd2hlbiBtdWx0aXBsZSBuYW1lcyBjb2xsYXBzZSAoZS5nLiBgb2JqZWN0LWFzc2lnbmAgYW5kXG4gIC8vIGBvYmplY3QuYXNzaWduYCBib3RoIG5vcm1hbGl6ZSB0byBgb2JqZWN0YXNzaWduYCkuXG4gIC8qKiBAdHlwZSB7TWFwPHN0cmluZywgeyBuYW1lOiBzdHJpbmcsIGRpc3RhbmNlOiBudW1iZXIsIHJhbms6IG51bWJlciB9Pn0gKi9cbiAgY29uc3QgYmVzdEJ5Tm9ybSA9IG5ldyBNYXAoKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcnB1cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHBrZyA9IGNvcnB1c1tpXVxuICAgIGlmICh0eXBlb2YgcGtnICE9PSAnc3RyaW5nJyB8fCAhcGtnKSBjb250aW51ZVxuICAgIGlmIChwa2cubGVuZ3RoIDwgbWluQ29ycHVzTGVuKSBjb250aW51ZVxuICAgIGNvbnN0IHBrZ05vcm0gPSBub3JtYWxpemUocGtnKVxuICAgIGlmIChwa2dOb3JtID09PSBjYW5kTm9ybSkgY29udGludWVcbiAgICBpZiAoTWF0aC5hYnMocGtnTm9ybS5sZW5ndGggLSBjYW5kTm9ybS5sZW5ndGgpID4gbWF4RGlzdGFuY2UpIGNvbnRpbnVlXG4gICAgY29uc3QgZWRpdERpc3RhbmNlID0gb3NhRGlzdGFuY2UoY2FuZE5vcm0sIHBrZ05vcm0pXG4gICAgaWYgKGVkaXREaXN0YW5jZSA8PSAwIHx8IGVkaXREaXN0YW5jZSA+IG1heERpc3RhbmNlKSBjb250aW51ZVxuICAgIGNvbnN0IHByZXYgPSBiZXN0QnlOb3JtLmdldChwa2dOb3JtKVxuICAgIGlmICghcHJldiB8fCBpIDwgcHJldi5yYW5rKSB7XG4gICAgICBiZXN0QnlOb3JtLnNldChwa2dOb3JtLCB7IG5hbWU6IHBrZywgZGlzdGFuY2U6IGVkaXREaXN0YW5jZSwgcmFuazogaSB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbLi4uYmVzdEJ5Tm9ybS52YWx1ZXMoKV1cbiAgICAuc29ydCgoYSwgYikgPT4gYS5kaXN0YW5jZSAtIGIuZGlzdGFuY2UgfHwgYS5yYW5rIC0gYi5yYW5rKVxuICAgIC5tYXAoKHsgbmFtZSwgZGlzdGFuY2U6IGQgfSkgPT4gKHsgbmFtZSwgZGlzdGFuY2U6IGQgfSkpXG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBiYXJlIChwb3N0LXNjb3BlKSBwb3J0aW9uIG9mIGEgY2FuZGlkYXRlLCBvciBudWxsIGlmIHRoZSBpbnB1dFxuICogaGFzIGFuIGludmFsaWQgc3RydWN0dXJlIChlLmcuLCBtdWx0aS1zbGFzaCBsaWtlIGBAc2NvcGUvZm9vL2JhcmApLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVsbH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNjb3BlU3RyaXAobmFtZSkge1xuICBpZiAoIW5hbWUuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJy8nKSkgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gbmFtZVxuICB9XG4gIGNvbnN0IHNsYXNoID0gbmFtZS5pbmRleE9mKCcvJylcbiAgaWYgKHNsYXNoIDwgMCkgcmV0dXJuIG51bGxcbiAgY29uc3QgcmVzdCA9IG5hbWUuc2xpY2Uoc2xhc2ggKyAxKVxuICBpZiAocmVzdC5pbmNsdWRlcygnLycpKSByZXR1cm4gbnVsbFxuICByZXR1cm4gcmVzdFxufVxuIiwiIiwiJ3VzZSBzdHJpY3QnXG5jb25zdCBidWlsdGlucyA9IHJlcXVpcmUoJy4vYnVpbHRpbi1tb2R1bGVzLmpzb24nKVxuXG52YXIgc2NvcGVkUGFja2FnZVBhdHRlcm4gPSBuZXcgUmVnRXhwKCdeKD86QChbXi9dKz8pWy9dKT8oW14vXSs/KSQnKVxudmFyIGV4Y2x1c2lvbkxpc3QgPSBbXG4gICdub2RlX21vZHVsZXMnLFxuICAnZmF2aWNvbi5pY28nLFxuXVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSAobmFtZSkge1xuICB2YXIgd2FybmluZ3MgPSBbXVxuICB2YXIgZXJyb3JzID0gW11cblxuICBpZiAobmFtZSA9PT0gbnVsbCkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBiZSBudWxsJylcbiAgICByZXR1cm4gZG9uZSh3YXJuaW5ncywgZXJyb3JzKVxuICB9XG5cbiAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBiZSB1bmRlZmluZWQnKVxuICAgIHJldHVybiBkb25lKHdhcm5pbmdzLCBlcnJvcnMpXG4gIH1cblxuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgcmV0dXJuIGRvbmUod2FybmluZ3MsIGVycm9ycylcbiAgfVxuXG4gIGlmICghbmFtZS5sZW5ndGgpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBsZW5ndGggbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybycpXG4gIH1cblxuICBpZiAobmFtZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCBhIHBlcmlvZCcpXG4gIH1cblxuICBpZiAobmFtZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCBhIGh5cGhlbicpXG4gIH1cblxuICBpZiAobmFtZS5tYXRjaCgvXl8vKSkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBzdGFydCB3aXRoIGFuIHVuZGVyc2NvcmUnKVxuICB9XG5cbiAgaWYgKG5hbWUudHJpbSgpICE9PSBuYW1lKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IGNvbnRhaW4gbGVhZGluZyBvciB0cmFpbGluZyBzcGFjZXMnKVxuICB9XG5cbiAgLy8gTm8gZnVubnkgYnVzaW5lc3NcbiAgZXhjbHVzaW9uTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChleGNsdWRlZE5hbWUpIHtcbiAgICBpZiAobmFtZS50b0xvd2VyQ2FzZSgpID09PSBleGNsdWRlZE5hbWUpIHtcbiAgICAgIGVycm9ycy5wdXNoKGV4Y2x1ZGVkTmFtZSArICcgaXMgbm90IGEgdmFsaWQgcGFja2FnZSBuYW1lJylcbiAgICB9XG4gIH0pXG5cbiAgLy8gR2VuZXJhdGUgd2FybmluZ3MgZm9yIHN0dWZmIHRoYXQgdXNlZCB0byBiZSBhbGxvd2VkXG5cbiAgLy8gY29yZSBtb2R1bGUgbmFtZXMgbGlrZSBodHRwLCBldmVudHMsIHV0aWwsIGV0Y1xuICBpZiAoYnVpbHRpbnMuaW5jbHVkZXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgIHdhcm5pbmdzLnB1c2gobmFtZSArICcgaXMgYSBjb3JlIG1vZHVsZSBuYW1lJylcbiAgfVxuXG4gIGlmIChuYW1lLmxlbmd0aCA+IDIxNCkge1xuICAgIHdhcm5pbmdzLnB1c2goJ25hbWUgY2FuIG5vIGxvbmdlciBjb250YWluIG1vcmUgdGhhbiAyMTQgY2hhcmFjdGVycycpXG4gIH1cblxuICAvLyBtSXhlRCBDYVNlIG5BTUVzXG4gIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgIT09IG5hbWUpIHtcbiAgICB3YXJuaW5ncy5wdXNoKCduYW1lIGNhbiBubyBsb25nZXIgY29udGFpbiBjYXBpdGFsIGxldHRlcnMnKVxuICB9XG5cbiAgaWYgKC9bfichKCkqXS8udGVzdChuYW1lLnNwbGl0KCcvJykuc2xpY2UoLTEpWzBdKSkge1xuICAgIHdhcm5pbmdzLnB1c2goJ25hbWUgY2FuIG5vIGxvbmdlciBjb250YWluIHNwZWNpYWwgY2hhcmFjdGVycyAoXCJ+XFwnISgpKlwiKScpXG4gIH1cblxuICBpZiAoZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICE9PSBuYW1lKSB7XG4gICAgLy8gTWF5YmUgaXQncyBhIHNjb3BlZCBwYWNrYWdlIG5hbWUsIGxpa2UgQHVzZXIvcGFja2FnZVxuICAgIHZhciBuYW1lTWF0Y2ggPSBuYW1lLm1hdGNoKHNjb3BlZFBhY2thZ2VQYXR0ZXJuKVxuICAgIGlmIChuYW1lTWF0Y2gpIHtcbiAgICAgIHZhciB1c2VyID0gbmFtZU1hdGNoWzFdXG4gICAgICB2YXIgcGtnID0gbmFtZU1hdGNoWzJdXG5cbiAgICAgIGlmIChwa2cuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBzdGFydCB3aXRoIGEgcGVyaW9kJylcbiAgICAgIH1cblxuICAgICAgaWYgKGVuY29kZVVSSUNvbXBvbmVudCh1c2VyKSA9PT0gdXNlciAmJiBlbmNvZGVVUklDb21wb25lbnQocGtnKSA9PT0gcGtnKSB7XG4gICAgICAgIHJldHVybiBkb25lKHdhcm5pbmdzLCBlcnJvcnMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2FuIG9ubHkgY29udGFpbiBVUkwtZnJpZW5kbHkgY2hhcmFjdGVycycpXG4gIH1cblxuICByZXR1cm4gZG9uZSh3YXJuaW5ncywgZXJyb3JzKVxufVxuXG52YXIgZG9uZSA9IGZ1bmN0aW9uICh3YXJuaW5ncywgZXJyb3JzKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgdmFsaWRGb3JOZXdQYWNrYWdlczogZXJyb3JzLmxlbmd0aCA9PT0gMCAmJiB3YXJuaW5ncy5sZW5ndGggPT09IDAsXG4gICAgdmFsaWRGb3JPbGRQYWNrYWdlczogZXJyb3JzLmxlbmd0aCA9PT0gMCxcbiAgICB3YXJuaW5nczogd2FybmluZ3MsXG4gICAgZXJyb3JzOiBlcnJvcnMsXG4gIH1cbiAgaWYgKCFyZXN1bHQud2FybmluZ3MubGVuZ3RoKSB7XG4gICAgZGVsZXRlIHJlc3VsdC53YXJuaW5nc1xuICB9XG4gIGlmICghcmVzdWx0LmVycm9ycy5sZW5ndGgpIHtcbiAgICBkZWxldGUgcmVzdWx0LmVycm9yc1xuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0ZVxuIiwiLy8gVGhpbiB3cmFwcGVyIGFyb3VuZCB0aGUgb2ZmaWNpYWwgYHZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVgIHBhY2thZ2UuXG4vLyBXZSBwcmV2aW91c2x5IGhhbmQtcG9ydGVkIHRoZSBydWxlczsgdGhlIHVwc3RyZWFtIHBhY2thZ2UgaXMgdGhlIHNvdXJjZVxuLy8gb2YgdHJ1dGggYW5kIHN0YXlzIGluIHN5bmMgd2l0aCBucG0gaXRzZWxmLlxuXG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAndmFsaWRhdGUtbnBtLXBhY2thZ2UtbmFtZSdcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWYWxpZGF0ZVJlc3VsdFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1ZhbGlkIC0gdHJ1ZSBvbmx5IGlmIHRoZSBuYW1lIGlzIHZhbGlkIGZvciBORVcgcHVibGlzaGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSByZWFzb25zIC0gaHVtYW4tcmVhZGFibGUgcmVqZWN0aW9uIHJlYXNvbnM7IGVtcHR5IHdoZW4gdmFsaWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNTY29wZWQgLSB0cnVlIGlmIHRoZSBuYW1lIGlzIGluIHRoZSBgQHNjb3BlL25hbWVgIGZvcm1cbiAqL1xuXG4vKipcbiAqIFZhbGlkYXRlIGFuIG5wbSBwYWNrYWdlIG5hbWUuIENvbWJpbmVzIGVycm9ycyBhbmQgd2FybmluZ3MgaW50byBhIHNpbmdsZVxuICogcmVhc29uc1tdIGFycmF5IGJlY2F1c2UgZm9yICpuZXcqIHB1Ymxpc2hlcyBib3RoIGFyZSBibG9ja2Vycy5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG5hbWVcbiAqIEByZXR1cm5zIHtWYWxpZGF0ZVJlc3VsdH1cbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZU5hbWUoJ3RpbnktbG9nJykgICAgICAvLyB7IGlzVmFsaWQ6IHRydWUsICByZWFzb25zOiBbXSwgaXNTY29wZWQ6IGZhbHNlIH1cbiAqIHZhbGlkYXRlTmFtZSgnVGlueUxvZycpICAgICAgIC8vIHsgaXNWYWxpZDogZmFsc2UsIHJlYXNvbnM6IFsn4oCmY2FwaXRhbCBsZXR0ZXJzJ10sIGlzU2NvcGVkOiBmYWxzZSB9XG4gKiB2YWxpZGF0ZU5hbWUoJ0BtZS8uZm9vJykgICAgICAvLyB7IGlzVmFsaWQ6IGZhbHNlLCByZWFzb25zOiBbJ+KApnBlcmlvZCddLCBpc1Njb3BlZDogdHJ1ZSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU5hbWUobmFtZSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIHJlYXNvbnM6IFsnbmFtZSBtdXN0IGJlIGEgc3RyaW5nJ10sIGlzU2NvcGVkOiBmYWxzZSB9XG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gdmFsaWRhdGUobmFtZSlcbiAgY29uc3QgcmVhc29ucyA9IFsuLi4ocmVzdWx0LmVycm9ycyA/PyBbXSksIC4uLihyZXN1bHQud2FybmluZ3MgPz8gW10pXVxuICBjb25zdCBpc1Njb3BlZCA9IG5hbWUuc3RhcnRzV2l0aCgnQCcpICYmIG5hbWUuaW5jbHVkZXMoJy8nKVxuICByZXR1cm4geyBpc1ZhbGlkOiBCb29sZWFuKHJlc3VsdC52YWxpZEZvck5ld1BhY2thZ2VzKSwgcmVhc29ucywgaXNTY29wZWQgfVxufVxuIiwiLy8gUHVyZSBwaXBlbGluZSBwaWVjZXMgZm9yIHRoZSBucG0tbmFtZXIgQ0xJLiBOZXR3b3JrIEkvTyBsaXZlcyBpblxuLy8gYGNoZWNrLm1qczptYWluKClgIHdoaWNoIHNlcXVlbmNlcyB0aGVzZSBpbiBvcmRlcjsgZXZlcnl0aGluZyBoZXJlIGlzXG4vLyBkYXRhLWluIC8gZGF0YS1vdXQgc28gdW5pdCB0ZXN0cyBjYW4gY292ZXIgdGhlIHVudmVyaWZpZWQtbW9uaWtlciBwYXRoXG4vLyB3aXRob3V0IHRvdWNoaW5nIHRoZSByZWdpc3RyeS5cblxuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tICdtYXNzYW1hbidcblxuaW1wb3J0IHsgTkVBUl9NQVRDSF9NQVhfTkVJR0hCT1JTLCBWRVJESUNUX1VOVkVSSUZJRURfU0FNUExFIH0gZnJvbSAnLi9jb25zdGFudHMubWpzJ1xuaW1wb3J0IHsgdmFyaWFudHMgYXMgbW9uaWtlclZhcmlhbnRzIH0gZnJvbSAnLi9tb25pa2VyLm1qcydcbmltcG9ydCB7IGZpbmROZWFyTWF0Y2hlcyB9IGZyb20gJy4vbmVhci1tYXRjaC5tanMnXG5pbXBvcnQgeyB2YWxpZGF0ZU5hbWUgfSBmcm9tICcuL3ZhbGlkYXRlLm1qcydcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWZXJkaWN0QXZhaWxhYmxlXG4gKiBAcHJvcGVydHkgeydhdmFpbGFibGUnfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge0FycmF5PHtuYW1lOiBzdHJpbmcsIGRpc3RhbmNlOiBudW1iZXJ9Pn0gW25lYXJNYXRjaGVzXVxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RUYWtlblxuICogQHByb3BlcnR5IHsndGFrZW4nfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdE1vbmlrZXJcbiAqIEBwcm9wZXJ0eSB7J21vbmlrZXInfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBjb25mbGljdHNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWZXJkaWN0VW52ZXJpZmllZFxuICogQHByb3BlcnR5IHsndW52ZXJpZmllZCd9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHVudmVyaWZpZWQgLSBzYW1wbGUgKGNhcHBlZCBhdCBWRVJESUNUX1VOVkVSSUZJRURfU0FNUExFKVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVudmVyaWZpZWRUb3RhbFxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RJbnZhbGlkXG4gKiBAcHJvcGVydHkgeydpbnZhbGlkJ30gc3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gcmVhc29uc1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RVbmtub3duXG4gKiBAcHJvcGVydHkgeyd1bmtub3duJ30gc3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGh0dHBTdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZXJyb3JdXG4gKlxuICogQHR5cGVkZWYge1ZlcmRpY3RBdmFpbGFibGUgfCBWZXJkaWN0VGFrZW4gfCBWZXJkaWN0TW9uaWtlciB8IFZlcmRpY3RVbnZlcmlmaWVkIHwgVmVyZGljdEludmFsaWQgfCBWZXJkaWN0VW5rbm93bn0gVmVyZGljdFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTW9uaWtlclByb2JlXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBjb25mbGljdHMgLSBleGlzdGluZyBuYW1lcyB0aGF0IHNoYXJlIHRoZSBjYW5kaWRhdGUncyBub3JtYWxpemVkIGZvcm1cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHVudmVyaWZpZWQgLSB2YXJpYW50IG5hbWVzIHdob3NlIGxvb2t1cCBkaWRuJ3QgcmV0dXJuIHRha2VuL2ZyZWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRyaWFnZVJlc3VsdFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gdmFsaWQgLSBzeW50YWN0aWNhbGx5IHZhbGlkIGNhbmRpZGF0ZSBuYW1lc1xuICogQHByb3BlcnR5IHtWZXJkaWN0SW52YWxpZFtdfSBpbnZhbGlkIC0gYWxyZWFkeS1mb3JtZWQgaW52YWxpZCB2ZXJkaWN0c1xuICogQHByb3BlcnR5IHtTZXQ8c3RyaW5nPn0gc2NvcGVkIC0gc3Vic2V0IG9mIGB2YWxpZGAgd2hvc2UgbmFtZXMgYXJlIGBAc2NvcGUvbmFtZWBcbiAqL1xuXG4vKiogRnJvemVuIHNlbnRpbmVsIGZvciBjYW5kaWRhdGVzIHRoYXQgd2VyZW4ndCBwcm9iZWQgKGUuZy4gc2NvcGVkKS4gKi9cbmNvbnN0IEVNUFRZX1BST0JFID0gT2JqZWN0LmZyZWV6ZSh7IGNvbmZsaWN0czogT2JqZWN0LmZyZWV6ZShbXSksIHVudmVyaWZpZWQ6IE9iamVjdC5mcmVlemUoW10pIH0pXG5cbi8qKlxuICogU3BsaXQgY2FuZGlkYXRlcyBpbnRvIHN5bnRhY3RpY2FsbHktdmFsaWQgKyBhbHJlYWR5LXJlamVjdGVkLiBUaGUgc2NvcGVkXG4gKiBzdWJzZXQgaXMgdGFnZ2VkIHNlcGFyYXRlbHkgc28gbGF0ZXIgcGhhc2VzIGNhbiBza2lwIG1vbmlrZXIgcHJvYmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBjYW5kaWRhdGVzXG4gKiBAcmV0dXJucyB7VHJpYWdlUmVzdWx0fVxuICogQGV4YW1wbGVcbiAqIHRyaWFnZShbJ3RpbnktbG9nJywgJ1RpbnlMb2cnLCAnQG1lL2ZvbyddKVxuICogLy8geyB2YWxpZDogWyd0aW55LWxvZycsICdAbWUvZm9vJ10sIGludmFsaWQ6IFt7c3RhdHVzOidpbnZhbGlkJywgLi4ufV0sIHNjb3BlZDogU2V0IHsgJ0BtZS9mb28nIH0gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpYWdlKGNhbmRpZGF0ZXMpIHtcbiAgY29uc3QgdmFsaWQgPSBbXVxuICBjb25zdCBpbnZhbGlkID0gW11cbiAgY29uc3Qgc2NvcGVkID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgbmFtZSBvZiBjYW5kaWRhdGVzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdmFsaWRhdGVOYW1lKG5hbWUpXG4gICAgaWYgKHJlc3VsdC5pc1ZhbGlkKSB7XG4gICAgICB2YWxpZC5wdXNoKG5hbWUpXG4gICAgICBpZiAocmVzdWx0LmlzU2NvcGVkKSBzY29wZWQuYWRkKG5hbWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGludmFsaWQucHVzaCh7IHN0YXR1czogJ2ludmFsaWQnLCBuYW1lLCByZWFzb25zOiByZXN1bHQucmVhc29ucyB9KVxuICAgIH1cbiAgfVxuICByZXR1cm4geyB2YWxpZCwgaW52YWxpZCwgc2NvcGVkIH1cbn1cblxuLyoqXG4gKiBTZWxlY3Qgd2hpY2ggdW5zY29wZWQsIGxpdGVyYWwtZnJlZSBjYW5kaWRhdGVzIHNob3VsZCBiZSBtb25pa2VyLXByb2JlZFxuICogYW5kIGVudW1lcmF0ZSB0aGVpciB2YXJpYW50cy4gUmV0dXJucyB0aGUgdmFyaWFudCBsaXN0IHBlciBjYW5kaWRhdGVcbiAqIHBsdXMgdGhlIGRlZHVwbGljYXRlZCBzZXQgdGhlIGNhbGxlciBzaG91bGQgc2VuZCB0byB0aGUgcmVnaXN0cnkuXG4gKlxuICogQHBhcmFtIHt7XG4gKiAgIHZhbGlkOiBzdHJpbmdbXSxcbiAqICAgc2NvcGVkOiBTZXQ8c3RyaW5nPixcbiAqICAgZXhpc3RlbmNlOiBNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlPixcbiAqICAgaXNFeGhhdXN0aXZlOiBib29sZWFuLFxuICogfX0gaW5wdXRcbiAqIEByZXR1cm5zIHt7IHZhcmlhbnRzQnlOYW1lOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4sIGFsbFZhcmlhbnRzOiBTZXQ8c3RyaW5nPiB9fVxuICogQGV4YW1wbGVcbiAqIHNlbGVjdE1vbmlrZXJDYW5kaWRhdGVzKHtcbiAqICAgdmFsaWQ6IFsncGljb2xvZycsICdAbWUvc2NvcGVkJ10sXG4gKiAgIHNjb3BlZDogbmV3IFNldChbJ0BtZS9zY29wZWQnXSksXG4gKiAgIGV4aXN0ZW5jZTogbmV3IE1hcChbWydwaWNvbG9nJywgeyBraW5kOiAnZnJlZScsIG5hbWU6ICdwaWNvbG9nJywgc3RhdHVzOiA0MDQgfV1dKSxcbiAqICAgaXNFeGhhdXN0aXZlOiBmYWxzZSxcbiAqIH0pXG4gKiAvLyB7IHZhcmlhbnRzQnlOYW1lOiBNYXAgeyAncGljb2xvZycg4oaSIFsncGljby1sb2cnLCAncGljb19sb2cnLCDigKZdIH0sIGFsbFZhcmlhbnRzOiBTZXQgeyAuLi4gfSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RNb25pa2VyQ2FuZGlkYXRlcyh7IHZhbGlkLCBzY29wZWQsIGV4aXN0ZW5jZSwgaXNFeGhhdXN0aXZlIH0pIHtcbiAgY29uc3QgdmFyaWFudHNCeU5hbWUgPSBuZXcgTWFwKClcbiAgY29uc3QgYWxsVmFyaWFudHMgPSBuZXcgU2V0KClcbiAgZm9yIChjb25zdCBuYW1lIG9mIHZhbGlkKSB7XG4gICAgaWYgKHNjb3BlZC5oYXMobmFtZSkpIGNvbnRpbnVlXG4gICAgY29uc3QgbGl0ZXJhbCA9IGV4aXN0ZW5jZS5nZXQobmFtZSlcbiAgICBpZiAobGl0ZXJhbD8ua2luZCAhPT0gJ2ZyZWUnKSBjb250aW51ZVxuICAgIGNvbnN0IHZhcmlhbnRzID0gbW9uaWtlclZhcmlhbnRzKG5hbWUsIHsgaXNFeGhhdXN0aXZlIH0pXG4gICAgdmFyaWFudHNCeU5hbWUuc2V0KG5hbWUsIHZhcmlhbnRzKVxuICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiB2YXJpYW50cykgYWxsVmFyaWFudHMuYWRkKHZhcmlhbnQpXG4gIH1cbiAgcmV0dXJuIHsgdmFyaWFudHNCeU5hbWUsIGFsbFZhcmlhbnRzIH1cbn1cblxuLyoqXG4gKiBCdWNrZXQgZWFjaCBjYW5kaWRhdGUncyB2YXJpYW50IHJlc3VsdHMgaW50byBgeyBjb25mbGljdHMsIHVudmVyaWZpZWQgfWAuXG4gKiBVbmtub3duIHByb2JlcyBnbyB0byBgdW52ZXJpZmllZGAgc28gY2FsbGVycyBkb24ndCBjb25mbGF0ZSBcInJlZ2lzdHJ5XG4gKiBjb3VsZG4ndCBzYXlcIiB3aXRoIFwicmVnaXN0cnkgY29uZmlybWVkIGZyZWUuXCJcbiAqXG4gKiBAcGFyYW0ge3tcbiAqICAgdmFyaWFudHNCeU5hbWU6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPixcbiAqICAgdmFyaWFudFJlc3VsdHM6IGltcG9ydCgnLi9yZWdpc3RyeS5tanMnKS5FeGlzdGVuY2VbXSxcbiAqIH19IGlucHV0XG4gKiBAcmV0dXJucyB7TWFwPHN0cmluZywgTW9uaWtlclByb2JlPn1cbiAqIEBleGFtcGxlXG4gKiBhc3NlbWJsZU1vbmlrZXJQcm9iZXMoe1xuICogICB2YXJpYW50c0J5TmFtZTogbmV3IE1hcChbWydwaWNvbG9nJywgWydwaWNvLWxvZycsICdwaWNvX2xvZyddXV0pLFxuICogICB2YXJpYW50UmVzdWx0czogW1xuICogICAgIHsga2luZDogJ3Rha2VuJywgbmFtZTogJ3BpY28tbG9nJywgc3RhdHVzOiAyMDAgfSxcbiAqICAgICB7IGtpbmQ6ICd1bmtub3duJywgbmFtZTogJ3BpY29fbG9nJywgc3RhdHVzOiA0MjkgfSxcbiAqICAgXSxcbiAqIH0pXG4gKiAvLyBNYXAgeyAncGljb2xvZycg4oaSIHsgY29uZmxpY3RzOiBbJ3BpY28tbG9nJ10sIHVudmVyaWZpZWQ6IFsncGljb19sb2cnXSB9IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmxlTW9uaWtlclByb2Jlcyh7IHZhcmlhbnRzQnlOYW1lLCB2YXJpYW50UmVzdWx0cyB9KSB7XG4gIGNvbnN0IGJ5VmFyaWFudCA9IG5ldyBNYXAodmFyaWFudFJlc3VsdHMubWFwKChyZXN1bHQpID0+IFtyZXN1bHQubmFtZSwgcmVzdWx0XSkpXG4gIGNvbnN0IHByb2JlcyA9IG5ldyBNYXAoKVxuICBmb3IgKGNvbnN0IFtuYW1lLCB2YXJpYW50c10gb2YgdmFyaWFudHNCeU5hbWUpIHtcbiAgICBjb25zdCBjb25mbGljdHMgPSBbXVxuICAgIGNvbnN0IHVudmVyaWZpZWQgPSBbXVxuICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiB2YXJpYW50cykge1xuICAgICAgY29uc3Qga2luZCA9IGJ5VmFyaWFudC5nZXQodmFyaWFudCk/LmtpbmRcbiAgICAgIGlmIChraW5kID09PSAndGFrZW4nKSBjb25mbGljdHMucHVzaCh2YXJpYW50KVxuICAgICAgZWxzZSBpZiAoa2luZCA9PT0gJ3Vua25vd24nKSB1bnZlcmlmaWVkLnB1c2godmFyaWFudClcbiAgICB9XG4gICAgcHJvYmVzLnNldChuYW1lLCB7IGNvbmZsaWN0cywgdW52ZXJpZmllZCB9KVxuICB9XG4gIHJldHVybiBwcm9iZXNcbn1cblxuLyoqXG4gKiBCdWlsZCB0aGUgZmluYWwgdmVyZGljdCBtYXAgYnkgbWVyZ2luZyB0cmlhZ2UgcmVzdWx0cywgcmVnaXN0cnlcbiAqIGV4aXN0ZW5jZSwgYW5kIG1vbmlrZXIgcHJvYmVzLlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2YWxpZDogc3RyaW5nW10sXG4gKiAgIGludmFsaWQ6IFZlcmRpY3RJbnZhbGlkW10sXG4gKiAgIGV4aXN0ZW5jZTogTWFwPHN0cmluZywgaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZT4sXG4gKiAgIG1vbmlrZXJQcm9iZXM6IE1hcDxzdHJpbmcsIE1vbmlrZXJQcm9iZT4sXG4gKiB9fSBpbnB1dFxuICogQHJldHVybnMge01hcDxzdHJpbmcsIFZlcmRpY3Q+fVxuICogQGV4YW1wbGVcbiAqIGRlY2lkZSh7XG4gKiAgIHZhbGlkOiBbJ3BpY29sb2cnXSxcbiAqICAgaW52YWxpZDogW10sXG4gKiAgIGV4aXN0ZW5jZTogbmV3IE1hcChbWydwaWNvbG9nJywgeyBraW5kOiAnZnJlZScsIG5hbWU6ICdwaWNvbG9nJywgc3RhdHVzOiA0MDQgfV1dKSxcbiAqICAgbW9uaWtlclByb2JlczogbmV3IE1hcChbWydwaWNvbG9nJywgeyBjb25mbGljdHM6IFtdLCB1bnZlcmlmaWVkOiBbJ3BpY29fbG9nJ10gfV1dKSxcbiAqIH0pXG4gKiAvLyBNYXAgeyAncGljb2xvZycg4oaSIHsgc3RhdHVzOiAndW52ZXJpZmllZCcsIG5hbWU6ICdwaWNvbG9nJywgdW52ZXJpZmllZDogWydwaWNvX2xvZyddLCB1bnZlcmlmaWVkVG90YWw6IDEgfSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpZGUoeyB2YWxpZCwgaW52YWxpZCwgZXhpc3RlbmNlLCBtb25pa2VyUHJvYmVzIH0pIHtcbiAgY29uc3QgdmVyZGljdHMgPSBuZXcgTWFwKGludmFsaWQubWFwKCh2ZXJkaWN0KSA9PiBbdmVyZGljdC5uYW1lLCB2ZXJkaWN0XSkpXG4gIGZvciAoY29uc3QgbmFtZSBvZiB2YWxpZCkge1xuICAgIGNvbnN0IGxpdGVyYWwgPSBleGlzdGVuY2UuZ2V0KG5hbWUpXG4gICAgLy8gdmFsaWQgY2FuZGlkYXRlcyBtdXN0IGhhdmUgYW4gZXhpc3RlbmNlIGVudHJ5IOKAlCB0aGUgdXBzdHJlYW0gcGhhc2VcbiAgICAvLyBjb3ZlcnMgZXhhY3RseSBgdmFsaWRgLiBJZiB0aGlzIGZpcmVzLCB0aGUgaW52YXJpYW50IGJyb2tlLlxuICAgIGlmICghbGl0ZXJhbCkgdGhyb3cgbmV3IEVycm9yKGBkZWNpZGU6IG1pc3NpbmcgZXhpc3RlbmNlIHJlc3VsdCBmb3IgJHtuYW1lfWApXG4gICAgdmVyZGljdHMuc2V0KFxuICAgICAgbmFtZSxcbiAgICAgIGRlY2lkZU9uZSh7IG5hbWUsIGV4aXN0ZW5jZTogbGl0ZXJhbCwgcHJvYmU6IG1vbmlrZXJQcm9iZXMuZ2V0KG5hbWUpID8/IEVNUFRZX1BST0JFIH0pXG4gICAgKVxuICB9XG4gIHJldHVybiB2ZXJkaWN0c1xufVxuXG4vKipcbiAqIE1hcCBvbmUgY2FuZGlkYXRlJ3MgZXhpc3RlbmNlICsgbW9uaWtlciBwcm9iZSBpbnRvIGEgc2luZ2xlIFZlcmRpY3QuXG4gKiBQdXJlIOKAlCBtYXRjaGVzIGV4aGF1c3RpdmVseSBvbiBgZXhpc3RlbmNlLmtpbmRgLiBXaXRoaW4gYGZyZWVgLCB0aGVcbiAqIHZlcmRpY3QgaXMgYG1vbmlrZXJgIChkZWZpbml0aXZlIGNvbGxpc2lvbiksIGB1bnZlcmlmaWVkYCAoc29tZSB2YXJpYW50XG4gKiBwcm9iZXMgZmFpbGVkIGFuZCBubyBjb2xsaXNpb25zIHdlcmUgZGVmaW5pdGl2ZWx5IGZvdW5kKSwgb3IgYGF2YWlsYWJsZWBcbiAqIChhbGwgdmFyaWFudCBwcm9iZXMgY29tcGxldGVkIGNsZWFubHkpLlxuICpcbiAqIEBwYXJhbSB7eyBuYW1lOiBzdHJpbmcsIGV4aXN0ZW5jZTogaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZSwgcHJvYmU6IE1vbmlrZXJQcm9iZSB9fSBpbnB1dFxuICogQHJldHVybnMge1ZlcmRpY3R9XG4gKiBAZXhhbXBsZVxuICogZGVjaWRlT25lKHtcbiAqICAgbmFtZTogJ2V4dG9vbGtpdCcsXG4gKiAgIGV4aXN0ZW5jZTogeyBraW5kOiAnZnJlZScsIG5hbWU6ICdleHRvb2xraXQnLCBzdGF0dXM6IDQwNCB9LFxuICogICBwcm9iZTogeyBjb25mbGljdHM6IFtdLCB1bnZlcmlmaWVkOiBbXSB9LFxuICogfSlcbiAqIC8vIHsgc3RhdHVzOiAnYXZhaWxhYmxlJywgbmFtZTogJ2V4dG9vbGtpdCcgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaWRlT25lKHsgbmFtZSwgZXhpc3RlbmNlLCBwcm9iZSB9KSB7XG4gIHJldHVybiBtYXRjaChleGlzdGVuY2UpXG4gICAgLndpdGgoeyBraW5kOiAndGFrZW4nIH0sICgpID0+ICh7IHN0YXR1czogJ3Rha2VuJywgbmFtZSB9KSlcbiAgICAud2l0aCh7IGtpbmQ6ICd1bmtub3duJyB9LCAocmVzdWx0KSA9PiAoe1xuICAgICAgc3RhdHVzOiAndW5rbm93bicsXG4gICAgICBuYW1lLFxuICAgICAgaHR0cFN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICAgIC4uLihyZXN1bHQuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiB7IGVycm9yOiByZXN1bHQuZXJyb3IgfSksXG4gICAgfSkpXG4gICAgLndpdGgoeyBraW5kOiAnZnJlZScgfSwgKCkgPT4ge1xuICAgICAgaWYgKHByb2JlLmNvbmZsaWN0cy5sZW5ndGggPiAwKSByZXR1cm4geyBzdGF0dXM6ICdtb25pa2VyJywgbmFtZSwgY29uZmxpY3RzOiBwcm9iZS5jb25mbGljdHMgfVxuICAgICAgaWYgKHByb2JlLnVudmVyaWZpZWQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1czogJ3VudmVyaWZpZWQnLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgdW52ZXJpZmllZDogcHJvYmUudW52ZXJpZmllZC5zbGljZSgwLCBWRVJESUNUX1VOVkVSSUZJRURfU0FNUExFKSxcbiAgICAgICAgICB1bnZlcmlmaWVkVG90YWw6IHByb2JlLnVudmVyaWZpZWQubGVuZ3RoLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4geyBzdGF0dXM6ICdhdmFpbGFibGUnLCBuYW1lIH1cbiAgICB9KVxuICAgIC5leGhhdXN0aXZlKClcbn1cblxuLyoqXG4gKiBBbm5vdGF0ZSBgYXZhaWxhYmxlYCB2ZXJkaWN0cyB3aXRoIHVwIHRvIGBORUFSX01BVENIX01BWF9ORUlHSEJPUlNgXG4gKiB0eXBvc3F1YXQtc2hhcGVkIG5laWdoYm9ycyBmcm9tIHRoZSBwb3B1bGFyLW5hbWVzIGNvcnB1cy4gVGhlIG5hbWUgaXNcbiAqIHN0aWxsIHB1Ymxpc2hhYmxlOyB0aGlzIGlzIGEgc29mdCB3YXJuaW5nIHRoZSB1c2VyIGNhbiBvdmVycmlkZS5cbiAqXG4gKiBAcGFyYW0ge3tcbiAqICAgdmVyZGljdHM6IE1hcDxzdHJpbmcsIFZlcmRpY3Q+LFxuICogICBjYW5kaWRhdGVzOiBzdHJpbmdbXSxcbiAqICAgY29ycHVzOiBzdHJpbmdbXSxcbiAqICAgbWF4RGlzdGFuY2U6IG51bWJlcixcbiAqIH19IGlucHV0XG4gKiBAcmV0dXJucyB7TWFwPHN0cmluZywgVmVyZGljdD59XG4gKiBAZXhhbXBsZVxuICogZmxhZ1R5cG9zcXVhdHMoe1xuICogICB2ZXJkaWN0czogbmV3IE1hcChbWydleHRvb2xraXQnLCB7IHN0YXR1czogJ2F2YWlsYWJsZScsIG5hbWU6ICdleHRvb2xraXQnIH1dXSksXG4gKiAgIGNhbmRpZGF0ZXM6IFsnZXh0b29sa2l0J10sXG4gKiAgIGNvcnB1czogWydlcy10b29sa2l0J10sXG4gKiAgIG1heERpc3RhbmNlOiAyLFxuICogfSlcbiAqIC8vIE1hcCB7ICdleHRvb2xraXQnIOKGkiB7IHN0YXR1czogJ2F2YWlsYWJsZScsIG5hbWU6ICdleHRvb2xraXQnLCBuZWFyTWF0Y2hlczogW3sgbmFtZTogJ2VzLXRvb2xraXQnLCBkaXN0YW5jZTogMSB9XSB9IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYWdUeXBvc3F1YXRzKHsgdmVyZGljdHMsIGNhbmRpZGF0ZXMsIGNvcnB1cywgbWF4RGlzdGFuY2UgfSkge1xuICBjb25zdCBhbm5vdGF0ZWQgPSBuZXcgTWFwKHZlcmRpY3RzKVxuICBmb3IgKGNvbnN0IG5hbWUgb2YgY2FuZGlkYXRlcykge1xuICAgIGNvbnN0IHZlcmRpY3QgPSBhbm5vdGF0ZWQuZ2V0KG5hbWUpXG4gICAgaWYgKHZlcmRpY3Q/LnN0YXR1cyAhPT0gJ2F2YWlsYWJsZScpIGNvbnRpbnVlXG4gICAgY29uc3QgbWF0Y2hlcyA9IGZpbmROZWFyTWF0Y2hlcyhuYW1lLCBjb3JwdXMsIHsgbWF4RGlzdGFuY2UgfSlcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBhbm5vdGF0ZWQuc2V0KG5hbWUsIHsgLi4udmVyZGljdCwgbmVhck1hdGNoZXM6IG1hdGNoZXMuc2xpY2UoMCwgTkVBUl9NQVRDSF9NQVhfTkVJR0hCT1JTKSB9KVxuICAgIH1cbiAgfVxuICByZXR1cm4gYW5ub3RhdGVkXG59XG4iLCIvLyBucG0gcmVnaXN0cnkgZXhpc3RlbmNlIGNoZWNrICsgYm91bmRlZC1jb25jdXJyZW5jeSByZXF1ZXN0IHBvb2wuXG4vL1xuLy8gYGNoZWNrT25lYCByZXR1cm5zIGEgZGlzY3JpbWluYXRlZCBgRXhpc3RlbmNlYCB2YWx1ZSAoVGFrZW4gLyBGcmVlIC9cbi8vIFVua25vd24pIHNvIGNhbGxlcnMgY2FuIHBhdHRlcm4tbWF0Y2ggaW5zdGVhZCBvZiBkaXNwYXRjaGluZyBvblxuLy8gYGJvb2xlYW4gfCBudWxsYC4gVGhlIHBvb2wgcnVubmVyIGlzIGEgdGlueSBzdHJ1Y3R1cmVkLWNvbmN1cnJlbmN5XG4vLyBwcmltaXRpdmUg4oCUIG5vIGV4dGVybmFsIHNjaGVkdWxlciBuZWVkZWQgZm9yIHRoZSByZXF1ZXN0IHZvbHVtZXMgd2UgaGl0LlxuXG5pbXBvcnQge1xuICBERUZBVUxUX0NPTkNVUlJFTkNZLFxuICBERUZBVUxUX1JFR0lTVFJZX0JBU0UsXG4gIERFRkFVTFRfUkVHSVNUUllfVElNRU9VVF9NUyxcbn0gZnJvbSAnLi9jb25zdGFudHMubWpzJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRha2VuXG4gKiBAcHJvcGVydHkgeyd0YWtlbid9IGtpbmRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkgezIwMH0gc3RhdHVzXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gRnJlZVxuICogQHByb3BlcnR5IHsnZnJlZSd9IGtpbmRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkgezQwNH0gc3RhdHVzXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVW5rbm93blxuICogQHByb3BlcnR5IHsndW5rbm93bid9IGtpbmRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge251bWJlcn0gc3RhdHVzIC0gMCB3aGVuIHRoZSBuZXR3b3JrIGZhaWxlZCBvdXRyaWdodFxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtlcnJvcl0gLSBwcmVzZW50IHdoZW4gc3RhdHVzID09PSAwXG4gKlxuICogQHR5cGVkZWYge1Rha2VuIHwgRnJlZSB8IFVua25vd259IEV4aXN0ZW5jZVxuICovXG5cbi8qKiBAcmV0dXJucyB7VGFrZW59ICovXG5jb25zdCB0YWtlbiA9IChuYW1lKSA9PiAoeyBraW5kOiAndGFrZW4nLCBuYW1lLCBzdGF0dXM6IDIwMCB9KVxuLyoqIEByZXR1cm5zIHtGcmVlfSAqL1xuY29uc3QgZnJlZSA9IChuYW1lKSA9PiAoeyBraW5kOiAnZnJlZScsIG5hbWUsIHN0YXR1czogNDA0IH0pXG4vKiogQHJldHVybnMge1Vua25vd259ICovXG5jb25zdCB1bmtub3duID0gKG5hbWUsIHN0YXR1cywgZXJyb3IpID0+XG4gIGVycm9yID09PSB1bmRlZmluZWQgPyB7IGtpbmQ6ICd1bmtub3duJywgbmFtZSwgc3RhdHVzIH0gOiB7IGtpbmQ6ICd1bmtub3duJywgbmFtZSwgc3RhdHVzLCBlcnJvciB9XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhIHNpbmdsZSBuYW1lIGV4aXN0cyBvbiB0aGUgcmVnaXN0cnkuIE5ldmVyIHRocm93cyDigJQgZXZlcnlcbiAqIG91dGNvbWUgKDIwMCAvIDQwNCAvIG90aGVyIC8gbmV0d29yayBlcnJvcikgbWFwcyB0byBhIGRpc2NyaW1pbmF0ZWRcbiAqIGBFeGlzdGVuY2VgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3sgYmFzZT86IHN0cmluZywgdGltZW91dE1zPzogbnVtYmVyLCBmZXRjaEltcGw/OiB0eXBlb2YgZmV0Y2ggfX0gW29wdHNdXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxFeGlzdGVuY2U+fVxuICogQGV4YW1wbGVcbiAqIGF3YWl0IGNoZWNrT25lKCdyZWFjdCcpICAgICAgICAvLyB7IGtpbmQ6ICd0YWtlbicsIG5hbWU6ICdyZWFjdCcsIHN0YXR1czogMjAwIH1cbiAqIGF3YWl0IGNoZWNrT25lKCdub3ZlbC14eXonKSAgICAvLyB7IGtpbmQ6ICdmcmVlJywgIG5hbWU6ICdub3ZlbC14eXonLCBzdGF0dXM6IDQwNCB9XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja09uZShuYW1lLCBvcHRzID0ge30pIHtcbiAgY29uc3QgYmFzZSA9IG9wdHMuYmFzZSA/PyBERUZBVUxUX1JFR0lTVFJZX0JBU0VcbiAgY29uc3QgdGltZW91dE1zID0gb3B0cy50aW1lb3V0TXMgPz8gREVGQVVMVF9SRUdJU1RSWV9USU1FT1VUX01TXG4gIGNvbnN0IGZldGNoSW1wbCA9IG9wdHMuZmV0Y2hJbXBsID8/IGZldGNoXG5cbiAgY29uc3QgdXJsID0gYCR7YmFzZX0vJHtlbmNvZGVVUklDb21wb25lbnQobmFtZSl9YFxuICBjb25zdCBjdHJsID0gbmV3IEFib3J0Q29udHJvbGxlcigpXG4gIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBjdHJsLmFib3J0KCksIHRpbWVvdXRNcylcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaEltcGwodXJsLCB7IG1ldGhvZDogJ0hFQUQnLCBzaWduYWw6IGN0cmwuc2lnbmFsIH0pXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIC8vIEEgY3VzdG9tIGZldGNoSW1wbCBjYW4gcmV0dXJuIG5vbi1SZXNwb25zZSBzaGFwZXMgKGUuZy4gYSBzdHJlYW0pLlxuICAgIC8vIEd1YXJkIHRoZSBzdGF0dXMgcmVhZCBzbyBhbiB1bnVzYWJsZSByZXNwb25zZSBzdXJmYWNlcyBhcyBgdW5rbm93bmBcbiAgICAvLyByYXRoZXIgdGhhbiBlbWl0dGluZyBge3N0YXR1czogdW5kZWZpbmVkfWAgYW5kIHZpb2xhdGluZyB0aGUgdHlwZWRlZi5cbiAgICBjb25zdCBzdGF0dXMgPSByZXM/LnN0YXR1c1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihzdGF0dXMpKSB7XG4gICAgICByZXR1cm4gdW5rbm93bihuYW1lLCAwLCAnZmV0Y2ggcmV0dXJuZWQgcmVzcG9uc2Ugd2l0aG91dCBudW1lcmljIHN0YXR1cycpXG4gICAgfVxuICAgIGlmIChzdGF0dXMgPT09IDIwMCkgcmV0dXJuIHRha2VuKG5hbWUpXG4gICAgaWYgKHN0YXR1cyA9PT0gNDA0KSByZXR1cm4gZnJlZShuYW1lKVxuICAgIHJldHVybiB1bmtub3duKG5hbWUsIHN0YXR1cylcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICByZXR1cm4gdW5rbm93bihuYW1lLCAwLCBlPy5tZXNzYWdlID8/IFN0cmluZyhlKSlcbiAgfVxufVxuXG4vKipcbiAqIEJvdW5kZWQtY29uY3VycmVuY3kgcG9vbCBydW5uZXIuIFJ1bnMgYHRhc2tzYCAoZnVuY3Rpb25zIHJldHVybmluZyBQcm9taXNlcylcbiAqIHdpdGggYXQgbW9zdCBgY29uY3VycmVuY3lgIGluLWZsaWdodCBhdCBvbmNlLiBQcmVzZXJ2ZXMgaW5wdXQgb3JkZXIuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7QXJyYXk8KCkgPT4gUHJvbWlzZTxUPj59IHRhc2tzXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbmN5XVxuICogQHJldHVybnMge1Byb21pc2U8VFtdPn1cbiAqIEBleGFtcGxlXG4gKiBjb25zdCB0YXNrcyA9IHVybHMubWFwKCh1cmwpID0+ICgpID0+IGZldGNoKHVybCkpXG4gKiBjb25zdCByZXNwb25zZXMgPSBhd2FpdCBwb29sKHRhc2tzLCA4KSAgLy8gYXQgbW9zdCA4IGluIGZsaWdodCwgcmVzdWx0cyBpbiBpbnB1dCBvcmRlclxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9vbCh0YXNrcywgY29uY3VycmVuY3kgPSBERUZBVUxUX0NPTkNVUlJFTkNZKSB7XG4gIC8vIE5lZ2F0aXZlIG9yIG5vbi1pbnRlZ2VyIGNvbmN1cnJlbmN5IGlzIGEgY2FsbGVyIGJ1ZyDigJQgZmFpbCBsb3VkIHJhdGhlclxuICAvLyB0aGFuIHJ1bm5pbmcgbm90aGluZyBvciBwcm9kdWNpbmcgYSByZXN1bHRzIGFycmF5IHdpdGggaG9sZXMuXG4gIGlmIChjb25jdXJyZW5jeSAhPSBudWxsICYmICghTnVtYmVyLmlzSW50ZWdlcihjb25jdXJyZW5jeSkgfHwgY29uY3VycmVuY3kgPCAwKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHBvb2w6IGNvbmN1cnJlbmN5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciAoZ290ICR7Y29uY3VycmVuY3l9KWApXG4gIH1cbiAgLy8gYDBgIGlzIHRyZWF0ZWQgYXMgXCJ1c2UgZGVmYXVsdFwiIOKAlCB0aGUgcGFyc2VJbnQgcGF0aCBpbiBjaGVjay5tanMgY2FuXG4gIC8vIHN1cmZhY2UgMCB3aGVuIHRoZSB1c2VyIHBhc3NlcyBgLS1jb25jdXJyZW5jeSAwYCwgd2hpY2ggd2UgcmVhZCBhc1xuICAvLyBcImxldCB0aGUgbGlicmFyeSBwaWNrXCIgcmF0aGVyIHRoYW4gXCJkbyBub3QgcnVuXCIuXG4gIGNvbnN0IGVmZmVjdGl2ZUNvbmN1cnJlbmN5ID1cbiAgICBOdW1iZXIuaXNJbnRlZ2VyKGNvbmN1cnJlbmN5KSAmJiBjb25jdXJyZW5jeSA+IDAgPyBjb25jdXJyZW5jeSA6IERFRkFVTFRfQ09OQ1VSUkVOQ1lcbiAgY29uc3QgcmVzdWx0cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRhc2tzLmxlbmd0aCB9KVxuICBsZXQgbmV4dCA9IDBcbiAgYXN5bmMgZnVuY3Rpb24gd29ya2VyKCkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCBpID0gbmV4dCsrXG4gICAgICBpZiAoaSA+PSB0YXNrcy5sZW5ndGgpIHJldHVyblxuICAgICAgcmVzdWx0c1tpXSA9IGF3YWl0IHRhc2tzW2ldKClcbiAgICB9XG4gIH1cbiAgY29uc3Qgd29ya2VycyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IE1hdGgubWluKGVmZmVjdGl2ZUNvbmN1cnJlbmN5LCB0YXNrcy5sZW5ndGgpIH0sIHdvcmtlcilcbiAgYXdhaXQgUHJvbWlzZS5hbGwod29ya2VycylcbiAgcmV0dXJuIHJlc3VsdHNcbn1cblxuLyoqXG4gKiBDaGVjayBleGlzdGVuY2UgZm9yIGEgYmF0Y2ggb2YgbmFtZXMgd2l0aCBib3VuZGVkIGNvbmN1cnJlbmN5LiBSZXN1bHRzXG4gKiBhcmUgcmV0dXJuZWQgaW4gaW5wdXQgb3JkZXIgcmVnYXJkbGVzcyBvZiBjb21wbGV0aW9uIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IG5hbWVzXG4gKiBAcGFyYW0ge3sgY29uY3VycmVuY3k/OiBudW1iZXIsIGJhc2U/OiBzdHJpbmcsIHRpbWVvdXRNcz86IG51bWJlciwgZmV0Y2hJbXBsPzogdHlwZW9mIGZldGNoIH19IFtvcHRzXVxuICogQHJldHVybnMge1Byb21pc2U8RXhpc3RlbmNlW10+fVxuICogQGV4YW1wbGVcbiAqIGF3YWl0IGNoZWNrTWFueShbJ3JlYWN0JywgJ3Z1ZScsICdub3ZlbC14eXonXSwgeyBjb25jdXJyZW5jeTogNCB9KVxuICogLy8gW3sga2luZDogJ3Rha2VuJywgbmFtZTogJ3JlYWN0Jywg4oCmIH0sIHsga2luZDogJ3Rha2VuJywgbmFtZTogJ3Z1ZScsIOKApiB9LCB7IGtpbmQ6ICdmcmVlJywgbmFtZTogJ25vdmVsLXh5eicsIOKApiB9XVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tNYW55KG5hbWVzLCBvcHRzID0ge30pIHtcbiAgY29uc3QgdGFza3MgPSBuYW1lcy5tYXAoKG5hbWUpID0+ICgpID0+IGNoZWNrT25lKG5hbWUsIG9wdHMpKVxuICByZXR1cm4gcG9vbCh0YXNrcywgb3B0cy5jb25jdXJyZW5jeSA/PyBERUZBVUxUX0NPTkNVUlJFTkNZKVxufVxuIiwiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLy8gQ0xJIGVudHJ5IGZvciB0aGUgbnBtLW5hbWVyIHNraWxsLiBPcmNoZXN0cmF0ZXMgdGhlIHB1cmUgcGlwZWxpbmUgcGhhc2VzXG4vLyBmcm9tIGBwaXBlbGluZS5tanNgIGFnYWluc3QgdGhlIG5ldHdvcmsuIFRoZSBwaXBlbGluZTpcbi8vICAgdHJpYWdlIOKGkiBwcm9iZVJlZ2lzdHJ5IOKGkiBzZWxlY3RNb25pa2VyQ2FuZGlkYXRlcyDihpIgY2hlY2tNYW55KHZhcmlhbnRzKVxuLy8gICAgICAgICAg4oaSIGFzc2VtYmxlTW9uaWtlclByb2JlcyDihpIgZGVjaWRlIOKGkiBmbGFnVHlwb3NxdWF0c1xuLy8gYG1haW5gIHRocmVhZHMgbmFtZWQgaW50ZXJtZWRpYXRlIHZhbHVlcyB0aHJvdWdoOyBwdXJlIHRyYW5zZm9ybXMgbGl2ZVxuLy8gaW4gcGlwZWxpbmUubWpzIGFuZCBhcmUgdW5pdC10ZXN0ZWQgaW5kZXBlbmRlbnRseS5cblxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IHBhcnNlQXJncyB9IGZyb20gJ25vZGU6dXRpbCdcblxuaW1wb3J0IHsgZXJyLCBpc0VyciwgaXNPaywgb2sgfSBmcm9tICdtYXNzYW1hbidcbmltcG9ydCB7IG1hdGNoLCBQIH0gZnJvbSAnbWFzc2FtYW4nXG5cbmltcG9ydCB7XG4gIERFRkFVTFRfQ09OQ1VSUkVOQ1ksXG4gIERFRkFVTFRfTElNSVQsXG4gIE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFLFxuICBTSE9SVExJU1RfTElNSVQsXG59IGZyb20gJy4vY29uc3RhbnRzLm1qcydcbmltcG9ydCB7IGxvYWRDb3JwdXMgfSBmcm9tICcuL2NvcnB1cy5tanMnXG5pbXBvcnQgeyBwZXJtdXRlLCBzY29yZSB9IGZyb20gJy4vcGVybXV0ZS5tanMnXG5pbXBvcnQge1xuICBhc3NlbWJsZU1vbmlrZXJQcm9iZXMsXG4gIGRlY2lkZSxcbiAgZmxhZ1R5cG9zcXVhdHMsXG4gIHNlbGVjdE1vbmlrZXJDYW5kaWRhdGVzLFxuICB0cmlhZ2UsXG59IGZyb20gJy4vcGlwZWxpbmUubWpzJ1xuaW1wb3J0IHsgY2hlY2tNYW55IH0gZnJvbSAnLi9yZWdpc3RyeS5tanMnXG5cbmNvbnN0IFVTQUdFID0gYG5wbS1uYW1lciDigJQgZmluZCBhdmFpbGFibGUgbnBtIHBhY2thZ2UgbmFtZXNcblxuVXNhZ2U6XG4gIG5vZGUgY2hlY2subWpzIFtvcHRpb25zXSBbc2VlZHMuLi5dXG5cbk1vZGVzOlxuICAoc2VlZHMgZ2l2ZW4pICAgICAgICBQZXJtdXRlIHRoZSBzZWVkcywgY2hlY2sgZWFjaCBjYW5kaWRhdGUuXG4gIC0tY2hlY2sgPG5hbWVzLi4uPiAgIFNraXAgcGVybXV0YXRpb247IGNoZWNrIHRoZSBnaXZlbiBuYW1lcyBkaXJlY3RseS5cbiAgLS1zdGRpbiAgICAgICAgICAgICAgUmVhZCBuYW1lcyBmcm9tIHN0ZGluIChvbmUgcGVyIGxpbmUpOyBza2lwIHBlcm11dGF0aW9uLlxuICAtLWZpbGUgPHBhdGg+ICAgICAgICBSZWFkIG5hbWVzIGZyb20gZmlsZSAob25lIHBlciBsaW5lKTsgc2tpcCBwZXJtdXRhdGlvbi5cblxuT3B0aW9uczpcbiAgLS1saW1pdCA8bj4gICAgICAgICAgTWF4IGNhbmRpZGF0ZXMgdG8gY2hlY2sgKGRlZmF1bHQ6ICR7REVGQVVMVF9MSU1JVH0pLlxuICAtLWNvbmN1cnJlbmN5IDxuPiAgICBQYXJhbGxlbCByZWdpc3RyeSByZXF1ZXN0cyAoZGVmYXVsdDogJHtERUZBVUxUX0NPTkNVUlJFTkNZfSkuXG4gIC0tc2NvcGUgPEBzY29wZT4gICAgIEdlbmVyYXRlIHNjb3BlZCB2YXJpYW50cyAoZGVmYXVsdDogdW5zY29wZWQpLlxuICAtLW5vLW1vbmlrZXIgICAgICAgICBTa2lwIG1vbmlrZXIgY29sbGlzaW9uIGNoZWNrICh0aGUgbnBtIHB1Ymxpc2gtdGltZSBydWxlKS5cbiAgLS1leGhhdXN0aXZlICAgICAgICAgV2lkZXIgMi1pbnNlcnRpb24gbW9uaWtlciB2YXJpYW50cyAoc2xvd2VyLCBtb3JlIHRob3JvdWdoKS5cbiAgLS1uby1uZWFyLW1hdGNoICAgICAgU2tpcCB0eXBvc3F1YXQtc3R5bGUgc2ltaWxhcml0eSBjaGVjayBhZ2FpbnN0IHBvcHVsYXIgcGFja2FnZXMuXG4gIC0tbmVhci1kaXN0YW5jZSA8bj4gIE1heCBlZGl0IGRpc3RhbmNlIGZvciBuZWFyLW1hdGNoIHdhcm5pbmdzIChkZWZhdWx0OiAke05FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFfSkuXG4gIC0tanNvbiAgICAgICAgICAgICAgIE91dHB1dCBKU09OIGluc3RlYWQgb2YgdGV4dC5cbiAgLS1oZWxwLCAtaCAgICAgICAgICAgU2hvdyB0aGlzIGhlbHAuXG5cbk5hbWVzIHRoYXQgbG9vayBsaWtlIG9wdGlvbnMgKGxlYWRpbmcgaHlwaGVuKSBtdXN0IGJlIHBhc3NlZCBhZnRlciBhIGxpdGVyYWxcblxcYC0tXFxgIHNlcGFyYXRvcjpcbiAgbm9kZSBjaGVjay5tanMgLS1jaGVjayAtLSAtZm9vIC5iYXIgX2JhelxuXG5WZXJkaWN0czpcbiAg4pyTIGF2YWlsYWJsZSAgICBmcmVlIG9uIHJlZ2lzdHJ5ICsgbm8gbW9uaWtlciBjb2xsaXNpb24gKG1heSBjYXJyeSBuZWFyLW1hdGNoIHdhcm5pbmcpXG4gIOKaoCBtb25pa2VyICAgICAgZnJlZSBsaXRlcmFsbHkgYnV0IG5vcm1hbGl6ZWQgZm9ybSBjb2xsaWRlcyDigJQgbnBtIHB1Ymxpc2ggd2lsbCByZWplY3RcbiAg4pqgIHVudmVyaWZpZWQgICBmcmVlIGxpdGVyYWxseSBidXQgbW9uaWtlciBjaGVjayBpbmNvbXBsZXRlIChzb21lIHZhcmlhbnRzIGNvdWxkbid0IGJlIHByb2JlZClcbiAg4pyXIHRha2VuICAgICAgICB0aGUgZXhhY3QgbmFtZSBpcyBwdWJsaXNoZWRcbiAg4pyXIGludmFsaWQgICAgICBmYWlscyBzeW50YWN0aWMgcnVsZXNcbiAgPyB1bmtub3duICAgICAgcmVnaXN0cnkgcmV0dXJuZWQgYSBub24tMjAwLzQwNCBzdGF0dXMgZm9yIHRoZSBsaXRlcmFsIG5hbWVcblxuTGltaXRhdGlvbjpcbiAgVGhlIG1vbmlrZXIgY2hlY2sgZW51bWVyYXRlcyAxLSBhbmQgMi1zZXBhcmF0b3IgdmFyaWFudHMuIE5hbWVzIHJlcXVpcmluZ1xuICAzKyBzZXBhcmF0b3IgaW5zZXJ0aW9ucyAoZS5nLiBcXGBlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXFxgKSBjYW4gYmUgbWlzc2VkXG4gIGV2ZW4gd2l0aCAtLWV4aGF1c3RpdmUuIFRyZWF0IGV2ZXJ5IGF2YWlsYWJsZSB2ZXJkaWN0IGFzIHByb3Zpc2lvbmFsLlxuICBucG0gcHVibGlzaCAtLWRyeS1ydW4gZG9lcyBOT1QgZXhlcmNpc2UgdGhlIHJlZ2lzdHJ5J3Mgc2VydmVyLXNpZGUgbW9uaWtlclxuICBjaGVjay4gTmV2ZXIgcHVibGlzaCBqdXN0IHRvIHRlc3QgYXZhaWxhYmlsaXR5LlxuXG5FeGFtcGxlczpcbiAgbm9kZSBjaGVjay5tanMgdGlueSBsb2dcbiAgbm9kZSBjaGVjay5tanMgLS1jaGVjayBwaWNvbG9nIG1pY3JvbG9nIGpzbG9nXG4gIGVjaG8gXCJwaWNvbG9nXCIgfCBub2RlIGNoZWNrLm1qcyAtLXN0ZGluXG4gIG5vZGUgY2hlY2subWpzIC0tc2NvcGUgQG1lIGxvZ2dlciBmYXN0XG5gXG5cbmNvbnN0IFNZTUJPTFMgPSB7XG4gIGF2YWlsYWJsZTogJ+KckycsXG4gIHRha2VuOiAn4pyXJyxcbiAgbW9uaWtlcjogJ+KaoCcsXG4gIHVudmVyaWZpZWQ6ICfimqAnLFxuICBpbnZhbGlkOiAn4pyXJyxcbiAgdW5rbm93bjogJz8nLFxufVxuY29uc3QgRElWSURFUiA9ICfilIAnLnJlcGVhdCg2NClcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb25maWdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHBvc2l0aW9uYWxzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3VsZFNraXBQZXJtdXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBpbnB1dE5hbWVzXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGltaXRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb25jdXJyZW5jeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzY29wZV1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNNb25pa2VyRW5hYmxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0V4aGF1c3RpdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNOZWFyTWF0Y2hFbmFibGVkXG4gKiBAcHJvcGVydHkge251bWJlcn0gbmVhckRpc3RhbmNlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3VsZE91dHB1dEpzb25cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvdWxkU2hvd0hlbHBcbiAqL1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBjb25maWcgPSBwYXJzZUNsaShwcm9jZXNzLmFyZ3Yuc2xpY2UoMikpXG4gIGlmIChjb25maWcuc2hvdWxkU2hvd0hlbHApIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShVU0FHRSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHByZXBhcmVkID0gcHJlcGFyZUNhbmRpZGF0ZXMoY29uZmlnKVxuICBpZiAoaXNFcnIocHJlcGFyZWQpKSByZXR1cm4gZGllKHByZXBhcmVkLmVycm9yLm1lc3NhZ2UpXG4gIGNvbnN0IHsgc2VlZHMsIGNhbmRpZGF0ZXMsIGNvbnNpZGVyZWRDb3VudCB9ID0gcHJlcGFyZWQudmFsdWVcblxuICBjb25zdCBjb3JwdXMgPSBjb25maWcuaXNOZWFyTWF0Y2hFbmFibGVkID8gbG9hZENvcnB1cygpIDogZXJyKG5ldyBFcnJvcignZGlzYWJsZWQnKSlcbiAgY29uc3QgaGFzQ29ycHVzID0gaXNPayhjb3JwdXMpXG5cbiAgY29uc3QgeyB2YWxpZCwgaW52YWxpZCwgc2NvcGVkIH0gPSB0cmlhZ2UoY2FuZGlkYXRlcylcbiAgY29uc3QgZXhpc3RlbmNlID0gYXdhaXQgcHJvYmVSZWdpc3RyeSh2YWxpZCwgY29uZmlnKVxuICBjb25zdCBtb25pa2VyUHJvYmVzID0gY29uZmlnLmlzTW9uaWtlckVuYWJsZWRcbiAgICA/IGF3YWl0IHByb2JlTW9uaWtlckNvbGxpc2lvbnMoeyB2YWxpZCwgc2NvcGVkLCBleGlzdGVuY2UsIGNvbmZpZyB9KVxuICAgIDogbmV3IE1hcCgpXG5cbiAgY29uc3QgZGVjaWRlZCA9IGRlY2lkZSh7IHZhbGlkLCBpbnZhbGlkLCBleGlzdGVuY2UsIG1vbmlrZXJQcm9iZXMgfSlcbiAgY29uc3QgYW5ub3RhdGVkID0gaGFzQ29ycHVzXG4gICAgPyBmbGFnVHlwb3NxdWF0cyh7XG4gICAgICAgIHZlcmRpY3RzOiBkZWNpZGVkLFxuICAgICAgICBjYW5kaWRhdGVzLFxuICAgICAgICBjb3JwdXM6IGNvcnB1cy52YWx1ZS5uYW1lcyxcbiAgICAgICAgbWF4RGlzdGFuY2U6IGNvbmZpZy5uZWFyRGlzdGFuY2UsXG4gICAgICB9KVxuICAgIDogZGVjaWRlZFxuXG4gIGNvbnN0IG91dHB1dCA9IHNoYXBlT3V0cHV0KHtcbiAgICBtb2RlOiBjb25maWcuc2hvdWxkU2tpcFBlcm11dGUgPyAnY2hlY2snIDogJ2ZpbmQnLFxuICAgIHNlZWRzLFxuICAgIGNvbnNpZGVyZWRDb3VudCxcbiAgICBjYW5kaWRhdGVzLFxuICAgIHZlcmRpY3RzOiBhbm5vdGF0ZWQsXG4gICAgaXNNb25pa2VyRW5hYmxlZDogY29uZmlnLmlzTW9uaWtlckVuYWJsZWQsXG4gICAgaXNFeGhhdXN0aXZlOiBjb25maWcuaXNFeGhhdXN0aXZlLFxuICAgIGlzTmVhck1hdGNoRW5hYmxlZDogY29uZmlnLmlzTmVhck1hdGNoRW5hYmxlZCAmJiBoYXNDb3JwdXMsXG4gIH0pXG5cbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXG4gICAgY29uZmlnLnNob3VsZE91dHB1dEpzb24gPyBgJHtKU09OLnN0cmluZ2lmeShvdXRwdXQsIG51bGwsIDIpfVxcbmAgOiByZW5kZXJUZXh0KG91dHB1dClcbiAgKVxufVxuXG4vKipcbiAqIFBhcnNlIENMSSBhcmd2IGludG8gYSBzdHJ1Y3R1cmVkIGNvbmZpZy4gVGhyb3dzIG5vdGhpbmcg4oCUIGludmFsaWQgQ0xJXG4gKiB1c2FnZSBzdXJmYWNlcyBsYXRlciBhcyBhbiBlbXB0eSBpbnB1dCBvciBhIGBwcmVwYXJlQ2FuZGlkYXRlc2AgZXJyb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gYXJndlxuICogQHJldHVybnMge0NvbmZpZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ2xpKGFyZ3YpIHtcbiAgY29uc3QgeyB2YWx1ZXMsIHBvc2l0aW9uYWxzIH0gPSBwYXJzZUFyZ3Moe1xuICAgIGFyZ3M6IGFyZ3YsXG4gICAgYWxsb3dQb3NpdGlvbmFsczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBjaGVjazogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICBzdGRpbjogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICBmaWxlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICBsaW1pdDogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogU3RyaW5nKERFRkFVTFRfTElNSVQpIH0sXG4gICAgICBjb25jdXJyZW5jeTogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogU3RyaW5nKERFRkFVTFRfQ09OQ1VSUkVOQ1kpIH0sXG4gICAgICBzY29wZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgJ25vLW1vbmlrZXInOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgIGV4aGF1c3RpdmU6IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgJ25vLW5lYXItbWF0Y2gnOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgICduZWFyLWRpc3RhbmNlJzogeyB0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogU3RyaW5nKE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFKSB9LFxuICAgICAganNvbjogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICBoZWxwOiB7IHR5cGU6ICdib29sZWFuJywgc2hvcnQ6ICdoJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICB9LFxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgc2hvdWxkU2hvd0hlbHA6IHZhbHVlcy5oZWxwLFxuICAgIHBvc2l0aW9uYWxzLFxuICAgIHNob3VsZFNraXBQZXJtdXRlOiB2YWx1ZXMuY2hlY2sgfHwgdmFsdWVzLnN0ZGluIHx8IEJvb2xlYW4odmFsdWVzLmZpbGUpLFxuICAgIGlucHV0TmFtZXM6IGdhdGhlcklucHV0TmFtZXModmFsdWVzKSxcbiAgICBsaW1pdDogcGFyc2VJbnRPcih2YWx1ZXMubGltaXQsIERFRkFVTFRfTElNSVQpLFxuICAgIGNvbmN1cnJlbmN5OiBwYXJzZUludE9yKHZhbHVlcy5jb25jdXJyZW5jeSwgREVGQVVMVF9DT05DVVJSRU5DWSksXG4gICAgc2NvcGU6IHZhbHVlcy5zY29wZSxcbiAgICBpc01vbmlrZXJFbmFibGVkOiAhdmFsdWVzWyduby1tb25pa2VyJ10sXG4gICAgaXNFeGhhdXN0aXZlOiB2YWx1ZXMuZXhoYXVzdGl2ZSxcbiAgICBpc05lYXJNYXRjaEVuYWJsZWQ6ICF2YWx1ZXNbJ25vLW5lYXItbWF0Y2gnXSxcbiAgICBuZWFyRGlzdGFuY2U6IHBhcnNlSW50T3IodmFsdWVzWyduZWFyLWRpc3RhbmNlJ10sIE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFKSxcbiAgICBzaG91bGRPdXRwdXRKc29uOiB2YWx1ZXMuanNvbixcbiAgfVxufVxuXG5mdW5jdGlvbiBnYXRoZXJJbnB1dE5hbWVzKHZhbHVlcykge1xuICBpZiAodmFsdWVzLnN0ZGluKSByZXR1cm4gcmVhZExpc3RGcm9tU3RkaW4oKVxuICBpZiAodmFsdWVzLmZpbGUpIHtcbiAgICByZXR1cm4gcmVhZEZpbGVTeW5jKHZhbHVlcy5maWxlLCAndXRmOCcpXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAubWFwKChsaW5lKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgfVxuICByZXR1cm4gW11cbn1cblxuLyoqXG4gKiBSZWFkIG5ld2xpbmUtc2VwYXJhdGVkIG5hbWVzIGZyb20gc3RkaW4uIFJldHVybnMgYFtdYCBvbmx5IHdoZW4gbm90aGluZ1xuICogaXMgcGlwZWQgKGludGVyYWN0aXZlIFRUWSkuIFJlYWwgcmVhZCBmYWlsdXJlcyBidWJibGUg4oCUIHNpbGVudCBjYXRjaGVzXG4gKiBtYXNrIGRhdGEtbG9zcyBidWdzIHdlJ2QgcmF0aGVyIHNlZSB0aGFuIHN3YWxsb3cuXG4gKlxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVhZExpc3RGcm9tU3RkaW4oKSB7XG4gIGlmIChwcm9jZXNzLnN0ZGluLmlzVFRZKSByZXR1cm4gW11cbiAgcmV0dXJuIHJlYWRGaWxlU3luYygwLCAndXRmOCcpXG4gICAgLnNwbGl0KCdcXG4nKVxuICAgIC5tYXAoKGxpbmUpID0+IGxpbmUudHJpbSgpKVxuICAgIC5maWx0ZXIoQm9vbGVhbilcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnRPcihyYXcsIGZhbGxiYWNrKSB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHJhdywgMTApXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwID8gcGFyc2VkIDogZmFsbGJhY2tcbn1cblxuLyoqXG4gKiBSZXNvbHZlIHRoZSBjYW5kaWRhdGUgbGlzdCBmcm9tIHRoZSBDTEkgaW5wdXRzLiBJbiBgY2hlY2tgIG1vZGUgdGhlXG4gKiBwb3NpdGlvbmFscyArIHN0ZGluL2ZpbGUgbGluZXMgYXJlIHRoZSBjYW5kaWRhdGVzOyBpbiBgZmluZGAgbW9kZSB0aGVcbiAqIHBvc2l0aW9uYWxzIGFyZSBzZWVkcyB0aGF0IHdlIHBlcm11dGUuIEVpdGhlciBwYXRoIHJhbmtzIGFuZCB0cmltcyB0b1xuICogYGNvbmZpZy5saW1pdGAuXG4gKlxuICogYGNvbnNpZGVyZWRDb3VudGAgaXMgdGhlIHRvdGFsIGNhbmRpZGF0ZSBzcGFjZSBiZWZvcmUgdGhlIGAtLWxpbWl0YFxuICogdHJpbSDigJQgaW5wdXQgY291bnQgaW4gY2hlY2sgbW9kZSwgcGVybXV0YXRpb24gY291bnQgaW4gZmluZCBtb2RlLlxuICpcbiAqIEBwYXJhbSB7Q29uZmlnfSBjb25maWdcbiAqIEByZXR1cm5zIHtpbXBvcnQoJ21hc3NhbWFuJykuUmVzdWx0PHtzZWVkczogc3RyaW5nW10sIGNhbmRpZGF0ZXM6IHN0cmluZ1tdLCBjb25zaWRlcmVkQ291bnQ6IG51bWJlcn0sIEVycm9yPn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHByZXBhcmVDYW5kaWRhdGVzKGNvbmZpZykge1xuICBpZiAoY29uZmlnLnNob3VsZFNraXBQZXJtdXRlKSB7XG4gICAgY29uc3Qgc3VwcGxpZWQgPSBbLi4uY29uZmlnLmlucHV0TmFtZXMsIC4uLmNvbmZpZy5wb3NpdGlvbmFsc11cbiAgICAgIC5tYXAoKG5hbWUpID0+IG5hbWUudHJpbSgpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgIGlmIChzdXBwbGllZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBlcnIobmV3IEVycm9yKCdubyBuYW1lcyBwcm92aWRlZCDigJQgcGFzcyBuYW1lcyBhcyBhcmdzLCB2aWEgLS1zdGRpbiwgb3IgdmlhIC0tZmlsZScpKVxuICAgIH1cbiAgICBjb25zdCBkZWR1cGVkID0gWy4uLm5ldyBTZXQoc3VwcGxpZWQpXVxuICAgIHJldHVybiBvayh7XG4gICAgICBzZWVkczogW10sXG4gICAgICBjYW5kaWRhdGVzOiB0cmltKGRlZHVwZWQsIFtdLCBjb25maWcubGltaXQpLFxuICAgICAgY29uc2lkZXJlZENvdW50OiBkZWR1cGVkLmxlbmd0aCxcbiAgICB9KVxuICB9XG5cbiAgaWYgKGNvbmZpZy5wb3NpdGlvbmFscy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZXJyKG5ldyBFcnJvcignbm8gc2VlZHMgcHJvdmlkZWQuIFNlZSAtLWhlbHAuJykpXG4gIH1cbiAgY29uc3Qgc2VlZHMgPSBjb25maWcucG9zaXRpb25hbHNcbiAgY29uc3QgcGVybXV0ZWRDYW5kaWRhdGVzID0gWy4uLm5ldyBTZXQocGVybXV0ZShzZWVkcywgeyBzY29wZTogY29uZmlnLnNjb3BlIH0pKV1cbiAgaWYgKHBlcm11dGVkQ2FuZGlkYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAvLyBwZXJtdXRlKCkgcmVqZWN0cyBub24tYWxwaGFudW1lcmljIHRva2Vucy4gSWYgZXZlcnkgc2VlZCBnb3QgZmlsdGVyZWQsXG4gICAgLy8gZ2l2ZSB0aGUgdXNlciBhY3Rpb25hYmxlIGZlZWRiYWNrIGluc3RlYWQgb2YgYSBzaWxlbnQgemVyby1yZXN1bHQgcnVuLlxuICAgIC8vIFVzZSBgLS0gYCBiZWZvcmUgdGhlIG5hbWVzIHNvIHRoZSBsZWFkaW5nLWh5cGhlbiAvIGxlYWRpbmctZG90IGNhc2VzXG4gICAgLy8gbWFrZSBpdCB0aHJvdWdoIHBhcnNlQXJncyBhcyBwb3NpdGlvbmFscy5cbiAgICByZXR1cm4gZXJyKFxuICAgICAgbmV3IEVycm9yKFxuICAgICAgICBgYWxsIHNlZWRzIHdlcmUgZmlsdGVyZWQgKHNlZWRzIG11c3QgYmUgYWxwaGFudW1lcmljIOKAlCB0cnkgYCArXG4gICAgICAgICAgYFxcYC0tY2hlY2sgLS0gJHtzZWVkcy5qb2luKCcgJyl9XFxgIHRvIGNoZWNrIHRoZW0gYXMgbGl0ZXJhbCBuYW1lcyBpbnN0ZWFkKWBcbiAgICAgIClcbiAgICApXG4gIH1cbiAgcmV0dXJuIG9rKHtcbiAgICBzZWVkcyxcbiAgICBjYW5kaWRhdGVzOiB0cmltKHBlcm11dGVkQ2FuZGlkYXRlcywgc2VlZHMsIGNvbmZpZy5saW1pdCksXG4gICAgY29uc2lkZXJlZENvdW50OiBwZXJtdXRlZENhbmRpZGF0ZXMubGVuZ3RoLFxuICB9KVxufVxuXG5mdW5jdGlvbiB0cmltKGNhbmRpZGF0ZXMsIHNlZWRzLCBsaW1pdCkge1xuICBjb25zdCByYW5rZWQgPSBbLi4uY2FuZGlkYXRlc10uc29ydCgoYSwgYikgPT4gc2NvcmUoYSwgc2VlZHMpIC0gc2NvcmUoYiwgc2VlZHMpKVxuICByZXR1cm4gcmFua2VkLmxlbmd0aCA+IGxpbWl0ID8gcmFua2VkLnNsaWNlKDAsIGxpbWl0KSA6IHJhbmtlZFxufVxuXG4vKipcbiAqIEhFQUQgZWFjaCBuYW1lIGluIHBhcmFsbGVsIGFnYWluc3QgdGhlIG5wbSByZWdpc3RyeS4gUmV0dXJucyBhIGxvb2t1cFxuICogbWFwIGtleWVkIGJ5IG5hbWU7IHZhbHVlcyBhcmUgZGlzY3JpbWluYXRlZCBgRXhpc3RlbmNlYCB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gbmFtZXNcbiAqIEBwYXJhbSB7eyBjb25jdXJyZW5jeTogbnVtYmVyIH19IGNvbmZpZ1xuICogQHJldHVybnMge1Byb21pc2U8TWFwPHN0cmluZywgaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZT4+fVxuICogQHByaXZhdGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gcHJvYmVSZWdpc3RyeShuYW1lcywgY29uZmlnKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBjaGVja01hbnkobmFtZXMsIHsgY29uY3VycmVuY3k6IGNvbmZpZy5jb25jdXJyZW5jeSB9KVxuICByZXR1cm4gbmV3IE1hcChyZXN1bHRzLm1hcCgocmVzdWx0KSA9PiBbcmVzdWx0Lm5hbWUsIHJlc3VsdF0pKVxufVxuXG4vKipcbiAqIE5ldHdvcmstYm91bmQgaGFsZiBvZiB0aGUgbW9uaWtlciBjaGVjay4gVGhlIHB1cmUgc2VsZWN0aW9uICsgYXNzZW1ibHlcbiAqIGxpdmVzIGluIHBpcGVsaW5lLm1qczsgdGhpcyBmdW5jdGlvbiBicmlkZ2VzIHRoZW0gd2l0aCB0aGUgcmVnaXN0cnlcbiAqIHJvdW5kLXRyaXAgaW4gdGhlIG1pZGRsZS5cbiAqXG4gKiBAcGFyYW0ge3tcbiAqICAgdmFsaWQ6IHN0cmluZ1tdLFxuICogICBzY29wZWQ6IFNldDxzdHJpbmc+LFxuICogICBleGlzdGVuY2U6IE1hcDxzdHJpbmcsIGltcG9ydCgnLi9yZWdpc3RyeS5tanMnKS5FeGlzdGVuY2U+LFxuICogICBjb25maWc6IHsgaXNFeGhhdXN0aXZlOiBib29sZWFuLCBjb25jdXJyZW5jeTogbnVtYmVyIH0sXG4gKiB9fSBpbnB1dFxuICogQHJldHVybnMge1Byb21pc2U8TWFwPHN0cmluZywgaW1wb3J0KCcuL3BpcGVsaW5lLm1qcycpLk1vbmlrZXJQcm9iZT4+fVxuICogQHByaXZhdGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gcHJvYmVNb25pa2VyQ29sbGlzaW9ucyh7IHZhbGlkLCBzY29wZWQsIGV4aXN0ZW5jZSwgY29uZmlnIH0pIHtcbiAgY29uc3QgeyB2YXJpYW50c0J5TmFtZSwgYWxsVmFyaWFudHMgfSA9IHNlbGVjdE1vbmlrZXJDYW5kaWRhdGVzKHtcbiAgICB2YWxpZCxcbiAgICBzY29wZWQsXG4gICAgZXhpc3RlbmNlLFxuICAgIGlzRXhoYXVzdGl2ZTogY29uZmlnLmlzRXhoYXVzdGl2ZSxcbiAgfSlcbiAgY29uc3QgdmFyaWFudFJlc3VsdHMgPSBhd2FpdCBjaGVja01hbnkoWy4uLmFsbFZhcmlhbnRzXSwgeyBjb25jdXJyZW5jeTogY29uZmlnLmNvbmN1cnJlbmN5IH0pXG4gIHJldHVybiBhc3NlbWJsZU1vbmlrZXJQcm9iZXMoeyB2YXJpYW50c0J5TmFtZSwgdmFyaWFudFJlc3VsdHMgfSlcbn1cblxuZnVuY3Rpb24gc2hhcGVPdXRwdXQoe1xuICBtb2RlLFxuICBzZWVkcyxcbiAgY29uc2lkZXJlZENvdW50LFxuICBjYW5kaWRhdGVzLFxuICB2ZXJkaWN0cyxcbiAgaXNNb25pa2VyRW5hYmxlZCxcbiAgaXNFeGhhdXN0aXZlLFxuICBpc05lYXJNYXRjaEVuYWJsZWQsXG59KSB7XG4gIHJldHVybiB7XG4gICAgbW9kZSxcbiAgICBzZWVkcyxcbiAgICBjb25zaWRlcmVkOiBjb25zaWRlcmVkQ291bnQsXG4gICAgY2hlY2tlZDogY2FuZGlkYXRlcy5sZW5ndGgsXG4gICAgaXNNb25pa2VyRW5hYmxlZCxcbiAgICBpc0V4aGF1c3RpdmUsXG4gICAgaXNOZWFyTWF0Y2hFbmFibGVkLFxuICAgIHJlc3VsdHM6IGNhbmRpZGF0ZXMubWFwKChuYW1lKSA9PiB2ZXJkaWN0cy5nZXQobmFtZSkpLmZpbHRlcihCb29sZWFuKSxcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJUZXh0KG91dHB1dCkge1xuICBjb25zdCBoZWFkZXIgPVxuICAgIG91dHB1dC5tb2RlID09PSAnZmluZCdcbiAgICAgID8gW2BzZWVkczogICAgJHtvdXRwdXQuc2VlZHMuam9pbignLCAnKX1gLCBgY29uc2lkZXJlZDogJHtvdXRwdXQuY29uc2lkZXJlZH0gY2FuZGlkYXRlc2BdXG4gICAgICA6IFtdXG4gIGhlYWRlci5wdXNoKFxuICAgIGBjaGVja2VkOiAgJHtvdXRwdXQuY2hlY2tlZH0gY2FuZGlkYXRlc2AsXG4gICAgb3V0cHV0LmlzTW9uaWtlckVuYWJsZWRcbiAgICAgID8gYG1vbmlrZXI6ICAke291dHB1dC5pc0V4aGF1c3RpdmUgPyAnZXhoYXVzdGl2ZScgOiAnc3RhbmRhcmQnfSBjb2xsaXNpb24gY2hlY2tgXG4gICAgICA6ICdtb25pa2VyOiAgc2tpcHBlZCAoLS1uby1tb25pa2VyKScsXG4gICAgb3V0cHV0LmlzTmVhck1hdGNoRW5hYmxlZFxuICAgICAgPyAnbmVhcjogICAgIHR5cG9zcXVhdCBzaW1pbGFyaXR5IGFnYWluc3QgcG9wdWxhciBwYWNrYWdlcydcbiAgICAgIDogJ25lYXI6ICAgICBza2lwcGVkICgtLW5vLW5lYXItbWF0Y2gpJyxcbiAgICBESVZJREVSXG4gIClcblxuICBjb25zdCByb3dzID0gb3V0cHV0LnJlc3VsdHMubWFwKHJlbmRlclZlcmRpY3RMaW5lKVxuICBjb25zdCB3aW5uZXJzID0gb3V0cHV0LnJlc3VsdHMuZmlsdGVyKCh2ZXJkaWN0KSA9PiB2ZXJkaWN0LnN0YXR1cyA9PT0gJ2F2YWlsYWJsZScpXG4gIGNvbnN0IGNsZWFuID0gd2lubmVycy5maWx0ZXIoKHZlcmRpY3QpID0+ICF2ZXJkaWN0Lm5lYXJNYXRjaGVzPy5sZW5ndGgpXG4gIGNvbnN0IHJpc2t5ID0gd2lubmVycy5maWx0ZXIoKHZlcmRpY3QpID0+IHZlcmRpY3QubmVhck1hdGNoZXM/Lmxlbmd0aClcbiAgY29uc3QgdW52ZXJpZmllZCA9IG91dHB1dC5yZXN1bHRzLmZpbHRlcigodmVyZGljdCkgPT4gdmVyZGljdC5zdGF0dXMgPT09ICd1bnZlcmlmaWVkJylcblxuICBjb25zdCBjbGVhbkxhYmVsID0gb3V0cHV0LmlzTW9uaWtlckVuYWJsZWRcbiAgICA/ICdBdmFpbGFibGUgKyBtb25pa2VyLWNsZWFyICsgbm8gdHlwb3NxdWF0IHNoYXBlJ1xuICAgIDogJ0F2YWlsYWJsZSArIG5vIHR5cG9zcXVhdCBzaGFwZSAobW9uaWtlciBjaGVjayBza2lwcGVkKSdcblxuICBjb25zdCBzZWN0aW9ucyA9IFtcbiAgICByZW5kZXJTaG9ydGxpc3QoY2xlYW5MYWJlbCwgY2xlYW4sICh3aW5uZXIpID0+IGAgIOKAoiAke3dpbm5lci5uYW1lfWApLFxuICAgIHJlbmRlclNob3J0bGlzdChcbiAgICAgICdBdmFpbGFibGUgYnV0IHR5cG9zcXVhdC1zaGFwZWQnLFxuICAgICAgcmlza3ksXG4gICAgICAod2lubmVyKSA9PiBgICDigKIgJHt3aW5uZXIubmFtZX0gIH4gICR7Zm9ybWF0TmVhck1hdGNoZXMod2lubmVyLm5lYXJNYXRjaGVzKX1gLFxuICAgICAgJyDigJQgcHVibGlzaGFibGUsIGJ1dCBjbG9zZSB0byBwb3B1bGFyIHBhY2thZ2VzJ1xuICAgICksXG4gICAgcmVuZGVyU2hvcnRsaXN0KFxuICAgICAgJ01vbmlrZXIgY2hlY2sgaW5jb21wbGV0ZScsXG4gICAgICB1bnZlcmlmaWVkLFxuICAgICAgKHZlcmRpY3QpID0+XG4gICAgICAgIGAgIOKAoiAke3ZlcmRpY3QubmFtZX0gICgke3ZlcmRpY3QudW52ZXJpZmllZFRvdGFsfSB2YXJpYW50JHt2ZXJkaWN0LnVudmVyaWZpZWRUb3RhbCA9PT0gMSA/ICcnIDogJ3MnfSBub3QgcHJvYmVkKWAsXG4gICAgICAnIOKAlCByZXRyeSBmYWlsZWQgcHJvYmVzOyBhdmFpbGFiaWxpdHkgcmVtYWlucyBwcm92aXNpb25hbCdcbiAgICApLFxuICBdLmZpbHRlcihCb29sZWFuKVxuXG4gIGNvbnN0IGZvb3RlciA9XG4gICAgY2xlYW4ubGVuZ3RoID09PSAwICYmIHJpc2t5Lmxlbmd0aCA9PT0gMCAmJiB1bnZlcmlmaWVkLmxlbmd0aCA9PT0gMFxuICAgICAgPyBbRElWSURFUiwgJ05vIGF2YWlsYWJsZSArIG1vbmlrZXItY2xlYXIgY2FuZGlkYXRlcy4gVHJ5IGJyb2FkZXIgc2VlZHMgb3IgLS1zY29wZS4nXVxuICAgICAgOiBbXVxuXG4gIHJldHVybiBbLi4uaGVhZGVyLCAuLi5yb3dzLCAuLi5zZWN0aW9ucywgLi4uZm9vdGVyXS5qb2luKCdcXG4nKSArICdcXG4nXG59XG5cbmZ1bmN0aW9uIHJlbmRlclZlcmRpY3RMaW5lKHZlcmRpY3QpIHtcbiAgY29uc3QgdGFnID0gYCR7U1lNQk9MU1t2ZXJkaWN0LnN0YXR1c119ICR7dmVyZGljdC5zdGF0dXN9YC5wYWRFbmQoMTQpXG4gIGNvbnN0IG5hbWUgPSB2ZXJkaWN0Lm5hbWUucGFkRW5kKDI4KVxuICBjb25zdCBkZXRhaWwgPSBtYXRjaCh2ZXJkaWN0KVxuICAgIC53aXRoKHsgc3RhdHVzOiAndGFrZW4nIH0sICgpID0+ICcnKVxuICAgIC53aXRoKHsgc3RhdHVzOiAnbW9uaWtlcicgfSwgKHJlc3VsdCkgPT4gYGNvbGxpZGVzIHdpdGg6ICR7cmVzdWx0LmNvbmZsaWN0cy5qb2luKCcsICcpfWApXG4gICAgLndpdGgoXG4gICAgICB7IHN0YXR1czogJ3VudmVyaWZpZWQnIH0sXG4gICAgICAocmVzdWx0KSA9PlxuICAgICAgICBgbW9uaWtlciBpbmNvbXBsZXRlOiAke3Jlc3VsdC51bnZlcmlmaWVkVG90YWx9IHZhcmlhbnQke3Jlc3VsdC51bnZlcmlmaWVkVG90YWwgPT09IDEgPyAnJyA6ICdzJ30gbm90IHByb2JlZGBcbiAgICApXG4gICAgLndpdGgoeyBzdGF0dXM6ICdpbnZhbGlkJyB9LCAocmVzdWx0KSA9PiBgKCR7cmVzdWx0LnJlYXNvbnMuam9pbignOyAnKX0pYClcbiAgICAud2l0aChcbiAgICAgIHsgc3RhdHVzOiAndW5rbm93bicgfSxcbiAgICAgIChyZXN1bHQpID0+IGAoaHR0cCAke3Jlc3VsdC5odHRwU3RhdHVzfSR7cmVzdWx0LmVycm9yID8gYDogJHtyZXN1bHQuZXJyb3J9YCA6ICcnfSlgXG4gICAgKVxuICAgIC53aXRoKFxuICAgICAgeyBzdGF0dXM6ICdhdmFpbGFibGUnLCBuZWFyTWF0Y2hlczogUC5hcnJheSgpIH0sXG4gICAgICAocmVzdWx0KSA9PiBgbmVhcjogJHtmb3JtYXROZWFyTWF0Y2hlcyhyZXN1bHQubmVhck1hdGNoZXMpfWBcbiAgICApXG4gICAgLndpdGgoeyBzdGF0dXM6ICdhdmFpbGFibGUnIH0sICgpID0+ICcnKVxuICAgIC5leGhhdXN0aXZlKClcbiAgcmV0dXJuIGAke3RhZ30ke25hbWV9JHtkZXRhaWx9YFxufVxuXG5mdW5jdGlvbiBmb3JtYXROZWFyTWF0Y2hlcyhtYXRjaGVzKSB7XG4gIHJldHVybiBtYXRjaGVzLm1hcCgobmVpZ2hib3IpID0+IGAke25laWdoYm9yLm5hbWV9IChkPSR7bmVpZ2hib3IuZGlzdGFuY2V9KWApLmpvaW4oJywgJylcbn1cblxuZnVuY3Rpb24gcmVuZGVyU2hvcnRsaXN0KGxhYmVsLCBpdGVtcywgbGluZUZuLCBzdWZmaXggPSAnJykge1xuICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbFxuICBjb25zdCBoZWFkZXIgPSBgJHtESVZJREVSfVxcbiR7bGFiZWx9ICgke2l0ZW1zLmxlbmd0aH0pJHtzdWZmaXh9OmBcbiAgY29uc3QgYm9keSA9IGl0ZW1zLnNsaWNlKDAsIFNIT1JUTElTVF9MSU1JVCkubWFwKGxpbmVGbikuam9pbignXFxuJylcbiAgY29uc3QgbW9yZSA9XG4gICAgaXRlbXMubGVuZ3RoID4gU0hPUlRMSVNUX0xJTUlUID8gYFxcbiAg4oCmIGFuZCAke2l0ZW1zLmxlbmd0aCAtIFNIT1JUTElTVF9MSU1JVH0gbW9yZWAgOiAnJ1xuICByZXR1cm4gYCR7aGVhZGVyfVxcbiR7Ym9keX0ke21vcmV9YFxufVxuXG5mdW5jdGlvbiBkaWUobWVzc2FnZSkge1xuICBwcm9jZXNzLnN0ZGVyci53cml0ZShgZXJyb3I6ICR7bWVzc2FnZX1cXG5cXG5SdW4gLS1oZWxwIGZvciB1c2FnZS5cXG5gKVxuICBwcm9jZXNzLmV4aXQoMilcbn1cblxubWFpbigpLmNhdGNoKChlcnJvcikgPT4ge1xuICBwcm9jZXNzLnN0ZGVyci53cml0ZShgZXJyb3I6ICR7ZXJyb3I/LnN0YWNrID8/IGVycm9yfVxcbmApXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcbiJdLCJpZ25vcmVMaXN0IjpbMCwxLDIsMyw4LDEwLDExXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsU0FBUyxNQUFNLEdBQUc7Q0FDakIsT0FBTyxLQUFLO0FBQ2I7O0FDdEJBLE1BQU0sSUFBRSxPQUFPLElBQUkscUJBQXFCO0FBQUUsTUFBQSxJQUFFLE9BQU8sSUFBSSx3QkFBd0I7QUFBRSxNQUFBLElBQUU7QUFBbUMsTUFBQSxLQUFFLE1BQUcsUUFBUSxLQUFHLFlBQVUsT0FBTyxDQUFDO0FBQUUsTUFBQSxLQUFFLE1BQUcsS0FBRyxDQUFDLENBQUMsRUFBRTtBQUFHLE1BQUEsS0FBRyxHQUFFLEdBQUUsTUFBSTtDQUFDLElBQUcsRUFBRSxDQUFDLEdBQUU7RUFBQyxNQUFlLEVBQUMsU0FBUSxHQUFFLFlBQVcsTUFBN0IsRUFBRSxFQUFFLENBQTRCLENBQUMsQ0FBQyxNQUFNLENBQUM7RUFBRSxPQUFPLEtBQUcsS0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUSxNQUFHLEVBQUUsR0FBRSxFQUFFLEVBQUUsQ0FBQyxHQUFFO0NBQUM7Q0FBQyxJQUFHLEVBQUUsQ0FBQyxHQUFFO0VBQUMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLE9BQU0sQ0FBQztFQUFFLElBQUcsTUFBTSxRQUFRLENBQUMsR0FBRTtHQUFDLElBQUcsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxHQUFFLE9BQU0sQ0FBQztHQUFFLElBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxDQUFDO0dBQUUsS0FBSSxNQUFNLEtBQUssRUFBRSxLQUFLLEdBQUU7SUFBQyxNQUFNLElBQUUsRUFBRTtJQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsS0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFFLEVBQUUsU0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFFLEVBQUUsS0FBSyxDQUFDO0dBQUM7R0FBQyxJQUFHLEVBQUUsUUFBTztJQUFDLElBQUcsRUFBRSxTQUFPLEdBQUUsTUFBTSxJQUFJLE1BQU0sMEZBQTBGO0lBQUUsSUFBRyxFQUFFLFNBQU8sRUFBRSxTQUFPLEVBQUUsUUFBTyxPQUFNLENBQUM7SUFBRSxNQUFNLElBQUUsRUFBRSxNQUFNLEdBQUUsRUFBRSxNQUFNLEdBQUUsSUFBRSxNQUFJLEVBQUUsU0FBTyxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEdBQUUsSUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFPLE1BQUksRUFBRSxTQUFPLFdBQVMsQ0FBQyxFQUFFLE1BQU07SUFBRSxPQUFPLEVBQUUsT0FBTyxHQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRyxDQUFDLENBQUMsS0FBRyxFQUFFLE9BQU8sR0FBRSxNQUFJLEVBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQyxDQUFDLE1BQUksTUFBSSxFQUFFLFVBQVEsRUFBRSxFQUFFLElBQUcsR0FBRSxDQUFDO0dBQUU7R0FBQyxPQUFPLEVBQUUsV0FBUyxFQUFFLFVBQVEsRUFBRSxPQUFPLEdBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFHLENBQUMsQ0FBQztFQUFDO0VBQUMsT0FBTyxRQUFRLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTSxNQUFHO0dBQUMsTUFBTSxJQUFFLEVBQUU7R0FBRyxRQUFPLEtBQUssS0FBRyxFQUFFLElBQUUsQ0FBQyxLQUFHLGVBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFjLEVBQUUsR0FBRSxFQUFFLElBQUcsQ0FBQztPQUFNO0VBQUMsQ0FBQztDQUFDO0NBQUMsT0FBTyxPQUFPLEdBQUcsR0FBRSxDQUFDO0FBQUM7QUFBRSxNQUFBLEtBQUUsTUFBRztDQUFDLElBQUksR0FBRSxHQUFFO0NBQUUsT0FBTyxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxTQUFPLElBQUUsU0FBTyxLQUFHLElBQUUsRUFBRSxFQUFFLENBQUMsRUFBQSxDQUFHLG9CQUFrQixLQUFLLElBQUUsRUFBRSxLQUFLLENBQUMsS0FBRyxJQUFFLENBQUMsSUFBRSxNQUFNLFFBQVEsQ0FBQyxJQUFFLEVBQUUsR0FBRSxDQUFDLElBQUUsRUFBRSxPQUFPLE9BQU8sQ0FBQyxHQUFFLENBQUMsSUFBRSxDQUFDO0FBQUM7QUFBRSxNQUFBLEtBQUcsR0FBRSxNQUFJLEVBQUUsUUFBUSxHQUFFLE1BQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDO0FBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRTtDQUFDLElBQUcsTUFBSSxFQUFFLFFBQU87RUFBQyxNQUFLLENBQUMsS0FBRztFQUFFLFFBQU8sTUFBRyxFQUFFLEdBQUUsU0FBTSxDQUFDLENBQUM7Q0FBQztDQUFDLElBQUcsTUFBSSxFQUFFLFFBQU87RUFBQyxNQUFLLENBQUMsR0FBRSxLQUFHO0VBQUUsT0FBTyxFQUFFLEdBQUUsU0FBTSxDQUFDLENBQUM7Q0FBQztDQUFDLE1BQU0sSUFBSSxNQUFNLG9GQUFvRixFQUFFLE9BQU8sRUFBRTtBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFPLE9BQU8sT0FBTyxHQUFFO0VBQUMsZ0JBQWEsRUFBRSxDQUFDO0VBQUUsTUFBSSxNQUFHLEVBQUUsR0FBRSxDQUFDO0VBQUUsS0FBRyxNQUFHLEVBQUUsR0FBRSxDQUFDO0VBQUUsU0FBTyxNQUFHLEtBQUssTUFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsR0FBRSxDQUFDO0NBQUMsQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFPLE9BQU8sU0FBUSxNQUFHLE9BQU8sT0FBTyxHQUFFLEVBQUMsQ0FBQyxPQUFPLFlBQVc7RUFBQyxJQUFJLElBQUU7RUFBRSxNQUFNLElBQUUsQ0FBQztHQUFDLE9BQU0sT0FBTyxPQUFPLEdBQUUsR0FBRSxJQUFHLENBQUMsRUFBQyxDQUFDO0dBQUUsTUFBSyxDQUFDO0VBQUMsR0FBRTtHQUFDLE1BQUssQ0FBQztHQUFFLE9BQU0sS0FBSztFQUFDLENBQUM7RUFBRSxPQUFNLEVBQUMsWUFBUztHQUFDLElBQUk7R0FBRSxPQUFPLFNBQU8sSUFBRSxFQUFFLFFBQU0sSUFBRSxFQUFFLEdBQUcsRUFBRTtFQUFDLEVBQUM7Q0FBQyxFQUFDLENBQUMsRUFBQSxDQUFHLENBQUMsR0FBRTtFQUFDLGdCQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7RUFBRSxTQUFPLE1BQUcsRUFBRSxLQUFLLE1BQUksSUFBRSxFQUFFLENBQUMsSUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO0NBQUMsQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0VBQUMsUUFBTSxNQUFHO0dBQUMsSUFBSSxJQUFFLENBQUM7R0FBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0lBQUMsRUFBRSxLQUFHO0dBQUM7R0FBRSxPQUFPLEtBQUssTUFBSSxLQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUSxNQUFHLEVBQUUsR0FBRSxLQUFLLENBQUMsQ0FBQyxHQUFFO0lBQUMsU0FBUSxDQUFDO0lBQUUsWUFBVztHQUFDLEtBQUc7SUFBQyxTQUFRLEVBQUUsR0FBRSxHQUFFLENBQUM7SUFBRSxZQUFXO0dBQUM7RUFBQztFQUFFLHdCQUFxQixFQUFFLENBQUM7RUFBRSxhQUFZO0NBQVUsR0FBRSxDQUFDO0FBQUM7QUFBQyxNQUFNLEtBQUcsR0FBRSxNQUFJO0NBQUMsS0FBSSxNQUFNLEtBQUssR0FBRSxJQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsT0FBTSxDQUFDO0NBQUUsT0FBTSxDQUFDO0FBQUM7QUFBRSxNQUFBLEtBQUcsR0FBRSxNQUFJO0NBQUMsS0FBSSxNQUFLLENBQUMsR0FBRSxNQUFLLEVBQUUsUUFBUSxHQUFFLElBQUcsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxHQUFFLE9BQU0sQ0FBQztDQUFFLE9BQU0sQ0FBQztBQUFDO0FBQUUsTUFBQSxLQUFHLEdBQUUsTUFBSTtDQUFDLE1BQU0sSUFBRSxRQUFRLFFBQVEsQ0FBQztDQUFFLEtBQUksTUFBTSxLQUFLLEdBQUUsSUFBRyxDQUFDLEVBQUUsR0FBRSxFQUFFLEVBQUUsR0FBRSxPQUFNLENBQUM7Q0FBRSxPQUFNLENBQUM7QUFBQztBQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUU7Q0FBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0VBQUMsUUFBTSxNQUFHO0dBQUMsSUFBSSxJQUFFLENBQUM7R0FBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0lBQUMsRUFBRSxLQUFHO0dBQUM7R0FBRSxPQUFNO0lBQUMsU0FBUSxFQUFFLE9BQU0sTUFBRyxFQUFFLEdBQUUsR0FBRSxDQUFDLENBQUM7SUFBRSxZQUFXO0dBQUM7RUFBQztFQUFFLHdCQUFxQixFQUFFLEdBQUUsQ0FBQztFQUFFLGFBQVk7Q0FBSyxHQUFFLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUU7Q0FBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0VBQUMsUUFBTSxNQUFHO0dBQUMsSUFBSSxJQUFFLENBQUM7R0FBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0lBQUMsRUFBRSxLQUFHO0dBQUM7R0FBRSxPQUFPLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxTQUFRLE1BQUcsRUFBRSxHQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUU7SUFBQyxTQUFRLEVBQUUsTUFBSyxNQUFHLEVBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQztJQUFFLFlBQVc7R0FBQztFQUFDO0VBQUUsd0JBQXFCLEVBQUUsR0FBRSxDQUFDO0VBQUUsYUFBWTtDQUFJLEdBQUUsQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFNLEdBQUUsV0FBUSxFQUFDLFFBQU0sT0FBSSxFQUFDLFNBQVEsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUUsR0FBRTtBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRTtDQUFDLE1BQU0sSUFBRSxZQUFVLE9BQU8sRUFBRSxLQUFHLEVBQUUsS0FBRyxLQUFLLEdBQUUsSUFBRSxNQUFJLEVBQUUsU0FBTyxFQUFFLEtBQUcsWUFBVSxPQUFPLEVBQUUsS0FBRyxLQUFLLElBQUUsRUFBRTtDQUFHLE9BQU8sRUFBRSxHQUFFLFdBQVE7RUFBQyxRQUFNLE1BQUc7R0FBQyxJQUFJLElBQUUsR0FBRSxRQUFNLElBQUUsSUFBRSxJQUFHLEVBQUM7R0FBRSxPQUFNO0lBQUMsU0FBUSxLQUFLLE1BQUksS0FBRyxFQUFFLEdBQUUsSUFBRyxHQUFFLE1BQUk7S0FBQyxFQUFFLEtBQUc7SUFBQyxDQUFDO0lBQUUsWUFBVztHQUFDO0VBQUM7RUFBRSx3QkFBcUIsQ0FBQyxRQUFNLElBQUUsSUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQztDQUFDLEdBQUUsQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFNLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTSxZQUFVLE9BQU87QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTSxZQUFVLE9BQU87QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTSxZQUFVLE9BQU87QUFBQztBQUFDLE1BQU0sSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsTUFBQSxJQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFBRSxNQUFBLElBQUU7QUFBRSxNQUFBLEtBQUUsTUFBRyxPQUFPLE9BQU8sRUFBRSxDQUFDLEdBQUU7Q0FBQyxhQUFXLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUM7TUFBTTtDQUFDO0NBQUUsV0FBUyxNQUFHO0VBQUMsT0FBTyxFQUFFLEVBQUUsSUFBRyxJQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO01BQU07Q0FBQztDQUFFLFlBQVUsTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFVBQVEsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxTQUFPLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxXQUFTLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsWUFBVSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsVUFBUSxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLFdBQVMsTUFBRztFQUFDLE9BQU8sRUFBRSxFQUFFLElBQUcsSUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztNQUFNO0NBQUM7Q0FBRSxRQUFNLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO01BQU07Q0FBQztBQUFDLENBQUM7QUFBRSxNQUFBLElBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFFLE1BQUEsS0FBRSxNQUFHLE9BQU8sT0FBTyxFQUFFLENBQUMsR0FBRTtDQUFDLFVBQVMsR0FBRSxNQUFJLEVBQUUsRUFBRSxLQUFJLEdBQUUsTUFBSSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsS0FBRyxLQUFHLEtBQUcsQ0FBQyxFQUFBLENBQUcsR0FBRSxDQUFDLENBQUMsQ0FBQztDQUFFLEtBQUcsTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsS0FBRyxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxNQUFJLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsS0FBRyxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLE1BQUksTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxLQUFHLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsV0FBUSxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FBRSxjQUFXLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUFFLGdCQUFhLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsQ0FBQyxDQUFDO0NBQUUsZ0JBQWEsRUFBRSxFQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxDQUFDLENBQUM7QUFBQyxDQUFDO0FBQUUsTUFBQSxJQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFBRSxNQUFBLEtBQUUsTUFBRyxPQUFPLE9BQU8sRUFBRSxDQUFDLEdBQUU7Q0FBQyxVQUFTLEdBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLE1BQUksR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEtBQUcsS0FBRyxLQUFHLENBQUMsRUFBQSxDQUFHLEdBQUUsQ0FBQyxDQUFDLENBQUM7Q0FBRSxLQUFHLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsSUFBRSxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLEtBQUcsTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsRUFBQSxDQUFHLENBQUMsQ0FBQyxDQUFDO0NBQUUsTUFBSSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLEtBQUcsQ0FBQyxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7Q0FBRSxNQUFJLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxDQUFDLEtBQUcsS0FBRyxDQUFDLEVBQUEsQ0FBRyxDQUFDLENBQUMsQ0FBQztDQUFFLGdCQUFhLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLENBQUMsS0FBRyxJQUFFLENBQUMsQ0FBQyxDQUFDO0NBQUUsZ0JBQWEsRUFBRSxFQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsQ0FBQyxLQUFHLElBQUUsQ0FBQyxDQUFDLENBQUM7QUFBQyxDQUFDO0FBQWlMLElBQUksSUFBRTtDQUFDLFdBQVU7Q0FBSyxTQUFRO0NBQUUsVUFBUztDQUFFLE9BQU0sU0FBUyxHQUFHLEdBQUU7RUFBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0dBQUMsUUFBTSxNQUFHO0lBQUMsSUFBRyxDQUFDLE1BQU0sUUFBUSxDQUFDLEdBQUUsT0FBTSxFQUFDLFNBQVEsQ0FBQyxFQUFDO0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxPQUFNLEVBQUMsU0FBUSxDQUFDLEVBQUM7SUFBRSxNQUFNLElBQUUsRUFBRTtJQUFHLElBQUksSUFBRSxDQUFDO0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUSxNQUFHO0tBQUMsRUFBRSxLQUFHLENBQUM7SUFBQyxDQUFDLEdBQUU7S0FBQyxTQUFRLENBQUM7S0FBRSxZQUFXO0lBQUM7SUFBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0tBQUMsRUFBRSxNQUFJLEVBQUUsTUFBSSxDQUFDLEVBQUEsQ0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQUM7SUFBRSxPQUFNO0tBQUMsU0FBUSxFQUFFLE9BQU0sTUFBRyxFQUFFLEdBQUUsR0FBRSxDQUFDLENBQUM7S0FBRSxZQUFXO0lBQUM7R0FBQztHQUFFLHdCQUFxQixNQUFJLEVBQUUsU0FBTyxDQUFDLElBQUUsRUFBRSxFQUFFLEVBQUU7RUFBQyxHQUFFLENBQUM7Q0FBQztDQUFFLEtBQUksU0FBUyxHQUFHLEdBQUU7RUFBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0dBQUMsUUFBTSxNQUFHO0lBQUMsSUFBRyxFQUFFLGFBQWEsTUFBSyxPQUFNLEVBQUMsU0FBUSxDQUFDLEVBQUM7SUFBRSxJQUFJLElBQUUsQ0FBQztJQUFFLElBQUcsTUFBSSxFQUFFLE1BQUssT0FBTTtLQUFDLFNBQVEsQ0FBQztLQUFFLFlBQVc7SUFBQztJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sT0FBTSxFQUFDLFNBQVEsQ0FBQyxFQUFDO0lBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtLQUFDLEVBQUUsTUFBSSxFQUFFLE1BQUksQ0FBQyxFQUFBLENBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFDLEdBQUUsSUFBRSxFQUFFO0lBQUcsT0FBTTtLQUFDLFNBQVEsRUFBRSxJQUFFLE1BQUcsRUFBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDO0tBQUUsWUFBVztJQUFDO0dBQUM7R0FBRSx3QkFBcUIsTUFBSSxFQUFFLFNBQU8sQ0FBQyxJQUFFLEVBQUUsRUFBRSxFQUFFO0VBQUMsR0FBRSxDQUFDO0NBQUM7Q0FBRSxLQUFJLFNBQVMsR0FBRyxHQUFFO0VBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtHQUFDLFFBQU0sTUFBRztJQUFDLElBQUcsRUFBRSxhQUFhLE1BQUssT0FBTSxFQUFDLFNBQVEsQ0FBQyxFQUFDO0lBQUUsSUFBSSxJQUFFLENBQUM7SUFBRSxJQUFHLE1BQUksRUFBRSxNQUFLLE9BQU07S0FBQyxTQUFRLENBQUM7S0FBRSxZQUFXO0lBQUM7SUFBRSxNQUFNLEtBQUcsR0FBRSxNQUFJO0tBQUMsRUFBRSxNQUFJLEVBQUUsTUFBSSxDQUFDLEVBQUEsQ0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQUM7SUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLE9BQU0sRUFBQyxTQUFRLENBQUMsRUFBQztJQUFFLElBQUk7SUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLE1BQU0sSUFBSSxNQUFNLDRFQUE0RSxTQUFPLElBQUUsRUFBRSxNQUFJLEtBQUssSUFBRSxFQUFFLFNBQVMsR0FBRztJQUFFLE1BQUssQ0FBQyxHQUFFLEtBQUc7SUFBRSxPQUFNO0tBQUMsU0FBUSxFQUFFLElBQUcsR0FBRSxNQUFJO01BQUMsTUFBTSxJQUFFLEVBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLENBQUM7TUFBRSxPQUFPLEtBQUc7S0FBQyxDQUFDO0tBQUUsWUFBVztJQUFDO0dBQUM7R0FBRSx3QkFBcUIsTUFBSSxFQUFFLFNBQU8sQ0FBQyxJQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUFDLEdBQUUsQ0FBQztDQUFDO0NBQUUsUUFBTyxTQUFTLEdBQUcsR0FBRTtFQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7R0FBQyxRQUFNLE1BQUc7SUFBQyxJQUFHLFNBQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxNQUFNLFFBQVEsQ0FBQyxHQUFFLE9BQU0sRUFBQyxTQUFRLENBQUMsRUFBQztJQUFFLElBQUk7SUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLE1BQU0sSUFBSSxNQUFNLDBGQUEwRixTQUFPLElBQUUsRUFBRSxNQUFJLEtBQUssSUFBRSxFQUFFLFNBQVMsR0FBRztJQUFFLElBQUksSUFBRSxDQUFDO0lBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtLQUFDLEVBQUUsTUFBSSxFQUFFLE1BQUksQ0FBQyxFQUFBLENBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFDLEdBQUUsQ0FBQyxHQUFFLEtBQUcsTUFBSSxFQUFFLFNBQU8sQ0FBQyxHQUFFLEVBQUUsRUFBRSxJQUFFO0lBQUUsT0FBTTtLQUFDLFNBQVEsRUFBRSxJQUFHLEdBQUUsTUFBSTtNQUFDLE1BQU0sSUFBRSxZQUFVLE9BQU8sS0FBRyxPQUFPLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBRSxPQUFLLE9BQU8sQ0FBQyxHQUFFLElBQUUsU0FBTyxLQUFHLEVBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLENBQUM7TUFBRSxRQUFPLEtBQUcsTUFBSTtLQUFDLENBQUM7S0FBRSxZQUFXO0lBQUM7R0FBQztHQUFFLHdCQUFxQixNQUFJLEVBQUUsU0FBTyxDQUFDLElBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQUMsR0FBRSxDQUFDO0NBQUM7Q0FBRSxjQUFhO0NBQUUsT0FBTTtDQUFFLEtBQUksU0FBUyxHQUFFO0VBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtHQUFDLFFBQU0sT0FBSSxFQUFDLFNBQVEsQ0FBQyxFQUFFLEdBQUUsU0FBTSxDQUFDLENBQUMsRUFBQztHQUFHLHdCQUFxQixDQUFDO0dBQUUsYUFBWTtFQUFLLEdBQUUsQ0FBQztDQUFDO0NBQUUsTUFBSztDQUFFLFFBQU87Q0FBRSxLQUFJO0NBQUUsU0FBUTtDQUFFLEdBQUU7Q0FBRSxRQUFPO0NBQUUsUUFBTztDQUFFLFFBQXB0RSxFQUFFLEVBQUUsQ0FBQyxDQUFzdEU7Q0FBRSxTQUFudEUsRUFBRSxFQUFFLFNBQVMsR0FBRTtFQUFDLE9BQU0sYUFBVyxPQUFPO0NBQUMsQ0FBQyxDQUFpckU7Q0FBRSxRQUE5cUUsRUFBRSxFQUFFLFNBQVMsR0FBRTtFQUFDLE9BQU0sWUFBVSxPQUFPO0NBQUMsQ0FBQyxDQUE0b0U7Q0FBRSxTQUF6b0UsRUFBRSxFQUFFLFNBQVMsR0FBRTtFQUFDLE9BQU8sUUFBTTtDQUFDLENBQUMsQ0FBa25FO0NBQUUsYUFBL21FLEVBQUUsRUFBRSxTQUFTLEdBQUU7RUFBQyxPQUFPLFFBQU07Q0FBQyxDQUFDLENBQTRsRTtDQUFFLFlBQVcsU0FBUyxHQUFFO0VBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxHQUFFO0dBQUMsUUFBTyxNQUFHLGFBQWE7RUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQUM7Q0FBRSxPQUFNLFNBQVMsR0FBRTtFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FBQztBQUFDO0FBQUUsSUFBTSxJQUFOLGNBQWdCLE1BQUs7Q0FBQyxZQUFZLEdBQUU7RUFBQyxJQUFJO0VBQUUsSUFBRztHQUFDLElBQUUsS0FBSyxVQUFVLENBQUM7RUFBQyxTQUFPLEdBQUU7R0FBQyxJQUFFO0VBQUM7RUFBQyxNQUFNLG9EQUFvRCxHQUFHLEdBQUUsS0FBSyxRQUFNLEtBQUssR0FBRSxLQUFLLFFBQU07Q0FBQztBQUFDO0FBQUMsTUFBTSxJQUFFO0NBQUMsU0FBUSxDQUFDO0NBQUUsT0FBTSxLQUFLO0FBQUM7QUFBRSxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU8sSUFBSSxFQUFFLEdBQUUsQ0FBQztBQUFDO0FBQUMsSUFBTSxJQUFOLE1BQU0sRUFBQztDQUFDLFlBQVksR0FBRSxHQUFFO0VBQUMsS0FBSyxRQUFNLEtBQUssR0FBRSxLQUFLLFFBQU0sS0FBSyxHQUFFLEtBQUssUUFBTSxHQUFFLEtBQUssUUFBTTtDQUFDO0NBQUMsS0FBSyxHQUFHLEdBQUU7RUFBQyxJQUFHLEtBQUssTUFBTSxTQUFRLE9BQU87RUFBSyxNQUFNLElBQUUsRUFBRSxFQUFFLFNBQU8sSUFBRyxJQUFFLENBQUMsRUFBRSxFQUFFO0VBQUUsSUFBSTtFQUFFLE1BQUksRUFBRSxVQUFRLGNBQVksT0FBTyxFQUFFLEtBQUcsSUFBRSxFQUFFLEtBQUcsRUFBRSxTQUFPLEtBQUcsRUFBRSxLQUFLLEdBQUcsRUFBRSxNQUFNLEdBQUUsRUFBRSxTQUFPLENBQUMsQ0FBQztFQUFFLElBQUksSUFBRSxDQUFDLEdBQUUsSUFBRSxDQUFDO0VBQUUsTUFBTSxLQUFHLEdBQUUsTUFBSTtHQUFDLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBRztFQUFDLEdBQUUsSUFBRSxDQUFDLEVBQUUsTUFBSyxNQUFHLEVBQUUsR0FBRSxLQUFLLE9BQU0sQ0FBQyxDQUFDLEtBQUcsS0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQyxJQUFFLElBQUU7R0FBQyxTQUFRLENBQUM7R0FBRSxPQUFNLEVBQUUsSUFBRSxLQUFLLElBQUUsRUFBRSxLQUFHLElBQUUsS0FBSyxPQUFNLEtBQUssS0FBSztFQUFDO0VBQUUsT0FBTyxJQUFJLEVBQUUsS0FBSyxPQUFNLENBQUM7Q0FBQztDQUFDLEtBQUssR0FBRSxHQUFFO0VBQUMsSUFBRyxLQUFLLE1BQU0sU0FBUSxPQUFPO0VBQUssTUFBTSxJQUFFLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQztFQUFFLE9BQU8sSUFBSSxFQUFFLEtBQUssT0FBTSxJQUFFO0dBQUMsU0FBUSxDQUFDO0dBQUUsT0FBTSxFQUFFLEtBQUssT0FBTSxLQUFLLEtBQUs7RUFBQyxJQUFFLENBQUM7Q0FBQztDQUFDLFVBQVUsR0FBRTtFQUFDLE9BQU8sS0FBSyxNQUFNLFVBQVEsS0FBSyxNQUFNLFFB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