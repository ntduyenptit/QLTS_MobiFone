module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['prettier', 'react', 'react-native', 'eslint-plugin-import'],
  rules: {
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  overrides: [
    {
      files: ['src/**/*.js'],
      rules: {},
    },
  ],
};
