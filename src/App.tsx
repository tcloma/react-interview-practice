import React, { useState } from "react";
import "./App.css";

type Points = {
	x: number;
	y: number;
};

function App() {
	const [points, setPoints] = useState<Points[]>([]);
	const [popped, setPopped] = useState<Points[]>([]);

	function handleDivClick(e: React.MouseEvent) {
		setPoints([...points, { x: e.clientX, y: e.clientY }]);
	}

	function handleUndoClick() {
		const poppedArr = [...points];
		const poppedPoint = poppedArr.pop();
		if (!poppedPoint) return;
		setPopped([...popped, poppedPoint]);
		setPoints(poppedArr);
	}

	function handleRedoClick() {
		const redoArr = [...popped];
		const redidPoint = redoArr.pop();
		if (!redidPoint) return;
		setPoints([...points, redidPoint]);
		setPopped(redoArr);
	}

	return (
		<>
			<button
				disabled={points.length === 0}
				onClick={handleUndoClick}
				className="button"
			>
				Undo
			</button>
			<button
				disabled={popped.length === 0}
				onClick={handleRedoClick}
				className="button"
			>
				Redo
			</button>
			<div className="App" onClick={handleDivClick}>
				{points.map((point, index) => {
					return (
						<div
							key={index}
							className="point"
							style={{ top: `${point.y - 25}px`, left: `${point.x - 25}px` }}
						/>
					);
				})}
			</div>
		</>
	);
}

export default App;
