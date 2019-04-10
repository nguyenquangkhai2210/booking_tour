import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../../../components/Grid/GridItem.jsx";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";

import { post } from "../../../../utils/ApiCaller";
import { ORDER__CHECK_OUT, AUTH__LOGIN } from "../../../../utils/ApiEndpoint";

import { Form, InputNumber, Modal, Icon, Input } from "antd";

import LocalStorageUtils, {
  LOCAL_STORAGE_KEY
} from "../../../../utils/LocalStorage";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons/";

import { connect } from "react-redux";
import { createSelector } from "reselect";
import { setTourCount } from "../../../../components/Header/header.action";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getTourCountFromReducer = state => state[HEARDER_REDUCER_STORE].tourCount;

const startSelector = createSelector(
  getTourCountFromReducer,
  tourCount => ({ tourCount: tourCount || 0 })
);

const styles = theme => ({
  card: {
    maxWidth: 300
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class ContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTour: [],
      visible: false,
      visibleError: false,
    };
  }

  componentDidMount() {
    let card = LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.CARD, "");
    let array = JSON.parse(card);
    this.setState({
      listTour: array
    });
  }

  handleNumberChange = (id, value) => {
    let newListTour = this.state.listTour.map(data =>
      data.id === id ? { ...data, quantity: value } : data
    );
    this.setState({
      listTour: newListTour
    });
    LocalStorageUtils.setItem(
      LOCAL_STORAGE_KEY.CARD,
      JSON.stringify(newListTour)
    );
    this.props.setTourCount &&
      this.props.setTourCount(LocalStorageUtils.getCard());
  };

  handleTotal = () => {
    let total = 0;

    this.state.listTour.forEach(data => {
      total += data.quantity * data.price;
    });

    return total;
  };

  handleDelete = id => {
    let newListTour = this.state.listTour.filter(data => data.id !== id);
    this.setState({
      listTour: newListTour
    });
    LocalStorageUtils.setItem(
      LOCAL_STORAGE_KEY.CARD,
      JSON.stringify(newListTour)
    );
    this.props.setTourCount &&
      this.props.setTourCount(LocalStorageUtils.getCard());
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleCheckLogin = (e) => {
    if(this.props.tourCount > 0){
      if (LocalStorageUtils.getJWT()) {
        this.handleSubmit(e);
      } else {
        this.setState({
          visible: true
        });
      }
    } else {
      Modal.error({
        title: 'Error card',
        content: 'This card is empty!!',
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    let listTourSubmit = [];
    let total = 0;
    this.state.listTour.forEach(data => {
      let tour = {
        quantity: data.quantity,
        id: data.id,
        price: data.quantity * data.price
      };
      total += data.quantity * data.price;
      listTourSubmit = [...listTourSubmit, tour];
    });

    await post(
      ORDER__CHECK_OUT,
      {
        listTour: listTourSubmit,
        total: total
      },
      {},
      {
        Authorization: "Bearer " + LocalStorageUtils.getJWT()
      }
    )
      .then(res => {
        Modal.success({
          title: 'Success',
          content: 'Reserve success!!',
        });
        this.setState({
          listTour: []
        });
        LocalStorageUtils.setItem(
          LOCAL_STORAGE_KEY.CARD,
          JSON.stringify([])
        );
        this.props.setTourCount && this.props.setTourCount(0);
      })
      .catch(err => {
        Modal.error({
          title: 'Error',
          content: 'Reserve error!!',
        });
      });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onLogin(values.username, values.password, token => {
          if (token) {
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
            window.location.reload();
          }
        });
      }
    });
  }

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
        Modal.error({
          title: 'Error',
          content: 'Invalid Username or Password',
        });
      });
  }

  handleOk = e => {
    this.setState({
      visibleError: false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center" style={{ padding: "25px" }}>
          <Form onSubmit={this.handleLogin} className="login-form">
            <Modal
              title="Login"
              visible={this.state.visible}
              onOk={this.handleLogin}
              onCancel={this.handleCancel}
              style={{ maxWidth: "350px" }}
            >
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
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
                      { required: true, message: "Please input your Password!" }
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
                    />
                  )}
                </Form.Item>
            </Modal>
            </Form>

            {this.state.listTour.map(data => (
              <GridItem key={data.id} xs={12} sm={12} md={3}>
                <Card className={classes.card} style={{ marginBottom: "25px" }}>
                  <CardHeader
                    subheader={data.name}
                    action={
                      <IconButton
                        onClick={this.handleDelete.bind(this, data.id)}
                      >
                        <Delete />
                      </IconButton>
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    image={data.image}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="overline" gutterBottom>
                      Price: {data.price * data.quantity} VND
                    </Typography>
                    <Form.Item label="Ticket">
                      {getFieldDecorator("input_number_" + data.id, {
                        initialValue: data.quantity
                      })(
                        <InputNumber
                          min={1}
                          max={20}
                          onChange={this.handleNumberChange.bind(this, data.id)}
                        />
                      )}
                    </Form.Item>
                  </CardContent>
                </Card>
              </GridItem>
            ))}
            {this.state.listTour.length < 1 ? (
              <Typography variant="h4" gutterBottom>
                This card is empty
              </Typography>
            ) : (
              <div />
            )}
            <span
              style={{
                width: "100%",
                height: "2px",
                display: "block",
                backgroundColor: "black",
                margin: "25px 20px"
              }}
            />
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer justify="flex-end">
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  style={{ marginBottom: "25px" }}
                >
                  <Typography variant="button" gutterBottom>
                    Total price: {this.handleTotal()} VND
                  </Typography>
                  <Button
                    color="info"
                    size="lg"
                    simple
                    onClick={this.handleCheckLogin.bind(this)}
                  >
                    CHECK OUT ORDER
                  </Button>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const Content = Form.create({ name: "validate_other" })(ContentForm);

export default connect(
  startSelector,
  { setTourCount }
)(withStyles(styles)(Content));
