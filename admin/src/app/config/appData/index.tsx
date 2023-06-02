import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { BsDatabaseFillCheck } from 'react-icons/bs';
import FormEmail, { UpdateEmailDto } from './FormEmail';
import FormChatGpt, { UpdateChatgptDto } from './FormChatGpt';
import RenderIf from '@teslo/react-ui/RenderIf';
import { configAppService } from '@teslo/services';

interface IAppDataPageProps {}

const AppDataPage: React.FunctionComponent<IAppDataPageProps> = props => {
	const {} = props;
	const [loading, setLoading] = React.useState<boolean>(true);
	const [dataChatGpt, setDataChatGpt] = React.useState<UpdateChatgptDto>();
	const [dataEmail, setDataEmail] = React.useState<UpdateEmailDto>();

	React.useEffect(() => {
		async function init() {
			try {
				const { data } = await configAppService.find(['chatgpt', 'email']);
				setDataChatGpt({ chatGptKey: data.chatGptKey });
				setDataEmail({
					emailFrom: data.emailFrom,
					emailHost: data.emailHost,
					emailName: data.emailName,
					emailPassword: data.emailPassword,
					emailPort: data.emailPort,
					emailUser: data.emailUser,
				});
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		init();
	}, []);

	return (
		<HeaderDashboard
			title={'App Data'}
			icon={<BsDatabaseFillCheck />}
			to={validPaths.settings.path}
			breadcrumbs={[
				{ to: validPaths.dashboard.path, label: 'Dashboard' },
				{
					to: validPaths.settings.path,
					label: 'Settings',
				},
				{
					label: 'App Data',
				},
			]}
		>
			<div className="grid lg:grid-cols-2 gap-4">
				<RenderIf isTrue={!loading}>
					<div>
						<div className="tile shadow-xl">
							<h6 className="text-lg mb-4">
								ChatGpt Key
							</h6>
							<FormChatGpt data={dataChatGpt} />
						</div>
					</div>
					<div>
						<div className="tile shadow-xl">
							<h6 className="text-lg mb-4">Email Data</h6>
							<FormEmail data={dataEmail} />
						</div>
					</div>
				</RenderIf>
				<RenderIf isTrue={loading}></RenderIf>
			</div>
		</HeaderDashboard>
	);
};

export default AppDataPage;
