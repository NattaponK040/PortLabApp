import React from 'react';
import PageLayout from "../PageLayout";
import {Button, Col, Image, Row} from "antd";
import './index.css';
import PageLoader from '../PageLoader'
import firebaseApp from '../../repository/firebase';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Action} from "../../store/action";

const db = firebaseApp.firestore();

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "หน้าแรก",
            menu: [],
            templates: [],
            selectedId: "",
            display: {
                display: true
            }
        }
    }

    getTemplateFromDb = async () => (await db.collection('portfolio').get()).docs.forEach(e => {
        this.setState({
            ...this.state,
            templates: [...this.state.templates, e.data()]
        })
    })
    
    getMenu = async () => (await db.collection('templatekey').get()).docs.forEach(e => {
        this.setState({
            ...this.state,
            menu: [...this.state.menu, e.data()]
        })
    })

    initData = async () => {
        await this.getMenu()
        await this.getTemplateFromDb()
        this.props.saveTemplate(this.state.templates)
        this.props.saveMenu(this.state.menu)
    }

    async componentDidMount() {
        await this.initData()
    }

    selectTemplate(id, label) {
        if (id === "all") {
            this.setState({
                ...this.state,
                display: true,
                selectedId: {
                    id: id,
                    label: label
                },
                title: label
            })
        } else {
            this.setState({
                ...this.state,
                display: false,
                selectedId: {
                    id: id,
                    label: label
                },
                title: label
            })
        }
    }

    getMenuComponent = () => {
        return (<>
            <div className="sub-detail">
                <h6>สามารถกดดูหมวดหมู่ “ตัวอย่างเทมเพลต” ตามคณะที่น้อง ๆ สนใจศึกษาต่อ ได้ที่ด้านล่าง</h6>
            </div>
            <Row key="1" gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className="gutter-row">
                {
                    this.state.menu.map(e => {
                        return <Col className={"gutter-col"} key={e.id} span={6} xs={12} md={6}>
                            <div>
                                <Button className={"btn-submenu"}
                                        onClick={() => this.selectTemplate(e.id, e.label)}>{e.label}</Button>
                                <div className="subTitle">
                                    <span>{e.subTitle}</span>
                                </div>
                            </div>
                        </Col>

                    })
                }
                <Col span={6} xs={12} md={6}></Col>
                <Col span={6} xs={12} md={6}></Col>
            </Row>
        </>);
    }

    getTemplate = () => {
        return (
            <Row key="1" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {
                    this.state.templates.filter(e => e.TypeId === this.state.selectedId.id).map(e => {
                        return <Col key={e.MockId} span={6} xs={12} md={6} aria-label={e.Tags}>
                                <Image
                                    src={e.Preview.Url}
                                    alt={e.Preview.Title+" "+e.Tags}
                                    aria-label={e.Tags}/>
                                <Row>
                                    <Col span={12} xs={12} md={12}>
                                        <Col>
                                            <div className="template-id">
                                                รหัส {e.MockId}
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="template-label">
                                                {e.Label}
                                            </div>
                                        </Col>
                                    </Col>
                                    <Col span={12} xs={12} md={12}>
                                        <div className="template-price">
                                            {e.Price}บาท
                                        </div>
                                    </Col>
                                </Row>
                        </Col>

                    })
                }
            </Row>
        );
    }

    render() {
        return this.state.menu.length > 0 && this.state.templates.length > 0?
            <PageLayout title={`PortLab - ${this.state.title}`}>
                <div className="homepage-container">
                    <center>
                        <Button className={"btn-menu"}
                                onClick={() => this.selectTemplate("all", "หน้าแรก")}>เลือกดูเทมเพลตทั้งหมด</Button>
                    </center>
                    {
                        this.state.display ? this.getMenuComponent() : this.getTemplate()
                    }
                </div>
            </PageLayout> : <PageLoader/>;
    }
}

const mapDispatchToProps = dispatch => ({
    saveTemplate: function (template) {
        dispatch({type: Action.ADD_TEMPLATE, template: template})
    },
    saveMenu: function (menu) {
        dispatch({type: Action.ADD_MENU, menu: menu})
    }
});

export default withRouter(connect(null, mapDispatchToProps)(HomePage));