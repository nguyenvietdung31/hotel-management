import { Route, Routes, Navigate } from 'react-router-dom'
import App from '../../App'
import About from '../About_Contact/About'
import Contact from '../About_Contact/Contact'
import Login from '../Authentication/Login'
import Register from '../Authentication/Register'
import Rooms from '../Rooms/Rooms'
import Detail from '../Rooms/Detail'
import NotFound from '../NotFound/NotFound'
import Booking_Form from '../Form/Booking_Form'
import Change_Password from '../Authentication/Change_Password'
import Forgot_Password from '../Authentication/Forgot_Password'
import Reset_Password from '../Authentication/Reset_Password'
function RouterApp() {

    return (
        <>
            <Routes>
                 {/* With each path will redirect to a page  */}

                <Route path="/" element={<App />} />
                {/* <Route path="/login" element={<RequireLogin><Login /></RequireLogin>} /> */}
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} /> 
                <Route path='/change_password' element={<Change_Password />} />
                <Route path='/forgot_password' element={<Forgot_Password />} />
                <Route path='/reset_password' element={<Reset_Password />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/rooms' element={<Rooms />} />
                <Route path='/detail' element={<Detail />} />
                <Route path='/booking_form' element={<Booking_Form/>}/>
                {/* <Route path='/search' element={<Search />} />  */}
                {/*<Route path="/forgotpassword" element={<RequireForgotpass><Forgotpassword /></RequireForgotpass>} />
                <Route path="/changepassword" element={<RequireChangepass><Changepassword /></RequireChangepass>} />*/}
                {/*<Route path="/create" element={<RequireAdmin><Create /></RequireAdmin>} />
                <Route path="/update" element={<RequireAdmin><Update /></RequireAdmin>} />*/}
                <Route path='/*' element={<NotFound />} />

                {/* With each path will redirect to a page */}
            </Routes>
        </>
    )
}
export default RouterApp
