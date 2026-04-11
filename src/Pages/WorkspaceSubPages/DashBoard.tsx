
import AccountList from "../../Components/DashBoardPart/AccountList.tsx"
import BarChart from "../../Components/DashBoardPart/BarChart.tsx"
import PiChart from "../../Components/DashBoardPart/PiChart.tsx"
import ProfileCard from "../../Components/DashBoardPart/ProfileCard.tsx"
import RightSide from "../../Components/DashBoardPart/RightSide.tsx"

export const DashBoard = () => {
  return (
    <div className='h-full w-full flex flex-col md:flex-row items-center justify-between gap-5 p-4 sm:px-8 '>
      <div id='left' className="w-full md:w-2/3 flex flex-col gap-4 h-full ">
        <div className="flex flex-col items-center sm:flex-row gap-6 w-full h-3/9">
        <ProfileCard/>
        <PiChart/>
        </div>
        <AccountList/>
        <BarChart />
      </div>
      <RightSide/>
    </div>
  )
}
