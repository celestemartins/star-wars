import React, { memo } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = () => ({
  container: {
    fontSize: 30,
    marginTop: 24,
  },
});

function Loading({ classes }) {
  return <div className={classes.container}>Loading...</div>;
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default memo(withStyles(styles)(Loading));
