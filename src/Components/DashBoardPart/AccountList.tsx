import { useEffect, useRef, useState } from "react";
import AccountCard from "./AccountCard";
import leftIcon from "../../assets/Images/icon/horizontalScBtn.png";
const AccountList = () => {
  const [canScroll, setCanScroll] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScroll(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const accounts: Account[] = [
    {
      accountType: "cash",
      accountName: "Cash",
      balance: 2500,
    },
    {
      accountType: "primary",
      accountName: "1234",
      balance: 12000,
    },
    {
      accountType: "normal",
      accountName: "5678",
      balance: 5400,
    },
  ];
  return (
    <div className="w-full h-2/9 flex gap-3 overflow-hidden ">
      <button
        onClick={scrollLeft}
        className={`transition ${!canScroll ? "hidden" : ""}`}
      >
        <img src={leftIcon} alt="left" className="xl:w-12 xl:h-12 w-8 h-8" />
      </button>

      <div
        className="flex-1 min-w-0 h-full flex gap-8 overflow-x-auto no-scrollbar"
        ref={scrollRef}
      >
        {accounts.map((e, index) => {
          return <AccountCard key={index} accountDetail={e} />;
        })}
      </div>
      <button
        onClick={scrollRight}
        className={`transition ${!canScroll ? "hidden" : ""} `}
      >
        <img src={leftIcon} alt="left" className="xl:w-12 xl:h-12 w-8 h-8 rotate-180" />
      </button>
    </div>
  );
};

export default AccountList;

type Account = {
  accountType: "cash" | "primary" | "normal";
  accountName: string;
  balance: number;
};
