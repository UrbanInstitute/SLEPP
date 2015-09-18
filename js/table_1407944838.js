 
/*
  Updated: 2014-08-13 11:47:22.600139
  Readable Source in //Ceres/training/webmaps/Bsouthga_mugroup/webdev_repo/stateOfRetirement/js/
  bsouthga(at)urban(dot)org
*/

var dataOrderRef=["OVRL","YGGD","DYGD","OLGD","S1GD","S3GD","AGGD","FDGD"];var occ_ref={"X":"Overall","GS":"General State","GL":"General local","TS":"teachers","PF":"Police and Fire"};var ordered_occupations=["X","GS","GL","TS","PF"];var hireDateRef={"allHires":"All","newHires":"Only new hires","oldHires":"Excludes new hires"};var expand_col_width=300;var buffer_width=80;var colWidth=123;var bigColWidth=colWidth+29;function remove(arr,item){for(var i=arr.length;i--;)if(arr[i]===item)arr.splice(i,1);}function createTable(n){$('#stateTableDiv').removeClass('scrollable');$('#stateTableHeader').empty();var tStr='';var cols=[];for(var i=0;i<dataOrderRef.length;i++){var filter_var=dataOrderRef[i];var label_text=$('.buttons.var#'+filter_var).text();cols.push({text:label_text,code:filter_var});}var tableHeader=''+'<tr id="stateHeader">'+'<td id="tableState" colspan="2">'+stateFullNameRef[n]+'</td>'+'<td class="appFilters" colspan="'+cols.length+'">'+'<span id="f2"></span><span id="f3"></span>'+'</td>'+'</tr>';$('#stateTable').empty().append(tableHeader);tStr+=grade_var_header(colWidth,cols);for(var occ_index=0;occ_index<ordered_occupations.length;occ_index++){var occupation=ordered_occupations[occ_index];var planid_list=[];var sortable=true;for(var key in data[n][occupation])for(var hire in data[n][occupation][key]){var SRT=data[n][occupation][key][hire].SRT;if(key!=="XX00")planid_list.push({planid:key,s:SRT});if(SRT=="N/A")sortable=false;;}if(sortable)var sort_func=function(x,y){var a=Number(x.s);var b=Number(y.s);return(a>b)-(a<b);};else var sort_func=function(x,y){a=parseInt(x.planid.slice(2,5));b=parseInt(y.planid.slice(2,5));return(a>b)-(a<b);};planid_list.sort(sort_func);planid_list.unshift({planid:"XX00"});for(var pid=0;pid<planid_list.length;pid++){var planid=planid_list[pid].planid;var aggregate_plan=(planid=="XX00");var ins=capitalize(occ_ref[occupation]);if(aggregate_plan||(planid_list.length===2&&planid!=="XX00")){var hStr='<tr id="'+occupation+'-'+planid+'" class="sectionHeader">'+'<td class="stateOcc" colspan="2">'+ins+'</td>'+tStr+'</tr>';$(hStr).appendTo('#stateTable');}var hire_date_list=[];for(var key in data[n][occupation][planid])hire_date_list.push(key);hire_date_list.sort();for(var hd=0;hd<hire_date_list.length;hd++){var hireDate=hire_date_list[hd];var sub_data=data[n][occupation][planid][hireDate];sub_data.occ=occupation;sub_data.hire=hireDate;sub_data.planid=planid;if((planid_list.length===2&&planid!=="XX00")||(planid_list.length!==2))$('#stateTable').append(state_table_row(sub_data,false));$('a[id="'+occupation+'-'+planid+'-'+hireDate+'"]').click(function(e){_gaq.push(['_trackEvent','Download',$(e.target).attr('id'),$('#stateSelect').val()]);});}}}}function plan_rankings(variable,worst,occ){$('#stateTableDiv').addClass('scrollable');var tStr='';var cols=[];var variable_names={};var selected_plan_design=$('.plan_design_select').length>0?$('.plan_design_select.selected').prop('id'):"all";var lower_better={"OVRL":false,"YGGD":false,"DYGD":true,"OLGD":false,"S1GD":false,"S3GD":false,"AGGD":false,"FDGD":false,"plan_design":false};var low_first=(worst?!lower_better[variable]:lower_better[variable]);sort_var=(variable=="OVRL"?(selected_plan_design==="all"?"gpa":"plan_design"):variable.replace("GD","DT"));var plans=sorted_states(sort_var,occ,low_first);for(var i=0;i<dataOrderRef.length;i++){var filter_var=dataOrderRef[i];var label_text=$('.buttons.var#'+filter_var).text();cols.push({text:label_text,code:filter_var});variable_names[filter_var]=label_text;}variable_names.plan_design="Plan Design <em>(Excludes Funding Related Grades)</em>";var button_string=('<div id="plan_design_div">'+'<span class="buttons plan_design_select '+(selected_plan_design=="all"?"selected":"")+'" id="all">'+'All Grades'+'</span>'+'<span class="buttons plan_design_select '+(selected_plan_design=="plan_design"?"selected":"")+'" id="plan_design">'+variable_names.plan_design+'</span>'+'</div> '+'<div>');for(var o=0;o<ordered_occupations.length;o++){var curr_occ=ordered_occupations[o];button_string+=('<span class="buttons occ_button'+(curr_occ==occ?" selected":"")+'" id="'+curr_occ+'">'+capitalize(occ_ref[curr_occ])+(curr_occ=="GL"||curr_occ=="GS"?" Employees":"")+'</span>');}button_string+='</div>';var var_text=variable_names[variable];var table_string=''+'<tr id="stateHeader">'+'<td id="tableState" colspan="2">'+'Nationwide '+(worst?"Worst":"Best")+'</br>'+"("+(occ=="X"?"All":capitalize(occ_ref[occ]))+' Plans)</br>'+'<span id="sort_instructions">(Click on a column header to sort, or an occupation to change the table)</span>'+'</td>'+'<td class="occupation_button_row" colspan="'+(''+cols.length)+'">'+button_string+'</td>'+'</tr>';table_string+='<tr id="plan_rankings" class="sectionHeader">'+'<td class="stateOcc" colspan="2" width="150">Ranked by </br>'+var_text+'</td>'+grade_var_header(colWidth,cols)+'</tr>';$('#stateTableHeader').html(table_string);table_string='';var start_num_plans=50;for(var s=0;s<start_num_plans;s++){var row=state_table_row(plans[s],true);table_string+=row;}table_string+='<tr id="load_more_row"><td></td><td id="load_more" colspan="8">'+'<div class="buttons" id="load_more_button">'+'Displaying first '+start_num_plans+' plans. Load remaining '+(plans.length-start_num_plans)+' plans? '+'</div></td><tr>';$('#stateTable').html(table_string);$('.highlight_span').removeClass('highlighted');$('.stateColHeader').addClass('hover_col_header');$('.stateColHeader').click(function(e){$('.plan_design_select').removeClass('selected');$('.plan_design_select#all').addClass('selected');var code=e.currentTarget.id;var worst_plans=$('.tableButtons.tableSelected').prop('id').replace("button-","")=="worst_plans";var occ=$(".occ_button.selected").prop('id');plan_rankings(code,worst_plans,occ);tableClicks();});$('.occ_button').click(function(e){var selected_plan_design=$('.plan_design_select').length>0?$('.plan_design_select.selected').prop('id'):"all";var code=(selected_plan_design=="all"?$('.stateColHeader.selected_header').prop('id'):"plan_design");var worst_plans=$('.tableButtons.tableSelected').prop('id').replace("button-","")=="worst_plans";var occ=e.currentTarget.id;plan_rankings(code,worst_plans,occ);tableClicks();});$('.plan_design_select').click(function(e){$('.plan_design_select').removeClass('selected');$(e.currentTarget).addClass('selected');var code=$('.stateColHeader.selected_header').prop('id');var worst_plans=$('.tableButtons.tableSelected').prop('id').replace("button-","")=="worst_plans";plan_rankings((e.currentTarget.id==="all"?"OVRL":"plan_design"),worst_plans,occ);tableClicks();});$('.occ_button').removeClass('selected');$('.occ_button#'+occ).addClass('selected');var highlight_selection=function(){if(selected_plan_design=="plan_design"){var pd_vars=["YGGD","DYGD","OLGD","S1GD","S3GD"];for(var i=0;i<pd_vars.length;i++){$('.stateColHeader#'+pd_vars[i]).addClass('pd_selected');$('.highlight_span#'+pd_vars[i]).addClass('highlighted');$('.stateData.'+pd_vars[i]).addClass('selected_header');}}else{$('.stateColHeader#'+variable.replace("DT","GD")).addClass('selected_header');$('.highlight_span#'+variable.replace("DT","GD")).addClass('highlighted');$('.stateData.'+variable.replace("DT","GD")).addClass('selected_header');};};highlight_selection();$('#load_more_button').click(function(e){$('#load_more_row').remove();var remaining_rows=plans.slice(start_num_plans);var out_string='';for(var i=0,l=remaining_rows.length;i<l;i++)out_string+=state_table_row(remaining_rows[i],true);;$('#stateTable').append(out_string);highlight_selection();tableClicks();});}function number_suffix(number_string,tied){var suffix={1:"st",2:"nd",3:"rd"};var last_digit=number_string.charAt(number_string.length-1);var other_th=number_string.charAt(number_string.length-2)=="1";return(suffix.hasOwnProperty(last_digit)&&!other_th?suffix[last_digit]:"th")+(tied?" (tie)":"");}function state_table_row(sub_data,best_plans){var aggregate_plan=sub_data.planid=="XX00";if(aggregate_plan)var expand_button_insert=hireDateRef[sub_data.hire];else if(!best_plans)var expand_button_insert="("+sub_data.planid+") "+(sub_data.PD!=="N/A"?sub_data.PD:sub_data.HIRE);else{var r_string=""+sub_data.rank;var r=sub_data.rank+number_suffix(r_string,sub_data.tied)+" ";var expand_button_insert=capitalize(r+"<em>"+sub_data.planid+'</em>'+'<br/>'+sub_data.state+' '+occ_ref[sub_data.occ]+'<br/>('+hireDateRef[sub_data.hire]+")");}var hide_row_class;if(sub_data.OVRL=="N")hide_row_class="missing_data_row";else hide_row_class="normal_row";if(aggregate_plan)hide_row_class+=' aggregate_plan';;var rStr=''+'<tr id="'+sub_data.occ+'-'+sub_data.planid+'-'+sub_data.hire+'" class="dataRow '+hide_row_class+' '+sub_data.planid+'">'+'<td colspan="2"> '+'<table><tr>'+'<td width="10px" style="vertical-align:top;padding-top:5px;">'+(aggregate_plan?'':'<img align="right" src="img/expand.png" id="img!'+sub_data.occ+'-'+sub_data.planid+'-'+sub_data.hire+'" class="imgMargin" />')+'</td>'+'<td class="stateData dataFirstCol">'+expand_button_insert+'</td>'+'</tr></table>'+'</td>';rStr+=grade_var_images(sub_data,dataOrderRef,colWidth);rStr+='</tr>';rStr+='<tr class="textRow" rel="'+sub_data.occ+'-'+sub_data.planid+'-'+sub_data.hire+'">'+'<td> </td>'+'<td width="106px"></td>';rStr+=detailed_description_string(sub_data,sub_data.planid,sub_data.occ)+'</tr>';return rStr;}function tableClicks(){$('.dataRow').not($('.aggregate_plan')).unbind('click');$('.dataRow').not($('.aggregate_plan')).click(function(e){var id=$(e.currentTarget).prop('id');$('tr[rel="'+id+'"]').toggle();var src=$('img[id="img!'+id+'"]').attr('src');if(src=='img/expand.png'){$('img[id="img!'+id+'"]').attr('src','img/contract.png');var window_bottom=$(window).scrollTop()+$(window).height();var scroll_down_amount=$(window).scrollTop()+(window_bottom-e.pageY>200?0:Math.max($(window).scrollTop()-e.pageY,300));$("html, body").animate({scrollTop:scroll_down_amount},100);_gaq.push(['_trackEvent','Expand Table',id,$('#stateSelect').val()]);}else $('img[id="img!'+id+'"]').attr('src','img/expand.png');});}function capitalize(string){var words=string.split(' ');var capitalized=[];for(var i=0;i<words.length;i++)if(words[i]!='and')capitalized.push(words[i].charAt(0).toUpperCase()+words[i].slice(1));else capitalized.push(words[i]);return capitalized.join(' ');}function sorted_states(v,occ,low_first){var props=[v,"state","id"];if(v==="gpa")props.unshift("alt_gpa");var p_l=props.length;state_array.sort(function(a,b){var result=0;var i=0;while(result===0&&i<p_l){var p=props[i];if(p==="state"){var x=a.planid.slice(0,2);var y=b.planid.slice(0,2);result=(x>y)-(x<y);}else if(p==="id"){var x=parseInt(a.planid.slice(2,5),10);var y=parseInt(b.planid.slice(2,5),10);result=(x>y)-(x<y);}else{if(p!=="alt_gpa"&&p!=="gpa"){if(a[p.replace("DT","GD")]==="N")return 1;if(b[p.replace("DT","GD")]==="N")return -1;}var x=Number(a[p]);var y=Number(b[p]);result=(low_first?(x>y)-(x<y):(x<y)-(x>y));}i++;}return result;});var out_array=[];var i=0;var len=state_array.length;var rank=1;var out_count=0;while(i<len){var s=state_array[i];if("X"==occ||s.occ==occ){if(out_count>0&&s[v]!==out_array[out_count-1][v])rank+=1;s.rank=rank;out_array.push(s);out_count++;};i++;}for(var i=0,l=out_array.length;i<l;i++){var s=out_array[i];var tied=false;if((i>0)&&(s.rank==out_array[i-1].rank))tied=true;if((i<(l-1))&&(s.rank==out_array[i+1].rank))tied=true;out_array[i].tied=tied;}return out_array;}