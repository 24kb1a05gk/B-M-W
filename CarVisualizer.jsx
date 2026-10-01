import React from 'react';

export default function CarVisualizer({ selectedVehicle, selectedColor, setSelectedColor }) {
  return (
    <div className="space-y-6">
      {/* Interactive Visualizer Container */}
      <div className="bg-neutral-900 border border-neutral-800 rounded p-8 flex flex-col justify-between relative min-h-[340px] overflow-hidden">
        
        {/* Promotional Sale Tag */}
        {selectedVehicle.onSale && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded tracking-wider uppercase animate-pulse z-20">
            🔥 Special Showroom Offer
          </div>
        )}
        
        {/* Ambient Color Glow Backdrop */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-700" 
          style={{ backgroundColor: selectedColor.hex }} 
        />

        {/* Vehicle Header Details */}
        <div className="my-auto text-center space-y-2 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {selectedVehicle.name}
          </h2>
          <p 
            className="text-lg font-mono tracking-wide transition-colors duration-300" 
            style={{ color: selectedColor.hex === '#FFFFFF' ? '#A3A3A3' : selectedColor.hex }}
          >
            {selectedColor.name} {selectedColor.premium > 0 ? `(+$${selectedColor.premium.toLocaleString()})` : '(Standard)'}
          </p>
          
          {/* Virtual Graphic Preview Blocks */}
          <div className="pt-6 flex justify-center">
            <div 
              className="w-64 h-32 rounded-xl transition-all duration-500 relative border border-white/10 shadow-2xl flex items-center justify-center font-bold tracking-widest text-xs uppercase" 
              style={{ 
                backgroundColor: selectedColor.hex, 
                color: selectedColor.hex === '#FFFFFF' ? '#000000' : '#FFFFFF' 
              }}
            >
              [ {selectedVehicle.id.toUpperCase()} VISUAL PREVIEW ]
            </div>
          </div>
        </div>

        {/* Engine and Performance Dashboard Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-neutral-800 text-center relative z-10 mt-6">
          <div className="bg-neutral-950/40 p-2 rounded">
            <span className="block text-[10px] uppercase text-neutral-500 tracking-wider">Engine / Motor</span>
            <span className="text-xs font-semibold text-neutral-200 block mt-0.5">{selectedVehicle.engine}</span>
          </div>
          <div className="bg-neutral-950/40 p-2 rounded">
            <span className="block text-[10px] uppercase text-neutral-500 tracking-wider">Power Output</span>
            <span className="text-xs font-semibold text-neutral-200 block mt-0.5">{selectedVehicle.power}</span>
          </div>
          <div className="bg-neutral-950/40 p-2 rounded">
            <span className="block text-[10px] uppercase text-neutral-500 tracking-wider">0-60 MPH Speed</span>
            <span className="text-xs font-semibold text-neutral-200 block mt-0.5">{selectedVehicle.acceleration}</span>
          </div>
        </div>
      </div>

      {/* Paint Swatch Selection Deck */}
      <div className="bg-neutral-900 border border-neutral-800 rounded p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
          Select Factory Paint Finish
        </h3>
        <div className="flex flex-wrap gap-4">
          {selectedVehicle.colors.map((color, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 rounded-full border-2 transition-all relative group ${
                selectedColor.name === color.name 
                  ? 'border-blue-500 scale-110 shadow-lg' 
                  : 'border-neutral-700 hover:border-neutral-500'
              }`}
              style={{ backgroundColor: color.hex }}
              title={`${color.name} (+$${color.premium})`}
            >
              {selectedColor.name === color.name && (
                <span className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference font-bold text-sm">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
