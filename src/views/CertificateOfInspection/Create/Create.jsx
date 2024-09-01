import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { endpoints } from "../../../services/endpoints";
import { handleStepsOfCreatePage, HandleDetailId } from "../../../state/action-creators";
import Step0 from "./Step0"
import StepsNavigationBar from "../../../common/StepsNavigationBar";
import { useHistory, useLocation } from "react-router-dom";

const Create = () => {
    const [hasMount, setHasMount] = useState(false);
    const [inputsData, setInputsData] = useState({});
    const [errors, setErrors] = useState({});
    const { stepsOfCreatePage } = useSelector((state) => state);
    const dispatch = useDispatch();



    const steps = [
        {
            title: "اطلاعات  ثبت سفارش / پرونده",
        },
        {
            title: "اطلاعات بیمه و لجستیک",
        },
        {
            title: "افزودن کالا به لیست",
        },
        {
            title: "پیوست ها",
        },
    ];

    useEffect(() => {
        dispatch(
            handleStepsOfCreatePage({
                ICO: 0,
                hasAccessToStep: false,
                disabledStepsList: [],
            })
        );
    }, []);


    return (
        <>
            <StepsNavigationBar steps={steps} declarationType="ICO" />
            {stepsOfCreatePage?.ICO >= 0 && (
                <>
                    <Step0
                        errors={errors}
                        setErrors={setErrors}
                        inputsData={inputsData}
                        setInputsData={setInputsData}
                    />
                </>
            )}
        </>
    );
};

export default Create;
