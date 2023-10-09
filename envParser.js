const fs = require('fs')

/**
 * Parses an .env file and extracts the variable names.
 *
 * @param {string} filePath - The path to the .env file.
 * @returns {string[]} - An array of environment variable names.
 */
exports.parseEnvFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const envVarLines = fileContent.split('\n').filter(line => isValidEnvLine(line))
  return envVarLines.map(line => line.split('=')[0].trim())
}

/**
 * Checks if a line from an .env file is a valid environment variable definition.
 *
 * @param {string} line - The line from the .env file.
 * @returns {boolean} - Whether the line is a valid env var definition.
 */
function isValidEnvLine(line) {
  // Check if the line starts with optional whitespaces followed by a hash (#)
  const isComment = /^\s*#/.test(line);
  // Check if the line has an equal sign
  const hasAssignment = line.includes('=');

  return !isComment && hasAssignment;
}
