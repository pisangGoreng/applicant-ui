import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";

// type Props = {};

const ApplicantDetailsCard = ({ details }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{details.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-row gap-2 items-center my-1">
          <p>Email: </p>
          <Button
            onClick={() => {}}
            className=" text-blue-400 font-extrabold bg-transparent outline-none hover:bg-transparent bg-red-300 h-0 p-0"
          >
            {details.email}
          </Button>
        </div>

        <div className="flex flex-row gap-2 my-1">
          <p>Phone No: </p>
          <p>{details.phoneNumber}</p>
        </div>

        <div className="flex flex-row gap-2 my-1">
          <p>Years of experience: </p>
          <p>{details.yoe}</p>
        </div>

        <div className="flex flex-row gap-2 my-1">
          <p>Location: </p>
          <p>{details.location}</p>
        </div>

        <div className="flex flex-row gap-2 items-center my-1">
          <p>Resume: </p>
          <Button
            onClick={() => {}}
            className=" text-blue-400 font-extrabold bg-transparent outline-none hover:bg-transparent bg-red-300 h-0 p-0"
          >
            Resume Link
          </Button>
        </div>

        <div className="flex flex-row gap-2 my-1">
          <p>Status: </p>
          <p className="text-black font-extrabold">
            {details.applicantStatus.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-row justify-between items-center gap-2">
        <Button className="w-full bg-green-700 text-white">
          Schedule Interview
        </Button>
        <Button className="w-full bg-white text-green-700 border-green-700 border hover:text-white">
          Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicantDetailsCard;
