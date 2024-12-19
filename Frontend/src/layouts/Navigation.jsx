import React, { useState } from "react";
import Logo from "../components/Images/Logo2.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { LogOutIcon, User2Icon } from "lucide-react";
const Navigation = () => {
  const [isactive, setIsactive] = useState(false);
  const menuItems = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/Courses",
      label: "Courses",
    },
  ];
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="flex items-center justify-between max-w-7xl h-24 mx-auto">
      <div>
        <img src={Logo} alt="" />
      </div>

      <div className="flex items-center justify-between gap-36">
        {menuItems &&
          menuItems.map((item) => (
            <div className="h-10 w-24 text-center" key={item.link}>
              <Link
                to={item.link}
                className={`text-[20px] hover:text-yellow-400 ${
                  window.location.pathname === item.link && "text-yellow-400"
                } `}
              >
                {item.label}
              </Link>
              {window.location.pathname === item.link && (
                <hr className="h-1 bg-yellow-400 mt-5 w-24" />
              )}
            </div>
          ))}
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.user_profileImage} />
              <AvatarFallback>
                {user.user_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="my-3 p-3 ">
            <div className="flex gap-3 p-3 border-2 border-black/20  rounded-lg items-center cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.user_profileImage} />
                <AvatarFallback>
                  {user.user_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-sm">{user.user_name}</p>
                <p className="font-medium text-sm">{user.user_email}</p>
              </div>
            </div>
            <DropdownMenuItem className="cursor-pointer group h-12 mt-2 hover:bg-black/20 ">
              <User2Icon className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:text-blue-600 transition-all duration-00 ease-in-out" />
              <span className="text-sm font-bold">My profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer  h-12 group " // Ensure valid color class
            >
              <LogOutIcon className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:text-red-600 group-hover:scale-90 transition-all duration-300 ease-in-out " />
              <span className="text-sm font-medium group-hover:text-red-600 transition-all duration-300 ease-in-out">
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navigation;
