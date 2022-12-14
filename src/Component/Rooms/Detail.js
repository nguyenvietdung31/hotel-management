import { useState, useEffect } from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'
import slide_img1 from '../../Image/slide_img_1.jpg'
import slide_img2 from '../../Image/slide_img_2.jpg'
import slide_img3 from '../../Image/slide_img_3.jpg'
import slide_img4 from '../../Image/slide_img_4.jpg'
import './Detail.scss'
import AOS from 'aos'
import { DatePicker, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker;

function Detail() {

    // const [listDate, setListDate] = useState(['2022-12-14', '2022-12-15','2022-12-20']);
    
    // set time for aos animation
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    /* To disable date that booked */
    const disabledDate = (current) => {
        const arr = [
            {
                startDate: "2022-12-13",
                endDate: "2022-12-15"
            },
            {
                startDate: "2022-12-18",
                endDate: "2022-12-19"
            },
            {
                startDate: "2022-12-22",
                endDate: "2022-12-24"
            }
        ];

        for (let i = 0; i < arr.length; i++) {
            if (current >= dayjs(arr[i].startDate) && current <= dayjs(arr[i].endDate))
                return true;
        }
        return false;
    };

    return (
        <>
            {/* Header UI part */}
            <Header />

            {/* Body Detail UI part */}

            <div className="container wrap_detail">
                <div className="row">
                    <div className="col-lg-8 col-sm-12 col-xs-12">
                        <div data-aos="fade-right" id="myCarousel" className="carousel slide contain_slider mt-5" data-ride="carousel">

                            {/* Slider */}
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className='img_slider' src={slide_img1} alt="Los Angeles" />
                                </div>
                                <div className="carousel-item">
                                    <img className='img_slider' src={slide_img2} alt="Chicago" />
                                </div>
                                <div className="carousel-item">
                                    <img className='img_slider' src={slide_img3} alt="New York" />
                                </div>
                                <div className="carousel-item">
                                    <img className='img_slider' src={slide_img4} alt="New York" />
                                </div>
                            </div>

                            {/* Left and right controls */}
                            <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                            </a>
                            <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                                <span className="carousel-control-next-icon"></span>
                            </a>
                        </div>

                        <div className="row">
                            <div className="about_room col-lg-12 col-sm-12 col-xs-12">
                                <div className="title" data-aos="fade-left">
                                    <p className='room_name font-weight-bold'>Luxury Room 1</p>
                                    <p className='room_price font-weight-bold'>$250 / Night</p>
                                </div>
                                <div className="row">
                                    <div data-aos="fade-right" className="description col-lg-8 col-sm-6 col-xs-12">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>Bed</th>
                                                    <th>Size</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Standard</td>
                                                    <td>1 double bed</td>
                                                    <td>20 m²</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div data-aos="fade-right" className="item_description mt-4">
                                            <p className='item_description_title font-weight-bold'>Description</p>
                                            <p className='room_description'>This is a luxury room with many grate service, beautiful view. It will make you relaxable.</p>
                                        </div>
                                    </div>
                                    <div className="wrap_room_services col-lg-4 col-sm-6 col-xs-12">
                                        <div data-aos="fade-right" className="room_services">
                                            <p className="room_services_title font-weight-bold">Room Services</p>
                                            <ul>
                                                <li><FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-success' />Private bathroom</li>
                                                <li><FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-success' />Free Wifi</li>
                                                <li><FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-success' />Free Lunch</li>
                                                <li><FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-success' />Bottled Mineral Water</li>
                                                <li><FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-success' />Hot/Cold Shower & Bathtub</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-8 col-xs-12">
                        <div data-aos="fade-up" className="wrap_reservation mt-5">
                            <div className="heading">
                                <p className='mb-0 font-weight-bold'>Your Reservation</p>
                            </div>

                            <div className="check_in_out_reservation">
                                <div className='wrap_title_rangepicker'>
                                    <p className='mb-2 font-weight-bold'>Date</p>
                                </div>
                                <div className='wrap_rangepicker'>
                                    <Space direction="vertical" size={12} style={{width: '100%'}}> 
                                        <RangePicker style={{width: '100%'}}
                                            size='large'
                                            placeholder={['Check In', 'Check Out']}
                                            disabledDate={disabledDate}
                                        />
                                    </Space>

                                </div>
                            </div>
                            <div className="wrap_button">
                                <a href='/reservation' className='btn btn-success'>Book now!</a>
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