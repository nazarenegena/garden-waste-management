import CardImg from "../assets/cardImg.jpg";
import { CiWarning } from "react-icons/ci";
import { GoCheckCircleFill } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlinePriceChange } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type ICardProps = {
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  postcode: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  onClick: () => void;
  isChecked?: boolean;
};

const Card = ({
  size,
  hire_period_days,
  price_before_vat,
  vat,
  postcode,
  allowed_on_road,
  allows_heavy_waste,
  onClick,
  isChecked,
}: ICardProps) => {
  const totalPrice = price_before_vat * (1 + vat / 100);
  const divStyle = "flex justify-between items-center py-2";
  const paragraphStyle = "dark:text-neutral ml-3 text-sm md:text-base";
  const imageDivStyle = "flex items-center";

  return (
    <div
      className={`w-full max-w-[400px] mx-auto bg-neutral/60 dark:bg-base/25 rounded-xl shadow-xl cursor-pointer flex flex-col relative overflow-hidden transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] ${
        isChecked
          ? "border border-emerald-700 shadow-emerald-700/20 dark:border-emerald/20"
          : "border border-primary/10 dark:border-neutral/10"
      }`}
      onClick={onClick}
    >
      <div className="relative w-full aspect-video">
        {" "}
        <img
          src={CardImg}
          alt={`${size} yard skip`}
          className="object-cover w-full h-60 rounded-t-lg"
        />
      </div>

      <div className="h-18 bg-linear-to-r/hsl from-primary to-accent w-full flex items-center justify-between p-3 md:p-4">
        <p className="font-semibold text-lg md:text-xl text-neutral font-mono">
          {size} Yard Skip
        </p>
        <div className="bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs md:px-3 md:text-sm">
          {vat}% VAT
        </div>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div>
          <div className={`${divStyle}`}>
            <div className={`${imageDivStyle}`}>
              <SlCalender size={16} color="green" strokeWidth={40} />
              <p className={`${paragraphStyle} `}>Hire period:</p>
            </div>
            <p className="text-sm  font-normal">{hire_period_days} days</p>
          </div>

          <div className={`${divStyle}`}>
            <div className={`${imageDivStyle}`}>
              <SlLocationPin size={18} color="green" />
              <p className={`${paragraphStyle} `}>Postcode:</p>
            </div>
            <p className="text-sm  font-normal text-center">{postcode}</p>
          </div>

          <div className={`${divStyle}`}>
            <div className={`${imageDivStyle}`}>
              <MdOutlinePriceChange size={20} color="green" />
              <p className={`${paragraphStyle} `}>Total:</p>
            </div>
            <p className="font-semibold font-mono md:text-lg">
              £{totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <hr className="my-3 md:my-4 text-base/85" />

        <div className="mt-auto space-y-2">
          {!allowed_on_road ? (
            <div className="flex items-center">
              <CiWarning size={20} color="red" className="mr-2 flex-shrink-0" />
              <div className="text-xs sm:text-sm">
                <p>Not allowed on public roads</p>
              </div>
            </div>
          ) : (
            <div className="text-xs sm:text-sm flex items-center">
              <IoMdCheckmarkCircleOutline color="green" size={16} />
              <p className="ml-2">Allowed on public roads</p>
            </div>
          )}

          {!allows_heavy_waste ? (
            <div className="flex items-center">
              <CiWarning size={20} color="red" className="mr-2 flex-shrink-0" />
              <div className="text-xs sm:text-sm">
                Heavy waste not permitted
              </div>
            </div>
          ) : (
            <div className="text-xs sm:text-sm flex items-center">
              <IoMdCheckmarkCircleOutline color="green" size={16} />
              <p className="ml-2">Heavy waste permitted</p>
            </div>
          )}
        </div>

        {isChecked && (
          <div className="absolute bottom-2 right-2 rounded-full p-1">
            <GoCheckCircleFill size={24} color="#00A63D" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
