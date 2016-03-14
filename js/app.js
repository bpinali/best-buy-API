$(document).ready(function () {
    function getResults(query) {
        var url = 'https://api.bestbuy.com/v1/products((name=' + query + '*)&type!=BlackTie&customerTopRated=true)?sort=salesRankShortTerm.asc';
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
                    alert('No Results Found!');
                } else {
                    console.log(url);
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
                        output += '<div class="product-container">';
                        output += '<div class="title-wrapper"><h3 class="clamp-this">' + product.name + '</h3></div>';
                        output += '<img src="' + product.image + '">';
                        output += '<div class = "product-details">';
                        if (product.customerReviewCount != null) {
                            output += '<p class="review-num">' + product.customerReviewCount + ' Reviews</p>';
                        }
                        if (product.customerReviewAverage != null) {
                            output += '<p class="star-avg">' + product.customerReviewAverage + ' Stars</p>';
                        }

                        if ((product.salePrice < product.regularPrice) && (product.salePrice != null)) {
                            output += '<p class="reg-price strikethrough">$' + product.regularPrice + '</p>';
                            output += '<p class="sale-price highlight">Sale: $' + product.salePrice + '</p>';
                            var isSale = true;
                        } else {
                            output += '<p class="reg-price strong no-sale">$' + product.regularPrice + '</p>';
                            var isSale = false;
                        }
                        output += '</div>';
                        if (isSale == false) {
                            output += '<a href="' + product.addToCartUrl + '" class="add-to-cart">Add to Cart</a>';
                        } else {
                            output += '<a href="' + product.addToCartUrl + '" class="add-to-cart sale-button">Add to Cart</a>';
                        }
                        output += '</div>';
                        output += '</li>';
                    });
                } else {
                    output = "Unable to access products (see browser console for more information)";
                }
                $('.results ul').html(output);
                $('.clamp-this').each(function (index, element) {
                    console.log(element);
                    $clamp(element, {
                        clamp: 3
                    });
                });
                $(".loader").fadeOut("slow");
            }
        ).fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    }
    $('#search-button').on('click', function () {
        $(".loader").fadeIn("slow");
        getResults($("#search-box").val());
        $("#search-box").val('');

    });
    $(document).on('keypress', function (key) {
        //keyCode == 13 is the ENTER key
        if (key.keyCode == 13) {
            $(".loader").fadeIn("slow");
            getResults($("#search-box").val());
            $("#search-box").val('');
        }
    });

});
