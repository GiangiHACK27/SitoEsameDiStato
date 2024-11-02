function setProp(p, n) {
	document.body.style.setProperty(p, n);
}

function getProp(name) {
	return document.body.style.getPropertyValue(name);
}

setProp("--num", 50);
setProp("--spd", 50);

goDown = setInterval(function() {
	if(getProp("--num") > 25){
		setProp("--num", parseInt(getProp("--num"))-1);	
		setProp("--spd", parseInt(getProp("--spd"))+1);	
	}  
	if(getProp("--num") == 25){
		setProp("--num", 25);
		setProp("--spd", 35);
	}
}, 200);


document.body.addEventListener("mousedown", function() {
	clearInterval(goDown);
	goUp = setInterval(function() {
		if(getProp("--num") != 88){
			setProp("--num", parseInt(getProp("--num"))+1);
			if(getProp("--spd") > 1 ){ setProp("--spd", parseInt(getProp("--spd"))-1);}
			if(getProp("--spd") == 1 ){ setProp("--spd", 2);}
		} else {
			// TRAVEL
			console.log('travel');
			document.querySelector('.ray').classList.add('on');
			document.querySelector('.ray').classList.toggle('future');
			setTimeout(function() {document.querySelector('.ray').classList.remove('on')}, 2500);
			clearInterval(goUp);
		}
	}, 100);
});


document.body.addEventListener("mouseup", function() {
	clearInterval(goUp)
	goDown = setInterval(function() {
		if(getProp("--num") > 25){
			setProp("--num", parseInt(getProp("--num"))-1);	
			setProp("--spd", parseInt(getProp("--spd"))+1);	
		}  
		if(getProp("--num") == 25){
			setProp("--num", 25);
			setProp("--spd", 35);
		}
	}, 200);
});