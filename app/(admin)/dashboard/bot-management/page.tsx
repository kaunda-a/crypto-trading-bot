"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BotManagementPage = () => {
  // Mock data for demonstration purposes
  const bots = [
    { id: 1, name: "BTC Trader", status: "Active", profit: "+5.2%" },
    { id: 2, name: "ETH Scalper", status: "Inactive", profit: "-1.8%" },
    { id: 3, name: "DOGE Moon Shot", status: "Paused", profit: "+12.4%" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bot Management</h1>
      <Button className="mb-4">Create New Bot</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bot Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bots.map((bot) => (
            <TableRow key={bot.id}>
              <TableCell>{bot.name}</TableCell>
              <TableCell>{bot.status}</TableCell>
              <TableCell>{bot.profit}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BotManagementPage;
