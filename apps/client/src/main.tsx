import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { ThemeProvider } from './components/ThemeProvider'
import { router } from './router'
import './styles.css'

const queryClient = new QueryClient()

const container = document.getElementById('root')
if (!container) {
  throw new Error('Failed to find root element')
}

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
