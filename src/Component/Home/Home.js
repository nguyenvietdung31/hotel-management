import Slider from "../Utilities/Slider"
import { Card, Row, Col } from "antd";
import slide_img1 from '../../Image/slide_img_1.jpg'
import { useNavigate } from "react-router-dom";
import './Home.scss'


function Home() {
    let home_room = [
        {
            title: "Luxury room 1",
            description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable.",
            price: '500$',
        },
        {
            title: "Luxury room 2",
            description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable.",
            price: '250$',
        },
        {
            title: "Luxury room 3",
            description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable.",
            price: '300$',
        },
        //{ title: "Luxury room 4", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },

    ];
    const home_staff = [
        {
            name: 'Nguyen Viet Dung',
            position: 'Front-end Developer',
            avatar: "https://cdn3.vectorstock.com/i/thumb-large/68/97/programmer-computer-expert-rgb-color-icon-vector-37206897.jpg",
        },
        {
            name: 'Nguyen Minh Thanh',
            position: 'Front-end Developer',
            avatar: "https://cdn3.vectorstock.com/i/thumb-large/68/97/programmer-computer-expert-rgb-color-icon-vector-37206897.jpg",
        },
        {
            name: 'Pham Tung Duong',
            position: 'Back-end Developer',
            avatar: "https://cdn3.vectorstock.com/i/thumb-large/68/97/programmer-computer-expert-rgb-color-icon-vector-37206897.jpg",
        },
        {
            name: 'Nguyen Cung Ung',
            position: 'Back-end Developer',
            avatar: "https://cdn3.vectorstock.com/i/thumb-large/68/97/programmer-computer-expert-rgb-color-icon-vector-37206897.jpg",
        }
        ,
    ]
    const home_more_infomation = [
        {
            title: 'Mission',
            description: 'We bring you the best palace for you to have a happy holiday with your family and lover. Your contribution and support is the driving force for us to grow stronger every day',
        },
        {
            title: 'Service',
            description: 'We have the best services for you: Private bathroom. Free wifi. Beach view. Free Lunch and Dinner, Wonderful Landscape,...',
        },
        {
            title: 'History',
            description: 'Founded in 2010, our goal is to become one of the largest hotel business groups in the world.Currently, there are more than 50 facilities spread across the country. In the next 5 years, we will have 20 to 25 more facilities. We look forward to your support.',
        },
    ]
    const { Meta } = Card
    let navigate = useNavigate()

    return (
        <>
            <Slider />
            <hr />
            <div className="container mt-4">
                <h3 className="font-weight-bold text-center">Watch Our Room</h3>
                <p className="text-center">We have many rooms, all types, prices for you to choose </p>
                <div className="row">
                    {
                        // Check if data exist => display the data
                        home_room && home_room.length > 0 &&
                        // Display data in range - for Pagination
                        home_room.map((el, index) => (
                            <div className="col-lg-4 col-sm-6 col-xs-12 mt-3 mb-3" key={index}>
                                <Card style={{ overflow: 'hidden' }}
                                    onClick={() => navigate(`/detail?roomID=1`, { replace: true })}
                                    hoverable
                                    cover={<img className="img_rooms" alt="example" src={slide_img1} />}
                                >
                                    <Meta title={el.title} description={el.description} className="mt-1" />
                                    <Meta title={el.price} className="mt-2 contain_price" />
                                </Card>
                            </div>
                        ))
                    }
                </div>

                <a href="/rooms" className="home_link">See more Rooms</a>
            </div>
            <hr />
            <div className="container mt-4">
                <h3 className="font-weight-bold text-center">Our Staff</h3>
                <Row gutter={[0, 24]} justify="space-around" className='contain_member'>
                    <Col md={23} xs={23}><div className='contain_title_manager ml-5'>
                        <p className='title_manager'>This is our developer team</p>
                    </div>
                    </Col>
                    {
                        home_staff.map((el, index) => (
                            <Col lg={5} sm={10} xs={24} key={index}>
                                <Card className='mb-4 '
                                    hoverable
                                    cover={<img alt="example" src={el.avatar} />}
                                >
                                    <Meta title={el.name} description={el.position} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <a href="/about" className="home_link">Discover more about us</a>
            </div>
            <div className="container">
                <div className="home_more">
                    <div className="home_more_header">
                        <h3 className="home_more_header_content">Side Information</h3>
                        <p className="home_more_header_content">Our company was established in 2010, located in 187 Nguyen Luong Bang, Dong Da, Ha Noi. 
                        Currently, it has expanded and has over 100 employees.
                        Contact us by email: abc@def.xyz or phone number: 0000.111.222
                        </p>
                    </div>
                    <div className="home_more_content">
                        {
                            home_more_infomation.map((el, index) => (
                                <div>
                                    <Card key={index}
                                        className="home_more_content_box"
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
        </>
    )
}

export default Home