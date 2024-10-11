import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { useGetMedicineDetailsQuery } from "../../toolkit/services/medicine-api";
import { Button } from "../../components/ui/button";

const MedicineDetails = () => {
  const { id } = useParams<{ id: string }>(); // Assuming you're using react-router-dom to get the ID from the URL
  const { data, isLoading, isError } = useGetMedicineDetailsQuery(id);

  // Accessing the medicine details from the response
  const medicine = data?.response;

  if (isLoading) {
    // Loading state
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-10 w-3/4 my-2" />
        <Skeleton className="h-10 w-3/4 my-2" />
        <Skeleton className="h-10 w-3/4 my-2" />
      </div>
    );
  }

  if (isError) {
    // Error state
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-red-500">
          Error fetching medicine details.
        </p>
      </div>
    );
  }

  if (!medicine) {
    // Handle case where medicine is not found
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-gray-500">Medicine not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <img
            src={medicine.imageURL}
            alt={medicine.name}
            className="w-full h-64 object-cover"
          />
        </CardHeader>
        <CardDescription>
          <h2 className="text-xl font-bold mb-2">{medicine.name}</h2>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Composition:</strong> {medicine.composition}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Uses:</strong> {medicine.uses}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Side Effects:</strong> {medicine.sideEffects}
          </p>
        </CardDescription>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            <strong>Manufacturer:</strong> {medicine.manufacturer}
          </p>
          <Button onClick={() => alert("Booking...")}>Buy Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MedicineDetails;
