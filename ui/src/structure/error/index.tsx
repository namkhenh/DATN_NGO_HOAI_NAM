import React from 'react'
export enum ErrorCode {
    None = 0,
    Succeed = 1,
    ValidationFailed = 2,
    ServiceError = 500,
    NotFound = 404,
}

function ErrorPage() {
  return (
    <div>Error</div>
  )
}

export default ErrorPage