#!/usr/bin/env node

/**
 * 迁移辅助脚本 - 帮助将原项目代码迁移到 Electron 项目
 * 使用: node scripts/migrate.js ../vue3-music
 */

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✓ Copied: ${file}`);
    }
  });
}

function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  // 这里可以添加导入路径的替换逻辑
  fs.writeFileSync(filePath, content);
}

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('Error: Please provide the source directory path');
  console.error('Usage: node scripts/migrate.js <source-project-path>');
  process.exit(1);
}

console.log('Starting migration...\n');

const mappings = [
  { src: 'stores', dest: 'src/renderer/src/stores' },
  { src: 'utils', dest: 'src/renderer/src/utils' },
  { src: 'models', dest: 'src/renderer/src/models' },
  { src: 'views', dest: 'src/renderer/src/views' },
  { src: 'components', dest: 'src/renderer/src/components' },
];

mappings.forEach(({ src, dest }) => {
  const srcPath = path.join(sourceDir, 'src', src);
  if (fs.existsSync(srcPath)) {
    console.log(`\nCopying ${src}...`);
    copyDir(srcPath, dest);
  }
});

console.log('\n✅ Migration completed!');
console.log('\nNext steps:');
console.log('1. Review imported paths in copied files');
console.log('2. Run: pnpm run dev');
console.log('3. Test the application');
