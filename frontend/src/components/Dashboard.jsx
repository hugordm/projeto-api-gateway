import { useEffect, useState } from "react";
import axios from "axios";

const testData = {
    "cidade": "são paulo",
    "temp": "20C",
    "dolar": 5.50,
    "insight": "Hoje chove em SP e o dólar subiu, talvez seja melhor investir no mercado interno."
}

function Dashboard() {
    //const [data, setData] = useState(testData);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function buscarDashboard() {
            try {
                setLoading(true);

                const response = await axios.get("/api/dashboard");
                const result = response.data;

                setData(result)
            } catch (error) {
                setErro(error.message);
            } finally {
                setLoading(false);
            }
        };

        buscarDashboard();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <div className="grid grid-rows-[70px_1fr_1fr]  border-2 rounded-2xl w-2xl aspect-square">
            <h2 className="border-b-2 border-dashed">Dashboard</h2>
            <p className="border-b-2 border-dashed">Insight: {data.insight}</p> 

            <div className="grid grid-cols-3 gap-0.5 justify-center">

                <p>Cidade: {data.cidade}</p> 

                <p>Temperatura: {data.temp}</p> 

                <p>Moeda: {data.dolar}</p> 
            </div>
        </div>
    );
}

export default Dashboard;