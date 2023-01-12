import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from '../Component/Loader'
import LayoutHOC from '../layout/LayoutHOC'

/* Only when use these component => import them */
const Home = lazy(() => import('../pages/home/Home'))
const About = lazy(() => import('../pages/aboutAndContact/About'))
const Contact = lazy(() => import('../pages/aboutAndContact/Contact'))
const Login = lazy(() => import('../pages/authentication/Login'))
const Register = lazy(() => import('../pages/authentication/Register'))
const Change_Password = lazy(() => import('../pages/authentication/Change_Password'))
const Forgot_Password = lazy(() => import('../pages/authentication/Forgot_Password'))
const Reset_Password = lazy(() => import('../pages/authentication/Reset_Password'))
const Rooms = lazy(() => import('../pages/room/Rooms'))
const NotFound = lazy(() => import('../pages/notFound/NotFound'))
const Booking_Form = lazy(() => import('../pages/form/Booking_Form'))
const Detail = lazy(() => import('../pages/detail/Detail'))
const Dashboard = lazy(() => import('../pages/Admin/Dashboard'))
const RoomManage = lazy(() => import('../pages/Admin/Page/RoomManage'))
const StaffManage = lazy(() => import('../pages/Admin/Page/StaffManage'))
const UserManage = lazy(() => import('../pages/Admin/Page/UserManage'))
const OrderManage = lazy(() => import('../pages/Admin/Page/OrderManage'))

const HomeLayout = LayoutHOC(Home)
const AboutLayout = LayoutHOC(About)
const ContactLayout = LayoutHOC(Contact)
const RoomsLayout = LayoutHOC(Rooms)
const DetailLayout = LayoutHOC(Detail)
const BookingFormLayout = LayoutHOC(Booking_Form)

function RouterApp() {


    return (
        <>
            <Routes>
                {/* With each path will redirect to a page  */}

                <Route path="/" element={
                    <Suspense fallback={<Loader />}>
                        <HomeLayout />
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
                        <AboutLayout />
                    </Suspense>
                } />

                <Route path='/contact' element={
                    <Suspense fallback={<Loader />}>
                        <ContactLayout />
                    </Suspense>
                } />

                <Route path='/rooms' element={
                    <Suspense fallback={<Loader />}>
                        <RoomsLayout />
                    </Suspense>
                } />

                <Route path='/detail' element={
                    <Suspense fallback={<Loader />}>
                        <DetailLayout />
                    </Suspense>
                } />

                <Route path='/booking_form' element={
                    <Suspense fallback={<Loader />}>
                        <RequireLoggedIn><BookingFormLayout /></RequireLoggedIn>
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


