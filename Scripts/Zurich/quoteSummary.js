$(document).ready(function() {
		var $quoteSummBtn = $('.quote-summary-button');
		var $rightPanel = $('.right-panel');
		var $rightPanelWidth = $rightPanel.width();
		
 	    $quoteSummBtn.click(function(e){
	      
	      var rightPanelPos = $rightPanel.css('right');
	      console.log(rightPanelPos);
	      
	      
	      $rightPanel.toggleClass('right-panel-closed');
		       
        });
});