const assert = require('assert');
const fs = require('fs');
const { execSync } = require('child_process');

describe('main.js', () => {
  const runScript = (args = '') => execSync(`node main.js ${args}`, { encoding: 'utf-8' });

  it('should handle missing .env file and no --env-file argument', () => {
    // Remove .env file if it exists temporarily
    if (fs.existsSync('.env')) {
      fs.renameSync('.env', '.env_tmp');
    }

    assert.throws(() => runScript(), /No .env file found and no --env-file argument provided./);

    // Rename .env_tmp back to .env
    if (fs.existsSync('.env_tmp')) {
      fs.renameSync('.env_tmp', '.env');
    }
  });

  it('should generate process-env.d.ts from sample.env', () => {
    runScript('--env-file=sample.env');

    assert(fs.existsSync('process-env.d.ts'), 'Expected process-env.d.ts to be created');
    const content = fs.readFileSync('process-env.d.ts', 'utf-8');
    assert(content.includes('declare global'), 'Expected content to have type declarations');

    // Cleanup
    fs.unlinkSync('process-env.d.ts');
  });

  // ... more tests
});
