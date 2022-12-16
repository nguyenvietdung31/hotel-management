import { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

/* Only when using, it will load the component below */
const App = lazy(() => import("../../App"))
const About = lazy(() => import("../About_Contact/About"))
const Contact = lazy(() => import("../About_Contact/Contact"))
const Login = lazy(() => import("../Authentication/Login"))
const Register = lazy(() => import("../Authentication/Register"))
const Rooms = lazy(() => import("../Rooms/Rooms"))
const Detail = lazy(() => import("../Rooms/Detail"))
const Booking_Form = lazy(() => import("../Form/Booking_Form"))

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

                {/* With each path will redirect to a page */}
            </Routes>
        </>
    )
}
export default RouterApp
