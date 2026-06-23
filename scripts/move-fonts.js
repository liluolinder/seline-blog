const fs = require('fs')
const path = require('path')

const srcDir = 'C:\\Project\\Web'
const dstDir = path.join('public', 'fonts')

fs.mkdirSync(dstDir, { recursive: true })

const fonts = ['HarmonyOS_Sans_Regular.ttf', 'JetBrainsMono-Regular.ttf']
for (const f of fonts) {
  const src = path.join(srcDir, f)
  const dst = path.join(dstDir, f)
  fs.copyFileSync(src, dst)
  fs.unlinkSync(src)
  console.log('Moved:', f)
}
