export enum VehicleType {
  "economy",
  "estate",
  "luxury",
  "SUV",
  "cargo",
}

export enum FuelType {
  "petrol",
  "diesel",
  "hybrid",
  "electric",
}

export interface IVehicleProperties {
  Brand: string;
  Model: string;
  ConstructionYear: number;
}

export interface IVehicle {
  id: number;
  VehicleType: VehicleType;
  Vehicle: IVehicleProperties;
  FuelType: FuelType;
  NumberOfSeats: number;
  Picture: string;
  PricePerDay: number;
  Count: Number;
}

export interface ICustomer {
  id: number;
  FullName: string;
  Email: string;
  Phone: string;
}

export interface IRentalEvent {
  id: number;
  StartDateTime: Date;
  EndDateTime: Date;
  Vehicle: IVehicle;
  Customer: ICustomer;
}
