import { getMessaging, getToken } from 'firebase/messaging'
import localforage from 'localforage'

const tokenInlocalforage = () => localforage.getItem('fcm_token')

export const FCMInit = async (): Promise<false | undefined> => {
  try {
    if ((await tokenInlocalforage()) !== null) return false

    const messaging = getMessaging()
    await Notification.requestPermission()
    const token = await getToken(messaging)

    localforage.setItem('fcm_token', token)
    console.log('fcm_token', token)
  } catch (error) {
    console.error(error)
  }
}
