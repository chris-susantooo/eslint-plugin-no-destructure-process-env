/**
 * @fileoverview Rule to disallow destructuring from process.env
 */

'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow destructuring from process.env',
      category: 'Possible Problems',
      recommended: true,
      url: 'https://github.com/chris-susantooo/eslint-plugin-no-destructure-process-env',
    },
    fixable: 'code',
    schema: [], // no options
    messages: {
      noDestructureProcessEnv:
        'Destructuring from process.env is prohibited. Declare {{variables}} with direct property access instead.',
    },
  },
  // eslint-disable-next-line no-unused-vars
  create: function (context) {
    return {
      VariableDeclarator(node) {
        const destructuring =
          node.init && node.id && node.id.type === 'ObjectPattern'
        const isProcessEnv =
          node.init.object &&
          node.init.object.name === 'process' &&
          node.init.property.name === 'env'

        if (destructuring && isProcessEnv) {
          const { keys, values } = getDestructuredTokens(node)

          const declarationType = node.parent.kind
          const replacementText = values.reduce((acc, variableName, i) => {
            const LF = i < values.length - 1 ? '\n' : ''
            return `${acc}${declarationType} ${variableName} = process.env.${keys[i]};${LF}`
          }, '')

          context.report({
            node,
            messageId: 'noDestructureProcessEnv',
            fix: fixer => fixer.replaceText(node.parent, replacementText),
            data: {
              variables: values.map(v => `'${v}'`).join(', '),
            },
          })
        }
      },
    }
  },
}

function getDestructuredTokens(node) {
  const keys = []
  const values = []

  node.id.properties.forEach(p => {
    keys.push(p.key.name)
    values.push(p.value.name)
  })

  return { keys, values }
}
