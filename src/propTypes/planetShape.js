import PropTypes from "prop-types";

const { array, shape, string } = PropTypes;

export default shape({
  name: string.isRequired,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: array,
  starships: array,
});
