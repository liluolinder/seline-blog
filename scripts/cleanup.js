const fs = require('fs')
const path = require('path')
const base = path.join('src', 'app', '(public)', 'articles')

// Delete [slug] directory
const single = path.join(base, '[slug]')
if (fs.existsSync(single)) {
  fs.rmSync(single, { recursive: true, force: true })
  console.log('Deleted:', '[slug]')
}

// Create [...slug] directory
const catchAll = path.join(base, '[...slug]')
if (!fs.existsSync(catchAll)) {
  fs.mkdirSync(catchAll, { recursive: true })
  console.log('Created:', '[...slug]')
}

console.log('Done')
