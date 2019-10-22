module.exports = function(api) {
  api.cache(true) // 加快编译速度

  const presets = [
    '@babel/preset-react',  // jsx支持
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
  ]
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { 'loose': true }] // class中的箭头函数中的this指向组件
  ]

  return {
    presets,
    plugins
  }
}
