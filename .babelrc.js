const isProd = String(process.env.NODE_ENV) === 'production'
const isTest = String(process.env.NODE_ENV) === 'test'
module.exports = {
  presets: [
    [
      
      '@babel/preset-env', 
      {
        modules: isTest ? 'commonjs' : false, 
        targets: {
          node: "8.10"
        }
      }
    ],
    '@babel/typescript',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    [
      'babel-plugin-emotion',
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: !isProd,
        labelFormat: '[filename]--[local]',
      },
    ],
    'react-loadable/babel',
    isTest ? 'babel-plugin-import-node' : null,
  ].filter(Boolean),
}