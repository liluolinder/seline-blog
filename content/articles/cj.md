---
title: 1、仓颉的标识符
description: "仓颉的标识符"
date: '2026-02-17'
tags: ["Cangjie"]
published: true
cover: ''
sort: 1
---

> 万恶起源——为程序元素命名

> [!NOTE]
> 对于熟悉其他编程语言的读者或者不在意较多细节内容的读者，可以跳过本节内容或者直接[总结](#13总结)查看部分


## 1.1 一些 Unicode 字符集概念

在Cangjie文档中，关于Unicode字符集的描述如下:


1. 在 Unicode 标准中***XID_Start*** 和 ***XID_Continue*** 属性用于标记可以作为 Unicode 标识符（Identifier）的起始字符和后续字符（参考定义:[Unicode标准文档](https://www.unicode.org/reports/tr31/tr31-37.html)）
2. ***XID_Start*** 包含中文和英文等字符，***XID_Continue*** 包含中文、英文和阿拉伯数字等字符
3. 仓颉语言使用 Unicode 标准 15.0.0
4. Cangjie会将所有标识符识别为 [Normalization Form C (NFC)](https://www.unicode.org/reports/tr15/tr15-53.html) 后的形式。两个标识符如果在 NFC 后相等，则被认为是相同的标识符。


---

## 1.2 Cangjie的标识符分类

- 普通标识符
- 原始标识符

对于***普通标识符***而言：


> [!WARNING]
> 不可以与Cangjie的**==关键词==**相同 
> 例如:
> main 、 for 、 while 、 spawn等等

    

***普通标识符***同样含有以下限制:

- 使用中文、字母开头等***XID_Start***的字符开头时，后面可接任意长度的***XID_Continue***字符
- 使用_作为开头时候，其后接至少一位的***XID_Continue***字符

如下示例:

```Cangjie
//以下为合法合理的标识符
hello
test
Demo
_abc_
仓颉
a1b1c1

//以下为非法标识符
ab&c    // & 不是 XID_Continue 字符
3abc    // 阿拉伯数字不是 XID_Start 字符，因此，数字不能作为起始字符
_         // _ 后至少需要有一个 XID_Continue 字符
while  // while 是仓颉关键字，普通标识符不能使用仓颉关键字
```

对于***原始标识符***而言:

> [!NOTE]
> 原始标识符主要用于某些场景下需要使用Cangjie关键词作为标识符
> 其使用方式即在 普通标识符 或者 Cangjie关键词 的外围加上一对反引号

    



如下示例

```Cangjie
//以下为合法合理的原始标识符
`abc`
`_abc`
`a1b2c3`
`if`
`while`

//以下为非法的原始标识符
//其原因在于，内部 普通标识符 也是非法的
`ab&c`
`3abc`
```

```Cangjie
main(){
    let a = 1
    a |> println
    test()
}

func test(){

}
```



## 1.3总结

在Cangjie编程语言中，标识符分为以下两类

- 普通标识符
- 原始标识符

普通标识符 可以由 汉字、英文字母 等合理的***XID_Start***字符开头,也可使用_作为开头（不可使用数字作为开头）。使用非_开头时其后可接任意长度的***XID_Continue***字符，使用_开头时其后必须接至少一位的***XID_Continue***字符(可以是_,也可以是数字)。整体标识符不应出现如&的符号以及Cangjie注册的关键词。

原始标识符是使用一对 *反引号*  标识的 普通标识符 和 Cangjie的关键词，其主要用在某些场景下需要使用Cangjie关键词作为标识符。