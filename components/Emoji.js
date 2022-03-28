const EMOJIS = {
	err: '●︿●',
	normal: '´･ᴗ･`',
};

function Loading({ text, type = 'normal' }) {
	return (
		<div className="absolute text-white text-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
			<h2 className="text-6xl font-bold">{EMOJIS[type]}</h2>
			<p className="text-high">{text}</p>
		</div>
	);
}

export default Loading;
