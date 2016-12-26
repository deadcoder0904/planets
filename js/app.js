document.addEventListener('DOMContentLoaded',function() {
	const PLANETS = ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','pluto','moon','sun'];
	const ul = document.querySelector('.planets');

	const setData = (planet,checked) => {
		const name = planet.toLowerCase();
		let index = false;
		localStorageData.map(p => {
			if(p.name === name)
				index = true
		});
		if (!index) {
			const obj = {
				name,
				checked
			};
			localStorageData.push(obj);
			localStorage.setItem('planets',JSON.stringify(localStorageData));
		}
	};

	const getData = () => localStorage.getItem('planets');

	const localStorageData = JSON.parse(getData()) || [];

	const makeHTML5validId = a => {
		const id = '_' + a.toLowerCase().replace(' ','_');
		return id;
	};

	const addNewPlanet = (planet,checked) => {
		const li = document.createElement('li');
		const text =
		 `<input type="checkbox" id="${makeHTML5validId(planet)}" ${checked ? 'checked' : ''} />
			 <label for="${makeHTML5validId(planet)}"><span>${planet.toUpperCase()}</span></label>
		 `;
		 li.innerHTML = text;
		 ul.appendChild(li);
	 	 setData(planet,checked);
	};

	if(localStorageData.length === 0)
		PLANETS.map(planet => {
			addNewPlanet(planet,false);
		});
	else {
		localStorageData.map(p => {
			addNewPlanet(p.name,p.checked);
		});
	}

	document.getElementById('planet_form').addEventListener('submit', e => {
		e.preventDefault();
		const new_planet = document.getElementById('new_planet').value;
		if (new_planet.trim().length === 0)
			return;
		document.getElementById('new_planet').value = '';
		addNewPlanet(new_planet,false);
	});

	ul.addEventListener('click', e => {
		if(!e.target.matches('input') && !e.target.matches('label'))
				return;
		const name = e.target.id.replace('_',' ').trim() || e.target.for.replace('_',' ').trim();
		const newData = [];
			localStorageData.map(planet => {
				if(planet.name === name)
						planet.checked = !planet.checked;
				newData.push(planet);
			});
		localStorage.setItem('planets',JSON.stringify(newData));
	});
});
