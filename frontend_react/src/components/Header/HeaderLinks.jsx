/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, People, Lock, LockOpen, ShoppingCart } from "@material-ui/icons";

// core components
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";

import LocalStorageUtils from "../../utils/LocalStorage";
import { post } from "../../utils/ApiCaller";
import { ACCOUNT__GET_PROFILE } from "../../utils/ApiEndpoint";

import { connect } from "react-redux";
import { createSelector } from "reselect";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getListCategoryFromReducer = state =>
  state[HEARDER_REDUCER_STORE].listCategory;

const getTourCountFromReducer = state => state[HEARDER_REDUCER_STORE].tourCount;

const startSelector = createSelector(
  getListCategoryFromReducer,
  getTourCountFromReducer,
  (listCategory, tourCount) => ({
    listCategory: listCategory || [],
    tourCount: tourCount || 0
  })
);

class HeaderLinks extends React.Component {
  state = {
    fullName: "",
    checkLogin: true
  };

  async componentDidMount() {
    if (LocalStorageUtils.getJWT()) {
      await post(
        ACCOUNT__GET_PROFILE,
        {
          username: LocalStorageUtils.getName()
        },
        {},
        {
          Authorization: "Bearer " + LocalStorageUtils.getJWT()
        }
      ).then(res => {
        this.setState({
          fullName: res.data.name,
          checkLogin: false
        });
      });
    }
  }

  componentDidUpdate(newProps, newStates) {
    if (this.state.fullName !== newStates.fullName) {
      this.forceUpdate();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.tourCount !== this.props.tourCount){
      this.forceUpdate();
    }
  }

  Logout = () => {
    LocalStorageUtils.clear();
    window.location.reload();
  };

  render() {
    const { classes, listCategory } = this.props;
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Category"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            hoverColor="info"
            buttonIcon={Apps}
            dropdownList={listCategory.map(data => (
              <Link
                key={data.id}
                to={`/booking/tour/${data.id}`}
                className={classes.dropdownLink}
              >
                {data.name}
              </Link>
            ))}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/booking/about_us"
            color="transparent"
            className={classes.navLink}
          >
            <People className={classes.icons} /> About Us
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-twitter"
            title="Follow us on twitter"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              href="https://twitter.com/khainq2010"
              target="_blank"
              color="transparent"
              className={classes.navLink}
            >
              <i className={classes.socialIcons + " fab fa-twitter"} />
            </Button>
          </Tooltip>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-facebook"
            title="Follow us on facebook"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              href="https://www.facebook.com/quangkhai.nguyen.14"
              target="_blank"
              className={classes.navLink}
            >
              <i className={classes.socialIcons + " fab fa-facebook"} />
            </Button>
          </Tooltip>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-tooltip"
            title="Follow us on instagram"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              href="https://www.instagram.com/nobita.ojlly/"
              className={classes.navLink}
            >
              <i className={classes.socialIcons + " fab fa-instagram"} />
            </Button>
          </Tooltip>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-tooltip"
            title="Check out order"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              href="/booking/checkout"
              className={classes.navLink}
            >
              <ShoppingCart /> {this.props.tourCount}
            </Button>
          </Tooltip>
        </ListItem>
       

        <ListItem className={classes.listItem}>
          <div style={!this.state.checkLogin ? { display: "none" } : {}}>
            <Button
              href="/login"
              color="transparent"
              className={classes.navLink}
            >
              <Lock className={classes.icons} /> Login
            </Button>
          </div>
        </ListItem>
        <ListItem className={classes.listItem}>
          <div style={!this.state.checkLogin ? { display: "none" } : {}}>
            <Button
              href="/register"
              color="transparent"
              className={classes.navLink}
            >
              <LockOpen className={classes.icons} /> Register
            </Button>
          </div>
        </ListItem>
        <ListItem className={classes.listItem}>
          <div style={!this.state.checkLogin ? {} : { display: "none" }}>
            <CustomDropdown
              left
              caret={false}
              hoverColor="info"
              buttonText={
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/awesomeproject2-6f99a.appspot.com/o/productsImg%2Fuser.png?alt=media&token=4c53ff0b-84d9-46b0-b7b9-77089ebe130f"
                    className={classes.img}
                    alt="profile"
                    width={20}
                    height={20}
                  />
                  {"  "}
                  {this.state.fullName}
                </div>
              }
              buttonProps={{
                className: classes.navLink + " " + classes.imageDropdownButton,
                color: "transparent"
              }}
              dropdownList={[
                  <Link
                    key={"history"}
                    to={`/user/listOrder`}
                    className={classes.dropdownLink}
                  >
                    View history order
                  </Link>,
                  <Link
                    key={"profile"}
                    to={`/user/profile`}
                    className={classes.dropdownLink}
                  >
                    View profile
                  </Link>,
                  <Link
                    key={"logout"}
                    to={`/`}
                    className={classes.dropdownLink}
                    onClick={this.Logout}
                  >
                    Logout
                  </Link>
              ]}
            />
          </div>
        </ListItem>
      </List>
    );
  }
}

export default connect(
  startSelector,
  {}
)(withStyles(headerLinksStyle)(HeaderLinks));
