import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: '缺少歌曲 ID' }, { status: 400 })
  }

  try {
    // QQ 音乐获取播放链接 API
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&inCharset=utf8&outCharset=utf-8&platform=yqq&needNewCode=0&data=${encodeURIComponent(JSON.stringify({
      req: {
        module: 'CDN.SrfCdnDispatchServer',
        method: 'GetCdnDispatch',
        param: { guid: '10000', calltype: 0, userip: '' },
      },
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '10000',
          songmid: [id],
          songtype: [0],
          uin: '0',
          loginflag: 1,
          platform: '20',
        },
      },
    }))}`

    const res = await fetch(url, {
      headers: {
        'Referer': 'https://y.qq.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    const data = await res.json()
    const purl = data?.req_0?.data?.midurlinfo?.[0]?.purl
    const sip = data?.req_0?.data?.sip?.[0] || 'https://ws.stream.qqmusic.qq.com/'

    if (purl) {
      return NextResponse.json({ url: sip + purl })
    }

    return NextResponse.json({ error: '无法获取播放链接' }, { status: 500 })
  } catch (err) {
    return NextResponse.json({ error: '请求失败: ' + (err as Error).message }, { status: 500 })
  }
}
