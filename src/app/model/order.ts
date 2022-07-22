import { Customer } from "./customer";

export class Order {
    id: number;
    date: number;
    total: number;
    customer: Customer;
    number:number

    constructor( id: number, date: number, total:number, customer: Customer, number:number){
        this.id = id;
        this.date = date;
        this.total = total;
        this.customer = customer;
        this.number = number;
    }
}