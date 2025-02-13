import ReactDom from "react-dom";
import classes from "./Modal.module.css";
const Backdrop = (props) => {
  return (
    <div className={classes.backdrop}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement //delete alert will shown by modal overlay
      )}
    </>
  );
};

export default Modal;