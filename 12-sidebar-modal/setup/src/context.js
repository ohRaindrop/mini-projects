import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    return <AppContext.Provider value={{ isSidebarOpen, isModalOpen, openSidebar, openModal, closeSidebar, closeModal }}> {children} </AppContext.Provider>
}

//customHook : allows to avoid importing useContext and AppContext 
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }

/* useContext allows to */