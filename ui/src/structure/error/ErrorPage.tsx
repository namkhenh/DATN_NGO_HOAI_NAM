import React from 'react'
import './ErrorPage.scss'
export enum ErrorCode {
    None = 0,
    Succeed = 1,
    ValidationFailed = 2,
    ServiceError = 500,
    NotFound = 404,
}

function ErrorPage() {
  return (
    <div id='not-found'>
      <div className="not-found">
        <div className="not-found-404">
          <h1>404</h1>
        </div>
        <h2>Xin lỗi, Trang không tìm thấy!</h2>
        <p>Trang bạn đang tìm kiếm có thể đã bị xóa do đổi tên hoặc tạm thời không có.</p>
        <a href="/trang-chu">Trở về Trang Chủ</a>
      </div>
    </div>
  )
}

export default ErrorPage