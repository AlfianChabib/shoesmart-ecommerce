import { z } from 'zod';

export class CartValidation {
  static readonly ADDCART = z.object({
    qty: z.number({ message: 'Quantity type must be number' }),
    totalPrice: z.number({ message: 'Total Price type must be number' }),
  });
}
