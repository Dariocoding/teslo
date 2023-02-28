import classNames from 'classnames';
import React from 'react';

export interface SectionHero3Props {
	className?: string;
}

const SectionHero3: React.FunctionComponent<SectionHero3Props> = props => {
	const { className } = props;
	return (
		<div className={classNames('relative', className)}>
			<div className="relative pt-8 lg:pt-0 lg:absolute z-10 inset-x-0 top-[10%] sm:top-[20%]  container">
				<div className="flex flex-col items-start max-w-lg xl:max-w-2xl space-y-5 xl:space-y-8 ">
					<span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
						In this season, find the best 🔥
					</span>
					<h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[115%] ">
						Sports equipment collection.
					</h2>
					<div className="sm:pt-4">
						<button className="btn btn-primary btn-sm">
							Start your search
						</button>
					</div>
				</div>
			</div>

			<div className="relative z-[1] lg:aspect-w-16 lg:aspect-h-8 2xl:aspect-h-7">
				<div className="h-[500px] w-full">
					<div className="mt-5 lg:mt-0 lg:absolute right-0 bottom-0 top-0 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl ml-auto">
						<img
							className="w-full sm:h-full object-contain object-right-bottom "
							src={'/images/hero-2-right-1.png'}
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className="absolute inset-0 bg-[#F7F0EA] rounded-2xl overflow-hidden z-0">
				<img
					className="absolute w-full h-full object-contain"
					src={'/images/Moon.svg'}
					alt="hero"
				/>
			</div>
		</div>
	);
};

export default SectionHero3;
