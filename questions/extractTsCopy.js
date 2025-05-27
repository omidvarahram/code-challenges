// extractTsCopy.js
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

/** Recursively collect all .md file paths under dir */
function getAllMdFiles(dir, fileList = []) {
  for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      getAllMdFiles(fullPath, fileList);
    } else if (dirent.isFile() && fullPath.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

/** Cross-platform sync copy to clipboard */
function copyToClipboard(text) {
  let proc;
  if (process.platform === 'win32') {
    // Windows: use built-in clip.exe
    proc = spawnSync('clip', { input: text });
  } else if (process.platform === 'darwin') {
    // macOS
    proc = spawnSync('pbcopy', { input: text });
  } else {
    // Linux: requires xclip (install via your distro)
    proc = spawnSync('xclip', ['-selection', 'clipboard'], { input: text });
  }
  if (proc.error) {
    console.error('Clipboard error:', proc.error);
    process.exit(1);
  }
}

function extractAndCopy(baseDir, searchString) {
  // 1. Gather all markdown files
  const mdFiles = getAllMdFiles(baseDir);

  // 2. Find which files contain the exact search string on any single line
  const matchingFiles = mdFiles.filter(fp => {
    const text = fs.readFileSync(fp, 'utf8');
    return text.split(/\r?\n/).some(line => line.includes(searchString));
  });

  // must be exactly one match
  if (matchingFiles.length !== 1) {
    console.log('fail');
    return;
  }

  // 3. Read the matching file
  const fileContent = fs.readFileSync(matchingFiles[0], 'utf8');

  // 4. Extract the first ```ts copy … ``` block
  const extractRe = /```(?:\s*ts\s*copy\s*)\r?\n([\s\S]*?)```/m;
  const match = fileContent.match(extractRe);

  if (!match) {
    console.log('fail');
    return;
  }

  const codeToCopy = match[1];

  // 5. Copy to clipboard and report success
  copyToClipboard(codeToCopy);
  console.log('success');
}

// CLI entrypoint
if (require.main === module) {
  const [,, ...args] = process.argv;
  const searchText = args.join(' ');
  if (!searchText) {
    console.error('Usage: node extractTsCopy.js "<search string>"');
    process.exit(1);
  }
  extractAndCopy(process.cwd(), searchText);
}
