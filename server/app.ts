import Koa, { Context } from 'koa'
import logger from 'koa-pino-logger'
import bodyParser from 'koa-bodyparser'
import controller from './controller'
import { errorCatch } from './middlewares/errorCatch'
import { HEADERS, PORT } from './middlewares/config'

const app = new Koa()

app.use(async (ctx: Context, next: () => Promise<void>) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  ctx.set(HEADERS)
  ctx.set('Access-Control-Allow-Origin', '*') // 允许跨域
  ctx.set('Access-Control-Allow-Headers', '*') // 允许所有请求头
  // 预检请求
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 0
    ctx.body = 'success'
    return
  }
  await next()
})

// 日志
app.use(logger())

app.use(bodyParser())

// 全局异常拦截
app.use(errorCatch())

async function initControllers() {
  const router = await controller()
  app.use(router)
}

initControllers().then(() => {
  // 在端口3000监听
  app.listen(PORT)
  console.log(`app started at port ${PORT}...`)
})

export default app
