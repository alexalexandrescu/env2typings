#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { parseEnvFile } = require('./envParser')
const { generateTypeDeclarations } = require('./typeGenerator')
const { getArgumentValue } = require('./cliHelper')

try {
  const args = process.argv.slice(2)
  const envFilePath = getArgumentValue(args, '--env-file') || (fs.existsSync('.env') ? '.env' : null)
  const outputFilePath = getArgumentValue(args, '--output') || 'process-env.d.ts'

  if (!envFilePath) {
    throw new Error('No .env file found and no --env-file argument provided.')
  }

  const dryRun = args.includes('--dry-run')
  const envVars = parseEnvFile(path.resolve(envFilePath))
  const output = generateTypeDeclarations(envVars)

  if (dryRun) {
    console.log(output)
  } else {
    fs.writeFileSync(outputFilePath, output, 'utf-8')
    console.log(`Generated ${outputFilePath}`)
  }

} catch (error) {
  console.error(`Error: ${error.message}`)
  process.exit(1)
}
