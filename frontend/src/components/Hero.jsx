import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import {
 
} from "@heroicons/react/24/solid";

function Hero() {

  return (
      <div className="p-8">
        <div className="mt-6 sm:mt-40">
          <div className="container mx-auto px-4 text-center">
            <Typography className="inline-flex font-poppins text-xs rounded-lg border-[1.5px] bg-pink-500 bg-opacity-30 border-pink-500  py-1 lg:px-4 px-1 font-medium text-white border-double">
              Exciting News! Introducing our latest innovation
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mx-auto my-6 w-full leading-snug text-2xl sm:text-5xl lg:text-6xl max-w-7xl xl:text-7xl font-poppins"
            >
              Get ready to experience a new level of{" "}
              <span className="text-white leading-snug ">
                performance
              </span>{" "}
              and{" "}
              <span className="leading-snug text-white">
                functionality
              </span>
              .
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 text-sm md:text-lg font-poppins"
            >
              The time is now for it to be okay to be great. For being a bright
              color. For standing out.
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Button
                  variant="gradient"
                  color="pink"
                  className="w-full p-3 md:w-[12rem] font-poppins text-sm 
                  md:text-lg"
                >
                  get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Hero;