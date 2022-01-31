import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as SendIcon } from 'assets/icon/send.svg'

interface IMessageInputArea {
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  sendMessage: React.MouseEventHandler<HTMLSpanElement>
}

const SendContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 8px;

  .input {
    flex-grow: 1;
    padding: 0 10px;
    border: none;
  }

  .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    width: 40px;
    height: 40px;
    background: #91a0fb;
    border-radius: 100%;
    cursor: pointer;
  }
`

const TypingArea: React.VFC<IMessageInputArea> = ({
  comment,
  setComment,
  sendMessage
}) => {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value),
    [setComment]
  )

  return (
    <>
      <SendContainer>
        <input
          className='input'
          type='text'
          value={comment}
          placeholder='Enter your message...'
          onChange={handleOnChange}
        />
        <span className='send-button' onClick={sendMessage}>
          <SendIcon />
        </span>
      </SendContainer>
    </>
  )
}

export default TypingArea
