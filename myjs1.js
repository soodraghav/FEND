////first use get ajax and get the json
////in dataFilter of ajax modify the json as required
////then call "initializeTree" function and pass the modified json to it
////then in "initializeTree" function initialize the treegrid
window.onload = function() {
    // load easyui tree        
    var flag = true;
    var editingId;
    initializeTestSuiteTable2 = function() {
        $.ajax({
            url: "data/runnerdata.json",
            "async": true,
            dataType: 'json',
            dataFilter: function(data) {
                list = JSON.parse(data);
                testsuiteArray = [];
                var ctr = 1;
                var tempCtr;
                for (var i = 1; i <= list.length; i++) {
                    tempCtr = ctr;
                    if (tempCtr == ctr && ctr != 1)
                        ctr++;

                    // var node = $("#testSuiteTable").treetable("node", i+1);
                    var tsNm = list[i - 1].tsName;
                    testcaseObject = {};
                    // testcaseObject.id = Math.floor((Math.random() * 1000000000) + 1);;
                    testcaseObject.id = ctr;
                    testcaseObject.text = tsNm;
                    testcaseObject.tsName = tsNm;
                    testcaseObject.state = 'closed';
                    testcaseObject.title = tsNm;
                    testcaseObject.children = [];
                    testcaseObject.exeplatform = "";
                    testcaseObject.exetype = "";
                    testcaseObject.runon = "";
                    testcaseObject.thread = list[i - 1].thread;
                    for (var j = 1; j <= list[i - 1].tsTCLink.length; j++) {
                        //loop of testcases
                        var tcNm = list[i - 1].tsTCLink[j - 1].tcName;
                        // var tcNm = list[i].tsTCLink[j];
                        childrenObject = {};
                        childrenObject.parentId = ctr;
                        // childrenObject.id = parseInt(testcaseObject.id + "" + j);//(i * 10) + j;
                        // childrenObject.id = Math.floor((Math.random() * 1000000000) + 1);
                        childrenObject.id = ++ctr;
                        childrenObject.text = tcNm;
                        childrenObject.title = tcNm;
                        childrenObject.tsName = tcNm;
                        childrenObject.exeplatform = list[i - 1].tsTCLink[j - 1].exeplatform;
                        childrenObject.exetype = list[i - 1].tsTCLink[j - 1].exetype;
                        childrenObject.runon = list[i - 1].tsTCLink[j - 1].runon;
                        childrenObject.thread = ""; // list[i].tsTCLink[j].thread;
                        testcaseObject.children.push(childrenObject);
                    }
                    testsuiteArray.push(testcaseObject);
                }
                // console.log(JSON.stringify(testsuiteArray))
                // alert('done');
                initializeTree(testsuiteArray);
            },
            complete: function(jqXHR, textStatus) {
                // $('#cc').combobox({
                //     });
                console.log('testSuiteTable : ', jqXHR.status);
            }

        });

    };

    initializeTestSuiteTable2();



    function initializeTree(testsuiteArray) {
        $('#test').treegrid({
            data: testsuiteArray,
            idField: "id",
            treeField: "tsName",
            fitColumns: true,
            resizeHandle: "right",
            checkbox: "true",
            loadMsg: "Processing, please wait …",
            frozen: true,
            //  multiSort: "true",
            order: "asc",
            // frozen///////////////////
            //   sortName: "tsName",
            // remoteSort: true,
            //

            
            frozenColumns: [
                [{
                        field: 'tsName',
                        title: 'Testsuites',
                        width: "40%",
                        sortable: true
                    }, {
                        field: 'exeplatform',
                        title: 'Exec PlatForm',
                        width: "25%",
                        sortable: true,
                        // formatter: function(ch1, data) {

                        //     var firefox = "";
                        //     var chrome = "";
                        //     var ie = "";
                        //     var safari = "";
                        //     // var exes = ['firefox','chrome','ie','safari']

                        //     if (typeof data.children != 'undefined') {
                        //         return "";
                        //     } else {
                        //         var exeplatforms = [];
                        //         exeplatforms = data.exeplatform.split(",");
                        //         $.each(exeplatforms, function(index, value) {
                        //             if (value.toLowerCase().trim() == "firefox")
                        //                 firefox = "selected";
                        //             if (value.toLowerCase().trim() == "chrome")
                        //                 chrome = "selected";
                        //             if (value.toLowerCase().trim() == "safari")
                        //                 safari = "selected";
                        //             if (value.toLowerCase().trim() == "ie")
                        //                 ie = "selected";
                        //             if (value === "")
                        //                 firefox = "selected";
                        //         });


                        //         return '<select id="cc" class="easyui-combobox" name="dept" style="width: 100%" multiple=true;>' +
                        //             '<option ' + firefox + '>FireFox</option>' +
                        //             '<option ' + chrome + '>Chrome</option>' +
                        //             '<option ' + ie + '>IE</option>' +
                        //             '<option ' + safari + '>Safari</option>' +
                        //             '</select>';
                        //     }
                        // }
                    },
                    {
                        field: 'exetype',
                        title: 'Exe Type',
                        width: "10%",
                        sortable: true
                    },
                    {
                        field: 'runon',
                        title: 'Runon',
                        width: "15%",
                        sortable: true
                    },
                    {
                        field: 'thread',
                        title: 'Thread',
                        width: "10%",
                        editor: {
                            type: 'numberbox'
                        },
                        sortable: true
                    }
                ]
            ],
            onClickRow: function(row,ch1){

                if (typeof row.children == 'undefined') {
                    var $oldDiv = $(event.target);
                    if($oldDiv  && $oldDiv[0].className.search('exeplatform') != -1 && $oldDiv[0].tagName != "INPUT"){
                        var oldVals = row.exeplatform;

                        var firefox = "";
                        var chrome = "";
                        var ie = "";
                        var safari = "";

                       
                        var exeplatforms = [];
                        exeplatforms = oldVals.split(",");
                        $.each(exeplatforms, function(index, value) {
                            if (value.toLowerCase().trim() == "firefox")
                                firefox = "selected";
                            if (value.toLowerCase().trim() == "chrome")
                                chrome = "selected";
                            if (value.toLowerCase().trim() == "safari")
                                safari = "selected";
                            if (value.toLowerCase().trim() == "ie")
                                ie = "selected";
                            if (value === "")
                                firefox = "selected";
                        });


                        var selectElement = '<select id="cc" class="easyui-combobox" name="dept" style="width: 100%" multiple=true;>' +
                                        '<option ' + firefox + '>FireFox</option>' +
                                        '<option ' + chrome + '>Chrome</option>' +
                                        '<option ' + ie + '>IE</option>' +
                                        '<option ' + safari + '>Safari</option>' +
                                        '</select>';

                        var $td = $(event.target).closest('td');

                        // $td.remove($oldDiv[0]);
                            $oldDiv.text("");
                            $td.append($(selectElement));
                            $("#cc").combobox();

                             $(document).on('dblclick',function () {
    
	                            var selected = $("#cc").combobox('getText');
	                            console.log(selected);
	                            $td.find('span').replaceWith(selected);
	                         	// $oldDiv.closest('td').replaceWith('<td>' + selected + '<td>');
	                         //   $oldDiv.closest('td').append("as");
	                    //        $oldDiv.empty();
	                            console.log("done");
							});
                    }







                }
            },



            onClickCell: function(field, row) {  
                //
                if (flag === true) {
                    editingId = row.id;
                }
                if (typeof row.children == 'undefined') {
                    $('#test').treegrid('endEdit', editingId);
                    flag = !flag;
                    console.log("undefinedendedit");
                    //flag = !flag;
                    flag = true;



                } else if (row.children.length > 0) {
                    if ((flag === true) && (field === "thread")) {
                        $('#test').treegrid('beginEdit', editingId);
                        flag = !flag;
                        console.log("beginedit");
                        $(".textbox-text.validatebox-text").focus();

                    } else {
                        $('#test').treegrid('endEdit', editingId);
                        flag = !flag;
                        console.log("endedit");

                    }

                }

            },


            // onLoadSuccess: function(ch1, data) {
            //     $(this).treegrid('getPanel').find('.easyui-combobox').each(function(ch1, ch2, ch3) {
            //         $(".easyui-combobox").combobox();

            //     });
            // }

        });
       // $('#test').treegrid('enableFilter');

    }
};


