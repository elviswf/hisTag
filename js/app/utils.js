define(function() {
	var utils = {};

	utils.sortByProperty = function(data, sort) {
		if (sort) {
			return data.sort(function(a, b) {
				if (a[sort] < b[sort])
					return -1;
				else if (a[sort] > b[sort])
					return 1;

				return 0;
			});
		}
		else {
			return data.sort();
		}
	};

	utils.sortByPropRev = function(data, sort) {
		if (sort) {
			return data.sort(function(a, b) {
				if (a[sort] > b[sort])
					return -1;
				if (a[sort] < b[sort])
					return 1;
				return 0;
			});
		}
		else {
			return data.sort().reverse();
		}
	};

	utils.countsOfProperty = function(data, property) {
		var valueCounts = {};

		for (var i = 0; i < data.length; i++) {
			var item = data[i];

			if (property) {
				var value = data[i][property];
			}
			else
				var value = data[i];

			if (valueCounts[value] == undefined)
				valueCounts[value] = 0;

			valueCounts[value] += 1;
		}

		var counts = [];

		for (var key in valueCounts) {
			if (valueCounts.hasOwnProperty(key)) {
				counts.push({
					"counter": key,
					"count": valueCounts[key]
				});
			}
		}

		return counts;
	};

	utils.topD = function(d){
		//takes an individual domain
		var reTopLevel = /^[^.]*\.(.*)$/;
		var topD = "";

		if (d!==undefined && d!==null){
			if (d === "google.com/maps") {
				topD = "com";
			} else if (d.match(reTopLevel)) {
				topD = d.replace(reTopLevel, "$1");
			}
		}

		return topD;
	}

	//special countsOfProperties for creating domain object
	utils.countPropDomains = function(data, property) {
		counts = utils.countsOfProperty(data, property);

		var countD = [];

		for (var i in counts) {
			var topD = utils.topD(counts[i].counter)
				countD.push({
					"domain": counts[i].counter,
					"count": counts[i].count,
					"topD": topD
				});
		}

		return countD;
	};

	utils.countUniqueProperty = function(data, property) {
		return utils.countsOfProperty(data, property).length;
	};

	utils.clearVisualization = function() {
		$("#loader").empty();
		$("#title").empty();
		$("#below_visual").empty();
		$("#visual_div").empty();
		$("#viz_selector").empty();
		$("#above_visual").empty();
		$("#cards").empty();
	};

	utils.lessDays = function(endDate, lessDays) {
		var date = new Date (endDate.getFullYear(),endDate.getMonth(),(endDate.getDate()-lessDays) );
		return date;
	}


	utils.filterByDates = function(data, startDate, endDate) {
		var filteredData = [];
		var start = 0;
		if (startDate != null)
			start = startDate.getTime();
		var end = Number.MAX_VALUE;
		if (endDate != null)
			end = endDate.getTime();
		for (var i = 0; i < data.length; i++) {
			if (data[i].date <= end && data[i].date >= start)
				filteredData.push(data[i]);
		}
		return filteredData;
	};

	utils.contains = function(a, obj) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] === obj) {
				return true;
			}
		}

		return false;
	};

	utils.objContains = function(obj, prop, value) {
		for (var i = 0; i < obj.length; i++) {
			if (obj[i][prop] === value) {
				return true;
			}
		}

		return false;
	};

	utils.classes = function(root) {
		//for webVisitViz to flatten heierarchy
		var classes = [];

		function recurse(name, node) {
			if (node.children) node.children.forEach(function(child) {
				recurse(node.name, child);
			});
			else
				classes.push({
					packageName: name,
					className: node.name,
					value: node.size
				});
		}

		recurse(null, root);

		return {
			children: classes
		};
	};

	utils.uniqueCount = function(data, key) {
		var countTerms = 1;
		var uniqueTerms = [];
		var term = key;

		for (i = 0; i < data.length; i++) {
			var thisTerm = data[i].term;
			var prevTerm = "";

			if (i > 0) {
				prevTerm = data[i - 1].term;
			}

			if (thisTerm === prevTerm) {
				countTerms++;
			} else {
				uniqueTerms.push({
					term: thisTerm,
					value: countTerms
				});
			}
		}
		return uniqueTerms;
	};

	//unique count function for search terms
	utils.uniqueCountST = function(data, key) {
		if (data.length == 0)
			return [];
		var countTerms = 1;
		var uniqueTerms = [];
		var term = key;

		for (i = 0; i < data.length; i++) {
			var thisTerm = data[i].term;
			var prevTerm = "";

			if (i > 0) {
				prevTerm = data[i - 1].term;

				if (thisTerm === prevTerm) {
					countTerms++;
				} else {
					uniqueTerms.push({
						term: prevTerm,
						count: countTerms
					});
					countTerms = 1;
				}
			}
		}
		uniqueTerms.push({
			term: data[data.length - 1].term,
			count: countTerms
		});
		return uniqueTerms;
	};

	utils.log10 = function(value) {
		return value / Math.LN10;
	};

	utils.countProperties = function(data, property) {
		//count a property value of an object, return array with unique property values (counter), and count of that value (count)
		var countArray = [];

		var sorted = utils.sortByProperty(data, property);

		var counter = 1;

		for (var i = 0; i < sorted.length; i++) {
			var dataItem = sorted[i];
			var countThing = sorted[i][property];

			var nextCountThing = "";

			if (i < sorted.length - 1) {
				nextCountThing = sorted[i + 1][property];
			}

			if (countThing === nextCountThing) {
				counter++;
			} else {
				countArray.push({
					counter: countThing,
					count: counter
				});
				counter = 1;
			}
		}

		return countArray;
	};

	utils.onlyIf = function(array, property, value, notValue) {
		//returns an array with only the property value specified, or only not that value (true/false)
		var data = [];
		for (i = 0; i < array.length; i++) {
			var dataItem = array[i];
			var prop = array[i][property];
			if (notValue === true) {
				if (prop === value) {
					//nothing
				} else {
					data.push(dataItem);
				}
			} else if (notValue === false) {
				if (prop === value) {
					data.push(dataItem);
				} else {
					//nothing
				}
			} else {
				console.log("Error in onlyIf function, should the value be absent - notValue === true, or present, notValue === false");
			}
		}
		return data;
	};

	utils.removeHistory = function(urls) {
		var urlsRemovedNow = 0;
		var visitsRemovedNow = 0;

		urls.forEach(function (a, b) {
			var visits = a.visitCount;
			var urls = a.url;
			console.log("removed: " + urls);

			chrome.history.deleteUrl({url: urls});
			if (a.url != b.url) {
				urlsRemovedNow++;
				visitsRemovedNow += visits;
			}
		});

		var d = new Date();
		var removalRecord = {timeRemoved: d.getTime(), numUrls: urlsRemovedNow, numVisits: visitsRemovedNow};
		storeRemovalData(removalRecord);

	};

	function storeRemovalData(data) {
		//add one object (data) to chrome local storage removal log, timeRemoved: , numUrls: , numVisits:
		var removalArray = [];
		var existing = utils.getStoredData("removals");
		if (existing != null) {
			existing.push({timeRemoved: data.timeRemoved, numUrls: data.numUrls, numVisits: data.numVisits});
			localStorage.setItem("removals", JSON.stringify(existing));
		}
		else {
			var first = [];
			first.push({timeRemoved: data.timeRemoved, numUrls: data.numUrls, numVisits: data.numVisits});
			localStorage.setItem("removals", JSON.stringify(first));
		}
	}

	utils.getStoredData = function(key) {
		return JSON.parse(localStorage.getItem(key));
	};

	utils.storeRemovalData = function(data) {
		//add one object (data) to chrome local storage removal log, timeRemoved: , numUrls: , numVisits:
		var removalArray = [];
		var existing = utils.getStoredData("removals");
		if (existing != null) {
			existing.push({
				timeRemoved: data.timeRemoved,
				numUrls: data.numUrls,
				numVisits: data.numVisits
			});
			localStorage.setItem("removals", JSON.stringify(existing));
		} else {
			var first = [];
			first.push({
				timeRemoved: data.timeRemoved,
				numUrls: data.numUrls,
				numVisits: data.numVisits
			});
			localStorage.setItem("removals", JSON.stringify(first));
		}
	};

	utils.findIndexByKeyValue = function(toSearch, key, valueToSearch) {
		for (var i = 0; i < toSearch.length; i++) {
			var item = toSearch[i][key];
			if (item === valueToSearch) {
				return i;
			}
		}
		return null;
	};

	utils.generateTerms = function(data) {
		var termArray = [];

		for (var i = 0; i < data.length; i++) {
			var dataItem = data[i];

			var terms = dataItem.tags;
			for (var j = 0; j < terms.length; j++) {
				termArray.push({term: terms[j]})
			}
		}

		return termArray;
	};

	utils.searchTermsToWords = function(uniqueTerms) {
		// stop words - From Jonathan Feinberg's cue.language
		//var stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|http|https|com)$/;
		var allSearchWords = [];

		for (i = 0; i < uniqueTerms.length; i++) {
			// TODO: Add hot fix here
			var thisTerm = uniqueTerms[i].term;
			var countWords = words.length;

			for (var j = 0; j < words.length; j++) {
				if (stopWords.test(words[j].toLowerCase()) === false && words[j] != "") {
					allSearchWords.push({
						word: words[j].toLowerCase(),
						termId: i + 1,
						wordsInTerm: countWords,
					}); 
				}
			}
		}
		return allSearchWords;
	};


	utils.lowHighNum = function(objArr, prop, low) {
		//for object properties in arrays that contain numbers, get the lowest number if low === true, highest if not
		//returns the index of the object
		var index = 0;
		if (low) {
			var first = Infinity;
			for (var i = 0; i < objArr.length; i++) {
				eval = objArr[i][prop];
				if (eval < first) {
					first = eval;
					index = i;
				}
			}
			return index;
		} else {
			var last = 0;
			for (var i = 0; i < objArr.length; i++) {
				eval = objArr[i][prop];
				if (eval > last) {
					last = eval;
					index = i;
				}
			}
			return index;
		}
	};


    utils.searchWordsFun = function(words) {
        searchWords = [];
        for (i = 0; i < words.length; i++) {
            searchWords.push({
                    text: words[i].term,
                    size: words[i].count
            });
        }
        return searchWords;
    };

    utils.storeStartEnd = function(data){
        var startEnd = [];
        var seStored = sessionStorage.getItem('se');

        var end = data[0].date;
        var start = data[0].date;
        for (i=1;i<data.length;i++) {
            if (data[i].date > end) {
                end = data[i].date;
            }
            if (data[i].date < start) {
                start = data[i].date;
            }
        }
        if (start != null){
            //var span = 24 * 3600;//(end - start) * 1;
            //startEnd.push({start: new Date(start - span), end: new Date(end + span)});
            end.setDate(end.getDate() + 1);
            startEnd.push({start: start, end: end});
            sessionStorage.setItem("se", JSON.stringify(startEnd));
        }

    };

    utils.getRecommends= function(tag, num){
        var datas = get_by_tag(tag);
        var tags = {};
        for (var i = 0; i < datas.length; i++) {
            for (var j = 0; j < data[i].tags.length; j++) {
                var tagName = data[i].tags[j];
                if (tagName != tag) {
                    if (tags.hasOwnProperty(tagName)) {
                        tags[tagName] = 1;
                    }
                    else
                        tags[tagName] += 1;
                }
            }
        }
        tagList = []
        for (var key in tags) {
            if (key) {
                tagList.push({term: key, count: tags[key]});
            }
        }
        return utils.sortByPropRev(tagList, 'count').slice(0, num);
    };

    return utils;
});
