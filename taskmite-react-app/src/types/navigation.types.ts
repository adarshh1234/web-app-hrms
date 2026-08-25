import type { SVGProps } from 'react'

export interface NavItem {
  id: string
  path: string
  iconLabel: string
  navLabel: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}
