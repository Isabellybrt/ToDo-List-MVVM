module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/build/",
  ],

  // impede o Jest de tentar carregar módulos nativos
  moduleNameMapper: {
    "^react-native$": "<rootDir>/__mocks__/reactNativeMock.js",
    "expo(.*)$": "<rootDir>/__mocks__/expoMock.js",
  },

  transformIgnorePatterns: [
    "node_modules/(?!jest-runtime)"
  ]
};
