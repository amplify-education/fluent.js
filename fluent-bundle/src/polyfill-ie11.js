// This module is used to build a polyfill script for IE 11.

// We import the fluent-bundle script ('../src/index.js') so that
// babel-preset-env can analyze which core-js modules are needed, but then
// configure the rollup build to use code-splitting to separate everything from
// core-js (and intl-pluralrules) into a separate chunk from the library code
// in '../src'.  It's the former chunk that we actually want, since we have a
// separate task to build the actual fluent-bundle library code.
export * from "../src/index";

import "intl-pluralrules";
