import React, { Component } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import './Header.scss'
import logo from '../../base/image/Riordan_Clinic_logo.png'
import { Button } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import team1 from '../../base/image/lading-team.jpg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import DialogView from '../../common/dialog/Dialog';
import { ButtonVariantType } from '../../model/enum/buttonEnum';

interface INavData {
    content: string;
    link: string
}

interface NavState {
    navContent: INavData[];
    isExpandAccountSetting: boolean
    showPopup: boolean
    isLogined: boolean
    isOpenDialog: boolean
    isLoading: boolean
}

// interface NavPropFromRedux {
//     isLogin: boolean
// }

export default class Header extends React.Component<any, NavState> {
    constructor(props: any) {
        super(props);
        this.state = {
            navContent: [],
            isExpandAccountSetting: false,
            showPopup: false,
            isLogined: false,
            isOpenDialog: false,
            isLoading: false
        }
    }

    componentDidMount(): void {
        this.setState({
            navContent: [
                { content: 'Trang chủ', link:'/trang-chu' },
                { content: 'Về chúng tôi', link: '/ve-chung-toi' },
                { content: 'Dịch vụ', link: '/dich-vu' },
                { content: 'Đội ngũ', link: '/doi-ngu' },
                { content: 'Liên hệ', link: '/lien-he' },
            ],
        })
    }

    expandAccountSetting() {
        let isExpandAccountSetting = !this.state.isExpandAccountSetting
        this.setState({ isExpandAccountSetting: isExpandAccountSetting })
    }

    handleShowPopup() {
        let showPopup = !this.state.showPopup
        this.setState({ showPopup: showPopup, isOpenDialog: false })
    }

    handlecClosePopup() {
        this.setState({ isOpenDialog: false })
    }

    onLogoutAction() {
        const result = new Promise((resolve) => {
            this.setState({ isLoading : true})
            setTimeout(() => {
                this.setState({ isLoading: false })
                resolve('success')
            }, 4000);
        }).then(() => {
            this.setState({showPopup: false})
        })
        return result
    }

    render() {
        const { isExpandAccountSetting, showPopup, navContent, isLogined, isOpenDialog, isLoading } = this.state
        return (
            <div id="header" className="header">
                <div className="top-header">
                    <span>Giờ làm việc: Thứ Hai - Thứ Sáu: 8:00 - 17:30/ Thứ Bảy: 8:00 - 11:30</span>
                    <div className="social-icons">
                        <FacebookOutlinedIcon className="social-icon"></FacebookOutlinedIcon>
                        <FacebookOutlinedIcon className="social-icon"></FacebookOutlinedIcon>
                        <FacebookOutlinedIcon className="social-icon"></FacebookOutlinedIcon>
                    </div>
                </div>
                <div className="bot-header">
                    <Link id="logo" className="logo" to={'/'}>
                        <img src={logo} alt="/" />
                    </Link>
                    <div className="navbar">
                        <div className="navbar-options">
                            {navContent?.map((item) => {
                                return <NavLink to={item.link} className={({ isActive }) => (isActive ? 'navbar-item-active' : 'navbar-item')}>{ item.content }</NavLink>
                            })}
                        </div>
                        <div className="booking-button">
                            <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} size="large" href={'/quan-ly/dat-lich-kham'} startIcon={<EventAvailableIcon/>}>Đặt lịch khám</Button>
                        </div>
                        {isLogined ?
                        <div className="user-avatar">
                            <img src={team1} alt="" onClick={this.handleShowPopup.bind(this)}/>
                            {showPopup && <div className="popup-container">
                                <div className="popup-content">
                                    <div className="popup-header">
                                        <div className="popup-avatar"><img src={team1} alt="" /></div>
                                            <Link to={'/quan-ly/ho-so'} className="popup-header-content">
                                            <div className="popup-name">Ngô Hoài Nam</div>
                                            <div className="popup-view-profile">Xem hồ sơ của tôi<ArrowForwardIosIcon sx={{ fontSize: '12px', color: '#595959', marginLeft: '12px' }} /></div>
                                        </Link>
                                    </div>
                                    <div className="popup-user-rank">
                                        <AccountCircleIcon sx={{ marginRight: '8px', fontSize: '25px' }} />
                                        Thành viên
                                    </div>
                                    <div className="popup-management">
                                            <Link to={'/quan-ly/suc-khoe'} className="popup-management-item">
                                            <FavoriteSharpIcon sx={{ color: '#ff2727d7' }} />
                                            <div className='item-text'>Sức khỏe</div>
                                        </Link>
                                        <Link to={'/quan-ly/danh-sach-lich-kham'} className="popup-management-item">
                                            <EventAvailableIcon sx={{ color: '#0067A2' }} />
                                            <div className='item-text'>Lịch sử đặt khám</div>
                                        </Link>
                                    </div>
                                    <div className="popup-options">
                                        <div className="popup-option" onClick={this.expandAccountSetting.bind(this)}>
                                            <div className="account-setting">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <SettingsIcon sx={{ marginRight: '12px' }} /> Thiết lập tài khoản
                                                </div>
                                                {isExpandAccountSetting ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </div>
                                                <div className="account-setting-menu" aria-expanded={isExpandAccountSetting} >
                                                    <Link to={'/quan-ly/mat-khau'} className="account-setting-item">
                                                    Đổi mật khẩu
                                                </Link>
                                                    <Link to={'/quan-ly/vo-hieu-hoa'} className="account-setting-item">
                                                    Vô hiệu hóa tài khoản
                                                </Link>
                                            </div>
                                        </div>
                                            <Link to={'/quan-ly/tro-giup'} className="popup-option">
                                            <div className="account-setting">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <HelpIcon sx={{ marginRight: '12px' }} /> Trợ giúp
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                        <div className="logout-button" onClick={() => { this.setState({ isOpenDialog: true, showPopup: false }) }}>
                                        <Button startIcon={<LogoutIcon/>}>Đăng xuất</Button>
                                    </div>
                                </div>
                            </div>}
                        </div> :
                            <div className="login-button" onClick={() => { this.setState({ isLogined: true }) }}>
                            <Button variant='outlined' size="large" sx={{ textTransform: 'none' }}  startIcon={<AccountCircleIcon />}>Đăng nhập</Button>
                        </div>}                   
                    </div>
                </div>
                <DialogView
                    title='Đăng xuất khỏi Riordan Clinic?'
                    hidden={!isOpenDialog}
                    message='Bạn có chắc chắn muốn đăng xuất?'
                    closeButtonText='Đăng xuất'
                    closeWithPromise={this.onLogoutAction.bind(this)}
                    confirm={this.handlecClosePopup.bind(this)}
                    confirmButtonText={'Hủy'}
                    close={this.handlecClosePopup.bind(this)}
                    loading={isLoading}
                />
            </div>
        );
    }
}