import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Parallax from "../../../../components/Parallax/Parallax.jsx";
// sections for this page
import Content from "./Content.jsx";

import componentsStyle from "../../../../assets/jss/material-kit-react/views/components.jsx";

class Components extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Parallax image={require("../../../../assets/img/bg2.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>AVN Booking</h1>
                  <h3 className={classes.subtitle}>
                    A Badass Material-UI Kit based on Material Design.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Content match={this.props.match} history={this.props.history} location={this.props.location} />
        </div>
      </div>
    );
  }
}

export default withStyles(componentsStyle)(Components);
