const fs = require('fs')
const files = [
  'src/app/page.tsx',
  'src/components/layout/Header.tsx',
  'src/lib/background-context.tsx',
  'src/lib/config.ts',
]
for (const f of files) {
  let c = fs.readFileSync(f, 'utf-8')
  c = c.replace(/\/images\//g, '/seline-blog/images/')
  fs.writeFileSync(f, c)
  console.log('fixed', f)
}
