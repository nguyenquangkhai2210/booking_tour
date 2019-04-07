import React from "react";
import { Layout, Icon, Table, Input, Button, message } from "antd";
import Highlighter from 'react-highlight-words';
import { get } from "../../../utils/ApiCaller";
import { USER__LIST_ORDER } from "../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../utils/LocalStorage";


class ListOrder extends React.Component {
  state = {
    searchText: "",
    listOder: [],
    loading: true,
    categoryId: 1,
  };

  componentDidMount(){
    this.fleching();
  }

  fleching = async () => {
    await get(
      USER__LIST_ORDER,
      {},
      {},
      {
        Authorization: "Bearer " + LocalStorageUtils.getJWT()
      }
    )
    .then( res => {
      this.setState({
        listOder: res.data,
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

  viewDetail = (id) => {
    this.props.history.push("/user/orderDetail/" + id);
  }

  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        width: "20%",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Date booking",
        dataIndex: "createdTime",
        key: "createdTime",
        width: "20%",
        sorter: (a, b) =>
        this.converDate(a.createdTime) - this.converDate(b.createdTime),
      },
      {
        title: "Price",
        dataIndex: "total",
        key: "total",
        width: "15%",
        sorter: (a, b) => a.total - b.total,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "Done", value: "done" },
          { text: "Is Refund", value: "isRefund" }
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
            View detail
          </Button>
        ),
        width: "5%"
      }
    ];
    return (
      <Layout style={{background: '#fff'}}>
        <Table rowKey={record => record.id} columns={columns} dataSource={this.state.listOder} />
      </Layout>
    )
  }
}

export default ListOrder;
