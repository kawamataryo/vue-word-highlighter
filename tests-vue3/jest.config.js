module.exports = {
  preset: "ts-jest",
  globals: {},
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
};
