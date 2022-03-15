'use strict'

const rule = require('../../../lib/rules/no-destructure-process-env'),
  RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })

ruleTester.run('no-destructure-process-env', rule, {
  valid: [
    {
      code: 'const foo = process.env.FOO',
    },
    {
      code: 'var bar = process.env.BAR',
    },
    {
      code: 'let baz = process.env.BAZ',
    },
  ],
  invalid: [
    {
      code: 'const { FOO } = process.env',
      errors: [{ message: 'No destructuring from process.env.' }],
    },
    {
      code: 'const { FOO, BAR, BAZ } = process.env',
      errors: [{ message: 'No destructuring from process.env.' }],
    },
  ],
})
