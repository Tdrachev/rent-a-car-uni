import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import List from "./vehicle/List";
import CustomerList from "./customer/List";
import Navbar from "./components/Navbar";
import EditVehicle from "./vehicle/edit";
import CreateVehicle from "./vehicle/create";
import EditCustomer from "./customer/edit";
import CreateCustomer from "./customer/create";
import RentalList from "./rentals/List";
import CreateRental from "./rentals/create";
function App() {
  return (
    <Router>
      <div className="flex flex-row">
        <Navbar />
        <Routes>
          <Route path="/vehicle/list" element={<List />}></Route>
          <Route path="/vehicle/edit/" element={<EditVehicle />}></Route>
          <Route path="/vehicle/create/" element={<CreateVehicle />}></Route>
          <Route path="/customer/list/" element={<CustomerList />}></Route>
          <Route path="/customer/edit/" element={<EditCustomer />}></Route>
          <Route path="/customer/create/" element={<CreateCustomer />}></Route>
          <Route path="/rental/list/" element={<RentalList />}></Route>
          <Route path="/rental/create/" element={<CreateRental />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
