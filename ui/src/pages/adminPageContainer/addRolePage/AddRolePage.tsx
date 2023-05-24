import React, { useState } from 'react'
import './AddRolePage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { TextField } from '../../../common/textField/TextField'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { ActionManagerTableColumns, ActionManagerTableDatas, PermissionManagerTableColumns, PermissionManagerTableDatas, TableType } from '../../../model/enum/tableTypeEnum'
import TablePager from '../../../common/tablePager/TablePager'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import { Label } from '@fluentui/react/lib/Label'
import Switch from '@mui/material/Switch'
import DialogView from '../../../common/dialog/Dialog'
import Checkbox from "@mui/material/Checkbox";
import { useStateValue } from '../../../context/StateProvider'
import { MessageBarStatus } from '../../../model/enum/messageBarEnum'
import { actionType } from '../../../context/Reducer'
import { Dropdown } from '../../../common/dropdown/DropDown'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";

export enum PermissionStatus {
    Able,
    Enable
}

export enum PermissionAction {
    Create,
    Edit,
    Delete
}

function AddRolePage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [permissionAction, setPermissionAction] = useState<PermissionAction>()
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [selectedC, setSelectedC] = React.useState<readonly ActionManagerTableDatas[]>([]);
    const [, dispatch] = useStateValue();
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PermissionTable}
                showPermissionCreate={() => { setShowDialog(true); setPermissionAction(PermissionAction.Create) }}
                showPermissionEdit={() => { setShowDialog(true); setPermissionAction(PermissionAction.Edit) }}
                showPermissionDelete={() => { setShowDialog(true); setPermissionAction(PermissionAction.Delete) }}
            />
        ])
    }

    function createData(
        permissionId: string,
        permissionName: string,
        permissionMenu: string,
        permissionStatusI: PermissionStatus
    ): PermissionManagerTableColumns {
        // let add: JSX.Element = <Checkbox checked={addI === 1} onClick={() => {console.log(addI);
        // }}/>
        // let edit: JSX.Element = <Checkbox checked={editI === 1} />
        // let remove: JSX.Element = <Checkbox checked={removeI === 1} />
        let permissionStatus: JSX.Element = permissionStatusI === PermissionStatus.Able ? <div className='status-element'><CheckCircleOutlineOutlinedIcon sx={{ color: '#2da55b86' }} />Hoạt động</div> : <div className='status-element'><NotInterestedOutlinedIcon sx={{ color: '#ff4646b4' }} />Vô hiệu hóa</div>
        return {
            permissionId,
            permissionName,
            permissionMenu,
            permissionStatus
        };
    }


    const rows: PermissionManagerTableColumns[][] = [
        [
            createData("demo1", "demo1", "Đặt khám", PermissionStatus.Able),
            createData("demo2", "demo2", "Đặt khám", PermissionStatus.Enable),
            createData("demo3", "demo3", "Đặt khám", PermissionStatus.Able)
        ],
        [
            createData("demo4", "demo4", "Đặt khám", PermissionStatus.Able),
        ]
    ];

    const datas: PermissionManagerTableDatas[][] = [
        [
            {
                permissionId: 'demo1',
                permissionName: 'demo1',
                permissionStatus: PermissionStatus.Able
            },
            {
                permissionId: 'demo2',
                permissionName: 'demo2',
                permissionStatus: PermissionStatus.Enable
            },
            {
                permissionId: 'demo3',
                permissionName: 'demo3',
                permissionStatus: PermissionStatus.Able
            },
        ],
        [
            {
                permissionId: 'demo4',
                permissionName: 'demo4',
                permissionStatus: PermissionStatus.Able
            }
        ]
    ];

    function createActionData(
        actionName: string,
    ): ActionManagerTableColumns {
        return {
            actionName
        };
    }

    // const actionRows: ActionManagerTableColumns[] = [
    //     createActionData('Xem'),
    //     createActionData('Sửa'),
    // ];

    console.log(selectedC);
    

    const actionDatas: ActionManagerTableDatas[] = [
        {
            actionId: 'view',
            actionName: 'Xem',
            menuId: '1'
        },
        {
            actionId: 'edit',
            actionName: 'Sửa',
            menuId: '2'
        },
    ];

    const renderTitleForm = () => {
        switch (permissionAction) {
            case PermissionAction.Create:
                return 'Tạo quyền'
            case PermissionAction.Edit:
                return 'Chỉnh sửa quyền'
            case PermissionAction.Delete:
                return 'Xóa quyền'
            default:
                return ''
        }
    }

    const renderBodyForm = () => {
        switch (permissionAction) {
            case PermissionAction.Create:
            case PermissionAction.Edit:
                return renderBodyCreateForm()
            case PermissionAction.Delete:
                return renderBodyDeleteForm()
            default:
                break;
        }
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newSelected: string[] = []
        if (event.target.checked) {
            // props.rowData.forEach((row: any, i) => { return props.hasNavigate ? newSelected.push(row[Object.keys(row)[0]]?.props.children) : newSelected.push(row[Object.keys(row)[0]]) });
            actionDatas.forEach((row: ActionManagerTableDatas, i) => { return newSelected.push(row.actionId) });
            setSelected(newSelected);

            const newSelectedC = actionDatas
            setSelectedC(newSelectedC)

            // dispatch({
            //     type: actionType.SET_SELECTION,
            //     selection: {
            //         ...selection,
            //         selectedItems: newSelectedC,
            //         selectedCount: newSelectedC.length,
            //     },
            // });
            return;
        }
        setSelected([]);
        setSelectedC([]);
        // dispatch({
        //     type: actionType.SET_SELECTION,
        //     selection: {
        //         ...selection,
        //         selectedItems: [],
        //         selectedCount: 0,
        //     },
        // });
    };

    const handleClick = (event: React.MouseEvent<unknown>, rowChild: ActionManagerTableDatas) => {
        let rowChildText: string = rowChild.actionId
        const selectedIndex = selected.indexOf(rowChildText);
        let newSelected: readonly string[] = [];
        let newSelectedC: readonly ActionManagerTableDatas[] = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, rowChildText);
            newSelectedC = newSelectedC.concat(selectedC, rowChild);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelectedC = newSelectedC.concat(selectedC.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelectedC = newSelectedC.concat(selectedC.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
            newSelectedC = newSelectedC.concat(
                selectedC.slice(0, selectedIndex),
                selectedC.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
        setSelectedC(newSelectedC)
        // dispatch({ type: actionType.SET_SELECTION, selection: { ...selection, selectedItems: newSelectedC, selectedCount: newSelectedC.length } });
    };

    const isSelected = (rowChild: any) => {
        let rowChildText: string = rowChild[Object.keys(rowChild)[0]]
        return selected.indexOf(rowChildText) !== -1;
    };

    const renderBodyCreateForm = () => {
        return (
            <div className="permission-create-form">
                <div className="permission-create-wrap">
                    <div className="permission-create-item">
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
                    <div className="permission-create-item">
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
                    <div className="permission-create-item">
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
                    <div className="permission-create-item">
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
                    <div className="permission-create-item">
                        <Dropdown
                            placeholder="--"
                            label="Menu"
                            options={[]}
                            selectedKey={1}
                            required
                            onChange={(_, selected) => { }}
                            errorMessage={''}
                            // onFocus={() => { this.getDistrictOptions.bind(this)(Number(patientAddress.province?.key)) }}
                        />
                    </div>
                    <div className="permission-create-item">
                        <Label required>Trạng thái</Label>
                        <Switch
                            checked
                            onChange={() => { }}
                        />
                    </div>
                </div>
                <div className="role-assign-list">
                    {actionDatas.length !== 0 ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox" align='center'>
                                            <Checkbox
                                                color="primary"
                                                // indeterminate={numSelected > 0 && numSelected < rowCount}
                                                checked={actionDatas.length > 0 && selected.length === actionDatas.length}
                                                onChange={handleSelectAllClick}
                                                inputProps={{
                                                    "aria-label": "select all desserts",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align='center'>Tên thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {actionDatas.map((row, index) => {
                                        const isItemSelected = isSelected(row);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox" align='center'>
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                        onClick={(event) => { handleClick(event, row)}}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.actionName}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer> :
                        <div className="role-assign-list-nodata">
                            <ContentPasteOffOutlinedIcon />
                            Không có dữ liệu để hiển thị
                        </div>}
                </div>
            </div>
        )
    }

    const renderBodyDeleteForm = () => {
        return (
            <div className="permission-create-form">
                <div className=''>Bạn có chắc chắn muốn xóa quyền <strong>ngo_hoai_nam1</strong><br />Thao tác này không thể khôi phục!</div>
            </div>
        )
    }

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
        <div className='addrole-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Quản lý vai trò', href: '/admin/quan-ly-vai-tro' },
                    { key: 2, text: 'Thêm mới vai trò', href: '/quan-ly-vai-tro/them-moi-vai-tro' },
                ]}
            />
            <div className="addrole-page-title">
                Thêm mới vai trò
            </div>
            <div className="addrole-page-body">
                <div className="addrole-page-sub-title">
                    Thông tin vai trò
                </div>
                <div className="addrole-page-wrap">
                    <div className="addrole-info-item">
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
                    <div className="addrole-info-item">
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
                    <div className="addrole-info-item">
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
                    <div className="addrole-info-item">
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
                    <div className="addrole-info-item">
                        <Label required>Trạng thái</Label>
                        <Switch
                            checked
                            onChange={() => { }}
                        />
                    </div>
                </div>
                <div className="addrole-page-sub-title">
                    Danh sách quyền
                </div>
                <div className="addrole-page-wrap">
                    <TablePager<PermissionManagerTableColumns, PermissionManagerTableDatas>
                        tableType={TableType.PermissionTable}
                        batchActionElements={onRenderActionButtons()}
                        rowData={rows[currentPage]}
                        dataTotal={datas[currentPage]}
                        hasCheckBox
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={10}
                        className='addrole-page-table'
                    />
                </div>
            </div>
            <DialogView
                title={renderTitleForm()}
                hidden={!showDialog}
                customContent={renderBodyForm()}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={() => { setShowDialog(false) }}
                loading={loadingButton}
            />
        </div>
    )
}

export default AddRolePage