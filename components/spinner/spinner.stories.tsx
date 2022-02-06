import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Spinner from './spinner'

export default {
  title: 'Example/Spinner',
  component: Spinner
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = args => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <Spinner {...args} />
  </div>
)

export const Normal = Template.bind({})
Normal.args = {
  children: 'button'
}
