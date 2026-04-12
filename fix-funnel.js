const fs = require('fs');
const execSync = require('child_process').execSync;
let out = '';
try {
  out = execSync('find node_modules packages console -path "*/broccoli-funnel/index.js" -type f 2>/dev/null').toString();
} catch (e) {
  out = e.stdout.toString();
}
const files = out.split('\n').filter(x => x.trim().length > 0);
let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let before = content.length;
  // Use simple string replacement to avoid regex issues, targeting exactly the bad pattern
  content = content.replace(
    "this.output.rmdirSync('./', { recursive: true });\n          require(\"fs\").mkdirSync(this.outputPath, { recursive: true });\n          // And then symlinkOrCopy",
    "this.output.rmdirSync('./', { recursive: true });\n          // And then symlinkOrCopy"
  );
  if (content.length !== before) {
    fs.writeFileSync(file, content);
    console.log("Fixed " + file);
    count++;
  }
}
console.log("Fixed " + count + " instances.");
