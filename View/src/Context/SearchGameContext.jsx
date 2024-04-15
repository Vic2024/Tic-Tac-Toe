/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
const SearchGameContext = React.createContext()

export const useSearchGame = () => {
    const { searchValue, setSearchValue } = React.useContext(SearchGameContext)
    return { searchValue, setSearchValue }
}
export const SearchGameProvider = ({ children }) => {
    const [searchValue, setSearchValue] = React.useState('')
    return <SearchGameContext.Provider value={{ searchValue, setSearchValue }}>
        {children}
    </SearchGameContext.Provider>
}