import mockClass from '../mockData/characterClass.json';

export function getCharacterSkills(id) {
  function equalsId(c) {
    return c.id === id;
  }

  const skills = mockClass?.find(equalsId)?.skills;
  return skills || [];
}
export default { getCharacterSkills };
