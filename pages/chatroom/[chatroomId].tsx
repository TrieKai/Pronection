import { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  arrayUnion,
  doc,
  GeoPoint,
  getFirestore,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import styled from 'styled-components'
import Message from 'components/message'
import MessageInputArea from 'components/messageInputArea'
import { ReactComponent as ArrowIcon } from 'assets/icon/arrow.svg'

import { IFirebaseChatroom } from 'types/common'

const DEFAULT_CHATROOM_DATA: IFirebaseChatroom = {
  create_at: 0,
  messages: [],
  name: '',
  position: new GeoPoint(0, 0),
  users: []
}

const ChatroomContainer = styled.div`
  padding: 16px;
  width: 100%;
  height: calc(100% - 64px - 56px);
  background: #f5f8f9;
  overflow-y: auto;
`

const ChatroomHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;

  .back-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
      transform: scaleX(-1);

      [data-class='cls-2'] {
        fill: #314146;
      }
    }
  }

  .chatroom-name {
    margin-left: 8px;
    font-size: 32px;
    font-weight: 600;
  }
`

const provider = new GoogleAuthProvider()

const Chatroom = () => {
  const {
    query: { chatroomId },
    push
  } = useRouter()
  const auth = getAuth()
  const db = getFirestore()
  const firstRender = useRef<boolean>(true)
  const [uid, setUid] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [chatroomData, setChatroomData] = useState<IFirebaseChatroom>(
    DEFAULT_CHATROOM_DATA
  )
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])

  const scrollToLatestMessage = useCallback(() => {
    messageRefs.current[messageRefs.current.length - 1]?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  const sendMessage: React.MouseEventHandler<HTMLSpanElement> =
    useCallback(async (): Promise<void> => {
      if (comment === '') return

      if (auth.currentUser && uid !== '') {
        await updateDoc(doc(db, 'chatrooms', chatroomId as string), {
          users: arrayUnion({ id: uid, photo_url: auth.currentUser.photoURL }),
          messages: arrayUnion({
            user_id: uid,
            user_name: auth.currentUser.displayName,
            text: comment,
            timestamp: Date.now()
          })
        })
        setComment('')
      } else {
        signInWithPopup(auth, provider)
          .then(result => {
            setUid(result.user.uid)
          })
          .catch(error => {
            console.log(error)
            setUid('')
          })
      }
    }, [auth, db, uid, chatroomId, comment])

  useEffect(() => {
    if (chatroomId) {
      const unsubscribe = onSnapshot(
        doc(db, 'chatrooms', chatroomId as string),
        doc => {
          console.log('Current data: ', doc.data())
          const data = doc.data() as IFirebaseChatroom
          setChatroomData(data)
        }
      )

      return () => unsubscribe()
    }
  }, [db, chatroomId])

  useEffect(() => {
    messageRefs.current = Array(chatroomData.messages.length)
      .fill(null)
      .map((_, i) => {
        const messagesLength = chatroomData.messages.length
        if (firstRender.current) {
          if (messagesLength - 1 === i) {
            firstRender.current = false
            scrollToLatestMessage()
          }
        } else {
          if (
            messagesLength - 1 === i &&
            chatroomData.messages[messagesLength - 1].user_id === uid
          )
            scrollToLatestMessage()
        }

        return messageRefs.current[i] || createRef<HTMLDivElement>().current
      })
  }, [chatroomData.messages, uid, scrollToLatestMessage])

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUid(user.uid)
    })
  }, [uid, auth])

  return (
    <>
      <ChatroomHeader>
        <span className='back-icon'>
          <ArrowIcon onClick={() => push('/')} />
        </span>
        <span className='chatroom-name'>{chatroomData.name}</span>
      </ChatroomHeader>
      <ChatroomContainer>
        {chatroomData.messages.map((message, i) => (
          <Message
            ref={el => (messageRefs.current[i] = el)}
            isSelf={message.user_id === uid}
            userAvatarUrl={
              chatroomData.users.find(item => item.id === message.user_id)
                ?.photo_url ?? ''
            }
            text={message.text}
            time={message.timestamp}
            key={i}
          />
        ))}
      </ChatroomContainer>
      <MessageInputArea
        comment={comment}
        setComment={setComment}
        sendMessage={sendMessage}
      />
    </>
  )
}

export default Chatroom
