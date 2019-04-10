import React from "react";
import { renderRoutes } from "../../components/Route";
import ThemeRoutes from "./publicRouter/routing.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../../assets/jss/material-kit-react/views/components.jsx";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import Footer from "../../components/Footer/Footer.jsx";


// import { Layout, Menu } from "antd";
// const { Header, Content, Footer } = Layout;

class Fulllayout extends React.Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        {renderRoutes(ThemeRoutes, this.props.match.path)}
        <Footer />
      </div>

      // <Layout className="layout">
      //   <Header>
      //     <div className="logo" />
      //     <Menu
      //       theme="dark"
      //       mode="horizontal"
      //       defaultSelectedKeys={["2"]}
      //       style={{ lineHeight: "64px" }}
      //     >
      //       {ThemeRoutes.map((data, key) => {
      //         if (!data.redirect) {
      //           return (
      //             <Menu.Item key={key}>
      //               <Link to={this.props.match.path + data.path}>{data.name}</Link>
      //             </Menu.Item>
      //           );
      //         }
      //       })}
      //     </Menu>
      //   </Header>
      //   <Content style={{ padding: "0 50px" }}>
      //     {renderRoutes(ThemeRoutes, this.props.match.path)}
      //   </Content>
      //   <Footer style={{ textAlign: "center" }}>
      //     Ant Design ©2018 Created by Ant UED
      //   </Footer>
      // </Layout>
    );
  }
}
export default withStyles(componentsStyle)(Fulllayout);
