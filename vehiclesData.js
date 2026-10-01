export const VEHICLE_DATABASE = [
  {
    id: 'm5',
    name: 'BMW M5',
    basePrice: 119500,
    discountPrice: 114500,
    onSale: true,
    engine: '4.4L V8 Hybrid',
    power: '717 hp',
    acceleration: '3.4 sec',
    colors: [
      { name: 'Alpine White', hex: '#FFFFFF', premium: 0 },
      { name: 'Black Sapphire', hex: '#171717', premium: 650 },
      { name: 'Isle of Man Green', hex: '#486B50', premium: 1950 }
    ]
  },
  {
    id: 'i7',
    name: 'BMW i7',
    basePrice: 124200,
    discountPrice: 124200,
    onSale: false,
    engine: 'Dual electric motors',
    power: '536 hp',
    acceleration: '4.5 sec',
    colors: [
      { name: 'Mineral White', hex: '#F5F5F4', premium: 0 },
      { name: 'Oxide Grey', hex: '#707477', premium: 1500 },
      { name: 'Tanzanite Blue', hex: '#183E68', premium: 1950 }
    ]
  },
  {
    id: 'x5',
    name: 'BMW X5',
    basePrice: 68400,
    discountPrice: 65900,
    onSale: true,
    engine: '3.0L turbocharged inline-6',
    power: '375 hp',
    acceleration: '5.3 sec',
    colors: [
      { name: 'Alpine White', hex: '#FFFFFF', premium: 0 },
      { name: 'Carbon Black', hex: '#202326', premium: 650 },
      { name: 'Marina Bay Blue', hex: '#17577C', premium: 1500 }
    ]
  }
];