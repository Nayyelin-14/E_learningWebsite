import React from "react";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Button } from "../../../../@/components/ui/button";
// import { signIn } from "next-auth/react";
const Providerlogin = () => {
  return (
    <div>
      <Button
      // onClick={() =>
      //   signIn("google", {
      //     redirect: false,
      //     callbackUrl: "/",
      //   })
      // }
      >
        <FcGoogle size={42} />
      </Button>
    </div>
  );
};

export default Providerlogin;
