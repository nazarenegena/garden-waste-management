import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICard } from "../types/ICard";
import Skips from "./Skips";

type StepStatus = "complete" | "current" | "upcoming";

interface Step {
  id: number;
  name: string;
  status: StepStatus;
}

const SelectSkip = () => {
  const navigate = useNavigate();
  const [currentStep] = useState<number>(3);
  const [selectedSkip, setSelectedSkip] = useState<ICard | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const stepNameStyle =
    "absolute left-1/11 -translate-x-1/2 pt-4 text-sm font-medium";

  // sample predefined steps
  const initialSteps: Step[] = [
    { id: 1, name: "Postcode", status: "complete" },
    { id: 2, name: "Waste Type", status: "complete" },
    { id: 3, name: "Select Skip", status: "current" },
    { id: 4, name: "Permit", status: "upcoming" },
  ];

  const updatedSteps: Step[] = initialSteps.map((step) => {
    if (step.id < currentStep) {
      return { ...step, status: "complete" };
    } else if (step.id === currentStep) {
      return { ...step, status: "current" };
    } else {
      return { ...step, status: "upcoming" };
    }
  });

  const handleSkipSelection = (skip: ICard) => {
    setSelectedSkip(skip);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 ">
        <div className="mb-10 flex w-full max-w-2xl items-center justify-center px-4 py-6 text-sm font-medium text-white">
          <ol className="flex w-full items-center justify-center">
            {updatedSteps.map((step, index) => (
              <li
                key={step.name}
                className={`relative ${
                  index !== initialSteps.length - 1 ? "lg:pr-20 pr-10" : ""
                }`}
              >
                {step.status === "complete" ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-0.5 w-full bg-green-600" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green-600 hover:bg-green-900 ">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">{step.name}</span>
                    </div>
                    <div className={`${stepNameStyle} text-green-600`}>
                      {step.name}
                    </div>
                  </>
                ) : step.status === "current" ? (
                  <>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                      <span className="sr-only">{step.name}</span>
                    </div>
                    <div className={`${stepNameStyle} text-green-600 `}>
                      {step.name}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>

                    {currentStep === 3 && selectedSkip ? (
                      <>
                        <div className="absolute inset-0 flex items-center">
                          <div className="h-0.5 w-full bg-gray-200" />
                        </div>
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-500 bg-white">
                          <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                          <span className="sr-only">{step.name}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center">
                          <div className="h-0.5 w-full bg-green-200" />
                        </div>
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400 bg-white">
                          <span className="h-2.5 w-2.5 rounded-full bg-gray-500" />
                          <span className="sr-only">{step.name}</span>
                        </div>
                      </>
                    )}

                    <div className={`${stepNameStyle} text-green-600 `}>
                      {step.name}
                    </div>
                    {currentStep === 3 && selectedSkip ? (
                      <div className={`${stepNameStyle} text-green-600 `}>
                        {step.name}
                      </div>
                    ) : (
                      <div className={`${stepNameStyle} text-gray-500 `}>
                        {step.name}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Skips onSkipSelect={handleSkipSelection} selectedSkip={selectedSkip} />

      {selectedSkip ? (
        <div className="fixed bottom-0 z-50 dark:bg-primary bg-accent shadow-xl flex justify-center items-center py-4 w-screen">
          <button
            onClick={() => {
              navigate("/permit-check", {
                state: { selectedSkip },
              });
            }}
            className="px-6 py-2 bg-green-600 border border-green-500 shadow-lg text-white  rounded-md hover:bg-green-700 cursor-pointer"
          >
            Confirm selection {selectedSkip.id}
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SelectSkip;
