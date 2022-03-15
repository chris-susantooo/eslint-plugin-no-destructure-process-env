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
      errors: [
        {
          message:
            "Destructuring from process.env is prohibited. Declare 'FOO' with direct property access instead.",
        },
      ],
      output: 'const FOO = process.env.FOO;',
    },
    {
      code: 'const { FOO, BAR, BAZ } = process.env',
      errors: [
        {
          message:
            "Destructuring from process.env is prohibited. Declare 'FOO', 'BAR', 'BAZ' with direct property access instead.",
        },
      ],
      output:
        'const FOO = process.env.FOO;\nconst BAR = process.env.BAR;\nconst BAZ = process.env.BAZ;',
    },
    {
      code: 'const { FOO: foo, BAR: bar, BAZ: baz } = process.env',
      errors: [
        {
          message:
            "Destructuring from process.env is prohibited. Declare 'foo', 'bar', 'baz' with direct property access instead.",
        },
      ],
      output:
        'const foo = process.env.FOO;\nconst bar = process.env.BAR;\nconst baz = process.env.BAZ;',
    },
  ],
})
