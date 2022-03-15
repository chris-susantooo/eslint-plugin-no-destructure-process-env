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
    // fixable: 'code', // TODO: implement fixer
    schema: [], // no options
    messages: {
      noDestructureProcessEnv: 'No destructuring from process.env.',
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
          context.report({ node, messageId: 'noDestructureProcessEnv' })
        }
      },
    }
  },
}
