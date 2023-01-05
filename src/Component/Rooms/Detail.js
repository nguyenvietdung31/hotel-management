import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useQuery } from 'react-query'
import { setRoomBooked } from '../../Redux/Slice/roomSlice'
import { useTranslation } from 'react-i18next'
import { getRoomData } from '../../Service/Room_service/API_Service'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'
import BeAtTop from '../Utilities/BeAtTop'
import ScrollToTop from '../Utilities/ScrollToTop'
import PageTitle from '../Utilities/PageTitle'
import AosAnimation from '../Utilities/AosAnimation'
import Loader from '../Utilities/Loader'
import Error from '../Utilities/Error'
import './Detail.scss'
import { DatePicker, Space, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import customParseFormat from "dayjs/plugin/customParseFormat"
import dayjs from "dayjs";


dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker;

function Detail() {

    /* API */
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

    /* get token from localStorage */
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

    /* to call the action in reducer */
    const dispatch = useDispatch()

    /* date booked of room */
    const [bookDate, setBookDate] = useState({
        startDate: null,
        endDate: null,
    })

    /* Status that chose date */
    const [dateChosen, setDateChosen] = useState(false)

    // searchParams return a object
    const [searchParams, setSearchParams] = useSearchParams()
    const roomID = Number(searchParams.get("roomID"))

    let navigate = useNavigate()

    /* i18next */
    const { t, i18n } = useTranslation()

    // Fetcher function
    const getData = async () => {
        const res = await getRoomData(roomID)
        return res
    }

    // Using the hook
    const { data, error, isLoading, isError } = useQuery('Room', getData, { refetchInterval: 300000 })

    /* To disable date that booked */
    const disabledDate = (current) => {
        for (let i = 0; i < data.order.length; i++) {
            if (current >= dayjs(data.order[i].startDate) && current <= dayjs(data.order[i].endDate))
                return true
        }
        return false
    }

    /* after choosing date */
    const handleChangeDate = (dayjs, stringDate) => {
        setBookDate({
            startDate: stringDate[0].trim(),
            endDate: stringDate[1].trim()
        })

        setDateChosen(true)

        /* set current value of booked room */
        dispatch(setRoomBooked({
            name: data.name,
            price: data.price,
            size: data.size,
            bed: data.bed,
            type: data.type,
            startDate: stringDate[0],
            endDate: stringDate[1]
        }))

    }

    /* while loading data -> display this */
    if (isLoading) return <Loader />

    /* if error when call api -> display this */
    if(isError) return <Error description={error.message} />

    return (
        <>
            {/* set title of page */}
            <PageTitle title={t('title.title_detail')} />

            {/* animation with aos */}
            <AosAnimation />

            {/* Header UI part */}
            <Header />

            {/* Body Detail UI part */}

            <div className="container wrap_detail">
                <div className="row">
                    <div className="col-lg-8 col-sm-12 col-xs-12">
                        <div data-aos="fade-right" id="myCarousel" className="carousel slide contain_slider mt-5" data-ride="carousel">

                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className='img_slider' src={data.avatar} alt="Los Angeles" />
                                </div>
                                <div className="carousel-item">
                                    <img className='img_slider' src={data.avatar} alt="Chicago" />
                                </div>
                                <div className="carousel-item">
                                    <img className='img_slider' src={data.avatar} alt="New York" />
                                </div>
                                <div className="carousel-item">
                                    <img className='img_slider' src={data.avatar} alt="New York" />
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
                                <Skeleton loading={isLoading} active>
                                    <div className="title" data-aos="fade-left">
                                        <p className='room_name font-weight-bold'>{data.name}</p>
                                        <p className='room_price font-weight-bold'>${data.price} / {t('detail.detail_night')}</p>
                                    </div>
                                </Skeleton>

                                <div className="row">
                                    <div data-aos="fade-right" className="description col-lg-8 col-sm-6 col-xs-12">
                                        <Skeleton loading={isLoading} active>
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
                                                        <td>{data.type}</td>
                                                        <td>{data.bed}</td>
                                                        <td>{data.size} m²</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Skeleton>

                                        <div data-aos="fade-right" className="item_description mt-4">
                                            <p className='item_description_title font-weight-bold'>{t('detail.detail_description')}</p>
                                            <Skeleton loading={isLoading} active>
                                                <p className='room_description'>{data.description}</p>
                                            </Skeleton>

                                        </div>
                                    </div>
                                    <div className="wrap_room_services col-lg-4 col-sm-6 col-xs-12">
                                        <Skeleton loading={isLoading} active>
                                            <div data-aos="fade-right" className="room_services">
                                                <p className="room_services_title font-weight-bold">{t('detail.detail_room_service')}</p>
                                                <ul>
                                                    {
                                                        data.services && data.services.length > 0 &&
                                                        data.services.map((item, index) => (
                                                            <li key={index}><FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-success' />{item}</li>
                                                        ))
                                                    }
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
                                            required

                                            /* check logged in. If logged => disabled = false, else disabled = true */
                                            disabled={accessToken ? false : true}
                                        />
                                    </Space>

                                </div>
                            </div>
                            <div className="wrap_button">
                                <button className='btn btn-success' disabled={accessToken && dateChosen ? false : true}
                                    onClick={() => navigate('/booking_form')}
                                >
                                    {t('detail.detail_reservation_button_book')}
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Body Detail UI part */}

            <ScrollToTop />
            {/* Footer UI part */}
            <Footer />
            <BeAtTop />

        </>
    )
}

export default Detail