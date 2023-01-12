import Footer from '../pages/headerAndFooter/Footer'
import Header from '../pages/headerAndFooter/Header'

function LayoutHOC( Component ) {
    function Layout() {

        return (
            <>
            <Header />
            <Component />
            <Footer />
        </>
        )
    }

    return Layout
}

export default LayoutHOC