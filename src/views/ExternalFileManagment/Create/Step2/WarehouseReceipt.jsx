import React, { useState } from "react";
import { Form, Table, Col } from "antd";
import { useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import { Input, DatePicker, Button } from "../../../../components";
import Validation from "../../../../utils/Validation";
import converGregorianDateToJalali from "../../../../configs/helpers/convert-jalali-date-to-gregorian copy";
import { string } from "prop-types";

const WarehouseReceipt = ({ filters, setFilters }) => {
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
    if (permitForNextStep(["ghabzNumber", "ghabzDate"]) === true) {
      const addNewghabzAnbar = {
        ghabzNumber: filters?.ghabzNumber,
        ghabzDate: filters.ghabzDate,
      };
      setFilters({
        ...filters,
        addNewghabzAnbar: !!filters?.addNewghabzAnbar
          ? [...filters?.addNewghabzAnbar, addNewghabzAnbar]
          : [addNewghabzAnbar],
        ghabzNumber: undefined,
        ghabzDate: undefined,
      });
      setErrors({
        ...errors,
        ghabzNumber: undefined,
        ghabzDate: undefined,
      });
      form.resetFields()
    }
  };

  const deleteCartableRow = (event, index) => {
    event?.preventDefault();
    const temp = filters?.addNewghabzAnbar;
    temp.splice(index, 1);
    setFilters({
      ...filters,
      addNewghabzAnbar: [...temp],
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
      title: "شماره قبض انبار",
      dataIndex: "ghabzNumber",
      align: "center",
    },
    {
      title: "تاریخ قبض انبار	",
      dataIndex: "ghabzDate",
      align: "center",
      render: (_, { ghabzDate }) => {
        let day = ghabzDate?.day;
        let month = ghabzDate?.month;
        let year = ghabzDate?.year;
        let resulte = year + "/" + month + "/" + day;
        let newResulte = resulte?.toString();
        return <sapn className="flex-order-row">{newResulte}</sapn>;
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

      const mintest = minDate?.split("-");

      let obj = {
        year: mintest[0],
        month: mintest[1],
        day: mintest[2],
      };
      const dateConvert = converGregorianDateToJalali(obj);
      const dateGhabzeAnbar = dateConvert?.split("/");
      let convertDate = {
        year: Number(dateGhabzeAnbar[0]),
        month: Number(dateGhabzeAnbar[1]),
        day: Number(dateGhabzeAnbar[2]),
      };
      return convertDate;
    } else {
      return undefined;
    }
  };
  console.log(filters?.warehouseReceipt, "test", findMinimumDate(filters?.warehouseReceipt), "test1");

  return (
    <Form form={form}>
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
          <p>افزودن قبض انبار</p>
        </span>

        <div className="BillOfLading">
          <Col m={24} md={12} xl={12}>
            <div>
              {/* <Form.Item name={'ghabzNumber'} style={{ margin: "0" }}> */}
              <Input
                name="ghabzNumber"
                title="شماره قبض انبار"
                onChange={handleChangeInputs}
                value={filters?.ghabzNumber}
                error={errors?.ghabzNumber}
                labelWidth="160px"
                type="number"
              />
              {/* </Form.Item> */}
              <Form form={form}>
                <Form.Item name={'ghabzDate'} style={{ margin: "0" }}>
                  <DatePicker
                    title="تاریخ قبض انبار"
                    name="ghabzDate"
                    onChange={handleChangeInputs}
                    value={filters?.ghabzDate}
                    error={errors?.ghabzDate}
                    maximumDate={findMinimumDate(filters?.warehouseReceipt)}
                  />
                </Form.Item>
              </Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "20px",
                }}
              >
                <Button onClick={addHandler}>
                  <i class="fa fa-plus-square" aria-hidden="true"></i>
                  افزودن به لیست قبض انبار
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </Button>
              </div>

            </div>
          </Col>
          <Col m={24} md={12} xl={12}>
            <div>
              <Table
                id="Table"
                dataSource={filters?.addNewghabzAnbar}
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
    </Form>
  );
};

export default WarehouseReceipt;
