import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as SendIcon } from 'assets/icon/send.svg'

interface IMessageInputArea {
  sendMessage?: (comment: string) => void
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
    background: ${({ theme }) => theme.blue1};
    border-radius: 100%;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
`

const TypingArea: React.VFC<IMessageInputArea> = ({
  sendMessage
}): JSX.Element => {
  const [comment, setComment] = useState<string>('')

  const handleSendMessage = useCallback(() => {
    setComment('')
    sendMessage && sendMessage(comment)
  }, [comment, sendMessage])

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSendMessage()
  }

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void =>
      setComment(e.target.value),
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
          onKeyPress={handleOnKeyPress}
        />
        <span className='send-button' onClick={handleSendMessage} title='送出'>
          <SendIcon />
        </span>
      </SendContainer>
    </>
  )
}

export default TypingArea
