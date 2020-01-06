import EXIF from 'exif-js'
/**
 * 上传前压缩图片
 * @param {optionect} file // 文件对象
 * @param {function} fn // 回调函数，接受参数为obj
 * @param {Number} option // 配置项 参数 quality 图片质量 0~1
 */
let obj = {
    url: '', // 返回图片base64, 用于临时渲染
    file: null // 返回的文件对象
}

const canvasDrawImg = (file, fn, option) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        canvasDataURL(reader.result, fn, option, file)
    }
}

const canvasDataURL = (path, fn, option = { quality: 0.2 }, file) => {
    let img = new Image()
    img.src = path
    img.onload = function () {
        let that = this
        // 默认按比例压缩
        let w = that.width;
          let h = that.height;
          let scale = w / h
        w = option.width || w
        h = option.height || (w / scale)
        // 生成canvas
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        canvas.width = h
        canvas.height = w

        // 判断部分机型是否被旋转
        EXIF.getData(file, function () { // 解决IOS手机竖拍图片上传旋转的问题
            let imgData = EXIF.getAllTags(this)
            if (imgData.Orientation && imgData.Orientation != 1) {
                switch (imgData.Orientation) { // Orientation 拍摄方向,旋转角度
                case 6: // 顺时针90°
                    ctx.rotate(Math.PI / 2)
              ctx.drawImage(that, 0, -h, w, h)
              break;
                case 3: // 逆时针90°
                    ctx.rotate(Math.PI)
              ctx.drawImage(that, -w, -h, w, h)
              break;
                case 8: // 180°
                    ctx.rotate(3 * Math.PI / 2)
              ctx.drawImage(that, -w, 0, w, h)
              break;
                }
            }else {
                ctx.drawImage(that, 0, 0, w, h)
        }

            let quality
            if (option.quality && option.quality <= 1 && option.quality > 0) {
                quality = option.quality
            }
            // quality值越小，所绘制出的图像越模糊
            let base64 = canvas.toDataURL('image/jpeg', quality)
            // 回调函数返回base64的值
            obj.url = base64
            obj.file = convertBase64UrlToBlob(base64)
            fn(obj)
        })
    }
}

const convertBase64UrlToBlob = (urlData) => {
    let arr = urlData.split(','); let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]); let n = bstr.length; let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

export default canvasDrawImg
