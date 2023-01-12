import { useEffect } from "react"
import AOS from 'aos'


function useAosAnimation() {

    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return;

}

export default useAosAnimation