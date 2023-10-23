import { useEffect, useState } from "react"
import Footer from "../components/layout/footer/Footer"
import Header from "../components/layout/header/Header"
import Proptypes from "prop-types"
import Search from './../components/modals/search/Search';
import Dialog from "../components/modals/dialog/Dialog";

const MainLayout = ({ children }) => {


    const [isSearchShow, setIsSearchShow] = useState(false)
    const [isDialogShow, setIsDialogShow] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const dialogStatus = localStorage.getItem("dialog") ?
            JSON.parse(localStorage.getItem("dialog")) :
            localStorage.setItem("dialog", JSON.stringify(true));

        setTimeout(() => {
            setIsDialogShow(dialogStatus)
        }, 2000);
    }, [])


    return (
        <div className={`main-layout ${isDarkMode ? "dark" : ""}`}>
            <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
            <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
            <Header setIsSearchShow={setIsSearchShow} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout

MainLayout.propTypes = {
    children: Proptypes.node
}