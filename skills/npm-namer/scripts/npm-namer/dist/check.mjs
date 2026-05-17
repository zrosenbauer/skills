#!/usr/bin/env node
// AUTO-GENERATED bundle from skill-scripts/npm-namer/src/check.mjs — do not edit by hand.
// Run `pnpm --filter @zrosenbauer/skill-scripts-npm-namer build` to regenerate.
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region ../../node_modules/.pnpm/massaman@0.2.0/node_modules/massaman/dist/control-B8mDJqXw.mjs
/**
* Minimal error coercion used internally by `err()`. Kept local to avoid
* pulling the full conversion module into the `massaman/control` bundle.
* For richer stringification (Maps, Sets, Errors with own props, circular
* refs), import `toError` from `massaman/conversion`.
*/
function coerceError(thrown) {
	if (thrown instanceof Error) return thrown;
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
/**
* Creates a failure result wrapping the given error.
*
* @param error - The error value
* @returns An `Err` result containing the error
*
* @example
* ```ts
* const result = err(new Error('fail'))
* // { ok: false, error: Error('fail') }
* ```
*/
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
//#endregion
//#region ../../node_modules/.pnpm/ts-pattern@5.9.0/node_modules/ts-pattern/dist/index.js
const t = Symbol.for("@ts-pattern/matcher"), e = Symbol.for("@ts-pattern/isVariadic"), n = "@ts-pattern/anonymous-select-key", r = (t) => Boolean(t && "object" == typeof t), i = (e) => e && !!e[t], o = (n, s, c) => {
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
}, s = (e) => {
	var n, o, u;
	return r(e) ? i(e) ? null != (n = null == (o = (u = e[t]()).getSelectionKeys) ? void 0 : o.call(u)) ? n : [] : Array.isArray(e) ? c(e, s) : c(Object.values(e), s) : [];
}, c = (t, e) => t.reduce((t, n) => t.concat(e(n)), []);
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
}, g = (t, e) => {
	for (const [n, r] of t.entries()) if (!e(r, n)) return !1;
	return !0;
}, m = (t, e) => {
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
const K = a(p(b)), O = a(p(b)), E = K, x = (t) => Object.assign(a(t), {
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
}), A = x(p(S)), N = (t) => Object.assign(a(t), {
	between: (e, n) => N(d(t, ((t, e) => p((n) => w(n) && t <= n && e >= n))(e, n))),
	lt: (e) => N(d(t, ((t) => p((e) => w(e) && e < t))(e))),
	gt: (e) => N(d(t, ((t) => p((e) => w(e) && e > t))(e))),
	lte: (e) => N(d(t, ((t) => p((e) => w(e) && e <= t))(e))),
	gte: (e) => N(d(t, ((t) => p((e) => w(e) && e >= t))(e))),
	int: () => N(d(t, p((t) => w(t) && Number.isInteger(t)))),
	finite: () => N(d(t, p((t) => w(t) && Number.isFinite(t)))),
	positive: () => N(d(t, p((t) => w(t) && t > 0))),
	negative: () => N(d(t, p((t) => w(t) && t < 0)))
}), P = N(p(w)), k = (t) => Object.assign(a(t), {
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
//#endregion
//#region ../../node_modules/.pnpm/massaman@0.2.0/node_modules/massaman/dist/match-CG_v2C4Q.mjs
/**
* Extends ts-pattern's `P` namespace with `P.ok` and `P.err` — structural
* patterns for matching a `Result` inside `match()`.
*
* Mirrors Rust's `Ok(value)` / `Err(error)` match arms, but uses the
* namespace-property form (`P.ok` / `P.err`) so it doesn't collide with
* the lowercase `ok()` / `err()` constructors from `massaman/control`.
*
* @example
* ```ts
* import { match, P, attempt } from 'massaman'
*
* match(attempt(() => JSON.parse(raw)))
*   .with(P.ok, ({ value }) => use(value))
*   .with(P.err, ({ error }) => log(error))
*   .exhaustive()
* ```
*/
const okPattern = { ok: true };
const errPattern = { ok: false };
/**
* Extended ts-pattern `P` namespace. Carries everything ts-pattern exports
* (`P.string`, `P.number`, `P.array`, `P.when`, …) plus `P.ok` / `P.err`
* for matching `Result` values.
*
* Explicit literal-type annotations on the additions (rather than `as const`)
* keep the values non-`readonly`, which ts-pattern's narrowing requires —
* a `readonly` pattern collapses the remaining input to `never` after the
* first arm, breaking exhaustiveness.
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
//#endregion
//#region src/corpus.mjs
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
//#endregion
//#region src/permute.mjs
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
//#endregion
//#region src/moniker.mjs
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
//#endregion
//#region src/near-match.mjs
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
//#endregion
//#region ../../node_modules/.pnpm/validate-npm-package-name@8.0.0/node_modules/validate-npm-package-name/lib/builtin-modules.json
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
//#endregion
//#region src/validate.mjs
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
//#endregion
//#region src/pipeline.mjs
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
//#endregion
//#region src/registry.mjs
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
//#endregion
//#region src/check.mjs
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
//#endregion
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2subWpzIiwibmFtZXMiOlsiUCIsInZhcmlhbnRzIiwibW9uaWtlclZhcmlhbnRzIiwibWF0Y2giLCJtYXRjaCIsIlAiXSwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWFzc2FtYW5AMC4yLjAvbm9kZV9tb2R1bGVzL21hc3NhbWFuL2Rpc3QvY29udHJvbC1COG1ESnFYdy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vdHMtcGF0dGVybkA1LjkuMC9ub2RlX21vZHVsZXMvdHMtcGF0dGVybi9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21hc3NhbWFuQDAuMi4wL25vZGVfbW9kdWxlcy9tYXNzYW1hbi9kaXN0L21hdGNoLUNHX3YyQzRRLm1qcyIsIi4uL3NyYy9jb25zdGFudHMubWpzIiwiLi4vc3JjL2NvcnB1cy5tanMiLCIuLi9zcmMvcGVybXV0ZS5tanMiLCIuLi9zcmMvbW9uaWtlci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGFtZXJhdS1sZXZlbnNodGVpbkAxLjAuOC9ub2RlX21vZHVsZXMvZGFtZXJhdS1sZXZlbnNodGVpbi9pbmRleC5qcyIsIi4uL3NyYy9uZWFyLW1hdGNoLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS92YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lQDguMC4wL25vZGVfbW9kdWxlcy92YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lL2xpYi9idWlsdGluLW1vZHVsZXMuanNvbiIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS92YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lQDguMC4wL25vZGVfbW9kdWxlcy92YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lL2xpYi9pbmRleC5qcyIsIi4uL3NyYy92YWxpZGF0ZS5tanMiLCIuLi9zcmMvcGlwZWxpbmUubWpzIiwiLi4vc3JjL3JlZ2lzdHJ5Lm1qcyIsIi4uL3NyYy9jaGVjay5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNOaWwgfSBmcm9tIFwiZXMtdG9vbGtpdC9wcmVkaWNhdGVcIjtcbmltcG9ydCB7IGFzc2VydCwgaW52YXJpYW50IH0gZnJvbSBcImVzLXRvb2xraXQvdXRpbFwiO1xuLy8jcmVnaW9uIHNyYy9jb250cm9sL3Jlc3VsdC50c1xuLyoqXG4qIE1pbmltYWwgZXJyb3IgY29lcmNpb24gdXNlZCBpbnRlcm5hbGx5IGJ5IGBlcnIoKWAuIEtlcHQgbG9jYWwgdG8gYXZvaWRcbiogcHVsbGluZyB0aGUgZnVsbCBjb252ZXJzaW9uIG1vZHVsZSBpbnRvIHRoZSBgbWFzc2FtYW4vY29udHJvbGAgYnVuZGxlLlxuKiBGb3IgcmljaGVyIHN0cmluZ2lmaWNhdGlvbiAoTWFwcywgU2V0cywgRXJyb3JzIHdpdGggb3duIHByb3BzLCBjaXJjdWxhclxuKiByZWZzKSwgaW1wb3J0IGB0b0Vycm9yYCBmcm9tIGBtYXNzYW1hbi9jb252ZXJzaW9uYC5cbiovXG5mdW5jdGlvbiBjb2VyY2VFcnJvcih0aHJvd24pIHtcblx0aWYgKHRocm93biBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdGhyb3duO1xuXHRpZiAodHlwZW9mIHRocm93biA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIG5ldyBFcnJvcih0aHJvd24pO1xuXHR0cnkge1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeSh0aHJvd24pID8/IFN0cmluZyh0aHJvd24pO1xuXHRcdHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSwgeyBjYXVzZTogdGhyb3duIH0pO1xuXHR9IGNhdGNoIHtcblx0XHRyZXR1cm4gbmV3IEVycm9yKFN0cmluZyh0aHJvd24pLCB7IGNhdXNlOiB0aHJvd24gfSk7XG5cdH1cbn1cbi8qKlxuKiBDcmVhdGVzIGEgc3VjY2VzcyByZXN1bHQgd3JhcHBpbmcgdGhlIGdpdmVuIHZhbHVlLlxuKlxuKiBAcGFyYW0gdmFsdWUgLSBUaGUgc3VjY2VzcyB2YWx1ZVxuKiBAcmV0dXJucyBBbiBgT2tgIHJlc3VsdCBjb250YWluaW5nIHRoZSB2YWx1ZVxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBjb25zdCByZXN1bHQgPSBvayg0MilcbiogLy8geyBvazogdHJ1ZSwgdmFsdWU6IDQyIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gb2sodmFsdWUpIHtcblx0cmV0dXJuIHtcblx0XHRvazogdHJ1ZSxcblx0XHR2YWx1ZSxcblx0XHRlcnJvcjogbnVsbFxuXHR9O1xufVxuLyoqXG4qIENyZWF0ZXMgYSBmYWlsdXJlIHJlc3VsdCB3cmFwcGluZyB0aGUgZ2l2ZW4gZXJyb3IuXG4qXG4qIEBwYXJhbSBlcnJvciAtIFRoZSBlcnJvciB2YWx1ZVxuKiBAcmV0dXJucyBBbiBgRXJyYCByZXN1bHQgY29udGFpbmluZyB0aGUgZXJyb3JcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgcmVzdWx0ID0gZXJyKG5ldyBFcnJvcignZmFpbCcpKVxuKiAvLyB7IG9rOiBmYWxzZSwgZXJyb3I6IEVycm9yKCdmYWlsJykgfVxuKiBgYGBcbiovXG5mdW5jdGlvbiBlcnIoZXJyb3IpIHtcblx0cmV0dXJuIHtcblx0XHRvazogZmFsc2UsXG5cdFx0dmFsdWU6IG51bGwsXG5cdFx0ZXJyb3I6IGNvZXJjZUVycm9yKGVycm9yKVxuXHR9O1xufVxuLyoqXG4qIFR5cGUgZ3VhcmQgdGhhdCBuYXJyb3dzIGEgYFJlc3VsdGAgdG8gYE9rYC5cbipcbiogQHBhcmFtIHJlc3VsdCAtIFRoZSByZXN1bHQgdG8gY2hlY2tcbiogQHJldHVybnMgYHRydWVgIGlmIHRoZSByZXN1bHQgaXMgYE9rYFxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBjb25zdCByZXN1bHQgPSBhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UoJ3t9JykpXG4qIGlmIChpc09rKHJlc3VsdCkpIHtcbiogICBjb25zb2xlLmxvZyhyZXN1bHQudmFsdWUpXG4qIH1cbiogYGBgXG4qL1xuZnVuY3Rpb24gaXNPayhyZXN1bHQpIHtcblx0cmV0dXJuIHJlc3VsdC5vayA9PT0gdHJ1ZTtcbn1cbi8qKlxuKiBUeXBlIGd1YXJkIHRoYXQgbmFycm93cyBhIGBSZXN1bHRgIHRvIGBFcnJgLlxuKlxuKiBAcGFyYW0gcmVzdWx0IC0gVGhlIHJlc3VsdCB0byBjaGVja1xuKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHJlc3VsdCBpcyBgRXJyYFxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBjb25zdCByZXN1bHQgPSBhdHRlbXB0KCgpID0+IEpTT04ucGFyc2UoJ2JhZCcpKVxuKiBpZiAoaXNFcnIocmVzdWx0KSkge1xuKiAgIGNvbnNvbGUuZXJyb3IocmVzdWx0LmVycm9yKVxuKiB9XG4qIGBgYFxuKi9cbmZ1bmN0aW9uIGlzRXJyKHJlc3VsdCkge1xuXHRyZXR1cm4gcmVzdWx0Lm9rID09PSBmYWxzZTtcbn1cbi8qKlxuKiBFeHRyYWN0IHRoZSB2YWx1ZSBmcm9tIGFuIGBPa2AgcmVzdWx0LCBvciB0aHJvdyBvbiBgRXJyYC5cbipcbiogV2hlbiBjYWxsZWQgd2l0aG91dCBhIG1lc3NhZ2UsIHRocm93cyB0aGUgb3JpZ2luYWwgZXJyb3IuXG4qIFdoZW4gY2FsbGVkIHdpdGggYSBtZXNzYWdlLCB0aHJvd3MgYSBuZXcgRXJyb3Igd2l0aCB0aGF0IG1lc3NhZ2VcbiogYW5kIHRoZSBvcmlnaW5hbCBlcnJvciBhcyBgY2F1c2VgIChsaWtlIFJ1c3QncyBgZXhwZWN0YCkuXG4qXG4qIEBwYXJhbSByZXN1bHQgLSBUaGUgcmVzdWx0IHRvIHVud3JhcFxuKiBAcGFyYW0gbWVzc2FnZSAtIE9wdGlvbmFsIGN1c3RvbSBlcnJvciBtZXNzYWdlIChSdXN0IGBleHBlY3RgIGJlaGF2aW9yKVxuKiBAcmV0dXJucyBUaGUgdW53cmFwcGVkIHZhbHVlXG4qXG4qIEBleGFtcGxlXG4qIGBgYHRzXG4qIGNvbnN0IHZhbHVlID0gdW53cmFwKG9rKDQyKSkgICAgICAgICAgIC8vIDQyXG4qIHVud3JhcChlcnIoJ2ZhaWwnKSkgICAgICAgICAgICAgICAgICAgIC8vIHRocm93cyBFcnJvcignZmFpbCcpXG4qIHVud3JhcChlcnIoJ2ZhaWwnKSwgJ2NvbmZpZyByZXF1aXJlZCcpIC8vIHRocm93cyBFcnJvcignY29uZmlnIHJlcXVpcmVkJywgeyBjYXVzZTogRXJyb3IoJ2ZhaWwnKSB9KVxuKiBgYGBcbiovXG5mdW5jdGlvbiB1bndyYXAocmVzdWx0LCBtZXNzYWdlKSB7XG5cdGlmIChyZXN1bHQub2spIHJldHVybiByZXN1bHQudmFsdWU7XG5cdGlmICghaXNOaWwobWVzc2FnZSkpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLCB7IGNhdXNlOiByZXN1bHQuZXJyb3IgfSk7XG5cdHRocm93IHJlc3VsdC5lcnJvcjtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9jb250cm9sL2F0dGVtcHQudHNcbi8qKlxuKiBFeGVjdXRlcyBhIHN5bmNocm9ub3VzIGZ1bmN0aW9uIGFuZCB3cmFwcyB0aGUgb3V0Y29tZSBpbiBhIGBSZXN1bHRgLlxuKiBSZXR1cm5zIGBPa2Agd2l0aCB0aGUgcmV0dXJuIHZhbHVlIG9uIHN1Y2Nlc3MsIGBFcnJgIHdpdGggdGhlIHRocm93biB2YWx1ZSBvbiBmYWlsdXJlLlxuKlxuKiBAcGFyYW0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZVxuKiBAcmV0dXJucyBBIGBSZXN1bHRgIGNvbnRhaW5pbmcgZWl0aGVyIHRoZSB2YWx1ZSBvciB0aGUgZXJyb3JcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogY29uc3QgcmVzdWx0ID0gYXR0ZW1wdCgoKSA9PiBKU09OLnBhcnNlKCd7XCJhXCI6MX0nKSlcbiogaWYgKGlzT2socmVzdWx0KSkge1xuKiAgIGNvbnNvbGUubG9nKHJlc3VsdC52YWx1ZSkgLy8geyBhOiAxIH1cbiogfVxuKiBgYGBcbiovXG5mdW5jdGlvbiBhdHRlbXB0KGZuKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG9rKGZuKCkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiBlcnIoZXJyb3IpO1xuXHR9XG59XG4vKipcbiogRXhlY3V0ZXMgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGFuZCB3cmFwcyB0aGUgb3V0Y29tZSBpbiBhIGBSZXN1bHRgLlxuKiBSZXR1cm5zIGBPa2Agd2l0aCB0aGUgcmVzb2x2ZWQgdmFsdWUgb24gc3VjY2VzcywgYEVycmAgd2l0aCB0aGUgcmVqZWN0aW9uIHJlYXNvbiBvbiBmYWlsdXJlLlxuKlxuKiBAcGFyYW0gZm4gLSBUaGUgYXN5bmMgZnVuY3Rpb24gdG8gZXhlY3V0ZVxuKiBAcmV0dXJucyBBIHByb21pc2UgcmVzb2x2aW5nIHRvIGEgYFJlc3VsdGAgY29udGFpbmluZyBlaXRoZXIgdGhlIHZhbHVlIG9yIHRoZSBlcnJvclxuKlxuKiBAZXhhbXBsZVxuKiBgYGB0c1xuKiBjb25zdCByZXN1bHQgPSBhd2FpdCBhdHRlbXB0QXN5bmMoKCkgPT4gZmV0Y2goJy9hcGkvZGF0YScpKVxuKiBpZiAoaXNFcnIocmVzdWx0KSkge1xuKiAgIGNvbnNvbGUuZXJyb3IocmVzdWx0LmVycm9yKVxuKiB9XG4qIGBgYFxuKi9cbmFzeW5jIGZ1bmN0aW9uIGF0dGVtcHRBc3luYyhmbikge1xuXHR0cnkge1xuXHRcdHJldHVybiBvayhhd2FpdCBmbigpKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyKGVycm9yKTtcblx0fVxufVxuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBlcnIgYXMgYSwgb2sgYXMgYywgYXR0ZW1wdEFzeW5jIGFzIGksIHVud3JhcCBhcyBsLCBpbnZhcmlhbnQgYXMgbiwgaXNFcnIgYXMgbywgYXR0ZW1wdCBhcyByLCBpc09rIGFzIHMsIGFzc2VydCBhcyB0IH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRyb2wtQjhtREpxWHcubWpzLm1hcCIsImNvbnN0IHQ9U3ltYm9sLmZvcihcIkB0cy1wYXR0ZXJuL21hdGNoZXJcIiksZT1TeW1ib2wuZm9yKFwiQHRzLXBhdHRlcm4vaXNWYXJpYWRpY1wiKSxuPVwiQHRzLXBhdHRlcm4vYW5vbnltb3VzLXNlbGVjdC1rZXlcIixyPXQ9PkJvb2xlYW4odCYmXCJvYmplY3RcIj09dHlwZW9mIHQpLGk9ZT0+ZSYmISFlW3RdLG89KG4scyxjKT0+e2lmKGkobikpe2NvbnN0IGU9blt0XSgpLHttYXRjaGVkOnIsc2VsZWN0aW9uczppfT1lLm1hdGNoKHMpO3JldHVybiByJiZpJiZPYmplY3Qua2V5cyhpKS5mb3JFYWNoKHQ9PmModCxpW3RdKSkscn1pZihyKG4pKXtpZighcihzKSlyZXR1cm4hMTtpZihBcnJheS5pc0FycmF5KG4pKXtpZighQXJyYXkuaXNBcnJheShzKSlyZXR1cm4hMTtsZXQgdD1bXSxyPVtdLHU9W107Zm9yKGNvbnN0IG8gb2Ygbi5rZXlzKCkpe2NvbnN0IHM9bltvXTtpKHMpJiZzW2VdP3UucHVzaChzKTp1Lmxlbmd0aD9yLnB1c2gocyk6dC5wdXNoKHMpfWlmKHUubGVuZ3RoKXtpZih1Lmxlbmd0aD4xKXRocm93IG5ldyBFcnJvcihcIlBhdHRlcm4gZXJyb3I6IFVzaW5nIGAuLi5QLmFycmF5KC4uLilgIHNldmVyYWwgdGltZXMgaW4gYSBzaW5nbGUgcGF0dGVybiBpcyBub3QgYWxsb3dlZC5cIik7aWYocy5sZW5ndGg8dC5sZW5ndGgrci5sZW5ndGgpcmV0dXJuITE7Y29uc3QgZT1zLnNsaWNlKDAsdC5sZW5ndGgpLG49MD09PXIubGVuZ3RoP1tdOnMuc2xpY2UoLXIubGVuZ3RoKSxpPXMuc2xpY2UodC5sZW5ndGgsMD09PXIubGVuZ3RoP0luZmluaXR5Oi1yLmxlbmd0aCk7cmV0dXJuIHQuZXZlcnkoKHQsbik9Pm8odCxlW25dLGMpKSYmci5ldmVyeSgodCxlKT0+byh0LG5bZV0sYykpJiYoMD09PXUubGVuZ3RofHxvKHVbMF0saSxjKSl9cmV0dXJuIG4ubGVuZ3RoPT09cy5sZW5ndGgmJm4uZXZlcnkoKHQsZSk9Pm8odCxzW2VdLGMpKX1yZXR1cm4gUmVmbGVjdC5vd25LZXlzKG4pLmV2ZXJ5KGU9Pntjb25zdCByPW5bZV07cmV0dXJuKGUgaW4gc3x8aSh1PXIpJiZcIm9wdGlvbmFsXCI9PT11W3RdKCkubWF0Y2hlclR5cGUpJiZvKHIsc1tlXSxjKTt2YXIgdX0pfXJldHVybiBPYmplY3QuaXMocyxuKX0scz1lPT57dmFyIG4sbyx1O3JldHVybiByKGUpP2koZSk/bnVsbCE9KG49bnVsbD09KG89KHU9ZVt0XSgpKS5nZXRTZWxlY3Rpb25LZXlzKT92b2lkIDA6by5jYWxsKHUpKT9uOltdOkFycmF5LmlzQXJyYXkoZSk/YyhlLHMpOmMoT2JqZWN0LnZhbHVlcyhlKSxzKTpbXX0sYz0odCxlKT0+dC5yZWR1Y2UoKHQsbik9PnQuY29uY2F0KGUobikpLFtdKTtmdW5jdGlvbiB1KC4uLnQpe2lmKDE9PT10Lmxlbmd0aCl7Y29uc3RbZV09dDtyZXR1cm4gdD0+byhlLHQsKCk9Pnt9KX1pZigyPT09dC5sZW5ndGgpe2NvbnN0W2Usbl09dDtyZXR1cm4gbyhlLG4sKCk9Pnt9KX10aHJvdyBuZXcgRXJyb3IoYGlzTWF0Y2hpbmcgd2Fzbid0IGdpdmVuIHRoZSByaWdodCBudW1iZXIgb2YgYXJndW1lbnRzOiBleHBlY3RlZCAxIG9yIDIsIHJlY2VpdmVkICR7dC5sZW5ndGh9LmApfWZ1bmN0aW9uIGEodCl7cmV0dXJuIE9iamVjdC5hc3NpZ24odCx7b3B0aW9uYWw6KCk9PmgodCksYW5kOmU9PmQodCxlKSxvcjplPT55KHQsZSksc2VsZWN0OmU9PnZvaWQgMD09PWU/dih0KTp2KGUsdCl9KX1mdW5jdGlvbiBsKHQpe3JldHVybiBPYmplY3QuYXNzaWduKCh0PT5PYmplY3QuYXNzaWduKHQse1tTeW1ib2wuaXRlcmF0b3JdKCl7bGV0IG49MDtjb25zdCByPVt7dmFsdWU6T2JqZWN0LmFzc2lnbih0LHtbZV06ITB9KSxkb25lOiExfSx7ZG9uZTohMCx2YWx1ZTp2b2lkIDB9XTtyZXR1cm57bmV4dDooKT0+e3ZhciB0O3JldHVybiBudWxsIT0odD1yW24rK10pP3Q6ci5hdCgtMSl9fX19KSkodCkse29wdGlvbmFsOigpPT5sKGgodCkpLHNlbGVjdDplPT5sKHZvaWQgMD09PWU/dih0KTp2KGUsdCkpfSl9ZnVuY3Rpb24gaChlKXtyZXR1cm4gYSh7W3RdOigpPT4oe21hdGNoOnQ9PntsZXQgbj17fTtjb25zdCByPSh0LGUpPT57blt0XT1lfTtyZXR1cm4gdm9pZCAwPT09dD8ocyhlKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59KTp7bWF0Y2hlZDpvKGUsdCxyKSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT5zKGUpLG1hdGNoZXJUeXBlOlwib3B0aW9uYWxcIn0pfSl9Y29uc3QgZj0odCxlKT0+e2Zvcihjb25zdCBuIG9mIHQpaWYoIWUobikpcmV0dXJuITE7cmV0dXJuITB9LGc9KHQsZSk9Pntmb3IoY29uc3RbbixyXW9mIHQuZW50cmllcygpKWlmKCFlKHIsbikpcmV0dXJuITE7cmV0dXJuITB9LG09KHQsZSk9Pntjb25zdCBuPVJlZmxlY3Qub3duS2V5cyh0KTtmb3IoY29uc3QgciBvZiBuKWlmKCFlKHIsdFtyXSkpcmV0dXJuITE7cmV0dXJuITB9O2Z1bmN0aW9uIGQoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJue21hdGNoZWQ6ZS5ldmVyeShlPT5vKGUsdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+YyhlLHMpLG1hdGNoZXJUeXBlOlwiYW5kXCJ9KX0pfWZ1bmN0aW9uIHkoLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57bGV0IG49e307Y29uc3Qgcj0odCxlKT0+e25bdF09ZX07cmV0dXJuIGMoZSxzKS5mb3JFYWNoKHQ9PnIodCx2b2lkIDApKSx7bWF0Y2hlZDplLnNvbWUoZT0+byhlLHQscikpLHNlbGVjdGlvbnM6bn19LGdldFNlbGVjdGlvbktleXM6KCk9PmMoZSxzKSxtYXRjaGVyVHlwZTpcIm9yXCJ9KX0pfWZ1bmN0aW9uIHAoZSl7cmV0dXJue1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6Qm9vbGVhbihlKHQpKX0pfSl9fWZ1bmN0aW9uIHYoLi4uZSl7Y29uc3Qgcj1cInN0cmluZ1wiPT10eXBlb2YgZVswXT9lWzBdOnZvaWQgMCxpPTI9PT1lLmxlbmd0aD9lWzFdOlwic3RyaW5nXCI9PXR5cGVvZiBlWzBdP3ZvaWQgMDplWzBdO3JldHVybiBhKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2xldCBlPXtbbnVsbCE9cj9yOm5dOnR9O3JldHVybnttYXRjaGVkOnZvaWQgMD09PWl8fG8oaSx0LCh0LG4pPT57ZVt0XT1ufSksc2VsZWN0aW9uczplfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+W251bGwhPXI/cjpuXS5jb25jYXQodm9pZCAwPT09aT9bXTpzKGkpKX0pfSl9ZnVuY3Rpb24gYih0KXtyZXR1cm4hMH1mdW5jdGlvbiB3KHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0fWZ1bmN0aW9uIFModCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR9ZnVuY3Rpb24gaih0KXtyZXR1cm5cImJpZ2ludFwiPT10eXBlb2YgdH1jb25zdCBLPWEocChiKSksTz1hKHAoYikpLEU9Syx4PXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7c3RhcnRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LnN0YXJ0c1dpdGgobikpKSkpO3ZhciBufSxlbmRzV2l0aDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZ0LmVuZHNXaXRoKG4pKSkpKTt2YXIgbn0sbWluTGVuZ3RoOmU9PngoZCh0LCh0PT5wKGU9PlMoZSkmJmUubGVuZ3RoPj10KSkoZSkpKSxsZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg9PT10KSkoZSkpKSxtYXhMZW5ndGg6ZT0+eChkKHQsKHQ9PnAoZT0+UyhlKSYmZS5sZW5ndGg8PXQpKShlKSkpLGluY2x1ZGVzOmU9PntyZXR1cm4geChkKHQsKG49ZSxwKHQ9PlModCkmJnQuaW5jbHVkZXMobikpKSkpO3ZhciBufSxyZWdleDplPT57cmV0dXJuIHgoZCh0LChuPWUscCh0PT5TKHQpJiZCb29sZWFuKHQubWF0Y2gobikpKSkpKTt2YXIgbn19KSxBPXgocChTKSksTj10PT5PYmplY3QuYXNzaWduKGEodCkse2JldHdlZW46KGUsbik9Pk4oZCh0LCgodCxlKT0+cChuPT53KG4pJiZ0PD1uJiZlPj1uKSkoZSxuKSkpLGx0OmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU8dCkpKGUpKSksZ3Q6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZT50KSkoZSkpKSxsdGU6ZT0+TihkKHQsKHQ9PnAoZT0+dyhlKSYmZTw9dCkpKGUpKSksZ3RlOmU9Pk4oZCh0LCh0PT5wKGU9PncoZSkmJmU+PXQpKShlKSkpLGludDooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNJbnRlZ2VyKHQpKSkpLGZpbml0ZTooKT0+TihkKHQscCh0PT53KHQpJiZOdW1iZXIuaXNGaW5pdGUodCkpKSkscG9zaXRpdmU6KCk9Pk4oZCh0LHAodD0+dyh0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5OKGQodCxwKHQ9PncodCkmJnQ8MCkpKX0pLFA9TihwKHcpKSxrPXQ9Pk9iamVjdC5hc3NpZ24oYSh0KSx7YmV0d2VlbjooZSxuKT0+ayhkKHQsKCh0LGUpPT5wKG49PmoobikmJnQ8PW4mJmU+PW4pKShlLG4pKSksbHQ6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZTx0KSkoZSkpKSxndDplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPnQpKShlKSkpLGx0ZTplPT5rKGQodCwodD0+cChlPT5qKGUpJiZlPD10KSkoZSkpKSxndGU6ZT0+ayhkKHQsKHQ9PnAoZT0+aihlKSYmZT49dCkpKGUpKSkscG9zaXRpdmU6KCk9PmsoZCh0LHAodD0+aih0KSYmdD4wKSkpLG5lZ2F0aXZlOigpPT5rKGQodCxwKHQ9PmoodCkmJnQ8MCkpKX0pLFQ9ayhwKGopKSxCPWEocChmdW5jdGlvbih0KXtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIHR9KSksXz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9KSksVz1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXR9KSksJD1hKHAoZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXR9KSk7dmFyIHo9e19fcHJvdG9fXzpudWxsLG1hdGNoZXI6dCxvcHRpb25hbDpoLGFycmF5OmZ1bmN0aW9uKC4uLmUpe3JldHVybiBsKHtbdF06KCk9Pih7bWF0Y2g6dD0+e2lmKCFBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTtpZigwPT09ZS5sZW5ndGgpcmV0dXJue21hdGNoZWQ6ITB9O2NvbnN0IG49ZVswXTtsZXQgcj17fTtpZigwPT09dC5sZW5ndGgpcmV0dXJuIHMobikuZm9yRWFjaCh0PT57clt0XT1bXX0pLHttYXRjaGVkOiEwLHNlbGVjdGlvbnM6cn07Y29uc3QgaT0odCxlKT0+e3JbdF09KHJbdF18fFtdKS5jb25jYXQoW2VdKX07cmV0dXJue21hdGNoZWQ6dC5ldmVyeSh0PT5vKG4sdCxpKSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxzZXQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgU2V0KSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07Y29uc3Qgcj0odCxlKT0+e25bdF09KG5bdF18fFtdKS5jb25jYXQoW2VdKX0saT1lWzBdO3JldHVybnttYXRjaGVkOmYodCx0PT5vKGksdCxyKSksc2VsZWN0aW9uczpufX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOnMoZVswXSl9KX0pfSxtYXA6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYoISh0IGluc3RhbmNlb2YgTWFwKSlyZXR1cm57bWF0Y2hlZDohMX07bGV0IG49e307aWYoMD09PXQuc2l6ZSlyZXR1cm57bWF0Y2hlZDohMCxzZWxlY3Rpb25zOm59O2NvbnN0IHI9KHQsZSk9PntuW3RdPShuW3RdfHxbXSkuY29uY2F0KFtlXSl9O2lmKDA9PT1lLmxlbmd0aClyZXR1cm57bWF0Y2hlZDohMH07dmFyIGk7aWYoMT09PWUubGVuZ3RoKXRocm93IG5ldyBFcnJvcihgXFxgUC5tYXBcXGAgd2Fzbid0IGdpdmVuIGVub3VnaCBhcmd1bWVudHMuIEV4cGVjdGVkIChrZXksIHZhbHVlKSwgcmVjZWl2ZWQgJHtudWxsPT0oaT1lWzBdKT92b2lkIDA6aS50b1N0cmluZygpfWApO2NvbnN0W3MsY109ZTtyZXR1cm57bWF0Y2hlZDpnKHQsKHQsZSk9Pntjb25zdCBuPW8ocyxlLHIpLGk9byhjLHQscik7cmV0dXJuIG4mJml9KSxzZWxlY3Rpb25zOm59fSxnZXRTZWxlY3Rpb25LZXlzOigpPT4wPT09ZS5sZW5ndGg/W106Wy4uLnMoZVswXSksLi4ucyhlWzFdKV19KX0pfSxyZWNvcmQ6ZnVuY3Rpb24oLi4uZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT57aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0fHxBcnJheS5pc0FycmF5KHQpKXJldHVybnttYXRjaGVkOiExfTt2YXIgbjtpZigwPT09ZS5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGBcXGBQLnJlY29yZFxcYCB3YXNuJ3QgZ2l2ZW4gZW5vdWdoIGFyZ3VtZW50cy4gRXhwZWN0ZWQgKHZhbHVlKSBvciAoa2V5LCB2YWx1ZSksIHJlY2VpdmVkICR7bnVsbD09KG49ZVswXSk/dm9pZCAwOm4udG9TdHJpbmcoKX1gKTtsZXQgcj17fTtjb25zdCBpPSh0LGUpPT57clt0XT0oclt0XXx8W10pLmNvbmNhdChbZV0pfSxbcyxjXT0xPT09ZS5sZW5ndGg/W0EsZVswXV06ZTtyZXR1cm57bWF0Y2hlZDptKHQsKHQsZSk9Pntjb25zdCBuPVwic3RyaW5nXCIhPXR5cGVvZiB0fHxOdW1iZXIuaXNOYU4oTnVtYmVyKHQpKT9udWxsOk51bWJlcih0KSxyPW51bGwhPT1uJiZvKHMsbixpKSx1PW8ocyx0LGkpLGE9byhjLGUsaSk7cmV0dXJuKHV8fHIpJiZhfSksc2VsZWN0aW9uczpyfX0sZ2V0U2VsZWN0aW9uS2V5czooKT0+MD09PWUubGVuZ3RoP1tdOlsuLi5zKGVbMF0pLC4uLnMoZVsxXSldfSl9KX0saW50ZXJzZWN0aW9uOmQsdW5pb246eSxub3Q6ZnVuY3Rpb24oZSl7cmV0dXJuIGEoe1t0XTooKT0+KHttYXRjaDp0PT4oe21hdGNoZWQ6IW8oZSx0LCgpPT57fSl9KSxnZXRTZWxlY3Rpb25LZXlzOigpPT5bXSxtYXRjaGVyVHlwZTpcIm5vdFwifSl9KX0sd2hlbjpwLHNlbGVjdDp2LGFueTpLLHVua25vd246TyxfOkUsc3RyaW5nOkEsbnVtYmVyOlAsYmlnaW50OlQsYm9vbGVhbjpCLHN5bWJvbDpfLG51bGxpc2g6Vyxub25OdWxsYWJsZTokLGluc3RhbmNlT2Y6ZnVuY3Rpb24odCl7cmV0dXJuIGEocChmdW5jdGlvbih0KXtyZXR1cm4gZT0+ZSBpbnN0YW5jZW9mIHR9KHQpKSl9LHNoYXBlOmZ1bmN0aW9uKHQpe3JldHVybiBhKHAodSh0KSkpfX07Y2xhc3MgSSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQpe2xldCBlO3RyeXtlPUpTT04uc3RyaW5naWZ5KHQpfWNhdGNoKG4pe2U9dH1zdXBlcihgUGF0dGVybiBtYXRjaGluZyBlcnJvcjogbm8gcGF0dGVybiBtYXRjaGVzIHZhbHVlICR7ZX1gKSx0aGlzLmlucHV0PXZvaWQgMCx0aGlzLmlucHV0PXR9fWNvbnN0IEw9e21hdGNoZWQ6ITEsdmFsdWU6dm9pZCAwfTtmdW5jdGlvbiBNKHQpe3JldHVybiBuZXcgUih0LEwpfWNsYXNzIFJ7Y29uc3RydWN0b3IodCxlKXt0aGlzLmlucHV0PXZvaWQgMCx0aGlzLnN0YXRlPXZvaWQgMCx0aGlzLmlucHV0PXQsdGhpcy5zdGF0ZT1lfXdpdGgoLi4udCl7aWYodGhpcy5zdGF0ZS5tYXRjaGVkKXJldHVybiB0aGlzO2NvbnN0IGU9dFt0Lmxlbmd0aC0xXSxyPVt0WzBdXTtsZXQgaTszPT09dC5sZW5ndGgmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRbMV0/aT10WzFdOnQubGVuZ3RoPjImJnIucHVzaCguLi50LnNsaWNlKDEsdC5sZW5ndGgtMSkpO2xldCBzPSExLGM9e307Y29uc3QgdT0odCxlKT0+e3M9ITAsY1t0XT1lfSxhPSFyLnNvbWUodD0+byh0LHRoaXMuaW5wdXQsdSkpfHxpJiYhQm9vbGVhbihpKHRoaXMuaW5wdXQpKT9MOnttYXRjaGVkOiEwLHZhbHVlOmUocz9uIGluIGM/Y1tuXTpjOnRoaXMuaW5wdXQsdGhpcy5pbnB1dCl9O3JldHVybiBuZXcgUih0aGlzLmlucHV0LGEpfXdoZW4odCxlKXtpZih0aGlzLnN0YXRlLm1hdGNoZWQpcmV0dXJuIHRoaXM7Y29uc3Qgbj1Cb29sZWFuKHQodGhpcy5pbnB1dCkpO3JldHVybiBuZXcgUih0aGlzLmlucHV0LG4/e21hdGNoZWQ6ITAsdmFsdWU6ZSh0aGlzLmlucHV0LHRoaXMuaW5wdXQpfTpMKX1vdGhlcndpc2UodCl7cmV0dXJuIHRoaXMuc3RhdGUubWF0Y2hlZD90aGlzLnN0YXRlLnZhbHVlOnQodGhpcy5pbnB1dCl9ZXhoYXVzdGl2ZSh0PUYpe3JldHVybiB0aGlzLnN0YXRlLm1hdGNoZWQ/dGhpcy5zdGF0ZS52YWx1ZTp0KHRoaXMuaW5wdXQpfXJ1bigpe3JldHVybiB0aGlzLmV4aGF1c3RpdmUoKX1yZXR1cm5UeXBlKCl7cmV0dXJuIHRoaXN9bmFycm93KCl7cmV0dXJuIHRoaXN9fWZ1bmN0aW9uIEYodCl7dGhyb3cgbmV3IEkodCl9ZXhwb3J0e0kgYXMgTm9uRXhoYXVzdGl2ZUVycm9yLHogYXMgUCx6IGFzIFBhdHRlcm4sdSBhcyBpc01hdGNoaW5nLE0gYXMgbWF0Y2h9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJpbXBvcnQgeyBOb25FeGhhdXN0aXZlRXJyb3IsIFAsIFBhdHRlcm4sIGlzTWF0Y2hpbmcsIG1hdGNoIH0gZnJvbSBcInRzLXBhdHRlcm5cIjtcbi8vI3JlZ2lvbiBzcmMvbWF0Y2gvbWF0Y2gudHNcbi8qKlxuKiBFeHRlbmRzIHRzLXBhdHRlcm4ncyBgUGAgbmFtZXNwYWNlIHdpdGggYFAub2tgIGFuZCBgUC5lcnJgIOKAlCBzdHJ1Y3R1cmFsXG4qIHBhdHRlcm5zIGZvciBtYXRjaGluZyBhIGBSZXN1bHRgIGluc2lkZSBgbWF0Y2goKWAuXG4qXG4qIE1pcnJvcnMgUnVzdCdzIGBPayh2YWx1ZSlgIC8gYEVycihlcnJvcilgIG1hdGNoIGFybXMsIGJ1dCB1c2VzIHRoZVxuKiBuYW1lc3BhY2UtcHJvcGVydHkgZm9ybSAoYFAub2tgIC8gYFAuZXJyYCkgc28gaXQgZG9lc24ndCBjb2xsaWRlIHdpdGhcbiogdGhlIGxvd2VyY2FzZSBgb2soKWAgLyBgZXJyKClgIGNvbnN0cnVjdG9ycyBmcm9tIGBtYXNzYW1hbi9jb250cm9sYC5cbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogaW1wb3J0IHsgbWF0Y2gsIFAsIGF0dGVtcHQgfSBmcm9tICdtYXNzYW1hbidcbipcbiogbWF0Y2goYXR0ZW1wdCgoKSA9PiBKU09OLnBhcnNlKHJhdykpKVxuKiAgIC53aXRoKFAub2ssICh7IHZhbHVlIH0pID0+IHVzZSh2YWx1ZSkpXG4qICAgLndpdGgoUC5lcnIsICh7IGVycm9yIH0pID0+IGxvZyhlcnJvcikpXG4qICAgLmV4aGF1c3RpdmUoKVxuKiBgYGBcbiovXG5jb25zdCBva1BhdHRlcm4gPSB7IG9rOiB0cnVlIH07XG5jb25zdCBlcnJQYXR0ZXJuID0geyBvazogZmFsc2UgfTtcbi8qKlxuKiBFeHRlbmRlZCB0cy1wYXR0ZXJuIGBQYCBuYW1lc3BhY2UuIENhcnJpZXMgZXZlcnl0aGluZyB0cy1wYXR0ZXJuIGV4cG9ydHNcbiogKGBQLnN0cmluZ2AsIGBQLm51bWJlcmAsIGBQLmFycmF5YCwgYFAud2hlbmAsIOKApikgcGx1cyBgUC5va2AgLyBgUC5lcnJgXG4qIGZvciBtYXRjaGluZyBgUmVzdWx0YCB2YWx1ZXMuXG4qXG4qIEV4cGxpY2l0IGxpdGVyYWwtdHlwZSBhbm5vdGF0aW9ucyBvbiB0aGUgYWRkaXRpb25zIChyYXRoZXIgdGhhbiBgYXMgY29uc3RgKVxuKiBrZWVwIHRoZSB2YWx1ZXMgbm9uLWByZWFkb25seWAsIHdoaWNoIHRzLXBhdHRlcm4ncyBuYXJyb3dpbmcgcmVxdWlyZXMg4oCUXG4qIGEgYHJlYWRvbmx5YCBwYXR0ZXJuIGNvbGxhcHNlcyB0aGUgcmVtYWluaW5nIGlucHV0IHRvIGBuZXZlcmAgYWZ0ZXIgdGhlXG4qIGZpcnN0IGFybSwgYnJlYWtpbmcgZXhoYXVzdGl2ZW5lc3MuXG4qXG4qIEZvciB0aGUgYFAuUGF0dGVybjxUPmAgdHlwZSBzaG9ydGhhbmQsIGltcG9ydCBgUGF0dGVybmAgc3RhbmRhbG9uZSBmcm9tXG4qIGBtYXNzYW1hbi9tYXRjaGAg4oCUIGl0J3MgdGhlIGZvcm0gdHMtcGF0dGVybidzIG93biBkb2NzIHJlY29tbWVuZC5cbiovXG5jb25zdCBQJDEgPSB7XG5cdC4uLlAsXG5cdG9rOiBva1BhdHRlcm4sXG5cdGVycjogZXJyUGF0dGVyblxufTtcbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgUCQxIGFzIGEsIG1hdGNoIGFzIGksIFBhdHRlcm4gYXMgbiwgaXNNYXRjaGluZyBhcyByLCBOb25FeGhhdXN0aXZlRXJyb3IgYXMgdCB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRjaC1DR192MkM0US5tanMubWFwIiwiLy8gVHVuYWJsZSBkZWZhdWx0cyBmb3IgdGhlIG5wbS1uYW1lciBwaXBlbGluZS4gQ2VudHJhbGl6ZWQgc28gZG9jcywgdGhlIENMSSxcbi8vIGFuZCB0ZXN0cyBjYW4gcmVmZXJlbmNlIGEgc2luZ2xlIHNvdXJjZSBvZiB0cnV0aC5cblxuLyoqIERlZmF1bHQgY2FwIG9uIGNhbmRpZGF0ZXMgY2hlY2tlZCBwZXIgcnVuLiBDTEk6IC0tbGltaXQuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9MSU1JVCA9IDUwXG5cbi8qKiBEZWZhdWx0IHBhcmFsbGVsIEhFQUQgcmVxdWVzdHMgYWdhaW5zdCB0aGUgcmVnaXN0cnkuIENMSTogLS1jb25jdXJyZW5jeS4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkNVUlJFTkNZID0gMTJcblxuLyoqIE5ldHdvcmsgdGltZW91dCBwZXIgcmVnaXN0cnkgSEVBRCByZXF1ZXN0IChtcykuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9SRUdJU1RSWV9USU1FT1VUX01TID0gODAwMFxuXG4vKiogbnBtIHJlZ2lzdHJ5IGJhc2UgVVJMOyBvdmVycmlkYWJsZSB2aWEgTlBNX1JFR0lTVFJZX1VSTCBlbnYuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9SRUdJU1RSWV9CQVNFID0gcHJvY2Vzcy5lbnYuTlBNX1JFR0lTVFJZX1VSTCB8fCAnaHR0cHM6Ly9yZWdpc3RyeS5ucG1qcy5vcmcnXG5cbi8qKiBNb25pa2VyIDItaW5zZXJ0aW9uIGNhcCwgc2NhbGVkIHBlciBgYmFyZS5sZW5ndGhgIHNvIGxvbmdlciBuYW1lcyBzdGlsbFxuICogcmVhY2ggbWlkLXN0cmluZyBtb3JwaGVtZSBzcGxpdHMgKGUuZy4gYHF1aWNrLWpzb24tcGFyc2VyYCBhdCBnYXA9NSxcbiAqIGByZWFjdC1uYXRpdmUtbmF2aWdhdGlvbmAgYXQgZ2FwPTYpLiBWYXJpYW50cyA9IHBhaXJzIMOXIDkgc2VwYXJhdG9yIGNvbWJvcy4gKi9cbmV4cG9ydCBjb25zdCBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfREVGQVVMVCA9IDI1MFxuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfU0NBTEVfREVGQVVMVCA9IDQwXG5leHBvcnQgY29uc3QgTU9OSUtFUl8ySU5TRVJUX0NBUF9NQVhfREVGQVVMVCA9IDE1MDBcblxuLyoqIE1vbmlrZXIgMi1pbnNlcnRpb24gY2FwICgtLWV4aGF1c3RpdmUpOiB3aWRlciBjb3ZlcmFnZSwgc2xvd2VyLiAqL1xuZXhwb3J0IGNvbnN0IE1PTklLRVJfMklOU0VSVF9DQVBfQkFTRV9FWEhBVVNUSVZFID0gNjAwXG5leHBvcnQgY29uc3QgTU9OSUtFUl8ySU5TRVJUX0NBUF9TQ0FMRV9FWEhBVVNUSVZFID0gMTIwXG5leHBvcnQgY29uc3QgTU9OSUtFUl8ySU5TRVJUX0NBUF9NQVhfRVhIQVVTVElWRSA9IDUwMDBcblxuLyoqIERlZmF1bHQgZWRpdC1kaXN0YW5jZSB0aHJlc2hvbGQgZm9yIG5lYXItbWF0Y2ggd2FybmluZ3MuIENMSTogLS1uZWFyLWRpc3RhbmNlLiAqL1xuZXhwb3J0IGNvbnN0IE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFID0gMlxuXG4vKiogTWluaW11bSBjb3JwdXMtbmFtZSBsZW5ndGggZm9yIG5lYXItbWF0Y2ggY29tcGFyaXNvbi4gQmVsb3cgMyB0aGUgZmFsc2VcbiAqIHBvc2l0aXZlIHJhdGUgc3Bpa2VzLiBLZWVwcyBwb3B1bGFyIDMtY2hhciBuYW1lcyAoYHpvZGAsIGBhanZgLCBgdHN4YCkgaW5cbiAqIHNjb3BlOyAyLWNoYXIgbmFtZXMgbGlrZSBgcXNgIGFyZSBpbnRlbnRpb25hbGx5IGJlbG93IHRoaXMgZmxvb3IuICovXG5leHBvcnQgY29uc3QgTkVBUl9NQVRDSF9NSU5fQ09SUFVTX0xFTiA9IDNcblxuLyoqIE1heCBudW1iZXIgb2YgbmVhci1tYXRjaCBuZWlnaGJvcnMgc3VyZmFjZWQgcGVyIGF2YWlsYWJsZSBjYW5kaWRhdGUuICovXG5leHBvcnQgY29uc3QgTkVBUl9NQVRDSF9NQVhfTkVJR0hCT1JTID0gM1xuXG4vKiogU2hvcnRsaXN0IHNpemUgaW4gdGhlIFwiYXZhaWxhYmxlICsgY2xlYW5cIiBncm91cCBwcmludGVkIGF0IHRoZSBlbmQuICovXG5leHBvcnQgY29uc3QgU0hPUlRMSVNUX0xJTUlUID0gMTBcblxuLyoqIE1heCBzYW1wbGUgc2l6ZSBpbiB0aGUgYHVudmVyaWZpZWRgIGZpZWxkIG9uIGEgdmVyZGljdC4gRnVsbCBjb3VudCBpc1xuICogcHJlc2VydmVkIGluIGB1bnZlcmlmaWVkVG90YWxgLiBXaXRob3V0IHRydW5jYXRpb24sIGEgaGFtbWVyZWQgcmVnaXN0cnlcbiAqIHJldHVybmluZyA0MjkgYWNyb3NzIGh1bmRyZWRzIG9mIHZhcmlhbnRzIHdvdWxkIGR1bXAga2lsb2J5dGVzIG9mXG4gKiB1c2VsZXNzIHZhcmlhbnQgbmFtZXMgcGVyIGNhbmRpZGF0ZSBpbnRvIC0tanNvbiBvdXRwdXQuICovXG5leHBvcnQgY29uc3QgVkVSRElDVF9VTlZFUklGSUVEX1NBTVBMRSA9IDEwXG4iLCIvLyBQb3B1bGFyLW5hbWVzIGNvcnB1cyBsb2FkZXIuIFJlYWRzIGBwb3B1bGFyLW5hbWVzLmpzb25gIChjb21taXR0ZWRcbi8vIGJ1aWxkIGFydGlmYWN0KSBhbmQgcmV0dXJucyBpdCBhcyBhIFJlc3VsdC4gTWVtb2l6ZWQgYWZ0ZXIgZmlyc3Rcbi8vIHN1Y2Nlc3NmdWwgcmVhZCBiZWNhdXNlIHRoZSBmaWxlIGlzIH4yNjAgS0IgYW5kIHRoZSBDTEkgbWF5IGNhbGxcbi8vIHRoaXMgbWFueSB0aW1lcyBpbiBhIHNpbmdsZSBydW4uXG4vL1xuLy8gU291cmNlOiB0b3AgfjE1IEsgdW5zY29wZWQgbnBtIHBhY2thZ2VzIGJ5IG1vbnRobHkgZG93bmxvYWRzLCBzbmFwc2hvdFxuLy8gZnJvbSBgbmljZS1yZWdpc3RyeS9kb3dubG9hZC1jb3VudHNgLiBTZWUgcmVmcmVzaC1wb3B1bGFyLW5hbWVzLm1qcy5cblxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IGRpcm5hbWUsIGpvaW4gfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGF0dGVtcHQsIGVyciwgb2sgfSBmcm9tICdtYXNzYW1hbidcblxuY29uc3QgSEVSRSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvcnB1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IHNvdXJjZSAtIHByb3ZlbmFuY2Ugc3RyaW5nLCBlLmcuIFwibmljZS1yZWdpc3RyeS9kb3dubG9hZC1jb3VudHNcIlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzb3VyY2VWZXJzaW9uXVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGdlbmVyYXRlZCAtIElTTyBkYXRlIHRoZSBzbmFwc2hvdCB3YXMgYnVpbHRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaXplIC0gY29ycHVzIG5hbWUgY291bnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IG5hbWVzIC0gdW5zY29wZWQgcGFja2FnZSBuYW1lcywgZGVzY2VuZGluZyBieSBkb3dubG9hZHNcbiAqL1xuXG4vLyBJbnZhcmlhbnQ6IGNhY2hlIGhvbGRzIHRoZSBGSVJTVCBzdWNjZXNzZnVsIGxvYWQuIElmIGBsb2FkQ29ycHVzYCBpc1xuLy8gY2FsbGVkIGFnYWluLCB3ZSByZXR1cm4gdGhlIHNhbWUgUmVzdWx0LiBNb2R1bGUtbGV2ZWwgbXV0YXRpb24gaGVyZSBpc1xuLy8gcHVyZSBtZW1vaXphdGlvbiDigJQgdGhlIGNvcnB1cyBuZXZlciBjaGFuZ2VzIHdpdGhpbiBhIHByb2Nlc3MuXG5sZXQgY2FjaGUgPSBudWxsXG5cbi8qKlxuICogVHJ5IHRoZSBzYW1lLWRpciBhbmQgcGFyZW50LWRpciBsb2NhdGlvbnMgZm9yIGBwb3B1bGFyLW5hbWVzLmpzb25gLiBCb3RoXG4gKiB0aGUgYnVpbHQgYnVuZGxlIChgZGlzdC9jaGVjay5tanNgKSBhbmQgdGhlIHVuYnVuZGxlZCBzb3VyY2UgbGl2ZSBvbmVcbiAqIGxldmVsIGJlbG93IHRoZSBjYW5vbmljYWwgSlNPTiBmaWxlJ3MgbG9jYXRpb24uXG4gKlxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICovXG5mdW5jdGlvbiBjYW5kaWRhdGVQYXRocygpIHtcbiAgcmV0dXJuIFtqb2luKEhFUkUsICcuLicsICdwb3B1bGFyLW5hbWVzLmpzb24nKSwgam9pbihIRVJFLCAncG9wdWxhci1uYW1lcy5qc29uJyldXG59XG5cbi8qKlxuICogTG9hZCB0aGUgcG9wdWxhci1uYW1lcyBjb3JwdXMuIFJldHVybnMgT2soY29ycHVzKSBvbiBzdWNjZXNzLCBFcnIgb24gYVxuICogcmVhZCBvciBwYXJzZSBmYWlsdXJlLiBSZXN1bHQgaXMgY2FjaGVkIGFmdGVyIHRoZSBmaXJzdCBPazsgRXJyIHJlc3VsdHNcbiAqIGFyZSBub3QgY2FjaGVkIHNvIHRyYW5zaWVudCBmYWlsdXJlcyBjYW4gYmUgcmV0cmllZC5cbiAqXG4gKiBAcmV0dXJucyB7aW1wb3J0KCdtYXNzYW1hbicpLlJlc3VsdDxDb3JwdXMsIEVycm9yPn1cbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZXN1bHQgPSBsb2FkQ29ycHVzKClcbiAqIGlmIChpc09rKHJlc3VsdCkpIGZvciAoY29uc3QgbmFtZSBvZiByZXN1bHQudmFsdWUubmFtZXMpIHsg4oCmIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb3JwdXMoKSB7XG4gIGlmIChjYWNoZSAmJiBjYWNoZS5vaykgcmV0dXJuIGNhY2hlXG5cbiAgZm9yIChjb25zdCBwYXRoIG9mIGNhbmRpZGF0ZVBhdGhzKCkpIHtcbiAgICBjb25zdCByZWFkID0gYXR0ZW1wdCgoKSA9PiByZWFkRmlsZVN5bmMocGF0aCwgJ3V0ZjgnKSlcbiAgICBpZiAoIXJlYWQub2spIGNvbnRpbnVlXG4gICAgY29uc3QgcGFyc2VkID0gYXR0ZW1wdCgoKSA9PiBKU09OLnBhcnNlKHJlYWQudmFsdWUpKVxuICAgIGlmICghcGFyc2VkLm9rKSB7XG4gICAgICBjYWNoZSA9IGVycihuZXcgRXJyb3IoYHBvcHVsYXItbmFtZXMuanNvbiBhdCAke3BhdGh9IGlzIG1hbGZvcm1lZDogJHtwYXJzZWQuZXJyb3IubWVzc2FnZX1gKSlcbiAgICAgIHJldHVybiBjYWNoZVxuICAgIH1cbiAgICBjb25zdCBzaGFwZUVycm9yID0gdmFsaWRhdGVTaGFwZShwYXJzZWQudmFsdWUsIHBhdGgpXG4gICAgaWYgKHNoYXBlRXJyb3IpIHtcbiAgICAgIGNhY2hlID0gZXJyKHNoYXBlRXJyb3IpXG4gICAgICByZXR1cm4gY2FjaGVcbiAgICB9XG4gICAgY2FjaGUgPSBvayhwYXJzZWQudmFsdWUpXG4gICAgcmV0dXJuIGNhY2hlXG4gIH1cblxuICBjYWNoZSA9IGVycihuZXcgRXJyb3IoYHBvcHVsYXItbmFtZXMuanNvbiBub3QgZm91bmQgaW4gYW55IG9mOiAke2NhbmRpZGF0ZVBhdGhzKCkuam9pbignLCAnKX1gKSlcbiAgcmV0dXJuIGNhY2hlXG59XG5cbi8qKlxuICogQ29uZmlybSB0aGUgcGFyc2VkIEpTT04gaGFzIHRoZSBzaGFwZSBgQ29ycHVzYCBleHBlY3RzLiBSZXR1cm5zIGFuXG4gKiBFcnJvciBkZXNjcmliaW5nIHRoZSBmaXJzdCBtaXNzaW5nIGZpZWxkLCBvciBudWxsIGlmIHRoZSBzaGFwZSBpcyB2YWxpZC5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICogQHJldHVybnMge0Vycm9yIHwgbnVsbH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlU2hhcGUodmFsdWUsIHBhdGgpIHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgcG9wdWxhci1uYW1lcy5qc29uIGF0ICR7cGF0aH0gaXMgbm90IGFuIG9iamVjdGApXG4gIH1cbiAgY29uc3QgcmVxdWlyZWQgPSB7IHNvdXJjZTogJ3N0cmluZycsIGdlbmVyYXRlZDogJ3N0cmluZycsIG5hbWVzOiAnYXJyYXknIH1cbiAgZm9yIChjb25zdCBbZmllbGQsIGV4cGVjdGVkVHlwZV0gb2YgT2JqZWN0LmVudHJpZXMocmVxdWlyZWQpKSB7XG4gICAgY29uc3QgYWN0dWFsID0gdmFsdWVbZmllbGRdXG4gICAgY29uc3QgbWF0Y2hlcyA9XG4gICAgICBleHBlY3RlZFR5cGUgPT09ICdhcnJheScgPyBBcnJheS5pc0FycmF5KGFjdHVhbCkgOiB0eXBlb2YgYWN0dWFsID09PSBleHBlY3RlZFR5cGVcbiAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgIGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofSBtaXNzaW5nIG9yIHdyb25nLXR5cGVkIGZpZWxkIFwiJHtmaWVsZH1cIiAoZXhwZWN0ZWQgJHtleHBlY3RlZFR5cGV9KWBcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgaWYgKHZhbHVlLm5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYHBvcHVsYXItbmFtZXMuanNvbiBhdCAke3BhdGh9IGhhcyBhbiBlbXB0eSBuYW1lcyBhcnJheWApXG4gIH1cbiAgY29uc3QgYmFkRW50cnkgPSB2YWx1ZS5uYW1lcy5maW5kSW5kZXgoKG5hbWUpID0+IHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhbmFtZSlcbiAgaWYgKGJhZEVudHJ5ID49IDApIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgYHBvcHVsYXItbmFtZXMuanNvbiBhdCAke3BhdGh9IGhhcyBhIG5vbi1zdHJpbmcgb3IgZW1wdHkgZW50cnkgYXQgaW5kZXggJHtiYWRFbnRyeX1gXG4gICAgKVxuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUuc2l6ZSA9PT0gJ251bWJlcicgJiYgdmFsdWUuc2l6ZSAhPT0gdmFsdWUubmFtZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgIGBwb3B1bGFyLW5hbWVzLmpzb24gYXQgJHtwYXRofTogc2l6ZSBmaWVsZCAoJHt2YWx1ZS5zaXplfSkgZG9lc24ndCBtYXRjaCBuYW1lcy5sZW5ndGggKCR7dmFsdWUubmFtZXMubGVuZ3RofSlgXG4gICAgKVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbi8qKlxuICogVGVzdC1vbmx5IGVzY2FwZSBoYXRjaCDigJQgY2xlYXJzIHRoZSBtZW1vaXphdGlvbiBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3Jlc2V0Q29ycHVzQ2FjaGUoKSB7XG4gIGNhY2hlID0gbnVsbFxufVxuIiwiLy8gRGV0ZXJtaW5pc3RpYyBwZXJtdXRhdGlvbiBlbmdpbmUuIEdpdmVuIHNlZWQgd29yZHMgKGFuZCBvcHRpb25hbCBwcmVmaXggL1xuLy8gc3VmZml4IGxpc3RzKSwgcHJvZHVjZSBjYW5kaWRhdGUgcGFja2FnZSBuYW1lcyBieSBqb2luaW5nLCBwcmVmaXhpbmcsXG4vLyBzdWZmaXhpbmcsIGFuZCByZS1zZXBhcmF0aW5nLiBUaGUgYWdlbnQgZmVlZHMgaW4gaXRzIGJyYWluc3Rvcm1lZCBzZWVkcztcbi8vIHRoaXMgZXhwYW5kcyB0aGVtIGludG8gdGhlIHNlYXJjaCBzcGFjZSB3aXRob3V0IGhhbGx1Y2luYXRpbmcgbmV3IHRva2Vucy5cblxuY29uc3QgREVGQVVMVF9QUkVGSVhFUyA9IFtcbiAgJ3RpbnknLFxuICAnbWluaScsXG4gICdwaWNvJyxcbiAgJ25hbm8nLFxuICAnbGl0ZScsXG4gICdtaWNybycsXG4gICdmYXN0JyxcbiAgJ2xlYW4nLFxuICAncXVpY2snLFxuICAnc2xpbScsXG4gICdwdXJlJyxcbiAgJ3N1cGVyJyxcbiAgJ3VsdHJhJyxcbiAgJ21ldGEnLFxuICAnYXV0bycsXG4gICdzbWFydCcsXG5dXG5cbmNvbnN0IERFRkFVTFRfU1VGRklYRVMgPSBbXG4gICdqcycsXG4gICd0cycsXG4gICdsaWInLFxuICAna2l0JyxcbiAgJ2NvcmUnLFxuICAncHJvJyxcbiAgJ2NsaScsXG4gICd0b29scycsXG4gICd1dGlscycsXG4gICdmb3JnZScsXG4gICdzbWl0aCcsXG4gICdjcmFmdCcsXG4gICdsYWInLFxuICAnYm94JyxcbiAgJ2VuZ2luZScsXG4gICdzdHVkaW8nLFxuXVxuXG5jb25zdCBDT05ORUNUT1JTID0gWycnLCAnLSddXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUGVybXV0ZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IFtwcmVmaXhlc10gLSBvdmVycmlkZSBkZWZhdWx0IHByZWZpeCBsaXN0XG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBbc3VmZml4ZXNdIC0gb3ZlcnJpZGUgZGVmYXVsdCBzdWZmaXggbGlzdFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gW2Nvbm5lY3RvcnNdIC0gc2VwYXJhdG9ycyBiZXR3ZWVuIHBhcnRzIChkZWZhdWx0OiAnJywgJy0nKVxuICogQHByb3BlcnR5IHtib29sZWFufSBbc2hvdWxkSW5jbHVkZVVuZGVyc2NvcmVdIC0gYWxzbyB1c2UgJ18nIGFzIGEgY29ubmVjdG9yIChkZWZhdWx0OiBmYWxzZSlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3Nob3VsZENvbWJpbmVUd29TZWVkc10gLSBqb2luIHBhaXJzIG9mIHNlZWRzIChkZWZhdWx0OiB0cnVlKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzY29wZV0gLSBpZiBzZXQsIGFsc28gZW1pdCBgQHNjb3BlLzxuYW1lPmAgdmFyaWFudHNcbiAqL1xuXG4vKipcbiAqIEdlbmVyYXRlIHBhY2thZ2UgbmFtZSBjYW5kaWRhdGVzIGZyb20gc2VlZCB3b3Jkcy5cbiAqXG4gKiBGb3Igc2VlZHM9Wyd0aW55JywnbG9nJ10sIHByb2R1Y2VzIHRoaW5ncyBsaWtlOlxuICogICBsb2csIHRpbnksIHRpbnlsb2csIHRpbnktbG9nLCBtaW5pLWxvZywgbmFuby1sb2csIGxvZy1jbGksIGxvZ2pzLCAuLi5cbiAqXG4gKiBPdXRwdXQgaXMgZGVkdXBsaWNhdGVkOyBvcmRlciBpcyByb3VnaGx5OiBiYXJlIHNlZWRzLCB0d28tc2VlZCBjb21ib3MsXG4gKiBwcmVmaXgrc2VlZCwgc2VlZCtzdWZmaXguIENhbGxlciBhcHBsaWVzIGFueSBsaW1pdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzZWVkc1xuICogQHBhcmFtIHtQZXJtdXRlT3B0aW9uc30gW29wdHNdXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKiBAZXhhbXBsZVxuICogcGVybXV0ZShbJ2xvZyddKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFsnbG9nJywgJ3RpbnktbG9nJywgJ3Rpbnlsb2cnLCDigKZdXG4gKiBwZXJtdXRlKFsnbG9nJ10sIHsgc2NvcGU6ICdAbWUnIH0pICAgICAgICAgICAgLy8gWydAbWUvbG9nJywgJ0BtZS90aW55LWxvZycsIOKApl1cbiAqIHBlcm11dGUoWydsb2cnXSwgeyBwcmVmaXhlczogWyd1bHRyYSddIH0pICAgICAvLyBbJ2xvZycsICd1bHRyYS1sb2cnLCAndWx0cmFsb2cnLCDigKZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwZXJtdXRlKHNlZWRzLCBvcHRzID0ge30pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHNlZWRzKSB8fCBzZWVkcy5sZW5ndGggPT09IDApIHJldHVybiBbXVxuXG4gIGNvbnN0IHByZWZpeGVzID0gb3B0cy5wcmVmaXhlcyA/PyBERUZBVUxUX1BSRUZJWEVTXG4gIGNvbnN0IHN1ZmZpeGVzID0gb3B0cy5zdWZmaXhlcyA/PyBERUZBVUxUX1NVRkZJWEVTXG4gIGNvbnN0IGNvbm5lY3RvcnMgPVxuICAgIG9wdHMuY29ubmVjdG9ycyA/PyAob3B0cy5zaG91bGRJbmNsdWRlVW5kZXJzY29yZSA/IFsuLi5DT05ORUNUT1JTLCAnXyddIDogQ09OTkVDVE9SUylcbiAgY29uc3Qgc2hvdWxkQ29tYmluZVR3b1NlZWRzID0gb3B0cy5zaG91bGRDb21iaW5lVHdvU2VlZHMgIT09IGZhbHNlXG4gIGNvbnN0IHNjb3BlID0gb3B0cy5zY29wZVxuXG4gIGNvbnN0IGNsZWFuZWQgPSBzZWVkc1xuICAgIC5tYXAoKHMpID0+IFN0cmluZyhzKS50cmltKCkudG9Mb3dlckNhc2UoKSlcbiAgICAuZmlsdGVyKChzKSA9PiBzLmxlbmd0aCA+IDAgJiYgL15bYS16MC05XSskLy50ZXN0KHMpKVxuXG4gIGNvbnN0IG91dCA9IG5ldyBTZXQoKVxuXG4gIGZvciAoY29uc3QgcyBvZiBjbGVhbmVkKSBvdXQuYWRkKHMpXG5cbiAgaWYgKHNob3VsZENvbWJpbmVUd29TZWVkcykge1xuICAgIGZvciAoY29uc3QgYSBvZiBjbGVhbmVkKSB7XG4gICAgICBmb3IgKGNvbnN0IGIgb2YgY2xlYW5lZCkge1xuICAgICAgICBpZiAoYSA9PT0gYikgY29udGludWVcbiAgICAgICAgZm9yIChjb25zdCBzZXAgb2YgY29ubmVjdG9ycykgb3V0LmFkZChhICsgc2VwICsgYilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHAgb2YgcHJlZml4ZXMpIHtcbiAgICBmb3IgKGNvbnN0IHMgb2YgY2xlYW5lZCkge1xuICAgICAgaWYgKHAgPT09IHMpIGNvbnRpbnVlXG4gICAgICBmb3IgKGNvbnN0IHNlcCBvZiBjb25uZWN0b3JzKSBvdXQuYWRkKHAgKyBzZXAgKyBzKVxuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgcyBvZiBjbGVhbmVkKSB7XG4gICAgZm9yIChjb25zdCBzZiBvZiBzdWZmaXhlcykge1xuICAgICAgaWYgKHNmID09PSBzKSBjb250aW51ZVxuICAgICAgZm9yIChjb25zdCBzZXAgb2YgY29ubmVjdG9ycykgb3V0LmFkZChzICsgc2VwICsgc2YpXG4gICAgfVxuICB9XG5cbiAgbGV0IG5hbWVzID0gWy4uLm91dF1cbiAgaWYgKHNjb3BlKSBuYW1lcyA9IG5hbWVzLm1hcCgobikgPT4gYCR7c2NvcGV9LyR7bn1gKVxuICByZXR1cm4gbmFtZXNcbn1cblxuLyoqXG4gKiBTY29yZSBhIGNhbmRpZGF0ZSBuYW1lIGZvciByYW5raW5nLiBMb3dlciBpcyBiZXR0ZXIuXG4gKiAgIC0gc2hvcnRlciBuYW1lcyByYW5rIGxvd2VyIChwcmVmZXJyZWQpXG4gKiAgIC0gaHlwaGVuYXRlZCBuYW1lcyByYW5rIGxvd2VyIHRoYW4gY29uY2F0ZW5hdGVkIChtb3JlIHJlYWRhYmxlKVxuICogICAtIG5hbWVzIGNvbnRhaW5pbmcgYSBzZWVkIHJhbmsgbG93ZXIgKGFuY2hvciByZWxldmFuY2UpXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nW119IHNlZWRzXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQGV4YW1wbGVcbiAqIHNjb3JlKCdsb2cnKSAgICAgICAgICAgICAgICAgICAgICAgLy8gM1xuICogc2NvcmUoJ3RpbnktbG9nJywgWydsb2cnXSkgICAgICAgICAvLyA4IC0gMiAoaHlwaGVuKSAtIDMgKGNvbnRhaW5zIHNlZWQpID0gM1xuICogc2NvcmUoJ2xvZ2dlcl9wcm8nLCBbJ2xvZyddKSAgICAgICAvLyAxMCArIDEgKHVuZGVyc2NvcmUpIC0gMyAoY29udGFpbnMgc2VlZCkgPSA4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY29yZShuYW1lLCBzZWVkcyA9IFtdKSB7XG4gIGNvbnN0IGxvd2VyID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIGxldCByZXN1bHQgPSBsb3dlci5sZW5ndGhcbiAgaWYgKGxvd2VyLmluY2x1ZGVzKCctJykpIHJlc3VsdCAtPSAyXG4gIGlmIChsb3dlci5pbmNsdWRlcygnXycpKSByZXN1bHQgKz0gMVxuICBmb3IgKGNvbnN0IHNlZWQgb2Ygc2VlZHMpIHtcbiAgICBpZiAobG93ZXIuaW5jbHVkZXMoc2VlZC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgcmVzdWx0IC09IDNcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IHsgREVGQVVMVF9QUkVGSVhFUywgREVGQVVMVF9TVUZGSVhFUyB9XG4iLCIvLyBucG0gbW9uaWtlciBjb2xsaXNpb24gcnVsZS4gV2hlbiB5b3UgcHVibGlzaCBhIG5ldyB1bnNjb3BlZCBwYWNrYWdlLCB0aGVcbi8vIHJlZ2lzdHJ5IHJlamVjdHMgbmFtZXMgd2hvc2UgYGxvd2VyY2FzZSArIHN0cmlwIFsuXy1dYCBmb3JtIGNvbGxpZGVzIHdpdGhcbi8vIGFuIGV4aXN0aW5nIHBhY2thZ2UuIFNvdXJjZTogaHR0cHM6Ly9ibG9nLm5wbWpzLm9yZy9wb3N0LzE2ODk3ODM3NzU3MC9uZXctcGFja2FnZS1tb25pa2VyLXJ1bGVzXG4vL1xuLy8gSU1QT1JUQU5UIOKAlCB2YXJpYW50IGVudW1lcmF0aW9uIGlzICpwcm9iYWJpbGlzdGljKiwgbm90IGV4aGF1c3RpdmUuIFdlXG4vLyBlbnVtZXJhdGUgb25lLSBhbmQgdHdvLXBvc2l0aW9uIHNlcGFyYXRvciBpbnNlcnRpb25zIHBsdXMgZnVsbC1zcGxpdFxuLy8gZm9ybXMuIFBhdGhvbG9naWNhbCBtdWx0aS1pbnNlcnRpb24gdmFyaWFudHMgKGBhLmItY19kZWZgLXN0eWxlKSBhbmRcbi8vIG1peGVkLXNlcGFyYXRvciAzKyBpbnNlcnRpb25zIGNhbiBub3JtYWxpemUgdG8gdGhlIHNhbWUgZm9ybSBidXQgd29uJ3Rcbi8vIGJlIHF1ZXJpZWQuIEZvciBhdXRob3JpdGF0aXZlIHByZS1mbGlnaHQsIHVzZSBgbnBtIHB1Ymxpc2ggLS1kcnktcnVuYC5cblxuaW1wb3J0IHsgYXR0ZW1wdEFzeW5jIH0gZnJvbSAnbWFzc2FtYW4nXG5cbmltcG9ydCB7XG4gIE1PTklLRVJfMklOU0VSVF9DQVBfQkFTRV9ERUZBVUxULFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfRVhIQVVTVElWRSxcbiAgTU9OSUtFUl8ySU5TRVJUX0NBUF9NQVhfREVGQVVMVCxcbiAgTU9OSUtFUl8ySU5TRVJUX0NBUF9NQVhfRVhIQVVTVElWRSxcbiAgTU9OSUtFUl8ySU5TRVJUX0NBUF9TQ0FMRV9ERUZBVUxULFxuICBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0VYSEFVU1RJVkUsXG59IGZyb20gJy4vY29uc3RhbnRzLm1qcydcblxuY29uc3QgU0VQQVJBVE9SUyA9IFsnLScsICdfJywgJy4nXVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIG5hbWUgdGhlIHdheSBucG0ncyBtb25pa2VyIGNvbGxpc2lvbiBjaGVjayBkb2VzOiBsb3dlcmNhc2VcbiAqIGFuZCBzdHJpcCB0aGUgcHVuY3R1YXRpb24gY2hhcnMgYC5gLCBgLWAsIGBfYC4gU2NvcGVkIG5hbWVzIGtlZXAgdGhlaXJcbiAqIHNjb3BlIHNlZ21lbnQuXG4gKlxuICogKipBU0NJSSBwcmVjb25kaXRpb24uKiogVGhpcyBtaXJyb3JzIG5wbSdzIHNlcnZlci1zaWRlIHJ1bGUgZXhhY3RseSwgd2hpY2hcbiAqIHByZWRhdGVzIFVuaWNvZGUtYXdhcmUgbm9ybWFsaXphdGlvbi4gTmFtZXMgd2l0aCBVbmljb2RlIChlLmcuIGDEsGAg4oaSIGBpzIdgXG4gKiBpbiBzb21lIGxvY2FsZXMsIGDDn2Ag4oaSIGBzc2ApIGFyZSAqbm90KiBjYW5vbmljYWxpemVkIGhlcmU7IHRoZXkncmUgYWxyZWFkeVxuICogcmVqZWN0ZWQgdXBzdHJlYW0gYnkgYHZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWVgJ3MgVVJMLXNhZmV0eSBjaGVjay4gSWZcbiAqIG5vbi1BU0NJSSBzbGlwcyB0aHJvdWdoLCBlcXVpdmFsZW5jZSBtYXkgbm90IG1hdGNoIHRoZSByZWdpc3RyeSdzIGJlaGF2aW9yLlxuICpcbiAqIFJldHVybnMgYCcnYCBmb3Igbm9uLXN0cmluZyAvIGVtcHR5IGlucHV0IHNvIGNhbGxlcnMgY2FuIGJyYW5jaCB3aXRob3V0XG4gKiBhIHNlcGFyYXRlIGd1YXJkLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gbmFtZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiBub3JtYWxpemUoJ1BpY28tTG9nJykgICAgICAgICAvLyAncGljb2xvZydcbiAqIG5vcm1hbGl6ZSgnanMtb24tc3RyZWFtJykgICAgIC8vICdqc29uc3RyZWFtJyAgKGNvbGxpZGVzIHdpdGggYGpzb25zdHJlYW1gKVxuICogbm9ybWFsaXplKCdAWmFjL1BpY28tTG9nJykgICAgLy8gJ0B6YWMvcGljb2xvZydcbiAqIG5vcm1hbGl6ZShudWxsKSAgICAgICAgICAgICAgIC8vICcnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUobmFtZSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8ICFuYW1lKSByZXR1cm4gJydcbiAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgY29uc3Qgc2xhc2ggPSBuYW1lLmluZGV4T2YoJy8nKVxuICAgIGlmIChzbGFzaCA8IDApIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBzY29wZSA9IG5hbWUuc2xpY2UoMCwgc2xhc2ggKyAxKS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgYmFyZSA9IG5hbWVcbiAgICAgIC5zbGljZShzbGFzaCArIDEpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL1suXy1dL2csICcnKVxuICAgIHJldHVybiBzY29wZSArIGJhcmVcbiAgfVxuICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1suXy1dL2csICcnKVxufVxuXG4vKipcbiAqIFJlamVjdCBpbnB1dHMgY29udGFpbmluZyB3aGl0ZXNwYWNlIG9yIEFTQ0lJIGNvbnRyb2wgYnl0ZXMuIFRoZSBjaGVjayBpc1xuICogd3JpdHRlbiBhcyBhIGNvZGUtcG9pbnQgbG9vcCByYXRoZXIgdGhhbiBhIHJlZ2V4IHdpdGggY29udHJvbCBjaGFycyBzb1xuICogdGhlIHNvdXJjZSBmaWxlIHN0YXlzIGZyZWUgb2YgbGl0ZXJhbCBjb250cm9sIGJ5dGVzICh3aGljaCB3b3VsZCBhbHNvXG4gKiB0cmlwIG94bGludCdzIG5vLWNvbnRyb2wtcmVnZXggcnVsZSkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaGFzSW52YWxpZENoYXJzKG5hbWUpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY29kZSA9IG5hbWUuY2hhckNvZGVBdChpKVxuICAgIGlmIChjb2RlIDw9IDB4MjAgfHwgY29kZSA9PT0gMHg3ZikgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBuYW1lcyB0aGF0IHNoYXJlIHRoZSBjYW5kaWRhdGUncyBub3JtYWxpemVkIGZvcm0uIFRoZSBjYWxsZXJcbiAqIHF1ZXJpZXMgZWFjaCB2YXJpYW50IGFnYWluc3QgdGhlIHJlZ2lzdHJ5IHRvIGRldGVjdCBjb2xsaXNpb25zLiBUaGVcbiAqIDItaW5zZXJ0aW9uIGNhcCBzY2FsZXMgd2l0aCBuYW1lIGxlbmd0aCBzbyBsb25nZXIgbXVsdGktbW9ycGhlbWUgbmFtZXNcbiAqIChgcmVhY3RuYXRpdmVuYXZpZ2F0aW9uYCDihpIgYHJlYWN0LW5hdGl2ZS1uYXZpZ2F0aW9uYCkgcmVhY2ggdGhlaXJcbiAqIHJlYWxpc3RpYyBtb3JwaGVtZSBzcGxpdHMgYmVmb3JlIHRoZSBjYXAgZXhoYXVzdHMuXG4gKlxuICogQm91bmRhcnkgZ3VhcmRzIHJlamVjdCBpbnB1dHMgYHZhbGlkYXRlTmFtZWAgd291bGQgYWxzbyByZWplY3Qg4oCUIGtlZXBpbmdcbiAqIHRoaXMgZnVuY3Rpb24gaG9uZXN0IHdoZW4gY2FsbGVkIGluIGlzb2xhdGlvbiByYXRoZXIgdGhhbiByZWx5aW5nIG9uXG4gKiB1cHN0cmVhbSBmaWx0ZXJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7eyBpc0V4aGF1c3RpdmU/OiBib29sZWFuIH19IFtvcHRzXSAtIHdpZGVucyAyLWluc2VydGlvbiBjb3ZlcmFnZVxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICogQGV4YW1wbGVcbiAqIHZhcmlhbnRzKCdwaWNvbG9nJykgICAgICAgICAgIC8vIFsncGljby1sb2cnLCAncGljb19sb2cnLCAncGljby5sb2cnLCAncC1pY29sb2cnLCDigKZdXG4gKiB2YXJpYW50cygnanNvbnN0cmVhbScpLmluY2x1ZGVzKCdqcy1vbi1zdHJlYW0nKSAgICAgICAgICAgICAgICAgICAgLy8gdHJ1ZSAoY2Fub25pY2FsIGJsb2cgZXhhbXBsZSlcbiAqIHZhcmlhbnRzKCdyZWFjdG5hdGl2ZW5hdmlnYXRpb24nKS5pbmNsdWRlcygncmVhY3QtbmF0aXZlLW5hdmlnYXRpb24nKSAvLyB0cnVlIChsb25nLW5hbWUgbW9ycGhlbWUgc3BsaXQpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YXJpYW50cyhuYW1lLCBvcHRzID0ge30pIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhbmFtZSkgcmV0dXJuIFtdXG4gIGlmIChoYXNJbnZhbGlkQ2hhcnMobmFtZSkpIHJldHVybiBbXVxuXG4gIGNvbnN0IGxvd2VyID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIC8vIFNjb3BlLWF3YXJlIHNwbGl0IOKAlCBlbXB0eSBzY29wZSAoYEAvZm9vYCksIG1pc3Npbmcgc2xhc2ggKGBAbWVgKSwgb3JcbiAgLy8gbXVsdGktc2xhc2ggKGBAbWUvZm9vL2JhcmApIGFsbCBmYWlsIHZhbGlkYXRlTmFtZSB1cHN0cmVhbS5cbiAgbGV0IHNjb3BlID0gJydcbiAgbGV0IGJhcmVJbnB1dCA9IGxvd2VyXG4gIGlmIChsb3dlci5zdGFydHNXaXRoKCdAJykpIHtcbiAgICBjb25zdCBzbGFzaCA9IGxvd2VyLmluZGV4T2YoJy8nKVxuICAgIGlmIChzbGFzaCA8IDApIHJldHVybiBbXSAvLyBgQG1lYCDigJQgbm8gc2xhc2hcbiAgICBpZiAoc2xhc2ggPT09IDEpIHJldHVybiBbXSAvLyBgQC9mb29gIOKAlCBlbXB0eSBzY29wZVxuICAgIHNjb3BlID0gbG93ZXIuc2xpY2UoMCwgc2xhc2ggKyAxKVxuICAgIGJhcmVJbnB1dCA9IGxvd2VyLnNsaWNlKHNsYXNoICsgMSlcbiAgICBpZiAoYmFyZUlucHV0LmluY2x1ZGVzKCcvJykpIHJldHVybiBbXSAvLyBgQG1lL2Zvby9iYXJgIOKAlCBtdWx0aS1zbGFzaFxuICB9XG4gIGlmICgvXlstLl9dLy50ZXN0KGJhcmVJbnB1dCkpIHJldHVybiBbXSAvLyBsZWFkaW5nIHNlcGFyYXRvciBvbiB0aGUgcGtnIHNlZ21lbnRcbiAgY29uc3QgYmFyZSA9IGJhcmVJbnB1dC5yZXBsYWNlKC9bLl8tXS9nLCAnJylcbiAgaWYgKCFiYXJlKSByZXR1cm4gW11cblxuICBjb25zdCBvdXQgPSBuZXcgU2V0KClcbiAgb3V0LmFkZChzY29wZSArIGJhcmUpXG5cbiAgLy8gMS1pbnNlcnRpb246IGNvdmVyIHRoZSBtb3N0IGNvbW1vbiBtb25pa2VyIHNoYXBlIChgZm9vLWJhcmAg4oaUIGBmb29iYXJgKS5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBiYXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChjb25zdCBzZXAgb2YgU0VQQVJBVE9SUykge1xuICAgICAgb3V0LmFkZChzY29wZSArIGJhcmUuc2xpY2UoMCwgaSkgKyBzZXAgKyBiYXJlLnNsaWNlKGkpKVxuICAgIH1cbiAgfVxuXG4gIC8vIEZ1bGwtc3BsaXQ6IGBmLW8tby1iLWEtcmAgLyBgZl9vX29fYl9hX3JgIGZvcm1zLlxuICBpZiAoYmFyZS5sZW5ndGggPiAxKSB7XG4gICAgb3V0LmFkZChzY29wZSArIGJhcmUuc3BsaXQoJycpLmpvaW4oJy0nKSlcbiAgICBvdXQuYWRkKHNjb3BlICsgYmFyZS5zcGxpdCgnJykuam9pbignXycpKVxuICB9XG5cbiAgLy8gMi1pbnNlcnRpb246IGNhdGNoZXMgbXVsdGktbW9ycGhlbWUgc3BsaXRzIChganMtb24tc3RyZWFtYCDihpQgYGpzb25zdHJlYW1gLFxuICAvLyBgcmVhY3QtbmF0aXZlLW5hdmlnYXRpb25gIOKGlCBgcmVhY3RuYXRpdmVuYXZpZ2F0aW9uYCkuIEl0ZXJhdGVzIGJ5IGdhcCBzaXplXG4gIC8vIGFzY2VuZGluZyBzbyBjb21tb24gbW9ycGhlbWUgc3BsaXRzIGFyZSByZWFjaGVkIGZpcnN0OyB0aGUgY2FwIHNjYWxlc1xuICAvLyB3aXRoIGJhcmUubGVuZ3RoIHNvIGxvbmdlciBuYW1lcyBnZXQgYSBidWRnZXQgcHJvcG9ydGlvbmFsIHRvIHRoZWlyXG4gIC8vIHJlYWxpc3RpYyBpbnNlcnRpb24gc3BhY2UuXG4gIGlmIChiYXJlLmxlbmd0aCA+PSA0KSB7XG4gICAgbGV0IGFkZGVkID0gMFxuICAgIGNvbnN0IGNhcCA9IGNhcEZvckxlbmd0aChiYXJlLmxlbmd0aCwgb3B0cy5pc0V4aGF1c3RpdmUgPT09IHRydWUpXG4gICAgb3V0ZXI6IGZvciAobGV0IGdhcCA9IDE7IGdhcCA8IGJhcmUubGVuZ3RoIC0gMTsgZ2FwKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpICsgZ2FwIDwgYmFyZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBqID0gaSArIGdhcFxuICAgICAgICBmb3IgKGNvbnN0IHNlcEEgb2YgU0VQQVJBVE9SUykge1xuICAgICAgICAgIGZvciAoY29uc3Qgc2VwQiBvZiBTRVBBUkFUT1JTKSB7XG4gICAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPVxuICAgICAgICAgICAgICBzY29wZSArIGJhcmUuc2xpY2UoMCwgaSkgKyBzZXBBICsgYmFyZS5zbGljZShpLCBqKSArIHNlcEIgKyBiYXJlLnNsaWNlKGopXG4gICAgICAgICAgICBpZiAoIW91dC5oYXMoY2FuZGlkYXRlKSkge1xuICAgICAgICAgICAgICBvdXQuYWRkKGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgYWRkZWQrK1xuICAgICAgICAgICAgICBpZiAoYWRkZWQgPj0gY2FwKSBicmVhayBvdXRlclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEV4Y2x1ZGUgdGhlIGxpdGVyYWwgaW5wdXQg4oCUIGl0cyBleGlzdGVuY2UgaXMgY2hlY2tlZCBzZXBhcmF0ZWx5LCBub3QgYXNcbiAgLy8gYSBtb25pa2VyIGNvbGxpc2lvbi4gV2UgZGVsZXRlIHRoZSBvcmlnaW5hbCBgbmFtZWAsIG5vdCBgbG93ZXJgLCBzbyB0aGVcbiAgLy8gYmFyZSBsb3dlcmNhc2UgZm9ybSAoYSAqZGlmZmVyZW50KiBzdHJpbmcpIHN1cnZpdmVzIGZvciBpbnB1dHMgbGlrZVxuICAvLyBgRm9vQmFyYCB3aGVyZSBgZm9vYmFyYCBpcyBhIHJlYWwgbW9uaWtlciBjb2xsaWRlciB0byBxdWVyeS5cbiAgb3V0LmRlbGV0ZShuYW1lKVxuICByZXR1cm4gWy4uLm91dF1cbn1cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBwZXItY2FsbCAyLWluc2VydGlvbiB2YXJpYW50IGNhcC4gU2NhbGVzIGxpbmVhcmx5IHdpdGggbmFtZVxuICogbGVuZ3RoLCBib3VuZGVkIGJ5IGEgYmFzZSBmbG9vciBhbmQgYSBoYXJkIGNlaWxpbmcuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGJhcmVMZW5ndGhcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFeGhhdXN0aXZlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2FwRm9yTGVuZ3RoKGJhcmVMZW5ndGgsIGlzRXhoYXVzdGl2ZSkge1xuICBjb25zdCBiYXNlID0gaXNFeGhhdXN0aXZlID8gTU9OSUtFUl8ySU5TRVJUX0NBUF9CQVNFX0VYSEFVU1RJVkUgOiBNT05JS0VSXzJJTlNFUlRfQ0FQX0JBU0VfREVGQVVMVFxuICBjb25zdCBzY2FsZSA9IGlzRXhoYXVzdGl2ZVxuICAgID8gTU9OSUtFUl8ySU5TRVJUX0NBUF9TQ0FMRV9FWEhBVVNUSVZFXG4gICAgOiBNT05JS0VSXzJJTlNFUlRfQ0FQX1NDQUxFX0RFRkFVTFRcbiAgY29uc3QgY2VpbGluZyA9IGlzRXhoYXVzdGl2ZVxuICAgID8gTU9OSUtFUl8ySU5TRVJUX0NBUF9NQVhfRVhIQVVTVElWRVxuICAgIDogTU9OSUtFUl8ySU5TRVJUX0NBUF9NQVhfREVGQVVMVFxuICByZXR1cm4gTWF0aC5taW4oY2VpbGluZywgTWF0aC5tYXgoYmFzZSwgYmFyZUxlbmd0aCAqIHNjYWxlKSlcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb2xsaXNpb25SZXBvcnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNvbmZsaWN0cyAtIHZhcmlhbnRzIHRoZSBwcmVkaWNhdGUgY29uZmlybWVkIGFzIGV4aXN0aW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSB1bnZlcmlmaWVkIC0gdmFyaWFudHMgd2hlcmUgdGhlIHByZWRpY2F0ZSB0aHJldzsgdGhlaXJcbiAqICAgY29sbGlzaW9uIHN0YXR1cyBpcyB1bmtub3duLiBDYWxsZXJzIGluZmVyIFwiY29sbGlkZXNcIiBmcm9tXG4gKiAgIGBjb25mbGljdHMubGVuZ3RoID4gMGAuXG4gKi9cblxuY29uc3QgRklORF9DT0xMSVNJT05TX0RFRkFVTFRfQ09OQ1VSUkVOQ1kgPSAxMlxuXG4vKipcbiAqIEdpdmVuIGEgY2FuZGlkYXRlIGFuZCBhbiBgZXhpc3RzKG5hbWUpID0+IFByb21pc2U8Ym9vbGVhbj5gIHByZWRpY2F0ZSxcbiAqIHJldHVybiBhbnkgbW9uaWtlciBjb2xsaXNpb25zIGZvdW5kIHBsdXMgYW55IHZhcmlhbnRzIHdob3NlIGxvb2t1cFxuICogdGhyZXcuIENhbGxlcnMgc2hvdWxkIHRyZWF0IGEgbm9uLWVtcHR5IGB1bnZlcmlmaWVkYCBhcyBcIm1vbmlrZXIgY2hlY2tcbiAqIGluY29tcGxldGVcIiByYXRoZXIgdGhhbiBpZ25vcmluZyBpdC5cbiAqXG4gKiBWYXJpYW50IHByb2JlcyBydW4gd2l0aCBib3VuZGVkIGNvbmN1cnJlbmN5IChkZWZhdWx0IDEyKSBzbyBhXG4gKiBuZXR3b3JrLWJhY2tlZCBgZXhpc3RzYCBkb2Vzbid0IHVubGVhc2ggdGhvdXNhbmRzIG9mIHBhcmFsbGVsIHJlcXVlc3RzXG4gKiBmb3IgbG9uZyBuYW1lcyB3aXRoIGAtLWV4aGF1c3RpdmVgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYW5kaWRhdGVcbiAqIEBwYXJhbSB7KG5hbWU6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPn0gZXhpc3RzXG4gKiBAcGFyYW0ge3sgaXNFeGhhdXN0aXZlPzogYm9vbGVhbiwgY29uY3VycmVuY3k/OiBudW1iZXIgfX0gW29wdHNdXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxDb2xsaXNpb25SZXBvcnQ+fVxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHRha2VuID0gbmV3IFNldChbJ2pzLW9uLXN0cmVhbSddKVxuICogYXdhaXQgZmluZENvbGxpc2lvbnMoJ2pzb25zdHJlYW0nLCBhc3luYyAobmFtZSkgPT4gdGFrZW4uaGFzKG5hbWUpKVxuICogLy8geyBjb25mbGljdHM6IFsnanMtb24tc3RyZWFtJ10sIHVudmVyaWZpZWQ6IFtdIH1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRDb2xsaXNpb25zKGNhbmRpZGF0ZSwgZXhpc3RzLCBvcHRzID0ge30pIHtcbiAgY29uc3QgdG9DaGVjayA9IHZhcmlhbnRzKGNhbmRpZGF0ZSwgb3B0cylcbiAgY29uc3QgY29uY3VycmVuY3kgPVxuICAgIE51bWJlci5pc0ludGVnZXIob3B0cy5jb25jdXJyZW5jeSkgJiYgb3B0cy5jb25jdXJyZW5jeSA+IDBcbiAgICAgID8gb3B0cy5jb25jdXJyZW5jeVxuICAgICAgOiBGSU5EX0NPTExJU0lPTlNfREVGQVVMVF9DT05DVVJSRU5DWVxuICBjb25zdCBwcm9iZXMgPSBhd2FpdCBydW5Cb3VuZGVkKHRvQ2hlY2ssIGNvbmN1cnJlbmN5LCBhc3luYyAodmFyaWFudCkgPT4gKHtcbiAgICB2YXJpYW50LFxuICAgIHJlc3VsdDogYXdhaXQgYXR0ZW1wdEFzeW5jKCgpID0+IGV4aXN0cyh2YXJpYW50KSksXG4gIH0pKVxuICAvLyBgcmVzdWx0Lm9rYCBtZWFucyB0aGUgcHJvYmUgcmV0dXJuZWQgKGRpZG4ndCB0aHJvdyk7IGByZXN1bHQudmFsdWVgXG4gIC8vIG1lYW5zIHRoZSBwcmVkaWNhdGUgcmVwb3J0ZWQgdGhlIHZhcmlhbnQgYXMgZXhpc3Rpbmcgb24gdGhlIHJlZ2lzdHJ5LlxuICAvLyBCb3RoIG11c3QgYmUgdHJ1dGh5IHRvIGNvdW50IGFzIGEgY29uZmlybWVkIGNvbGxpc2lvbi5cbiAgY29uc3QgY29uZmxpY3RzID0gcHJvYmVzXG4gICAgLmZpbHRlcigoeyByZXN1bHQgfSkgPT4gcmVzdWx0Lm9rICYmIHJlc3VsdC52YWx1ZSlcbiAgICAubWFwKCh7IHZhcmlhbnQgfSkgPT4gdmFyaWFudClcbiAgY29uc3QgdW52ZXJpZmllZCA9IHByb2Jlcy5maWx0ZXIoKHsgcmVzdWx0IH0pID0+ICFyZXN1bHQub2spLm1hcCgoeyB2YXJpYW50IH0pID0+IHZhcmlhbnQpXG4gIHJldHVybiB7IGNvbmZsaWN0cywgdW52ZXJpZmllZCB9XG59XG5cbi8qKlxuICogUnVuIGB0YXNrKGl0ZW0pYCBhZ2FpbnN0IGV2ZXJ5IGlucHV0IHdpdGggYXQgbW9zdCBgY29uY3VycmVuY3lgIGluXG4gKiBmbGlnaHQuIFRpbnkgc3RydWN0dXJlZC1jb25jdXJyZW5jeSBwcmltaXRpdmUg4oCUIGR1cGxpY2F0ZWQgZnJvbVxuICogYHJlZ2lzdHJ5Lm1qczpwb29sYCBzbyB0aGlzIG1vZHVsZSBzdGF5cyBzdGFuZGFsb25lIGZvciBsaWJyYXJ5XG4gKiBjb25zdW1lcnMgd2hvIGRvbid0IGltcG9ydCB0aGUgcmVnaXN0cnkuXG4gKlxuICogQHRlbXBsYXRlIFQsIFVcbiAqIEBwYXJhbSB7VFtdfSBpdGVtc1xuICogQHBhcmFtIHtudW1iZXJ9IGNvbmN1cnJlbmN5XG4gKiBAcGFyYW0geyhpdGVtOiBUKSA9PiBQcm9taXNlPFU+fSB0YXNrXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxVW10+fVxuICogQHByaXZhdGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gcnVuQm91bmRlZChpdGVtcywgY29uY3VycmVuY3ksIHRhc2spIHtcbiAgY29uc3QgcmVzdWx0cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGl0ZW1zLmxlbmd0aCB9KVxuICBsZXQgbmV4dCA9IDBcbiAgYXN5bmMgZnVuY3Rpb24gd29ya2VyKCkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCBpbmRleCA9IG5leHQrK1xuICAgICAgaWYgKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkgcmV0dXJuXG4gICAgICByZXN1bHRzW2luZGV4XSA9IGF3YWl0IHRhc2soaXRlbXNbaW5kZXhdKVxuICAgIH1cbiAgfVxuICBjb25zdCB3b3JrZXJzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogTWF0aC5taW4oY29uY3VycmVuY3ksIGl0ZW1zLmxlbmd0aCkgfSwgd29ya2VyKVxuICBhd2FpdCBQcm9taXNlLmFsbCh3b3JrZXJzKVxuICByZXR1cm4gcmVzdWx0c1xufVxuIiwiLy8gVGhlU3BhbmlzaElucXVpc2l0aW9uXG5cbi8vIENhY2hlIHRoZSBtYXRyaXguIE5vdGUgdGhhdCBpZiB5b3Ugbm90IHBhc3MgYSBsaW1pdCB0aGlzIGltcGxlbWVudGF0aW9uIHdpbGwgdXNlIGEgZHluYW1pY2FsbHkgY2FsY3VsYXRlIG9uZS5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfX3RoaXMsIHRoYXQsIGxpbWl0KSB7XG5cbiAgdmFyIHRoaXNMZW5ndGggPSBfX3RoaXMubGVuZ3RoLFxuICAgICAgdGhhdExlbmd0aCA9IHRoYXQubGVuZ3RoLFxuICAgICAgbWF0cml4ID0gW107XG5cbiAgLy8gSWYgdGhlIGxpbWl0IGlzIG5vdCBkZWZpbmVkIGl0IHdpbGwgYmUgY2FsY3VsYXRlIGZyb20gdGhpcyBhbmQgdGhhdCBhcmdzLlxuICBsaW1pdCA9IChsaW1pdCB8fCAoKHRoYXRMZW5ndGggPiB0aGlzTGVuZ3RoID8gdGhhdExlbmd0aCA6IHRoaXNMZW5ndGgpKSkrMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbWl0OyBpKyspIHtcbiAgICBtYXRyaXhbaV0gPSBbaV07XG4gICAgbWF0cml4W2ldLmxlbmd0aCA9IGxpbWl0O1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCBsaW1pdDsgaSsrKSB7XG4gICAgbWF0cml4WzBdW2ldID0gaTtcbiAgfVxuXG4gIGlmIChNYXRoLmFicyh0aGlzTGVuZ3RoIC0gdGhhdExlbmd0aCkgPiAobGltaXQgfHwgMTAwKSl7XG4gICAgcmV0dXJuIHByZXBhcmUgKGxpbWl0IHx8IDEwMCk7XG4gIH1cbiAgaWYgKHRoaXNMZW5ndGggPT09IDApe1xuICAgIHJldHVybiBwcmVwYXJlICh0aGF0TGVuZ3RoKTtcbiAgfVxuICBpZiAodGhhdExlbmd0aCA9PT0gMCl7XG4gICAgcmV0dXJuIHByZXBhcmUgKHRoaXNMZW5ndGgpO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIG1hdHJpeC5cbiAgdmFyIGosIHRoaXNfaSwgdGhhdF9qLCBjb3N0LCBtaW4sIHQ7XG4gIGZvciAoaSA9IDE7IGkgPD0gdGhpc0xlbmd0aDsgKytpKSB7XG4gICAgdGhpc19pID0gX190aGlzW2ktMV07XG5cbiAgICAvLyBTdGVwIDRcbiAgICBmb3IgKGogPSAxOyBqIDw9IHRoYXRMZW5ndGg7ICsraikge1xuICAgICAgLy8gQ2hlY2sgdGhlIGphZ2dlZCBsZCB0b3RhbCBzbyBmYXJcbiAgICAgIGlmIChpID09PSBqICYmIG1hdHJpeFtpXVtqXSA+IDQpIHJldHVybiBwcmVwYXJlICh0aGlzTGVuZ3RoKTtcblxuICAgICAgdGhhdF9qID0gdGhhdFtqLTFdO1xuICAgICAgY29zdCA9ICh0aGlzX2kgPT09IHRoYXRfaikgPyAwIDogMTsgLy8gU3RlcCA1XG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIG1pbmltdW0gKG11Y2ggZmFzdGVyIHRoYW4gTWF0aC5taW4oLi4uKSkuXG4gICAgICBtaW4gICAgPSBtYXRyaXhbaSAtIDFdW2ogICAgXSArIDE7IC8vIERlbGV0aW9uLlxuICAgICAgaWYgKCh0ID0gbWF0cml4W2kgICAgXVtqIC0gMV0gKyAxICAgKSA8IG1pbikgbWluID0gdDsgICAvLyBJbnNlcnRpb24uXG4gICAgICBpZiAoKHQgPSBtYXRyaXhbaSAtIDFdW2ogLSAxXSArIGNvc3QpIDwgbWluKSBtaW4gPSB0OyAgIC8vIFN1YnN0aXR1dGlvbi5cblxuICAgICAgLy8gVXBkYXRlIG1hdHJpeC5cbiAgICAgIG1hdHJpeFtpXVtqXSA9IChpID4gMSAmJiBqID4gMSAmJiB0aGlzX2kgPT09IHRoYXRbai0yXSAmJiBfX3RoaXNbaS0yXSA9PT0gdGhhdF9qICYmICh0ID0gbWF0cml4W2ktMl1bai0yXStjb3N0KSA8IG1pbikgPyB0IDogbWluOyAvLyBUcmFuc3Bvc2l0aW9uLlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcmVwYXJlIChtYXRyaXhbdGhpc0xlbmd0aF1bdGhhdExlbmd0aF0pO1xuXG4vKipcbiAqXG4gKi9cbiAgZnVuY3Rpb24gcHJlcGFyZShzdGVwcykge1xuICAgIHZhciBsZW5ndGggPSBNYXRoLm1heCh0aGlzTGVuZ3RoLCB0aGF0TGVuZ3RoKVxuICAgIHZhciByZWxhdGl2ZSA9IGxlbmd0aCA9PT0gMFxuICAgICAgPyAwXG4gICAgICA6IChzdGVwcyAvIGxlbmd0aCk7XG4gICAgdmFyIHNpbWlsYXJpdHkgPSAxIC0gcmVsYXRpdmVcbiAgICByZXR1cm4ge1xuICAgICAgc3RlcHM6IHN0ZXBzLFxuICAgICAgcmVsYXRpdmU6IHJlbGF0aXZlLFxuICAgICAgc2ltaWxhcml0eTogc2ltaWxhcml0eVxuICAgIH07XG4gIH1cblxufTtcbiIsIi8vIE5lYXItbWF0Y2ggKHR5cG9zcXVhdCkgZGV0ZWN0aW9uIOKAlCBmbGFncyBjYW5kaWRhdGVzIHdpdGhpbiDiiaQgTiBlZGl0cyBvZlxuLy8gYSBwb3B1bGFyIG5wbSBwYWNrYWdlLiBEaXN0aW5jdCBmcm9tIG5wbSdzIG1vbmlrZXIgcnVsZSAod2hpY2ggb25seVxuLy8gY2F0Y2hlcyBuYW1lcyB0aGF0ICpub3JtYWxpemUqIGlkZW50aWNhbGx5KS4gU2luZ2xlLWxldHRlciBzdWJzdGl0dXRpb25zXG4vLyBsaWtlIGBleHRvb2xraXRgIHZzIGBlcy10b29sa2l0YCB3b3VsZCBwdWJsaXNoIGZpbmUgcGVyIHRoZSBtb25pa2VyIHJ1bGVcbi8vIGJ1dCBhcmUgY2xhc3NpYyB0eXBvc3F1YXQgc2hhcGVzLlxuLy9cbi8vIERpc3RhbmNlIGlzIE9wdGltYWwgU3RyaW5nIEFsaWdubWVudCAoT1NBKSBmcm9tIHRoZSBgZGFtZXJhdS1sZXZlbnNodGVpbmBcbi8vIHBhY2thZ2Ug4oCUIGNvdW50cyBpbnNlcnRpb25zLCBkZWxldGlvbnMsIHN1YnN0aXR1dGlvbnMsIGFuZCBhZGphY2VudFxuLy8gdHJhbnNwb3NpdGlvbnMgYXMgb25lIGVkaXQgZWFjaCwgYnV0IGRvZXMgbm90IGFsbG93IGEgc3Vic3RyaW5nIHRvIGJlXG4vLyBlZGl0ZWQgbW9yZSB0aGFuIG9uY2UuIEZvciB0eXBvc3F1YXQgZGV0ZWN0aW9uIGF0IGRpc3RhbmNlIOKJpCAyIHRoaXMgaXNcbi8vIGluZGlzdGluZ3Vpc2hhYmxlIGZyb20gdW5yZXN0cmljdGVkIERhbWVyYXUtTGV2ZW5zaHRlaW47IHRoZSBkaXN0aW5jdGlvblxuLy8gb25seSBtYXR0ZXJzIGF0IGRpc3RhbmNlIDMrIChlLmcuLCBgb3NhRGlzdGFuY2UoJ2NhJywgJ2FiYycpID09PSAzYFxuLy8gd2hpbGUgdHJ1ZSBETCB3b3VsZCBzYXkgMikuXG4vL1xuLy8gVGhpcyBtb2R1bGUgaXMgKnB1cmUqOiBjYWxsZXJzIHBhc3MgdGhlIGNvcnB1cy4gVGhlIGNvcnB1cyBsb2FkZXIgaXMgaW5cbi8vIGBjb3JwdXMubWpzYCBhbmQgcmV0dXJucyBhIFJlc3VsdCBzbyBDTEkgLyBjb25zdW1lcnMgaGFuZGxlIGZhaWx1cmUgYXRcbi8vIHRoZWlyIG93biBib3VuZGFyeS5cblxuaW1wb3J0IGRhbWVyYXVMZXZlbnNodGVpbiBmcm9tICdkYW1lcmF1LWxldmVuc2h0ZWluJ1xuXG5pbXBvcnQgeyBORUFSX01BVENIX01BWF9ESVNUQU5DRSwgTkVBUl9NQVRDSF9NSU5fQ09SUFVTX0xFTiB9IGZyb20gJy4vY29uc3RhbnRzLm1qcydcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gJy4vbW9uaWtlci5tanMnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTmVhck1hdGNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIHRoZSBwb3B1bGFyIHBhY2thZ2UgdGhlIGNhbmRpZGF0ZSByZXNlbWJsZXNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXN0YW5jZSAtIGVkaXQgZGlzdGFuY2UgYmV0d2VlbiBub3JtYWxpemVkIGZvcm1zXG4gKi9cblxuLyoqXG4gKiBPcHRpbWFsIFN0cmluZyBBbGlnbm1lbnQgZGlzdGFuY2Ug4oCUIGluc2VydGlvbnMsIGRlbGV0aW9ucywgc3Vic3RpdHV0aW9ucyxcbiAqIGFuZCBhZGphY2VudCB0cmFuc3Bvc2l0aW9ucyBjb3VudCBhcyBvbmUgZWRpdCBlYWNoLiBGb3IgZGlzdGFuY2Ug4omkIDIgdGhpc1xuICogZXF1YWxzIHVucmVzdHJpY3RlZCBEYW1lcmF1LUxldmVuc2h0ZWluOyB0aGUgdHdvIGRpZmZlciBvbmx5IGF0IGRpc3RhbmNlXG4gKiAzKywgd2hpY2ggaXMgb3V0c2lkZSBvdXIgdHlwb3NxdWF0IGJ1ZGdldCBhbnl3YXkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFcbiAqIEBwYXJhbSB7c3RyaW5nfSBiXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQGV4YW1wbGVcbiAqIG9zYURpc3RhbmNlKCdyZWFjdCcsICdyYWVjdCcpICAvLyAxICAoYWRqYWNlbnQgdHJhbnNwb3NpdGlvbilcbiAqIG9zYURpc3RhbmNlKCdjYXQnLCAnY2FydCcpICAgICAvLyAxICAoaW5zZXJ0aW9uKVxuICogb3NhRGlzdGFuY2UoJ2NhJywgJ2FiYycpICAgICAgIC8vIDMgICh0cnVlIERMIHdvdWxkIGJlIDIg4oCUIE9TQSdzIHJlc3RyaWN0aW9uKVxuICovXG5leHBvcnQgZnVuY3Rpb24gb3NhRGlzdGFuY2UoYSwgYikge1xuICByZXR1cm4gZGFtZXJhdUxldmVuc2h0ZWluKGEsIGIpLnN0ZXBzXG59XG5cbi8qKlxuICogRmluZCBwb3B1bGFyIG5wbSBwYWNrYWdlcyB3aXRoaW4gYG1heERpc3RhbmNlYCBlZGl0cyBvZiBgY2FuZGlkYXRlYCxcbiAqIGNvbXBhcmluZyBvbiBub3JtYWxpemVkIGZvcm1zIChgbG93ZXJjYXNlICsgc3RyaXAgWy5fLV1gKS4gTmFtZXMgdGhhdFxuICogbm9ybWFsaXplIGlkZW50aWNhbGx5IHRvIHRoZSBjYW5kaWRhdGUgYXJlIGV4Y2x1ZGVkIOKAlCB0aG9zZSBhcmUgbW9uaWtlclxuICogY29sbGlzaW9ucyBhbmQgYXJlIHJlcG9ydGVkIGJ5IHRoZSBtb25pa2VyIGxheWVyLlxuICpcbiAqIFJlc3VsdHMgZGVkdXBlIGJ5IG5vcm1hbGl6ZWQgZm9ybSAoa2VlcGluZyB0aGUgaGlnaGVzdC1yYW5rZWQgdmFyaWFudClcbiAqIGFuZCBzb3J0IGJ5IGRpc3RhbmNlIGFzY2VuZGluZywgdGhlbiBieSBjb3JwdXMgcmFuayBhc2NlbmRpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNhbmRpZGF0ZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gY29ycHVzIC0gcG9wdWxhciBwYWNrYWdlIG5hbWVzLCBkZXNjZW5kaW5nIGJ5IHJhbmtcbiAqIEBwYXJhbSB7eyBtYXhEaXN0YW5jZT86IG51bWJlciwgbWluQ29ycHVzTGVuPzogbnVtYmVyIH19IFtvcHRzXVxuICogQHJldHVybnMge05lYXJNYXRjaFtdfVxuICogQGV4YW1wbGVcbiAqIGZpbmROZWFyTWF0Y2hlcygnZXh0b29sa2l0JywgWydlcy10b29sa2l0JywgJ3JlYWN0J10pXG4gKiAvLyBbeyBuYW1lOiAnZXMtdG9vbGtpdCcsIGRpc3RhbmNlOiAxIH1dXG4gKlxuICogZmluZE5lYXJNYXRjaGVzKCdlc3Rvb2xraXQnLCBbJ2VzLXRvb2xraXQnXSlcbiAqIC8vIFtdICAoc2FtZSBub3JtYWxpemVkIGZvcm0g4oCUIHRoYXQncyBhIG1vbmlrZXIgY29sbGlzaW9uLCBub3QgYSBuZWFyLW1hdGNoKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE5lYXJNYXRjaGVzKGNhbmRpZGF0ZSwgY29ycHVzLCBvcHRzID0ge30pIHtcbiAgaWYgKHR5cGVvZiBjYW5kaWRhdGUgIT09ICdzdHJpbmcnIHx8ICFjYW5kaWRhdGUpIHJldHVybiBbXVxuICBpZiAoIUFycmF5LmlzQXJyYXkoY29ycHVzKSkgcmV0dXJuIFtdXG5cbiAgY29uc3QgbWF4RGlzdGFuY2UgPSBvcHRzLm1heERpc3RhbmNlID8/IE5FQVJfTUFUQ0hfTUFYX0RJU1RBTkNFXG4gIGNvbnN0IG1pbkNvcnB1c0xlbiA9IG9wdHMubWluQ29ycHVzTGVuID8/IE5FQVJfTUFUQ0hfTUlOX0NPUlBVU19MRU5cblxuICBjb25zdCBjYW5kQmFyZSA9IHNjb3BlU3RyaXAoY2FuZGlkYXRlKVxuICBpZiAoY2FuZEJhcmUgPT09IG51bGwpIHJldHVybiBbXVxuICBjb25zdCBjYW5kTm9ybSA9IG5vcm1hbGl6ZShjYW5kQmFyZSlcbiAgaWYgKCFjYW5kTm9ybSkgcmV0dXJuIFtdXG5cbiAgLy8gRGVkdXBlIGJ5IG5vcm1hbGl6ZWQgZm9ybSDigJQga2VlcHMgdGhlIGhpZ2hlc3QtcmFua2VkIGNvcnB1cyB2YXJpYW50XG4gIC8vIChsb3dlc3QgaW5kZXgpIHdoZW4gbXVsdGlwbGUgbmFtZXMgY29sbGFwc2UgKGUuZy4gYG9iamVjdC1hc3NpZ25gIGFuZFxuICAvLyBgb2JqZWN0LmFzc2lnbmAgYm90aCBub3JtYWxpemUgdG8gYG9iamVjdGFzc2lnbmApLlxuICAvKiogQHR5cGUge01hcDxzdHJpbmcsIHsgbmFtZTogc3RyaW5nLCBkaXN0YW5jZTogbnVtYmVyLCByYW5rOiBudW1iZXIgfT59ICovXG4gIGNvbnN0IGJlc3RCeU5vcm0gPSBuZXcgTWFwKClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3JwdXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwa2cgPSBjb3JwdXNbaV1cbiAgICBpZiAodHlwZW9mIHBrZyAhPT0gJ3N0cmluZycgfHwgIXBrZykgY29udGludWVcbiAgICBpZiAocGtnLmxlbmd0aCA8IG1pbkNvcnB1c0xlbikgY29udGludWVcbiAgICBjb25zdCBwa2dOb3JtID0gbm9ybWFsaXplKHBrZylcbiAgICBpZiAocGtnTm9ybSA9PT0gY2FuZE5vcm0pIGNvbnRpbnVlXG4gICAgaWYgKE1hdGguYWJzKHBrZ05vcm0ubGVuZ3RoIC0gY2FuZE5vcm0ubGVuZ3RoKSA+IG1heERpc3RhbmNlKSBjb250aW51ZVxuICAgIGNvbnN0IGVkaXREaXN0YW5jZSA9IG9zYURpc3RhbmNlKGNhbmROb3JtLCBwa2dOb3JtKVxuICAgIGlmIChlZGl0RGlzdGFuY2UgPD0gMCB8fCBlZGl0RGlzdGFuY2UgPiBtYXhEaXN0YW5jZSkgY29udGludWVcbiAgICBjb25zdCBwcmV2ID0gYmVzdEJ5Tm9ybS5nZXQocGtnTm9ybSlcbiAgICBpZiAoIXByZXYgfHwgaSA8IHByZXYucmFuaykge1xuICAgICAgYmVzdEJ5Tm9ybS5zZXQocGtnTm9ybSwgeyBuYW1lOiBwa2csIGRpc3RhbmNlOiBlZGl0RGlzdGFuY2UsIHJhbms6IGkgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gWy4uLmJlc3RCeU5vcm0udmFsdWVzKCldXG4gICAgLnNvcnQoKGEsIGIpID0+IGEuZGlzdGFuY2UgLSBiLmRpc3RhbmNlIHx8IGEucmFuayAtIGIucmFuaylcbiAgICAubWFwKCh7IG5hbWUsIGRpc3RhbmNlOiBkIH0pID0+ICh7IG5hbWUsIGRpc3RhbmNlOiBkIH0pKVxufVxuXG4vKipcbiAqIFJldHVybiB0aGUgYmFyZSAocG9zdC1zY29wZSkgcG9ydGlvbiBvZiBhIGNhbmRpZGF0ZSwgb3IgbnVsbCBpZiB0aGUgaW5wdXRcbiAqIGhhcyBhbiBpbnZhbGlkIHN0cnVjdHVyZSAoZS5nLiwgbXVsdGktc2xhc2ggbGlrZSBgQHNjb3BlL2Zvby9iYXJgKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybnMge3N0cmluZyB8IG51bGx9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzY29wZVN0cmlwKG5hbWUpIHtcbiAgaWYgKCFuYW1lLnN0YXJ0c1dpdGgoJ0AnKSkge1xuICAgIGlmIChuYW1lLmluY2x1ZGVzKCcvJykpIHJldHVybiBudWxsXG4gICAgcmV0dXJuIG5hbWVcbiAgfVxuICBjb25zdCBzbGFzaCA9IG5hbWUuaW5kZXhPZignLycpXG4gIGlmIChzbGFzaCA8IDApIHJldHVybiBudWxsXG4gIGNvbnN0IHJlc3QgPSBuYW1lLnNsaWNlKHNsYXNoICsgMSlcbiAgaWYgKHJlc3QuaW5jbHVkZXMoJy8nKSkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIHJlc3Rcbn1cbiIsIiIsIid1c2Ugc3RyaWN0J1xuY29uc3QgYnVpbHRpbnMgPSByZXF1aXJlKCcuL2J1aWx0aW4tbW9kdWxlcy5qc29uJylcblxudmFyIHNjb3BlZFBhY2thZ2VQYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXig/OkAoW14vXSs/KVsvXSk/KFteL10rPykkJylcbnZhciBleGNsdXNpb25MaXN0ID0gW1xuICAnbm9kZV9tb2R1bGVzJyxcbiAgJ2Zhdmljb24uaWNvJyxcbl1cblxuZnVuY3Rpb24gdmFsaWRhdGUgKG5hbWUpIHtcbiAgdmFyIHdhcm5pbmdzID0gW11cbiAgdmFyIGVycm9ycyA9IFtdXG5cbiAgaWYgKG5hbWUgPT09IG51bGwpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3QgYmUgbnVsbCcpXG4gICAgcmV0dXJuIGRvbmUod2FybmluZ3MsIGVycm9ycylcbiAgfVxuXG4gIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3QgYmUgdW5kZWZpbmVkJylcbiAgICByZXR1cm4gZG9uZSh3YXJuaW5ncywgZXJyb3JzKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIHJldHVybiBkb25lKHdhcm5pbmdzLCBlcnJvcnMpXG4gIH1cblxuICBpZiAoIW5hbWUubGVuZ3RoKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgbGVuZ3RoIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8nKVxuICB9XG5cbiAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IHN0YXJ0IHdpdGggYSBwZXJpb2QnKVxuICB9XG5cbiAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgZXJyb3JzLnB1c2goJ25hbWUgY2Fubm90IHN0YXJ0IHdpdGggYSBoeXBoZW4nKVxuICB9XG5cbiAgaWYgKG5hbWUubWF0Y2goL15fLykpIHtcbiAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCBhbiB1bmRlcnNjb3JlJylcbiAgfVxuXG4gIGlmIChuYW1lLnRyaW0oKSAhPT0gbmFtZSkge1xuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbm5vdCBjb250YWluIGxlYWRpbmcgb3IgdHJhaWxpbmcgc3BhY2VzJylcbiAgfVxuXG4gIC8vIE5vIGZ1bm55IGJ1c2luZXNzXG4gIGV4Y2x1c2lvbkxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZXhjbHVkZWROYW1lKSB7XG4gICAgaWYgKG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gZXhjbHVkZWROYW1lKSB7XG4gICAgICBlcnJvcnMucHVzaChleGNsdWRlZE5hbWUgKyAnIGlzIG5vdCBhIHZhbGlkIHBhY2thZ2UgbmFtZScpXG4gICAgfVxuICB9KVxuXG4gIC8vIEdlbmVyYXRlIHdhcm5pbmdzIGZvciBzdHVmZiB0aGF0IHVzZWQgdG8gYmUgYWxsb3dlZFxuXG4gIC8vIGNvcmUgbW9kdWxlIG5hbWVzIGxpa2UgaHR0cCwgZXZlbnRzLCB1dGlsLCBldGNcbiAgaWYgKGJ1aWx0aW5zLmluY2x1ZGVzKG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICB3YXJuaW5ncy5wdXNoKG5hbWUgKyAnIGlzIGEgY29yZSBtb2R1bGUgbmFtZScpXG4gIH1cblxuICBpZiAobmFtZS5sZW5ndGggPiAyMTQpIHtcbiAgICB3YXJuaW5ncy5wdXNoKCduYW1lIGNhbiBubyBsb25nZXIgY29udGFpbiBtb3JlIHRoYW4gMjE0IGNoYXJhY3RlcnMnKVxuICB9XG5cbiAgLy8gbUl4ZUQgQ2FTZSBuQU1Fc1xuICBpZiAobmFtZS50b0xvd2VyQ2FzZSgpICE9PSBuYW1lKSB7XG4gICAgd2FybmluZ3MucHVzaCgnbmFtZSBjYW4gbm8gbG9uZ2VyIGNvbnRhaW4gY2FwaXRhbCBsZXR0ZXJzJylcbiAgfVxuXG4gIGlmICgvW34nISgpKl0vLnRlc3QobmFtZS5zcGxpdCgnLycpLnNsaWNlKC0xKVswXSkpIHtcbiAgICB3YXJuaW5ncy5wdXNoKCduYW1lIGNhbiBubyBsb25nZXIgY29udGFpbiBzcGVjaWFsIGNoYXJhY3RlcnMgKFwiflxcJyEoKSpcIiknKVxuICB9XG5cbiAgaWYgKGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSAhPT0gbmFtZSkge1xuICAgIC8vIE1heWJlIGl0J3MgYSBzY29wZWQgcGFja2FnZSBuYW1lLCBsaWtlIEB1c2VyL3BhY2thZ2VcbiAgICB2YXIgbmFtZU1hdGNoID0gbmFtZS5tYXRjaChzY29wZWRQYWNrYWdlUGF0dGVybilcbiAgICBpZiAobmFtZU1hdGNoKSB7XG4gICAgICB2YXIgdXNlciA9IG5hbWVNYXRjaFsxXVxuICAgICAgdmFyIHBrZyA9IG5hbWVNYXRjaFsyXVxuXG4gICAgICBpZiAocGtnLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgICBlcnJvcnMucHVzaCgnbmFtZSBjYW5ub3Qgc3RhcnQgd2l0aCBhIHBlcmlvZCcpXG4gICAgICB9XG5cbiAgICAgIGlmIChlbmNvZGVVUklDb21wb25lbnQodXNlcikgPT09IHVzZXIgJiYgZW5jb2RlVVJJQ29tcG9uZW50KHBrZykgPT09IHBrZykge1xuICAgICAgICByZXR1cm4gZG9uZSh3YXJuaW5ncywgZXJyb3JzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGVycm9ycy5wdXNoKCduYW1lIGNhbiBvbmx5IGNvbnRhaW4gVVJMLWZyaWVuZGx5IGNoYXJhY3RlcnMnKVxuICB9XG5cbiAgcmV0dXJuIGRvbmUod2FybmluZ3MsIGVycm9ycylcbn1cblxudmFyIGRvbmUgPSBmdW5jdGlvbiAod2FybmluZ3MsIGVycm9ycykge1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIHZhbGlkRm9yTmV3UGFja2FnZXM6IGVycm9ycy5sZW5ndGggPT09IDAgJiYgd2FybmluZ3MubGVuZ3RoID09PSAwLFxuICAgIHZhbGlkRm9yT2xkUGFja2FnZXM6IGVycm9ycy5sZW5ndGggPT09IDAsXG4gICAgd2FybmluZ3M6IHdhcm5pbmdzLFxuICAgIGVycm9yczogZXJyb3JzLFxuICB9XG4gIGlmICghcmVzdWx0Lndhcm5pbmdzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSByZXN1bHQud2FybmluZ3NcbiAgfVxuICBpZiAoIXJlc3VsdC5lcnJvcnMubGVuZ3RoKSB7XG4gICAgZGVsZXRlIHJlc3VsdC5lcnJvcnNcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVcbiIsIi8vIFRoaW4gd3JhcHBlciBhcm91bmQgdGhlIG9mZmljaWFsIGB2YWxpZGF0ZS1ucG0tcGFja2FnZS1uYW1lYCBwYWNrYWdlLlxuLy8gV2UgcHJldmlvdXNseSBoYW5kLXBvcnRlZCB0aGUgcnVsZXM7IHRoZSB1cHN0cmVhbSBwYWNrYWdlIGlzIHRoZSBzb3VyY2Vcbi8vIG9mIHRydXRoIGFuZCBzdGF5cyBpbiBzeW5jIHdpdGggbnBtIGl0c2VsZi5cblxuaW1wb3J0IHZhbGlkYXRlIGZyb20gJ3ZhbGlkYXRlLW5wbS1wYWNrYWdlLW5hbWUnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVmFsaWRhdGVSZXN1bHRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNWYWxpZCAtIHRydWUgb25seSBpZiB0aGUgbmFtZSBpcyB2YWxpZCBmb3IgTkVXIHB1Ymxpc2hlc1xuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gcmVhc29ucyAtIGh1bWFuLXJlYWRhYmxlIHJlamVjdGlvbiByZWFzb25zOyBlbXB0eSB3aGVuIHZhbGlkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzU2NvcGVkIC0gdHJ1ZSBpZiB0aGUgbmFtZSBpcyBpbiB0aGUgYEBzY29wZS9uYW1lYCBmb3JtXG4gKi9cblxuLyoqXG4gKiBWYWxpZGF0ZSBhbiBucG0gcGFja2FnZSBuYW1lLiBDb21iaW5lcyBlcnJvcnMgYW5kIHdhcm5pbmdzIGludG8gYSBzaW5nbGVcbiAqIHJlYXNvbnNbXSBhcnJheSBiZWNhdXNlIGZvciAqbmV3KiBwdWJsaXNoZXMgYm90aCBhcmUgYmxvY2tlcnMuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBuYW1lXG4gKiBAcmV0dXJucyB7VmFsaWRhdGVSZXN1bHR9XG4gKiBAZXhhbXBsZVxuICogdmFsaWRhdGVOYW1lKCd0aW55LWxvZycpICAgICAgLy8geyBpc1ZhbGlkOiB0cnVlLCAgcmVhc29uczogW10sIGlzU2NvcGVkOiBmYWxzZSB9XG4gKiB2YWxpZGF0ZU5hbWUoJ1RpbnlMb2cnKSAgICAgICAvLyB7IGlzVmFsaWQ6IGZhbHNlLCByZWFzb25zOiBbJ+KApmNhcGl0YWwgbGV0dGVycyddLCBpc1Njb3BlZDogZmFsc2UgfVxuICogdmFsaWRhdGVOYW1lKCdAbWUvLmZvbycpICAgICAgLy8geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uczogWyfigKZwZXJpb2QnXSwgaXNTY29wZWQ6IHRydWUgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVOYW1lKG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB7IGlzVmFsaWQ6IGZhbHNlLCByZWFzb25zOiBbJ25hbWUgbXVzdCBiZSBhIHN0cmluZyddLCBpc1Njb3BlZDogZmFsc2UgfVxuICB9XG4gIGNvbnN0IHJlc3VsdCA9IHZhbGlkYXRlKG5hbWUpXG4gIGNvbnN0IHJlYXNvbnMgPSBbLi4uKHJlc3VsdC5lcnJvcnMgPz8gW10pLCAuLi4ocmVzdWx0Lndhcm5pbmdzID8/IFtdKV1cbiAgY29uc3QgaXNTY29wZWQgPSBuYW1lLnN0YXJ0c1dpdGgoJ0AnKSAmJiBuYW1lLmluY2x1ZGVzKCcvJylcbiAgcmV0dXJuIHsgaXNWYWxpZDogQm9vbGVhbihyZXN1bHQudmFsaWRGb3JOZXdQYWNrYWdlcyksIHJlYXNvbnMsIGlzU2NvcGVkIH1cbn1cbiIsIi8vIFB1cmUgcGlwZWxpbmUgcGllY2VzIGZvciB0aGUgbnBtLW5hbWVyIENMSS4gTmV0d29yayBJL08gbGl2ZXMgaW5cbi8vIGBjaGVjay5tanM6bWFpbigpYCB3aGljaCBzZXF1ZW5jZXMgdGhlc2UgaW4gb3JkZXI7IGV2ZXJ5dGhpbmcgaGVyZSBpc1xuLy8gZGF0YS1pbiAvIGRhdGEtb3V0IHNvIHVuaXQgdGVzdHMgY2FuIGNvdmVyIHRoZSB1bnZlcmlmaWVkLW1vbmlrZXIgcGF0aFxuLy8gd2l0aG91dCB0b3VjaGluZyB0aGUgcmVnaXN0cnkuXG5cbmltcG9ydCB7IG1hdGNoIH0gZnJvbSAnbWFzc2FtYW4nXG5cbmltcG9ydCB7IE5FQVJfTUFUQ0hfTUFYX05FSUdIQk9SUywgVkVSRElDVF9VTlZFUklGSUVEX1NBTVBMRSB9IGZyb20gJy4vY29uc3RhbnRzLm1qcydcbmltcG9ydCB7IHZhcmlhbnRzIGFzIG1vbmlrZXJWYXJpYW50cyB9IGZyb20gJy4vbW9uaWtlci5tanMnXG5pbXBvcnQgeyBmaW5kTmVhck1hdGNoZXMgfSBmcm9tICcuL25lYXItbWF0Y2gubWpzJ1xuaW1wb3J0IHsgdmFsaWRhdGVOYW1lIH0gZnJvbSAnLi92YWxpZGF0ZS5tanMnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdEF2YWlsYWJsZVxuICogQHByb3BlcnR5IHsnYXZhaWxhYmxlJ30gc3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtBcnJheTx7bmFtZTogc3RyaW5nLCBkaXN0YW5jZTogbnVtYmVyfT59IFtuZWFyTWF0Y2hlc11cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWZXJkaWN0VGFrZW5cbiAqIEBwcm9wZXJ0eSB7J3Rha2VuJ30gc3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFZlcmRpY3RNb25pa2VyXG4gKiBAcHJvcGVydHkgeydtb25pa2VyJ30gc3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gY29uZmxpY3RzXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVmVyZGljdFVudmVyaWZpZWRcbiAqIEBwcm9wZXJ0eSB7J3VudmVyaWZpZWQnfSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSB1bnZlcmlmaWVkIC0gc2FtcGxlIChjYXBwZWQgYXQgVkVSRElDVF9VTlZFUklGSUVEX1NBTVBMRSlcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1bnZlcmlmaWVkVG90YWxcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWZXJkaWN0SW52YWxpZFxuICogQHByb3BlcnR5IHsnaW52YWxpZCd9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHJlYXNvbnNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBWZXJkaWN0VW5rbm93blxuICogQHByb3BlcnR5IHsndW5rbm93bid9IHN0YXR1c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBodHRwU3RhdHVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Vycm9yXVxuICpcbiAqIEB0eXBlZGVmIHtWZXJkaWN0QXZhaWxhYmxlIHwgVmVyZGljdFRha2VuIHwgVmVyZGljdE1vbmlrZXIgfCBWZXJkaWN0VW52ZXJpZmllZCB8IFZlcmRpY3RJbnZhbGlkIHwgVmVyZGljdFVua25vd259IFZlcmRpY3RcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1vbmlrZXJQcm9iZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gY29uZmxpY3RzIC0gZXhpc3RpbmcgbmFtZXMgdGhhdCBzaGFyZSB0aGUgY2FuZGlkYXRlJ3Mgbm9ybWFsaXplZCBmb3JtXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSB1bnZlcmlmaWVkIC0gdmFyaWFudCBuYW1lcyB3aG9zZSBsb29rdXAgZGlkbid0IHJldHVybiB0YWtlbi9mcmVlXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBUcmlhZ2VSZXN1bHRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHZhbGlkIC0gc3ludGFjdGljYWxseSB2YWxpZCBjYW5kaWRhdGUgbmFtZXNcbiAqIEBwcm9wZXJ0eSB7VmVyZGljdEludmFsaWRbXX0gaW52YWxpZCAtIGFscmVhZHktZm9ybWVkIGludmFsaWQgdmVyZGljdHNcbiAqIEBwcm9wZXJ0eSB7U2V0PHN0cmluZz59IHNjb3BlZCAtIHN1YnNldCBvZiBgdmFsaWRgIHdob3NlIG5hbWVzIGFyZSBgQHNjb3BlL25hbWVgXG4gKi9cblxuLyoqIEZyb3plbiBzZW50aW5lbCBmb3IgY2FuZGlkYXRlcyB0aGF0IHdlcmVuJ3QgcHJvYmVkIChlLmcuIHNjb3BlZCkuICovXG5jb25zdCBFTVBUWV9QUk9CRSA9IE9iamVjdC5mcmVlemUoeyBjb25mbGljdHM6IE9iamVjdC5mcmVlemUoW10pLCB1bnZlcmlmaWVkOiBPYmplY3QuZnJlZXplKFtdKSB9KVxuXG4vKipcbiAqIFNwbGl0IGNhbmRpZGF0ZXMgaW50byBzeW50YWN0aWNhbGx5LXZhbGlkICsgYWxyZWFkeS1yZWplY3RlZC4gVGhlIHNjb3BlZFxuICogc3Vic2V0IGlzIHRhZ2dlZCBzZXBhcmF0ZWx5IHNvIGxhdGVyIHBoYXNlcyBjYW4gc2tpcCBtb25pa2VyIHByb2JpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gY2FuZGlkYXRlc1xuICogQHJldHVybnMge1RyaWFnZVJlc3VsdH1cbiAqIEBleGFtcGxlXG4gKiB0cmlhZ2UoWyd0aW55LWxvZycsICdUaW55TG9nJywgJ0BtZS9mb28nXSlcbiAqIC8vIHsgdmFsaWQ6IFsndGlueS1sb2cnLCAnQG1lL2ZvbyddLCBpbnZhbGlkOiBbe3N0YXR1czonaW52YWxpZCcsIC4uLn1dLCBzY29wZWQ6IFNldCB7ICdAbWUvZm9vJyB9IH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyaWFnZShjYW5kaWRhdGVzKSB7XG4gIGNvbnN0IHZhbGlkID0gW11cbiAgY29uc3QgaW52YWxpZCA9IFtdXG4gIGNvbnN0IHNjb3BlZCA9IG5ldyBTZXQoKVxuICBmb3IgKGNvbnN0IG5hbWUgb2YgY2FuZGlkYXRlcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHZhbGlkYXRlTmFtZShuYW1lKVxuICAgIGlmIChyZXN1bHQuaXNWYWxpZCkge1xuICAgICAgdmFsaWQucHVzaChuYW1lKVxuICAgICAgaWYgKHJlc3VsdC5pc1Njb3BlZCkgc2NvcGVkLmFkZChuYW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICBpbnZhbGlkLnB1c2goeyBzdGF0dXM6ICdpbnZhbGlkJywgbmFtZSwgcmVhc29uczogcmVzdWx0LnJlYXNvbnMgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgdmFsaWQsIGludmFsaWQsIHNjb3BlZCB9XG59XG5cbi8qKlxuICogU2VsZWN0IHdoaWNoIHVuc2NvcGVkLCBsaXRlcmFsLWZyZWUgY2FuZGlkYXRlcyBzaG91bGQgYmUgbW9uaWtlci1wcm9iZWRcbiAqIGFuZCBlbnVtZXJhdGUgdGhlaXIgdmFyaWFudHMuIFJldHVybnMgdGhlIHZhcmlhbnQgbGlzdCBwZXIgY2FuZGlkYXRlXG4gKiBwbHVzIHRoZSBkZWR1cGxpY2F0ZWQgc2V0IHRoZSBjYWxsZXIgc2hvdWxkIHNlbmQgdG8gdGhlIHJlZ2lzdHJ5LlxuICpcbiAqIEBwYXJhbSB7e1xuICogICB2YWxpZDogc3RyaW5nW10sXG4gKiAgIHNjb3BlZDogU2V0PHN0cmluZz4sXG4gKiAgIGV4aXN0ZW5jZTogTWFwPHN0cmluZywgaW1wb3J0KCcuL3JlZ2lzdHJ5Lm1qcycpLkV4aXN0ZW5jZT4sXG4gKiAgIGlzRXhoYXVzdGl2ZTogYm9vbGVhbixcbiAqIH19IGlucHV0XG4gKiBAcmV0dXJucyB7eyB2YXJpYW50c0J5TmFtZTogTWFwPHN0cmluZywgc3RyaW5nW10+LCBhbGxWYXJpYW50czogU2V0PHN0cmluZz4gfX1cbiAqIEBleGFtcGxlXG4gKiBzZWxlY3RNb25pa2VyQ2FuZGlkYXRlcyh7XG4gKiAgIHZhbGlkOiBbJ3BpY29sb2cnLCAnQG1lL3Njb3BlZCddLFxuICogICBzY29wZWQ6IG5ldyBTZXQoWydAbWUvc2NvcGVkJ10pLFxuICogICBleGlzdGVuY2U6IG5ldyBNYXAoW1sncGljb2xvZycsIHsga2luZDogJ2ZyZWUnLCBuYW1lOiAncGljb2xvZycsIHN0YXR1czogNDA0IH1dXSksXG4gKiAgIGlzRXhoYXVzdGl2ZTogZmFsc2UsXG4gKiB9KVxuICogLy8geyB2YXJpYW50c0J5TmFtZTogTWFwIHsgJ3BpY29sb2cnIOKGkiBbJ3BpY28tbG9nJywgJ3BpY29fbG9nJywg4oCmXSB9LCBhbGxWYXJpYW50czogU2V0IHsgLi4uIH0gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0TW9uaWtlckNhbmRpZGF0ZXMoeyB2YWxpZCwgc2NvcGVkLCBleGlzdGVuY2UsIGlzRXhoYXVzdGl2ZSB9KSB7XG4gIGNvbnN0IHZhcmlhbnRzQnlOYW1lID0gbmV3IE1hcCgpXG4gIGNvbnN0IGFsbFZhcmlhbnRzID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgbmFtZSBvZiB2YWxpZCkge1xuICAgIGlmIChzY29wZWQuaGFzKG5hbWUpKSBjb250aW51ZVxuICAgIGNvbnN0IGxpdGVyYWwgPSBleGlzdGVuY2UuZ2V0KG5hbWUpXG4gICAgaWYgKGxpdGVyYWw/LmtpbmQgIT09ICdmcmVlJykgY29udGludWVcbiAgICBjb25zdCB2YXJpYW50cyA9IG1vbmlrZXJWYXJpYW50cyhuYW1lLCB7IGlzRXhoYXVzdGl2ZSB9KVxuICAgIHZhcmlhbnRzQnlOYW1lLnNldChuYW1lLCB2YXJpYW50cylcbiAgICBmb3IgKGNvbnN0IHZhcmlhbnQgb2YgdmFyaWFudHMpIGFsbFZhcmlhbnRzLmFkZCh2YXJpYW50KVxuICB9XG4gIHJldHVybiB7IHZhcmlhbnRzQnlOYW1lLCBhbGxWYXJpYW50cyB9XG59XG5cbi8qKlxuICogQnVja2V0IGVhY2ggY2FuZGlkYXRlJ3MgdmFyaWFudCByZXN1bHRzIGludG8gYHsgY29uZmxpY3RzLCB1bnZlcmlmaWVkIH1gLlxuICogVW5rbm93biBwcm9iZXMgZ28gdG8gYHVudmVyaWZpZWRgIHNvIGNhbGxlcnMgZG9uJ3QgY29uZmxhdGUgXCJyZWdpc3RyeVxuICogY291bGRuJ3Qgc2F5XCIgd2l0aCBcInJlZ2lzdHJ5IGNvbmZpcm1lZCBmcmVlLlwiXG4gKlxuICogQHBhcmFtIHt7XG4gKiAgIHZhcmlhbnRzQnlOYW1lOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4sXG4gKiAgIHZhcmlhbnRSZXN1bHRzOiBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlW10sXG4gKiB9fSBpbnB1dFxuICogQHJldHVybnMge01hcDxzdHJpbmcsIE1vbmlrZXJQcm9iZT59XG4gKiBAZXhhbXBsZVxuICogYXNzZW1ibGVNb25pa2VyUHJvYmVzKHtcbiAqICAgdmFyaWFudHNCeU5hbWU6IG5ldyBNYXAoW1sncGljb2xvZycsIFsncGljby1sb2cnLCAncGljb19sb2cnXV1dKSxcbiAqICAgdmFyaWFudFJlc3VsdHM6IFtcbiAqICAgICB7IGtpbmQ6ICd0YWtlbicsIG5hbWU6ICdwaWNvLWxvZycsIHN0YXR1czogMjAwIH0sXG4gKiAgICAgeyBraW5kOiAndW5rbm93bicsIG5hbWU6ICdwaWNvX2xvZycsIHN0YXR1czogNDI5IH0sXG4gKiAgIF0sXG4gKiB9KVxuICogLy8gTWFwIHsgJ3BpY29sb2cnIOKGkiB7IGNvbmZsaWN0czogWydwaWNvLWxvZyddLCB1bnZlcmlmaWVkOiBbJ3BpY29fbG9nJ10gfSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlbWJsZU1vbmlrZXJQcm9iZXMoeyB2YXJpYW50c0J5TmFtZSwgdmFyaWFudFJlc3VsdHMgfSkge1xuICBjb25zdCBieVZhcmlhbnQgPSBuZXcgTWFwKHZhcmlhbnRSZXN1bHRzLm1hcCgocmVzdWx0KSA9PiBbcmVzdWx0Lm5hbWUsIHJlc3VsdF0pKVxuICBjb25zdCBwcm9iZXMgPSBuZXcgTWFwKClcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFyaWFudHNdIG9mIHZhcmlhbnRzQnlOYW1lKSB7XG4gICAgY29uc3QgY29uZmxpY3RzID0gW11cbiAgICBjb25zdCB1bnZlcmlmaWVkID0gW11cbiAgICBmb3IgKGNvbnN0IHZhcmlhbnQgb2YgdmFyaWFudHMpIHtcbiAgICAgIGNvbnN0IGtpbmQgPSBieVZhcmlhbnQuZ2V0KHZhcmlhbnQpPy5raW5kXG4gICAgICBpZiAoa2luZCA9PT0gJ3Rha2VuJykgY29uZmxpY3RzLnB1c2godmFyaWFudClcbiAgICAgIGVsc2UgaWYgKGtpbmQgPT09ICd1bmtub3duJykgdW52ZXJpZmllZC5wdXNoKHZhcmlhbnQpXG4gICAgfVxuICAgIHByb2Jlcy5zZXQobmFtZSwgeyBjb25mbGljdHMsIHVudmVyaWZpZWQgfSlcbiAgfVxuICByZXR1cm4gcHJvYmVzXG59XG5cbi8qKlxuICogQnVpbGQgdGhlIGZpbmFsIHZlcmRpY3QgbWFwIGJ5IG1lcmdpbmcgdHJpYWdlIHJlc3VsdHMsIHJlZ2lzdHJ5XG4gKiBleGlzdGVuY2UsIGFuZCBtb25pa2VyIHByb2Jlcy5cbiAqXG4gKiBAcGFyYW0ge3tcbiAqICAgdmFsaWQ6IHN0cmluZ1tdLFxuICogICBpbnZhbGlkOiBWZXJkaWN0SW52YWxpZFtdLFxuICogICBleGlzdGVuY2U6IE1hcDxzdHJpbmcsIGltcG9ydCgnLi9yZWdpc3RyeS5tanMnKS5FeGlzdGVuY2U+LFxuICogICBtb25pa2VyUHJvYmVzOiBNYXA8c3RyaW5nLCBNb25pa2VyUHJvYmU+LFxuICogfX0gaW5wdXRcbiAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCBWZXJkaWN0Pn1cbiAqIEBleGFtcGxlXG4gKiBkZWNpZGUoe1xuICogICB2YWxpZDogWydwaWNvbG9nJ10sXG4gKiAgIGludmFsaWQ6IFtdLFxuICogICBleGlzdGVuY2U6IG5ldyBNYXAoW1sncGljb2xvZycsIHsga2luZDogJ2ZyZWUnLCBuYW1lOiAncGljb2xvZycsIHN0YXR1czogNDA0IH1dXSksXG4gKiAgIG1vbmlrZXJQcm9iZXM6IG5ldyBNYXAoW1sncGljb2xvZycsIHsgY29uZmxpY3RzOiBbXSwgdW52ZXJpZmllZDogWydwaWNvX2xvZyddIH1dXSksXG4gKiB9KVxuICogLy8gTWFwIHsgJ3BpY29sb2cnIOKGkiB7IHN0YXR1czogJ3VudmVyaWZpZWQnLCBuYW1lOiAncGljb2xvZycsIHVudmVyaWZpZWQ6IFsncGljb19sb2cnXSwgdW52ZXJpZmllZFRvdGFsOiAxIH0gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaWRlKHsgdmFsaWQsIGludmFsaWQsIGV4aXN0ZW5jZSwgbW9uaWtlclByb2JlcyB9KSB7XG4gIGNvbnN0IHZlcmRpY3RzID0gbmV3IE1hcChpbnZhbGlkLm1hcCgodmVyZGljdCkgPT4gW3ZlcmRpY3QubmFtZSwgdmVyZGljdF0pKVxuICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFsaWQpIHtcbiAgICBjb25zdCBsaXRlcmFsID0gZXhpc3RlbmNlLmdldChuYW1lKVxuICAgIC8vIHZhbGlkIGNhbmRpZGF0ZXMgbXVzdCBoYXZlIGFuIGV4aXN0ZW5jZSBlbnRyeSDigJQgdGhlIHVwc3RyZWFtIHBoYXNlXG4gICAgLy8gY292ZXJzIGV4YWN0bHkgYHZhbGlkYC4gSWYgdGhpcyBmaXJlcywgdGhlIGludmFyaWFudCBicm9rZS5cbiAgICBpZiAoIWxpdGVyYWwpIHRocm93IG5ldyBFcnJvcihgZGVjaWRlOiBtaXNzaW5nIGV4aXN0ZW5jZSByZXN1bHQgZm9yICR7bmFtZX1gKVxuICAgIHZlcmRpY3RzLnNldChcbiAgICAgIG5hbWUsXG4gICAgICBkZWNpZGVPbmUoeyBuYW1lLCBleGlzdGVuY2U6IGxpdGVyYWwsIHByb2JlOiBtb25pa2VyUHJvYmVzLmdldChuYW1lKSA/PyBFTVBUWV9QUk9CRSB9KVxuICAgIClcbiAgfVxuICByZXR1cm4gdmVyZGljdHNcbn1cblxuLyoqXG4gKiBNYXAgb25lIGNhbmRpZGF0ZSdzIGV4aXN0ZW5jZSArIG1vbmlrZXIgcHJvYmUgaW50byBhIHNpbmdsZSBWZXJkaWN0LlxuICogUHVyZSDigJQgbWF0Y2hlcyBleGhhdXN0aXZlbHkgb24gYGV4aXN0ZW5jZS5raW5kYC4gV2l0aGluIGBmcmVlYCwgdGhlXG4gKiB2ZXJkaWN0IGlzIGBtb25pa2VyYCAoZGVmaW5pdGl2ZSBjb2xsaXNpb24pLCBgdW52ZXJpZmllZGAgKHNvbWUgdmFyaWFudFxuICogcHJvYmVzIGZhaWxlZCBhbmQgbm8gY29sbGlzaW9ucyB3ZXJlIGRlZmluaXRpdmVseSBmb3VuZCksIG9yIGBhdmFpbGFibGVgXG4gKiAoYWxsIHZhcmlhbnQgcHJvYmVzIGNvbXBsZXRlZCBjbGVhbmx5KS5cbiAqXG4gKiBAcGFyYW0ge3sgbmFtZTogc3RyaW5nLCBleGlzdGVuY2U6IGltcG9ydCgnLi9yZWdpc3RyeS5tanMnKS5FeGlzdGVuY2UsIHByb2JlOiBNb25pa2VyUHJvYmUgfX0gaW5wdXRcbiAqIEByZXR1cm5zIHtWZXJkaWN0fVxuICogQGV4YW1wbGVcbiAqIGRlY2lkZU9uZSh7XG4gKiAgIG5hbWU6ICdleHRvb2xraXQnLFxuICogICBleGlzdGVuY2U6IHsga2luZDogJ2ZyZWUnLCBuYW1lOiAnZXh0b29sa2l0Jywgc3RhdHVzOiA0MDQgfSxcbiAqICAgcHJvYmU6IHsgY29uZmxpY3RzOiBbXSwgdW52ZXJpZmllZDogW10gfSxcbiAqIH0pXG4gKiAvLyB7IHN0YXR1czogJ2F2YWlsYWJsZScsIG5hbWU6ICdleHRvb2xraXQnIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2lkZU9uZSh7IG5hbWUsIGV4aXN0ZW5jZSwgcHJvYmUgfSkge1xuICByZXR1cm4gbWF0Y2goZXhpc3RlbmNlKVxuICAgIC53aXRoKHsga2luZDogJ3Rha2VuJyB9LCAoKSA9PiAoeyBzdGF0dXM6ICd0YWtlbicsIG5hbWUgfSkpXG4gICAgLndpdGgoeyBraW5kOiAndW5rbm93bicgfSwgKHJlc3VsdCkgPT4gKHtcbiAgICAgIHN0YXR1czogJ3Vua25vd24nLFxuICAgICAgbmFtZSxcbiAgICAgIGh0dHBTdGF0dXM6IHJlc3VsdC5zdGF0dXMsXG4gICAgICAuLi4ocmVzdWx0LmVycm9yICE9PSB1bmRlZmluZWQgJiYgeyBlcnJvcjogcmVzdWx0LmVycm9yIH0pLFxuICAgIH0pKVxuICAgIC53aXRoKHsga2luZDogJ2ZyZWUnIH0sICgpID0+IHtcbiAgICAgIGlmIChwcm9iZS5jb25mbGljdHMubGVuZ3RoID4gMCkgcmV0dXJuIHsgc3RhdHVzOiAnbW9uaWtlcicsIG5hbWUsIGNvbmZsaWN0czogcHJvYmUuY29uZmxpY3RzIH1cbiAgICAgIGlmIChwcm9iZS51bnZlcmlmaWVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXM6ICd1bnZlcmlmaWVkJyxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHVudmVyaWZpZWQ6IHByb2JlLnVudmVyaWZpZWQuc2xpY2UoMCwgVkVSRElDVF9VTlZFUklGSUVEX1NBTVBMRSksXG4gICAgICAgICAgdW52ZXJpZmllZFRvdGFsOiBwcm9iZS51bnZlcmlmaWVkLmxlbmd0aCxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHsgc3RhdHVzOiAnYXZhaWxhYmxlJywgbmFtZSB9XG4gICAgfSlcbiAgICAuZXhoYXVzdGl2ZSgpXG59XG5cbi8qKlxuICogQW5ub3RhdGUgYGF2YWlsYWJsZWAgdmVyZGljdHMgd2l0aCB1cCB0byBgTkVBUl9NQVRDSF9NQVhfTkVJR0hCT1JTYFxuICogdHlwb3NxdWF0LXNoYXBlZCBuZWlnaGJvcnMgZnJvbSB0aGUgcG9wdWxhci1uYW1lcyBjb3JwdXMuIFRoZSBuYW1lIGlzXG4gKiBzdGlsbCBwdWJsaXNoYWJsZTsgdGhpcyBpcyBhIHNvZnQgd2FybmluZyB0aGUgdXNlciBjYW4gb3ZlcnJpZGUuXG4gKlxuICogQHBhcmFtIHt7XG4gKiAgIHZlcmRpY3RzOiBNYXA8c3RyaW5nLCBWZXJkaWN0PixcbiAqICAgY2FuZGlkYXRlczogc3RyaW5nW10sXG4gKiAgIGNvcnB1czogc3RyaW5nW10sXG4gKiAgIG1heERpc3RhbmNlOiBudW1iZXIsXG4gKiB9fSBpbnB1dFxuICogQHJldHVybnMge01hcDxzdHJpbmcsIFZlcmRpY3Q+fVxuICogQGV4YW1wbGVcbiAqIGZsYWdUeXBvc3F1YXRzKHtcbiAqICAgdmVyZGljdHM6IG5ldyBNYXAoW1snZXh0b29sa2l0JywgeyBzdGF0dXM6ICdhdmFpbGFibGUnLCBuYW1lOiAnZXh0b29sa2l0JyB9XV0pLFxuICogICBjYW5kaWRhdGVzOiBbJ2V4dG9vbGtpdCddLFxuICogICBjb3JwdXM6IFsnZXMtdG9vbGtpdCddLFxuICogICBtYXhEaXN0YW5jZTogMixcbiAqIH0pXG4gKiAvLyBNYXAgeyAnZXh0b29sa2l0JyDihpIgeyBzdGF0dXM6ICdhdmFpbGFibGUnLCBuYW1lOiAnZXh0b29sa2l0JywgbmVhck1hdGNoZXM6IFt7IG5hbWU6ICdlcy10b29sa2l0JywgZGlzdGFuY2U6IDEgfV0gfSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGFnVHlwb3NxdWF0cyh7IHZlcmRpY3RzLCBjYW5kaWRhdGVzLCBjb3JwdXMsIG1heERpc3RhbmNlIH0pIHtcbiAgY29uc3QgYW5ub3RhdGVkID0gbmV3IE1hcCh2ZXJkaWN0cylcbiAgZm9yIChjb25zdCBuYW1lIG9mIGNhbmRpZGF0ZXMpIHtcbiAgICBjb25zdCB2ZXJkaWN0ID0gYW5ub3RhdGVkLmdldChuYW1lKVxuICAgIGlmICh2ZXJkaWN0Py5zdGF0dXMgIT09ICdhdmFpbGFibGUnKSBjb250aW51ZVxuICAgIGNvbnN0IG1hdGNoZXMgPSBmaW5kTmVhck1hdGNoZXMobmFtZSwgY29ycHVzLCB7IG1heERpc3RhbmNlIH0pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgYW5ub3RhdGVkLnNldChuYW1lLCB7IC4uLnZlcmRpY3QsIG5lYXJNYXRjaGVzOiBtYXRjaGVzLnNsaWNlKDAsIE5FQVJfTUFUQ0hfTUFYX05FSUdIQk9SUykgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFubm90YXRlZFxufVxuIiwiLy8gbnBtIHJlZ2lzdHJ5IGV4aXN0ZW5jZSBjaGVjayArIGJvdW5kZWQtY29uY3VycmVuY3kgcmVxdWVzdCBwb29sLlxuLy9cbi8vIGBjaGVja09uZWAgcmV0dXJucyBhIGRpc2NyaW1pbmF0ZWQgYEV4aXN0ZW5jZWAgdmFsdWUgKFRha2VuIC8gRnJlZSAvXG4vLyBVbmtub3duKSBzbyBjYWxsZXJzIGNhbiBwYXR0ZXJuLW1hdGNoIGluc3RlYWQgb2YgZGlzcGF0Y2hpbmcgb25cbi8vIGBib29sZWFuIHwgbnVsbGAuIFRoZSBwb29sIHJ1bm5lciBpcyBhIHRpbnkgc3RydWN0dXJlZC1jb25jdXJyZW5jeVxuLy8gcHJpbWl0aXZlIOKAlCBubyBleHRlcm5hbCBzY2hlZHVsZXIgbmVlZGVkIGZvciB0aGUgcmVxdWVzdCB2b2x1bWVzIHdlIGhpdC5cblxuaW1wb3J0IHtcbiAgREVGQVVMVF9DT05DVVJSRU5DWSxcbiAgREVGQVVMVF9SRUdJU1RSWV9CQVNFLFxuICBERUZBVUxUX1JFR0lTVFJZX1RJTUVPVVRfTVMsXG59IGZyb20gJy4vY29uc3RhbnRzLm1qcydcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBUYWtlblxuICogQHByb3BlcnR5IHsndGFrZW4nfSBraW5kXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHsyMDB9IHN0YXR1c1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEZyZWVcbiAqIEBwcm9wZXJ0eSB7J2ZyZWUnfSBraW5kXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHs0MDR9IHN0YXR1c1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVua25vd25cbiAqIEBwcm9wZXJ0eSB7J3Vua25vd24nfSBraW5kXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHN0YXR1cyAtIDAgd2hlbiB0aGUgbmV0d29yayBmYWlsZWQgb3V0cmlnaHRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZXJyb3JdIC0gcHJlc2VudCB3aGVuIHN0YXR1cyA9PT0gMFxuICpcbiAqIEB0eXBlZGVmIHtUYWtlbiB8IEZyZWUgfCBVbmtub3dufSBFeGlzdGVuY2VcbiAqL1xuXG4vKiogQHJldHVybnMge1Rha2VufSAqL1xuY29uc3QgdGFrZW4gPSAobmFtZSkgPT4gKHsga2luZDogJ3Rha2VuJywgbmFtZSwgc3RhdHVzOiAyMDAgfSlcbi8qKiBAcmV0dXJucyB7RnJlZX0gKi9cbmNvbnN0IGZyZWUgPSAobmFtZSkgPT4gKHsga2luZDogJ2ZyZWUnLCBuYW1lLCBzdGF0dXM6IDQwNCB9KVxuLyoqIEByZXR1cm5zIHtVbmtub3dufSAqL1xuY29uc3QgdW5rbm93biA9IChuYW1lLCBzdGF0dXMsIGVycm9yKSA9PlxuICBlcnJvciA9PT0gdW5kZWZpbmVkID8geyBraW5kOiAndW5rbm93bicsIG5hbWUsIHN0YXR1cyB9IDogeyBraW5kOiAndW5rbm93bicsIG5hbWUsIHN0YXR1cywgZXJyb3IgfVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYSBzaW5nbGUgbmFtZSBleGlzdHMgb24gdGhlIHJlZ2lzdHJ5LiBOZXZlciB0aHJvd3Mg4oCUIGV2ZXJ5XG4gKiBvdXRjb21lICgyMDAgLyA0MDQgLyBvdGhlciAvIG5ldHdvcmsgZXJyb3IpIG1hcHMgdG8gYSBkaXNjcmltaW5hdGVkXG4gKiBgRXhpc3RlbmNlYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHt7IGJhc2U/OiBzdHJpbmcsIHRpbWVvdXRNcz86IG51bWJlciwgZmV0Y2hJbXBsPzogdHlwZW9mIGZldGNoIH19IFtvcHRzXVxuICogQHJldHVybnMge1Byb21pc2U8RXhpc3RlbmNlPn1cbiAqIEBleGFtcGxlXG4gKiBhd2FpdCBjaGVja09uZSgncmVhY3QnKSAgICAgICAgLy8geyBraW5kOiAndGFrZW4nLCBuYW1lOiAncmVhY3QnLCBzdGF0dXM6IDIwMCB9XG4gKiBhd2FpdCBjaGVja09uZSgnbm92ZWwteHl6JykgICAgLy8geyBraW5kOiAnZnJlZScsICBuYW1lOiAnbm92ZWwteHl6Jywgc3RhdHVzOiA0MDQgfVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tPbmUobmFtZSwgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IGJhc2UgPSBvcHRzLmJhc2UgPz8gREVGQVVMVF9SRUdJU1RSWV9CQVNFXG4gIGNvbnN0IHRpbWVvdXRNcyA9IG9wdHMudGltZW91dE1zID8/IERFRkFVTFRfUkVHSVNUUllfVElNRU9VVF9NU1xuICBjb25zdCBmZXRjaEltcGwgPSBvcHRzLmZldGNoSW1wbCA/PyBmZXRjaFxuXG4gIGNvbnN0IHVybCA9IGAke2Jhc2V9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfWBcbiAgY29uc3QgY3RybCA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY3RybC5hYm9ydCgpLCB0aW1lb3V0TXMpXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hJbXBsKHVybCwgeyBtZXRob2Q6ICdIRUFEJywgc2lnbmFsOiBjdHJsLnNpZ25hbCB9KVxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAvLyBBIGN1c3RvbSBmZXRjaEltcGwgY2FuIHJldHVybiBub24tUmVzcG9uc2Ugc2hhcGVzIChlLmcuIGEgc3RyZWFtKS5cbiAgICAvLyBHdWFyZCB0aGUgc3RhdHVzIHJlYWQgc28gYW4gdW51c2FibGUgcmVzcG9uc2Ugc3VyZmFjZXMgYXMgYHVua25vd25gXG4gICAgLy8gcmF0aGVyIHRoYW4gZW1pdHRpbmcgYHtzdGF0dXM6IHVuZGVmaW5lZH1gIGFuZCB2aW9sYXRpbmcgdGhlIHR5cGVkZWYuXG4gICAgY29uc3Qgc3RhdHVzID0gcmVzPy5zdGF0dXNcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoc3RhdHVzKSkge1xuICAgICAgcmV0dXJuIHVua25vd24obmFtZSwgMCwgJ2ZldGNoIHJldHVybmVkIHJlc3BvbnNlIHdpdGhvdXQgbnVtZXJpYyBzdGF0dXMnKVxuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSAyMDApIHJldHVybiB0YWtlbihuYW1lKVxuICAgIGlmIChzdGF0dXMgPT09IDQwNCkgcmV0dXJuIGZyZWUobmFtZSlcbiAgICByZXR1cm4gdW5rbm93bihuYW1lLCBzdGF0dXMpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgcmV0dXJuIHVua25vd24obmFtZSwgMCwgZT8ubWVzc2FnZSA/PyBTdHJpbmcoZSkpXG4gIH1cbn1cblxuLyoqXG4gKiBCb3VuZGVkLWNvbmN1cnJlbmN5IHBvb2wgcnVubmVyLiBSdW5zIGB0YXNrc2AgKGZ1bmN0aW9ucyByZXR1cm5pbmcgUHJvbWlzZXMpXG4gKiB3aXRoIGF0IG1vc3QgYGNvbmN1cnJlbmN5YCBpbi1mbGlnaHQgYXQgb25jZS4gUHJlc2VydmVzIGlucHV0IG9yZGVyLlxuICpcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IFByb21pc2U8VD4+fSB0YXNrc1xuICogQHBhcmFtIHtudW1iZXJ9IFtjb25jdXJyZW5jeV1cbiAqIEByZXR1cm5zIHtQcm9taXNlPFRbXT59XG4gKiBAZXhhbXBsZVxuICogY29uc3QgdGFza3MgPSB1cmxzLm1hcCgodXJsKSA9PiAoKSA9PiBmZXRjaCh1cmwpKVxuICogY29uc3QgcmVzcG9uc2VzID0gYXdhaXQgcG9vbCh0YXNrcywgOCkgIC8vIGF0IG1vc3QgOCBpbiBmbGlnaHQsIHJlc3VsdHMgaW4gaW5wdXQgb3JkZXJcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvb2wodGFza3MsIGNvbmN1cnJlbmN5ID0gREVGQVVMVF9DT05DVVJSRU5DWSkge1xuICAvLyBOZWdhdGl2ZSBvciBub24taW50ZWdlciBjb25jdXJyZW5jeSBpcyBhIGNhbGxlciBidWcg4oCUIGZhaWwgbG91ZCByYXRoZXJcbiAgLy8gdGhhbiBydW5uaW5nIG5vdGhpbmcgb3IgcHJvZHVjaW5nIGEgcmVzdWx0cyBhcnJheSB3aXRoIGhvbGVzLlxuICBpZiAoY29uY3VycmVuY3kgIT0gbnVsbCAmJiAoIU51bWJlci5pc0ludGVnZXIoY29uY3VycmVuY3kpIHx8IGNvbmN1cnJlbmN5IDwgMCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBwb29sOiBjb25jdXJyZW5jeSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgKGdvdCAke2NvbmN1cnJlbmN5fSlgKVxuICB9XG4gIC8vIGAwYCBpcyB0cmVhdGVkIGFzIFwidXNlIGRlZmF1bHRcIiDigJQgdGhlIHBhcnNlSW50IHBhdGggaW4gY2hlY2subWpzIGNhblxuICAvLyBzdXJmYWNlIDAgd2hlbiB0aGUgdXNlciBwYXNzZXMgYC0tY29uY3VycmVuY3kgMGAsIHdoaWNoIHdlIHJlYWQgYXNcbiAgLy8gXCJsZXQgdGhlIGxpYnJhcnkgcGlja1wiIHJhdGhlciB0aGFuIFwiZG8gbm90IHJ1blwiLlxuICBjb25zdCBlZmZlY3RpdmVDb25jdXJyZW5jeSA9XG4gICAgTnVtYmVyLmlzSW50ZWdlcihjb25jdXJyZW5jeSkgJiYgY29uY3VycmVuY3kgPiAwID8gY29uY3VycmVuY3kgOiBERUZBVUxUX0NPTkNVUlJFTkNZXG4gIGNvbnN0IHJlc3VsdHMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0YXNrcy5sZW5ndGggfSlcbiAgbGV0IG5leHQgPSAwXG4gIGFzeW5jIGZ1bmN0aW9uIHdvcmtlcigpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgaSA9IG5leHQrK1xuICAgICAgaWYgKGkgPj0gdGFza3MubGVuZ3RoKSByZXR1cm5cbiAgICAgIHJlc3VsdHNbaV0gPSBhd2FpdCB0YXNrc1tpXSgpXG4gICAgfVxuICB9XG4gIGNvbnN0IHdvcmtlcnMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBNYXRoLm1pbihlZmZlY3RpdmVDb25jdXJyZW5jeSwgdGFza3MubGVuZ3RoKSB9LCB3b3JrZXIpXG4gIGF3YWl0IFByb21pc2UuYWxsKHdvcmtlcnMpXG4gIHJldHVybiByZXN1bHRzXG59XG5cbi8qKlxuICogQ2hlY2sgZXhpc3RlbmNlIGZvciBhIGJhdGNoIG9mIG5hbWVzIHdpdGggYm91bmRlZCBjb25jdXJyZW5jeS4gUmVzdWx0c1xuICogYXJlIHJldHVybmVkIGluIGlucHV0IG9yZGVyIHJlZ2FyZGxlc3Mgb2YgY29tcGxldGlvbiBvcmRlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBuYW1lc1xuICogQHBhcmFtIHt7IGNvbmN1cnJlbmN5PzogbnVtYmVyLCBiYXNlPzogc3RyaW5nLCB0aW1lb3V0TXM/OiBudW1iZXIsIGZldGNoSW1wbD86IHR5cGVvZiBmZXRjaCB9fSBbb3B0c11cbiAqIEByZXR1cm5zIHtQcm9taXNlPEV4aXN0ZW5jZVtdPn1cbiAqIEBleGFtcGxlXG4gKiBhd2FpdCBjaGVja01hbnkoWydyZWFjdCcsICd2dWUnLCAnbm92ZWwteHl6J10sIHsgY29uY3VycmVuY3k6IDQgfSlcbiAqIC8vIFt7IGtpbmQ6ICd0YWtlbicsIG5hbWU6ICdyZWFjdCcsIOKApiB9LCB7IGtpbmQ6ICd0YWtlbicsIG5hbWU6ICd2dWUnLCDigKYgfSwgeyBraW5kOiAnZnJlZScsIG5hbWU6ICdub3ZlbC14eXonLCDigKYgfV1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTWFueShuYW1lcywgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IHRhc2tzID0gbmFtZXMubWFwKChuYW1lKSA9PiAoKSA9PiBjaGVja09uZShuYW1lLCBvcHRzKSlcbiAgcmV0dXJuIHBvb2wodGFza3MsIG9wdHMuY29uY3VycmVuY3kgPz8gREVGQVVMVF9DT05DVVJSRU5DWSlcbn1cbiIsIiMhL3Vzci9iaW4vZW52IG5vZGVcbi8vIENMSSBlbnRyeSBmb3IgdGhlIG5wbS1uYW1lciBza2lsbC4gT3JjaGVzdHJhdGVzIHRoZSBwdXJlIHBpcGVsaW5lIHBoYXNlc1xuLy8gZnJvbSBgcGlwZWxpbmUubWpzYCBhZ2FpbnN0IHRoZSBuZXR3b3JrLiBUaGUgcGlwZWxpbmU6XG4vLyAgIHRyaWFnZSDihpIgcHJvYmVSZWdpc3RyeSDihpIgc2VsZWN0TW9uaWtlckNhbmRpZGF0ZXMg4oaSIGNoZWNrTWFueSh2YXJpYW50cylcbi8vICAgICAgICAgIOKGkiBhc3NlbWJsZU1vbmlrZXJQcm9iZXMg4oaSIGRlY2lkZSDihpIgZmxhZ1R5cG9zcXVhdHNcbi8vIGBtYWluYCB0aHJlYWRzIG5hbWVkIGludGVybWVkaWF0ZSB2YWx1ZXMgdGhyb3VnaDsgcHVyZSB0cmFuc2Zvcm1zIGxpdmVcbi8vIGluIHBpcGVsaW5lLm1qcyBhbmQgYXJlIHVuaXQtdGVzdGVkIGluZGVwZW5kZW50bHkuXG5cbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBwYXJzZUFyZ3MgfSBmcm9tICdub2RlOnV0aWwnXG5cbmltcG9ydCB7IGVyciwgaXNFcnIsIGlzT2ssIG9rIH0gZnJvbSAnbWFzc2FtYW4nXG5pbXBvcnQgeyBtYXRjaCwgUCB9IGZyb20gJ21hc3NhbWFuJ1xuXG5pbXBvcnQge1xuICBERUZBVUxUX0NPTkNVUlJFTkNZLFxuICBERUZBVUxUX0xJTUlULFxuICBORUFSX01BVENIX01BWF9ESVNUQU5DRSxcbiAgU0hPUlRMSVNUX0xJTUlULFxufSBmcm9tICcuL2NvbnN0YW50cy5tanMnXG5pbXBvcnQgeyBsb2FkQ29ycHVzIH0gZnJvbSAnLi9jb3JwdXMubWpzJ1xuaW1wb3J0IHsgcGVybXV0ZSwgc2NvcmUgfSBmcm9tICcuL3Blcm11dGUubWpzJ1xuaW1wb3J0IHtcbiAgYXNzZW1ibGVNb25pa2VyUHJvYmVzLFxuICBkZWNpZGUsXG4gIGZsYWdUeXBvc3F1YXRzLFxuICBzZWxlY3RNb25pa2VyQ2FuZGlkYXRlcyxcbiAgdHJpYWdlLFxufSBmcm9tICcuL3BpcGVsaW5lLm1qcydcbmltcG9ydCB7IGNoZWNrTWFueSB9IGZyb20gJy4vcmVnaXN0cnkubWpzJ1xuXG5jb25zdCBVU0FHRSA9IGBucG0tbmFtZXIg4oCUIGZpbmQgYXZhaWxhYmxlIG5wbSBwYWNrYWdlIG5hbWVzXG5cblVzYWdlOlxuICBub2RlIGNoZWNrLm1qcyBbb3B0aW9uc10gW3NlZWRzLi4uXVxuXG5Nb2RlczpcbiAgKHNlZWRzIGdpdmVuKSAgICAgICAgUGVybXV0ZSB0aGUgc2VlZHMsIGNoZWNrIGVhY2ggY2FuZGlkYXRlLlxuICAtLWNoZWNrIDxuYW1lcy4uLj4gICBTa2lwIHBlcm11dGF0aW9uOyBjaGVjayB0aGUgZ2l2ZW4gbmFtZXMgZGlyZWN0bHkuXG4gIC0tc3RkaW4gICAgICAgICAgICAgIFJlYWQgbmFtZXMgZnJvbSBzdGRpbiAob25lIHBlciBsaW5lKTsgc2tpcCBwZXJtdXRhdGlvbi5cbiAgLS1maWxlIDxwYXRoPiAgICAgICAgUmVhZCBuYW1lcyBmcm9tIGZpbGUgKG9uZSBwZXIgbGluZSk7IHNraXAgcGVybXV0YXRpb24uXG5cbk9wdGlvbnM6XG4gIC0tbGltaXQgPG4+ICAgICAgICAgIE1heCBjYW5kaWRhdGVzIHRvIGNoZWNrIChkZWZhdWx0OiAke0RFRkFVTFRfTElNSVR9KS5cbiAgLS1jb25jdXJyZW5jeSA8bj4gICAgUGFyYWxsZWwgcmVnaXN0cnkgcmVxdWVzdHMgKGRlZmF1bHQ6ICR7REVGQVVMVF9DT05DVVJSRU5DWX0pLlxuICAtLXNjb3BlIDxAc2NvcGU+ICAgICBHZW5lcmF0ZSBzY29wZWQgdmFyaWFudHMgKGRlZmF1bHQ6IHVuc2NvcGVkKS5cbiAgLS1uby1tb25pa2VyICAgICAgICAgU2tpcCBtb25pa2VyIGNvbGxpc2lvbiBjaGVjayAodGhlIG5wbSBwdWJsaXNoLXRpbWUgcnVsZSkuXG4gIC0tZXhoYXVzdGl2ZSAgICAgICAgIFdpZGVyIDItaW5zZXJ0aW9uIG1vbmlrZXIgdmFyaWFudHMgKHNsb3dlciwgbW9yZSB0aG9yb3VnaCkuXG4gIC0tbm8tbmVhci1tYXRjaCAgICAgIFNraXAgdHlwb3NxdWF0LXN0eWxlIHNpbWlsYXJpdHkgY2hlY2sgYWdhaW5zdCBwb3B1bGFyIHBhY2thZ2VzLlxuICAtLW5lYXItZGlzdGFuY2UgPG4+ICBNYXggZWRpdCBkaXN0YW5jZSBmb3IgbmVhci1tYXRjaCB3YXJuaW5ncyAoZGVmYXVsdDogJHtORUFSX01BVENIX01BWF9ESVNUQU5DRX0pLlxuICAtLWpzb24gICAgICAgICAgICAgICBPdXRwdXQgSlNPTiBpbnN0ZWFkIG9mIHRleHQuXG4gIC0taGVscCwgLWggICAgICAgICAgIFNob3cgdGhpcyBoZWxwLlxuXG5OYW1lcyB0aGF0IGxvb2sgbGlrZSBvcHRpb25zIChsZWFkaW5nIGh5cGhlbikgbXVzdCBiZSBwYXNzZWQgYWZ0ZXIgYSBsaXRlcmFsXG5cXGAtLVxcYCBzZXBhcmF0b3I6XG4gIG5vZGUgY2hlY2subWpzIC0tY2hlY2sgLS0gLWZvbyAuYmFyIF9iYXpcblxuVmVyZGljdHM6XG4gIOKckyBhdmFpbGFibGUgICAgZnJlZSBvbiByZWdpc3RyeSArIG5vIG1vbmlrZXIgY29sbGlzaW9uIChtYXkgY2FycnkgbmVhci1tYXRjaCB3YXJuaW5nKVxuICDimqAgbW9uaWtlciAgICAgIGZyZWUgbGl0ZXJhbGx5IGJ1dCBub3JtYWxpemVkIGZvcm0gY29sbGlkZXMg4oCUIG5wbSBwdWJsaXNoIHdpbGwgcmVqZWN0XG4gIOKaoCB1bnZlcmlmaWVkICAgZnJlZSBsaXRlcmFsbHkgYnV0IG1vbmlrZXIgY2hlY2sgaW5jb21wbGV0ZSAoc29tZSB2YXJpYW50cyBjb3VsZG4ndCBiZSBwcm9iZWQpXG4gIOKclyB0YWtlbiAgICAgICAgdGhlIGV4YWN0IG5hbWUgaXMgcHVibGlzaGVkXG4gIOKclyBpbnZhbGlkICAgICAgZmFpbHMgc3ludGFjdGljIHJ1bGVzXG4gID8gdW5rbm93biAgICAgIHJlZ2lzdHJ5IHJldHVybmVkIGEgbm9uLTIwMC80MDQgc3RhdHVzIGZvciB0aGUgbGl0ZXJhbCBuYW1lXG5cbkxpbWl0YXRpb246XG4gIFRoZSBtb25pa2VyIGNoZWNrIGVudW1lcmF0ZXMgMS0gYW5kIDItc2VwYXJhdG9yIHZhcmlhbnRzLiAzKyBtb3JwaGVtZVxuICBzcGxpdHMgKGUuZy4gXFxgZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1xcYCB2cyBcXGBlc2xpbnRwbHVnaW5yZWFjdGhvb2tzXFxgKVxuICBhcmUgTk9UIGNvdmVyZWQgZXZlbiB3aXRoIC0tZXhoYXVzdGl2ZS4gRm9yIGF1dGhvcml0YXRpdmUgcHJlLWZsaWdodCBvblxuICBtdWx0aS1tb3JwaGVtZSBuYW1lcywgcnVuIFxcYG5wbSBwdWJsaXNoIC0tZHJ5LXJ1blxcYC5cblxuRXhhbXBsZXM6XG4gIG5vZGUgY2hlY2subWpzIHRpbnkgbG9nXG4gIG5vZGUgY2hlY2subWpzIC0tY2hlY2sgcGljb2xvZyBtaWNyb2xvZyBqc2xvZ1xuICBlY2hvIFwicGljb2xvZ1wiIHwgbm9kZSBjaGVjay5tanMgLS1zdGRpblxuICBub2RlIGNoZWNrLm1qcyAtLXNjb3BlIEBtZSBsb2dnZXIgZmFzdFxuYFxuXG5jb25zdCBTWU1CT0xTID0ge1xuICBhdmFpbGFibGU6ICfinJMnLFxuICB0YWtlbjogJ+KclycsXG4gIG1vbmlrZXI6ICfimqAnLFxuICB1bnZlcmlmaWVkOiAn4pqgJyxcbiAgaW52YWxpZDogJ+KclycsXG4gIHVua25vd246ICc/Jyxcbn1cbmNvbnN0IERJVklERVIgPSAn4pSAJy5yZXBlYXQoNjQpXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ29uZmlnXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBwb3NpdGlvbmFsc1xuICogQHByb3BlcnR5IHtib29sZWFufSBzaG91bGRTa2lwUGVybXV0ZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gaW5wdXROYW1lc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGxpbWl0XG4gKiBAcHJvcGVydHkge251bWJlcn0gY29uY3VycmVuY3lcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc2NvcGVdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzTW9uaWtlckVuYWJsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNFeGhhdXN0aXZlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzTmVhck1hdGNoRW5hYmxlZFxuICogQHByb3BlcnR5IHtudW1iZXJ9IG5lYXJEaXN0YW5jZVxuICogQHByb3BlcnR5IHtib29sZWFufSBzaG91bGRPdXRwdXRKc29uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3VsZFNob3dIZWxwXG4gKi9cblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgY29uZmlnID0gcGFyc2VDbGkocHJvY2Vzcy5hcmd2LnNsaWNlKDIpKVxuICBpZiAoY29uZmlnLnNob3VsZFNob3dIZWxwKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoVVNBR0UpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBwcmVwYXJlZCA9IHByZXBhcmVDYW5kaWRhdGVzKGNvbmZpZylcbiAgaWYgKGlzRXJyKHByZXBhcmVkKSkgcmV0dXJuIGRpZShwcmVwYXJlZC5lcnJvci5tZXNzYWdlKVxuICBjb25zdCB7IHNlZWRzLCBjYW5kaWRhdGVzLCBjb25zaWRlcmVkQ291bnQgfSA9IHByZXBhcmVkLnZhbHVlXG5cbiAgY29uc3QgY29ycHVzID0gY29uZmlnLmlzTmVhck1hdGNoRW5hYmxlZCA/IGxvYWRDb3JwdXMoKSA6IGVycihuZXcgRXJyb3IoJ2Rpc2FibGVkJykpXG4gIGNvbnN0IGhhc0NvcnB1cyA9IGlzT2soY29ycHVzKVxuXG4gIGNvbnN0IHsgdmFsaWQsIGludmFsaWQsIHNjb3BlZCB9ID0gdHJpYWdlKGNhbmRpZGF0ZXMpXG4gIGNvbnN0IGV4aXN0ZW5jZSA9IGF3YWl0IHByb2JlUmVnaXN0cnkodmFsaWQsIGNvbmZpZylcbiAgY29uc3QgbW9uaWtlclByb2JlcyA9IGNvbmZpZy5pc01vbmlrZXJFbmFibGVkXG4gICAgPyBhd2FpdCBwcm9iZU1vbmlrZXJDb2xsaXNpb25zKHsgdmFsaWQsIHNjb3BlZCwgZXhpc3RlbmNlLCBjb25maWcgfSlcbiAgICA6IG5ldyBNYXAoKVxuXG4gIGNvbnN0IGRlY2lkZWQgPSBkZWNpZGUoeyB2YWxpZCwgaW52YWxpZCwgZXhpc3RlbmNlLCBtb25pa2VyUHJvYmVzIH0pXG4gIGNvbnN0IGFubm90YXRlZCA9IGhhc0NvcnB1c1xuICAgID8gZmxhZ1R5cG9zcXVhdHMoe1xuICAgICAgICB2ZXJkaWN0czogZGVjaWRlZCxcbiAgICAgICAgY2FuZGlkYXRlcyxcbiAgICAgICAgY29ycHVzOiBjb3JwdXMudmFsdWUubmFtZXMsXG4gICAgICAgIG1heERpc3RhbmNlOiBjb25maWcubmVhckRpc3RhbmNlLFxuICAgICAgfSlcbiAgICA6IGRlY2lkZWRcblxuICBjb25zdCBvdXRwdXQgPSBzaGFwZU91dHB1dCh7XG4gICAgbW9kZTogY29uZmlnLnNob3VsZFNraXBQZXJtdXRlID8gJ2NoZWNrJyA6ICdmaW5kJyxcbiAgICBzZWVkcyxcbiAgICBjb25zaWRlcmVkQ291bnQsXG4gICAgY2FuZGlkYXRlcyxcbiAgICB2ZXJkaWN0czogYW5ub3RhdGVkLFxuICAgIGlzTW9uaWtlckVuYWJsZWQ6IGNvbmZpZy5pc01vbmlrZXJFbmFibGVkLFxuICAgIGlzRXhoYXVzdGl2ZTogY29uZmlnLmlzRXhoYXVzdGl2ZSxcbiAgICBpc05lYXJNYXRjaEVuYWJsZWQ6IGNvbmZpZy5pc05lYXJNYXRjaEVuYWJsZWQgJiYgaGFzQ29ycHVzLFxuICB9KVxuXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFxuICAgIGNvbmZpZy5zaG91bGRPdXRwdXRKc29uID8gYCR7SlNPTi5zdHJpbmdpZnkob3V0cHV0LCBudWxsLCAyKX1cXG5gIDogcmVuZGVyVGV4dChvdXRwdXQpXG4gIClcbn1cblxuLyoqXG4gKiBQYXJzZSBDTEkgYXJndiBpbnRvIGEgc3RydWN0dXJlZCBjb25maWcuIFRocm93cyBub3RoaW5nIOKAlCBpbnZhbGlkIENMSVxuICogdXNhZ2Ugc3VyZmFjZXMgbGF0ZXIgYXMgYW4gZW1wdHkgaW5wdXQgb3IgYSBgcHJlcGFyZUNhbmRpZGF0ZXNgIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IGFyZ3ZcbiAqIEByZXR1cm5zIHtDb25maWd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZUNsaShhcmd2KSB7XG4gIGNvbnN0IHsgdmFsdWVzLCBwb3NpdGlvbmFscyB9ID0gcGFyc2VBcmdzKHtcbiAgICBhcmdzOiBhcmd2LFxuICAgIGFsbG93UG9zaXRpb25hbHM6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgY2hlY2s6IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgc3RkaW46IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgZmlsZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgbGltaXQ6IHsgdHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6IFN0cmluZyhERUZBVUxUX0xJTUlUKSB9LFxuICAgICAgY29uY3VycmVuY3k6IHsgdHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6IFN0cmluZyhERUZBVUxUX0NPTkNVUlJFTkNZKSB9LFxuICAgICAgc2NvcGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICduby1tb25pa2VyJzogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICBleGhhdXN0aXZlOiB7IHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfSxcbiAgICAgICduby1uZWFyLW1hdGNoJzogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICAnbmVhci1kaXN0YW5jZSc6IHsgdHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6IFN0cmluZyhORUFSX01BVENIX01BWF9ESVNUQU5DRSkgfSxcbiAgICAgIGpzb246IHsgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgICAgaGVscDogeyB0eXBlOiAnYm9vbGVhbicsIHNob3J0OiAnaCcsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgfSxcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHNob3VsZFNob3dIZWxwOiB2YWx1ZXMuaGVscCxcbiAgICBwb3NpdGlvbmFscyxcbiAgICBzaG91bGRTa2lwUGVybXV0ZTogdmFsdWVzLmNoZWNrIHx8IHZhbHVlcy5zdGRpbiB8fCBCb29sZWFuKHZhbHVlcy5maWxlKSxcbiAgICBpbnB1dE5hbWVzOiBnYXRoZXJJbnB1dE5hbWVzKHZhbHVlcyksXG4gICAgbGltaXQ6IHBhcnNlSW50T3IodmFsdWVzLmxpbWl0LCBERUZBVUxUX0xJTUlUKSxcbiAgICBjb25jdXJyZW5jeTogcGFyc2VJbnRPcih2YWx1ZXMuY29uY3VycmVuY3ksIERFRkFVTFRfQ09OQ1VSUkVOQ1kpLFxuICAgIHNjb3BlOiB2YWx1ZXMuc2NvcGUsXG4gICAgaXNNb25pa2VyRW5hYmxlZDogIXZhbHVlc1snbm8tbW9uaWtlciddLFxuICAgIGlzRXhoYXVzdGl2ZTogdmFsdWVzLmV4aGF1c3RpdmUsXG4gICAgaXNOZWFyTWF0Y2hFbmFibGVkOiAhdmFsdWVzWyduby1uZWFyLW1hdGNoJ10sXG4gICAgbmVhckRpc3RhbmNlOiBwYXJzZUludE9yKHZhbHVlc1snbmVhci1kaXN0YW5jZSddLCBORUFSX01BVENIX01BWF9ESVNUQU5DRSksXG4gICAgc2hvdWxkT3V0cHV0SnNvbjogdmFsdWVzLmpzb24sXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2F0aGVySW5wdXROYW1lcyh2YWx1ZXMpIHtcbiAgaWYgKHZhbHVlcy5zdGRpbikgcmV0dXJuIHJlYWRMaXN0RnJvbVN0ZGluKClcbiAgaWYgKHZhbHVlcy5maWxlKSB7XG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyh2YWx1ZXMuZmlsZSwgJ3V0ZjgnKVxuICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgLm1hcCgobGluZSkgPT4gbGluZS50cmltKCkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gIH1cbiAgcmV0dXJuIFtdXG59XG5cbi8qKlxuICogUmVhZCBuZXdsaW5lLXNlcGFyYXRlZCBuYW1lcyBmcm9tIHN0ZGluLiBSZXR1cm5zIGBbXWAgb25seSB3aGVuIG5vdGhpbmdcbiAqIGlzIHBpcGVkIChpbnRlcmFjdGl2ZSBUVFkpLiBSZWFsIHJlYWQgZmFpbHVyZXMgYnViYmxlIOKAlCBzaWxlbnQgY2F0Y2hlc1xuICogbWFzayBkYXRhLWxvc3MgYnVncyB3ZSdkIHJhdGhlciBzZWUgdGhhbiBzd2FsbG93LlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlYWRMaXN0RnJvbVN0ZGluKCkge1xuICBpZiAocHJvY2Vzcy5zdGRpbi5pc1RUWSkgcmV0dXJuIFtdXG4gIHJldHVybiByZWFkRmlsZVN5bmMoMCwgJ3V0ZjgnKVxuICAgIC5zcGxpdCgnXFxuJylcbiAgICAubWFwKChsaW5lKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG59XG5cbmZ1bmN0aW9uIHBhcnNlSW50T3IocmF3LCBmYWxsYmFjaykge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChyYXcsIDEwKVxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgJiYgcGFyc2VkID4gMCA/IHBhcnNlZCA6IGZhbGxiYWNrXG59XG5cbi8qKlxuICogUmVzb2x2ZSB0aGUgY2FuZGlkYXRlIGxpc3QgZnJvbSB0aGUgQ0xJIGlucHV0cy4gSW4gYGNoZWNrYCBtb2RlIHRoZVxuICogcG9zaXRpb25hbHMgKyBzdGRpbi9maWxlIGxpbmVzIGFyZSB0aGUgY2FuZGlkYXRlczsgaW4gYGZpbmRgIG1vZGUgdGhlXG4gKiBwb3NpdGlvbmFscyBhcmUgc2VlZHMgdGhhdCB3ZSBwZXJtdXRlLiBFaXRoZXIgcGF0aCByYW5rcyBhbmQgdHJpbXMgdG9cbiAqIGBjb25maWcubGltaXRgLlxuICpcbiAqIGBjb25zaWRlcmVkQ291bnRgIGlzIHRoZSB0b3RhbCBjYW5kaWRhdGUgc3BhY2UgYmVmb3JlIHRoZSBgLS1saW1pdGBcbiAqIHRyaW0g4oCUIGlucHV0IGNvdW50IGluIGNoZWNrIG1vZGUsIHBlcm11dGF0aW9uIGNvdW50IGluIGZpbmQgbW9kZS5cbiAqXG4gKiBAcGFyYW0ge0NvbmZpZ30gY29uZmlnXG4gKiBAcmV0dXJucyB7aW1wb3J0KCdtYXNzYW1hbicpLlJlc3VsdDx7c2VlZHM6IHN0cmluZ1tdLCBjYW5kaWRhdGVzOiBzdHJpbmdbXSwgY29uc2lkZXJlZENvdW50OiBudW1iZXJ9LCBFcnJvcj59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwcmVwYXJlQ2FuZGlkYXRlcyhjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5zaG91bGRTa2lwUGVybXV0ZSkge1xuICAgIGNvbnN0IHN1cHBsaWVkID0gWy4uLmNvbmZpZy5pbnB1dE5hbWVzLCAuLi5jb25maWcucG9zaXRpb25hbHNdXG4gICAgICAubWFwKChuYW1lKSA9PiBuYW1lLnRyaW0oKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICBpZiAoc3VwcGxpZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZXJyKG5ldyBFcnJvcignbm8gbmFtZXMgcHJvdmlkZWQg4oCUIHBhc3MgbmFtZXMgYXMgYXJncywgdmlhIC0tc3RkaW4sIG9yIHZpYSAtLWZpbGUnKSlcbiAgICB9XG4gICAgY29uc3QgZGVkdXBlZCA9IFsuLi5uZXcgU2V0KHN1cHBsaWVkKV1cbiAgICByZXR1cm4gb2soe1xuICAgICAgc2VlZHM6IFtdLFxuICAgICAgY2FuZGlkYXRlczogdHJpbShkZWR1cGVkLCBbXSwgY29uZmlnLmxpbWl0KSxcbiAgICAgIGNvbnNpZGVyZWRDb3VudDogZGVkdXBlZC5sZW5ndGgsXG4gICAgfSlcbiAgfVxuXG4gIGlmIChjb25maWcucG9zaXRpb25hbHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGVycihuZXcgRXJyb3IoJ25vIHNlZWRzIHByb3ZpZGVkLiBTZWUgLS1oZWxwLicpKVxuICB9XG4gIGNvbnN0IHNlZWRzID0gY29uZmlnLnBvc2l0aW9uYWxzXG4gIGNvbnN0IHBlcm11dGVkQ2FuZGlkYXRlcyA9IFsuLi5uZXcgU2V0KHBlcm11dGUoc2VlZHMsIHsgc2NvcGU6IGNvbmZpZy5zY29wZSB9KSldXG4gIGlmIChwZXJtdXRlZENhbmRpZGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gcGVybXV0ZSgpIHJlamVjdHMgbm9uLWFscGhhbnVtZXJpYyB0b2tlbnMuIElmIGV2ZXJ5IHNlZWQgZ290IGZpbHRlcmVkLFxuICAgIC8vIGdpdmUgdGhlIHVzZXIgYWN0aW9uYWJsZSBmZWVkYmFjayBpbnN0ZWFkIG9mIGEgc2lsZW50IHplcm8tcmVzdWx0IHJ1bi5cbiAgICAvLyBVc2UgYC0tIGAgYmVmb3JlIHRoZSBuYW1lcyBzbyB0aGUgbGVhZGluZy1oeXBoZW4gLyBsZWFkaW5nLWRvdCBjYXNlc1xuICAgIC8vIG1ha2UgaXQgdGhyb3VnaCBwYXJzZUFyZ3MgYXMgcG9zaXRpb25hbHMuXG4gICAgcmV0dXJuIGVycihcbiAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgYGFsbCBzZWVkcyB3ZXJlIGZpbHRlcmVkIChzZWVkcyBtdXN0IGJlIGFscGhhbnVtZXJpYyDigJQgdHJ5IGAgK1xuICAgICAgICAgIGBcXGAtLWNoZWNrIC0tICR7c2VlZHMuam9pbignICcpfVxcYCB0byBjaGVjayB0aGVtIGFzIGxpdGVyYWwgbmFtZXMgaW5zdGVhZClgXG4gICAgICApXG4gICAgKVxuICB9XG4gIHJldHVybiBvayh7XG4gICAgc2VlZHMsXG4gICAgY2FuZGlkYXRlczogdHJpbShwZXJtdXRlZENhbmRpZGF0ZXMsIHNlZWRzLCBjb25maWcubGltaXQpLFxuICAgIGNvbnNpZGVyZWRDb3VudDogcGVybXV0ZWRDYW5kaWRhdGVzLmxlbmd0aCxcbiAgfSlcbn1cblxuZnVuY3Rpb24gdHJpbShjYW5kaWRhdGVzLCBzZWVkcywgbGltaXQpIHtcbiAgY29uc3QgcmFua2VkID0gWy4uLmNhbmRpZGF0ZXNdLnNvcnQoKGEsIGIpID0+IHNjb3JlKGEsIHNlZWRzKSAtIHNjb3JlKGIsIHNlZWRzKSlcbiAgcmV0dXJuIHJhbmtlZC5sZW5ndGggPiBsaW1pdCA/IHJhbmtlZC5zbGljZSgwLCBsaW1pdCkgOiByYW5rZWRcbn1cblxuLyoqXG4gKiBIRUFEIGVhY2ggbmFtZSBpbiBwYXJhbGxlbCBhZ2FpbnN0IHRoZSBucG0gcmVnaXN0cnkuIFJldHVybnMgYSBsb29rdXBcbiAqIG1hcCBrZXllZCBieSBuYW1lOyB2YWx1ZXMgYXJlIGRpc2NyaW1pbmF0ZWQgYEV4aXN0ZW5jZWAgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IG5hbWVzXG4gKiBAcGFyYW0ge3sgY29uY3VycmVuY3k6IG51bWJlciB9fSBjb25maWdcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1hcDxzdHJpbmcsIGltcG9ydCgnLi9yZWdpc3RyeS5tanMnKS5FeGlzdGVuY2U+Pn1cbiAqIEBwcml2YXRlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHByb2JlUmVnaXN0cnkobmFtZXMsIGNvbmZpZykge1xuICBjb25zdCByZXN1bHRzID0gYXdhaXQgY2hlY2tNYW55KG5hbWVzLCB7IGNvbmN1cnJlbmN5OiBjb25maWcuY29uY3VycmVuY3kgfSlcbiAgcmV0dXJuIG5ldyBNYXAocmVzdWx0cy5tYXAoKHJlc3VsdCkgPT4gW3Jlc3VsdC5uYW1lLCByZXN1bHRdKSlcbn1cblxuLyoqXG4gKiBOZXR3b3JrLWJvdW5kIGhhbGYgb2YgdGhlIG1vbmlrZXIgY2hlY2suIFRoZSBwdXJlIHNlbGVjdGlvbiArIGFzc2VtYmx5XG4gKiBsaXZlcyBpbiBwaXBlbGluZS5tanM7IHRoaXMgZnVuY3Rpb24gYnJpZGdlcyB0aGVtIHdpdGggdGhlIHJlZ2lzdHJ5XG4gKiByb3VuZC10cmlwIGluIHRoZSBtaWRkbGUuXG4gKlxuICogQHBhcmFtIHt7XG4gKiAgIHZhbGlkOiBzdHJpbmdbXSxcbiAqICAgc2NvcGVkOiBTZXQ8c3RyaW5nPixcbiAqICAgZXhpc3RlbmNlOiBNYXA8c3RyaW5nLCBpbXBvcnQoJy4vcmVnaXN0cnkubWpzJykuRXhpc3RlbmNlPixcbiAqICAgY29uZmlnOiB7IGlzRXhoYXVzdGl2ZTogYm9vbGVhbiwgY29uY3VycmVuY3k6IG51bWJlciB9LFxuICogfX0gaW5wdXRcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1hcDxzdHJpbmcsIGltcG9ydCgnLi9waXBlbGluZS5tanMnKS5Nb25pa2VyUHJvYmU+Pn1cbiAqIEBwcml2YXRlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHByb2JlTW9uaWtlckNvbGxpc2lvbnMoeyB2YWxpZCwgc2NvcGVkLCBleGlzdGVuY2UsIGNvbmZpZyB9KSB7XG4gIGNvbnN0IHsgdmFyaWFudHNCeU5hbWUsIGFsbFZhcmlhbnRzIH0gPSBzZWxlY3RNb25pa2VyQ2FuZGlkYXRlcyh7XG4gICAgdmFsaWQsXG4gICAgc2NvcGVkLFxuICAgIGV4aXN0ZW5jZSxcbiAgICBpc0V4aGF1c3RpdmU6IGNvbmZpZy5pc0V4aGF1c3RpdmUsXG4gIH0pXG4gIGNvbnN0IHZhcmlhbnRSZXN1bHRzID0gYXdhaXQgY2hlY2tNYW55KFsuLi5hbGxWYXJpYW50c10sIHsgY29uY3VycmVuY3k6IGNvbmZpZy5jb25jdXJyZW5jeSB9KVxuICByZXR1cm4gYXNzZW1ibGVNb25pa2VyUHJvYmVzKHsgdmFyaWFudHNCeU5hbWUsIHZhcmlhbnRSZXN1bHRzIH0pXG59XG5cbmZ1bmN0aW9uIHNoYXBlT3V0cHV0KHtcbiAgbW9kZSxcbiAgc2VlZHMsXG4gIGNvbnNpZGVyZWRDb3VudCxcbiAgY2FuZGlkYXRlcyxcbiAgdmVyZGljdHMsXG4gIGlzTW9uaWtlckVuYWJsZWQsXG4gIGlzRXhoYXVzdGl2ZSxcbiAgaXNOZWFyTWF0Y2hFbmFibGVkLFxufSkge1xuICByZXR1cm4ge1xuICAgIG1vZGUsXG4gICAgc2VlZHMsXG4gICAgY29uc2lkZXJlZDogY29uc2lkZXJlZENvdW50LFxuICAgIGNoZWNrZWQ6IGNhbmRpZGF0ZXMubGVuZ3RoLFxuICAgIGlzTW9uaWtlckVuYWJsZWQsXG4gICAgaXNFeGhhdXN0aXZlLFxuICAgIGlzTmVhck1hdGNoRW5hYmxlZCxcbiAgICByZXN1bHRzOiBjYW5kaWRhdGVzLm1hcCgobmFtZSkgPT4gdmVyZGljdHMuZ2V0KG5hbWUpKS5maWx0ZXIoQm9vbGVhbiksXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVGV4dChvdXRwdXQpIHtcbiAgY29uc3QgaGVhZGVyID1cbiAgICBvdXRwdXQubW9kZSA9PT0gJ2ZpbmQnXG4gICAgICA/IFtgc2VlZHM6ICAgICR7b3V0cHV0LnNlZWRzLmpvaW4oJywgJyl9YCwgYGNvbnNpZGVyZWQ6ICR7b3V0cHV0LmNvbnNpZGVyZWR9IGNhbmRpZGF0ZXNgXVxuICAgICAgOiBbXVxuICBoZWFkZXIucHVzaChcbiAgICBgY2hlY2tlZDogICR7b3V0cHV0LmNoZWNrZWR9IGNhbmRpZGF0ZXNgLFxuICAgIG91dHB1dC5pc01vbmlrZXJFbmFibGVkXG4gICAgICA/IGBtb25pa2VyOiAgJHtvdXRwdXQuaXNFeGhhdXN0aXZlID8gJ2V4aGF1c3RpdmUnIDogJ3N0YW5kYXJkJ30gY29sbGlzaW9uIGNoZWNrYFxuICAgICAgOiAnbW9uaWtlcjogIHNraXBwZWQgKC0tbm8tbW9uaWtlciknLFxuICAgIG91dHB1dC5pc05lYXJNYXRjaEVuYWJsZWRcbiAgICAgID8gJ25lYXI6ICAgICB0eXBvc3F1YXQgc2ltaWxhcml0eSBhZ2FpbnN0IHBvcHVsYXIgcGFja2FnZXMnXG4gICAgICA6ICduZWFyOiAgICAgc2tpcHBlZCAoLS1uby1uZWFyLW1hdGNoKScsXG4gICAgRElWSURFUlxuICApXG5cbiAgY29uc3Qgcm93cyA9IG91dHB1dC5yZXN1bHRzLm1hcChyZW5kZXJWZXJkaWN0TGluZSlcbiAgY29uc3Qgd2lubmVycyA9IG91dHB1dC5yZXN1bHRzLmZpbHRlcigodmVyZGljdCkgPT4gdmVyZGljdC5zdGF0dXMgPT09ICdhdmFpbGFibGUnKVxuICBjb25zdCBjbGVhbiA9IHdpbm5lcnMuZmlsdGVyKCh2ZXJkaWN0KSA9PiAhdmVyZGljdC5uZWFyTWF0Y2hlcz8ubGVuZ3RoKVxuICBjb25zdCByaXNreSA9IHdpbm5lcnMuZmlsdGVyKCh2ZXJkaWN0KSA9PiB2ZXJkaWN0Lm5lYXJNYXRjaGVzPy5sZW5ndGgpXG4gIGNvbnN0IHVudmVyaWZpZWQgPSBvdXRwdXQucmVzdWx0cy5maWx0ZXIoKHZlcmRpY3QpID0+IHZlcmRpY3Quc3RhdHVzID09PSAndW52ZXJpZmllZCcpXG5cbiAgY29uc3QgY2xlYW5MYWJlbCA9IG91dHB1dC5pc01vbmlrZXJFbmFibGVkXG4gICAgPyAnQXZhaWxhYmxlICsgbW9uaWtlci1jbGVhciArIG5vIHR5cG9zcXVhdCBzaGFwZSdcbiAgICA6ICdBdmFpbGFibGUgKyBubyB0eXBvc3F1YXQgc2hhcGUgKG1vbmlrZXIgY2hlY2sgc2tpcHBlZCknXG5cbiAgY29uc3Qgc2VjdGlvbnMgPSBbXG4gICAgcmVuZGVyU2hvcnRsaXN0KGNsZWFuTGFiZWwsIGNsZWFuLCAod2lubmVyKSA9PiBgICDigKIgJHt3aW5uZXIubmFtZX1gKSxcbiAgICByZW5kZXJTaG9ydGxpc3QoXG4gICAgICAnQXZhaWxhYmxlIGJ1dCB0eXBvc3F1YXQtc2hhcGVkJyxcbiAgICAgIHJpc2t5LFxuICAgICAgKHdpbm5lcikgPT4gYCAg4oCiICR7d2lubmVyLm5hbWV9ICB+ICAke2Zvcm1hdE5lYXJNYXRjaGVzKHdpbm5lci5uZWFyTWF0Y2hlcyl9YCxcbiAgICAgICcg4oCUIHB1Ymxpc2hhYmxlLCBidXQgY2xvc2UgdG8gcG9wdWxhciBwYWNrYWdlcydcbiAgICApLFxuICAgIHJlbmRlclNob3J0bGlzdChcbiAgICAgICdNb25pa2VyIGNoZWNrIGluY29tcGxldGUnLFxuICAgICAgdW52ZXJpZmllZCxcbiAgICAgICh2ZXJkaWN0KSA9PlxuICAgICAgICBgICDigKIgJHt2ZXJkaWN0Lm5hbWV9ICAoJHt2ZXJkaWN0LnVudmVyaWZpZWRUb3RhbH0gdmFyaWFudCR7dmVyZGljdC51bnZlcmlmaWVkVG90YWwgPT09IDEgPyAnJyA6ICdzJ30gbm90IHByb2JlZClgLFxuICAgICAgJyDigJQgdHJ5IGFnYWluIG9yIHJ1biBgbnBtIHB1Ymxpc2ggLS1kcnktcnVuYCdcbiAgICApLFxuICBdLmZpbHRlcihCb29sZWFuKVxuXG4gIGNvbnN0IGZvb3RlciA9XG4gICAgY2xlYW4ubGVuZ3RoID09PSAwICYmIHJpc2t5Lmxlbmd0aCA9PT0gMCAmJiB1bnZlcmlmaWVkLmxlbmd0aCA9PT0gMFxuICAgICAgPyBbRElWSURFUiwgJ05vIGF2YWlsYWJsZSArIG1vbmlrZXItY2xlYXIgY2FuZGlkYXRlcy4gVHJ5IGJyb2FkZXIgc2VlZHMgb3IgLS1zY29wZS4nXVxuICAgICAgOiBbXVxuXG4gIHJldHVybiBbLi4uaGVhZGVyLCAuLi5yb3dzLCAuLi5zZWN0aW9ucywgLi4uZm9vdGVyXS5qb2luKCdcXG4nKSArICdcXG4nXG59XG5cbmZ1bmN0aW9uIHJlbmRlclZlcmRpY3RMaW5lKHZlcmRpY3QpIHtcbiAgY29uc3QgdGFnID0gYCR7U1lNQk9MU1t2ZXJkaWN0LnN0YXR1c119ICR7dmVyZGljdC5zdGF0dXN9YC5wYWRFbmQoMTQpXG4gIGNvbnN0IG5hbWUgPSB2ZXJkaWN0Lm5hbWUucGFkRW5kKDI4KVxuICBjb25zdCBkZXRhaWwgPSBtYXRjaCh2ZXJkaWN0KVxuICAgIC53aXRoKHsgc3RhdHVzOiAndGFrZW4nIH0sICgpID0+ICcnKVxuICAgIC53aXRoKHsgc3RhdHVzOiAnbW9uaWtlcicgfSwgKHJlc3VsdCkgPT4gYGNvbGxpZGVzIHdpdGg6ICR7cmVzdWx0LmNvbmZsaWN0cy5qb2luKCcsICcpfWApXG4gICAgLndpdGgoXG4gICAgICB7IHN0YXR1czogJ3VudmVyaWZpZWQnIH0sXG4gICAgICAocmVzdWx0KSA9PlxuICAgICAgICBgbW9uaWtlciBpbmNvbXBsZXRlOiAke3Jlc3VsdC51bnZlcmlmaWVkVG90YWx9IHZhcmlhbnQke3Jlc3VsdC51bnZlcmlmaWVkVG90YWwgPT09IDEgPyAnJyA6ICdzJ30gbm90IHByb2JlZGBcbiAgICApXG4gICAgLndpdGgoeyBzdGF0dXM6ICdpbnZhbGlkJyB9LCAocmVzdWx0KSA9PiBgKCR7cmVzdWx0LnJlYXNvbnMuam9pbignOyAnKX0pYClcbiAgICAud2l0aChcbiAgICAgIHsgc3RhdHVzOiAndW5rbm93bicgfSxcbiAgICAgIChyZXN1bHQpID0+IGAoaHR0cCAke3Jlc3VsdC5odHRwU3RhdHVzfSR7cmVzdWx0LmVycm9yID8gYDogJHtyZXN1bHQuZXJyb3J9YCA6ICcnfSlgXG4gICAgKVxuICAgIC53aXRoKFxuICAgICAgeyBzdGF0dXM6ICdhdmFpbGFibGUnLCBuZWFyTWF0Y2hlczogUC5hcnJheSgpIH0sXG4gICAgICAocmVzdWx0KSA9PiBgbmVhcjogJHtmb3JtYXROZWFyTWF0Y2hlcyhyZXN1bHQubmVhck1hdGNoZXMpfWBcbiAgICApXG4gICAgLndpdGgoeyBzdGF0dXM6ICdhdmFpbGFibGUnIH0sICgpID0+ICcnKVxuICAgIC5leGhhdXN0aXZlKClcbiAgcmV0dXJuIGAke3RhZ30ke25hbWV9JHtkZXRhaWx9YFxufVxuXG5mdW5jdGlvbiBmb3JtYXROZWFyTWF0Y2hlcyhtYXRjaGVzKSB7XG4gIHJldHVybiBtYXRjaGVzLm1hcCgobmVpZ2hib3IpID0+IGAke25laWdoYm9yLm5hbWV9IChkPSR7bmVpZ2hib3IuZGlzdGFuY2V9KWApLmpvaW4oJywgJylcbn1cblxuZnVuY3Rpb24gcmVuZGVyU2hvcnRsaXN0KGxhYmVsLCBpdGVtcywgbGluZUZuLCBzdWZmaXggPSAnJykge1xuICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbFxuICBjb25zdCBoZWFkZXIgPSBgJHtESVZJREVSfVxcbiR7bGFiZWx9ICgke2l0ZW1zLmxlbmd0aH0pJHtzdWZmaXh9OmBcbiAgY29uc3QgYm9keSA9IGl0ZW1zLnNsaWNlKDAsIFNIT1JUTElTVF9MSU1JVCkubWFwKGxpbmVGbikuam9pbignXFxuJylcbiAgY29uc3QgbW9yZSA9XG4gICAgaXRlbXMubGVuZ3RoID4gU0hPUlRMSVNUX0xJTUlUID8gYFxcbiAg4oCmIGFuZCAke2l0ZW1zLmxlbmd0aCAtIFNIT1JUTElTVF9MSU1JVH0gbW9yZWAgOiAnJ1xuICByZXR1cm4gYCR7aGVhZGVyfVxcbiR7Ym9keX0ke21vcmV9YFxufVxuXG5mdW5jdGlvbiBkaWUobWVzc2FnZSkge1xuICBwcm9jZXNzLnN0ZGVyci53cml0ZShgZXJyb3I6ICR7bWVzc2FnZX1cXG5cXG5SdW4gLS1oZWxwIGZvciB1c2FnZS5cXG5gKVxuICBwcm9jZXNzLmV4aXQoMilcbn1cblxubWFpbigpLmNhdGNoKChlcnJvcikgPT4ge1xuICBwcm9jZXNzLnN0ZGVyci53cml0ZShgZXJyb3I6ICR7ZXJyb3I/LnN0YWNrID8/IGVycm9yfVxcbmApXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsNyw5LDEwXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxTQUFTLFlBQVksUUFBUTtDQUM1QixJQUFJLGtCQUFrQixPQUFPLE9BQU87Q0FDcEMsSUFBSSxPQUFPLFdBQVcsVUFBVSxPQUFPLElBQUksTUFBTSxPQUFPO0NBQ3hELElBQUk7RUFDSCxNQUFNLFVBQVUsS0FBSyxVQUFVLE9BQU8sSUFBSSxPQUFPLE9BQU87RUFDeEQsT0FBTyxJQUFJLE1BQU0sU0FBUyxFQUFFLE9BQU8sUUFBUSxDQUFDO1NBQ3JDO0VBQ1AsT0FBTyxJQUFJLE1BQU0sT0FBTyxPQUFPLEVBQUUsRUFBRSxPQUFPLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBZXJELFNBQVMsR0FBRyxPQUFPO0NBQ2xCLE9BQU87RUFDTixJQUFJO0VBQ0o7RUFDQSxPQUFPO0VBQ1A7Ozs7Ozs7Ozs7Ozs7O0FBY0YsU0FBUyxJQUFJLE9BQU87Q0FDbkIsT0FBTztFQUNOLElBQUk7RUFDSixPQUFPO0VBQ1AsT0FBTyxZQUFZLE1BQU07RUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkYsU0FBUyxLQUFLLFFBQVE7Q0FDckIsT0FBTyxPQUFPLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQnRCLFNBQVMsTUFBTSxRQUFRO0NBQ3RCLE9BQU8sT0FBTyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7OztBQTBDdEIsU0FBUyxRQUFRLElBQUk7Q0FDcEIsSUFBSTtFQUNILE9BQU8sR0FBRyxJQUFJLENBQUM7VUFDUCxPQUFPO0VBQ2YsT0FBTyxJQUFJLE1BQU07Ozs7O0FDdkluQixNQUFNLElBQUUsT0FBTyxJQUFJLHNCQUFzQixFQUFDLElBQUUsT0FBTyxJQUFJLHlCQUF5QixFQUFDLElBQUUsb0NBQW1DLEtBQUUsTUFBRyxRQUFRLEtBQUcsWUFBVSxPQUFPLEVBQUUsRUFBQyxLQUFFLE1BQUcsS0FBRyxDQUFDLENBQUMsRUFBRSxJQUFHLEtBQUcsR0FBRSxHQUFFLE1BQUk7Q0FBQyxJQUFHLEVBQUUsRUFBRSxFQUFDO0VBQUMsTUFBZSxFQUFDLFNBQVEsR0FBRSxZQUFXLE1BQTdCLEVBQUUsSUFBK0IsQ0FBQyxNQUFNLEVBQUU7RUFBQyxPQUFPLEtBQUcsS0FBRyxPQUFPLEtBQUssRUFBRSxDQUFDLFNBQVEsTUFBRyxFQUFFLEdBQUUsRUFBRSxHQUFHLENBQUMsRUFBQzs7Q0FBRSxJQUFHLEVBQUUsRUFBRSxFQUFDO0VBQUMsSUFBRyxDQUFDLEVBQUUsRUFBRSxFQUFDLE9BQU0sQ0FBQztFQUFFLElBQUcsTUFBTSxRQUFRLEVBQUUsRUFBQztHQUFDLElBQUcsQ0FBQyxNQUFNLFFBQVEsRUFBRSxFQUFDLE9BQU0sQ0FBQztHQUFFLElBQUksSUFBRSxFQUFFLEVBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRSxFQUFFO0dBQUMsS0FBSSxNQUFNLEtBQUssRUFBRSxNQUFNLEVBQUM7SUFBQyxNQUFNLElBQUUsRUFBRTtJQUFHLEVBQUUsRUFBRSxJQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUssRUFBRSxHQUFDLEVBQUUsU0FBTyxFQUFFLEtBQUssRUFBRSxHQUFDLEVBQUUsS0FBSyxFQUFFOztHQUFDLElBQUcsRUFBRSxRQUFPO0lBQUMsSUFBRyxFQUFFLFNBQU8sR0FBRSxNQUFNLElBQUksTUFBTSwyRkFBMkY7SUFBQyxJQUFHLEVBQUUsU0FBTyxFQUFFLFNBQU8sRUFBRSxRQUFPLE9BQU0sQ0FBQztJQUFFLE1BQU0sSUFBRSxFQUFFLE1BQU0sR0FBRSxFQUFFLE9BQU8sRUFBQyxJQUFFLE1BQUksRUFBRSxTQUFPLEVBQUUsR0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBQyxJQUFFLEVBQUUsTUFBTSxFQUFFLFFBQU8sTUFBSSxFQUFFLFNBQU8sV0FBUyxDQUFDLEVBQUUsT0FBTztJQUFDLE9BQU8sRUFBRSxPQUFPLEdBQUUsTUFBSSxFQUFFLEdBQUUsRUFBRSxJQUFHLEVBQUUsQ0FBQyxJQUFFLEVBQUUsT0FBTyxHQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRyxFQUFFLENBQUMsS0FBRyxNQUFJLEVBQUUsVUFBUSxFQUFFLEVBQUUsSUFBRyxHQUFFLEVBQUU7O0dBQUUsT0FBTyxFQUFFLFdBQVMsRUFBRSxVQUFRLEVBQUUsT0FBTyxHQUFFLE1BQUksRUFBRSxHQUFFLEVBQUUsSUFBRyxFQUFFLENBQUM7O0VBQUMsT0FBTyxRQUFRLFFBQVEsRUFBRSxDQUFDLE9BQU0sTUFBRztHQUFDLE1BQU0sSUFBRSxFQUFFO0dBQUcsUUFBTyxLQUFLLEtBQUcsRUFBRSxJQUFFLEVBQUUsSUFBRSxlQUFhLEVBQUUsSUFBSSxDQUFDLGdCQUFjLEVBQUUsR0FBRSxFQUFFLElBQUcsRUFBRTtPQUFLO0lBQUc7O0NBQUMsT0FBTyxPQUFPLEdBQUcsR0FBRSxFQUFFO0dBQUUsS0FBRSxNQUFHO0NBQUMsSUFBSSxHQUFFLEdBQUU7Q0FBRSxPQUFPLEVBQUUsRUFBRSxHQUFDLEVBQUUsRUFBRSxHQUFDLFNBQU8sSUFBRSxTQUFPLEtBQUcsSUFBRSxFQUFFLElBQUksRUFBRSxvQkFBa0IsS0FBSyxJQUFFLEVBQUUsS0FBSyxFQUFFLElBQUUsSUFBRSxFQUFFLEdBQUMsTUFBTSxRQUFRLEVBQUUsR0FBQyxFQUFFLEdBQUUsRUFBRSxHQUFDLEVBQUUsT0FBTyxPQUFPLEVBQUUsRUFBQyxFQUFFLEdBQUMsRUFBRTtHQUFFLEtBQUcsR0FBRSxNQUFJLEVBQUUsUUFBUSxHQUFFLE1BQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUMsRUFBRSxDQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRTtDQUFDLElBQUcsTUFBSSxFQUFFLFFBQU87RUFBQyxNQUFLLENBQUMsS0FBRztFQUFFLFFBQU8sTUFBRyxFQUFFLEdBQUUsU0FBTSxHQUFHOztDQUFDLElBQUcsTUFBSSxFQUFFLFFBQU87RUFBQyxNQUFLLENBQUMsR0FBRSxLQUFHO0VBQUUsT0FBTyxFQUFFLEdBQUUsU0FBTSxHQUFHOztDQUFDLE1BQU0sSUFBSSxNQUFNLG9GQUFvRixFQUFFLE9BQU8sR0FBRzs7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU8sT0FBTyxPQUFPLEdBQUU7RUFBQyxnQkFBYSxFQUFFLEVBQUU7RUFBQyxNQUFJLE1BQUcsRUFBRSxHQUFFLEVBQUU7RUFBQyxLQUFHLE1BQUcsRUFBRSxHQUFFLEVBQUU7RUFBQyxTQUFPLE1BQUcsS0FBSyxNQUFJLElBQUUsRUFBRSxFQUFFLEdBQUMsRUFBRSxHQUFFLEVBQUU7RUFBQyxDQUFDOztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTyxPQUFPLFNBQVEsTUFBRyxPQUFPLE9BQU8sR0FBRSxFQUFDLENBQUMsT0FBTyxZQUFXO0VBQUMsSUFBSSxJQUFFO0VBQUUsTUFBTSxJQUFFLENBQUM7R0FBQyxPQUFNLE9BQU8sT0FBTyxHQUFFLEdBQUUsSUFBRyxDQUFDLEdBQUUsQ0FBQztHQUFDLE1BQUssQ0FBQztHQUFFLEVBQUM7R0FBQyxNQUFLLENBQUM7R0FBRSxPQUFNLEtBQUs7R0FBRSxDQUFDO0VBQUMsT0FBTSxFQUFDLFlBQVM7R0FBQyxJQUFJO0dBQUUsT0FBTyxTQUFPLElBQUUsRUFBRSxRQUFNLElBQUUsRUFBRSxHQUFHLEdBQUc7S0FBRTtJQUFFLENBQUMsRUFBRSxFQUFFLEVBQUM7RUFBQyxnQkFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQUMsU0FBTyxNQUFHLEVBQUUsS0FBSyxNQUFJLElBQUUsRUFBRSxFQUFFLEdBQUMsRUFBRSxHQUFFLEVBQUUsQ0FBQztFQUFDLENBQUM7O0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFPLEVBQUUsR0FBRSxXQUFRO0VBQUMsUUFBTSxNQUFHO0dBQUMsSUFBSSxJQUFFLEVBQUU7R0FBQyxNQUFNLEtBQUcsR0FBRSxNQUFJO0lBQUMsRUFBRSxLQUFHOztHQUFHLE9BQU8sS0FBSyxNQUFJLEtBQUcsRUFBRSxFQUFFLENBQUMsU0FBUSxNQUFHLEVBQUUsR0FBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDO0lBQUMsU0FBUSxDQUFDO0lBQUUsWUFBVztJQUFFLElBQUU7SUFBQyxTQUFRLEVBQUUsR0FBRSxHQUFFLEVBQUU7SUFBQyxZQUFXO0lBQUU7O0VBQUUsd0JBQXFCLEVBQUUsRUFBRTtFQUFDLGFBQVk7RUFBVyxHQUFFLENBQUM7O0FBQUMsTUFBTSxLQUFHLEdBQUUsTUFBSTtDQUFDLEtBQUksTUFBTSxLQUFLLEdBQUUsSUFBRyxDQUFDLEVBQUUsRUFBRSxFQUFDLE9BQU0sQ0FBQztDQUFFLE9BQU0sQ0FBQztHQUFHLEtBQUcsR0FBRSxNQUFJO0NBQUMsS0FBSSxNQUFLLENBQUMsR0FBRSxNQUFLLEVBQUUsU0FBUyxFQUFDLElBQUcsQ0FBQyxFQUFFLEdBQUUsRUFBRSxFQUFDLE9BQU0sQ0FBQztDQUFFLE9BQU0sQ0FBQztHQUFHLEtBQUcsR0FBRSxNQUFJO0NBQUMsTUFBTSxJQUFFLFFBQVEsUUFBUSxFQUFFO0NBQUMsS0FBSSxNQUFNLEtBQUssR0FBRSxJQUFHLENBQUMsRUFBRSxHQUFFLEVBQUUsR0FBRyxFQUFDLE9BQU0sQ0FBQztDQUFFLE9BQU0sQ0FBQzs7QUFBRyxTQUFTLEVBQUUsR0FBRyxHQUFFO0NBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtFQUFDLFFBQU0sTUFBRztHQUFDLElBQUksSUFBRSxFQUFFO0dBQUMsTUFBTSxLQUFHLEdBQUUsTUFBSTtJQUFDLEVBQUUsS0FBRzs7R0FBRyxPQUFNO0lBQUMsU0FBUSxFQUFFLE9BQU0sTUFBRyxFQUFFLEdBQUUsR0FBRSxFQUFFLENBQUM7SUFBQyxZQUFXO0lBQUU7O0VBQUUsd0JBQXFCLEVBQUUsR0FBRSxFQUFFO0VBQUMsYUFBWTtFQUFNLEdBQUUsQ0FBQzs7QUFBQyxTQUFTLEVBQUUsR0FBRyxHQUFFO0NBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtFQUFDLFFBQU0sTUFBRztHQUFDLElBQUksSUFBRSxFQUFFO0dBQUMsTUFBTSxLQUFHLEdBQUUsTUFBSTtJQUFDLEVBQUUsS0FBRzs7R0FBRyxPQUFPLEVBQUUsR0FBRSxFQUFFLENBQUMsU0FBUSxNQUFHLEVBQUUsR0FBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDO0lBQUMsU0FBUSxFQUFFLE1BQUssTUFBRyxFQUFFLEdBQUUsR0FBRSxFQUFFLENBQUM7SUFBQyxZQUFXO0lBQUU7O0VBQUUsd0JBQXFCLEVBQUUsR0FBRSxFQUFFO0VBQUMsYUFBWTtFQUFLLEdBQUUsQ0FBQzs7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU0sR0FBRSxXQUFRLEVBQUMsUUFBTSxPQUFJLEVBQUMsU0FBUSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUMsR0FBRSxHQUFFOztBQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUU7Q0FBQyxNQUFNLElBQUUsWUFBVSxPQUFPLEVBQUUsS0FBRyxFQUFFLEtBQUcsS0FBSyxHQUFFLElBQUUsTUFBSSxFQUFFLFNBQU8sRUFBRSxLQUFHLFlBQVUsT0FBTyxFQUFFLEtBQUcsS0FBSyxJQUFFLEVBQUU7Q0FBRyxPQUFPLEVBQUUsR0FBRSxXQUFRO0VBQUMsUUFBTSxNQUFHO0dBQUMsSUFBSSxJQUFFLEdBQUUsUUFBTSxJQUFFLElBQUUsSUFBRyxHQUFFO0dBQUMsT0FBTTtJQUFDLFNBQVEsS0FBSyxNQUFJLEtBQUcsRUFBRSxHQUFFLElBQUcsR0FBRSxNQUFJO0tBQUMsRUFBRSxLQUFHO01BQUc7SUFBQyxZQUFXO0lBQUU7O0VBQUUsd0JBQXFCLENBQUMsUUFBTSxJQUFFLElBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxNQUFJLElBQUUsRUFBRSxHQUFDLEVBQUUsRUFBRSxDQUFDO0VBQUMsR0FBRSxDQUFDOztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTSxDQUFDOztBQUFFLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTSxZQUFVLE9BQU87O0FBQUUsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFNLFlBQVUsT0FBTzs7QUFBRSxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU0sWUFBVSxPQUFPOztBQUFFLE1BQU0sSUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsSUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsSUFBRSxHQUFFLEtBQUUsTUFBRyxPQUFPLE9BQU8sRUFBRSxFQUFFLEVBQUM7Q0FBQyxhQUFXLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7TUFBSzs7Q0FBRyxXQUFTLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7TUFBSzs7Q0FBRyxZQUFVLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsRUFBRSxVQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUFDLFNBQU8sTUFBRyxFQUFFLEVBQUUsS0FBRyxNQUFHLEdBQUUsTUFBRyxFQUFFLEVBQUUsSUFBRSxFQUFFLFdBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsWUFBVSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsRUFBRSxJQUFFLEVBQUUsVUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxXQUFTLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7TUFBSzs7Q0FBRyxRQUFNLE1BQUc7RUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFHLElBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO01BQUs7O0NBQUcsQ0FBQyxFQUFDLElBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLEtBQUUsTUFBRyxPQUFPLE9BQU8sRUFBRSxFQUFFLEVBQUM7Q0FBQyxVQUFTLEdBQUUsTUFBSSxFQUFFLEVBQUUsS0FBSSxHQUFFLE1BQUksR0FBRSxNQUFHLEVBQUUsRUFBRSxJQUFFLEtBQUcsS0FBRyxLQUFHLEVBQUUsRUFBRSxHQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsS0FBRyxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsS0FBRyxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsTUFBSSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsRUFBRSxJQUFFLEtBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsTUFBSSxNQUFHLEVBQUUsRUFBRSxLQUFHLE1BQUcsR0FBRSxNQUFHLEVBQUUsRUFBRSxJQUFFLEtBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsV0FBUSxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsT0FBTyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FBQyxjQUFXLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLEVBQUUsSUFBRSxPQUFPLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUFDLGdCQUFhLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLEVBQUUsSUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsZ0JBQWEsRUFBRSxFQUFFLEdBQUUsR0FBRSxNQUFHLEVBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxDQUFDLEVBQUMsSUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsS0FBRSxNQUFHLE9BQU8sT0FBTyxFQUFFLEVBQUUsRUFBQztDQUFDLFVBQVMsR0FBRSxNQUFJLEVBQUUsRUFBRSxLQUFJLEdBQUUsTUFBSSxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsS0FBRyxLQUFHLEtBQUcsRUFBRSxFQUFFLEdBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxLQUFHLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsSUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxLQUFHLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsSUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxNQUFJLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsS0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxNQUFJLE1BQUcsRUFBRSxFQUFFLEtBQUcsTUFBRyxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsS0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FBQyxnQkFBYSxFQUFFLEVBQUUsR0FBRSxHQUFFLE1BQUcsRUFBRSxFQUFFLElBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQztDQUFDLGdCQUFhLEVBQUUsRUFBRSxHQUFFLEdBQUUsTUFBRyxFQUFFLEVBQUUsSUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQUMsQ0FBQztBQUFnTCxJQUFJLElBQUU7Q0FBQyxXQUFVO0NBQUssU0FBUTtDQUFFLFVBQVM7Q0FBRSxPQUFNLFNBQVMsR0FBRyxHQUFFO0VBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtHQUFDLFFBQU0sTUFBRztJQUFDLElBQUcsQ0FBQyxNQUFNLFFBQVEsRUFBRSxFQUFDLE9BQU0sRUFBQyxTQUFRLENBQUMsR0FBRTtJQUFDLElBQUcsTUFBSSxFQUFFLFFBQU8sT0FBTSxFQUFDLFNBQVEsQ0FBQyxHQUFFO0lBQUMsTUFBTSxJQUFFLEVBQUU7SUFBRyxJQUFJLElBQUUsRUFBRTtJQUFDLElBQUcsTUFBSSxFQUFFLFFBQU8sT0FBTyxFQUFFLEVBQUUsQ0FBQyxTQUFRLE1BQUc7S0FBQyxFQUFFLEtBQUcsRUFBRTtNQUFFLEVBQUM7S0FBQyxTQUFRLENBQUM7S0FBRSxZQUFXO0tBQUU7SUFBQyxNQUFNLEtBQUcsR0FBRSxNQUFJO0tBQUMsRUFBRSxNQUFJLEVBQUUsTUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQzs7SUFBRSxPQUFNO0tBQUMsU0FBUSxFQUFFLE9BQU0sTUFBRyxFQUFFLEdBQUUsR0FBRSxFQUFFLENBQUM7S0FBQyxZQUFXO0tBQUU7O0dBQUUsd0JBQXFCLE1BQUksRUFBRSxTQUFPLEVBQUUsR0FBQyxFQUFFLEVBQUUsR0FBRztHQUFDLEdBQUUsQ0FBQzs7Q0FBRSxLQUFJLFNBQVMsR0FBRyxHQUFFO0VBQUMsT0FBTyxFQUFFLEdBQUUsV0FBUTtHQUFDLFFBQU0sTUFBRztJQUFDLElBQUcsRUFBRSxhQUFhLE1BQUssT0FBTSxFQUFDLFNBQVEsQ0FBQyxHQUFFO0lBQUMsSUFBSSxJQUFFLEVBQUU7SUFBQyxJQUFHLE1BQUksRUFBRSxNQUFLLE9BQU07S0FBQyxTQUFRLENBQUM7S0FBRSxZQUFXO0tBQUU7SUFBQyxJQUFHLE1BQUksRUFBRSxRQUFPLE9BQU0sRUFBQyxTQUFRLENBQUMsR0FBRTtJQUFDLE1BQU0sS0FBRyxHQUFFLE1BQUk7S0FBQyxFQUFFLE1BQUksRUFBRSxNQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO09BQUUsSUFBRSxFQUFFO0lBQUcsT0FBTTtLQUFDLFNBQVEsRUFBRSxJQUFFLE1BQUcsRUFBRSxHQUFFLEdBQUUsRUFBRSxDQUFDO0tBQUMsWUFBVztLQUFFOztHQUFFLHdCQUFxQixNQUFJLEVBQUUsU0FBTyxFQUFFLEdBQUMsRUFBRSxFQUFFLEdBQUc7R0FBQyxHQUFFLENBQUM7O0NBQUUsS0FBSSxTQUFTLEdBQUcsR0FBRTtFQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7R0FBQyxRQUFNLE1BQUc7SUFBQyxJQUFHLEVBQUUsYUFBYSxNQUFLLE9BQU0sRUFBQyxTQUFRLENBQUMsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFO0lBQUMsSUFBRyxNQUFJLEVBQUUsTUFBSyxPQUFNO0tBQUMsU0FBUSxDQUFDO0tBQUUsWUFBVztLQUFFO0lBQUMsTUFBTSxLQUFHLEdBQUUsTUFBSTtLQUFDLEVBQUUsTUFBSSxFQUFFLE1BQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7O0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxPQUFNLEVBQUMsU0FBUSxDQUFDLEdBQUU7SUFBQyxJQUFJO0lBQUUsSUFBRyxNQUFJLEVBQUUsUUFBTyxNQUFNLElBQUksTUFBTSw0RUFBNEUsU0FBTyxJQUFFLEVBQUUsTUFBSSxLQUFLLElBQUUsRUFBRSxVQUFVLEdBQUc7SUFBQyxNQUFLLENBQUMsR0FBRSxLQUFHO0lBQUUsT0FBTTtLQUFDLFNBQVEsRUFBRSxJQUFHLEdBQUUsTUFBSTtNQUFDLE1BQU0sSUFBRSxFQUFFLEdBQUUsR0FBRSxFQUFFLEVBQUMsSUFBRSxFQUFFLEdBQUUsR0FBRSxFQUFFO01BQUMsT0FBTyxLQUFHO09BQUc7S0FBQyxZQUFXO0tBQUU7O0dBQUUsd0JBQXFCLE1BQUksRUFBRSxTQUFPLEVBQUUsR0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLENBQUM7R0FBQyxHQUFFLENBQUM7O0NBQUUsUUFBTyxTQUFTLEdBQUcsR0FBRTtFQUFDLE9BQU8sRUFBRSxHQUFFLFdBQVE7R0FBQyxRQUFNLE1BQUc7SUFBQyxJQUFHLFNBQU8sS0FBRyxZQUFVLE9BQU8sS0FBRyxNQUFNLFFBQVEsRUFBRSxFQUFDLE9BQU0sRUFBQyxTQUFRLENBQUMsR0FBRTtJQUFDLElBQUk7SUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLE1BQU0sSUFBSSxNQUFNLDBGQUEwRixTQUFPLElBQUUsRUFBRSxNQUFJLEtBQUssSUFBRSxFQUFFLFVBQVUsR0FBRztJQUFDLElBQUksSUFBRSxFQUFFO0lBQUMsTUFBTSxLQUFHLEdBQUUsTUFBSTtLQUFDLEVBQUUsTUFBSSxFQUFFLE1BQUksRUFB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