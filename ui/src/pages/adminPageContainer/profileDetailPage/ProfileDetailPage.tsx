import React, {useEffect, useState} from 'react'
import './ProfileDetailPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Button} from '@mui/material';
import {ButtonColorType, ButtonVariantType} from '../../../model/enum/buttonEnum';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import TablePager from '../../../common/tablePager/TablePager';
import {ServiceListTableColumns, ServiceListTableDatas, TableType} from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import DialogView from '../../../common/dialog/Dialog';
import {useStateValue} from '../../../context/StateProvider';
import {SearchBoxView} from '../../../common/searchBox/SearchBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function ProfileDetailPage() {
    const [{ selection }, dispatch] = useStateValue();
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [rows, setRow] = useState<ServiceListTableColumns[]>([])
    const [rowDatas, setRowData] = useState<ServiceListTableDatas[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0);
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.ServiceManagerTable}
                showAddService={() => { setShowDialog(true) }}
            />
        ])
    }

    const onSave = () => {
        setShowDialog(false)
        setRowData(selection.selectedItems)
    }

    // useEffect(() => {
    //     setRow(rowDatas.map((e: ServiceListTableDatas) => {
    //         return {
    //             serviceCode: e.serviceCode,
    //             serviceName: e.serviceName,
    //             designatedRoom: e.designatedRoom,
    //             designatedFaculty: e.designatedFaculty,
    //             designatedDoctor: e.designatedDoctor,
    //             serviceCost: e.serviceCost,
    //             patientPaid: e.patientPaid,
    //             task: <IconButton aria-label="delete" size="small" onClick={() => { removeRole(e.serviceId) }}>
    //                 <DeleteIcon color='error' />
    //             </IconButton>
    //         }
    //     }))
    // }, [rows, rowDatas])

    const removeRole = (idDel: string) => {
        setRowData(rowDatas.filter((e) => idDel !== e.serviceId))
    }

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

    const renderBodyForm = () => {
        return (
            <div className="adduserassign-form">
                <div className="adduserassign-search">
                    <SearchBoxView
                        placeholder='Mã dịch vụ/ Tên dịch vụ'
                        onSearch={onSearch}
                    />
                </div>
                <div className="adduserassign-table">
                    <TablePager<ServiceListTableColumns, ServiceListTableDatas>
                        tableType={TableType.AddServiceManagerTable}
                        rowData={rowForms}
                        dataTotal={datas}
                        hasCheckBox
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={2}
                        isLoading={false}

                    />
                </div>
            </div>
        )
    }

    return (
        <div className='profiledetail-page'>
            <div className="profiledetail-page-container">
                <BreadCrumb
                    breadcrumbItem={[
                        { key: 1, text: 'Tiếp đón bệnh nhân', href: '/admin/tiep-don-benh-nhan' },
                        { key: 2, text: 'Chỉ định dịch vụ', href: '/admin/chi-tiet-ho-so' },
                    ]}
                />
                <div className="profiledetail-page-header">
                    <div className="page-header-left">
                        <div className="page-patient-name">
                            Ngô Hoài Nam
                        </div>
                        <div className="page-patient-gender">
                            Nam
                        </div>
                        <div className="page-patient-emergency">
                            <CheckCircleIcon color='error'/> Cấp cứu
                        </div>
                    </div>
                    <div className="page-header-right">
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Lịch sử khám</Button>
                    </div>
                </div>
                <div className="profiledetail-page-info">
                    <div className="page-info-left">
                        {/* <div className="page-info-avt"> */}
                            {/* <Avatar variant="rounded" alt={''} src={flag}
                                sx={{ width: '132px', height: '132px' }}
                            /> */}
                            <ImageNotSupportedOutlinedIcon />
                        {/* </div> */}
                    </div>
                    <div className="page-info-right">
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                        <div className="page-info-item">
                            Mã bệnh nhân: BN12345
                        </div>
                    </div>
                </div>
                <div className="profiledetail-page-cost">
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
                            <div className='cost-text'>BN thanh toán</div>
                        </div>
                    </div>
                </div>
                <div className="profiledetail-sub-title">
                    Thông tin dịch vụ
                </div>
                <div className="service-list-wrap">
                    <TablePager<ServiceListTableColumns, ServiceListTableDatas>
                        tableType={TableType.ServiceManagerTable}
                        batchActionElements={onRenderActionButtons()}
                        rowData={rows}
                        dataTotal={datas}
                        hasCheckBox={false}
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={15}
                        hasNavigate={false}
                        className='service-table'
                        hasTablePaging={false}
                        isLoading={false}

                    />
                </div>
                <div className="service-list-button">
                    <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Hủy</Button>
                    {true && <Button variant={ButtonVariantType.Contained} onClick={() => {window.open('/admin/dashboard', '_self')}}>Lưu</Button>}
                </div> 
                <DialogView
                    title={'Thêm dịch vụ'}
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

export default ProfileDetailPage