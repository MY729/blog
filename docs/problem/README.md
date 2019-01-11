# 前端常见问题

## 加密解密

### base64编码

**编码**  
```js
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
}
b64EncodeUnicode('楼兰 2019款 2.5 S/C HEV XE 四驱混动智联尊贵版')  
// "5qW85YWwIDIwMTnmrL4gMi41IFMvQyBIRVYgWEUg5Zub6amx5re35Yqo5pm66IGU5bCK6LS154mI"
```
**解码**
```js
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}
b64DecodeUnicode('5qW85YWwIDIwMTnmrL4gMi41IFMvQyBIRVYgWEUg5Zub6amx5re35Yqo5pm66IGU5bCK6LS154mI')
// "楼兰 2019款 2.5 S/C HEV XE 四驱混动智联尊贵版"
```
