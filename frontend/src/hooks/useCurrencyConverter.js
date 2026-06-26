import { useState } from 'react';

export function useCurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertCurrency = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Digite um valor válido.');
      return;
    }

    setLoading(true);
    setError(null);
    setConvertedAmount(null);

    try {
      const urlBase = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${urlBase}/api/conversorMoeda?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`,
      );
      const data = await response.json();

      if (response.ok) {
        setConvertedAmount(data.convertedAmount);
        setRate(data.rate);
      } else {
        setError(data.error || 'Erro na conversão.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
    setError(null);
  };

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedAmount,
    rate,
    loading,
    error,
    convertCurrency,
    handleSwap,
  };
}
