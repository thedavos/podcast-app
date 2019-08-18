const Modal = props => {
  return (
    <div className="modal">
      {props.children}
      <style jsx>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999999;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
