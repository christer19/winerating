<template>
    <div>
        <div class="search-filters-container">
            <form @submit.prevent="submitForm" class="search-filters-form">
                <label for="color">
                    <select name="color" id="color" v-model="form.color">
                        <option value="" disabled selected>Color</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                        <option value="pink">Pink</option>
                    </select>
                </label>
                <label for="wine-type">
                    <select name="wine-type" id="wine-type" v-model="form.wineType">
                        <option value="" disabled selected>Type</option>
                        <option value="dry">Dry</option>
                        <option value="sweet">Sweet</option>
                    </select>
                </label>
                <label for="country">
                    <input name="country" id="country" v-model="form.country" placeholder="Country"/>
                </label>
                <ValidationProvider :rules="{between: {min: form.minVintage, max: form.maxVintage}}"
                                    v-slot="{ errors }">
                    <label for="vintage" style="position: relative">
                        <input name="vintage" id="vintage" v-model="form.vintage"
                               placeholder="Vintage" type="number"/>
                        <span class="error-text " v-if="errors[0]" style="position: absolute; bottom: -20px; left: 0">
                                Vintage are not available
                            </span>
                    </label>
                </ValidationProvider>
                <button type="submit" :disabled="isLoading">Show</button>
            </form>
        </div>
        <div class="container" v-if="!isLoading">
            <WineRatesTable :items="items"/>
            <nav>
                <paginate v-model="winePage"
                        :page-count="globalItemsCount"
                        class="pagination"
                        :prev-class="'page-item'"
                        :prev-link-class="'page-link'"
                        :next-class="'page-item'"
                        :next-link-class="'page-link'"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'"
                        :page-class="'page-item'"
                        :page-link-class="'page-link'"
                        :click-handler="clickCallback">
                </paginate>
            </nav>
        </div>
        <p v-if="isLoading">Loading...</p>
    </div>
</template>

<script>
    import WineRatesTable from '../components/WineRatesTable.vue'

    export default {
        name: "WineList",
        components: {
            WineRatesTable
        },
        data() {
            return {
                form: {
                    color: 'red',
                    wineType: '',
                    country: '',
                    vintage: '',
                    minVintage: 1863,
                    maxVintage: new Date().getFullYear(),
                },
                winePage: 1,
                isLoading: true
            };
        },
        computed: {
            items() {
                return this.$store.getters.getWines
            },
            globalItemsCount() {
                return this.$store.getters.getPages
            }
        },
        created: async function () {
            const { color } = this.form;
            await this.$store.dispatch('getWines', {color}).then(() => {
                this.isLoading = false;
            })
        },
        methods: {
            submitForm(pageNumber = 1) {
                const queryParams = {
                    color: this.form.color,
                    pageNumber: pageNumber,
                };
                if (this.form.wineType) {
                    queryParams["wine-type"] = this.form.wineType;
                }
                if (this.form.country) {
                    queryParams.country = this.form.country;
                }
                if (this.form.vintage) {
                    queryParams.vintage = this.form.vintage;
                }

                this.isLoading = true;
                this.$store.dispatch('getWines', queryParams).then(() => {
                    this.isLoading = false;
                })
            },
            clickCallback(pageNum) {
                this.winePage = pageNum;
                this.submitForm(this.winePage);
            }
        }
    }
</script>

<style lang="scss">
    .search-filters-container {
        text-align: center;
        background: $primaryColor;
        padding: 10px 0 20px 0;

        .search-filters-form {
            label select, input {
                background: $primaryLightColor;
                border: 1px solid $primaryColor;
                border-radius: 3px;
                color: $textColorOnColorBackground;
                padding: 5px 10px;
                margin: 0 5px 0 0;
                box-sizing: content-box;
                height: 30px;
            }

            label select:focus, select:hover, input:focus, input:hover, textarea:focus, textarea:hover {
                background: $primaryLightColorFocus;
                border: 1px solid $primaryColorFocus;
            }

            span.error-text {
                color: $textColorOnColorBackground;
                font-size: 0.7em;
                opacity: 0.8;
            }

            ::placeholder {
                color: $textColorOnColorBackground;
                opacity: 0.5;
            }

            button {
                box-sizing: content-box;
                border: none;
                height: 30px;
                padding: 5px 15px;
                border-radius: 3px;
                background: $primaryDarkColor;
                color: $textColorOnColorBackground;
            }

            button:focus, button:hover {
                background: $primaryDarkColorFocus;
            }
        }
    }

    nav ul.pagination {
        margin: 20px 0 40px 0;
        li.page-item.active {
            a.page-link {
                background-color: $primaryDarkColor;
                border-color: $primaryDarkColor;

            }
        }

    }
</style>
