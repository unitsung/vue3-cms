import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = ''

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // key ./analysis/overview.ts
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  //type===1 -> children -> type===1
  // type===2 - > url -> route

  const _recurveGetRoute = (menus: any[]) => {
    menus.forEach((menu) => {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        // 保留第一个菜单，解决访问 #/main空白问题 将重定向到第一个菜单
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurveGetRoute(menu.children)
      }
    })
  }
  _recurveGetRoute(userMenus)

  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurveGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurveGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurveGetPermission(userMenus)
  return permissions
}

export { firstMenu }
