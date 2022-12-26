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
import Dashboard from '../Admin/Dashboard'
import RoomManage from '../Admin/Page/RoomManage'
import StaffManage from '../Admin/Page/StaffManage'
import UserManage from '../Admin/Page/UserManage'
import OrderManage from '../Admin/Page/OrderManage'
import ExportData from '../Admin/Page/ExportData'
function RouterApp() {

    return (
        <>
            <Routes>
                 {/* With each path will redirect to a page  */}

                <Route path="/" element={<App />} />
                {/* <Route path="/login" element={<RequireLogin><Login /></RequireLogin>} /> */}
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} /> 
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


                {/* Link to admin site */}
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/roommanage' element={<RoomManage />}/>
                <Route path='/staffmanage' element={<StaffManage/>}/>
                <Route path='/usermanage' element={<UserManage/>}/>
                <Route path='/ordermanage' element={<OrderManage/>}/>
                <Route path='/exportdata' element={<ExportData/>}/>
            </Routes>
        </>
    )
}
export default RouterApp
