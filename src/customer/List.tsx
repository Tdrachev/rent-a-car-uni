import axios from "axios";
import React, { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IVehicle,
  VehicleType,
  FuelType,
  ICustomer,
} from "../interfaces/interfaces_core";

const CustomerTestt: ICustomer[] = [
  {
    id: 0,
    FullName: "TEst Test",
    Email: "abcd@gmail.com",
    Phone: "02123123",
  },
];

const VehicleList = () => {
  const [listItems, setListItems] = useState<ICustomer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await axios.get("http://localhost:3000/customers");
      setListItems(customers.data);
    };
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id: number) => {
    const deleted = await axios.delete("http://localhost:3000/customers/" + id);
    window.location.href = "/customer/list";
  };
  return (
    <div className="flex flex-col   justify-start">
      <table className=" table-header-group border-2  ml-5 mt-5">
        <thead>
          <tr className="flex flex-row justify-between p-5">
            <th className="mr-5">Full Name:</th>
            <th className="mr-5">Email:</th>
            <th className="mr-5">Telephone:</th>
            <th className="mr-5"> </th>
            <th className="mr-5"> </th>
          </tr>
        </thead>
        {listItems?.map((customer) => {
          return (
            <tr className="flex flex-row justify-between p-5">
              <td className="mr-5">
                <p>{customer.FullName}</p>
              </td>
              <td className="mr-5">
                <p>{customer.Email}</p>
              </td>
              <td className="mr-5">
                <p>{customer.Phone}</p>
              </td>
              <td>
                <Link to={"/customer/edit?id=" + customer.id}>
                  <button className="border p-2 border-black">Edit</button>
                </Link>
              </td>
              <td>
                <button
                  className="border p-2 border-black"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteCustomer(customer.id);
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

export default VehicleList;
