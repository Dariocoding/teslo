import { colors } from '@/utils';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const TablePlaceholder: React.FunctionComponent<IContentLoaderProps> = props => {
	const {} = props;
	return (
		<ContentLoader
			className="w-full h-full opacity-75"
			speed={1}
			backgroundColor={colors.primary}
			foregroundColor={colors.primaryLighter}
			{...props}
		>
			<rect x="0" y="0" width="400%" height="10" />

			<rect x="0" y="20" width="20%" height="10" />
			<rect x="30" y="20" width="100%" height="10" />
			<rect x="340" y="20" width="60" height="10" />

			<rect x="0" y="40" width="400%" height="10" />
			<rect x="0" y="60" width="400%" height="60" />

			<rect x="0" y="130" width="20" height="10" />
			<rect x="30" y="130" width="100%" height="10" />
			<rect x="340" y="130" width="60" height="10" />

			<rect x="0" y="150" width="190" height="80" />
			<rect x="200" y="150" width="200" height="80" />

			<rect x="0" y="240" width="70" height="10" />
			<rect x="80" y="240" width="400%" height="10" />

			<rect x="0" y="260" width="70" height="10" />
			<rect x="80" y="260" width="400%" height="10" />
		</ContentLoader>
	);
};

export default TablePlaceholder;
