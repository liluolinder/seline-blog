const http = require('https')
const url = 'https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=1&new_format=1&disstid=8909891875&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

http.get(url, { headers: { 'Referer': 'https://y.qq.com/' } }, (res) => {
  let data = ''
  res.on('data', (chunk) => data += chunk)
  res.on('end', () => {
    const cleaned = data.replace(/^jsonCallback\(/, '').replace(/\);?\s*$/, '').trim()
    const json = JSON.parse(cleaned)
    
    if (json.songlist) {
      console.log('songlist type:', typeof json.songlist)
      console.log('songlist isArray:', Array.isArray(json.songlist))
      console.log('songlist length:', json.songlist.length)
      if (json.songlist.length > 0) {
        const first = json.songlist[0]
        console.log('First song keys:', Object.keys(first).join(', '))
        console.log('First song name:', first.songname)
        console.log('First song singer:', JSON.stringify(first.singer))
        console.log('First song mid:', first.songmid)
        console.log('First song albummid:', first.albummid)
      } else {
        console.log('songlist is empty array')
      }
    } else {
      console.log('songlist not found in response')
    }
  })
}).on('error', (e) => console.log('Error:', e.message))
