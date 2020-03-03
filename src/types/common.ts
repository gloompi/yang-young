import { FluidObject } from 'gatsby-image';

export interface IItem {
  id: string;
  imgSrc: { sharp: { fluid: FluidObject } };
  specialOffers: string[];
  title: string;
  subtitle: string;
  price: number;
}

export interface IPicture {
  id: string;
  name: string;
  image: string;
  products: IProduct[];
}

export interface IProduct {
  slug: string;
  title: string;
  titleCN: string;
  subtitle: string;
  subtitleCN: string;
  description: string;
  descriptionCN: string;
  coverImg: string;
  animatedImg: string;
  price: number;
  isHot?: boolean;
  rating: number;
  pictures: IPicture[];
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

export interface IColor {
  id: string;
  name: string;
  product?: IProduct;
}

export interface IDevice {
  id: string;
  name: string;
  product?: IProduct;
}

export interface IImage {
  fluid: FluidObject;
}

export interface ISlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link?: string;
  coverImg: string;
}
