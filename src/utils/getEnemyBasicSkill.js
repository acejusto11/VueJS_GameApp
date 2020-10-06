import mockSkill from '../mockData/enemyBasicSkill.json';

export function getEnemyBasicSkill(enemyName) {
  function equalsName(c) {
    return c.enemy === enemyName;
  }
  return mockSkill?.find(equalsName) || {};
}

export default { getEnemyBasicSkill };
