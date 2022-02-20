module.exports = {
  // 自定义路由规则
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除nuxtjs 基于pages默认生成路由表
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: 'login', // 登录子路由
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: 'register', // 注册子路由
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: 'profile/:username', // 注册子路由  动态路由
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: 'settings', // 注册子路由  动态路由
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: 'editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: 'article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },
  server: {
    host: '0.0.0.0', // localhost zhi 能本地访问
    port: 3000
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/day.js'
  ]
}