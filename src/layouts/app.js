import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link, Route } from "react-router-dom";
import routes from "../routes";
import { withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const styles = () => ({
  container: {
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
  header: {
    flexShrink: 0
  },
  title: {
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
    flexShrink: 0
  },
  breadcrumbs: { 
    marginTop: 8,
    marginLeft: 16
  },
  routesContainer: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '2em'
  },
  // container: {
  //   width: '100%;',
  //   height: '100%;',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   flexWrap: 'nowrap'
  // }
});

function App({ classes, planet, resident }) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>
        Star Wars
        </div>
      <div className={classes.breadcrumbs}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Planets</Link>
          {planet && <Link to={`/planets/${planet}`}>
            {planet}
          </Link>}
          {resident && <Link to={`/residents/${resident}`}>
            {resident}
          </Link>}
        </Breadcrumbs>
        </div>
      </div>
        <div className={classes.routesContainer}>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </div>
        <footer className={classes.footer}>
         Copyright © 2020 Celeste Martins. All rights reserved.
       </footer>
    </div>
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
