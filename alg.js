var memo = [];
var pointPerPot = undefined;

const rec = function(leftMatl, leftPoint, leftPotCnt, decided) {
	if (leftPotCnt == 0) return decided;
	if (leftPoint == 0) return rec(leftMatl, pointPerPot, leftPotCnt - 1, decided);
	if (hasKeyDict(memo, [leftMatl, leftPoint])) return getDict(memo, [leftMatl, leftPoint]);
	// console.log("search", stringifyMatl(leftMatl), leftPoint, leftPotCnt, stringifyMatl(decided));
	for (let i in leftMatl) {
		if (leftMatl[i].c == 0) continue;
		if (leftPoint - leftMatl[i].p < 0) continue;
		let l = JSON.parse(JSON.stringify(leftMatl));
		l[i].c--;
		let d = JSON.parse(JSON.stringify(decided));
		d[leftPotCnt - 1][i].c++;
		let ret = rec(l, leftPoint - l[i].p, leftPotCnt, d);
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
	pointPerPot = pointPerPot_;
	let sumPoint = 0;
	for (let m of matl) sumPoint += m.p * m.c;
	let potCnt = Math.min(Math.floor(sumPoint / pointPerPot), 10);
	let m = JSON.parse(JSON.stringify(matl));
	for (let i in m) m[i].c = 0;
	let ans = false;
	while (!ans) {
		const decided = [...Array(potCnt)].map(() => JSON.parse(JSON.stringify(m)));
		// console.log(pointPerPot, potCnt, stringifyMatl(decided));
		ans = rec(matl, pointPerPot, potCnt, decided);
		potCnt--;
		memo = [];
	}
	// console.log(ans.length * pointPerPot, sumPoint);
	return ans;
}
