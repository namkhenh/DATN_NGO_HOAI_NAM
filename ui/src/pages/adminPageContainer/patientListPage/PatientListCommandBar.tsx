import React, { useEffect, useState } from 'react'
import { TableType } from '../../../model/enum/tableTypeEnum'
import { IButtonProps, ICommandBarItemProps, ICommandBarStyles, styled } from '@fluentui/react'
import { CommandBarView } from '../../../common/commandBar/CommandBar'
import { useStateValue } from '../../../context/StateProvider'
import { AppointmentStatus } from '../../../model/enum/appointmentEnum'

interface IPatientListCommandBar {
  tableType: TableType
  showPatientAccept?: () => void
  showPatientRefuse?: () => void
  showPatientCancel?: () => void
  showAccountEdit?: () => void
  showAccountCreate?: () => void
  showAccountDelete?: () => void
}

function PatientListCommandBar(props: IPatientListCommandBar) {
  const [{ selection }] = useStateValue();
  const initActionBar = (): ICommandBarItemProps[] => {
    switch (props.tableType) {
      case TableType.PatientListTable:
        return patientListActions()
      case TableType.AccountManagerTable:
        return accountManagerActions()
      default:
        return [];
    }
  }

  // useEffect(()=>{}, [selection])
  const patientListActions = (): ICommandBarItemProps[] => {
    let commandBarItems: ICommandBarItemProps[] = []
    
    // if (selected.selectedCount === 1 && selected.selectedItems[0]?.appointmentStatus === AppointmentStatus.Waiting) {
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.appointmentStatus === 'Chờ duyệt') {
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
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.appointmentStatus === 'Chờ duyệt') {
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
    if (selection.selectedCount === 1 && selection.selectedItems[0]?.appointmentStatus === 'Đã duyệt') {
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