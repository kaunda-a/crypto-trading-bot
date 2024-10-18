"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "react-toastify";
import { fetchTradingPairs, fetchPortfolioBalance } from "./TradingFunctions";

const ConfigForm: React.FC = () => {
  const [botName, setBotName] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [tradingPairs, setTradingPairs] = useState<string[]>([]);
  const [selectedPair, setSelectedPair] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [tradeAmount, setTradeAmount] = useState("");
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [scheduleStart, setScheduleStart] = useState("");
  const [scheduleEnd, setScheduleEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const exchanges = ["Binance", "Coinbase", "Kraken", "Gemini"];
  const algorithms = ["MACD", "RSI", "Bollinger Bands", "Custom"];

  useEffect(() => {
    if (selectedExchange && apiKey && apiSecret) {
      fetchTradingPairs(selectedExchange, apiKey)
        .then(setTradingPairs)
        .catch((error) => {
          console.error("Error fetching trading pairs:", error);
          toast.error(
            "Failed to fetch trading pairs. Please check your API credentials."
          );
        });

      fetchPortfolioBalance(selectedExchange, apiKey, apiSecret).catch(
        (error) => {
          console.error("Error fetching portfolio balance:", error);
          toast.error(
            "Failed to fetch portfolio balance. Please check your API credentials."
          );
        }
      );
    }
  }, [selectedExchange, apiKey, apiSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implementation for saving bot configuration
      // This would typically involve an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
      toast.success("Bot configuration saved successfully!");
    } catch (error) {
      console.error("Error submitting configuration:", error);
      toast.error("Failed to save bot configuration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        placeholder="Bot Name"
        required
      />
      <CustomSelect
        value={selectedExchange}
        onChange={(value) => setSelectedExchange(value)}
        required
      >
        <option value="">Select Exchange</option>
        {exchanges.map((exchange) => (
          <option key={exchange} value={exchange}>
            {exchange}
          </option>
        ))}
      </CustomSelect>
      <Input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="API Key"
        required
      />
      <Input
        type="password"
        value={apiSecret}
        onChange={(e) => setApiSecret(e.target.value)}
        placeholder="API Secret"
        required
      />
      <CustomSelect
        value={selectedPair}
        onChange={(value) => setSelectedPair(value)}
        required
      >
        <option value="">Select Trading Pair</option>
        {tradingPairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair}
          </option>
        ))}
      </CustomSelect>
      <CustomSelect
        value={algorithm}
        onChange={(value) => setAlgorithm(value)}
        required
      >
        <option value="">Select Algorithm</option>
        {algorithms.map((algo) => (
          <option key={algo} value={algo}>
            {algo}
          </option>
        ))}
      </CustomSelect>
      <Input
        type="number"
        value={tradeAmount}
        onChange={(e) => setTradeAmount(e.target.value)}
        placeholder="Trade Amount"
        required
      />
      <div>
        <label>Stop Loss (%)</label>
        <Slider
          value={[stopLoss]}
          onValueChange={(value) => setStopLoss(value[0])}
          max={100}
          step={1}
        />
      </div>
      <div>
        <label>Take Profit (%)</label>
        <Slider
          value={[takeProfit]}
          onValueChange={(value) => setTakeProfit(value[0])}
          max={100}
          step={1}
        />
      </div>
      <Input
        value={webhookUrl}
        onChange={(e) => setWebhookUrl(e.target.value)}
        placeholder="Webhook URL for Notifications"
      />
      <div>
        <label>Trading Schedule</label>
        <Input
          type="datetime-local"
          value={scheduleStart}
          onChange={(e) => setScheduleStart(e.target.value)}
        />
        <Input
          type="datetime-local"
          value={scheduleEnd}
          onChange={(e) => setScheduleEnd(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <Switch checked={isActive} onCheckedChange={setIsActive} />
        <label className="ml-2">Activate Bot</label>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Configuration"}
      </Button>
    </form>
  );
};

export default ConfigForm;
