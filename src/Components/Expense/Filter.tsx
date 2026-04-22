import { DatePicker, type DatePickerProps } from "antd";
import Calender from "../../assets/Images/icon/Calender.png"

const Filter = () => {


  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="w-full flex-3 p-2  rounded-xl border-2 border-black/15 shadow-authCard">
      <div className=" flex items-center justify-between px-4 w-full">
        <p className="text-lg font-semibold">Filters</p>
        <p className="text-lg font-semibold text-blue-600 cursor-pointer">
          Clear
        </p>
      </div>
      <div className="flex items-center justify-between px-4 font-semibold text-[16px] text-[#6B7280] ">
        <div>
          <p>Search</p>
        </div>
        <div>
          <p>Category</p>
        </div>
        <div>
          <p>Account</p>
        </div>
        <div>
          <p>Pay / Get</p>
        </div>
        <div>
          <p>From date</p>
          <DatePicker onChange={onChange} suffixIcon={
        <img
          src={Calender}
          alt="calendar"
          style={{ width: 16, height: 16 }}
        />
      }
/>
        </div>
        <div>
          <p>To date</p>
          <DatePicker onChange={onChange} suffixIcon={
        <img
          src={Calender}
          alt="calendar"
          style={{ width: 16, height: 16 }}
        />
      }
/>
        </div>
      </div>
    </div>
  );
};

export default Filter;
