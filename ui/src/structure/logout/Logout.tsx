import React from 'react'
import { render } from 'react-dom'
import ErrorPage from '../error/ErrorPage'

export const errorPage = (errorCode: number) => render(
    <ErrorPage/>, document.getElementById('') as HTMLElement
)

export const loadingPage = () => render(
    <ErrorPage/>, document.getElementById('') as HTMLElement
)

function Logout() {
  return (
    <div>Logout</div>
  )
}

export default Logout