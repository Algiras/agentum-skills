const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

test('CLI reports the version of its installed package', () => {
  const version = execFileSync(process.execPath, [path.join(__dirname, '../bin/agentum-mcp.js'), '--version'], { encoding: 'utf8' }).trim();
  assert.equal(version, require('../package.json').version);
});
