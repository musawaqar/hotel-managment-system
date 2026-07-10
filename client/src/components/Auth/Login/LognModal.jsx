import Login from "./Login";
import './LoginModal.css';

export default function LoginModal({isOpen, onClose}) {
    if (!isOpen) return null;


    return (
        <div className="modal">
            <div
            className="modal__backdrop"
            onClick={onClose}
            ></div>
            <div
            className="modal__content"
            >
                <button
                className="modal__close"
                onClick={onClose}
                >
                    x
                </button>

                <Login/>
            </div>

        </div>
    )
}