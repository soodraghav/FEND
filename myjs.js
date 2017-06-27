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
                for (var i = 1; i <= list.length; i++) {
                    // var node = $("#testSuiteTable").treetable("node", i+1);
                    var tsNm = list[i - 1].tsName;
                    testcaseObject = {};
                    testcaseObject.id = i;
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
                        childrenObject.id = (i * 10) + j;
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
            //  multiSort: "true",
            order: "asc",
            //   sortName: "tsName",
            // remoteSort: true,
            columns: [
                [
                    { field: 'tsName', title: 'Testsuites', width: "20%", sortable: true }, {
                        field: 'exeplatform',
                        title: 'Exec PlatForm',
                        width: "30%",
                        sortable: true,
                        formatter: function(ch1, data) {

                            var firefox = "";
                            var chrome = "";
                            var ie = "";
                            var safari = "";
                            // var exes = ['firefox','chrome','ie','safari']

                            if (typeof data.children != 'undefined') {
                                return "";
                            } else {
                                var exeplatforms = [];
                                exeplatforms = data.exeplatform.split(",");
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


                                return '<select id="cc" class="easyui-combobox" name="dept" style="width:200px" multiple=true;>' +
                                    '<option ' + firefox + '>FireFox</option>' +
                                    '<option ' + chrome + '>Chrome</option>' +
                                    '<option ' + ie + '>IE</option>' +
                                    '<option ' + safari + '>Safari</option>' +
                                    '</select>';
                            }
                        }
                    },
                    { field: 'exetype', title: 'Exe Type', width: "20%", sortable: true },
                    { field: 'runon', title: 'Runon', width: "20%", sortable: true },
                    { field: 'thread', title: 'Thread', width: "10%", editor: { type: 'numberbox' }, sortable: true }
                ]
            ],
            onClickCell: function(field, row) {
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
                    } else {
                        $('#test').treegrid('endEdit', editingId);
                        flag = !flag;
                        console.log("endedit");

                    }
                }
            },



            onLoadSuccess: function(ch1, data) {
                $(this).treegrid('getPanel').find('.easyui-combobox').each(function(ch1, ch2, ch3) {
                    $(".easyui-combobox").combobox();

                });
            }

        });
        $('#test').treegrid('enableFilter');

    }
};


// include
//    <script type="text/javascript" src="easyui/datagrid-filter.js"></script>
