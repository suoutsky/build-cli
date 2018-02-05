const path = require('path');

module.exports = {
  // javascript 入口
  entry: './main.js',
  output: {
  // 所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
};