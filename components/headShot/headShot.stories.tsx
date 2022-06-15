import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Headshot from './headShot'

export default {
  title: 'Example/Headshot',
  component: Headshot
} as ComponentMeta<typeof Headshot>

const Template: ComponentStory<typeof Headshot> = args => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
    }}
  >
    <Headshot {...args} />
  </div>
)

const Avatar =
  'https://lh3.googleusercontent.com/a-/AOh14GioWwbFmJr4UUuAVNN3DXxpIzRdBwaHFC3dGoWGow=s96-c'

export const Default = Template.bind({})
Default.args = { headShotURL: Avatar, width: 50, height: 50 }
