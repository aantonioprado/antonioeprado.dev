import { render, screen, act } from '@testing-library/react'
import { ErrorPage } from './ErrorPage'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

it('renders the error content and its controls', () => {
  render(<ErrorPage kind="403" />)

  expect(screen.getByText('403')).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect(screen.getAllByRole('button')).toHaveLength(2)
})

it('translates the page content when the language button is clicked', () => {
  render(<ErrorPage kind="404" />)

  const heading = screen.getByRole('heading', { level: 1 })
  const before = heading.textContent
  const languageButton = screen.getByRole('button', { name: /português|english/i })

  act(() => {
    languageButton.click()
  })

  expect(heading.textContent).not.toBe(before)
})

it('toggles the theme from the error page', () => {
  render(<ErrorPage kind="500" />)

  const themeButton = screen.getByRole('button', { name: /modo (escuro|claro)|(dark|light) mode/i })

  act(() => {
    themeButton.click()
  })

  expect(document.documentElement.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('theme')).toBe('dark')
})
