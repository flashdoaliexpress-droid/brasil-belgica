import { leagueInfo, leagueStandings } from "../data/league";
import { useInView } from "../hooks/useInView";

export function LigaSection() {
  const { ref: titleRef, inView: titleVisible } = useInView();
  const { ref: tableRef, inView: tableVisible } = useInView();

  return (
    <section id="liga" className="bg-page-alt w-full py-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter md:gap-12 items-start">
          <div className="lg:col-span-5">
            <div
              ref={titleRef}
              className={`transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
            >
              <div className="space-y-1.5 mb-4">
                <div className="w-12 h-[3px] bg-[#0120F9]" />
                <div className="w-7 h-[2px] bg-brand-yellow" />
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
                LIGA TRABALHISTA
              </h2>
              <div className="space-y-1.5 mt-4 mb-6">
                <div className="w-7 h-[2px] bg-brand-yellow" />
                <div className="w-12 h-[3px] bg-[#0120F9]" />
              </div>

              <p className="text-sm text-stone mb-8">
                {leagueInfo.description}
              </p>
            </div>
          </div>

          {/* Light table */}
          <div
            ref={tableRef}
            className={`lg:col-span-7 transition-all duration-700 delay-200 ${tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
          >
            <div className="bg-white border border-hairline overflow-hidden">
              <div className="px-5 py-4 border-b border-hairline flex items-center justify-between">
                <h3 className="text-[11px] font-bold text-brand-navy uppercase tracking-widest">
                  Classificação
                </h3>
                <span className="text-[11px] font-medium text-dust uppercase tracking-widest">
                  Rodada {leagueInfo.currentRound}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-[11px] font-semibold text-dust border-b border-hairline">
                      <th className="text-left px-4 py-3 w-12">#</th>
                      <th className="text-left px-2 py-3">Time</th>
                      <th className="text-center px-2 py-3 w-10">J</th>
                      <th className="text-center px-2 py-3 w-10 hidden sm:table-cell">V</th>
                      <th className="text-center px-2 py-3 w-10 hidden sm:table-cell">E</th>
                      <th className="text-center px-2 py-3 w-10 hidden sm:table-cell">D</th>
                      <th className="text-right px-4 py-3 w-14">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueStandings.map((row) => (
                      <tr
                        key={row.position}
                        className={`border-b border-hairline last:border-0 transition-colors ${
                          row.isUs ? "bg-brand-navy/5" : "hover:bg-stone/5"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 text-[11px] font-bold ${
                              row.isUs
                                ? "bg-brand-navy text-white"
                                : row.position <= 3
                                ? "text-brand-navy"
                                : "text-dust"
                            }`}
                          >
                            {row.position}
                          </span>
                        </td>
                        <td className="px-2 py-3">
                          <span className={`text-sm font-semibold ${row.isUs ? "text-brand-navy" : "text-ink"}`}>
                            {row.team}
                          </span>
                          {row.isUs && (
                            <span className="ml-2 text-[10px] font-bold text-brand-navy uppercase tracking-widest">
                              · Nós
                            </span>
                          )}
                        </td>
                        <td className="text-center px-2 py-3 text-sm text-stone">{row.played}</td>
                        <td className="text-center px-2 py-3 text-sm font-semibold text-brand-navy hidden sm:table-cell">
                          {row.wins}
                        </td>
                        <td className="text-center px-2 py-3 text-sm text-dust hidden sm:table-cell">
                          {row.draws}
                        </td>
                        <td className="text-center px-2 py-3 text-sm text-stone hidden sm:table-cell">
                          {row.losses}
                        </td>
                        <td className={`text-right px-4 py-3 text-sm font-bold ${row.isUs ? "text-brand-navy" : "text-ink"}`}>
                          {row.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
