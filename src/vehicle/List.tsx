import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IVehicle, VehicleType, FuelType } from "../interfaces/interfaces_core";
import axios from "axios";

const VehicleList = () => {
  const [listItems, setListItems] = useState<IVehicle[]>([]);

  useEffect(() => {
    async function getVehicles() {
      const vehicles = await axios.get("http://localhost:3000/vehicles");
      console.log(vehicles.data);
      setListItems(vehicles.data);
    }
    getVehicles();
  }, []);

  const deleteVehicle = async (id: number) => {
    const deleted = await axios.delete("http://localhost:3000/vehicles/" + id);
    window.location.href = "/vehicle/list";
  };
  return (
    <div className="flex flex-col   justify-start">
      <table className=" table-header-group border-2  ml-5 mt-5">
        <thead>
          <tr className="flex flex-row justify-between p-5">
            <th className="mr-5">Picture:</th>
            <th className="mr-5">Vehicle Type:</th>
            <th className="mr-5">Vehicle Brand:</th>
            <th className="mr-5">Vehicle Model:</th>
            <th className="mr-5">Vehicle Year:</th>
            <th className="mr-5">Fuel Type:</th>
            <th className="mr-5">Number of seats:</th>
            <th className="mr-5">Price Per Day:</th>
            <th className="mr-5">Available:</th>
            <th className="mr-5"> </th>
            <th className="mr-5"> </th>
          </tr>
        </thead>
        {listItems.map((vehicle) => {
          return (
            <tr className="flex flex-row justify-between p-5">
              <td className="mr-5">
                <img src={vehicle.Picture} />
              </td>
              <td className="mr-5">
                <p>{VehicleType[vehicle.VehicleType]}</p>
              </td>
              <td className="mr-5">
                <p>{vehicle.Vehicle.Brand}</p>
              </td>
              <td className="mr-5">
                <p>{vehicle.Vehicle.Model}</p>
              </td>
              <td className="mr-5">
                <p>{vehicle.Vehicle.ConstructionYear}</p>
              </td>
              <td className="mr-5">
                <p>{FuelType[vehicle.FuelType]}</p>
              </td>
              <td className="mr-5">
                <p>{vehicle.NumberOfSeats}</p>
              </td>
              <td className="mr-5">
                <p>{vehicle.PricePerDay}</p>
              </td>
              <td className="mr-5">
                <p>{vehicle.Count.toString()}</p>
              </td>
              <td>
                <Link to={"/vehicle/edit?id=" + vehicle.id}>
                  <button className="border p-2 border-black">Edit</button>
                </Link>
              </td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteVehicle(Number(vehicle.id));
                  }}
                  className="border p-2 border-black"
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

export default VehicleList;
