import { ObjectId } from "mongoose";

interface purchaseHistoryInterface {
  menu: {
    _id: ObjectId;
    dishName: string;
  };
  restaurat: {
    _id: ObjectId;
    restaurantName: string;
  };
  transactionAmount: number;
  createdAt: Date;
}

interface purchaseOrderRequest {
  user: {
    _id: ObjectId;
    name: string;
  };
  menu: {
    _id: ObjectId;
    dishName: string;
    price: number;
    restaurant: ObjectId;
  };
}

export { purchaseOrderRequest, purchaseHistoryInterface };
