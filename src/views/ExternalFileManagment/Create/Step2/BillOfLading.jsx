import { Col, Form, Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import Validation from "../../../../utils/Validation";
import { ComboBox, Input, DatePicker, Button } from "../../../../components";
import { useEffect } from "react";

const BillOfLading = ({
  shippingCompany,
  filters,
  setFilters,
  setShippingCompany,
}) => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});
  const { theme, colorMode } = useSelector((state) => state);

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

  const permitForNextStep = (inputsName = []) => {
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

  const addHandler = (event) => {
    event?.preventDefault();
    if (permitForNextStep(["carry", "freightNumber", "freightDate"]) === true) {
      const addNewfreight = {
        carry: filters?.carry,
        freightNumber: filters?.freightNumber,
        freightDate: filters?.freightDate,
      };
      form.resetFields();
      setFilters({
        ...filters,
        addNewfreight: !!filters.addNewfreight
          ? [...filters.addNewfreight, addNewfreight]
          : [addNewfreight],
        carry: undefined,
        freightNumber: undefined,
        freightDate: undefined,
      });
      setErrors({
        ...errors,
        carry: undefined,
        freightNumber: undefined,
        freightDate: undefined,
      });
    }
  };

  const deleteCartableRow = (event, index) => {
    event?.preventDefault();
    const temp = filters?.addNewfreight;
    temp.splice(index, 1);
    setFilters({
      ...filters,
      addNewfreight: [...temp],
    });
  };

  const handleChangeInputs = (name, value, validationNameList, event) => {
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
      title: "شماره بارنامه",
      dataIndex: "freightNumber",
      align: "center",
    },
    {
      title: "تاریخ بارنامه	",
      dataIndex: "freightDate",
      align: "center",
      render: (_, { freightDate }) => {
        let day = freightDate?.day;
        let month = freightDate?.month;
        let year = freightDate?.year;
        let resulte = year + "/" + month + "/" + day;
        let newResulte = resulte?.toString();
        return <sapn className="flex-order-row">{newResulte}</sapn>;
      },
    },
    {
      title: "شرکت حمل",
      dataIndex: "carry",
      align: "center",
      render: (_, { carry }) => {
        const tempCarry = shippingCompany?.find(
          (item) => item?.tpcVCodeInt === carry
        );
        return <sapn className="flex-order-row">{tempCarry?.tpcNameStr}</sapn>;
      },
    },
    {
      title: "حذف",
      dataIndex: "deleteAction",
      align: "center",
      render: (_, record, index) => {
        return (
          <div className="flex-order-row">
            <Button
              type="secondary"
              backgroundColor={themeColors.btn?.danger}
              onClick={(event) => deleteCartableRow(event, index)}
            >
              حذف
            </Button>
          </div>
        );
      },
    },
  ];

  const findMinimumDate = (data) => {
    if (data) {
      const dateWithoutDuplicate = [...new Set(data)];
      const index = dateWithoutDuplicate?.indexOf("0001-01-01");
      if (index > -1) {
        dateWithoutDuplicate?.splice(index, 1);
      }
      let minDate = dateWithoutDuplicate[0];
      dateWithoutDuplicate?.map((item) => {
        if (
          item?.split("-")[0] > minDate?.split("-")[0] ||
          (item?.split("-")[0] === minDate?.split("-")[0] &&
            item?.split("-")[1] > minDate?.split("-")[1]) ||
          (item?.split("-")[0] === minDate?.split("-")[0] &&
            item?.split("-")[1] === minDate?.split("-")[1] &&
            item?.split("-")[2] > minDate?.split("-")[2])
        ) {
          minDate = item;
        }
      });
      const minDateSplited = minDate?.split("-");
      let obj = {
        year: Number(minDateSplited[0]),
        month: Number(minDateSplited[1]),
        day: Number(minDateSplited[2]),
      };

      return obj;
    } else {
      return undefined;
    }
  };

  return (
    <form>
      <div
        className="access-rights"
        style={{
          color: themeColors[theme]?.inputText,
        }}
      >
        <span
          className="access-rights--label"
          style={{
            backgroundColor: themeColors[theme]?.bg,
          }}
        >
          <p>افزودن بارنامه</p>
        </span>
        <div className="BillOfLading">
          <Col m={24} md={12} xl={12}>
            <div>
              <Form form={form}>
                <Form.Item name={'carry'} style={{ margin: "0" }}>
                  <ComboBox
                    name="carry"
                    title="شرکت حمل"
                    type="number"
                    options={shippingCompany}
                    optionTitle="tpcNameStr"
                    optionValue="tpcVCodeInt"
                    onChange={handleChangeInputs}
                    value={filters?.carry}
                    error={errors?.carry}
                    width="160px"
                  />
                </Form.Item>
              </Form>
              <Input
                name="freightNumber"
                title="شماره بارنامه"
                onChange={handleChangeInputs}
                value={filters?.freightNumber}
                error={errors?.freightNumber}
                labelWidth="160px"
                type="number"
              />
              <DatePicker
                title="تاریخ بارنامه"
                name="freightDate"
                onChange={handleChangeInputs}
                value={filters?.freightDate}
                error={errors?.freightDate}
                type={"en"}
                maximumDate={findMinimumDate(filters?.billOfLadingDate)}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "20px",
                }}
              >
                <Button onClick={addHandler}>
                  <i class="fa fa-plus-square" aria-hidden="true"></i>
                  افزودن به لیست بارنامه
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </Button>
              </div>
            </div>
          </Col>

          <Col m={24} md={12} xl={12}>
            <div>
              <Table
                id="Table"
                dataSource={filters?.addNewfreight}
                columns={columns}
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
              />
            </div>
          </Col>
        </div>
      </div>
    </form>
  );
};

export default BillOfLading;
