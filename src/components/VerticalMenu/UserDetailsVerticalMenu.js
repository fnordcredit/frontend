// @flow
import React from "react";
import { Link } from "react-router-dom";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "./BaseMenu";
import Item from "./Item";

type Props = {
  anchorEl: Object,
  onClose: () => void,
  uid: number
};

const UserDetailsVerticalMenu = React.memo<Props>((props) => {
  const { anchorEl, onClose, uid } = props;
  return (
    <Menu
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <Link to={`/settings/${uid}`}>
        <Item icon={<SettingsIcon fontSize="small" />}
          text="Settings" onClick={onClose} />
      </Link>
      <a href={`/transactions/export/${uid}/transactions.qif`}>
        <Item icon={<DownloadIcon fontSize="small" />}
          text="Export Transactions (QIF)" onClick={onClose} />
      </a>
    </Menu>
  );
});

export default UserDetailsVerticalMenu;
