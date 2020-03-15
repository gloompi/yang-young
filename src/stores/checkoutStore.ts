import { observable, action } from 'mobx';
import axios from 'axios';

import { RootStore } from 'stores/rootStore';

const PUBLIC_KEY = 'pk_test_4ITsUSLIRdQB1nHfIe9N3NwY004slvbyYM';

interface ICheckoutItem {
  name: string;
  description: string;
  images: string[];
  amount: number;
  currency: 'usd' | 'cny';
  quantity: number;
}

class CheckoutStore {
  @observable public loading: boolean = false;

  constructor(private rootStore: RootStore) {}

  @action public handleCheckout = async () => {
    const lang = this.rootStore.appStore.lang;

    const products: ICheckoutItem[] = [];

    this.rootStore.basketStore.items.forEach(product => {
      products.push({
        name: lang === 'en' ? product.title : product.titleCN,
        description:
          lang === 'en' ? product.description : product.descriptionCN,
        images: [product.coverImg],
        amount: product.price * 100,
        currency: 'usd',
        quantity: product.quantity,
      });
    });

    const res = await axios.post(`https://yang-young-checkout.herokuapp.com`, {
      products: JSON.stringify(products),
    });

    const stripe = (window as any).Stripe(PUBLIC_KEY);

    stripe.redirectToCheckout({
      sessionId: res.data,
    });
  };
};

export default CheckoutStore;
