import Food from "../../assets/Images/icon/expenseType/food.png";
import Rent from "../../assets/Images/icon/expenseType/rent.png";
import Grocery from "../../assets/Images/icon/expenseType/grocery.png";
import Other from "../../assets/Images/icon/expenseType/other.png";
import Recharge from "../../assets/Images/icon/expenseType/recharge.png";
import Travel from "../../assets/Images/icon/expenseType/travel.png";

const RightSide = () => {
  const categoryIcons: Record<string, string> = {
    Food: Food,
    Rent: Rent,
    Grocery: Grocery,
    Other: Other,
    Recharge: Recharge,
    Travel: Travel,
  };
  const data: ExpenseType[] = [
    {
      amount: 120,
      description: "Lunch",
      category: "Food",
      isGiven: false,
      date: "2026-04-10",
    },
    {
      amount: 5000,
      description: "Room Rent",
      category: "Rent",
      isGiven: false,
      date: "2026-04-09",
    },
    {
      amount: 80,
      description: "Bus Ticket",
      category: "Travel",
      isGiven: false,
      date: "2026-04-09",
    },
    {
      amount: 40,
      description: "Mobile Recharge",
      category: "Recharge",
      isGiven: false,
      date: "2026-04-08",
    },
    {
      amount: 300,
      description: "Groceries",
      category: "Grocery",
      isGiven: false,
      date: "2026-04-08",
    },
    {
      amount: 60,
      description: "Snacks",
      category: "Food",
      isGiven: false,
      date: "2026-04-07",
    },

    {
      amount: 200,
      description: "Dinner",
      category: "Food",
      isGiven: false,
      date: "2026-04-07",
    },
    {
      amount: 120,
      description: "Auto Fare",
      category: "Travel",
      isGiven: false,
      date: "2026-04-06",
    },
    {
      amount: 450,
      description: "Supermarket",
      category: "Grocery",
      isGiven: false,
      date: "2026-04-06",
    },
    {
      amount: 30,
      description: "Top-up",
      category: "Recharge",
      isGiven: false,
      date: "2026-04-05",
    },
    {
      amount: 90,
      description: "Coffee",
      category: "Food",
      isGiven: false,
      date: "2026-04-05",
    },

    {
      amount: 110,
      description: "Lunch",
      category: "Food",
      isGiven: false,
      date: "2026-04-04",
    },
    {
      amount: 5000,
      description: "Room Rent",
      category: "Rent",
      isGiven: false,
      date: "2026-04-03",
    },
    {
      amount: 60,
      description: "Rickshaw",
      category: "Travel",
      isGiven: false,
      date: "2026-04-03",
    },
    {
      amount: 350,
      description: "Vegetables",
      category: "Grocery",
      isGiven: false,
      date: "2026-04-02",
    },
    {
      amount: 50,
      description: "Misc",
      category: "Other",
      isGiven: false,
      date: "2026-04-02",
    },

    {
      amount: 140,
      description: "Dinner",
      category: "Food",
      isGiven: false,
      date: "2026-04-01",
    },
    {
      amount: 20,
      description: "Recharge",
      category: "Recharge",
      isGiven: false,
      date: "2026-04-01",
    },
    {
      amount: 90,
      description: "Taxi",
      category: "Travel",
      isGiven: false,
      date: "2026-03-31",
    },
    {
      amount: 500,
      description: "Groceries",
      category: "Grocery",
      isGiven: false,
      date: "2026-03-31",
    },
    {
      amount: 40,
      description: "Snacks",
      category: "Food",
      isGiven: false,
      date: "2026-03-30",
    },

    {
      amount: 100,
      description: "Lunch",
      category: "Food",
      isGiven: false,
      date: "2026-03-30",
    },
    {
      amount: 70,
      description: "Bus",
      category: "Travel",
      isGiven: false,
      date: "2026-03-29",
    },
    {
      amount: 25,
      description: "Recharge",
      category: "Recharge",
      isGiven: false,
      date: "2026-03-29",
    },
    {
      amount: 200,
      description: "Groceries",
      category: "Grocery",
      isGiven: false,
      date: "2026-03-28",
    },
    {
      amount: 55,
      description: "Other Expense",
      category: "Other",
      isGiven: false,
      date: "2026-03-28",
    },

    {
      amount: 130,
      description: "Dinner",
      category: "Food",
      isGiven: false,
      date: "2026-03-27",
    },
    {
      amount: 95,
      description: "Travel Fare",
      category: "Travel",
      isGiven: false,
      date: "2026-03-27",
    },
    {
      amount: 220,
      description: "Market",
      category: "Grocery",
      isGiven: false,
      date: "2026-03-26",
    },
    {
      amount: 65,
      description: "Misc",
      category: "Other",
      isGiven: false,
      date: "2026-03-26",
    },
  ];
  return (
    <div
      id="right"
      className=" w-full md:w-1/3 shadow-card border border-black/15 rounded-xl p-2 sm:p-5 md:p-2 lg:p-5 h-full flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold">Last 30 Expenses</h2>
      <div className=" flex flex-col gap-3 w-full overflow-y-auto no-scrollbar p-1">
        {data.map((e, i) => {
          return (
            <div key={i} className="bg-[#F7F8FA] hover:bg-gray-100  cursor-pointer w-full min-h-25 rounded-lg shadow-card flex gap-2 sm:gap-6 items-center p-6">
              <div className="p-2 flex items-center justify-center border border-black/10 rounded-lg">
                <img src={categoryIcons[e.category]} alt={e.category} />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-lg sm:text-xl md:text-[15px] lg:text-xl">{e.description}</p>
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between sm:items-center md:items-start lg:items-center w-full gap-1 sm:gap-2 text-sm">
                    <p className="font-medium">{e.category}</p>
                    <div className="min-w-2 min-h-2 bg-gray-400 rounded-full  hidden sm:flex md:hidden lg:flex"></div>
                    <p className="font-medium text-gray-600">{e.date}</p>
                  </div>
                </div>
                <h1 className="  text-xl sm:text-2xl md:text-xl lg:text-2xl font-semibold">{"₹ "}{e.isGiven?"-":""}{e.amount.toLocaleString("en-IN")}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSide;

type ExpenseType = {
  amount: number;
  description: string;
  category: string;
  isGiven: boolean;
  date: string;
};
