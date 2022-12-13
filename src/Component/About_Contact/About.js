import { Col, Row, Card } from 'antd';
import { useEffect } from 'react';
import Header from '../Header_Footer/Header';
import Footer from '../Header_Footer/Footer';
import Slider from '../Utilities/Slider';
import ScrollToTop from '../Utilities/ScrollToTop';
import './About.scss'
import AOS from 'aos'

/*  to display UI elements */
const { Meta } = Card;

function About() {

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
                        <h2 className='welcome'>Welcome to<span className='hotel_name'>WebIntern Hotel</span></h2>
                        <q className='font-weight-bold' data-aos="fade-down">Hello there, we're so glad that you visit our website. You will enjoy the most dedicated and modern services here. Believe us and just enjoy the moment as a 'KING'.</q>
                    </div>
                </Col>
            </Row>

            <Row gutter={[0, 24]} justify="space-around" className='contain_member'>
                <Col md={23} xs={23}><div data-aos="fade-right" className='contain_title_manager ml-5'>
                    <p className='title_manager'>Manager</p>
                </div></Col>
                <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card1'
                    hoverable

                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Nguyễn Việt Dũng" description="Front-End" />

                </Card></Col>
                <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card2'
                    hoverable

                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Nguyễn Minh Thanh" description="Front-End" />

                </Card></Col>
                <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card3'
                    hoverable

                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Phạm Tùng Dương" description="Back-End" />

                </Card></Col>
                <Col lg={5} sm={10} xs={24} ><Card data-aos="fade" className='mb-4 card card4'
                    hoverable

                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Nguyễn Cung Ứng" description="Back-End" />

                </Card></Col>
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