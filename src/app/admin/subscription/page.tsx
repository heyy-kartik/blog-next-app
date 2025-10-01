"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Subscription {
  _id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0 });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/email");
      const data = await response.json();

      if (data.success) {
        setSubscriptions(data.subscriptions);
        setStats({
          total: data.subscriptions.length,
          active: data.subscriptions.filter((sub: Subscription) => sub.isActive)
            .length,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch subscriptions");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (email: string) => {
    if (!confirm(`Are you sure you want to unsubscribe ${email}?`)) return;

    try {
      const response = await fetch("/api/email", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("User unsubscribed successfully");
        fetchSubscriptions(); // Refresh the list
      } else {
        toast.error(data.error || "Failed to unsubscribe user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
    }
  };

  const exportEmails = () => {
    const emailList = subscriptions.map((sub) => sub.email).join("\n");
    const blob = new Blob([emailList], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading subscriptions...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Email Subscriptions</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-blue-800">
              Total Subscribers
            </h3>
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-green-800">
              Active Subscribers
            </h3>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-purple-800">
              Growth Rate
            </h3>
            <p className="text-2xl font-bold text-purple-600">+12%</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={exportEmails}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Export Emails
          </button>
          <button
            onClick={fetchSubscriptions}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Subscriber List</h2>
        </div>

        {subscriptions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No subscriptions found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((subscription) => (
                  <tr key={subscription._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {subscription.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(
                          subscription.subscribedAt
                        ).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subscription.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subscription.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {subscription.isActive && (
                        <button
                          onClick={() => handleUnsubscribe(subscription.email)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Unsubscribe
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
