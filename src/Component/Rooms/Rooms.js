import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../Utilities/Slider"
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";
import axios from "axios";
import AOS from 'aos'
import './Rooms.scss'
import { Pagination, Card, Select, Input, Slider as Slide } from 'antd';

const { Meta } = Card


function Rooms() {
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

    const [allRooms, setAllRooms] = useState([])
    const [allRoomsFilter, setAllRoomsFilter] = useState([])

    const [isFilter, setIsFilter] = useState(false)
    const [refresh, setRefresh] = useState(false)

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
    let navigate = useNavigate()

    /* Get data from api */
    useEffect(() => {
        const getData = async () => {
            await axios.get(API)
                .then(resp => {
                    setAllRooms(resp.data)
                })
        }
        getData()
    }, [refresh])

    // set time for aos animation
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    /* handle something */
    const handleSomething = (type, value) => {
        switch (type) {
            case 'SortPA':
                /* do something */
                break;
            case 'SortPD':
                /* do something */
                break;
            case 'SortAA':
                /* do something */
                break;
            case 'SortAD':
                /* do something */
                break;
            case 'doFilter':
                /* do something */
                handleFilter(value)
                break;
            case 'ClearFilter':
                /* do something */
                break;
            default:
                throw new Error('Invalid')
        }
    }
    /* handle filter with type: '..' */
    const handleFilter = (value) => {
        // if (value.toLowerCase() !== 'all') {
            allRooms.filter((item) => value ?
                item.type.toLowerCase() === value.toLowerCase() : item)
        // }
    }

    // Pagination: change the page number or page size 
    // => display the current page in range
    const handleChangePageSize = (pageNumber, pageSize) => {
        setMinValue((pageNumber - 1) * pageSize)
        setMaxValue(pageNumber * pageSize)
    }

    /* to filter rooms depend on category */
    const handleFilterCategory = category => {
        /* Call API to get rooms with suitable category */
    }
    /* when change value of Price slider => update value of minPrice and maxPrice  */
    const handleChangePrice = value => {
        setMinPrice(value[0])
        setMaxPrice(value[1])
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

                            <Input placeholder="Input to search..." />

                            <div className="category">
                                <div className="category_title font-weight-bold">Type</div>
                                <div className="sub_category"
                                    onClick={() => handleSomething('doFilter', 'All')}
                                >All</div>
                                <div className="sub_category"
                                    onClick={() => handleSomething('doFilter', 'Standard')}
                                >Standard</div>
                                <div className="sub_category"
                                    onClick={() => handleSomething('doFilter', 'Superior')}
                                >Superior</div>
                                <div className="sub_category"
                                    onClick={() => handleSomething('doFilter', 'Deluxe')}
                                >Deluxe</div>
                                <div className="sub_category"
                                    onClick={() => handleSomething('doFilter', 'Suite')}
                                >Suite</div>
                            </div>

                            <div className="range_price">
                                <div className="price_title font-weight-bold">Price</div>
                                <p>${minPrice} - ${maxPrice}</p>
                                <Slide range defaultValue={[minPrice, maxPrice]} max={1000} min={0} placement='bottom' onChange={handleChangePrice} />
                            </div>

                            <div className="wrap_clear_filter">
                                <button className="btn btn-outline-danger">Clear Filter</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="contain_head_rooms">
                                    <p>8 Rooms</p>
                                    <div className="line"></div>
                                    <div>Sort By
                                        <Select defaultValue='PD'
                                            style={{
                                                width: 'fit-content',
                                                marginLeft: '10px',
                                            }}
                                            options={[
                                                { value: 'PD', label: 'Price (Desc)' },
                                                { value: 'PA', label: 'Price (Asc)' },
                                                { value: 'AD', label: 'Name (A-Z)' },
                                                { value: 'AA', label: 'Name (Z-A)' },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* loop rooms here */}
                            {
                                /* Check if data exist => display the data */
                                allRooms && allRooms.length > 0 ?

                                    /* Display data in range - for Pagination */
                                    allRooms.slice(minValue, maxValue).map((val, index) => (
                                        <div data-aos="fade-up" className="col-lg-4 col-sm-6 col-xs-12 mt-3 mb-3" key={index}>
                                            <Card style={{ overflow: 'hidden' }} loading={val !== undefined ? false : true}
                                                onClick={() => navigate(`/detail?roomID=1`, { replace: true })}
                                                hoverable
                                                cover={<img className="img_rooms" alt="example" src={val.avatar} />}
                                            >
                                                <Meta title={val.name} description={val.description} className="mt-1" />
                                                <Meta title={`Price: $${val.price}`} className="mt-2 contain_price" />
                                            </Card>
                                        </div>
                                    ))

                                    : <p>There is no room!</p>
                            }

                            {/* Pagination part */}
                            {
                                allRooms && allRooms.length > 0 &&
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
        </>
    )
}

export default Rooms