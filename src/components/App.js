// @flow
import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserDetails from "views/UserDetails";
import UserList from "views/UserList";
import fnordCreditTheme from "colors";
import API from "API";

type Props = {};
type State = {
  users: Array<User>,
  products: Array<Product>,
  view: "userList" | "userDetail",
  selectedUser: ?User,
};

const theme = fnordCreditTheme;

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      users: [],
      products: [],
      view: "userList",
      selectedUser: null
    };

    this.getAllProducts();
    this.getAllUsers();
  }

  catchError = (error: any) => {
    // TODO: Catch error
    // eslint-disable-next-line no-console
    console.log(error);
  }

  getAllProducts = () => {
    API.getAllProducts()
      .then((response) => {
        this.setState({products: response.data});
      }).catch(this.catchError);
  }

  getAllUsers = (callback?: (users: Array<User>) => void) => {
    API.getAllUsers()
      .then((response) => {
        this.setState({users: response.data});
        if (callback != null) {
          callback(response.data);
        }
      })
      .catch(this.catchError);
  }

  addUser = (user: string) => {
    API.addUser(user)
      .then((response) => {
        const users = response.data;
        this.setState({users: users});
        const u = users.find((us) => (us.name === user ? us : null));
        if (u != null) {
          this.setState({selectedUser: u, view: "userDetail"});
        }
      })
      .catch(this.catchError);
  }

  selectUser = (user: User) => {
    this.setState({ view: "userDetail", selectedUser: user });
  }

  backToList = () => {
    this.getAllUsers();
    this.setState({view: "userList"});
  }

  render = () => {
    if (this.state.view === "userList") {
      return (<UserList
        users={this.state.users}
        addUser={this.addUser}
        selectUser={this.selectUser} />);
    }
    if (this.state.view === "userDetail" && this.state.selectedUser != null) {
      return (<UserDetails user={this.state.selectedUser}
        backToList={this.backToList}
        products={this.state.products} />);
    }
    return null;
  }

}

export default function StyledApp(props: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App {...props} />
    </MuiThemeProvider>
  );
}
