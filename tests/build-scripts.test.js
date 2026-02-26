/**
 * Tests for generate-icon-exports.js and clean-icon-exports.js.
 * These tests mutate src/ (add IconComponents, modify index.ts) then restore
 * by running clean so the repo is left in a clean state.
 */
import { describe, it, expect, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const projectRoot = path.resolve(__dirname, '..');
const srcIndexPath = path.join(projectRoot, 'src', 'index.ts');
const iconComponentsDir = path.join(projectRoot, 'src', 'IconComponents');

const CLEAN_INDEX_CONTENT = `export { default } from './FeatherIcon';
export type {
  FeatherIconName,
  FeatherIconProps,
  FeatherNamedIconProps,
} from './types';
`;

function runScript(scriptName) {
  const result = spawnSync('node', [scriptName], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(`Script ${scriptName} failed: ${result.stderr || result.stdout}`);
  }
  // Scripts use async fs; allow writes to complete
  return new Promise((r) => setTimeout(r, 1500));
}

function waitForCleanWrite() {
  return new Promise((r) => setTimeout(r, 800));
}

describe('generate-icon-exports.js', () => {
  afterAll(async () => {
    await runScript('clean-icon-exports.js');
    await waitForCleanWrite();
  });

  it('creates src/IconComponents with generated icon component files', async () => {
    await runScript('generate-icon-exports.js');

    expect(fs.existsSync(iconComponentsDir)).toBe(true);
    const files = fs.readdirSync(iconComponentsDir);
    expect(files.length).toBeGreaterThan(0);
    expect(files.some((f) => f === 'X.tsx')).toBe(true);
    expect(files.some((f) => f === 'Activity.tsx')).toBe(true);
    expect(files.every((f) => f.endsWith('.tsx'))).toBe(true);
  }, 10000);

  it('appends named export lines to src/index.ts', async () => {
    const content = fs.readFileSync(srcIndexPath, 'utf8');
    expect(content).toContain("export { default } from './FeatherIcon';");
    expect(content).toContain("export { default as X } from './IconComponents/X';");
    expect(content).toContain("export { default as Activity } from './IconComponents/Activity';");
  }, 10000);
});

describe('clean-icon-exports.js', () => {
  it('removes icon exports from src/index.ts and deletes src/IconComponents', async () => {
    await runScript('generate-icon-exports.js');
    expect(fs.existsSync(iconComponentsDir)).toBe(true);

    await runScript('clean-icon-exports.js');
    await waitForCleanWrite();

    const content = fs.readFileSync(srcIndexPath, 'utf8');
    expect(content.trim()).toBe(CLEAN_INDEX_CONTENT.trim());
    expect(fs.existsSync(iconComponentsDir)).toBe(false);
  }, 15000);
});
