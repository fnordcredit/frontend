// @flow
import axios from "axios";
import type { AxiosPromise } from "axios";
import * as Cur from "components/Currency";

export default {
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
  getUser: <T> (user: User, pin?: string): AxiosPromise<T> => (
    axios.get(`/user/${user.id}`,
      { headers: { "x-user-pincode": pin == null ? "null" : pin }})
  ),
  getTransactions: <T> (user: User): AxiosPromise<T> => (
    axios.get(`/transactions/${user.id}`)
  )
};
