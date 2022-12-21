import { useTranslation } from 'react-i18next'
import img_not_found from '../../Image/not_found.png'
import PageTitle from '../Utilities/PageTitle'

function NotFound() {
    const { t, i18n } = useTranslation()
    
    return (
        <>
            {/* set title of page */}
            <PageTitle title={t('title.title_not_found')} />

            <div className="container">
                <div className="contain_content d-flex justify-content-center" style={{ width: '100%', height: '100vh', alignItems: 'center' }}>
                    <div className="sub_contain_content">
                        <div className="contain_img  d-flex justify-content-center mb-4">
                            <img src={img_not_found} alt="image" style={{ width: '80%' }} />
                        </div>
                        <p className='font-weight-bold text-center' style={{ fontSize: '30px' }}>404 - PAGE NOT FOUND</p>
                        <p className='text-center'>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>

                        <div className="contain_button d-flex justify-content-center" style={{ width: '100%' }}>
                            <a className='btn btn-primary' href='/' style={{ borderRadius: '20px' }}>GO TO HOMEPAGE</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound