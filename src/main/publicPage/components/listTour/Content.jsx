import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Typography from "@material-ui/core/Typography";
// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import exampleStyle from "../../../../assets/jss/material-kit-react/views/componentsSections/exampleStyle.jsx";


import { connect } from "react-redux";
import { createSelector } from "reselect";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getListCategoryFromReducer = state =>
  state[HEARDER_REDUCER_STORE].listCategory;

const startSelector = createSelector(
  getListCategoryFromReducer,
  listCategory => ({ listCategory: listCategory || [] })
);

class Content extends React.Component {
  render() {
    const { classes, listCategory } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            {listCategory.map(data => (
              <GridItem key={data.id} xs={12} sm={12} md={6}>
                <Link to={`/booking/tour/${data.id}`} className={classes.link}>
                  <img
                    src={data.urlImage}
                    alt={data.name}
                    className={
                      classes.imgRaised +
                      " " +
                      classes.imgRounded +
                      " " +
                      classes.imgFluid
                    }
                  />
                  <br/>
                  
                  <br/>
                  <Typography variant="caption" gutterBottom>
                    {data.description}
                  </Typography>
                  <Button color="primary" size="lg" simple>
                    {data.name}
                  </Button>
                  <br/>
                  <br/>                  
                </Link>
              </GridItem>
            ))}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default connect(
  startSelector,
  {}
)(withStyles(exampleStyle)(Content));
