import { useState, useEffect } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import { API_URL, parseResponseData } from "./api/api";
import { DEFAULT_VALUES, getDefaults, ALL_COMMODITIES } from "./constants/defaults";

export default function App() {
  const initialValues = DEFAULT_VALUES["Tomato"] || DEFAULT_VALUES["Default"];

  const [commodities, setCommodities] = useState(ALL_COMMODITIES);
  const [commodity, setCommodity] = useState("Tomato");
  const [shelfLife, setShelfLife] = useState(initialValues.shelfLife);
  const [temperature, setTemperature] = useState(initialValues.temperature);
  const [humidity, setHumidity] = useState(initialValues.humidity);
  const [storageType, setStorageType] = useState(initialValues.storageType);
  const [transportation, setTransportation] = useState(initialValues.transportation);
  const [includeEco, setIncludeEco] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash || "home";
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setPage(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!API_URL) {
      return;
    }

    let isMounted = true;
    fetch(`${API_URL}/commodities`)
      .then(async (res) => {
        const data = await parseResponseData(res);
        if (!res.ok) {
          const detail = data?.detail || res.statusText || "Request failed";
          throw new Error(`Failed to load commodities (HTTP ${res.status}): ${detail}`);
        }
        if (isMounted && data && Array.isArray(data.commodities) && data.commodities.length > 0) {
          setCommodities(data.commodities);
        }
      })
      .catch(() => {
        // Fallback remains the preloaded ALL_COMMODITIES list
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getRecommendation = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    if (!API_URL) {
      setError("API URL is not configured. Please verify VITE_API_URL in your frontend .env configuration.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commodity,
          shelf_life_days: Number(shelfLife),
          storage_temperature_c: Number(temperature),
          relative_humidity_percent: Number(humidity),
          storage_type: storageType,
          transportation,
          include_eco_alternative: includeEco,
        }),
      });

      const data = await parseResponseData(response);

      if (!response.ok) {
        const detail = data?.detail || response.statusText || "Unable to generate recommendation.";
        throw new Error(`HTTP ${response.status}: ${detail}`);
      }

      if (!data) {
        throw new Error("Server returned an empty or invalid response.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message || `Network error: Unable to connect to the backend API. Please ensure the backend server is running at ${API_URL || "the configured backend URL"}.`
      );
    } finally {
      setLoading(false);
    }
  };

  const isHomeView = page === "home" || page === "analyzer" || page === "how-it-works" || page === "materials" || !page;

  return (
    <div className="min-h-screen bg-[#F5EBDD] text-[#17221C] flex flex-col selection:bg-[#D9B27C]/30 selection:text-[#70452C]">
      <Header page={page} />

      <main className="flex-1">
        {page === "about" && <AboutPage />}
        {page === "team" && <TeamPage />}
        {isHomeView && (
          <Home
            commodity={commodity}
            commodities={commodities}
            setCommodity={setCommodity}
            setShelfLife={setShelfLife}
            setTemperature={setTemperature}
            setHumidity={setHumidity}
            setStorageType={setStorageType}
            setTransportation={setTransportation}
            getDefaults={getDefaults}
            temperature={temperature}
            humidity={humidity}
            storageType={storageType}
            transportation={transportation}
            includeEco={includeEco}
            setIncludeEco={setIncludeEco}
            getRecommendation={getRecommendation}
            loading={loading}
            error={error}
            result={result}
          />
        )}
      </main>

      <ChatbotWidget
        currentContext={{
          commodity,
          shelfLife,
          temperature,
          humidity,
          storageType,
          transportation,
          recommendation: result,
        }}
      />

      <Footer />
    </div>
  );
}