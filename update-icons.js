#!/usr/bin/env node

/**
 * Script to update icons from the latest feather-icons package
 *
 * This script:
 * 1. Installs/updates feather-icons as a devDependency
 * 2. Extracts the icons.json file from feather-icons
 * 3. Copies it to src/icons.json
 * 4. Runs the build process to generate new icon components
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FEATHER_ICONS_PKG = 'feather-icons';
const ICONS_JSON_SOURCE_PATHS = [
  'node_modules/feather-icons/dist/icons.json',
  'node_modules/feather-icons/icons.json',
];
const ICONS_JSON_DEST = 'src/icons.json';
const README_PATH = 'README.md';
const PACKAGE_JSON_PATH = 'package.json';

function log(message) {
  console.log(`[update-icons] ${message}`);
}

function error(message) {
  console.error(`[update-icons] ERROR: ${message}`);
  process.exit(1);
}

function runCommand(command, description, options = {}) {
  log(description);
  try {
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (err) {
    return false;
  }
}

function runCommandOrError(command, description, options = {}) {
  if (!runCommand(command, description, options)) {
    error(`Failed to execute: ${command}`);
  }
}

function findIconsJson() {
  for (const sourcePath of ICONS_JSON_SOURCE_PATHS) {
    const fullPath = path.join(process.cwd(), sourcePath);
    if (fs.existsSync(fullPath)) {
      log(`Found icons.json at: ${sourcePath}`);
      return fullPath;
    }
  }
  return null;
}

function tryBuildIconsJson() {
  log('Attempting to build icons.json from feather-icons...');
  const buildScriptPath = path.join(
    process.cwd(),
    'node_modules/feather-icons/bin/build-icons-json.js'
  );

  if (!fs.existsSync(buildScriptPath)) {
    log('Build script not found in feather-icons package');
    return null;
  }

  // Try to run the build script using babel-node
  // The feather-icons package uses babel-node to run this script
  const success = runCommand(
    `npx --yes babel-node node_modules/feather-icons/bin/build-icons-json.js`,
    'Building icons.json from feather-icons source',
    { cwd: path.join(process.cwd(), 'node_modules/feather-icons') }
  );

  if (success) {
    // Check if the file was created
    const iconsJsonPath = findIconsJson();
    if (iconsJsonPath) {
      return iconsJsonPath;
    }
  }

  log(
    'Could not build icons.json using babel-node, trying alternative approach...'
  );

  // Alternative: try to extract from SVG files directly
  return extractIconsFromSvgFiles();
}

function extractIconsFromSvgFiles() {
  log('Attempting to extract icons from SVG files...');
  const iconsDir = path.join(
    process.cwd(),
    'node_modules/feather-icons/dist/icons'
  );

  if (!fs.existsSync(iconsDir)) {
    log('Icons directory not found');
    return null;
  }

  const iconFiles = fs.readdirSync(iconsDir).filter((f) => f.endsWith('.svg'));
  if (iconFiles.length === 0) {
    log('No SVG files found in icons directory');
    return null;
  }

  const icons = {};

  iconFiles.forEach((file) => {
    const iconName = path.basename(file, '.svg');
    const svgPath = path.join(iconsDir, file);
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // Extract the inner content (between <svg> tags)
    // The icons.json format expects just the inner SVG elements (paths, circles, etc.)
    const match = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (match) {
      // Clean up the inner content - remove extra whitespace but preserve structure
      icons[iconName] = match[1].trim().replace(/\s+/g, ' ');
    }
  });

  if (Object.keys(icons).length === 0) {
    log('No icons extracted from SVG files');
    return null;
  }

  // Write temporary icons.json
  const tempPath = path.join(
    process.cwd(),
    'node_modules/feather-icons/dist/icons.json'
  );
  fs.mkdirSync(path.dirname(tempPath), { recursive: true });
  fs.writeFileSync(tempPath, JSON.stringify(icons, null, 2));
  log(`Generated icons.json from ${iconFiles.length} SVG files`);

  return tempPath;
}

function extractIconsFromPackage() {
  log('Extracting icons from feather-icons package...');

  // First, try to find existing icons.json (most common case)
  let iconsJsonPath = findIconsJson();

  if (!iconsJsonPath) {
    // Try to build it using the build script
    iconsJsonPath = tryBuildIconsJson();
  }

  if (!iconsJsonPath || !fs.existsSync(iconsJsonPath)) {
    error(
      'Could not find or generate icons.json from feather-icons package. ' +
        'Please ensure feather-icons is properly installed.'
    );
  }

  return iconsJsonPath;
}

function getPackageVersion(packageName, fromInstalled = false) {
  try {
    // If fromInstalled is true, read from node_modules (more accurate)
    if (fromInstalled) {
      const installedPackageJsonPath = path.join(
        process.cwd(),
        'node_modules',
        packageName,
        'package.json'
      );

      if (fs.existsSync(installedPackageJsonPath)) {
        const installedPackageJson = JSON.parse(
          fs.readFileSync(installedPackageJsonPath, 'utf8')
        );
        return installedPackageJson.version || null;
      }
    }

    // Otherwise, read from this project's package.json
    const packageJsonPath = path.join(process.cwd(), PACKAGE_JSON_PATH);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Check devDependencies first, then dependencies
    const deps = {
      ...packageJson.devDependencies,
      ...packageJson.dependencies,
    };
    const version = deps[packageName];

    if (!version) {
      return null;
    }

    // Remove version range prefixes (^, ~, etc.) to get the actual version
    // But prefer getting from installed package if available
    return version.replace(/^[\^~>=<]/, '');
  } catch (err) {
    log(`Warning: Could not read version: ${err.message}`);
    return null;
  }
}

function updateReadmeVersion(newVersion) {
  const readmePath = path.join(process.cwd(), README_PATH);

  if (!fs.existsSync(readmePath)) {
    log('Warning: README.md not found, skipping version update');
    return;
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // Pattern to match: "It currently supports up to version [4.29.0](https://github.com/feathericons/feather/releases/tag/v4.29.0)"
  const versionPattern =
    /(It currently supports up to version )\[([\d.]+)\]\(https:\/\/github\.com\/feathericons\/feather\/releases\/tag\/v([\d.]+)\)/;

  if (versionPattern.test(readmeContent)) {
    readmeContent = readmeContent.replace(
      versionPattern,
      `$1[${newVersion}](https://github.com/feathericons/feather/releases/tag/v${newVersion})`
    );
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    log(`Updated README.md to show feather-icons version ${newVersion}`);
  } else {
    log('Warning: Could not find version pattern in README.md to update');
  }
}

function main() {
  log('Starting icon update process...');

  // Get current version before update
  const currentVersion = getPackageVersion(FEATHER_ICONS_PKG);
  if (currentVersion) {
    log(`Current feather-icons version: ${currentVersion}`);
  }

  // Step 1: Install/update feather-icons as devDependency
  log('Step 1: Installing latest feather-icons as devDependency...');
  runCommandOrError(
    `npm install ${FEATHER_ICONS_PKG}@latest --save-dev`,
    'Installing feather-icons'
  );

  // Get the new version that was installed (read from node_modules for accuracy)
  const newVersion = getPackageVersion(FEATHER_ICONS_PKG, true);
  if (newVersion) {
    if (currentVersion && currentVersion !== newVersion) {
      log(`Updated from feather-icons ${currentVersion} to ${newVersion}`);
    } else {
      log(`Using feather-icons version: ${newVersion}`);
    }
  } else {
    log('Warning: Could not determine installed feather-icons version');
  }

  // Step 2: Extract icons.json
  log('Step 2: Extracting icons.json from feather-icons...');
  const sourceIconsJson = extractIconsFromPackage();

  if (!sourceIconsJson || !fs.existsSync(sourceIconsJson)) {
    error('Could not locate icons.json in feather-icons package');
  }

  // Step 3: Copy and format icons.json to src/
  log('Step 3: Copying and formatting icons.json to src/...');
  const destPath = path.join(process.cwd(), ICONS_JSON_DEST);
  const iconsData = JSON.parse(fs.readFileSync(sourceIconsJson, 'utf8'));
  fs.writeFileSync(destPath, JSON.stringify(iconsData, null, 2) + '\n', 'utf8');
  log(`Copied and formatted icons.json to ${ICONS_JSON_DEST}`);

  // Step 4: Update README with new version
  if (newVersion) {
    log('Step 4: Updating README.md with new version...');
    updateReadmeVersion(newVersion);
  }

  // Step 5: Run build process
  log('Step 5: Running build process to generate icon components...');
  runCommandOrError('npm run build', 'Building icon components');

  log('Icon update process completed successfully!');
  log(`Updated ${ICONS_JSON_DEST} and generated new icon components.`);
  if (newVersion) {
    log(
      `README.md has been updated to reflect feather-icons version ${newVersion}`
    );
  }
}

main();
