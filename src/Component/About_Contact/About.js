import { Col, Row, Card } from 'antd';
import { useEffect } from 'react';
import Header from '../Header_Footer/Header';
import Footer from '../Header_Footer/Footer';
import Slider from '../Utilities/Slider';
import ScrollToTop from '../Utilities/ScrollToTop';
import { useTranslation } from 'react-i18next'
import Loader from '../Utilities/Loader'
import './About.scss'
import AOS from 'aos'
import img_avt_team from '../../Image/img_avt_team.jpg'

/*  to display UI elements */
const { Meta } = Card;

function About() {

    const { t, i18n } = useTranslation();

    // set time for aos animation
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return (
        <>
            {/* Header part */}
            <Header />

            {/* Body UI of About component */}
            <Row>
                <Slider />
                <Col md={24} xs={24}>
                    <div className="contain_title" data-aos="fade-right">
                        <h2 className='welcome'>{t('about.about_welcome')}<span className='hotel_name'>WebIntern Hotel</span></h2>
                        <q className='font-weight-bold' data-aos="fade-down">{t('about.about_welcome_description')}</q>
                    </div>
                </Col>
            </Row>

            <Row gutter={[0, 24]} justify="space-around" className='contain_member'>
                <div className="container">
                    <Row gutter={[0, 24]} justify="space-around">
                        <Col md={23} xs={23}><div data-aos="fade-right" className='contain_title_manager'>
                            <p className='title_manager'>{t('home.introduce_member_subtitle')}</p>
                        </div></Col>
                        <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card1'
                            hoverable

                            cover={<img alt="img" src={img_avt_team} />}
                        >
                            <Meta title={`${t('home.introduce_member_name1')}`} description={`${t('home.introduce_member_front_end')}`} />

                        </Card></Col>
                        <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card2'
                            hoverable

                            cover={<img alt="img" src={img_avt_team} />}
                        >
                            <Meta title={`${t('home.introduce_member_name2')}`} description={`${t('home.introduce_member_front_end')}`} />

                        </Card></Col>
                        <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card3'
                            hoverable

                            cover={<img alt="img" src={img_avt_team} />}
                        >
                            <Meta title={`${t('home.introduce_member_name3')}`} description={`${t('home.introduce_member_back_end')}`} />

                        </Card></Col>
                        <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card4'
                            hoverable

                            cover={<img alt="img" src={img_avt_team} />}
                        >
                            <Meta title={`${t('home.introduce_member_name4')}`} description={`${t('home.introduce_member_back_end')}`} />

                        </Card></Col>
                    </Row>

                </div>
            </Row>
            {/* End body UI of About component */}

            {/* scroll to top */}
            <ScrollToTop />

            {/* Footer part */}
            <Footer />
        </>
    )
}

export default About