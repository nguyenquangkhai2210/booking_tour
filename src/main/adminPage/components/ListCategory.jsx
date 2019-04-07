import React from "react";
import {
  Layout,
  Icon,
  Table,
  Input,
  Button,
  Modal,
  message,
  Form,
  Upload
} from "antd";
import Highlighter from "react-highlight-words";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListCategory } from "../../../components/Header/header.action.js";
import { post } from "../../../utils/ApiCaller";
import {
  ADMIN__DELETE_CATEGORY,
  ADMIN__INSERT_CATEGORY
} from "../../../utils/ApiEndpoint";
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

class ListCategory extends React.Component {
  state = {
    searchText: "",
    loading: true,
    categoryId: 1,

    previewVisible: false,
    previewImage: "",
    fileList: [],
  };

  componentDidMount() {
    this.props.getListCategory && this.props.getListCategory();
  }

  componentWillReceiveProps(newProps){
    if(this.props.listCategory !== newProps.listCategory){
      this.forceUpdate()
    }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  viewDetail = id => {
    this.props.history.push("/admin/updateCategory/" + id);
  };

  handleDelete = id => {
    post(
      ADMIN__DELETE_CATEGORY,
      {
        id: id
      },
      {},
      {
        Authorization: "Bearer " + LocalStorageUtils.getJWT()
      }
    )
      .then(res => {
        message.success("Delete success");
        this.props.getListCategory && this.props.getListCategory();
      })
      .catch(err => {
        message.error("Can't detele. Can you try again");
      });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let promises = [];
      this.state.fileList.forEach(data => {
        promises.push(FirebaseUitls.uploadImages(data.originFileObj));
      });
      Promise.all(promises).then(data => {
        post(
          ADMIN__INSERT_CATEGORY,
          {
            name: values.name,
            description: values.description,
            urlImage: data[0]
          },
          {},
          {
            Authorization: "Bearer " + LocalStorageUtils.getJWT()
          }
        )
          .then(res => {
            message.success("Add category success");
            this.setState({
              visible: false,
            });
            this.props.getListCategory && this.props.getListCategory();
          })
          .catch(err => {
            message.error("Add error!!!!");
          });
      });
    });
  };

  handleCancelInsert = () => {
    this.setState({ visible: false });
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
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Url Image",
        dataIndex: "urlImage",
        key: "urlImage",
        width: "20%",
        render: (value, record) => (
          <img src={record.urlImage} width={50} height={50} />
        )
      },
      {
        key: "edit",
        title: "",
        dataIndex: "id",
        render: (value, record) => (
          <Button
            type="primary"
            key={record.id + "Edit"}
            onClick={this.viewDetail.bind(this, record.id)}
          >
            Edit
          </Button>
        ),
        width: "5%"
      },
      {
        key: "delete",
        title: "",
        dataIndex: "id",
        render: (value, record) => (
          <Button
            type="danger"
            key={record.id + "Delete"}
            onClick={this.handleDelete.bind(this, record.id)}
          >
            Delete
          </Button>
        ),
        width: "5%"
      }
    ];

    return (
      <Layout style={{ background: "#fff" }}>
        <Button type="primary" onClick={this.showModal}>
          Insert category
        </Button>
        <Modal
          visible={this.state.visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancelInsert}
          footer={[
            <Button key="back" onClick={this.handleCancelInsert}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
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
          </Form>
        </Modal>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.props.listCategory}
        />
      </Layout>
    );
  }
}

const ListCategoryForm = Form.create({ name: "register" })(ListCategory);

export default connect(
  startSelector,
  { getListCategory }
)(ListCategoryForm);
