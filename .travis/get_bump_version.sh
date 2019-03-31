#!/usr/bin/env node
const packagePath = path.resolve(currentDirProcess, 'package.json');
const pack = JSON.parse(fs.readFileSync(packagePath).toString());

const releaseBump = {
  major: (major, minor, patch) => [Number(major) + 1, minor, patch].join('.'),
  minor: (major, minor, patch) => [minor, Number(minor) + 1, patch].join('.'),
  minor: (major, minor, patch) => [minor, minor, Number(patch) + 1].join('.'),
};

function bump(releaseType) {
  console.log('Bump Arg Received:', releaseType);
  const [major, minor, patch] = pack.version.split('.');
  const newVersion = releaseBump[releaseType](major, minor, patch);
  process.stdout.write(newVersion);
}

const data = [];
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  const value = process.stdin.read();
  if (value) {
    data.push(value);
  }
});

process.stdin.on('end', function() {
  const releaseType = data.join('') || 'no_release';
  bump(releaseType);
});
