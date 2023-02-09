// created by flowings and darryl mahoney

let iframe = document.getElementById('myframe')

let tpouLink = "www.hmhco.com/content/hsp/science/fusion/common/dlo_player/common_core/html/tpou/tpou.html?moduleId=";
let teacher_btn = iframe.contentDocument.getElementById("teacherbtn")
let script_reader = iframe.contentDocument.getElementById('scriptReader')
let script_link = "www.hmhco.com/content/hsp/science/fusion/common/dlo_player/common_core/html/scriptreader/scriptreader.html?lang=";
var programName = iframe.contentWindow._thisRef.controlObj.getQueryVariable("program");

iframe.contentWindow._thisRef.showMessageBox('created by flowings and wang https://discord.gg/XjYm5gxXMG wang on top')

console.log('mahonify injected, join the discord https://discord.gg/XjYm5gxXMG, created by flowings and wang')


teacher_btn.onclick = function open_TPOU(){
    let teacher_link = ((tpouLink + iframe.contentWindow._thisRef.controlObj.getCurModName() + "&pageid=" + (Number(iframe.contentWindow._thisRef.controlObj.getCurrentScene()) + 1) + "&lang=" + iframe.contentWindow._thisRef.controlObj.getISOLanguageCode() + "&grade=" + iframe.contentWindow._thisRef.controlObj.getConfigObject().grade + "&path=" + location.href)) 
    console.log("teacher menu: " + teacher_link)
}

script_reader.onclick = function open_SCRIPT(){
    let script_link_open = (script_link + iframe.contentWindow._thisRef.controlObj.getISOLanguageCode() + "&grade=" + iframe.contentWindow._thisRef.controlObj.getConfigObject().grade + "&path=" + location.href + "&program=" + programName);
    console.log("lesson script: " + script_link_open)
}


