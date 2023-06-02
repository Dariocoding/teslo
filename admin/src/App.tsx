import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router';
import { PortalLoader, hideLoader } from './components/ui/Loader';
/* import { useAuthStore, useModalStore } from '@/store'; */
import RenderIf from '@teslo/react-ui/RenderIf';
import setAxiosBaseURL, {
	tokenAuth,
	configEnterpriseService,
	configAppService,
} from '@teslo/services';
import { API_URL } from './utils';
import { useAuthStore, useConfigApp, useModalStore } from './store';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import { useConfigEnterpriseStore } from './store';

const Modal = React.lazy(() => import('@teslo/react-ui/Modal'));

interface IAppProps {}

const at = localStorage.getItem('at');
tokenAuth(at);
setAxiosBaseURL(API_URL);

const defaultToastOptions: DefaultToastOptions = {
	position: 'bottom-right',
	style: {
		borderRadius: '10px',
		background: '#079992',
		color: '#fff',
	},
	error: {
		style: {
			background: '#ff0000',
			color: '#fff',
		},
	},
	duration: 7500,
};

const App: React.FunctionComponent<IAppProps> = props => {
	const {} = props;
	const [loading, setLoading] = React.useState(true);
	const { setColors } = useConfigApp();
	const { setConfigEnterprise } = useConfigEnterpriseStore();
	const initAuthenticate = useAuthStore(state => state.initAuthenticate);
	const { size, title, show, closeModal, content } = useModalStore();

	React.useEffect(() => {
		const init = async () => {
			try {
				const [_, configApp, configEnterprise] = await Promise.all([
					initAuthenticate(),
					configAppService.find(['colors']),
					configEnterpriseService.find(),
				]);
				setColors(configApp.data.colorsAdmin);
				setConfigEnterprise(configEnterprise.data);

				await initAuthenticate();
			} catch (error) {
			} finally {
				hideLoader();
				setLoading(false);
			}
		};
		init();
		// eslint-disable-next-line
	}, []);

	return (
		<React.Fragment>
			{!loading && (
				<>
					<Toaster toastOptions={defaultToastOptions} />

					<BrowserRouter>
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
						<AppRouter />
					</BrowserRouter>
				</>
			)}
			<PortalLoader />
		</React.Fragment>
	);
};

export default App;
