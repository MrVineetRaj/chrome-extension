import { FaCircleNotch } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="h-full  flex flex-col mt-8 justify-center items-center">
      <FaCircleNotch className="size-50 animate-spin text-primary" />
      <p className="text-xl mt-4 font-semibold">Connecting Backend</p>
      <p className="text-sm bg-orange-100 text-orange-500 p-2 rounded-md mt-4">
        It may take 1 or 2 minutes so please wait
      </p>
    </div>
  );
};

export default Loader;
