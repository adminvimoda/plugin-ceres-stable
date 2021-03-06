(function($)
{

    var OWL_CONFIG = {
        SINGLE : {
            singleItem           : true,
            slideSpeed           : 1000,
            navigation           : true,
            navigationText       : [
                "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
            ],
            pagination           : false,
            responsiveRefreshRate: 200
        }
    };

    Vue.component("image-carousel", {

        props: [
            "imageUrls",
            "itemUrl",
            "template"
        ],

        data: function()
        {
            return {
                currentVariation: {},
                currentItem     : 0
            };
        },

        created: function()
        {
            this.$options.template = this.template;
        },

        ready: function()
        {
            // (re-)init big image carousel
            this.initCarousel(this.$els.single, OWL_CONFIG.SINGLE);
        },

        methods: {
            /**
             * Initialize jquery carousel plugin
             * @param {HTMLElement} el      The root element to initialize carousel on
             * @param {*}           config  The carousel configuration (@see http://owlgraphic.com/owlcarousel/index.html#how-to)
             */
            initCarousel: function(el, config)
            {
                var self = this;
                var owl = $(el).data("owlCarousel");

                config.afterAction = function()
                {
                    // 'this' points to owl carousel instance
                    self.currentItem = this.currentItem;
                };

                if (owl)
                {
                    owl.destroy();
                }

                // wait until markup is re-rendered with new data.
                Vue.nextTick(function()
                {
                    $(el).owlCarousel(config);
                });
            },

            /**
             * Navigate to carousel element
             * @param {number} index    The index of the element to go to.
             */
            goTo: function(index)
            {
                var owl = $(this.$els.single).data("owlCarousel");

                if (owl)
                {
                    owl.goTo(index);
                }
            }
        }
    });

})(jQuery);
