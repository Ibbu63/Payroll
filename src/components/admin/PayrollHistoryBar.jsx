import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PayrollHistoryBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stats/payroll-history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("PAYROLL DATA:", res.data); // 👈 debug

        setData(
          res.data.map(item => ({
            date: item._id,
            payout: item.totalPayout,
            delayed: item.delayedPayout
          }))
        );
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="analytics-card">
      <h3 className="analytics-title">Payroll History</h3>

      {data.length === 0 ? (
        <p className="analytics-empty">No payroll records yet</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="payout" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="delayed" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
