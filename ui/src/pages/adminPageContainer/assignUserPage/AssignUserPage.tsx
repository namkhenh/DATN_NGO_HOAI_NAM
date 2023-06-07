import React, {useEffect, useState} from 'react'
import './AssignUserPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import {TextField} from '../../../common/textField/TextField'
import {DatePicker} from '../../../common/datePicker/DatePicker'
import {Label} from '@fluentui/react/lib/Label'
import Switch from '@mui/material/Switch'
import TablePager from '../../../common/tablePager/TablePager'
import {TableType, UserAssignTableColumns, UserAssignTableDatas} from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import {AccountStatus} from '../accountManagerPage/AccountManagerPage'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogView from '../../../common/dialog/Dialog'
import {MessageBarStatus} from '../../../model/enum/messageBarEnum'
import {useStateValue} from '../../../context/StateProvider'
import {actionType} from '../../../context/Reducer'
import {SearchBoxView} from '../../../common/searchBox/SearchBox'
import {ButtonColorType, ButtonVariantType} from '../../../model/enum/buttonEnum'
import Button from '@mui/material/Button'

function AssignUserPage() {
    const [{ selection }, dispatch] = useStateValue();
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [rows, setRow] = useState<UserAssignTableColumns[]>([])
    const [rowDatas, setRowData] = useState<UserAssignTableDatas[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0);
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.UserAssignTable}
                showAddAssignUser={() => { setShowDialog(true) }}
            />
        ])
    }

    function createData(
        userName: string,
        fullName: string,
        phoneNumber: string,
        insuranceNumber: string,
    ): UserAssignTableColumns {
        let task: JSX.Element = <IconButton aria-label="delete" size="small" onClick={() => { }}>
            <DeleteIcon color='error' />
        </IconButton>
        return {
            userName,
            fullName,
            phoneNumber,
            insuranceNumber,
            task
        };
    }

    // const rows: UserAssignTableColumns[] = [
    //     createData('ngo_hoai_nam1', 'Ngô Hoài Nam', '0123456788', '012345678'),
    //     createData('ngo_hoai_nam2', 'Ngô Hoài Nam', '0123456788', '012345678'),
    // ];

    function createDataForm(
        userName: string,
        fullName: string,
        phoneNumber: string,
        insuranceNumber: string,
    ): UserAssignTableColumns {
        return {
            userName,
            fullName,
            phoneNumber,
            insuranceNumber,
        };
    }

    const rowForms: UserAssignTableColumns[] = [
        createDataForm('ngo_hoai_nam1', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam2', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam3', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam1', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam2', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam3', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam1', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam2', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam3', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam1', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam2', 'Ngô Hoài Nam', '0123456788', '012345678'),
        createDataForm('ngo_hoai_nam3', 'Ngô Hoài Nam', '0123456788', '012345678'),
    ];

    const datas: UserAssignTableDatas[] = [
        {
            id: 'asd2klhdfjksk',
            userName: 'ngo_hoai_nam1',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 0,
            status: AccountStatus.Able
        },
        {
            id: 'aksjhdakjsh29',
            userName: 'ngo_hoai_nam2',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
        {
            id: 'qwefdf2412rf',
            userName: 'ngo_hoai_nam3',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
        {
            id: 'asd2klhdfjksk',
            userName: 'ngo_hoai_nam1',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 0,
            status: AccountStatus.Able
        },
        {
            id: 'aksjhdakjsh29',
            userName: 'ngo_hoai_nam2',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
        {
            id: 'qwefdf2412rf',
            userName: 'ngo_hoai_nam3',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
        {
            id: 'asd2klhdfjksk',
            userName: 'ngo_hoai_nam1',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 0,
            status: AccountStatus.Able
        },
        {
            id: 'aksjhdakjsh29',
            userName: 'ngo_hoai_nam2',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
        {
            id: 'qwefdf2412rf',
            userName: 'ngo_hoai_nam3',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
        {
            id: 'asd2klhdfjksk',
            userName: 'ngo_hoai_nam1',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 0,
            status: AccountStatus.Able
        },
        {
            id: 'aksjhdakjsh29',
            userName: 'ngo_hoai_nam2',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
        {
            id: 'qwefdf2412rf',
            userName: 'ngo_hoai_nam3',
            fullName: 'Ngô Hoài Nam',
            phoneNumber: '0123456788',
            insuranceNumber: '012345678',
            gender: 1,
            status: AccountStatus.Enable
        },
    ];
    
    const renderBodyForm = () => {
        return (
            <div className="adduserassign-form">
                <div className="adduserassign-search">
                    <SearchBoxView
                        placeholder='Tên đăng nhập/ Tên hiển thị'
                        onSearch={onSearch}
                    />
                </div>
                <div className="adduserassign-table">
                    <TablePager<UserAssignTableColumns, UserAssignTableDatas>
                        tableType={TableType.AddUserAssignTable}
                        rowData={rowForms}
                        dataTotal={datas}
                        hasCheckBox
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={10}
                    />
                </div>
            </div>
        )
    }
    
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        setShowDialog(false)
        setRowData(selection.selectedItems)
    }

    useEffect(() => {
        setRow(rowDatas.map((e: UserAssignTableDatas) => {
            return {
                userName: e.userName,
                fullName: e.fullName,
                phoneNumber: e.phoneNumber,
                insuranceNumber: e.insuranceNumber,
                task: <IconButton aria-label="delete" size="small" onClick={() => { removeRole(e.id) }}>
                    <DeleteIcon color='error' />
                </IconButton>
            }
        }))
    }, [rows, rowDatas])
    
    const removeRole = (idDel: string) => {
        setRowData(rowDatas.filter((e) => idDel !== e.id))
    }

    return (
        <div className='assignuser-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Quản lý vai trò', href: '/admin/quan-ly-vai-tro' },
                    { key: 2, text: 'Gán người dùng', href: '/quan-ly-vai-tro/gan-nguoi-dung' },
                ]}
            />
            <div className="assignuser-page-title">
                Gán vai trò cho người dùng
            </div>
            <div className="assignuser-page-body">
                <div className="assignuser-page-sub-title">
                    Thông tin vai trò
                </div>
                <div className="assignuser-page-wrap">
                    <div className="assignuser-info-item">
                        <TextField
                            label='Mã vai trò'
                            required
                            placeholder='--'
                            value={'appointmentInfo.appointmentReason'}
                            onChange={(_, value) => {
                                // onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
                            }}
                        />
                    </div>
                    <div className="assignuser-info-item">
                        <TextField
                            label='Tên vai trò'
                            required
                            placeholder='--'
                            value={'appointmentInfo.appointmentReason'}
                            onChange={(_, value) => {
                                // onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
                            }}
                        />
                    </div>
                    <div className="assignuser-info-item">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Thời gian bắt đầu'
                            isRequired={true}
                            // strings={defaultDatePickerStrings}
                            onSelectDate={(date) => {
                                // onChangeOneField(AppointmentInfoModelProperty.appointmentDate, `${date!.getMonth() + 1}/${date!.getDate()}/${date!.getFullYear()}`)
                            }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            minDate={new Date()}
                        />
                    </div>
                    <div className="assignuser-info-item">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Thời gian kết thúc'
                            isRequired={true}
                            // strings={defaultDatePickerStrings}
                            onSelectDate={(date) => {
                                // onChangeOneField(AppointmentInfoModelProperty.appointmentDate, `${date!.getMonth() + 1}/${date!.getDate()}/${date!.getFullYear()}`)
                            }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            minDate={new Date()}
                        />
                    </div>
                    <div className="assignuser-info-item">
                        <Label required>Trạng thái</Label>
                        <Switch
                            checked
                            onChange={() => { }}
                        />
                    </div>
                </div>
                <div className="assignuser-page-sub-title">
                    Danh sách người dùng
                </div>
                <div className="assignuser-page-wrap">
                    <TablePager<UserAssignTableColumns, UserAssignTableDatas>
                        tableType={TableType.UserAssignTable}
                        batchActionElements={onRenderActionButtons()}
                        rowData={rows}
                        dataTotal={datas}
                        hasCheckBox={false}
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={10}
                        className='assignuser-table'
                    />
                </div>
                <div className="assignuser-page-button">
                    <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Hủy</Button>
                    {true && <Button variant={ButtonVariantType.Contained}>Lưu</Button>}
                </div>
                <DialogView
                    title={'Thêm người dùng'}
                    hidden={!showDialog}
                    customContent={renderBodyForm()}
                    // closeWithPromise={this.onLogoutAction.bind(this)}
                    // confirm={this.handlecClosePopup.bind(this)}
                    confirmButtonText={'Lưu'}
                    confirm={onSave}
                    closeButtonText='Hủy bỏ'
                    close={() => { setShowDialog(false) }}
                />
            </div>
        </div>
    )
}

export default AssignUserPage