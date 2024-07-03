/* eslint-env node */
module.exports = {
  plugins: [
    require('postcss-each-variables'), // 处理each变量
    require('postcss-nested'), // 处理嵌套CSS
    require('postcss-each')({
      // 处理each语法, 包含嵌套插件
      plugins: {
        // 处理for循环, 处理color-mix函数
        beforeEach: [require('postcss-for'), require('postcss-color-mix')]
      }
    })
  ]
}
