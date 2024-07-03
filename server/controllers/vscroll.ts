import Mock from 'mockjs'
import { type Context } from 'koa'
import { GetVScrollControllerResponse } from '../utils/types'
import { IMiddleware } from 'koa-router'
import { Controller } from '../controller'

const imageUrls = [
  'https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_340.jpg',
  'https://images.dog.ceo/breeds/samoyed/n02111889_15299.jpg',
  'https://images.dog.ceo/breeds/terrier-toy/n02087046_2752.jpg',
  'https://images.dog.ceo/breeds/basenji/n02110806_4280.jpg',
  'https://images.dog.ceo/breeds/terrier-norfolk/n02094114_1641.jpg',
  'https://images.dog.ceo/breeds/husky/n02110185_11114.jpg',
  'https://images.dog.ceo/breeds/pointer-germanlonghair/hans4.jpg',
  'https://images.dog.ceo/breeds/terrier-wheaten/n02098105_196.jpg',
  'https://images.dog.ceo/breeds/brabancon/n02112706_2390.jpg',
  'https://images.dog.ceo/breeds/finnish-lapphund/mochilamvan.jpg'
]

// 获取VScroll数据的接口
const fnGetFile: IMiddleware = async (
  ctx: Context,
  next: () => Promise<void>
): Promise<void> => {
  const offset = parseInt(ctx.query.offset as string) || 0
  const size = parseInt(ctx.query.size as string) || 20

  const startId = offset + 1
  const currentPageData = Mock.mock({
    [`list|${size}`]: [
      {
        'id|+1': startId,
        name: '@ctitle(10, 180)',
        picture_url: () =>
          imageUrls[Math.floor(Math.random() * imageUrls.length)],
        price: '@integer(100, 500)',
        star_rating: '@float(1, 5, 1, 2)',
        reviews_count: '@integer(10, 500)'
      }
    ]
  }).list

  try {
    // 设置响应体为GetVScrollControllerResponse类型
    ctx.body = {
      code: 0,
      data: { list: currentPageData },
      message: 'Success'
    } as GetVScrollControllerResponse
  } catch (error) {
    ctx.body = {
      code: -1,
      message: error.message
    }
  }

  await next()
}

const controllers: Controller[] = [
  {
    method: 'GET',
    path: '/api/vscroll',
    fn: fnGetFile
  }
]

export default controllers
