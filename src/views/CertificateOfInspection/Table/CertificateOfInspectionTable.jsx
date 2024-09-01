import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../../configs/theme";
import Button from "../../../components/Button";
import { handleDetail, handleGetPageSize, handleLoading, handleMessageModal } from "../../../state/action-creators/index";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../../../components/Table";


const CertificateOfInspectionTable = ({ loading, dataTable, setTableParams, tableParams }) => {
  const { colorMode, role, GUid, } = useSelector((state) => state);
  const { search, pathname, state } = useLocation();
  const dispatch = useDispatch()
  const [pageMode, setPageMode] = useState()
  const history = useHistory()


  const handleChangePageSize = (event, id) => {
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

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
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
      title: "شماره پرونده",
      dataIndex: "iciprfVCodeInt",
      align: "center",
    },
    {
      title: "شماره درخواست",
      dataIndex: "iciVCodeInt",
      align: "center",
    },
    {
      title: "ارزش کل پرونده",
      dataIndex: "prfTotalPriceMny",
      align: "center",
    },
    {
      title: "شرکت بازرسی",
      dataIndex: "incCompanyNameStr",
      align: "center",
    },
    {
      title: "شماره ثبت سفارش",
      dataIndex: "prfOrderNoStr",
      align: "center",
    },
    {
      title: "وضعیت",
      dataIndex: "iciStatusNameStr",
      align: "center",
    },
    {
      title: "جزئیات",
      dataIndex: "detaile",
      align: "center",
      render: (_, { iciprfVCodeInt, iciVCodeInt }, index) => (
        < div className="flex-order-row" >

          <Link to={`/Users/AC/Commercial/CertificateOfInspectionDetails?iciVCodeInt=${iciVCodeInt}`} >
            <Button
              type="secondary">
              <i className="fa fa-search"></i>
              جزئیات
            </Button>
          </Link>
        </div >
      ),
    },
  ];

  return (
    <>
      <Table
        id="Table"
        dataSource={dataTable}
        handleChangePageSize={handleChangePageSize}
        columns={columns}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
          };
        }}
      />
    </>
  );
};

export default CertificateOfInspectionTable;


// const handleGetNumbFile = () => {

//         axios({
//             url: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.url,
//             method: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.method,
//             data: postData,
//         }).then((res) => {
//             console.log(res);
//             if (res.data.ErrorCode === 0) {
//                 setAllFileNumb(res?.data?.Result?.staticInspectionCertificate?.proformaNumbers)
//                 // if (filters?.order == "2") {

//                 //     const findTrueFileNumb = resAllFileNumb.filter((item) => item.registered === true)
//                 //     console.log(findTrueFileNumb);
//                 //     const allTrueFileNumb = findTrueFileNumb.map((numb) => {
//                 //         return setFileNumbers(validFileNumber.push({
//                 //             id: numb.prfVCodeInt,
//                 //             name: numb.prfVCodeInt,
//                 //         })
//                 //         )
//                 //     })
//                 //     return allTrueFileNumb;
//                 // } else if (filters?.order === 3) {
//                 //     const findFalseFileNumb = resAllFileNumb.filter((item) => item.registered === false)
//                 //     const allFalseFileNumb = findFalseFileNumb.map((numb) => {

//                 //         return setValidFileNumber(validFileNumber.push({
//                 //             id: numb.prfVCodeInt,
//                 //             name: numb.prfVCodeInt,
//                 //         })
//                 //         )
//                 //     })
//                 //     return allFalseFileNumb;
//                 // }

//             } else {
//                 dispatch(
//                     handleMessageModal({
//                         isModalOpen: true,
//                         describe: res.data?.ErrorDesc,
//                     })
//                 );
//                 dispatch(handleLoading(false));
//             }
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };
