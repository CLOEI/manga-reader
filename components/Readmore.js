import { useState, useRef, useEffect } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { motion } from 'framer-motion';

function Readmore({ children }) {
	const [collapse, setCollapse] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const paragraphRef = useRef(null);

	useEffect(() => {
		const height = paragraphRef.current.offsetHeight;
		// 24 is the line height. dividing it by 24 gives you the number of lines.
		if (height / 24 >= 5) {
			setCollapse(true);
			setShowButton(true);
		} else {
			setShowButton(false);
		}
	}, []);

	const toggleCollapse = () => setCollapse(!collapse);

	return (
		<>
			<motion.p
				className="block text-high overflow-hidden"
				animate={{
					height: collapse && showButton ? '5rem' : 'auto',
				}}
				ref={paragraphRef}
			>
				{children}
			</motion.p>
			{showButton && (
				<button
					onClick={toggleCollapse}
					className="text-rose-500 flex justify-center items-center w-full"
				>
					{collapse ? <AiOutlineDown size={32} /> : <AiOutlineUp size={32} />}
				</button>
			)}
		</>
	);
}

export default Readmore;
