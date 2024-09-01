import { Col, Modal, Row, Table, theme } from 'antd';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, VerticalSpace } from '../../../../components';
import themeColors from '../../../../configs/theme';
import { getExtentionType } from '../../../../configs/helpers/get-extension-type';

const DocumentsReciveOrganization = ({ dataDocsReciveOrg, openModalReciveDocs, setOpenModalReciveDocs }) => {


    const { theme, colorMode } = useSelector((state) => state);
    const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 10 } });

    const downloadFile = (DOC, Caption, Format) => {
        const raw = window.atob(DOC);
        const rawLength = raw.length;
        let array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        const file = new Blob([array], {
            type: getExtentionType(`.${Format.toLowerCase()}`),
        });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    }

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
            title: "نام",
            dataIndex: "Caption",
            align: "center",
            render: (_, { Caption }, index) => {
                const test = Caption.split(".")[0]
                return (<span className='flex-order-row' > {test} </span>)
            }
        },
        {
            title: "فرمت",
            dataIndex: "Format",
            align: "center",
        },
        {
            title: "پیش نمایش",
            dataIndex: "pmtTraceCodeStr",
            align: "center",
            render: (_, { DOC, Caption, Format }, index) => (
                <div
                    onClick={() => {
                        downloadFile(DOC, Caption, Format)
                    }}
                    className="flex-order-row cursorPointer"
                    style={{ color: themeColors.comments.blue }}
                >
                    <i style={{ fontSize: "20px" }} className="fa fa-2xl fa-paperclip"></i>
                </div >
            ),
        },
    ];

    return (
        <div>
            <Modal
                centered
                style={{
                    backgroundColor: themeColors[theme]?.menueBg,
                    color: themeColors[theme]?.text,
                }}
                title={`مستندات دریافتی از سازمان`}
                open={openModalReciveDocs}
                onOk={() => {
                    setOpenModalReciveDocs(false);
                }}
                onCancel={() => {
                    setOpenModalReciveDocs(false);
                }}
                width={"60%"}
                footer={[]}
            >
                <VerticalSpace space="1rem" />
                <div style={{ margin: "0 10px 0 10px " }} >
                    <Table
                        dataSource={dataDocsReciveOrg}
                        columns={columns}
                        onHeaderRow={() => {
                            return {
                                style: { backgroundColor: colorMode },
                            };
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default DocumentsReciveOrganization;