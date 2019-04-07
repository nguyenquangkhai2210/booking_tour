import React from 'react';
import { Col, Row, Layout, Select, Upload, Icon, DatePicker, InputNumber, Button, Form, Input, Modal, message } from "antd";
import FroalaEditor from 'react-froala-wysiwyg';
import FirebaseUitls from '../../../utils/FirebaseUitls';
import {post} from '../../../utils/ApiCaller';
import {ADMIN__CREATE_TOUR} from '../../../utils/ApiEndpoint';
import LocalStorageUtils from '../../../utils/LocalStorage';

import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListCategory } from "../../../components/Header/header.action.js";

const HEARDER_REDUCER_STORE = "HEARDER_REDUCER_STORE";

const getListCategoryFromReducer = state =>
  state[HEARDER_REDUCER_STORE].listCategory;

const startSelector = createSelector(
  getListCategoryFromReducer,
  (listCategory) => ({
    listCategory: listCategory || []
  })
);

const { Content } = Layout;
const { Option } = Select;

class CreateTourForm extends React.Component {
    state = {
        model: 'Example text',
        previewVisible: false,
        previewImage: '',
        fileList: [],
        listImg: []
    };

    componentDidMount() {
        this.props.getListCategory && this.props.getListCategory();
    }

    handleModelChange = (model) => {
        this.setState({
            model: model
        });
        console.log(model);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            const values = {
                ...fieldsValue,
                'startDate': fieldsValue['startDate'].format('YYYY-MM-DD'),
                'endDate': fieldsValue['endDate'].format('YYYY-MM-DD')
            };
            console.log('Received values of form: ', values);
            let promises = [];
            this.state.fileList.forEach(data => {
                promises.push(FirebaseUitls.uploadImages(data.originFileObj))
            })
            Promise.all(promises).then((data) => {
                post(
                    ADMIN__CREATE_TOUR,
                    {
                        name: values.name,
                        startDate: values.startDate,
                        endDate: values.endDate,
                        memberNumber: 0,
                        description: this.state.model,
                        maxMemberNumber: values.maxMemberNumber,
                        price: values.price,
                        categoryId: values.select,
                        listImage: data,
                    },
                    {},
                    {
                        Authorization: "Bearer " + LocalStorageUtils.getJWT()
                    }
                    )
                    .then(res => {
                        message.success("Add tour success");
                    })
                    .catch(err => {
                        message.error("Add error!!!!");
                    })
            })
        });
    }


    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    }

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
            <Content style={{
                background: '#fff', padding: '24px 70px', margin: 0, minHeight: 450,
            }}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Title" className="wrapFormItem">
                        {getFieldDecorator("name", {
                            rules: [{
                                required: true,
                                message: "Please input title"
                            }]
                        })(
                            <Input style={{ width: "100%" }} />
                        )}
                    </Form.Item>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="Start date" className="wrapFormItem">
                                {getFieldDecorator('startDate', {
                                    rules: [{
                                        required: true,
                                        message: "Select start date"
                                    }]
                                })(
                                    <DatePicker format="DD-MM-YYYY" style={{ width: "95%" }} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="End date" className="wrapFormItem">
                                {getFieldDecorator('endDate', {
                                    rules: [{
                                        required: true,
                                        message: "Select end date"
                                    }]
                                })(
                                    <DatePicker format="DD-MM-YYYY" style={{ width: "95%" }} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Category" hasFeedback className="wrapFormItem">
                                {getFieldDecorator('select', {
                                    rules: [{
                                        required: true,
                                        message: "Select category"
                                    }]
                                })(
                                    <Select placeholder="Select category">
                                        {this.props.listCategory.map(data => (
                                        <Option value={data.id}>{data.name}</Option>                                            
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="Price ticket" className="wrapFormItem">
                                {getFieldDecorator('price', { initialValue: 0 })(
                                    <InputNumber min={0} max={50000000} style={{ minWidth: 150 }} />
                                )}
                                <span className="ant-form-text"> VNĐ </span>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Max number ticket" className="wrapFormItem">
                                {getFieldDecorator('maxMemberNumber', { initialValue: 0 })(
                                    <InputNumber min={0} max={5000} />
                                )}
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
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                        </Col>
                    </Row>
                    <FroalaEditor
                        tag='textarea'
                        config={{
                            quickInsertTags: [], heightMin: 300, heightMax: 500,
                            linkInsertButtons: [], 
                            toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 
                            'align', 'formatOL', 'formatUL', 'indent', 'outdent', '|', 
                            'undo', 'redo'],
                            placeholder: "Edit Me",
                            charCounterCount: true,
                            events: {
                                'froalaEditor.focus': function (e, editor) {
                                    console.log(editor.selection.get());
                                }
                            }
                        }}
                        model={this.state.model}
                        onModelChange={this.handleModelChange}
                    />
                    <Form.Item>
                        <Button type="danger" htmlType="submit">Đăng tin</Button>
                        <Button type="default" htmlType="button">Trở về</Button>
                    </Form.Item>
                    
                </Form>
            </Content>
        );
    }
}
const CreateTour = Form.create()(CreateTourForm);
export default connect(startSelector, {getListCategory})(CreateTour);