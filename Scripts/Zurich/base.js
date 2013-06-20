
var BASE = {
    init: function () {
        var self = this;
        this.cache();

        this.$settings.click(function () {
            self.toggleDropdown($(this));
            console.log('settings clicked');
        });



    },

    setPage: function (pPage) {
        var page = pPage;
        self.toggleNav('hide');
        $('#' + page).show(300);
        self.toggleVis('hide', self.$currentPage);
        $(this).parent().addClass('selected');
    },

    toggleDropdown: function (pTarget) {
        var target = pTarget;
        var menu = target.parent().find('.drop-down-menu');
        var tail = menu.find('.drop-down-menu-arrow');
        tail.css({ 'right': '5px', 'position': 'absolute' });

        menu.css('left', '-85px');

        if (menu.css('display') == 'none') {
            menu.stop().fadeIn(300);
        } else {
            menu.stop().fadeOut(300);
        }
    },

    toggleNav: function (pDirection) {
        var self = this;
        var leftNavWidth = self.$leftNav.width() + 5;
        if (pDirection == "show") {
            self.$leftNav.animate({ left: 0 }, 200);
        } else {
            self.$leftNav.animate({ left: -leftNavWidth }, 200);
        }
    },

    closeModalNoFade: function () {
        this.$modal.css({ 'top': 500 });
        this.$modalContainer.css({ 'opacity': 0, 'display': 'none' });
    },

    closeModal: function () {
        var self = this;
        this.$modalContainer.css({ 'display': 'block' }).animate({ opacity: 0 }, 300);
        this.$modal.animate({ 'top': 500, 'opacity': 1 }, 300, 'swing', function () { self.$modalContainer.css('display', 'none') });
    },

    toggleVis: function (pVis, pTarget, pDisplay) {
        var target = pTarget;
        var display = pDisplay;
        var vis = pVis;
        if (vis == 'show') {
            target.css('display', pDisplay);
        } else {
            target.css('display', 'none');
        }
    },

    cache: function () {
        this.$settings = $('#settings');
        this.$modalContainer = $('#modal-container');
        this.$modal = $('#modal');
        this.$yesBtn = $('.yes-btn');
        this.$noBtn = $('.no-btn');
        this.$mainNav = $('#main-nav');

    }
};

$(function () {
    BASE.init();
});