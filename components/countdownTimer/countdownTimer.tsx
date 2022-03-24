import { useEffect, useState } from 'react'

interface ICountdownTimer {
  totalTimeRemaining: number
  onEnd: () => void
}

const timeFormat = (time: number): string => {
  const hours = Math.floor(time / 1000 / 60 / 60) % 24
  const minutes = Math.floor(time / 1000 / 60) % 60
  const seconds = Math.floor(time / 1000) % 60

  return `${hours >= 0 ? hours : 0}:${minutes >= 0 ? minutes : 0}:${
    seconds >= 0 ? seconds : 0
  }`
}

const CountdownTimer: React.VFC<ICountdownTimer> = ({
  totalTimeRemaining,
  onEnd
}): JSX.Element => {
  const [timeRemaining, setTimeRemaining] = useState<number>(totalTimeRemaining)

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

  return <div>{timeFormat(timeRemaining)}</div>
}

export default CountdownTimer
