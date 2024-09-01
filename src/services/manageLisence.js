let BaseUrlAddress =
    process.env.REACT_APP_WEATHER_API_KEY === "production-prod"
        ? "https://ntsw.ir"
        : "https://lab.ntsw.ir";
let RestAPIsBaseURL = process.env.REACT_APP_API_ENDPOINT;

export const manageLisence = {
    BaseUrlAddress,
    RestAPIs: {
      getAllProformaPermitList: {
            url: RestAPIsBaseURL + "/Permit/GetAllProformaPermitList",
            method: "post"
        },
    }
};
