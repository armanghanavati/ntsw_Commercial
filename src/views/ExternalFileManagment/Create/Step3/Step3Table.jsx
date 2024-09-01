import { Modal, Table } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import { Button } from "../../../../components";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";
import { useEffect } from "react";
import { handleMessageModal } from "../../../../state/action-creators";
const Step3Table = ({
  filters,
  setFilters,
  selectedRowKeys,
  setSelectedRowKeys,
  setIsShowModal,
  setModalMode,
  setShowBasicInformation,
  tableParams = {},
  setTableParams,
  loading,
  addGoodsData,
  setOpenOriginOfCurrency,
  openOriginOfCurrency,
  showSupplementaryInfo,
  editingId,
  setShowSupplementaryInfo,
  inputsData,
  setQuestionModalMode,
  isContinueMode,
  showItem,
  setShowItem
}) => {
  const dispatch = useDispatch();
  const [dataOriginOfCurrency, setDataOriginOfCurrency] = useState([]);
  const { theme, colorMode, role, GUid } = useSelector((state) => state);
  const [vCodeLng, setVCodeLng] = useState("");
  const [click, setClick] = useState(false);
  const OriginOfCurrency = (event, record) => {
    event.preventDefault();
    setOpenOriginOfCurrency(true);
    setClick(true);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const cancelOrganizationHandler = (event) => {
    event.preventDefault();
    setOpenOriginOfCurrency(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const OriginOfCurrencyColumns = [
    {
      title: "جمع مبلغ فوب",
      dataIndex: "FobSum",
      align: "center",
    },
    {
      title: "وزن خالص",
      dataIndex: "NetWeightSum",
      align: "center",
    },
    {
      title: "وزن ناخالص",
      dataIndex: "GrossWeightSum",
      align: "center",
    },
    {
      title: "مقدار/تعداد",
      dataIndex: "CountSum",

      align: "center",
    },
    {
      title: "قیمت واحد",
      dataIndex: "UnitPrice",
      align: "center",
    },
  ];

  const columns = [
    {
      title: "کد مجازی کالا",
      dataIndex: "pfgVCodeLng",
      align: "center",
    },
    {
      title: "کد تعرفه",
      dataIndex: "gdsHSCode",
      align: "center",
    },
    {
      title: "شرح تعرفه",
      dataIndex: "gdsHSDescStr",

      align: "center",
    },
    {
      title: "شرح تجاری",
      dataIndex: "pfgCommercialDescStr",
      align: "center",
    },
    {
      title: "حقوق ورودی",
      dataIndex: "gdsTariffTny",
      align: "center",
    },
    {
      title: "میزان تخفیف (FOC)",
      dataIndex: "pfgDiscountMny",
      align: "center",
    },
    {
      title: "اولویت کالایی	",
      dataIndex: "gdsPriorityTny",
      align: "center",
    },
    {
      title: "نام تولید کننده	",
      dataIndex: "prfManufractureStr",
      align: "center",
      render: (_, { prfManufractureStr, pfgManufractureStr }) => {
        return (
          `${!!prfManufractureStr ? prfManufractureStr : ''} ${!!pfgManufractureStr ? pfgManufractureStr : ''}`
        );
      },
    },
    {
      title: "وضعیت کالا",
      dataIndex: "pfgGoodsStatusStr",
      align: "center",
    },
    {
      title: "سال تولید	",
      dataIndex: "pfgProductionDate",
      align: "center",
    },
    {
      title: "تعداد / مقدار	",
      dataIndex: "pfgCountInt",
      align: "center",
    },
    {
      title: "مبلغ FOB",
      dataIndex: "pfgFOBPriceMny",
      align: "center",
    },
    {
      title: "وزن خالص",
      dataIndex: "pfgNetWeightInt",
      align: "center",
    },

    {
      title: "وزن ناخالص",
      dataIndex: "pfgGrossWeightInt",
      align: "center",
    },
    {
      title: "ویرایش",
      dataIndex: "detaile",
      align: "center",
      render: (_, record) => {
        return (
          <div className="flex-order-row">
            <Button
              type="secondary"
              onClick={(event) => {
                editAddGoodsHandler(event, record);
              }}
              disabled={record.SuspendedGoods}
            >
              ویرایش
            </Button>
          </div>
        );
      },
    },
    {
      title: "منشا ارز",
      dataIndex: "plbDescritpionStr",
      align: "center",
      render: (_, record) => (
        setVCodeLng(record?.pfgVCodeLng),
        (
          <div className="flex-order-row">
            <Button
              type="secondary"
              onClick={(event) => OriginOfCurrency(event, record)}
            >
              جزئیات
            </Button>
          </div>
        )
      ),
    },
  ];


  const getPrecotageDetails = () => {
    const postData = {
      pfgVCodeLng: vCodeLng,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.getPrecotageDetails.url,
      method: endpoints.RestAPIs.Proforma.getPrecotageDetails.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.ErrorCode === 0) {
          setDataOriginOfCurrency([res?.data]);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        setClick(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const editAddGoodsHandler = (event, record) => {
    setQuestionModalMode()
    event.preventDefault();
    setModalMode("mode");
    setShowItem()
    setShowSupplementaryInfo(true)
    setIsShowModal(true);
    setShowBasicInformation(true);
    const newProformaGoodsCountries = [];
    record?.ProformaGoodsCountries?.map((item) =>
      newProformaGoodsCountries?.push(JSON.stringify(item?.cnyVCodeInt))
    );

    const findAdditionalInformationHasRule =
      record?.GoodsOtherPropertiesList?.filter((item) => item?.gopHasRule === 0);
    const infoTakmiliEditHasRule = record?.GoodsOtherPropertiesList?.filter(
      (item) => item?.gopHasRule === 1
    );
    const temporaryOtherPropertiesValues = {};
    const temporaryspecialPropertiesListValues = {}


    findAdditionalInformationHasRule?.map(item => {
      temporaryspecialPropertiesListValues[item?.oprVCodeInt] = item?.gopValueStr
    })
    infoTakmiliEditHasRule.map((item) => {
      temporaryOtherPropertiesValues[item.oprVCodeInt] = item?.gopValueStr;
    });
    setFilters({
      ...filters,
      hasPersianGoodsId: !!filters?.cidCode === true ? true : false,
      HasPersianOrganization: !!filters?.OrgIDCode === true ? true : false,
      hsCode: record?.gdsHSCode,
      cidCode: record?.cmpIRCCodeStr,
      OrgIDCode: record?.pfgOrgIDCodestr,
      commercialDescStr: record?.pfgCIDTypeTny === 11 ? record?.pfgStaticCommercialDescStr : record?.pfgCommercialDescStr,
      englishDescription: record?.pfgCIDTypeTny === 11 ? record?.pfgStaticCommercialDescEnStr : record?.pfgCommercialDescEnStr,
      productionYear: (record?.pfgProductionDate),
      measurement: record?.pfgmsuVCodeTny,
      quantity: record?.pfgFOBPriceMny,
      Discount: record?.pfgDiscountMny,
      amount: record?.pfgCountInt,
      netWeight: record?.pfgNetWeightInt,
      grossWeight: record?.pfgGrossWeightInt,
      packageType: JSON.stringify(record?.pfgpckVCodeInt),
      itemStatus: JSON.stringify(record?.pfgGoodsStatusTny),
      Countrie: newProformaGoodsCountries,
      technicalSpecifications: record?.pfgTechnicalSpecStr,
      standard: record?.pfgStandardStr,
      producersName: record?.prfManufractureStr,
      pfgVCodeLng: record?.pfgVCodeLng,
      gdsHSDescStr: record?.gdsHSDescStr,
      gdsPriorityTny: record?.gdsPriorityTny,
      gdsTariffTny: record?.gdsTariffTny,
      pfgCIDTypeTny: record?.pfgCIDTypeTny,
      specialPropertiesList: findAdditionalInformationHasRule,
      hSNameStr: record?.gdsHSNameStr,
      pfgTraceCodeLng: record?.pfgTraceCodeLng,
      commercialDescEnStr: record?.pfgCIDTypeTny === 11 ? record?.pfgCommercialDescEnStr : record?.pfgStaticCommercialDescEnStr,
      commercialDesc: record?.pfgCIDTypeTny === 11 ? record?.pfgCommercialDescStr : record?.pfgStaticCommercialDescStr,
      goodsOtherProperties: infoTakmiliEditHasRule,
      ...temporaryOtherPropertiesValues,
      ...temporaryspecialPropertiesListValues

    });

  };
  useEffect(() => {
    if (!!click) {
      getPrecotageDetails();
    }
  }, [click]);

  return (
    <>
      <Table
        rowKey="pfgVCodeLng"
        dataSource={
          inputsData?.status > 1
            ? inputsData?.Goods
            : addGoodsData
        }
        rowSelection={rowSelection}
        columns={columns}
        pagination={tableParams?.pagination}
        loading={loading}
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
          };
        }}
      />
      {openOriginOfCurrency && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="جزییات منشا ارز"
          open={openOriginOfCurrency}
          width={900}
          footer={false}
          onCancel={(event) => cancelOrganizationHandler(event)}
        >
          <Table
            dataSource={dataOriginOfCurrency}
            columns={OriginOfCurrencyColumns}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            onHeaderRow={() => {
              return {
                style: { backgroundColor: colorMode },
              };
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Step3Table;
