import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { residentOperations } from "../../state/ducks/resident";
import { residentShape } from "../propTypes";
import Grid from "@material-ui/core/Grid";
import Card from "../components/Card";

function ResidentDetail({ fetchResident, resident, name }) {
  useEffect(() => {
    if (!resident) {
      fetchResident(name);
    }
  }, [fetchResident, name, resident]);

  const mappedResident = useMemo(() => {
    return (
      resident && (
        <Grid item xs={6} key={name}>
          <Card
            key={name}
            name={name}
            displayData={{
              height: resident.height,
              mass: resident.mass,
              skin_color: resident.skin_color,
              birth_year: resident.birth_year,
              eye_color: resident.eye_color,
              hair_color: resident.hair_color,
              gender: resident.gender,
            }}
          />
        </Grid>
      )
    );
  }, [name, resident]);
  return mappedResident;
}

const { string, func } = PropTypes;

ResidentDetail.propTypes = {
  name: string.isRequired,
  resident: residentShape,
  fetchResident: func.isRequired,
};

ResidentDetail.prefetch = ({ params }) => {
  residentOperations.fetchList(params.permalink);
};

ResidentDetail.defaultProps = {
  resident: null,
};

const mapStateToProps = (state = {}, ownProps) => {
  const residentParam = ownProps.match.params?.id;
  const residents = state.resident[state.resident.planetName]?.residents;
  const selected = residents?.find(
    (resident) => resident.name === residentParam
  );

  return {
    resident: selected || state.resident.resident,
    name: residentParam,
  };
};

const mapDispatchToProps = {
  fetchResident: residentOperations.fetchResident,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResidentDetail);
