const hashSort = function(val) {
	// https://wordpress.ideacompo.com/?p=14965

	// json化して戻すことで、元データの書き換えを防ぐ
	var hash = JSON.parse(JSON.stringify(val));

	// 連想配列処理
	if (typeof hash === "object") {
		var flg = 0;
		for (var i in hash) {
			if (typeof hash[i] === "object") {
				hash[i] = JSON.stringify(hashSort(hash[i]));
			}
			flg++;
		}
		if (flg <= 1) {
			console.log(hash);
			return JSON.stringify(hash)}
		if (typeof hash.length === "undefined") {
			var keys = Object.keys(hash).sort();
			var newHash = {};
			for (var i=0; i<keys.length; i++) {
				newHash[keys[i]] = hash[keys[i]];
			}
			return newHash;
		}
		else {
			hash.sort(function(a,b) {
				if ( a < b ) return -1;
				if ( a > b ) return 1;
				return 0;
			});
			return hash;
		}
	}
	// その他タイプはそのまま返す
	else {
		return hash;
	}
}

const eqDict = function(a, b) {
	return JSON.stringify(hashSort(a)) == JSON.stringify(hashSort(b));
}

const hasKeyDict = function(dict, key) {
	return JSON.stringify(hashSort(key)) in dict;
}

const getDict = function(dict, key) {
	return dict[JSON.stringify(hashSort(key))];
}

const setDict = function(dict, key, val) {
	dict[JSON.stringify(hashSort(key))] = val;
}

const stringifyMatl = function(dict, key) {
	return JSON.stringify(dict.map(function(row){
		return row["c"];
	}));
}
