const http = require('https')
const url = 'https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&disstid=8909891875&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

http.get(url, { headers: { 'Referer': 'https://y.qq.com/' } }, (res) => {
  let data = ''
  res.on('data', (chunk) => data += chunk)
  res.on('end', () => {
    console.log('Status:', res.statusCode)
    console.log('Body:', data.substring(0, 800))
  })
}).on('error', (e) => console.log('Error:', e.message))
