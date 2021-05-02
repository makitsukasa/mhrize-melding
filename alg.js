var memo = [];
var pointPerPot = undefined;

const rec = function(leftMatl, leftPoint, leftPotCnt, decided) {
	if (leftPotCnt == 0) return decided;
	if (leftPoint == 0) return rec(leftMatl, pointPerPot, leftPotCnt - 1, decided);
	if (hasKeyDict(memo, [leftMatl, leftPoint])) return getDict(memo, [leftMatl, leftPoint]);
	// console.log("search", stringifyMatl(leftMatl), leftPoint, leftPotCnt, stringifyMatl(decided));
	for (i in leftMatl) {
		if (leftMatl[i].c == 0) continue;
		if (leftPoint - leftMatl[i].p < 0) continue;
		var l = JSON.parse(JSON.stringify(leftMatl));
		l[i].c--;
		var d = JSON.parse(JSON.stringify(decided));
		d[leftPotCnt - 1][i].c++;
		var ret = rec(l, leftPoint - l[i].p, leftPotCnt, d);
		if (!ret) continue;
		// console.log("setmem", stringifyMatl(leftMatl), leftPoint, ret);
		setDict(memo, [leftMatl, leftPoint], ret);
		return ret;
	}
	// console.log("setmem", stringifyMatl(leftMatl), leftPoint, false);
	setDict(memo, [leftMatl, leftPoint], false);
	return false;
}

const calc = function(matl, pointPerPot_ = 750) {
	var sumPoint = 0;
	pointPerPot = pointPerPot_;
	for (m of matl) {
		sumPoint += m.p * m.c;
	}
	var potCnt = Math.floor(sumPoint / pointPerPot);
	var m = JSON.parse(JSON.stringify(matl));
	for (i in m) m[i].c = 0;
	var ans = false;
	while (!ans) {
		var decided = [...Array(potCnt)].map(() => JSON.parse(JSON.stringify(m)));
		ans = rec(matl, pointPerPot, potCnt, decided);
		potCnt--;
	}
	console.log(sumPoint, ans.length * pointPerPot);
	return ans;
}
