function setDatepickerLang() {

    if (chrome.i18n.getMessage("l")=="ru") {
        jQuery(function($){
    	$.datepicker.regional['ru'] = {
    		closeText: 'Закрыть',
    		prevText: '&#x3c;&#x3c; Предыдущий',
	       	nextText: 'Следующий &#x3e;&#x3e;',
	       	currentText: 'Сегодня',
	       	monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
	       	'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		    monthNamesShort: ['Январь','Февраль','Март','Апрель','Май','Июнь',
	       	'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	   	    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
	       	dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
	       	dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
	       	weekHeader: 'Нед',
	       	dateFormat: 'dd.mm.yy',
	       	firstDay: 1,
	       	isRTL: false,
	       	showMonthAfterYear: false,
		  yearSuffix: ''};
	    $.datepicker.setDefaults($.datepicker.regional['ru']);
        });
    };
    
    if (chrome.i18n.getMessage("l")=="zh_CN") {
        jQuery(function($){
	     $.datepicker.regional['zh-CN'] = {
		closeText: '关闭',
		prevText: '&#x3c;上月',
		nextText: '下月&#x3e;',
		currentText: '今天',
		monthNames: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一','二','三','四','五','六',
		'七','八','九','十','十一','十二'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		weekHeader: '周',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'};
	      $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
        });
    };
    
    if (chrome.i18n.getMessage("l")=="de") {
        jQuery(function($){
    	$.datepicker.regional['de'] = {
    		closeText: 'schließen',
    		prevText: '&#x3c;zurück',
    		nextText: 'Vor&#x3e;',
    		currentText: 'heute',
    		monthNames: ['Januar','Februar','März','April','Mai','Juni',
    		'Juli','August','September','Oktober','November','Dezember'],
    		monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
    		'Jul','Aug','Sep','Okt','Nov','Dez'],
    		dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    		dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    		dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    		weekHeader: 'Wo',
    		dateFormat: 'dd.mm.yy',
    		firstDay: 1,
    		isRTL: false,
    		showMonthAfterYear: false,
    		yearSuffix: ''};
    	$.datepicker.setDefaults($.datepicker.regional['de']);
        });
    };
    
    if (chrome.i18n.getMessage("l")=="pt_BR") {
        jQuery(function($){
    	$.datepicker.regional['pt-BR'] = {
    		closeText: 'Fechar',
    		prevText: '&#x3c;Anterior',
    		nextText: 'Pr&oacute;ximo&#x3e;',
    		currentText: 'Hoje',
    		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
    		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
    		'Jul','Ago','Set','Out','Nov','Dez'],
    		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','S&aacute;bado'],
    		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
    		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
    		weekHeader: 'Sm',
    		dateFormat: 'dd.mm.yy',
    		firstDay: 0,
    		isRTL: false,
    		showMonthAfterYear: false,
    		yearSuffix: ''};
    	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
        });
    };
    
    if (chrome.i18n.getMessage("l")=="pt_PT") {
        jQuery(function($){
    	$.datepicker.regional['pt'] = {
    		closeText: 'Fechar',
    		prevText: '&#x3c;Anterior',
    		nextText: 'Seguinte',
    		currentText: 'Hoje',
    		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
    		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
    		'Jul','Ago','Set','Out','Nov','Dez'],
    		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','S&aacute;bado'],
    		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
    		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b'],
    		weekHeader: 'Sem',
    		dateFormat: 'dd.mm.yy',
    		firstDay: 0,
    		isRTL: false,
    		showMonthAfterYear: false,
    		yearSuffix: ''};
    	$.datepicker.setDefaults($.datepicker.regional['pt']);
        });
    };
    
}