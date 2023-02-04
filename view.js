var View = defineClass({
    "constructor": function() {
    this.currentImgSrc = "";
      this.seqFileArr = new Array();
      this.animArr = [
        []
      ];
      this.objCounti = 0;
      this.objCountj = 0;
      this.objCountTotal = 0;
      this.flipIdArr = new Array();
      this.imageAnimationArray = new Array();
      this.loop = "";
      this.intervalCount = 0;
      this.intervalArray = new Array();
      this.progressdivWidth = 0;
      this.shellImageCnt = 0;
      this.imageGlobalArray = new Array();
      this.imageGlobalInterval;
      this.extHtmlCount = 0;
      this.extHtmlLoadedCount = 0;
      this.newShellWidth = 0;
      this.newShellHeight = 0;
      this.loadedInt;
      this.playerVideoClassRef;
      this.keyCodeArr = new Array();
      this.lastMaxScreenViewed = 0;
      this.maxLeftPosOfWhtBg = 0;
      this.thinkCentralHost = "https://www-k6.thinkcentral.com";
      this.videoControlsRemoved = false;
      this.videoPauseState = new Array();
      this.stopHighLightBool = false;
      this.host;
    },
      "public": {
      init: function(aXmlPath) {
      this.controlObj = new Controller(this);
        this.controlObj.init(aXmlPath);
        var host = window.location.host;
        var protocol = window.location.protocol;
        var baseUrl = protocol + '//' + host;
        window.p1 = function(){
                  return 'teacher'
          }
        console.log("base URL-->"+baseUrl);
        if(baseUrl.indexOf("cert.hmhco.com") != -1){
             this.thinkCentralHost = "https://cert.hmhco.com";
        }else if(baseUrl.indexOf("hmhone.app.hmhco") != -1){
            this.thinkCentralHost = "http://int.hmhone.app.hmhco.com";
        }else if(baseUrl.indexOf("hmhco.com") != -1){
            this.thinkCentralHost = "https://www.hmhco.com";
        }
        
      },
        plotUI: function(aUiObject, aAnimObject) {
        this.extHtmlCount = 0;
          this.extHtmlLoadedCount = 0;
          var _thisRef = this;
          for (var _i in aUiObject) {
        this.createNewElement("contentDiv", aUiObject[_i]);
          if (aUiObject[_i].subelements) {
        for (var _j in aUiObject[_i].subelements) {
        this.createNewElement(aUiObject[_i].id, aUiObject[_i].subelements[_j]);
        }
        }
        if (aUiObject[_i].htmllink) {
        this.extHtmlCount++;
          $("#" + aUiObject[_i].id).load(aUiObject[_i].htmllink, function() {
        _thisRef.onExtHtmlLoaded();
        });
        }
        }
        if (this.extHtmlCount == 0) {
        this.controlObj.loadStatus("plotUiComplete");
        }
        for (var _j in aAnimObject) {
        var _aObj = new Object();
          _aObj.type = "canvas";
          _aObj.id = "anim_" + _j;
          _aObj.style = "position:absolute; left:" + aAnimObject[_j].xPos + "px; top:" + aAnimObject[_j].yPos + "px; display:none;";
          _aObj.width = aAnimObject[_j].width;
          _aObj.height = aAnimObject[_j].height;
          this.createNewElement(aAnimObject[_j].elemref, _aObj);
        }
        //+++++++++++++++++++++++++
        var _titleObj = new Object();
          _titleObj.type = "div";
          _titleObj.id = "coursetitle";
          this.createNewElement("contentDiv", _titleObj);
        },
        plotNavNumbers: function(aStObj, aNumNav) {
        if (aNumNav) {
        var _thisRef = this;
          var _txt = "";
          for (var _i = 0; _i < aStObj[0].length; _i++) {
        var cls = "num_nav_s_n";
          if (_i >= 9) {
        cls = "num_nav_d_n";
        }
        _txt += "<td align='center' width='35'><div id='num_" + _i + "' style='font-size:15px; font-weight:bold; line-height:34px;' class='nav_sprites " + cls + "'>" + (_i + 1) + "</div></td>";
        }
        $("#numnavholder").html("<center><table cellpadding='0' celspacing='0' border='0'><tr>" + _txt + "</tr></table></center>");
          //---------------------------------------------------
          $(".num_nav_s_n").addTouch();
          $(".num_nav_s_n").css("cursor", "pointer").mousedown(function(e) {
        var _thisCss = $(this);
          document.onselectstart = function() {
          return false;
          }
        $(this).addClass("downstyle");
          $(window).mouseup(function(e) {
        _thisRef.callNumEvents(_thisCss)
          _thisCss.removeClass("downstyle");
          $(window).unbind("mouseup");
          document.onselectstart = null;
        });
        });
          $(".num_nav_d_n").addTouch();
          $(".num_nav_d_n").css("cursor", "pointer").mousedown(function(e) {
        var _thisCss = $(this);
          document.onselectstart = function() {
          return false;
          }
        $(this).addClass("downstyle");
          $(window).mouseup(function(e) {
        _thisRef.callNumEvents(_thisCss)
          _thisCss.removeClass("downstyle");
          $(window).unbind("mouseup");
          document.onselectstart = null;
        });
        });
        }
        },
        callNumEvents: function(aRef) {
        ////console.log(" jump = "+aRef.attr("id").split("_")[1]);
        this.controlObj.jumpToScene(aRef.attr("id").split("_")[1]);
        },
        onExtHtmlLoaded: function() {
        this.extHtmlLoadedCount++
          if (this.extHtmlCount == this.extHtmlLoadedCount) {
        this.controlObj.loadStatus("plotUiComplete");
        }
        },
        createNewElement: function(aHolder, aElemList) {
        var _thisObj = this;
          var _element = document.createElement(aElemList.type);
          document.getElementById(aHolder).appendChild(_element);
          for (var _i in aElemList) {
        if (_i != "type" && _i != "buttonEvent" && _i != "subelements" && _i != "depth" && _i != "htmllink") {
        _element.setAttribute(_i, aElemList[_i]);
        } else if (_i == "depth") {
        $("#" + aElemList["id"]).css("z-index", aElemList[_i]);
        }
        }
        if (aElemList.clickEvent) {
        $(_element).addTouch();
          //this.enableButtonEvent($(_element).attr("id"), 'click', function(e){_thisObj.executeEvents(e, $(this))});
          this.enableButtonEvent($(_element).attr("id"), 'mousedown', function(e) {
          _thisObj.executeEvents(e, $(this))
          });
        }
        if (aElemList.onLoadEvent) {
        eval(aElemList.onLoadEvent)();
        }
        if (aElemList.dragEvent) {
        $(_element).addTouch();
          this.addDragEvent(_element);
        }
        if (aElemList.overEvent || aElemList.hoverStyle) {
        $(_element).addTouch();
          this.enableButtonEvent($(_element).attr("id"), 'mouseover', function(e) {
          _thisObj.executeEvents(e, $(this))
          });
        }
        if (aElemList.outEvent || aElemList.hoverStyle) {
        $(_element).addTouch();
          this.enableButtonEvent($(_element).attr("id"), 'mouseout', function(e) {
          _thisObj.executeEvents(e, $(this))
          });
        }
        //flip updated 4/10 5:53
        if (aElemList.flip) {
        //this.enableButtonEvent($(_element).attr("id"), 'click', Controller.executeEvents);
        if (aElemList.flip == 'true') {
        this.flipIdArr.push(aElemList.id);
        }
        }
        if (aElemList.keyCode) {
        this.keyCodeArr[aElemList.keyCode] = aElemList.id;
        }
        },
        executeEvents: function(_event, _ref) {
        var _thisObj = this;
          var _winObj = window;
          if (_event.type == 'click') {
        switch (_ref.attr("clickevent")) {
        case "prevButton":
          this.controlObj.loadPreviousScene();
          break;
          case "managePlayPause":
          this.controlObj.managePlayPause();
          break;
          case "replay":
          this.controlObj.replayControl();
          var tpouLink;
        
          tpouLink = "../../../common_core/html/tpou/tpou.html?moduleId=";
          this.openExternalURL("../../../common_core/html/scriptreader/scriptreader.html?lang=" + this.controlObj.getISOLanguageCode() + "&grade=" + this.controlObj.getConfigObject().grade + "&path=" + location.href + "&program=" + programName);
          break;
          case "nextButton":
          this.controlObj.loadNextScene();
          break;
          case "home":
          //this.controlObj.jumpToScene(0);
          this.controlObj.sendToSuspendData();
          break;
          case "toogleTranscriptBox":
          this.controlObj.setTranscriptVisibility(true);
          break;
          case "bottomTxtClose":
          this.closeTxtBox();
          break;
          case "toolClick":
          this.controlObj.toolClick();
          break;
          case "volClick":
          this.controlObj.volClick();
          var tpouLink;
          tpouLink = "../../../common_core/html/tpou/tpou.html?moduleId=";
          this.openExternalURL(tpouLink + this.controlObj.getCurModName() + "&pageid=" + (Number(this.controlObj.getCurrentScene()) + 1) + "&lang=" + this.controlObj.getISOLanguageCode() + "&grade=" + this.controlObj.getConfigObject().grade + "&path=" + location.href);
          break;
          case "showCalc":
          this.showCalculator();
          break;
          case "showNotepad":
          this.showNotepadElem();
          break;
          case "manageAudioMute":
          this.controlObj.manageAudioMute();
          break;
          case "dataPer":
          this.controlObj.callDataPerFunc();
          break;
          case "scriptReader":
          var programName = this.controlObj.getQueryVariable("program");
          if (this.controlObj.getStudentType() == "student") {
                this.openExternalURL("../../../common_core/html/scriptreader/scriptreader.html?lang=" + this.controlObj.getISOLanguageCode() + "&grade=" + this.controlObj.getConfigObject().grade + "&path=" + location.href + "&program=" + programName); 
        if (this.controlObj.getISOLanguageCode() == "es") {
        this.showMessageBox("Esta función no está disponible para los estudiantes.");
        } else {
        // this.showMessageBox("This feature is not available for students.");
        }
        } else {
        this.openExternalURL("../../../common_core/html/scriptreader/scriptreader.html?lang=" + this.controlObj.getISOLanguageCode() + "&grade=" + this.controlObj.getConfigObject().grade + "&path=" + location.href + "&program=" + programName);
        }
        break;
          case "teacher":
          this.openTPOU();
          break;
          case "openTracker":
          break;
          case "RecordBtn":
          this.openLabReport();
          break;
          case "externalURL":
          this.openExternalURL(_ref.attr("externalURL"));
          break;
          case "openHelp":
          this.openHelpPage();
          //this.openExternalURL(_ref.attr("externalURL"));
          break;
          case "closePlayerMsgBox":
          this.closeMessageBox();
          break;
          case "playShellVideoElem":
          this.playerVideoClassRef.videoElement.play();
          break;
          case "increaseVolume":
          this.controlObj.increaseVolume();
          break;
          case "decreaseVolume":
          this.controlObj.decreaseVolume();
          break;
          case "openGlossary":
          this.openGlossary();
          break;
          case "moveNext":
          this.controlObj.loadNextScene(true);
          break;
          case "stayOnSame":
          //console.log("stayOnSame");
          this.closeMessageBox();
          break;
          case "persistenceOn":
          if (this.controlObj.getStudentType() == "student") {
        if (this.controlObj.getISOLanguageCode() == "es") {
        this.showMessageBox("Esta función no está disponible para los estudiantes.");
        } else {
        this.showMessageBox("This feature is not available for students.");
        }
        } else {
        this.controlObj.clearAllData();
        }
        break;
        }
        _ref.trigger("mouseout");
        }
        if (_event.type == 'mouseover') {
        this.addCssStyle(_ref.attr("id"), _ref.attr('hoverstyle'));
        }
        if (_event.type == 'mouseout') {
        this.removeCssStyle(_ref.attr("id"), _ref.attr('hoverstyle'));
        }
        if (_event.type == 'mousedown') {
        var _thisCss = this;
          document.onselectstart = function() {
          return false;
          }
        this.addCssStyle(_ref.attr("id"), "downstyle");
          $(window).mouseup(function(e) {
        var _eObj = {
        type: "click"
        };
          _thisObj.executeEvents(_eObj, _ref)
          _thisCss.removeCssStyle(_ref.attr("id"), "downstyle");
          $(window).unbind("mouseup");
          document.onselectstart = null;
        });
        }
        },
        hideVideoControls: function() {
        var VidArr = document.getElementsByTagName("video");
          if (VidArr) {
        for (var i = 0; i < VidArr.length; i++) {
        if (VidArr[i].id != "playerVideoTag") {
        if ($("#" + VidArr[i].id).attr("controls")) {
        VidArr[i].removeAttribute("controls");
          this.videoPauseState[i] = VidArr[i].paused;
          this.pauseAllVideoElement();
          this.videoControlsRemoved = true;
        } else {
        this.videoControlsRemoved = false;
        }
        }
        }
        }
        },
        showVideoControls: function() {
        var VidArr = document.getElementsByTagName("video");
          if (this.videoControlsRemoved) {
        if (VidArr) {
        for (var i = 0; i < VidArr.length; i++) {
        VidArr[i].setAttribute("controls", "controls");
          if (this.videoPauseState[i] == false) {
        VidArr[i].play();
        }
        }
        }
        }
        },
        pauseAllVideoElement: function() {
        var VidArr = document.getElementsByTagName("video");
          if (VidArr) {
        for (var i = 0; i < VidArr.length; i++) {
        VidArr[i].pause();
        }
        }
        },
        showNotepadElem: function() {
        if ($("#notepad").css("display") == "none") {
        this.hideVideoControls();
          this.showElement("notepad", true);
          this.showElement("calc", false);
        } else {
        this.closeNotePad();
        }
        },
        showCalculator: function() {
        if ($("#calc").css("display") == "none") {
        this.showElement("notepad", false);
          this.showElement("calc", true);
        } else {
        this.showElement("calc", false);
        }
        },
        closeNotePad: function() {
        this.showElement("notepad", false);
          this.showVideoControls();
        },
        openHelpPage: function() {
        var programName = this.controlObj.getQueryVariable("program");
          var _configObject = this.controlObj.getConfigObject();
         var helpLink = "../../../common_core/html/help/digitalcurriculum.html?";
          if (this.controlObj.getISOLanguageCode() == "es") {
        this.openExternalURL(helpLink+"grade=" + this.retLessonGrade() + "&program=" + programName + "&lesson_code=" + _configObject.code + "_S#es");
        } else {
        this.openExternalURL(helpLink+ "grade=" + this.retLessonGrade() + "&program=" + programName + "&lesson_code=" + _configObject.code);
        }
        //console.log("openHelpPage "+this.thinkCentralHost);
        },
        openGlossary: function() {
        if (this.controlObj.getISOLanguageCode() == "es") {
        this.openExternalURL(this.thinkCentralHost + "/content/hsp/science/fusion/common/glossary_9780547511795_/glossary_sp.html");
        } else {
        this.openExternalURL(this.thinkCentralHost + "/content/hsp/science/fusion/common/glossary_9780547511795_/glossary.html");
        }
        },
        filterString: function(str) {
        str = str.replace(/<div><br><\/div>/g, "");
          str = str.replace(/<p>&nbsp;<\/p>/g, ""); // for  Internet explorer
          str = str.replace(/<div>/g, " ");
          str = str.replace(/<p>/g, " "); // for  Internet explorer
          str = str.replace(/<\/div>/g, "");
          str = str.replace(/<\/p>/g, ""); // for  Internet explorer
          str = str.replace(/\n/g, " ");
          str = str.replace(/<br>/g, " ");
          return str;
        },
        openLabReport: function() {
        var programName = this.controlObj.getQueryVariable("program");
          if (this.controlObj.getStudentType() == "teachers")
        {
        this.openExternalURL("logBook.html?key=true&program=" + programName);
        } else
        {
        var showCorrectAnswer = decodeURIComponent(location.href).split("showCorrectAnswer=")[1];
          this.controlObj.updatePageTrackTime(this.controlObj.getCurrentScene());
          localStorage.playerRef = 1;
          this.storeLogBookData();
          this.controlObj.setLocalStorageData();
          this.openExternalURL("logBook.html?program=" + programName);
        }
        },
        getLessonCode:function()
        {
        var _code;
          // this is done for IE9. Since window.parent.location.href .. not working.
          try {
          _code = window.parent.location.href.split("/").reverse()[1];
          } catch (err) {
        _code = location.href.split("/").reverse()[1];
        }
        return _code.trim();
        },
        storeLogBookData: function()
        {
        /* ========== Added Vishal : 20/07/2015. Store Logbook data at each step ==============*/
        var dataObjectString = JSON.stringify(this.controlObj.getPageTrackerObj());
          dataObjectString = this.filterString(dataObjectString);
          // console.log("dataObjectString = ", dataObjectString);
          //console.log("get lesson code ",this.getLessonCode());
          /*
           localStorage.logBookString = "logBook.html?data=" + dataObjectString + "&pages=" + this.controlObj.getNumOfPages() + "&modname=" + this.controlObj.getCurModName() + "&pageTimeArr=" + this.controlObj.getAllPageTrackerData().pageTime + "&pageVisitsArr=" + this.controlObj.getAllPageTrackerData().attemptData + "&lessonTitle=" + this.controlObj.getCourseTitle() + "&lang=" + this.controlObj.getISOLanguageCode() + "&noocattempts=" + this.controlObj.getAllPageTrackerData().actData;
           */
  
          //this.getLessonCode()
          /* ===== CODE ADDED ON 21/09/2015 TO SEPARATE LOGBOOK STRING OF DIFFERENT LESSONS ============== */
          //localStorage["logBookString_"+this.controlObj.getHMHId()] = "logBook.html?data=" + dataObjectString + "&pages=" + this.controlObj.getNumOfPages() + "&modname=" + this.controlObj.getCurModName() + "&pageTimeArr=" + this.controlObj.getAllPageTrackerData().pageTime + "&pageVisitsArr=" + this.controlObj.getAllPageTrackerData().attemptData + "&lessonTitle=" + this.controlObj.getCourseTitle() + "&lang=" + this.controlObj.getISOLanguageCode() + "&noocattempts=" + this.controlObj.getAllPageTrackerData().actData;
          /* ========================================= */
        },
        openTPOU: function() {
        var programName = this.controlObj.getQueryVariable("program");
          var tpouLink;
          if (typeof programName != "undefined" && programName != "scienceFusion") {
        tpouLink = "../../../common_core/html/tpou/tpou.html?moduleId="
        } else{
        tpouLink = "tpou.html?moduleId="
        }
        tpouLink = "../../../common_core/html/tpou/tpou.html?moduleId=";
        switch (p1()) {
        case "teacher":
          this.openExternalURL(tpouLink + this.controlObj.getCurModName() + "&pageid=" + (Number(this.controlObj.getCurrentScene()) + 1) + "&lang=" + this.controlObj.getISOLanguageCode() + "&grade=" + this.controlObj.getConfigObject().grade + "&path=" + location.href);
          break;
          case "student":
          if (this.controlObj.getISOLanguageCode() == "es") {
        this.showMessageBox("Esta función no está disponible para los estudiantes.");
        } else {
        this.showMessageBox("This feature is not available for students.");
        }
        break;
          default:
          this.openExternalURL(tpouLink + this.controlObj.getCurModName() + "&pageid=" + (Number(this.controlObj.getCurrentScene()) + 1) + "&lang=" + this.controlObj.getISOLanguageCode() + "&grade=" + this.controlObj.getConfigObject().grade + "&path=" + location.href);
        }
        },
        showMessageBox: function(str, par) {
        if ($(playerMsgBox).css("display") == "none") {
        $(playerMsgBox).show().html('<table cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td align="center" valign="middle">' + str + '</td></tr></table>');
          if (!$(playerMsgBox).is(':animated')) {
        this.showElement("playerMsgBox", true);
          $("#playerMsgBox").effect("shake", 70, function() {
        $(playerMsgBoxClose).show();
          if (par) {
        //$("#moveNextBtn").show();
        //$("#stayOnSame").show();
        }
        });
          if (par) {
        $("#moveNextBtn ,#stayOnSame").show().effect("shake", 70, function() {
        $(playerMsgBoxClose).show();
        });
        }
        } else {
        $("#playerMsgBox").fadeIn(1000);
          $("#playerMsgBoxClose").fadeIn(1000);
        }
        } else {
        $(playerMsgBox).show().html('<table cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td align="center" valign="middle">' + str + '</td></tr></table>');
        }
        },
        showConfirmBox:function(cb){
        var str;
          var grade = this.controlObj.getConfigObject().grade;
          if (grade <= 3 || grade.toLowerCase() == "k") {
        if (this.controlObj.getISOLanguageCode() == "es") {
        str = "Parece que perdimos la conexión con el lugar donde se almacena tu trabajo. Esto significa que cualquier trabajo nuevo que hagas no será almacenado. ¿Quieres PARAR AHORA o SEGUIR ADELANTE? ";
        } else {
        str = "We seem to have lost the connection to where your work is being stored. This means any new work you do will not be saved. Do you want to STOP NOW or KEEP GOING.";
        }
  
  
        } else{
        if (this.controlObj.getISOLanguageCode() == "es") {
        str = "Estamos teniendo problemas con la conexión del servidor y los datos que ingreses desde este punto de la lección no se pueden guardar. ¿Te gustaría continuar?";
        } else {
        str = "We are having diffculty connecting to the server and the data you enter from this point in the lesson may not be saved. Would you like to continue?";
        }
  
        }
  
        if (this.controlObj.getISOLanguageCode() == "es") {
        $(playerMsgBox).show().html('<div style="position: relative;top: 55px;">' + str + '</div><div id="cnfm_yes" class="cnfmBtn" data-type="yes" style="display: block;">Si</div><div id="cnfm_no" class="cnfmBtn" data-type="no" style="display: block;">No</div>');
        } else {
        $(playerMsgBox).show().html('<div style="position: relative;top: 55px;">' + str + '</div><div id="cnfm_yes" class="cnfmBtn" data-type="yes" style="display: block;">Yes</div><div id="cnfm_no" class="cnfmBtn" data-type="no" style="display: block;">No</div>');
        }
  
  
        // $("#playerMsgBox").effect("shake", 70, function() {
        $(playerMsgBoxClose).show();
          $('.cnfmBtn').off("mousedown touchdown").on("mousedown touchdown", function(){
        $(playerMsgBox).hide();
          var type = $(this).attr('data-type');
          console.log(type);
          cb(type)
        });
          //});
        },
        openExternalURL: function(url) {
        this.controlObj.pauseControl("external");
          window.open(url, "scnewwin");
          this.pauseAllVideoElement();
        },
        addCssStyle: function(aElemId, aGetCssStyleId) {
        $("#" + aElemId).addClass(aGetCssStyleId);
        },
        removeCssStyle: function(aElemId, aGetCssStyleId) {
        $("#" + aElemId).removeClass(aGetCssStyleId);
        },
        highlightNextButton: function() {
        // commented on 1/10/15 as per mayanthi bug
        // this.controlObj.setCurrScreenCompleteStatus(true);
        this.setCompletionStatus();
          var _thisRef = this;
          if (!this.controlObj.isLastPage()) {
        this.highlightNextButtonGlow();
          /* $("#nextButtonglow").fadeToggle(800, 'linear', function() {
           _thisRef.highlightNextButton();
           }); */
          if (this.controlObj.getStudentType() == "student") {
        this.showElement("nextButton", true);
        }
        }
        },
        highlightNextButtonGlow: function() {
        var _thisRef = this;
          $("#nextButtonglow").fadeToggle(800, 'linear', function() {
        _thisRef.highlightNextButtonGlow();
        });
        },
        updateNextButtonState: function(_aScene, _astObj, _aModule) {
        if (_aScene == _astObj[_aModule].length - 1) {
        this.showElement("nextButton", false);
          this.showElement("nextdisabled", true);
        } else {
        this.showElement("nextButton", true);
          this.showElement("nextdisabled", false);
        }
        },
        selectNextBtnState: function(_aScene, _astObj, _aModule) {
        switch (this.controlObj.getStudentType()) {
        case "teacher":
          this.updateNextButtonState(_aScene, _astObj, _aModule);
          break;
          case "student":
          this.showElement("nextButton", false);
          break;
          default:
          this.updateNextButtonState(_aScene, _astObj, _aModule);
        }
        },
        stopHighlightNextButton: function() {
        $("#nextButtonglow").stop();
          $("#nextButtonglow").hide();
          $("#nextButtonglow").css("opacity", 1);
          if ($("#nextButtonglow").is(':animated')) {
        this.stopHighlightNextButton();
        }
        },
        showElement: function(aElemId, aBool) {
        aBool ? $("#" + aElemId).show() : $("#" + aElemId).hide();
        },
        showSubElement: function(aElemId, aBool) {
        this.showElement("notepad", false);
          this.showElement("calc", false);
          if (aBool) {
        $("#" + aElemId).css({
        "transform": "scale(0,0)",
          "-ms-transform": "scale(0,0)",
          "-webkit-transform": "scale(0,0)",
          "-o-transform": "scale(0,0)",
          "-moz-transform": "scale(0,0)"
        });
          $("#" + aElemId).animate({
        step: function(now, fx) {}
        /*"transform": "scale(1,1)",
         "-ms-transform": "scale(1,1)",
         "-webkit-transform": "scale(1,1)",
         "-o-transform": "scale(1,1)",
         "-moz-transform": "scale(1,1)"*/
        }, 1000);
        }
        },
        showAnimElement: function(aElemId, aBool) {
        aBool ? $("#" + aElemId).fadeIn(800) : $("#" + aElemId).fadeOut(800);
        },
        toggleElement: function(aElemId) {
        $("#" + aElemId).toggle();
        },
        loadHTML: function(htmlPath) {
        var _thisObj = this;
          $('#mainContainer').load(htmlPath, function() {
        _thisObj.controlObj.loadStatus("loadingComplete");
        });
        },
        enableButtonEvent: function(aId, aEventType, aFunctionRef) {
        $("#" + aId).bind(aEventType, aFunctionRef);
        },
        disableButtonEvent: function(aId, aEventType) {
        $("#" + aId).unbind(aEventType);
        },
        changeCssClass: function(aElemId, aClassName) {
        $('#' + aElemId).attr('class') = "";
          $('#' + aElemId).attr('class') = aClassName;
        },
        onResizeFn: function() {
        /*
         if(String(BrowserDetect.browser).toLowerCase() != "firefox" && String(BrowserDetect.browser).toLowerCase() != "explorer")
         {
         var actWid = Number($(window).width());
         var actHgt = Number($(window).height())
         if(actHgt < actWid)
         {
         this.newShellHeight = actHgt - 15;
         var scale = Number(this.controlObj.getShellHeight()/this.newShellHeight).toFixed(2);
         this.newShellWidth = (this.controlObj.getShellWidth()/this.controlObj.getShellHeight())*this.newShellHeight;
         var _aleft = ($(window).width()/2)-(Number(this.newShellWidth)/2);
         if(_aleft<0)
         {
         this.newShellWidth = actWid - 15;
         scale = Number(this.controlObj.getShellWidth()/this.newShellWidth).toFixed(2);
         this.newShellHeight = (this.controlObj.getShellHeight()/this.controlObj.getShellWidth())*this.newShellWidth;
         }
         $('#playerContainer').css({ 'zoom': (1/scale), '-moz-transform': 'scale('+(1/scale)+')', '-moz-transform-origin': '0 0 ' });
         }
         else
         {
         this.newShellWidth = actWid - 15;
         var scale = Number(this.controlObj.getShellWidth()/this.newShellWidth).toFixed(2);
         this.newShellHeight = (this.controlObj.getShellHeight()/this.controlObj.getShellWidth())*this.newShellWidth;
         $('#playerContainer').css({ 'zoom': (1/scale), '-moz-transform': 'scale('+(1/scale)+')', '-moz-transform-origin': '0 0 ' });
         }
         this.controlObj.setScaleFactor(scale);
         scaleVal = scale;
         $('#shellDiv').width(this.newShellWidth)
         $('#shellDiv').height(this.newShellHeight);
         var _left = ($(window).width()/2)-(Number(this.newShellWidth)/2);
         var _top = ($(window).height()/2)-(Number(this.newShellHeight)/2);
         $('#shellDiv').css("left", _left);
         $('#shellDiv').css("top", _top);
         }
         else
         {
         $('#shellDiv').css("left", ($(window).width()/2) - ($('#shellDiv').width() / 2));
         $('#shellDiv').css("top", ($(window).height()/2) - ($('#shellDiv').height() / 2));
         }
         */
        },
        displayTimerText: function(aTimerVal) {
        var _minutes = this.controlObj.zeroPad(Math.floor(aTimerVal / 60), 2);
          var _seconds = this.controlObj.zeroPad((aTimerVal - _minutes * 60).toFixed(0), 2);
          var _hours = this.controlObj.zeroPad(Math.floor(aTimerVal / 3600), 2);
          var _endMin = this.controlObj.zeroPad(Math.floor(Model.endP / 60), 2);
          var _endSec = this.controlObj.zeroPad((Model.endP - _minutes * 60).toFixed(0), 2);
          var _endHour = this.controlObj.zeroPad(Math.floor(Model.endP / 3600), 2);
          $("#timerDisplay").text(_minutes + ":" + _seconds + " / " + _endMin + ":" + _endSec);
        },
        setVolumeBarPos: function(aNewVolumeBarVal) {
        $("#VolumeBar").css('width', aNewVolumeBarVal + "px");
        },
        //============================== functions from page deve team ========================================
        fadeInElement: function(aId, aDuration) {
        $("#" + aId).fadeIn(aDuration);
        },
        fadeOutElement: function(aId, aDuration) {
        $("#" + aId).fadeOut(aDuration);
        },
        animateLeftElement: function(aId, aLeftX, aDuration) {
        $("#" + aId).animate({
        left: aLeftX
        }, aDuration, "linear");
        },
        animateTopElement: function(aId, aTopY, aDuration) {
        $("#" + aId).animate({
        top: aTopY
        }, aDuration, "linear");
        },
        animateLeftAndTopElement: function(aId, aLeftX, aTopY, aDuration) {
        $("#" + aId).animate({
        left: aLeftX,
          top: aTopY
        }, aDuration);
        },
        animateWidthElement: function(aId, aWidthX, aDuration) {
        $("#" + aId).animate({
        width: aWidthX
        }, aDuration);
        },
        animateHeightElement: function(aId, aHeightX, aDuration) {
        $("#" + aId).animate({
        height: aHeightX
        }, aDuration);
        },
        animateWidthNHeightElement: function(aId, aWidthX, aHeightX, aMarLeft, aMarTop, aDuration, aOpacity) {
        $("#" + aId).animate({
        width: aWidthX,
          height: aHeightX,
          marginLeft: aMarLeft,
          marginTop: aMarTop,
          opacity: aOpacity
        }, aDuration);
        },
        animateOpacityElement: function(aId, aDuration, aOpacity) {
        $("#" + aId).animate({
        opacity: aOpacity
        }, aDuration);
        },
        loadImage: function(obj) {
        this.seqFileArr = obj.preLoaderArray;
          this.objCounti = 0;
          this.objCountTotal = 0;
          this.animArr = new Array();
          for (var _i = 0; _i < this.seqFileArr.length; _i++) {
        this.animArr[_i] = new Array();
          for (var _j = 0; _j < this.seqFileArr[_i].length; _j++) {
        var ViewRef = this;
          this.animArr[_i][_j] = new Image();
          this.animArr[_i][_j].onload = function() {
        ViewRef.loadingComplete();
        };
          this.animArr[_i][_j].src = this.currentImgSrc + this.seqFileArr[_i][_j];
          this.objCountTotal++;
        }
        }
        },
        setLeftAndTop: function(_id, leftX, topY) {
        $("#" + _id).css('left', leftX + 'px').css('top', topY + 'px');
        },
        loadingComplete: function() {
        this.objCounti++;
          if (this.objCounti < this.objCountTotal) {} else {
        this.controlObj.loadStatus("sceneImagesLoaded");
          this.objCounti = 0;
        }
        },
        imageAnimation: function(aArrayname) {
        var _obj;
          var _thisRef = this;
          this.imageAnimationArray = new Array();
          for (var _i = 0; _i < aArrayname.length; _i++) {
        _obj = new Object();
          _obj.canvas = document.getElementById(aArrayname[_i][0]);
          _obj.context = _obj.canvas.getContext('2d');
          _obj.index = aArrayname[_i][2];
          _obj.xpos = aArrayname[_i][3];
          _obj.ypos = aArrayname[_i][4];
          this.imageAnimationArray.push(_obj);
        }
        this.intervalCount = - 1;
          clearInterval(this.loop);
          this.playAnimation();
          this.loop = interval = setInterval(function() {
          _thisRef.playAnimation();
          }, 80);
        },
        playAnimation: function() {
        this.intervalCount++;
          for (var _i = 0; _i < this.imageAnimationArray.length; _i++) {
        if (this.intervalCount >= this.animArr[this.imageAnimationArray[_i].index].length) {
        clearInterval(this.loop);
        } else {
        this.imageAnimationArray[_i].canvas.width = this.imageAnimationArray[_i].canvas.width;
          this.imageAnimationArray[_i].context.drawImage(this.animArr[this.imageAnimationArray[_i].index][this.intervalCount], this.imageAnimationArray[_i].xpos, this.imageAnimationArray[_i].ypos);
        }
        }
        },
        addCss: function(aId, aClassName) {
        $("#" + aId).addClass(aClassName);
        },
        removeCss: function(aId, aClassName) {
        $("#" + aId).removeClass(aClassName);
        },
        resetElement: function(aElem) {
        for (var _i = 0; _i < aElem.length; _i++) {
        $("#" + aElem[_i]).hide();
        }
        for (var _i = 0; _i < this.imageAnimationArray.length; _i++) {
        clearInterval(this.imageAnimationArray[_i].interval);
        }
        this.imageAnimationArray = new Array();
        },
        updateTranscriptText: function(aAudioText) {
        $("#transcriptBox").html(aAudioText + "<br>");
          $("#transcriptBox").scrollTop(100000);
        },
        updateNumNav: function(aId) {
        $(".num_nav_s_n").removeClass("num_nav_sel");
          $(".num_nav_d_n").removeClass("num_nav_sel");
          if (aId < 9) {
        $("#num_" + aId).addClass("num_nav_v");
          $("#num_" + aId).addClass("num_nav_sel");
        } else {
        $("#num_" + aId).addClass("num_nav_v");
          $("#num_" + aId).addClass("num_nav_sel");
        }
        },
        clearPrevPageData: function() {
        preLoaderArray = "";
          $("#transcriptBox").html("");
        },
        createElement: function(aParentDiv, aElemType, aElementId) {
        var _el = document.createElement(aElemType);
          _el.id = aElementId;
          document.getElementById(aParentDiv).appendChild(_el);
        },
        updatePlayPauseState: function(bool, aEventBool) {
        if (bool) {
        this.showElement("playbtn", false);
          this.showElement("pausebtn", true);
        } else {
        if (aEventBool) {
        this.showElement("playbtn", true);
        } else {
        this.showElement("playbtn", false);
          this.showElement("playdisabled", true);
        }
        this.showElement("pausebtn", false);
        }
        },
        playControl: function() {
        this.controlObj.playControl();
        },
        setCurrentTime: function(aTime) {
        this.controlObj.setCurrentTime(aTime);
        },
        pauseControl: function() {
        this.controlObj.pauseControl();
        },
        loadNextScene: function() {
        $("#transcriptBox").html("");
          this.controlObj.loadNextScene();
        },
        showTranscriptBox: function(bool) {
        if (bool) {
        $('#transcriptBox').parent().fadeIn(500);
          this.showElement('transcriptopenbtn', false);
          this.showElement('transcriptclosebtn', true);
          $("#transcriptBox").scrollTop(100000);
        } else {
        $('#transcriptBox').parent().fadeOut(500);
          this.showElement('transcriptopenbtn', true);
          this.showElement('transcriptclosebtn', false);
        }
        },
        callPageFunctions: function(aRef) {
        eval(aRef);
        },
        retTranscript: function(aId) {
        return this.controlObj.retTranscript(aId);
        },
        retTitle: function() {
        return this.controlObj.retTitle();
        },
        retTitleType: function() {
        return this.controlObj.retTitleType();
        },
        retOst: function(aId) {
        return this.controlObj.retOst(aId);
        },
        printHtml: function(aElemId, aStr) {
        $("#" + aElemId).html(aStr);
        },
        enablePlayPause: function(aBool) {
        this.showElement("playdisabled", !aBool);
          this.showElement("playbtn", false);
          this.showElement("pausebtn", aBool);
        },
        getAudioObj: function(){
          return this.controlObj.getAudioObj();
        },
        preloadComplete: function() {
        this.controlObj.getAudioObj().src = "../../../common_core/media/audio/blank.mp3";
          this.controlObj.getAudioObj().play();
          //this.controlObj.loadStatus("shellImageLoaded");
          this.controlObj.loadStatus("initAnimComplete");
        },
        updateNotepadStatus: function() {},
        loadShellImages: function() {
        this.shellImageCnt = 0;
          _thisRef = this;
          for (var _i = 0; _i < uiImagesArrayData.length; _i++) {
        this.shellImageTotal++;
          var img = new Image();
          img.onload = function() {
          _thisRef.onShellImgLoaded();
          }
        img.src = uiImagesArrayData[_i];
        }
        },
        onShellImgLoaded: function() {
        this.shellImageCnt++;
          waterAnimObj.loadedPercent = Math.round((this.shellImageCnt / uiImagesArrayData.length) * 100);
          if (this.shellImageCnt == uiImagesArrayData.length) {
        //this.controlObj.loadStatus("shellImageLoaded");
        }
        },
        clearLoopInterval: function() {
        clearInterval(this.loop);
        },
        // function Updated on Nov 9 ,2012 for cs_beta tet version - vishal
        setElement: function(elemPropArr) {
        for (var i in elemPropArr) {
        if (Number(elemPropArr[i][3]) > 0) {
        $('#' + elemPropArr[i][0]).show();
        }
        if ($('#' + elemPropArr[i][0]).prop("tagName") == "CANVAS") {
        $('#' + elemPropArr[i][0]).css({
        'position': 'absolute',
          'left': Number(elemPropArr[i][1]) + "px",
          'top': Number(elemPropArr[i][2]) + "px",
          'opacity': Number(elemPropArr[i][3]),
        });
          if ($('#' + elemPropArr[i][0]).attr("width") != Math.round(elemPropArr[i][4]) || $('#' + elemPropArr[i][0]).attr("height") != Math.round(elemPropArr[i][5])) {
        $('#' + elemPropArr[i][0]).attr("width", Math.round(elemPropArr[i][4]));
          $('#' + elemPropArr[i][0]).attr("height", Math.round(elemPropArr[i][5]));
        }
        } else {
        $('#' + elemPropArr[i][0]).css({
        'position': 'absolute',
          'left': Number(elemPropArr[i][1]) + "px",
          'top': Number(elemPropArr[i][2]) + "px",
          'opacity': Number(elemPropArr[i][3]),
          'width': Number(elemPropArr[i][4]) + "px",
          'height': Number(elemPropArr[i][5]) + "px"
        });
        }
        }
        },
        animElement: function(elemPropArr) {
        for (var i in elemPropArr) {
        if ($('#' + elemPropArr[i][0]).prop("tagName") == "CANVAS") {
        $('#' + elemPropArr[i][0]).animate({
        'position': 'absolute',
          'left': Number(elemPropArr[i][1]) + "px",
          'top': Number(elemPropArr[i][2]) + "px",
          'opacity': Number(elemPropArr[i][3]),
        }, 500, "linear");
          if ($('#' + elemPropArr[i][0]).attr("width") != Math.round(elemPropArr[i][4])) {
        $('#' + elemPropArr[i][0]).attr("width", Math.round(elemPropArr[i][4]));
          $('#' + elemPropArr[i][0]).attr("height", Math.round(elemPropArr[i][5]));
        }
        } else {
        $("#" + elemPropArr[i][0]).animate({
        left: elemPropArr[i][1],
          top: elemPropArr[i][2],
          opacity: elemPropArr[i][3],
          width: elemPropArr[i][4] + "px",
          height: elemPropArr[i][5] + "px"
        }, 500, "linear");
        }
        }
        },
        //=============================================================================
        startGlobalAnimation: function(aId) {
        if ($("#anim_" + aId).css("display", "none")) {
        $("#anim_" + aId).show();
        }
        this.imageGlobalArray.push({
        item: aId,
          xPos: 0,
          yPos: 0,
          step: 0
        });
          this.playGlobalAnimation();
        },
        playGlobalAnimation: function() {
        var _thisRef = this;
          clearInterval(this.imageGlobalInterval);
          this.imageGlobalInterval = setInterval(function() {
          if (_thisRef.imageGlobalArray.length > 0) {
          for (var i = 0; i < _thisRef.imageGlobalArray.length; i++) {
          var _animObj = _thisRef.controlObj.getAnimObject();
            var _cnv = document.getElementById("anim_" + _thisRef.imageGlobalArray[i].item);
            var _ctx = _cnv.getContext('2d');
            _cnv.width = _cnv.width;
            _ctx.drawImage(_animObj[_thisRef.imageGlobalArray[i].item].img, _thisRef.imageGlobalArray[i].xPos - _animObj[_thisRef.imageGlobalArray[i].item].offsetx, _thisRef.imageGlobalArray[i].yPos - _animObj[_thisRef.imageGlobalArray[i].item].offsety);
            _thisRef.imageGlobalArray[i].step++;
            if (_thisRef.imageGlobalArray[i].step >= Number(_animObj[_thisRef.imageGlobalArray[i].item].steps)) {
          _thisRef.controlObj.callBackGlobalAnimation(_thisRef.imageGlobalArray[i].item)
            if (_animObj[_thisRef.imageGlobalArray[i].item].loop == "no") {
          _thisRef.imageGlobalArray.splice(i, 1);
          } else {
          _thisRef.imageGlobalArray[i].step = 0;
            _thisRef.imageGlobalArray[i].xPos = 0;
            _thisRef.imageGlobalArray[i].yPos = 0;
          }
          } else {
          _thisRef.imageGlobalArray[i].xPos -= Number(_animObj[_thisRef.imageGlobalArray[i].item].hshift);
            _thisRef.imageGlobalArray[i].yPos -= Number(_animObj[_thisRef.imageGlobalArray[i].item].vshift);
          }
          }
          } else {
          clearInterval(this.imageGlobalInterval);
          }
          }, 80);
        },
        resetGlobalAnimation: function(aId) {
        $("#anim_" + aId).hide();
          for (var _i = 0; _i < this.imageGlobalArray.length; _i++) {
        if (this.imageGlobalArray[_i].item == aId) {
        this.imageGlobalArray.splice(_i, 1);
        }
        }
        var _animObj = this.controlObj.getAnimObject();
          var _cnv = document.getElementById("anim_" + aId);
          var _ctx = _cnv.getContext('2d');
          _cnv.width = _cnv.width;
          _ctx.drawImage(_animObj[aId].img, - 1 * _animObj[aId].offsetx, - 1 * _animObj[aId].offsety);
        },
        //=============================================================================
        updatePageHead: function() {
        var _retTitle = this.retTitle();
          var _retTitleType = this.retTitleType();
          if (_retTitle == "") {
        _retTitleType = "false";
        }
        switch (_retTitleType) {
        case "true":
          $(".pagehead").show();
          $(".qpagehead").hide();
          $("#pagehead").html(_retTitle);
          break;
          case "false":
          $(".pagehead").hide();
          $(".qpagehead").hide();
          $("#pagehead").html("");
          break;
          case "question":
          $(".pagehead").show();
          $(".qpagehead").hide();
          $("#pagehead").html(_retTitle);
          /*
           $(".qpagehead").hide();
           $("#qPagehead").show();
           $("#qPagehead div:eq(0)").html(_retTitle);
           */
          break;
        }
        },
        //=============================================================================
        addDragEvent: function(aRef) {
        var _thisRef = this;
          $(aRef).draggable({
        containment: "parent",
          drag: function(event, ui) {
          _thisRef.onDragUpdate(event, ui);
          }
        });
        },
        onDragUpdate: function(event, ui) {
        //setVolume
        switch ($(ui.helper).attr("id")) {
        case "volslider":
          var _topVar = Number($(ui.helper).css("top").split("px")[0]);
          var _hgtVar = Number($(ui.helper).offsetParent().height()) - Number($(ui.helper).height());
          var _per = 1 - Number((_topVar / _hgtVar).toFixed(2))
          this.controlObj.setVolume(_per);
          break;
        }
        },
        setSliderOnMute: function(aVol) {
        var _topVar = Number($("#volslideholder").height()) - (aVol * (Number($("#volslideholder").height()) - Number($("#volslider").height())));
          $("#volslider").css("top", (_topVar - Number($("#volslider").height())) + "px");
        },
        //=============================================================================
        onUnload: function() {
        try {
        pageUnload();
          pageUnload = null;
        } catch (e) {}
        },
        //=============================== Lesson Tracker =========================
        setPageTrackObject: function(aData) {
        this.controlObj.setPageTrackObject(aData);
        },
        setCorrectPagedataObj: function(aData) {
        this.controlObj.setCorrectPagedataObj(aData);
        },
        getPageTrackerData: function(aPageId) {
        return this.controlObj.getPageTrackerData(aPageId);
        },
        getCorrectPagedataObj: function(aPageId) {
        return this.controlObj.getCorrectPagedataObj();
        },
        //=============================================================================
        showConsole: function(aStr) {
        var _nv = window.open("", "tracer");
          _nv.document.writeln(aStr + "<br><br>");
        },
        getCurModName: function() {
        return this.controlObj.getCurModName();
        },
        getCurrentPageId: function() {
        return this.controlObj.getCurrentPageId();
        },
        //=============================================================================
        showToolTip: function(str, ePar) {
        $("#customToolTip").css("z-index", 3000);
          $("#customToolTip").show();
          $("#customToolTip").text(str);
          $(window).unbind("mousemove");
          $("#customToolTip").css("top", ePar.pageY - 40 - $("#customToolTip").height());
          $("#customToolTip").css("left", ePar.pageX - ($("#customToolTip").width() / 2));
          $(window).mousemove(this.moveToolTip);
        },
        moveToolTip: function(e) {
        $("#customToolTip").css("top", e.pageY - 40 - $("#customToolTip").height());
          $("#customToolTip").css("left", e.pageX - ($("#customToolTip").width() / 2));
        },
        hideToolTip: function() {
        $("#customToolTip").text("");
          $("#customToolTip").hide();
          $(window).unbind("mousemove");
        },
        showDataPerBtn: function(func) {
        this.controlObj.showDataPerBtn(func);
        },
        //=============================================================================
        setAttempt: function(_bool) {
        this.controlObj.setAttempt(_bool);
        },
        //=============================================================================
        setCompletionStatus: function() {
        this.controlObj.setCompletionStatus();
        },
        getCompletionStatusArr: function() {
        return this.controlObj.getCompletionStatusArr();
        },
        addGlossaryEvent: function() {
        $(".pilotGlossary").unbind("click");
          var _ref = this;
          $(".pilotGlossary").live("click", function() {
        var _configObject = _ref.controlObj.getConfigObject();
          var _lesssonGrade = _configObject.grade;
          var _term = encodeURI($(this).text().trim().toLowerCase());
          if ($(this).attr("term")) {
        _term = encodeURI($(this).attr("term"));
        }
        var _lang = "en";
          switch (_ref.controlObj.getISOLanguageCode()) {
        case "en":
          _lang = "en";
          break;
          case "es":
          _lang = "sp";
          break;
          default:
          _lang = "en";
        }
        if (_lesssonGrade.toLowerCase() == "k" || _lesssonGrade.toLowerCase() == "00") {
        _lesssonGrade = "0";
        }
        _ref.openExternalURL(_ref.thinkCentralHost + "/content/hsp/science/fusion/common/glossary_9780547511795_/html/grade.html?grade=gr0" + _lesssonGrade + "?language=" + _lang + "?term=" + _term + "");
        })
        },
        //================================ FUNCTIONS WRITTEN BY VISHAL =============================================
        showPageSlider: function(aCount, pageSliderClsObj) {
        ////console.log("view.js 974 aCount ="+aCount+" : pageSliderClsObj ="+pageSliderClsObj);
        var _ref = this;
          var pageTitle = this.controlObj.getCourseTitle();
          this.showPageCount(1, aCount);
          var newPageStandardSlider = new pageSliderClsObj({
          handle: $("#shellPageSlider"),
            orientation: "horizontal",
            range: [0, aCount - 1],
            steps: 1,
            up: function(event) {
            _ref.controlObj.trackSliderChanges(event.value, _ref.retTitle());
            }
          });
          this.controlObj.createNewPageStandardSliderObj(newPageStandardSlider);
          $("#shellPageSlider .ui-slider-handle").unbind('keydown');
        },
        retScreenTitle: function() {
        return this.retTitle();
        },
        retTitleObj: function() {
        return this.controlObj.retTitleObj();
        },
        showPageCount: function(aNum, aTotalPages) {
        var maxBlueLineWidth = $(shellPageSlider).width();
          var per = aNum / aTotalPages;
          var perWhite = (this.lastMaxScreenViewed + 1) / aTotalPages;
          var lineWidthOffset = 10;
          var lineWidthOffsetWhite = 0;
          var _calculatedWhiteWid = (per * maxBlueLineWidth) - lineWidthOffset;
          var _tmpWd = (($("#shellPageSlider").width()) / (aTotalPages)) * aNum
          var _part = ($("#shellPageSlider").width() - 20) / (aTotalPages - 1);
          var _ccL = (_part * (aNum - 1));
          if ($("#shellPageSlider a").css("left")) {
        var _sliderLeft = Number($("#shellPageSlider a").css("left").split("px")[0]);
          var _sliderWd = Number($("#shellPageSlider a").css("width").split("px")[0]);
          //var _cLeft = _sliderLeft+20;
          var _cLeft = (_ccL + 20);
          //$(shellPageSliderBlueBg).css("width",_cLeft+"px");
          $(shellPageSliderBlueBg).css("width", (_ccL + 20) + "px");
          if (_cLeft > this.maxLeftPosOfWhtBg) {
        this.maxLeftPosOfWhtBg = _cLeft;
        }
        $(shellPageSliderWhiteBg).css("width", this.maxLeftPosOfWhtBg + "px");
          //console.log("_sliderLeft "+_sliderLeft+" : _sliderWd ="+_sliderWd);
        }
        //console.log("_part ==="+(_part*(aNum-1))+" : aNum ="+aNum);
        if (this.controlObj.getISOLanguageCode() == "es") {
        $("#pageCount").html(aNum + " de " + aTotalPages);
        } else {
        $("#pageCount").html(aNum + " of " + aTotalPages);
        }
        },
        changePlayerSkin: function(configObj) {
        //var bgName = this.controlObj.getCurModName().charAt(3).toLowerCase();
        var bgName = this.controlObj.getCurModName().split("_")[1].charAt(0).toLowerCase();
          $(".bgDivCls").css("background", "url(../../../common_core/media/images/" + bgName + "_bg.jpg) no-repeat");
          if (configObj.grade <= 3 || configObj.grade.toLowerCase() == "k") {
        $(".playerSp").css("background-image", "url(../../../common_core/media/images/orange_skin/orange_sprite.png)");
          $(volslider).css("background-image", "url(../../../common_core/media/images/orange_skin/volume_scruber.png)");
          $(shellPageSliderBlueBg).css("background", "#CD6116");
          $(volSliderBack).addClass("volSliderBackOrangeShadow");
          $(toolholder).addClass("greenPanelShadow");
          $(volslideholderBg).addClass("greenPanelShadow");
          //$('body').css('font-family', 'avenir_regular !important');
          $('html > head').append($('<style>body,div,p,li,ui{font-family:avenir_regular !important;} .callOutText{ font-size: 18px; } b,.pilotGlossary{font-family:avenir_bold} </style>'));
        } else {
        $(".playerSp").css("background-image", "url(../../../common_core/media/images/blue_skin/blue_sprite.png)");
          $(volslider).css("background-image", "url(../../../common_core/media/images/blue_skin/volume_scruber.png)");
          $(shellPageSliderBlueBg).css("background", "#84bae5");
          $(volSliderBack).removeClass("volSliderBackOrangeShadow");
          $(toolholder).removeClass("greenPanelShadow");
          $(volslideholderBg).removeClass("greenPanelShadow");
          //$('body').css('font-family', 'verdana_regular !important');
          $('html > head').append($('<style>body,div,p,li,ui{font-family:verdana_regular !important;} b,.pilotGlossary{font-family:verdana_bold;} </style>'));
        }
        if ($("html").attr("lang") == "es") {
        $("#brandLogo").removeClass().addClass("gradesp_" + this.controlObj.retLessonGrade().toLowerCase());
        } else {
        $("#brandLogo").removeClass().addClass("grade_" + this.controlObj.retLessonGrade().toLowerCase());
        }
        },
        retLessonGrade: function() {
        return this.controlObj.retLessonGrade();
        },
        retPageConfigObj: function() {
        return this.controlObj.retPageConfigObj();
        },
        retTotalPages: function(num) {
        return this.controlObj.retTotalPages();
        },
        showPlayerVideoBtn: function(classRef) {
        this.playerVideoClassRef = classRef;
          this.showElement("videoPlayBtnBox", true);
        },
        retLessonLang: function() {
        return this.controlObj.getISOLanguageCode();
        },
        stopNextGlow: function() {
        // console.log("view stopHighLightBool");
        this.stopHighLightBool = true;
        },
        //======================================================
        //Course Title Added by Govinda on 17 Jan 2014----------
        setLessonTitle: function(_str) {
        var _cotitle = _str.trim();
          $("#coursetitle").attr("fullname", _cotitle);
          if (_cotitle.length > 50) {
        $("#coursetitle").html(_cotitle.substring(0, 50) + "<img id='coursetitlearrow' src='../../../common_core/media/images/titlearrow.png'/>");
        } else {
        $("#coursetitle").html(_cotitle.substring(0, 50));
        }
        $("#coursetitlearrow").live("click", function() {
        pilotObj.expandTitle($("#coursetitle"))
        });
        },
        //======================================================
        closeMessageBox: function() {
        $(playerMsgBoxClose).hide();
          $(playerMsgBox).hide();
          $("#stayOnSame").hide();
          $("#moveNextBtn").hide();
        },
      }
    });
  
