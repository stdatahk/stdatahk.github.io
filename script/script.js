function gradient(startColor, endColor, steps) {
	var start = {
		'Hex'   : startColor,
		'R'     : parseInt(startColor.slice(1,3), 16),
		'G'     : parseInt(startColor.slice(3,5), 16),
		'B'     : parseInt(startColor.slice(5,7), 16)
	}
	var end = {
		'Hex'   : endColor,
		'R'     : parseInt(endColor.slice(1,3), 16),
		'G'     : parseInt(endColor.slice(3,5), 16),
		'B'     : parseInt(endColor.slice(5,7), 16)
	}
	diffR = end['R'] - start['R'];
	diffG = end['G'] - start['G'];
	diffB = end['B'] - start['B'];

	stepsHex  = new Array();
	stepsR    = new Array();
	stepsG    = new Array();
	stepsB    = new Array();

	for(var i = 0; i <= steps; i++) {
		stepsR[i] = start['R'] + ((diffR / steps) * i);
		stepsG[i] = start['G'] + ((diffG / steps) * i);
		stepsB[i] = start['B'] + ((diffB / steps) * i);
		stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
	}
	return stepsHex;
}

//usage: fadeTexTColor("<comma_separated_html_element_id_list>")
function fadeTextColor(idList) {
	var fromColor = '#107B9F'; //deep green
	var toColor   = '#28C1BF'; //pale green

	var aryIds = idList.trim().split(',');

	for(var i=0; i < aryIds.length; i++) {
		var label = aryIds[i];
		if(document.getElementById(label) != null) {
			var theLink = document.getElementById(label);
			var txt = theLink.innerHTML.trim();
			var txt2 = txt;

			var imgTag = "";
			if(txt.indexOf('<')>=0 && txt.indexOf('>')>=0) {
				//strip off image tag
				txt2 = txt.substring(txt.indexOf('>')+1);
				imgTag = txt.substring(0, txt.indexOf('>')+1);
			}
			



			txt2 = txt2.split(' ').join(''); //no space

			var aryColor = gradient(fromColor, toColor, txt2.length);
			var rst = "";
			var idx = 0;
			
			
			if(imgTag == '') {
				for(var ch=0; ch < txt.length; ch++) {
					var thisChar = txt.charAt(ch);
					if(thisChar == ' ') {
						rst += ' ';
					}
					else {
						rst += '<font color="'+ aryColor[idx] +'">'+ thisChar +'</font>';
						idx ++;
					}
				}
			}
			else {
				for(var ch=0; ch < txt2.length; ch++) {
					var thisChar = txt2.charAt(ch);
					rst += '<font color="'+ aryColor[idx] +'">'+ thisChar +'</font>';
					idx ++;
				}
			}
			theLink.innerHTML = imgTag + rst;
		}
	}
}

