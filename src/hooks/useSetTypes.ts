import type SetType from "../types/setType";

export default function useSetTypes() {
  const setTypes: SetType[] = [
    { name: 'warm up', color: '' },
    { name: 'work', color: '' },
    { name: 'heavy', color: '' }
  ];

  return {
    setTypes
  }
}