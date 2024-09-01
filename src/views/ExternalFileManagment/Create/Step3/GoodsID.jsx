import React, { useState } from "react";
import themeColors from "../../../../configs/theme";
import { useSelector, useDispatch } from "react-redux";
import { Col, Divider, Modal, Row, Table } from "antd";
import { handelQuestionModal } from "../../../../state/action-creators";
import { Button, Input, QuestionModal } from "../../../../components";
import { useEffect } from "react";
const GoodsID = ({
  hasGoodsId,
  filters,
  setQuestionModalMode,
  setShowBasicInformation,
  setHasGoodsId,
  getOrganizationIdDetail,
  setFilters,
  getHSCIDDetail,
  goodsIdModal,
  handleChangeInputs,
  questionModalMode,
  setHasOrganization
}) => {
  const dispatch = useDispatch();
  const { theme, colorMode, questionModal } = useSelector((state) => state);
  const [
    goodsCommercialDescriptionTableParams,
    setGoodsCommercialDescriptionTableParams,
  ] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });



  // دکمه بستن مدال شناسه کالا
  const cancelHandler = () => {
    if (filters?.isRequiredGoodsId === 1) {
      dispatch(
        handelQuestionModal({
          isModalOpen: true,
          title: "بستن پنجره",
          describe:
            "انتخاب شناسه کالا برای این کالا اجباریست، آیا از بستن این پنجره اطمینان دارید؟",
        })
      );
      setQuestionModalMode("CLOSE_GOODS_ID_MODAL")

    } else if (filters?.HasORG === false && filters?.isRequiredGoodsId === 5) {
      setHasGoodsId(false);
      setShowBasicInformation(true);

    } else if (filters?.HasORG === true && filters?.isRequiredGoodsId === 5) {
      setHasGoodsId(false);
      getOrganizationIdDetail(undefined, filters.sgdVCodeInt);
    }
    setFilters({
      ...filters,
      productIDSearchText: undefined
    })

  };

  // دکمه جستجوی اینپوت مدال شناسه کالا
  const handleproductIDSearchText = (event) => {
    event.preventDefault();
    getHSCIDDetail();
    setQuestionModalMode()
  };



  // ساخت پیجینیشن جدول مدال شناسه کالا
  const handleChangeGoodsCommercialDescriptionTablePageSize = (event) => {
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

  // ردیف جدول مدال شناسه کالا
  const goodsCommercialDescriptionTableColumns = [
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
      title: "شناسه کالا",
      dataIndex: filters?.cidType === 3 ? "gcdIVCCodeStr" : "gcdCIDCodeStr",
      align: "center",
    },
    {
      title: "شرح شناسه کالا",
      dataIndex: "gcdCommercialDescStr",
      align: "center",
    },
    {
      title: "انتخاب",
      dataIndex: "idgCommercialDescriptionStr",
      align: "center",
      render: (
        _,
        {
          gcdCIDCodeStr,
          gcdCommercialDescStr,
          gcdCommercialDescEnStr,
          gcdmsuVCodeInt,
          Countries,
          pfgmsuVCodeTny,
          gcdCIDType,
          gcdIVCCodeStr
        }
      ) => (
        <Button
          name="select"
          type="secondary"
          onClick={(event) =>
            handleGetSerialFromGoodsCommercialDescriptionTable(
              event,
              gcdCIDCodeStr,
              gcdCommercialDescStr,
              gcdCommercialDescEnStr,
              gcdmsuVCodeInt,
              Countries,
              pfgmsuVCodeTny,
              gcdCIDType,
              gcdIVCCodeStr
            )
          }
        >
          <i className="fa fa-check"></i>
          انتخاب
        </Button>
      ),
    },
  ];

  // دکمه انتخاب جدول مدال شناسه کالا
  const handleGetSerialFromGoodsCommercialDescriptionTable = (
    event,
    gcdCIDCodeStr,
    gcdCommercialDescStr,
    gcdCommercialDescEnStr,
    gcdmsuVCodeInt,
    Countries,
    gcdmsuNameStr,
    gcdCIDType,
    gcdIVCCodeStr

  ) => {
    event.preventDefault();
    const newCountries = [];
    Countries?.map((item) =>
      newCountries?.push(JSON.stringify(item?.cnyVCodeInt))
    );

    setFilters((prevstate) => {
      return {
        ...prevstate,
        cidCode: filters?.cidType === 3 ? gcdIVCCodeStr : gcdCIDCodeStr,
        // شرح تجاری فارسی
        hasCommercialDescStr: !!gcdCommercialDescStr ? true : false,
        commercialDescStr: gcdCommercialDescStr,
        // شرح تجاری لاتین
        hasEnglishDescription:
          !!gcdCommercialDescEnStr ? true : false,
        englishDescription: gcdCommercialDescEnStr,
        // واحد اندازه گیری
        measurement: !!gcdmsuVCodeInt ? +(gcdmsuVCodeInt) : undefined,
        // کشور محل تولید
        hasCountrie: !!Countries ? true : false,
        hasMeasurementFromGoodsIdModal: !!gcdmsuVCodeInt ? true : false,
        Countrie: newCountries,
        gcdmsuNameStr: gcdmsuNameStr,
        goodsId: gcdCIDType,
      };
    });

    if (filters?.isRequiredGoodsId === 1 || filters?.isRequiredGoodsId === 5) {
      setHasGoodsId(false);
      if (filters?.isRequiredorganizationId !== 1) {
        setShowBasicInformation(true);
      }

    }


    if (filters?.isRequiredGoodsId === 1 && filters?.HasORG === false) {
      setHasGoodsId(false);
      setShowBasicInformation(true);
    }


    if (filters?.HasORG === true) {
      getOrganizationIdDetail(gcdCIDCodeStr);
    }
  };

  // آن چینچ جدول مدال شناسه کالا
  const handleGoodsCommercialDescriptionTableChange = (
    pagination,
    filters,
    sorter
  ) => {
    setGoodsCommercialDescriptionTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  useEffect(() => {
    if (questionModal?.answer === "yes" && questionModalMode === "CLOSE_GOODS_ID_MODAL") {
      setHasGoodsId(false)
      setQuestionModalMode()
    }
  }, [questionModal?.answer]);

  return (
    <>
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        centered
        title="شناسه کالا"
        open={hasGoodsId}
        width={800}
        footer={false}
        onCancel={cancelHandler}
      >
        <form className="form">
          <Row>
            <Col sm={24} md={12} xl={12}>
              <Input
                title="متن جستجو"
                type="text"
                value={filters?.productIDSearchText}
                name="productIDSearchText"
                onChange={handleChangeInputs}
              />
            </Col>
            <Button
              name="searchBox"
              type="primary"
              onClick={(event) => handleproductIDSearchText(event)}
            >
              جستجو
            </Button>
          </Row>
          <Divider style={{ margin: "10px 0 20px 0" }} />
          <p>توجه! کاربر گرامی ،پیش از انتخاب هر شناسه کالا ، از مطابقت اطلاعات شناسنامه آن شناسه ( از جمله کد HS) با کالای مدنظر خود اطمینان حاصل نمایید. شناسه های نمایش داده شده صرفا بر مبنای اظهار بازرگانان بوده و سامانه شناسه کالا به هیچ عنوان آن را تایید را رد نمی کند. مسئولیت و  هزینه های ناشی از انتخاب شناسه کالای نامناسب ( از جمله هزینه های مالی) به عهده کاربر استفاده کننده است.</p>
          <Table
            handleChangePageSize={
              handleChangeGoodsCommercialDescriptionTablePageSize
            }
            dataSource={goodsIdModal}
            columns={goodsCommercialDescriptionTableColumns}
            pagination={goodsCommercialDescriptionTableParams.pagination}
            onChange={handleGoodsCommercialDescriptionTableChange}
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

export default GoodsID;

