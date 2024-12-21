import React, { useEffect, useState } from "react";
import { get_PopularCourses } from "../../EndPoints/courses";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "../../../@/components/ui/card";
import { Button } from "../../../@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 6; // Number of courses to display per page

  const DisplayCourses = async () => {
    try {
      const response = await get_PopularCourses();
      if (response.isSuccess) {
        setPopularCourses(response.Popularcourses);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    DisplayCourses();
  }, []);

  // Calculate pagination
  // const totalItems = popularCourses.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentCourses = popularCourses.slice(startIndex, endIndex);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-bold text-xl mb-5">Popular Courses</h1>
        <div className="flex items-center justify-between flex-wrap ">
          <p className="text-md  max-w-[600px]">
            Explore our most popular programs, get job-ready for an in-demand
            career
          </p>
          <Button
            variant="link"
            className="text-md px-0 md:px-5  flex items-center justify-between"
          >
            View All <ArrowRight size={19} />
          </Button>
        </div>
      </div>
      {popularCourses && popularCourses.length !== 0 ? (
        <div className="flex justify-center lg:justify-between items-center flex-wrap gap-6">
          {popularCourses.map((popular) => (
            <motion.div
              key={popular.course_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-[80%] md:w-[48%] lg:w-[300px]"
            >
              <Card className="h-[342px] shadow-lg">
                <CardContent className="flex flex-col gap-6">
                  <img
                    src={popular.course_image_url}
                    alt=""
                    className="w-full h-[158px]"
                  />
                  <div className="px-4 flex flex-col gap-3">
                    <CardDescription className="font-bold">
                      {popular.course_name}
                    </CardDescription>
                    <CardDescription>{popular.instructor_name}</CardDescription>
                    <CardDescription>{popular.rating}</CardDescription>
                  </div>
                  <CardFooter className="flex justify-between items-center px-3">
                    {popular.is_popular ? (
                      <h4 className="py-1 px-7 bg-yellow-400">Popular</h4>
                    ) : (
                      <>Not</>
                    )}
                    <Button variant="link">check details</Button>
                  </CardFooter>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-xl text-center text-red-600 font-medium">
          No popular courses found!!!
        </div>
      )}

      {/* Pagination */}
    </div>
  );
};

export default PopularCourses;
