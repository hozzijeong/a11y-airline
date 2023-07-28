import React, { useState, MouseEvent, useEffect } from 'react';
import './SpinButton.css';

const SpinButton: React.FC = () => {
	const [count, setCount] = useState<number>(0);
	const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

	const [message, setMessage] = useState('');

	const increment = () => {
		if (count === 3) {
			setMessage('최대 인원수는 3명까지만 가능합니다');
			return;
		}
		setCount((prevCount) => prevCount + 1);
	};

	const decrement = () => {
		if (count === 0) {
			setMessage('최소 인원이 0이하로 갈 수 없습니다.');
			return;
		}
		setCount((prevCount) => prevCount - 1);
	};

	useEffect(() => setMessage(`성인 ${count} 텍스트 숫자만 수정`), [count]);

	const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
		setIsTooltipVisible(!isTooltipVisible);
	};

	return (
		<section className='spinButtonContainer'>
			<div>
				<h1>승객 선택</h1>
				<div className='spinButtonLabel'>
					<label htmlFor='adult-tooltip'>성인</label>
					<div
						className='helpIcon'
						onMouseEnter={toggleTooltip}
						onMouseLeave={toggleTooltip}
						role='tooltip'
						aria-controls='adult-tooltip'
					>
						?
						{isTooltipVisible && (
							<span id='adult-tooltip' role='alert' className='tooltip'>
								최대 인원수는 3명까지 가능합니다
							</span>
						)}
					</div>
				</div>
				<button
					type='button'
					aria-label='성인 탑승자 한명 줄이기 버튼'
					onClick={decrement}
					className='spinButton'
				>
					-
				</button>
				<input
					type='text'
					role='spinbutton'
					readOnly
					className='spinButtonInput'
					value={count}
				/>
				<button
					type='button'
					aria-label='성인 탑승자 한명 늘리기 버튼'
					onClick={increment}
					className='spinButton'
				>
					+
				</button>
				<div
					role='alert'
					aria-live='assertive'
					aria-atomic={true}
					className='hidden'
				>
					{message}
				</div>
			</div>
		</section>
	);
};

export default SpinButton;
