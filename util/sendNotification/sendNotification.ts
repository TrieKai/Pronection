import axios from 'axios'
import { INotification } from 'types/common'

const SendNotification = (
  title: string,
  body: string,
  icon: string,
  url: string,
  token: string
): void => {
  const notification: INotification = {
    title,
    body,
    icon
  }
  axios.post(
    'https://fcm.googleapis.com/fcm/send',
    {
      notification,
      to: token,
      webpush: { fcm_options: { link: 'https://pronection.herokuapp.com' } }
    },
    {
      headers: {
        Authorization: `key=${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SERVER_KEY}`
      }
    }
  )
}

export default SendNotification
