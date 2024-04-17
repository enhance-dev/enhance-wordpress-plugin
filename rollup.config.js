import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'htm-entry.js',
  output: {
    file: 'dist/htm.bundle.js',
    format: 'iife',
    name: 'HTM',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
};
