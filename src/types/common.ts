import { FluidObject } from 'gatsby-image';

export interface IItem {
  id: string;
  imgSrc: { sharp: { fluid: FluidObject } };
  specialOffers: string[];
  title: string;
  subtitle: string;
  price: number;
}

export interface ICategoryImage {
  fluid: FluidObject;
}
