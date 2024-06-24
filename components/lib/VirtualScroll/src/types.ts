export interface VirtualScrollProps {
  // msg请求提示信息
  msg?: string
  // 记录单条数据高度
  oneHeight?: number
  // 记录单条数据宽度度
  oneWidth?: number
  // 请求数据的url
  requestUrl?: string
  // 当前页
  offset?: number
  // 每页显示条数
  size?: number
  // 滚动方向
  scrollDirection?: 'vertical' | 'horizontal'
  // 是否需要动态高度计算
  autoHeight?: boolean
  // 动态高度估算值
  estimatedItemHeight?: number
}
