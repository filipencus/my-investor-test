import { render, screen } from '@testing-library/react'
import FundsDetails from './FundsDetails'

describe('FundsDetails', () => {
  it('renders without crashing', () => {
    render(<FundsDetails />)
    expect(screen.getByText(/fund/i)).toBeInTheDocument()
  })
})