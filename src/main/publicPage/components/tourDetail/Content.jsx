import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";
// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import NavPills from "../../../../components/NavPills/NavPills.jsx";
import carouselStyle from "../../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";

import { post } from "../../../../utils/ApiCaller";
import { PUBLIC__TOUR_DETAIL } from "../../../../utils/ApiEndpoint";

import { Form, InputNumber, Carousel } from "antd";

import LocalStorageUtils from "../../../../utils/LocalStorage";

import { connect } from "react-redux";
import { createSelector } from "reselect";
import { setTourCount } from "../../../../components/Header/header.action";
import ReactHtmlParser from 'react-html-parser';


const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getTourCountFromReducer = state => state[HEARDER_REDUCER_STORE].tourCount;

const startSelector = createSelector(
  getTourCountFromReducer,
  tourCount => ({ tourCount: tourCount || 0 })
);

class ContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourDetail: {}
    };
  }

  async componentDidMount() {
    await post(
      PUBLIC__TOUR_DETAIL,
      {
        id: this.props.match.params.id
      },
      {},
      {}
    ).then(res => {
      this.setState({
        tourDetail: res.data
      });
    });
  }

  async componentWillReceiveProps(nextProps) {
    await post(
      PUBLIC__TOUR_DETAIL,
      {
        id: nextProps.match.params.id
      },
      {},
      {}
    ).then(res => {
      this.setState({
        tourDetail: res.data
      });
    });
  }

  handleSubmit = (id, image, name, price) => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        LocalStorageUtils.addCard(id, values.input_number, image[0].url, name, price);
        this.props.setTourCount &&
          this.props.setTourCount(LocalStorageUtils.getCard());
      }
    });
  };

  linkToDetail = id => {
    //set url
    //this.props.history.push("/home/event/" + id);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Carousel autoplay effect="fade">
                {this.state.tourDetail.listImage ? (
                  this.state.tourDetail.listImage.map((data, key) => (
                    <div>
                      <img
                        key={key}
                        alt="..."
                        src={data.url}
                        width="100%"
                        height="480px"
                        style={{ borderRadius: 15 }}
                      />
                    </div>
                  ))
                ) : (
                  <div />
                )}
              </Carousel>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={6}
              style={{ marginTop: "50px" }}
            >
              <NavPills
                color="rose"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 4 },
                  contentGrid: { xs: 12, sm: 8, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "Description",
                    tabIcon: Dashboard,
                    tabContent: <span>{ReactHtmlParser(this.state.tourDetail.description)}</span>
                  },
                  {
                    tabButton: "Schedule",
                    tabIcon: Schedule,
                    tabContent: (
                      <span>
                        <p>Start date: {this.state.tourDetail.startDate}</p>
                        <br />
                        <p>End date: {this.state.tourDetail.endDate}</p>
                      </span>
                    )
                  }
                ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} className={classes.marginAuto}>
                  <Typography variant="overline" gutterBottom>
                    We have:{" "}
                    {this.state.tourDetail.maxMemberNumber -
                      this.state.tourDetail.memberNumber}{" "}
                    ticket
                  </Typography>
                  <Typography variant="overline" gutterBottom>
                    Price: {this.state.tourDetail.price}VND/ticket
                  </Typography>
                  <Form
                    onSubmit={this.handleSubmit}
                  >
                    <Form.Item label="InputNumber">
                      {getFieldDecorator("input_number", { initialValue: 1 })(
                        <InputNumber min={1} max={20} />
                      )}
                      <span className="ant-form-text"> machines</span>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        color="primary"
                        size="lg"
                        simple
                        onClick={this.handleSubmit.bind(
                          this,
                          this.state.tourDetail.id,
                          this.state.tourDetail.listImage,
                          this.state.tourDetail.name,
                          this.state.tourDetail.price
                        )}
                      >
                        RESERVE
                      </Button>
                    </Form.Item>
                  </Form>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const Content = Form.create({ name: "validate_other" })(ContentForm);

export default connect(
  startSelector,
  { setTourCount }
)(withStyles(carouselStyle)(Content));
