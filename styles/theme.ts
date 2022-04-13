import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    blue1: string
    blue2: string
    blue3: string
    blue4: string
    blue5: string
    blue6: string
    blue7: string
    blue8: string
    blue9: string
    blue10: string
    blue11: string
    blue12: string
    white1: string
    white2: string
    white3: string
    white4: string
    white5: string
    white6: string
    black1: string
    black2: string
    black3: string
    gray1: string
  }
}

export const MainTheme: DefaultTheme = {
  blue1: '#91a0fb',
  blue2: '#8b9aff',
  blue3: '#6777e2',
  blue4: '#314146',
  blue5: 'rgba(40, 70, 80, 0.6)',
  blue6: '#5668df',
  blue7: '#535faa',
  blue8: '#8898ff',
  blue9: '#8392f8',
  blue10: '#4284f3',
  blue11: 'rgba(66, 132, 243, 0.6)',
  blue12: '#28465099',
  white1: '#fff',
  white2: '#fafafa',
  white3: '#ececec',
  white4: '#e2e9ec',
  white5: '#f5f8f9',
  white6: '#cae0e8',
  black1: '#000',
  black2: 'rgba(0, 0, 0, 0.5)',
  black3: 'rgba(0, 0, 0, 0)',
  gray1: '#9e9e9e'
}
