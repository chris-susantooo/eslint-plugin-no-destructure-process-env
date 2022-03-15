/**
 * @fileoverview Plugin to disallow destructuring from process.env. process.env.* could be statically replaced at build time, such as in Next.js or Vite.js projects, which means process.env is not a standard JavaScript object.
 * @author Chris Susanto
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex')

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules')
