$(document).ready(function () {
    function getResults(query) {
        var url = 'https://api.bestbuy.com/v1/products(name=' + query + '*)';
        console.log(query);
        $.ajax({
            method: 'GET',
            url: url,
            data: {
                format: 'json',
                apiKey: 't5reggzup769kevta2bdabkx'
            },
            cache: true, // necessary because our API rejects queries with unrecognized query parameters, such as the underscore injected when this isn't included
            dataType: 'jsonp'
        }).always(
            function (result) {
                console.log(result.products[0].addToCartUrl);
                var output = "";
                if (!result.error && result.products) {
                    output = "Products:\n";
                    result.products.forEach(function (product) {
                        output += "\t* " + product.name + "\n";
                    });
                } else {
                    output = "Unable to access products (see browser console for more information)";
                }
                $('.results').append(output);
            }
        );
    }
    $('#search-button').on('click', function () {
        getResults($("#search-box").val());
    });
});
