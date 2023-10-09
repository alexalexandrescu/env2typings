/**
 * Fetches the value for a given CLI argument flag, handling potential duplicates.
 *
 * @param {string[]} args - An array of command-line arguments.
 * @param {string} flag - The flag to search for.
 * @returns {string|null} - The value associated with the flag or null if not found.
 */
exports.getArgumentValue = (args, flag) => {
  const values = args.reduce((acc, curr, index) => {
    if (curr.startsWith(flag)) {
      if (curr.includes('=')) {
        acc.push(curr.split('=')[1])
      } else if (index < args.length - 1) {
        acc.push(args[index + 1])
      }
    }
    return acc
  }, [])

  if (values.length > 1) {
    throw new Error(`Multiple values provided for ${flag}`)
  }

  return values[0] || null
}
