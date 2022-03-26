import styled from 'styled-components'

import { ButtonType } from './button.type'

interface IButton {
  type: ButtonType
  onClick?: () => void
}

interface IButtonStyles {
  type: ButtonType
}

const ButtonContainer = styled.div<IButtonStyles>`
  display: flex;
  justify-content: center;
  padding: 7px 12px;
  width: 100%;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  background: ${({ type }) =>
    type === ButtonType.primary ? '#91a0fb' : 'transparent'};
  border: ${({ type }) =>
    type === ButtonType.primary ? 'unset' : '#fff 2px solid'};
  color: #fff;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  &:hover {
    background: ${({ type }) =>
      type === ButtonType.primary ? '#8392f8' : 'unset'};
  }
`

const Button: React.FC<IButton> = ({
  type,
  onClick,
  children
}): JSX.Element => {
  return (
    <ButtonContainer type={type} onClick={onClick}>
      {children}
    </ButtonContainer>
  )
}

export default Button
