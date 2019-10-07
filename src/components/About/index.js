// @flow
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AboutIcon from "@material-ui/icons/HelpOutline";
import AboutModal from "./AboutModal";

const About = React.memo<{}>(() => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <IconButton aria-label="About fnordcredit"
        onClick={handleOpen} color="secondary">
        <AboutIcon />
      </IconButton>
      <AboutModal open={open} onClose={handleClose} />
    </React.Fragment>
  );
});

export default About;
