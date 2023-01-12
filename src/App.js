import './App.css';
import RouterApp from './router/RouterApp';
import { QueryClient, QueryClientProvider } from 'react-query';

// Initialze the client
const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterApp />
      </QueryClientProvider>
    </>
  )
}

export default App;
