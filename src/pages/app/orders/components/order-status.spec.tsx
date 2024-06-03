import { render } from "@testing-library/react";
import { OrderStatus, OrderStatusType } from "./order-status";

const orderStatus: Record<OrderStatusType, { text: string, color: string }> = {
  pending: { text: 'Pendente', color: 'bg-slate-400' },
  canceled: { text: 'Cancelado', color: 'bg-rose-500' },
  delivered: { text: 'Entregue', color: 'bg-emerald-500' },
  delivering: { text: 'Em entrega', color: 'bg-amber-500' },
  processing: { text: 'Em preparo', color: 'bg-amber-500' },
}

describe('Order Status', () => {
  const orderStatusArray = Object.entries(orderStatus);

  orderStatusArray.map(([order, { text, color }]) => {
    it(`should display the right text based when order status is ${order}`, () => {
      const wrapper = render(<OrderStatus status={order as OrderStatusType} />);

      wrapper.debug();

      const statusText = wrapper.getByText(text);
      const badgeElement = wrapper.getByTestId('badge');

      expect(statusText).toBeInTheDocument();
      expect(badgeElement).toHaveClass(color);
    })
  });
});