'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="container text-center py-20">
			<h2 className="font-bold text-2xl">Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
				className={'btn btn-primary btn-sm mt-2'}
			>
				Try again
			</button>
		</div>
	);
}
