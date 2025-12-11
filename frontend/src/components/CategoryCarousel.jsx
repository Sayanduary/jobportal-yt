import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "UI/UX Designer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-3">
          Popular Categories
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Find jobs by category
        </p>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full rounded-full text-xs md:text-sm border-[#0a66c2] text-[#0a66c2] hover:bg-[#e8f3ff] dark:border-[#70b5f9] dark:text-[#70b5f9] dark:hover:bg-gray-800 h-9 md:h-10"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
