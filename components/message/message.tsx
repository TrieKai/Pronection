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
    isSelf
      ? '". username username avatar" ". time message avatar"'
      : '"avatar username username ." "avatar message time ."'};
  grid-template-columns: ${({ isSelf }) =>
    isSelf ? '1fr auto auto 48px' : '48px auto auto 1fr'};
  grid-template-rows: auto auto;
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
      width: 44px;
      height: 44px;
      border-radius: 100%;
    }
  }

  .username {
    grid-area: username;
    margin-bottom: 4px;
    text-align: ${({ isSelf }) => (isSelf ? 'right' : 'left')};
    color: ${({ theme }) => theme.gray1};
  }

  .message {
    grid-area: message;
    width: max-content;
    min-height: 38px;
    justify-self: ${({ isSelf }) => (isSelf ? 'end' : 'start')};

    .text {
      padding: 8px 10px;
      max-width: 200px;
      border-radius: 4px;
      font-size: 18px;
      line-height: 22px;
      background: ${({ isSelf, theme }) =>
        isSelf ? theme.blue1 : theme.white3};
      color: ${({ isSelf, theme }) => (isSelf ? theme.white2 : theme.blue4)};
      border: ${({ isSelf, theme }) => (isSelf ? theme.blue2 : theme.white4)}
        solid 1px;
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
  ({ isSelf, userAvatarUrl, userName, text, time }, ref): JSX.Element => {
    return (
      <MessageContainer ref={ref} isSelf={isSelf}>
        <span className='avatar'>
          <img src={userAvatarUrl} title={userName} alt='avatar' />
        </span>
        <span className='username'>{userName}</span>
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
