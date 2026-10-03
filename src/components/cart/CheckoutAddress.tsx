import React from 'react';
import { OrderMethod } from '../../types';
import { MapPin, Clock, Check } from 'lucide-react';

interface Props {
  method: OrderMethod;
  address: { address: string; city: string; state: string; landmark: string; instructions: string };
  setAddress: React.Dispatch<React.SetStateAction<{ address: string; city: string; state: string; landmark: string; instructions: string }>>;
  pickupLocation: string;
  setPickupLocation: (loc: string) => void;
}

export const CheckoutAddress: React.FC<Props> = ({
  method,
  address,
  setAddress,
  pickupLocation,
  setPickupLocation,
}) => {
  return (
    <div className="space-y-4">
      {method === 'delivery' ? (
        <>
          <p className="text-xs text-slate-500 font-medium">
            Where should our dispatch rider deliver your grocery bag?
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Street Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Block 4, Flat 2, Admiralty Court"
                value={address.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / Area <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lekki Phase 1"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  disabled
                  value="Lagos"
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Closest Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Near Admiralty Toll Gate, opposite Zenith Bank"
                value={address.landmark}
                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Delivery Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Call my phone when at security gate"
                value={address.instructions}
                onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-xs text-slate-500 font-medium">
            Choose your pickup supermarket branch:
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Bril's Mart Lekki Flagship",
                desc: '122 Supermart Road, Off Admiralty Way, Lekki Phase 1',
                hours: 'Mon - Sat: 7am - 9pm | Sun: 8am - 6pm',
              },
              {
                title: "Bril's Mart Victoria Island Hub",
                desc: 'Plot 14 Adeola Odeku Street, Victoria Island',
                hours: 'Mon - Sat: 8am - 8pm',
              },
            ].map((hub, i) => (
              <div
                key={i}
                onClick={() => setPickupLocation(`${hub.title} — ${hub.desc}`)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                  pickupLocation.includes(hub.title)
                    ? 'border-brand-600 bg-brand-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{hub.title}</h4>
                    <p className="text-xs text-slate-600 mb-1">{hub.desc}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {hub.hours}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 mt-1 flex items-center justify-center ${
                    pickupLocation.includes(hub.title)
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {pickupLocation.includes(hub.title) && <Check className="w-2.5 h-2.5" />}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};