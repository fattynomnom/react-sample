import { ReactNode } from 'react'

export interface NavItem { 
    title: string
    component?: ReactNode
    path: string
    page?: ReactNode 
}
