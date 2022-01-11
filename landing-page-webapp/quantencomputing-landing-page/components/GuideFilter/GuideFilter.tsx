import React from "react";
import Button from "../Button/Button";

export enum GuideCategory {
  All = "All",
  Beginner = "Beginner",
  Advanced = "Advanced",
}

export interface GuideFilterProps {
  currentCategory: GuideCategory;
  setCurrentCategory: React.Dispatch<React.SetStateAction<GuideCategory>>;
}

export default function GuideFilter({
  currentCategory,
  setCurrentCategory,
}: GuideFilterProps) {
  return (
    <div className={"flex flex-col items-center"}>
      <div className={"flex w-full md:w-auto justify-between md:space-x-10"}>
        {Object.values(GuideCategory).map((category, index) => (
          <div
            key={index}
            className={"w-filter-button-sm md:w-filter-button text-sm"}
          >
            <Button
              size={"sm"}
              fullWidth
              onClick={() => setCurrentCategory(category)}
              variant={currentCategory === category ? "primary" : "link"}
            >
              {category}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
