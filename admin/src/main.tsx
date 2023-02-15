import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/avatar.styles.css';
import './styles/buttons.styles.css';
import './styles/typography.styles.css';
import './styles/form.styles.css';
import './styles/table.styles.css';
import { queryClient } from './utils';
import { QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);

declare namespace File {
	interface File {
		id: string;
	}
}
