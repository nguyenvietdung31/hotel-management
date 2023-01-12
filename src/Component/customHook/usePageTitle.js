import { useEffect } from "react"

function usePageTitle( title ) {

  /* set title of page */
  useEffect(() => {
    document.title = title
  }, [title])

  return;
}

export default usePageTitle
