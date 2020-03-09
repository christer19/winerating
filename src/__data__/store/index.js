import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import * as types from '../constants/mutation-types'
import { API_URLS } from '../constants/api-urls'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        wines: []
    },
    actions: {
        async getWines({commit}, params) {
            params.offset = (params.pageNumber ? (params.pageNumber - 1) : 0 ) * API_URLS.LIMIT;
            console.log('params', params)
            try {
                const res = await axios.get(API_URLS.RANDOM_WINES, {
                    method: 'GET',
                    params: {
                        ... params,
                        limit: API_URLS.LIMIT,
                        ordering: '-score'
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Token f7d51c21176bfb958a2ba1256425506275480d0f'
                    }
                });

                if(res){
                    const { results, count } = res.data;
                    console.log('results', results);
                    console.log('count', count);
                    commit(types.GET_WINE, results);
                    commit(types.GET_WINE_COUNT, count);
                }
            } catch (e) {
                console.log(e)
            }

        }
    },
    mutations: {
        [types.GET_WINE](state, results) {
            state.wines = results;
        },
        [types.GET_WINE_COUNT](state, count) {
            state.wineCount = count;
        }
    },
    getters: {
        getWines: (state) => state.wines,
        getPages: (state) => Math.ceil(state.wineCount / API_URLS.LIMIT),
    }
})
