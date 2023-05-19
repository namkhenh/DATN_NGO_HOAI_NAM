import React from 'react'
import SideBarAdmin from '../../components/sideBarAdmin/SideBarAdmin'
import { Outlet } from 'react-router-dom'
import './AdminLayout.scss'
import HeaderAdmin from '../header/HeaderAdmin'
import MessageBar from '../../common/messageBar/MessageBar'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <SideBarAdmin />
      <div className="admin-layout-content">
        
        <HeaderAdmin />
        <div className="admin-layout-body">
          <Outlet/>
        </div>
      </div>
      <MessageBar></MessageBar >
    </div>
  )
}

export default AdminLayout