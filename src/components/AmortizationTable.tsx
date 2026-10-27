import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Table } from 'lucide-react';
import { formatINR } from '../utils/calculatorMath';

export interface BreakdownRow {
  year: number;
  openingBalance: number;
  investedOrWithdrawn: number;
  returnsEarned: number;
  closingBalance: number;
  monthlyAmount?: number;
}

interface AmortizationTableProps {
  title?: string;
  data: BreakdownRow[];
  investedColumnName?: string;
  returnsColumnName?: string;
  fileName?: string;
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({
  title = 'Year-by-Year Amortization & Growth Schedule',
  data,
  investedColumnName = 'Deposited (Yr)',
  returnsColumnName = 'Growth / Interest',
  fileName = 'wealth_schedule.csv',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const downloadCSV = () => {
    const headers = ['Year', 'Opening Balance (₹)', investedColumnName + ' (₹)', returnsColumnName + ' (₹)', 'Closing Balance (₹)'];
    const rows = data.map(r => [
      r.year,
      r.openingBalance,
      r.investedOrWithdrawn,
      r.returnsEarned,
      r.closingBalance,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mt-6 transition-colors">
      <div
        className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-emerald-400 flex items-center justify-center">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Detailed progression table across all {data.length} years
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              downloadCSV();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
            title="Download CSV Spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            type="button"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Toggle table visibility"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <th className="py-2.5 px-4 font-semibold">Year</th>
                <th className="py-2.5 px-4 font-semibold text-right">Opening Balance</th>
                <th className="py-2.5 px-4 font-semibold text-right">{investedColumnName}</th>
                <th className="py-2.5 px-4 font-semibold text-right">{returnsColumnName}</th>
                <th className="py-2.5 px-4 font-semibold text-right">Closing Wealth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {data.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white tabular-nums">
                    Year {row.year}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-600 dark:text-slate-400 tabular-nums">
                    {formatINR(row.openingBalance)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-700 dark:text-slate-300 tabular-nums">
                    {formatINR(row.investedOrWithdrawn)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-600 dark:text-emerald-400 font-medium tabular-nums">
                    +{formatINR(row.returnsEarned)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-semibold text-slate-900 dark:text-white tabular-nums">
                    {formatINR(row.closingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50/90 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700">
                <td className="py-3 px-4">Summary</td>
                <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400 tabular-nums">-</td>
                <td className="py-3 px-4 text-right tabular-nums">
                  {formatINR(data.reduce((acc, r) => acc + r.investedOrWithdrawn, 0))}
                </td>
                <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 tabular-nums">
                  +{formatINR(data.reduce((acc, r) => acc + r.returnsEarned, 0))}
                </td>
                <td className="py-3 px-4 text-right text-emerald-700 dark:text-emerald-300 font-bold tabular-nums">
                  {formatINR(data[data.length - 1]?.closingBalance || 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
