import fs from 'fs'
import path from 'path'
import { type Context } from 'koa'
import { GetTreeControllerResponse, TreeNode } from '../utils/types'
import { IMiddleware } from 'koa-router'
import { Controller } from '../controller'

// 获取tree json数据的接口
const fnGetFile: IMiddleware = async (
  ctx: Context,
  next: () => Promise<void>
): Promise<void> => {
  const count: string = ctx.query.count as string
  const filePath: string = path.join(
    __dirname,
    '../static/json',
    `tree-${count}.json`
  )

  try {
    // 使用fs.promises.readFile异步读取文件内容
    const data: string = await fs.promises.readFile(filePath, 'utf8')
    const tree: TreeNode[] = JSON.parse(data)

    // 设置响应体为GetTreeControllerResponse类型
    ctx.body = {
      code: 0,
      data: { tree },
      message: 'Success'
    } as GetTreeControllerResponse
  } catch (error) {
    // 如果读取文件失败，返回错误信息
    ctx.body = {
      code: -1,
      message: `Failed to read file: ${error.message}`
    }
  }

  await next()
}

const controllers: Controller[] = [
  {
    method: 'GET',
    path: '/api/tree',
    fn: fnGetFile
  }
]

export default controllers
