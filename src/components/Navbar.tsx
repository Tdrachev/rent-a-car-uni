import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const paths = [
  {
    label: "Vehicle",
    path: "/vehicle/list",
    items: [{ path: "/vehicle/list", label: "List" }],
  },
  {
    label: "Vehicle Create",
    path: "/vehicle/create",
    items: [{ path: "/vehicle/list", label: "List" }],
  },
  {
    label: "Customer",
    path: "/customer/list",
    items: [{ path: "/customer/list", label: "List" }],
  },
  {
    label: "Customer Create",
    path: "/customer/create",
    items: [{ path: "/customer/list", label: "List" }],
  },
  {
    label: "Rent",
    path: "/rental/list",
    items: [{ path: "/rental/list", label: "List" }],
  },
  {
    label: "Rent Create",
    path: "/rental/create",
    items: [{ path: "/rental/list", label: "List" }],
  },
];

const Navbar: FunctionComponent = () => {
  return (
    <div className="flex flex-col p-2 border-r-2 w-48 border-black rounded-tr-sm rounded-br-sm  h-screen ">
      <h2 className="font-bold text-xl"> Rent-A-Car</h2>
      {paths.map((path) => {
        return (
          <div className="flex flex-col pl-2 pt-2 mt-2">
            <Link to={path.path}>
              <h3 className="">{path.label}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
