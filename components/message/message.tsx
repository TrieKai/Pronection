import { VFC } from 'react'
import styled from 'styled-components'
// import { ReactComponent as DefaultAvatarImage } from 'assets/icon/no-photo.svg'

interface IMessageContainerStyles {
  isSelf: boolean
}

interface IMessage {
  isSelf: boolean
  text: string
  time: number
}

const MessageContainer = styled.div<IMessageContainerStyles>`
  display: grid;
  grid-template-areas: ${({ isSelf }) =>
    isSelf ? '"time message avatar"' : '"avatar message time"'};
  grid-template-columns: ${({ isSelf }) =>
    isSelf ? 'auto min-content 40px' : '40px min-content auto'};
  grid-template-rows: minmax(38px, auto);
  justify-content: ${({ isSelf }) => (isSelf ? 'flex-end' : 'flex-start')};
  margin: 4px;
  width: 100%;

  .avatar {
    grid-area: avatar;
    width: 100%;
    height: 100%;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .message {
    grid-area: message;
    width: max-content;
    min-height: 38px;

    .text {
      padding: 8px 10px;
      max-width: 200px;
      border-radius: 4px;
      font-size: 18px;
      line-height: 22px;
      background: ${({ isSelf }) => (isSelf ? '#91a0fb' : '#e5eaec')};
      color: ${({ isSelf }) => (isSelf ? '#fafafa' : '#314146')};
    }
  }

  .time {
    grid-area: time;
    align-self: flex-end;
    margin: 4px 4px;
    font-size: 12px;
    line-height: 16px;
    text-align: ${({ isSelf }) => (isSelf ? 'end' : 'start')};
  }
`

const Message: VFC<IMessage> = ({ isSelf, text, time }) => {
  return (
    <MessageContainer isSelf={isSelf}>
      <span className='avatar'>{/* <DefaultAvatarImage /> */}</span>
      <div className='message'>
        <div className='text'>{text}</div>
      </div>
      <div className='time'>{new Date(time).toLocaleTimeString()}</div>
    </MessageContainer>
  )
}

export default Message
