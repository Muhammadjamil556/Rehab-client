import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Medicine,
  useGetAllMedicinesQuery,
} from "../../toolkit/services/medicine-api";

const AllMedicines = () => {
  const { data = {}, isLoading, error } = useGetAllMedicinesQuery();
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  // Log the medicines data for debugging
  useEffect(() => {
    const medicines = data.response || []; // Accessing the response array

    console.log("Medicines data:", medicines);

    // Make sure medicines is an array and has items
    if (Array.isArray(medicines) && medicines.length > 0) {
      const filtered = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Log filtered results
      console.log("Filtered Medicines:", filtered);

      setFilteredMedicines(filtered);
    } else {
      console.error("Expected medicines to be an array, got:", medicines);
      setFilteredMedicines([]);
    }
  }, [searchQuery, data]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Available Medicines</h1>

      {/* Error message display */}
      {error && (
        <p className="text-red-500">
          Error fetching medicines: {error.message}
        </p>
      )}

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array(8)
            .fill(0)
            .map((_, index) => <Skeleton key={index} className="h-64 w-full" />)
        ) : filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="shadow-lg">
              <CardHeader>
                <img
                  src={medicine.imageURL} // Ensure this URL is correct
                  alt={medicine.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardDescription>
                <h2 className="text-lg font-bold">{medicine.name}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Composition: {medicine.composition}
                </p>
                <p className="text-sm text-gray-500">Uses: {medicine.uses}</p>
              </CardDescription>
              <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
                <Button
                  onClick={() => navigate(`/all-medicines/${medicine.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No medicines found.</p> // Message if no results
        )}
      </div>
    </div>
  );
};

export default AllMedicines;
