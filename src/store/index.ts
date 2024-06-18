import { StateCreator as ZStateCreator, create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import createUserSlice, { userSlice as UserSlice } from "./slices/user";

// Define the slices and the state creator
type Slices = UserSlice;
export type StateCreator<T> = ZStateCreator<Slices, [], [], T>;

/**
 * Creates a global store with the given slices
 * @returns A hook to use the store
 * @example
 * const user = useStore((state) => state.user);
 * const setUser = useStore((state) => state.setUser);
 * // You can return an object or array
 * const [user, setUser] = useStore((state) => [state.user, state.setUser]);
 * @see {@link [Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)}
 */
const useStore = createWithEqualityFn<Slices>()(
  subscribeWithSelector(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
      }),
      {
        name: "medpass-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          phoneId: state.user, // <-- Partialize the state to only persist the `user` object
        }),
      }
    )
  ),
  shallow
);

export default useStore;

interface AuthSlice {
  token: string;
  setToken: (token: string) => void;
}
export const useAuthStore = create(
  subscribeWithSelector<AuthSlice>((set) => ({
    token: "",
    setToken: (token: string) => set({ token }),
  }))
);