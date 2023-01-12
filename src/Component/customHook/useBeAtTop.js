import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function useBeAtTop() {

    const location = useLocation()

    /* be at top of page after loading */
    useEffect(() => {
      if (!location.hash) {
        window.scrollTo(0, 0)
      }
    }, [location])

    return;
}

export default useBeAtTop