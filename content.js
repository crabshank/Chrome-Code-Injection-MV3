var selec='';
var fcn=``;
var addrs=[];
var slctrs=[];
var fcns=[];

function removeEls(d, arr) {
    return arr.filter((a)=>{return a!==d});
}

function findIndexTotalInsens(string, substring, index) {
    string = string.toLocaleLowerCase();
    substring = substring.toLocaleLowerCase();
    for (let i = 0; i < string.length ; i++) {
        if ((string.includes(substring, i)) && (!(string.includes(substring, i + 1)))) {
            index.push(i);
            break;
        }
    }
    return index;
}

function blacklistMatch(array, t) {
    var found = false;
	var blSite='';
	var blSel='';
	var blFcn=``;
    if (!((array.length == 1 && array[0] == "") || (array.length == 0))) {
        ts = t.toLocaleLowerCase();
        for (var i = 0; i < array.length; i++) {
            let spl = array[i].split('*');
            spl = removeEls("", spl);

            var spl_mt = [];
            for (let k = 0; k < spl.length; k++) {
                var spl_m = [];
                findIndexTotalInsens(ts, spl[k], spl_m);

                spl_mt.push(spl_m);


            }

            found = true;

            if ((spl_mt.length == 1) && (typeof spl_mt[0][0] === "undefined")) {
                found = false;
            } else if (!((spl_mt.length == 1) && (typeof spl_mt[0][0] !== "undefined"))) {

                for (let m = 0; m < spl_mt.length - 1; m++) {

                    if ((typeof spl_mt[m][0] === "undefined") || (typeof spl_mt[m + 1][0] === "undefined")) {
                        found = false;
                        m = spl_mt.length - 2; //EARLY TERMINATE
                    } else if (!(spl_mt[m + 1][0] > spl_mt[m][0])) {
                        found = false;
                    }
                }

            }
            if(found){
            		blSite = array[i];
           		 blSel = slctrs[i];
           		 blFcn = fcns[i];
          		  i = array.length - 1;
            }
        }
    }
    //console.log(found);
    return [found,blSite,blSel,blFcn];

}

var isCurrentSiteBlacklisted = function()
{
		return blacklistMatch(addrs, window.location.href);
};

function restore_options()
{
	if(typeof chrome.storage==='undefined'){
		restore_options();
	}else{
	chrome.storage.local.get(null, function(items)
	{
		if (Object.keys(items).length != 0)
		{
			//console.log(items);
			

		if(!!items.addrs_list && typeof  items.addrs_list!=='undefined'){
			addrs=JSON.parse(items.addrs_list);
		}		
		
		if(!!items.slc_list && typeof  items.slc_list!=='undefined'){
			slctrs=JSON.parse(items.slc_list);
		}

		if(!!items.fcn_list && typeof  items.fcn_list!=='undefined'){
			fcns=JSON.parse(items.fcn_list);
		}

		var isBl=isCurrentSiteBlacklisted();
			if(isBl[0]){
				fcn=(typeof isBl[3]!=='undefined')?isBl[3]:``;
				if(fcn!==``){
                    setTimeout('(()=>{'+fcn+'})();',0);
				}
				selec=(typeof isBl[2]!=='undefined')?isBl[2]:``;
				if(selec!==``){
                    let stylFunc=`document.head.insertAdjacentHTML('afterbegin',\`<STYLE>${selec}</STYLE>\`)`;
					setTimeout('(()=>{'+stylFunc+'})();',0);
				}
			}
		}
		else
		{
			save_options();
		}
	});
	}
}

function save_options()
{
		chrome.storage.local.clear(function() {
	chrome.storage.local.set(
	{
		addrs_list: '[]',
		slc_list: '[]',
		fcn_list: '[]'
	}, function()
	{
		console.log('Default options saved.');
		restore_options();
	});
		});

}

restore_options();