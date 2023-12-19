import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './rtk/store.ts'
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient/client.ts';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </Provider>
)

