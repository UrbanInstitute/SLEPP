 
/*
  Updated: 2014-08-13 11:47:22.930142
  Readable Source in //Ceres/training/webmaps/Bsouthga_mugroup/webdev_repo/stateOfRetirement/js/
  bsouthga(at)urban(dot)org
*/

var link_parameters=get_link_params();var state_array;$(document).ready(function(){var occupation=$('.occ.selected').attr('id');var hire_date=$('.hire.selected').attr('id');var plan_variable=$('.var.selected').attr('id');state_array=get_state_array();buttonClicks();newBoxGraph(createData(occupation,hire_date,plan_variable));raphaelMap("mapDiv");crossMouseover();dropDown();drawNationalCharts("X","allHires");createTable("AL");tableClicks();go_to_state();});function get_link_params(){var match;var pl=/\+/g;var search=/([^&=]+)=?([^&]*)/g;var query=window.location.search.substring(1);var urlParams={};while(match=search.exec(query))urlParams[match[1]]=match[2];return urlParams;};function go_to_state(){var planid=link_parameters.planid;if(planid!==undefined&&planid.length<=4&&planid!=="XX00"&&planid.match(/\w\w\d\d?/)){var state=planid.slice(0,2);stateSelect(state);var plan_row=$('.dataRow.normal_row.'+planid).prop('id');$('tr[rel="'+plan_row+'"]').toggle();$('img[id="img!'+plan_row+'"]').attr('src','img/contract.png');document.getElementById(plan_row).scrollIntoView();}}function createData(occ,newHire,age){var subset={};for(n in data)subset[n]=data[n][occ].XX00[newHire][age];return subset;}function buttonClicks(){$('.buttons').click(function(e){var bClass=$(e.target).attr('class').split(' ')[1];$('.'+bClass).attr('class','buttons '+bClass);$(e.target).addClass('selected');var occupation=$('.occ.selected').attr('id');var hire_date=$('.hire.selected').attr('id');var plan_variable=$('.var.selected').attr('id');var createdData=createData(occupation,hire_date,plan_variable);dance(createdData);for(n in currData)if(currData[n]=="N"){boxHolders.under[n].hide();boxHolders.text[n].hide();boxHolders.over[n].hide();boxHolders.outline[n].hide();}var table_id=$('.tableSelected').attr('id');chartChange(occupation,hire_date,table_id=='button-plan'?plan_dist:natData);tableShow();if(table_id=='button-best_plans'||table_id=="button-worst_plans")$('#'+table_id).click();_gaq.push(['_trackEvent','Filters',e.target.id,occupation+'-'+hire_date+'-'+plan_variable]);});$('.tableButtons').click(function(e){var occ;var plan_var;if($('#button-best_plans').hasClass('tableSelected')||$('#button-worst_plans').hasClass('tableSelected')){occ=$('.occ_button.selected').prop('id');var selected_plan_design=$('.plan_design_select').length>0?$('.plan_design_select.selected').prop('id'):"all";plan_var=(selected_plan_design=="all"?$('.stateColHeader.selected_header').prop('id'):"plan_design");}else{occ=$(".buttons.occ.selected").prop('id');plan_var=$('.var.selected').attr('id');}$('.tableButtons').attr('class','tableButtons');var id=e.target.id;$(e.target).addClass('tableSelected');if(id=='button-state'){$('#nationalTableDiv').hide();$('#stateTableDiv').show();var val=$('#stateSelect').val();if(val=='null')var val='AL';$('#stateTable').empty();createTable(val);tableClicks();tableShow();}else if(id=='button-worst_plans'||id=='button-best_plans'){$('#nationalTableDiv').hide();$('#stateTableDiv').show();plan_rankings(plan_var,id!="button-best_plans",occ);tableClicks();tableShow();}else if(id=='button-plan'||id=='button-national'){$('#stateTableDiv').hide();$('#nationalTableDiv').show();var occupation=$('.occ.selected').attr('id');var hire_date=$('.hire.selected').attr('id');drawNationalCharts(occupation,hire_date,id=='button-plan'?plan_dist:natData);}if(id=='button-national')var s='National';else var s='State';_gaq.push(['_trackEvent','Table Filter',s]);});}function crossMouseover(){for(n in currData)(function(mask,box,outline,tObj,state){$(box[0]).mouseover(function(e){mOver(e,outline,tObj);}).mouseout(function(e){mOut(e,outline,tObj);}).mousemove(function(e){pos(e.pageX,e.pageY);}).attr('id',state);$(mask[0]).mouseover(function(e){mOver(e,outline,tObj);}).mouseout(function(e){mOut(e,outline,tObj);}).mousemove(function(e){pos(e.pageX,e.pageY);}).attr('id',state);$(outline[0]).mouseover(function(e){mOver(e,outline,tObj);}).mouseout(function(e){mOut(e,outline,tObj);}).mousemove(function(e){pos(e.pageX,e.pageY);}).attr('id',state);$(box[0]).click(function(e){stateSelect(e.target.id);});$(mask[0]).click(function(e){stateSelect(e.target.id);});$(outline[0]).click(function(e){stateSelect(e.target.id);});})(boxHolders.over[n],boxHolders.under[n],boxHolders.outline[n],topObj[n],n);for(n in currData)(function(tObj,rO,coverObj,outline,state){$(rO[0]).mouseover(function(e){mOver(e,tObj,outline);}).mouseout(function(e){mOut(e,tObj,outline);}).mousemove(function(e){pos(e.pageX,e.pageY);}).attr('id',state);$(coverObj[0]).mouseover(function(e){mOver(e,tObj,outline);}).mouseout(function(e){mOut(e,tObj,outline);}).mousemove(function(e){pos(e.pageX,e.pageY);}).attr('id',state);$(tObj[0]).mouseover(function(e){mOver(e,tObj,outline);}).mouseout(function(e){mOut(e,tObj,outline);}).mousemove(function(e){pos(e.pageX,e.pageY);}).attr('id',state);$(rO[0]).click(function(e){stateSelect(e.target.id);});$(coverObj[0]).click(function(e){stateSelect(e.target.id);});$(tObj[0]).click(function(e){stateSelect(e.target.id);});})(topObj[n],rObj[n],coverObj[n],boxHolders.outline[n],n);}function stateSelect(n){$('#nationalTableDiv').hide();$('#stateTableDiv').show();$('.tableButtons').attr('class','tableButtons');$('#button-state').attr('class','tableButtons tableSelected');$('#stateTable').empty();createTable(n);tableClicks();tableShow();$('#stateSelect').val(n);$('html, body').animate({scrollTop:$("#displayFilter").offset().top},1000);_gaq.push(['_trackEvent','State',n]);}function dropDown(){$('#stateSelect').append('<option value="null">Select a State</option>');var nameArr=[];for(n in currData)nameArr.push(n);nameArr.sort();for(i=0;i<nameArr.length;i++)$('#stateSelect').append('<option value="'+nameArr[i]+'">'+stateFullNameRef[nameArr[i]]+'</option>');$('#stateSelect').change(function(){var val=$('#stateSelect').val();if(val!='null'){$('#nationalTableDiv').hide();$('#stateTableDiv').show();$('.tableButtons').prop('class','tableButtons');$('#button-state').prop('class','tableButtons tableSelected');$('#stateTable').empty();createTable(val);tableClicks();tableShow();_gaq.push(['_trackEvent','State',val]);}});}function tableShow(){$(".missing_data_row").hide();var rows={};$('#stateTable tr').each(function(){if($(this).attr('class')=='sectionHeader'){var id=$(this).attr('id');rows[id]=0;}});$('#stateTable .dataRow').each(function(){var id=$(this).attr('id').split('-');var ins=id[0]+'-'+id[1];if($(this).is(':visible'))rows[ins]++;});var some_rows_visible=false;for(var i in rows)if(rows[i]==0)$('tr[id="'+i+'"]').hide();else some_rows_visible=true;$('#plan_rankings').show();}function get_state_array(){var dataOrderRef=["YGGD","DYGD","OLGD","S1GD","S3GD","AGGD","FDGD"];var grade_nums={"A":4,"B":3,"C":2,"D":1,"F":0};var state_array=[];for(var state in data)for(var occ in data[state])for(var planid in data[state][occ])if(planid!=="XX00")for(var hire in data[state][occ][planid]){var row={state:state,occ:occ,planid:planid,hire:hire};for(var e in data[state][occ][planid][hire])row[e]=data[state][occ][planid][hire][e];;if(row.OLGD!=="A"&&row.DROP==1)row.OLDT=-0.0001;var num_grades=0;var gpa=0;var F_count=0;var plan_design=0;var num_plan_design_grades=0;for(var i=0,l=dataOrderRef.length;i<l;i++)if(row[dataOrderRef[i]]!="N"){gpa+=grade_nums[row[dataOrderRef[i]]];if(dataOrderRef[i]!=="AGGD"&&dataOrderRef[i]!=="FDGD"){plan_design+=grade_nums[row[dataOrderRef[i]]];num_plan_design_grades++;}if(row[dataOrderRef[i]]=="F")F_count++;num_grades++;}else F_count++;gpa=gpa/num_grades;row.alt_gpa=(F_count<4?gpa:0.4999);row.gpa=gpa;row.plan_design=plan_design/num_plan_design_grades;state_array.push(row);}return state_array;}