import { OrderModel } from './order.model';
import { OrderDetailModel } from './orderdetail.model';

export class ViajeModel {
    public order: OrderModel;
    public orderdetail: Array<OrderDetailModel>;
  }