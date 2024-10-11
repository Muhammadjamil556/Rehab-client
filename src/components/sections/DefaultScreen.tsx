import useAuth from "../../hooks/user-details";

const DefaultScreen = () => {
  const { user } = useAuth();
  return (
    <div className="text-center flex flex-col items-center h-full">
      <div className="mt-10 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-white via-pink-600 to-blue-600">
        <span> Hello {user?.name}</span>{" "}
        <span className="text-yellow-600">👋</span>
      </div>

      <div className="text-4xl text-[#444746] font-bold mt-10">
        How can I help you today?
      </div>
    </div>
  );
};

export default DefaultScreen;
