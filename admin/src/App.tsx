import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router';
import { PortalLoader } from './components/ui/Loader';
/* import { useAuthStore, useModalStore } from '@/store'; */
import RenderIf from '@teslo/react-ui/RenderIf';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAxiosBaseURL, { tokenAuth, axiosClient } from '@teslo/services';
import { API_URL } from './utils';
import { useAuthStore, useModalStore } from './store';

const Modal = React.lazy(() => import('@teslo/react-ui/Modal'));

interface IAppProps {}

const at = localStorage.getItem('at');
tokenAuth(at);
setAxiosBaseURL(API_URL);

const App: React.FunctionComponent<IAppProps> = props => {
	const {} = props;
	const initAuthenticate = useAuthStore(state => state.initAuthenticate);
	const { size, title, show, closeModal, content } = useModalStore();

	React.useEffect(() => {
		initAuthenticate();
		// eslint-disable-next-line
	}, []);

	return (
		<React.Fragment>
			<ToastContainer
				theme="light"
				position="bottom-right"
				style={{ fontFamily: 'Poppins' }}
				toastClassName={''}
			/>
			<React.Suspense fallback={<></>}>
				<RenderIf isTrue={show}>
					<Modal
						onClose={closeModal}
						showModal={show}
						title={title}
						size={size}
					>
						{content}
					</Modal>
				</RenderIf>
			</React.Suspense>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
			<PortalLoader />
		</React.Fragment>
	);
};

export default App;
