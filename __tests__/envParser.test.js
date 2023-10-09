const assert = require('assert');
const fs = require('fs');
const path = require('path');
const envParser = require('../envParser');

// Helper function to create a temporary .env file for testing.
function createTempEnvFile(content) {
  const tempFilePath = path.join(__dirname, 'temp.env');
  fs.writeFileSync(tempFilePath, content);
  return tempFilePath;
}

describe('envParser.js', () => {
  afterAll(() => {
    // Cleanup temporary .env file after tests.
    try {
      fs.unlinkSync(path.join(__dirname, 'temp.env'));
    } catch (e) { /* ignore errors */ }
  });

  describe('parseEnvFile', () => {
    it('should correctly parse an .env file and extract variable names', () => {
      const content = `
        VAR1=value1
        VAR2=value2
        VAR3=value3
      `;
      const tempFilePath = createTempEnvFile(content);
      const result = envParser.parseEnvFile(tempFilePath);
      assert.deepStrictEqual(result, ['VAR1', 'VAR2', 'VAR3']);
    });

    it('should ignore commented lines in .env file', () => {
      const content = `
        # This is a comment
        VAR1=value1
        # Another comment
        VAR2=value2
      `;
      const tempFilePath = createTempEnvFile(content);
      const result = envParser.parseEnvFile(tempFilePath);
      assert.deepStrictEqual(result, ['VAR1', 'VAR2']);
    });
  });

  describe('isValidEnvLine', () => {
    // Since isValidEnvLine is not exported, we can't directly test it.
    // But we can indirectly test its behavior using the parseEnvFile function.
    it('should treat lines starting with # as invalid', () => {
      const content = `
        #VAR1=value1
      `;
      const tempFilePath = createTempEnvFile(content);
      const result = envParser.parseEnvFile(tempFilePath);
      assert.deepStrictEqual(result, []);
    });

    it('should treat lines without = as invalid', () => {
      const content = `
        VAR1 value1
      `;
      const tempFilePath = createTempEnvFile(content);
      const result = envParser.parseEnvFile(tempFilePath);
      assert.deepStrictEqual(result, []);
    });
  });
});
