import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiDownload, FiLoader } from "react-icons/fi";
import { getMyOrdersApi, downloadBookPdfApi } from "../api/orderApi";
import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";
import { formatINR } from "../utils/format";

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

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingKey, setDownloadingKey] = useState(null);

  useEffect(() => {
    getMyOrdersApi()
      .then((res) => setOrders(res.data.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (order, item) => {
    const key = `${order._id}-${item.book}`;
    setDownloadingKey(key);
    try {
      const res = await downloadBookPdfApi(order._id, item.book);
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Could not download the PDF. Please try again.");
    } finally {
      setDownloadingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {loading ? (
        <Loader label="Fetching your orders..." />
      ) : orders.length === 0 ? (
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl text-ink mb-3">No orders yet</h1>
          <Link to="/books" className="btn-primary inline-flex">
            Start browsing
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <h1 className="section-heading mb-2">My library</h1>
          <p className="text-sm text-ink-soft mb-8">Your purchases and PDF downloads.</p>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border border-ink/10 p-5">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="text-sm text-ink-soft">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-ink-soft">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-medium ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>

                <div className="mt-3 divide-y divide-ink/10">
                  {order.items.map((item) => {
                    const key = `${order._id}-${item.book}`;
                    const isDownloading = downloadingKey === key;
                    return (
                      <div key={item.book} className="flex items-center justify-between gap-3 py-2.5">
                        <span className="text-sm">{item.title}</span>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm">{formatINR(item.price)}</span>
                          {order.isPaid ? (
                            <button
                              onClick={() => handleDownload(order, item)}
                              disabled={isDownloading}
                              className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-60"
                            >
                              {isDownloading ? (
                                <FiLoader className="animate-spin" />
                              ) : (
                                <>
                                  <FiDownload size={13} /> Download PDF
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-xs text-ink-soft">Not paid</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-3 pt-3 border-t border-ink/10 font-medium">
                  <span>Total</span>
                  <span>{formatINR(order.totalPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
