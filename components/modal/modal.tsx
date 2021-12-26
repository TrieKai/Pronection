import { MouseEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`

interface ModalProps {
  show: boolean
  onClose: Function
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children
}): JSX.Element => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCloseClick = (e: MouseEvent) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <StyledModalOverlay onClick={handleCloseClick}>
      {children}
    </StyledModalOverlay>
  ) : (
    <></>
  )

  return isBrowser ? (
    createPortal(modalContent, document.getElementById('modal-root') as Element)
  ) : (
    <></>
  )
}

export default Modal
