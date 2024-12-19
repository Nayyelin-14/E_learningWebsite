import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VerifyEmail } from "../../../EndPoints/auth";
import { Button } from "../../../../lib/components/ui/button";
import { Card } from "../../../../lib/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoIosReturnLeft } from "react-icons/io";
import DoiTung from "./DoiTung.png";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to verify the token
  const verification = async (token) => {
    try {
      const response = await VerifyEmail(token);

      if (response.isSuccess) {
        setSuccess(response.message);
      } else {
        setError(response.message);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Run verification on mount and introduce a delay before setting loading to false
  useEffect(() => {
    if (token) {
      const delay = setTimeout(() => {
        verification(token);
      }, 2000);

      return () => clearTimeout(delay);
    }
  }, [token]);

  return (
    <div className="flex h-screen">
      {/* Left Section for the Card */}
      <div className="w-1/2 flex items-center justify-center ">
        <Card className="w-full h-full flex items-center justify-center ">
          {loading && (
            <div className="flex flex-col items-center gap-10">
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <DotLottieReact
                  src="https://lottie.host/15a47fa5-ef23-4b36-beb0-a316f046c0d6/5FIZy4KUJ0.lottie"
                  loop
                  autoplay
                />
              </div>
              <div className="text-gray-500 text-xl mb-4">
                Verifying your email, please wait...
              </div>
            </div>
          )}
          {success && !loading && !error && (
            <div className="flex flex-col">
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <DotLottieReact
                  src="https://lottie.host/3ed2fdab-c424-46f7-92da-bcd7148c41a2/r9uaqV7GBf.lottie"
                  loop={false}
                  autoplay
                />
              </div>
              <div className="text-green-500 text-xl font-bold mb-4">
                {success}
              </div>
              <div className="my-7 text-right">
                <Button className="text-black text-md p-2 hover:underline font-bold border border-black">
                  <Link to={"/auth/login"} className="flex items-center gap-2">
                    Go back to login
                    <IoIosReturnLeft className="font-bold" size={24} />
                  </Link>
                </Button>
              </div>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center gap-4">
              <div className="text-red-600 text-3xl font-bold mb-4 text-center">
                {error}!!!
              </div>
              <Button className="bg-destructive  text-white p-2 rounded-md hover:bg-destructive/70">
                <Link
                  to={"/auth/register"}
                  className="flex items-center gap-2 font-bold"
                >
                  Go back <IoIosReturnLeft className="font-bold" size={24} />
                </Link>
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Right Section for the Image */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <img
          src={DoiTung}
          alt="DoiTung"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EmailVerification;
