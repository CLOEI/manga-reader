function Chapter({ data }) {
	const { id, chapter, volume, title } = data;

	return (
		<div className="bg-dark-01dp py-3 px-1 mb-2 cursor-pointer">
			{title && <h3 className="text-high">{title}</h3>}
			{(volume || chapter) && (
				<p className="text-medium">{`${volume ? `Volume ${volume} ` : ''}${
					chapter ? `Chapter ${chapter}` : ''
				}`}</p>
			)}
		</div>
	);
}

export default Chapter;
