import React, { Component } from "react";
import { post } from "../../utils/ApiCaller";
import { AUTH__LOGIN } from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { message, Input, Form, Button } from "antd";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      password: "",
      cardAnimaton: "cardHidden"
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    if (LocalStorageUtils.isRole() === "admin") {
      this.props.history.push("/admin");
    } else if (LocalStorageUtils.isRole() === "user") {
      this.props.history.push("/");
    } else {
      this.props.history.push("/login");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onLogin(values.username, values.password, token => {
          if (token) {
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
            if (LocalStorageUtils.isRole() === "admin") {
              this.props.history.push("/admin");
            } else if (LocalStorageUtils.isRole() === "user") {
              this.props.history.push("/");
            }
          }
        });
      }
    });
  };

  onLogin(username, password, cb) {
    post(
      AUTH__LOGIN,
      {},
      {
        username,
        password
      },
      { "Content-Type": "application/x-www-form-urlencoded" }
    )
      .then(res => {
        cb(res.data.Token);
      })
      .catch(() => {
        message.error("Invalid Username or Password");
      });
  }

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
                      <h4>Login</h4>
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
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="user"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            placeholder="Username"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("password", {
                          rules: [
                            {
                              required: true,
                              message: "Please input Password"
                            }
                          ]
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                          />
                        )}
                      </Form.Item>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={this.handleSubmit}
                      >
                        Login
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

const Login = Form.create()(LoginForm);

export default withStyles(loginPageStyle)(Login);
