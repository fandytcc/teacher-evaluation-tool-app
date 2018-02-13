import { createMuiTheme } from 'material-ui/styles'

// Colors
export const green        = '#00AA86'
export const red          = '#D32F2F'
export const darkRed      = '#C1272D'
export const white        = '#ffffff'
export const black        = '#000000'
export const darkGrey     = '#757575'
export const grey         = '#DEDEDE'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

//Background
const paperDark                  = '#000046'
const defaultDark                = '#000046'
const appBarDark                 = '#000046'
const contentFrameDark           = '#000046'
const chipDark                   = '#000046'
const avatarDark                 = '#000046'

// Palette
const theme = createMuiTheme({
   palette: {
     primary: {
       light: red,
       main: green,
       dark: green,
       contrastText: black,
     },
     secondary: {
       light: green,
       main: green,
       dark: darkGrey,
       contrastText: white,
     },
     background: {
       paperDark: paperDark,
       defaultDark: defaultDark,
       appBarDark: appBarDark,
       contentFrameDark: contentFrameDark,
       chipDark: chipDark,
       avatarDark: avatarDark
     },
     status: {
       danger: 'orange',
     },
   }
 })

export default theme
