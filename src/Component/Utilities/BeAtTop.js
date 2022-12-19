import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function BeAtTop() {

    const location = useLocation();

    /* be at top of page after loading */
    useEffect(() => {
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
    }, [location]);

    /* scroll to top when reload page */
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    return (
        <></>
    )
}

export default BeAtTop