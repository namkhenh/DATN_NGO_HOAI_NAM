import React from 'react'
import './SideBarAdmin.scss'
import { NavLink } from 'react-router-dom';
import logoSmall from '../../base/image/Riordan_Clinic_logo_small.png'
import logoBig from '../../base/image/Riordan_Clinic_logo1.png'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
function SideBarAdmin() {
    const [isCollapse, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    return (
        <div className={isCollapse ? 'nav-all-collapes' : 'nav-all-expand'}>
            <div className="nav-all-container">
                <div className="nav-header">
                    {isCollapse ? <img src={logoSmall} alt="" /> : <img src={logoBig} alt="" />}
                </div>
                <div className="nav-body">
                    <NavLink to={'/admin/dashboard'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <HomeIcon />
                            <div className="nav-item-text">Dashboard</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/quan-ly-tai-khoan'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <ManageAccountsIcon />
                            <div className="nav-item-text">Quản lý tài khoản</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/danh-sach-dat-kham'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <EventNoteIcon />
                            <div className="nav-item-text">Quản lý lịch đặt</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/them-moi-hen-kham'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <PersonAddAlt1Icon />
                            <div className="nav-item-text">Đặt lịch trực tiếp</div>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-footer" onClick={() => { setOpen(!isCollapse)}}>
                    {isCollapse ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon/>}
                </div>
            </div>
        </div>
    );
}

export default SideBarAdmin