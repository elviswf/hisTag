const adw = [

    {
        all: {
            src: '1all.jpg',
            link: 'http://c.cpl1.ru/8z4k',
        },
        
        ru: {
            src: '1ru.jpg',
            link: 'http://c.cpl1.ru/8z8m'
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '2.jpg',
            link: 'http://c.cpl1.ru/8z9a',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '15.gif',
            link: 'http://c.cpl1.ru/8zb2',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '7.gif',
            link: 'http://c.cpl1.ru/8z9Z',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '10.jpg',
            link: 'http://c.cpl1.ru/8zap'
        },
        
        zh_CN: {
            notUse: true
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '11.gif',
            link: 'http://c.cpl1.ru/8zax',
            only: {
                ru: true,
                uk: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '9.jpg',
            link: 'http://c.cpl1.ru/8zan',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '4.gif',
            link: 'http://c.cpl1.ru/8z9Q',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '8.jpg',
            link: 'http://c.cpl1.ru/8za6',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '13.jpg',
            link: 'http://bvlgari.best-gooods.ru?ref=12846&lnk=32858',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '16.png',
            link: 'http://c.cpl1.ru/8zb4',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '3.jpg',
            link: 'http://c.cpl1.ru/8z9h',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '14.jpg',
            link: 'http://holst.best-gooods.ru/?ref=12846&lnk=32860',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '12.png',
            link: 'http://c.cpl1.ru/8zaB',
            only: {
                ru: true,
                uk: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '17.gif',
            link: 'http://c.cpl1.ru/8zb5',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '5.gif',
            link: 'http://c.cpl1.ru/8z9U',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    },
    
    {
        all: {
            src: '6.gif',
            link: 'http://c.cpl1.ru/8z9X',
            only: {
                ru: true
            }
        },
        
        getBaner: function() {
            return getGlobalBaner(this);
        }
    }

]


var lngChrome = chrome.i18n.getMessage("@@ui_locale");

if (localStorage["countBaner"]==undefined) localStorage["countBaner"] = -2;

function setBaner() {
    var c = localStorage["countBaner"];
    c++;
    if ( c > adw.length - 1 ) c = 0;
    localStorage["countBaner"] = c;
    
    if ( adw[c] != undefined ) {
        r = adw[c].getBaner();
    }
    
    if ( adw[c] == undefined || !r ) {
        setBaner();
    }
}

function getGlobalBaner(obj) {
    var src = obj.all.src;
    var link = obj.all.link;
    var notContinue = false;
    
    if ( obj.all.only != undefined ) {
        
        if ( obj.all.only[lngChrome] == undefined ) {
            notContinue = true;
            src = 'hide';
            link = '';
        }
        
    }
    
    if ( !notContinue ) {
        
        if ( obj[lngChrome] != undefined ) {
            
            if ( obj[lngChrome].notUse != undefined ) {
                src = 'hide';
                link = '';
            } else {
                src = obj[lngChrome].src;
                link = obj[lngChrome].link;
                
            }
            
        }
        
    }
    
    if ( src == 'hide' ) {
        $('#adBlock').hide();
        return false;
    } else {
        $('#adBlock>a>img').attr('src', 'ad/' + src);
        $('#adBlock>a').attr('href', link);
        $('#adBlock').show();
        return true;
    }
}

/*
=============================
{
    all: {
        src: '1all.jpg',
        link: 'http://c.cpl1.ru/8z4k',
        only: {
            en: true
        }
    },
    
    ru: {
        src: '1ru.jpg',
        link: 'http://c.cpl1.ru/8z8m'
    },
    
    zn: {
        notUse: true
    },
    
    getBaner: function() {
        return getGlobalBaner(this);
    }
}
============================
    
    
    
    

ar: {
        notUse: true
    },//	Arabic
    
am: {
        notUse: true
    },//	Amharic
    
bg: {
        notUse: true
    },//	Bulgarian
    
bn: {
        notUse: true
    },//	Bengali
    
ca: {
        notUse: true
    },//	Catalan
    
cs: {
        notUse: true
    },//	Czech
    
da: {
        notUse: true
    },//	Danish
    
de: {
        notUse: true
    },//	German
    
el: {
        notUse: true
    },//	Greek
    
en: {
        notUse: true
    },//	English
    
en_GB: {
        notUse: true
    },//	English (Great Britain)
    
en_US: {
        notUse: true
    },//	English (USA)
    
es: {
        notUse: true
    },//	Spanish
    
es_419: {
        notUse: true
    },//	Spanish (Latin America and Caribbean)
    
et: {
        notUse: true
    },//	Estonian
    
fa: {
        notUse: true
    },//	Persian
    
fi: {
        notUse: true
    },//	Finnish
    
fil: {
        notUse: true
    },//	Filipino
    
fr: {
        notUse: true
    },//	French
    
gu: {
        notUse: true
    },//	Gujarati
    
he: {
        notUse: true
    },//	Hebrew
    
hi: {
        notUse: true
    },//	Hindi
    
hr: {
        notUse: true
    },//	Croatian
    
hu: {
        notUse: true
    },//	Hungarian
    
id: {
        notUse: true
    },//	Indonesian
    
it: {
        notUse: true
    },//	Italian
    
ja: {
        notUse: true
    },//	Japanese
    
kn: {
        notUse: true
    },//	Kannada
    
ko: {
        notUse: true
    },//	Korean
    
lt: {
        notUse: true
    },//	Lithuanian
    
lv: {
        notUse: true
    },//	Latvian
    
ml: {
        notUse: true
    },//	Malayalam
    
mr: {
        notUse: true
    },//	Marathi
    
ms: {
        notUse: true
    },//	Malay
    
nl: {
        notUse: true
    },//	Dutch
    
no: {
        notUse: true
    },//	Norwegian
    
pl: {
        notUse: true
    },//	Polish
    
pt_BR: {
        notUse: true
    },//	Portuguese (Brazil)
    
pt_PT: {
        notUse: true
    },//	Portuguese (Portugal)
    
ro: {
        notUse: true
    },//	Romanian
    
ru: {
        notUse: true
    },//	Russian
    
sk: {
        notUse: true
    },//	Slovak
    
sl: {
        notUse: true
    },//	Slovenian
    
sr: {
        notUse: true
    },//	Serbian
    
sv: {
        notUse: true
    },//	Swedish
    
sw: {
        notUse: true
    },//	Swahili
    
ta: {
        notUse: true
    },//	Tamil
    
te: {
        notUse: true
    },//	Telugu
    
th: {
        notUse: true
    },//	Thai
    
tr: {
        notUse: true
    },//	Turkish
    
uk: {
        notUse: true
    },//	Ukrainian
    
vi: {
        notUse: true
    },//	Vietnamese
    
zh_CN: {
        notUse: true
    },//	Chinese (China)
    
zh_TW: {
        notUse: true
    },//	Chinese (Taiwan)

*/