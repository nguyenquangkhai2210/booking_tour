import React from "react";
import { Layout, Icon, Table, Input, Button, Select, message } from "antd";
import Highlighter from 'react-highlight-words';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListCategory } from "../../../components/Header/header.action.js";
import { post } from "../../../utils/ApiCaller";
import { ADMIN__LIST_TOUR, ADMIN__DELETE_TOUR } from "../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../utils/LocalStorage";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getListCategoryFromReducer = state =>
  state[HEARDER_REDUCER_STORE].listCategory;

const startSelector = createSelector(
  getListCategoryFromReducer,
  (listCategory) => ({
    listCategory: listCategory || []
  })
);

const Option = Select.Option;


class ListTour extends React.Component {
  state = {
    searchText: "",
    listTour: [],
    loading: true,
    categoryId: 2,
  };

  componentDidMount(){
    this.props.getListCategory && this.props.getListCategory();
    this.fleching(2);
  }

  fleching = async (id) => {
    await post(
      ADMIN__LIST_TOUR,
      {
        "categoryId": id
      },
      {},
      {}
    )
    .then( res => {
      this.setState({
        listTour: res.data,
        loading: false
      })
    })
    .catch( err => {
      message.error("Some thing error, F5 to try again");
    })
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

  converDate = date => {
    return Date.parse(
      new Date((date + "").replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
    );
  };

  handleChange = (value) => {
    if(value !== this.state.categoryId){
      this.setState({
        categoryId: value,
      })
      this.fleching(value);
    }
  }

  viewDetail = (id) => {
    this.props.history.push("/admin/updateTour/" + id);
  }

  handleDelete = (id) => {
    post(
      ADMIN__DELETE_TOUR,
      {
        id: id
      },
      {},
      {
        Authorization: "Bearer " + LocalStorageUtils.getJWT(),
      }
    )
    .then( res => {
      this.fleching(this.state.categoryId);
    })
    .catch( err => {
      message.error("Can't detele. Can you try again");
    })
  }
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Start date",
        dataIndex: "startDate",
        key: "startDate",
        width: "20%",
        sorter: (a, b) =>
        this.converDate(a.startDate) - this.converDate(b.startDate),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: "15%",
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "Activity", value: "activity" },
          { text: "Is Deleted", value: "isDeleted" }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        width: "15%",
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
        key:"delete",
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
      <Layout style={{background: '#fff'}}>
        <Select defaultValue={this.state.categoryId} style={{ width: 120 }} onChange={this.handleChange}>
          {this.props.listCategory.map(data => (
            <Option key={data.id} value={data.id}>{data.name}</Option>
          ))}
        </Select>
        <Table rowKey={record => record.id} columns={columns} dataSource={this.state.listTour} />
      </Layout>
    )
  }
}

export default connect(startSelector, {getListCategory})(ListTour);
