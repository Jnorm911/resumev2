#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const resumedBin = path.join(rootDir, 'node_modules', '.bin', 'resumed');

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, {
    cwd: rootDir,
    stdio: 'inherit',
    ...options,
  });

  if (result.error) {
    return { ok: false, error: result.error };
  }

  if (result.status !== 0) {
    return { ok: false, status: result.status };
  }

  return { ok: true };
}

function runWeasyPrint() {
  const commands = [
    [path.join(rootDir, '.venv', 'bin', 'python'), ['-m', 'weasyprint', 'resume.html', 'resume.pdf']],
    ['python', ['-m', 'weasyprint', 'resume.html', 'resume.pdf']],
    ['python3', ['-m', 'weasyprint', 'resume.html', 'resume.pdf']],
  ];

  let sawCommand = false;

  for (const [cmd, args] of commands) {
    const result = run(cmd, args);
    if (result.ok) {
      return true;
    }

    if (result.error && result.error.code === 'ENOENT') {
      continue;
    }

    sawCommand = true;
    break;
  }

  if (!sawCommand) {
    console.error('Could not find `python` or `python3` on PATH.');
  } else {
    console.error('WeasyPrint conversion failed. Ensure `python -m weasyprint` works in your environment.');
  }

  return false;
}

console.log('1/2 Rendering HTML with resumed...');
const render = run(resumedBin, [
  'render',
  'resume.json',
  '--theme',
  'jsonresume-theme-macchiato',
  '--output',
  'resume.html',
]);

if (!render.ok) {
  console.error('Failed to render /Users/tentacle/Projects/personal/resume/resume.html');
  process.exit(1);
}

console.log('2/2 Converting HTML to PDF with WeasyPrint...');
if (!runWeasyPrint()) {
  process.exit(1);
}

console.log('Done: /Users/tentacle/Projects/personal/resume/resume.pdf');
