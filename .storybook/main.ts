import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../app/components/**/*/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
        "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "..\\public"
  ]
};
export default config;