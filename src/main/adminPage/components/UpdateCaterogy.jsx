import React from "react";
import {
  Layout,
  Icon,
  Row,
  Col,
  Input,
  Button,
  Modal,
  message,
  Form,
  Upload
} from "antd";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListCategory } from "../../../components/Header/header.action.js";
import { post } from "../../../utils/ApiCaller";
import { ADMIN__UPDATE_CATEGORY } from "../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../utils/LocalStorage";
import FirebaseUitls from "../../../utils/FirebaseUitls";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getListCategoryFromReducer = state =>
  state[HEARDER_REDUCER_STORE].listCategory;

const startSelector = createSelector(
  getListCategoryFromReducer,
  listCategory => ({
    listCategory: listCategory || []
  })
);

class UpdateCategory extends React.Component {
  state = {
    loading: true,

    previewVisible: false,
    previewImage: "",
    fileList: [],

    categoryDetail: {}
  };

  componentDidMount() {
    this.props.getListCategory && this.props.getListCategory();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.listCategory !== newProps.listCategory) {
      newProps.listCategory.forEach(data => {

        if (data.id + "" === this.props.match.params.id) {
          this.setState({
            categoryDetail: data,
            fileList: [
              ...this.state.fileList,
              { uid: data.id, url: data.urlImage }
            ]
          });
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let promises = [];
      let images = [];

      this.state.fileList.forEach(data => {
        if (data.name) {
          promises.push(FirebaseUitls.uploadImages(data.originFileObj));
        } else {
          images = [...images, data.url];
        }
      });
      Promise.all(promises).then(data => {
        images = [...images, ...data];
        post(
          ADMIN__UPDATE_CATEGORY,
          {
            id: this.props.match.params.id,
            name: values.name,
            description: values.description,
            urlImage: images[0]
          },
          {},
          {
            Authorization: "Bearer " + LocalStorageUtils.getJWT()
          }
        )
          .then(res => {
            message.success("Update category success");
            this.props.history.push("/admin/listCategory/");
          })
          .catch(err => {
            message.error("Update error!!!!");
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

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Layout style={{ background: "#fff" }}>
        <Row>
          <Col span={12} offset={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  initialValue: this.state.categoryDetail.name,
                  rules: [
                    {
                      required: true,
                      message: "Please input category name"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator("description", {
                  initialValue: this.state.categoryDetail.description,
                  rules: [
                    {
                      required: true,
                      message: "Please input category description"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <div className="clearfix">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
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
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout>
    );
  }
}

const UpdateCategoryForm = Form.create({ name: "register" })(UpdateCategory);

export default connect(
  startSelector,
  { getListCategory }
)(UpdateCategoryForm);
