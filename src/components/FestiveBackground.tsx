import React from 'react';

export const FestiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic warm gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 via-rose-50/80 to-purple-100/90" />

      {/* Decorative Festoon Garland (Toran) at top */}
      <div className="absolute top-0 left-0 right-0 h-12 flex justify-around opacity-75 overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="flex flex-col items-center -mt-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm border-2 border-yellow-200" />
            <div className="w-1.5 h-6 bg-gradient-to-b from-orange-400 to-rose-500 rounded-full -mt-1" />
          </div>
        ))}
      </div>

      {/* Radiant Mandala in top-right background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 opacity-25 rounded-full border-8 border-dashed border-amber-400 animate-spin-slow" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 opacity-20 rounded-full border-8 border-dashed border-rose-400 animate-spin-slow" />

      {/* Floating Diyas and Petals */}
      <div className="absolute top-1/4 left-6 text-3xl animate-particle-1 select-none">
        🪔
      </div>
      <div className="absolute top-1/3 right-8 text-2xl animate-particle-2 select-none">
        ✨
      </div>
      <div className="absolute bottom-1/4 left-10 text-3xl animate-particle-3 select-none">
        🌸
      </div>
      <div className="absolute bottom-1/3 right-12 text-3xl animate-particle-1 select-none">
        🪔
      </div>
      <div className="absolute top-2/3 right-6 text-2xl animate-particle-2 select-none">
        🌺
      </div>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-2xl opacity-60 animate-bounce-slow select-none">
        ✨
      </div>

      {/* Subtle radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-r from-rose-300/30 to-amber-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-3xl" />
    </div>
  );
};
