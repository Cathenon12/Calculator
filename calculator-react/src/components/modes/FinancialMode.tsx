import React, { useState, useEffect } from 'react';

const FinancialMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compound' | 'currency'>('compound');
  
  // Intérêt composé
  const [capital, setCapital] = useState('1000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState('0');
  
  // Conversion monétaire
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('0');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');

  const currencies = [
    { code: 'USD', name: 'Dollar américain', symbol: '$', type: 'fiat' },
    { code: 'EUR', name: 'Euro', symbol: '€', type: 'fiat' },
    { code: 'GBP', name: 'Livre sterling', symbol: '£', type: 'fiat' },
    { code: 'JPY', name: 'Yen japonais', symbol: '¥', type: 'fiat' },
    { code: 'CHF', name: 'Franc suisse', symbol: 'CHF', type: 'fiat' },
    { code: 'CAD', name: 'Dollar canadien', symbol: 'C$', type: 'fiat' },
    { code: 'AUD', name: 'Dollar australien', symbol: 'A$', type: 'fiat' },
    { code: 'CNY', name: 'Yuan chinois', symbol: '¥', type: 'fiat' },
    { code: 'INR', name: 'Roupie indienne', symbol: '₹', type: 'fiat' },
    { code: 'BRL', name: 'Real brésilien', symbol: 'R$', type: 'fiat' },
    { code: 'RUB', name: 'Rouble russe', symbol: '₽', type: 'fiat' },
    { code: 'ZAR', name: 'Rand sud-africain', symbol: 'R', type: 'fiat' },
    { code: 'MXN', name: 'Peso mexicain', symbol: '$', type: 'fiat' },
    { code: 'SGD', name: 'Dollar singapourien', symbol: 'S$', type: 'fiat' },
    { code: 'HKD', name: 'Dollar de Hong Kong', symbol: 'HK$', type: 'fiat' },
    { code: 'MGA', name: 'Ariary malgache', symbol: 'Ar', type: 'fiat' },
    { code: 'BTC', name: 'Bitcoin', symbol: '₿', type: 'crypto' },
    { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', type: 'crypto' },
    { code: 'USDT', name: 'Tether', symbol: '₮', type: 'crypto' },
    { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', type: 'crypto' },
    { code: 'XRP', name: 'Ripple', symbol: 'XRP', type: 'crypto' },
    { code: 'ADA', name: 'Cardano', symbol: 'ADA', type: 'crypto' },
    { code: 'DOGE', name: 'Dogecoin', symbol: 'Ð', type: 'crypto' },
    { code: 'SOL', name: 'Solana', symbol: 'SOL', type: 'crypto' },
    { code: 'DOT', name: 'Polkadot', symbol: 'DOT', type: 'crypto' },
    { code: 'MATIC', name: 'Polygon', symbol: 'MATIC', type: 'crypto' },
  ];

  const fetchExchangeRate = async () => {
    setLoading(true);
    try {
      // API gratuite sans clé requise
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data.rates && data.rates[toCurrency]) {
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        const converted = parseFloat(amount) * rate;
        setConvertedAmount(converted.toFixed(2));
        setLastUpdate(new Date().toLocaleString('fr-FR'));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du taux de change:', error);
      setConvertedAmount('Erreur');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'currency') {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    if (exchangeRate > 0) {
      const converted = parseFloat(amount) * exchangeRate;
      setConvertedAmount(converted.toFixed(2));
    } else {
      fetchExchangeRate();
    }
  };

  const calculate = () => {
    const p = parseFloat(capital);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const amount = p * Math.pow(1 + r, t);
    setResult(amount.toFixed(2));
  };

  return (
    <div className="space-y-4 animate-slide-in max-w-3xl">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('compound')}
          className={`flex-1 p-3 rounded-xl font-bold transition-all ${
            activeTab === 'compound'
              ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          💰 Intérêt Composé
        </button>
        <button
          onClick={() => setActiveTab('currency')}
          className={`flex-1 p-3 rounded-xl font-bold transition-all ${
            activeTab === 'currency'
              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          💱 Conversion Monétaire
        </button>
      </div>

      {activeTab === 'compound' && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">💰 Intérêt Composé</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2 text-white/70 font-semibold">Capital Initial (€)</label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="w-full p-3 rounded-xl glass-card text-white border-2 border-white/20 focus:border-indigo-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-white/70 font-semibold">Taux d'intérêt (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-3 rounded-xl glass-card text-white border-2 border-white/20 focus:border-indigo-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-white/70 font-semibold">Durée (années)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full p-3 rounded-xl glass-card text-white border-2 border-white/20 focus:border-indigo-400 transition-all"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold hover:scale-105 transition-all shadow-lg"
          >
            📊 Calculer
          </button>

          <div className="p-6 glass-card rounded-xl border-2 border-indigo-400/30">
            <p className="text-sm text-white/60 mb-2">Montant Final</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{result} €</p>
          </div>
        </div>
      )}

      {activeTab === 'currency' && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">💱 Conversion Monétaire</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm mb-2 text-white/70 font-semibold">Montant</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-xl glass-card text-white border-2 border-white/20 focus:border-green-400 transition-all text-2xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-white/70 font-semibold">De</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-3 rounded-xl glass-card text-white border-2 border-white/20 focus:border-green-400 transition-all"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code} className="bg-gray-800">
                      {curr.type === 'crypto' ? '🔐 ' : ''}{curr.symbol} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/70 font-semibold">Vers</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-3 rounded-xl glass-card text-white border-2 border-white/20 focus:border-green-400 transition-all"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code} className="bg-gray-800">
                      {curr.type === 'crypto' ? '🔐 ' : ''}{curr.symbol} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold hover:scale-105 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? '⏳ Chargement...' : '🔄 Convertir'}
          </button>

          <div className="p-6 glass-card rounded-xl border-2 border-green-400/30">
            <p className="text-sm text-white/60 mb-2">Résultat</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {convertedAmount} {currencies.find(c => c.code === toCurrency)?.symbol}
            </p>
            {exchangeRate > 0 && (
              <div className="mt-4 text-sm text-white/60">
                <p>Taux de change: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</p>
                {lastUpdate && <p className="text-xs mt-1">Dernière mise à jour: {lastUpdate}</p>}
              </div>
            )}
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl">
            <p className="text-xs text-white/70">
              💡 Taux en temps réel via ExchangeRate-API<br/>
              🔐 Cryptos: BTC, ETH, USDT, BNB, XRP, ADA, DOGE, SOL, DOT, MATIC<br/>
              🇲🇬 Ariary malgache (MGA) disponible
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialMode;
