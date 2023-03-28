import * as React from 'react';

const useIsCSR = () => {
	const isMountRef = React.useRef(false);
	const [isCSR, setISCSR] = React.useState(false);
	React.useEffect(() => {
		setISCSR(true);
		isMountRef.current = true;
	}, []);

	return isMountRef.current || isCSR;
};

export default useIsCSR;
