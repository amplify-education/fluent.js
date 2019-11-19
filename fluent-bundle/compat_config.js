import compatConfig from "../compat_config";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import visualizer from 'rollup-plugin-visualizer';

const config = [{
  ...compatConfig,
  input: 'src/index.js',
  output: {
    ...compatConfig.output,
    file: 'compat.js',
    amd: {
      id: '@fluent/bundle'
    }
  }
}, {
  // Configuration for the polyfill-ie11 bundle. See src/polyfill-ie11.js for
  // more info.
  input: ['src/polyfill-ie11.js'],
  output: {
    format: 'cjs', // We really want IIFE, but use CJS so we can use code splitting
    dir: '.',
    chunkFileNames: '[name]-cjs.js',
    entryFileNames: 'extraneous-library-code.js'
  },
  manualChunks: {
    // This tells rollup's code-splitting to put all core-js and
    // intl-pluralrules into a separate chunk, called polyfill-ie11
    'polyfill-ie11': ['core-js', 'intl-pluralrules']
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: [
        /\/core-js\//
      ],
      presets: [
        ["@babel/preset-env", {
          modules: false, // Cf. https://github.com/rollup/rollup-plugin-babel#modules
          targets: {
            browsers: [
              "ie >= 11",
            ]
          },
          useBuiltIns: 'usage',
          corejs: 3
        }]
      ],
      plugins: []
    }),
    resolve(),
    commonjs(),
    {
      generateBundle(opts, bundle) {
        // See `polyfill-ie11.js`
        delete bundle['extraneous-library-code.js'];
      }
    }
  ]
}, {
  // convert the polyfill from cjs to an iife script suitable for direct use in a <script> tag
  input: 'polyfill-ie11-cjs.js',
  output: {
    format: 'iife',
    file: 'polyfill-ie11.js'
  }
}];

if (process.env.VISUALIZE_BUNDLE) {
    config[0].plugins.push(visualizer({filename: 'stats.compat.js.html'}));
    config[1].plugins.push(visualizer({filename: 'stats.polyfill-ie11.html'}));
}

export default config;
