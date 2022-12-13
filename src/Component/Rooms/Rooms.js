import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../Utilities/Slider"
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";
import slide_img1 from '../../Image/slide_img_1.jpg'
import './Rooms.scss'
import { Pagination, Rate, Card } from 'antd';

const { Meta } = Card

function Rooms() {
    // Initialize the page size options
    const pageSizeOpt = [4, 8, 12, 16, 20]

    // Initialize the min and max element to display elements in range.
    // Use in Pagination
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(pageSizeOpt[0])

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

    return (
        <>
            {/* Header part */}
            <Header />

            {/* Slider part */}
            <Slider />

            {/* Body UI part of the Rooms component */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 contain_title_room">
                        <p className="text-uppercase font-weight-bold title_room" style={{ fontSize: '25px' }}>Rooms</p>
                    </div>

                    {/* loop rooms here */}
                    {
                        // Check if data exist => display the data
                        data && data.length > 0 &&

                        // Display data in range - for Pagination
                        data.slice(minValue, maxValue).map((val, index) => (
                            <div className="col-lg-3 col-sm-6 col-xs-12 mt-3 mb-3" key={index}>
                                <Card style={{ overflow: 'hidden' }} 
                                    onClick={() => navigate(`/detail?roomID=1`, { replace: true })}
                                    hoverable
                                    cover={<img className="img_rooms" alt="example" src={slide_img1} />}
                                >
                                    <Rate disabled defaultValue={5} style={{ fontSize: '17px' }} />
                                    <Meta title={val.title} description={val.description} className="mt-2" />
                                    <Meta title="Price: $250" className="mt-3 contain_price" />
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
            {/* End body UI part of the Rooms component */}

            {/* scroll to top */}
            <ScrollToTop />

            {/* Footer part */}
            <Footer />
        </>
    )
}

export default Rooms