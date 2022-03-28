function Tag({ tag }) {
	return (
		<span className="block bg-dark-02dp rounded-full px-3 py-1 text-sm font-semibold mr-2 text-high w-max whitespace-nowrap">
			{tag.attributes.name.en}
		</span>
	);
}

export default Tag;
