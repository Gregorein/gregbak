import { useCallback, } from "react"
import debounce from "lodash/debounce"

const useDebounce = (callback, delay) => useCallback(debounce(callback, delay), [callback, delay])

export default useDebounce