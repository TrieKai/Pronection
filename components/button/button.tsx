import styled from 'styled-components'

interface IButton {
  onClick?: () => {}
}

const ButtonContainer = styled.div`
  display: flex;
  padding: 7px 12px;
  width: fit-content;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  background: #1ea7fd;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #2aadff;
  }
`

const Button: React.FC<IButton> = ({ onClick, children }) => {
  return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>
}

export default Button
