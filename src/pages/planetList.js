import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";

import { planetOperations } from "../state/ducks/planet";
import Card from "../components/Card";
import Message from "../components/Message";
import SearchInput from "../components/SearchInput";
import { filterItems } from "../utils/filterDiacritics";

const styles = (theme) => ({
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: -30,
    position: 'fixed',
    bottom: 'auto',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      margin: 0
    }
  },
  searchContainer: {
    height: 'auto',
    marginBottom: -24
  },
  search: {
    fontSize: 20,
    paddingTop: 100,
    textAlign: "center",
  },
  content: {
    height: 660,
    [theme.breakpoints.down('xs')]: {
      height: 600
    }
  }
});

function PlanetList({
  classes,
  count,
  error,
  fetchList,
  loading,
  planets
}) {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const currentPlanets = useMemo(() => {
    if (!loading && !error) {
      return planets[currentPage];
    }
  }, [error,currentPage, loading, planets]);

  useEffect(() => {
    if (!loading && !error && !currentPlanets?.length > 0) {
      fetchList(currentPage);
    }
  }, [error, currentPage, currentPlanets, fetchList, loading, planets]);

  const handleOnClick = useCallback(
    (name) => {
      history.push(`/planets/${name}`);
    },
    [history]
  );

  const handleReload = useCallback(() => {
  window.location.reload()
},[])

  const planetsList = useMemo(() => {
    if (planets && planets.byId) {
      let filteredOptions = currentPlanets;
      if (searchText) {
        const keys = Object.keys(planets.byId);
        const optionsPlanets = keys.map((key) => {
          return planets.byId[key];
        });
        filteredOptions = optionsPlanets;
        filteredOptions = filterItems(filteredOptions, { search: searchText }, [
          "name",
        ]);
      }
      return filteredOptions?.map(({ name }) => (
        <Grid item xs={6} key={name}>
          <Card
            key={name}
            name={name}
            actionText={"SEE RESIDENTS"}
            onClick={handleOnClick}
          />
        </Grid>
      ));
    }
  }, [currentPlanets, handleOnClick, planets, searchText]);

  const handleOnClickNext = useCallback((e, number) => {
    setCurrentPage(number);
  }, []);

 
  return (
    <>
      <div className={classes.searchContainer}>
         {!error && <SearchInput onChange={setSearchText} />}
      </div>
      <div className={classes.content}>
        {searchText && !planetsList?.length ? (
         <Message text="We didn't find results."/>
      ) : planetsList ? (
          <Grid
            container
            direction="row-reverse"
            justify="space-between"
            alignItems="center"
          >
            {planetsList}
          </Grid>
      ) : error ? <Message text="An error ocurred..." onClick={{action: handleReload, label: 'RELOAD'}}/> : (
        <Message text="Loading..."/>
      )}
      </div>
      <div className={classes.footer}>
        <Pagination
          count={count / 10}
          variant="outlined"
          shape="rounded"
          onChange={handleOnClickNext}
        />
      </div>
    </>
  );
}

const { object, func, array, bool, number } = PropTypes;

PlanetList.propTypes = {
  classes: object.isRequired,
  count: number,
  error:  bool,
  fetchList: func.isRequired,
  loading: bool,
  planets: PropTypes.oneOfType([object, array]).isRequired,
};

PlanetList.defaultProps = {
  planets: {},
};

PlanetList.preFetch = planetOperations.fetchList;

const mapStateToProps = (state) => {
  return {
    planets: state.planet.items,
    count: state.planet.count,
    error: state.planet.error,
    loading: state.planet.loading,
  };
};

const mapDispatchToProps = {
  fetchList: planetOperations.fetchList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlanetList));
