import React, { useState, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import Loader from '../Utilities/Loader'
import './Header.scss'
import img_logo from '../../Image/hotel_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Header() {
  /* Define state */
  const [isHiddenMenuLink, setIsHiddenMenuLink] = useState(true)
  const [isHiddenUserMore, setIsHiddenUserMore] = useState(true)
  const [isHiddenLanguage, setIsHiddenLanguage] = useState(true)

  /* i18next */
  const { t, i18n } = useTranslation()

  const navigate = useNavigate()

  /* get token from localStorage */
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'))

  /* To toggle menu of link */
  /* when the menu of link opens -> hidden menu of user, menu of language */
  const handleOpenMenu = () => {
    setIsHiddenMenuLink(!isHiddenMenuLink)
    setIsHiddenUserMore(true)
    setIsHiddenLanguage(true)

  }

  /* To toggle menu of language */
  /* when the menu of language opens -> hidden menu of link, menu of user */
  const handleOpenLanguage = () => {
    setIsHiddenLanguage(!isHiddenLanguage)
    setIsHiddenMenuLink(true)
    setIsHiddenUserMore(true)
  }

  /* To toggle menu of user */
  /* when the menu of user opens -> hidden menu of link, menu of language */
  const handleOpenUserMore = () => {
    setIsHiddenUserMore(!isHiddenUserMore)
    setIsHiddenMenuLink(true)
    setIsHiddenLanguage(true)
  }

  const handleLogOut = () => {
    localStorage.clear('userToken')
    navigate(0)
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        {/* Header UI part */}
        <header className='header'>
          <div className="navbar">
            <div className="left_menu">
              <img src={img_logo} width={60} alt="image" />

              <div className="menu ml-5">
                <div className="item_menu">
                  <a href="/">{t('header.home')}</a>
                </div>
                <div className="item_menu">
                  <a href="/rooms">{t('header.rooms')}</a>
                </div>
                <div className="item_menu">
                  <a href="/about">{t('header.about')}</a>
                </div>
                <div className="item_menu">
                  <a href="/contact">{t('header.contact')}</a>
                </div>
                <div className="item_menu">
                  <a href="/dashboard">{t('header.dashboard')}</a>
                </div>
              </div>

              <div className="contain_btn_see_more">
                <FontAwesomeIcon style={{ transform: isHiddenMenuLink ? 'none' : 'rotate(45deg)' }} onClick={handleOpenMenu} className='text-light button_see_more' icon={faBars} size="2x" />
              </div>

              <div className="contain_multi_lang_responsive">
                <div className="dropdown">
                  <FontAwesomeIcon icon={faGlobe} role="button" id="dropdownMenuLink"
                    className='text-light'
                    style={{ transform: isHiddenLanguage ? 'none' : 'rotate(45deg)', fontSize: '30px' }}
                    onClick={handleOpenLanguage} />

                </div>
              </div>

              {
                userToken &&
                <div className="contain_avt_user">
                  <img src={img_logo} width={50} height={50} className='rounded-circle' alt="avatar"
                    id="dropdownMenuLink" onClick={handleOpenUserMore} />
                </div>
              }

            </div>


            <div className="right_menu">

              <div className="contain_multi_lang mr-3">
                <div className="dropdown">
                  <FontAwesomeIcon icon={faGlobe} role="button"
                    id="dropdownMenuLink" className='text-light' data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" style={{ fontSize: '20px' }} />

                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => i18n.changeLanguage('en')}>{t('header.lang_en')}</button>
                    <button className="dropdown-item" onClick={() => i18n.changeLanguage('vie')}>{t('header.lang_vie')}</button>
                  </div>
                </div>
              </div>

              {
                userToken ?
                  (
                    /* Already logged in will display this */
                    < div className="user_logged_in">
                      <div className="dropdown">
                        <img src={img_logo} width={50} height={50} className='rounded-circle' alt="avatar" role="button"
                          id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="/change_password">{t('header.change_pass')}</a>
                          <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogOut}>{t('header.log_out')}</a>
                        </div>
                      </div>
                    </div>
                  ) :
                  (
                    /* Not logged in will display this */
                    <div className="login_register">
                      <div className='right_item_menu'>
                        <a href="/login" className='btn btn-light'>{t('header.log_in')}</a>
                      </div>
                      <div className='right_item_menu'>
                        <a href="/register" className='btn btn-light'>{t('header.register')}</a>
                      </div>
                    </div>
                  )
              }

            </div>
          </div>

          {/* When the isHiddenMenuLink = false then display the menu link */}
          {!isHiddenMenuLink &&
            <div className="list_dropdown_menu">
              <a href="/"><div className="item_dropdown_menu">{t('header.home')}</div></a>
              <a href="/rooms"><div className="item_dropdown_menu">{t('header.rooms')}</div></a>
              <a href="/about"><div className="item_dropdown_menu">{t('header.about')}</div></a>
              <a href="/contact"><div className="item_dropdown_menu">{t('header.contact')}</div></a>

              {userToken === null &&
                <div>
                  <a href="/login"><div className="item_dropdown_menu">{t('header.log_in')}</div></a>
                  <a href="/register"><div className="item_dropdown_menu">{t('header.register')}</div></a>
                </div>
              }


            </div>
          }

          {/* When the isHiddenUserMore = false then display the menu of user */}
          {!isHiddenLanguage &&
            <div className="list_dropdown_menu">
              <a >
                <div onClick={() => i18n.changeLanguage('en')} className='item_dropdown_menu'>{t('header.lang_en')}</div>
              </a>
              <a >
                <div onClick={() => i18n.changeLanguage('vie')} className='item_dropdown_menu'>{t('header.lang_vie')}</div>
              </a>
            </div>
          }

          {/* When the isHiddenUserMore = false then display the menu of user */}
          {!isHiddenUserMore &&
            <div className="list_dropdown_menu">
              <a href="/change_password"><div className="item_dropdown_menu">{t('header.change_pass')}</div></a>
              <a href="/log-out"><div className="item_dropdown_menu">{t('header.log_out')}</div></a>
            </div>
          }

        </header>
      </Suspense>
    </>
  )
}


export default Header