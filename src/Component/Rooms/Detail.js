import { useState, useEffect } from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'
import BeAtTop from '../Utilities/BeAtTop'
import PageTitle from '../Utilities/PageTitle'
import './Detail.scss'
import axios from "axios"
import AOS from 'aos'
import { DatePicker, Space, Spin, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux"
import { setRoomBooked } from '../../Redux/Slice/roomSlice'


dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker;

function Detail() {

    /* API */
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

    /* to call the action in reducer */
    const dispatch = useDispatch()

    /* room data of detail page */
    const [room, setRoom] = useState({})
    const [loading, setLoading] = useState(false)

    const [bookDate, setBookDate] = useState({
        startDate: null,
        endDate: null
    })

    // searchParams return a object
    const [searchParams, setSearchParams] = useSearchParams()
    const roomID = Number(searchParams.get("roomID"))

    let navigate = useNavigate()

    /* i18next */
    const { t, i18n } = useTranslation()


    /* when 'refresh' change => call getAllData() again to refresh new data */
    useEffect(() => {
        getData()
    }, [])

    /* Get data from api */
    const getData = async () => {
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
            }
        ];

        for (let i = 0; i < arr.length; i++) {
            if (current >= dayjs(arr[i].startDate) && current <= dayjs(arr[i].endDate))
                return true;
        }
        return false;
    }

    /* after choosing date */
    const handleChangeDate = (dayjs, stringDate) => {
        setBookDate({
            startDate: stringDate[0].trim(),
            endDate: stringDate[1].trim()
        })

        /* set current value of booked room */
        dispatch(setRoomBooked({
            name: room.name,
            price: room.price,
            startDate: stringDate[0],
            endDate: stringDate[1]
        }))

    }


    const handleBookRoom = () => {
        navigate(`/booking_form?roomName=${room.name}&startDate=${bookDate.startDate}&endDate=${bookDate.endDate}`)
    }

    return (
        <>
            {/* set title of page */}
            <PageTitle title={t('title.title_detail')} />

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
                                        <p className='room_price font-weight-bold'>${room.price} / {t('detail.detail_night')}</p>
                                    </div>
                                </Skeleton>

                                <div className="row">
                                    <div data-aos="fade-right" className="description col-lg-8 col-sm-6 col-xs-12">
                                        <Skeleton loading={loading} active>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>{t('detail.detail_type')}</th>
                                                        <th>{t('detail.detail_bed')}</th>
                                                        <th>{t('detail.detail_size')}</th>
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
                                            <p className='item_description_title font-weight-bold'>{t('detail.detail_description')}</p>
                                            <Skeleton loading={loading} active>
                                                <p className='room_description'>{room.description}</p>
                                            </Skeleton>

                                        </div>
                                    </div>
                                    <div className="wrap_room_services col-lg-4 col-sm-6 col-xs-12">
                                        <Skeleton loading={loading} active>
                                            <div data-aos="fade-right" className="room_services">
                                                <p className="room_services_title font-weight-bold">{t('detail.detail_room_service')}</p>
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
                                <p className='mb-0 font-weight-bold'>{t('detail.detail_reservation_title')}</p>
                            </div>

                            <div className="check_in_out_reservation">
                                <div className='wrap_title_rangepicker'>
                                    <p className='mb-2 font-weight-bold'>{t('detail.detail_reservation_date')}</p>
                                </div>
                                <div className='wrap_rangepicker'>
                                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                        <RangePicker style={{ width: '100%' }}
                                            size='large'
                                            placeholder={[`${t('detail.detail_reservation_startDate')}`, `${t('detail.detail_reservation_endDate')}`]}
                                            disabledDate={disabledDate}
                                            onChange={handleChangeDate}

                                            /* check logged in. If logged => disabled = false, else disabled = true */
                                            disabled={false}
                                        />
                                    </Space>

                                </div>
                            </div>
                            <div className="wrap_button">
                                <button className='btn btn-success' disabled={bookDate.startDate !== null && bookDate.endDate !== null ? false : true}
                                    onClick={handleBookRoom}
                                >
                                    {t('detail.detail_reservation_button_book')}
                                </button>

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