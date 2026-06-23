const fs = require('fs')
const destDir = 'content/articles/博客建设'
fs.mkdirSync(destDir, { recursive: true })
fs.renameSync('content/articles/hello-seline-blog.md', destDir + '/hello-seline-blog.md')
console.log('moved to', destDir)
