import React, { useMemo, useCallback, memo } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { getDisplayData } from "../utils/getDisplayData";

const styles = () => ({
  root: {
    marginBottom: 12,
    marginLeft: 6,
    marginRight: 6,
  },
  main: {
    fontSize: 24,
  },
});

function CustomCard({ classes, name, actionText, onClick, displayData }) {
  const handleOnClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  const display = useMemo(() => {
    if (displayData) {
      return getDisplayData(displayData);
    }
  }, [displayData]);

  return (
    <Card className={classes.root} onClick={onClick ? handleOnClick : null}>
      <CardContent>
        <span className={classes.main}>{name}</span>
        <ul>
          {display?.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button size="small">{actionText}</Button>
      </CardActions>
    </Card>
  );
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  actionText: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(withStyles(styles)(CustomCard));
