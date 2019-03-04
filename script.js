'use strict'

class Garland {

	constructor(parentEl) {
		this.props = {
			colors: [['pink', 'orange', 'lightgreen'], ['#FE2E64', '#01DF74', '#5882FA']],
			colorScheme: 0,
			step: 20,
			size: document.body.clientWidth * 0.6,
			frequency: 1000,
			form: 'circle',
			reverseDir: true,
			isOn: true
		}	

		if (this.props.isOn) {
			this.createGarland(parentEl);
			this.animate();
			(this.props.form === 'rect') ? this.renderRect() : this.renderCircle();
			this.showCurrentFrequency();
			this.showCurrentDirection();
		}
	}
	// greating garland
	createGarland(container) {
		const garland = document.createElement('div'),
			controls = document.createElement('div'),
			{size} = this.props;

		garland.classList.add('garland-container');
		garland.style.width = `${size}px`;
		garland.style.height = `${size/2}px`;
		garland.style.position = 'relative';

		controls.classList.add('control-panel');

		this.createGarlandEl(garland);
		this.createControlsEl(controls);

		container.append(garland, controls);
	}
	// greating bulbs
	createGarlandEl(container) {
		container.innerText = '';

		const {colors, step, size} = this.props,
			elSize = Math.floor(size / step);

		for(let i = 0; i < step; i++) {
			const bulb = document.createElement('div');
			bulb.classList.add('bulb');
			bulb.style.width = `${elSize}px`;
			bulb.style.height = `${elSize}px`;
			bulb.style.position = 'absolute';
			bulb.style.borderRadius = '50%';

			container.append(bulb);
		}
	}

	renderCircle() {
		const container = document.querySelector('.garland-container'),
			elements = container.childNodes,
	    	theta = [],
	    	{size: d} = this.props,
	    	frags = 360 / elements.length;

	    for (let i = 0; i <= elements.length; i++) {
	        theta.push((frags / 180) * i * Math.PI);
	    }
	   
	    elements.forEach((circle, i) => {

	        let posx = Math.round((d/2) * (Math.cos(theta[i]))),
        	posy = Math.round((d/2) * (Math.sin(theta[i])));

        circle.style.top =  `${parseInt(posy + (d/2))}px`;
        circle.style.left =  `${parseInt(posx + (d/2))}px`;	        
	    });
	}

	renderRect() {
		const container = document.querySelector('.garland-container'),
			elements = container.childNodes;

		const {size} = this.props,
			width = size,
			heigth = width / 2,
			half = elements.length / 2,
			quart = half / 2,
			quartOfQuart = quart / 2,
			largeSideElements = Math.floor(quart + quartOfQuart),
			smallSideElements = Math.ceil(quart - quartOfQuart),
			widthStep = width / largeSideElements,
			heigthStep = heigth / smallSideElements;

		elements.forEach( (el, i) => {

			if (i < largeSideElements) {
				el.style.top = '0';
				el.style.left = `${Math.ceil(i * widthStep)}px`
			}
			else if (i < largeSideElements + smallSideElements) {
				el.style.right = '0';
				el.style.top = `${Math.ceil((i - largeSideElements) * heigthStep)}px`
			}
			else if (i < (largeSideElements * 2) + smallSideElements) {
				el.style.bottom = '0';
				el.style.right = `${Math.ceil((i - (largeSideElements + smallSideElements)) * widthStep)}px`;
			}
			else {
				el.style.left = '0';
				el.style.bottom = `${Math.ceil((i - (largeSideElements * 2 + smallSideElements)) * heigthStep)}px`;
			}
		} )

	}


	animate() {
		const container = document.querySelector('.garland-container'),
			elements = container.childNodes;

		if (!this.props.reverseDir) {
			for (let i = 0; i < elements.length; i++) {
				if (i%3 === 0) {
					this.changeColor(elements[i], 2);
				}
				if (i%3 === 1) {
					this.changeColor(elements[i], 1);
				}
				if (i%3 === 2) {
					this.changeColor(elements[i], 0);
				}
			}
		}
		else {
			for (let i = 0; i < elements.length; i++) {
				if (i%3 === 0) {
					this.changeColor(elements[i], 0);
				}
				if (i%3 === 1) {
					this.changeColor(elements[i], 1);
				}
				if (i%3 === 2) {
					this.changeColor(elements[i], 2);
				}
			}
		}
	}

	changeColor(el, startIdx) {
		const {colors, frequency, colorScheme} = this.props,
			scheme = colors[colorScheme];
		
		let i = startIdx;
		setInterval( () => {

			el.style.background = scheme[i];
			i++;

			if (i > scheme.length - 1) {
				i = 0;
			}

		}, frequency);
	}

	// greating control panel
	createControlsEl(container) {
		container.innerText = '';

		const display = document.createElement('div'),
			tools = document.createElement('div'),
			buttonsSection = document.createElement('div'),
			powerButton  = document.createElement('button'),
			formButton = document.createElement('button'),
			directionButton = document.createElement('button'),
			frequency = document.createElement('div'),
			freqDec = document.createElement('button'),
			freqAdd = document.createElement('button'),
			colorScheme = document.createElement('select'),
			schemeOne = document.createElement('option'),
			schemeTwo = document.createElement('option'),
			// schemeThree = document.createElement('option'),
			getDataForm = document.createElement('form'),
			getNumLabel = document.createElement('label'),
			getNum = document.createElement('input'),
			numDescription = document.createElement('span');

		display.classList.add('control-panel__display');
		tools.classList.add('control-panel__managment-tools');
		buttonsSection.classList.add('control-panel__buttons');
		powerButton.classList.add('control-panel__power-button');
		formButton.classList.add('control-panel__form');
		directionButton.classList.add('control-panel__direction');
		frequency.classList.add('control-panel__frequency');
		freqDec.classList.add('control-panel__freq_dec');
		freqAdd.classList.add('control-panel__freq_add');
		colorScheme.classList.add('control-panel__color-scheme');
		getDataForm.classList.add('control-panel__get-data');
		getNum.classList.add('control-panel__get-number');

		powerButton.innerText = 'On/Off';
		formButton.innerText = 'Change form';
		directionButton.innerText = 'Change direction';
		freqDec.innerText = 'Frequency -';
		freqAdd.innerText = 'Frequency +';
		schemeOne.innerText = 'pink - orange - lightgreen';
		schemeTwo.innerText = 'red - green - blue';
		numDescription.innerText = 'Number from 18 to 60 with step 2';

		colorScheme.setAttribute('name', 'color-scheme');
		getNum.setAttribute('type', 'number');
		getNum.setAttribute('value', '20');
		getNum.setAttribute('min', '18');
		getNum.setAttribute('max', '60');
		getNum.setAttribute('step', '2');

		buttonsSection.append(powerButton, formButton, directionButton, frequency);
		colorScheme.append(schemeOne, schemeTwo);
		frequency.append(freqDec, freqAdd);
		getNumLabel.append(numDescription, getNum);
		getDataForm.append(getNumLabel, colorScheme);
		tools.append(buttonsSection, getDataForm);
		container.append(display, tools);

		this.createDisplay(display);

		powerButton.addEventListener('click', this.changePowerHandler.bind(this));
		formButton.addEventListener('click', this.changeFormHandler.bind(this));
		directionButton.addEventListener('click', this.changeDirectionHandler.bind(this));
		frequency.addEventListener('click', this.changeFrequencyHandler());
		colorScheme.addEventListener('change', this.changeColorSchemeHandler());
		getNum.addEventListener('input', this.changeNumsHandler());
	}

	createDisplay(display) {
		display.style.position = 'absolute';

		const showDirection = document.createElement('div'),
			directionAbout = document.createElement('span'),
			currentDirection = document.createElement('span'),
			showFrequency = document.createElement('frequency'),
			frequencyAbout = document.createElement('span'),
			currentFrequency = document.createElement('span');

		showDirection.classList.add('display__direction');
		showFrequency.classList.add('display__frequency');
		currentDirection.classList.add('display__direction_show');
		currentFrequency.classList.add('display__frequency_show');


		directionAbout.innerText = 'Current light direction: ';
		frequencyAbout.innerText = 'Frequency: ';

		showDirection.append(directionAbout, currentDirection);
		showFrequency.append(frequencyAbout, currentFrequency);
		display.append(showDirection, showFrequency);
	}

	showCurrentFrequency() {
		const currentFrequency = document.querySelector('.display__frequency_show');
		currentFrequency.innerText = `   ${this.props.frequency} ms`;
	}

	showCurrentDirection() {
		const currentDirection = document.querySelector('.display__direction_show');
		let dir;

		if (this.props.reverseDir)
			dir = '   <<<';
		else
			dir = '   >>>';
		currentDirection.innerText = dir;
	}

	changeFormHandler() {
		const garland = document.querySelector('.garland-container');

		if (this.props.form === 'rect') {
			this.renderCircle();
			this.props.form = 'circle';
		}
		else {
			this.createGarlandEl(garland);
			this.renderRect();
			this.animate();
			this.props.form = 'rect';
		}
	}

	changePowerHandler() {
		const garland = document.querySelector('.garland-container');

		if (this.props.isOn) {
			garland.innerText = '';
			this.props.isOn = false;
		}
		else {
			this.createGarlandEl(garland);
			this.animate();
			(this.props.form === 'rect') ? this.renderRect() : this.renderCircle();
			this.props.isOn = true;
		}
	}

	changeDirectionHandler() {
		const garland = document.querySelector('.garland-container');

		if (this.props.reverseDir) {
			this.props.reverseDir = false;
		}
		else{
			this.props.reverseDir = true;
		}

		this.createGarlandEl(garland);
		this.animate();
		(this.props.form === 'rect') ? this.renderRect() : this.renderCircle();
		this.showCurrentDirection();
	}

	changeFrequencyHandler() {
		const props = this.props;

		return (e) => {
			const {textContent: value} = e.target,
				garland = document.querySelector('.garland-container');
			
			if (value === 'Frequency -') {
				if (props.frequency <= 250)
					return; 
				props.frequency -= 250;
			}
			else {
				props.frequency += 250;
			}

			this.createGarlandEl(garland);
			this.animate();
			(this.props.form === 'rect') ? this.renderRect() : this.renderCircle();
			this.showCurrentFrequency();
		}
	}

	changeColorSchemeHandler() {

		return (e) => {
			const {target} = e,
				garland = document.querySelector('.garland-container');

			this.props.colorScheme = target.options.selectedIndex;
			this.createGarlandEl(garland);
			this.animate();
			(this.props.form === 'rect') ? this.renderRect() : this.renderCircle();
		}
	}

	changeNumsHandler() {

		return (e) => {
			const {value} = e.target,
				garland = document.querySelector('.garland-container');

			if (+value % 2 === 0 && (value >= 18 && value <= 60)) {
				this.props.step = +value;
				this.createGarlandEl(garland);
				this.animate();
				(this.props.form === 'rect') ? this.renderRect() : this.renderCircle();
			}
		}
	}
}

const parentEl = document.getElementById('garland');
const garlandEl = new Garland(parentEl);