import { MouseEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { a, useTransition } from '@react-spring/web'
import styled from 'styled-components'
import { MainTheme } from 'styles/theme'

type position = 'flex-start' | 'center' | 'flex-end'

interface IModalOverlayStyle {
  position: position
}

const ModalOverlay = styled(a.div)<IModalOverlayStyle>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ position }) => position};
  align-items: center;
  background-color: ${({ theme }) => theme.black2};
  z-index: 2;
`

interface ModalProps {
  show: boolean
  onClose?: () => void
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
    onClose && onClose()
  }

  const overlaysTransitions = useTransition(show, {
    from: { background: MainTheme.black3 },
    enter: { background: MainTheme.black2 },
    leave: { background: MainTheme.black3 }
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
