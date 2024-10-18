"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfigForm from "@/components/Bot/ConfigForm";
import PerformanceTab from "@/components/Bot/PerformanceTab";
import BacktestTab from "@/components/Bot/BacktestTab";
import AIPredictionsTab from "@/components/Bot/AIPredictionsTab";

const BotConfigPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-800 dark:text-theme-200 mb-6">
        Advanced Bot Configuration
      </h1>
      <Tabs defaultValue="config">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="backtest">Backtest</TabsTrigger>
          <TabsTrigger value="ai">AI Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="config">
          <ConfigForm />
        </TabsContent>
        <TabsContent value="performance">
          <PerformanceTab />
        </TabsContent>
        <TabsContent value="backtest">
          <BacktestTab />
        </TabsContent>
        <TabsContent value="ai">
          <AIPredictionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BotConfigPage;
