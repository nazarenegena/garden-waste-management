import { useEffect, useState } from "react";
import Card from "./Card";
import { ICard } from "../types/ICard";
import { CgUnavailable } from "react-icons/cg";

type IdProp = {
  id?: number;
  onSkipSelect: (skip: ICard) => void;
  selectedSkip?: ICard | null;
};

const Skips = ({ id, onSkipSelect, selectedSkip }: IdProp) => {
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
          className="dark:bg-neutral bg-base border-2 border-green-600 mr-3 size-5 animate-spin"
          viewBox="0 0 24 24"
        ></svg>
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
    <div className="flex justify-center items-center">
      <div className="dark:bg-secondary/15 bg-neutral/25 z-50 lg:w-[80rem] md:w-[64rem] w-full flex justify-center py-8 rounded-sm shadow-inset">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
          {cards.map((card: ICard) => (
            <Card
              key={card.id}
              id={id}
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
    </div>
  );
};

export default Skips;
