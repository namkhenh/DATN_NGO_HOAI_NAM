import React, { useState } from 'react'
import './HeaderAdmin.scss'
import Avatar from '@mui/material/Avatar'
import avatar from '../../base/image/anh-la-co-viet-nam-dep-1.png'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout';
function HeaderAdmin() {
    const [isOpenDialog, setOpen] = useState<boolean>(false)
    const [showPopup, setShow] = useState<boolean>(false)
    return (
        <div className='admin-header'>
            <div className="admin-header-image" onClick={() => { setShow(!showPopup) }}>
                <Avatar alt={avatar} src={avatar} />
            </div>
            {showPopup && 
                <div className="admin-popup-container">
                    <div className="admin-popup-content">
                        <div className="admin-popup-header">
                            <div className="admin-popup-avatar">
                                <img alt={avatar} src={avatar} />
                            </div>
                            <div className="admin-popup-header-content">
                                <div className="admin-popup-name">Ngô Hoài Nam</div>
                                <div className="admin-popup-role">Admin</div>
                            </div>
                        </div>
                        <div className="admin-logout-button" onClick={() => { setOpen(true) }}>
                            <Button startIcon={<LogoutIcon />}>Đăng xuất</Button>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default HeaderAdmin