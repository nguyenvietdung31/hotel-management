import { useEffect } from "react"
import AOS from 'aos'


function useAosAnimation() {

    useEffect(() => {
        AOS.init({ duration: 1000 })
        console.log('rerender')
    }, [])

    return;

}

export default useAosAnimation