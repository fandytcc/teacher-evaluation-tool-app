import { createMuiTheme } from 'material-ui/styles'

// Colors
export const green        = '#4ECDC4'
export const red          = '#FF6B6B'
export const yellow       = '#FFE66D'
export const darkGreen    = '#1A535C'
export const white        = '#ffffff'
export const black        = '#000000'
export const grey         = '#DEDEDE'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

//Background
const mintCream           = '#F7FFF7'
const paperDark           = '#1A535C'
const defaultDark         = '#1A535C'
const appBarEnglishGreen  = '#1A535C'
const contentFrameDark    = '#1A535C'
const chipDark            = '#1A535C'
const avatarDark          = '#1A535C'

// Palette
const theme = createMuiTheme({
   palette: {
     primary: {
       light: green,
       main: darkGreen,
       dark: darkGreen,
       contrastText: white,
     },
     secondary: {
       light: grey30,
       main: mintCream,
       dark: grey,
       contrastText: black,
     },
     background: {
       paperDark: paperDark,
       mintCream: mintCream,
       defaultDark: defaultDark,
       appBarEnglishGreen: appBarEnglishGreen,
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
