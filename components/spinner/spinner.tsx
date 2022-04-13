import styled from 'styled-components'
import { MainTheme } from 'styles/theme'

interface ISpinner {
  color?: string
}

const SpinnerContainer = styled.div<ISpinner>`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: ${({ color }) => color};
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }

  div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }

  div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }

  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`

const Spinner: React.VFC<ISpinner> = ({
  color = MainTheme.white1
}): JSX.Element => (
  <SpinnerContainer color={color}>
    <div></div>
    <div></div>
    <div></div>
  </SpinnerContainer>
)

export default Spinner
