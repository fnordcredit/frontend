// @flow
import React, { useState, useCallback } from "react";
import AddIcon from "@material-ui/icons/Add";
import AboutIcon from "@material-ui/icons/HelpOutline";
import BaseMenu from "./BaseMenu";
import Item from "./Item";
import AboutModal from "components/AboutModal";
import AddUserDialog from "components/AddUserDialog";

type Props = {
  anchorEl: Object,
  onClose: () => void
};

const UserListVerticalMenu = React.memo<Props>(({ anchorEl, onClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = useCallback(() => {
    onClose();
    setDialogOpen(true);
  }, [onClose, setDialogOpen]);
  const [aboutOpen, setAboutOpen] = useState(false);
  const handleOpenAbout = useCallback(() => {
    onClose();
    setAboutOpen(true);
  }, [onClose, setAboutOpen]);
  const handleCloseAbout = useCallback(() => setAboutOpen(false),
    [setAboutOpen]);
  const handleCloseDialog = useCallback(() => setDialogOpen(false),
    [setDialogOpen]);
  return (
    <React.Fragment>
      <BaseMenu
        anchorEl={anchorEl}
        onClose={onClose}
      >
        <Item onClick={handleOpenDialog}
          icon={<AddIcon fontSize="small" />}
          text="Add User"
        />
        <Item onClick={handleOpenAbout}
          icon={<AboutIcon fontSize="small" />}
          text="About Fnordcredit"
        />
      </BaseMenu>
      <AddUserDialog
        onClose={handleCloseDialog}
        open={dialogOpen} />
      <AboutModal open={aboutOpen} onClose={handleCloseAbout} />
    </React.Fragment>
  );
});

export default UserListVerticalMenu;
