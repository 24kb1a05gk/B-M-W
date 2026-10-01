import React from 'react';

export default function TradeInCalculator({ 
  tradeInName, 
  setTradeInName, 
  tradeInCondition, 
  setTradeInCondition, 
  tradeInApplied, 
  setTradeInApplied, 
  tradeInValue 
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded p-6">
      {/* Module Title */}
      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
        🔄 Instant Old Vehicle Trade-In Value
      </h3>
      <p className="text-xs text-neutral-500 mb-4">
        Enter your old vehicle details below to see how much its condition-adjusted trade-in value will decrease your final bill.
      </p>
      
      {/* Form Fields Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car Name Input */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
            Your Car Year, Make, & Model
          </label>
          <input
            type="text"
            placeholder="e.g., 2018 BMW 330i or Honda Civic"
            value={tradeInName}
            onChange={(e) => { 
              setTradeInName(e.target.value); 
              setTradeInApplied(false); // Reset confirmation if name changes
            }}
            className="w-full text-sm bg-neutral-950 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-neutral-700 transition-colors"
          />
        </div>

        {/* Condition Assessment Dropdown */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
            Current Vehicle Condition Statement
          </label>
          <select
            value={tradeInCondition}
            onChange={(e) => { 
              setTradeInCondition(e.target.value); 
              setTradeInApplied(false); // Reset confirmation if condition changes
            }}
            className="w-full text-sm bg-neutral-950 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-neutral-700 transition-colors"
          >
            <option value="excellent">Excellent (No defects, mechanically perfect)</option>
            <option value="good">Good (Normal minor wear, well maintained)</option>
            <option value="fair">Fair (Passable defects, fully functional)</option>
            <option value="poor">Poor (Requires severe mechanical/body repair)</option>
          </select>
        </div>
      </div>

      {/* Live Calculated Deductible Action Bar */}
      {tradeInName && (
        <div className="mt-4 p-4 bg-neutral-950 rounded border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div>
            <span className="text-xs text-neutral-400 uppercase block">Estimated Valuation Credit</span>
            <span className="text-xl font-bold text-emerald-500 font-mono">
              -${tradeInValue.toLocaleString()} Deductible
            </span>
          </div>
          <button
            type="button"
            onClick={() => setTradeInApplied(!tradeInApplied)}
            className={`w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase rounded tracking-wide transition-colors ${
              tradeInApplied 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {tradeInApplied ? '✓ Valuation Added To Configuration' : 'Apply Trade-In Credit'}
          </button>
        </div>
      )}
    </div>
  );
}
