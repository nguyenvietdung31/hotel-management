import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import Slider from "../Utilities/Slider"
import ScrollToTop from "../Utilities/ScrollToTop";
import PageTitle from "../Utilities/PageTitle";
import BeAtTop from "../Utilities/BeAtTop";
import AosAnimation from '../Utilities/AosAnimation'
import axios from "axios";
import './Rooms.scss'
import {
    Pagination, Card, Select, Input, Slider as Slide,
    Space, Spin, Skeleton, Radio, Empty
} from 'antd';
import { useQuery } from "react-query";
import Loader from "../Utilities/Loader";
import Error from "../Utilities/Error";
const { Meta } = Card


function Rooms() {
    /* API */
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

    /* list data room */
    const [allRooms, setAllRooms] = useState([])
    const [allRoomsFilter, setAllRoomsFilter] = useState([])

    /* State for filtering */
    const [type, setType] = useState('all')
    const [search, setSearch] = useState('')
    const [sortType, setSortType] = useState('DF')

    /* Initialize minPrice and maxPrice => to filter */
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)

    // Initialize the page size options
    const pageSizeOpt = [6, 9, 12]

    // Initialize the min and max element to display elements in range.
    // Use in Pagination
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(pageSizeOpt[0])

    /* i18next */
    const { t, i18n } = useTranslation()

    // using this to redirect to another page
    const navigate = useNavigate()

    // Fetcher function
    const getAllData = async () => {
        const res = await axios.get(API)
        setAllRooms(res.data)
        setAllRoomsFilter(res.data)
        return res.data
    }

    // Using the hook
    const { data, error, isLoading, isError } = useQuery('Rooms', getAllData, { refetchInterval: 300000 })


    /* handle sort ascending or descending by name or price */
    const handleSort = (sort_type) => {
        setSortType(sort_type)
        switch (sort_type) {
            /* Default */
            case 'DF':
                setAllRooms(allRooms.slice().sort((a, b) => a.id - b.id))
                break;

            /* Sort Price Asc */
            case 'PA':
                setAllRooms(allRooms.slice().sort((a, b) => a.price - b.price))
                break

            /* Sort Price Desc */
            case 'PD':
                setAllRooms(allRooms.slice().sort((a, b) => b.price - a.price))
                break

            /* Sort name Alphabet Asc */
            case 'AA':
                setAllRooms(allRooms.slice().sort((a, b) => {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    return (x < y) ? -1 : 1
                }))
                break

            /* Sort name Alphabet Desc */
            case 'AD':
                setAllRooms(allRooms.slice().sort((a, b) => {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    return (x < y) ? 1 : -1
                }))
                break

            default:
                throw new Error('Invalid')
        }
    }

    /* handle filter with TYPE of room: '..' */
    const handleFilter = (type) => {
        setType(type)
        setSortType('DF')

        if (type === 'all') {
            setAllRooms(allRoomsFilter.filter(room =>
                (room.price >= minPrice) &&
                (room.price <= maxPrice) &&
                (room.name.toLowerCase().includes(search.toLowerCase()))
            ))
        }
        else {
            setAllRooms(allRoomsFilter.filter(room =>
                (room.type.toLowerCase() === type) &&
                (room.price >= minPrice) &&
                (room.price <= maxPrice) &&
                (room.name.toLowerCase().includes(search.toLowerCase()))
            ))
        }
    }

    /* to search rooms by name */
    const handleSearch = value => {
        setSearch(value)
        if (value !== '') {
            handleFilter(type)
            setAllRooms(allRooms.filter(room => room.name.toLowerCase().includes(value.toLowerCase())))
        }
        else {
            handleFilter(type)
        }
    }

    /* when change value of Price slider => update value of minPrice and maxPrice  */
    const handleChangePrice = value => {
        setMinPrice(value[0])
        setMaxPrice(value[1])
        setSortType('DF')

        if (type !== 'all')
            setAllRooms(allRoomsFilter.filter(item => item.price >= value[0] &&
                item.price <= value[1] &&
                item.type.toLowerCase() === type.toLowerCase() &&
                (item.name.toLowerCase().includes(search.toLowerCase()))
            ))
        else
            setAllRooms(allRoomsFilter.filter(item => item.price >= value[0] &&
                item.price <= value[1] &&
                (item.name.toLowerCase().includes(search.toLowerCase()))
            ))
    }

    /* clear all filter */
    const handleClearFilter = () => {
        setAllRooms(allRoomsFilter)
        setMinPrice(0)
        setMaxPrice(1000)
        setSortType('DF')
        setType('all')
        setSearch('')
    }

    /*  Pagination: change the page number or page size 
        => display the current page in range            */
    const handleChangePageSize = (pageNumber, pageSize) => {
        setMinValue((pageNumber - 1) * pageSize)
        setMaxValue(pageNumber * pageSize)
    }

    /* while loading data -> display this */
    if(isLoading) return <Loader />

    /* if error when call api -> display this */
    if(isError) return <Error />

    return (
        <>
            {/* set title of page */}
            <PageTitle title={t('title.title_rooms')} />

            {/* animation with aos */}
            <AosAnimation />

            {/* Header part */}
            <Header />

            {/* Slider part */}
            <Slider />

            {/* Body UI part of the Rooms component */}
            <div className="container mt-5 contain_body">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 contain_title_room">
                        <p className="text-uppercase font-weight-bold title_room" style={{ fontSize: '25px' }}>{t('rooms.rooms_title')}</p>
                    </div>

                    <div className="col-lg-3 col-md-12 col-xs-12">
                        <div className="contain_filter pl-2 pr-2">

                            <Input placeholder={t('rooms.rooms_input_search')} onChange={(e) => handleSearch(e.target.value)} value={search} />

                            <div className="category">
                                <div className="category_title font-weight-bold mb-3">{t('rooms.rooms_type_title')}</div>

                                <Radio.Group onChange={(e) => handleFilter(e.target.value)} value={type}>
                                    <Radio className="mt-2 mb-2" value='all'>{t('rooms.rooms_type_item1')}</Radio><br />
                                    <Radio className="mt-2 mb-2" value='standard'>{t('rooms.rooms_type_item2')}</Radio><br />
                                    <Radio className="mt-2 mb-2" value='superior'>{t('rooms.rooms_type_item3')}</Radio><br />
                                    <Radio className="mt-2 mb-2" value='deluxe'>{t('rooms.rooms_type_item4')}</Radio><br />
                                    <Radio className="mt-2 mb-2" value='suite'>{t('rooms.rooms_type_item5')}</Radio><br />
                                </Radio.Group>
                            </div>

                            <div className="range_price">
                                <div className="price_title font-weight-bold">{t('rooms.rooms_price_title')}</div>
                                <p>${minPrice} - ${maxPrice}</p>
                                <Slide range defaultValue={[minPrice, maxPrice]} value={[minPrice, maxPrice]} max={1000} min={0} placement='bottom' onChange={handleChangePrice} />
                            </div>

                            <div className="wrap_clear_filter">
                                <button className="btn btn-outline-danger" onClick={handleClearFilter}>{t('rooms.rooms_clear_filter')}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="contain_head_rooms">
                                    <p>{allRooms.length || 0} {t('rooms.rooms_title')}</p>
                                    <div className="line"></div>
                                    <div>{t('rooms.rooms_sortBy')}
                                        <Select value={sortType}
                                            style={{
                                                width: 'fit-content',
                                                marginLeft: '10px'
                                            }}
                                            onChange={handleSort}
                                            options={[
                                                { value: 'DF', label: `${t('rooms.rooms_sort_option1')}` },
                                                { value: 'PA', label: `${t('rooms.rooms_sort_option2')}` },
                                                { value: 'PD', label: `${t('rooms.rooms_sort_option3')}` },
                                                { value: 'AA', label: `${t('rooms.rooms_sort_option4')}` },
                                                { value: 'AD', label: `${t('rooms.rooms_sort_option5')}` },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* loop rooms here */}
                            {
                                isLoading ?
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
                                    /* Check if data exist => display the data */
                                    (allRooms && allRooms.length > 0 ?
                                        /* Display data in range - for Pagination */
                                        allRooms.slice(minValue, maxValue).map((val, index) => (
                                            <div className="col-lg-4 col-sm-6 col-xs-12 mt-3 mb-3" key={index}>
                                                <Card style={{ overflow: 'hidden' }} loading={val !== undefined ? false : true}
                                                    onClick={() => navigate(`/detail?roomID=${val.id}`)}
                                                    hoverable
                                                    cover={<img className="img_rooms" alt="example" src={val.avatar} />}
                                                >
                                                    <Skeleton loading={isLoading} avatar active>
                                                        <Meta title={val.name} description={val.description} className="mt-1" />
                                                        <Meta title={`Type: ${val.type}`} className="mt-2" />
                                                        <Meta title={`Price: $${val.price}`} className="mt-2 contain_price" />
                                                    </Skeleton>
                                                </Card>
                                            </div>
                                        ))

                                        : <div className="contain_no_room_found">
                                            <Empty description={t('rooms.rooms_empty')} />
                                        </div>
                                    )
                            }

                            {/* Pagination part */}
                            {
                                !isLoading && allRooms && allRooms.length > 0 &&
                                <div data-aos="fade-right" className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center mt-5 mb-5">
                                    <Pagination
                                        showSizeChanger
                                        total={allRooms.length}
                                        defaultPageSize={pageSizeOpt[0]}
                                        pageSizeOptions={pageSizeOpt}
                                        onChange={handleChangePageSize}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* End body UI part of the Rooms component */}

            {/* scroll to top */}
            <ScrollToTop />

            {/* Footer part */}
            <Footer />
            <BeAtTop />
        </>
    )
}

export default Rooms