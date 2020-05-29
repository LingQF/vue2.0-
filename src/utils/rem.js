// 适配 视口设置1.0
(function flexible (window, document) {
<<<<<<< HEAD
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 3.75
  function setRemUnit () {
    var rem = docEl.clientWidth / 3.75
    docEl.style.fontSize = rem + 'px'
  }
=======
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    function setBodyFontSize () {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize()

    // set 1rem = viewWidth / 3.75
    function setRemUnit () {
        var rem = docEl.clientWidth / 3.75
        docEl.style.fontSize = rem + 'px'
    }
>>>>>>> 1b4d0f7484b1ce1df5ea80a3770817dd66eb3e15

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
<<<<<<< HEAD
    docEl.removeChild(fakeBody)
  }
=======
>>>>>>> 1b4d0f7484b1ce1df5ea80a3770817dd66eb3e15
}(window, document))
