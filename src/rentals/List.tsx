import axios from "axios";
import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IVehicle,
  VehicleType,
  FuelType,
  ICustomer,
  IRentalEvent,
} from "../interfaces/interfaces_core";

const RentalTest: IRentalEvent[] = [
  {
    id: 0,
    StartDateTime: new Date(),
    EndDateTime: new Date(),
    Vehicle: {
      id: 0,
      VehicleType: VehicleType.economy,
      Vehicle: {
        Brand: "VW",
        Model: "Golf",
        ConstructionYear: 1992,
      },
      FuelType: FuelType.petrol,
      NumberOfSeats: 4,
      Picture: "/test/213.png",
      PricePerDay: 100,
      Count: 5,
    },
    Customer: {
      id: 0,
      FullName: "TEst Test",
      Email: "abcd@gmail.com",
      Phone: "02123123",
    },
  },
];

const RentalList = () => {
  const [listItems, setListItems] = useState<IRentalEvent[]>();

  useEffect(() => {
    const fetchRentals = async () => {
      const rentals = await (
        await axios.get("http://localhost:3000/rentals")
      ).data;
      const vehicles = await (
        await axios.get("http://localhost:3000/vehicles")
      ).data;
      const customers = await (
        await axios.get("http://localhost:3000/customers")
      ).data;

      const rentalList = rentals.map((r: any) => {
        const vehicle = vehicles.filter((v: any) => {
          return v.id == r.VehicleId;
        })[0];
        const customer = customers.filter((c: any) => {
          return c.id == r.CustomerId;
        })[0];
        r.StartDateTime = new Date(r.StartDateTime);
        r.EndDateTime = new Date(r.EndDateTime);
        r.Vehicle = vehicle;
        r.Customer = customer;
        return r;
      });

      setListItems(rentalList);
    };
    fetchRentals();
  }, []);

  const deleteRental = async (id: number) => {
    const deleted = await axios.delete("http://localhost:3000/rentals/" + id);
    window.location.href = "/rental/list";
  };

  return (
    <div className="flex flex-col   justify-start">
      <table className=" table-header-group border-2  ml-5 mt-5">
        <thead>
          <tr className="flex flex-row justify-between p-5">
            <th className="mr-5">Start Date:</th>
            <th className="mr-5">End Date:</th>
            <th className="mr-5">Vehicle:</th>
            <th className="mr-5">Customer:</th>
            <th className="mr-5">Total Cost:</th>
            <th className="mr-5"> </th>
            <th className="mr-5"> </th>
          </tr>
        </thead>
        {listItems?.map((rental) => {
          return (
            <tr className="flex flex-row justify-between p-5">
              <td className="mr-5">
                <p>{rental.StartDateTime.toDateString()}</p>
              </td>
              <td className="mr-5">
                <p>{rental.EndDateTime.toDateString()}</p>
              </td>
              <td className="mr-5">
                <p>{rental.Vehicle.Vehicle.Brand}</p>
              </td>
              <td className="mr-5">
                <p>{rental.Vehicle.Vehicle.Model}</p>
              </td>
              <td className="mr-5">
                <p>{rental.Customer.FullName}</p>
              </td>
              <td className="mr-5">
                <p>
                  {rental.Vehicle.PricePerDay *
                    Math.abs(
                      (rental.StartDateTime.getTime() -
                        rental.EndDateTime.getTime()) /
                        (1000 * 3600 * 24)
                    )}
                </p>
              </td>
              <td>
                <button
                  className="border p-2 border-black"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteRental(rental.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default RentalList;
