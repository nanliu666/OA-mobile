module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': { utf8: false },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 容器宽度，也可以看作设计图的宽度
      // viewportHeight: 1334, // 容器高度，可以不配置
      unitPrecision: 3, // px转换为vw后保留的小数位
      viewportUnit: 'vw', // px需要转换成的单位，使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 不需要转换为其他单位的的class类
      minPixelValue: 1, // 小于等于1px不转换
      mediaQuery: false // 是否允许在媒体查询中使用px
    },
    'postcss-viewport-units': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }
  }
}
