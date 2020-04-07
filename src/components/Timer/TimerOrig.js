import React, { useState } from "react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export function Timer(callback, delay, start = true) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		if(!start) {
			return;
		}
		const tick = () => {
			savedCallback.current();
		};

		if(delay !== null) {
			const interval = setTimeout(tick, delay);

			// console.log(interval);

			return () => clearTimeout(interval);
		}
	}, [delay, start]);
}

// Timer.propTypes = {
// 	callback: PropTypes.func,
// 	delay: PropTypes.number,
// 	start: PropTypes.bool,
// };

const useTimeout = (callback, delay) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);


	useEffect(() => {
		const tick = () => {
			savedCallback.current();
		};

		if(delay !== null) {
			let id = setTimeout(tick, delay);
			return () => clearTimeout(id);
		}
	}, [delay])
};

const useInterval = (callback, delay) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);


	useEffect(() => {
		const tick = () => {
			savedCallback.current();
		};

		if(delay !== null) {
			let id = setInterval(tick, delay);
			return () => setInterval(id);
		}
	}, [delay])
};


class Timer2 {
	constructor(callback, delay) {
		this.callback = callback;
		this.delay = delay;
		this.callbackStartTime = 0;
		this.remaining = 0;
		this.timerId = null;
		this.paused = true;

		// this.setTimeout();
	}

	pause ()  {
		console.log("paused.");
		this.clear();
		this.remaining -= Date.now() - this.callbackStartTime;
		this.paused = true
	};
	resume () {
		console.log("resumed.");
		this.setTimeout();
		// this.setTimeout(setTimeout.bind(this), this.remaining);
		this.paused = false
	};
	setTimeout()  {
		this.clear();
		this.timerId = setInterval(() => {
			this.callbackStartTime = Date.now();
			this.callback()
		}, this.delay)
	};
	clear()  {
		clearInterval(this.timerId)
	};
}

const translate = (s) => {
	const mins = Math.floor(s / 60).toFixed(0);
	const secs = s % 60;

	return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
};

export const RoundTimer = ({ showModal, handleClose, handleLogout, seconds2 }) => {

	const [count, setCount] = useState(0);
	const [seconds, setSeconds] = useState(10);
	// const oneSecondDelay = 1000;

	const t = new Timer2(   () => {
		console.log(translate(seconds));

		if (seconds === 0) {
			t.clear();
			console.log('Game over!')
		} else {
			setSeconds(seconds => seconds - 1 );
		}
	}, 1000);


	t.resume();

	// useInterval(() => {
	// 	console.log(seconds);
	// 	setSeconds(seconds => seconds - 1);
	// }, 1000);






	return (
				<div style={{marginBottom: "25px"}}>
					You will be logged out automatically after { seconds } seconds.
				</div>
	);
};
