import { Col, Divider, Modal, Row, Table } from "antd";
import React from "react";
import { useState } from "react";
import themeColors from "../../../../configs/theme";
import { Button, ComboBox, Input, VerticalSpace } from "../../../../components";
import { useSelector } from "react-redux";
import Validation from "../../../../utils/Validation";
import axios from "axios";
import { endpoints } from "../../../../services/endpoints";
import { handleMessageModal } from "../../../../state/action-creators";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const SelectHSCode = ({
  open,
  errors,
  filters,
  setOpen,
  prfVCode,
  setErrors,
  setFilters,
  getHSGoodsDetail,
}) => {
  const { theme, colorMode, questionModal, GUid, role } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [goods, setGoods] = useState([]);
  const [subGroupList, setSubGroupList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSubList, setOpenSubList] = useState(false);
  const [goodsTableData, setGoodsTableData] = useState([]);
  const [goodsTableParams, setGoodsTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });


  const searchInGoodsTable = (event) => {
    event.preventDefault();
    searchHSCode();
  };
  const searchByComboboxOptions = [
    {
      name: "کدتعرفه/شرح‌تعرفه",
      id: 1,
    },
    {
      name: "طبقه بندی",
      id: 2,
    },
  ];
  const handleSetHsCodeFromGoodsTable = (event, record) => {
    event.preventDefault();
    setFilters({
      ...filters,
      hsCode: record?.gdsHSCode,
    });
    setOpen(false);
  };

  const handleChangeInputs = (name, value, validationNameList, event) => {
    if (name === "SearchBy") {
      setGoods([]);
      setProduct([]);
      setSubGroupList([]);
      setFilters([]);
      setGoodsTableData([]);
      setFilters({
        ...filters,
        pfgTraceCodeLng: filters?.pfgTraceCodeLng,
      });
    } else if (name === "commoditySeason") {
      setFilters({
        ...filters,
        productGroup: undefined,
        subList: undefined,
        goodsList: undefined,
      });
      setGoods([]);
      setProduct([]);
      setSubGroupList([]);
    } else if (name === "productGroup") {
      setFilters({
        ...filters,
        subList: undefined,
        goodsList: undefined,
      });
      setGoods([]);
      setSubGroupList([]);
    } else if (name === "subList") {
      setFilters({
        ...filters,
        goodsList: undefined,
      });
      setGoods([]);
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

  const GoodsColumns = [
    {
      title: "ردیف",
      align: "center",
      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(goodsTableParams?.pagination?.current || 1) - 1) *
              Number(goodsTableParams.pagination.pageSize || 1)}
        </>
      ),
    },
    {
      title: "کد تعرفه",
      dataIndex: "gdsHSCode",
      align: "center",
    },
    {
      title: "شرح تعرفه ",
      dataIndex: "<gdsHSDescStr>",
      align: "center",
    },
    {
      title: "حقوق ورودی",
      dataIndex: "gdsCommDescStr",
      align: "center",
    },
    {
      title: "انتخاب",
      dataIndex: "gdsPriorityTny",
      align: "center",
      render: (_, record) => (
        <div className="flex-order-row">
          <Button
            name="select"
            type="secondary"
            onClick={(event) => handleSetHsCodeFromGoodsTable(event, record)}
          >
            <i className="fa fa-check"></i>
            انتخاب
          </Button>
        </div>
      ),
    },
  ];
  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName.map((item) => {
      if (
        filters[item] === undefined ||
        filters[item] === null ||
        JSON.stringify(filters[item])?.trim() === ""
      ) {
        err[item] = ["پرکردن این فیلد الزامی است"];
      }
    });
    setErrors(err);
    return err;
  };

  const permitForSkip = (inputsName = []) => {
    const error = handleValidation(inputsName);
    for (var key in error) {
      if (error[key]?.length > 0) {
        if (inputsName.includes(key)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleGethsCode = (event) => {
    event.preventDefault();
    if (
      permitForSkip([
        "commoditySeason",
        "productGroup",
        // "subList",
        "goodsList",
      ]) === true
    ) {
      setOpen(false);
      getHSGoodsDetail(1, { hsCode: filters?.goodsList });
      setFilters({
        ...filters,
        hsCode: filters?.goodsList,
      });
    }
  };

  const handlegoodsTableChange = (pagination, filters, sorter) => {
    setGoodsTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleChangeGoodsTablePageSize = (event) => {
    event.preventDefault();
    setGoodsTableParams({
      ...goodsTableParams,
      pagination: {
        ...goodsTableParams.pagination,
        pageSize: Number(event.target.value) || 0,
        current: 1,
      },
    });
  };

  const searchHSCode = () => {
    setLoading(true);
    const postData = {
      HSCode: (filters?.tarefeNumber),
      HSName: !!filters?.DescriptionOfTarefe? filters?.DescriptionOfTarefe: "",
      UrlOwner: 0,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: (prfVCode),
    };
    axios({
      url: endpoints.RestAPIs.Proforma.searchHSCode.url,
      method: endpoints.RestAPIs.Proforma.searchHSCode.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.Error === 0) {
          setGoodsTableData(res?.data?.GoodList);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getTitleList = () => {
    const postData = {
      GoodsTitle: "",
      GoodsTitleLength: 0,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCode,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.getTitleList.url,
      method: endpoints.RestAPIs.Proforma.getTitleList.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setTitleList(res.data?.HSTitle);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroupList = () => {
    const postData = {
      GoodsTitle: filters?.commoditySeason,
      GoodsTitleLength: 0,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCode,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.getGroupList.url,
      method: endpoints.RestAPIs.Proforma.getGroupList.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setProduct(res.data?.HSTitle);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSubGroupList = () => {
    const postData = {
      GoodsTitle: filters?.productGroup,
      GoodsTitleLength: 0,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCode,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.getSubGroupList.url,
      method: endpoints.RestAPIs.Proforma.getSubGroupList.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setSubGroupList(res.data?.HSTitle);
          setOpenSubList(true);
        } else if (res?.data?.ErrorCode === 2) {
          setOpenSubList(false);
          getGoodsList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGoodsList = () => {
    const postData = {
      GoodsTitle: !!filters?.subList ? filters?.subList : filters?.productGroup,
      GoodsTitleLength: 0,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCode,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.getGoodsList.url,
      method: endpoints.RestAPIs.Proforma.getGoodsList.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setGoods(res?.data?.HSTitle);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (open && filters?.SearchBy === 2) {
      getTitleList();
      setOpenSubList(true);
    }
  }, [filters?.SearchBy]);

  useEffect(() => {
    if (!!filters?.commoditySeason) {
      getGroupList();
    }
  }, [filters?.commoditySeason]);

  useEffect(() => {
    if (!!filters?.productGroup) {
      getSubGroupList();
    }
  }, [filters?.productGroup]);

  useEffect(() => {
    if (!!filters?.subList) {
      getGoodsList();
    }
  }, [filters?.subList]);

  return (
    <>
      {open && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="جستجوی کالا"
          open={open}
          onCancel={() => {
            setOpen(false);
            setFilters([]);
            setGoods([]);
            setProduct([]);
            setSubGroupList([]);
          }}
          width={1000}
          footer={
            filters?.SearchBy === 2 && [
              <span
                style={{
                  padding: "15px",
                  gap: "5px",
                }}
                className="flex-order-row-justify-start"
              >
                <Button
                  name="register"
                  backgroundColor={themeColors.btn.secondary}
                  onClick={(event) => {
                    handleGethsCode(event);
                  }}
                >
                  ثبت
                </Button>
              </span>,
            ]
          }
        >
          <form className="form">
            <Col sm={24} md={12} xl={12}>
              <ComboBox
                title=" جستجو بر اساس"
                name="SearchBy"
                onChange={handleChangeInputs}
                defaultValue={filters?.SearchBy}
                options={searchByComboboxOptions}
                validations={[["required"]]}
                error={errors?.SearchBy}
                width="200px"
              />
            </Col>
          </form>
          {filters?.SearchBy === 1 && (
            <form className="form">
              {filters?.SearchBy && (
                <Divider style={{ margin: "10px 0 20px 0" }} />
              )}
              <Row>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کد تعرفه"
                    type="number"
                    value={filters?.tarefeNumber}
                    name="tarefeNumber"
                    onChange={handleChangeInputs}
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شرح تعرفه "
                    value={filters?.DescriptionOfTarefe}
                    name="DescriptionOfTarefe"
                    onChange={handleChangeInputs}
                  />
                </Col>
                <Button
                  name="search"
                  type="primary"
                  onClick={(event) => searchInGoodsTable(event)}
                  // disabled={filters?.tarefeNumber === undefined && true}
                >
                  جستجو
                </Button>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Table
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
                handleChangePageSize={handleChangeGoodsTablePageSize}
                dataSource={goodsTableData}
                columns={GoodsColumns}
                pagination={goodsTableParams.pagination}
                loading={loading}
                onChange={handlegoodsTableChange}
              />
            </form>
          )}
          {filters?.SearchBy === 2 && (
            <>
              <form className="form">
                {filters?.SearchBy && (
                  <Divider style={{ margin: "10px 0 20px 0" }} />
                )}
                <Row>
                  <Col sm={24} md={24} xl={24}>
                    <ComboBox
                      title="فصل کالا"
                      name="commoditySeason"
                      defaultValue={filters?.commoditySeason}
                      error={errors?.commoditySeason}
                      onChange={handleChangeInputs}
                      options={titleList}
                      optionTitle="HSTitleName"
                      optionValue="HSTitleCode"
                      width="165px"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={24} md={24} xl={24}>
                    <ComboBox
                      title="گروه کالا"
                      name="productGroup"
                      defaultValue={filters?.productGroup}
                      error={errors?.productGroup}
                      onChange={handleChangeInputs}
                      options={product}
                      optionValue="HSTitleCode"
                      optionTitle="HSTitleName"
                      width="165px"
                    />
                  </Col>
                </Row>

                {openSubList && (
                  <Row>
                    <Col sm={24} md={24} xl={24}>
                      <ComboBox
                        title="زیر گروه کالا"
                        name="subList"
                        defaultValue={filters?.subList}
                        error={errors?.subList}
                        onChange={handleChangeInputs}
                        options={subGroupList}
                        width="165px"
                        optionValue="HSTitleCode"
                        optionTitle="HSTitleName"
                      />
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col sm={24} md={24} xl={24}>
                    <ComboBox
                      title="محصول"
                      name="goodsList"
                      defaultValue={filters?.goodsList}
                      error={errors?.goodsList}
                      onChange={handleChangeInputs}
                      options={goods}
                      width="165px"
                      optionValue="HSTitleCode"
                      optionTitle="HSTitleName"
                    />
                  </Col>
                </Row>
              </form>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default SelectHSCode;
