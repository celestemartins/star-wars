import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";

import { planetOperations } from "../../state/ducks/planet";
import Card from "../components/Card";
import Loading from "../components/Loading";
import SearchInput from "../components/SearchInput";
import { filterItems } from "../utils/filterDiacritics";

const styles = () => ({
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: -30,
  },
  search: {
    fontSize: 20,
    paddingTop: 100,
    textAlign: "center",
  },
});

function PlanetList({
  classes,
  fetchPlanet,
  fetchList,
  planets,
  count,
  searchFailed = false,
  loading,
}) {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const currentPlanets = useMemo(() => {
    if (!loading) {
      return planets[currentPage];
    }
  }, [currentPage, loading, planets]);

  useEffect(() => {
    if (searchFailed) {
      setSearchText("");
    }
  }, [searchFailed]);

  useEffect(() => {
    if (!loading && !currentPlanets?.length > 0) {
      fetchList(currentPage);
    }
  }, [currentPage, currentPlanets, fetchList, loading, planets]);

  const handleOnClick = useCallback(
    (name) => {
      history.push(`/planets/${name}`);
    },
    [history]
  );

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

  const handleOnSearch = useCallback(() => {
    fetchPlanet(searchText);
  }, [fetchPlanet, searchText]);
  return (
    <>
      <SearchInput onSearch={handleOnSearch} onChange={setSearchText} />
      {searchText && !planetsList?.length ? (
        <div className={classes.search}>
          {" "}
          We didn't find results. Type the planet name and press the Search
          button so we can search deeper :)
        </div>
      ) : planetsList ? (
        <>
          <Grid
            container
            direction="row-reverse"
            justify="space-between"
            alignItems="center"
          >
            {planetsList}
          </Grid>
        </>
      ) : (
        <Loading />
      )}
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
  planets: PropTypes.oneOfType([object, array]).isRequired,
  fetchList: func.isRequired,
  fetchPlanet: func.isRequired,
  searchFailed: bool,
  loading: bool,
  count: number,
};

PlanetList.defaultProps = {
  planets: {},
};

PlanetList.prefetch = planetOperations.fetchList;

const mapStateToProps = (state) => {
  return {
    planets: state.planet.items,
    count: state.planet.count,
    searchFailed: state.planet.searchFailed,
  };
};

const mapDispatchToProps = {
  fetchList: planetOperations.fetchList,
  fetchPlanet: planetOperations.fetchPlanet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlanetList));
