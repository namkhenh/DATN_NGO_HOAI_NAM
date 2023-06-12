import React from 'react'
import {TableType} from '../../../model/enum/tableTypeEnum'
import {IButtonProps, ICommandBarItemProps, ICommandBarStyles} from '@fluentui/react'
import {CommandBarView} from '../../../common/commandBar/CommandBar'
import {useStateValue} from '../../../context/StateProvider'
import {AccountStatus} from '../accountManagerPage/AccountManagerPage'
import { AppointmentStatus } from '../../../model/enum/appointmentEnum'

interface IPatientListCommandBar {
  tableType: TableType
  showAppointmentAccept?: () => void
  showAppointmentRefuse?: () => void
  showAppointmentCancel?: () => void
  showAccountCreate?: () => void
  showAccountEdit?: () => void
  showAccountAssign?: () => void
  showAccountChangePass?: () => void
  showAccountEnable?: () => void
  showAccountAble?: () => void
  showAccountDelete?: () => void
  showRoleDelete?: () => void
  showPermissionCreate?: () => void
  showPermissionEdit?: () => void
  showPermissionDelete?: () => void
  showAddAssignUser?: () => void
  showAddService?: () => void
  showPayService?: () => void
}

function PatientListCommandBar(props: IPatientListCommandBar) {
  const [{ selection }] = useStateValue();
  const initActionBar = (): ICommandBarItemProps[] => {
    switch (props.tableType) {
      case TableType.PatientReceptionListTable:
        return patientReceptionListActions()
      case TableType.ApproveCalendarTable:
        return approveCalendarListActions()
      case TableType.AccountManagerTable:
        return accountManagerActions()
      case TableType.RoleManagerTable:
        return roleManagerActions()
      case TableType.PermissionTable:
        return permissionManagerActions()
      case TableType.UserAssignTable:
        return userAssignActions()
      case TableType.ServiceManagerTable:
        return serviceManagerActions()
      case TableType.PaidContentTable:
        return paidContentActions()
      case TableType.PaidManagerTable:
        return paidManagerActions()
      case TableType.HealthCareTable:
        return healthCareActions()
      default:
        return [];
    }
  }

  console.log(selection);
  

  // useEffect(()=>{}, [selection])
  const patientReceptionListActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    // if (selected.selectedCount === 1 && selected.selectedItems[0]?.appointmentStatus === AppointmentStatus.Waiting) {
    
    commandBarItems.push(
      {
        key: 'account-create',
        text: 'Tạo hồ sơ',
        href: '/admin/tiep-don-benh-nhan/them-moi-ho-so',
        iconProps: { iconName: 'Add', style: { color: '#00794E' } },
        // onClick: () => {
        //   props.showAccountCreate!()
        // }
      }
    )

    commandBarItems.push({
      key: "patient-list-export",
      text: "Xuất file",
      iconProps: { iconName: "Export", style: { color: "#1976d2" } },
      onClick: () => {
        console.log("ok");
      },
    });
    // console.log(commanarItems)
    return commandBarItems
  }

  const approveCalendarListActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    // if (selected.selectedCount === 1 && selected.selectedItems[0]?.appointmentStatus === AppointmentStatus.Waiting) {
    
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.appointmentStatus === AppointmentStatus.Waiting) {
      commandBarItems.push({
        key: "patient-list-accept",
        text: "Đồng ý",
        iconProps: {
          iconName: "EventAccepted",
          style: { color: "#00794E" },
        },
        onClick: () => {
          props.showAppointmentAccept!();
        },
      });
    }
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.appointmentStatus === AppointmentStatus.Waiting) {
      commandBarItems.push({
        key: "patient-list-decline",
        text: "Từ chối",
        iconProps: {
          iconName: "EventDeclined",
          style: { color: "#AC0000" },
        },
        onClick: () => {
          props.showAppointmentRefuse!();
        },
      });
    }
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.appointmentStatus === AppointmentStatus.Success) {
      commandBarItems.push({
        key: "patient-list-cancel",
        text: "Hủy lịch",
        iconProps: { iconName: "Cancel", style: { color: "#AC0000" } },
        onClick: () => {
          props.showAppointmentCancel!();
        },
      });
    }
    commandBarItems.push({
      key: "patient-list-export",
      text: "Xuất file",
      iconProps: { iconName: "Export", style: { color: "#1976d2" } },
      onClick: () => {
        console.log("ok");
      },
    });
    return commandBarItems
  }

  const accountManagerActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    commandBarItems.push(
      {
        key: 'account-create',
        text: 'Tạo tài khoản',
        iconProps: { iconName: 'AddFriend', style: { color: '#00794E' } },
        onClick: () => {
          props.showAccountCreate!()
        }
      }
    )
    if (selection.selectedCount === 1) {
      commandBarItems.push(
        {
          key: 'account-edit',
          text: 'Chỉnh sửa',
          iconProps: { iconName: 'edit', style: { color: '#707070' } },
          onClick: () => {
            props.showAccountEdit!()
          }
        },
      )
      commandBarItems.push(
        {
          key: 'account-assign',
          text: 'Gán vai trò',
          iconProps: { iconName: 'Permissions', style: { color: '#707070' } },
          onClick: () => {
            props.showAccountAssign!()
          }
        },
      )
      commandBarItems.push(
        {
          key: 'account-changepassword',
          text: 'Đổi mật khẩu',
          iconProps: { iconName: 'TextBox', style: { color: '#707070' } },
          onClick: () => {
            props.showAccountChangePass!()
          }
        },
      )
    }
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.status === AccountStatus.Able) {
      commandBarItems.push(
        {
          key: 'account-enable',
          text: 'Khóa tài khoản',
          iconProps: { iconName: 'Lock', style: { color: '#AC0000' } },
          onClick: () => {
            props.showAccountEnable!()
          }
        }
      )
    }
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.status === AccountStatus.Enable) {
      commandBarItems.push(
        {
          key: 'account-able',
          text: 'Mở khóa tài khoản',
          iconProps: { iconName: 'UnLock', style: { color: '#AC0000' } },
          onClick: () => {
            props.showAccountAble!()
          }
        }
      )
    }
    if (selection.selectedCount !== 0) {
      commandBarItems.push(
        {
          key: 'account-delete',
          text: 'Xóa tài khoản',
          iconProps: { iconName: 'trash', style: { color: '#AC0000' } },
          onClick: () => {
            props.showAccountDelete!()
          }
        }
      )
    }
    return commandBarItems
  }
  
  const roleManagerActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    commandBarItems.push(
      {
        key: 'role-create',
        text: 'Tạo vai trò',
        href: '/admin/quan-ly-vai-tro/them-moi-vai-tro',
        iconProps: { iconName: 'WorkforceManagement', style: { color: '#00794E' } },
        // onClick: () => {
        //   props.showRoleCreate!()
        // }
      }
    )
    if (selection.selectedCount === 1) {
      // commandBarItems.push(
      //   {
      //     key: 'role-edit',
      //     text: 'Chỉnh sửa',
      //     iconProps: { iconName: 'edit', style: { color: '#707070' } },
      //     href: `/admin/quan-ly-vai-tro/chi-tiet-vai-tro/${selection.selectedItems[0]?.roleId}`,
      //   },
      // )
      commandBarItems.push(
        {
          key: 'role-assign',
          text: 'Gán người dùng',
          iconProps: { iconName: 'Permissions', style: { color: '#707070' } },
          href: `/admin/quan-ly-vai-tro/gan-nguoi-dung/${selection.selectedItems[0]?.id}`,
        },
      )
    }
    if (selection.selectedCount === 1) {
      commandBarItems.push(
        {
          key: 'role-delete',
          text: 'Xóa vai trò',
          iconProps: { iconName: 'trash', style: { color: '#AC0000' } },
          onClick: () => {
            props.showRoleDelete!()
          }
        }
      )
    }
    return commandBarItems
  }

  const permissionManagerActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    commandBarItems.push(
      {
        key: 'permission-create',
        text: 'Tạo quyền',
        iconProps: { iconName: 'add', style: { color: '#00794E' } },
        onClick: () => {
          props.showPermissionCreate!()
        }
      }
    )
    if (selection.selectedCount === 1) {
      commandBarItems.push(
        {
          key: 'permission-edit',
          text: 'Chỉnh sửa',
          iconProps: { iconName: 'edit', style: { color: '#707070' } },
          onClick: () => {
            props.showPermissionEdit!()
          }
        },
      )
    }
    if (selection.selectedCount !== 0) {
      commandBarItems.push(
        {
          key: 'permission-delete',
          text: 'Xóa quyền',
          iconProps: { iconName: 'trash', style: { color: '#AC0000' } },
          onClick: () => {
            props.showPermissionDelete!()
          }
        }
      )
    }
    return commandBarItems
  }

  const userAssignActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    commandBarItems.push(
      {
        key: 'user-assign',
        text: 'Thêm người dùng',
        iconProps: { iconName: 'AddFriend', style: { color: '#00794E' } },
        onClick: () => {
          props.showAddAssignUser!()
        }
      }
    )
    return commandBarItems
  }

  const serviceManagerActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    commandBarItems.push(
      {
        key: 'add-service',
        text: 'Thêm dịch vụ',
        iconProps: { iconName: 'Add', style: { color: '#00794E' } },
        onClick: () => {
          props.showAddService!()
        }
      }
    )
    return commandBarItems
  }

  const paidContentActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    if (selection.selectedCount !== 0) { 
      commandBarItems.push(
        {
          key: 'pay-service',
          text: 'Thanh toán',
          iconProps: { iconName: 'ShoppingCart', style: { color: '#707070' } },
          onClick: () => {
            props.showPayService!()
          }
        }
      )
    }
    return commandBarItems
  }

  const paidManagerActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    commandBarItems.push({
      key: "patient-list-export",
      text: "Xuất file",
      iconProps: { iconName: "Export", style: { color: "#1976d2" } },
      onClick: () => {
        console.log("ok");
      },
    });
    return commandBarItems
  }

  const healthCareActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    commandBarItems.push({
      key: "patient-list-export",
      text: "Xuất file",
      iconProps: { iconName: "Export", style: { color: "#1976d2" } },
      onClick: () => {
        console.log("ok");
      },
    });
    return commandBarItems
  }

  const commandBarStyles: ICommandBarStyles = {
    root: {
      paddingLeft: 12,
    }
  }
  const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
  return (
    <React.Fragment>
      <CommandBarView
        onReduceData={() => {
          return undefined
        }}
        shiftOnReduce={false}
        overflowButtonProps={overflowProps}
        overflowItems={[]}
        className='patient-list-commandbar'
        items={initActionBar()}
        styles={commandBarStyles}
      />
    </React.Fragment>
  )
}

export default PatientListCommandBar