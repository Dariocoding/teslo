import { socials, SocialType } from '@/utils';
import classNames from 'classnames';

export interface SocialsList1Props {
	className?: string;
	itemClassName?: string;
}

const SocialsList1: React.FC<SocialsList1Props> = props => {
	const { itemClassName, className } = props;
	return (
		<div className={classNames(className)}>
			{socials.map((item, idx) => (
				<RenderItem key={idx} item={item} itemClassName={itemClassName} />
			))}
		</div>
	);
};

export default SocialsList1;

interface IRenderItemProps {
	item: SocialType;
	itemClassName: string;
}

const RenderItem: React.FunctionComponent<IRenderItemProps> = props => {
	const { item, itemClassName } = props;
	return (
		<a
			href={item.href}
			className={classNames(
				'flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group',
				itemClassName
			)}
		>
			<div className="flex-shrink-0 w-5 ">{item.icon}</div>
			<span className="hidden lg:block text-sm">{item.name}</span>
		</a>
	);
};
