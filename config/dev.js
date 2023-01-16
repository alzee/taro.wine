module.exports = {
  // https://github.com/NervJS/taro-ui/issues/1555#issuecomment-1334761262
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      exclude: ['taro-ui']
    }
  },
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {}
}
