import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'
import slide_img1 from '../../Image/slide_img_1.jpg'
import slide_img2 from '../../Image/slide_img_2.jpg'
import slide_img3 from '../../Image/slide_img_3.jpg'
import slide_img4 from '../../Image/slide_img_4.jpg'
import './Detail.scss'
import { DatePicker, Space, Select } from 'antd';

const { RangePicker } = DatePicker;

function Detail() {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    return (
        <>
            {/* Header UI part */}
            <Header />

            {/* Body Detail UI part */}

            <div className="container wrap_detail">
                <div className="row">
                    <div className="col-lg-8 col-sm-12 col-xs-12">
                        <div id="myCarousel" class="carousel slide contain_slider mt-5" data-ride="carousel">

                            {/* Slider */}
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img className='img_slider' src={slide_img1} alt="Los Angeles" />
                                </div>
                                <div class="carousel-item">
                                    <img className='img_slider' src={slide_img2} alt="Chicago" />
                                </div>
                                <div class="carousel-item">
                                    <img className='img_slider' src={slide_img3} alt="New York" />
                                </div>
                                <div class="carousel-item">
                                    <img className='img_slider' src={slide_img4} alt="New York" />
                                </div>
                            </div>

                            {/* Left and right controls */}
                            <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </a>
                            <a class="carousel-control-next" href="#myCarousel" data-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </a>
                        </div>

                        <div className="about_room">
                            <div className="title">
                                <p className='room_name font-weight-bold'>Luxury Room 1</p>
                                <p className='room_price font-weight-bold'>$250 / Night</p>
                            </div>
                            <div className="description">
                                <p className='room_description'>This is a luxury room with many grate service, beautiful view. It will make you relaxable.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-12 col-xs-12">
                        <div className="wrap_reservation mt-5">
                            <div className="heading">
                                <p className='mb-0 font-weight-bold'>Your Reservation</p>
                            </div>

                            <div className="check_in_out_reservation">
                                <p className='mb-1 pl-1 font-weight-bold'>Date</p>
                                <div className=''>
                                    <Space direction="vertical" size={12}>
                                        <RangePicker placeholder={['Check In', 'Check Out']} />
                                    </Space>
                                </div>
                            </div>
                            <hr />
                            <div className="select_room">
                                <p className='mb-1 pl-1 font-weight-bold'>Number of rooms</p>
                                <Select defaultValue={1}
                                    style={{
                                        width: 100,
                                    }}
                                    options={[
                                        { value: 1, label: 1 },
                                        { value: 2, label: 2 },
                                        { value: 3, label: 3 },
                                    ]}
                                />
                            </div>
                            <hr />
                            <div className="wrap_button">
                                <button className='btn btn-warning'>Check Availability</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            {/* Body Detail UI part */}

            {/* Footer UI part */}
            <Footer />
        </>
    )
}

export default Detail