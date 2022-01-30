import { MouseEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { a, useTransition } from '@react-spring/web'
import styled from 'styled-components'

type position = 'start' | 'center' | 'end'

interface IModalOverlayStyle {
  position: position
}

const ModalOverlay = styled(a.div)<IModalOverlayStyle>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ position }) => position};
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`

interface ModalProps {
  show: boolean
  onClose: Function
  position: position
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  position,
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

  const overlaysTransitions = useTransition(show, {
    from: { background: 'rgba(0, 0, 0, 0)' },
    enter: { background: 'rgba(0, 0, 0, 0.5)' },
    leave: { background: 'rgba(0, 0, 0, 0)' }
  })

  return isBrowser ? (
    createPortal(
      overlaysTransitions(({ background }, item) =>
        item ? (
          <ModalOverlay
            onClick={handleCloseClick}
            position={position}
            style={{ background: background }}
          >
            {children}
          </ModalOverlay>
        ) : (
          <></>
        )
      ),
      document.getElementById('modal-root') as Element
    )
  ) : (
    <></>
  )
}

export default Modal
