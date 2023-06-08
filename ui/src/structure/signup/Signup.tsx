import React from 'react'
import './Signup.scss'
import doctor from '../../base/image/doctor.png'
import user from '../../base/image/user.png'
import login from '../../base/image/login-form.png'
import logo from '../../base/image/Riordan_Clinic_logo.png'
import { TextField } from '../../common/textField/TextField'
import SubmitButton from '../../common/button/SubmitButton'
import { ButtonVariantType } from '../../model/enum/buttonEnum'
import { useNavigate } from 'react-router-dom'
import { AccountRoleEnum } from '../../model/enum/accPermissionEnum'
import Button from '@mui/material/Button'

function Signup() {
    const navigate = useNavigate()
    const handleUpdateInfo = () => {
        let requestBody = {

        }
        const result = new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem('user', JSON.stringify({ role: AccountRoleEnum.Admin }))
                navigate('/trang-chu')
                resolve('success')
            }, 4000);
        }).then(() => {/*  */

        })

        return result
    }
    return (
        <div className='signup-container'>
            <div className="signup-form-wrap">
                <div className="form-left">
                    <img src={login} alt="" />
                </div>
                <div className="form-right">
                    <img src={logo} alt="" />
                    <div className="form-title">
                        Đăng ký
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Số điện thoại'
                            placeholder='--'
                            value={''}
                            required
                            // onChange={(_, value) => { onChangeOneField(UserInfoModelProperty.userPhoneNumber, value) }}
                            errorMessage={''}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Mật khẩu'
                            placeholder='--'
                            required
                            value={'sss'}
                            type="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                        // onChange={(_, value) => { onChangeOneField(UserInfoModelProperty.userPhoneNumber, value) }}
                        // errorMessage={errorMessageString.userPhoneNumber}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Nhập lại mật khẩu'
                            placeholder='--'
                            required
                            value={'sss'}
                            type="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                        // onChange={(_, value) => { onChangeOneField(UserInfoModelProperty.userPhoneNumber, value) }}
                        // errorMessage={errorMessageString.userPhoneNumber}
                        />
                    </div>
                    <div className="signup-button">
                        <SubmitButton
                            id={'common-dialog-default'}
                            text={'Đăng ký'}
                            // disable={!canUpdate}
                            buttonVariantType={ButtonVariantType.Contained}
                            promise={handleUpdateInfo}
                            fullWidth={true}
                        // loading={loadingButton}
                        // loadingPosition={LoadingPosition.Center}

                        />
                    </div>
                </div>
            </div>
            <div className="signup-footer">
                <img src={doctor} alt="" />
                <img src={user} alt="" />
            </div>
        </div>
    )
}

export default Signup