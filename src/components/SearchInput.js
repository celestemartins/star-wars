import React, { useCallback, memo } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

const styles = () => ({
  container: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 20,
    float: "right",
    marginRight: 12,
  },
  icon: {
    color: "rgba(0,0,0,0.8)",
    marginRight: 8,
  },
});

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgba(0,0,0,0.5)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(0,0,0,0.5)",
    },
  },
})(TextField);

function SearchInput({ classes, onChange }) {
  const handleOnChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={classes.container}>
      <SearchRoundedIcon className={classes.icon}/>
      <CssTextField
        id="standard-search"
        label="Search Planets"
        type="search"
        onChange={handleOnChange}
      />
    </div>
  );
}

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(withStyles(styles)(SearchInput));
