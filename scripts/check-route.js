const fs = require('fs')
const p = 'src/app/(public)/articles'
console.log('Files in', p + ':')
fs.readdirSync(p).forEach(f => {
  const full = p + '/' + f
  const stat = fs.statSync(full)
  if (stat.isDirectory()) {
    console.log('  [DIR]', f)
    fs.readdirSync(full).forEach(sf => console.log('    ', sf))
  } else {
    console.log('  [FILE]', f)
  }
})
