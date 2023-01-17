import { RenderResult, fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Dropzone from '.'
import { theme } from 'themes'

describe('Dropzone', () => {
  let renderResult: RenderResult
  let handleProp: jest.Mock

  beforeEach(() => {
    handleProp = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <Dropzone onDrop={handleProp} />
      </ThemeProvider>
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('ファイルがドロップされたらonDropが呼ばれる', async () => {
    const element = await screen.findByTestId('dropzone')
    fireEvent.drop(element, {
      dataTransfer: {
        files: [new File(['( ﾟДﾟ)'], 'chucknorris.png', { type: 'image/png' })],
      },
    })
  })
})
