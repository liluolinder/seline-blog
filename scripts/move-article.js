const fs = require('fs')
const path = require('path')
const src = path.join('content', 'articles', 'hello-seline-blog.md')
const dstDir = path.join('content', 'articles', '博客建设')
const dst = path.join(dstDir, 'hello-seline-blog.md')

// 创建目录
fs.mkdirSync(dstDir, { recursive: true })

// 读取原文件内容并添加 sort 字段
const raw = fs.readFileSync(src, 'utf-8')
const { data, content } = require('gray-matter')(raw)
data.sort = 1

const { stringify } = require('gray-matter')
const out = stringify(content, data)

// 写入新位置
fs.writeFileSync(dst, out, 'utf-8')

// 删除原文件
fs.unlinkSync(src)

console.log('Done: moved to', dst)
