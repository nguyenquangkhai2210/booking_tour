import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import exampleStyle from "../../../../assets/jss/material-kit-react/views/componentsSections/exampleStyle.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import ReactHtmlParser from 'react-html-parser';

import { Row, Col } from "antd";

import { post } from "../../../../utils/ApiCaller";
import { PUBLIC__LIST_TOUR } from "../../../../utils/ApiEndpoint";

import { Form, InputNumber } from "antd";

import LocalStorageUtils from "../../../../utils/LocalStorage";

import { connect } from "react-redux";
import { createSelector } from "reselect";
import { setTourCount } from "../../../../components/Header/header.action";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";



  const getTourCountFromReducer = state =>
  state[HEARDER_REDUCER_STORE].tourCount;

const startSelector = createSelector(
  getTourCountFromReducer,
  ( tourCount) => ({ tourCount: tourCount || 0 })
);

class ContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
    };
  }

  async componentDidMount() {
    await post(
      PUBLIC__LIST_TOUR,
      {
        id: this.props.match.params.id
      },
      {},
      {}
    ).then(res => {
      this.setState({
        listItem: res.data
      });
    });
  }
  async componentWillReceiveProps(nextProps) {
    await post(
      PUBLIC__LIST_TOUR,
      {
        id: nextProps.match.params.id
      },
      {},
      {}
    ).then(res => {
      this.setState({
        listItem: res.data
      });
    });
  }

  handleSubmit = (id, image, name, price) => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        LocalStorageUtils.addCard(id, values["input_number_" + id], image, name, price);
        this.props.setTourCount && this.props.setTourCount(LocalStorageUtils.getCard());
      }
    });
  }

  linkToDetail = id => {
    //set url
    this.props.history.push("/booking/tourDetail/" + id);
  };

  replateDecription = description => {
    let array = description.split("  ");
    let newDecription = [];
    array.forEach((item, key) => {
      if (item !== "") {
        newDecription.push(
          <span key={key}>
            {item}
            <br />
          </span>
        );
      }
    });
    return newDecription;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            {this.state.listItem.map(data => (
              <div key={data.id}>
                <Row
                  gutter={32}
                  align={"middle"}
                  style={{ margin: "20px 50px" }}
                >
                  <Col span={10}>
                    <a onClick={this.linkToDetail.bind(this, data.id)}>
                      <div className="wrapImg">
                        <img
                          className="imgEvent"
                          src={data.image}
                          style={{ width: "100%", borderRadius: 10 }}
                        />
                      </div>
                    </a>
                  </Col>
                  <Col span={14}>
                    <h3 className="titleListEvent">
                      <a onClick={this.linkToDetail.bind(this, data.id)}>
                        {data.name}
                      </a>
                    </h3>
                    <p className="contentEvent">
                      {ReactHtmlParser(data.description)}
                    </p>
                    <a
                      className="readMore"
                      onClick={this.linkToDetail.bind(this, data.id)}
                    >
                      Xem thêm
                    </a>
                    <br />
                    <br />
                    <Typography variant="overline" gutterBottom>
                      Price: {data.price}VND/ticket
                   </Typography>
                    <Form
                      onSubmit={this.handleSubmit.bind(this, data.id, data.image, data.name, data.price)}
                    >
                      <Form.Item >
                        <span className="ant-form-text"> Tickets</span>
                        {getFieldDecorator("input_number_"+ data.id, { initialValue: 1 })(
                          <InputNumber min={1} max={10} />
                        )}
                        
                      </Form.Item>
                      <Form.Item>
                        <Button
                          color="primary"
                          size="lg"
                          simple
                          onClick={this.handleSubmit.bind(this, data.id, data.image, data.name, data.price)}
                        >
                          RESERVE
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            ))}
          </GridContainer>
        </div>
      </div>
    );
  }
}

const Content = Form.create({ name: 'validate_other' })(ContentForm);

export default connect(startSelector, {setTourCount})(withStyles(exampleStyle)(Content));
