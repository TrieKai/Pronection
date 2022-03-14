import axios from 'axios'

const SendNotification = (title: string, body: string, token: string): void => {
  axios.post(
    'https://fcm.googleapis.com/fcm/send',
    {
      notification: {
        title: title,
        body: body
      },
      to: token
    },
    {
      headers: {
        Authorization: `key=${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SERVER_KEY}`
      }
    }
  )
}

export default SendNotification
