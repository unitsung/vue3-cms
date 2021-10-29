// 首字母大写
export default function toUpper(str: string) {
  const [first, ...rest] = str
  return first.toUpperCase() + rest.join('')
}
