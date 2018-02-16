// @flow
import * as MuiColors from "material-ui/colors";
import createMuiTheme from "material-ui/styles/createMuiTheme";

export const background = "#4e5d6c";
export const lightBackground = "#637f7a";
export const darkBackground = "#404f5e";
export const textColor = MuiColors.blueGrey[50];
export const active = MuiColors.teal[200];
export const red = MuiColors.red[600];
export const green = MuiColors.lightGreen[700];

export const fnordBlue = {
  [50]: "#a1cbf2",
  [100]: "#80a0bf",
  [200]: "#6c87a1",
  [300]: "#637f7a",
  [400]: "#55647d",
  [500]: "#4e5d6c",
  [600]: "#485664",
  [700]: "#404f5e",
  [800]: "#364451",
  [900]: "#303946",
  contrastDefaultColor: 'light',
};

const fnordCreditTheme = createMuiTheme({
  palette: {
    primary: fnordBlue,
    secondary: MuiColors.lightBlue,
    type: 'dark',
    background: {
      paper: "#384B5D"
    }
  },
  typography: {
    fontSize: 24,
    display4: {
      color: "#FFFFFF"
    },
    display3: {
      color: "#FFFFFF"
    },
    body1: {
      fontSize: 20
    },
    body2: {
      fontSize: 20
    },
    title: {
      fontSize: 26
    },
    caption: {
      fontSize: 24
    },
    button: {
      fontSize: 22
    },
    subheading: {
      fontSize: 20
    }
  }
});

export default fnordCreditTheme;
