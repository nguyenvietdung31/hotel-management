import { Carousel } from 'antd';
import { memo } from 'react';
import slide_img1 from '../../image/slide_img_1.jpg'
import slide_img2 from '../../image/slide_img_2.jpg'
import slide_img3 from '../../image/slide_img_3.jpg'
import slide_img4 from '../../image/slide_img_4.jpg'
import './Slider.scss'

function Slider() {

    return (
        <>
            <div className="container-fluid" style={{ paddingTop: '70px' }}>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 pl-0 pr-0">
                        <Carousel autoplay style={{width: '100%'}}>
                            <div className='wrap_slide_img'>
                                <img src={slide_img1} alt="slide_img_1"/>
                            </div>
                            <div className='wrap_slide_img'>
                                <img src={slide_img2} alt="slide_img_2"/>
                            </div>
                            <div className='wrap_slide_img'>
                                <img src={slide_img3} alt="slide_img_3"/>
                            </div>
                            <div className='wrap_slide_img'>
                                <img src={slide_img4} alt="slide_img_4"/>
                            </div>

                        </Carousel>
                    </div>

                </div>

            </div>
        </>
    )
}

export default memo(Slider)