import React from "react";
import { Layout, Spin, Table, message, Row, Col } from "antd";
import { post } from "../../../utils/ApiCaller";
import { USER__ORDER_DETAIL } from "../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../utils/LocalStorage";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// const { Title, Text } = Typography;

class OrderDetail extends React.Component {
  state = {
    orderDetail: {},
    loading: true
  };

  componentDidMount() {
    this.fleching(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fleching(newProps.match.params.id);
    }
  }

  fleching = async id => {
    await post(
      USER__ORDER_DETAIL,
      {
        id: id
      },
      {},
      {
        Authorization: "Bearer " + LocalStorageUtils.getJWT()
      }
    )
      .then(res => {
        this.setState({
          orderDetail: res.data,
          loading: false
        });
      })
      .catch(err => {
        message.error("Some thing error, F5 to try again");
      });
  };

  converDate = date => {
    return Date.parse(
      new Date((date + "").replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
    );
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
      },
      {
        title: "Start date",
        dataIndex: "startDate",
        key: "startDate",
        width: "20%",
        sorter: (a, b) =>
          this.converDate(a.startDate) - this.converDate(b.startDate)
      },
      {
        title: "End date",
        dataIndex: "endDate",
        key: "endDate",
        width: "20%",
        sorter: (a, b) =>
          this.converDate(a.endDate) - this.converDate(b.endDate)
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: "15%",
        sorter: (a, b) => a.quantity - b.quantity
      },
      {
        title: "Price/Ticket",
        dataIndex: "price",
        key: "price",
        width: "15%",
        sorter: (a, b) => a.price - b.price
      }
    ];
    const { orderDetail, loading } = this.state;
    return (
      <Spin spinning={loading}>
        <Layout style={{ background: "#fff" }}>
          <Row>
            <Col style={{ marginBottom: 16, marginLeft: 16 }}>
              <Typography variant="overline" gutterBottom>
                Total price: {orderDetail.total}
              </Typography>
              <Typography variant="caption" gutterBottom>
                Date booking: {orderDetail.createdTime}
              </Typography>
            </Col>
          </Row>

          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={orderDetail.listTour}
          />
        </Layout>
      </Spin>
    );
  }
}

export default OrderDetail;
