import { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";

function BeAtTop() {

    const location = useLocation()

    /* be at top of page after loading */
    useEffect(() => {
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
    }, [location])

    return (
        <></>
    )
}

export default memo(BeAtTop)