let myScroll = {}

myScroll.install = function (Vue) {
  Vue.directive('my-scroll', function (el) {
    el.addEventListener('touchstart', function() {
         let top = el.scrollTop,
             totalScroll = el.scrollHeight,
             currentScroll = top + el.offsetHeight
            //  console.log('')
         if(top === 0) {
             el.scrollTop = 1
         } else if(currentScroll === totalScroll) {
             el.scrollTop = top - 1
         }
     })
    el.addEventListener('touchmove', function(evt) {
        // console.log(el.offsetHeight, el.scrollHeight)
        // console.dir(el)
        if(el.offsetHeight < el.scrollHeight) {
            evt._isScroller = true
        }
    })
  })
}
export default myScroll
