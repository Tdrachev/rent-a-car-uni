import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICustomer } from "../interfaces/interfaces_core";

interface EditVehicleProps {}
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const EditCustomer = () => {
  const query = useQuery();
  const [id, setId] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [tel, setTel] = useState<string>();
  const [currentCustomer, setCurrentCustomer] = useState<ICustomer>();
  useEffect(() => {
    const id = query.get("id");
    if (id) {
      setId(id);
    }
    const fetchCustomerData = async () => {
      const customerData = await axios.get(
        "http://localhost:3000/customers/" + id
      );

      setCurrentCustomer(customerData.data);
      setFullName(customerData.data.FullName);
      setEmail(customerData.data.Email);
      setTel(customerData.data.Phone);
    };
    fetchCustomerData();
  }, []);

  const createCustomer = async () => {
    const created = await axios.post("http://localhost:3000/customers", {
      FullName: fullName,
      Email: email,
      Phone: tel,
    });

    window.location.href = "/customer/list";
  };

  return (
    <form className="border p-5 flex flex-col">
      <h1>Edit Customer</h1>
      <label htmlFor="picture" className="mt-2">
        Full Name:
      </label>
      <input
        type={"text"}
        className="border-2 p-1"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      ></input>
      <label htmlFor="price-per-day" className="mt-2">
        Email:
      </label>
      <input
        type={"text"}
        className="border-2 p-1"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label htmlFor="count" className="mt-2">
        Telephone:
      </label>
      <input
        type={"text"}
        className="border-2 p-1"
        value={tel}
        onChange={(e) => {
          setTel(e.target.value);
        }}
      ></input>
      <button
        className="border p-2 mt-2"
        onClick={(e) => {
          e.preventDefault();
          createCustomer();
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default EditCustomer;
