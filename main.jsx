import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { VEHICLE_DATABASE } from './vehiclesData.js';
import HeaderSearch from './headersearch.jsx';
import CarVisualizer from './CarVisualizer';
import TradeInCalculator from './TradeInCalculator';

function App() {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_DATABASE[0]);
  
  // Customization States
  const [selectedColor, setSelectedColor] = useState(VEHICLE_DATABASE[0].colors[0]);
  
  // Trade-In States
  const [tradeInName, setTradeInName] = useState('');
  const [tradeInCondition, setTradeInCondition] = useState('excellent');
  const [tradeInApplied, setTradeInApplied] = useState(false);

  // Booking Form States
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter vehicles dynamically based on search box input
  const filteredVehicles = useMemo(() => {
    return VEHICLE_DATABASE.filter(car => 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Handle vehicle switching
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedColor(vehicle.colors[0]); // Reset paint to first option
    setTradeInApplied(false); // Reset trade-in allocation for safety
    setBookingSuccess(false);
  };

  // Trade-in appraisal value generator logic
  const tradeInValue = useMemo(() => {
    if (!tradeInName) return 0;
    let baseValue = 15000;
    if (tradeInName.toLowerCase().includes('bmw')) baseValue = 22000;
    
    const conditionMultipliers = {
      excellent: 1.0,
      good: 0.8,
      fair: 0.5,
      poor: 0.2
    };
    
    return Math.round(baseValue * (conditionMultipliers[tradeInCondition] || 1.0));
  }, [tradeInName, tradeInCondition]);

  // Live checkout price counter
  const finalPrice = useMemo(() => {
    const startPrice = selectedVehicle.onSale ? selectedVehicle.discountPrice : selectedVehicle.basePrice;
    const colorAddon = selectedColor ? selectedColor.premium : 0;
    const tradeInDeduction = tradeInApplied ? tradeInValue : 0;
    return startPrice + colorAddon - tradeInDeduction;
  }, [selectedVehicle, selectedColor, tradeInApplied, tradeInValue]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingName && bookingEmail) {
      setBookingSuccess(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Part 2: Header Search */}
      <HeaderSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredVehicles={filteredVehicles}
        onVehicleSelect={handleVehicleSelect}
      />

      {/* Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Visualizer and Trade-in Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Part 3: Car Visualizer & Paints */}
          <CarVisualizer 
            selectedVehicle={selectedVehicle}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />

          {/* Part 4: Trade-In Calculator */}
          <TradeInCalculator 
            tradeInName={tradeInName}
            setTradeInName={setTradeInName}
            tradeInCondition={tradeInCondition}
            setTradeInCondition={setTradeInCondition}
            tradeInApplied={tradeInApplied}
            setTradeInApplied={setTradeInApplied}
            tradeInValue={tradeInValue}
          />
        </div>

        {/* Right Side: Financial Checkout Summary & Pre-Booking Form */}
        <div className="space-y-6">
          {/* Financial Breakdown Receipt */}
          <div className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Financial Matrix Summary</h3>
            
            <div className="space-y-2 border-b border-neutral-800 pb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Base Allocation MSRP</span>
                <span className="font-mono text-white">${selectedVehicle.basePrice.toLocaleString()}</span>
              </div>
              
              {selectedVehicle.onSale && (
                <div className="flex justify-between text-red-400">
                  <span>Showroom Campaign Discount</span>
                  <span className="font-mono">-${(selectedVehicle.basePrice - selectedVehicle.discountPrice).toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-neutral-400">Paint Trim Add-on</span>
                <span className="font-mono text-white">${selectedColor.premium.toLocaleString()}</span>
              </div>

              {tradeInApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Trade-In Valuation Discount</span>
                  <span className="font-mono">-${tradeInValue.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="text-base uppercase tracking-wider font-bold text-white">Adjusted Total</span>
              <span className="text-3xl font-black font-mono text-blue-500">${finalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Secure Pre-Booking Form Container */}
          <div className="bg-neutral-900 border border-neutral-800 rounded p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
              📅 Digital Allocation Pre-Booking
            </h3>

            {bookingSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-800 rounded p-4 text-center space-y-2">
                <h4 className="text-md font-bold text-white">Allocation Secured Successfully</h4>
                <p className="text-xs text-neutral-400">
                  Thank you {bookingName}. Your pre-booking payload for the {selectedVehicle.name} in {selectedColor.name} has been processed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-sm bg-neutral-950 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-sm bg-neutral-950 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors shadow-lg"
                >
                  Secure Pre-Order Allocation Slot
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Initialise the application inside root node wrapper
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
