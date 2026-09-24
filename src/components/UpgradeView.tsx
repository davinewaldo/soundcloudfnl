import React from 'react';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { SoundCloudLogo } from './SoundCloudLogo';

export const UpgradeView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 pb-32">
      <div className="text-center max-w-sm mx-auto">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#ff5500] to-[#ff8833] flex items-center justify-center shadow-xl shadow-[#ff5500]/30 mb-4">
          <SoundCloudLogo size={32} monochrome className="text-white" />
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-[#ff5500]">
          SOUNDCLOUD GO+
        </span>
        <h1 className="text-2xl font-black text-white mt-1">Upgrade Your Sound</h1>
        <p className="text-xs text-white/60 mt-2">
          Stream in lossless high quality, listen offline, and support artists directly with zero ads.
        </p>

        {/* Feature List */}
        <div className="mt-6 space-y-3 text-left">
          {[
            'Ad-free uninterrupted listening',
            'Full catalog access including previews & exclusive drops',
            'High quality audio streaming (256kbps AAC)',
            'Unlimited offline downloads for phone and smartwatch',
            'Direct artist royalties distribution',
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#16161c] border border-white/5">
              <div className="w-5 h-5 rounded-full bg-[#ff5500]/20 flex items-center justify-center text-[#ff5500] flex-shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-white/90">{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#24242c] to-[#17171c] border border-[#ff5500]/40 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h4 className="text-base font-extrabold text-white">SoundCloud Go+</h4>
              <p className="text-xs text-white/50">30 days free trial</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-[#ff5500]">$9.99</span>
              <span className="text-xs text-white/50">/mo</span>
            </div>
          </div>

          <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff3300] hover:from-[#ff6611] hover:to-[#ff4411] text-white font-extrabold text-sm tracking-wide shadow-lg shadow-[#ff5500]/30 active:scale-98 transition-all">
            Start 30-Day Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};
