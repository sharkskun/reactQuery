import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css'; // Pastikan file ini ada jika Anda menggunakan Tailwind CSS

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
