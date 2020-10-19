import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link, Route } from "react-router-dom";
import routes from "../../routes";
import { withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingLeft: 16,
    display: "flex",
    alignItems: "center",
    color: "#fff",
    textTransform: "uppercase",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 28,
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: 16,
    justifyContent: "center",
  },
  main: { paddingRight: 16, paddingLeft: 16, marginTop: 12 },
  container: {
    marginTop: 20,
  },
});

function App({ classes, planet, resident }) {
  return (
    <>
      <div className={classes.header}>Star Wars</div>
      <div className={classes.main}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Planets</Link>
          <Link to={planet ? `/planets/${planet}` : "#"}>
            {planet ? planet : "Planet Name"}
          </Link>
          <Link to={resident ? `/residents/${resident}` : "#"}>
            {resident ? resident : "Resident"}
          </Link>
        </Breadcrumbs>
        <div className={classes.container}>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </div>
      </div>
      <footer className={classes.footer}>
        Copyright © 2020 Celeste Martins. All rights reserved.
      </footer>
    </>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    planet: state.resident.planetName,
    resident: state.resident.residentName,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
