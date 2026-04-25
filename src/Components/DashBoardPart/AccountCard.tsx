import cashAaccountImage from "../../assets/Images/icon/accountType/cashAccount.png";
import primaryAaccountImage from "../../assets/Images/icon/accountType/primaryAccount.png";
import normalAaccountImage from "../../assets/Images/icon/accountType/normalAccount.png";
import type { AllAccount } from "../../types/userDataType";

const AccountCard = ({ accountDetail }: AccountCardProps ) => {
  const type: string = accountDetail.type;
  const account: string = accountDetail.account;
  const balance: number = accountDetail.balance;

  return (
    <div className="  bg-[#F1F5F9] max-w-120 w-75 h-full min-w-75 rounded-xl border border-black/10 cursor-pointer hover:scale-101 hove:shadow-xl/20 p-3 px-6 flex flex-col justify-between">
      <div className="flex justify-between  items-center">
        <img
          src={
            type === "cash"
              ? cashAaccountImage
              : type === "primary"
                ? primaryAaccountImage
                : normalAaccountImage
          }
          alt="account"
          className="xl:w-5 xl:h-5  min-w-3 min-h-3"
        />
        <p className="xl:text-lg text-[16px] font-medium">{type.replace(/^./, (match) => match.toUpperCase())}{" "}Account</p>
      </div>
      <h2 className="xl:text-lg text-[16px]">{type=="cash"?"Cash in hand" :`******${account}`}</h2>
      <h1 className="xl:text-2xl text-xl font-bold">₹<span>{balance.toLocaleString("en-IN")}</span></h1>
    </div>
  );
};

export default AccountCard;

// type Account = {
//   id:string
//  type: "cash" | "primary" | "normal";
//   account: string;
//   balance: number;
// };

type AccountCardProps = {
  accountDetail: AllAccount;
};
