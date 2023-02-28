'use client';
import React, { ImgHTMLAttributes } from 'react';
import { icons } from '@/utils';
import checkInViewIntersectionObserver from '@/utils/isInViewPortIntersectionObserver';

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	containerClassName?: string;
}

const NcImage: React.FunctionComponent<NcImageProps> = props => {
	const {
		containerClassName = '',
		alt = 'nc-imgs',
		src = '',
		className = 'object-cover w-full h-full',
		...args
	} = props;
	const _containerRef = React.useRef(null);
	let _imageEl: HTMLImageElement | null = null;

	const [__src, set__src] = React.useState('');
	const [imageLoaded, setImageLoaded] = React.useState(false);

	const _checkInViewPort = () => {
		if (!_containerRef.current) return;
		checkInViewIntersectionObserver({
			target: _containerRef.current as any,
			options: {
				root: null,
				rootMargin: '0%',
				threshold: 0,
			},
			freezeOnceVisible: true,
			callback: _imageOnViewPort,
		});
	};

	const _imageOnViewPort = () => {
		if (!src) {
			_handleImageLoaded();
			return true;
		}
		_imageEl = new Image();
		if (_imageEl) {
			_imageEl.src = src;
			_imageEl.addEventListener('load', _handleImageLoaded);
		}
		return true;
	};

	const _handleImageLoaded = () => {
		setImageLoaded(true);
		set__src(src);
	};

	React.useEffect(() => {
		_checkInViewPort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [src]);

	const renderLoadingPlaceholder = () => {
		return (
			<div
				className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
			>
				<div className="h-2/4 max-w-[50%]">
					<icons.PlaceIcon className="w-full h-full" />
				</div>
			</div>
		);
	};

	return (
		<div className={containerClassName} ref={_containerRef}>
			{__src && imageLoaded ? (
				<img src={__src} className={className} alt={alt} {...args} />
			) : (
				renderLoadingPlaceholder()
			)}
		</div>
	);
};

export default NcImage;
