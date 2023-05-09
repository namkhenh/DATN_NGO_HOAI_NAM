import React, {useEffect, useState} from 'react'
import './DisableAccountPage.scss'
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HeaderPage from '../../../structure/headerPage/HeaderPage'
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {Dropdown} from '../../../common/dropdown/DropDown';
import {UserDisableAcount} from '../../../model/apimodel/userInfo';
import {TextField} from '../../../common/textField/TextField';
import SubmitButton from '../../../common/button/SubmitButton';
import {ButtonVariantType, LoadingPosition} from '../../../model/enum/buttonEnum';
import {useStateValue} from '../../../context/StateProvider';
import {actionType} from '../../../context/Reducer';
import {MessageBarStatus} from '../../../model/enum/messageBarEnum';
import {isStringEmpty} from '../../../utils/commonFunction';

function DisableAccountPage() {
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [reason, setReason] = useState<number>(-1)
    const [otherReason, setOtherReason] = useState<string>()

    useEffect(() => {
        setOtherReason('')
    }, [reason])

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({type: actionType.SET_MESSAGE_BAR, messageBar: {isOpen: isOpen, text: message, status: status}})
    }

    const handleUpdateInfo = () => {
        let requestBody = {}
        const result = new Promise((resolve) => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
                resolve('success')
            }, 4000);
        }).then(() => {/*  */

        })

        return result
    }
    return (
        <div className="disable-account">
            <HeaderPage
                icon={<ManageAccountsIcon/>}
                text="Thiết lập tài khoản"
                textChild="Vô hiệu hóa tài khoản"
            />
            <div className="disable-account-icon">
                <PersonOffIcon/>
            </div>
            <div className="disable-account-note">
                <p>namkhenh8137-0UB thân mến,</p>
                <p>Chúng tôi rất tiếc vì tài khoản của bạn đã bị vô hiệu hóa. Sứ mệnh của chúng tôi là mang đến hành
                    trình chăm sóc sức khỏe tiện lợi dành cho bạn. Chúng tôi luôn nỗ lực hết mình để hỗ trợ bạn, mong
                    rằng chúng tôi sẽ có cơ hội xử lý các sự cố hoặc vấn đề khó khăn bạn đang gặp phải với tài khoản của
                    mình.</p>
                <p>Sau khi bị vô hiệu hóa tài khoản tại Hello Health, bạn sẽ có 30 ngày để khôi phục lại tài khoản bằng
                    cách đăng nhập lại. Nếu bạn không thực hiện thao tác này, tài khoản của bạn với các dữ liệu, thông
                    tin sức khỏe và lịch sử đặt khám sẽ không còn có thể truy cập hay khôi phục được nữa, đồng nghĩa với
                    việc tài khoản sẽ bị xóa vĩnh viễn.</p>
            </div>
            <div className="disable-account-reason">
                <Dropdown
                    placeholder="- Chọn -"
                    label="Vì sao bạn muốn vô hiệu hóa tài khoản?"
                    options={UserDisableAcount}
                    selectedKey={reason}
                    required
                    onChange={(_, selected) => {
                        setReason(Number(selected?.key))
                    }}
                    // errorMessage={errorMessageString.userSex}
                />
            </div>
            {reason === 2 && <TextField
                // label='Họ và tên'
                placeholder='Vui lòng nhập lý do của bạn'
                required={true}
                value={otherReason}
                multiline
                onChange={(_, value) => {
                    setOtherReason(value)
                }}
                // errorMessage={errorMessageString.userName}
            />}

            <div className="disable-account-button">
                <SubmitButton
                    id={'common-dialog-default'}
                    text={'Vô hiệu hóa tài khoản'}
                    disable={reason === -1 || (reason === 2 && isStringEmpty(otherReason))}
                    buttonVariantType={ButtonVariantType.Contained}
                    promise={handleUpdateInfo}
                    loading={loadingButton}
                    loadingPosition={LoadingPosition.Center}
                />
            </div>
        </div>
    )
}

export default DisableAccountPage