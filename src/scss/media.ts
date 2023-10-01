export enum Breackpoint {
  XS = 428,
  SM = 768,
  MD = 1024,
  LG = 1170,
  XL = 1440,
  XXL = 1920,
  XXXL = 2560
}

export const Media = {
  XS: `@media screen and (max-width: ${Breackpoint.XS}px)`,
  SM: `@media screen and (max-width: ${Breackpoint.SM}px)`,
  MD: `@media screen and (max-width: ${Breackpoint.MD}px)`,
  LG: `@media screen and (max-width: ${Breackpoint.LG}px)`,
  XL: `@media screen and (max-width: ${Breackpoint.XL}px)`,
  XXL: `@media screen and (max-width: ${Breackpoint.XXL}px)`,
  XXXL: `@media screen and (max-width: ${Breackpoint.XXXL}px)`
}
