const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) //把数组变成对象
const hashMap = xObject || [
    { logo: 'A', logoType: 'text', url: 'https://www.aliyun.com/' },
    { logo: 'B', logoType: 'image', url: 'https://www.bilibili.com/' }]
// 遍历hashmap
const simplifyUrl = (url) => {
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace('/\/.*', '')
    // 删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(
            ` <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon">
                <use xlink:href="#icon-close"></use>
            </svg></div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//组织点击关闭时进行冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt("请输入要添加的网址：")
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url;
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: "text",
            url: url

        });

        render()
    });
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)//把hashmap对象变成数组
    localStorage.setItem('x', string) //在本地的存储里面设置一个x，x的值就是string

}
$(document).on('keypress', (e) => {
    const key = e.key
    console.log(key)
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})