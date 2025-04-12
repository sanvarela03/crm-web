import React from 'react'
// import { FaXmark } from 'react-icons/fa6'
import './Modal.css'
import ReactDOM from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  )
}
export default Modal
// const ModalPortal: React.FC<ModalProps> = ({ children, onClose }) => {
//   return ReactDOM.createPortal(
//     <Modal onClose={onClose}>{children}</Modal>,
//     document.getElementById('modal-root') as HTMLElement
//   )
// }

// export default ModalPortal
