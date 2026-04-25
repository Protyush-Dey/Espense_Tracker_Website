import { Outlet } from 'react-router'
import NavBar from '../Components/NavBar'
// import Expense from './WorkspaceSubPages/Expense'
// import { DashBoard } from './WorkspaceSubPages/DashBoard'

const Workspace = () => {
  return (
    <>
    <NavBar/>
    <div className='pt-15 md:pt-20 md:h-screen h-fit w-full '>
    {/* <DashBoard/> */}
    {/* <Expense/> */}
    <Outlet/>
    </div>
    </>
  )
}

export default Workspace