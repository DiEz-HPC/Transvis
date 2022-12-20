const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    /* STYLES */
    .addStyleEntry('appStyle', './public/theme/transvis/css/app.css')
    .addStyleEntry('navbarStyle', './public/theme/transvis/css/navbar.css')
    .addStyleEntry('aosStyle', './public/theme/transvis/css/dependency/aos.css')
    .addStyleEntry('footerStyle', './public/theme/transvis/css/footer.css')
    .addStyleEntry('contactStyle', './public/theme/transvis/css/contact.css')
    .addStyleEntry('equipeStyle', './public/theme/transvis/css/equipes.css')
    .addStyleEntry('valeursStyle', './public/theme/transvis/css/valeurs.css')
    .addStyleEntry('nosRealisationsStyle', './public/theme/transvis/css/nosRealisations.css')
    .addStyleEntry('recrutementStyle', './public/theme/transvis/css/recrutement.css')
    .addStyleEntry('blockTopStyle', './public/theme/transvis/css/blockTopWithImage.css')
    .addStyleEntry('homeHeaderStyle', './public/theme/transvis/css/homeHeader.css')
    .addStyleEntry('homeNosSavoirFaireStyle', './public/theme/transvis/css/homeNosSavoirFaire.css')
    .addStyleEntry('homeNosValeursStyle', './public/theme/transvis/css/homeNosValeurs.css')
    .addStyleEntry('splideStyle', './public/theme/transvis/css/dependency/splide.min.css')
    .addStyleEntry('logoSliderStyle', './public/theme/transvis/css/components/logoSlider.css')
    .addStyleEntry('recrutementsNumberStyle', './public/theme/transvis/css/components/recrutementsNumber.css')
    .addStyleEntry('bannerKeyStyle', './public/theme/transvis/css/bannerKeyFigures.css')
    .addStyleEntry('buttonFilterStyle', './public/theme/transvis/css/components/buttonFilter.css')

    .addStyleEntry('btnRedStyle', './public/theme/transvis/css/btnRed.css')
    .addStyleEntry('tagStyle', './public/theme/transvis/css/tag.css')
    .addStyleEntry('cardNosRealisationStyle', './public/theme/transvis/css/components/cardNosRealisations.css')
    .addStyleEntry('cardRecrutementStyle', './public/theme/transvis/css/cardRecrutement.css')
    .addStyleEntry('cardSFStyle', './public/theme/transvis/css/card-sf.css')
    .addStyleEntry('rgpdStyle', './public/theme/transvis/css/rgpd.css')

    .addStyleEntry('paginationStyle', './public/theme/transvis/css/components/pagination.css')
    .addStyleEntry('videoModalStyle', './public/theme/transvis/css/components/videoModal.css')
    /* SCRIPT */
    .addEntry('appJs', './public/theme/transvis/js/app.js')
    .addEntry('bootstrapJs', './public/theme/transvis/js/dependency/bootstrap.min.js')
    .addEntry('navbarJs', './public/theme/transvis/js/navbar.js')
    
    .addEntry('superpositionJs', './public/theme/transvis/js/superposition.js')

    .addEntry('timelineJs', './public/theme/transvis/js/timeline.js')
    .addEntry('keyFiguresJs', './public/theme/transvis/js/_keyFigures/keyAnimate.js')
    .addEntry('tagSeachJs', './public/theme/transvis/js/tagSearch.js')
    .addEntry('tagSeeMoreJs', './public/theme/transvis/js/tagSeeMore.js')
    .addEntry('cardNosRealisationsJs', './public/theme/transvis/js/cardNosRealisations.js')
    .addEntry('nosRealisationModalJs', './public/theme/transvis/js/nosRealisationModal.js')
    .addEntry('logoSliderJs', './public/theme/transvis/js/logoSlider.js')

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
   // .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();