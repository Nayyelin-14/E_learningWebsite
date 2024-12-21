import { Button } from "../../../../@/components/ui/button";
import React from "react";

import { NavLink } from "react-router-dom";
const AuthHeader = ({ label_1, label_2, herf_1, herf_2 }) => {
  return (
    <div className="flex justify-center max-w-full gap-20 mx-auto items-center h-16 mt-6">
      <Button asChild className=" w-[100px] text-center  ">
        <NavLink
          to={herf_1}
          className="relative text-[19px]  text-black font-medium "
        >
          {label_1}
          {location.pathname === herf_1 && (
            <hr className="border-none w-full h-[3px] rounded-lg bg-black mt-4" />
          )}
        </NavLink>
      </Button>
      <Button asChild className=" w-[100px] text-center ">
        <NavLink
          to={herf_2}
          className="relative text-[19px] font-medium text-black"
        >
          {label_2}
          {location.pathname === herf_2 && (
            <hr className="border-none w-full h-[3px] rounded-lg bg-black mt-4" />
          )}
        </NavLink>
      </Button>
    </div>
  );
};

export default AuthHeader;
