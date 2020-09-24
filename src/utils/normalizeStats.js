export function normalizeStats(statistics = {}, equipment = {}) {
  const weapon = equipment?.weapon?.bonus;
  const armor = equipment?.armor?.bonus;

  const statBonus =
    weapon &&
    Object.keys(weapon).reduce(function(acc, cur) {
      acc[cur] = weapon[cur] + armor[cur];
      return acc;
    }, {});
  console.log('statBonus', statBonus);
  const stats =
    statistics &&
    Object.keys(statistics).reduce(function(acc, cur) {
      const total = statistics[cur] + statBonus[cur];
      acc[cur] = { base: statistics[cur], bonus: statBonus[cur], total };
      return acc;
    }, {});
  return stats;
}

export default normalizeStats;
