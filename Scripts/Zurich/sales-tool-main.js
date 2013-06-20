var SALES_TOOL_MAIN = {

    currentPanel: 'customer-panel', previousPanel: 'customer-panel', previousButton: null,

    initPanels: function () {
        $('.panel-screen').each(function (index) {
            $(this).css('display', 'none');
        });
    },

    setPanel: function () {
        $('#' + this.previousPanel).css('display', 'none');
        $('#' + this.currentPanel).css('display', 'block');
    },

    resetTabs: function () {
        var self = this;
        if (this.previousButton != null) {
            var positionY;
            if ($.browser.msie) {
                positionY = this.previousButton.css('backgroundPositionY');
                this.previousButton.css('backgroundPosition', '0px ' + positionY);
                $('#product-container h2').text(positionY);
            } else {
                positionY = this.previousButton.css('backgroundPosition').split(" ")[1];
                this.previousButton.css('backgroundPosition', '0px ' + positionY);
            }
        }
    },

    init: function () {
        this.previousButton = null;
        this.initPanels();
        this.setPanel();
        var self = this;

        $('#info-nav li a').each(function (index) {
            $(this).click(function () {
                var panelId = $(this).parent().attr('id');

                self.resetTabs();

                self.previousButton = $(this);

                self.previousPanel = self.currentPanel;
                self.currentPanel = panelId.split('-')[0] + "-panel";
                self.setPanel();
                $('#info-panel').stop().animate({ right: 0 }, 200, function () { });

                var positionY;
                if ($.browser.msie) {
                    positionY = $(this).css('backgroundPositionY');
                    $(this).css('backgroundPosition', '-74px ' + positionY);
                    $('#product-container h2').text(positionY);
                } else {
                    positionY = $(this).css('backgroundPosition').split(" ")[1];
                    $(this).css('backgroundPosition', '-74px ' + positionY);
                }


                /* 				$('#product-container h2').text(positions); */
            });
        });

        $('#panel-close').click(function () {
            $('#info-panel').stop().animate({ right: -274 }, 200, function () { });
            self.resetTabs();
        });

        $('#panel-save').click(function () {
            $('#info-panel').stop().animate({ right: -274 }, 200, function () { });
            self.resetTabs();
        });
    }
};

$(function () { SALES_TOOL_MAIN.init(); });
