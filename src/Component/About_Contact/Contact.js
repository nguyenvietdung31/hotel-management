import { useEffect } from "react"
import { Col, Row } from 'antd';
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";
import './Contact.scss'
import AOS from 'aos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'


function Contact() {

    /* set time for aos animation */
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return (
        <>
            {/* Header part */}
            <Header />

            {/* Body UI of Contact component */}
            <div className="container_contact">
                <Row >
                    <Col md={24} sm={24} xs={24}>
                        <div className='contain_map'>
                            <iframe className="contact_map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d549.6648790474579!2d105.82783111267182!3d21.013292928091726!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7df5ad2009%3A0x351b6b8775f221d9!2sEastgate%20Software!5e0!3m2!1sen!2s!4v1670406776763!5m2!1sen!2s" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </Col>
                </Row>

                <div className="container-fluid bg-dark mt-5 pt-5 pb-5">
                    <div className="container">
                        <Row gutter={24}>
                            <Col md={15} sm={24}>
                                <form className='col-md-12' data-aos="fade-right">
                                    <p className="text-light font-weight-bold title_form">Please fulfil the form.</p>
                                    <div className="form-group">
                                        <label htmlFor="inputName" className="text-light">Name</label>
                                        <input type="text" className="form-control" id="inputName" placeholder="Your name..." required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail" className="text-light">Email</label>
                                        <input type="email" className="form-control" id="inputEmail" placeholder="Your email..." required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputSubject" className="text-light">Subject</label>
                                        <input type="text" className="form-control" id="inputSubject" placeholder="Your subject..." required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputMessage" className="text-light">Message</label>
                                        <textarea className="form-control" id="inputMessage" rows="5" placeholder="Your message..." required></textarea>
                                    </div>

                                    <button type='submit' className="btn btn-success">Send</button>
                                </form>
                            </Col>
                            <Col md={9} sm={24}>
                                <div className="mt-5 mb-5" data-aos="fade-up">
                                    <p className="text-uppercase font-weight-bold text-light title_info">Contact information</p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faLocationDot} /> <span className="ml-2">187 Nguyễn Lương Bằng, Quang Trung, Đống Đa, Hà Nội</span></p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faPhone} /> <span className="ml-2">(+84) 13 23 45 67 89</span></p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faEnvelope} /> <span className="ml-2">webinternhotel@gmail.com</span></p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faClock} /> <span className="ml-2">Everyday 9:30 am - 6:30 pm</span></p>
                                </div>

                                <div className="mt-5 mb-5" data-aos="fade-up">
                                    <p className="text-uppercase font-weight-bold mb-4 text-light title_info">Social Media</p>
                                    <p>
                                        <a href="#" className="mr-4"><FontAwesomeIcon className="text-primary" icon={faFacebook} size="2x" /> </a>
                                        <a href="#" className="mr-4"><FontAwesomeIcon className="text-warning" icon={faInstagram} size="2x" /> </a>
                                        <a href="#" className="mr-4"><FontAwesomeIcon className="text-info" icon={faTwitter} size="2x" /> </a>
                                    </p>

                                </div>

                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {/* End body UI of Contact component */}

            {/* scroll to top */}
            <ScrollToTop />

            {/* Footer part */}
            <Footer />
        </>
    )
}

export default Contact