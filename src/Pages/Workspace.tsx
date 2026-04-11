import NavBar from '../Components/NavBar'
import { DashBoard } from './WorkspaceSubPages/DashBoard'

const Workspace = () => {
  return (
    <>
    <NavBar/>
    <div className='pt-15 md:pt-20 md:h-screen h-fit w-full '>
    <DashBoard/>
    </div>
    </>
  )
}

export default Workspace