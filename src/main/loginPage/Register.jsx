import React, { Component } from "react";
import { post } from "../../utils/ApiCaller";
import { ACCOUNT__CREATE } from "../../utils/ApiEndpoint";
import { message, Input, Form, Button } from "antd";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "../../components/Header/Header.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import ButtonCustom from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";

import image from "../../assets/img/bg7.jpg";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      password: "",
      cardAnimaton: "cardHidden",
      confirmDirty: false
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      post(
        ACCOUNT__CREATE,
        {
          username: values.username,
          password: values.password,
          email: values.email
        },
        {},
        {}
      )
        .then(res => {
          message.success("Register success");
        })
        .catch(err => {
          if(err.toString().indexOf("status code 400")){
            message.error("This username is exited");
          } else {
            message.error("Register error");
          }
        });
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { classes, ...rest } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <Form onSubmit={this.handleSubmit}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h4>Register</h4>
                      <div className={classes.socialLine}>
                        <ButtonCustom
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </ButtonCustom>
                        <ButtonCustom
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </ButtonCustom>
                        <ButtonCustom
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </ButtonCustom>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Form.Item>
                        {getFieldDecorator("username", {
                          rules: [
                            {
                              required: true,
                              message: "Please input username"
                            }
                          ]
                        })(<Input placeholder="Username" />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("password", {
                          rules: [
                            {
                              required: true,
                              message: "Please input your password!"
                            },
                            {
                              validator: this.validateToNextPassword
                            }
                          ]
                        })(<Input type="password" placeholder="Password" />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("confirm", {
                          rules: [
                            {
                              required: true,
                              message: "Please confirm your password!"
                            },
                            {
                              validator: this.compareToFirstPassword
                            }
                          ]
                        })(
                          <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                            placeholder="Confirm Password"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!"
                            }
                          ]
                        })(<Input placeholder="E-mail" />)}
                      </Form.Item>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={this.handleSubmit}
                      >
                        Register
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

const Register = Form.create()(RegisterForm);

export default withStyles(loginPageStyle)(Register);
