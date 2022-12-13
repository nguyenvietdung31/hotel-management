import { useState, useEffect } from 'react'
import AOS from 'aos'

function ScrollToTop() {
    /* Initialize the variable to check when scroll button appear */
    const [scrollToTop, setScrollToTop] = useState(false)

    /* css for button scroll to top */
    const style = {
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        zIndex: 99,
        fontSize: '20px',
        border: 'none',
        borderBottom: '3px solid #42C2FF',
        outline: 'none',
        backgroundColor: 'transparent',
        color: '#79d0f9',
        cursor: 'pointer',
        padding: '5px',
        fontWeight: 'bold'
    }

    /* set time for aos animation */
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    /* when event scroll happen, call function scrollFunction to handle */
    window.onscroll = () => {
        scrollFunction()
    }

    /* handle when Scroll To Top button appear */
    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setScrollToTop(true)
        } else {
            setScrollToTop(false)
        }
    }

    /* scroll back to top */
    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            {/* scroll to top */}
            {scrollToTop && <button onClick={topFunction} style={style} title="Go to top">Top</button>}

        </>
    )
}

export default ScrollToTop