import React, { useState } from 'react'
import './Header.scss'
import img_logo from '../../Image/hotel_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Header() {
  /* Define state */
  const [isHiddenMenuLink, setIsHiddenMenuLink] = useState(true)
  const [isHiddenUserMore, setIsHiddenUserMore] = useState(true)

  /* To toggle menu of link */
  /* when the menu of link opens -> hidden menu of user */
  const handleOpenMenu = () => {
    setIsHiddenMenuLink(!isHiddenMenuLink)
    setIsHiddenUserMore(true)
  }

  /* To toggle menu of user */
  /* when the menu of user opens -> hidden menu of link */
  const handleOpenUserMore = () => {
    setIsHiddenUserMore(!isHiddenUserMore)
    setIsHiddenMenuLink(true)
  }

  return (
    <>
      {/* Header UI part */}
      <header className='header'>
        <div className="navbar">
          <div className="left_menu">
            <img src={img_logo} width={60} alt="image" />

            <div className="menu ml-5">
              <div className="item_menu">
                <a href="/">Home</a>
              </div>
              <div className="item_menu">
                <a href="/rooms">Rooms</a>
              </div>
              <div className="item_menu">
                <a href="/about">About Us</a>
              </div>
              <div className="item_menu">
                <a href="/contact">Contact</a>
              </div>
              <div className="item_menu">
                <a href="/dashboard">Go to dashboard</a>
              </div>
              <div className="item_menu">
                <Link to='/dashboard'>Dashboard</Link>
              </div>
            </div>

            <div className="contain_btn_see_more">
              <FontAwesomeIcon style={{ transform: isHiddenMenuLink ? 'none' : 'rotate(45deg)' }} onClick={handleOpenMenu} className='text-light button_see_more' icon={faBars} size="2x" />
            </div>

            <div className="contain_avt_user">
              <img src={img_logo} width={50} height={50} className='rounded-circle' alt="avatar"
                id="dropdownMenuLink" onClick={handleOpenUserMore} />
            </div>

          </div>


          <div className="right_menu">

            {/* Not logged in will display this */}
            {/* <div className="login_register">
              <div className='item_menu'>
                <a href="#" className='btn btn-outline-light'>Login</a>
              </div>
              <div className='item_menu'>
                <a href="#" className='btn btn-outline-light'>Register</a>
              </div>
            </div> */}

            {/* Already Logged in will display this */}
            <div className="user_logged_in">
              <div className="dropdown">
                <img src={img_logo} width={50} height={50} className='rounded-circle' alt="avatar" role="button"
                  id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/change-password">Change Password</a>
                  <a className="dropdown-item" href="/login">Log Out</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* When the isHiddenMenuLink = false then display the menu link */}
        {!isHiddenMenuLink &&
          <div className="list_dropdown_menu">
            <a href="/"><div className="item_dropdown_menu">Home</div></a>
            <a href="/rooms"><div className="item_dropdown_menu">Rooms</div></a>
            <a href="/about"><div className="item_dropdown_menu">About Us</div></a>
            <a href="/contact"><div className="item_dropdown_menu">Contact</div></a>

            {/* check if user logged in => not display */}
            <a href="/login"><div className="item_dropdown_menu">Login</div></a>
            <a href="/register"><div className="item_dropdown_menu">Register</div></a>
            {/* check if user logged in => not display */}

          </div>
        }

        {/* When the isHiddenUserMore = false then display the menu of user */}
        {!isHiddenUserMore &&
          <div className="list_dropdown_menu">
            <a href="/change-password"><div className="item_dropdown_menu">Change Password</div></a>
            <a href="/log-out"><div className="item_dropdown_menu">Log Out</div></a>
          </div>
        }

      </header>

    </>
  )
}


export default Header