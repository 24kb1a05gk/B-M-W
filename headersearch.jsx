import React from 'react';

export default function HeaderSearch({ searchQuery, setSearchQuery, filteredVehicles, onVehicleSelect }) {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between border-b border-neutral-800 pb-6 mb-8 gap-4">
      {/* Brand Identity */}
      <div>
        <h1 className="text-3xl font-black tracking-wider text-white">M&nbsp;SHOWROOM</h1>
        <p className="text-sm text-neutral-400 uppercase tracking-widest mt-1">Next-Gen Digital Customizer</p>
      </div>
      
      {/* Search Input and Live Dropdown */}
      <div className="relative w-full md:w-80">
        <input
          type="text"
          placeholder="Search Model (e.g., M5, i7...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900 text-sm rounded border border-neutral-800 py-2.5 px-4 focus:outline-none focus:border-blue-500 text-white placeholder-neutral-500 transition-colors"
        />
        
        {/* Auto-suggest results drop menu */}
        {searchQuery && (
          <div className="absolute left-0 right-0 top-12 bg-neutral-900 border border-neutral-800 rounded shadow-2xl z-50 overflow-hidden">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map(car => (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => { 
                    onVehicleSelect(car); 
                    setSearchQuery(''); 
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-neutral-800 text-sm flex justify-between items-center transition-colors border-b border-neutral-800 last:border-none"
                >
                  <span className="font-medium text-white">{car.name}</span>
                  <span className="text-xs font-mono text-neutral-400">
                    ${car.discountPrice.toLocaleString()}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-3 text-xs text-neutral-500 text-center">No vehicles found</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
