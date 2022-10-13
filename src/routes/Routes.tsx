import { Suspense } from 'react'
import {
  Navigate,
  Route,
  Routes as RoutesReactRouterDom,
} from 'react-router-dom'
import { GenericNotFound, Portfolios } from './paths'

export const Routes = () => {
  return (
    <Suspense fallback={<p>carregando</p>}>
      <RoutesReactRouterDom>
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<GenericNotFound />} />
        <Route path="/" element={<Portfolios/>} />
      </RoutesReactRouterDom>
    </Suspense>
  )
}
