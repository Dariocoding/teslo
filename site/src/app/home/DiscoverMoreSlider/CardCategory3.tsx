'use client';
import React from 'react';
import classNames from 'classnames';
import NcImage from '../../../shared/NCImage';
import RenderIf from '@teslo/react-ui/RenderIf';

export interface CardCategory3Props {
	featuredImage?: string;
	name?: string;
	desc?: string;
	color?: string;
}

const CardCategory3: React.FunctionComponent<CardCategory3Props> = props => {
	const { featuredImage, name, desc, color } = props;

	return (
		<div className="lg:px-6 md:px-3 px-2">
			<div
				className={classNames(
					'min-h-[225px] relative rounded-2xl group',
					color
				)}
			>
				<div>
					<NcImage
						src={featuredImage}
						containerClassName="absolute inset-5 sm:inset-8"
						className="absolute right-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
					/>
				</div>
				<span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/30 transition-opacity duration-200"></span>

				<div>
					<div className="absolute inset-5 sm:inset-8 flex flex-col">
						<div className="max-w-xs">
							<span
								className={`block mb-2 text-sm text-slate-50 font-semibold`}
							>
								{name}
							</span>
							<RenderIf isTrue={desc}>
								<h2
									className={`text-xl md:text-2xl text-slate-50 font-semibold`}
									dangerouslySetInnerHTML={{
										__html: desc,
									}}
								></h2>
							</RenderIf>
						</div>
						<div className="mt-auto">
							<button className="btn btn-alternative mt-1 shadow-2xl btn-sm">
								Show me all
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardCategory3;
