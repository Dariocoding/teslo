import '../styles/globals.css';
import '../styles/form.styles.css';
import '../styles/table.styles.css';
import '../styles/typography.styles.css';
import '../styles/buttons.styles.css';
import '../styles/avatar.styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as React from 'react';
import Loader from '@/shared/Loader';
import Footer from '../layouts/Footer';
import TopNav from '../layouts/TopNav';
import { Poppins } from '@next/font/google';
import setAxiosBaseURL from '@teslo/services';
import { envs } from '@/utils';
import Init from '@/shared/init';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['500', '700', '800', '500', '400', '300'],
	variable: '--font-poppins',
});

interface IRootLayoutProps {
	children: React.ReactNode;
}

setAxiosBaseURL(envs.API_URL);

const RootLayout: React.FunctionComponent<IRootLayoutProps> = props => {
	const {} = props;

	return (
		<html lang="en" className={poppins.variable}>
			{/*
    <head /> will contain the components returned by the nearest parent
    head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
  */}
			<head />
			<body>
				<Init />
				<div id="portal-modal"></div>

				<div className="portal-loader hidden">
					<Loader loading={true} />
				</div>
				<TopNav />
				<main
					className="bg-white text-base flex-grow text-slate-900 pt-20 pb-8"
					suppressHydrationWarning
				>
					{props.children}
				</main>

				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
