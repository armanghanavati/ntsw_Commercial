import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderInfoInCertificateOfInspectionDetails from './OrderInfoInCertificateOfInspectionDetails/OrderInfoInCertificateOfInspectionDetails';
import InsuranceAndLogisticsInfo from './InsuranceAndLogisticsInfo/InsuranceAndLogisticsInfo';
import TabCert from './TabCert';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { endpoints } from '../../../services/endpoints';
import axios from 'axios';
import { handleLoading, handleMessageModal } from '../../../state/action-creators';
import converGregorianDateToJalali from '../../../configs/helpers/convert-jalali-date-to-gregorian copy';
import ButtonInCerrtificateOfInseptionDetailes from './ButtonInCerrtificateOfInseptionDetailes/ButtonInCerrtificateOfInseptionDetailes';
import { VerticalSpace } from '../../../components';

const CertificateOfInspectionDetails = () => {
  const dispatch = useDispatch()
  const { search } = useLocation();
  const { GUid, role, theme } = useSelector((state) => state)
  const [filters, setFilters] = useState({})

  const InitializationDataForInspectionCertificateIC = () => {
    dispatch(handleLoading(true));
    const id = search?.split("=")[1]
    const postData = {
      iciVCodeInt: +id,
      urlVCodeInt: role,
      ssdsshGUID: GUid
    }
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.url,
      method: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          const tempbillOfLadingDate = res?.data?.Result?.originalInspectionCertificate?.inspectionCertificate?.iciBillOfLoadingDate?.split("T")[0]
          const splitbillOfLadingDate = tempbillOfLadingDate?.split("-")
          let day = splitbillOfLadingDate[2];
          let month = splitbillOfLadingDate[1];
          let year = splitbillOfLadingDate[0];
          let resultebillOfLadingDate = year + "/" + month + "/" + day;

          const tempInsuranceDate = res?.data?.Result?.originalInspectionCertificate?.inspectionCertificate?.iciInsuranceDate?.split("T")[0]
          const splitInsuranceDate = tempInsuranceDate?.split("-")
          let dayInsuranceDate = splitInsuranceDate[2];
          let monthInsuranceDate = splitInsuranceDate[1];
          let yearInsuranceDate = splitInsuranceDate[0];
          let resulteInsuranceDate = yearInsuranceDate + "/" + monthInsuranceDate + "/" + dayInsuranceDate;


          const tempGhabzDate = res?.data?.Result?.originalInspectionCertificate?.inspectionCertificate?.iciGhabzDate?.split("T")[0]
          const splitGhabzDate = tempGhabzDate?.split("-")
          let dayGhabzDate = splitGhabzDate[2];
          let monthGhabzDate = splitGhabzDate[1];
          let yearGhabzDate = splitGhabzDate[0];
          let resulteGhabzDate = yearGhabzDate + "/" + monthGhabzDate + "/" + dayGhabzDate;


          setFilters({
            iciVCodeInt: res?.data?.Result?.originalInspectionCertificate?.inspectionCertificate?.iciVCodeInt,
            totalAmount: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.prfTotalPriceMny,
            FreightCost: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.prfFreightCostMny,
            OtherCost: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.prfOtherCostMny,
            Borders: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.proformaBorders,
            countryOfOriginOfShipment: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.proformaSources,
            DestinationsCustomes: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.proformaDestinations,
            beneficiaryCountry: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.cnyNameStr,
            contractType: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.cntNameStr,
            shipingMethode: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.proformaTransportTypes,
            currencySupply: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.proformaCurrencyTypes,
            bank: res?.data?.Result?.originalInspectionCertificate?.proformaInfo?.bnkNameStr,
            billOfLadingNumber: res?.data?.Result?.originalInspectionCertificate?.inspectionCertificate?.iciBillOfLoadingNoStr,
            billOfLadingDate: converGregorianDateToJalali(resultebillOfLadingDate),
            insurancePolicyNumber: res?.data?.Result?.originalInspectionCertificate?.inspectionCertificate?.iciInsuranceNoStr,
            GhabzeNumber: res?.data?.Result?.originalInspectionCertificate?.inspectionCertificate?.iciGhabzNoStr,
            InsuranceDate: converGregorianDateToJalali(resulteInsuranceDate),
            GhabzDate: converGregorianDateToJalali(resulteGhabzDate),
            goodsDataSource: res?.data?.Result?.originalInspectionCertificate?.proformaGoodsIC,
            documentation: res?.data?.Result?.originalInspectionCertificate?.inspectionCertificateDocuments,
            DocumentName: res?.data?.Result?.originalInspectionCertificate?.inspectionCertificateDocuments[0]?.iciDocumentName,
            permissions: res?.data?.Result?.originalInspectionCertificate?.inspectionCertificatePermits,
            showButtons: res?.data?.Result?.staticInspectionCertificate?.showButtons,
          })
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch = (error) => {
        console.log(error);
        dispatch(handleLoading(false));
      }
  };
  useEffect(() => {
    InitializationDataForInspectionCertificateIC()
  }, [])

  return (
    <>
      <OrderInfoInCertificateOfInspectionDetails filters={filters} detailMode={true} />
      <InsuranceAndLogisticsInfo filters={filters} detailMode={true} />
      <ButtonInCerrtificateOfInseptionDetailes filters={filters} detailMode={true} />
      <VerticalSpace space="1rem" />
      <TabCert filters={filters} />
    </>
  )
}

export default CertificateOfInspectionDetails;
