import hyRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './types'

// url会变变，或者多个，放到枚举里边

enum LoginAPI {
  AccountLogin = '/login', // /login
  LoginUserInfo = '/users/', //用法：/users/id
  UserMenus = '/role/' //用法: /role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
