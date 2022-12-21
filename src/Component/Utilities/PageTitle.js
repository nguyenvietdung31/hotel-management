import { useEffect } from "react";


function PageTitle( prop ) {
    
    /* set title of page */
    useEffect(() => {
        document.title = prop.title
    },[prop.title])
    
    return (
        <></>
    )
}

export default PageTitle