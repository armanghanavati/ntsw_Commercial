import React from "react";
import {
  Button,
  QuestionModal,
  QuickGuide,
  TitleBox,
  VerticalSpace,
} from "../../../../components";
import { Col, Row, Tooltip } from "antd";
import { useState } from "react";
import SelectDocumentsModal from "./SelectDocumentsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoading,
  handleMessageModal,
  handleStepsOfCreatePage,
} from "../../../../state/action-creators";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";
import { useEffect } from "react";
import DocumentsShow from "./DocumentsShow";
import themeColors from "../../../../configs/theme";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SubmitDeclaration from "./SubmitDeclaration";

const Step4 = ({
  // billLading,
  prfVCode,
  editingId,
  filters,
  setFilters,
  continueFile,
  wareHouse,
  modalMode,
  isContinueMode,
  setModalMode,
  statusNameStepFive
}) => {
  const [documentsList, setDocumentsList] = useState([]);
  const [isOpenQuickGuide, setIsOpenQuickGuide] = useState(false);
  const { GUid, role, stepsOfCreatePage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const prev = (event) => {
    event?.preventDefault();
    dispatch(
      handleStepsOfCreatePage({
        NEF: stepsOfCreatePage?.NEF - 1,
        hasAccessToStep: true,
      })
    );
  };

  const showProformaDocument = () => {
    dispatch(handleLoading(true));
    const formData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCode,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.showProformaDocument.url,
      method: endpoints.RestAPIs.Proforma.showProformaDocument.method,
      data: formData,
    })
      .then((res) => {
        if (res?.data?.Error === 0) {
          if (!!editingId && !!filters?.DeletedDocument) {
            setDocumentsList(
              res?.data?.DOCs.filter(
                (x) => !filters?.DeletedDocument.includes(x?.GUID)
              )
            );
          } else {
            setDocumentsList(res?.data?.DOCs);
          }
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

  useEffect(() => {
    showProformaDocument();
  }, []);

  const stepsOfQuickGuide = [
    {
      intro:
        "در این مرحله می توانید مستند/مستندات ثبت شده برای پرونده را مشاهده، حذف و یا اضافه نمایید.",
      position: "right",
    },
    {
      element: "#AddDocuments",
      intro:
        "برای افزودن مستندات و فایل های ضمیمه مورد نیاز برای پرونده با کلیک بر این دکمه مستند/مستندات خود را انتخاب و ثبت نمایید .",
      position: "right",
    },
    {
      element: "#Documents",
      intro: "نهایتا دکمه ثبت را فشار دهید.",
      position: "right",
    },
  ];

  const handleShowQuickGuides = (event) => {
    event.preventDefault();
    setIsOpenQuickGuide(!isOpenQuickGuide);
  };

  return (
    <>
      {stepsOfCreatePage?.NEF === 4 && (
        <QuickGuide
          enabled={isOpenQuickGuide}
          setEnabled={setIsOpenQuickGuide}
          steps={stepsOfQuickGuide}
        >
          <div>
            <QuestionModal />
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={24} xl={24}>
                <TitleBox title="مستندات پرونده" />
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <DocumentsShow
              documentsList={documentsList}
              setDocumentsList={setDocumentsList}
              prfVCodeInt={prfVCode}
              showProformaDocument={showProformaDocument}
              filters={filters}
              setFilters={setFilters}
              editingId={editingId}
            />
            <div className="document-show ">
              <span className="document-show--container__status ">
                <span className="document-show--container__status-title ">
                  وضعیت پرونده:
                </span>
                <span className="document-show--container__status-name ">
                  {!!statusNameStepFive ? statusNameStepFive : filters?.statusName}
                </span>

                <SelectDocumentsModal
                  editingId={editingId}
                  prfVCodeInt={prfVCode}
                  showProformaDocument={showProformaDocument}
                  setFilters={setFilters}
                  filters={filters}
                />
              </span>
              <span className="document-show--container ">
                <Tooltip
                  title="راهنمای سریع"
                  color={themeColors.comments.green}
                >
                  <span>
                    <Button
                      onClick={handleShowQuickGuides}
                      backgroundColor={themeColors.comments.green}
                      hasVerticalSpace={false}
                    >
                      <i class="fa fa-info" aria-hidden="true"></i>
                    </Button>
                  </span>
                </Tooltip>
                <Button
                  type="primary"
                  onClick={() => history.goBack()}
                  backgroundColor={themeColors.btn.yellow}
                  hasVerticalSpace={false}
                >
                  انصراف
                </Button>
                <Button
                  name="next"
                  type="primary"
                  onClick={prev}
                  backgroundColor={themeColors.btn.primary}
                  hasVerticalSpace={false}
                >
                  <i className="fa fa-step-forward" aria-hidden="true"></i>
                  قبلی
                </Button>
                <SubmitDeclaration
                  filters={{ ...filters, Docs: documentsList }}
                  editingId={editingId}
                  prfVCodeInt={prfVCode}
                  continueFile={continueFile}
                  wareHouse={wareHouse}
                  setFilters={setFilters}
                  setModalMode={setModalMode}
                  modalMode={modalMode}
                  isContinueMode={isContinueMode}
                />
              </span>
            </div>
          </div>
        </QuickGuide>
      )}
    </>
  );
};

export default Step4;
