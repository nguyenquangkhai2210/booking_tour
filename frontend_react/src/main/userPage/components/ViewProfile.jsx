import React from "react";
import { put, post } from "../../../utils/ApiCaller";
import {
  ACCOUNT__GET_PROFILE,
  ACCOUNT__UPDATE_PROFILE,
  ACCOUNT__CHANGE_PASSWORD
} from "../../../utils/ApiEndpoint";
import LocalStorageUtils, {
  LOCAL_STORAGE_KEY
} from "../../../utils/LocalStorage";
import moment from "moment";
import "./viewProfile.css";

import {
  Form,
  Input,
  Radio,
  Icon,
  DatePicker,
  Modal,
  Row,
  Col,
  Card,
  Avatar,
  Spin,
  Button,
  message
} from "antd";

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: false,
      visible: false,
      confirmDirty: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        birthDate: fieldsValue["birthDate"].format("YYYY-MM-DD HH:mm:ss")
      };
      await put(
        ACCOUNT__UPDATE_PROFILE,
        {
          username: fieldsValue.username,
          name: fieldsValue.name,
          gender: fieldsValue.gender,
          birthDate: fieldsValue.birthDate,
          email: fieldsValue.email,
          address: fieldsValue.address
        },
        {},
        {
          Authorization: "Bearer " + LocalStorageUtils.getJWT()
        }
      ).then(res => {
        message.success("Update profile success");
      });
    });
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });
    let username = LocalStorageUtils.getName();
    let token = LocalStorageUtils.getJWT();
    await post(
      ACCOUNT__GET_PROFILE,
      {
        username: username
      },
      {},
      {
        Authorization: "Bearer " + token
      }
    )
      .then(res => {
        this.setState({
          data: res.data,
          loading: false
        });
      })
      .catch(err => {
        message.error("Some thing error!!!");
      });
  }

  handleChangePassword = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await post(
          ACCOUNT__CHANGE_PASSWORD,
          {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          },
          {},
          {
              Authorization: "Bearer " + LocalStorageUtils.getJWT(),
          }
        )
        .then(res => {
            Modal.success({
                title: "Change password success"
            })
        })
        .catch(err => {
            Modal.error({
                title: "Change password error"
            })
        })
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };

  render() {
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      style: {
        margin: "0 0 0 25px"
      }
    };

    const metaLayout = {
      style: {
        margin: "0 0 10px 0"
      }
    };

    return (
      <Spin spinning={this.state.loading}>
        <Row>
          <Col span={7}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="lock" onClick={this.handleChangePassword} />
              ]}
            />
          </Col>
          <Col span={17}>
            <Form
              className="formProfile"
              onSubmit={this.handleSubmit}
              layout="vertical"
            >
              <Modal
                visible={this.state.visible}
                title="Change password"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" onClick={this.handleOk}>
                    Submit
                  </Button>
                ]}
              >
                <Form.Item label="Old password">
                  {getFieldDecorator("oldPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password"
                      }
                    ]
                  })(<Input style={{ width: "100%" }} type="password" />)}
                </Form.Item>

                <Form.Item label="New password">
                  {getFieldDecorator("newPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your new password"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(<Input style={{ width: "100%" }} type="password" />)}
                </Form.Item>

                <Form.Item label="Confirm new password">
                  {getFieldDecorator("confirmPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your confirm new password"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(<Input style={{ width: "100%" }} type="password" />)}
                </Form.Item>
              </Modal>
              <Card title="My account">
                <Card>
                  <Row>
                    <Col span={12}>
                      <Form.Item {...formItemLayout} label={"username"}>
                        {getFieldDecorator("username", {
                          initialValue: LocalStorageUtils.getName()
                        })(<Input disabled />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item {...formItemLayout} label={"E-mail"}>
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              message: "Please input your E-mail!"
                            }
                          ],
                          initialValue: this.state.data.email
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={15}>
                      <Form.Item {...formItemLayout} label={"Full name"}>
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              message: "Please input your nickname!",
                              whitespace: true
                            }
                          ],
                          initialValue: this.state.data.name
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item {...formItemLayout} label="Gender">
                        {getFieldDecorator("gender", {
                          initialValue: this.state.data.gender
                        })(
                          <Radio.Group>
                            <Radio value={true}>Male</Radio>
                            <Radio value={false}>Female</Radio>
                          </Radio.Group>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={17}>
                      <Form.Item {...formItemLayout} label={"Address"}>
                        {getFieldDecorator("address", {
                          rules: [
                            {
                              message: "Please input address!",
                              whitespace: true
                            }
                          ],
                          initialValue: this.state.data.address
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item {...formItemLayout} label="Day of birth">
                        {getFieldDecorator(
                          "birthDate",
                          {
                            initialValue: moment(this.state.data.birthDate)
                          },
                          config
                        )(<DatePicker format="YYYY-MM-DD HH:mm:ss" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit">
                    Save profile
                  </Button>
                </Form.Item>
              </Card>
            </Form>
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default Form.create()(ViewProfile);
