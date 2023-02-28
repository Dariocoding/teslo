import * as React from 'react';

const useIsCSR = () => {
	const [csr, setCSR] = React.useState(false);
	React.useEffect(() => {
		setCSR(true);
	}, []);

	return csr;
};

export default useIsCSR;
