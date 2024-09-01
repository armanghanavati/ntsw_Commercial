import React from "react";
import { Button } from "../../../../components";
import themeColors from "../../../../configs/theme";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { useEffect } from "react";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";
import { Tooltip } from "antd";

const DocumentsShow = ({
  documentsList,
  setDocumentsList,
  prfVCodeInt,
  showProformaDocument,
  filters,
  setFilters,
  editingId,
}) => {
  const [selectedId, setSelectedId] = useState();

  const { questionModal, GUid, role } = useSelector((state) => state);
  const dispatch = useDispatch();

  const deleteDocument = (id) => {
    dispatch(
      handelQuestionModal({
        isModalOpen: true,
        title: "حذف",
        describe: "آیا از حذف این داکیومنت اطمینان دارید؟",
        name: `DELETE_DOCUMENT_${id}`,
      })
    );
    setSelectedId(id);
  };

  useEffect(() => {
    if (questionModal.name === `DELETE_DOCUMENT_${selectedId}`) {
      if (questionModal.answer === "yes") {
        if (filters?.status > 1) {
          deleteProformaDocumentForEditMode(selectedId);
        } else {
          deleteProformaDocument(selectedId);
        }
      } else if (questionModal.answer === "yes") {
        setSelectedId();
        dispatch(
          handelQuestionModal({
            isModalOpen: false,
            title: "",
            describe: "",
          })
        );
      }
    }
  }, [questionModal.answer]);

  const deleteProformaDocumentForEditMode = (id) => {
    if (typeof id === "string") {
      setDocumentsList(documentsList?.filter((x) => x?.GUID !== id));
      setFilters({
        ...filters,
        DeletedDocument: [...(filters?.DeletedDocument || []), id],
      });
    } else {
      setFilters({
        ...filters,
        InsertedDocument: filters?.InsertedDocument?.filter(
          (x) => x?.GUID !== id
        ),
      });
    }
    dispatch(
      handleMessageModal({
        isModalOpen: true,
        describe: "با موفقیت ثبت شد.",
        type: "success",
      })
    );
  };

  const deleteProformaDocument = (id) => {
    dispatch(handleLoading(true));
    const formData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCodeInt,
      GUID: [id],
    };

    axios({
      url: endpoints.RestAPIs.Proforma.deleteProformaDocument.url,
      method: endpoints.RestAPIs.Proforma.deleteProformaDocument.method,
      data: formData,
    })
      .then((res) => {
        if (res?.data?.Error === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: "با موفقیت ثبت شد.",
              type: "success",
            })
          );
          showProformaDocument();
        } else if (res?.data?.Error === 1) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  const showImage = (img) => {
    var image = new Image();
    image.src = "data:image/jpg;base64," + img;
    var w = window.open("");
    w.document.write(image.outerHTML);
  };

  const showPDF = (pdf) => {
    var blob = base64toBlob(pdf);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  };

  const showDocument = (item) => {
    if (item.Format === "pdf") {
      showPDF(item.DOC);
    } else {
      showImage(item.DOC);
    }
  };

  const base64toBlob = (base64Data) => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
  };

  return (
    <div className="document-show--pictures" id="Documents">
      {[
        ...(!!filters.InsertedDocument ? filters.InsertedDocument : []),
        ...documentsList,
      ]?.map((item) => (
        <span className="document-show--pictures__picture">
          <Button
            onClick={(event) => {
              event?.preventDefault();
              deleteDocument(item?.GUID);
            }}
            hasVerticalSpace={false}
            type={"secondary"}
            backgroundColor={themeColors.btn.danger}
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
            حذف
          </Button>
          <span
            onClick={() => {
              if (item.Format === "pdf") {
                showPDF(item.DOC);
              }
            }}
            className="document-show--pictures__picture__img"
          >
            {item.Format === "pdf" ? (
              <embed
                src={
                  item.Format === "pdf"
                    ? `data:application/pdf;base64,${item.DOC}`
                    : `data:image/png;base64,${item.DOC}`
                }
                alt="حساب کاربری"
                className="document-show--pictures__picture__img--pic"
              />
            ) : (
              <img
                src={`data:image/png;base64,${item.DOC}`}
                alt="حساب کاربری"
                className="document-show--pictures__picture__img--pic"
                onClick={() => {
                  showImage(item.DOC);
                }}
              />
            )}
            <Tooltip placement="top" title={"برای مشاهده کلیک کنید."}>
              <span
                className="document-show--pictures__picture__img--caption"
                onClick={() => showDocument(item)}
              >
                {item.Caption}
              </span>
            </Tooltip>
          </span>
        </span>
      ))}
    </div>
  );
};

export default DocumentsShow;
