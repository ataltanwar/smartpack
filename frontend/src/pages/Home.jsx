import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import PackagingForm from "../components/PackagingForm";
import Results from "../components/analyzer/Results";
import HowItWorks from "../components/HowItWorks";
import { EmptyState, LoadingState, ErrorState } from "../components/common/StateViews";

export default function Home({
  commodity,
  commodities,
  setCommodity,
  setShelfLife,
  setTemperature,
  setHumidity,
  setStorageType,
  setTransportation,
  getDefaults,
  temperature,
  humidity,
  storageType,
  transportation,
  includeEco,
  setIncludeEco,
  getRecommendation,
  loading,
  error,
  result,
}) {
  const resultsRef = useRef(null);

  useEffect(() => {
    if ((result || loading) && typeof window !== "undefined" && window.innerWidth < 1024) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result, loading]);

  return (
    <div className="space-y-0">
      {/* SECTION 7: PACKAGING-ORIENTED HERO */}
      <Hero />

      {/* SECTION 8 & 10: RECOMMENDATION WORKSPACE */}
      <div id="analyzer" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#70452C]">
              Packaging Recommendation Workspace
            </p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#17221C] tracking-tight">
            Configure Specification & Run AI Evaluation
          </h2>
          <p className="text-xs sm:text-sm text-[#786E64] mt-1 max-w-2xl">
            Enter your product details and storage conditions to get a packaging recommendation tailored to your needs.</p>
        </div>

       
        <div className="grid lg:grid-cols-12 gap-8 items-start">  
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <PackagingForm
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
            />
          </div>

          
          <div ref={resultsRef} className="lg:col-span-7 min-w-0 scroll-mt-24">
            {!result && !loading && !error && <EmptyState />}
            {loading && <LoadingState />}
            {error && <ErrorState message={error} />}
            {result && <Results result={result} />}
          </div>
        </div>
      </div>


      <HowItWorks />
    </div>
  );
}
