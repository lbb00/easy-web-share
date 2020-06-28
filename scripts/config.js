const path = require('path')
const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')

const { default: nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const BabelPlugin = require('@rollup/plugin-babel')
const packageJSON = require('../package.json')

const babel = () =>
  BabelPlugin.default({ babelHelpers: 'bundled', extensions: ['.js', '.ts'], skipPreflightCheck: true })
const version = process.env.VERSION || packageJSON.version

const resolve = (p) => {
  return path.resolve(process.env.PWD, './', p)
}

const builds = {
  esm: {
    dest: resolve('dist/webShare.esm.js'),
    format: 'esm',
    plugins: [babel()]
  },
  cjs: {
    dest: resolve('dist/webShare.cjs.js'),
    format: 'cjs',
    plugins: [babel()]
  },
  min: {
    dest: resolve('dist/webShare.min.js'),
    format: 'umd',
    plugins: [
      babel(),
      terser({
        compress: {
          ecma: 2015,
          pure_getters: true
        }
      })
    ]
  }
}

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: resolve('./src/main.ts'),
    plugins: [
      replace({
        include: opts.entry,
        values: {
          __VERSION__: JSON.stringify(version)
        }
      }),
      nodeResolve({
        browser: true
      }),
      typescript({
        clean: true,
        tsconfig: resolve('./tsconfig.json')
      })
    ].concat(opts.plugins || []),
    output: {
      name: opts.name || 'webShare',
      format: opts.format,
      exports: 'named',
      file: opts.dest
    },
    treeshake: {
      moduleSideEffects: false
    }
  }
  return config
}

function getAllConfigs () {
  return Object.keys(builds).map(genConfig)
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllConfigs = getAllConfigs
}
