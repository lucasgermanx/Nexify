import { create } from 'zustand';

type Store = {
  cart_length: number;
  setQuantityCart: (newLength: number) => void; // Adicionando um parâmetro para a função
};

const notifyCart = create<Store>((set) => ({
  cart_length: 0,
  setQuantityCart: (newLength: number) => set({ cart_length: newLength }), // Usando o parâmetro para definir o estado
}));

export default notifyCart;
