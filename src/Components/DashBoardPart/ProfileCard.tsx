type User = {
  email: string;
  fullName: string;
  userName: string;
};

const ProfileCard = () => {
  const getColorFromString = (str: string) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#1A73E8",
      "#F59E0B",
      "#10B981",
      "#8B5CF6",
      "#EF4444",
    ];

    return colors[Math.abs(hash) % colors.length];
  };

  const getTextColor = (bg: string) => {
    const color = bg.replace("#", "");
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "#000" : "#fff";
  };

  const user: User = {
    email: "mdey7054@gamil.com",
    fullName: "Protyush Dey",
    userName: "Protyush20",
  };

  const bgColor = getColorFromString(user.userName);
  const textColor = getTextColor(bgColor);

  return (
    <div className="min-w-60 w-full sm:w-2/7 h-full rounded-lg shadow-card flex sm:flex-col justify-between sm:justify-center items-center gap-3 p-2 px-4" >
      <div className="shadow-card rounded-full w-16 aspect-square flex items-center justify-center text-3xl font-medium" style={{ backgroundColor: bgColor, color: textColor }} >
        <p>{user.fullName.charAt(0).toLocaleUpperCase()}</p>
      </div>
      <div className="flex flex-col gap-1 justify-center sm:items-center font-medium text-[16px] ">
        <h2>{user.fullName}</h2>
        <h2 className="text-gray-500">{user.email}</h2>
        <h2>{user.userName}</h2>
      </div>
    </div>
  );
};

export default ProfileCard;
