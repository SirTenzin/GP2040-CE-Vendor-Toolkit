function Modal({ modalID, title, content, action, onClick }: any) {
  return (
    <div>
      <dialog id={modalID} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{`${title}`}</h3>
          <p className="py-4">{`${content}`}</p>
          <div className="modal-action">
            <form method="dialog">
             <div className="space-x-4">
                <button className="btn btn-success" onClick={onClick}>{`${action}`}</button>
             </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
