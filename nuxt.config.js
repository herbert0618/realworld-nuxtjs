module.exports = {
  // 自定义路由规则
  router: {
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
            }
          ]
        }
      ])
    }
  }
}