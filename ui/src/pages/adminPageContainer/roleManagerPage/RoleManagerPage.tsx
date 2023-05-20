import React from 'react'
import './RoleManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
function RoleManagerPage() {
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }
    return (
        <div className='rolemanager-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Danh sách lịch đặt khám', href: '/danh-sach-dat-kham' },
                ]}
            />
            <div className="rolemanager-page-title">
                Danh sách lịch đặt khám
            </div>
            <div className="rolemanager-page-search">
                <div className="search-id">
                    <SearchBoxView
                        placeholder='User Name'
                        onSearch={onSearch}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoleManagerPage