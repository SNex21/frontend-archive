interface Subscription {
    type: string;
    start_date: string;
    end_date: string;
    plan: Plan;
    price: number;
      
  }
  
interface Plan {
    id: number;
    title: string;
    description: string;
    discount: number;
    duration: number;
    price: number;
}

export { type Subscription };
export { type Plan };
