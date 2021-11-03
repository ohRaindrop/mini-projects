import React from 'react'
import { FaBars } from 'react-icons/fa'
import { useGlobalContext } from './context'

const Home = () => {
  const { openSidebar, openModal } = useGlobalContext();

  return <main>
    <button className="sidebar-toggle"
      onClick={openSidebar}>
      <FaBars />
    </button>
    <button className="btn"
      onClick={openModal}> show modal </button>
  </main>
}

export default Home

/* it's impossible to set the modal(sidebar) state inside the modal(sidebar), as it's toggling button is inside the home component
it's also impossible to set it inside the App component, as it's massive and would mess things up
=> useContext, which provides a way to share values like props between components without having to explicitly pass a prop through every level of the tree
*/
