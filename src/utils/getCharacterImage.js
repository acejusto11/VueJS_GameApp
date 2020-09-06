import mockClass from '../mockData/characterImages.json';

export function getCharacterImage(characterId) {
  function equalsId(c) {
    return c.characterId === characterId;
  }
  return mockClass?.find(equalsId)?.characterImages || [];
}

export default { getCharacterImage };
