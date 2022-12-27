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
                <Route path='/reset_password' element={
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
                {/* write more Route here */}



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

function RequireLoggedIn({ children }) {
    if (!localStorage.getItem('access_user') && !localStorage.getItem('access_admin')){
        /* Redirect them to the / page(home page) if they are not logged in */
        return <Navigate to="/" replace={true} />
    }
    return children;
}

function RequireLogOut({ children }) {
    if (localStorage.getItem('access_user') || localStorage.getItem('access_admin')){
        /* Redirect them to the / page(home page) if they are logged in */
        return <Navigate to="/" replace={true} />
    }
    return children;
}


