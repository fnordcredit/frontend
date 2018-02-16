// @flow
import axios from "axios";
import Cur from "formatCurrency";

export default {
  addCredit: (user: User, delta: number) => (
    axios.post("/user/credit",
      { id: user.id
      , delta: delta
      , product: null
      , description: Cur.formatString(delta, "diff")
      })
  ),
  buyProduct: (user: User, product: Product) => (
    axios.post("/user/credit",
      { id: user.id
      , delta: -product.price
      , product: product
      , description: product.name
      })
  ),
  addUser: (user: string) => (
    axios.post("/user/add",
      { username: user })
  ),
  getAllUsers: () => axios.get("/users/all"),
  getAllProducts: () => axios.get("/products/all"),
  getUser: (user: User, pin?: string) => (
    axios.get(`/user/${user.id}`,
      { headers: { "x-user-pincode": pin == undefined ? "null" : pin }})
  ),
  getTransactions: (user: User) => (
    axios.get(`/transactions/${user.id}`)
  )
};
