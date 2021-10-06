import { useState, useRef } from 'react';
import { useGesture } from '@use-gesture/react';

// might be better than current, still work in progress

function CustomImage({ src, alt, wrapperClass }) {
	const [style, setStyle] = useState({ scale: 1, offset: 0, x: 0, y: 0 });
	const image = useRef(null);

	useGesture(
		{
			onWheel({ offset: [, y] }) {
				/*
					1 is the min scale
					y is the mouse offset
					0.002 used to convert hundreds to decimal points and each scroll + 0.2
					-1 only used to convert negative to positive.
				*/
				const newScale = 1 + y * 0.002 * -1;
				if (newScale <= 0.5) return;
				setStyle((pre) => ({ ...pre, scale: newScale, offset: y }));
			},
		},
		{
			target: image,
			wheel: {
				from: style.offset,
				distanceBounds: { min: 0 },
			},
			eventOptions: { passive: false },
		}
	);

	return (
		<div
			className={wrapperClass}
			style={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<img
				src={src}
				alt={alt}
				style={{
					position: 'relative',
					left: style.x,
					top: style.y,
					width: '360px',
					height: 'auto',
					touchAction: 'none',
					transform: `scale(${style.scale})`,
				}}
				ref={image}
			/>
		</div>
	);
}

export default CustomImage;
