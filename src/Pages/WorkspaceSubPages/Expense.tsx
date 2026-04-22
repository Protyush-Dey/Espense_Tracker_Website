import download from "../../assets/Images/icon/download.png";
import add from "../../assets/Images/icon/add.png";
import Filter from "../../Components/Expense/Filter";
const Expense = () => {
  return (
    <div className="flex flex-col gap-2 h-full p-4">
      <div className="flex items-center justify-between px-2 flex-1">
        <div>
          <h1 className="text-2xl font-semibold">Expenses</h1>
          <p className="text-[16px] text-[#6B7280]">
            Track, filter and review every payment and incoming amount from one
            place.
          </p>
        </div>
        <div className="flex gap-5 ">
          <button className="flex justify-center items-center gap-2 p-4 py-1 rounded-sm border-2 border-black/10">
            <img src={download} alt="download" />
            <p>Export</p>
          </button>
          <button className="flex justify-center items-center gap-2 p-4 py-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold">
            <img src={add} alt="add" />
            <p>Add Account</p>
          </button>
        </div>
      </div>
      <Filter/>
      <div className="w-full flex-12 rounded-xl border-2 border-black/15 shadow-authCard"></div>
    </div>
  );
};

export default Expense;
