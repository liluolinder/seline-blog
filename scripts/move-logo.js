const fs = require('fs')
const path = require('path')
const src = 'C:\\Project\\Web\\logo.png'
const dst = path.join('public', 'images', 'logo.png')
fs.mkdirSync(path.dirname(dst), { recursive: true })
fs.copyFileSync(src, dst)
fs.unlinkSync(src)
console.log('moved to', dst)
