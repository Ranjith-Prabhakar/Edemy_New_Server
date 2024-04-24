// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // '@typescript-eslint/no-var-requires': 'off', // Disable the rule to allow require statement in typescript
      // 'no-useless-catch':'off' 
    }
  }
);