import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../Utilities/Slider"
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";
import BeAtTop from "../Utilities/BeAtTop";
import axios from "axios";
import AOS from 'aos'
import './Rooms.scss'
import { Pagination, Card, Select, Input, Slider as Slide, Space, Spin, Skeleton, Radio } from 'antd';

const { Meta } = Card


function Rooms() {
    /* API */
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

    /* list data room */
    const [allRooms, setAllRooms] = useState([])
    const [allRoomsFilter, setAllRoomsFilter] = useState([])

    /* Loading when call data from api */
    const [loading, setLoading] = useState(false)

    /* Decide when recall useEffect */
    const [refresh, setRefresh] = useState(false)
    const [type, setType] = useState('all')
    const [search, setSearch] = useState('')
    const [sortType, setSortType] = useState('DF')

    // Initialize the page size options
    const pageSizeOpt = [6, 9, 12]

    // Initialize the min and max element to display elements in range.
    // Use in Pagination
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(pageSizeOpt[0])

    /* Initialize minPrice and maxPrice => to filter */
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)


    // using this to redirect to another page
    const navigate = useNavigate()

    

    /* when 'refresh' change => call getAllData() again to refresh new data */
    useEffect(() => {
        getAllData()
    }, [refresh])

    // set time for aos animation
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    /* Get data from api */
    const getAllData = async () => {
        setLoading(true)
        await axios.get(API)
            .then(resp => {
                setAllRooms(resp.data)
                setAllRoomsFilter(resp.data)

                /* after get data, set loading to False */
                setLoading(false)
            }
            )
    }

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
                (room.price <= maxPrice)
            ))
        }
        else {
            setAllRooms(allRoomsFilter.filter(room =>
                (room.type.toLowerCase() === type) &&
                (room.price >= minPrice) &&
                (room.price <= maxPrice)
            ))
        }
    }

    /* to search rooms by name */
    const handleSearch = value => {
        setSearch(value)
        setAllRooms(allRoomsFilter.filter(room => room.name.toLowerCase().includes(value.toLowerCase())))
    }

    /* when change value of Price slider => update value of minPrice and maxPrice  */
    const handleChangePrice = value => {
        setMinPrice(value[0])
        setMaxPrice(value[1])
        setSortType('DF')

        if (type !== 'all')
            setAllRooms(allRoomsFilter.filter(item => item.price >= value[0] &&
                item.price <= value[1] &&
                item.type.toLowerCase() === type.toLowerCase()
            ))
        else
            setAllRooms(allRoomsFilter.filter(item => item.price >= value[0] &&
                item.price <= value[1]
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

    return (
        <>
            {/* Header part */}
            <Header />

            {/* Slider part */}
            <Slider />

            {/* Body UI part of the Rooms component */}
            <div className="container mt-5 contain_body">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 contain_title_room">
                        <p className="text-uppercase font-weight-bold title_room" style={{ fontSize: '25px' }}>Rooms</p>
                    </div>

                    <div className="col-lg-3 col-md-12 col-xs-12">
                        <div className="contain_filter pl-2 pr-2">

                            <Input placeholder="Input to search..." onChange={(e) => handleSearch(e.target.value)} value={search} />

                            <div className="category">
                                <div className="category_title font-weight-bold mb-3">Type</div>

                                <Radio.Group onChange={(e) => handleFilter(e.target.value)} value={type}>
                                    <Radio className="mt-2 mb-2" value='all'>All</Radio><br />
                                    <Radio className="mt-2 mb-2" value='standard'>Standard</Radio><br />
                                    <Radio className="mt-2 mb-2" value='superior'>Superior</Radio><br />
                                    <Radio className="mt-2 mb-2" value='deluxe'>Deluxe</Radio><br />
                                    <Radio className="mt-2 mb-2" value='suite'>Suite</Radio><br />
                                </Radio.Group>
                            </div>

                            <div className="range_price">
                                <div className="price_title font-weight-bold">Price</div>
                                <p>${minPrice} - ${maxPrice}</p>
                                <Slide range defaultValue={[minPrice, maxPrice]} value={[minPrice, maxPrice]} max={1000} min={0} placement='bottom' onChange={handleChangePrice} />
                            </div>

                            <div className="wrap_clear_filter">
                                <button className="btn btn-outline-danger" onClick={handleClearFilter}>Clear Filter</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="contain_head_rooms">
                                    <p>{allRooms.length || 0} Rooms</p>
                                    <div className="line"></div>
                                    <div>Sort By
                                        <Select value={sortType}
                                            style={{
                                                width: 'fit-content',
                                                marginLeft: '10px',
                                            }}
                                            onChange={handleSort}
                                            options={[
                                                { value: 'DF', label: 'Default' },
                                                { value: 'PA', label: 'Price (Asc)' },
                                                { value: 'PD', label: 'Price (Desc)' },
                                                { value: 'AA', label: 'Name (A-Z)' },
                                                { value: 'AD', label: 'Name (Z-A)' },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* loop rooms here */}
                            {
                                loading ?
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
                                                    onClick={() => navigate(`/detail?roomID=${val.id}`, { replace: true })}
                                                    hoverable
                                                    cover={<img className="img_rooms" alt="example" src={val.avatar} />}
                                                >
                                                    <Skeleton loading={loading} avatar active>
                                                        <Meta title={val.name} description={val.description} className="mt-1" />
                                                        <Meta title={`Type: ${val.type}`} className="mt-2" />
                                                        <Meta title={`Price: $${val.price}`} className="mt-2 contain_price" />
                                                    </Skeleton>
                                                </Card>
                                            </div>
                                        ))

                                        : <div className="contain_no_room_found"><p className="no_room_found font-weight-bold">There is no room!</p></div>
                                    )
                            }

                            {/* Pagination part */}
                            {
                                !loading && allRooms && allRooms.length > 0 &&
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