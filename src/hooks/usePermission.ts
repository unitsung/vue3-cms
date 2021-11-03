import { useStore } from '@/store'
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  // 要验证的权限 后端返回的权限格式为：system:users:create
  if (pageName === 'user') {
    pageName = 'users'
  }
  const verifyPermission = `system:${pageName}:${handleName}`
  // !!name ->true 把字符串转换为布尔值
  return !!permissions.find((item) => item === verifyPermission)
}
