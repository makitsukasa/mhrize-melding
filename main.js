elem100 = document.getElementById("matl100");
elem80 = document.getElementById("matl80");
elem75 = document.getElementById("matl75");
elem65 = document.getElementById("matl65");
elemResult = document.getElementById("result");

const format = function(matl) {
	let ret = "";
	for (m of matl) ret += stringifyMatl(m) + "\n";
	return ret;
}

const update = function() {
	const pointPerPot = 750;
	const maxPotCnt = 10;
	const matl = [
		{p: 100, c: elem100.value || 0},
		{p: 80, c: elem80.value || 0},
		{p: 75, c: elem75.value || 0},
		{p: 65, c: elem65.value || 0},
	];
	let sumPoint = 0;
	for (m of matl) sumPoint += m.p * m.c;
	const result = calc(matl, pointPerPot, maxPotCnt);
	const usedPoint = (result.length * pointPerPot);

	elemResult.value = `${result.length} times (${sumPoint},${usedPoint},${sumPoint - usedPoint})\n`;
	elemResult.value += format(result);
}

elem100.addEventListener("change", update);
elem80.addEventListener("change", update);
elem75.addEventListener("change", update);
elem65.addEventListener("change", update);
