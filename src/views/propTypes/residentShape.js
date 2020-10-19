import PropTypes from "prop-types";

const { array, number, shape, string } = PropTypes;

export default shape({
  id: number.isRequired,
  name: string.isRequired,
  climate: string.isRequired,
  diameter: string.isRequired,
  population: number.isRequired,
  residents: array.isRequired,
  url: string.isRequired,
});
