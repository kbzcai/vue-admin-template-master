import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import {Vue} from "vue/types/vue";

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // Vue.cookie.set('nowpage', to.path)
  // var nowpage = Vue.cookie.get('nowpage')
  // determine whether the user has logged in
  const hasToken = getToken()
  console.log(hasToken)
  if (hasToken) {
    console.log(to.path)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({path: '/dashboard1'})
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      console.log(hasGetUserInfo)
      if (hasGetUserInfo) {
        // if (!from.name) {
        //   router.push({path: nowpage})
        // }
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          if (hasToken == "admin-token")
            next({path: '/dashboard1'})
          if (hasToken == "editor-token")
            next({path: '/dashboard2'})
          if (hasToken == "visitor-token")
            next({path: '/dashboard3'})
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
