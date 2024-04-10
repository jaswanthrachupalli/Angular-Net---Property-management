import { ipropertybase } from './ipropertybase';

export class property implements ipropertybase {
    Id!: number | null;
    image!: [];
    SellRent: number | null = null;
    BHK: number | null = null;
    PType: string | null = null;
    name: string | null = null;
    City: string | null = null;
    FType: string | null = null;
    price: number | null = null;
    Security: number | null = null;
    Maintenance: number | null = null;
    BuiltArea: number | null = null;
    CarpetArea: number | null = null;
    FloorNo: number | null = null;
    TotalFloor: number | null = null;
    Address: string | null = null;
    Address2: string | null = null;
    RTM: boolean | null = null;
    AOP: string | null = null;
    Gated: boolean | null = null;
    MainEntrance: string | null = null;
    Possession: string | null = null;
    Description: string | null = null;
    PostedOn: string | null = null;
  }