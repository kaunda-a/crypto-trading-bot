import axios from "axios";

export const fetchTradingPairs = async (
  selectedExchange: string,
  apiKey: string
) => {
  let endpoint;
  switch (selectedExchange) {
    case "Binance":
      endpoint = "https://api.binance.com/api/v3/exchangeInfo";
      break;
    case "Coinbase":
      endpoint = "https://api.pro.coinbase.com/products";
      break;
    case "Kraken":
      endpoint = "https://api.kraken.com/0/public/AssetPairs";
      break;
    case "Gemini":
      endpoint = "https://api.gemini.com/v1/symbols";
      break;
    default:
      throw new Error("Unsupported exchange");
  }

  const response = await axios.get(endpoint, {
    headers: { "X-MBX-APIKEY": apiKey },
  });

  let pairs;
  if (selectedExchange === "Binance") {
    pairs = response.data.symbols.map((symbol: any) => symbol.symbol);
  } else if (selectedExchange === "Coinbase") {
    pairs = response.data.map((product: any) => product.id);
  } else if (selectedExchange === "Kraken") {
    pairs = Object.keys(response.data.result);
  } else if (selectedExchange === "Gemini") {
    pairs = response.data;
  }

  return pairs;
};

export const fetchMarketData = async (
  selectedExchange: string,
  selectedPair: string
) => {
  let endpoint;
  switch (selectedExchange) {
    case "Binance":
      endpoint = `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedPair}`;
      break;
    case "Coinbase":
      endpoint = `https://api.pro.coinbase.com/products/${selectedPair}/ticker`;
      break;
    case "Kraken":
      endpoint = `https://api.kraken.com/0/public/Ticker?pair=${selectedPair}`;
      break;
    case "Gemini":
      endpoint = `https://api.gemini.com/v1/pubticker/${selectedPair}`;
      break;
    default:
      throw new Error("Unsupported exchange");
  }

  const response = await axios.get(endpoint);
  return response.data;
};

export const fetchPortfolioBalance = async (
  selectedExchange: string,
  apiKey: string,
  apiSecret: string
) => {
  let endpoint;
  let headers = { "X-MBX-APIKEY": apiKey };
  let data;

  switch (selectedExchange) {
    case "Binance":
      endpoint = "https://api.binance.com/api/v3/account";
      data = await axios.get(endpoint, { headers });
      return data.data.balances;
    case "Coinbase":
      endpoint = "https://api.pro.coinbase.com/accounts";
      data = await axios.get(endpoint, { headers });
      return data.data;
    case "Kraken":
      endpoint = "https://api.kraken.com/0/private/Balance";
      // Implement Kraken's API authentication
      data = await axios.post(endpoint, {}, { headers });
      return data.data.result;
    case "Gemini":
      endpoint = "https://api.gemini.com/v1/balances";
      // Implement Gemini's API authentication
      data = await axios.post(endpoint, {}, { headers });
      return data.data;
    default:
      throw new Error("Unsupported exchange");
  }
};

export const executeTrade = async (
  selectedExchange: string,
  selectedPair: string,
  action: "buy" | "sell",
  tradeAmount: string,
  apiKey: string
) => {
  let endpoint;
  let payload;

  switch (selectedExchange) {
    case "Binance":
      endpoint = "https://api.binance.com/api/v3/order";
      payload = {
        symbol: selectedPair,
        side: action.toUpperCase(),
        type: "MARKET",
        quantity: tradeAmount,
      };
      break;
    case "Coinbase":
      endpoint = "https://api.pro.coinbase.com/orders";
      payload = {
        product_id: selectedPair,
        side: action,
        type: "market",
        size: tradeAmount,
      };
      break;
    case "Kraken":
      endpoint = "https://api.kraken.com/0/private/AddOrder";
      payload = {
        pair: selectedPair,
        type: action,
        ordertype: "market",
        volume: tradeAmount,
      };
      break;
    case "Gemini":
      endpoint = "https://api.gemini.com/v1/order/new";
      payload = {
        symbol: selectedPair,
        amount: tradeAmount,
        side: action,
        type: "market",
      };
      break;
    default:
      throw new Error("Unsupported exchange");
  }

  const response = await axios.post(endpoint, payload, {
    headers: { "X-MBX-APIKEY": apiKey },
  });

  return response.data;
};

export const fetchHistoricalData = async (
  selectedExchange: string,
  selectedPair: string,
  endDate: string
) => {
  let endpoint;
  switch (selectedExchange) {
    case "Binance":
      endpoint = `https://api.binance.com/api/v3/klines?symbol=${selectedPair}&interval=1d&limit=1000`;
      break;
    case "Coinbase":
      endpoint = `https://api.pro.coinbase.com/products/${selectedPair}/candles?granularity=86400`;
      break;
    case "Kraken":
      endpoint = `https://api.kraken.com/0/public/OHLC?pair=${selectedPair}&interval=1440`;
      break;
    case "Gemini":
      endpoint = `https://api.gemini.com/v2/candles/${selectedPair}/1day`;
      break;
    default:
      throw new Error("Unsupported exchange");
  }

  const response = await axios.get(endpoint);
  return response.data.map((candle: any) => ({
    date: new Date(candle[0]),
    price: parseFloat(candle[4]),
  }));
};

export const fetchPerformanceMetrics = async () => {
  // This would typically involve fetching data from your backend
  // where you store historical trade data and performance metrics
  const response = await axios.get("/api/performance-metrics");
  return response.data;
};

export const implementTradingStrategy = (
  currentData: any,
  historicalData: any[]
) => {
  const shortPeriod = 10;
  const longPeriod = 20;

  if (historicalData.length < longPeriod) {
    return "hold"; // Not enough data to make a decision
  }

  const shortMA = calculateMA(historicalData.slice(-shortPeriod));
  const longMA = calculateMA(historicalData.slice(-longPeriod));

  if (shortMA > longMA) {
    return "buy";
  } else if (shortMA < longMA) {
    return "sell";
  } else {
    return "hold";
  }
};

const calculateMA = (data: any[]) => {
  return data.reduce((sum, item) => sum + item.price, 0) / data.length;
};

export const calculateProfit = (
  signal: string,
  currentPrice: number,
  previousPrice: number
) => {
  if (signal === "buy") {
    return currentPrice - previousPrice;
  } else if (signal === "sell") {
    return previousPrice - currentPrice;
  }
  return 0;
};
