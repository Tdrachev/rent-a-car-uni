import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IVehicle } from "../interfaces/interfaces_core";

interface EditVehicleProps {}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const EditVehicle = () => {
  const query = useQuery();
  const [id, setId] = useState<string>();
  const [vehicleData, setVehicleData] = useState<IVehicle>();
  const [vehicleType, setVehicleType] = useState(0);
  const [fuelType, setFuelType] = useState(0);
  const [picture, setPicture] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = query.get("id");
    if (id) {
      setId(id);
    }

    const fetchVehicleData = async () => {
      const vehicleData = await axios.get(
        "http://localhost:3000/vehicles/" + id
      );
      setVehicleType(vehicleData.data.VehicleType);
      setFuelType(vehicleData.data.FuelType);
      setPicture(vehicleData.data.Picture);
      setPricePerDay(vehicleData.data.PricePerDay);
      setCount(vehicleData.data.Count);
    };
    fetchVehicleData();
  }, []);

  const updateVehicle = async () => {
    console.log(id);
    const updated = await axios.patch("http://localhost:3000/vehicles/" + id, {
      VehicleType: vehicleType,
      FuelType: fuelType,
      Picture: picture,
      PricePerDay: pricePerDay,
      Count: count,
    });
    if (updated.status == 200) {
      window.location.href = "/vehicle/list";
    }
  };
  return (
    <form className="border p-5 flex flex-col">
      <h1>Editing Vehcile ID: {id}</h1>
      <label htmlFor="vehicle-type" className="mt-2">
        Vehicle Type:
      </label>
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(Number(e.target.value))}
      >
        <option value={0}>economy</option>
        <option value={1}>estate</option>
        <option value={2}>luxury</option>
        <option value={3}>suv</option>
        <option value={4}>cargo</option>
      </select>
      <label htmlFor="fuel-type" className="mt-2">
        Fuel Type:
      </label>
      <select
        value={fuelType}
        onChange={(e) => setFuelType(Number(e.target.value))}
      >
        <option value={0}>petrol</option>
        <option value={1}>diesel</option>
        <option value={2}>hybrid</option>
        <option value={3}>electric</option>
      </select>
      <label htmlFor="picture" className="mt-2">
        Picture:
      </label>
      <input
        type={"text"}
        className="border-2 p-1"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      ></input>
      <label htmlFor="price-per-day" className="mt-2">
        Price Per Day:
      </label>
      <input
        type={"number"}
        className="border-2 p-1"
        value={pricePerDay}
        onChange={(e) => setPricePerDay(Number(e.target.value))}
      ></input>
      <label htmlFor="count" className="mt-2">
        Count:
      </label>
      <input
        type={"number"}
        className="border-2 p-1"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          updateVehicle();
        }}
        className="border p-2 mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default EditVehicle;
