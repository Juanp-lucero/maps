"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import StatsCard from "@/components/StatsCard";

// Import dinámico del mapa para evitar errores de SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function RunningTracker() {
  const [runData] = useState({
    distance: 2.03,
    time: 15,
    calories: 75,
    dailyGoal: 3000,
    route: [
      [1.2136, -77.2811],
      [1.2142, -77.2819],
      [1.2151, -77.2823],
      [1.2156, -77.283],
      [1.216, -77.2838],
      [1.2165, -77.2843],
    ] as [number, number][],
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-4">
          <button className="absolute top-4 left-4 bg-white/90 rounded-full p-2 shadow-md hover:bg-white">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Mapa */}
        <div className="relative h-96 bg-gray-100">
          <MapComponent route={runData.route} />

          {/* Distancia */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-yellow-400 px-6 py-2 rounded-full shadow-lg">
            <span className="text-2xl font-bold text-white">{runData.distance}</span>
            <span className="text-sm text-white/80 ml-1">Km</span>
          </div>
        </div>

        {/* Actividad */}
        <div className="p-6">
          <div className="bg-black rounded-2xl p-5 mb-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-3">
                <svg
                  className="w-8 h-8 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Running</h3>
                <p className="text-white/70 text-sm">{runData.dailyGoal} meters per day</p>
                <div className="mt-2 bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full"
                    style={{ width: `${((runData.distance * 1000) / runData.dailyGoal) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Today</h4>
            <div className="grid grid-cols-3 gap-4">
              <StatsCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor"><path d="M12 2v20M2 12h20" strokeWidth="2" strokeLinecap="round" /></svg>}
                value={runData.distance}
                unit="Km"
              />
              <StatsCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" /></svg>}
                value={runData.time}
                unit="minutes"
              />
              <StatsCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor"><path d="M17 2l4 4-4 4M3 11v-1a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 01-4 4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                value={runData.calories}
                unit="Calories"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
