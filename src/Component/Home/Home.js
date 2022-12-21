import { useTranslation } from 'react-i18next'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos'
import axios from 'axios';
import './Home.scss'
import Header from '../Header_Footer/Header';
import Footer from '../Header_Footer/Footer';
import Slider from "../Utilities/Slider"
import BeAtTop from "../Utilities/BeAtTop";
import PageTitle from "../Utilities/PageTitle";
import ScrollToTop from "../Utilities/ScrollToTop";
import slide_img1 from '../../Image/slide_img_1.jpg'
import img_avt_team from '../../Image/img_avt_team.jpg'
import { Card, Row, Col, Skeleton, Space, Spin } from "antd";

function Home() {

    /* i18next */
    const { t, i18n } = useTranslation();
    /* API */
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

    /* list data room */
    const [allRooms, setAllRooms] = useState([])
    const [loading, setLoading] = useState(false)

    /* when 'refresh' change => call getAllData() again to refresh new data */
    useEffect(() => {
        getAllData()
    }, [])

    /* Get data from api */
    const getAllData = async () => {
        setLoading(true)
        await axios.get(API)
            .then(resp => {
                setAllRooms(resp.data)

                /* after get data, set loading to False */
                setLoading(false)
            }
            )
    }

    // set time for aos animation
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    const home_staff = [
        {
            name: `${t('home.introduce_member_name1')}`,
            position: `${t('home.introduce_member_front_end')}`,
            avatar: img_avt_team,
        },
        {
            name: `${t('home.introduce_member_name2')}`,
            position: `${t('home.introduce_member_front_end')}`,
            avatar: img_avt_team,
        },
        {
            name: `${t('home.introduce_member_name3')}`,
            position: `${t('home.introduce_member_back_end')}`,
            avatar: img_avt_team,
        },
        {
            name: `${t('home.introduce_member_name4')}`,
            position: `${t('home.introduce_member_back_end')}`,
            avatar: img_avt_team,
        }
        ,
    ]

    const home_more_infomation = [
        {
            title: `${t('home.introduce_side_infor_box_mission_title')}`,
            description: `${t('home.introduce_side_infor_box_mission_description')}`,
        },
        {
            title: `${t('home.introduce_side_infor_box_service_title')}`,
            description: `${t('home.introduce_side_infor_box_service_description')}`,
        },
        {
            title: `${t('home.introduce_side_infor_box_history_title')}`,
            description: `${t('home.introduce_side_infor_box_history_description')}`,
        },
    ]

    const { Meta } = Card
    let navigate = useNavigate()

    return (
        <>
            {/* set title of page */}
            <PageTitle title={t('title.title_home')} />

            {/* Header UI part */}
            <Header />

            {/* Slider UI part */}
            <Slider />

            {/* body Home UI part */}
            <div className="container mt-4">
                <h3 className="font-weight-bold text-center" data-aos="fade-down">{t('home.introduce_room_title')}</h3>
                <p className="text-center" data-aos="fade-up">{t('home.introduce_room_description')}</p>
                <div className="row">
                    {
                        loading ?
                        (
                            <div className="col-lg-12 col-sm-6 col-xs-12 mt-3 mb-3 d-flex justify-content-center mt-5">
                                <Space direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}>
                                    <Spin tip="Loading" size="large">
                                        <div className="content" />
                                    </Spin>
                                </Space>
                            </div>
                        ) :
                        // Check if data exist => display the data
                        (allRooms && allRooms.length > 0 &&
                        // Display data in range - for Pagination
                        allRooms.slice(0, 3).map((el, index) => (
                            <div data-aos="fade-right" className="col-lg-4 col-sm-6 col-xs-12 mt-3 mb-3" key={index}>
                                <Card style={{ overflow: 'hidden' }}
                                    onClick={() => navigate(`/detail?roomID=${el.id}`, { replace: true })}
                                    hoverable
                                    cover={<img className="img_rooms" alt="img" src={slide_img1} style={{ borderBottom: '1px solid #000' }} />}
                                >
                                    <Skeleton loading={loading} avatar active>
                                        <Meta title={el.title} description={el.description} className="mt-1" />
                                        <Meta title={`$ ${el.price}`} className="mt-2 contain_price" />
                                    </Skeleton>
                                </Card>
                            </div>
                        )))
                    }

                    <div className="col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                        <a href="/rooms" className="home_link">{t('home.introduce_room_seemore')}</a>
                    </div>
                </div>


            </div>
            <hr />
            <div className="container mt-4">
                <h3 className="font-weight-bold text-center" data-aos="fade-down">{t('home.introduce_member_title')}</h3>
                <Row gutter={[0, 24]} justify="space-around" className='contain_member'>
                    <Col md={23} xs={23}><div className='contain_title_manager ml-5'>
                        <p className='title_manager' data-aos="fade-right">{t('home.introduce_member_subtitle')}</p>
                    </div>
                    </Col>
                    {
                        home_staff.map((el, index) => (
                            <Col lg={5} sm={10} xs={24} key={index} data-aos="fade-right">
                                <Card className='mb-4'
                                    style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
                                    hoverable
                                    cover={<img alt="example" src={el.avatar} />}
                                >
                                    <Meta title={el.name} description={el.position} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <div className="col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                    <a href="/about" className="home_link">{t('home.introduce_member_seemore')}</a>
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="home_more">
                        <div className="col-lg-12 col-sm-12 col-xs-12 home_more_header">
                            <div className="row">
                                <h3 className="col-lg-6 col-sm-6 col-xs-12 home_more_header_content" data-aos="fade-right">{t('home.introduce_side_infor_title')}</h3>
                                <p className="col-lg-6 col-sm-6 col-xs-12 home_more_header_content" data-aos="fade-right">{t('home.introduce_side_infor_description')}</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-sm-12 col-xs-12 home_more_content">
                            {
                                home_more_infomation.map((el, index) => (
                                    <div key={index} data-aos="fade-right" className="home_more_content_box">
                                        <Card
                                            className="home_more_content_card"
                                            hoverable
                                        >
                                            <Meta title={el.title} description={el.description} />
                                        </Card>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>

            {/* button to scroll to top of page */}
            <ScrollToTop />

            {/* Footer UI part */}
            <Footer />

            {/* be at top of page after loading */}
            <BeAtTop />
        </>
    )
}

export default Home