import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../Utilities/Slider"
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";
import slide_img1 from '../../Image/slide_img_1.jpg'
import './Rooms.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Rate, Card, Select, Input, Slider as Slide } from 'antd';

const { Meta } = Card

function Rooms() {
    // Initialize the page size options
    const pageSizeOpt = [6, 9, 12]

    // Initialize the min and max element to display elements in range.
    // Use in Pagination
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(pageSizeOpt[0])

    /* Initialize minPrice and maxPrice => to filter */
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)

    /* Initialize minRate and maxRate => to filter */
    const [minRate, setMinRate] = useState(0)
    const [maxRate, setMaxRate] = useState(5)

    // using this to redirect to another page
    let navigate = useNavigate()

    // Demo list data
    let data = [
        { title: "Luxury room 1", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
        { title: "Luxury room 2", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
        { title: "Luxury room 3", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
        { title: "Luxury room 4", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
        { title: "Luxury room 5", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
        { title: "Luxury room 6", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
        { title: "Luxury room 7", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
        { title: "Luxury room 8", description: "This is a luxury room with many grate service, beautiful view. It will make you relaxable." },
    ];

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

                            <Input placeholder="Input to search..."/>

                            <div className="category">
                                <div className="category_title font-weight-bold">Type</div>
                                <div className="sub_category"
                                    onClick={() => handleFilterCategory('all')}
                                >All</div>
                                <div className="sub_category"
                                    onClick={() => handleFilterCategory('standard')}
                                >Standard</div>
                                <div className="sub_category"
                                    onClick={() => handleFilterCategory('superior')}
                                >Superior</div>
                                <div className="sub_category"
                                    onClick={() => handleFilterCategory('deluxe')}
                                >Deluxe</div>
                                <div className="sub_category"
                                    onClick={() => handleFilterCategory('suite')}
                                >Suite</div>
                            </div>

                            <div className="range_price">
                                <div className="price_title font-weight-bold">Price</div>
                                <p>${minPrice} - ${maxPrice}</p>
                                <Slide range defaultValue={[minPrice, maxPrice]} max={1000} min={0} placement='bottom' onChange={handleChangePrice}/>
                            </div>
                            
                            <div className="wrap_clear_filter">
                                <button className="btn btn-outline-danger">Clear Filter</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-xs-12">
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
                                // Check if data exist => display the data
                                data && data.length > 0 &&

                                // Display data in range - for Pagination
                                data.slice(minValue, maxValue).map((val, index) => (
                                    <div className="col-lg-4 col-sm-6 col-xs-12 mt-3 mb-3" key={index}>
                                        <Card style={{ overflow: 'hidden' }}
                                            onClick={() => navigate(`/detail?roomID=1`, { replace: true })}
                                            hoverable
                                            cover={<img className="img_rooms" alt="example" src={slide_img1} />}
                                        >
                                            <Meta title={val.title} description={val.description} className="mt-1" />
                                            <Meta title="Price: $250" className="mt-2 contain_price" />
                                        </Card>
                                    </div>
                                ))
                            }

                            {/* Pagination part */}
                            <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center mt-5 mb-5">
                                <Pagination
                                    showSizeChanger
                                    total={8}
                                    defaultPageSize={pageSizeOpt[0]}
                                    pageSizeOptions={pageSizeOpt}
                                    onChange={handleChangePageSize}
                                />
                            </div>
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