import { Col, Form, Modal, Row, Table } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Input, VerticalSpace } from "../../../components";
import themeColors from "../../../configs/theme";
import { endpoints } from "../../../services/endpoints";
import Validation from "../../../utils/Validation";
import { handleLoading } from "../../../state/action-creators";

const SearchForInquiredSellersModal = ({
  setOpenSearchForInquiredSellersModal,
  openSearchForInquiredSellersModal,
}) => {
  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(undefined);
  const [appHasMounted, setAppHaMounted] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [form] = Form.useForm();
  const { theme, colorMode, role, GUid } = useSelector((state) => state);

  // ریست کردن مدال
  const resetFieldsModal = () => {
    setOpenSearchForInquiredSellersModal(false);
    setFilters({});
    setErrors({});
    form.resetFields();
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };



  const search = (event) => {
    event.preventDefault();
    if (tableParams.pagination.current === 1) {
      getTable();
      setDataSource([])
    } else {
      setTableParams({
        pagination: {
          current: 1,
          pageSize: 10,
        },
      });
    }
  };

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

  const handleChangeInputs = (name, value, validationNameList, event) => {
    if (name === "FIDAName") {
      setDataSource([])
      setTableParams({
        pagination: {
          current: 1,
          pageSize: 10,
        },
      });
    }
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });
    setFilters((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
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
      title: "شناسه ",
      dataIndex: "FIDACodeStr",
      align: "center",
    },
    {
      title: "عنوان فروشنده خارجی",
      dataIndex: "LName",
      align: "center",
    },
  ];

  const getTable = () => {
    const postData =
    {
      "FIDAName": filters?.FIDAName || "",
      "startIndex": tableParams?.pagination?.current - 1,
      "pageSize": tableParams?.pagination?.pageSize,
      "urlVCodeInt": role,
      "ssdsshGUID": GUid
    }
    setLoading(true);
    axios({
      url: endpoints.RestAPIs.fida.GetFidaDetailListByName.url,
      method: endpoints.RestAPIs.fida.GetFidaDetailListByName.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res?.data?.Count || 0,
            },
          });
          setDataSource(res.data?.FIDADetailsLst || []);

        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const cancelModal = () => {
    resetFieldsModal()
    setDataSource([])
    setTableParams({
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
  };


  useEffect(() => {
    setAppHaMounted(true);
    setDataSource([]);
  }, []);

  useEffect(() => {
    if (appHasMounted) {
      getTable();
    }
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);


  return (
    <div>
      <Modal
        centered
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        title={"جستجوی فروشندگان استعلام شده"}
        open={openSearchForInquiredSellersModal}
        onOk={() => {
          setOpenSearchForInquiredSellersModal(false);
        }}
        onCancel={() => {
          cancelModal();
        }}
        width={"50%"}
        footer={[
          filters?.foreignSellerType && (
            <div
              className="flex-order-row"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <div className="flex-order-row">
                <Button
                  backgroundColor={themeColors.btn.danger}
                  onClick={() => {
                    cancelModal();
                  }}
                >
                  بستن
                </Button>
              </div>
            </div>
          ),
        ]}
      >
        <Form form={form} style={{ margin: "0 20px 0 20px" }}>
          <Row>
            <Col sm={24} md={24}>
              <VerticalSpace />
            </Col>
            <Col sm={24} md={24} xl={12}>
              <Input
                name="FIDAName"
                title=" متن جستجو "
                onChange={handleChangeInputs}
                value={filters?.FIDAName}
                error={errors?.FIDAName}
                // validations={[]}
                labelWidth="150px"
              />
            </Col>
            <Col sm={24} md={24} xl={12}>
              <Button loading={loading} onClick={(event) => search(event)} disabled={filters?.FIDAName === undefined && true}>
                <i className="fa fa-search" />
                جستجو
              </Button>
            </Col>
          </Row>
          <Col sm={12} md={12}>
            <VerticalSpace />
          </Col>
          {/* <Row> */}
          {/* <Col sm={24} md={24} xl={12}> */}
          <div >
            {dataSource?.length > 0 && <span className="page-size-combo">
              <label className="page-size-combo--label" htmlFor="page-size">
                نمایش محتویات
              </label>
              <select
                className="page-size-combo--selector"
                id="page-size"
                value={tableParams.pagination.pageSize}
                onChange={handleChangePageSize}
                disabled={filters?.FIDAName === undefined && true}
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
            </span>}
            <Table
              id="Table"
              dataSource={dataSource}
              columns={columns}
              onChange={handleTableChange}
              pagination={tableParams.pagination}
              loading={loading}
              onHeaderRow={() => {
                return {
                  style: { backgroundColor: colorMode },
                };
              }}
            />
          </div>
          {/* </Col>
            </Row> */}
        </Form>
      </Modal>
    </div>
  );
};

export default SearchForInquiredSellersModal;


























