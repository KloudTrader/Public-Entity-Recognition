const stockList = require("./ticker_lists/stockList").stockList;
const minRelevance = .3;
// set relevance to return matching phrases that are a certain percentage of  company description
// possible overal character length more relevant than word chunks
module.exports.longestPhrase = function(string) {
  
// this block finds  longest resultsutive phrase from a phrase that is contained by a company description 
	let results = [{match: "", symbol: "", description: "", relevance: 0}];
	let phrase = string.split(" ");

	for(var k = 0; k < stockList.length; k++) {
		let companyString = stockList[k].description;
		for (var i=0; i < phrase.length; i++) {
			let pat1 = new RegExp("\\b("+phrase[i]+")\\b");
			if (pat1.test(companyString) && phrase[i][0] === phrase[i][0].toUpperCase()) {
				var t = phrase[i];
				for (var j=i+1; j < phrase.length-1; j++) {
					let pat2 = new RegExp("\\b("+phrase[i] + " " + phrase[j]+")\\b");
					if (pat2.test(companyString)) {
						t += " " + phrase[j];
					} else {
						break;
					}
				}

				let relevance = (t.split(" ").length / stockList[k].description.split(" ").length);
				let matchObject = { match: t, symbol: stockList[k].symbol, description: stockList[k].description, relevance: relevance };

				if(results[0].match.length < t.length && (matchObject.match.length / companyString.length) > minRelevance) {
					results[0] = matchObject;
				} else if (results[0].match.length === t.length) {
					if ((results[0].match.split(" ").length / results[0].description.split(" ").length) < (matchObject.match.split(" ").length / matchObject.description.split(" ").length)) {
						results[0] = matchObject;
					}
				}
			}
		}  
	}
	return results;
};




