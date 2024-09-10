import { SalaryProvider } from '../contexts/SalaryContext'
import HomePage from './home/page'

export default function Home() {
  return (
    <SalaryProvider>
      <HomePage />
    </SalaryProvider>
  )
}