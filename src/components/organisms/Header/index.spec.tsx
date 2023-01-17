import { RenderResult, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Header from '.'
import { AuthContextProvider } from 'contexts/AuthContext'
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
import { theme } from 'themes'
import { Product, User } from 'types'

jest.mock('contexts/ShoppingCartContext')

const { ShoppingCartContextProvider } = jest.requireActual(
  'contexts/ShoppingCartContext',
)

const authUser: User = {
  id: 1,
  username: 'dummy',
  displayName: 'Taketo Yoshida',
  email: 'test@example.com',
  profileImageUrl: '/images/sample/1.jpg',
  description: '',
}

const product: Product = {
  id: 1,
  category: 'book',
  title: 'Product',
  description: '',
  imageUrl: '/images/sample/1.jpg',
  blurDataUrl: '',
  price: 1000,
  condition: 'used',
  owner: authUser,
}

describe('Header', () => {
  let renderResult: RenderResult
  const useShoppingCartContextMock =
    useShoppingCartContext as jest.MockedFunction<typeof useShoppingCartContext>

  it('カートに商品が存在する', async () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [product],
      addProductToCart: () => {},
      removeProductFromCart: () => {},
    })
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )

    expect(screen.getAllByTestId('badge-wrapper').length).toBeGreaterThan(0)

    renderResult.unmount()
    useShoppingCartContextMock.mockReset()
  })

  it('未サインイン', async () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      addProductToCart: () => {},
      removeProductFromCart: () => {},
    })
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )
  })

  expect(screen.queryByTestId('profile-shape-image')).not.toBeInTheDocument()
  expect(screen.queryByTestId('badge-wrapper')).toBeNull()
})
