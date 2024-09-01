import { useDispatch, useSelector } from "react-redux";
import { handleMessageModal } from "../state/action-creators";
import themeColors from "../configs/theme";
import { Divider, Modal } from "antd";
import Button from "./Button";

const MessageModal = () => {
  const dispatch = useDispatch();
  const { theme, messageModal } = useSelector((state) => state);

  const handleClose = () => {
    dispatch(handleMessageModal({ isModalOpen: false, describe: "" }));
  };

  return (
    <>
      {messageModal?.type === "error" ? (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          width={300}
          closable={false}
          footer={null}
          open={messageModal?.isModalOpen || false}
          onCancel={handleClose}
          zIndex="999999999"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={themeColors.btn.danger}
            className="bi bi-fire"
            viewBox="0 0 16 16"
          >
            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
          </svg>
          <Divider
            style={{ margin: "10px 0", borderColor: themeColors.btn.danger }}
          />
          <h6 style={{ textAlign: "center" }} className="modal--title">
            {messageModal?.title || "خطا"}
          </h6>
          <p style={{ textAlign: "center" }} className="modal--text">
            {messageModal?.describe}
          </p>
          <Button
            backgroundColor={themeColors.btn.danger}
            onClick={handleClose}
          >
            بستن
          </Button>
        </Modal>
      ) : messageModal?.type === "warning" ? (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          width={300}
          closable={false}
          footer={null}
          open={messageModal?.isModalOpen || false}
          onCancel={handleClose}
          zIndex="9999999999"
        >
          <i
            style={{
              fontSize: "2.5rem",
              color: themeColors.btn.warning,
            }}
            class="fa fa-exclamation-triangle"
            aria-hidden="true"
          ></i>
          <Divider
            style={{ margin: "10px 0", borderColor: themeColors.btn.warning }}
          />
          {!!messageModal?.title && (
            <h6
              // style={{ margin: "10px 20px", fontSize: "0.9rem" }}
              className="modal--title"
            >
              {" "}
              {messageModal?.title}
            </h6>
          )}
          <p className="modal--text">{messageModal?.describe}</p>
          <Button
            backgroundColor={themeColors.btn.warning}
            onClick={handleClose}
          >
            بستن
          </Button>
        </Modal>
      ) : messageModal?.type === "praimary" ? (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          width={300}
          closable={false}
          footer={null}
          open={messageModal?.isModalOpen || false}
          onCancel={handleClose}
          zIndex="9999999999"
        >
          <i
            style={{
              fontSize: "2.5rem",
              color: themeColors.comments.blue,
            }}
            class="fa fa-envelope"
            aria-hidden="true"
          ></i>
          <Divider
            style={{ margin: "10px 0", borderColor: themeColors.comments.blue }}
          />
          {!!messageModal?.title && (
            <h6
              // style={{ margin: "10px 20px", fontSize: "0.9rem" }}
              className="modal--title"
            >
              {" "}
              {messageModal?.title}
            </h6>
          )}
          <p className="modal--text">{messageModal?.describe}</p>
          <Button
            backgroundColor={themeColors.comments.blue}
            onClick={handleClose}
          >
            بستن
          </Button>
        </Modal>
      ) : (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          width={300}
          closable={false}
          footer={null}
          open={messageModal?.isModalOpen || false}
          onCancel={handleClose}
          zIndex="9999999999"
        >
          <i
            style={{
              fontSize: "2.5rem",
              color: themeColors.btn.secondary,
            }}
            class="fa fa-check-square-o"
            aria-hidden="true"
          ></i>
          <Divider
            style={{ margin: "10px 0", borderColor: themeColors.btn.secondary }}
          />
          <h6 className="modal--title">پیغام</h6>
          <p className="modal--text">{messageModal?.describe}</p>
          <Button
            backgroundColor={themeColors.btn.secondary}
            onClick={handleClose}
          >
            بستن
          </Button>
        </Modal>
      )}
    </>
  );
};
export default MessageModal;