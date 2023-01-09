import Footer from '../headerAndFooter/Footer'
import Header from '../headerAndFooter/Header'

function Layout( prop ) {

    return (
        <>
            <Header />
            {prop.component}
            <Footer />
        </>
    )
}

export default Layout