import AppComponent from './components/App';
import {AppContextProvider} from './store/context';

export default function App() {
    return (
        <AppContextProvider>
            <AppComponent/>
        </AppContextProvider>
    );
}