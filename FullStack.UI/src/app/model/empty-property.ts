import { property } from './property.interface';


export interface property {
    Id: string | number; // Assuming it can be either
    image: string[]; // Assuming it's an array of strings (image URLs?)
    SellRent: number;
    BHK: number | null;
    PType: string;
    name: string;
    City: string;
    FType: string;
    price: number | null;
    Security: number | null;
    Maintenance: number | null;
    BuiltArea: number | null;
    CarpetArea: number | null;
    FloorNo: number | null;
    TotalFloor: number | null;
    Address: string;
    Address2: string;
    RTM: boolean;
    AOP: string;
    Gated: boolean;
    MainEntrance: string;
    Possession: string;
    Description: string;
  }
  
  