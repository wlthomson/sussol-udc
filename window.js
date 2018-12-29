const codes = ['369844bf', '64d064bf', '32d064bf', '372ce4bf', 'bbfcf518'];

const url = 'https://api.universalcodes.msupply.org.nz/v1/items'

$(() => {
    "use strict"

    const textStatus = $('#status');
    const textCodes = $('#codes');

    let drugs = [];
    let promises = [];
    // call the API asynchronously in parallel
    codes.forEach((code) => {
	// show progress as each call is made
        textStatus.append(`<p>Requesting ${code}...</p>`);
        promises.push($.ajax(url + '?code=' + code)
		      .done((data) => {
			  // show progress as each response is processed
			  textStatus.append(`<p>Successfully retrieved ${code}.</p>`);
			  drugs.push(data.pop());
		      })
		      .fail(() => {
			  // handle errors
			  textStatus.append(`<p>Failed to retrieve ${code}.</p>`);
		      })
		     );
    });

    // update results only when all codes have been processed
    $.when.apply($, promises.map(p => p.catch(() => undefined)))
        .then(() => {
	    textStatus.append('<p>All codes processed.</p>');
	    // display the code alongside the drug name
            drugs.forEach((obj) => {
                textCodes.append(`<p>${obj.code}: ${obj.name}</p>`);
            });
        });
})
