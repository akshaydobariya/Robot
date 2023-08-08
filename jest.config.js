export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {},
  transformIgnorePatterns: ["/node_modules/"],
  extensionsToTreatAsEsm: [".js", ".jsx", ".ts", ".tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
