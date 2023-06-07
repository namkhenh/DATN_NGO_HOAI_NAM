import React, {useState} from 'react'
import './PaidDetailManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import {SearchBoxView} from '../../../common/searchBox/SearchBox'
import {Dropdown} from '../../../common/dropdown/DropDown'
import {Label} from '@fluentui/react'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import {TextField} from '../../../common/textField/TextField'
import TablePager from '../../../common/tablePager/TablePager'
import {ServiceListTableColumns, ServiceListTableDatas, TableType} from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import {useStateValue} from '../../../context/StateProvider'
import {MessageBarStatus} from '../../../model/enum/messageBarEnum'
import {actionType} from '../../../context/Reducer'
import DialogView from '../../../common/dialog/Dialog'

export enum PaidStatus {
    Paid,
    UnPaid
}

function PaidDetailManagerPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0);
    
    function createDataForm(
        serviceCode: string,
        serviceName: string,
        serviceCost: string,
    ): ServiceListTableColumns {
        return {
            serviceCode,
            serviceName,
            serviceCost,
        };
    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PaidContentTable}
                showPayService={() => { setShowDialog (true)}}
            />
        ])
    }

    const rowForms: ServiceListTableColumns[] = [
        createDataForm('1234', 'Khám Nhi', '35000'),
        createDataForm('425', 'Khám Phụ sản', '60000'),
        createDataForm('74', 'Khám mắt', '28000'),
        createDataForm('1234', 'Khám Nhi', '35000'),
        createDataForm('425', 'Khám Phụ sản', '60000'),
        createDataForm('74', 'Khám mắt', '28000'),
        createDataForm('1234', 'Khám Nhi', '35000'),
        createDataForm('425', 'Khám Phụ sản', '60000'),
        createDataForm('74', 'Khám mắt', '28000'),
    ];

    const datas: ServiceListTableDatas[] = [
        {
            serviceId: "asdkhjk2124sdfd",
            serviceCode: "1234",
            serviceName: "Khám Nhi",
            designatedRoom: "Phòng 1",
            designatedFaculty: "Khoa Đẻ",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "35000",
            patientPaid: "35000",
        },
        {
            serviceId: "asldkakls23j23",
            serviceCode: "425",
            serviceName: "Khám Phụ sản",
            designatedRoom: "Phòng 2",
            designatedFaculty: "Khoa Khám bệnh",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "60000",
            patientPaid: "60000",
        },
        {
            serviceId: "sdlkdjflkjkl23423",
            serviceCode: "74",
            serviceName: "Khám mắt",
            designatedRoom: "Phòng 3",
            designatedFaculty: "Khoa Mắt",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "28000",
            patientPaid: "28000",
        },
        {
            serviceId: "asdkhjk2124sdfd",
            serviceCode: "1234",
            serviceName: "Khám Nhi",
            designatedRoom: "Phòng 1",
            designatedFaculty: "Khoa Đẻ",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "35000",
            patientPaid: "35000",
        },
        {
            serviceId: "asldkakls23j23",
            serviceCode: "425",
            serviceName: "Khám Phụ sản",
            designatedRoom: "Phòng 2",
            designatedFaculty: "Khoa Khám bệnh",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "60000",
            patientPaid: "60000",
        },
        {
            serviceId: "sdlkdjflkjkl23423",
            serviceCode: "74",
            serviceName: "Khám mắt",
            designatedRoom: "Phòng 3",
            designatedFaculty: "Khoa Mắt",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "28000",
            patientPaid: "28000",
        },
        {
            serviceId: "asdkhjk2124sdfd",
            serviceCode: "1234",
            serviceName: "Khám Nhi",
            designatedRoom: "Phòng 1",
            designatedFaculty: "Khoa Đẻ",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "35000",
            patientPaid: "35000",
        },
        {
            serviceId: "asldkakls23j23",
            serviceCode: "425",
            serviceName: "Khám Phụ sản",
            designatedRoom: "Phòng 2",
            designatedFaculty: "Khoa Khám bệnh",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "60000",
            patientPaid: "60000",
        },
        {
            serviceId: "sdlkdjflkjkl23423",
            serviceCode: "74",
            serviceName: "Khám mắt",
            designatedRoom: "Phòng 3",
            designatedFaculty: "Khoa Mắt",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "28000",
            patientPaid: "28000",
        },
        {
            serviceId: "asdkhjk2124sdfd",
            serviceCode: "1234",
            serviceName: "Khám Nhi",
            designatedRoom: "Phòng 1",
            designatedFaculty: "Khoa Đẻ",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "35000",
            patientPaid: "35000",
        },
        {
            serviceId: "asldkakls23j23",
            serviceCode: "425",
            serviceName: "Khám Phụ sản",
            designatedRoom: "Phòng 2",
            designatedFaculty: "Khoa Khám bệnh",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "60000",
            patientPaid: "60000",
        },
        {
            serviceId: "sdlkdjflkjkl23423",
            serviceCode: "74",
            serviceName: "Khám mắt",
            designatedRoom: "Phòng 3",
            designatedFaculty: "Khoa Mắt",
            designatedDoctor: "Trưởng khoa ABC",
            serviceCost: "28000",
            patientPaid: "28000",
        },

    ];

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        let requestBody = {

        }
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
        <div className='paiddetail-page'>
            <div className="paiddetail-page-container">
                <BreadCrumb
                    breadcrumbItem={[
                        { key: 1, text: 'Thanh toán ngoại trú', href: '/admin/thanh-toan-ngoai-tru' },
                        { key: 2, text: 'Chi tiết', href: '/admin/thanh-toan-ngoai-tru/chi-tiet-thanh-toan' },
                    ]}
                />
                <div className="paiddetail-page-header">
                    <div className="page-header-left">
                        <div className="page-patient-name">
                            Ngô Hoài Nam
                        </div>
                        <div className="page-patient-gender">
                            Nam
                        </div>
                    </div>
                    <div className="page-header-center">
                        <div className="search-id">
                            <SearchBoxView
                                placeholder='Mã bệnh nhân/ Số điện thoại/ CMND'
                                onSearch={() => { }}
                            />
                        </div>
                        <div className="page-profile-paid">
                            <Label>Trạng thái</Label>
                            <div className="page-profile-paid-status">
                                <Dropdown
                                    placeholder=""
                                    options={[]}
                                // selectedKey={userAddress.province?.key}
                                // required
                                // onChange={(_, selected) => {
                                //     onChangeAddress(UserAddressModelProperty.province, selected)
                                // }}
                                // errorMessage={errorMessageString.userAddress.province}
                                // onFocus={this.getProvinceOptions.bind(this)}
                                />
                            </div>
                        </div>

                    </div>
                    {/* <div className="page-header-right">
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Thanh toán</Button>
                    </div> */}
                </div>
                <div className="paiddetail-page-info">
                    <div className="page-info-item">
                        Mã bệnh nhân: BN12345
                    </div>
                    <div className="page-info-item">
                        Ngày sinh: 19/03/2002
                    </div>
                    <div className="page-info-item">
                        Thời gian tiếp nhận: 20/03/2023 09:45
                    </div>
                    <div className="page-info-item">
                        Mã hồ sơ: HS12345
                    </div>
                    <div className="page-info-item">
                        Số điện thoại: 0123456789
                    </div>
                    <div className="page-info-item">
                        Địa chỉ: Ngõ 118, Tân Triều
                    </div>
                </div>
                <div className="paiddetail-sub-title">
                    Thông tin thanh toán
                </div>
                <div className="paiddetail-page-info">
                    <div className="page-info-item">
                        <Dropdown
                            placeholder="--"
                            label='Hình thức thanh toán'
                            options={[]}
                            required
                        // selectedKey={userAddress.province?.key}
                        // required
                        // onChange={(_, selected) => {
                        //     onChangeAddress(UserAddressModelProperty.province, selected)
                        // }}
                        // errorMessage={errorMessageString.userAddress.province}
                        // onFocus={this.getProvinceOptions.bind(this)}
                        />
                    </div>
                    <div className="page-info-item">
                        <TextField
                            label='Số tiền'
                            required
                            readOnly
                        />
                    </div>
                    <div className="page-info-item">
                        <TextField
                            label='Ghi chú'
                            
                        />
                    </div>
                </div>
                <div className="paiddetail-page-cost">
                    <div className="page-cost-wrap">
                        <AttachMoneyOutlinedIcon />
                        <div className="page-cost-detail">
                            <div className='cost-detail'>34.500</div>
                            <div className='cost-text'>Tổng chi phí</div>
                        </div>
                    </div>
                    <div className="page-cost-wrap">
                        <PointOfSaleOutlinedIcon />
                        <div className="page-cost-detail">
                            <div className='cost-detail'>0</div>
                            <div className='cost-text'>Tiền thu</div>
                        </div>
                    </div>
                </div>
                <div className="paiddetail-sub-title">
                    Nội dung thanh toán
                </div>
                <div className="paiddetail-list-wrap">
                    <TablePager<ServiceListTableColumns, ServiceListTableDatas>
                        tableType={TableType.PaidContentTable}
                        batchActionElements={onRenderActionButtons()}
                        rowData={rowForms}
                        dataTotal={datas}
                        hasCheckBox
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={10}
                        className='paiddetail-table'
                    />
                </div>
                <DialogView
                    title={'Xác nhận thanh toán'}
                    hidden={!showDialog}
                    message='Bệnh nhân đã thanh toán 34.500'
                    // closeWithPromise={this.onLogoutAction.bind(this)}
                    // confirm={this.handlecClosePopup.bind(this)}
                    confirmButtonText={'Xác nhận'}
                    confirmWithPromise={onSave}
                    closeButtonText='Quay lại'
                    close={() => { setShowDialog(false) }}
                    loading={loadingButton}
                />
            </div>
        </div>
    )
}

export default PaidDetailManagerPage