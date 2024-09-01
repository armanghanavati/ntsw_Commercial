import { useSelector } from "react-redux";
import themeColors from "../configs/theme";
import { Table as AntdTable, Empty } from "antd";
import VerticalSpace from "./VerticalSpace";
const Table = ({
  pagination,
  handleChangePageSize = () => { },
  hasPageSizeCombo = true,
  handleTableChange,
  dataSource = [],
  columns = [],
  loading = false,
  pageSize,
  verticalSpace = "1rem",
  ...others
}) => {
  const { theme, colorMode } = useSelector((state) => state);
  return (
    <>
      {dataSource?.length !== 0 && hasPageSizeCombo ? (
        <span className="page-size-combo">
          <label className="page-size-combo--label" htmlFor="page-size">
            نمایش محتویات
          </label>
          <select
            className="page-size-combo--selector"
            id="page-size"
            value={pagination ? pagination?.pageSize : pageSize}
            onChange={(event) => {
              event?.preventDefault();
              handleChangePageSize(event);
            }}
          >
            <option
              className="page-size-combo--selector--option"
              value="10"
              style={{
                // backgroundColor: themeColors[theme]?.bg,
                color:
                  pagination?.pageSize == 10 || pageSize == 10
                    ? themeColors.dark.inputText
                    : themeColors[theme]?.inputText,
                backgroundColor:
                  pagination?.pageSize == 10 || pageSize == 10
                    ? colorMode
                    : themeColors[theme]?.bg,
              }}
            >
              10
            </option>
            <option
              className="page-size-combo--selector--option"
              value="25"
              style={{
                color:
                  pagination?.pageSize == 25 || pageSize == 25
                    ? themeColors.dark.inputText
                    : themeColors[theme]?.inputText,
                backgroundColor:
                  pagination?.pageSize == 25 || pageSize == 25
                    ? colorMode
                    : themeColors[theme]?.bg,
              }}
            >
              25
            </option>
            <option
              className="page-size-combo--selector--option"
              value="50"
              style={{
                color:
                  pagination?.pageSize == 50 || pageSize == 50
                    ? themeColors.dark.inputText
                    : themeColors[theme]?.inputText,
                backgroundColor:
                  pagination?.pageSize == 50 || pageSize == 50
                    ? colorMode
                    : themeColors[theme]?.bg,
              }}
            >
              50
            </option>
            <option
              className="page-size-combo--selector--option"
              value="100"
              style={{
                color:
                  pagination?.pageSize == 100 || pageSize == 100
                    ? themeColors.dark.inputText
                    : themeColors[theme]?.inputText,
                backgroundColor:
                  pagination?.pageSize == 100 || pageSize == 100
                    ? colorMode
                    : themeColors[theme]?.bg,
              }}
            >
              100
            </option>
          </select>
        </span>
      ) : (
        <VerticalSpace space={verticalSpace} />
      )}
      <AntdTable
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        {...others}
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
            marginBottom:
              !dataSource || dataSource?.length === 0 ? "20px" : "0",
          };
        }}
        locale={{
          emptyText: (
            <>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"موجود نیست"}
                style={{
                  color: themeColors[theme]?.brdcrumbSlash,
                  fontSize: "12px",
                }}
              />
            </>
          ),
        }}
      />
      {(!dataSource || dataSource?.length === 0) && (
        <VerticalSpace space="1rem" />
      )}
    </>
  );
};
export default Table;
