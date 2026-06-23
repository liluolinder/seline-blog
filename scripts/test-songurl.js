const http = require('https')

const testMids = ['001uU8w50E7pAe', '003e0gNc0CpT9d', '004Z8Ihr0JIu5v', '0025Y3Jz3WByWm']

const data = JSON.stringify({
  req: { module: 'CDN.SrfCdnDispatchServer', method: 'GetCdnDispatch', param: { guid: '10000', calltype: 0, userip: '' } },
  req_0: {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: { guid: '10000', songmid: testMids, songtype: [0, 0, 0, 0], uin: '0', loginflag: 1, platform: '20' },
  },
})

const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&inCharset=utf8&outCharset=utf-8&platform=yqq&needNewCode=0&data=${encodeURIComponent(data)}`

http.get(url, { headers: { 'Referer': 'https://y.qq.com/', 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let body = ''
  res.on('data', (chunk) => body += chunk)
  res.on('end', () => {
    const json = JSON.parse(body)
    const infos = json?.req_0?.data?.midurlinfo || []
    const sip = json?.req_0?.data?.sip?.[0] || ''
    infos.forEach(function(info) {
      console.log(info.songmid, '->', info.purl ? sip + info.purl : '(NO URL)')
    })
  })
}).on('error', function(e) { console.log('Error:', e.message) })
