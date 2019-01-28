// @flow
import * as MuiColors from "@material-ui/core/colors";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const fnordCreditTheme = createMuiTheme({
  palette: {
    primary: MuiColors.indigo,
    secondary: MuiColors.lightBlue,
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
