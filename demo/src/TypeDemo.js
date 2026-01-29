import PropTypes, { checkPropTypes } from "prop-types";

function TypeDemo(props) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  checkPropTypes(TypeDemo.propTypes, props, "prop", "TypeDemo");
  const { title, count, status} = props;
  return (
    <div>
      <p>Title: {title}</p>
      <p>Count: {count}</p>
      <p>Status: {status}</p>
    </div>
  );
}

TypeDemo.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  status: PropTypes.oneOf(["new", "old"]).isRequired,
};

export default TypeDemo;