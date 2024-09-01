import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { endpoints } from "../../../services/endpoints";
import { handleStepsOfCreatePage, HandleDetailId } from "../../../state/action-creators";
import Step0 from "./Step0/Step0";
import StepsNavigationBar from "../../../common/StepsNavigationBar";
import { useHistory, useLocation } from "react-router-dom";

const Create = () => {
  const [inputsData, setInputsData] = useState({});
  const [isContinueMode, setIsContinueMode] = useState(false);
  const [editingId, setEditingId] = useState();
  const [errors, setErrors] = useState({});
  const { search, pathname, state } = useLocation();
  const [hasMount, setHasMount] = useState(false);

  const { stepsOfCreatePage, alternativeToken, detailId } = useSelector((state) => state);
  const dispatch = useDispatch();
  let history = useHistory();
  const steps = [
    {
      title: "اطلاعات  اصلی",
    },
    {
      title: "گمرکی و حمل و نقل",
    },
    {
      title: "مالی و بانکی",
    },
    {
      title: "کالاهای پرونده",
    },
    {
      title: "مستندات پرونده",
    },
  ];

  useEffect(() => {
    dispatch(
      handleStepsOfCreatePage({
        NEF: 0,
        hasAccessToStep: false,
        disabledStepsList: [],
      })
    );
    const tempFindId = search?.split("=")[1];
    // dispatch(
    //   HandleDetailId({
    //     detailId:tempFindId
    //   })
    // )
    setHasMount(true);
    setEditingId(state?.from || tempFindId);
    if (!!state?.from) {
      setIsContinueMode(true);
    }
  }, []);


  return (
    <>
      <StepsNavigationBar steps={steps} declarationType="NEF" />
      {stepsOfCreatePage?.NEF >= 0 && hasMount && (
        <>
          <Step0
            errors={errors}
            setErrors={setErrors}
            inputsData={inputsData}
            editingId={editingId}
            setInputsData={setInputsData}
            isContinueMode={isContinueMode}
          />
        </>
      )}
    </>
  );
};

export default Create;
