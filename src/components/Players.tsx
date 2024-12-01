interface GameRecord {
    name: string
    game: string
    bet: number
    win: number
    result: 'Nothing' | 'Loss' | 'Win'
    played: string
  }
  
  const recentGames: GameRecord[] = [
    {
      name: "Tamara Sour Sr.",
      game: "Blackjack",
      bet: 5382.00,
      win: 0.00,
      result: "Nothing",
      played: "20 MINUTES AGO"
    },
    {
      name: "Tamara Sour Sr.",
      game: "75 Ball Bingo",
      bet: 5971.00,
      win: 0.00,
      result: "Nothing",
      played: "18 MINUTES AGO"
    },
    {
      name: "Lavonna Cormier IV",
      game: "American Roulette",
      bet: 9822.00,
      win: 0.00,
      result: "Nothing",
      played: "20 MINUTES AGO"
    },
    {
      name: "Kandeem Sanford DDS",
      game: "Baccarat",
      bet: 15380.00,
      win: 0.00,
      result: "Loss",
      played: "9 MINUTES AGO"
    },
    {
      name: "Carly MacShurst",
      game: "Lucky Wheel",
      bet: 67550.00,
      win: 0.00,
      result: "Nothing",
      played: "1 HOUR AGO"
    },
    {
      name: "Chesley Beler",
      game: "Baccarat",
      bet: 7160.00,
      win: 0.00,
      result: "Loss",
      played: "9 MINUTES AGO"
    },
    {
      name: "Roel Cremin",
      game: "Keno",
      bet: 26659.00,
      win: 0.00,
      result: "Nothing",
      played: "3 MINUTES AGO"
    },
    {
      name: "Kandeem Sanford DDS",
      game: "Video Poker",
      bet: 7067.00,
      win: 0.00,
      result: "Nothing",
      played: "9 MINUTES AGO"
    },
    {
      name: "Juvercal Hejeeires DDS",
      game: "Crypto Slots",
      bet: 423.00,
      win: 0.00,
      result: "Nothing",
      played: "2 HOURS AGO"
    },
    {
      name: "Kenyon Hebert",
      game: "European Roulette",
      bet: 1466.00,
      win: 0.00,
      result: "Loss",
      played: "2 HOURS AGO"
    }
  ]
  
  export default function RecentGames() {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white text-center mb-12">
            Recent games
          </h1>
          
          <div className="bg-blue-950/50 backdrop-blur-sm rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">NAME</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">GAME</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">BET</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">WIN</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">RESULT</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">PLAYED</th>
                </tr>
              </thead>
              <tbody>
                {recentGames.map((record, index) => (
                  <tr 
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-purple-200">{record.name}</td>
                    <td className="py-4 px-6 text-sm text-purple-200">{record.game}</td>
                    <td className="py-4 px-6 text-sm text-purple-200">
                      {record.bet.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-sm text-purple-200">
                      {record.win.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`
                        ${record.result === 'Win' ? 'text-green-400' : ''}
                        ${record.result === 'Loss' ? 'text-red-400' : ''}
                        ${record.result === 'Nothing' ? 'text-gray-400' : ''}
                      `}>
                        {record.result}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-purple-200">{record.played}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  
  