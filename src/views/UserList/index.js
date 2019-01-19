// @flow
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";

import View from "views/base";
import AddUser from "./AddUser";
import SelectUser from "./SelectUser";
import SelectSorting from "./SelectSorting";
import API from "API";

import type { Sorting } from "./SelectSorting";
export type { Sorting } from "./SelectSorting";

type Props = {
  users: Array<User>,
  addUser: (u: string) => void,
  selectUser: (u: User) => void
};

type State = {
  sorted: Sorting,
  search: string
};

export default class UserList extends View<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sorted: "last",
      search: ""
    };
  }

  sortUsers = (a: User, b: User) => {
    switch (this.state.sorted) {
    case "last": return Math.sign(b.lastchanged - a.lastchanged);
    case "zyx": return b.name.localeCompare(a.name);
    default: return a.name.localeCompare(b.name);
    }
  }

  selectUser = (user: User, pin?: string) => {
    API.getUser(user, pin)
      .then((response) => {
        this.props.selectUser(response.data);
      })
      .catch((error) => {
        if (error.request.status === 401) {
          // Pin Required
        } else {
          // Error
        }
      });
  }

  changeSorting = (sorting: Sorting) => {
    this.setState({ sorted: sorting });
  }

  handleSearch = (event: Event) => {
    // $FlowFixMe
    this.setState({ search: event.target.value });
  }

  filterUsers = (user: User) => (
    user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0
  )

  renderUser = (u: User) => (
    <SelectUser user={u} key={u.name} onClick={this.selectUser} />
  );

  renderToolbar() {
    return (
      <Toolbar>
        <SelectSorting sorting={this.state.sorted}
          onChange={this.changeSorting} />
        <TextField label="search..." onChange={this.handleSearch} style={{
          marginLeft: 10,
          marginRight: 24,
          flex: 1,
          marginBottom: 5
        }} type="search" />
        <AddUser addUser={this.props.addUser} />
      </Toolbar>
    );
  }

  renderView() {
    return (
      <div style={{ marginTop: 28 }}>
        {this.props.users.sort(this.sortUsers).filter(this.filterUsers)
          .map(this.renderUser)
        }
      </div>
    );
  }
}
