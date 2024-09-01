import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components'
import { endpoints } from '../services/endpoints';

const NotFoundPage = () => {
  let history = useHistory();

  return (
    <div className="not-found">
      <span className="style-404">404</span>
      <p>صفحه مورد نظر پیدا نشد</p>
      <div className="not-found-btn">
        <Link
          to={{ pathname: `${endpoints.BaseUrlAddress}` }}
        >
          <Button>
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>

  )
}

export default NotFoundPage
