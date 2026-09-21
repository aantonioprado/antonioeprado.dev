import { StrictMode } from 'react'
import { act } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { BrowserRouter, StaticRouter } from 'react-router'
import App from './App'
import { ErrorPage } from './pages/ErrorPage'

async function hydrate(markup: string, element: React.ReactElement) {
  document.body.innerHTML = `<div id="root">${markup}</div>`

  const errors: unknown[][] = []
  const spy = vi.spyOn(console, 'error').mockImplementation((...args) => {
    errors.push(args)
  })

  const container = document.getElementById('root')!
  let root: ReturnType<typeof hydrateRoot>

  await act(async () => {
    root = hydrateRoot(container, element, {
      onRecoverableError: (error) => {
        errors.push([error])
      },
    })
  })

  spy.mockRestore()
  act(() => root.unmount())

  return errors
}

it('hydrates the prerendered home without warnings', async () => {
  const markup = renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>,
  )

  const errors = await hydrate(
    markup,
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )

  expect(errors).toEqual([])
})

it('hydrates the prerendered error page without warnings', async () => {
  const markup = renderToString(<ErrorPage kind="404" />)

  const errors = await hydrate(
    markup,
    <StrictMode>
      <ErrorPage kind="404" />
    </StrictMode>,
  )

  expect(errors).toEqual([])
})
