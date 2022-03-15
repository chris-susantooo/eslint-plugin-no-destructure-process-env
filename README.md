# eslint-plugin-no-destructure-process-env

Plugin to disallow destructuring from process.env. process.env.\* could be statically replaced at build time, such as in Next.js or Vite.js projects, which means process.env is not a standard JavaScript object.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-no-destructure-process-env`:

```sh
npm install eslint-plugin-no-destructure-process-env --save-dev
```

## Usage

Add `no-destructure-process-env` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["no-destructure-process-env"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "no-destructure-process-env/no-destructure-process-env": 2
  }
}
```

## Supported Rules

- Fill in provided rules here
