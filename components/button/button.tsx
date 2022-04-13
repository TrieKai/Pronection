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
  background: ${({ type, theme }) =>
    type === ButtonType.primary ? theme.blue1 : 'transparent'};
  border: ${({ type, theme }) =>
    type === ButtonType.primary ? 'unset' : `${theme.white1} 2px solid`};
  color: ${({ theme }) => theme.white1};
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  &:hover {
    background: ${({ type, theme }) =>
      type === ButtonType.primary ? theme.blue9 : 'unset'};
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
