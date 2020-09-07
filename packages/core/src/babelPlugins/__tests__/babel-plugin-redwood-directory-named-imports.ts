import * as babel from '@babel/core'

import namedDirectory from '../babel-plugin-redwood-directory-named-import'

const testCases = [
  // Directory named exports
  {
    input: 'import pew from "./__fixtures__/directory-named-imports/Module"',
    output:
      'import pew from "./__fixtures__/directory-named-imports/Module/Module"',
  },
  // Directory named exports
  {
    input:
      'export { pew } from "./__fixtures__/directory-named-imports/Module"',
    output:
      'export { pew } from "./__fixtures__/directory-named-imports/Module/Module"',
  },
  // Gives preferences to `index.*`
  {
    input:
      'export { pew } from "./__fixtures__/directory-named-imports/indexModule"',
    output:
      'export { pew } from "./__fixtures__/directory-named-imports/indexModule"',
  },
]

describe('directory named imports', () => {
  testCases.forEach(({ input, output }) => {
    test(`it should resolve ${input} to ${output}`, () => {
      const babeled = babel.transform(input, {
        babelrc: false,
        filename: __filename, // ordinarily provided
        plugins: [
          [
            namedDirectory,
            {
              rootDir: 'src', // not sure exactly what this means
              honorIndex: true,
            },
          ],
        ],
      }).code
      expect(babeled).toMatch(output)
    })
  })
})
