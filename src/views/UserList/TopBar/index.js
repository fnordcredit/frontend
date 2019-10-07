// @flow
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import TopBar from "components/TopBar";
import About from "components/About";
import SelectSorting from "components/SelectSorting";
import AddUserDialog from "components/AddUserDialog";
import SearchBar from "components/SearchBar";

import type { Sorting } from "components/SelectSorting";

export type TopBarProps = {
  sorted: Sorting,
  changeSorting: (s: Sorting) => void,
  handleSearch: (s: string) => void
};


const UserListTopBar = React.memo<TopBarProps>((props: TopBarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);
  // $FlowFixMe
  const handleSearch = (e) => props.handleSearch(e.target.value);
  return (
    <React.Fragment>
      <TopBar
        leftNode={
          <SelectSorting sorting={props.sorted}
            onChange={props.changeSorting} />
        } rightNode={
          <React.Fragment>
            <SearchBar onChange={handleSearch} />
            <About />
          </React.Fragment>
        } fabIcon={<AddIcon />}
        fabAction={handleDialogOpen}
      />
      <AddUserDialog
        onClose={handleDialogClose}
        open={dialogOpen} />
    </React.Fragment>
  );
});

export default UserListTopBar;
