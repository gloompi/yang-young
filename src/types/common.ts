import { FluidObject } from 'gatsby-image';

export interface IItem {
  id: string;
  imgSrc: { sharp: { fluid: FluidObject } };
  specialOffers: string[];
  title: string;
  subtitle: string;
  price: number;
}

export interface IProduct {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImg: string;
  price: number;
  isHot?: boolean;
  specialOffers: Array<{ name: string }>;
  categories: Array<{ name: string; title: string }>;
}

export interface ICategory {
  id: string;
  name: string;
  title: string;
  coverImg: string;
  products: IProduct[];
}

export interface ICategoryImage {
  fluid: FluidObject;
}
