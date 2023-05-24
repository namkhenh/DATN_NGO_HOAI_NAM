import React, { useEffect, useState } from 'react'
import { TableType } from '../../../model/enum/tableTypeEnum'
import { IButtonProps, ICommandBarItemProps, ICommandBarStyles, styled } from '@fluentui/react'
import { CommandBarView } from '../../../common/commandBar/CommandBar'
import { useStateValue } from '../../../context/StateProvider'
import { AppointmentStatus } from '../../../model/enum/appointmentEnum'
import { AccountStatus } from '../accountManagerPage/AccountManagerPage'

interface IPatientListCommandBar {
  tableType: TableType
  showPatientAccept?: () => void
  showPatientRefuse?: () => void
  showPatientCancel?: () => void
  showAccountCreate?: () => void
  showAccountEdit?: () => void
  showAccountAssign?: () => void
  showAccountChangePass?: () => void
  showAccountEnable?: () => void
  showAccountAble?: () => void
  showAccountDelete?: () => void
  showRoleCreate?: () => void
  showRoleEdit?: () => void
  showRoleAssign?: () => void
  showRoleDelete?: () => void
  showPermissionCreate?: () => void
  showPermissionEdit?: () => void
  showPermissionDelete?: () => void
}

function PatientListCommandBar(props: IPatientListCommandBar) {
  const [{ selection }] = useStateValue();
  const initActionBar = (): ICommandBarItemProps[] => {
    switch (props.tableType) {
      case TableType.PatientListTable:
        return patientListActions()
      case TableType.AccountManagerTable:
        return accountManagerActions()
      case TableType.RoleManagerTable:
        return roleManagerActions()
      case TableType.PermissionTable:
        return permissionManagerActions()
      default:
        return [];
    }
  }

  // useEffect(()=>{}, [selection])
  const patientListActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    console.log(selection)
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
          props.showPatientAccept!();
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
          props.showPatientRefuse!();
        },
      });
    }
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.appointmentStatus === AppointmentStatus.Success) {
      commandBarItems.push({
        key: "patient-list-cancel",
        text: "Hủy lịch",
        iconProps: { iconName: "Cancel", style: { color: "#AC0000" } },
        onClick: () => {
          props.showPatientCancel!();
        },
      });
    }

    // if (selected.selectedCount === 1 && selected.selectedItems[0]?.appointmentStatus === AppointmentStatus.Waiting)
    //   commandBarItems.push({
    //     key: "patient-list-edit",
    //     text: "Chỉnh sửa",
    //     iconProps: { iconName: "Edit", style: { color: "#707070" } },
    //     onClick: () => {
    //       console.log("ok");
    //     },
    //   });

    commandBarItems.push({
      key: "patient-list-export",
      text: "Xuất file",
      iconProps: { iconName: "Export", style: { color: "#1976d2" } },
      onClick: () => {
        console.log("ok");
      },
    });
    // console.log(commandBarItems)
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
          text: 'Gán quyền',
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
      commandBarItems.push(
        {
          key: 'role-edit',
          text: 'Chỉnh sửa',
          iconProps: { iconName: 'edit', style: { color: '#707070' } },
          onClick: () => {
            props.showRoleEdit!()
          }
        },
      )
      commandBarItems.push(
        {
          key: 'role-assign',
          text: 'Gán người dùng',
          iconProps: { iconName: 'Permissions', style: { color: '#707070' } },
          onClick: () => {
            props.showRoleAssign!()
          }
        },
      )
    }
    if (selection.selectedCount !== 0) {
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