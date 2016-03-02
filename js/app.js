$(document).ready(function () {
    function getResults(query) {
        var url = 'https://api.bestbuy.com/v1/products(name=' + query + '*)';
        console.log(query);
        $.ajax({
            method: 'GET',
            url: url,
            data: {
                format: 'json',
                apiKey: 't5reggzup769kevta2bdabkx',
                page: 1,
                pageSize: 36
            },
            cache: true, // necessary because our API rejects queries with unrecognized query parameters, such as the underscore injected when this isn't included
            preowned: false,
            active: true,
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
                    result.products.forEach(function (product) {
                        output += '<li>';
                        output += '<h3>' + product.name + '</h3>';
                        output += '<img src="' + product.image + '">';
                        if (product.customerReviewCount != null) {
                            output += '<p class="review-num">' + product.customerReviewCount + ' Reviews</p>';
                        }
                        if (product.customerReviewAverage != null) {
                            output += '<p class="star-avg">' + product.customerReviewAverage + ' Stars</p>';
                        }

                        if ((product.salePrice < product.regularPrice) && (product.salePrice != null)) {
                            output += '<p class="reg-price strikethrough">$' + product.regularPrice + '</p>';
                            output += '<p class="sale-price highlight">Sale: $' + product.salePrice + '</p>';
                        } else {
                            output += '<p class="reg-price strong">$' + product.regularPrice + '</p>';
                        }
                        output += '<a href="' + product.addToCartUrl + '" class="add-to-cart">Add to Cart</a>';
                        output += '</li>';
                    });
                } else {
                    output = "Unable to access products (see browser console for more information)";
                }
                $('.results ul').append(output);
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
