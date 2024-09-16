/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'TEST',

  rules: {
    doc: $ => $._expression,
    // The top-level expression rule
    _expression: $ => choice(
      $.identifier,
      $.number,
      $.unary_expression,
      $.binary_expression,
      $.paren_expression
    ),

    // Unary expressions (-a, !a)
    unary_expression: $ => prec(3, choice(
      seq('-', $._expression),
      seq('!', $._expression)
    )),

    // Binary expressions with precedence and associativity
    binary_expression: $ => choice(
      prec.left(2, seq($._expression, '*', $._expression)),
      prec.left(2, seq($._expression, '/', $._expression)),
      prec.left(1, seq($._expression, '+', $._expression)),
      prec.left(1, seq($._expression, '-', $._expression)),
      prec.right(4, seq($._expression, '**', $._expression))  // Right-associative for exponentiation
    ),

    // Parenthesized expressions to support grouping
    paren_expression: $ => seq('(', $._expression, ')'),

    // Identifiers (variable names)
    identifier: $ => /[a-zA-Z_][a-zA-Z_0-9]+/,

    // Numbers (integer literals)
    number: $ => /\d+/
  }
});
