import React from 'react'
import './SideBarAdmin.scss'
import { NavLink } from 'react-router-dom';
import logoSmall from '../../base/image/Riordan_Clinic_logo_small.png'
import logoBig from '../../base/image/Riordan_Clinic_logo1.png'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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
                    <NavLink to={'/admin/tiep-nhan'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <GroupIcon />
                            <div className="nav-item-text">Tiếp đón bệnh nhân</div>
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