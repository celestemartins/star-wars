import React, { memo } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

const styles = () => ({
  container: {
    fontSize: 30,
    marginTop: 24,
    display: 'inline-grid',
    textAlign: 'center',
    width: '100%'
  },
  button: {
    width: '10%',
    marginTop: 20,
    marginBottom: 10,
    left: '45%'
  }
});

function Message({ classes, text, onClick }) {
  return <div className={classes.container}>
    {text}
    {onClick ? <Button className={classes.button}variant="contained" onClick={onClick.action}>{onClick.label}</Button>: null}
    </div>;
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.object
};

export default memo(withStyles(styles)(Message));
