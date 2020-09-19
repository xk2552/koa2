// 获取Post请求的步骤：
//    解析上下文ctx中的原生nodex.js对象req。
//    将POST表单数据解析成query string-字符串.(例如:user=jspang&age=18)
//    将字符串转换成JSON格式。
const Koa = require('koa')
const app = new Koa()
app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    //显示表单页面
    let html = `
      <h1>xk Koa2 request POST </h1>
      <form method="post" action="/">
        <p>userName</p>
        <input name="userName"><br/>
        <p>age</p>
        <input name="age"><br/>
        <p>website</p>
        <input name="website"><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = await parsePostData(ctx)
    ctx.body = postData
  } else {
    ctx.body = '<h1>404!</h1>'
  }
})

function parsePostData(ctx) {
  return new Promise((resolve, resject) => {
    try{
      let postdata = ""
      ctx.req.addListener('data',(data) => {
        postdata += data
      })
      ctx.req.on('end', () => {
        let parseData = parseQueryStr(postdata)
        resolve(parseData)
      })
    }catch(error){
      resject(error)
    }
  })
}

function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log(queryStrList)
  console.log(queryStrList.entries())
  for(let [index, queryStr] of queryStrList.entries()){
    let itemList = queryStr.split('=')
    console.log(itemList);
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3001, () => {
  console.log('[demo] server is starting at port 3001');
})