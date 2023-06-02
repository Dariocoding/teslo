const TablePlaceholder: React.FunctionComponent = props => {
	const {} = props;
	return (
		<div className="animate-pulse">
			<div className="h-4 bg-gray-200 mb-6 rounded"></div>
			<div className="h-4 bg-gray-300 mb-6 rounded"></div>
			<div className="h-4 bg-gray-200 mb-6 rounded"></div>
			<div className="h-4 bg-gray-300 mb-6 rounded"></div>
			<div className="h-4 bg-gray-200 rounded"></div>
		</div>
	);
};

export default TablePlaceholder;
