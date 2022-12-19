import { useState, useEffect } from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'
import BeAtTop from '../Utilities/BeAtTop'
import './Detail.scss'
import axios from "axios"
import AOS from 'aos'
import { DatePicker, Space, Spin, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useSearchParams } from 'react-router-dom'

dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker;

function Detail() {
    /* API */
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

    const [room, setRoom] = useState({})
    const [loading, setLoading] = useState(false)

    // searchParams return a object
    const [searchParams, setSearchParams] = useSearchParams();
    const roomID = Number(searchParams.get("roomID"))

    /* when 'refresh' change => call getAllData() again to refresh new data */
    useEffect(() => {
        getAllData()
    }, [])

    /* Get data from api */
    const getAllData = async () => {
        setLoading(true)
        await axios.get(`${API}/${roomID}`)
            .then(resp => {
                setRoom(resp.data)

                /* after get data, set loading to False */
                setLoading(false)
            }
            )
    }

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

                            {loading ?
                                <div className="d-flex justify-content-center mt-5" style={{ height: '400px', alignItems: 'center' }}>
                                    <Space direction="vertical"
                                        style={{
                                            width: '100%',
                                        }}>
                                        <Spin tip="Loading" size="large">
                                            <div className="content" />
                                        </Spin>
                                    </Space>
                                </div>
                                :
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img className='img_slider' src={room.avatar} alt="Los Angeles" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className='img_slider' src={room.avatar} alt="Chicago" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className='img_slider' src={room.avatar} alt="New York" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className='img_slider' src={room.avatar} alt="New York" />
                                    </div>
                                </div>
                            }



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
                                <Skeleton loading={loading} active>
                                    <div className="title" data-aos="fade-left">
                                        <p className='room_name font-weight-bold'>{room.name}</p>
                                        <p className='room_price font-weight-bold'>${room.price} / Night</p>
                                    </div>
                                </Skeleton>

                                <div className="row">
                                    <div data-aos="fade-right" className="description col-lg-8 col-sm-6 col-xs-12">
                                        <Skeleton loading={loading} active>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th>Bed</th>
                                                        <th>Size</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{room.type}</td>
                                                        <td>{room.bed}</td>
                                                        <td>{room.size} m²</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Skeleton>

                                        <div data-aos="fade-right" className="item_description mt-4">
                                            <p className='item_description_title font-weight-bold'>Description</p>
                                            <Skeleton loading={loading} active>
                                                <p className='room_description'>{room.description}</p>
                                            </Skeleton>

                                        </div>
                                    </div>
                                    <div className="wrap_room_services col-lg-4 col-sm-6 col-xs-12">
                                        <Skeleton loading={loading} active>
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
                                        </Skeleton>

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
                                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                        <RangePicker style={{ width: '100%' }}
                                            size='large'
                                            placeholder={['Check In', 'Check Out']}
                                            disabledDate={disabledDate}
                                        />
                                    </Space>

                                </div>
                            </div>
                            <div className="wrap_button">
                                <a href='/booking_form' className='btn btn-success'>Book now!</a>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            {/* Body Detail UI part */}

            {/* Footer UI part */}
            <Footer />
            <BeAtTop />

        </>
    )
}

export default Detail