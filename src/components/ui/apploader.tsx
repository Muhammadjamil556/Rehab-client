import RingLoader from "react-spinners/RingLoader";

function AppLoader() {
  return (
    <div className=" center ">
      <RingLoader color={"white"} loading={true} size={80} />
    </div>
  );
}

export default AppLoader;
