import { Button } from "../components";
import themeColors from "../configs/theme";
import * as XLSX from "xlsx-js-style";

const ExcelExportButton = ({ getData = () => { } }) => {
    const getDataforExcel = (e) => {
        e?.preventDefault();
        getData(handleGenerateExcel);
    };

    const handleGenerateExcel = (headerRow, bodyData, fileName) => {
        const workbook = XLSX.utils.book_new();
        let row = [
            { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
            {
                v: "bold & color",
                t: "s",
                s: { font: { bold: true, color: { rgb: "FF0000" } } },
            },
            { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
            { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
        ];
        const tempHeader = headerRow.map((item) => {
            return {
                v: item,
                t: "s",
                s: {
                    fill: { fgColor: { theme: 4 }, bgColor: { theme: 4 } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true },
                },
            };
        });
        const worksheet = XLSX.utils.aoa_to_sheet([[...tempHeader], ...bodyData]);

        let objectMaxLength = [];
        bodyData.map((arr) => {
            Object.keys(arr).map((key) => {
                let value = arr[key] === null ? "" : arr[key];
                if (typeof value === "number") {
                    return (objectMaxLength[key] = 10);
                }
                objectMaxLength[key] =
                    objectMaxLength[key] >= value.length
                        ? objectMaxLength[key]
                        : value.length;
            });
        });

        let worksheetCols = objectMaxLength.map((width) => {
            return {
                width: width + 10,
            };
        });
        worksheet["!cols"] = worksheetCols;
        XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    return (
        <Button
            backgroundColor={themeColors.btn.purple}
            onClick={(e) => getDataforExcel(e)}
        >
            <i class="fa fa-table" aria-hidden="true"></i>
            خروجی اکسل
        </Button>
    );
};
export default ExcelExportButton;
