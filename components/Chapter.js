import Link from 'next/link';

function Chapter({ data }) {
	const { id, chapter, volume, title } = data;

	return (
		<Link href={`/chapter/${id}`}>
			<a className="block bg-dark-01dp py-3 px-1 mb-2 cursor-pointer">
				{title && <h3 className="text-high">{title}</h3>}
				{(volume || chapter) && (
					<p className="text-medium">{`${volume ? `Volume ${volume} ` : ''}${
						chapter ? `Chapter ${chapter}` : ''
					}`}</p>
				)}
			</a>
		</Link>
	);
}

export default Chapter;
