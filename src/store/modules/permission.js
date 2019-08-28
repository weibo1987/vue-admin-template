import { asyncRoutes, constantRoutes } from '@/router'
import { getMenu } from '../../api/user'
import { deepClone } from '../../utils/index'

const clientRoutes = deepClone(asyncRoutes)

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

/**
 *
 * @param {arr} clientAsyncRoutes 前端保存动态路由
 * @param {arr} serverRouter 后端保存动态路由
 */
function makePermissionRouters(serverRouter, clientAsyncRoutes) {
  clientAsyncRoutes.map(ele => {
    if (!ele.name || (!ele.meta && !ele.meta.roles)) return
    let roles_obj
    for (let i = 0; i < serverRouter.length; i++) {
      const element = serverRouter[i]
      if (ele.name === element.name) {
        roles_obj = element
      }
    }
    ele.meta.roles = roles_obj.meta.roles

    if (ele.children) {
      // Here must be roles_obj.children instead of serverRouters.
      makePermissionRouters(roles_obj.children, ele.children)
    }
  })
  return clientAsyncRoutes
}

const actions = {
  async generateRoutes({ commit }, roles) {
    let permissionRouters = await getMenu().then(
      res => {
        console.log(res)
        const data = res.data
        console.log(data)
        permissionRouters = makePermissionRouters(data, clientRoutes)
        return permissionRouters
      }
    )
    console.table(permissionRouters)

    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        console.log(permissionRouters)
        accessedRoutes = permissionRouters || []
      } else {
        accessedRoutes = filterAsyncRoutes(permissionRouters, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
