import { useEffect, useState } from 'react'
import Pad from 'util/pad'

interface ICountdownTimer {
  totalTimeRemaining: number
  onEnd: () => void
}

const timePlaces = 2

const timeFormat = (time: number, isInit: boolean): string => {
  const hours = Math.floor(time / 1000 / 60 / 60) % 24
  const minutes = Math.floor(time / 1000 / 60) % 60
  const seconds = Math.floor(time / 1000) % 60

  if (isInit) return '--:--:--'

  return `${hours >= 0 ? Pad(hours, timePlaces) : Pad(0, timePlaces)}:${
    minutes >= 0 ? Pad(minutes, timePlaces) : Pad(0, timePlaces)
  }:${seconds >= 0 ? Pad(seconds, timePlaces) : Pad(0, timePlaces)}`
}

const CountdownTimer: React.VFC<ICountdownTimer> = ({
  totalTimeRemaining,
  onEnd
}): JSX.Element => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  useEffect(() => {
    if (timeRemaining < 0) {
      onEnd()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining(time => time - 1000)
    }, 1000)

    return () => clearInterval(timer)
  }, [onEnd, timeRemaining])

  useEffect(() => {
    totalTimeRemaining >= 0 && setTimeRemaining(totalTimeRemaining)
  }, [totalTimeRemaining])

  return <div>{timeFormat(timeRemaining, totalTimeRemaining <= 0)}</div>
}

export default CountdownTimer
