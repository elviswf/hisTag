var options = {
    //name: 'hcb',
    name: 'hc',
    obj: 0,
    tabHeight: [750,400,410,160], // массив с высотой для каждой вкладки
    
    /*Установить высоту*/
    setHeight: function(height) {
        this.obj.height(height);
    },
    
    /*выбрать вкладку №*/
    selectTab: function(num) {
        this.obj.tabs("select", num);
        this.setHeight(this.tabHeight[num]);
    },
    
    /*При загрузке страницы*/
    onLoadPage: function() {
        $(function() {
    		$( "#tabs" ).tabs({
    			select: function(event, ui) {
                    options.setHeight(options.tabHeight[ui.index]);
    			},
                create: function(event, ui) {
                    options.selectTab(0);
                }
    		});
    	});
        
        this.obj = $('#tabs');
        
        this.buttonSave1 = $('#buttonSave1');
        this.buttonSave2 = $('#buttonSave2');
        this.buttonClear1 = $('#buttonClear1');
        this.buttonClear2 = $('#buttonClear2');
        
        this.localize();
        
        this.loadOptions();
        
        this.getLocalesFile('ru');
        
        this.setCloseClickForHint('closeStar5', '.closeStar5', '.stars5');
        
        this.showHint();
            
        if (this.name=='hcb') {
            $('.stars5 a').attr('href', 'https://chrome.google.com/webstore/detail/jndhhfkgkmpbnepfodnmmigomenknlcg');
        } else {
            $('.stars5 a').attr('href', 'https://chrome.google.com/webstore/detail/ilfjhacjjbcdmimjeaakpnlhdcloijcg');
        };
        
        $('#selectLng').change(function() {
            getLocalesFile();
        });
        
        $('#buttonSave1').click(function() {
            options.saveBlackListUrl();
        });
        
        $('#buttonClear1').click(function() {
            options.clearBlackListUrl();
        });
        
        $('#buttonSave2').click(function() {
            options.saveBlackListCaption();
        });
        
        $('#buttonClear2').click(function() {
            options.clearBlackListCaption();
        });
        
        $('#selectDateType').change(function() {
            saveDateType();
        });
    },
    
    /*Назначение обработчика Close для подсказок*/
    setCloseClickForHint: function(localStorageName, className, parentClassName) {
        $(className).click(function () {
            $(parentClassName).fadeOut(500, function() {
                $(this).hide();
                localStorage[localStorageName] = true;
            });
        })
    },
    
    /*Показ подсказок*/
    showHint: function() {
        if (localStorage['closeStar5']!=undefined && localStorage['closeStar5']) {
            $('.stars5').hide();
        } else {
            $('.stars5').show();
        }
    },
    
    /*Загрузка перевода*/
    localize: function() {
        document.title = chrome.i18n.getMessage("titleOptions");
        $('#buttonSave1, #buttonSave2').val(chrome.i18n.getMessage("saveButton"));
        $('#buttonClear1, #buttonClear2').val(chrome.i18n.getMessage("delURLclear"));
        $('#i18n_blackList').text(chrome.i18n.getMessage("blackList"));
        $('p.attention').html(chrome.i18n.getMessage("i18n_blackListUrl_4"));
        $('#i18n_blackListUrl_1').text(chrome.i18n.getMessage("i18n_blackListUrl_1"));
        $('#i18n_blackListUrl_2').text(chrome.i18n.getMessage("i18n_blackListUrl_2"));
        $('#i18n_blackListUrl_3').text(chrome.i18n.getMessage("i18n_blackListUrl_3"));
        $('#i18n_blackListUrl_5').text(chrome.i18n.getMessage("i18n_blackListUrl_5"));
        $('#i18n_blackListUrl_6').text(chrome.i18n.getMessage("i18n_blackListUrl_6"));
        $('#i18n_blackListUrl_7').text(chrome.i18n.getMessage("i18n_blackListUrl_7"));
        $('#i18n_donate').text(chrome.i18n.getMessage("i18n_donate"));
        $('#i18n_donate_1').text(chrome.i18n.getMessage("i18n_donate_1"));
        $('#i18n_donate_2').text(chrome.i18n.getMessage("i18n_donate_2"));
        $('#i18n_donate_3').text(chrome.i18n.getMessage("i18n_donate_3"));
        $('#i18n_donate_4').text(chrome.i18n.getMessage("i18n_donate_4"));
        $('#i18n_donate_5').text(chrome.i18n.getMessage("i18n_donate_5"));
        $('#i18n_translate').text(chrome.i18n.getMessage("i18n_translate"));
        $('#i18n_translate_1').text(chrome.i18n.getMessage("i18n_translate_1"));
        $('#i18n_translate_2').text(chrome.i18n.getMessage("i18n_translate_2"));
        $('#i18n_translate_3').text(chrome.i18n.getMessage("i18n_translate_3"));
        $('#captionOptions').text(chrome.i18n.getMessage("captionOptions"));
        $('#i18n_translate_4').text(chrome.i18n.getMessage("i18n_translate_4"));
        $('.stars5 a').text(chrome.i18n.getMessage("stars5"));
        $('#i18n_caption_selectDateType').text(chrome.i18n.getMessage("i18n_caption_selectDateType"));
        $('#i18n_misc').text(chrome.i18n.getMessage("i18n_misc"));
    },
    
    /*Загрузка всех настроек*/
    loadOptions: function() {
        $('#BlackListUrl').val(localStorage["BlackListUrl"]);
        $('#BlackListCaption').val(localStorage["BlackListCaption"]);
        this.getDateType();
    },
    
    /*Обновление доступности кнопок*/
    buttonSave1: 0,
    buttonSave2: 0,
    buttonClear1: 0,
    buttonClear2: 0,
    updateButton: function() {
        if (localStorage["BlackListUrl"]==$('#BlackListUrl').val()) {
            this.buttonSave1.attr('disabled', 'disabled');
        } else {
            this.buttonSave1.removeAttr('disabled');
        }
        
        if ($('#BlackListUrl').val()=='') {
            this.buttonClear1.attr('disabled', 'disabled');
        } else {
            this.buttonClear1.removeAttr('disabled');
        }
        
        if (localStorage["BlackListCaption"]==$('#BlackListCaption').val()) {
            this.buttonSave2.attr('disabled', 'disabled');
        } else {
            this.buttonSave2.removeAttr('disabled');
        }
        
        if ($('#BlackListCaption').val()=='') {
            this.buttonClear2.attr('disabled', 'disabled');
        } else {
            this.buttonClear2.removeAttr('disabled');
        }
    },
    

    /*Сохранить черный список адресов*/
    saveBlackListUrl: function() {
        localStorage["BlackListUrl"] = $('#BlackListUrl').val();
    },
    
    /*Очистить черный список адресов*/
    clearBlackListUrl: function() {
        $('#BlackListUrl').val('');
        localStorage["BlackListUrl"] = '';
    },
    
    /*Получить черный список адресов в виде массива*/
    getBlackListUrl: function() {
        arr = localStorage["BlackListUrl"].split("\n");
        if (arr.length==1 && arr[0]=='') {
            return 0;
        } else {
            for (var i=0; i<arr.length; i++) {
                arr[i] = arr[i].toLocaleLowerCase();
            }
            return arr;
        }
    },
    
    
    /*Сохранить черный список заголовков*/
    saveBlackListCaption: function() {
        localStorage["BlackListCaption"] = $('#BlackListCaption').val();
    },
    
    /*Очистить черный список заголовков*/
    clearBlackListCaption: function() {
        $('#BlackListCaption').val('');
        localStorage["BlackListCaption"] = '';
    },
    
    /*Получить черный список заголовков в виде массива*/
    getBlackListCaption: function() {
        arr = localStorage["BlackListCaption"].split("\n");
        if (arr.length==1 && arr[0]=='') {
            return 0;
        } else {
            for (var i=0; i<arr.length; i++) {
                arr[i] = arr[i].toLocaleLowerCase();
            }
            return arr;
        }
    },
    
    /*Загрузка локализованого JSON-файла*/
    getLocalesFile: function(lng) {
        $.get("lng/"+lng+"/messages.json", function(data) {
            $('#jsonText').val(data);
        });
    },
    
    /*Сохранить формат даты*/
    saveDateType: function(DateType) {
        localStorage["viewDateType"] = DateType;
    },
    
    /*Загрузить формат даты*/
    getDateType: function() {
        $('#selectDateType').val(localStorage["viewDateType"]);
    }
}