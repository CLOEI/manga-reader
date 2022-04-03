import Link from 'next/link';

function Chapter({ data }) {
	const { id, chapter, volume, title, scanlationName, externalUrl } = data;

	if (externalUrl) {
		return (
			<a
				className="block bg-dark-01dp py-3 px-1 mb-2 cursor-pointer"
				href={externalUrl}
				target="_blank"
				rel="noreferrer"
			>
				{title && <h3 className="text-high">{title}</h3>}
				{(volume || chapter) && (
					<p className="text-medium">{`${volume ? `Volume ${volume} ` : ''}${
						chapter ? `Chapter ${chapter}` : ''
					}`}</p>
				)}
				{scanlationName && (
					<span className="text-xs text-medium">{scanlationName}</span>
				)}
			</a>
		);
	}

	return (
		<Link href={`/chapter/${id}`}>
			<a className="block bg-dark-01dp py-3 px-1 mb-2 cursor-pointer">
				{title && <h3 className="text-high">{title}</h3>}
				{(volume || chapter) && (
					<p className="text-medium">{`${volume ? `Volume ${volume} ` : ''}${
						chapter ? `Chapter ${chapter}` : ''
					}`}</p>
				)}
				{scanlationName && (
					<span className="text-xs text-medium">{scanlationName}</span>
				)}
			</a>
		</Link>
	);
}

export default Chapter;
