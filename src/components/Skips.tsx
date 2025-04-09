import { useEffect, useState } from "react";
import Card from "./Card";
import { ICard } from "../types/ICard";
import { CgUnavailable } from "react-icons/cg";

type IdProp = {
  onSkipSelect: (skip: ICard) => void;
  selectedSkip?: ICard | null;
};

const Skips = ({ onSkipSelect, selectedSkip }: IdProp) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(
          "Failed to load available skips for your location. Please try again later."
        );
        console.error("Error fetching skips:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (isLoading) {
    return (
      <div className=" bg-muted/15 flex justify-center items-center rounded-lg shadow-md h-screen">
        <svg
          className="w-8 h-8 animate-spin text-base/20  dark:text-base/80  fill-green-600 mr-6"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <p className="dark:text-neutral text-base text-lg font-mono">
          {" "}
          Loading skips ...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-muted/15 flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-md h-screen">
        <p className="dark:text-neutral text-base text-lg font-mono mb-4">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-muted text-white rounded-md hover:bg-muted/45 transition-colors text-sm cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className=" bg-muted/20 flex items-center justify-center text-center p-4 rounded-lg shadow-md h-screen">
        <CgUnavailable size={30} color="red" />

        <p className="dark:text-neutral text-base text-lg font-mono mx-2">
          No skips for your location available ...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card: ICard) => (
          <Card
            key={card.id}
            hire_period_days={card.hire_period_days}
            price_before_vat={card.price_before_vat}
            vat={card.vat}
            postcode={card.postcode}
            size={card.size}
            forbidden={card.forbidden}
            created_at={card.created_at}
            updated_at={card.updated_at}
            allowed_on_road={card.allowed_on_road}
            allows_heavy_waste={card.allows_heavy_waste}
            onClick={() => onSkipSelect(card)}
            isChecked={selectedSkip?.id === card.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Skips;
