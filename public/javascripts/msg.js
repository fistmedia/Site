function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
 }

function checker(el){
	el=el.split(",");
	for(let i=0;i<el.length;i++){
		const e = document.getElementById(el[i]);
		if (e && !e.value)
			return false;
	}
	return true;
};

function rmsg(){
	document.getElementById("message").innerHTML = "";
}

function message(lang='',el='null'){
	rmsg();
	sleep(60).then(() => {
		let text='Language not specified';
		if (checker(el) == false){
			switch(lang){
				case 'en':
					text = "You must fill the required fields";break;
				case 'sr':
					text = "Morate popuniti neophodna polja";break;
			}

			document.getElementById("message").innerHTML = text;
			return false;
		}

		switch(lang){
			case 'en':
				text = "Your request has been successfully received!";break;
			case 'sr':
				text = "Vas zahtev je uspesno primljen!";break;
		}

		document.getElementById("message").innerHTML = text;
	});
}

let i;
function elvalue(value){
	let el = document.getElementById(value);
	if (el)
		value=el.value;
	else
		if (value=="isc"){
			//regex
			value=elvalue(String(i)+"sc");
			i=0;
		} else{
			el = document.getElementsByName(value);
			if (el)
				for(i = 0;i<el.length;i++)
					if (el[i].checked){
						value=el[i].value;break;
					}
		}
	
	return value;
}

function req(data='',event='',method='POST',url='',lang='',el='null'){
	if (lang != '')
		message(lang,el);
	if (checker(el) == false)
		return;

	if (event != '')
		event.preventDefault();

	let msg = data;
	if (data != '' && data.split("=")[0] == data){
		data = data.split(",");
		msg = data[0]+"="+elvalue(data[0]);
		for(let i=1;i<data.length;i++)
			msg+='&'+data[i]+"="+elvalue(data[i]);
	}
	
	//if (method == 'POST')
	//	Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	fetch(url, {
		method: method,
		headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
		body: msg
	})
	.then(() => {
		if (event != '')
			location.href = event.target.href;
	});
	//navigator.sendBeacon(url, msg);
}