export interface NavSideProps {
  icon: string
  name: string
  index: string
}

export interface NavHeaderEmits {
  (e: 'update:collapse', collapse: boolean): void
}
