import styled from 'styled-components'

interface IButton {
  onClick?: () => {}
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 7px 12px;
  width: 100%;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  background: #91a0fb;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #8392f8;
  }
`

const Button: React.FC<IButton> = ({ onClick, children }) => {
  return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>
}

export default Button
