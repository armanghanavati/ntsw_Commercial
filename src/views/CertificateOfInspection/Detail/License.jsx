import { Table } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import converGregorianDateToJalali from '../../../configs/helpers/convert-jalali-date-to-gregorian copy';



const License = ({ filters }) => {
    const { colorMode } = useSelector((state) => state);
    const columns = [
        {
            title: "شماره درخواست مجوز",
            dataIndex: "icpVCodeInt",
            align: "center",
        },
        {
            title: "تاریخ ارسال درخواست",
            dataIndex: "Caption",
            align: "center",
            render: (_, { icpSendDate }) => {
                const tempicpSendDate = icpSendDate?.split("T")[0]
                console.log(tempicpSendDate, "icpSendDate");
                const spliticpSendDate = tempicpSendDate?.split("-")
                let day = spliticpSendDate[2];
                let month = spliticpSendDate[1];
                let year = spliticpSendDate[0];
                let resulte = year + "/" + month + "/" + day;
                let newResulte = converGregorianDateToJalali(resulte?.toString());
                return <sapn className="flex-order-row">{newResulte}</sapn>;
            },
        },
        {
            title: "وضعیت مجوز",
            dataIndex: "PermitStateStr",
            align: "center",
        },
        {
            title: "توضیحات",
            dataIndex: "icpPermitDescStr",
            align: "center",
        },
        {
            title: "تاریخ اعتبار",
            dataIndex: "pmtTraceCodeStr",
            align: "center",
            render: (_, { icpSendDate }) => {
                const tempicpSendDate = icpSendDate?.split("T")[0]
                console.log(tempicpSendDate, "icpSendDate");
                const spliticpSendDate = tempicpSendDate?.split("-")
                let day = spliticpSendDate[2];
                let month = spliticpSendDate[1];
                let year = spliticpSendDate[0];
                let resulte = year + "/" + month + "/" + day;
                let newResulte = converGregorianDateToJalali(resulte?.toString());
                return <sapn className="flex-order-row">{newResulte}</sapn>;
            },
        },
        {
            title: "مستندات",
            dataIndex: "pmtTraceCodeStr",
            align: "center",
        },
    ];
    return (

        <div style={{ margin: "0 10px 0 10px " }} >
            <Table
                dataSource={filters?.permissions}
                columns={columns}
                onHeaderRow={() => {
                    return {
                        style: { backgroundColor: colorMode },
                    };
                }}
            />
        </div>
    )
}

export default License;