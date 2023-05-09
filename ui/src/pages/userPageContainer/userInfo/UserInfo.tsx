import React from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import flag from '../../base/image/anh-la-co-viet-nam-dep-1.png'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import './UserInfo.scss'
import Tooltip from '@mui/material/Tooltip';
import {ButtonVariantType} from '../../model/enum/buttonEnum';
import {IUserAddress, IUserInfoViewModel, UserInfoDetailTabType} from '../../model/apimodel/userInfo';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserMainInfo from '../userInfoEdit/userMainInfo/UserMainInfo';
import UserOtherInfo from '../userInfoEdit/userOtherInfo/UserOtherInfo';
import HeaderPage from '../../structure/headerPage/HeaderPage';

interface UserInfoState {
    userInfoState: IUserInfoViewModel
    tabValue: string
}

class UserInfo extends React.Component<any, UserInfoState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userInfoState: {
                id: "aaaa",
                userName: '',
                userSex: 0,
                userDateBirth: '05/18/2001',
                userAddress: {
                    province: {
                        key: 1,
                        text: 'Thành phố Hà Nội'
                    },
                    district: {
                        key: 1,
                        text: 'Quận Ba Đình'
                    },
                    commune: {
                        key: 4,
                        text: 'Phường Trúc Bạch'
                    }
                },
                userNational: {flag: 'https://flagcdn.com/w320/vn.png', name: 'Vietnam'},
                userAvatar: flag,
                userPhoneNumber: "",
                userIdentityNumber: "",
                userInsuranceNumber: "",
                // userEthnic: { id: 29, name: 'Việt'},
                userReligion: "",
                userJob: "",
                userCardPeriodFrom: "03/02/2022",
                userCardPeriodTo: "12/20/2022"
            },
            tabValue: UserInfoDetailTabType.MainInfo
        }
    }

    convertAddressToString(inputAddress: IUserAddress) {
        const addressString = inputAddress.address ? inputAddress.address + ', ' : ""
        const outputAddress: string = addressString + inputAddress.commune.text + ', ' + inputAddress.district.text + ', ' + inputAddress.province.text
        return outputAddress
    }

    render() {
        const {
            userAvatar,
            userName,
            userSex,
            userNational,
            userDateBirth,
            userPhoneNumber,
            userIdentityNumber,
            userAddress,
            userInsuranceNumber,
            userCardPeriodFrom,
            userCardPeriodTo,
            userReligion,
            userJob
        } = this.state.userInfoState
        const {tabValue} = this.state

        return (
            <div id='user-info' className='user-info'>
                <HeaderPage icon={<AccountCircleOutlinedIcon/>} text='Hồ sơ'/>
                <div className="page-info-container">
                    <div className="info-avatar">
                        {userAvatar ?
                            <div className="info-avatar-wrap">
                                <Avatar variant="rounded" alt={userName} src={userAvatar}
                                        sx={{width: '132px', height: '132px'}}/>
                                <IconButton aria-label="upload picture" component="label" className='update-button'>
                                    <input hidden accept="image/*" type="file"/>
                                    <PhotoCameraIcon sx={{fontSize: '20px'}}/>
                                </IconButton>
                            </div>
                            :
                            <Button variant={ButtonVariantType.Contained} component="label" className='upload-button'>
                                Tải ảnh lên
                                <input hidden accept="image/*" multiple type="file"/>
                            </Button>}
                    </div>
                    <div className="info-wrap">
                        <div className="info-header">
                            <div className="user-name-sex">
                                <div className="user-name">{userName ? userName : "Chưa có tên"}</div>
                                {userSex === 0 ?
                                    <div className="user-sex">
                                        <MaleIcon sx={{marginRight: '4px'}}/> Nam
                                    </div> :
                                    <div className="user-sex">
                                        <FemaleIcon sx={{marginRight: '4px'}}/> Nữ
                                    </div>}
                            </div>
                            <div className="user-national">
                                <img src={userNational.flag} alt=""/>
                                {userNational.name}
                            </div>
                        </div>
                        <div className="info-body">
                            <div className="info-body-wrap">
                                <div className="user-info-item">
                                    <CakeOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>Ngày sinh:</span>
                                    <div
                                        className='item-detail'>{`${new Date(userDateBirth).getDate()}/${new Date(userDateBirth).getMonth() + 1}/${new Date(userDateBirth).getFullYear()}`}</div>
                                </div>
                                <div className="user-info-item">
                                    <PhoneOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>Số điện thoại:</span>
                                    <div className='item-detail'>{userPhoneNumber}</div>
                                </div>
                                <div className="user-info-item">
                                    <CreditCardOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>CMND/ CCCD:</span>
                                    <div className='item-detail'>{userIdentityNumber}</div>
                                </div>
                                <div className="user-info-item">
                                    <PlaceOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>Địa chỉ:</span>
                                    <Tooltip title={this.convertAddressToString(userAddress)} placement="top-start">
                                        <div className='item-detail'>{this.convertAddressToString(userAddress)}</div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="info-body-wrap">
                                <div className="user-info-item">
                                    <MedicalInformationOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>Thẻ BHYT:</span>
                                    <div className='item-detail'>{userInsuranceNumber}</div>
                                </div>
                                {/* <div className="user-info-item">
                                    <PersonPinOutlinedIcon sx={{ width: '20px', marginRight: '10px'}}/>
                                    <span>Dân tộc:</span>
                                    <div className='item-detail'>{userEthnic.name}</div>
                                </div> */}
                                <div className="user-info-item">
                                    <MedicalInformationOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>Thời hạn:</span>
                                    <div className='item-detail'>{`${userCardPeriodFrom} - ${userCardPeriodTo}`}</div>
                                </div>
                                <div className="user-info-item">
                                    <ChurchOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>Tôn giáo:</span>
                                    <div className='item-detail'>{userReligion}</div>
                                </div>
                                <div className="user-info-item">
                                    <WorkOutlineOutlinedIcon sx={{width: '20px', marginRight: '10px'}}/>
                                    <span>Nghề nghiệp:</span>
                                    <div className='item-detail'>{userJob}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-edit-container">
                    <TabContext value={tabValue}>
                        <TabList onChange={(event: React.SyntheticEvent, newValue: string) => {
                            this.setState({tabValue: newValue})
                        }} aria-label="lab API tabs example">
                            <Tab label="Thông tin chính" value={UserInfoDetailTabType.MainInfo}/>
                            <Tab label="Thông tin khác" value={UserInfoDetailTabType.OtherInfo}/>
                        </TabList>
                        <TabPanel value={UserInfoDetailTabType.MainInfo}><UserMainInfo
                            userMainInfo={this.state.userInfoState}></UserMainInfo></TabPanel>
                        <TabPanel value={UserInfoDetailTabType.OtherInfo}><UserOtherInfo
                            userOtherInfo={this.state.userInfoState}></UserOtherInfo></TabPanel>
                    </TabContext>
                </div>
            </div>
        );
    }
}

export default UserInfo;