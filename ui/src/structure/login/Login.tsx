import React, { useState } from 'react'
import './Login.scss'
import doctor from '../../base/image/doctor.png'
import user from '../../base/image/user.png'
import login from '../../base/image/login-form.png'
import logo from '../../base/image/Riordan_Clinic_logo.png'
import {TextField} from '../../common/textField/TextField'
import SubmitButton from '../../common/button/SubmitButton'
import {ButtonVariantType, LoadingPosition} from '../../model/enum/buttonEnum'
import {AccountRoleEnum} from '../../model/enum/accPermissionEnum'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { AuthenService } from '../../api/apiPage/apiPage'
import Cookies from 'js-cookie';
function Login() {
    const [loadingButton, setLoading] = useState<boolean>()
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [rememberPass, setRemmemberPass] = useState<boolean>()

    
    const navigate = useNavigate()
    const handleLogin = () => {
        let requestBody = {
            userName: phoneNumber,
            password: password,
            remmemberMe: true
        }
        setLoading(true)
        const result = AuthenService.login(requestBody).then(res => {
            if (res.success) {
                Cookies.set("Token", res.data?.accessToken, {
                    expires: 7,
                });
                setLoading(false)
                navigate('/trang-chu')
            } else {
                setLoading(false)
            }
        })
        return result
    }

    return (
        <div className='login-container'>
            <div className="login-form-wrap">
                <div className="form-left">
                    <img src={login} alt="" />
                </div>
                <div className="form-right">
                    <img src={logo} alt="" />
                    <div className="form-title">
                        Đăng nhập
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Số điện thoại'
                            placeholder='--'
                            value={phoneNumber}
                            required
                            onChange={(_, value) => { setPhoneNumber(value) }}
                            errorMessage={''}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Mật khẩu'
                            placeholder='--'
                            required
                            value={password}
                            type="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            onChange={(_, value) => { setPassword(value) }}
                            errorMessage={''}
                        />
                    </div>
                    <div className="sign-up">
                        Bạn chưa có tài khoản? <br /><a href='/dang-ky'>Đăng ký</a> tại đây
                    </div>
                    <div className="login-button">
                        <SubmitButton
                            id={'common-dialog-default'}
                            text={'Đăng nhập'}
                            // disable={!canUpdate}
                            buttonVariantType={ButtonVariantType.Contained}
                            promise={handleLogin}
                            fullWidth={true}
                            loading={loadingButton}
                            loadingPosition={LoadingPosition.Center}
                            
                        />
                    </div>
                </div>
            </div>
            <div className="login-footer">
                <img src={doctor} alt="" />
                <img src={user} alt="" />
            </div>
        </div>
    )
}

export default Login