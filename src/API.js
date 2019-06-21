// @flow
import axios from "axios";
import type { AxiosPromise } from "axios";
import * as Cur from "components/Currency";
import useErrorHandler from "contexts/Error";
import { useUser, useUnsafeSetUser } from "contexts/Auth";

const API = {
  addCredit: <T> (user: User, delta: number): AxiosPromise<T> => (
    axios.post("/user/credit",
      { id: user.id
        , delta: delta
        , product: null
        , description: Cur.formatString(delta, "diff")
      })
  ),
  buyProduct: <T> (user: User, product: Product): AxiosPromise<T> => (
    axios.post("/user/credit",
      { id: user.id
        , delta: -product.price
        , product: product
        , description: product.name
      })
  ),
  addUser: <T> (user: string): AxiosPromise<T> => (
    axios.post("/user/add",
      { username: user })
  ),
  getAllUsers: <T> (): AxiosPromise<T> => axios.get("/users/all"),
  getAllProducts: <T> (): AxiosPromise<T> => axios.get("/products/all"),
  getUser: <T> (user: { id: number }, pin?: string): AxiosPromise<T> => (
    axios.get(`/user/${user.id}`,
      { headers: { "x-user-pincode": pin == null ? "null" : pin }})
  ),
  getTransactions: <T> (user: User): AxiosPromise<T> => (
    axios.get(`/transactions/${user.id}`)
  ),
  renameUser: <T> (user: User, name: string, pin?: string): AxiosPromise<T> => (
    axios.post("/user/rename", {
      id: user.id,
      newname: name
    }, { headers: { "x-user-pincode": pin == null ? "null" : pin }})
  )
};

type VoidFn = () => void;
const def = () => {};

export const useAddCredit = () => (delta: number, onSuccess: VoidFn = def) => {
  const user = useUser();
  const setUser = useUnsafeSetUser();
  const handleError = useErrorHandler();
  if (user == null) {
    handleError("Cannot add credit. User is null.");
  } else {
    API.addCredit(user, delta)
      .then((response) => {
        setUser(response.data);
        onSuccess();
      }).catch(handleError);
  }
};

export const useBuyProduct = () => (p: Product, onSuccess: VoidFn = def) => {
  const user = useUser();
  const setUser = useUnsafeSetUser();
  const handleError = useErrorHandler();
  if (user == null) {
    handleError("Cannot add credit. User is null.");
  } else {
    API.buyProduct(user, p)
      .then((response) => {
        setUser(response.data);
        onSuccess();
      }).catch(handleError);
  }
};

export default API;
