exports.handler = function( event, context ) {

    var stocks = [ 'AMAT', 'AAPL' ];

    var http = require( 'http' );

    var url = 'http://query.yahooapis.com/v1/public/yql';
    url += '?q=select * from yahoo.finance.quotes where symbol in (';
    url += '"' + stocks + '"';
    url += ')&env=store://datatables.org/alltableswithkeys&format=json';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );

            var text = 'Here is your stock quote for ';

            //for ( var i=0 ; i < stocks.length ; i++ ) {
            for ( var i=0 ; i < 1 ; i++ ) {               //quick hack as we want amat only
                var quote = json.query.results.quote[i];
                if ( quote.Name ) {
                    text += quote.Name + ' at ' + quote.Ask
                            + ' dollars, a change of '
                            + quote.Change + ' dollars. ';
                }
            }

            output( text, context );

        } );

    } );

};

function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "Stocks",
            content: text
        },
        shouldEndSession: true
    };

    context.succeed( { response: response } );

}
