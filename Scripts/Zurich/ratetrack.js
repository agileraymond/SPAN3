var RATETRACK = {

    currentPanel: 'customer-panel', previousPanel: 'customer-panel', previousButton: null, screenSpeed: 400, panelSpeed: 200,

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
            } else {
                positionY = this.previousButton.css('backgroundPosition').split(" ")[1];
                this.previousButton.css('backgroundPosition', '0px ' + positionY);
            }
        }
    },

    init: function () {
        var self = this;
        this.cache();
        this.previousButton = null;

        /*
self.$rates.click(function (e) {
            e.preventDefault();
            var $rate = $(this);

            
            var $product = $rate.closest('.product');
            var $rateTable = $rate.closest('.rates-table');
            var $productHeader = $product.find('.product-header');
            
            var $color = $productHeader.css('color');
            var productName = $productHeader.text();
            var quoteClass = 'saved-quote-' + $product.index();
            var quote = '<div class="saved-quote"><h2>VSC</h2><div><span class="amount"><span class="dollar-sign">$</span>1,139</span><a href="#" class="remove-quote-btn">Remove</a></div></div>';

            var selectedRate = $rateTable.find('.rate-selected a');
            selectedRate.css({ 'background-color': 'transparent', 'color': '#3d3d42' });
            selectedRate.find('.dollar-sign').css({ 'color': '#3d3d42' });

            if ($rate.parent().hasClass('rate-selected')) {

                var index = $product.index();
                var quoteToRemove = self.$savedQuotesContainer.find('.saved-quote-' + index);
                $(quoteToRemove).find('.remove-quote-btn').css('display', 'none');
                $(quoteToRemove).hide(200, function (e) {
                    $(quoteToRemove).remove();
                });
                $rate.addClass('rate-hover');
            } else {
                $rate.parent().addClass('rate-selected');
                $rate.css({ 'background-color': $color, 'background-image': 'none', 'color': '#fff' });
                $rate.find('.dollar-sign').css({ 'color': '#fff' });
                $rate.removeClass('rate-hover');
            }

            selectedRate.parent().removeClass('rate-selected');

            if ($('.' + quoteClass).length > 0) {
                $('.' + quoteClass).find('.amount').html($(this).html());
            } else {
                var savedQuote = self.$savedQuotesContainer.append(quote);
                var quoteToAdd = self.$savedQuotesContainer.find('.saved-quote:last-child');

                quoteToAdd.find('h2').text(productName);
                quoteToAdd.addClass(quoteClass);
                quoteToAdd.find('.amount').html($(this).html());
                quoteToAdd.find('h2').css('background-color', $color);
                quoteToAdd.find('.remove-quote-btn').css('display', 'none');
                quoteToAdd.show(200, function (e) {
                    $(this).find('.remove-quote-btn').css('display', 'inline-block');
                });
            }
        });
*/

        self.$rates.hover(function (e) {

            if ($(this).parent().hasClass('rate-selected') == false) {
                $(this).addClass('rate-hover');
            }
            console.log($(this).hasClass('rate-hover'));
        }, function (e) {
            $(this).removeClass('rate-hover');
        });

        this.$savedQuotesContainer.on('click', '.remove-quote-btn', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var index = $(this).closest('.saved-quote').attr('class').split(' ')[2].split('-')[2];

            var selectedRate = self.$products.find('.product').eq(index).find('.rate-selected');
            selectedRate.removeClass('rate-selected');
            selectedRate.find('a').css({ 'background-color': 'transparent', 'color': '#3d3d42' });
            selectedRate.find('.dollar-sign').css({ 'color': '#3d3d42' });

            $(this).css('display', 'none');
            
            var $quoteToRemove = $(this).closest('.saved-quote');

            $quoteToRemove.hide(200, function (e) {
                $(this).remove();
                                
                if($('.saved-quotes-container').children().length <= 2) {
	            	   $('.no-quotes').css('display', 'block');
                } else {
	                
                }
				
            });
        });

        this.$dealjacket.css({ 'left': $(window).width(), 'display': 'none' });

        this.$dealjacketBtn.click(function () {
            var offset = $(window).width();
            self.$quote.stop().animate({ left: -offset }, self.screenSpeed, function () { self.$quote.css('display', 'none'); $('body').css('overflow-x', 'auto'); });
            self.$dealjacket.css({ 'display': 'block', 'left': $(window).width() }).stop().animate({ left: 0 }, self.screenSpeed, function () { });
            $('body').css('overflow-x', 'hidden');
        });

        this.$quoteBtn.click(function () {
            var offset = $(window).width();
            self.$quote.stop().css('display', 'block').animate({ left: 0 }, self.screenSpeed, function () { });
            self.$dealjacket.stop().animate({ left: $(window).width() }, self.screenSpeed, function () { self.$dealjacket.css('display', 'none'); $('body').css('overflow-x', 'auto'); });
            $('body').css('overflow-x', 'hidden');
        });

        self.$collapseExpandBtn.click(function (e) {
            e.preventDefault();
            var container = $(this).parent().parent().parent();
            container.find('.product-section').slideToggle(200);
            $(this).toggleClass('product-closed');
        });

        /*self.$ratesTwoCol.hover(function () {
            var tbl = $(this).parent().parent().find('.y-label').css({ 'background-color': '#6B6B78', 'color': '#fff' });
            var td = $(this).parent();
            var r1 = self.$ratesTable.find('tr').eq(0).find('th').eq(td.index()).css({ 'background-color': '#6B6B78', 'color': '#fff' });
        }, function () {
            var tbl = $(this).parent().parent().find('.y-label').css({ 'background-color': 'transparent', 'color': '#0F0F0F' });
            var td = $(this).parent();
            var r1 = self.$ratesTable.find('tr').eq(0).find('th').eq(td.index()).css({ 'background-color': 'transparent', 'color': '#0F0F0F' });
        });*/

        this.$editBtn.click(function (e) {
            /* 			self.$infoDropDown.slideToggle(200); */
            e.preventDefault();
            if (self.$page.css('top') <= '10px') {
                $(this).text('Close');
                $(this).addClass('info-close');
                self.$page.animate({ top: '+=230' }, 200, function (e) { });
                self.$editBtn.animate({ top: '+=231' }, 200, function (e) { });
                self.$infoDropDown.animate({ top: 18 }, 200, function (e) { });
            } else {
                $(this).text('Additional Info');
                $(this).removeClass('info-close');
                self.$page.animate({ top: self.$productsInitTop }, 200, function (e) { });
                self.$infoDropDown.animate({ top: '-=230' }, 200, function (e) { });
                self.$editBtn.animate({ top: '-=231' }, 200, function (e) { });
            }


        });

        this.$infoVehicle.click(function (e) {
            self.$infoNavSelected.removeClass('selected');
            self.$infoNavSelected = $(this).parent();
            $(this).parent().addClass('selected');

            self.toggleInfoSection($(this));

        });

        this.$infoCustomer.click(function (e) {
            self.$infoNavSelected.removeClass('selected');
            self.$infoNavSelected = $(this).parent();
            $(this).parent().addClass('selected');

            self.toggleInfoSection($(this));
        });

        this.$infoDeal.click(function (e) {
            self.$infoNavSelected.removeClass('selected');
            self.$infoNavSelected = $(this).parent();
            $(this).parent().addClass('selected');

            self.toggleInfoSection($(this));
        });

        this.$infoBarLinks.click(function (e) {
            if (self.$page.css('top') <= '10px') {
                self.$page.animate({ top: '+=230' }, 200, function (e) { });
                self.$infoDropDown.animate({ top: 18 }, 200, function (e) { });
                self.$editBtn.animate({ top: '+=231' }, 200, function (e) { });
            }

            self.$editBtn.addClass('info-close');
            var id = $(this).attr('id');

            if (id == 'info-bar-vin' || id == 'info-bar-date' || id == 'info-bar-mileage') {
                self.$infoVehicle.click();
            } else if (id == 'info-bar-customer') {
                self.$infoCustomer.click();
            }
        });

        this.$saveQuotesBtn.click(function (e) {
            e.preventDefault();
            self.$savedQuotesPopup.stop().fadeIn(200).delay(3000).fadeOut(300);
        });

		// Toggles dropdown inputs
        //this.setState('open');

        $("#txtFirstName").keyup(function () {
            $('#info-bar-customer').text($(this).val() + ' ' + $('#txtMiddleName').val() + ' ' + $('#txtLastName').val()).parent().removeClass('empty');

        });

        $("#txtMiddleName").keyup(function () {
            $('#info-bar-customer').text($('#txtFirstName').val() + ' ' + $(this).val() + ' ' + $('#txtLastName').val()).parent().removeClass('empty');
        });

        $("#txtLastName").keyup(function () {
            $('#info-bar-customer').text($('#txtFirstName').val() + ' ' + $('#txtMiddleName').val() + ' ' + $(this).val()).parent().removeClass('empty');
        });

        $("#txtDealNumber").keyup(function () {
            $('#info-bar-deal').text($(this).val()).parent().removeClass('empty');
        });

        $("#txtStockNumber").keyup(function () {
            $('#info-bar-stock').text($(this).val()).parent().removeClass('empty');
        });

        $("#txtOdometer").keyup(function () {
            $('#info-bar-mileage').text($(this).val()).parent().removeClass('empty');
        });

        $("#selYears").change(function () {
            $('#info-bar-year').text($(this).val()).parent().removeClass('empty');
        });

        $("#selMakes").change(function () {
            var vehicleMake = $("#selMakes :selected").text();
            $('#info-bar-make').text(vehicleMake).parent().removeClass('empty');
        });

        $("#selModels").change(function () {
            var vehicleModel = $("#selModels :selected").text();
            $('#info-bar-model').text(vehicleModel).parent().removeClass('empty');
        });
    },

    removeSavedQuote: function (pTarget) {
        var target = pTarget;
    },

    toggleInfoSection: function (pBtn) {
        var infoSection = pBtn.parent().attr('class').split('-')[1].split(' ')[0];
        this.$currentInfoSection.css('display', 'none');
        var newSection = $('.' + infoSection + '-info')
        this.$currentInfoSection = newSection;
        newSection.css('display', 'block');
    },



    setState: function (pType) {
        this.$page.animate({ top: '+=230' }, 0, function (e) { });
        this.$infoDropDown.animate({ top: 18 }, 0, function (e) { });
        this.$editBtn.animate({ top: '+=231' }, 0, function (e) { });
    },

    cache: function () {
        this.$dealjacket = $('#dealjacket');
        this.$quote = $('#quote');
        this.$quoteBtn = $('#quote-btn');
        this.$dealjacketBtn = $('#dealjacket-btn');
        this.$infoPanelContainer = $('#info-panel-container');
        this.$collapseExpandBtn = $('.product-header');
        this.$panelClose = $('#panel-close');
        this.$panelSave = $('#panel-save');
        this.$infoPanel = $('#info-panel');
        this.$ratesTwoCol = $('#vsc .right .rates-table tr td a');
        this.$rates = $('.rates-table tr td a');
        this.$ratesTable = $('.rates-table');
        this.$productAlt = $('.product:even');
        this.$editBtn = $('.edit-btn');
        this.$infoDropDown = $('.info-drop-down');
        this.$page = $('.page');
        this.$infoCustomer = $('.info-customer a');
        this.$infoVehicle = $('.info-vehicle a');
        this.$infoDeal = $('.info-deal a');
        this.$infoNavSelected = $('.info-drop-down-nav .selected');
        this.$currentInfoSection = $('.vehicle-info');
        this.$savedQuotesContainer = $('.saved-quotes-container');
        this.$products = $('.products');
        this.$productsInitTop = this.$products.css('top');
        this.$infoBarLinks = $('.info-summary a');
        this.$saveQuotesBtn = $('.save-quotes-btn');
        this.$savedQuotesPopup = $('.quote-saved-popup-container');
        this.$quoteSummBtn = $('.quote-summary-button');
        this.$noQuotes = $('.no-quotes');
    }
};

$(function () { RATETRACK.init(); });

$(function () {
    $("#txtDateOfSale").datepicker();
});

$(function () {
    $("#txtInServiceDate").datepicker();
});

$(function () {
    $("#txtFirstPaymentDate").datepicker();
});

$(function () {
    $("#selectCoverageLWENG").change(function () {
    });
});

$(function () {
    $("#chkIsUpgrade").change(function () {
        ClearVscRateAs();
        ClearVscCoverages();
        ClearVscDeductibles();
                
        var vscContainer;
        var lwPpvId;
        if (IsLwUpgradeVisibleAndChecked())
        {
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);            
        }
        else 
            vscContainer = GetVscContainerByPpvId();
                
        LoadVscCoveragesByContainer(vscContainer);
        LoadVscDeductiblesByContainer(vscContainer);        
        if (IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
});

function ClearLWIsUpgrade() {
    try {
        var control = GetLwIsUpgradeControl();
        $(control).attr('checked', false);
    } catch (e) {
        console.log("ClearLWIsUpgrade " + e.message);
    }
}

function LoadLwUpgradeProductInfo() {
    try {
        // if we are rating a lw upgrade
        var loadLwUpgradeProducts = IsLwUpgradeVisibleAndChecked();

        // look for upgrade product id or flex field bag - upgrade to basic vsc
        //if (loadLwUpgradeProducts)
        //{
        //}
        // iterate master container and load vsc new and used
    } catch (e) {
        console.log("LoadLwUpgradeProductInfo " + e.message);        
    }    
}

//$(function () {
//    $("#selRateAs").change(function () {
//        ClearVscMessage();
//        ClearVSCRates();
//        ClearVscCoverages();
//        ClearVscDeductibles();
//        ClearVscCoverageTerms();

//        FindCurrentVscProduct(true);

//        if (IsVscInputValid())
//            GetVscRates();
//    });
//});

$(function () {
    $("#linkVscNew").click(function () {
        ClearVscMessage();
        ClearVSCRates();
        //ClearVscCoverages();
        //ClearVscDeductibles();
        //ClearVscCoverageTerms();

        //FindCurrentVscProduct(true);

        //if (IsVscInputValid())
        //    GetVscRates();
    });
});

$(function () {
    $("#linkVscUsed").click(function () {
        ClearVscMessage();
        ClearVSCRates();
        //ClearVscCoverages();
        //ClearVscDeductibles();
        //ClearVscCoverageTerms();

        FindCurrentVscProduct(true);

        if (IsVscInputValid())
            GetVscRates();
    });
});

$(function () {
    $("#selectVscProduct").change(function () {
        ClearVscMessage();
        ClearVSCRates();
        ClearVscCoverages();
        ClearVscDeductibles();
        ClearVscCoverageTerms();
        ClearLWIsUpgrade();

        var vscContainer = GetVscContainerByPpvId();
        var lwContainer;
        LoadVscCoveragesByContainer(vscContainer);
        LoadVscDeductiblesByContainer(vscContainer);
        HideShowLWDiv(vscContainer);

        if (IsVscInputValid())
            GetVscRates();
    });
});

$(function () {
    $("#selectCompAddonProduct").change(function () {
        ClearCMNTRates();
        ClearCmntSettings();        
        var ppvId = GetCmntProductInfoValue();
        var container = GetCmntContainerByPpv(ppvId);
        var code = GetApplicationCodeTextFromContainer(container);
        ShowDivCompOnlySettings(code);
        CopyCmntSettingsFromContainerToUi(container);
        GetCmntRates();
    });
});

$(function () {
    $("#selectCompAddonSetting").change(function () {
        ClearCMNTRates();
        //ClearCmntSettings();
        var ppvId = GetCmntProductInfoValue();
        var container = GetCmntContainerByPpv(ppvId);
        //CopyCmntSettingsFromContainerToUi(container);
        GetCmntRates();
    });
});

$(function () {
    $("#selectVscCertified").change(function () {
        ClearVscMessage();
        ClearVSCRates();
        ClearVscCoverages();
        ClearVscDeductibles();
        ClearVscCoverageTerms();

        FindCurrentVscProduct(true);

        if (IsVscInputValid())
            GetVscRates();
    });
});

$(function () {
    $("#selectLimitedWarranty").change(function () {
        ClearVscMessage();
        ClearVSCRates();
        ClearVscCoverages();
        ClearVscDeductibles();

        LoadVscCoverages();
        LoadVscDeductibles();

        //FindCurrentVscProduct(false);

        if (IsVscInputValid())
            GetVscRates();
    });
});

function ClearVscCoverageTerms() {
    $("#selectLimitedWarranty").html('');
}

function FindCurrentVscProduct(loadLwTerms) {
    try {
        // find product code and sub code
        var rateAs = GetRateAsValue();
        var certified = GetCertifiedValue();
        var code = FindProductCode(rateAs, certified);

        // display lw terms
        if (loadLwTerms) {
            if (code == "LW") {
                HideShowLWTermDiv(false);
                CopyLWTermsFromMasterContainer();
                //SyncLWCoverageAndDeductible();
            }
            else
                HideShowLWTermDiv(true);
        }

        // find vsc container

        if (code == "LW")
            ProcessLWProductData(code);
        else
            ProcessVscProductData(code);        

    } catch (e) {
    console.log("FindCurrentVscProduct " + e.message);
    }
}

function FindCurrentLWProduct() {
    try {
        // find product code and sub code
        var rateAs = GetRateAsValue();
        var certified = GetCertifiedValue();
        var code = FindProductCode(rateAs, certified);        

        // find vsc container

        if (code == "LW")
            ProcessLWProductData(code);
        else
            ProcessVscProductData(code);

    } catch (e) {
        console.log("FindCurrentVscProduct " + e.message);
    }
}

function ProcessLWProductData(code) {
    // process lw coverage and deductible
    try {
        ProcessVscProductData("LW");
    } catch (e) {
        console.log("ProcessLWProduct LW " + e.message);
    }

    // process vsc new coverage and deductible
    try {
        ProcessVscProductData("NEW");
    } catch (ex) {
        console.log("ProcessLWProduct NEW " + ex.message);
    }        
}

function ProcessVscProductData(code) {
    var vscContainer = GetVscContainerByCode(code);

    // display coverages
    CopyVscCoveragesFromContainerToUi(vscContainer, false);

    // display deductibles
    CopyVscDeductiblesFromContainerToUi(vscContainer);
}

function CopyLWTermsFromMasterContainer() {
    try {
        var lwTermSelect = GetLWTermSelectControl();
        var vscContainerCoverageSelect;
        var lwTermCollection = GetAllSelectTermFromMasterContainer();

        $.each(lwTermCollection, function (a, b) {
            CopySelectControl($(b), lwTermSelect, false);
        });
    } catch (e) {
        console.log("CopyLWTermsFromMasterContainer " + e.message);
    }
}

function GetLWTermSelectControl() {
    var lwSelectControl = $("#selectLimitedWarranty");
    return lwSelectControl;
}

function GetLWTermValue() {
    var value = $("#selectLimitedWarranty :selected").val();
    return value;
}

function HideShowLWTermDiv(hide) {
    var lwTermDiv = GetLWTermDiv();
    if (hide)
        lwTermDiv.hide();
    else
        lwTermDiv.show();
}

function GetLWTermDiv() {
    var div = $("#divLimitedWarranty");
    return div;
}

function ValidateInServiceDate(vscContainer) {
    var inserviceInput;
    try {
        inserviceInput = GetVscIsInserviceRequired(vscContainer);
        SetVisibilityForDivInServiceDate(inserviceInput);
    } catch (e) {
        console.log("DisplayHideVscInServiceDate " + e.message);
    }
}

function IsValidInServiceDate() {
    var currentInServiceDate = $("#txtInServiceDate").datepicker("getDate");
    var isValid = false;
    if (currentInServiceDate)
        isValid = true;

    return isValid;
}

function DisplayHideVscInServiceDate(vscContainer) {
    var inserviceInput;
    try {
        inserviceInput = GetVscIsInserviceRequired(vscContainer);
        SetVisibilityForDivInServiceDate(inserviceInput);
    } catch (e) {
        console.log("DisplayHideVscInServiceDate " + e.message);
    }
}

function SetVisibilityForDivInServiceDate(inserviceDateFlag) {
    //var inserviceDateDiv = GetDivForInserviceDate();
    if (inserviceDateFlag.text() == "1" && !IsValidInServiceDate()) {
        alert("in service date is a required field");
    }
}

function GetDivForInserviceDate() {
    var div = $("#divInServiceDate");
    return div;
}

function GetRateAsValue() {
    var value = "NEW";    
        
    try {
        var vscNewLink = GetVscRateNewLink();
        if (vscNewLink.hasClass("displayNone"))
            value = "USED";
    } catch (e) {
        console.log("GetRateAsValue " + e.message);
    }

    return value;
}

function GetCertifiedValue() {
    var val = "";

    try {
        val = $("#selectVscCertified :selected").val();
    } catch (e) {
        console.log("GetCertifiedValue " + e.message);
    }

    return val;
}

function FindProductCode(rateAsValue, certifiedValue) {
    var productCode = "";

    try {
        if (certifiedValue == 1)
            productCode = "MCW";
        else if (certifiedValue == 2)
            productCode = "LW";        
        else productCode = rateAsValue;
    } catch (e) {
        console.log("FindProductCode " + e.message);
    }

    return productCode;
}

function GetLWProductCode() {
    var code = "LW";
    try {
        // are we rating a no upgrade or upgrade?
        var isNoUpgrade = IsNoUpgradeCoverage();
        if (!isNoUpgrade)
            code = "NEW";    
    } catch (e) {
        console.log("GetLWProductCode " + e.message);
    }
    
    return code;
}

function IsNoUpgradeCoverage(){
    var bol = false;
    try {
        var vscCoverageText = GetSelectedTextVscCoverage();
        if (vscCoverageText == "No Upgrade")
            bol = true;
    } catch (e) {
        console.log("IsNoUpgradeCoverage " + e.message);
    }
    
    return bol;
}

function GetSelectedTextVscCoverage() {
    var text;
    
    try {
        text = $("#selectCoverageVSC :selected").text();    
    } catch (e) {
    console.log("GetSelectedTextVscCoverage " + e.message);    
    }
    
    return text;
}

$(function () {
    $("#selYears").change(function () {
        LoadVehicleMakes();
        LoadVehicleModels();
    });
});

$(function () {
    $("#selMakes").change(function () {
        LoadVehicleModels();
    });
});

//var baseUrl = '/span3';
var baseUrl = '';

$(function () {
    $("#txtOdometer").blur(function () {
        ClearAllRates();
        if (IsOdometerValid) {
            GetAvailableProducts();
        }
    });
});

$(function () {
    $("#txtAmountFinanced").blur(function () {
        ClearGapRates();
        GetGapRates();
    });
});

$(function () {
    $("#txtFinancedTermMonths").blur(function () {
        ClearGapRates();
        GetGapRates();
    });
});

$(function () {
    $("#txtFinancedAPR").blur(function () {
        ClearGapRates();
        GetGapRates();
    });
});

$(function () {
    $("#selectSaleType").change(function () {
        ClearGapRates();
        GetGapRates();
    });
});

function AreGapInputsValid() {
    var amountFinanced = IsPositiveNumber($("#txtAmountFinanced").val());
    var apr = IsANumber($("#txtFinancedAPR").val());
    var term = IsPositiveNumber($("#txtFinancedTermMonths").val());
    return (amountFinanced && apr && term);
}

function IsPositiveNumber(number) {
    var num = parseInt(number, 10);
    return (!isNaN(num) && num > 0);
}

function IsANumber(number) {
    var num = parseInt(number, 10);
    return (!isNaN(num));
}

function IsOdometerValid() {
    return IsPositiveNumber($("#txtOdometer").val());
}

$(function () {
    $(".rates-table").on('click', 'a', function (e) {

        var $rate = $(this);
        
        var $product = $rate.closest('.product');
        var $rateTable = $rate.closest('.rates-table');
        var $productHeader = $product.find('.product-header');

/*         var $product = $rate.parent().parent().parent().parent().parent().parent(); */
        var $color = $productHeader.css('color');
        console.log($color);
        var selectedRate = $rateTable.find('.rate-selected a');

        var quoteContainer = $('.saved-quotes-container');

        selectedRate.css({ 'background-color': 'transparent', 'color': '#3d3d42' });
        selectedRate.removeClass('rate-selected');

        var productName = $productHeader.text();
        var quoteClass = 'saved-quote-' + $product.index();
        //var quote = '<div class="saved-quote"><h2></h2><div><a href="#" class="remove-quote-btn">Remove</a><span class="termInfo"></span><span class="amount"><span class="dollar-sign">$</span>1,139</span><input type="hidden" class="quoteInfo"/><input type="hidden" class="termId"/></div>';
        
        /* var quote = '<div class="saved-quote"><h2></h2><div><span class="amount"><span class="dollar-sign">$</span></span><a href="#" class="remove-quote-btn">Remove</a><span class="termInfo"></span><input type="hidden" class="quoteInfo"/><input type="hidden" class="termId"/></div></div>'; */
        
        
        
        
        var quote = '<div class="saved-quote quote-to-save"><div class="quote-header vsc-quote-header">VSC</div><div class="row-fluid"><div class="span10"><h1 class="amount"><span class="right-panel-dollar">$</span>899.99</h1><span class="info-quote">48mo/60k mi.</span></div><div class="span2"><a href="#" class="remove-quote-btn">X</a></div></div></div>';

        //var savedQuote = quoteContainer.append(quote);
        //var quoteToAdd = quoteContainer.find('.saved-quote:last-child');
        var quoteInfo = $rate.attr("alt");
        var termInfo = $rate.attr("id").split("_");

        if ($rate.parent().hasClass('rate-selected')) {
            var index = $product.index();
            var quoteToRemove = quoteContainer.find('.saved-quote-' + index);
            $(quoteToRemove).find('.remove-quote-btn').css('display', 'none');
            $(quoteToRemove).hide(200, function (e) {
                $(quoteToRemove).remove();
                if($('.saved-quotes-container').children().length <= 2) {
	            	   $('.no-quotes').css('display', 'block');
                } else {
	                
                }
            });
        } else {
        	$('.no-quotes').css('display', 'none');
            $rate.parent().addClass('rate-selected');
            $rate.css({ 'background-color': $color, 'background-image': 'none', 'color': '#fff' });
            $rate.find('.dollar-sign').css({ 'color': '#fff' });
        }

        selectedRate.parent().removeClass('rate-selected');

        if ($('.' + quoteClass).length > 0) {
            $('.' + quoteClass).find('.amount').html($(this).html());
            $('.' + quoteClass).find('.quoteInfo').text(quoteInfo);
            $('.' + quoteClass).find('.termInfo').text(termInfo[1]);
            $('.' + quoteClass).find('.termId').text(termInfo[0]);
        }
        else {
            var savedQuote = quoteContainer.append(quote);
            var quoteToAdd = quoteContainer.find('.saved-quote:last-child');
            
            
            quoteToAdd.css('border-left', '8px solid' + ' ' + $color);
            quoteToAdd.find('.quote-header').text(productName);
            quoteToAdd.addClass(quoteClass);
            quoteToAdd.find('.amount').html($(this).html());
            quoteToAdd.find('.quote-header').css('color', $color);
            quoteToAdd.find('.remove-quote-btn').css('display', 'none');
            quoteToAdd.find('.quoteInfo').text(quoteInfo);
            quoteToAdd.find('.termInfo').text(termInfo[1]);
            quoteToAdd.find('.termId').text(termInfo[0]);

            quoteToAdd.show(200, function(e) {
                $(this).find('.remove-quote-btn').css('display', 'inline-block');
            });
        }
    });
});

$(function () {
    $("#txtVin").blur(function () {
        ClearAllRates();
        var vin = $(this).val();
        // if the vin number is 17 characters, make the ajax call
        if (vin.length == 17) {
            $.post(baseUrl + "/Service/GetByVin", { "vehicleIdentificationNumber": vin },
                function (data) {

                    DisableVehicleYearMakeModel();

                    AddOptionToSelectControl("selYears", data.ModelYear, data.ModelYear);
                    $("#selYears").val($.trim(data.ModelYear));

                    AddOptionToSelectControl("selMakes", data.Make.MakeName, data.Make.InternalMakeId);
                    $("#selMakes").val($.trim(data.Make.InternalMakeId));

                    LoadVehicleModels();
                    AddOptionToSelectControl("selModels", data.Model.BaseName, data.Model.InternalModelId);
                    $("#selModels").val($.trim(data.Model.InternalModelId));

                    // update top bar
                    $('#info-bar-year').text(data.ModelYear).parent().removeClass('empty');
                    $('#info-bar-make').text(data.Make.MakeName).parent().removeClass('empty');
                    $('#info-bar-model').text(data.Model.BaseName).parent().removeClass('empty');

                    GetAvailableProducts();
                });
        }
        else {
            $("#selYears").removeAttr("disabled");
            $("#selMakes").removeAttr("disabled");
            $("#selModels").removeAttr("disabled");
        }
    });
});

function DisableVehicleYearMakeModel() {
    $("#selYears").attr("disabled", "disabled");
    $("#selMakes").attr("disabled", "disabled");
    $("#selModels").attr("disabled", "disabled");
}

function clearVehicleInfo() {

}

// VSC coverage selection change
$(function () {
    $("#selectCoverageVSC").change(function () {
        ClearVscMessage();
        ClearVSCRates();
        ClearVscDeductibles();

        //LoadVscDeductibles();

        //if (IsVscInputValid())
        //    GetVscRates();

        var vscContainer;
        var lwPpvId;
        if (IsLwUpgradeVisibleAndChecked()) {
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);
        }
        else
            vscContainer = GetVscContainerByPpvId();

        //LoadVscCoveragesByContainer(vscContainer);
        LoadVscDeductiblesByContainer(vscContainer);
        if (IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
});

$(function () {
    $("#selectLwUpgradeProduct").change(function () {
        ClearVscMessage();
        ClearVSCRates();
        ClearVscCoverages();
        ClearVscDeductibles();        

        var vscContainer;
        var lwPpvId;
        if (IsLwUpgradeVisibleAndChecked()) {
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);
        }
        else
            vscContainer = GetVscContainerByPpvId();

        LoadVscCoveragesByContainer(vscContainer);
        LoadVscDeductiblesByContainer(vscContainer);
        if (IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
});

// VSC deductible selection change
$(function () {
    $("#selectDeductibleVSC").change(function () {
        ClearVscMessage();
        ClearVSCRates();
        //if (IsVscInputValid())
        //    GetVscRates();
        var vscContainer;
        var lwPpvId;
        if (IsLwUpgradeVisibleAndChecked()) {
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);
        }
        else
            vscContainer = GetVscContainerByPpvId();

        //LoadVscCoveragesByContainer(vscContainer);
        //LoadVscDeductiblesByContainer(vscContainer);
        if (IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
});

// security guard coverage selection change
$(function () {
    $("#selectCoverageSG").change(function () {
        ClearSecurityGuardRates();
        GetSecurityGuardRates();
    });
});

// tire wheel coverage selection change
$(function () {
    $("#selectTWCoverages").change(function () {
        ClearTireWheelRates();
        GetTireWheelRates();
    });
});

$(function () {
    $("#radioTWYes").click(function () {
        ClearTireWheelRates();
        GetTireWheelRates();
    });
});

$(function () {
    $("#radioTWNo").click(function () {
        ClearTireWheelRates();
        GetTireWheelRates();
    });
});

// maintenance coverage selection change
$(function () {
    $("#selectCoverageMAINTENANCE").change(function () {
        ClearMaintenanceRates();
        GetMaintenanceRates();
    });
});

// maintenance interval selection change
$(function () {
    $("#selectIntervalMAINTENANCE").change(function () {
        ClearMaintenanceRates();
        GetMaintenanceRates();
    });
});

function GetAvailableProducts() {
    var vin = $("#txtVin").val();
    var dateOfSale = $("#txtDateOfSale").val();
    var odometer = $("#txtOdometer").val();

    if (vin.length == 17 && IsOdometerValid()) {
        $.post(baseUrl + "/Service/GetEligibleProducts", {
            "vehicleIdentificationNumber": vin,
            "dateOfSale": dateOfSale,
            "odometer": odometer
        },
            function (data) {
                ProcessProducts(data);
            });
    }
}

function IsVinNumber17Characters(vin) {
    return (vin && vin.length() == 17)
}

function ProcessProducts(products) {
    var bGetVscRates = false;
    var bGetCompAddonRates = false;
    var bGetCmntRates = false;
    $.each(products, function (p, x) {
        // process vsc products here
        if (IsAppCodeForVsc(x.ParentProductType.ApplicationCode)) {
            ProcessVSCProduct(x);
            bGetVscRates = true;
        }
        // process complimentary, addon, and regular maintenance
        else if (IsAppCodeForCompAddonGroup(x.ParentProductType.ApplicationCode)) {
            ProcessCmntGroup(x);
            bGetCmntRates = true;
        }
        else {
            ProcessCoverages(x.ParentProductType.ApplicationCode,
            x.ProductCoverages,
            x.ParentProductType.ApplicationSubCode);
            ProcessOptions(x.ParentProductType.ApplicationCode, x.ProductOptions);
        }
    });

    if (bGetVscRates && IsVscInputValid())
        GetVscRates();    

    if (bGetCmntRates)
        GetCmntRates();

    // process gap rates here
    GetGapRates();

    // if we have a saved quote, select coverage, deductible, options and rate here
    SelectEditQuote();
}

function DefaultRateAsToNewIfAvailable() {
    //var rateAsControl = GetVscRateAsControl();
    // todo select new if available
}

function GetRatesForAllProducts() {

    GetMaintenanceRates();
    //GetTireWheelRates();
    //GetSecurityGuardRates();
    //GetGapRates();
}

function SelectEditQuote() {
    if ($("#txtViewStatus").val() == "1") {
        // read value from hidden field
        var saveQuote = $.parseJSON($("#txtSavedQuoteInfo").text());
        $.each(saveQuote, function (a, rate) {
            try {
                //console.log("before calling process edit");
                var t = setTimeout(function () { ProcessEditQuote(rate) }, 3000);
                /*
                //ProcessEditQuote(rate);
                var covList = [];
                covList.push(rate.RatedCoverage);
                ProcessCoverages(rate.RatedProduct.ParentProductType.ApplicationCode, covList);
                ProcessOptions(rate.RatedProduct.ParentProductType.ApplicationCode, rate.RatedProduct.ProductOptions);
                */
                //console.log("after calling process edit");
            } catch (e) {
                console.log("error inside process edit " + e.message);
            }
        });
    }
}

function ProcessEditQuote(rate) {
    var uiRateCount = 0;
    var termId = 0;
    termId = FindTermId(rate);
    var termSelector = "";
    termSelector = "a[id^='" + termId + "']";
    try {
        if (IsAppCodeForMaintenance(rate.RatedProduct.ParentProductType.ApplicationCode)) {
            // choose coverage
            //MaintSavedRateUniqueId
            $("#selectCoverageMAINTENANCE").val($.trim(rate.RatedCoverage.InternalCoverageId));
            // choose option
            var serviceIntervalId = FindMaintenanceIntervalId(rate);
            $("#selectIntervalMAINTENANCE").val($.trim(serviceIntervalId));
            //GetMaintenanceRates();
            // we should have the rates now
            // select saved rate here

            try {
                uiRateCount = $("#rowRetailPriceMAINTENANCE > td > a").length;
                //console.log("maint rates inside Process edit quote " + uiRateCount);
                if (uiRateCount > 0)
                    $("#rowRetailPriceMAINTENANCE > td").find(termSelector).trigger("click");
            } catch (e) {
                console.log(" issue with maint rates " + e.message);
            }

        }
        else if (IsAppCodeForVsc(rate.RatedProduct.ParentProductType.ApplicationCode)) {
            var vscNew = "NEW";
            var vscUsed = "USED";
            //var rateAsControl = GetVscRateAsControl();
            //if (IsAppCodeForVscNew(rate.RatedProduct.ParentProductType.ApplicationCode))
                //$(rateAsControl).val(vscNew);
            //else
                //$(rateAsControl).val(vscUsed);

            $("#selectCoverageVSC").val($.trim(rate.RatedCoverage.InternalCoverageId));
            $("#selectDeductibleVSC").val(rate.RatedDeductible.InternalDeductibleId);
            uiRateCount = 0;

            try {
                uiRateCount = $("#tableRatesVSC > tbody > tr > td > a").length;
                //console.log("vsc rates inside Process edit quote " + uiRateCount);
                if (uiRateCount > 0)
                    $("#tableRatesVSC > tbody > tr > td").find(termSelector).trigger("click");

            } catch (e) {
                console.log(" issue with VSC rates " + e.message);
            }
        }
        else if (IsAppCodeForTW(rate.RatedProduct.ParentProductType.ApplicationCode)) {
            $("#selectTWCoverages").val($.trim(rate.RatedCoverage.InternalCoverageId));
            uiRateCount = 0;
            var rfValue = GetRunFlatValue(rate.RatedTerms[0]);
            DisplayRunFlatRadio(rfValue);

            try {
                uiRateCount = $("#rowRetailPriceTW > td > a").length;
                //console.log("tw rates inside Process edit quote " + uiRateCount);
                if (uiRateCount > 0)
                    $("#rowRetailPriceTW > td").find(termSelector).trigger("click");

            } catch (e) {
                console.log(" issue with tw rates " + e.message);
            }
        }
        else if (IsAppCodeForGAP(rate.RatedProduct.ParentProductType.ApplicationCode)) {
            uiRateCount = 0;
            try {
                uiRateCount = $("#rowRetailPriceGAP > a").length;
                //console.log("gap rates " + uiRateCount);
                if (uiRateCount > 0)
                    $("#rowRetailPriceGAP > a:first").click();

            } catch (ex) {
                console.log(" issue with gap rates " + ex.message);
            }
        }
        else if (IsAppCodeForSG(rate.RatedProduct.ParentProductType.ApplicationCode)) {
            $("#selectCoverageSG").val($.trim(rate.RatedCoverage.InternalCoverageId));
            uiRateCount = 0;
            try {
                uiRateCount = $("#rowRetailPriceSG > a").length;
                //console.log("sg rates " + uiRateCount);
                if (uiRateCount > 0)
                    $("#rowRetailPriceSG > a:first").click();

            } catch (ex) {
                console.log(" issue with sg rates " + ex.message);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}

function GetRunFlatValue(RatedTerm) {
    var runflatValue = "False";
    try {
        if (RatedTerm && RatedTerm.PartnerSpecificFields && RatedTerm.PartnerSpecificFields.FlexFields) {
            $.each(RatedTerm.PartnerSpecificFields.FlexFields, function (index, field) {
                if (field.FieldName == "RUN_FLAT")
                    runflatValue = field.FieldValue;
            });
        }    
    } catch (e) {
        console.log("GetRunFlatValue " + e.message);
    }
    return runflatValue;    
}

function DisplayRunFlatRadio(runFlatValue) {
    try {
        if (runFlatValue == "True")
            $("#radioTWYes").attr('checked', 'checked');
        else
            $("#radioTWNo").attr('checked', 'checked');
    } catch (e) {
        console.log("DisplayRunFlatRadio " + e.message);
    }
}

function FindMaintenanceIntervalId(rate) {
    var id = 0;
    $.each(rate.RatedProduct.ProductOptions, function (a, b) {
        id = b.DisplayName;
    });
    return id;
}

function FindPremiumId(rate) {
    var id = 0;
    $.each(rate.RatedTerms, function (a, b) {
        id = b.InternalPremiumId;
    });
    return id;
}

function FindTermId(rate) {
    var id = 0;
    $.each(rate.RatedTerms, function (a, b) {
        id = b.RatedTerm.InternalTermId;
    });
    return id;
}

function ProcessCoverages(productCode, coverageList, productSubCode) {
    if (IsAppCodeForMaintenance(productCode)) {
        $.each(coverageList, function (a, b) {
            if (!IsOptionAvailable("selectCoverageMAINTENANCE", b.ProductCoverage.InternalCoverageId)) {
                $("#selectCoverageMAINTENANCE").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.DisplayName + "</option>");
            }
        });
        // set the coverage id here for a saved quote
    }
    else if (IsAppCodeForTW(productCode)) {
        $.each(coverageList, function (a, b) {
            if (!IsOptionAvailable("selectTWCoverages", b.ProductCoverage.InternalCoverageId)) {
                $("#selectTWCoverages").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.DisplayName + "</option>");
            }
        });
        GetTireWheelRates();
    }
    else if (IsAppCodeForSG(productCode)) {
        $.each(coverageList, function (a, b) {
            if (!IsOptionAvailable("selectCoverageSG", b.ProductCoverage.InternalCoverageId)) {
                $("#selectCoverageSG").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.DisplayName + "</option>");
            }
        });
        GetSecurityGuardRates();
    }
    else if (productCode == "LWENG") {
        $.each(coverageList, function (a, b) {
            $("#selectCoverageLWENG").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.Description + "</option>");

            // let's process deductibles here
            $.each(b.CoverageDeductibles, function (c, d) {
                $("#selectDeductibleLWENG").append("<option value='" + d.ProductDeductible.InternalDeductibleId + "'>" + d.ProductDeductible.DisplayName + "</option>");
            });
        });

        GetLwEngineRates();
    }
}

function ProcessVscProductInfo(vscProduct) {
    try {
        var selectVscProductInfoControl = GetVscProductInfoSelect();
        AppendOptionToSelectControl(selectVscProductInfoControl,
            vscProduct.ParentProductType.DisplayName,
            vscProduct.InternalProductVersionId);
        selectVscProductInfoControl.val(vscProduct.InternalProductVersionId);

        // process lw upgrade products here
        var selectLwUpgradeControl = GetLwUpgradeProductControl();
        if (IsAppCodeForVscNew(vscProduct.ParentProductType.ApplicationCode) ||
            IsAppCodeForVscUsed(vscProduct.ParentProductType.ApplicationCode))
            AppendOptionToSelectControl(selectLwUpgradeControl,
            vscProduct.ParentProductType.DisplayName,
            vscProduct.InternalProductVersionId);
    } catch (e) {
        console.log("ProcessVscProductInfo " + e.message);
    }
}

function ProcessCmntGroupProductInfo(product) {
    try {
        var selectCmntProductInfoControl = GetCmntProductInfoSelect();
        AppendOptionToSelectControl(selectCmntProductInfoControl,
            product.ParentProductType.DisplayName,
            product.InternalProductVersionId);
        selectCmntProductInfoControl.val(product.InternalProductVersionId);       
    } catch (e) {
        console.log("ProcessCmntProductInfo " + e.message);
    }
}

function GetVscProductInfoSelect() {
    var control;
    try {
        control = $("#selectVscProduct");
    } catch (e) {
    console.log("GetVscProductInfoSelect " + e.message);
    }
    return control;    
}

function GetCmntProductInfoSelect() {
    var control;
    try {
        control = $("#selectCompAddonProduct");
    } catch (e) {
        console.log("GetCmntProductInfoSelect " + e.message);
    }
    return control;
}

function ProcessVSCProduct(vscProduct) {
    // process vsc products, new, used, rental, lw st, lw long
    try {
        ProcessVscProductInfo(vscProduct);
    } catch (e) {
    console.log("ProcessVSCProduct failed to add product info " + e.message);
    }
    
    //var code = vscProduct.ParentProductType.ApplicationCode;
    //var sub_code = vscProduct.ParentProductType.ApplicationSubCode;

    // find vsc container for vsc product
    //var vscContainer = GetVscContainer(code, sub_code);

    // let's get the vsc container based on the product selected
    try {
        var vscContainer = SetupVscContainerInMasterTemplate(vscProduct);
        
        //GetVscContainerByPpvId();
    } catch (ex) {
        console.log("ProcessVSCProduct failed to setup vsc container " + ex.message);
    } 
    
    // process rate as selection
    // todo - only needed for LW
    //ProcessVscRateAs(vscProduct);

    // process certified selection, zurich and mcw
    //try {
    //    var isInServiceDateRequired = ProcessVscCertified(vscProduct);
    //} catch (y) {
    //    console.log("ProcessVSCProduct isInServiceDateRequired" + y.message);    
    //}

//    // process in service date
    try {
        ProcessVscInServiceDate(vscProduct, vscContainer);
    } catch (a) {
        console.log("ProcessVSCProduct ProcessVscInServiceDate " + a.message);    
    }

//    // process coverages and deductibles
    try {
        ProcessVscCoverages(vscProduct, vscContainer);
    } catch (b) {
        console.log("ProcessVSCProduct ProcessVscCoverages " + b.message);    
    }

    try {
        ProcessVscApplicationCode(vscProduct, vscContainer) 
    } 
    catch (d) {    
            console.log("ProcessVSCProduct ProcessVscApplicationCode " + d.message);
    }
    
//    // process partner specific fields
//    try {
//        ProcessPartnerSpecificFields(vscProduct, vscContainer);
//    } catch (c) {
//        console.log("ProcessVSCProduct ProcessPartnerSpecificFields " + c.message);
//    }
}

function ProcessCmntGroup(product) {
    // process complimentary, addon, and regular products
    try {
        ProcessCmntGroupProductInfo(product);
    } catch (e) {
        console.log("ProcessCmntGroup failed to add product info " + e.message);
    }

    try {
        var ppvId = GetCmntProductInfoValue();
        var container = GetCmntContainerByPpv(ppvId);
    } catch (ex) {
        console.log("ProcessCmntGroup failed to setup container " + ex.message);
    }
    
    try {
        ProcessCmntSetting(product, container);
    } catch (b) {
        console.log("ProcessCmntGroup setting " + b.message);
    }

    try {
        ProcessApplicationCode(product, container)
    }
    catch (d) {
        console.log("ProcessCmntGroup ProcessApplicationCode " + d.message);
    }    
}

function ProcessPartnerSpecificFields(product, container) {
    try {
        var inputControl = GetVscPartnerFieldInput(container);
        inputControl.text(JSON.stringify(product.PartnerSpecificFields));
    } catch (e) {
    console.log("ProcessPartnerSpecificFields " + e.message);
    }
}

function DisplayInvalidValueForInServiceDate() {
    //alert("in service date is required");
    $("#ulVscMessages").append("<li>Please provide a valid in service date.</li>");
}

function ClearVscMessage() {
    $("#ulVscMessages").html('');
}

function IsServiceDateRequiredFromContainer(vscContainer) {
    var isRequired = false;

    try {
        var inserviceInput = GetVscIsInserviceRequired(vscContainer);
        if (inserviceInput.text() == "1")
            isRequired = true;
    } catch (e) {
        console.log("IsServiceDateRequiredFromContainer " + e.message);
    }

    return isRequired;
}

function ProcessVscInServiceDate(vscProduct, vscContainer) {
    var inserviceInput;
    var flag = "";
    try {
        if (vscProduct.IsInserviceRequired) {
            flag = "1";
            inserviceInput = GetVscIsInserviceRequired(vscContainer);
            inserviceInput.text(flag);
        }
    } catch (e) {
        console.log("ProcessVscInServiceDate " + e.message);
    }

    return flag;
}

function ProcessVscApplicationCode(vscProduct, vscContainer) {
    try {
            var input = GetVscApplicationCodeInput(vscContainer);
            input.text(vscProduct.ParentProductType.ApplicationCode);        
    } catch (e) {
        console.log("ProcessVscApplicationCode " + e.message);
    }
}

function ProcessApplicationCode(product, container) {
    try {
        var input = GetApplicationCodeInputFromContainer(container);
        input.text(product.ParentProductType.ApplicationCode);
    } catch (e) {
        console.log("ProcessApplicationCode " + e.message);
    }
}

function LoadVscDeductibles() {
    try {
        // get current container
        var vscContainer = GetCurrentVscContainer();
        CopyVscDeductiblesFromContainerToUi(vscContainer);
    } catch (e) {
    console.log("LoadVscDeductibles " + e.message);
    }
}

function LoadVscDeductiblesByContainer(container) {
    try {
        CopyVscDeductiblesFromContainerToUi(container);
    } catch (e) {
        console.log("LoadVscDeductiblesByContainer " + e.message);
    }
}

function LoadVscCoverages() {
    try {
        // get current container
        var vscContainer = GetCurrentVscContainer();
        CopyVscCoveragesFromContainerToUi(vscContainer, true);
        //HideShowLWDiv(vscContainer);
    } catch (e) {
        console.log("LoadVscCoverages " + e.message);
    }
}

function LoadVscCoveragesByContainer(container) {
    try {
        CopyVscCoveragesFromContainerToUi(container, true);
    } catch (e) {
        console.log("LoadVscCoveragesByContainer " + e.message);
    }
}

function HideShowLWDiv(vscContainer) {
    var hide = true;
    try {
        var lwSelectControl = GetVscTermSelect(vscContainer);
        if ($(lwSelectControl).find("option").length > 0)
            hide = false;
        HideShowLWTermDiv(hide);       
    } catch (e) {
        console.log("HideShowLWDiv " + e.message);
    }    
}

function GetCurrentVscContainer() {
    var currentContainer;
    try {
        //var rateAs = GetRateAsValue();
        //var certified = GetCertifiedValue();
        // find product code 
        //var code = FindProductCode(rateAs, certified);
        // for lw, we can have upgrade and no upgrade
        //if (code == "LW")
        //    code = GetLWProductCode();
        currentContainer = GetVscContainerByPpvId(); 
        //GetVscContainerByCode(code);    
    } catch (e) {
        console.log("GetCurrentVscContainer " + e.message);
    }
    return currentContainer;
}

function GetVscContainer(code, subCode) {
    var idSelector = "#";
    var idName = "divVscTemplate_" + code + "_" + subCode;
    var vscSelector = idSelector + idName;
    //console.log(vscSelector);
    var template = $(vscSelector);
    var vscMasterContainer;

    //if ($.isEmptyObject(template))
    //if (typeof template == "undefined")
    if (template.length == 0) {
        template = $("#divVscTemplate").clone();
        template.attr('id', idName);
        vscMasterContainer = $("#divVscMasterContainer");
        template.appendTo(vscMasterContainer);
    }

    return template;
}

function GetVscContainerByPpvId() {
    try {
        var idSelector = "#";
        var ppvId = GetVscProductInfoValue();
        //var lwPpvId = GetLWUpgradePpvId();
        //if (IsLwUpgradeVisibleAndChecked() && lwPpvId > 0)
        //    ppvId = lwPpvId;
        var idName = "divVscTemplate_" + ppvId;
        var vscSelector = idSelector + idName;
        //console.log(vscSelector);
        var template = $(vscSelector);
        var vscMasterContainer;

        if (template.length == 0) {
            //console.log("0 found now clone and append");
            template = $("#divVscTemplate").clone();
            template.attr('id', idName);
            vscMasterContainer = $("#divVscMasterContainer");
            template.appendTo(vscMasterContainer);
        }
        //else
        //    console.log("div found");

        return template;
    } catch (e) {
        console.log("GetVscContainerByPpvId " + e.message);
    }
}

function GetVscContainerByPpv(ppvId) {
    try {
        var idSelector = "#";
        var idName = "divVscTemplate_" + ppvId;
        var vscSelector = idSelector + idName;
        var template = $(vscSelector);
        var vscMasterContainer;

        if (template.length == 0) {
            template = $("#divVscTemplate").clone();
            template.attr('id', idName);
            vscMasterContainer = $("#divVscMasterContainer");
            template.appendTo(vscMasterContainer);
        }
        
        return template;
    } catch (e) {
        console.log("GetVscContainerByPpvId " + e.message);
    }
}

function GetCmntContainerByPpv(ppvId) {
    try {
        var idSelector = "#";
        var idName = "divCmntTemplate_" + ppvId;
        var selector = idSelector + idName;
        var template = $(selector);
        var masterContainer;

        if (template.length == 0) {
            template = $("#divCmntTemplate").clone();
            template.attr('id', idName);
            masterContainer = $("#divCmntMasterContainer");
            template.appendTo(masterContainer);
        }

        return template;
    } catch (e) {
        console.log("GetCmntContainerByPpv " + e.message);
    }
}

function GetLWUpgradePpvId()
{
    var ppvId = 0;
    try {
        // isUpgrade flag must be checked
        // now get the ppv id from list
        if (IsLwUpgradeVisibleAndChecked())
            ppvId = GetLwUpgradeProductValue();            
    } catch (e) {
        console.log("GetLWUpgradePpvId " + e.message);
    }
    return ppvId;
}

function SetupVscContainerInMasterTemplate(vscProduct){
    try {
        var idSelector = "#";
        var ppvId = vscProduct.InternalProductVersionId;
        var idName = "divVscTemplate_" + ppvId;
        var vscSelector = idSelector + idName;
        //console.log(vscSelector);
        var template = $(vscSelector);
        var vscMasterContainer;

        if (template.length == 0) {
            //console.log("0 found now clone and append");
            template = $("#divVscTemplate").clone();
            template.attr('id', idName);
            vscMasterContainer = $("#divVscMasterContainer");
            template.appendTo(vscMasterContainer);
        }
        //else
        //    console.log("div found");

        return template;
    } catch (e) {
        console.log("SetupVscContainerInMasterTemplate " + e.message);
    }
}

function GetVscProductInfoValue() {
    try {
        var value = $("#selectVscProduct :selected").val();
        //console.log(value); 
        //GetVscProductInfoSelect().val();
        return value;
    } catch (e) {
        console.log("GetVscProductInfoValue " + e.message);
    }        
}

function GetCmntProductInfoValue() {
    try {
        var value = $("#selectCompAddonProduct :selected").val();
        return value;
    } catch (e) {
        console.log("GetCmntProductInfoValue " + e.message);
    }        
}

function GetAllSelectTermFromMasterContainer() {
    var selectCol;

    try {
        selectCol = $("#divVscMasterContainer").find(".selectTerm");
    } catch (e) {
        console.log("GetAllSelectTermFromMasterContainer " + e.message);
    }

    return selectCol;
}

function GetVscContainerByCode(code) {
    var filter = "divVscTemplate_" + code;
    var vscContainer;

    if (code == "LW")
        vscContainer = GetLWContainerByTermId();
    else {
        try {
            vscContainer = $("div[id^='" + filter + "']");
            //console.log("vsc container count " + vscContainer.length);    
        } catch (e) {
            console.log("GetVscContainerByCode " + e.message);
        }
    }

    return vscContainer;
}

function GetVscContainerByPpvIdOld(ppvId) {
    var filter = "divVscTemplate_" + ppvId;
    var vscContainer;

    try {
        vscContainer = $("div[id^='" + filter + "']");
        //console.log("vsc container count " + vscContainer.length);    
        } catch (e) {
            console.log("GetVscContainerByCode " + e.message);
        }
    return vscContainer;
}

function GetLWContainerByTermId() {
    var lwContainer;
    try {
        var lwTermValue = GetLWTermValue();
        var lwSelectCollection = GetAllSelectTermFromMasterContainer();

        $.each(lwSelectCollection, function (a, b) {
            $.each(b.options, function (c, d) {
                if (d.value == lwTermValue)
                    lwContainer = d.parentNode.parentNode;            
            });
        });

    } catch (e) {
    console.log("GetLWContainerByTermId " + e.message);
    }
    return lwContainer;
}

function ProcessVscCoverages(vscProduct, vscContainer) {
    var coverageControl = GetVscCoverageSelect(vscContainer);

    $.each(vscProduct.ProductCoverages, function (a, b) {
        AppendOptionToSelectControl(coverageControl, b.ProductCoverage.DisplayName, b.ProductCoverage.InternalCoverageId);

        // let's process deductibles here
        ProcessVscDeductibles(vscContainer, b);

        // process coverage terms here
        ProcessVscTerms(vscContainer, b);
    });

    // copy coverages from container to UI
    CopyVscCoveragesFromContainerToUi(vscContainer, true);    
}

function ProcessVscTerms(vscContainer, coverage) {
    try {
        var hide = true;
        if (coverage.ProductTerms) {
            var termControl = GetVscTermSelect(vscContainer);
            hide = false;
            $.each(coverage.ProductTerms, function (index, ProductTerm) {
                AppendOptionToSelectControl(termControl, ProductTerm.ProductTerm.DisplayName, ProductTerm.ProductTerm.InternalTermId);
            });
        }
        // hide or show lw term
        HideShowLWTermDiv(hide);
    } catch (e) {
        console.log("ProcessVscTerms " + e.message);
    }
}

function CopyVscCoveragesFromContainerToUi(vscContainer, removeTargetOptions) {
    var vscUiCoverageSelect = GetVscUiCoverageControl();
    var vscContainerCoverageSelect = GetVscCoverageSelect(vscContainer);
    CopySelectControl(vscContainerCoverageSelect, vscUiCoverageSelect, removeTargetOptions);
}

function ProcessCmntSetting(product, container) {
    var settingControl = GetCmntSettingSelect(container);

    $.each(product.ProductCoverages, function (a, b) {
        AppendOptionToSelectControl(settingControl, b.ProductCoverage.DisplayName, b.ProductCoverage.InternalCoverageId);
    });

    ClearCmntSettings();
    CopyCmntSettingsFromContainerToUi(container);

    if (IsAppCodeForCMNT(product.ParentProductType.ApplicationCode)) {
        var uiSelectControl = GetComplimentaryOnlySelectSetting();
        CopyCmntOnlySettingsFromContainerToUi(container, uiSelectControl);
    }
    ShowDivCompOnlySettings(product.ParentProductType.ApplicationCode);
}

function ShowDivCompOnlySettings(code) {
    var show = false;
    if (IsAppCodeForAddon(code))
        show = true;

    var div = $("#divComplimentaryOnlySetting");
    if (show) {
        if (div.hasClass("displayNone"))
            div.removeClass("displayNone");
    }
    else if (!div.hasClass("displayNone"))
        div.addClass("displayNone");    
}

function CopyCmntSettingsFromContainerToUi(container) {
    var uiCmntSettingSelect = GetUiCmntSettingSelect();
    var containerSettingSelect = GetCmntSettingSelect(container);
    CopySelectControl(containerSettingSelect, uiCmntSettingSelect, false);
}

function CopyCmntOnlySettingsFromContainerToUi(container, uiSelectControl) {
    var containerSettingSelect = GetCmntSettingSelect(container);
    CopySelectControl(containerSettingSelect, uiSelectControl, false);
}

function ClearCmntSettings() {
    $("#selectCompAddonSetting").html('');
}

function GetComplimentaryOnlySelectSetting() {
    var select = $("#selectComplimentarySetting");
    return select;
}

function GetUiCmntSettingSelect()
{
    var select = $("#selectCompAddonSetting");
    return select;
}

function GetCmntSettingValue() {
    var value = $("#selectCompAddonSetting").val();
    return value;
}

function CopySelectControl(source, target, removeOptions) {
    try {

        // remove existing options
        if (removeOptions)
            ClearOptions(target);

        // clone options
        var options = $(source[0].options).clone();

        // append options to target
        target.append(options);

    } catch (e) {
        console.log("copy select control error " + e.message);
    }
}

function ClearOptions(selectControl) {
    selectControl.html('');
}

function GetVscUiCoverageControl() {
    var vscUiCoverageControl = $("#selectCoverageVSC");
    return vscUiCoverageControl;
}

function GetVscCoverageSelect(vscContainer) {
    var selectControl = $(vscContainer).find('.selectVscCoverage');
    return selectControl;
}

function GetCmntSettingSelect(container) {
    var selectControl = $(container).find('.selectCmntSetting');
    return selectControl;
}

function GetVscApplicationCodeInput(vscContainer) {
    var inputControl = $(vscContainer).find('.ApplicationCode');
    return inputControl;
}

function GetApplicationCodeInputFromContainer(container) {
    var inputControl = $(container).find('.ApplicationCode');
    return inputControl;
}

function GetVscTermSelect(vscContainer) {
    var selectControl = $(vscContainer).find('.selectTerm');
    return selectControl;
}

function GetVscDeductibleSelect(vscContainer) {
    var selectControl = $(vscContainer).find('.selectVscDeductible');
    return selectControl;
}

function GetVscPartnerFieldInput(vscContainer) {
    var control = $(vscContainer).find('.PartnerSpecificFields');
    return control;
}

function GetVscIsInserviceRequired(vscContainer) {
    var inputControl;
    try {
        inputControl = $(vscContainer).find('.IsInserviceRequired');
    } catch (e) {
        console.log("GetVscIsInserviceRequired " + e.message);
    }
    return inputControl;
}

function GetVscUiDeductibleControl() {
    var vscUiDeductibleControl = $("#selectDeductibleVSC");
    return vscUiDeductibleControl;
}

function ProcessVscDeductibles(vscContainer, deductible) {
    var deductibleControl = GetVscDeductibleSelect(vscContainer);

    $.each(deductible.CoverageDeductibles, function (c, d) {
        AppendOptionToSelectControl(deductibleControl, d.ProductDeductible.DisplayName, d.ProductDeductible.InternalDeductibleId);
    });

    CopyVscDeductiblesFromContainerToUi(vscContainer);
}

function CopyVscDeductiblesFromContainerToUi(vscContainer) {
    var vscUiDeductibleSelect = GetVscUiDeductibleControl();
    var vscContainerDeductibleSelect = GetVscDeductibleSelect(vscContainer);
    CopySelectControl(vscContainerDeductibleSelect, vscUiDeductibleSelect, true);
}

function ProcessVscCertified(vscProduct) {
    var mcw = "Manufacturer";
    var lw = "Zurich";
    var certifiedControl = GetVscCertifiedControl();

    AppendOptionToSelectControl(certifiedControl, "None", "0");

    if (IsAppCodeForMCW(vscProduct.ParentProductType.ApplicationCode)) {
        AppendOptionToSelectControl(certifiedControl, mcw, "1");
    }
    else if (IsAppCodeForLW(vscProduct.ParentProductType.ApplicationCode)) {
        AppendOptionToSelectControl(certifiedControl, lw, "2");
    }
}

function GetVscCertifiedControl() {
    var certifiedControl = $("#selectVscCertified");
    return certifiedControl;
}

function GetVscRateAsControl() {
    var control = $("#selRateAs");
    return control;
}

function GetVscRateNewLink() {
    var control = $("#linkVscNew");
    return control;
}

function GetVscRateUsedLink() {
    var control = $("#linkVscUsed");
    return control;
}

function ProcessVscRateAs(vscProduct) {
    var newRateAs = "NEW";
    var usedRateAs = "USED";
    try {
        if (IsAppCodeForVscNew(vscProduct.ParentProductType.ApplicationCode) ||
            vscProduct.IsNewCoverage) {
            var vscNewLink = GetVscRateNewLink();
            if (vscNewLink.hasClass('displayNone')) {
                vscNewLink.removeClass('displayNone');
            }
        }
        else if (IsAppCodeForVscUsed(vscProduct.ParentProductType.ApplicationCode)) {
            var vscUsedLink = GetVscRateUsedLink();
            if (vscUsedLink.hasClass('displayNone')) {
                vscUsedLink.removeClass('displayNone');
            }
        }
    } catch (e) {
    console.log('ProcessVscRateAs ' + e.message);
    }    
}

function ProcessOptions(productCode, optionList) {
    if (IsAppCodeForMaintenance(productCode)) {
        // let's process the options here
        $.each(optionList, function (a, b) {
            if (!IsOptionAvailable("selectIntervalMAINTENANCE", b.DisplayName)) {
                $("#selectIntervalMAINTENANCE").append("<option value='" + b.DisplayName + "'>" + b.DisplayName + "</option>");
            }
        });
        // set the interval here from the saved quote
        // get maintenance rates
        GetMaintenanceRates();
    }
}

function OpenProductSection(productLink) {
    if (productLink.hasClass("product-closed")) {
        productLink.click();
    }
}

function IsVscInputValid() {
    var isValid = false;

    try {
        var vscContainer = GetCurrentVscContainer(); 
        
        var isRequired = false;
        isRequired = IsServiceDateRequiredFromContainer(vscContainer);
        if (isRequired) {
            if (IsValidInServiceDate())
                isValid = true;
            else DisplayInvalidValueForInServiceDate();
        }
        else isValid = true;

    } catch (e) {
        console.log("IsVscInputValid " + e.message);
    }

    return isValid;
}

function IsVscInputValidByContainer(container) {
    var isValid = false;

    try {
        
        var isRequired = false;
        isRequired = IsServiceDateRequiredFromContainer(container);
        if (isRequired) {
            if (IsValidInServiceDate())
                isValid = true;
            else DisplayInvalidValueForInServiceDate();
        }
        else isValid = true;

    } catch (e) {
        console.log("IsVscInputValidByContainer " + e.message);
    }

    return isValid;
}

function GetVscRates() {
    try {
        OpenProductSection($("#vsc-header"));
        //var rateAs = GetRateAsValue();
        //var certifiedOption = GetCertifiedValue();

        // get the correct code, new, used, mcw
        var code = GetVscProductCode(); 
        //FindProductCode(rateAs, certifiedOption);
        //if (code == "LW")
        //    code = GetLWProductCode();

        var coverageId = GetVscSelectedCoverageId();

        GetRatesByProductCodeAndCoverage(code, "0", coverageId);
    } catch (e) {
    console.log("GetVscRates " + e.message);
    }
}

function GetCmntRates() {
    try {
        OpenProductSection($("#complimentary-maint-header"));
        var ppvId = GetCmntProductInfoValue();
        var coverageId = GetCmntSettingValue();
        GetRatesByPpvId(ppvId, coverageId);
    } catch (e) {
        console.log("GetCmntRates " + e.message);
    }
}

function GetVscRatesByContainer(container) {
    try {
        OpenProductSection($("#vsc-header"));
        var code = GetVscProductCodeByContainer(container);
        var coverageId = GetVscSelectedCoverageId();
        GetRatesByProductCodeAndCoverage(code, "0", coverageId);
    } catch (e) {
        console.log("GetVscRatesByContainer " + e.message);
    }
}

function GetVscProductCode() {
    var code;
    var vscContainer;
    try {
        vscContainer = GetVscContainerByPpvId();
        code = $(vscContainer).find('.ApplicationCode').text();
        //console.log("inside GetVscProductCode " + code);
    } catch (e) {
    console.log("GetVscProductCode " + e.message);
    }
    return code;
}

function GetApplicationCodeTextFromContainer(container) {
    var code;
    try {
        code = $(container).find('.ApplicationCode').text();
    } catch (e) {
        console.log("GetApplicationCodeTextFromContainer " + e.message);
    }
    return code;
}

function GetVscProductCodeByContainer(container) {
    var code;
    try {
        code = $(container).find('.ApplicationCode').text();
    } catch (e) {
        console.log("GetVscProductCodeByContainer " + e.message);
    }
    return code;
}

function GetMaintenanceRates() {
    OpenProductSection($("#maintenance-header"));
    var code = "MAINTENANCE";
    var coverageId = GetMaintSelectedCoverageId();
    GetRatesByProductCodeAndCoverage(code, "0", coverageId);
}

function GetSecurityGuardRates() {
    OpenProductSection($("#securityguard-header"));
    var code = "SG";
    var coverageId = GetSgSelectedCoverageId();
    GetRatesByProductCodeAndCoverage(code, "0", coverageId);
}

function GetGapRates() {
    OpenProductSection($("#gap-header"));
    var code = "GAP";
    if (AreGapInputsValid()) {
        $("#divGapWarningContainer").hide();
        GetRatesByProductCodeAndCoverage(code, "", "");
    }
    else {
        $("#divGapWarningContainer").show();
    }
}

function GetTireWheelRates() {
    OpenProductSection($("#tire-and-wheel-header"));
    var code = "TW";
    var runFlatValue = GetRunFlatTireValue();
    var coverageId = GetTWSelectedCoverageId();
    GetRatesByProductCodeAndCoverage(code, runFlatValue, coverageId);
}

function GetLwEngineRates() {
    OpenProductSection($("#lwengine-header"));
    var code = "LWENG";
    GetRatesByProductCodeAndCoverage(code, "", "");
}

function GetRatesByProductCodeAndCoverage(code, runFlatTireValue, coverageId) {
    var dateOfSale = $("#txtDateOfSale").val();
    var odometer = $("#txtOdometer").val();
    var productCode = code;
    var dealInfo = new VehicleDealInfo();
    var baseNoUpgradePpvId = GetBaseNoUpgradePpvId();

    $.post(baseUrl + "/Service/GetRates",
        { "odometer": odometer,
            "dateOfSale": dateOfSale,
            "productCode": productCode,
            "vehicleDealInfo": JSON.stringify(dealInfo),
            "isRunFlatTire": runFlatTireValue,
            "coverageId": coverageId,
            "baseNoUpgradePpvId": baseNoUpgradePpvId
        },
        function (data) {
            $.each(data, function (c, d) {
                ProcessRates(d);
            });
        });   
}
function GetRatesByPpvId(ppvId, coverageId) {
    var dateOfSale = $("#txtDateOfSale").val();
    var odometer = $("#txtOdometer").val();
    //var productCode = code;
    var dealInfo = new VehicleDealInfo();
    //var baseNoUpgradePpvId = GetBaseNoUpgradePpvId();

    $.post(baseUrl + "/Service/GetRatesByPpvId",
        {
            "odometer": odometer,
            "dateOfSale": dateOfSale,
            "vehicleDealInfo": JSON.stringify(dealInfo),
            "ppvId": ppvId,
            "coverageId": coverageId
        },
        function (data) {
            $.each(data, function (c, d) {
                ProcessRates(d);
            });
        });
}

function GetBaseNoUpgradePpvId() {
    var ppvId = "";
    try {
        if (IsLwUpgradeVisibleAndChecked())
            ppvId = GetVscProductInfoValue();
    } catch (e) {
        console.log("GetBaseNoUpgradePpvId " + e.message);
    }
    return ppvId;
}

function GetSgSelectedCoverageId() {
    var coverageId = $("#selectCoverageSG :selected").val();
    return coverageId;        
}

function GetVscSelectedCoverageId() {
    var coverageId = $("#selectCoverageVSC :selected").val();
    return coverageId;
}

function GetMaintSelectedCoverageId() {
    var coverageId = $("#selectCoverageMAINTENANCE :selected").val();
    return coverageId;
}

function GetTWSelectedCoverageId() {
    var coverageId = $("#selectTWCoverages :selected").val();
    return coverageId;
}

function GetRunFlatTireValue() {
    var isRunFlat = "0";

    try {
        isRunFlat = $("#radioTWYes:checked").val();
        if (typeof isRunFlat == "undefined")
            isRunFlat = "0";
    } catch (e) {
        console.log("failed to get run flat value " + e.message);
    }

    return isRunFlat;
}

function ClearMaintenanceRates() {
    $("#rowHeadingMAINTENANCE").html('');
    $("#rowRetailPriceMAINTENANCE").html('');
}

function ClearSecurityGuardRates() {
    $("#rowHeadingSG").html('');
    $("#rowRetailPriceSG").html('');
}

function ClearGapRates() {
    $("#rowHeadingGAP").html('');
    $("#rowRetailPriceGAP").html('');
}

function ClearTireWheelRates() {
    $("#rowHeadingTW").html('');
    $("#rowRetailPriceTW").html('');
}

function ClearVSCRates() {
    //$("#rowHeadingVSC").html('');
    $("#tableRatesVSC").html('');
}

function ClearCMNTRates() {
    $("#rowHeadingCMNT").html('');
    $("#rowRetailPriceCMNT").html('');
}

function ClearLWEngineRates() {
    $("#rowHeadingLWENG").html('');
    $("#rowRetailPriceLWENG").html('');
}

function ClearCompMaintRates() {
    $("#rowHeadingCMNT").html('');
    $("#rowRetailPriceCMNT").html('');
}

function ClearAllRates() {
    ClearMaintenanceRates();
    ClearSecurityGuardRates();
    ClearGapRates();
    ClearTireWheelRates();
    ClearVSCRates();
    ClearLWEngineRates();
    ClearCompMaintRates();

    ClearMaintenanceInputs();
    ClearTireWheelInputs();
    ClearSecurityGuardInputs();
    ClearVSCInputs();
    ClearLWEngineInputs();

    ClearSaveQuoteInfo();

    ClearVscProductInfo();
    ClearCmntAddonInputs();
}

function ClearVscProductInfo() {
    $("#selectVscProduct").html('');
}

function ClearSaveQuoteInfo() {
    $(".saved-quote").remove();
}

function ClearMaintenanceInputs() {
    $("#selectCoverageMAINTENANCE").html('');
    $("#selectIntervalMAINTENANCE").html('');
}

function ClearCmntAddonInputs(){
    $("#selectCompAddonProduct").html('');
    $("#selectCompAddonSetting").html('');
    $("#divCmntMasterContainer").html('');
}

function ClearLWEngineInputs() {
    $("#selectCoverageLWENG").html('');
    $("#selectDeductibleLWENG").html('');
}

function ClearTireWheelInputs() {
    $("#selectTWCoverages").html('');
}

function ClearSecurityGuardInputs() {
    $("#selectCoverageSG").html('');
}

function ClearVSCInputs() {
    ClearVscRateAs();
    ClearVscCertified();
    ClearVscCoverages();
    ClearVscDeductibles();
    ClearVscCoverageTerms();

    ClearVscContainerData();
    ClearVscMessage();
}

function ClearVscRateAs() {
    //var control = GetVscRateAsControl();
    //$(control).html('');
}

function ClearVscCertified() {
    $("#selectVscCertified").html('');
}

function ClearVscContainerData() {
    $("#divVscMasterContainer").html('');
}

function ClearVscCoverages() {
    $("#selectCoverageVSC").html('');
}

function ClearVscDeductibles() {
    $("#selectDeductibleVSC").html('');
}

function ProcessRates(rateList) {
    var selectedCoverage;
    var selectedInterval;
    var selectedDeductible;
    var monthLabel = " months";
    var months = {};
    var miles = {};

    if (IsAppCodeForMaintenance(rateList.RatedProduct.ParentProductType.ApplicationCode)) {
        selectedCoverage = $("#selectCoverageMAINTENANCE :selected").val();
        selectedInterval = $("#selectIntervalMAINTENANCE :selected").val();
        if (rateList.RatedCoverage.InternalCoverageId == selectedCoverage) {
            $.each(rateList.RatedProduct.ProductOptions, function (y, z) {
                if (z.DisplayName == selectedInterval) {
                    $.each(rateList.RatedTerms, function (o, p) {
                        $("#rowHeadingMAINTENANCE").append("<th>" + p.RatedTerm.TermMonths + " months</th>");
                        $("#rowRetailPriceMAINTENANCE").append("<td><a class='" + p.RatedTerm.InternalTermId + "' id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.TermMonths + monthLabel + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
                    });
                }
            });

            $("#rowRetailPriceMAINTENANCE > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }
    else if (IsAppCodeForTW(rateList.RatedProduct.ParentProductType.ApplicationCode)) {
        selectedCoverage = $("#selectTWCoverages :selected").val();
        if (rateList.RatedCoverage.InternalCoverageId == selectedCoverage) {
            $("#rowHeadingTW").html('');
            $("#rowRetailPriceTW").html('');
            $.each(rateList.RatedTerms, function (o, p) {
                $("#rowHeadingTW").append("<th>" + p.RatedTerm.TermMonths + " months</th>");
                $("#rowRetailPriceTW").append("<td><a id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.TermMonths + monthLabel + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
            });

            $("#rowRetailPriceTW > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }
    else if (IsAppCodeForSG(rateList.RatedProduct.ParentProductType.ApplicationCode)) {
        selectedCoverage = $("#selectCoverageSG :selected").val();
        if (rateList.RatedCoverage.InternalCoverageId == selectedCoverage) {
            $.each(rateList.RatedTerms, function (o, p) {
                $("#rowHeadingSG").append("<span>" + p.RatedTerm.DisplayName + "</span>");
                $("#rowRetailPriceSG").append("<a id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.DisplayName + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a>");
            });

            $("#rowRetailPriceSG > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }
    else if (IsAppCodeForGAP(rateList.RatedProduct.ParentProductType.ApplicationCode)) {
        var saleType = $("#selectSaleType :selected").text() + " GAP";
        $.each(rateList.RatedTerms, function (o, p) {
            $("#rowRetailPriceGAP").append("<a id='" + p.RatedTerm.InternalTermId + "_" + saleType + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a>");
            $("#gapSaleType").text(saleType);
        });

        $("#rowRetailPriceGAP > a").formatCurrency({ roundToDecimalPlace: -2 });
    }
    else if (IsAppCodeForCompAddonGroup(rateList.RatedProduct.ParentProductType.ApplicationCode)) {
        selectedCoverage = GetCmntSettingValue();
        //if (rateList.RatedCoverage.InternalCoverageId == selectedCoverage) {
            $.each(rateList.RatedTerms, function (o, p) {
                $("#rowHeadingCMNT").append("<th>" + p.RatedTerm.DisplayName + " months</th>");
                $("#rowRetailPriceCMNT").append("<td><a class='" + p.RatedTerm.InternalTermId + "' id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.DisplayName + monthLabel + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
            });
            $("#rowRetailPriceCMNT > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        //}
    }
    else if (IsAppCodeForVsc(rateList.RatedProduct.ParentProductType.ApplicationCode)) {
        selectedCoverage = $("#selectCoverageVSC :selected").val();
        selectedDeductible = $("#selectDeductibleVSC :selected").val();
        months = {};
        miles = {};
        var vscTerm;
        var vscTermList = [];
        if (rateList.RatedCoverage.InternalCoverageId == selectedCoverage &&
                rateList.RatedDeductible.InternalDeductibleId == selectedDeductible) {
            $.each(rateList.RatedTerms, function (o, p) {
                var v = new VscTermRate();
                v.RetailCost = p.RetailCost;
                v.TermMiles = p.RatedTerm.TermMiles;
                v.TermMonths = p.RatedTerm.TermMonths;
                v.InternalTermId = p.RatedTerm.InternalTermId;
                vscTermList.push(v);

                if (!months[p.RatedTerm.TermMonths])
                    months[p.RatedTerm.TermMonths] = true;

                if (!miles[p.RatedTerm.TermMiles])
                    miles[p.RatedTerm.TermMiles] = true;
            });

            // sort term months and miles
            vscTermList.sort();

            // loop thru vscTermList to create the grid
            var tdId = "td";
            var row;

            // create top row with term months
            $("#tableRatesVSC").html('');
            $("#tableRatesVSC").append("<tr id='tr0'><tr>");
            row = $("#tableRatesVSC tr:last-child");
            row.append("<td>&nbsp;</td>");
            $.each(months, function (a, b) {
                row.append("<td id=" + tdId + a + ">" + a + "</td>");
            });

            // create rows with term mileage
            var tableRowTermMileage;
            $.each(miles, function (c, d) {
                tableRowTermMileage = GetTableRowForTermMile(c, months);
                $("#tableRatesVSC").append(tableRowTermMileage);
            });

            // iterate vscTermList and display retail cost 
            var tableDataPrice;
            var tdSelector;
            $.each(vscTermList, function (i, val) {
                tdSelector = ".td_" + val.TermMiles + "_" + val.TermMonths;
                tableDataPrice = $(tdSelector);
                tableDataPrice.attr("id", val.InternalTermId + "_" + val.TermMonths + "/" + val.TermMiles);
                tableDataPrice.attr("alt", JSON.stringify(rateList));
                tableDataPrice.text(val.RetailCost);
            });
            $("#tableRatesVSC > tbody > tr > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }
    else if (rateList.RatedProduct.ParentProductType.ApplicationCode == "LWENG") {
        selectedCoverage = $("#selectCoverageLWENG :selected").val();
        selectedDeductible = $("#selectDeductibleLWENG :selected").val();
        months = {};
        if (rateList.RatedCoverage.InternalCoverageId == selectedCoverage &&
                rateList.RatedDeductible.InternalDeductibleId == selectedDeductible) {
            $.each(rateList.RatedTerms, function (o, p) {
                if (months[p.RatedTerm.DisplayName])
                    console.log('duplicate month');
                else {
                    months[p.RatedTerm.DisplayName] = true;
                    $("#rowHeadingLWENG").append("<td>" + p.RatedTerm.DisplayName + "</td>");
                    $("#rowRetailPriceLWENG").append("<td><a id='" + p.RatedTerm.InternalTermId + "_" + " " + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
                }
            });
            $("#rowRetailPriceLWENG > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }
}

$(function () {
    $("#btnSaveQuote").click(function () {
        var customer = new CustomerInfo();
        var odometer = $("#txtOdometer").val();
        var rateInfo = "";
        var rateList = [];
        var newQuote;
        var termId;
        var dealInfo = new VehicleDealInfo();
        var dateOfSale = $("#txtDateOfSale").val();

        $(".quoteInfo").each(function (index) {
            rateInfo = $(this).text();
            termId = $(this).siblings('input').text();
            newQuote = FilterRates($.parseJSON(rateInfo), termId);
            rateList.push(newQuote);
        });

        var errorMessage = "";

        if (rateList.length == 0)
            errorMessage += "Please select 1 or more quotes. ";
        if (customer.FirstName == "")
            errorMessage += "Please enter a first name. ";
        if (customer.LastName == "")
            errorMessage += "Please enter a last name. ";

        if (errorMessage == "") {

            $.post(baseUrl + "/Service/SaveRates", { "customerInfo": JSON.stringify(customer),
                "odometer": odometer,
                "rateList": JSON.stringify(rateList),
                "vehicleDealInfo": JSON.stringify(dealInfo),
                "dateOfSale": dateOfSale
            },
            function (data) {
                //$("#selYears").html('');
                //$("#selMakes").html('');
                //$("#selModels").html('');
                //$("#txtVin").val('');
                //$("#txtDateOfSale").val('');
                //$("#txtOdometer").val('');
                //$("#divContainerMAINTENANCE").hide();
                //$("#divContainerTireWheel").hide();
                //$("#divContainerSecurityGuard").hide();
                //$("#divContainerVSC").hide();
                //$("#divContainerGap").hide();
                //$("#txtFirstName").val('');
                //$("#txtLastName").val('');
                //$("#spanMessage").text('Quotes saved successfully.');
            });

            try {
                if ($("#txtViewStatus").val() == "2")
                    window.close();
            } catch (e) {
                console.log("error while trying to close window for menu integration " + e.message);
            }
        }
        else alert(errorMessage);
    });
});

function HideAllProducts() {
    //$("#divContainerVSC").hide();
    //$("#divContainerMAINTENANCE").hide();
    //$("#divContainerTireWheel").hide();
    //$("#divContainerGap").hide();
    //$("#divContainerComplimentary").hide();
    //$("#divContainerSecurityGuard").hide();
    //$("#divContainerLWENG").hide();
}

function ShowAvailableProducts() {
    // call service to get available products
    try {
        $.post(baseUrl + "/Service/GetDealerProfileProducts",
        { "profileDate": $("#txtDateOfSale").val() },
            function (data) {
                HideShowDealerProducts(data);
            });
    } catch (e) {
    console.log("ShowAvailableProducts " + e.message);
    }    
}

function HideShowDealerProducts(productCollection) {
    var hideVsc = true;
    var hideTW = true;
    var hideMaint = true;
    var hideGap = true;
    var hideSg = true;
    var hideCompMaint = true;
    var hideLWEngine = true;

    try {
        $.each(productCollection, function (index, product) {
            if (IsAppCodeForVsc(product.Value.Product.ProductCode))
                hideVsc = false;
            else if (IsAppCodeForTW(product.Value.Product.ProductCode))
                hideTW = false;
            else if (IsAppCodeForMaintenance(product.Value.Product.ProductCode))
                hideMaint = false;
            else if (IsAppCodeForGAP(product.Value.Product.ProductCode))
                hideGap = false;
            else if (IsAppCodeForSG(product.Value.Product.ProductCode))
                hideSg = false;
            else if (IsAppCodeForCompAddonGroup(product.Value.Product.ProductCode))
                hideCompMaint = false;
            else if (IsAppCodeForLWENG(product.Value.Product.ProductCode))
                hideLWEngine = false;            
        });

        // hide products
        HideProductContainer("NEW", hideVsc);
        HideProductContainer("MAINTENANCE", hideMaint);
        HideProductContainer("TW", hideTW);
        HideProductContainer("GAP", hideGap);
        HideProductContainer("SG", hideSg);
        HideProductContainer("LWENG", hideLWEngine);
        HideProductContainer("CMNT", hideCompMaint);
            
    } catch (e) {
    console.log("HideShowDealerProducts " + e.message);
    }
}

function HideProductContainer(productCode, hide) {
    try {
        if (hide) {
            if (IsAppCodeForVsc(productCode))
                $("#divContainerVSC").hide();
            else if (IsAppCodeForMaintenance(productCode))
                $("#divContainerMAINTENANCE").hide();
            else if (IsAppCodeForTW(productCode))
                $("#divContainerTireWheel").hide();
            else if (IsAppCodeForSG(productCode))
                $("#divContainerSecurityGuard").hide();
            else if (IsAppCodeForGAP(productCode))
                $("#divContainerGap").hide();
            else if (IsAppCodeForLWENG(productCode))
                $("#divContainerLWENG").hide();
            else if (IsAppCodeForCMNT(productCode))
                $("#divContainerComplimentary").hide();
        }
    } catch (e) {
        console.log("HideProductContainer " + e.message);
    }    
}

$(function () {
    var d = new Date();
    d = (d.getMonth() + 1) + '/' + (d.getDate()) + '/' + d.getFullYear();
    $("#txtDateOfSale").val(d);
});

$(function () {
    // Load vehicle years
    LoadVehicleYears();
    LoadVehicleMakes();
    //HideAllProducts();
    ShowAvailableProducts();
    LoadSavedQuote();
});

function LoadVehicleYears() {
    /*
    var request = $.ajax({
    type: "POST",
    url: baseUrl + "/Service/GetModelYears"
    });
            
    request.done(function (data) {
    $.each(data, function (c, d) {
    $("#selYears").append("<option value='" + d + "'>" + d + "</option>");
    });
    });

    request.fail(function (jqXHR, textStatus) {
    console.log("request failed for LoadVehicleYears: " + textStatus);
    });
    */
    $.post(baseUrl + "/Service/GetModelYears",
            function (data) {
                //console.log(data);
                $.each(data, function (c, d) {
                    $("#selYears").append("<option value='" + d + "'>" + d + "</option>");
                });
            });
}

function LoadVehicleMakes() {

    var vehicleYear = GetVehicleYearValue(true);
    $("#selMakes").html('');

    $.post(baseUrl + "/Service/GetVehicleMakes",
            { "vehicleYear": vehicleYear },
            function (data) {
                $.each(data, function (c, d) {
                    $("#selMakes").append("<option value='" + d.InternalMakeId + "'>" + d.MakeName + "</option>");
                });
            });
}

function GetVehicleYearValue(returnDefaultValue) {
    var vehicleYear = $("#selYears :selected").val();
    if (returnDefaultValue && typeof vehicleYear == "undefined")
        vehicleYear = "2013";
    return vehicleYear;
}

function GetVehicleMakeValue(returnDefaultValue) {
    var makeId = $("#selMakes :selected").val();
    if (returnDefaultValue && typeof makeId == "undefined")
        makeId = "1";
    return makeId;
}

function LoadVehicleModels() {
    var vehicleYear = GetVehicleYearValue(true);
    var makeId = GetVehicleMakeValue(true);

    $("#selModels").html('');

    $.post(baseUrl + "/Service/GetVehicleModels",
        { "vehicleYear": vehicleYear, "makeId": makeId },
            function (data) {
                $.each(data, function (c, d) {
                    $("#selModels").append("<option value='" + d.InternalModelId + "'>" + d.BaseName + "</option>");
                });
            });
}

function CustomerInfo() {
    this.FirstName = $("#txtFirstName").val();
    this.MiddleName = $("#txtMiddleName").val();
    this.LastName = $("#txtLastName").val();
    this.City = $("#txtCity").val();
    this.State = $("#selectStates :selected").val();
    this.Zip = $("#txtZip").val();
    this.CustomerAddressLine1 = $("#txtAddress1").val();
    this.CustomerPhone = $("#txtPhone").val();
    this.CustomerEmail = $("#txtEmail").val();

    //this.CustomerAddressLine2 = $("").val();        
}

function VehicleDealInfo() {
    this.AmountFinanced = $("#txtAmountFinanced").val() == "" ? "-1" : $("#txtAmountFinanced").val();
    this.DealNumber = $("#txtDealNumber").val();
    this.FinancedAPR = $("#txtFinancedAPR").val() == "" ? "-1" : $("#txtFinancedAPR").val();
    this.FinancedTermMonths = $("#txtFinancedTermMonths").val() == "" ? "-1" : $("#txtFinancedTermMonths").val();
    // todo: dates need to have special format for serialize and de-serialize 
    //this.FirstPaymentDate = $("#txtFirstPaymentDate").val();
    this.PurchasePrice = $("#txtPurchasePrice").val() == "" ? "-1" : $("#txtPurchasePrice").val();
    this.StockNumber = $("#txtStockNumber").val();
    this.VehicleSaleType = $("#selectSaleType :selected").val(); // gap - retail, lease, ballon    
}

function QuoteRate() {
    this.CoverageId = "";
    this.DeductibleId = "";
    this.ServiceInterval = "";
    this.TermId = "";
    this.InternalProductVersionId = "";    
}

function FilterRates(rates, termId) {
    var quoteRate; 
    try {
        quoteRate = new QuoteRate();
        quoteRate.InternalProductVersionId = rates.RatedProduct.InternalProductVersionId;
        quoteRate.TermId = termId;
        //quoteRate.RunFlat = "0";

        if (rates.RatedCoverage)
            quoteRate.CoverageId = rates.RatedCoverage.InternalCoverageId;
        if (rates.RatedDeductible)
            quoteRate.DeductibleId = rates.RatedDeductible.InternalDeductibleId;
        if (rates.RatedProduct.ProductOptions) {
            $.each(rates.RatedProduct.ProductOptions, function (i, option) {
                quoteRate.ServiceInterval = option.DisplayName;
            });
        }
//        var currentRate;
//        if (rates.RatedTerms) {
//            currentRate = rates.RatedTerms[0];
//            if (currentRate && currentRate.PartnerSpecificFields && currentRate.PartnerSpecificFields.FlexFields) {
//                $.each(currentRate.PartnerSpecificFields.FlexFields, function (index, field) {
//                    if (field.FieldName == "RUN_FLAT" && field.FieldValue == "True")
//                        quoteRate.RunFlat = "1";
//                });
//            }
//        }
    } catch (e) {
    console.log("FilterRates " + e.message);
    }
    
    return quoteRate;
}

function VscTermRate() {
    this.TermMonths = "";
    this.TermMiles = "";
    this.RetailCost = "";
    this.InternalTermId = "";
}

// class to hold key value objects for deductible, coverage, options
function ObjectKeyValue() {
    this.Key = "";
    this.Value = "";
}

function ProductGroup() {
    this.Coverages = new ObjectKeyValue();
    this.Deductibles = new ObjectKeyValue();
}

function IsOptionAvailable(controlId, value) {
    var select = "#" + controlId + " > option";
    var options = $(select);
    var found = false;
    $.each(options, function (a, b) {
        if (value == b.value)
            found = true;
    });

    return found;
}

function AddOptionToSelectControl(selectControl, text, value) {
    var select = "#" + selectControl;

    if (!IsOptionAvailable(selectControl, value)) {
        $(select).append("<option value='" + value + "'>" + text + "</option>");
    }
}

function AppendOptionToSelectControl(jquerySelect, text, value) {
    if (!IsOptionAvailableByValue(jquerySelect, text, value))
        $(jquerySelect).append("<option value='" + value + "'>" + text + "</option>");
}

function IsOptionAvailableByValue(selectControl, text, value) {
    var found = false;
    $.each(selectControl[0].options, function (a, b) {
        if (value == b.value)
            found = true;
    });

    return found;
}

function AddOptionToJquerySelectControl(jquerySelect, text, value) {
    var options = $(jquerySelect + ' > option');
    AppendOptionToSelectControl(jquerySelect, text, value);
}

function GetTableRowForTermMile(termMileage, termMonthArray) {
    var tr;
    var trBegin = "<tr><td>" + termMileage + "</td>";
    var trEnd = "</tr>";
    var td = "";
    var id = "";
    $.each(termMonthArray, function (a, b) {
        td += "<td><a href='#' class='" + "td_" + termMileage + "_" + a + "'></a></td>";
    });
    tr = trBegin + td + trEnd;
    return tr;
}

function IsAppCodeForLW(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "LW")
        t = true;
    return t;
}

function IsAppCodeForMCW(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "MCW")
        t = true;
    return t;
}

function IsAppCodeForVsc(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "USED" ||
        ApplicationCode == "COMBO" ||
        ApplicationCode == "LW" ||
        ApplicationCode == "MCW" ||
        ApplicationCode == "RENTAL PLUS" ||
        ApplicationCode == "SELECT COMP" ||
        ApplicationCode == "NEW")
        t = true;
    return t;
}

function IsAppCodeForVscNew(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "NEW")
        t = true;
    return t;
}

function IsAppCodeForVscUsed(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "USED")
        t = true;
    return t;
}

function IsAppSubCodeForVscNew(ApplicationSubCode) {
    var t = false;
    if (ApplicationSubCode == "NEW")
        t = true;
    return t;
}

function IsAppSubCodeForVscUsed(ApplicationSubCode) {
    var t = false;
    if (ApplicationSubCode == "USED")
        t = true;
    return t;
}

function IsAppCodeForMaintenance(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "MAINTENANCE")
        t = true;
    return t;
}

function IsAppCodeForSG(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "SG")
        t = true;
    return t;
}

function IsAppCodeForGAP(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "GAP")
        t = true;
    return t;
}

function IsAppCodeForTW(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "TW")
        t = true;
    return t;
}

function IsAppCodeForLWENG(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "LWENG")
        t = true;
    return t;
}

function IsAppCodeForCMNT(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "CMNT")
        t = true;
    return t;
}

function IsAppCodeForCompAddonGroup(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "CMNT" ||
        ApplicationCode == "AMNT" ||
        ApplicationCode == "REGULAR")
        t = true;
    return t;
}

function IsAppCodeForAddon(ApplicationCode) {
    var t = false;
    if (ApplicationCode == "AMNT") 
        t = true;
    return t;
}

function LoadSavedQuote() {
    if ($("#txtViewStatus").val() == "1") {
        $.post(baseUrl + "/Service/RetrieveSavedQuote",
        function (data) {
            if (data.Odometer)
                DisplayOdometer(data.Odometer);
            if (data.CustomerInfo)
                DisplayCustomerInfo(data.CustomerInfo);
            if (data.VehicleDealInfo)
                DisplayVehicleFinancialInfo(data.VehicleDealInfo);
            if (data.VehicleRates)
                SetSavedRateInfo(data.VehicleRates);
            if (data.VehicleModel)
                DisplayVehicleInfo(data.VehicleModel);
        });
    }
    // menu integration request
    else if ($("#txtViewStatus").val() == "2") {
        $.post(baseUrl + "/Service/RetrieveIntegratedQuote",
        function (data) {
            if (data.Odometer)
                DisplayOdometer(data.Odometer);
            if (data.CustomerInfo)
                DisplayCustomerInfo(data.CustomerInfo);
            if (data.VehicleDealInfo)
                DisplayVehicleFinancialInfo(data.VehicleDealInfo);            
            if (data.VehicleModel)
                DisplayVehicleInfo(data.VehicleModel);
        });
    }
}

function DisplayVehicleInfo(vehicleModel) {
    $("#txtVin").val(vehicleModel.OriginalVehicleIdentification);
    $("#txtVin").blur();
}

function DisplayOdometer(odometer) {
    $("#txtOdometer").val(odometer);
    //$("#txtOdometer").blur();
}

function DisplayCustomerInfo(customerInfo) {
    $("#txtFirstName").val(customerInfo.FirstName);
    $("#txtLastName").val(customerInfo.LastName);
    $("#txtMiddleName").val(customerInfo.MiddleName);
    $("#txtAddress1").val(customerInfo.CustomerAddressLine1);
    $("#txtCity").val(customerInfo.City);
    $("#selectStates").val(customerInfo.State);
    $("#txtZip").val(customerInfo.Zip);
    $("#txtPhone").val(customerInfo.CustomerPhone);
}

function DisplayVehicleFinancialInfo(vehicleFinancial) {
    // only display 0 and positive numbers - do not display negative numbers    
    $("#txtAmountFinanced").val(vehicleFinancial.AmountFinanced);
    $("#txtFinancedAPR").val(vehicleFinancial.FinancedAPR);
    $("#txtFinancedTermMonths").val(vehicleFinancial.FinancedTermMonths);
    $("#txtDealNumber").val(vehicleFinancial.DealNumber);
    $("#txtStockNumber").val(vehicleFinancial.StockNumber);
    $("#txtPurchasePrice").val(vehicleFinancial.PurchasePrice);
}

function SetSavedRateInfo(savedRate) {
    $("#txtSavedQuoteInfo").text(JSON.stringify(savedRate));
}

$(function () {
    $(".customer-info").validate({
        rules: {
            txtFirstName: "required",
            txtLastName: "required"            
        }
    });
});

$(function () {
    $(".vehicle-info").validate({
        rules: {
            txtOdometer: "required"
        }
    });
});

$(function () {
    $("#txtPhone").mask("(999) 999-9999");
    $("#txtCelPhone").mask("(999) 999-9999");
    //$("#txtOdometer").mask("999999");        
});

function IsLwUpgradeVisibleAndChecked() {
    try {
        var control = GetLwIsUpgradeControl();
        var isChecked = false;
        if ($(control).is(":checked"))
            isChecked = true;
    } catch (e) {
        console.log("IsLwUpgradeVisibleAndChecked " + e.message);
    }
    return isChecked;
}

function GetLwIsUpgradeControl() {
    var control = $("#chkIsUpgrade");
    return control;
}

function GetLwUpgradeProductControl() {
    var control = $("#selectLwUpgradeProduct");
    return control;
}

function GetLwUpgradeProductValue() {
    return $("#selectLwUpgradeProduct").val();
}