import { memo, useEffect } from "react"
import AOS from 'aos'


function AosAnimation() {

    /* set time for aos animation */
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return(
        <></>
    )
}

export default memo(AosAnimation)