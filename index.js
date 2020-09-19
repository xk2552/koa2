const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
  ctx.body = 'hello xk'//打印至页面上
})
app.listen(3001);
console.log('app start');