const assert = require('assert');
const typeGenerator = require('../typeGenerator');

describe('typeGenerator.js', () => {
  it('should correctly generate type declarations', () => {
    const envVars = ['DB_HOST', 'DEBUG'];
    const result = typeGenerator.generateTypeDeclarations(envVars);

    assert(result.includes('DB_HOST?: string | number | boolean;'));
    assert(result.includes('DEBUG?: string | number | boolean;'));

    // ... add more assertions for other types ...
  });
});