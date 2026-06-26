import React, { useState, useEffect } from 'react';

function ConversorMoedas() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('BRL');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const currencies = [
        { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷' },
        { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸' },
        { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
        { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧' },
        { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵' },
        { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦' },
        { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺' },
        { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭' },
        { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳' },
        { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷' },
    ];

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
                `${urlBase}/api/conversorMoeda?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
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
    };

    const getCurrencyName = (code) => {
        const currency = currencies.find(c => c.code === code);
        return currency ? currency.name : code;
    };

    const getCurrencyFlag = (code) => {
        const currency = currencies.find(c => c.code === code);
        return currency ? currency.flag : '';
    };

    useEffect(() => {
        // Converte automaticamente quando os valores mudam (opcional)
        if (amount && parseFloat(amount) > 0) {
            const timeout = setTimeout(() => {
                convertCurrency();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="w-full flex justify-center">
            <div className="
            w-full
            bg-[#111827]
            border
            border-[#243047]
            rounded-3xl
            shadow-xl
            p-6
            text-white
        ">
                {/* Cabeçalho */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">
                        Conversor de Moedas
                    </h1>

                    <p className="text-sm text-[#8fa3c7] mt-1">
                        Cotação em tempo real
                    </p>
                </div>

                <div className="space-y-5">

                    {/* Valor */}
                    <div>
                        <label className="
                        block
                        text-sm
                        font-semibold
                        text-[#9fb2d1]
                        mb-2
                    ">
                            Valor
                        </label>

                        <div className="relative">

                            <span className="
                            absolute
                            left-4
                            top-3.5
                            text-[#35d399]
                            font-bold
                        ">
                                $
                            </span>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0,00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="
                                w-full
                                bg-[#151f35]
                                border
                                border-[#263552]
                                rounded-xl
                                py-3
                                pl-12
                                pr-4
                                text-white
                                placeholder:text-[#7182a3]
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#20c997]
                            "
                            />

                        </div>
                    </div>

                    {/* Moedas */}
                    <div className="
                    grid
                    grid-cols-[1fr_auto_1fr]
                    gap-3
                    items-end
                ">

                        <div>
                            <label className="
                            text-sm
                            font-semibold
                            text-[#9fb2d1]
                            block
                            mb-2
                        ">
                                DE
                            </label>

                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="
                                w-full
                                bg-[#151f35]
                                border
                                border-[#263552]
                                rounded-xl
                                px-3
                                py-3
                                text-white
                                focus:outline-none
                            "
                            >
                                {currencies.map((currency) => (
                                    <option
                                        key={currency.code}
                                        value={currency.code}
                                        className="bg-[#111827]"
                                    >
                                        {currency.flag} {currency.code}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {/* Troca */}
                        <button
                            onClick={handleSwap}
                            className="
                            w-11
                            h-11
                            rounded-full
                            border
                            border-[#20c997]
                            text-[#20c997]
                            flex
                            items-center
                            justify-center
                            hover:bg-[#20c997]/10
                            transition
                        "
                        >
                            ⇄
                        </button>

                        <div>

                            <label className="
                            text-sm
                            font-semibold
                            text-[#9fb2d1]
                            block
                            mb-2
                        ">
                                PARA
                            </label>

                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="
                                w-full
                                bg-[#151f35]
                                border
                                border-[#263552]
                                rounded-xl
                                px-3
                                py-3
                                text-white
                                focus:outline-none
                            "
                            >

                                {currencies.map((currency) => (
                                    <option
                                        key={currency.code}
                                        value={currency.code}
                                        className="bg-[#111827]"
                                    >
                                        {currency.flag} {currency.code}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                    {/* Converter */}
                    <button
                        onClick={convertCurrency}
                        disabled={loading}
                        className="
                        w-full
                        mt-3
                        py-3
                        rounded-xl
                        font-bold
                        text-[#04110d]
                        bg-gradient-to-r
                        from-[#20c997]
                        to-[#16a34a]
                        hover:opacity-90
                        transition
                        disabled:opacity-50
                    "
                    >

                        {loading
                            ? "🔄 Convertendo..."
                            : "↻  Converter"
                        }

                    </button>

                    {/* Erro */}
                    {error && (

                        <div className="
                        bg-red-500/10
                        border
                        border-red-500/30
                        text-red-400
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                    ">
                            ❌ {error}
                        </div>

                    )}

                    {/* Resultado */}
                    {convertedAmount && (

                        <div className="
                        mt-5
                        bg-[#0f2230]
                        border
                        border-[#164e45]
                        rounded-2xl
                        p-5">
                            <p className="
                            text-[#20c997]
                            text-sm
                            font-bold
                            uppercase">
                                Conversão
                            </p>

                            <p className="
                            mt-4
                            text-[#b7c7e6]
                            text-lg">
                                {getCurrencyFlag(fromCurrency)}
                                {" "}
                                {parseFloat(amount).toFixed(2)}
                                {" "}
                                {fromCurrency}
                            </p>

                            <p className="
                            text-4xl
                            font-bold
                            text-[#20c997]
                            mt-2">
                                {getCurrencyFlag(toCurrency)}
                                {" "}
                                {convertedAmount}
                                {" "}
                                {toCurrency}
                            </p>

                            <div className="
                            border-t
                            border-[#243047]
                            mt-5
                            pt-4
                            text-sm
                            text-[#9fb2d1]">
                                
                                <span className="text-[#20c997] font-semibold">
                                    Taxa de câmbio
                                </span>

                                <br />

                                1 {fromCurrency} =
                                {" "}
                                {rate} {toCurrency}

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ConversorMoedas;