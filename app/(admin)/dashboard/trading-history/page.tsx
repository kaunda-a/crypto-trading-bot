// File: app/dashboard/trading-history/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@/components/ui/table";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  IconFilter,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";

interface Trade {
  id: string;
  date: string;
  pair: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  profit: number;
}

const TradingHistoryPage: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("30d");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [pairFilter, setPairFilter] = useState("");

  useEffect(() => {
    fetchTrades();
  }, [timeFrame]);

  useEffect(() => {
    filterAndSortTrades();
  }, [trades, pairFilter, sortField, sortDirection]);

  const fetchTrades = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/trading-history?timeFrame=${timeFrame}`
      );
      setTrades(response.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTrades = () => {
    let filtered = trades;
    if (pairFilter) {
      filtered = filtered.filter((trade) =>
        trade.pair.toLowerCase().includes(pairFilter.toLowerCase())
      );
    }
    const sorted = filtered.sort((a, b) => {
      const aValue = a[sortField as keyof Trade];
      const bValue = b[sortField as keyof Trade];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredTrades(sorted);
  };

  const toggleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-800 dark:text-theme-200 mb-6">
        Trading History
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <CustomSelect
          value={timeFrame}
          onChange={(value) => setTimeFrame(value)}
          className="w-40"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">Last Year</option>
        </CustomSelect>

        <Input
          placeholder="Filter by pair"
          value={pairFilter}
          onChange={(e) => setPairFilter(e.target.value)}
          className="w-48"
        />

        <Button onClick={fetchTrades} className="ml-auto">
          <IconFilter className="mr-2" size={18} />
          Apply Filters
        </Button>
      </div>

      <Card className="overflow-x-auto">
        <Table>
          <thead>
            <tr>
              <th onClick={() => toggleSort("date")} className="cursor-pointer">
                Date{" "}
                {sortField === "date" &&
                  (sortDirection === "asc" ? (
                    <IconSortAscending size={18} />
                  ) : (
                    <IconSortDescending size={18} />
                  ))}
              </th>
              <th onClick={() => toggleSort("pair")} className="cursor-pointer">
                Pair{" "}
                {sortField === "pair" &&
                  (sortDirection === "asc" ? (
                    <IconSortAscending size={18} />
                  ) : (
                    <IconSortDescending size={18} />
                  ))}
              </th>
              <th>Type</th>
              <th
                onClick={() => toggleSort("amount")}
                className="cursor-pointer"
              >
                Amount{" "}
                {sortField === "amount" &&
                  (sortDirection === "asc" ? (
                    <IconSortAscending size={18} />
                  ) : (
                    <IconSortDescending size={18} />
                  ))}
              </th>
              <th
                onClick={() => toggleSort("price")}
                className="cursor-pointer"
              >
                Price{" "}
                {sortField === "price" &&
                  (sortDirection === "asc" ? (
                    <IconSortAscending size={18} />
                  ) : (
                    <IconSortDescending size={18} />
                  ))}
              </th>
              <th
                onClick={() => toggleSort("profit")}
                className="cursor-pointer"
              >
                Profit/Loss{" "}
                {sortField === "profit" &&
                  (sortDirection === "asc" ? (
                    <IconSortAscending size={18} />
                  ) : (
                    <IconSortDescending size={18} />
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <tr key={trade.id}>
                <td>{new Date(trade.date).toLocaleString()}</td>
                <td>{trade.pair}</td>
                <td
                  className={
                    trade.type === "buy" ? "text-green-500" : "text-red-500"
                  }
                >
                  {trade.type}
                </td>
                <td>{trade.amount.toFixed(8)}</td>
                <td>${trade.price.toFixed(2)}</td>
                <td
                  className={
                    trade.profit >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  ${Math.abs(trade.profit).toFixed(2)}{" "}
                  {trade.profit >= 0 ? "(Profit)" : "(Loss)"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default TradingHistoryPage;
