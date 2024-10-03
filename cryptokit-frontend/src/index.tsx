import App from './routes';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>);

export default Root;
