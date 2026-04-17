import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/Store/Appstore'
import App from './app/Page/App.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
