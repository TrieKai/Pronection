import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './button'

export default {
  title: 'Example/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Normal = Template.bind({})
Normal.args = {
  children: 'button'
}
