import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CountdownTimer from './countdownTimer'
import { ONE_DAY } from 'assets/constant'

export default {
  title: 'Example/CountdownTimer',
  component: CountdownTimer
} as ComponentMeta<typeof CountdownTimer>

const Template: ComponentStory<typeof CountdownTimer> = args => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}
  >
    <CountdownTimer {...args} />
  </div>
)

export const OneDay = Template.bind({})
OneDay.args = {
  totalTimeRemaining: ONE_DAY,
  onEnd: () => console.log('onEnd')
}

export const ThreeSecond = Template.bind({})
ThreeSecond.args = {
  totalTimeRemaining: 3000,
  onEnd: () => console.log('onEnd')
}

export const Expired = Template.bind({})
Expired.args = {
  totalTimeRemaining: 0,
  onEnd: () => console.log('onEnd')
}
