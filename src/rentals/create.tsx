import axios from "axios";
import { useEffect, useState } from "react";
import { ICustomer, IVehicle } from "../interfaces/interfaces_core";
interface EditVehicleProps {}

const CreateRental = () => {
  const [startDate, setStartDate] = useState<string>(new Date().toString());
  const [endDate, setEndDate] = useState<string>(new Date().toString());
  const [vehicleId, setVehicleId] = useState<number>(1);
  const [customerId, setCustomerId] = useState<number>(1);
  const [customers, setCustomers] = useState<ICustomer[]>();
  const [vehicles, setVehicles] = useState<IVehicle[]>();

  useEffect(() => {
    async function fetchInitialData() {
      const customers = await axios.get("http://localhost:3000/customers");
      const vehicles = await axios.get("http://localhost:3000/vehicles");
      setCustomers(customers.data);
      setVehicles(vehicles.data);
    }
    fetchInitialData();
  }, []);

  const createRental = async () => {
    const newRental = await axios.post("http://localhost:3000/rentals", {
      StartDateTime: startDate,
      EndDateTime: endDate,
      VehicleId: vehicleId,
      CustomerId: customerId,
    });

    window.location.href = "/rental/list";
  };

  return (
    <form className="border p-5 flex flex-col">
      <h1>Create Rental</h1>
      <label htmlFor="picture" className="mt-2">
        Start Date:
      </label>
      <input
        type={"date"}
        className="border-2 p-1"
        value={startDate}
        onChange={(e) => {
          console.log(e.target.value);
          setStartDate(e.target.value);
        }}
      ></input>
      <label htmlFor="price-per-day" className="mt-2">
        End Date:
      </label>
      <input
        type={"date"}
        className="border-2 p-1"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
      ></input>
      <label htmlFor="fuel-type" className="mt-2">
        Customer:
      </label>
      <select
        value={customerId}
        onChange={(e) => {
          setCustomerId(Number(e.target.value));
        }}
      >
        {customers?.map((c) => {
          return <option value={c.id}>{c.FullName}</option>;
        })}
      </select>
      <label htmlFor="fuel-type" className="mt-2">
        Vehicle:
      </label>
      <select
        value={vehicleId}
        onChange={(e) => {
          setVehicleId(Number(e.target.value));
        }}
      >
        {vehicles?.map((v) => {
          return (
            <option value={v.id}>
              {v.Vehicle.Brand + " " + v.Vehicle.Model}
            </option>
          );
        })}
      </select>
      <label>
        Total Rent Cost:{" "}
        {Math.abs(
          (new Date(startDate!).getTime() - new Date(endDate!).getTime()) /
            (1000 * 3600 * 24)
        )}
      </label>
      <button
        className="border p-2 mt-2"
        onClick={(e) => {
          e.preventDefault();
          createRental();
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateRental;
