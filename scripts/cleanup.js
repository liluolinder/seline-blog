const fs = require('fs')
const path = require('path')
const base = 'src/app/admin'
if (fs.existsSync(base)) {
  fs.rmSync(base, { recursive: true, force: true })
  console.log('Deleted admin directory')
}
