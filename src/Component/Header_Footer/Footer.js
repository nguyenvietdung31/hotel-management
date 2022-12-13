import { Col, Row } from 'antd';
import './Footer.scss'
import img_logo from '../../Image/hotel_logo.png'


function Footer() {
    return (
        <>
            {/* Footer UI part */}
            <footer className="footer">
                <Row gutter={16}>
                    <Col md={8} xs={12}>
                        <div className='item_footer'>
                            <div className='footer_contain_logo'>
                                <img src={img_logo} width={80} alt="image" />
                                <div className='contain_copyright'>
                                    <p>&#169; by InternWeb Hotel</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} xs={12}>
                        <div className='item_footer second_item'>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/rooms">Rooms</a></li>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={8} xs={24}>
                        <div className='item_footer'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d549.6648790474579!2d105.82783111267182!3d21.013292928091726!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7df5ad2009%3A0x351b6b8775f221d9!2sEastgate%20Software!5e0!3m2!1sen!2s!4v1670406776763!5m2!1sen!2s" width="300" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </Col>
                </Row>
            </footer>
        </>
    )
}

export default Footer