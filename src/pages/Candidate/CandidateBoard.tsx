import React, { useState } from 'react'
import './CandidateBoard.css'
import Modal from '../../components/Modal'
export default function CandidateBoard() {
  const [showModal, setShowModal] = useState(false)
  const handleClick = () => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  console.log(showModal)
  return (
    <>
      <div>
        <h1>Tablero de candidato</h1>
        <button className="btn-add" onClick={handleClick}>
          Agregar campaña
        </button>
      </div>
      {/* <dialog open={showModal} closedby="any">
        <h2>Bienvenido</h2>
        <p>Este es un ejemplo de modal en HTML</p>
        <form method="dialog">
          <button
            onClick={() => {
              setShowModal(false)
            }}
          >
            Cerrar
          </button>
        </form>
      </dialog> */}
      {showModal && <Modal onClose={handleClose}>HOLA SKDFJÑASFD</Modal>}
    </>
  )
}
