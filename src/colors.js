// @flow
import * as MuiColors from "@material-ui/core/colors";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const fnordCreditTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#2e4763",
      dark: "#002039",
      light: "#5a7291"
    },
    secondary: MuiColors.lightBlue,
    background: {
      paper: "#22374d"
    },
    type: "dark"
  },
  typography: {
    display4: {
      color: "#FFFFFF"
    },
    display3: {
      color: "#FFFFFF"
    }
  }
});

export default fnordCreditTheme;
