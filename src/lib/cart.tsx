"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const STORAGE_KEY = "bhd:cart";

export interface CartItem {
  key: string;
  productSlug: string;
  productName: string;
  imageUrl: string | null;
  size: string;
  wash: string | null;
  unitPrice: number; // paisa
  qty: number;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
}

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; key: string }
  | { type: "UPDATE_QTY"; key: string; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };

    case "ADD": {
      const existing = state.items.find((i) => i.key === action.item.key);
      if (existing) {
        return {
          ...state,
          drawerOpen: true,
          items: state.items.map((i) =>
            i.key === action.item.key
              ? { ...i, qty: i.qty + action.item.qty }
              : i
          ),
        };
      }
      return {
        ...state,
        drawerOpen: true,
        items: [...state.items, action.item],
      };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.key !== action.key),
      };

    case "UPDATE_QTY":
      if (action.qty <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.key !== action.key),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, qty: action.qty } : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };

    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  addItem: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  count: number;
  subtotal: number; // paisa
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    drawerOpen: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: "HYDRATE", items: JSON.parse(stored) as CartItem[] });
      }
    } catch {
      // Ignore invalid localStorage data
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore write errors
    }
  }, [state.items]);

  const addItem = useCallback((item: Omit<CartItem, "key">) => {
    const key = `${item.productSlug}:${item.size}:${item.wash ?? ""}`;
    dispatch({ type: "ADD", item: { ...item, key } });
  }, []);

  const removeItem = useCallback((key: string) => {
    dispatch({ type: "REMOVE", key });
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    dispatch({ type: "UPDATE_QTY", key, qty });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const openDrawer = useCallback(() => {
    dispatch({ type: "OPEN_DRAWER" });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "CLOSE_DRAWER" });
  }, []);

  const count = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.unitPrice * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openDrawer,
        closeDrawer,
        count,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
