import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaTruck } from "react-icons/fa6";

const PermitCheck = () => {
  const navigate = useNavigate();
  const miniCardStyle =
    "mt-16 p-6 bg-white dark:bg-base/25 dark:border dark:border-green-600/30 rounded-lg shadow-lg flex cursor-pointer hover:bg-primary/5 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 tracking-wider">
        Where will the skip be placed ?
      </h1>
      <p className="mb-4 ">
        This helps us determine if you need a permit for your skip
      </p>

      <div className={`${miniCardStyle} mt-4`}>
        <AiFillHome className="text-2xl text-base mr-5" />
        <p>Private Property</p>
      </div>
      <div className={`${miniCardStyle} mt-4`}>
        <FaTruck className="text-2xl text-base mr-5" />
        <p>Public Road</p>
      </div>

      <div className="flex justify-between mt-20">
        <button
          className="px-6 py-2 bg-base/70 text-white rounded-md hover:bg-base/40"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400">
          Continue
        </button>
      </div>
    </div>
  );
};

export default PermitCheck;
