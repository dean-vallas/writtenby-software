/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use strict";

(function () {
    var messageBanner;
    var whichReport;
    var cursorX, cursorY;
    var arcGridPoints = [];
    // The initialize function must be run each time a new page is loaded.
    Office.initialize = function (reason) {
        $(document).ready(function () {

            if (!Office.context.requirements.isSetSupported("WordApi", "1.1")) {
                $("#template-description").text("This sample displays the selected text.");
                $("#button-text").text("Display!");
                $("#button-desc").text("Display the selected text");
                return;
            }
            //displayAllBindings();  
            //Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", true);
            Office.context.document.settings.saveAsync();
            //Office.context.document.on

            // #region Click Events;
            // Add event handlers for each button.
            $("#btnListCharNames").click(btnListCharNames);

            //$('#selectName').change(selectNameChanged);
            $("#btnRunReport").click(selectNameChanged);

            $("#btnSlugline").click(btnSlugline);
            $("#btnAction").click(btnAction);
            $("#btnName").click(btnName);
            $("#btnDirection").click(btnDirection);
            $("#btnDialog").click(btnDialog);
            $("#btnCutTo").click(btnCutTo);
            $("#btnDissolveTo").click(btnDissolveTo);
            $("#btn2ndSlug").click(btn2ndSlug);
            $("#btnNotes").click(btnNotes);
            $("#btnParaphrase").click(btnParaphrase);
            $("#btnScene").click(btnScene);
            $("#btnNoteToDo").click(btnNoteToDo);

            $("#btnUpToTop").click(btnUpToTop_click);
            $("#btnWrite").click(btnWrite_click);
            $("#dropDownAnalyze").click(dropDownAnalyze_click);
            $("#dropDownAnalyze").mouseover(dropDownAnalyze_mouseover);

            $("#btnDialogReport").mouseover(btnDialogReport_mouseover);
            $("#btnDialogReport").click(btnDialogReport_click);
            $("#btnGroupings").click(btnGroupings_click);
            $("#btnGroupings").mouseover(btnGroupings_mouseover);
            $("#btnFlow").mouseover(btnFlow_mouseover);
            $("#btnFlow").click(btnFlow_click);
            $("#btnArc").click(btnArc_click);
            $("#btnBars").click(btnBars_click);
            $("#btnRunBars").click(btnRunBars_click);

            $("#btnHome").click(btnHome_click);
            $("#dropDownAnalyze").mouseover(dropDownAnalyze_mouseover);
            $("#dropDownAnalyze").mouseout(dropDownAnalyze_mouseout);

            //$('#hamburger').mouseover(MenuActiveToggle("hamburger"));
            //$('#hamburger').click(hamburger_click);

            $("#TopNav").show();
            //($('#divTopMessage').text("this is display text"));

            // #endregion
        });
    };

    function selectNameChanged() {
        $("#divSelectName").hide();
        $("#divTopMessage").html("");
        $("#divUserMessage").html("");
        $("#Write").hide();
        $("#displayDiv").html("");

        if (whichReport && whichReport === "flow") {
            $("#divTopMessage").html(
                "Scene appearances of " +
                $("#selectName")
                    .val()
                    .join(" + ")
            );
            $("#divUserMessage").html("Character(s) in scenes as they flow through the story");
            getSceneFlowByCharacter($("#selectName").val(), function (sceneList) {
                if (sceneList) {
                    $("#displayDiv").html(sceneList);
                }
            });
        } else if (whichReport === "groupings") {
            $("#divTopMessage").html(
                "Scene Groupings for " +
                $("#selectName")
                    .val()
                    .join(" + ")
            );
            $("#divUserMessage").html("Groupings of selected characters throughout the story");
            getCharacterGroupingsInScenes($("#selectName").val(), function (sceneList) {
                let output = [];
                //column 0 is the scene summary, 1 is the array of names in that scene

                let names = "";
                let summary = "";
                for (let i = 0; i < sceneList.length; i++) {
                    summary = sceneList[i][0];
                    names = Array.isArray(sceneList[i][1]) ? sceneList[i][1].join(", ") : sceneList[i][1];
                    names = names != undefined ? names.replace(/,\s*$/, "") : names;
                    output.push(names === undefined ? "<span>" + summary + "</span>" : "<span>" + summary + "</span>" + names);
                    if (names && summary) {
                        output.push("<br />...<br /><br />");
                    }
                }
                if (sceneList) {
                    $("#displayDiv").html(output);
                }
            });
        } else if (whichReport === "dialog") {
            $("#divTopMessage").html(
                "All Speeches From " +
                $("#selectName")
                    .val()
                    .join(" + ")
            );
            $("#divUserMessage").html("All of character(s) speeches grouped together");
            getCharacterDialog($("#selectName").val(), function (dialogList) {
                if (dialogList) {
                    $("#displayDiv").html(dialogList);
                    $("#displayDiv").show();
                }
            });
        } else if (whichReport === "bars") {
            buildBarsPage(function (callback) {
                if (callback) {
                    $("#displayDiv").html(callback);
                    $("#displayDiv").show();
                } else {
                    $("#divTopMessage").html("No summaries found to populate report with");
                }
            });
        } else if (whichReport === "arc") {
            console.log("in the arc report for changeSelect")
        }
    }

    // #region Buttons

    function btnListCharNames() {
        listCharacterNames(function (nameList) {
            $("#selectName").html(nameList);
        });

        $("#selectName").show();
        //($('#btnListCharNames').hide());
    }

    function btnSlugline() {
        $("#write").hide();
        listCharacterNames(function (nameList) {
            $("#selectName").html(nameList);
        });
        $("#divSelectName").show();
        $("#selectName").focus();
        Word.run(function (context) {
            // Get the selection point and change the style to the current button's value
            //context.document.getSelection().style = "Slugline";
            //context.document.getSelection().text = $('#selectName').val();
            //showNotification("", "Set to 'Slugline'");
            $("#write").show();
            $("#divSelectName").hide();

            return context.sync();
        }).catch(errorHandler);
    }

    function btnAction() {
        Word.run(function (context) {
            // Get the current paragraph, adjust the Font and Paragraph attributes, and sync it back.
            // Send a notification ot the Notification area.

            var p = context.document.getSelection().paragraphs.getFirstOrNullObject();
            p.load();
            if (p == null || p == undefined || context.document.getSelection().paragraphs.length < 1) {
                showNotification("", "No paragraph selected");
                return context.sync();
            }
            context
                .sync()
                .then(function () {
                    p.load();
                    p.font.set({
                        name: "Courier",
                        size: 11,
                        color: "#000000"
                    });

                    p.set({
                        lineSpacing: 6,
                        leftIndent: 0.25,
                        rightIndent: -0.25,
                        spaceAfter: 8,
                        spaceBefore: 8
                    });
                    //context.document.getSelection().getRange().insertText("\r\n", "End");
                })
                .then(context.sync);

            showNotification("", "Set to 'Action'");
            //context.document.getSelection().originalRange.insertText("", "End");
            return context.sync();
        }).catch(errorHandler);
    }

    function btnName() {
        Word.run(function (context) {
            // Get the current paragraph, adjust the Font and Paragraph attributes, and sync it back.
            // Send a notification ot the Notification area.

            var px = context.document.getSelection().paragraphs;
            context.load(px, "items");
            return context
                .sync()
                .then(function () {
                    var p = px.items[0];
                    p.load("text, lineSpacing, leftIndent, spaceBefore, font/size, font/name, font/color");
                    p.insertText(p.text.toUpperCase(), Word.InsertLocation.replace);
                    p.font.set({
                        name: "Courier",
                        size: 11,
                        color: "#000000"
                    });
                    p.set({
                        lineSpacing: 12,
                        leftIndent: 180,
                        spaceBefore: 12
                    });
                    context.sync();
                    $("#divTopMessage").html("Set to 'Character Name'");
                })
                .catch(errorHandler);
        });
    }

    function btnDirection() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btnDialog() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btnCutTo() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btnDissolveTo() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btn2ndSlug() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btnNotes() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btnParaphrase() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btnScene() {
        Word.run(function (context) {
            // Queue a command to get the current selection and then
            // create a proxy range object with the results.
            var range = context.document.getSelection();

            // This variable will keep the search results for the longest word.
            var searchResults;

            // Queue a command to load the range selection result.
            context.load(range, "text");

            // Synchronize the document state by executing the queued commands
            // and return a promise to indicate task completion.
            return context
                .sync()
                .then(function () {
                    // Get the longest word from the selection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) {
                        return word1.length > word2.length ? word1 : word2;
                    });

                    // Queue a search command.
                    searchResults = range.search(longestWord, {
                        matchCase: true,
                        matchWholeWord: true
                    });

                    // Queue a commmand to load the font property of the results.
                    context.load(searchResults, "font");
                })
                .then(context.sync)
                .then(function () {
                    // Queue a command to highlight the search results.
                    searchResults.items[0].font.highlightColor = "#FFFF00"; // Yellow
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync);
        }).catch(errorHandler);
    }

    function btnNoteToDo() {
        $("#Analyze").hide();
        $("#Write").hide();
        $("#topTabs").show();
    }

    function btnUpToTop_click() {
        $("#divHeaderMessage").hide();
        $("#displayDiv").html("");
        $("#Analyze").hide();
        $("#Write").hide();
        $("#divSelectName").hide();
        $("#TopNav").show();
    }

    // #endregion

    // #region Tabs
    function btnWrite_click() {
        ($("#divTopMessage").html("Formatting"));
        $("#divUserMessage").html("Manually assign formatting to paragraphs");
        MenuActiveToggle("btnWrite");
        $("#displayDiv").html("");
        $("#Analyze").hide();
        $("#Write").show();
        //("#Arc").load("Arc.html");
    }

    function dropDownAnalyze_mouseover() {
        //($("#displayDiv").html(""));
        //($('#Analyze').hide());
        $("#divTopMessage").html("");
        $("#divUserMessage").html("");
        $("#Write").hide();

        $("#dropDownAnalyze").show();
    }

    function dropDownAnalyze_mouseout() {
        //($("#displayDiv").html(""));
        //($('#Analyze').hide());
        $("#analyzeMenu").hide();
    }

    function dropDownAnalyze_click() {
        //($("#divHeaderMessage").html("Analysis Tools"));
        //($("#divHeaderMessage").show());
        //($('#TopNav').hide());
        $("#Write").hide();
    }

    function btnDialogReport_click() {
        whichReport = "dialog";
        listCharacterNames(function (nameList) {
            $("#selectName").html(nameList);
        });
        $("#divSelectName").show();
        $("#selectName").focus();
    }

    function btnDialogReport_mouseover() {
        //showNotification("View story structure as a whole");
        $("#divUserMessage").html("All of character(s) speeches grouped together");
    }

    function btnGroupings_mouseover() {
        //($("#divUserMessage").html("Groupings of selected characters throughout the story"));
    }

    function btnGroupings_click() {
        whichReport = "groupings";
        listCharacterNames(function (nameList) {
            $("#selectName").html(nameList);
        });
        $("#divSelectName").show();
        $("#selectName").focus();
    }

    function btnFlow_mouseover() {
        //showNotification("Character(s) in scenes as they flow through the story");
        //ms - font - s ms - fontColor - white
        //listCharacterNames(function (nameList) {
        //    ($('#selectName').html(nameList));
        //});
        //($("#divSelectName").show());
        //($('#selectName').show());
    }

    function btnFlow_click() {
        whichReport = "flow";
        listCharacterNames(function (nameList) {
            $("#selectName").html(nameList);
        });
        $("#divSelectName").show();
        $("#selectName").focus();
    }

    function btnHome_click() {
        MenuActiveToggle("btnHome");
        $("#divUserMessage").text("Written By");
        $("#divTopMessage").text("");
        $("#displayDiv").hide();
        $("#Write").hide();
        $("#divSelectName").hide();

        //($("#divTopMessage").text("hello"));
    }

    // #endregion

    // #region Helpers

    function setTemplate() {
        Word.run(function (context) {
            var a = context.application.createDocument(this, "./MovieTemplate.txt", DocumentType.Base64);
            //a.load();
            //a.open();
            context.sync();

            // showNotification("", Word.DocumentProperties["template"]);
            var b = Word.DocumentProperties(a);

            //context.document.load(a);
            //const newdoc1 = context.application.createDocument().open('./MovieTemplate.txt');
            //var itworked = context.application.createDocument('./MovieTemplate.txt').load().open();
            //context.document.load(newdoc);
            //context.sync();
            //newdoc.open();
            //const tmpl = context.document.properties.template;

            //Word.http.get('./MovieTemplate.txt').subscribe(response => {
            //    Word.run(async context => {
            //        const myNewDoc = context.application.createDocument(response);
            //        context.load(myNewDoc);
            //        await context.sync();
            //        myNewDoc.open();
            //        await context.sync();
            //    });
            return context.sync();
        }).catch(errorHandler);
    }

    function applyStyle(para, stylename) {
        Word.run(function (context) {
            para.style = stylename;
            return context.sync();
        }).catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function loadSampleData() {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {
            // Create a proxy object for the document body.
            var body = context.document.body;

            // Queue a commmand to clear the contents of the body.
            body.clear();
            // Queue a command to insert text into the end of the Word document body.
            body.insertText("This is a sample text inserted in the document", Word.InsertLocation.end);

            // Synchronize the document state by executing the queued commands, and return a promise to indicate task completion.
            return context.sync();
        }).catch(errorHandler);
    }

    function displaySelectedText() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, function (result) {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                showNotification("The selected text is:", '"' + result.value + '"');
            } else {
                showNotification("Error:", result.error.message);
            }
        });
    }

    //$$(Helper function for treating errors, $loc_script_taskpane_home_js_comment34$)$$
    function errorHandler(error) {
        // $$(Always be sure to catch any accumulated errors that bubble up from the Word.run execution., $loc_script_taskpane_home_js_comment35$)$$
        // showNotification("Error:", error);
        $("#divUserMessage").html("Error.  Message: " + error.message);
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Helper function for displaying notifications
    function showNotification(header, content) {
        $("#notification-body").text(content);
        $("#notification-header").text(header);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }

    function arrayContainsArray(superset, subset) {
        if (0 === subset.length) {
            return false;
        }
        return subset.every(function (value) {
            return superset.indexOf(value) >= 0;
        });
    }

    function sortByFrequency(arr) {
        let counter = arr.reduce((counter, key) => {
            counter[key] = 1 + counter[key] || 1;
            return counter;
        }, {});
        //console.log(counter);
        // {"apples": 1, "oranges": 4, "bananas": 2}

        // sort counter by values (compare position 1 entries)
        // the result is an array
        let sorted_counter = Object.entries(counter).sort((a, b) => b[1] - a[1]);
        //showNotification(sorted_counter);
        // [["oranges", 4], ["bananas", 2], ["apples", 1]]

        // show only keys of the sorted array
        return sorted_counter.map(x => x[0]);
    }

    function MenuActiveToggle(element) {
        var x = document.getElementById(element);
        if (x.style.class === "") {
            x.style.class = "Active";
        } else {
            x.style.class = "";
        }
    }

    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    function hamburger_click() {
        var x = document.getElementById("hamburger");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    // #endregion

    // #region Logic

    function listActs(callback) {
        Word.run(async function (context) {
            var actList = [];
            var paragraph, charName;
            var paras = context.document.body.paragraphs;
            context.load(paras, "text, style, font");
            await context.sync();

            for (var i = 0; i < paras.items.length; i++) {
                paragraph = paras.items[i];
                //grab the Act, put it in the output
                if (paragraph.style === "Act Break") {
                    actList.push(paragraph.text);
                }
            }
            callback(actList);
        });
        //.catch(function (error) {
        //    $('#divUserMessage').html("Error in listActs(): " + error.message);
        //    //showNotification('Error: ' + error.content.join(", "));
        //    //showNotification('Error: ' + JSON.stringify(error));
        //    if (error instanceof OfficeExtension.Error) {
        //        console.log('Debug info: ' + JSON.stringify(error.debugInfo));
        //    }
        //});
    }

    function listCharacterNames(callback) {
        Word.run(function (context) {
            var out = "";
            var charNameList;
            var paragraph;
            var paras = context.document.body.paragraphs;
            context.load(paras, "text, style");
            return context
                .sync()
                .then(function () {
                    for (let i = 0; i < paras.items.length; i++) {
                        paragraph = paras.items[i];
                        if (paragraph.style === "Character Name" && paragraph.text.length > 0)
                            charNameList += "," + paras.items[i].text.toUpperCase();
                    }
                    context.sync().then(function () {
                        out = sortByFrequency(charNameList.split(",").filter(Boolean));
                        out.filter(name => name != "undefined" && name != "");
                        for (var k = 0; k < out.length; k++) {
                            out[k] = "<option>" + out[k] + "</option>";
                        }
                        //delete out[0];
                        //out.splice(0, 0, "<option><option>");
                        callback(out);
                    });
                })
                .catch(function (error) {
                    showNotification("Error: " + JSON.stringify(error));
                    if (error instanceof OfficeExtension.Error) {
                        console.log("Debug info: " + JSON.stringify(error.debugInfo));
                    }
                });
        });
    }

    function getSceneFlowByCharacter(namesToFind, callback) {
        Word.run(function (context) {
            var paragraph;
            var summ;
            var charsFoundInScene = [];
            var paras = context.document.body.paragraphs;
            context.load(paras, "text, style");
            return context.sync().then(function () {
                var charSummaryMap = [];
                for (var i = 0; i < paras.items.length; i++) {
                    paragraph = paras.items[i];
                    if (paragraph.style === "Act Break")
                        charSummaryMap.push("<br /><b>" + paragraph.text + "</b><br /><hr />", " ");
                    if (paragraph.style === "Summary") {
                        summ = paragraph.text;
                        let j = ++i;
                        paragraph = paras.items[j];
                        while (j < paras.items.length && paragraph.style != "Summary") {
                            paragraph = paras.items[j];
                            if (paragraph.style === "Character Name" && namesToFind.includes(paragraph.text.toUpperCase())) {
                                charsFoundInScene.push(paragraph.text.toUpperCase());
                            }
                            j++;
                        }
                        if (arrayContainsArray(namesToFind, charsFoundInScene) && !charSummaryMap.includes(summ)) {
                            charSummaryMap.push(
                                summ,
                                charsFoundInScene.filter((v, i, a) => a.indexOf(v) === i)
                            ); //get unique values from charsFoundInScene
                            charsFoundInScene = [];
                        }
                    }
                } // end for
                callback(charSummaryMap.join("<br>"));
                context.sync();
            });
        }).catch(function (error) {
            showNotification("Error: " + JSON.stringify(error));
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }

    function getCharacterGroupingsInScenes(namesToFind, callback) {
        Word.run(function (context) {
            // Show all the characters grouped together, for every scene
            var paragraph;
            var paras = context.document.body.paragraphs;
            context.load(paras, "text, style");
            return context
                .sync()
                .then(function () {
                    var summ;
                    var charSummaryMap = [];
                    var charsFoundInScene = [];
                    let i = 0;
                    while (i < paras.items.length) {
                        paragraph = paras.items[i];
                        if (paragraph.style === "Act Break") {
                            charSummaryMap.push(["<b>" + paragraph.text + "</b><br /><hr />"]);
                        }
                        if (paragraph.style === "Summary") {
                            summ = paragraph.text + "<br />";
                            i++;
                            // get the characters in the scene
                            while (i < paras.items.length) {
                                //need to get all the names in each scene, then check if any of the names
                                //is in the namesToFind list.  Either discard all, or add all
                                paragraph = paras.items[i];
                                //check the rest of the names in this scene
                                if (paragraph.style === "Character Name" && !charsFoundInScene.includes(paragraph.text.toUpperCase())) {
                                    charsFoundInScene.push(paragraph.text.toUpperCase());
                                }
                                if (paragraph.style === "Act Break" && !charSummaryMap.includes(paragraph.text)) {
                                    charSummaryMap.push(["<b>" + paragraph.text + "</b><br /><hr />"]);
                                }
                                if (paragraph.style === "Summary") {
                                    break;
                                }
                                i++;
                                paragraph = paras.items[i];
                            } // end inner while
                        } // end if == Heading 2, Summary
                        //push the scene summary and list of names to the collector array if appropriate
                        if (charsFoundInScene.length > 0 && namesToFind.some(ai => charsFoundInScene.includes(ai))) {
                            // if (!charSummaryMap.includes(summ)) {
                            charSummaryMap.push([summ, charsFoundInScene]);
                            // }
                        }
                        //summ = "";
                        charsFoundInScene = [];
                        i++;
                    } //end outer while
                    callback(charSummaryMap);
                    context.sync();
                }) // end .then
                .catch(function (error) {
                    showNotification("Error: " + JSON.stringify(error));
                    if (error instanceof OfficeExtension.Error) {
                        console.log("Debug info: " + JSON.stringify(error.debugInfo));
                    }
                }); // end catch
        }); // end Word.run
    } // end function

    function getCharacterDialog(nameToMap, callback) {
        Word.run(function (context) {
            var charDialogList = [];
            var paragraph, charName;
            var paras = context.document.body.paragraphs;
            context.load(paras, "text, style, font");
            return context
                .sync()
                .then(function () {
                    for (var i = 0; i < paras.items.length; i++) {
                        paragraph = paras.items[i];
                        //grab the Act, put it in the output
                        if (paragraph.style === "Act Break") {
                            charDialogList.push("<br /><b>" + paragraph.text + "</b><br />");
                        }
                        // grab selected characters' dialog per scene (demarcated by Slugline)
                        if (paragraph.style === "Character Name" && nameToMap.includes(paragraph.text.toUpperCase())) {
                            while (i < paras.items.length && paragraph.style != "Slugline") {
                                if (paragraph.style === "Act Break") {
                                    charDialogList.push("<br /><b>" + paragraph.text + "</b><br />");
                                }
                                if (paragraph.style === "Character Name" && nameToMap.includes(paragraph.text.toUpperCase())) {
                                    charName = paragraph.text;
                                    if (i < paras.items.length) {
                                        i++;
                                        paragraph = paras.items[i];
                                    }
                                    if (paragraph.style === "Dialog") {
                                        let f = paragraph.font;
                                        if (f.strikeThrough) {
                                            charDialogList.push(
                                                charName.toUpperCase() + "<br / ><strike>" + paragraph.text + "</strike><br />"
                                            );
                                        } else {
                                            charDialogList.push(charName.toUpperCase() + "<br />" + paragraph.text + "<br /></br />");
                                        }
                                    }
                                }
                                if (i < paras.items.length) {
                                    i++;
                                    paragraph = paras.items[i];
                                }
                            }
                        }
                    }
                    callback(charDialogList);
                    charDialogList = [];
                    context.sync();
                })
                .catch(function (error) {
                    //showNotification('Error: ' + error.content.join(", "));
                    showNotification("Error: " + JSON.stringify(error));
                    if (error instanceof OfficeExtension.Error) {
                        console.log("Debug info: " + JSON.stringify(error.debugInfo));
                    }
                });
        });
    }

    function getSummaries(acts, callback) {
        Word.run(function (context) {
            var paras = context.document.body.paragraphs;
            var paragraph;
            let includeThisAct = false;
            var charSummaries = [];
            context.load(paras, "text, style");
            return context
                .sync()
                .then(function () {
                    for (var i = 0; i < paras.items.length; i++) {
                        paragraph = paras.items[i];
                        //grab the Act, put it in the output
                        if (paragraph.style === "Act Break") {
                            if (acts.includes(paragraph.text)) {
                                includeThisAct = true;
                                charSummaries.push(paragraph.text);
                            } else {
                                includeThisAct = false;
                            }
                        }
                        // grab selected scene summary
                        if (paragraph.style === "Summary" && includeThisAct) {
                            charSummaries.push(paragraph.text.substring(0, 100));
                        }
                    }

                    //filter to remove unselected Acts

                    callback(charSummaries);
                    //return charSummaries;
                    //context.sync();
                })
                .catch(function (error) {
                    //showNotification('Error: ' + error.content.join(", "));
                    //showNotification('Error: ' + JSON.stringify(error));
                    $("#divUserMessage").html(error.message);
                    if (error instanceof OfficeExtension.Error) {
                        console.log("Debug info: " + JSON.stringify(error.debugInfo));
                    }
                });
        });
    }

    // #endregion

    // #region Bars Report

    function btnBars_click() {
        //($("#divTopMessage").html("Formatting"));
        document.getElementById("btnBars").style.cursor = "progress";
        $("#displayDiv").html("");
        $("#divUserMessage").html("Emotional Story Arc analysis");
        whichReport = "bars";

        buildActList(function (callback) {
            $("#tableActSelector").html(callback);
            $("#ActPicker").show();
            $("#ActPicker").focus();
        });
        document.getElementById("btnBars").style.cursor = "default";
    }

    function btnRunBars_click(event) {
        $("#ActPicker").hide();
        var acts = [];
        var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
        for (let i = 0; i < checkboxes.length; i++) {
            acts.push(checkboxes[i].value);
        }
        buildBarsPage(acts, "");

        $("#displayDiv").show();
    }

    function buildBarsPage(acts, thisCallback) {
        var callback;
        $("#displayDiv").html("");
        try {
            getSummaries(acts, function (callback) {
                let s = callback;
                let outputDiv = "<div class='grid-container' id='container'><div id='matrixTopDiv' class='item1'>";

                if (s) {
                    //arcGridPoints = new Array(s.length);
                    for (let i = 0; i < s.length; i++) {
                        outputDiv += "<div id='" + i + "' class='summTop tooltip'>" + s[i].substring(0, 70) + " ";
                        outputDiv += "<span class='tooltiptext' id='tip" + i + "'>" + s[i] + "</span></div> ";
                        outputDiv += "<svg class='svgContainer' style='float:left; border-left:-30px;' id='s" + i + "'></svg>";
                    }
                }
                outputDiv += "</div></div>";
                $("#displayDiv").html(outputDiv);

                try {
                    document.getElementById("container").addEventListener("click", printLine, true);
                    document.getElementById("container").addEventListener("mouseover", toggleToolTipOn, true);
                    document.getElementById("container").addEventListener("mouseout", toggleToolTipOff, true);
                    fitToContainer(document.querySelectorAll("canvas"));
                } catch (error) {
                    $("#divTopMessage").html("Failed in adding listeners. :" + error.message);
                }
            });
        } catch (error) {
            $("#divTopMessage").html("Failed in building Bars page.  :" + error.message);
        }
    }

    function createBar(element, direction) {
        if (!element) {
            console.log("no element passed to function");
            return false;
        }
        if (element.target.id === "container") return true;
        var r, s;

        try {
            s = element.target.id.substring(0, 1) === "s"
                ? document.getElementById(element.target.id)
                : document.getElementById("s" + element.target.id);
        } catch (error) {
            console.log("failed to find " + s.id);
            return false;
        }
        let mid = (document.getElementById("container").clientHeight) / 2;
        if (isNaN(mid)) {
            mid = 450;
        }

        let cY = cursorY;
        direction = cY > mid ? "down" : "up";

        try {
            let strUp = "Full height: " + document.getElementById("container").clientHeight + " Mid: " + mid + " Direction: UP starting from Y: " + cY + ", to mid: " + mid + " ID: " + element.target.id;
            let strDown = "Full height: " + document.getElementById("container").clientHeight + " Mid: " + mid + " Direction: DOWN from mid: " + mid + "  to Y: " + cY + " ID: " + element.target.id;
            console.log(direction === "down" ? strDown : strUp);

            s.textContent = "";
            if (direction === "up") {
                // up
                r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                r.setAttribute("fill", "#0000FF"); //blue
                r.setAttribute("x", "0");
                r.setAttribute("y", cY);
                r.setAttribute("opacity", ".4");
                r.setAttribute("width", "30px");
                r.setAttribute("height", mid - cY);
                s.appendChild(r);
            } else {
                //down
                r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                r.setAttribute("fill", "#FF0000"); //red
                r.setAttribute("x", "0");
                r.setAttribute("opacity", ".4");
                r.setAttribute("y", mid);
                r.setAttribute("width", "30px");
                r.setAttribute("height", cY - mid);
                s.appendChild(r);
            }
        } catch (error) {
            console.log("Error creating rectangle.  Y is " + cY + " Message: " + error.message);
        }
    }

    function fitToContainer(canvas) {
        for (let i = 0; i < canvas.length; i++) {
            // Make it visually fill the positioned parent
            canvas[i].style.width = 30;
            canvas[i].style.height = document.getElementById("matrixTopDiv").clientHeight;
        }
    }

    function toggleToolTipOn(e) {
        var a = "tip" + e.target.id.substring(1);
        $("#" + a).show();
    }

    function toggleToolTipOff(e) {
        var a = "tip" + e.target.id.substring(1);
        $("#" + a).hide();
    }

    async function buildActList(callback) {
        var call;
        listActs(function (call) {
            let out = "";
            if (call) {
                for (let i = 0; i < call.length; i++) {
                    out +=
                        "<tr><td width='100px'><input type='checkbox' id='act" +
                        i +
                        "' value='" +
                        call[i] +
                        "'>" +
                        call[i] +
                        "</ input></td></tr>";
                }
                out += "</table>";
                $("#tableActSelector").add(out);
            }
            callback(out);
        });
    }

    function btnBars_onmouseover() { }

    function highlightDiv(e) {
        //$( "#test" ).html("background-color:grey")
        $(document).on("mouseover", "div", function (e) {
            $("#test").html(e.target.getAttribute("id"));
        });
    }

    function printAbsoluteMousePos(e, isMid) {
        cursorX = e.pageX;
        cursorY = e.pageY;

        let midpoint = $(window).height() / 2;

        arcGridPoints.push(cursorX);
        arcGridPoints.push(cursorY);
        let out = e.pageY <= midpoint ? "Above" : "Below";
        isMid(out);
    }

    function printLine(e) {
        printAbsoluteMousePos(e, function (isMid) {
            if (isMid === "Above") {
                createBar(e, "up");
            } else {
                createBar(e, "down");
            }
        });
    }

    // #endregion

    // #region Arc Report
    function btnArc_click() {
        var canvas = document.createElement("canvas");
        canvas.id = "cnv";
        //canvas.class = "grid-container";
        // canvas.style.width = $(window).clientWidth();
        // canvas.style.height = $(window).clientHeight();
        canvas.strokeStyle = "#FF0000"; //red
        canvas.lineWidth = 6;
        //canvas.style.zIndex = 5;
        canvas.style.opacity = ".6";
        canvas.style.position = "absolute";
        canvas.style.zIndex = "3";
        canvas.style.top = "0px";
        document.getElementById("displayDiv").appendChild(canvas);
        var ctx = document.getElementById("cnv").getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var entry;
        arcGridPoints = arcGridPoints.filter(entry => {
            return entry != "undefined";
        });

        var joinedPoints = arcGridPoints.join(",");
        joinedPoints = joinedPoints.replace(/(^,)|(,$)/g, "");
        //runCurve(joinedPoints);


        let tension = 1;
        drawCurve(ctx, joinedPoints, tension);

    }

    function easyCurve(arcGridPoints) {
        //document the grid points to the console
        var i;
        arcGridPoints.forEach((i) => {
            console.log("x=" + i[0, 0] + " y=" + i[0, 1]);
        });
        try {
            var ctx = document.getElementById("cnv").getContext("2d");
            // ctx.height = $(window).height();
            // ctx.width = $(window).width();
            ctx.moveTo(arcGridPoints[0][0, 0], arcGridPoints[0][0, 1]);

            ctx.beginPath();
            for (i = 1; i < arcGridPoints.length - 2; i++) {
                var xc = (arcGridPoints[i][0] + arcGridPoints[i + 1][0]) / 2;
                var yc = (arcGridPoints[i][1] + arcGridPoints[i + 1][1]) / 2;
                console.log("xc, yc:" + xc + ", " + yc);
                ctx.quadraticCurveTo(arcGridPoints[i][0], arcGridPoints[i][1], xc, yc);
            }
            // curve through the last two points
            ctx.quadraticCurveTo(arcGridPoints[i][0], arcGridPoints[i][1], arcGridPoints[i + 1][0], arcGridPoints[i + 1][1]);
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 4;
            ctx.stroke();
        } catch (error) {
            $("#divTopMessage").html("Blew up in easycurve: " + error.message);
        }
    }

    function drawCurve(ctx, ptsa, tension, isClosed, numOfSegments, showPoints) {
        var ptsg = [10, 10, 40, 30, 100, 10, 200, 100, 200, 50, 250, 120];
        ptsa = arcGridPoints;
        showPoints = true;
        showPoints = showPoints ? showPoints : false;


        ctx.beginPath();

        drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));
        try {
            if (showPoints) {
                ctx.strokeStyle = "#FF0000"; //red
                ctx.lineWidth = 6;
                ctx.stroke();
                ctx.beginPath();
                for (let i = 0; i < ptsa.length - 1; i += 2)
                    ctx.rect(ptsa[i] - 2, ptsa[i + 1] - 2, 4, 4);
            }
        } catch (error) {
            console.log("showPoints in drawLines: " + error.message);
        }
    }

    function getCurvePoints(pts, tension, isClosed, numOfSegments) {
        try {
            // use input value if provided, or use a default value   
            tension = (typeof tension != 'undefined') ? tension : 0.5;
            isClosed = isClosed ? isClosed : false;
            numOfSegments = numOfSegments ? numOfSegments : 16;

            var _pts = [], res = [],    // clone array
                x, y,           // our x,y coords
                t1x, t2x, t1y, t2y, // tension vectors
                c1, c2, c3, c4,     // cardinal points
                st, t, i;       // steps based on num. of segments

            // clone array so we don't change the original
            //
            _pts = pts.slice(0);

            // The algorithm require a previous and next point to the actual point array.
            // Check if we will draw closed or open curve.
            // If closed, copy end points to beginning and first points to end
            // If open, duplicate first points to befinning, end points to end
            if (isClosed) {
                _pts.unshift(pts[pts.length - 1]);
                _pts.unshift(pts[pts.length - 2]);
                _pts.unshift(pts[pts.length - 1]);
                _pts.unshift(pts[pts.length - 2]);
                _pts.push(pts[0]);
                _pts.push(pts[1]);
            }
            else {
                _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
                _pts.unshift(pts[0]);
                _pts.push(pts[pts.length - 2]); //copy last point and append
                _pts.push(pts[pts.length - 1]);
            }

            // ok, lets start..

            // 1. loop goes through point array
            // 2. loop goes through each segment between the 2 pts + 1e point before and after
            for (i = 2; i < (_pts.length - 4); i += 2) {
                for (t = 0; t <= numOfSegments; t++) {

                    // calc tension vectors
                    console.log("i=" + i + " _pts[i + 2] " + _pts[i + 2] + " _pts[i - 2]" + _pts[i - 2]);
                    t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
                    t2x = (_pts[i + 4] - _pts[i]) * tension;

                    t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
                    t2y = (_pts[i + 5] - _pts[i + 1]) * tension;

                    // calc step
                    st = t / numOfSegments;

                    // calc cardinals
                    c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
                    c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
                    c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
                    c4 = Math.pow(st, 3) - Math.pow(st, 2);

                    // calc x and y cords with common control vectors
                    x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
                    y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;

                    //store points in array
                    res.push(x);
                    res.push(y);

                }
            }
        } catch (error) {
            console.log("getCurvePoints -- error: " + error.message)
        }
        return res;
    }

    function drawLines(ctx, pts) {
        ctx.moveTo(pts[0], pts[1]);
        for (let i = 2; i < pts.length - 1; i += 2)
            ctx.lineTo(pts[i], pts[i + 1]);
    }
    // #endregion
})();
