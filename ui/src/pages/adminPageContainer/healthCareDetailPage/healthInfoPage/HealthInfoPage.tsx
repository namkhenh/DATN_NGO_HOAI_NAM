import React from 'react'
import './HealthInfoPage.scss'
import {TextField} from '../../../../common/textField/TextField'
import {DatePicker} from '../../../../common/datePicker/DatePicker'
import {Dropdown} from '../../../../common/dropdown/DropDown'
import Button from '@mui/material/Button'
import {ButtonVariantType} from '../../../../model/enum/buttonEnum'

function HealthInfoPage() {
    return (
        <div className='healthinfo-page'>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Chỉ số sống
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Mạch:
                        </div>
                        <div className="surival-index-input">
                            <TextField
                                
                            />
                        </div>
                        <div className="surival-index-unit">
                            lần/phút
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Nhiệt độ:
                        </div>
                        <div className="surival-index-input">
                            <TextField

                            />
                        </div>
                        <div className="surival-index-unit">
                            °C
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Huyết áp:
                        </div>
                        <div className="surival-index-input">
                            <TextField

                            />
                        </div>
                        <div className="surival-index-unit">
                            mg/Hg
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Nhịp thở:
                        </div>
                        <div className="surival-index-input">
                            <TextField

                            />
                        </div>
                        <div className="surival-index-unit">
                            lần/phút
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Chiều cao:
                        </div>
                        <div className="surival-index-input">
                            <TextField

                            />
                        </div>
                        <div className="surival-index-unit">
                            cm
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            Cân nặng:
                        </div>
                        <div className="surival-index-input">
                            <TextField

                            />
                        </div>
                        <div className="surival-index-unit">
                            Kg
                        </div>
                    </div>
                    <div className="healthinfo-body-item">
                        <div className="survival-index">
                            BMI:
                        </div>
                        <div className="surival-index-input">
                            <TextField

                            />
                        </div>
                        <div className="surival-index-unit">
                            kg/m²
                        </div>
                    </div>
                </div>
            </div>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Tiền sử bệnh
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Tiền sử bản thân'
                            multiline
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Tiền sử gia đình'
                            multiline
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Dị ứng thuốc'
                            multiline
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Quá trình bệnh lý'
                            multiline
                        />
                    </div>
                </div>
            </div>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Khám lâm sàng
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item width-25 ">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Thời gian khám'
                            isRequired={false}
                            // strings={defaultDatePickerStrings}
                            // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Lý do khám'
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Bác sĩ khám'
                            readOnly
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <Dropdown
                            label='Quá trình bệnh lý'
                            options={[]}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Toàn thân'
                            readOnly
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Các bộ phận'
                            readOnly
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <Dropdown
                            label='Chẩn đoán sơ bộ'
                            options={[]}
                            required
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <Dropdown
                            label='Chẩn đoán bệnh kèm theo'
                            options={[]}
                        />
                    </div>
                    <div className="healthinfo-body-item width-100 ">
                        <TextField
                            label='Tóm tắt KQ CLS'
                            multiline
                        />
                    </div>
                </div>
            </div>
            <div className="healthinfo-wrap">
                <div className="healthinfo-title">
                    Hướng điều trị
                    <Button variant={ButtonVariantType.Contained}>Kết thúc khám</Button>
                </div>
                <div className="healthinfo-body">
                    <div className="healthinfo-body-item width-25 ">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Thời gian kết thúc khám'
                            isRequired={false}
                            // strings={defaultDatePickerStrings}
                            // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Bác sĩ kết luận'
                        />
                    </div>
                    <div className="healthinfo-body-item width-50 ">
                        <TextField
                            label='Kết luận'
                            readOnly
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <Dropdown
                            label='Chẩn đoán bệnh chính'
                            required
                            options={[]}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <TextField
                            label='Diễn giải ICD 10'
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <Dropdown
                            label='Bệnh kèm theo'
                            options={[]}
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <Dropdown
                            label='Hướng điều trị'
                            options={[]}
                            required
                        />
                    </div>
                    <div className="healthinfo-body-item width-25 ">
                        <Dropdown
                            label='Trình trạng'
                            options={[]}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthInfoPage