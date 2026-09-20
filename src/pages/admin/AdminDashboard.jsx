import { useEffect, useState } from "react";
import { getAdminStatsApi } from "../../api/orderApi";
import Loader from "../../components/common/Loader";
import { formatINR } from "../../utils/format";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminStatsApi()
      .then((res) => setStats(res.data.stats))
      .catch(() => setStats(null));
  }, []);

  if (!stats) return <Loader label="Loading dashboard..." />;

  const cards = [
    { label: "Total books", value: stats.totalBooks },
    { label: "Buyers (unique emails)", value: stats.totalBuyers },
    { label: "Total orders", value: stats.totalOrders },
    { label: "Paid orders", value: stats.paidOrders },
    { label: "Total revenue", value: formatINR(stats.totalRevenue) },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="border border-ink/10 p-5">
            <p className="text-sm text-ink-soft">{c.label}</p>
            <p className="font-display text-2xl text-ink mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
