import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { residentOperations } from "../../state/ducks/resident";
import { residentShape } from "../propTypes";
import Grid from "@material-ui/core/Grid";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useHistory } from "react-router-dom";

function ResidentList({
  planet,
  residents,
  match,
  fetchList,
  fetchPlanet,
  selectResident,
  selectPlanet,
  selected,
}) {
  const history = useHistory();
  const [message, setMessage] = useState();

  useEffect(() => {
    // updated selected planet and resident
    if (!selected || selected !== match.params.id) {
      selectPlanet(match.params.id);
      selectResident("");
    }
  }, [match.params.id, selectPlanet, selectResident, selected]);

  useEffect(() => {
    // regular flow --> has planets and fetch residents
    if (!residents && planet?.residents?.length) {
      setMessage("");
      fetchList(planet);
    } else if (!planet) {
      // no planet --> fetch it and goes to regular flow.
      fetchPlanet(match.params.id);
    } else {
      setMessage("This planets doesn't have residents ");
    }
  }, [fetchList, fetchPlanet, match, match.params.id, planet, residents]);

  const handleOnClick = useCallback(
    // navigate to next page
    async (name) => {
      selectResident(name);
      await history.push(`/residents/${name}`);
    },
    [history, selectResident]
  );

  const mappedResidents = useMemo(() => {
    return residents?.map(({ name }) => (
      <Grid item xs={6} key={name}>
        <Card
          key={name}
          name={name}
          actionText={"SEE DETAIL"}
          onClick={handleOnClick}
        />
      </Grid>
    ));
  }, [handleOnClick, residents]);

  return (
    <>
      {mappedResidents ? (
        <>
          <Grid
            container
            direction="row-reverse"
            justify="space-between"
            alignItems="center"
          >
            {mappedResidents}
          </Grid>
        </>
      ) : message ? (
        message
      ) : (
        <Loading />
      )}
    </>
  );
}

const { string, object, func } = PropTypes;

ResidentList.propTypes = {
  planet: residentShape,
  selected: string,
  fetchList: func.isRequired,
  selectResident: func.isRequired,
  fetchPlanet: func.isRequired,
  selectPlanet: func.isRequired,
  match: object.isRequired,
};

ResidentList.prefetch = ({ params }) => {
  residentOperations.fetchList(params.permalink);
};

ResidentList.defaultProps = {
  residents: null,
};

const mapStateToProps = (state, ownProps) => {
  const planetParam = ownProps.match.params?.id;
  let planet = null;
  if (state.planet?.items?.byId && state.planet?.items?.byId[planetParam]) {
    // Planet param (name) is in our pagination and we found it.
    planet = state.planet?.items?.byId[planetParam];
  } else if (
    // Planet was fetched alone because it wasn't in our pagination, so we compare it with planetParam
    state.resident?.planet &&
    state.resident?.planet.name === planetParam
  ) {
    planet = state.resident.planet;
  }
  return {
    residents: state.resident[state.resident.planetName]?.residents,
    planet,
    selected: state.resident?.planetName,
  };
};

const mapDispatchToProps = {
  fetchList: residentOperations.fetchList,
  fetchPlanet: residentOperations.fetchPlanet,
  selectResident: residentOperations.selectResident,
  selectPlanet: residentOperations.selectPlanet,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResidentList);
