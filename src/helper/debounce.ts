// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce (func: (args: any) => any, timeout = 2000) {
  let timer: undefined | NodeJS.Timeout = undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(...args: any) {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    timer = setTimeout(func(args), timeout)
  }
}

export default debounce
