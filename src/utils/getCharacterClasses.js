import mockClass from '../mockData/characterClass.json';

export function getCharacterClasses() {
  function getClass(item) {
    return { code: item?.id, title: item?.characterClass };
  }
  return mockClass?.map(getClass) || [];
}

export default { getCharacterClasses };
