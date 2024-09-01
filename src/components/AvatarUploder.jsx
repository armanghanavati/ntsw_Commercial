import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import { useSelector } from "react-redux";
import Validation from "../utils/Validation";
import themeColors from "../configs/theme";
import Button from "./Button";
import { handleMessageModal } from "../state/action-creators";
import { useDispatch } from "react-redux";

const UploadImage = ({
  inputsData,
  getImageData,
  // getElementError,
  register = false,
  foreign = false,
  description = "",
  errors,
  setErrors,
}) => {
  const { theme } = useSelector((state) => state);
  const [fileList, setFileList] = useState([]);
  // const [errors, setErrors] = useState([]);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (
    info,
    // value,
    validationNameList = [
      ["isFileRequired", info?.file?.name],
      [
        foreign ? "fileFormatForeign" : "fileFormat",
        ["image/png", "image/jpg", "image/svg", "image/jpeg", "image/avif"],
        "jpg , svg , png , jpeg , avif",
      ],
      foreign ? ["fileSizeImageForeign", 100] : ["fileSizeImage", 100],
    ]
  ) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
    getImageData(fileList);
    let size = parseInt(info?.file?.size) / 1024;
    let resulteSize = Math.ceil(size);
    setSize(resulteSize);
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](info?.file, item[1], item[2]) === true) {
        } else {
          temp.push(Validation[item[0]](info?.file, item[1], item[2]));
          // dispatch(
          //   handleMessageModal({
          //     isModalOpen: true,
          //     describe: Validation[item[0]](value, item[1], item[2]),
          //   })
          // );
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        pic: [...temp],
      };
    });
  };

  useEffect(() => {
    setFileList([
      {
        status: "done",
        thumbUrl: "data:image/jpg;base64," + inputsData,
      },
    ]);
  }, [inputsData]);

  const showImage = (img) => {
    var image = new Image();
    // image.src = "data:image/jpg;base64," + img;
    image.src = img?.thumbUrl;
    var w = window.open("");
    w.document.write(image.outerHTML);
  };
  return (
    <>
      <div
        className={`wrapper-upload-img ${register === true || foreign === true ? "wrapper-upload-img-col" : ""
          }`}
      >
        {register === true ? (
          <span className="personnel-text">تصویر پرسنلی</span>
        ) : foreign === true ? (
          <span className="personnel-text-foreign"> Picture Personnel</span>
        ) : (
          <div
            style={{
              backgroundColor: themeColors[theme].bg,
              color: themeColors[theme].text,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRight: "1px solid #ccc",
              borderLeft: "0",
              borderBottomRightRadius: "4px",
              borderTopRightRadius: "4px",
              borderbottomLeftRadius: "0",
              borderTopLeftRadius: "0",
            }}
          >
            <span>تصویر پرسنلی</span>
          </div>
        )}
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          onPreview={showImage}

          className={
            register === true
              ? "wrapper-upload"
              : foreign === true
                ? "wrapper-upload-foreign"
                : ""
          }
          defaultFileList={[]}
          fileList={[...fileList]}
          onChange={handleChange}
          locale={""}
        >
          <div>
            <Button
              className={`select-picture-btn ${register === true
                ? "select-picture-btn-register"
                : foreign === true
                  ? "select-picture-btn-register-foreign"
                  : "select-pic"
                }`}
            >
              <div
                className={
                  register === true || foreign === true
                    ? "icon-folder-rej"
                    : "icon-folder"
                }
              >
                <i className="fa fa-folder-open" />
              </div>

              {foreign === true ? "Select image" : "انتخاب تصویر…"}
            </Button>
          </div>
        </Upload>
      </div>
      <div
        className={
          register === true || foreign === true ? "wrapper-validation" : ""
        }
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div className="wrapper-size-pic">
          <span
            style={{
              width: "4px",
              maxWidth: "4px",
              backgroundColor: " #024158",
            }}
          />
          <h6
            style={{
              boxShadow: " 0 0 3px rgb(0 0 0 / 30%)",
              backgroundColor: "white",
              color: "#EC0B14",
              borderRadius: "2px 0 0 2px",
              padding: "1px 5px",
              fontSize: "13px",
            }}
          >
            {description}
          </h6>
        </div>
        {errors?.pic ? (
          <div className="wrapper-size-pic-error">
            <span
              style={{
                width: "4px",
                maxWidth: "4px",
                backgroundColor: "#024158",
              }}
            />
            <h6
              style={{
                boxShadow: " 0 0 3px rgb(0 0 0 / 30%)",
                backgroundColor: `${size <= 100 &&
                  errors?.pic[0] !==
                  " فرمت مجاز jpg,svg,png,jpeg,avif میباشد" &&
                  errors?.pic[0] !== "allowed format is jpg,svg,png,jpeg,avif"
                  ? "#a0d468"
                  : "#fb6e52"
                  }`,
                color: "#fff",
                borderRadius: "2px 0 0 2px",
                padding: "3px 5px",
                fontSize: "13px",
              }}
            >
              {errors?.pic[0]}
            </h6>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UploadImage;



















