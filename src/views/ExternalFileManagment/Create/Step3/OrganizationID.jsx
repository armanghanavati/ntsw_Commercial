import React, { useState } from "react";
import themeColors from "../../../../configs/theme";
import Validation from "../../../../utils/Validation";
import { useSelector, useDispatch } from "react-redux";
import { Col, Divider, Modal, Row, Table } from "antd";
import { handelQuestionModal } from "../../../../state/action-creators";
import { Button, Input } from "../../../../components";
import { useEffect } from "react";

const OrganizationID = ({
  hasOrganization,
  questionModalMode,
  filters,
  setQuestionModalMode,
  setHasOrganization,
  setShowBasicInformation,
  setErrors,
  setFilters,
  organizationIdLis,
  getOrganizationIdDetail,
}) => {
  const dispatch = useDispatch();
  const { theme, colorMode , questionModal} = useSelector((state) => state);
  const [
    goodsCommercialDescriptionTableParams,
    setGoodsCommercialDescriptionTableParams,
  ] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [
    goodsOrganizationDescriptionTableParams,
    setGoodsOrganizationDescriptionTableParams,
  ] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  // دکمه بستن مدال شناسه سازمان
  const cancelOrganizationHandler = () => {
    if (filters?.isRequiredorganizationId === 1) {
      dispatch(
        handelQuestionModal({
          isModalOpen: true,
          title: "بستن مودال",
          describe:
            "انتخاب شناسه کالا برای این کالا اجباریست، آیا از بستن این پنجره اطمینان دارید؟",
        })
      );
      setQuestionModalMode("CLOSE_ORGANIZATION_MODAL");
    } else {
      setHasOrganization(false);
      setShowBasicInformation(true);
    }
  };

  const handleChangeInputs = (name, value, validationNameList = [], event) => {
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
    if (name == "hsCode") {
      setFilters({ hsCode: value });
      setErrors({ hsCode: [...temp] });
      // resetFields();
    }
  };

  // ساخت پیجینیشن جدول مدال شناسه سازمان
  const handleChangeGoodsOrganizationDescriptionTablePageSize = (event) => {
    event.preventDefault();
    setGoodsCommercialDescriptionTableParams({
      ...goodsCommercialDescriptionTableParams,
      pagination: {
        ...goodsCommercialDescriptionTableParams.pagination,
        pageSize: Number(event.target.value) || 0,
        current: 1,
      },
    });
  };

  // ردیف جدول مدال شناسه سازمان
  const columnsOrganizationIdDetail = [
    {
      title: "ردیف",
      align: "center",
      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(
              goodsCommercialDescriptionTableParams?.pagination?.current || 1
            ) -
              1) *
              Number(
                goodsCommercialDescriptionTableParams.pagination.pageSize || 1
              )}
        </>
      ),
    },
    {
      title: "شناسه سازمان",
      dataIndex: "OrgIDCode",
      align: "center",
    },
    {
      title: "شرح شناسه کالا",
      dataIndex: "PersianCommercialDescription",
      align: "center",
    },
    {
      title: "انتخاب",
      dataIndex: "idgOrganizationDescriptionStr",
      align: "center",
      render: (
        _,
        {
          OrgIDCode,
          NationalCode,
          EnglishCommercialDescription,
          PersianCommercialDescription,
          ProducingCountry,
          ProducingCountryMapCode,
          ProducingCountryName,
          Status,
          WarningMsg,
        }
      ) => (
        <Button
          name="select"
          type="secondary"
          onClick={(event) =>
            handleGetSerialFromGoodsOrganizationDescriptionTable(
              event,
              OrgIDCode,
              NationalCode,
              EnglishCommercialDescription,
              PersianCommercialDescription,
              ProducingCountry,
              ProducingCountryMapCode,
              ProducingCountryName,
              Status,
              WarningMsg
            )
          }
        >
          <i className="fa fa-check"></i>
          انتخاب
        </Button>
      ),
    },
  ];

  
  // دکمه انتخاب جدول مدال شناسه سازمان
  const handleGetSerialFromGoodsOrganizationDescriptionTable = (
    event,
    OrgIDCode,
    NationalCode,
    EnglishCommercialDescription,
    PersianCommercialDescription,
    ProducingCountry,
    ProducingCountryMapCode,
    ProducingCountryName,
    Status,
    WarningMsg
  ) => {
    event?.preventDefault();
    setHasOrganization(false);
    setShowBasicInformation(true);
    // newCountries=[]

  
    setFilters({
      ...filters,
      OrgIDCode: OrgIDCode,
      NationalCode: NationalCode,
      Status: Status,
      WarningMsg: WarningMsg,
      hasPersianCommercialDescription :!! PersianCommercialDescription? true : false,
      hasEnglishCommercialDescription : !!EnglishCommercialDescription ? true : false,
      hasProducingCountryMapCode : !!ProducingCountryMapCode ? true : false,
    // شرح تجاری فارسی
      commercialDescStr:
        filters?.hasCommercialDescStr === true
          ? filters?.commercialDescStr
          : PersianCommercialDescription,
      // شرح تجاری لاتین
      englishDescription:
        filters?.hasEnglishDescription === true
          ? filters?.englishDescription
          : EnglishCommercialDescription,
      ProducingCountry: ProducingCountry,
      // کشور محل تولید
      Countrie:
        filters?.hasCountrie === true
          ? filters?.Countrie
          : [JSON.stringify(ProducingCountryMapCode)],
      ProducingCountryName: ProducingCountryName,
    });
  };

  // آن چینچ جدول شناسه سازمان
  const handleGoodsOrganizationDescriptionTableChange = (
    pagination,
    filters,
    sorter
  ) => {
    setGoodsOrganizationDescriptionTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleSearchTableOrganization =(e)=>{
    e.preventDefault();
    getOrganizationIdDetail()
  }


  useEffect(()=>{
if (questionModal?.answer === "yes" && questionModalMode ==="CLOSE_ORGANIZATION_MODAL") {
  setHasOrganization(false)
}
  },[questionModal?.answer])

  return (
    <>
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        centered
        title="شناسه سازمان"
        open={hasOrganization}
        width={900}
        footer={false}
        onCancel={cancelOrganizationHandler}
      >
        <form className="form">
          <Row>
            <Col sm={24} md={12} xl={8}>
              <Input
                title="متن جستجو"
                name="organizationIDSearchText"
                value={filters?.organizationIDSearchText}
                onChange={handleChangeInputs}
              />
            </Col>
            <Button
              name="searchBox"
              type="primary"
              onClick={(event) => handleSearchTableOrganization(event)}
            >
              جستجو
            </Button>
          </Row>
          <Divider style={{ margin: "10px 0 20px 0" }} />
          <Table
            handleChangePageSize={
              handleChangeGoodsOrganizationDescriptionTablePageSize
            }
            dataSource={organizationIdLis}
            columns={columnsOrganizationIdDetail}
            pagination={goodsOrganizationDescriptionTableParams?.pagination}
            // loading={loading}
            onChange={handleGoodsOrganizationDescriptionTableChange}
            onHeaderRow={() => {
              return {
                style: { backgroundColor: colorMode },
              };
            }}
          />
        </form>
      </Modal>
    </>
  );
};

export default OrganizationID;
