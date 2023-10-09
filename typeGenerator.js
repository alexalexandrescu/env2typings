/**
 * Generates TypeScript type declarations for the given environment variables.
 *
 * @param {string[]} envVars - An array of environment variable names.
 * @returns {string} - A string containing TypeScript type declarations.
 */
exports.generateTypeDeclarations = (envVars) => {
  const lines = ['declare global {', '  namespace NodeJS {', '    interface ProcessEnv {']

  for (const key of envVars) {
    lines.push(`      ${key}?: string | number | boolean;`)
  }

  lines.push('    }')
  lines.push('  }')
  lines.push('}')
  lines.push('export {};') // Makes the file an external module
  return lines.join('\n')
}
