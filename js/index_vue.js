var Persons_Vue = new Vue({
    el:"#PersonInformation",
    data:{
        Persons:{}, //学生们
        Groups:{},   //组名索引 [groupname] -> groupnum
        Groups2:{},  //组名保存 ['g'+groupnum] -> groupname
        input_message:{             //输入新学生的缓存数据
            'name_s':'','sex_s':'','id_s':'','birthday_s':'','race_s':''
			//姓名		性别			学号		生日				民族
            ,'political_s':'','QQ_s':'','wechat_s':'','phone_s':''
			//政治面貌			QQ			微信			联系电话
            ,'grade_s':'','specialty_s':'','home_s':'','idcard_s':''
			//班级				专业			家庭住址		身份证号
			,'groupnum':''
			//属于的班级
        },
        print_message:{             //展示户的缓存数据
            'name_s':'','sex_s':'','id_s':'','birthday_s':'','race_s':''
            //姓名		性别			学号		生日				民族
            ,'political_s':'','QQ_s':'','wechat_s':'','phone_s':''
            //政治面貌			QQ			微信			联系电话
            ,'grade_s':'','specialty_s':'','home_s':'','idcard_s':''
            //班级				专业			家庭住址		身份证号
			,'groupnum':''
			//属于的班级
			/*
			'name':'','sex':'','birthday':'','race':''
            ,'political':'','education':'','job':''
            ,'ownerid':'','phone':'','fc':'','familynum':''
            ,'photo':'','income':'','fielding':''
            ,'breeding':'','causeofpoverty':''
            ,'remark':'','groupnum':'','viligers':''*/
        },
		//班级号
        input_groupname:{
            'groupname':''
        },
		/*
        input_viliger:{
            'name':'',
            'ownerid':'',
            'sex':'',
            'relation':'',
            'job':'',
            'birthday':'',
            'id':''
        },*/
		//检索用
        find_people_keys:['学号','姓名'],
        find_people_input:{
            key:'',
            value:''
        }
    },
    methods:{
        Botton_ADD_Group:function(){Botton_ADD_Group();},           //对接按钮功能：添加新班级
        Botton_ADD_Household:function(){Botton_ADD_Household();},   //对接按钮功能：添加新学生
        Botton_Change_Print:function(household){                    //按钮功能：改变展示户
            if(household.groupnum!=Persons_Vue.print_message.groupnum||household.ownerid!=Persons_Vue.print_message.ownerid){
                $('#housholdinfodisplay').fadeOut('fast',()=>{
                    Vue.set(Persons_Vue,'print_message',household);
                    for(obj in Persons_Vue.print_message){
                        if(Persons_Vue.print_message[obj]==='wq648a52vke1')
                            Vue.set(Persons_Vue.print_message,obj,'');
                    }
                });
                $('#housholdinfodisplay').fadeIn();
            }else{
                console.log('再次点击相同');
            }
        },
        Botton_Refrash_input_message:function(){                    //按钮功能：刷新输入缓存，响应按钮打开户添加框
            for(obj in Persons_Vue.input_message)
                Vue.set(Persons_Vue.input_message,obj,'');
            if(is_obj_empty(Persons_Vue.Persons)){
                Alert("错误","请先建立一个组","warning");
            }else{
                $('#newhouseholdmodal').modal({
                    backdrop: 'static',
                    keyboard: true
                });
            }
        },
        Botton_Refrash_input_groupname:function(){                  //按钮功能：刷新组名输入缓存，响应按钮打开组添加框
            for(obj in Persons_Vue.input_groupname)
                Vue.set(Persons_Vue.input_groupname,obj,'');
            $('#newgroupmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Refrash_input_viliger:function(){                    //按钮功能功能：刷新村民输入缓存，响应按钮打开村民添加框
            for(obj in Persons_Vue.input_viliger)
                Vue.set(Persons_Vue.input_viliger,obj,'');
            $('#newviligermodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Isdelete:function(){                    //按钮功能功能：打开删除确认框
            $('#delhouseholdmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_DEL_Group:function(groupnum){Botton_DEL_Group(groupnum);},   //对接按钮功能：删除组
        Botton_DEL_Viliger:function(id){Botton_DEL_Viliger(id);},            //对接按钮功能：删除村民
        Botton_DEL_Household:function(ownerid){ $('#delhouseholdmodal').modal('hide');$('#housholdinfodisplay').fadeOut(Botton_DEL_Household(ownerid));},//对接按钮功能：删除户
        Botton_Re_Household:function(){                                        //按钮功能：输出缓存->输入缓存，响应按钮打开户修改框
            for(obj in Persons_Vue.input_message)
                Vue.set(Persons_Vue.input_message,obj,Persons_Vue.print_message[obj]);
            Persons_Vue.input_message.groupnum = Persons_Vue.Groups2['g'+Persons_Vue.input_message.groupnum];
            console.log(this.input_message,this.print_message);
            $('#rehouseholdmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Cg_Household:function(){                                     //对接按钮功能：确认修改户
            $('#housholdinfodisplay').fadeOut(Botton_Cg_Household());
            $('#housholdinfodisplay').fadeIn();
        },
        Groupcolor:function(groupnum){                                      //辅助功能：根据组状态返回组颜色
            if(is_obj_empty(Persons_Vue.Persons[groupnum])){
                return 'opacity:0.5;';
            }
            else{
                return 'opacity:1.0;';
            }
        },
        Botton_Open_Find_People:()=>{
            for(obj in Persons_Vue.find_people_input)
                Vue.set(Persons_Vue.find_people_input,obj,'');
            $('#findpeoplemodal').modal({
                backdrop: 'static',
                keyboard: true
            });    
        },
        Botton_Begin_Find_People:()=>{
            if(Persons_Vue.find_people_input.key==''){
                Alert('错误','并未选择查找方式','warning','#bottonfindpeoalerts');
            }else if(Persons_Vue.find_people_input.value==''){
                Alert('错误','并未添加查找信息','warning','#bottonfindpeoalerts');
            }else{
                var key = '';
                if(Persons_Vue.find_people_input.key=='学号'){key = 'ownerid';}
                else{key = 'name';}
                var value = Persons_Vue.find_people_input.value;
                
                console.log(key,value,Persons_Vue.find_people_input.value);

                var foudhousehold = undefined;
                for(groupnum in Persons_Vue.Persons){
                    for(ownerid in Persons_Vue.Persons[groupnum]){
                        var household = Persons_Vue.Persons[groupnum][ownerid];
                        //console.log(household.name);
                        if(household[key]==value){
                            foudhousehold = household;
                        }else{
                            for(id in household.viligers){
                                var key1 = key;
                                if(key1 == 'ownerid')   key1 = 'id';
                                if(household.viligers[id][key]==value){
                                    foudhousehold = household;
                                    break;
                                }
                            }
                        }
                        if(foudhousehold!=undefined)    break;
                    }
                    if(foudhousehold!=undefined)    break;
                }

               
                if(foudhousehold!=undefined){
                    Persons_Vue.Botton_Change_Print(foudhousehold);
                    $("#findpeoplemodal").modal('hide');
                    Alert('成功','查询到目标学生 '+value+' ，并跳转页面成功','success');
                }else{
                    $("#findpeoplemodal").modal('hide');
                    Alert('失败','没有查询到目标学生 '+value,'info');
                }
                
                //$("#findpeoplemodal").modal('hide');
            }
        },
        Botton_Re_Photo:()=>{
            Persons_Vue.input_message.photo = Persons_Vue.print_message.photo;
            $('#rehouseholdphotomodal').modal({
                backdrop: 'static',
                keyboard: true
            });    
        },
        Botton_Cg_Photo:()=>{
            $('#rehouseholdphotomodal').modal('hide');
            Persons_Vue.print_message.photo = Persons_Vue.input_message.photo;
            //console.log(Persons_Vue.print_message.ownerid);
            window.Cg_Household_Photo(Persons_Vue.print_message.ownerid,Persons_Vue.print_message.photo);
        }
    }
});

//许多不需要的东西，已经删除，恢复请到recycle_bin_7.txt