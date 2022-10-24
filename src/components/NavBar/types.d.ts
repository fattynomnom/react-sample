import { ReactNode } from 'react'

export interface NavItem { 
    title: string
    header?: string
    component?: ReactNode
    path: string
    page?: ReactNode 
}
