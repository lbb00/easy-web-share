const path = require('path')

const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const typescript = require('rollup-plugin-typescript2')
const babel7 = require('rollup-plugin-babel')
const { terser } = require('rollup-plugin-terser')

const version = process.env.VERSION || require('../package.json').version

const babel = () => babel7({ exclude: 'node_modules/**', extensions: ['.js', '.ts'], externalHelpers: true })
const resolve = (p) => {
  return path.resolve(__dirname, '../', p)
}

const builds = {
  umd: {
    entry: resolve('src/main.ts'),
    dest: resolve('dist/webShare.js'),
    format: 'umd',
    plugins: [babel()],
  },
  'umd-min': {
    entry: resolve('src/main.ts'),
    dest: resolve('dist/webShare.min.js'),
    format: 'umd',
    plugins: [
      babel(),
      terser({
        toplevel: true,
        compress: {},
        output: {
          ascii_only: true,
        },
      }),
    ],
  },
  esm: {
    entry: resolve('src/main.ts'),
    dest: resolve('dist/webShare.esm.js'),
    format: 'esm',
  },
  cjs: {
    entry: resolve('src/main.ts'),
    dest: resolve('dist/webShare.cjs.js'),
    plugins: [babel()],
    format: 'cjs',
  },
}

function genConfig(name) {
  const opts = builds[name]
  const config = {
    input: resolve('./src/main.ts'),
    // https://stackoverflow.com/questions/52849894/how-to-handle-copyright-notice-in-javascript-bundle
    external: ['tslib'],
    plugins: [
      replace({
        include: opts.entry,
        values: {
          __VERSION__: JSON.stringify(version),
        },
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        clean: true,
        tsconfig: resolve('./tsconfig.json'),
      }),
    ].concat(opts.plugins || []),
    output: {
      name: opts.name || 'webShare',
      format: opts.format,
      exports: 'named',
      file: opts.dest,
    },
  }
  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllConfigs = () => Object.keys(builds).map(genConfig)
}
