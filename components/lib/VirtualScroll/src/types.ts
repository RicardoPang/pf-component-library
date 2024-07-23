/**
 * 定义虚拟滚动数据的接口。
 */
export interface VScroll {
  /** 数据项唯一标识。 */
  id: string | number

  /** 数据项名称。 */
  name: string

  /** 数据项图片 URL。 */
  picture_url: string

  /** 数据项价格。 */
  price: number

  /** 数据项评分。 */
  star_rating: number

  /** 数据项评论数。 */
  reviews_count: number
}

/**
 * 定义虚拟滚动组件的属性接口。
 */
export interface VirtualScrollProps {
  /** 请求提示信息。 */
  msg?: string

  /** 记录单条数据高度。 */
  oneHeight?: number

  /** 记录单条数据宽度。 */
  oneWidth?: number

  /** 请求数据的 URL。 */
  requestUrl?: string

  /** 分页偏移量。 */
  offset?: number

  /** 每页显示条数。 */
  size?: number

  /** 滚动方向。 */
  scrollDirection?: 'vertical' | 'horizontal'

  /** 是否需要动态高度计算。 */
  autoHeight?: boolean

  /** 动态高度估算值。 */
  estimatedItemHeight?: number
}
