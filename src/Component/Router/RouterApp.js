import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from '../Utilities/Loader'

/* Only when use these component => import them */
const Home = lazy(() => import('../Home/Home'))
const About = lazy(() => import('../About_Contact/About'))
const Contact = lazy(() => import('../About_Contact/Contact'))
const Login = lazy(() => import('../Authentication/Login'))
const Register = lazy(() => import('../Authentication/Register'))
const Change_Password = lazy(() => import('../Authentication/Change_Password'))
const Forgot_Password = lazy(() => import('../Authentication/Forgot_Password'))
const Reset_Password = lazy(() => import('../Authentication/Reset_Password'))
const Rooms = lazy(() => import('../Rooms/Rooms'))
const NotFound = lazy(() => import('../NotFound/NotFound'))
const Booking_Form = lazy(() => import('../Form/Booking_Form'))
const Detail = lazy(() => import('../Rooms/Detail'))

function RouterApp() {

    return (
        <>
            <Routes>
                {/* With each path will redirect to a page  */}

                <Route path="/" element={
                    <Suspense fallback={<Loader />}>
                        <Home />
                    </Suspense>
                } />
                {/* <Route path="/login" element={<RequireLogin><Login /></RequireLogin>} /> */}
                <Route path="/login" element={
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                } />
                <Route path='/register' element={
                    <Suspense fallback={<Loader />}>
                        <Register />
                    </Suspense>
                } />
                <Route path='/change_password' element={
                    <Suspense fallback={<Loader />}>
                        <Change_Password />
                    </Suspense>
                } />
                <Route path='/forgot_password' element={
                    <Suspense fallback={<Loader />}>
                        <Forgot_Password />
                    </Suspense>
                } />
                <Route path='/reset_password' element={
                    <Suspense fallback={<Loader />}>
                        <Reset_Password />
                    </Suspense>
                } />
                <Route path='/about' element={
                    <Suspense fallback={<Loader />}>
                        <About />
                    </Suspense>
                } />
                <Route path='/contact' element={
                    <Suspense fallback={<Loader />}>
                        <Contact />
                    </Suspense>
                } />
                <Route path='/rooms' element={
                    <Suspense fallback={<Loader />}>
                        <Rooms />
                    </Suspense>
                } />
                <Route path='/detail' element={
                    <Suspense fallback={<Loader />}>
                        <Detail />
                    </Suspense>
                } />
                <Route path='/booking_form' element={
                    <Suspense fallback={<Loader />}>
                        <Booking_Form />
                    </Suspense>
                } />

                {/* <Route path='/search' element={<Search />} />  */}
                {/*<Route path="/forgotpassword" element={<RequireForgotpass><Forgotpassword /></RequireForgotpass>} />
                <Route path="/changepassword" element={<RequireChangepass><Changepassword /></RequireChangepass>} />*/}
                {/*<Route path="/create" element={<RequireAdmin><Create /></RequireAdmin>} />
                <Route path="/update" element={<RequireAdmin><Update /></RequireAdmin>} />*/}
                <Route path='/*' element={
                    <Suspense fallback={<Loader />}>
                        <NotFound />
                    </Suspense>
                } />

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
