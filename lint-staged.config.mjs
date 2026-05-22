const lintStagedConfig = {
  '*.{js,mjs,cjs,ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{css,scss}': ['prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};

export default lintStagedConfig;
