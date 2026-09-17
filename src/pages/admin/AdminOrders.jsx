import { useEffect, useState } from "react";
import { getAllOrdersApi } from "../../api/orderApi";
import Loader from "../../components/common/Loader";
import { formatINR } from "../../utils/format";

const STATUS_LABELS = {
  created: "Awaiting payment",
  paid: "Paid",
  failed: "Payment failed",
};

const STATUS_COLORS = {
  created: "text-brass",
  paid: "text-forest",
  failed: "text-oxblood",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = { limit: 50 };
    if (statusFilter) params.status = statusFilter;
    getAllOrdersApi(params)
      .then((res) => setOrders(res.data.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl text-ink">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-ink/20 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="paid">Paid</option>
          <option value="created">Awaiting payment</option>
          <option value="failed">Payment failed</option>
        </select>
      </div>

      {loading ? (
        <Loader label="Loading orders..." />
      ) : orders.length === 0 ? (
        <p className="text-ink-soft">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-ink/10 text-ink-soft">
                <th className="py-2 pr-4">Order</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Book(s)</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Placed</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-ink/5">
                  <td className="py-2.5 pr-4">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="py-2.5 pr-4">
                    {order.user?.name}
                    <div className="text-xs text-ink-soft">{order.user?.email}</div>
                  </td>
                  <td className="py-2.5 pr-4 max-w-[220px] truncate">
                    {order.items.map((i) => i.title).join(", ")}
                  </td>
                  <td className="py-2.5 pr-4">{formatINR(order.totalPrice)}</td>
                  <td className="py-2.5 pr-4 text-ink-soft">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className={`py-2.5 pr-4 font-medium ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
