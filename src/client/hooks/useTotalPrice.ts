import { useCallback, useEffect, useState } from 'react';

import type { OrderFragmentResponse } from '../graphql/fragments';
import { getActiveOffer } from '../utils/get_active_offer';

export function useTotalPrice(order: OrderFragmentResponse) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const updateTotalPrice = useCallback(() => {
    let total = 0;
    for (const item of order.items) {
      const offer = getActiveOffer(item.product.offers);
      const price = offer?.price ?? item.product.price;
      total += price * item.amount;
    }
    setTotalPrice(total);
  }, [order]);

  useEffect(() => {
    const timer = setInterval(updateTotalPrice, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [updateTotalPrice]);

  return { totalPrice };
}
