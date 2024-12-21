import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../../../@/components/ui/card";
import Providerlogin from "./Providerlogin";
import AuthHeader from "./AuthHeader";
import { Link } from "react-router-dom";
import Background from "../../Images/Background.png";

import Badge from "../../../layouts/Badge";
import TypingAnimation from "../../../../@/components/ui/typing-animation";

const AuthForm = ({
  children,
  isloginPage,
  showProvider,
  label_1,
  label_2,
  herf_1,
  herf_2,
  label_3,
  label_4,
  href_3,
}) => {
  return (
    <div className="w-full h-[866px] relative">
      <div className="absolute w-full h-full top-0 left-0">
        <img src={Background} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 mb-10">
        <Badge />
      </div>

      <div className="relative max-w-[80%] mx-auto flex  items-center justify-center  z-10 gap-10">
        <div className="hidden w-[45%] xl:w-[60%] lg:block flex-col items-center justify-center ">
          <div className="mb-10">
            <h2 className="font-bold text-3xl xl:text-6xl  text-white">
              DOiTUNG
            </h2>
            <h2 className="font-bold text-4xl xl:text-6xl text-white">
              E-Learning
            </h2>
          </div>
          <div className="  w-[80%]">
            <TypingAnimation className={`text-lg xl:text-xl`}>
              {"Let's build the better community with Doi-Tung"}
            </TypingAnimation>
          </div>
        </div>

        <div
          className={` rounded-3xl w-[489px]  bg-pale   ${
            isloginPage ? "h-[483px]" : "h-[523px]"
          }`}
        >
          <Card className="rounded-3xl flex flex-col h-full gap-7">
            <CardHeader>
              <AuthHeader
                label_1={label_1}
                label_2={label_2}
                herf_1={herf_1}
                herf_2={herf_2}
              />
            </CardHeader>
            <CardContent>
              {children}
              <CardDescription className="text-center cursor-pointer flex flex-col gap-4 mt-2">
                <Link to={href_3}>{label_3}</Link>
                {isloginPage && <p> {label_4}</p>}
              </CardDescription>
            </CardContent>

            <CardFooter className="flex flex-col items-center justify-center ">
              {showProvider && <Providerlogin />}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
