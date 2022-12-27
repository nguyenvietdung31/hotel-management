import { useEffect, useState } from "react"
import { Col, Row } from 'antd';
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import ScrollToTop from "../Utilities/ScrollToTop";
import { useTranslation } from 'react-i18next'
import BeAtTop from "../Utilities/BeAtTop";
import './Contact.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import PageTitle from "../Utilities/PageTitle"
import Notify from "../Notification/Notify"
import AosAnimation from "../Utilities/AosAnimation"


function Contact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [notify, setNotify] = useState(false)

    /* i18next */
    const { t, i18n } = useTranslation()

    /* submit form */
    const handleSubmitForm = (e) => {
        e.preventDefault()
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        setNotify(true)
        handleNotify()
    }

    /* display notify */
    const handleNotify = () => {
        setTimeout(() => {
            setNotify(false)
        }, [2000])
    }

    return (
        <>
            {/* set title of page */}
            <PageTitle title={t('title.title_contact')} />

            {/* animation with aos lib */}
            <AosAnimation />

            {notify && <Notify message='You have sent successfully!' type='success' />}

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
                                <form className='col-md-12' data-aos="fade-right"  onSubmit={handleSubmitForm}>
                                    <p className="text-light font-weight-bold title_form">{t('contact.contact_form_title')}</p>
                                    <div className="form-group">
                                        <label htmlFor="inputName" className="text-light">{t('contact.contact_form_name_lable')}</label>
                                        <input onChange={e => setName(e.target.value.trim())} value={name} type="text" 
                                        className="form-control" id="inputName" 
                                        placeholder={t('contact.contact_form_name_plh')} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail" className="text-light">{t('contact.contact_form_email_lable')}</label>
                                        <input onChange={e => setEmail(e.target.value.trim())} value={email} type="email" 
                                        className="form-control" id="inputEmail" 
                                        placeholder={t('contact.contact_form_email_plh')} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputSubject" className="text-light">{t('contact.contact_form_subject_lable')}</label>
                                        <input onChange={e => setSubject(e.target.value.trim())} value={subject} 
                                        type="text" className="form-control" id="inputSubject" 
                                        placeholder={t('contact.contact_form_subject_plh')} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputMessage" className="text-light">{t('contact.contact_form_message_lable')}</label>
                                        <textarea onChange={e => setMessage(e.target.value.trim())} value={message} 
                                        className="form-control" id="inputMessage" rows="5" 
                                        placeholder={t('contact.contact_form_message_plh')} required></textarea>
                                    </div>

                                    <button type='submit' className="btn btn-success">{t('contact.contact_form_button')}</button>
                                </form>
                            </Col>
                            <Col md={9} sm={24}>
                                <div className="mt-5 mb-5" data-aos="fade-up">
                                    <p className="text-uppercase font-weight-bold text-light title_info">{t('contact.contact_infor')}</p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faLocationDot} /> <span className="ml-2">{t('contact.contact_infor_item1')}</span></p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faPhone} /> <span className="ml-2">{t('contact.contact_infor_item2')}</span></p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faEnvelope} /> <span className="ml-2">{t('contact.contact_infor_item3')}</span></p>
                                    <p className="mt-3 text-light"><FontAwesomeIcon icon={faClock} /> <span className="ml-2">{t('contact.contact_infor_item4')}</span></p>
                                </div>

                                <div className="mt-5 mb-5" data-aos="fade-up">
                                    <p className="text-uppercase font-weight-bold mb-4 text-light title_info">{t('contact.contact_social')}</p>
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
            <BeAtTop />

        </>
    )
}

export default Contact