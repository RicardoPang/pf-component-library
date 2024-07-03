// 定义虚拟滚动数据
export interface VScroll {
  id: string | number // 数据项唯一标识
  name: string // 数据项名称
  picture_url: string // 数据项图片
  price: number // 数据项价格
  star_rating: number // 数据项评分
  reviews_count: number // 数据项评论数
}

export interface VirtualScrollProps {
  msg?: string // msg请求提示信息
  oneHeight?: number // 记录单条数据高度
  oneWidth?: number // 记录单条数据宽度
  requestUrl?: string // 请求数据的url
  offset?: number // 分页偏移量
  size?: number // 每页显示条数
  scrollDirection?: 'vertical' | 'horizontal' // 滚动方向
  autoHeight?: boolean // 是否需要动态高度计算
  estimatedItemHeight?: number // 动态高度估算值
}
