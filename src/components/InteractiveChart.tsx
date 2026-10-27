import React, { useState, useId } from 'react';
import { formatINR } from '../utils/calculatorMath';

interface ChartDataPoint {
  year: number;
  invested: number;
  total: number;
  label?: string;
}

interface InteractiveChartProps {
  data: ChartDataPoint[];
  investedLabel?: string;
  totalLabel?: string;
  chartTitle?: string;
  investedColor?: string;
  totalColor?: string;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  investedLabel = 'Invested Amount',
  totalLabel = 'Total Wealth',
  chartTitle = 'Wealth Accumulation Over Time',
  investedColor = '#10B981',
  totalColor = '#1E1B4B',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [viewType, setViewType] = useState<'line' | 'area' | 'donut'>('line');
  const gradientId = useId();

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => Math.max(d.total, d.invested, 1)));
  const latestPoint = data[data.length - 1];
  const activeIndex = hoverIndex !== null ? hoverIndex : data.length - 1;
  const activePoint = data[activeIndex] || latestPoint;

  // Chart dimensions
  const width = 640;
  const height = 300;
  const padding = { top: 25, right: 35, bottom: 40, left: 75 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Coordinate mappers
  const getX = (index: number) => {
    if (data.length <= 1) return padding.left + innerWidth / 2;
    return padding.left + (index / (data.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    return padding.top + innerHeight - (val / maxVal) * innerHeight;
  };

  // Generate SVG path strings
  const totalPoints = data.map((d, i) => `${getX(i)},${getY(d.total)}`).join(' ');
  const investedPoints = data.map((d, i) => `${getX(i)},${getY(d.invested)}`).join(' ');

  const totalAreaPath = `M ${getX(0)},${getY(0)} ` +
    data.map((d, i) => `L ${getX(i)},${getY(d.total)}`).join(' ') +
    ` L ${getX(data.length - 1)},${padding.top + innerHeight} L ${getX(0)},${padding.top + innerHeight} Z`;

  const investedAreaPath = `M ${getX(0)},${getY(0)} ` +
    data.map((d, i) => `L ${getX(i)},${getY(d.invested)}`).join(' ') +
    ` L ${getX(data.length - 1)},${padding.top + innerHeight} L ${getX(0)},${padding.top + innerHeight} Z`;

  // Grid tick values (5 ticks)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(ratio => Math.round(maxVal * ratio));

  // Donut chart math for the active point
  const totalVal = Math.max(activePoint.total, 1);
  const investedVal = Math.min(activePoint.invested, totalVal);
  const profitVal = Math.max(0, totalVal - investedVal);
  const investedPercent = Math.round((investedVal / totalVal) * 100);
  const profitPercent = 100 - investedPercent;

  // SVG Donut calculation
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const investedStrokeDash = (investedPercent / 100) * circumference;
  const profitStrokeDash = (profitPercent / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-colors">
      {/* Header with Mode Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{chartTitle}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hover over the graph to inspect year-by-year compounding growth
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setViewType('line')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
              viewType === 'line'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Line Chart
          </button>
          <button
            type="button"
            onClick={() => setViewType('area')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
              viewType === 'area'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Area Growth
          </button>
          <button
            type="button"
            onClick={() => setViewType('donut')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
              viewType === 'donut'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Proportion
          </button>
        </div>
      </div>

      {viewType === 'donut' ? (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
          {/* Donut representation */}
          <div className="relative flex items-center justify-center">
            <svg width="200" height="200" className="rotate-[-90deg]">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                strokeWidth="24"
                className="stroke-slate-200 dark:stroke-slate-800"
              />
              {/* Invested segment */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={investedColor}
                strokeWidth="24"
                strokeDasharray={`${investedStrokeDash} ${circumference}`}
                strokeDashoffset="0"
                className="transition-all duration-300"
              />
              {/* Returns segment */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                strokeWidth="24"
                strokeDasharray={`${profitStrokeDash} ${circumference}`}
                strokeDashoffset={`-${investedStrokeDash}`}
                className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">At Year {activePoint.year}</span>
              <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {formatINR(activePoint.total, { compact: true })}
              </span>
            </div>
          </div>

          {/* Donut Legend & Stats */}
          <div className="space-y-3 w-full max-w-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: investedColor }} />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{investedLabel}</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">{formatINR(investedVal)}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">{investedPercent}% of total</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-indigo-700 dark:bg-indigo-400" />
                <span className="text-xs font-medium text-indigo-900 dark:text-indigo-200">Est. Returns (Profit)</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-indigo-950 dark:text-indigo-100 tabular-nums">{formatINR(profitVal)}</div>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 tabular-nums">{profitPercent}% of total</div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
              Capital gain accounts for <strong className="text-indigo-700 dark:text-indigo-400">{profitPercent}%</strong> of your future wealth!
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          {/* Active Data Pill (Inspection bar) */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50/90 dark:bg-slate-800/80 rounded-lg border border-slate-100 dark:border-slate-700 mb-2 text-xs">
            <span className="font-semibold text-slate-800 dark:text-white">
              Year {activePoint.year} ({activePoint.year * 12} Months)
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: investedColor }} />
                <span>{investedLabel}:</span>
                <strong className="text-slate-900 dark:text-white tabular-nums">{formatINR(activePoint.invested)}</strong>
              </span>
              <span className="flex items-center gap-1.5 text-indigo-900 dark:text-indigo-300 font-semibold">
                <span className="w-2.5 h-2.5 rounded-xs bg-indigo-700 dark:bg-indigo-400" />
                <span>{totalLabel}:</span>
                <strong className="text-indigo-950 dark:text-indigo-200 tabular-nums">{formatINR(activePoint.total)}</strong>
              </span>
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="w-full overflow-x-auto select-none">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto max-h-[340px]"
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id={`${gradientId}-total`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4338CA" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#4338CA" stopOpacity="0.01" />
                </linearGradient>
                <linearGradient id={`${gradientId}-invested`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={investedColor} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={investedColor} stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines & Y-Axis labels */}
              {yTicks.map((val, idx) => {
                const y = getY(val);
                return (
                  <g key={idx}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      strokeWidth="1"
                      className="stroke-slate-100 dark:stroke-slate-800"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="10"
                      className="tabular-nums fill-slate-400 dark:fill-slate-500"
                    >
                      {formatINR(val, { compact: true })}
                    </text>
                  </g>
                );
              })}

              {/* Area fills if selected */}
              {viewType === 'area' && (
                <>
                  <path d={totalAreaPath} fill={`url(#${gradientId}-total)`} />
                  <path d={investedAreaPath} fill={`url(#${gradientId}-invested)`} />
                </>
              )}

              {/* Invested Amount Line (Green) */}
              <polyline
                fill="none"
                stroke={investedColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={investedPoints}
              />

              {/* Total Wealth Compounding Line */}
              <polyline
                fill="none"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={totalPoints}
                className="stroke-[#1E1B4B] dark:stroke-indigo-400"
              />

              {/* Interactive vertical hover rule */}
              {hoverIndex !== null && (
                <line
                  x1={getX(hoverIndex)}
                  y1={padding.top}
                  x2={getX(hoverIndex)}
                  y2={padding.top + innerHeight}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="stroke-slate-400 dark:stroke-slate-600"
                />
              )}

              {/* Interactive nodes & hover hit-areas */}
              {data.map((d, i) => {
                const x = getX(i);
                const yInvested = getY(d.invested);
                const yTotal = getY(d.total);
                const isSelected = i === activeIndex;

                return (
                  <g key={i}>
                    {/* Visual Dots */}
                    {(isSelected || i === data.length - 1 || data.length <= 15) && (
                      <>
                        <circle
                          cx={x}
                          cy={yInvested}
                          r={isSelected ? 5 : 3}
                          fill="#ffffff"
                          stroke={investedColor}
                          strokeWidth="2"
                        />
                        <circle
                          cx={x}
                          cy={yTotal}
                          r={isSelected ? 6 : 4}
                          strokeWidth="2"
                          className="fill-[#1E1B4B] dark:fill-indigo-400 stroke-white dark:stroke-slate-900"
                        />
                      </>
                    )}

                    {/* Wide transparent hit target */}
                    <rect
                      x={x - innerWidth / (data.length * 2)}
                      y={padding.top}
                      width={innerWidth / (data.length || 1)}
                      height={innerHeight}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoverIndex(i)}
                      onTouchStart={() => setHoverIndex(i)}
                    />
                  </g>
                );
              })}

              {/* X-Axis year labels */}
              {data
                .filter((_, idx) => {
                  if (data.length <= 10) return true;
                  if (data.length <= 20) return idx % 2 === 0 || idx === data.length - 1;
                  if (data.length <= 40) return idx % 5 === 0 || idx === data.length - 1;
                  if (data.length <= 70) return idx % 10 === 0 || idx === data.length - 1;
                  return idx % 15 === 0 || idx === data.length - 1;
                })
                .map((d) => {
                  const idx = data.findIndex(item => item.year === d.year);
                  return (
                    <text
                      key={d.year}
                      x={getX(idx)}
                      y={height - 12}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="500"
                      className="tabular-nums fill-slate-500 dark:fill-slate-400"
                    >
                      Yr {d.year}
                    </text>
                  );
                })}
            </svg>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-1 rounded-full" style={{ backgroundColor: investedColor }} />
              <span>{investedLabel}</span>
            </span>
            <span className="flex items-center gap-2 font-medium text-slate-900 dark:text-white">
              <span className="w-3.5 h-1 rounded-full bg-[#1E1B4B] dark:bg-indigo-400" />
              <span>{totalLabel} (Compounded)</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
