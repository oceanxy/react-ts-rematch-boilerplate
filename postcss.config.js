module.exports = {
  plugins: {
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': {
      utf8: false
    },
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    },
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false
      }
    },
    autoprefixer: {}
  }
};
