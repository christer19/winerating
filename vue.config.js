module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/globalVariables.scss";`
            }
        }
    }
};
