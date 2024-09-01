import { Modal, Table, theme } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { VerticalSpace } from '../../../../components';
import themeColors from '../../../../configs/theme';
// import ColumnsModalNewLicenseBackPacker from '../../../Utils/ColumnsModalNewLicenseBackPacker';

const ModalNewLisence = ({ open, setOpen, loading, setLoading, dataSource, setDataSource }) => {
    const { theme, colorMode } = useSelector((state) => state);
    const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 10, }, });

    const handleChangePageSize = (event) => {
        event.preventDefault();
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                pageSize: Number(event.target.value) || 0,
                current: 1,
            },
        });
    };

    const columns = [
        {
            title: "ردیف",
            align: "center",
            render: (item, record, index) => (
                <>
                    {index +
                        1 +
                        (Number(tableParams?.pagination?.current || 1) - 1) *
                        Number(tableParams.pagination.pageSize || 1)}
                </>
            ),
        },
        {
            title: "شماره پرونده پیش فاکتور",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "شماره پیش فاکتور",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "نام فروشنده",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "تاریخ صدور",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "کشور ذینفع",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "انتخاب",
            dataIndex: "cdfAppStr",
            align: "center",
        },
    ];

    return (
        <div>
            <Modal
                style={{
                    backgroundColor: themeColors[theme]?.menueBg,
                    color: themeColors[theme]?.text,
                }}
                title={`پیش فاکتورهای استعلام شده`}
                open={open}
                onOk={() => {
                    setOpen(false);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                width={"50%"}
                footer={
                    [
                        // <Button
                        //   backgroundColor={themeColors.btn.danger}
                        //   onClick={() => {
                        //     setOpen(false);
                        //   }}
                        // >
                        //   اتمام
                        // </Button>,
                    ]
                }
            >
                <VerticalSpace space="0.5rem" />

                <span className="page-size-combo">
                    <label className="page-size-combo--label" htmlFor="page-size">
                        نمایش محتویات
                    </label>
                    <select
                        className="page-size-combo--selector"
                        id="page-size"
                        value={tableParams.pagination.pageSize}
                        onChange={handleChangePageSize}
                    >
                        <option
                            value="10"
                            style={{
                                backgroundColor: themeColors[theme]?.bg,
                            }}
                        >
                            10
                        </option>
                        <option
                            value="25"
                            style={{
                                backgroundColor: themeColors[theme]?.bg,
                            }}
                        >
                            25
                        </option>
                        <option
                            value="50"
                            style={{
                                backgroundColor: themeColors[theme]?.bg,
                            }}
                        >
                            50
                        </option>
                        <option
                            value="100"
                            style={{
                                backgroundColor: themeColors[theme]?.bg,
                            }}
                        >
                            100
                        </option>
                    </select>
                </span>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={tableParams.pagination}
                    loading={loading}
                    // onChange={handleTableChange}
                    onHeaderRow={() => {
                        return {
                            style: { backgroundColor: colorMode },
                        };
                    }}
                />
            </Modal>
        </div>
    )
}

export default ModalNewLisence;