import Modal from "../modal/Modal";

const Alert = (props) => {
  return (
    <Modal>
      <>
        <div>{props.alert}</div>
        <div>
          <button onClick={props.onConfirm}>Yes</button>
          <button onClick={props.onCancel}>No</button>
        </div>
      </>
    </Modal>
  );
};

export default Alert;
