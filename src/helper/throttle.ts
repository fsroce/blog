// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle (func: (args: any) => void, timeout = 2000, immediate = false) {
  let flag = false
  let timer: undefined | NodeJS.Timeout = undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any) {
    if (immediate || flag) {
      immediate = false
      flag = false
      func(args)
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          flag = true
          timer = undefined
        }, timeout)
      } else {
        console.log('helper/throttle提示：点击频率太高')
      }
    }
  }
}

export default throttle
