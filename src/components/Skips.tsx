import { useEffect, useState } from "react";
import Card from "./Card";

interface ICard {
  id: number;
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
}

const Skips = () => {
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
        setError("Failed to fetch skips. Please try again later.");
        console.error("Error fetching skips:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (isLoading) {
    return <div>Loading skips...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cards.length === 0) {
    return <div>No skips available for this location.</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="dark:bg-secondary/15 bg-neutral/25 z-50 lg:w-[80rem] md:w-[64rem] w-full flex justify-center py-8 rounded-sm">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-20 gap-16">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skips;
