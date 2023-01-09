import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from '../utilities/Loader'

/* Only when use these component => import them */
const Home = lazy(() => import('../home/Home'))
const About = lazy(() => import('../aboutAndContact/About'))
const Contact = lazy(() => import('../aboutAndContact/Contact'))
const Login = lazy(() => import('../authentication/Login'))
const Register = lazy(() => import('../authentication/Register'))
const Change_Password = lazy(() => import('../authentication/Change_Password'))
const Forgot_Password = lazy(() => import('../authentication/Forgot_Password'))
const Reset_Password = lazy(() => import('../authentication/Reset_Password'))
const Rooms = lazy(() => import('../rooms/Rooms'))
const NotFound = lazy(() => import('../notFound/NotFound'))
const Booking_Form = lazy(() => import('../form/Booking_Form'))
const Detail = lazy(() => import('../rooms/Detail'))
const Dashboard = lazy(() => import('../Admin/Dashboard'))
const RoomManage = lazy(() => import('../Admin/Page/RoomManage'))
const StaffManage = lazy(() => import('../Admin/Page/StaffManage'))
const UserManage = lazy(() => import('../Admin/Page/UserManage'))
const OrderManage = lazy(() => import('../Admin/Page/OrderManage'))
const ExportData = lazy(() => import('../Admin/Page/ExportData'))
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
                
                <Route path="/login" element={
                    <Suspense fallback={<Loader />}>
                        <RequireLogOut><Login /></RequireLogOut>
                    </Suspense>
                } />

                <Route path='/register' element={
                    <Suspense fallback={<Loader />}>
                        <RequireLogOut><Register /></RequireLogOut>
                    </Suspense>
                } />

                <Route path='/change_password' element={
                    <Suspense fallback={<Loader />}>
                        <RequireLoggedIn><Change_Password /></RequireLoggedIn>
                    </Suspense>
                } />

                <Route path='/forgot_password' element={
                    <Suspense fallback={<Loader />}>
                        <RequireLogOut><Forgot_Password /></RequireLogOut>
                    </Suspense>
                } />

                <Route path='/reset_password/:resetCode' element={
                    <Suspense fallback={<Loader />}>
                        <RequireLogOut><Reset_Password /></RequireLogOut>
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
                        <RequireLoggedIn><Booking_Form /></RequireLoggedIn>
                    </Suspense>
                } />
                
                {/* Link to admin site */}
                <Route path='/dashboard' element={
                    <Suspense fallback={<Loader />}>
                        <RequireAdmin><Dashboard /></RequireAdmin>
                    </Suspense>
                } />

                <Route path='/room_manage' element={
                    <Suspense fallback={<Loader />}>
                        <RequireAdmin><RoomManage /></RequireAdmin>
                    </Suspense>
                } />

                <Route path='/staff_manage' element={
                    <Suspense fallback={<Loader />}>
                        <RequireAdmin><StaffManage /></RequireAdmin>
                    </Suspense>
                } />

                <Route path='/user_manage' element={
                    <Suspense fallback={<Loader />}>
                        <RequireAdmin><UserManage /></RequireAdmin>
                    </Suspense>
                } />

                <Route path='/booking_manage' element={
                    <Suspense fallback={<Loader />}>
                        <RequireAdmin><OrderManage /></RequireAdmin>
                    </Suspense>
                } />

                <Route path='/export_data' element={
                    <Suspense fallback={<Loader />}>
                        <RequireAdmin><ExportData /></RequireAdmin>
                    </Suspense>
                } />



                {/* write more Route here */}
                <Route path='/*' element={
                    <Suspense fallback={<Loader />}>
                        <NotFound />
                    </Suspense>
                } />
                {/* With each path will redirect to a page */}
            </Routes>
        </>
    )
}
export default RouterApp

/* require logged in that allow to access */
function RequireLoggedIn({ children }) {
    if (!localStorage.getItem('access_user') && !localStorage.getItem('access_admin')){
        /* Redirect them to the / page(home page) if they are not logged in */
        return <Navigate to="/"/>
    }
    return children;
}

/* require logged in that not allow to access */
function RequireLogOut({ children }) {
    if (localStorage.getItem('access_user') || localStorage.getItem('access_admin')){
        /* Redirect them to the / page(home page) if they are logged in */
        return <Navigate to="/"/>
    }
    return children;
}

/* require be Admin that allow to access */
function RequireAdmin({ children }) {
    if (!localStorage.getItem('access_admin')){
        /* Redirect them to the / page(home page) if they are not admin */
        return <Navigate to="/"/>
    }
    return children;
}


