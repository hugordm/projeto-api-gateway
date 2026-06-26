import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useHomeForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coordenadas, setCoordenadas] = useState(null);
  const [currencyError, setCurrencyError] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD', 'EUR']);

  const nameInputRef = useRef(null);

  const toggleCurrency = (code) => {
    setSelectedCurrencies((prev) => {
      const newSelection = prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code];

      if (newSelection.length > 0) {
        setCurrencyError(false);
      }
      return newSelection;
    });
  };

  const buscarCoordenadas = async (nomeCidade) => {
    if (!nomeCidade || nomeCidade.length < 3) return;
    try {
      const urlBase = import.meta.env.VITE_API_URL;
      const resposta = await fetch(
        `${urlBase}/api/geocoding?cidade=${encodeURIComponent(nomeCidade)}`,
      );
      const dados = await resposta.json();
      if (dados.lat && dados.lon) {
        setCoordenadas({ lat: dados.lat, lon: dados.lon });
      }
    } catch (erro) {
      console.log('Erro ao buscar coordenadas:', erro);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (selectedCurrencies.length === 0) {
      setCurrencyError(true);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('userName', name);
      localStorage.setItem('userCity', city);
      localStorage.setItem('userCurrencies', selectedCurrencies.join(','));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro:', error);
      alert('Houve um problema. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    city,
    setCity,
    isLoading,
    coordenadas,
    setCoordenadas,
    currencyError,
    selectedCurrencies,
    nameInputRef,
    toggleCurrency,
    buscarCoordenadas,
    handleLogin,
  };
}
