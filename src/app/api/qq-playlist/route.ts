import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: '缺少歌单 ID' }, { status: 400 })
  }

  try {
    // QQ 音乐歌单详情 API
    const url = `https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=1&new_format=1&disstid=${id}&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    
    const res = await fetch(url, {
      headers: {
        'Referer': 'https://y.qq.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    const text = await res.text()
    // 去除 jsonp 包裹
    const jsonStr = text.replace(/^(jsonCallback|getPlaylist)\d*\(/, '').replace(/\);?\s*$/, '').trim()
    const data = JSON.parse(jsonStr)

    if (data?.songlist) {
      const songs = data.songlist.map((s: any) => ({
        id: s.mid || s.id,
        name: s.name || s.title,
        singer: (s.singer || []).map((sg: any) => sg.name).join(' / ') || '未知',
        cover: s.album?.mid ? `https://y.gtimg.cn/music/photo_new/T002R150x150M000${s.album.mid}.jpg` : undefined,
      }))

      return NextResponse.json({
        songs,
      })
    }

    return NextResponse.json({ error: '获取歌单失败' }, { status: 500 })
  } catch (err) {
    return NextResponse.json({ error: '请求失败: ' + (err as Error).message }, { status: 500 })
  }
}
