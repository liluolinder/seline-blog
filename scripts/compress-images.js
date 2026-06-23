const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const imagesDir = path.join(__dirname, '..', 'public', 'images')

const tasks = [
  { file: 'bg1.png', webpQuality: 80, pngQuality: 60 },
  { file: 'bg2.png', webpQuality: 80, pngQuality: 60 },
  { file: 'avatar.png', webpQuality: 85, pngQuality: 70, resize: 200 },
  { file: 'logo.png', webpQuality: 85, pngQuality: 70, resize: 120 },
]

async function main() {
  for (const t of tasks) {
    const src = path.join(imagesDir, t.file)
    const name = t.file.replace('.png', '')

    if (!fs.existsSync(src)) {
      console.log(`⚠️  跳过：${t.file} 不存在`)
      continue
    }

    const stat = fs.statSync(src)
    console.log(`📦 ${t.file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`)

    // --- WebP ---
    let pipeline = sharp(src)
    if (t.resize) pipeline = pipeline.resize(t.resize)
    const webpPath = path.join(imagesDir, `${name}.webp`)
    await pipeline.webp({ quality: t.webpQuality }).toFile(webpPath)
    const webpStat = fs.statSync(webpPath)
    console.log(`  ✅ WebP:  ${(webpStat.size / 1024).toFixed(1)} KB (节省 ${((1 - webpStat.size / stat.size) * 100).toFixed(0)}%)`)

    // --- PNG 有损压缩 ---
    let pngPipeline = sharp(src)
    if (t.resize) pngPipeline = pngPipeline.resize(t.resize)
    const pngOut = path.join(imagesDir, `${name}-compressed.png`)
    await pngPipeline.png({ quality: t.pngQuality, compressionLevel: 9, palette: true }).toFile(pngOut)
    const pngStat = fs.statSync(pngOut)
    console.log(`  ✅ PNG:   ${(pngStat.size / 1024).toFixed(1)} KB (节省 ${((1 - pngStat.size / stat.size) * 100).toFixed(0)}%)`)
  }

  console.log('\n🎉 全部完成！')
}

main().catch(console.error)
