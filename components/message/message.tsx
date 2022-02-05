/* eslint-disable @next/next/no-img-element */
import { forwardRef } from 'react'
import styled from 'styled-components'

interface IMessageContainerStyles {
  isSelf: boolean
}

interface IMessage {
  isSelf: boolean
  userAvatarUrl: string
  userName: string
  text: string
  time: number
}

const MessageContainer = styled.div<IMessageContainerStyles>`
  display: grid;
  grid-template-areas: ${({ isSelf }) =>
    isSelf ? '". time message avatar"' : '"avatar message time ."'};
  grid-template-columns: ${({ isSelf }) =>
    isSelf ? '1fr auto max-content 42px' : '42px max-content auto 1fr'};
  grid-template-rows: minmax(38px, auto);
  justify-content: ${({ isSelf }) => (isSelf ? 'flex-end' : 'flex-start')};
  padding: 4px;
  width: 100%;

  .avatar {
    grid-area: avatar;
    padding-right: ${({ isSelf }) => (isSelf ? 'unset' : '4px')};
    padding-left: ${({ isSelf }) => (isSelf ? '4px' : 'unset')};
    width: 100%;
    height: 100%;

    img {
      width: 38px;
      height: 38px;
      border-radius: 100%;
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
      word-break: break-word;
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

const Message = forwardRef<HTMLDivElement, IMessage>(
  ({ isSelf, userAvatarUrl, userName, text, time }, ref) => {
    return (
      <MessageContainer ref={ref} isSelf={isSelf}>
        <span className='avatar'>
          <img src={userAvatarUrl} title={userName} alt='avatar' />
        </span>
        <div className='message'>
          <div className='text'>{text}</div>
        </div>
        <div className='time'>{new Date(time).toLocaleTimeString()}</div>
      </MessageContainer>
    )
  }
)
Message.displayName = 'message'

export default Message
