/*---------------------Beginning application variable--------------------- */
var RATETRACK = {
    currentPanel: 'customer-panel', 
    previousPanel: 'customer-panel', 
    previousButton: null, 
    screenSpeed: 400, 
    panelSpeed: 200,
    initPanels: function (){
        $('.panel-screen').each(function(){
            $(this).hide();
        });
    },
    setPanel: function (){
        $('#' + this.previousPanel).hide();
        $('#' + this.currentPanel).show();
    },
    resetTabs: function (){
        var self = this;
        if(this.previousButton != null){
            var positionY;
            if($.browser.msie){
                positionY = this.previousButton.css('backgroundPositionY');
                this.previousButton.css('backgroundPosition', '0px ' + positionY);
            } else {
                positionY = this.previousButton.css('backgroundPosition').split(" ")[1];
                this.previousButton.css('backgroundPosition', '0px ' + positionY);
            }
        }
    },
    cache: function (){ //cached DOM variables prefixed with $
        this.$collapseExpandBtn = $('.product-header');
        this.$currentInfoSection = $('.vehicle-info');
        this.$dealjacket = $('#dealjacket');
        this.$dealjacketBtn = $('#dealjacket-btn');
        this.$editBtn = $('.edit-btn');
        this.$infoPanelContainer = $('#info-panel-container');
        this.$infoPanel = $('#info-panel');
        this.$infoDropDown = $('.info-drop-down');
        this.$infoCustomer = $('.info-customer a');
        this.$infoVehicle = $('.info-vehicle a');
        this.$infoDeal = $('.info-deal a');
        this.$infoNavSelected = $('.info-drop-down-nav .selected');
        this.$infoBarLinks = $('.info-summary a');
        this.$noQuotes = $('.no-quotes');
        this.$productAlt = $('.product:even');
        this.$panelClose = $('#panel-close');
        this.$panelSave = $('#panel-save');
        this.$page = $('.page');
        this.$products = $('.products');
        this.$productsInitTop = this.$products.css('top');
        this.$quote = $('#quote');
        this.$quoteBtn = $('#quote-btn');
        this.$quoteSummBtn = $('.quote-summary-button');
        this.$ratesTwoCol = $('#vsc .right .rates-table tr td a');
        this.$rates = $('.rates-table tr td a');
        this.$ratesTable = $('.rates-table');
        this.$saveQuotesBtn = $('.save-quotes-btn');
        this.$savedQuotesPopup = $('.quote-saved-popup-container');
        this.$savedQuotesContainer = $('.saved-quotes-container');
        this.$tableHeaderMonths = $('.table-header-months');
    },
    init: function (){
        var self = this; //TODO reason?
        this.cache();
        this.previousButton = null;
        this.$savedQuotesContainer.on('click', '.remove-quote-btn', function (e){
            var type,
                quoteToRemove,
                quote_class,
                selectedToRemove,
                unimportant,
                cell_color,
                highlight_class,
                highlight;
            e.preventDefault();
            e.stopImmediatePropagation();

            //hide close button
            $(this).css('display', 'none');

            //type of quote, saved to unselect later
            type = $(this).closest('.saved-quote').find(".quote-header").text().toLowerCase();
        
            quoteToRemove = $(this).closest('.saved-quote');
            //animate the quote rightwards off the screen and remove it after
            quoteToRemove.css('width', quoteToRemove.width() + "px"); //fix the width of the element so that it doesn't compress
            quoteToRemove.animate(
                {marginLeft: quoteToRemove.outerWidth(), opacity: '0.25'}, 
                500,
                function(){
                    $(this).remove();         
                    //if($('.saved-quotes-container').children().length <= 2)
                    var total = 0;
                    $('.quote-placeholder').each(function(){
                        if($(this).html() != ""){
                            total++;
                        }
                    });
                    if(total == 0){
                        $('.no-quotes').css('display', 'block');
                    }
                }
            );
            
            //unselect quote on grid
            quote_class = type + "-selected-cell";
            selectedToRemove = $("." + quote_class);
            unimportant = selectedToRemove.css('background-color').replace(' !important', '');
            cell_color = selectedToRemove.css('color');
            selectedToRemove.removeClass(quote_class);
            selectedToRemove.css({'background-color' : unimportant, 'color' : cell_color});
            selectedToRemove.animate({backgroundColor: "#FFFFFF", color: "#000000"}, 500, function(){
                selectedToRemove.parent().removeClass('rate-selected');
                selectedToRemove.css('background-color', '');
            });
            highlight_class = "grid-label-highlight-" + type;
            highlight = $('.' + highlight_class);
            highlight.animate({backgroundColor: "#FFFFFF"}, 500, function(){
                highlight.removeClass(highlight_class);
                highlight.css('background-color', '');
            });
        });
        this.$dealjacket.css({ 'left': $(window).width(), 'display': 'none' });
        this.$dealjacketBtn.click(function (){
            var offset = $(window).width();
            self.$quote.stop().animate({ left: -offset }, self.screenSpeed, function (){ self.$quote.css('display', 'none'); $('body').css('overflow-x', 'auto'); });
            self.$dealjacket.css({ 'display': 'block', 'left': $(window).width() }).stop().animate({ left: 0 }, self.screenSpeed, function (){ });
            $('body').css('overflow-x', 'hidden');
        });
        this.$quoteBtn.click(function (){
            var offset = $(window).width();
            self.$quote.stop().css('display', 'block').animate({ left: 0 }, self.screenSpeed, function (){ });
            self.$dealjacket.stop().animate({ left: $(window).width() }, self.screenSpeed, function (){ self.$dealjacket.css('display', 'none'); $('body').css('overflow-x', 'auto'); });
            $('body').css('overflow-x', 'hidden');
        });
        self.$collapseExpandBtn.click(function (e){
            e.preventDefault();
            var container = $(this).parent().parent().parent();
            container.find('.product-section').slideToggle(200);
            $(this).toggleClass('product-closed');
        });
        this.$editBtn.click(function (e){
            e.preventDefault();
            if(self.$page.css('top') <= '10px'){
                $(this).text('Close');
                $(this).addClass('info-close');
                self.$page.animate({ top: '+=230' }, 200, function (e){ });
                self.$editBtn.animate({ top: '+=231' }, 200, function (e){ });
                self.$infoDropDown.animate({ top: 18 }, 200, function (e){ });
            }else{
                $(this).text('Additional Info');
                $(this).removeClass('info-close');
                self.$page.animate({ top: self.$productsInitTop }, 200, function (e){ });
                self.$infoDropDown.animate({ top: '-=230' }, 200, function (e){ });
                self.$editBtn.animate({ top: '-=231' }, 200, function (e){ });
            }
        });
        function select(){
            var select_class = 'selected'
            self.$infoNavSelected.removeClass(select_class);
            self.$infoNavSelected = $(this).parent();
            $(this).parent().addClass(select_class);
            self.toggleInfoSection($(this));
        }
        this.$infoVehicle.click(select());
        this.$infoCustomer.click(select());
        this.$infoDeal.click(select());

        this.$infoBarLinks.click(function (e){
            var id;
            if(self.$page.css('top') <= '10px'){
                self.$page.animate({ top: '+=230' }, 200);
                self.$infoDropDown.animate({ top: 18 }, 200);
                self.$editBtn.animate({ top: '+=231' }, 200);
            }
            self.$editBtn.addClass('info-close');
            id = $(this).attr('id');
            if(id == 'info-bar-vin' || id == 'info-bar-date' || id == 'info-bar-mileage'){
                self.$infoVehicle.click();
            }else if(id == 'info-bar-customer'){
                self.$infoCustomer.click();
            }else{
                //console.log("couldn't match id:" + id);
            }
        });
        this.$saveQuotesBtn.click(function (e){
            e.preventDefault();
            self.$savedQuotesPopup.stop().fadeIn(200).delay(3000).fadeOut(300);
        });
        function fill(base, me){
            var class_to_remove = 'empty';
            base.text(me.val()).parent().removeClass(class_to_remove);
        }
        $("#txtFirstName").keyup(function (){
            fill("#info-bar-customer", $(this).val() + ' ' + $('#txtMiddleName').val() + ' ' + $('#txtLastName').val());
        });
        $("#txtMiddleName").keyup(function (){
            fill("#info-bar-customer", $('#txtFirstName').val() + ' ' + $(this).val() + ' ' + $('#txtLastName').val());
        });
        $("#txtLastName").keyup(function (){
            fill("#info-bar-customer", $('#txtFirstName').val() + ' ' + $('#txtMiddleName').val() + ' ' + $(this).val());
        });
        $("#txtDealNumber").keyup(function (){
            fill("#info-bar-deal", $(this));
        });
        $("#txtStockNumber").keyup(function (){
            fill("#info-bar-stock", $(this));
        });
        $("#txtOdometer").keyup(function (){
            fill("#info-bar-milage", $(this));
        });
        $("#selYears").change(function (){
            fill("#info-bar-year", $(this));
        });
        $("#selMakes").change(function (){
            fill("#info-bar-make", $("#selMakes :selected").text());
        });
        $("#selModels").change(function (){
            fill("#info-bar-model", $("#selModels :selected").text());
        });
        //vertically center "months" label
        var months_width = this.$tableHeaderMonths.width();
        this.$tableHeaderMonths.css("width", months_width + "px"); //dynamically assign width so it's not hard coded
        var container_height = $(".product-section.right.span9").height()/2;
        this.$tableHeaderMonths.css("top",  container_height - months_width/2 + "px");

        //stripe odd columns in the months/miles area
        $("tr td:not(.y-label):odd").addClass('table-column-stripe');

        //set first side column height to 100%
        $(".product-section.left").each(function(){
            $(this).height($(this).parent().height()+ 20 + "px");
        });
    },
    /* TODO: delete?
    removeSavedQuote: function (pTarget){
        var target = pTarget;
    },
    */
    toggleInfoSection: function (pBtn){
        var infoSection,
            newSection;
        try{
            this.$currentInfoSection.hide();
            infoSection = pBtn.parent().attr('class').split('-')[1].split(' ')[0];
            newSection = $('.' + infoSection + '-info');
            this.$currentInfoSection = newSection;
            newSection.show();
        }catch(e){
            //console.log("toggleInfoSection: " + e.message);
        }
        
    },
    setState: function (pType){
        this.$page.animate({ top: '+=230' }, 0, function (e){ });
        this.$infoDropDown.animate({ top: 18 }, 0, function (e){ });
        this.$editBtn.animate({ top: '+=231' }, 0, function (e){ });
    }
};
/*---------------------End of application variable--------------------- */

/*---------------------Start of jQuery.ready() ------------------------------*/
$(function (){ 
    RATETRACK.init();

    $("#txtDateOfSale").datepicker();
    $("#txtInServiceDate").datepicker();
    $("#txtFirstPaymentDate").datepicker();

    $("#selectCoverageLWENG").change(function(){});
    $("#chkIsUpgrade").change(function (){
        var vscContainer,
            lwPpvId;
        ClearVscRateAs();
        ClearVscCoverages();
        ClearVscDeductibles();
        if(IsLwUpgradeVisibleAndChecked()){
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);            
        }else{
            vscContainer = GetVscContainerByPpvId();
        }
        LoadVscCoveragesByContainer(vscContainer);
        LoadVscDeductiblesByContainer(vscContainer);        
        if(IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
        $("#linkVscNew").click(function (){
        ClearVscMessage();
        ClearVSCRates();
    });
    $("#linkVscUsed").click(function (){
        ClearVscMessage();
        ClearVSCRates();
        //ClearVscCoverages();
        //ClearVscDeductibles();
        //ClearVscCoverageTerms();

        FindCurrentVscProduct(true);

        if(IsVscInputValid())
            GetVscRates();
    });
    $("#selectVscProduct").change(function (){
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

        if(IsVscInputValid())
            GetVscRates();
    });
    $("#selectCompAddonProduct").change(function (){
        ClearCMNTRates();
        ClearCmntSettings();        
        var ppvId = GetCmntProductInfoValue();
        var container = GetCmntContainerByPpv(ppvId);
        var code = GetApplicationCodeTextFromContainer(container);
        ShowDivCompOnlySettings(code);
        CopyCmntSettingsFromContainerToUi(container);
        GetCmntRates();
    });
    $("#selectCompAddonSetting").change(function (){
        ClearCMNTRates();
        //ClearCmntSettings();
        var ppvId = GetCmntProductInfoValue();
        var container = GetCmntContainerByPpv(ppvId);
        //CopyCmntSettingsFromContainerToUi(container);
        GetCmntRates();
    });
    $("#selectVscCertified").change(function (){
        ClearVscMessage();
        ClearVSCRates();
        ClearVscCoverages();
        ClearVscDeductibles();
        ClearVscCoverageTerms();

        FindCurrentVscProduct(true);

        if(IsVscInputValid())
            GetVscRates();
    });
    $("#selectLimitedWarranty").change(function (){
        ClearVscMessage();
        ClearVSCRates();
        ClearVscCoverages();
        ClearVscDeductibles();

        LoadVscCoverages();
        LoadVscDeductibles();

        //FindCurrentVscProduct(false);

        if(IsVscInputValid())
            GetVscRates();
    });
        function getHeaderForCell(cell, type){
        return $(".mile-numbers-" + type).children().eq(cell.parent().index());
    }
    function getYLabelForCell(cell, type){
        return $(".side-labels tbody").children().eq(cell.parent().parent().index());
    }
    var type;
    var last_header;
    var last_y_label;
    var grey_class = "rates-table-label-grey";
    $(".rates-table a").hover(
        function(){
            var $rate = $(this);
            type = $rate.closest('.product').find('.product-header').text().toLowerCase();
            last_header = getHeaderForCell($rate, type);
            last_header.addClass(grey_class);
            //months label
            if(type == "vsc"){
                last_y_label = getYLabelForCell($rate, type);
                last_y_label.addClass(grey_class);
            }
        },
        function(){
            try{
                last_header.removeClass(grey_class);
                last_y_label.removeClass(grey_class);
            }catch(e){
                //console.log("couldn't remove grey label class(es)");
            }
        }
    );
    $(".rates-table").on('click', 'a', function (e){

        var $rate = $(this);
        var $product = $rate.closest('.product');
        var $rateTable = $rate.closest('.rates-table');
        var $productHeader = $product.find('.product-header');
        var $color = $productHeader.css('color');
        var type = $productHeader.text().toLowerCase(); //which type of quote is being selected/unselected (vsc or maintenance)
        var selectedRate = $rateTable.find('.rate-selected a');
        var quoteContainer = $('#' + type +'-quote-placeholder');//maintains order of quotes, was $('.saved-quotes-container');

        //clear the previous selections
        var grid_label_highlight_class = "grid-label-highlight-" + type;
        selectedRate.removeClass(type + '-selected-cell');
        $('.' + grid_label_highlight_class).removeClass(grid_label_highlight_class); //clear column highlights

        //highlight the x and y labels
        //miles label
        getHeaderForCell($rate, type).addClass(grid_label_highlight_class);
        //months label
        if(type == "vsc"){
            getYLabelForCell($rate, type).addClass(grid_label_highlight_class);
        }

        var productName = $productHeader.text();
        var quoteClass = 'saved-quote-' + $product.index(); 


        var quote = '<div class="saved-quote quote-to-save"><div class="quote-header vsc-quote-header">VSC</div><div class="row-fluid"><div class="span10"><h1 class="amount"><span class="right-panel-dollar">$</span>899.99</h1><span class="info-quote">48mo/60k mi.</span></div><div class="span2"><a href="#" class="remove-quote-btn">X</a></div></div></div>';
        /*"<div class="saved-quote quote-to-save">
                        <div class="quote-header vsc-quote-header">VSC</div>
                        <div class="row-fluid">
                            <div class="span10">
                                <h1 class="amount"><span class="right-panel-dollar">$</span>899.99</h1>
                                <span class="info-quote">48mo/60k mi.</span>
                            </div>
                            <div class="span2">
                                <a href="#" class="remove-quote-btn">X</a>
                            </div>
                        </div>
                    </div>";*/

        var quoteInfo = $rate.attr("alt");
        var termInfo = $rate.attr("id").split("_");

        if($rate.parent().hasClass('rate-selected')){
            var index = $product.index();
            var quoteToRemove = quoteContainer.find('.saved-quote-' + index);
            $(quoteToRemove).find('.remove-quote-btn').css('display', 'none');
            $(quoteToRemove).hide(200, function (e){
                $(quoteToRemove).remove();
                if($('.saved-quotes-container').children().length <= 2){
                       $('.no-quotes').css('display', 'block');
                }
            });
        } else {
            $('.no-quotes').css('display', 'none');
            $rate.parent().addClass('rate-selected');
            $rate.addClass(type + '-selected-cell');
            $rate.find('.dollar-sign').css({ 'color': '#fff' });
        }

        selectedRate.parent().removeClass('rate-selected');

        if($('.' + quoteClass).length > 0){
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

            quoteToAdd.show(200, function(e){
                $(this).find('.remove-quote-btn').css('display', 'inline-block');
            });
        }
    });
    $("#txtVin").blur(function (){
        ClearAllRates();
        var vin = $(this).val();
        // if the vin number is 17 characters, make the ajax call
        if(vin.length == 17){
            $.post(baseUrl + "/Service/GetByVin", { "vehicleIdentificationNumber": vin },
                function (data){

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
    $("#selYears").change(function (){
        LoadVehicleMakes();
        LoadVehicleModels();
    });
    $("#selMakes").change(function (){
        LoadVehicleModels();
    });
    $("#txtOdometer").blur(function (){
        ClearAllRates();
        if(IsOdometerValid){
            GetAvailableProducts();
        }
    });
    $("#txtAmountFinanced").blur(function (){
        ClearGapRates();
        GetGapRates();
    });
    $("#txtFinancedTermMonths").blur(function (){
        ClearGapRates();
        GetGapRates();
    });
    $("#txtFinancedAPR").blur(function (){
        ClearGapRates();
        GetGapRates();
    });
    $("#selectSaleType").change(function (){
        ClearGapRates();
        GetGapRates();
    });
        $("#selectCoverageVSC").change(function (){
        ClearVscMessage();
        ClearVSCRates();
        ClearVscDeductibles();

        //LoadVscDeductibles();

        //if(IsVscInputValid())
        //    GetVscRates();

        var vscContainer;
        var lwPpvId;
        if(IsLwUpgradeVisibleAndChecked()){
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);
        }
        else
            vscContainer = GetVscContainerByPpvId();

        //LoadVscCoveragesByContainer(vscContainer);
        LoadVscDeductiblesByContainer(vscContainer);
        if(IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
    $("#selectLwUpgradeProduct").change(function (){
        ClearVscMessage();
        ClearVSCRates();
        ClearVscCoverages();
        ClearVscDeductibles();        

        var vscContainer;
        var lwPpvId;
        if(IsLwUpgradeVisibleAndChecked()){
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);
        }
        else
            vscContainer = GetVscContainerByPpvId();

        LoadVscCoveragesByContainer(vscContainer);
        LoadVscDeductiblesByContainer(vscContainer);
        if(IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
    // VSC deductible selection change
    $("#selectDeductibleVSC").change(function (){
        ClearVscMessage();
        ClearVSCRates();
        //if(IsVscInputValid())
        //    GetVscRates();
        var vscContainer;
        var lwPpvId;
        if(IsLwUpgradeVisibleAndChecked()){
            lwPpvId = GetLWUpgradePpvId();
            vscContainer = GetVscContainerByPpv(lwPpvId);
        }
        else
            vscContainer = GetVscContainerByPpvId();

        //LoadVscCoveragesByContainer(vscContainer);
        //LoadVscDeductiblesByContainer(vscContainer);
        if(IsVscInputValidByContainer(vscContainer))
            GetVscRatesByContainer(vscContainer);
    });
    $("#selectCoverageSG").change(function (){
        ClearSecurityGuardRates();
        GetSecurityGuardRates();
    });
// tire wheel coverage selection change
    $("#selectTWCoverages").change(function (){
        ClearTireWheelRates();
        GetTireWheelRates();
    });
    $("#radioTWYes").click(function (){
        ClearTireWheelRates();
        GetTireWheelRates();
    });
    $("#radioTWNo").click(function (){
        ClearTireWheelRates();
        GetTireWheelRates();
    });
    // maintenance coverage selection change
    $("#selectCoverageMAINTENANCE").change(function (){
        ClearMaintenanceRates();
        GetMaintenanceRates();
    });
    // maintenance interval selection change
    $("#selectIntervalMAINTENANCE").change(function (){
        ClearMaintenanceRates();
        GetMaintenanceRates();
    });
        var div_class = "save-msg";
    function showMessage(text, type){
        var div = $("." + div_class);
        div.text(text);
        div.attr('class', div_class);
        if(type == "error"){
            div.addClass('save-msg-error');
        }else{
            div.addClass('save-msg-success');
        }
        //div.css('display', 'block');
        div.slideDown();
    }
    function hideMessage(){
        var div = $("." + div_class);
        div.slideUp();
    }
    $(".btn-cancel").click(function(){
        hideMessage();
    });
    $(".save-msg").click(function(){
        hideMessage();
    });
    $("#btnSaveQuote").click(function (){
        var customer = new CustomerInfo();
        var odometer = $("#txtOdometer").val();
        var rateInfo = "";
        var rateList = [];
        var newQuote;
        var termId;
        var dealInfo = new VehicleDealInfo();
        var dateOfSale = $("#txtDateOfSale").val();

        $(".quoteInfo").each(function (index){
            rateInfo = $(this).text();
            termId = $(this).siblings('input').text();
            newQuote = FilterRates($.parseJSON(rateInfo), termId);
            rateList.push(newQuote);
        });

        var errorMessage = "";

        if(rateList.length == 0)
            errorMessage += "Please select 1 or more quotes. ";
        if(customer.FirstName == "")
            errorMessage += "Please enter a first name. ";
        if(customer.LastName == "")
            errorMessage += "Please enter a last name. ";

        if(errorMessage == ""){

            $.post(baseUrl + "/Service/SaveRates", { "customerInfo": JSON.stringify(customer),
                "odometer": odometer,
                "rateList": JSON.stringify(rateList),
                "vehicleDealInfo": JSON.stringify(dealInfo),
                "dateOfSale": dateOfSale
            },
            function (data){
                //$("#selYears").clear();
                //$("#selMakes").clear();
                //$("#selModels").clear();
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

            try{
                if($("#txtViewStatus").val() == "2")
                    window.close();
            }catch(e){
                //console.log("error while trying to close window for menu integration " + e.message);
            }
        }else{
            showMessage(errorMessage, "error");
        }
    });
    var d = new Date();
    d = (d.getMonth() + 1) + '/' + (d.getDate()) + '/' + d.getFullYear();
    $("#txtDateOfSale").val(d);
    // Load vehicle years
    LoadVehicleYears();
    LoadVehicleMakes();
    //HideAllProducts();
    ShowAvailableProducts();
    LoadSavedQuote();
});
/*---------------------End of jQuery.ready() ------------------------------------------------------------------------*/

//var baseUrl = '/span3';
var baseUrl = '';

function ClearLWIsUpgrade(){
    var control;
    try{
        control = GetLwIsUpgradeControl();
        $(control).attr('checked', false);
    }catch(e){
        //console.log("ClearLWIsUpgrade " + e.message);
    }
}
/* TODO: delete?
function LoadLwUpgradeProductInfo(){
    try{
        // if we are rating a lw upgrade
        var loadLwUpgradeProducts = IsLwUpgradeVisibleAndChecked();

        // look for upgrade product id or flex field bag - upgrade to basic vsc
        //if(loadLwUpgradeProducts)
        //{
        //}
        // iterate master container and load vsc new and used
    }catch(e){
        //console.log("LoadLwUpgradeProductInfo " + e.message);        
    }    
}
*/
function ClearVscCoverageTerms(){
    $("#selectLimitedWarranty").clear();
}
function FindCurrentVscProduct(loadLwTerms){
    try{
        // find product code and sub code
        var rateAs = GetRateAsValue();
        var certified = GetCertifiedValue();
        var code = FindProductCode(rateAs, certified);

        // display lw terms
        if(loadLwTerms){
            if(code == "LW"){
                HideShowLWTermDiv(false);
                CopyLWTermsFromMasterContainer();
                //SyncLWCoverageAndDeductible();
            }
            else
                HideShowLWTermDiv(true);
        }

        // find vsc container

        if(code == "LW")
            ProcessLWProductData(code);
        else
            ProcessVscProductData(code);        

    }catch(e){
        //console.log("FindCurrentVscProduct " + e.message);
    }
}
function FindCurrentLWProduct(){
    try{
        // find product code and sub code
        var rateAs = GetRateAsValue();
        var certified = GetCertifiedValue();
        var code = FindProductCode(rateAs, certified);        

        // find vsc container

        if(code == "LW")
            ProcessLWProductData(code);
        else
            ProcessVscProductData(code);

    }catch(e){
        //console.log("FindCurrentVscProduct " + e.message);
    }
}
function ProcessLWProductData(code){
    // process lw coverage and deductible
    try{
        ProcessVscProductData("LW");
    }catch(e){
        //console.log("ProcessLWProduct LW " + e.message);
    }

    // process vsc new coverage and deductible
    try{
        ProcessVscProductData("NEW");
    }catch(ex){
        //console.log("ProcessLWProduct NEW " + ex.message);
    }        
}
function ProcessVscProductData(code){
    var vscContainer = GetVscContainerByCode(code);

    // display coverages
    CopyVscCoveragesFromContainerToUi(vscContainer, false);

    // display deductibles
    CopyVscDeductiblesFromContainerToUi(vscContainer);
}
function CopyLWTermsFromMasterContainer(){
    try{
        var lwTermSelect = GetLWTermSelectControl();
        var vscContainerCoverageSelect;
        var lwTermCollection = GetAllSelectTermFromMasterContainer();

        $.each(lwTermCollection, function (a, b){
            CopySelectControl($(b), lwTermSelect, false);
        });
    }catch(e){
        //console.log("CopyLWTermsFromMasterContainer " + e.message);
    }
}
function GetLWTermSelectControl(){
    var lwSelectControl = $("#selectLimitedWarranty");
    return lwSelectControl;
}
function GetLWTermValue(){
    var value = $("#selectLimitedWarranty :selected").val();
    return value;
}
function HideShowLWTermDiv(hide){
    var lwTermDiv = GetLWTermDiv();
    if(hide)
        lwTermDiv.hide();
    else
        lwTermDiv.show();
}
function GetLWTermDiv(){
    var div = $("#divLimitedWarranty");
    return div;
}
function ValidateInServiceDate(vscContainer){
    var inserviceInput;
    try{
        inserviceInput = GetVscIsInserviceRequired(vscContainer);
        SetVisibilityForDivInServiceDate(inserviceInput);
    }catch(e){
        //console.log("DisplayHideVscInServiceDate " + e.message);
    }
}
function IsValidInServiceDate(){
    var currentInServiceDate = $("#txtInServiceDate").datepicker("getDate");
    var isValid = false;
    if(currentInServiceDate)
        isValid = true;

    return isValid;
}
function DisplayHideVscInServiceDate(vscContainer){
    var inserviceInput;
    try{
        inserviceInput = GetVscIsInserviceRequired(vscContainer);
        SetVisibilityForDivInServiceDate(inserviceInput);
    }catch(e){
        //console.log("DisplayHideVscInServiceDate " + e.message);
    }
}
function SetVisibilityForDivInServiceDate(inserviceDateFlag){
    //var inserviceDateDiv = GetDivForInserviceDate();
    if(inserviceDateFlag.text() == "1" && !IsValidInServiceDate()){
        alert("in service date is a required field");
    }
}
function GetDivForInserviceDate(){
    var div = $("#divInServiceDate");
    return div;
}
function GetRateAsValue(){
    var value = "NEW";    
        
    try{
        var vscNewLink = GetVscRateNewLink();
        if(vscNewLink.hasClass("displayNone"))
            value = "USED";
    }catch(e){
        //console.log("GetRateAsValue " + e.message);
    }
    return value;
}
function GetCertifiedValue(){
    var val = "";

    try{
        val = $("#selectVscCertified :selected").val();
    }catch(e){
        //console.log("GetCertifiedValue " + e.message);
    }
    return val;
}
function FindProductCode(rateAsValue, certifiedValue){
    var productCode = "";

    try{
        if(certifiedValue == 1)
            productCode = "MCW";
        else if(certifiedValue == 2)
            productCode = "LW";        
        else productCode = rateAsValue;
    }catch(e){
        //console.log("FindProductCode " + e.message);
    }
    return productCode;
}
function GetLWProductCode(){
    var code = "LW",
        isNoUpgrade;
    try{
        // are we rating a no upgrade or upgrade?
        isNoUpgrade = IsNoUpgradeCoverage();
        if(!isNoUpgrade)
            code = "NEW";    
    }catch(e){
        //console.log("GetLWProductCode " + e.message);
    }
    return code;
}
function IsNoUpgradeCoverage(){
    var bol = false,
        vscCoverageText;
    try{
        vscCoverageText = GetSelectedTextVscCoverage();
        if(vscCoverageText == "No Upgrade")
            bol = true;
    }catch(e){
        //console.log("IsNoUpgradeCoverage " + e.message);
    }
    return bol;
}
function GetSelectedTextVscCoverage(){
    var text;
    try{
        text = $("#selectCoverageVSC :selected").text();    
    }catch(e){
        //console.log("GetSelectedTextVscCoverage " + e.message);    
    }
    return text;
}
function AreGapInputsValid(){
    var amountFinanced = IsPositiveNumber($("#txtAmountFinanced").val()),
        apr = IsANumber($("#txtFinancedAPR").val()),
        term = IsPositiveNumber($("#txtFinancedTermMonths").val());
    return (amountFinanced && apr && term);
}
function IsPositiveNumber(number){
    var num = parseInt(number, 10);
    return (!isNaN(num) && num > 0);
}
function IsANumber(number){
    var num = parseInt(number, 10);
    return (!isNaN(num));
}
function IsOdometerValid(){
    return IsPositiveNumber($("#txtOdometer").val());
}
function DisableVehicleYearMakeModel(){
    $("#selYears").attr("disabled", "disabled");
    $("#selMakes").attr("disabled", "disabled");
    $("#selModels").attr("disabled", "disabled");
}
function clearVehicleInfo(){}

function GetAvailableProducts(){
    var vin = $("#txtVin").val(),
        dateOfSale = $("#txtDateOfSale").val(),
        odometer = $("#txtOdometer").val();
    if(vin.length == 17 && IsOdometerValid()){
        $.post(baseUrl + "/Service/GetEligibleProducts", 
            {
                "vehicleIdentificationNumber": vin,
                "dateOfSale": dateOfSale,
                "odometer": odometer
            },
            function (data){
                ProcessProducts(data);
            }
        );
    }
}
function IsVinNumber17Characters(vin){
    return (vin && vin.length() == 17)
}
function ProcessProducts(products){
    var bGetVscRates = false,
        bGetCompAddonRates = false,
        bGetCmntRates = false;
    $.each(products, function (p, x){
        // process vsc products here
        if(IsAppCodeForVsc(x.ParentProductType.ApplicationCode)){
            ProcessVSCProduct(x);
            bGetVscRates = true;
        }else if(IsAppCodeForCompAddonGroup(x.ParentProductType.ApplicationCode)){// process complimentary, addon, and regular maintenance
            ProcessCmntGroup(x);
            bGetCmntRates = true;
        }else{
            ProcessCoverages(x.ParentProductType.ApplicationCode,
            x.ProductCoverages,
            x.ParentProductType.ApplicationSubCode);
            ProcessOptions(x.ParentProductType.ApplicationCode, x.ProductOptions);
        }
    });
    if(bGetVscRates && IsVscInputValid()){
        GetVscRates();    
    } 
    if(bGetCmntRates){
        GetCmntRates();
    }
    // process gap rates here
    GetGapRates();
    // if we have a saved quote, select coverage, deductible, options and rate here
    SelectEditQuote();
}
function DefaultRateAsToNewIfAvailable(){
    //var rateAsControl = GetVscRateAsControl();
    // todo select new if available
}
function GetRatesForAllProducts(){
    GetMaintenanceRates();
    //GetTireWheelRates();
    //GetSecurityGuardRates();
    //GetGapRates();
}
function SelectEditQuote(){
    var saveQuote,
        t;
    if($("#txtViewStatus").val() == "1"){
        // read value from hidden field
        saveQuote = $.parseJSON($("#txtSavedQuoteInfo").text());
        $.each(saveQuote, function (a, rate){
            try{
                ////console.log("before calling process edit");
                t = setTimeout(function (){ ProcessEditQuote(rate) }, 3000);
                /*
                //ProcessEditQuote(rate);
                var covList = [];
                covList.push(rate.RatedCoverage);
                ProcessCoverages(rate.RatedProduct.ParentProductType.ApplicationCode, covList);
                ProcessOptions(rate.RatedProduct.ParentProductType.ApplicationCode, rate.RatedProduct.ProductOptions);
                */
                ////console.log("after calling process edit");
            }catch(e){
                //console.log("error inside process edit " + e.message);
            }
        });
    }
}
function ProcessEditQuote(rate){
    var uiRateCount = 0,
        termId = FindTermId(rate);
        termSelector = "a[id^='" + termId + "']",
        serviceIntervalId,
        vscNew,
        vscUsed,
        rfValue;
    try{
        if(IsAppCodeForMaintenance(rate.RatedProduct.ParentProductType.ApplicationCode)){
            // choose coverage
            //MaintSavedRateUniqueId
            $("#selectCoverageMAINTENANCE").val($.trim(rate.RatedCoverage.InternalCoverageId));
            // choose option
            serviceIntervalId = FindMaintenanceIntervalId(rate);
            $("#selectIntervalMAINTENANCE").val($.trim(serviceIntervalId));
            //GetMaintenanceRates();
            // we should have the rates now
            // select saved rate here
            try{
                uiRateCount = $("#rowRetailPriceMAINTENANCE > td > a").length;
                ////console.log("maint rates inside Process edit quote " + uiRateCount);
                if(uiRateCount > 0)
                    $("#rowRetailPriceMAINTENANCE > td").find(termSelector).trigger("click");
            }catch(e){
                //console.log("issue with maint rates " + e.message);
            }
        }else if(IsAppCodeForVsc(rate.RatedProduct.ParentProductType.ApplicationCode)){
            vscNew = "NEW";
            vscUsed = "USED";
            //var rateAsControl = GetVscRateAsControl();
            //if(IsAppCodeForVscNew(rate.RatedProduct.ParentProductType.ApplicationCode))
                //$(rateAsControl).val(vscNew);
            //else
                //$(rateAsControl).val(vscUsed);
            $("#selectCoverageVSC").val($.trim(rate.RatedCoverage.InternalCoverageId));
            $("#selectDeductibleVSC").val(rate.RatedDeductible.InternalDeductibleId);
            uiRateCount = 0;
            try{
                uiRateCount = $("#tableRatesVSC > tbody > tr > td > a").length;
                ////console.log("vsc rates inside Process edit quote " + uiRateCount);
                if(uiRateCount > 0)
                    $("#tableRatesVSC > tbody > tr > td").find(termSelector).trigger("click");

            }catch(e){
                //console.log("issue with VSC rates " + e.message);
            }
        }else if(IsAppCodeForTW(rate.RatedProduct.ParentProductType.ApplicationCode)){
            $("#selectTWCoverages").val($.trim(rate.RatedCoverage.InternalCoverageId));
            uiRateCount = 0;
            rfValue = GetRunFlatValue(rate.RatedTerms[0]);
            DisplayRunFlatRadio(rfValue);
            try{
                uiRateCount = $("#rowRetailPriceTW > td > a").length;
                ////console.log("tw rates inside Process edit quote " + uiRateCount);
                if(uiRateCount > 0)
                    $("#rowRetailPriceTW > td").find(termSelector).trigger("click");

            }catch(e){
                //console.log("issue with tw rates " + e.message);
            }
        }else if(IsAppCodeForGAP(rate.RatedProduct.ParentProductType.ApplicationCode)){
            uiRateCount = 0;
            try{
                uiRateCount = $("#rowRetailPriceGAP > a").length;
                ////console.log("gap rates " + uiRateCount);
                if(uiRateCount > 0)
                    $("#rowRetailPriceGAP > a:first").click();

            }catch(ex){
                //console.log(" issue with gap rates " + ex.message);
            }
        }else if(IsAppCodeForSG(rate.RatedProduct.ParentProductType.ApplicationCode)){
            $("#selectCoverageSG").val($.trim(rate.RatedCoverage.InternalCoverageId));
            uiRateCount = 0;
            try{
                uiRateCount = $("#rowRetailPriceSG > a").length;
                ////console.log("sg rates " + uiRateCount);
                if(uiRateCount > 0)
                    $("#rowRetailPriceSG > a:first").click();

            }catch(ex){
                //console.log(" issue with sg rates " + ex.message);
            }
        }
    }catch(e){
        //console.log(e.message);
    }
}
function GetRunFlatValue(RatedTerm){
    var runflatValue = "False";
    try{
        if(RatedTerm && RatedTerm.PartnerSpecificFields && RatedTerm.PartnerSpecificFields.FlexFields){
            $.each(RatedTerm.PartnerSpecificFields.FlexFields, function (index, field){
                if(field.FieldName == "RUN_FLAT")
                    runflatValue = field.FieldValue;
            });
        }    
    }catch(e){
        //console.log("GetRunFlatValue " + e.message);
    }
    return runflatValue;    
}
function DisplayRunFlatRadio(runFlatValue){
    try{
        if(runFlatValue == "True")
            $("#radioTWYes").attr('checked', 'checked');
        else
            $("#radioTWNo").attr('checked', 'checked');
    }catch(e){
        //console.log("DisplayRunFlatRadio " + e.message);
    }
}
function FindMaintenanceIntervalId(rate){
    var id = 0;
    $.each(rate.RatedProduct.ProductOptions, function (a, b){
        id = b.DisplayName;
    });
    return id;
}
function FindPremiumId(rate){
    var id = 0;
    $.each(rate.RatedTerms, function (a, b){
        id = b.InternalPremiumId;
    });
    return id;
}
function FindTermId(rate){
    var id = 0;
    $.each(rate.RatedTerms, function (a, b){
        id = b.RatedTerm.InternalTermId;
    });
    return id;
}
function ProcessCoverages(productCode, coverageList, productSubCode){
    if(IsAppCodeForMaintenance(productCode)){
        $.each(coverageList, function (a, b){
            if(!IsOptionAvailable("selectCoverageMAINTENANCE", b.ProductCoverage.InternalCoverageId)){
                $("#selectCoverageMAINTENANCE").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.DisplayName + "</option>");
            }
        });
        // set the coverage id here for a saved quote
    }else if(IsAppCodeForTW(productCode)){
        $.each(coverageList, function (a, b){
            if(!IsOptionAvailable("selectTWCoverages", b.ProductCoverage.InternalCoverageId)){
                $("#selectTWCoverages").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.DisplayName + "</option>");
            }
        });
        GetTireWheelRates();
    }else if(IsAppCodeForSG(productCode)){
        $.each(coverageList, function (a, b){
            if(!IsOptionAvailable("selectCoverageSG", b.ProductCoverage.InternalCoverageId)){
                $("#selectCoverageSG").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.DisplayName + "</option>");
            }
        });
        GetSecurityGuardRates();
    }else if(productCode == "LWENG"){
        $.each(coverageList, function (a, b){
            $("#selectCoverageLWENG").append("<option value='" + b.ProductCoverage.InternalCoverageId + "'>" + b.ProductCoverage.Description + "</option>");
            // let's process deductibles here
            $.each(b.CoverageDeductibles, function (c, d){
                $("#selectDeductibleLWENG").append("<option value='" + d.ProductDeductible.InternalDeductibleId + "'>" + d.ProductDeductible.DisplayName + "</option>");
            });
        });
        GetLwEngineRates();
    }
}
function ProcessVscProductInfo(vscProduct){
    var selectVscProductInfoControl,
        selectLwUpgradeControl;
    try{
        selectVscProductInfoControl = GetVscProductInfoSelect();
        AppendOptionToSelectControl(selectVscProductInfoControl,
            vscProduct.ParentProductType.DisplayName,
            vscProduct.InternalProductVersionId);
        selectVscProductInfoControl.val(vscProduct.InternalProductVersionId);

        // process lw upgrade products here
        selectLwUpgradeControl = GetLwUpgradeProductControl();
        if(IsAppCodeForVscNew(vscProduct.ParentProductType.ApplicationCode) ||
            IsAppCodeForVscUsed(vscProduct.ParentProductType.ApplicationCode))
            AppendOptionToSelectControl(selectLwUpgradeControl,
            vscProduct.ParentProductType.DisplayName,
            vscProduct.InternalProductVersionId);
    }catch (e){
        //console.log("ProcessVscProductInfo " + e.message);
    }
}
function ProcessCmntGroupProductInfo(product){
    var selectCmntProductInfoControl;
    try{
        selectCmntProductInfoControl = GetCmntProductInfoSelect();
        AppendOptionToSelectControl(selectCmntProductInfoControl,
            product.ParentProductType.DisplayName,
            product.InternalProductVersionId);
        selectCmntProductInfoControl.val(product.InternalProductVersionId);       
    }catch(e){
        //console.log("ProcessCmntProductInfo " + e.message);
    }
}
function GetVscProductInfoSelect(){
    var control;
    try{
        control = $("#selectVscProduct");
    }catch(e){
        //console.log("GetVscProductInfoSelect " + e.message);
    }
    return control;    
}
function GetCmntProductInfoSelect(){
    var control;
    try{
        control = $("#selectCompAddonProduct");
    }catch(e){
        //console.log("GetCmntProductInfoSelect " + e.message);
    }
    return control;
}
function ProcessVSCProduct(vscProduct){
    // process vsc products, new, used, rental, lw st, lw long
    try{
        ProcessVscProductInfo(vscProduct);
    }catch (e){
        //console.log("ProcessVSCProduct failed to add product info " + e.message);
    }
    //var code = vscProduct.ParentProductType.ApplicationCode;
    //var sub_code = vscProduct.ParentProductType.ApplicationSubCode;

    // find vsc container for vsc product
    //var vscContainer = GetVscContainer(code, sub_code);

    // let's get the vsc container based on the product selected
    try{
        var vscContainer = SetupVscContainerInMasterTemplate(vscProduct);   
        //GetVscContainerByPpvId();
    }catch(ex){
        //console.log("ProcessVSCProduct failed to setup vsc container " + ex.message);
    } 
    
    // process rate as selection
    // todo - only needed for LW
    //ProcessVscRateAs(vscProduct);

    // process certified selection, zurich and mcw
    //try{
    //    var isInServiceDateRequired = ProcessVscCertified(vscProduct);
    //} catch (y){
    //    //console.log("ProcessVSCProduct isInServiceDateRequired" + y.message);    
    //}

//    // process in service date
    try{
        ProcessVscInServiceDate(vscProduct, vscContainer);
    }catch(a){
        //console.log("ProcessVSCProduct ProcessVscInServiceDate " + a.message);    
    }
//    // process coverages and deductibles
    try{
        ProcessVscCoverages(vscProduct, vscContainer);
    }catch(b){
        //console.log("ProcessVSCProduct ProcessVscCoverages " + b.message);    
    }

    try{
        ProcessVscApplicationCode(vscProduct, vscContainer) 
    } 
    catch (d){    
            //console.log("ProcessVSCProduct ProcessVscApplicationCode " + d.message);
    }
    
//    // process partner specific fields
//    try{
//        ProcessPartnerSpecificFields(vscProduct, vscContainer);
//    } catch (c){
//        //console.log("ProcessVSCProduct ProcessPartnerSpecificFields " + c.message);
//    }
}

function ProcessCmntGroup(product){
    // process complimentary, addon, and regular products
    try{
        ProcessCmntGroupProductInfo(product);
    }catch (e){
        //console.log("ProcessCmntGroup failed to add product info " + e.message);
    }

    try{
        var ppvId = GetCmntProductInfoValue();
        var container = GetCmntContainerByPpv(ppvId);
    }catch(ex){
        //console.log("ProcessCmntGroup failed to setup container " + ex.message);
    }
    
    try{
        ProcessCmntSetting(product, container);
    } catch (b){
        //console.log("ProcessCmntGroup setting " + b.message);
    }

    try{
        ProcessApplicationCode(product, container)
    }
    catch (d){
        //console.log("ProcessCmntGroup ProcessApplicationCode " + d.message);
    }    
}
function ProcessPartnerSpecificFields(product, container){
    var inputControl;
    try{
        inputControl = GetVscPartnerFieldInput(container);
        inputControl.text(JSON.stringify(product.PartnerSpecificFields));
    }catch(e){
        //console.log("ProcessPartnerSpecificFields " + e.message);
    }
}
function DisplayInvalidValueForInServiceDate(){
    //alert("in service date is required");
    $("#ulVscMessages").append("<li>Please provide a valid in service date.</li>");
}
function ClearVscMessage(){
    $("#ulVscMessages").clear();
}
function IsServiceDateRequiredFromContainer(vscContainer){
    var isRequired = false,
        inserviceInput;
    try{
        inserviceInput = GetVscIsInserviceRequired(vscContainer);
        if(inserviceInput.text() == "1")
            isRequired = true;
    }catch(e){
        //console.log("IsServiceDateRequiredFromContainer " + e.message);
    }
    return isRequired;
}

function ProcessVscInServiceDate(vscProduct, vscContainer){
    var inserviceInput,
        flag = "";
    try{
        if(vscProduct.IsInserviceRequired){
            flag = "1";
            inserviceInput = GetVscIsInserviceRequired(vscContainer);
            inserviceInput.text(flag);
        }
    }catch(e){
        //console.log("ProcessVscInServiceDate " + e.message);
    }
    return flag;
}

function ProcessVscApplicationCode(vscProduct, vscContainer){
    try{
            var input = GetVscApplicationCodeInput(vscContainer);
            input.text(vscProduct.ParentProductType.ApplicationCode);        
    }catch(e){
        //console.log("ProcessVscApplicationCode " + e.message);
    }
}
function ProcessApplicationCode(product, container){
    try{
        var input = GetApplicationCodeInputFromContainer(container);
        input.text(product.ParentProductType.ApplicationCode);
    }catch(e){
        //console.log("ProcessApplicationCode " + e.message);
    }
}
function LoadVscDeductibles(){
    try{
        // get current container
        var vscContainer = GetCurrentVscContainer();
        CopyVscDeductiblesFromContainerToUi(vscContainer);
    }catch(e){
    //console.log("LoadVscDeductibles " + e.message);
    }
}
function LoadVscDeductiblesByContainer(container){
    try{
        CopyVscDeductiblesFromContainerToUi(container);
    }catch(e){
        //console.log("LoadVscDeductiblesByContainer " + e.message);
    }
}
function LoadVscCoverages(){
    try{
        // get current container
        var vscContainer = GetCurrentVscContainer();
        CopyVscCoveragesFromContainerToUi(vscContainer, true);
        //HideShowLWDiv(vscContainer);
    }catch(e){
        //console.log("LoadVscCoverages " + e.message);
    }
}
function LoadVscCoveragesByContainer(container){
    try{
        CopyVscCoveragesFromContainerToUi(container, true);
    }catch(e){
        //console.log("LoadVscCoveragesByContainer " + e.message);
    }
}
function HideShowLWDiv(vscContainer){
    var hide = true,
        lwSelectControl;
    try{
        lwSelectControl = GetVscTermSelect(vscContainer);
        if($(lwSelectControl).find("option").length > 0)
            hide = false;
        HideShowLWTermDiv(hide);       
    }catch(e){
        //console.log("HideShowLWDiv " + e.message);
    }    
}
function GetCurrentVscContainer(){
    var currentContainer;
    try{
        //var rateAs = GetRateAsValue();
        //var certified = GetCertifiedValue();
        // find product code 
        //var code = FindProductCode(rateAs, certified);
        // for lw, we can have upgrade and no upgrade
        //if(code == "LW")
        //    code = GetLWProductCode();
        currentContainer = GetVscContainerByPpvId(); 
        //GetVscContainerByCode(code);    
    }catch(e){
        //console.log("GetCurrentVscContainer " + e.message);
    }
    return currentContainer;
}
function GetVscContainer(code, subCode){
    var idSelector = "#",
        idName = "divVscTemplate_" + code + "_" + subCode,
        vscSelector = idSelector + idName,
        template = $(vscSelector),
        vscMasterContainer;
    //if($.isEmptyObject(template))
    //if(typeof template == "undefined")
    if(template.length == 0){
        template = $("#divVscTemplate").clone();
        template.attr('id', idName);
        vscMasterContainer = $("#divVscMasterContainer");
        template.appendTo(vscMasterContainer);
    }
    return template;
}
function GetVscContainerByPpvId(){
    var idSelector = "#",
        ppvId = GetVscProductInfoValue(),
        idName = "divVscTemplate_" + ppvId,
        vscSelector = idSelector + idName,
        template = $(vscSelector),
        vscMasterContainer;
    try{
        if(template.length == 0){
            ////console.log("0 found now clone and append");
            template = $("#divVscTemplate").clone();
            template.attr('id', idName);
            vscMasterContainer = $("#divVscMasterContainer");
            template.appendTo(vscMasterContainer);
        }
        return template;
    }catch(e){
        //console.log("GetVscContainerByPpvId " + e.message);
    }
}
function GetVscContainerByPpv(ppvId){
    var idSelector = "#",
        idName = "divVscTemplate_" + ppvId,
        vscSelector = idSelector + idName,
        template = $(vscSelector),
        vscMasterContainer;
    try{
        if(template.length == 0){
            template = $("#divVscTemplate").clone();
            template.attr('id', idName);
            vscMasterContainer = $("#divVscMasterContainer");
            template.appendTo(vscMasterContainer);
        }
        return template;
    }catch(e){
        //console.log("GetVscContainerByPpvId " + e.message);
    }
}
function GetCmntContainerByPpv(ppvId){
    var idSelector = "#",
        idName = "divCmntTemplate_" + ppvId,
        selector = idSelector + idName,
        template = $(selector),
        masterContainer;
    try{
        if(template.length == 0){
            template = $("#divCmntTemplate").clone();
            template.attr('id', idName);
            masterContainer = $("#divCmntMasterContainer");
            template.appendTo(masterContainer);
        }
        return template;
    }catch(e){
        //console.log("GetCmntContainerByPpv " + e.message);
    }
}
function GetLWUpgradePpvId(){
    var ppvId = 0;
    try{
        // isUpgrade flag must be checked
        // now get the ppv id from list
        if(IsLwUpgradeVisibleAndChecked())
            ppvId = GetLwUpgradeProductValue();            
    }catch(e){
        //console.log("GetLWUpgradePpvId " + e.message);
    }
    return ppvId;
}
function SetupVscContainerInMasterTemplate(vscProduct){
    var idSelector;
    try{
        idSelector = "#",
        ppvId = vscProduct.InternalProductVersionId,
        idName = "divVscTemplate_" + ppvId,
        vscSelector = idSelector + idName,
        template = $(vscSelector),
        vscMasterContainer;
        if(template.length == 0){
            ////console.log("0 found now clone and append");
            template = $("#divVscTemplate").clone();
            template.attr('id', idName);
            vscMasterContainer = $("#divVscMasterContainer");
            template.appendTo(vscMasterContainer);
        }
        return template;
    }catch(e){
        //console.log("SetupVscContainerInMasterTemplate " + e.message);
    }
}
function GetVscProductInfoValue(){
    var value;
    try{
        value = $("#selectVscProduct :selected").val();
        //GetVscProductInfoSelect().val();
        return value;
    }catch(e){
        //console.log("GetVscProductInfoValue " + e.message);
    }        
}
function GetCmntProductInfoValue(){
    var value;
    try{
        value = $("#selectCompAddonProduct :selected").val();
        return value;
    }catch(e){
        //console.log("GetCmntProductInfoValue " + e.message);
    }        
}
function GetAllSelectTermFromMasterContainer(){
    var selectCol;
    try{
        selectCol = $("#divVscMasterContainer").find(".selectTerm");
    }catch(e){
        //console.log("GetAllSelectTermFromMasterContainer " + e.message);
    }
    return selectCol;
}
function GetVscContainerByCode(code){
    var filter = "divVscTemplate_" + code,
        vscContainer;
    if(code == "LW")
        vscContainer = GetLWContainerByTermId();
    else {
        try{
            vscContainer = $("div[id^='" + filter + "']");
            ////console.log("vsc container count " + vscContainer.length);    
        }catch(e){
            //console.log("GetVscContainerByCode " + e.message);
        }
    }
    return vscContainer;
}
function GetVscContainerByPpvIdOld(ppvId){
    var filter = "divVscTemplate_" + ppvId,
        vscContainer;
    try{
        vscContainer = $("div[id^='" + filter + "']");
        ////console.log("vsc container count " + vscContainer.length);    
        }catch(e){
            //console.log("GetVscContainerByCode " + e.message);
        }
    return vscContainer;
}
function GetLWContainerByTermId(){
    var lwContainer,
        lwTermValue,
        lwSelectCollection;
    try{
        lwTermValue = GetLWTermValue();
        lwSelectCollection = GetAllSelectTermFromMasterContainer();
        $.each(lwSelectCollection, function (a, b){
            $.each(b.options, function (c, d){
                if(d.value == lwTermValue)
                    lwContainer = d.parentNode.parentNode;            
            });
        });
    }catch(e){
        //console.log("GetLWContainerByTermId " + e.message);
    }
    return lwContainer;
}
function ProcessVscCoverages(vscProduct, vscContainer){
    var coverageControl = GetVscCoverageSelect(vscContainer);
    $.each(vscProduct.ProductCoverages, function (a, b){
        AppendOptionToSelectControl(coverageControl, b.ProductCoverage.DisplayName, b.ProductCoverage.InternalCoverageId);
        //process deductibles here
        ProcessVscDeductibles(vscContainer, b);
        // process coverage terms here
        ProcessVscTerms(vscContainer, b);
    });
    // copy coverages from container to UI
    CopyVscCoveragesFromContainerToUi(vscContainer, true);    
}
function ProcessVscTerms(vscContainer, coverage){
    var hide = false,
        termControl;
    try{
        if(coverage.ProductTerms){
            termControl = GetVscTermSelect(vscContainer);
            hide = false;
            $.each(coverage.ProductTerms, function (index, ProductTerm){
                AppendOptionToSelectControl(termControl, ProductTerm.ProductTerm.DisplayName, ProductTerm.ProductTerm.InternalTermId);
            });
        }
        // hide or show lw term
        HideShowLWTermDiv(hide);
    }catch(e){
        //console.log("ProcessVscTerms " + e.message);
    }
}
function CopyVscCoveragesFromContainerToUi(vscContainer, removeTargetOptions){
    var vscUiCoverageSelect = GetVscUiCoverageControl(),
        vscContainerCoverageSelect = GetVscCoverageSelect(vscContainer);
    CopySelectControl(vscContainerCoverageSelect, vscUiCoverageSelect, removeTargetOptions);
}
function ProcessCmntSetting(product, container){
    var settingControl = GetCmntSettingSelect(container),
        uiSelectControl;
    $.each(product.ProductCoverages, function (a, b){
        AppendOptionToSelectControl(settingControl, b.ProductCoverage.DisplayName, b.ProductCoverage.InternalCoverageId);
    });
    ClearCmntSettings();
    CopyCmntSettingsFromContainerToUi(container);
    if(IsAppCodeForCMNT(product.ParentProductType.ApplicationCode)){
        uiSelectControl = GetComplimentaryOnlySelectSetting();
        CopyCmntOnlySettingsFromContainerToUi(container, uiSelectControl);
    }
    ShowDivCompOnlySettings(product.ParentProductType.ApplicationCode);
}
function ShowDivCompOnlySettings(code){
    var show = false,
        div;
    if(IsAppCodeForAddon(code)){
        show = true;
    }
    div = $("#divComplimentaryOnlySetting");
    if(show){
        if(div.hasClass("displayNone"))
            div.removeClass("displayNone");
    }
    else if(!div.hasClass("displayNone"))
        div.addClass("displayNone");    
}
function CopyCmntSettingsFromContainerToUi(container){
    var uiCmntSettingSelect = GetUiCmntSettingSelect(),
        containerSettingSelect = GetCmntSettingSelect(container);
    CopySelectControl(containerSettingSelect, uiCmntSettingSelect, false);
}

function CopyCmntOnlySettingsFromContainerToUi(container, uiSelectControl){
    var containerSettingSelect = GetCmntSettingSelect(container);
    CopySelectControl(containerSettingSelect, uiSelectControl, false);
}
function ClearCmntSettings(){
    $("#selectCompAddonSetting").clear();
}
function GetComplimentaryOnlySelectSetting(){
    return $("#selectComplimentarySetting");
}
function GetUiCmntSettingSelect()
{
    return $("#selectCompAddonSetting");
}
function GetCmntSettingValue(){
    return $("#selectCompAddonSetting").val();
}
function CopySelectControl(source, target, removeOptions){
    try{
        // remove existing options
        if(removeOptions){
            ClearOptions(target);
        }
        // clone options
        var options = $(source[0].options).clone();
        // append options to target
        target.append(options);
    }catch(e){
        //console.log("copy select control error " + e.message);
    }
}
function ClearOptions(selectControl){
    selectControl.clear();
}
function GetVscUiCoverageControl(){
    return $("#selectCoverageVSC"); //vscUiCoverageControl
}
function GetVscCoverageSelect(vscContainer){
    return $(vscContainer).find('.selectVscCoverage'); //selectControl
}
function GetCmntSettingSelect(container){
    return $(container).find('.selectCmntSetting'); //selectControl
}
function GetVscApplicationCodeInput(vscContainer){
    return $(vscContainer).find('.ApplicationCode'); //inputControl
}
function GetApplicationCodeInputFromContainer(container){
    return $(container).find('.ApplicationCode'); //inputControl
}
function GetVscTermSelect(vscContainer){
    return $(vscContainer).find('.selectTerm'); //selectControl
}
function GetVscDeductibleSelect(vscContainer){
    return $(vscContainer).find('.selectVscDeductible'); //selectControl
}
function GetVscPartnerFieldInput(vscContainer){
    return $(vscContainer).find('.PartnerSpecificFields'); //control
}
function GetVscIsInserviceRequired(vscContainer){
    var inputControl;
    try{
        inputControl = $(vscContainer).find('.IsInserviceRequired');
    }catch(e){
        //console.log("GetVscIsInserviceRequired " + e.message);
    }
    return inputControl;
}
function GetVscUiDeductibleControl(){
    return $("#selectDeductibleVSC"); //vscUiDeductibleControl
}
function ProcessVscDeductibles(vscContainer, deductible){
    var deductibleControl = GetVscDeductibleSelect(vscContainer);
    $.each(deductible.CoverageDeductibles, function (c, d){
        AppendOptionToSelectControl(deductibleControl, d.ProductDeductible.DisplayName, d.ProductDeductible.InternalDeductibleId);
    });
    CopyVscDeductiblesFromContainerToUi(vscContainer);
}
function CopyVscDeductiblesFromContainerToUi(vscContainer){
    var vscUiDeductibleSelect = GetVscUiDeductibleControl(),
        vscContainerDeductibleSelect = GetVscDeductibleSelect(vscContainer);
    CopySelectControl(vscContainerDeductibleSelect, vscUiDeductibleSelect, true);
}
function ProcessVscCertified(vscProduct){
    var mcw = "Manufacturer",
        lw = "Zurich",
        certifiedControl = GetVscCertifiedControl();
    AppendOptionToSelectControl(certifiedControl, "None", "0");
    if(IsAppCodeForMCW(vscProduct.ParentProductType.ApplicationCode)){
        AppendOptionToSelectControl(certifiedControl, mcw, "1");
    }else if(IsAppCodeForLW(vscProduct.ParentProductType.ApplicationCode)){
        AppendOptionToSelectControl(certifiedControl, lw, "2");
    }
}
function GetVscCertifiedControl(){
    return $("#selectVscCertified"); //certifiedControl
}
function GetVscRateAsControl(){
    return $("#selRateAs"); //control
}
function GetVscRateNewLink(){
    return $("#linkVscNew"); //control
}
function GetVscRateUsedLink(){
    return $("#linkVscUsed"); //control
}
function ProcessVscRateAs(vscProduct){
    var newRateAs = "NEW",
        usedRateAs = "USED",
        vscNewLink,
        vscUsedLink;
    try{
        if(IsAppCodeForVscNew(vscProduct.ParentProductType.ApplicationCode) ||
            vscProduct.IsNewCoverage){
            vscNewLink = GetVscRateNewLink();
            if(vscNewLink.hasClass('displayNone')){
                vscNewLink.removeClass('displayNone');
            }
        }else if(IsAppCodeForVscUsed(vscProduct.ParentProductType.ApplicationCode)){
            vscUsedLink = GetVscRateUsedLink();
            if(vscUsedLink.hasClass('displayNone')){
                vscUsedLink.removeClass('displayNone');
            }
        }
    }catch(e){
        //console.log('ProcessVscRateAs ' + e.message);
    }    
}
function ProcessOptions(productCode, optionList){
    if(IsAppCodeForMaintenance(productCode)){
        // let's process the options here
        $.each(optionList, function (a, b){
            if(!IsOptionAvailable("selectIntervalMAINTENANCE", b.DisplayName)){
                $("#selectIntervalMAINTENANCE").append("<option value='" + b.DisplayName + "'>" + b.DisplayName + "</option>");
            }
        });
        // set the interval here from the saved quote
        // get maintenance rates
        GetMaintenanceRates();
    }
}
function OpenProductSection(productLink){
    if(productLink.hasClass("product-closed")){
        productLink.click();
    }
}
function IsVscInputValid(){
    var isValid = false,
        vscContainer,
        isRequired;
    try{
        vscContainer = GetCurrentVscContainer(); 
        isRequired = false;
        isRequired = IsServiceDateRequiredFromContainer(vscContainer);
        if(isRequired){
            if(IsValidInServiceDate())
                isValid = true;
            else DisplayInvalidValueForInServiceDate();
        }else{
            isValid = true;
        }
    }catch(e){
        //console.log("IsVscInputValid " + e.message);
    }
    return isValid;
}
function IsVscInputValidByContainer(container){
    var isValid = false,
        isRequired = false;
    try{
        isRequired = IsServiceDateRequiredFromContainer(container);
        if(isRequired){
            if(IsValidInServiceDate())
                isValid = true;
            else DisplayInvalidValueForInServiceDate();
        }else{
            isValid = true
        };
    }catch(e){
        //console.log("IsVscInputValidByContainer " + e.message);
    }
    return isValid;
}
function GetVscRates(){
    var code,
        coverageId;
    try{
        OpenProductSection($("#vsc-header"));
        //var rateAs = GetRateAsValue();
        //var certifiedOption = GetCertifiedValue();
        // get the correct code, new, used, mcw
        code = GetVscProductCode(); 
        //FindProductCode(rateAs, certifiedOption);
        //if(code == "LW")
        //    code = GetLWProductCode();
        coverageId = GetVscSelectedCoverageId();
        GetRatesByProductCodeAndCoverage(code, "0", coverageId);
    }catch(e){
        //console.log("GetVscRates " + e.message);
    }
}
function GetCmntRates(){
    var ppvId,
        coverageId;
    try{
        OpenProductSection($("#complimentary-maint-header"));
        ppvId = GetCmntProductInfoValue();
        coverageId = GetCmntSettingValue();
        GetRatesByPpvId(ppvId, coverageId);
    }catch(e){
        //console.log("GetCmntRates " + e.message);
    }
}
function GetVscRatesByContainer(container){
    var code,
        coverageId;
    try{
        OpenProductSection($("#vsc-header"));
        code = GetVscProductCodeByContainer(container);
        coverageId = GetVscSelectedCoverageId();
        GetRatesByProductCodeAndCoverage(code, "0", coverageId);
    }catch(e){
        //console.log("GetVscRatesByContainer " + e.message);
    }
}
function GetVscProductCode(){
    var code,
        vscContainer;
    try{
        vscContainer = GetVscContainerByPpvId();
        code = $(vscContainer).find('.ApplicationCode').text();
        ////console.log("inside GetVscProductCode " + code);
    }catch(e){
        //console.log("GetVscProductCode " + e.message);
    }
    return code;
}
function GetApplicationCodeTextFromContainer(container){
    var code;
    try{
        code = $(container).find('.ApplicationCode').text();
    }catch(e){
        //console.log("GetApplicationCodeTextFromContainer " + e.message);
    }
    return code;
}
function GetVscProductCodeByContainer(container){
    var code;
    try{
        code = $(container).find('.ApplicationCode').text();
    }catch(e){
        //console.log("GetVscProductCodeByContainer " + e.message);
    }
    return code;
}
function GetMaintenanceRates(){
    var code= "MAINTENANCE",
        coverageId;
    OpenProductSection($("#maintenance-header"));
    coverageId = GetMaintSelectedCoverageId();
    GetRatesByProductCodeAndCoverage(code, "0", coverageId);
}
function GetSecurityGuardRates(){
    var code = "SG",
        coverageId;
    OpenProductSection($("#securityguard-header"));
    coverageId = GetSgSelectedCoverageId();
    GetRatesByProductCodeAndCoverage(code, "0", coverageId);
}

function GetGapRates(){
    var code = "GAP";
    OpenProductSection($("#gap-header"));
    if(AreGapInputsValid()){
        $("#divGapWarningContainer").hide();
        GetRatesByProductCodeAndCoverage(code, "", "");
    }else {
        $("#divGapWarningContainer").show();
    }
}
function GetTireWheelRates(){
    var code,
        runFlatValue,
        coverageId;
    OpenProductSection($("#tire-and-wheel-header"));
    code = "TW";
    runFlatValue = GetRunFlatTireValue();
    coverageId = GetTWSelectedCoverageId();
    GetRatesByProductCodeAndCoverage(code, runFlatValue, coverageId);
}
function GetLwEngineRates(){
    var code = "LWENG";
    OpenProductSection($("#lwengine-header"));
    GetRatesByProductCodeAndCoverage(code, "", "");
}

function GetRatesByProductCodeAndCoverage(code, runFlatTireValue, coverageId){
    var dateOfSale = $("#txtDateOfSale").val(),
        odometer = $("#txtOdometer").val(),
        productCode = code,
        dealInfo = new VehicleDealInfo(),
        baseNoUpgradePpvId = GetBaseNoUpgradePpvId();

    $.post(baseUrl + "/Service/GetRates",
        {   "odometer": odometer,
            "dateOfSale": dateOfSale,
            "productCode": productCode,
            "vehicleDealInfo": JSON.stringify(dealInfo),
            "isRunFlatTire": runFlatTireValue,
            "coverageId": coverageId,
            "baseNoUpgradePpvId": baseNoUpgradePpvId
        },
        function (data){
            $.each(data, function (c, d){
                ProcessRates(d);
            });
        });   
}
function GetRatesByPpvId(ppvId, coverageId){
    var dateOfSale = $("#txtDateOfSale").val(),
        odometer = $("#txtOdometer").val(),
        dealInfo = new VehicleDealInfo();
    //var productCode = code;
    //var baseNoUpgradePpvId = GetBaseNoUpgradePpvId();
    $.post(baseUrl + "/Service/GetRatesByPpvId",
        {
            "odometer": odometer,
            "dateOfSale": dateOfSale,
            "vehicleDealInfo": JSON.stringify(dealInfo),
            "ppvId": ppvId,
            "coverageId": coverageId
        },
        function (data){
            $.each(data, function (c, d){
                ProcessRates(d);
            });
        });
}
function GetBaseNoUpgradePpvId(){
    var ppvId = "";
    try{
        if(IsLwUpgradeVisibleAndChecked())
            ppvId = GetVscProductInfoValue();
    }catch(e){
        //console.log("GetBaseNoUpgradePpvId " + e.message);
    }
    return ppvId;
}
function getCoverageId(type){
    return $("#select" + type + " :selected").val();
}
function GetSgSelectedCoverageId(){
    return getCoverageId("CoverageSG");  
}
function GetVscSelectedCoverageId(){
    return getCoverageId("CoverageVSC");
}
function GetMaintSelectedCoverageId(){
    return getCoverageId("CoverageMAINTENANCE");
}
function GetTWSelectedCoverageId(){
    return getCoverageId("TWCoverages");
}
function GetRunFlatTireValue(){
    var isRunFlat = "0";
    try{
        isRunFlat = $("#radioTWYes:checked").val();
        if(typeof isRunFlat == "undefined")
            isRunFlat = "0";
    }catch(e){
        //console.log("failed to get run flat value " + e.message);
    }
    return isRunFlat;
}
function ClearMaintenanceRates(){
    $("#rowHeadingMAINTENANCE").clear();
    $("#rowRetailPriceMAINTENANCE").clear();
}
function ClearSecurityGuardRates(){
    $("#rowHeadingSG").clear();
    $("#rowRetailPriceSG").clear();
}
function ClearGapRates(){
    $("#rowHeadingGAP").clear();
    $("#rowRetailPriceGAP").clear();
}
function ClearTireWheelRates(){
    $("#rowHeadingTW").clear();
    $("#rowRetailPriceTW").clear();
}
function ClearVSCRates(){
    //$("#rowHeadingVSC").clear();
    $("#tableRatesVSC").clear();
}
function ClearCMNTRates(){
    $("#rowHeadingCMNT").clear();
    $("#rowRetailPriceCMNT").clear();
}
function ClearLWEngineRates(){
    $("#rowHeadingLWENG").clear();
    $("#rowRetailPriceLWENG").clear();
}
function ClearCompMaintRates(){
    $("#rowHeadingCMNT").clear();
    $("#rowRetailPriceCMNT").clear();
}
function ClearAllRates(){
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
function ClearVscProductInfo(){
    $("#selectVscProduct").clear();
}
function ClearSaveQuoteInfo(){
    $(".saved-quote").remove();
}
function ClearMaintenanceInputs(){
    $("#selectCoverageMAINTENANCE").clear();
    $("#selectIntervalMAINTENANCE").clear();
}
function ClearCmntAddonInputs(){
    $("#selectCompAddonProduct").clear();
    $("#selectCompAddonSetting").clear();
    $("#divCmntMasterContainer").clear();
}
function ClearLWEngineInputs(){
    $("#selectCoverageLWENG").clear();
    $("#selectDeductibleLWENG").clear();
}
function ClearTireWheelInputs(){
    $("#selectTWCoverages").clear();
}
function ClearSecurityGuardInputs(){
    $("#selectCoverageSG").clear();
}
function ClearVSCInputs(){
    ClearVscRateAs();
    ClearVscCertified();
    ClearVscCoverages();
    ClearVscDeductibles();
    ClearVscCoverageTerms();
    ClearVscContainerData();
    ClearVscMessage();
}
function ClearVscRateAs(){
    //var control = GetVscRateAsControl();
    //$(control).clear();
}
function ClearVscCertified(){
    $("#selectVscCertified").clear();
}
function ClearVscContainerData(){
    $("#divVscMasterContainer").clear();
}
function ClearVscCoverages(){
    $("#selectCoverageVSC").clear();
}
function ClearVscDeductibles(){
    $("#selectDeductibleVSC").clear();
}
function ProcessRates(rateList){
    var selectedCoverage,
        selectedInterval,
        selectedDeductible,
        monthLabel = " months",
        months = {},
        miles = {},
        vscTerm,
        vscTermList = [],
        saleType,
        v,
        tdId,
        row,
        tableRowTermMileage,
        tableDataPrice,
        tdSelector;

    if(IsAppCodeForMaintenance(rateList.RatedProduct.ParentProductType.ApplicationCode)){
        selectedCoverage = $("#selectCoverageMAINTENANCE :selected").val();
        selectedInterval = $("#selectIntervalMAINTENANCE :selected").val();
        if(rateList.RatedCoverage.InternalCoverageId == selectedCoverage){
            $.each(rateList.RatedProduct.ProductOptions, function (y, z){
                if(z.DisplayName == selectedInterval){
                    $.each(rateList.RatedTerms, function (o, p){
                        $("#rowHeadingMAINTENANCE").append("<th>" + p.RatedTerm.TermMonths + " months</th>");
                        $("#rowRetailPriceMAINTENANCE").append("<td><a class='" + p.RatedTerm.InternalTermId + "' id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.TermMonths + monthLabel + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
                    });
                }
            });
            $("#rowRetailPriceMAINTENANCE > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }else if(IsAppCodeForTW(rateList.RatedProduct.ParentProductType.ApplicationCode)){
        selectedCoverage = $("#selectTWCoverages :selected").val();
        if(rateList.RatedCoverage.InternalCoverageId == selectedCoverage){
            $("#rowHeadingTW").clear();
            $("#rowRetailPriceTW").clear();
            $.each(rateList.RatedTerms, function (o, p){
                $("#rowHeadingTW").append("<th>" + p.RatedTerm.TermMonths + " months</th>");
                $("#rowRetailPriceTW").append("<td><a id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.TermMonths + monthLabel + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
            });
            $("#rowRetailPriceTW > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }else if(IsAppCodeForSG(rateList.RatedProduct.ParentProductType.ApplicationCode)){
        selectedCoverage = $("#selectCoverageSG :selected").val();
        if(rateList.RatedCoverage.InternalCoverageId == selectedCoverage){
            $.each(rateList.RatedTerms, function (o, p){
                $("#rowHeadingSG").append("<span>" + p.RatedTerm.DisplayName + "</span>");
                $("#rowRetailPriceSG").append("<a id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.DisplayName + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a>");
            });
            $("#rowRetailPriceSG > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }else if(IsAppCodeForGAP(rateList.RatedProduct.ParentProductType.ApplicationCode)){
        saleType = $("#selectSaleType :selected").text() + " GAP";
        $.each(rateList.RatedTerms, function (o, p){
            $("#rowRetailPriceGAP").append("<a id='" + p.RatedTerm.InternalTermId + "_" + saleType + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a>");
            $("#gapSaleType").text(saleType);
        });

        $("#rowRetailPriceGAP > a").formatCurrency({ roundToDecimalPlace: -2 });
    }else if(IsAppCodeForCompAddonGroup(rateList.RatedProduct.ParentProductType.ApplicationCode)){
        selectedCoverage = GetCmntSettingValue();
        //if(rateList.RatedCoverage.InternalCoverageId == selectedCoverage){
            $.each(rateList.RatedTerms, function (o, p){
                $("#rowHeadingCMNT").append("<th>" + p.RatedTerm.DisplayName + " months</th>");
                $("#rowRetailPriceCMNT").append("<td><a class='" + p.RatedTerm.InternalTermId + "' id='" + p.RatedTerm.InternalTermId + "_" + p.RatedTerm.DisplayName + monthLabel + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
            });
            $("#rowRetailPriceCMNT > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        //}
    }else if(IsAppCodeForVsc(rateList.RatedProduct.ParentProductType.ApplicationCode)){
        selectedCoverage = $("#selectCoverageVSC :selected").val();
        selectedDeductible = $("#selectDeductibleVSC :selected").val();
        months = {};
        miles = {};
        vscTerm;
        vscTermList = [];
        if(rateList.RatedCoverage.InternalCoverageId == selectedCoverage &&
                rateList.RatedDeductible.InternalDeductibleId == selectedDeductible){
            $.each(rateList.RatedTerms, function (o, p){
                v = new VscTermRate();
                v.RetailCost = p.RetailCost;
                v.TermMiles = p.RatedTerm.TermMiles;
                v.TermMonths = p.RatedTerm.TermMonths;
                v.InternalTermId = p.RatedTerm.InternalTermId;
                vscTermList.push(v);

                if(!months[p.RatedTerm.TermMonths])
                    months[p.RatedTerm.TermMonths] = true;

                if(!miles[p.RatedTerm.TermMiles])
                    miles[p.RatedTerm.TermMiles] = true;
            });

            // sort term months and miles
            vscTermList.sort();

            // loop thru vscTermList to create the grid
            tdId = "td";
            row;

            // create top row with term months
            $("#tableRatesVSC").clear();
            $("#tableRatesVSC").append("<tr id='tr0'><tr>");
            row = $("#tableRatesVSC tr:last-child");
            row.append("<td>&nbsp;</td>");
            $.each(months, function (a, b){
                row.append("<td id=" + tdId + a + ">" + a + "</td>");
            });

            // create rows with term mileage
            tableRowTermMileage;
            $.each(miles, function (c, d){
                tableRowTermMileage = GetTableRowForTermMile(c, months);
                $("#tableRatesVSC").append(tableRowTermMileage);
            });

            // iterate vscTermList and display retail cost 
            $.each(vscTermList, function (i, val){
                tdSelector = ".td_" + val.TermMiles + "_" + val.TermMonths;
                tableDataPrice = $(tdSelector);
                tableDataPrice.attr("id", val.InternalTermId + "_" + val.TermMonths + "/" + val.TermMiles);
                tableDataPrice.attr("alt", JSON.stringify(rateList));
                tableDataPrice.text(val.RetailCost);
            });
            $("#tableRatesVSC > tbody > tr > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }
    else if(rateList.RatedProduct.ParentProductType.ApplicationCode == "LWENG"){
        selectedCoverage = $("#selectCoverageLWENG :selected").val();
        selectedDeductible = $("#selectDeductibleLWENG :selected").val();
        months = {};
        if(rateList.RatedCoverage.InternalCoverageId == selectedCoverage &&
                rateList.RatedDeductible.InternalDeductibleId == selectedDeductible){
            $.each(rateList.RatedTerms, function (o, p){
                if(months[p.RatedTerm.DisplayName]) {
                    //console.log('duplicate month');
                } else {
                    months[p.RatedTerm.DisplayName] = true;
                    $("#rowHeadingLWENG").append("<td>" + p.RatedTerm.DisplayName + "</td>");
                    $("#rowRetailPriceLWENG").append("<td><a id='" + p.RatedTerm.InternalTermId + "_" + " " + "' alt='" + JSON.stringify(rateList) + "' href=\"#\">" + p.RetailCost + "</a></td>");
                }
            });
            $("#rowRetailPriceLWENG > td > a").formatCurrency({ roundToDecimalPlace: -2 });
        }
    }
}
function HideAllProducts(){
    //$("#divContainerVSC").hide();
    //$("#divContainerMAINTENANCE").hide();
    //$("#divContainerTireWheel").hide();
    //$("#divContainerGap").hide();
    //$("#divContainerComplimentary").hide();
    //$("#divContainerSecurityGuard").hide();
    //$("#divContainerLWENG").hide();
}
function ShowAvailableProducts(){
    // call service to get available products
    try{
        $.post(baseUrl + "/Service/GetDealerProfileProducts",
        { "profileDate": $("#txtDateOfSale").val() },
            function (data){
                HideShowDealerProducts(data);
            });
    }catch(e){
        //console.log("ShowAvailableProducts " + e.message);
    }    
}

function HideShowDealerProducts(productCollection){
    var hideVsc = true,
        hideTW = true,
        hideMaint = true,
        hideGap = true,
        hideSg = true,
        hideCompMaint = true,
        hideLWEngine = true;

    try{
        $.each(productCollection, function (index, product){
            if(IsAppCodeForVsc(product.Value.Product.ProductCode))
                hideVsc = false;
            else if(IsAppCodeForTW(product.Value.Product.ProductCode))
                hideTW = false;
            else if(IsAppCodeForMaintenance(product.Value.Product.ProductCode))
                hideMaint = false;
            else if(IsAppCodeForGAP(product.Value.Product.ProductCode))
                hideGap = false;
            else if(IsAppCodeForSG(product.Value.Product.ProductCode))
                hideSg = false;
            else if(IsAppCodeForCompAddonGroup(product.Value.Product.ProductCode))
                hideCompMaint = false;
            else if(IsAppCodeForLWENG(product.Value.Product.ProductCode))
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
            
    }catch(e){
        //console.log("HideShowDealerProducts " + e.message);
    }
}
function HideProductContainer(productCode, hide){
    try{
        if(hide){
            if(IsAppCodeForVsc(productCode))
                $("#divContainerVSC").hide();
            else if(IsAppCodeForMaintenance(productCode))
                $("#divContainerMAINTENANCE").hide();
            else if(IsAppCodeForTW(productCode))
                $("#divContainerTireWheel").hide();
            else if(IsAppCodeForSG(productCode))
                $("#divContainerSecurityGuard").hide();
            else if(IsAppCodeForGAP(productCode))
                $("#divContainerGap").hide();
            else if(IsAppCodeForLWENG(productCode))
                $("#divContainerLWENG").hide();
            else if(IsAppCodeForCMNT(productCode))
                $("#divContainerComplimentary").hide();
        }
    }catch(e){
        //console.log("HideProductContainer " + e.message);
    }    
}
function LoadVehicleYears(){
    /*
    var request = $.ajax({
    type: "POST",
    url: baseUrl + "/Service/GetModelYears"
    });
            
    request.done(function (data){
    $.each(data, function (c, d){
    $("#selYears").append("<option value='" + d + "'>" + d + "</option>");
    });
    });

    request.fail(function (jqXHR, textStatus){
    //console.log("request failed for LoadVehicleYears: " + textStatus);
    });
    */


    //TODO - why post for a get service?
    $.post(baseUrl + "/Service/GetModelYears",
            function (data){
                $.each(data, function (c, d){
                    $("#selYears").append("<option value='" + d + "'>" + d + "</option>");
                });
            });
}
function LoadVehicleMakes(){
    var vehicleYear = GetVehicleYearValue(true);
    $("#selMakes").html('');
    $.post(baseUrl + "/Service/GetVehicleMakes",
            { "vehicleYear": vehicleYear },
            function (data){
                $.each(data, function (c, d){
                    $("#selMakes").append("<option value='" + d.InternalMakeId + "'>" + d.MakeName + "</option>");
                });
            });
}

function GetVehicleYearValue(returnDefaultValue){
    var vehicleYear = $("#selYears :selected").val();
    if(returnDefaultValue && typeof vehicleYear == "undefined")
        vehicleYear = "2013";
    return vehicleYear;
}
function GetVehicleMakeValue(returnDefaultValue){
    var makeId = $("#selMakes :selected").val();
    if(returnDefaultValue && typeof makeId == "undefined")
        makeId = "1";
    return makeId;
}
function LoadVehicleModels(){
    var vehicleYear = GetVehicleYearValue(true);
    var makeId = GetVehicleMakeValue(true);

    $("#selModels").clear();

    $.post(baseUrl + "/Service/GetVehicleModels",
        { "vehicleYear": vehicleYear, "makeId": makeId },
            function (data){
                $.each(data, function (c, d){
                    $("#selModels").append("<option value='" + d.InternalModelId + "'>" + d.BaseName + "</option>");
                });
            }
        );
}

function CustomerInfo(){
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

function VehicleDealInfo(){
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

function QuoteRate(){
    this.CoverageId = "";
    this.DeductibleId = "";
    this.ServiceInterval = "";
    this.TermId = "";
    this.InternalProductVersionId = "";    
}
function FilterRates(rates, termId){
    var quoteRate; 
    try{
        quoteRate = new QuoteRate();
        quoteRate.InternalProductVersionId = rates.RatedProduct.InternalProductVersionId;
        quoteRate.TermId = termId;
        //quoteRate.RunFlat = "0";
        if(rates.RatedCoverage)
            quoteRate.CoverageId = rates.RatedCoverage.InternalCoverageId;
        if(rates.RatedDeductible)
            quoteRate.DeductibleId = rates.RatedDeductible.InternalDeductibleId;
        if(rates.RatedProduct.ProductOptions){
            $.each(rates.RatedProduct.ProductOptions, function (i, option){
                quoteRate.ServiceInterval = option.DisplayName;
            });
        }
//        var currentRate;
//        if(rates.RatedTerms){
//            currentRate = rates.RatedTerms[0];
//            if(currentRate && currentRate.PartnerSpecificFields && currentRate.PartnerSpecificFields.FlexFields){
//                $.each(currentRate.PartnerSpecificFields.FlexFields, function (index, field){
//                    if(field.FieldName == "RUN_FLAT" && field.FieldValue == "True")
//                        quoteRate.RunFlat = "1";
//                });
//            }
//        }
    }catch(e){
    //console.log("FilterRates " + e.message);
    }
    return quoteRate;
}
function VscTermRate(){
    this.TermMonths = "";
    this.TermMiles = "";
    this.RetailCost = "";
    this.InternalTermId = "";
}
// class to hold key value objects for deductible, coverage, options
function ObjectKeyValue(){
    this.Key = "";
    this.Value = "";
}
function ProductGroup(){
    this.Coverages = new ObjectKeyValue();
    this.Deductibles = new ObjectKeyValue();
}
function IsOptionAvailable(controlId, value){
    var select = "#" + controlId + " > option",
        options = $(select);
    $.each(options, function (a, b){
        if(value == b.value)
            return true;
    });
    return false;
}
function AddOptionToSelectControl(selectControl, text, value){
    var select = "#" + selectControl;
    if(!IsOptionAvailable(selectControl, value)){
        $(select).append("<option value='" + value + "'>" + text + "</option>");
    }
}
function AppendOptionToSelectControl(jquerySelect, text, value){
    if(!IsOptionAvailableByValue(jquerySelect, text, value))
        $(jquerySelect).append("<option value='" + value + "'>" + text + "</option>");
}
function IsOptionAvailableByValue(selectControl, text, value){
    $.each(selectControl[0].options, function (a, b){
        if(value == b.value)
            return true;
    });
    return false;
}
function AddOptionToJquerySelectControl(jquerySelect, text, value){
    var options = $(jquerySelect + ' > option');
    AppendOptionToSelectControl(jquerySelect, text, value);
}
function GetTableRowForTermMile(termMileage, termMonthArray){
    var tr,
        trBegin = "<tr><td>" + termMileage + "</td>",
        trEnd = "</tr>",
        td = "",
        id = "";
    $.each(termMonthArray, function (a, b){
        td += "<td><a href='#' class='" + "td_" + termMileage + "_" + a + "'></a></td>";
    });
    tr = trBegin + td + trEnd;
    return tr;
}
function IsAppCodeForLW(ApplicationCode){
    if(ApplicationCode == "LW")
        return true;
    return false;
}
function IsAppCodeForMCW(ApplicationCode){
    if(ApplicationCode == "MCW")
        return true;
    return false;
}
function IsAppCodeForVsc(ApplicationCode){
    if(ApplicationCode == "USED" ||
        ApplicationCode == "COMBO" ||
        ApplicationCode == "LW" ||
        ApplicationCode == "MCW" ||
        ApplicationCode == "RENTAL PLUS" ||
        ApplicationCode == "SELECT COMP" ||
        ApplicationCode == "NEW")
        return true;
    return false;
}
function IsAppCodeForVscNew(ApplicationCode){
    if(ApplicationCode == "NEW")
        return true
    return false;
}
function IsAppCodeForVscUsed(ApplicationCode){
    if(ApplicationCode == "USED")
        return true;
    return false;
}
function IsAppSubCodeForVscNew(ApplicationSubCode){
    if(ApplicationSubCode == "NEW")
        return true;
    return false;
}
function IsAppSubCodeForVscUsed(ApplicationSubCode){
    if(ApplicationSubCode == "USED")
        return true;
    return false;
}
function IsAppCodeForMaintenance(ApplicationCode){
    if(ApplicationCode == "MAINTENANCE")
        return true;
    return false;
}
function IsAppCodeForSG(ApplicationCode){
    if(ApplicationCode == "SG")
        return true;
    return false;
}
function IsAppCodeForGAP(ApplicationCode){
    if(ApplicationCode == "GAP")
        return true;
    return false;
}
function IsAppCodeForTW(ApplicationCode){
    if(ApplicationCode == "TW")
        return true;
    return false;
}
function IsAppCodeForLWENG(ApplicationCode){
    if(ApplicationCode == "LWENG")
        return true;
    return false;
}
function IsAppCodeForCMNT(ApplicationCode){
    if(ApplicationCode == "CMNT")
        return true;
    return false;
}
function IsAppCodeForCompAddonGroup(ApplicationCode){
    if(ApplicationCode == "CMNT" ||
        ApplicationCode == "AMNT" ||
        ApplicationCode == "REGULAR")
        return true;
    return false;
}
function IsAppCodeForAddon(ApplicationCode){
    if(ApplicationCode == "AMNT") 
        return true;
    return false;
}
function LoadSavedQuote(){
    if($("#txtViewStatus").val() == "1"){
        $.post(baseUrl + "/Service/RetrieveSavedQuote",
        function (data){
            if(data.Odometer)
                DisplayOdometer(data.Odometer);
            if(data.CustomerInfo)
                DisplayCustomerInfo(data.CustomerInfo);
            if(data.VehicleDealInfo)
                DisplayVehicleFinancialInfo(data.VehicleDealInfo);
            if(data.VehicleRates)
                SetSavedRateInfo(data.VehicleRates);
            if(data.VehicleModel)
                DisplayVehicleInfo(data.VehicleModel);
        });
    }else if($("#txtViewStatus").val() == "2"){// menu integration request
        $.post(baseUrl + "/Service/RetrieveIntegratedQuote",
        function (data){
            if(data.Odometer)
                DisplayOdometer(data.Odometer);
            if(data.CustomerInfo)
                DisplayCustomerInfo(data.CustomerInfo);
            if(data.VehicleDealInfo)
                DisplayVehicleFinancialInfo(data.VehicleDealInfo);            
            if(data.VehicleModel)
                DisplayVehicleInfo(data.VehicleModel);
        });
    }
}
function DisplayVehicleInfo(vehicleModel){
    $("#txtVin").val(vehicleModel.OriginalVehicleIdentification);
    $("#txtVin").blur();
}
function DisplayOdometer(odometer){
    $("#txtOdometer").val(odometer);
    //$("#txtOdometer").blur();
}
function DisplayCustomerInfo(customerInfo){
    $("#txtFirstName").val(customerInfo.FirstName);
    $("#txtLastName").val(customerInfo.LastName);
    $("#txtMiddleName").val(customerInfo.MiddleName);
    $("#txtAddress1").val(customerInfo.CustomerAddressLine1);
    $("#txtCity").val(customerInfo.City);
    $("#selectStates").val(customerInfo.State);
    $("#txtZip").val(customerInfo.Zip);
    $("#txtPhone").val(customerInfo.CustomerPhone);
}
function DisplayVehicleFinancialInfo(vehicleFinancial){
    // only display 0 and positive numbers - do not display negative numbers    
    $("#txtAmountFinanced").val(vehicleFinancial.AmountFinanced);
    $("#txtFinancedAPR").val(vehicleFinancial.FinancedAPR);
    $("#txtFinancedTermMonths").val(vehicleFinancial.FinancedTermMonths);
    $("#txtDealNumber").val(vehicleFinancial.DealNumber);
    $("#txtStockNumber").val(vehicleFinancial.StockNumber);
    $("#txtPurchasePrice").val(vehicleFinancial.PurchasePrice);
}
function SetSavedRateInfo(savedRate){
    $("#txtSavedQuoteInfo").text(JSON.stringify(savedRate));
}
$(function (){
    $(".customer-info").validate({
        rules: {
            txtFirstName: "required",
            txtLastName: "required"            
        }
    });
    $(".vehicle-info").validate({
        rules: {
            txtOdometer: "required"
        }
    });
    $("#txtPhone").mask("(999) 999-9999");
    $("#txtCelPhone").mask("(999) 999-9999");
    //$("#txtOdometer").mask("999999");        
});
function IsLwUpgradeVisibleAndChecked(){
    var control;
    try{
        control = GetLwIsUpgradeControl();
        if($(control).is(":checked"))
            return true;
    }catch(e){
        //console.log("IsLwUpgradeVisibleAndChecked " + e.message);
    }
    return false;
}
function GetLwIsUpgradeControl(){
    return $("#chkIsUpgrade"); //control
}
function GetLwUpgradeProductControl(){
    return $("#selectLwUpgradeProduct"); //control
}
function GetLwUpgradeProductValue(){
    return $("#selectLwUpgradeProduct").val();
}