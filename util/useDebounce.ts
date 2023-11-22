import { useCallback, } from "react"
import debounce from "lodash/debounce"

// eslint-disable-next-line react-hooks/exhaustive-deps
const useDebounce = (callback, delay: number) => useCallback(debounce(callback, delay), [callback, delay])

export default useDebounce