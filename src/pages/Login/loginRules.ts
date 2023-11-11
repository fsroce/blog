type validateFunction = (...args: any) => (true | false)
// 登陆事件规则
const isEmpty: validateFunction = (arg: string | number) => (arg !== undefined && arg !== '')
type rules = ({ msg: string, validateFunc: validateFunction })[]
const userNameRules: rules = [
  { msg: '账户名不能留空', validateFunc: isEmpty },
]
const passwordRules: rules = [
  { msg: '密码不能为空', validateFunc: isEmpty }
]

export {
  rules, userNameRules, passwordRules
}