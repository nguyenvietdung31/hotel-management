import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import slide_img1 from '../../image/slide_img_1.jpg'
import img_avt_team from '../../image/img_avt_team.jpg'
import { getAllData } from '../../Service/Room_service/API_Service'
import Slider from '../../Component/carousel/Slider'
import ScrollToTop from '../../Component/ScrollToTop'
import Error from '../../Component/Error'
import useAosAnimation from '../../Component/customHook/useAosAnimation'
import useBeAtTop from '../../Component/customHook/useBeAtTop'
import usePageTitle from '../../Component/customHook/usePageTitle'
import './Home.scss'
import { Card, Row, Col, Skeleton, Space, Spin } from 'antd'

function Home() {
    /* i18next */
    const { t, i18n } = useTranslation()

    // Fetcher function
    const getData = async () => {
        const res = await getAllData()
        return res
    }

    usePageTitle(t('title.title_home'))

    /* Call custom hook: aos animation */
    useAosAnimation()

    /* Call custom hook: be at top position */
    useBeAtTop()

    // Using the hook
    const { data, error, isLoading, isError } = useQuery('all_Rooms', getData, {
        refetchInterval: 300000,
    })

    /* information about managers of hotel */
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
        },
    ]

    /* some information of home page */
    const home_more_infomation = [
        {
            title: `${t('home.introduce_side_infor_box_mission_title')}`,
            description: `${t(
                'home.introduce_side_infor_box_mission_description'
            )}`,
        },
        {
            title: `${t('home.introduce_side_infor_box_service_title')}`,
            description: `${t(
                'home.introduce_side_infor_box_service_description'
            )}`,
        },
        {
            title: `${t('home.introduce_side_infor_box_history_title')}`,
            description: `${t(
                'home.introduce_side_infor_box_history_description'
            )}`,
        },
    ]

    const { Meta } = Card
    let navigate = useNavigate()

    /* if error when call api -> display this */
    if (isError) return <Error description={error.message} />

    return (
        <>
            {/* set title of page */}
            {/* <PageTitle title={t('title.title_home')} /> */}

            {/* Slider UI part */}
            <Slider />

            {/* body Home UI part */}
            <div className="container mt-4">
                <h3
                    className="font-weight-bold text-center"
                    data-aos="fade-down"
                >
                    {t('home.introduce_room_title')}
                </h3>
                <p className="text-center" data-aos="fade-up">
                    {t('home.introduce_room_description')}
                </p>
                <div className="row">
                    {isLoading ? (
                        <div className="col-lg-12 col-sm-6 col-xs-12 mt-3 mb-3 d-flex justify-content-center mt-5">
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Spin tip="Loading" size="large">
                                    <div className="content" />
                                </Spin>
                            </Space>
                        </div>
                    ) : (
                        // Check if data exist => display the data
                        data &&
                        data.length > 0 &&
                        // Display data in range - for Pagination
                        data.slice(0, 3).map((el, index) => (
                            <div
                                data-aos="fade-right"
                                className="col-lg-4 col-sm-6 col-xs-12 mt-3 mb-3"
                                key={index}
                            >
                                <Card
                                    style={{ overflow: 'hidden' }}
                                    onClick={() =>
                                        navigate(`/detail?roomID=${el.id}`)
                                    }
                                    hoverable
                                    cover={
                                        <img
                                            className="img_rooms"
                                            alt="img"
                                            src={slide_img1}
                                            style={{
                                                borderBottom: '1px solid #000',
                                            }}
                                        />
                                    }
                                >
                                    <Skeleton loading={isLoading} avatar active>
                                        <Meta
                                            title={el.name}
                                            description={el.description}
                                            className="mt-1"
                                        />
                                        <Meta
                                            title={`$ ${el.price}`}
                                            className="mt-2 contain_price"
                                        />
                                    </Skeleton>
                                </Card>
                            </div>
                        ))
                    )}

                    <div className="contain_btn_link col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                        <Link to="/rooms" className="home_link">
                            {t('home.introduce_room_seemore')}
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container mt-4">
                <h3
                    className="font-weight-bold text-center"
                    data-aos="fade-down"
                >
                    {t('home.introduce_member_title')}
                </h3>
                <Row
                    gutter={[0, 24]}
                    justify="space-around"
                    className="contain_member"
                >
                    <Col md={23} xs={23}>
                        <div className="contain_title_manager ml-5">
                            <p className="title_manager" data-aos="fade-right">
                                {t('home.introduce_member_subtitle')}
                            </p>
                        </div>
                    </Col>
                    {home_staff.map((el, index) => (
                        <Col
                            lg={5}
                            sm={10}
                            xs={24}
                            key={index}
                            data-aos="fade-right"
                        >
                            <Card
                                className="mb-4"
                                style={{
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                }}
                                hoverable
                                cover={<img alt="example" src={el.avatar} />}
                            >
                                <Meta
                                    title={el.name}
                                    description={el.position}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="contain_btn_link col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-center">
                    <Link to="/about" className="home_link">
                        {t('home.introduce_member_seemore')}
                    </Link>
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="home_more">
                        <div className="col-lg-12 col-sm-12 col-xs-12 home_more_header">
                            <div className="row">
                                <h3
                                    className="col-lg-6 col-sm-6 col-xs-12 home_more_header_content"
                                    data-aos="fade-right"
                                >
                                    {t('home.introduce_side_infor_title')}
                                </h3>
                                <p
                                    className="col-lg-6 col-sm-6 col-xs-12 home_more_header_content"
                                    data-aos="fade-right"
                                >
                                    {t('home.introduce_side_infor_description')}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-sm-12 col-xs-12 home_more_content">
                            {home_more_infomation.map((el, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-right"
                                    className="home_more_content_box"
                                >
                                    <Card
                                        className="home_more_content_card"
                                        hoverable
                                    >
                                        <Meta
                                            title={el.title}
                                            description={el.description}
                                        />
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* button to scroll to top of page */}
            <ScrollToTop />

        </>
    )
}

export default Home
