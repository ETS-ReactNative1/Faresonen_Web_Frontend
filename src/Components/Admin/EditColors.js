import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon } from "semantic-ui-react";

const EditColors = ({ colors, loading, editColor }) => {
  return (
    <Grid columns={2}>
      {colors
        .sort((a, b) => parseInt(a.value, 10) >= parseInt(b.value, 10))
        .map(color => {
          return (
            <Grid.Column key={color.hex}>
              <p style={{ fontWeight: "bold" }}>{color.text}</p>
              <div
                style={{
                  width: `50px`,
                  height: `50px`,
                  backgroundColor: `${color.hex}`,
                  border: "1px solid lightgray",
                  borderRadius: "5px"
                }}
              />
              <p>
                {color.hex}
                <br />
                ID: {color.value}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    editColor(color);
                  }}
                >
                  <Icon name="edit" />Rediger
                </span>
                <span>
                  <Icon name="delete" />Fjern
                </span>
              </div>
            </Grid.Column>
          );
        })}
    </Grid>
  );
};

EditColors.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};
export default EditColors;
