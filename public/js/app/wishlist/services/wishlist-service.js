/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2014 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */

'use strict';

angular.module('ds.wishlist')
    .factory('WishlistSvc', ['WishlistREST', '$q', function (WishlistREST, $q) {

        function createWishlist(singleWishlist) {
            var deferredWishlist = $q.defer();
            WishlistREST.Wishlists.all('wishlists').post(singleWishlist).then(function () {
                deferredWishlist.resolve();
            }, function () {
                deferredWishlist.reject();
            });
            return deferredWishlist.promise;
        }

        function addProductToWishlist(wishlistId, wishlistItem) {
            var deferredWishlist = $q.defer();
            WishlistREST.Wishlists.one('wishlists', wishlistId).all('wishlistItems').post(wishlistItem).then(function () {
                deferredWishlist.resolve();
            }, function () {
                deferredWishlist.reject();
            });
            return deferredWishlist.promise;
        }

        function queryWishlistById(parms) {
            return WishlistREST.Wishlists.one('wishlists', parms.wishlistId).get();
        }

        function totalPrice(wishlistId) {
            var deferredWishlist = $q.defer();
            WishlistREST.Wishlists.one('wishlists', wishlistId).customGET('wishlistItems').then(function (response) {
                deferredWishlist.resolve({ totalPrice: response.totalPrice });
            }, function () {
                deferredWishlist.reject();
            });
            return deferredWishlist.promise;
        }

        return {
          createWishlist: createWishlist,
          addProductToWishlist: addProductToWishlist,
          query: queryWishlistById,
          totalPrice: totalPrice,
        };
    }]);
