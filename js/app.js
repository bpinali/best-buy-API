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
            active: true,
            preowned: false,
            dataType: 'jsonp'
        }).done(
            function (result) {
                if (result.products.length == 0) {
                    alert('No Results!');
                } else {
                    console.log(result);
                    console.log(result.products[0].image);
                    console.log(result.products[0].name);
                    console.log(result.products[0].regularPrice);
                    console.log(result.products[0].salePrice);
                    console.log(result.products[0].customerReviewCount);
                    console.log(result.products[0].customerReviewAverage);
                    console.log(result.products[0].customerTopRated);
                    console.log(result.products[0].addToCartUrl);

                }
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
        ).fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    }
    $('#search-button').on('click', function () {
        getResults($("#search-box").val());
    });
});
