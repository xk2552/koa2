const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

//子路由
let home = new Router()
home.get('/xk', async (ctx) => {
  ctx.body = 'Home xk page'
}).get('/todo', async (ctx) => {
  ctx.body = 'Home todo page'
})

let page = new Router()
page.get('/xk', async (ctx) => {
  ctx.body = 'Page xk page'
}).get('/todo', async (ctx) => {
  ctx.body = 'Page todo page'
})

//父级路由
let router = new Router()
router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())


app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3001, () => {
  console.log('starting')
})