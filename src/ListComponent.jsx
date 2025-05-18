import React from "react";
import PropTypes from "prop-types";

const ListComponent = ({ items, renderItem }) => {
  if (!items || items.length === 0) {
    return <div>No items to display.</div>;
  }

  return (
    <ul>
      {items.map((item) => renderItem(item))}
    </ul>
  );
};

ListComponent.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default ListComponent;
