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
  weight: number;
  isHot?: boolean;
  rating: number;
  family: IFamily;
  device: IDevice[];
  color: IColor[];
  pictures: IPicture[];
  deliveryOption: IDeliveryOption[];
  specialOffers: Array<{ name: string }>;
  categories: Array<{ name: string; title: string }>;
}

export interface IProductPaginated {
  nodes: IProduct[];
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  title: string;
  titleCN: string;
  pageImg: string;
  coverImg: string;
  subcategory: ISubCategory[];
  products: IProductPaginated;
}

export interface ISubCategory {
  id: string;
  name: string;
  title: string;
  titleCN: string;
  pageImg: string;
  category: ICategory;
  products: IProduct[];
}

export interface IFamily {
  id: string;
  name: string;
  products: IProduct[];
}

export interface IDeliveryOption {
  id: string;
  name: string;
  pricePerKg: number;
}

export interface IColor {
  id: string;
  name: string;
  colorImage: string;
}

export interface IDevice {
  id: string;
  name: string;
}

export interface IImage {
  fluid: FluidObject;
}

export interface ISlide {
  id: string;
  coverImg: string;
}

export interface IStaticText {
  id: string;
  title: string;
  titleCN: string;
  description: string;
  descriptionCN: string;
}

export interface IBasketProduct extends IProduct {
  quantity: number;
}

export interface ITemplatePage {
  id: string;
  title: string;
  titleCN: string;
  coverImg: string;
  content: string;
  contentCN: string;
  category: Array<{
    id: string;
    name: string;
    nameCN: string;
  }>;
}

export interface ITemplateCategory {
  id: string;
  name: string;
  nameCN: string;
  templates: ITemplatePage[];
}

export interface ISocial {
  id: string;
  name: string;
  faIcon: string;
  link: string;
}
