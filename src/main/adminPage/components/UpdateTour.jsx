import React from "react";
import {
  Col,
  Spin,
  Row,
  Layout,
  Select,
  Upload,
  Icon,
  DatePicker,
  InputNumber,
  Button,
  Form,
  Input,
  Modal,
  message
} from "antd";
import moment from "moment";
import FroalaEditor from "react-froala-wysiwyg";
import FirebaseUitls from "../../../utils/FirebaseUitls";
import { post } from "../../../utils/ApiCaller";
import {
  ADMIN__UPDATE_TOUR,
  PUBLIC__TOUR_DETAIL
} from "../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../utils/LocalStorage";

import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListCategory } from "../../../components/Header/header.action.js";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getListCategoryFromReducer = state =>
  state[HEARDER_REDUCER_STORE].listCategory;

const startSelector = createSelector(
  getListCategoryFromReducer,
  listCategory => ({
    listCategory: listCategory || []
  })
);

const { Content } = Layout;
const { Option } = Select;

class UpdateTourForm extends React.Component {
  state = {
    model: "Example text",
    previewVisible: false,
    previewImage: "",
    fileList: [],
    tourDetail: {},
    loading: false
  };

  async componentDidMount() {
    this.props.getListCategory && this.props.getListCategory();
    await post(
      PUBLIC__TOUR_DETAIL,
      {
        id: this.props.match.params.id
      },
      {},
      {}
    ).then(res => {
      this.setState({
        tourDetail: res.data,
        fileList: this.convertListImageTolistFile(res.data.listImage),
        model: res.data.description
      });
    });
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      await post(
        PUBLIC__TOUR_DETAIL,
        {
          id: nextProps.match.params.id
        },
        {},
        {}
      ).then(res => {
        this.setState({
          tourDetail: res.data,
          fileList: this.convertListImageTolistFile(res.data.listImage),
          model: res.data.description
        });
      });
    }
  }

  convertListImageTolistFile = listImage => {
    let listFile = [];
    listImage.forEach((data, count) => {
      listFile = [...listFile, { uid: count, url: data.url }];
    });
    return listFile;
  };

  handleModelChange = model => {
    this.setState({
      model: model
    });
    console.log(model);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const values = {
        ...fieldsValue,
        startDate: fieldsValue["startDate"].format("YYYY-MM-DD"),
        endDate: fieldsValue["endDate"].format("YYYY-MM-DD")
      };
      let promises = [];
      let images = [];

      this.state.fileList.forEach(data => {
        if (data.name) {
          promises.push(FirebaseUitls.uploadImages(data.originFileObj));
        } else {
          images = [...images, data.url];
        }
      });
      this.setState({
          loading: true,
      })
      Promise.all(promises).then(data => {
        images = [...images, ...data];

        post(
          ADMIN__UPDATE_TOUR,
          {
            id: this.props.match.params.id,
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
            memberNumber: 0,
            description: this.state.model,
            maxMemberNumber: values.maxMemberNumber,
            price: values.price,
            categoryId: values.select,
            listImage: images
          },
          {},
          {
            Authorization: "Bearer " + LocalStorageUtils.getJWT()
          }
        )
          .then(res => {
            message.success("Add tour success");
            this.setState({
                loading: false,
            })
          })
          .catch(err => {
            message.error("Add error!!!!");
            this.setState({
                loading: false,
            })
          });
      });
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const { previewVisible, previewImage, fileList, tourDetail } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Spin spinning={this.state.loading}>
        <Content
          style={{
            background: "#fff",
            padding: "24px 70px",
            margin: 0,
            minHeight: 450
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Title" className="wrapFormItem">
              {getFieldDecorator("name", {
                initialValue: tourDetail.name,
                rules: [
                  {
                    required: true,
                    message: "Please input title"
                  }
                ]
              })(<Input style={{ width: "100%" }} />)}
            </Form.Item>
            <Row>
              <Col span={8}>
                <Form.Item label="Start date" className="wrapFormItem">
                  {getFieldDecorator("startDate", {
                    initialValue: moment(tourDetail.startDate),
                    rules: [
                      {
                        required: true,
                        message: "Select start date"
                      }
                    ]
                  })(
                    <DatePicker format="DD-MM-YYYY" style={{ width: "95%" }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="End date" className="wrapFormItem">
                  {getFieldDecorator("endDate", {
                    initialValue: moment(tourDetail.endDate),
                    rules: [
                      {
                        required: true,
                        message: "Select end date"
                      }
                    ]
                  })(
                    <DatePicker format="DD-MM-YYYY" style={{ width: "95%" }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Category"
                  hasFeedback
                  className="wrapFormItem"
                >
                  {getFieldDecorator("select", {
                    initialValue: tourDetail.categoryId,
                    rules: [
                      {
                        required: true,
                        message: "Select category"
                      }
                    ]
                  })(
                    <Select placeholder="Select category">
                      {this.props.listCategory.map(data => (
                        <Option key={data.id} value={data.id}>{data.name}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Price ticket" className="wrapFormItem">
                  {getFieldDecorator("price", {
                    initialValue: tourDetail.price
                  })(
                    <InputNumber
                      min={0}
                      max={50000000}
                      style={{ minWidth: 150 }}
                    />
                  )}
                  <span className="ant-form-text"> VNĐ </span>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Max number ticket" className="wrapFormItem">
                  {getFieldDecorator("maxMemberNumber", {
                    initialValue: tourDetail.maxMemberNumber
                  })(<InputNumber min={0} max={5000} />)}
                  <span className="ant-form-text"> Ticket</span>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <div className="clearfix">
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </Col>
            </Row>
            <FroalaEditor
              tag="textarea"
              config={{
                quickInsertTags: [],
                heightMin: 300,
                heightMax: 500,
                linkInsertButtons: [],
                toolbarButtons: [
                  "bold",
                  "italic",
                  "underline",
                  "strikeThrough",
                  "subscript",
                  "superscript",
                  "|",
                  "align",
                  "formatOL",
                  "formatUL",
                  "indent",
                  "outdent",
                  "|",
                  "undo",
                  "redo"
                ],
                placeholder: "Edit Me",
                charCounterCount: true,
                events: {
                  "froalaEditor.focus": function(e, editor) {
                    console.log(editor.selection.get());
                  }
                }
              }}
              model={this.state.model}
              onModelChange={this.handleModelChange}
            />
            <Form.Item>
              <Button type="danger" htmlType="submit">
                Update
              </Button>
              <Button type="default" htmlType="button">
                Back
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Spin>
    );
  }
}
const UpdateTour = Form.create()(UpdateTourForm);
export default connect(
  startSelector,
  { getListCategory }
)(UpdateTour);
