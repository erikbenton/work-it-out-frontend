import type SetTagOption from "../types/setTagOption";

export const bgBlue = '#F5FBFF';

export const generalAvatarStyle = {
  width: '35px',
  height: '35px',
  fontSize: 16,
}

export const badgeStyle = (setTag?: SetTagOption) => {
  return {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: '0.75rem',
    backgroundColor: setTag?.colorRgb ?? 'inherit',
    width: '20px',
    height: '20px',
    top: 5,
    textAlign: 'center'
  };
}