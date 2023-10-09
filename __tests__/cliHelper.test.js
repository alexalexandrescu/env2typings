const assert = require('assert');
const cliHelper = require('../cliHelper');

describe('cliHelper.js', () => {
  describe('getArgumentValue', () => {
    it('should correctly fetch the value of a given CLI argument flag with equals sign', () => {
      const args = ['--env-file=./sample.env'];
      const result = cliHelper.getArgumentValue(args, '--env-file');
      assert.strictEqual(result, './sample.env');
    });

    it('should correctly fetch the value of a given CLI argument flag without equals sign', () => {
      const args = ['--env-file', './sample.env'];
      const result = cliHelper.getArgumentValue(args, '--env-file');
      assert.strictEqual(result, './sample.env');
    });

    it('should return null if flag is not present', () => {
      const args = ['--another-flag=./sample.env'];
      const result = cliHelper.getArgumentValue(args, '--env-file');
      assert.strictEqual(result, null);
    });

    it('should throw an error if multiple values provided for a flag', () => {
      const args = ['--env-file=./sample.env', '--env-file', './another.env'];
      assert.throws(() => {
        cliHelper.getArgumentValue(args, '--env-file');
      }, /Multiple values provided for/);
    });
  });

  it('should return null if flag is present but no value is provided after it', () => {
    const args = ['--env-file'];
    const result = cliHelper.getArgumentValue(args, '--env-file');
    assert.strictEqual(result, null);
  });
});
