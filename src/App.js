import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    const {cartList} = this.state
    const afterRemoving = cartList.filter(each => each.id !== id)
    this.setState({
      cartList: afterRemoving,
    })
  }

  addCartItem = product => {
    console.log(product)
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const cartProduct = cartList.find(eachItem => eachItem.id === product.id)
    console.log(cartProduct)

    if (cartProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === cartProduct.id) {
            const Quantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: Quantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState({
        cartList: [...cartList, product],
      })
    }
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return {...eachCartItem}
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(eachCartItem => eachCartItem.id === id)

    if (cartItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          const updatedData = eachCartItem.quantity - 1
          return {...eachCartItem, quantity: updatedData}
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,

          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
