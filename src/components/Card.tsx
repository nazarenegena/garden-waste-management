import Image1 from "../assets/image1.jpg";
import { CiWarning } from "react-icons/ci";

type ICardProps = {
  id?: number;
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
};

const Card = ({
  size,
  hire_period_days,
  price_before_vat,
  vat,
  postcode,
  allowed_on_road,
  allows_heavy_waste,
}: ICardProps) => {
  // Calculating the total price
  const totalPrice = price_before_vat * (1 + vat / 100);

  return (
    <div className="w-full max-w-sm bg-neutral/60 dark:bg-base/25 rounded-xl shadow-xl border border-primary/10 dark:border-neutral/10 cursor-pointer flex flex-col px-4 pt-4 relative overflow-hidden transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]">
      {/* Card Image */}
      <div className="relative">
        <img
          src={Image1}
          alt={`${size} yard skip`}
          className="object-cover w-full h-40 md:h-48 rounded-t-lg"
        />

        {/* VAT Badge */}
        <div className="absolute top-2 right-2 bg-red-100 text-red-700 rounded-full px-3 py-1 font-semibold text-xs">
          {vat}% VAT
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            {/* Title */}
            <h3 className="font-semibold text-lg md:text-xl dark:text-white text-black font-mono">
              {size} Yard Skip
            </h3>
            {/* Hire Period */}
            <p className="text-sm md:text-base dark:text-gray-300 mt-1">
              {hire_period_days} day hire period
            </p>
          </div>

          <div className="text-sm ">
            <p>Postcode</p>
            <p className="text-emerald-700 mt-1 font-semibold">{postcode}</p>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="mb-4">
          <p className="font-bold text-md md:text-lg dark:text-white text-gray-900 font-mono">
            Total: £{totalPrice.toFixed(2)}
          </p>
          <p className="text-xs md:text-sm dark:text-gray-300 mt-1">
            From : £{price_before_vat.toFixed(2)} + VAT
          </p>
        </div>

        {/* Warning messages */}
        <div className="mt-auto space-y-2">
          {!allowed_on_road && (
            <div className="flex items-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-300">
              <CiWarning size={20} className="mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Not allowed on public roads
              </span>
            </div>
          )}

          {!allows_heavy_waste && (
            <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300">
              <CiWarning size={20} className="mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Heavy waste not permitted
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
