import axios from "axios";
import { useState } from "react";

interface EditVehicleProps {}

const CreateVehicle = () => {
  const [vehicleType, setVehicleType] = useState(0);
  const [fuelType, setFuelType] = useState(0);
  const [picture, setPicture] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [count, setCount] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [constructionYear, setContstructionYear] = useState(0);
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const createVehicle = async () => {
    const created = await axios.post("http://localhost:3000/vehicles/", {
      VehicleType: vehicleType,
      Vehicle: {
        Brand: brand,
        Model: model,
        ConstructionYear: constructionYear,
      },
      FuelType: fuelType,
      NumberOfSeats: numberOfSeats,
      Picture: picture,
      PricePerDay: pricePerDay,
      Count: count,
    });
    if (created.status == 200) {
      window.location.href = "/vehicle/list";
    }
  };
  return (
    <form className="border p-5 flex flex-col">
      <h1>Create Vehicle</h1>
      <label htmlFor="vehicle-type" className="mt-2">
        Vehicle Type:
      </label>
      <select
        value={vehicleType}
        onChange={(e) => {
          setVehicleType(Number(e.target.value));
        }}
      >
        <option value={0}>economy</option>
        <option value={1}>estate</option>
        <option value={2}>luxury</option>
        <option value={3}>suv</option>
        <option value={4}>cargo</option>
      </select>
      <label className="mt-2">Brand:</label>
      <input
        type={"text"}
        className="border-2 p-1"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      ></input>
      <label className="mt-2">Model:</label>
      <input
        type={"text"}
        className="border-2 p-1"
        value={model}
        onChange={(e) => {
          setModel(e.target.value);
        }}
      ></input>
      <label className="mt-2">Construction Year:</label>
      <input
        type={"number"}
        className="border-2 p-1"
        value={constructionYear}
        onChange={(e) => {
          setContstructionYear(Number(e.target.value));
        }}
      ></input>
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
        Number Of Seats:
      </label>
      <input
        type={"text"}
        className="border-2 p-1"
        value={numberOfSeats}
        onChange={(e) => setNumberOfSeats(e.target.value)}
      ></input>
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
        className="border p-2 mt-2"
        onClick={(e) => {
          e.preventDefault();
          createVehicle();
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateVehicle;
