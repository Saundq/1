var date = new Date();
var airport="VKO",
	year=date.getFullYear(),
	month=date.getMonth()+1,
	day=date.getDate(),
	hourOfDay=date.getHours(),
	appId="***",
	appKey="***",
	responsed=[],
	flighttypes={"J":"Scheduled Passenger(Normal Service)",
													"S":"Scheduled Passenger(Shuttle Service)",
													"U":"Scheduled Passenger(ServiceVehicle)",
													"F":"Scheduled Cargo/Mail(Loose loaded cargo and/or preloaded devices)",
													"V":"ScheduledCargo/Mail(Surface Vehicle)",
													"M":"Scheduled Cargo/Mail(MailOnly)",
													"Q":"Scheduled Passenger/Cargo inCabin",
													"G":"Non-scheduled Passenger(NormalService)",
													"B":"Non-scheduled Passenger(ShuttleService)",
													"A":"Non-scheduled Cargo/Mail",
													"C":"Charter(Passenger Only)",
													"O":"Charter(Special handling-Migrants/Immigrants)",
													"H":"Charter(Cargo and/or Mail)",
													"L":"Charter(Passenger and Cargo and/or Mail)",
													"P":"Non-revenue",
													"T":"Technical Test",
													"K":"Training",
													"D":"General Aviation",
													"E":"Special (FAA/Government)",
													"W":"Military",
													"R":"Additional Flights - Passenger/Cargo",
													"Y":"IATA Special Internal(Y)",
													"Z":"IATA Special Internal(Z)]"},
	logotype={"M9":"img/m9.jpg",
			  "DP*":"img/pobeda.png",
			  "UT":"img/utair.jpg",
			  "R2":"img/r2.jpg",
			  "GOZ":"img/GOZ.png",
			  "FZ":"img/fz.png",
			  "TK":"img/tk.jpg",
			  "A9":"img/a9.jpg",
			  "UN":"img/un.jpg",
			  "4U":"img/4u.jpg",
			  "PL":"img/pl.png",
			  "SSF":"img/ssf.gif",
			  "UR":"img/ur.png",
			  "LH":"img/LH.jpg",
			  "D9":"img/DONAVIA.gif",
			  "R3":"img/yakutiya.jpg",
			  "W6":"img/WizzAir.png",
			  "RB":"img/SyrianAir.jpg",
			  "D2":"img/SeverstalAircompany.jpg",
			  "V8":"img/Atran.jpg",
			  "4G":"img/Gazpromavia.jpg"
			 },
	typereseises={0:{"name":"Вылет","img":"img/vzlet.png"},1:{"name":"Прилет","img":"img/posadka.png"}},
	j=false,
	cutNamePl=function(str){
		if (typeof str != "undefined")
		{
		LatterFirst=str.substring(0,1);
		strl=str.substring(parseInt(str.indexOf(" ")+1),str.length);
		if (strl.indexOf("-")==-1)
		{
			if (strl.indexOf(" ")==-1)
			{
				iindx=strl.length;
			} else iindx=strl.indexOf(" ");
		} else iindx=strl.indexOf("-");
		//console.log(strl);
		NumberPlane=strl.substring(0,iindx);
		//console.log(iindx);
		return LatterFirst+NumberPlane;
		} else return "undf"
	},
	parseProperty=function(status,propNames){
		//console.log(status);
		try {
			//console.log("try");
			for (var propName in propNames)
			{	
				//console.log(status[propNames[propName]]);//+" "+propNames);
				status=status[propNames[propName]];
				//console.log(status);
			}
			return status;
		}	catch(e){
		}finally{
			if ((status=="") || ( typeof status=="undefined"))
				return "---";
		}
	},
	drowTable=function(data){
		//console.log(data);
		if (data[0].typereis==0)
		{
			vil="viz";
			pril="inviz";
		} else {
			vil="inviz";
			pril="viz";
		}
		strcol="<col class='tprais'><col class='tdrais'><col class='company'><col class='logcompany'><col class='plain'><col class='plnsml plainsml'><col class='airport'><col class='airpsml shortairport'><col class='deptime vil'><col class='arrtime pril'><col class='arrtime pril'><col class='status'><col class='dopinfo'>";
		
		tb="<table class='tblhead'>";
		tb+=strcol;
		//tb+="<tr><th>Тип рейса</th><th>Номер рейса</th><th class='company'>Авиа компания</th><th></th><th>Судно</th><th>Аэропорт назначения</th><th>Плановое время вылета</th><th>Плановое время прилета</th><th>Статус</th><th>Примечание</th></tr>";
		tb+="<tr><th></th><th>Рейс</th><th class='company'>Авиакомпания</th><th></th><th class='plain'>Судно</th><th class='plainsml'>Судно</th><th class='airport'>Аэропорт назначения</th><th class='shortairport'>Аэропорт</th><th class='"+vil+"'>План. время выл.</th><th class='"+pril+"'>План. время прил.</th><th>Статус</th><th>Прим.</th></tr>";
		
		tb+="</table><div class='Tdata'><table class='scrolbl'>";
		tb+=strcol;
		for (i=0;i<data.length;i++)
		{
			if (typeof data[i].cshare[0]['fsCode']=="undefined")
			{
				codeshare="";
			} else {
				codeshare=data[i].cshare[0]['fsCode']+data[i].cshare[0]['flightNumber'];
			}
				tb+="<tr id='"+data[i].id+"'>"+
		/*тип рейса*/	"<td><img class='piktogramma' title='"+typereseises[data[i].typereis].name+"' alt='"+typereseises[data[i].typereis].name+"' src='"+window.location.href+typereseises[data[i].typereis].img+"'/></td>"+
		/*Рейс*/		"<td>"+data[i].NumberRais+"</td>"+
		/*А.К.*/		"<td class='company'>"+data[i].prib+"</td>"+
		/*логотип А.К.*/"<td><img class='imglogo' src='"+window.location.href+logotype[data[i].Company]+"'/></td>"+
		/*Самолет*/		"<td class='plain'>"+data[i].Plain+"</td>"+
		/*Самолет см*/	"<td class='plainsml'>"+cutNamePl(data[i].Plain)+"</td>"+
		/*Аэр. При.*/	"<td class='airport'>"+data[i].arrivalAirport+"</td>"+
		/*Аэр. При. см*/"<td class='shortairport'>"+data[i].shortArrivelAirport+"</td>"+
		/*Убытие*/		"<td class='"+vil+"'>"+data[i].departureDate.substring(5,data[i].departureDate.length-7)+"</td>"+
		/*Прибытие*/	"<td class='"+pril+"'>"+data[i].arrivalDate.substring(5,data[i].arrivalDate.length-7)+"</td>"+
		/*Статус*/		"<td>"+data[i].status+"</td>"+
		/*Примеч.*/		"<td>"+codeshare+"</td>"+
					"</tr>";
					
		}
		
		tb+="</table></div>";
		 $("#respons").html("").append(tb);
	},
	ttypes=["dep","arr"],
	loadData=function(type){
		/////if (ttypes.length>0){
		/////	var type=ttypes[0];
		////ttypes.splice(0,1);
		url ="https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/airport/status/"+airport+"/"+type+"/"+year+"/"+month+"/"+day+"/"+hourOfDay+"?appId="+appId+"&appKey="+appKey+"&utc=false&numHours=5&maxFlights=10";
		var ret;

		$.ajax({
          type: 'GET',
          url: url,
          dataType: 'jsonp',
          jsonpCallback: 'flightstatus',
		  async: false,
          success: function(obj) {  responsed=[];
									//////loadData(ttypes);
									ret=obj;
									//console.log(obj);
									samik=[];
		  aviacomp=[];
									
									console.log(obj);
									airports=obj["appendix"]["airports"];
									flightStatuses=obj["flightStatuses"];
									//console.log(flightStatuses);
									equipments = obj["appendix"]["equipments"];
									//console.log(equipments);
									airlines=obj["appendix"]["airlines"];
									airportsDict = [];
									equipmentsDict = [];
									airlinesDict=[];
									stats={"A":"Active","C":"Canceled","D":"Diverted","DN":"Data source needed","L":"Lended","NO":"Not Operational","R":"Redirected","S":"Scheduled","U":"Unknown"};
									
									for(var airport in airports) {
										//console.log(airports[airport]);
										airportsDict[airports[airport]["fs"]]=airports[airport]["name"];
									}
									for(var equipment in equipments) {
										
										equipmentsDict[equipments[equipment]["iata"]]=equipments[equipment]["name"],equipments[equipment]["iata"];
										//console.log(equipmentsDict);
									}
									for(var airline in airlines) {
										//console.log(airlines[airline]);
										airlinesDict[airlines[airline]["fs"]]=airlines[airline]["name"];
									}
									//console.log(equipmentsDict);
									//console.log(airportsDict);
									//console.log(airlinesDict);
									for (flightStatus in flightStatuses)
									{	
								//console.log(equipmentsDict);
										//console.log(flightStatuses[flightStatus]);
										//console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
										if (type=="dep")
										{	index=flightStatus;
											responsed[index]={};
											//responsed[flightStatus]["typereis"]=[];
											responsed[index]["typereis"]=0;
										}
										else {
											index=responsed.length;
											responsed[index]={};
											//responsed[flightStatus]["typereis"]=[];
											responsed[index]["typereis"]=1;
										}
										responsed[index]["cshare"]=parseProperty(flightStatuses[flightStatus], ['codeshares']); 
										//console.log(flighttypes[parseProperty(flightStatuses[flightStatus], ["schedule","flightType"])]);
										responsed[index]["id"]=parseProperty(flightStatuses[flightStatus], ["flightId"]); 
										responsed[index]["shortArrivelAirport"]=parseProperty(flightStatuses[flightStatus], ["arrivalAirportFsCode"]);
										responsed[index]["flightType"]=flighttypes[parseProperty(flightStatuses[flightStatus], ["schedule","flightType"])];
										responsed[index]["Company"]=parseProperty(flightStatuses[flightStatus], ["carrierFsCode"]);
									//	console.log(parseProperty(flightStatuses[flightStatus], ["carrierFsCode"]) + parseProperty(flightStatuses[flightStatus], ["flightNumber"]));
										responsed[index]["NumberRais"]=parseProperty(flightStatuses[flightStatus], ["carrierFsCode"]) + parseProperty(flightStatuses[flightStatus], ["flightNumber"]);
									//	console.log(airlinesDict[parseProperty(flightStatuses[flightStatus], ["carrierFsCode"])]);
										responsed[index]["prib"]=airlinesDict[parseProperty(flightStatuses[flightStatus], ["carrierFsCode"])];
										//console.log(equipmentsDict);
										//console.log(parseProperty(flightStatuses[flightStatus], ["flightEquipment", "scheduledEquipmentIataCode"]));
									//	console.log(equipmentsDict[parseProperty(flightStatuses[flightStatus], ["flightEquipment", "scheduledEquipmentIataCode"])]);
										responsed[index]["Plain"]=equipmentsDict[parseProperty(flightStatuses[flightStatus], ["flightEquipment", "scheduledEquipmentIataCode"])];
									//	console.log(airportsDict[parseProperty(flightStatuses[flightStatus], ["departureAirportFsCode"])].replace("Airport", ""));
										responsed[index]["departureAirport"]=airportsDict[parseProperty(flightStatuses[flightStatus], ["departureAirportFsCode"])].replace("Airport", "");
									//	console.log(parseProperty(flightStatuses[flightStatus], ["departureDate", "dateLocal"]).split("T",-1)[1]);
										responsed[index]["departureDate"]=parseProperty(flightStatuses[flightStatus], ["departureDate", "dateLocal"]).replace("T"," ");//.split("T",-1);
									//	console.log(parseProperty(flightStatuses[flightStatus], ["operationalTimes", "estimatedGateDeparture", "dateLocal"]));//.split("T",-1));
										responsed[index]["estimatedGateDeparture"]=parseProperty(flightStatuses[flightStatus], ["operationalTimes", "estimatedGateDeparture", "dateLocal"]);//.split("T",-1));
									//	console.log(airportsDict[parseProperty(flightStatuses[flightStatus], ["arrivalAirportFsCode"])].replace("Airport", ""));
										responsed[index]["arrivalAirport"]=airportsDict[parseProperty(flightStatuses[flightStatus], ["arrivalAirportFsCode"])].replace("Airport", "");
									//	console.log(parseProperty(flightStatuses[flightStatus], ["arrivalDate", "dateLocal"]).replace("T"," "));
										responsed[index]["arrivalDate"]=parseProperty(flightStatuses[flightStatus], ["arrivalDate", "dateLocal"]).replace("T"," ");
									//	console.log(parseProperty(flightStatuses[flightStatus], ["operationalTimes", "estimatedGateArrival", "dateLocal"]));//.split("T",-1));
										responsed[index]["estimatedGateArrival"]=parseProperty(flightStatuses[flightStatus], ["operationalTimes", "estimatedGateArrival", "dateLocal"]);//.split("T",-1));
									//	console.log(stats[parseProperty(flightStatuses[flightStatus], ["status"])]);
										responsed[index]["status"]=stats[parseProperty(flightStatuses[flightStatus], ["status"])];
										//console.log(parseProperty(flightStatuses[flightStatus], "carrierFsCode")); //+ parseProperty(flightStatus, "flightNumber"));
									}
									//////////if (type=="arr")
										//console.log(responsed);
									drowTable(responsed);
									/*for(i=0;i<obj.flightStatuses.length;i++)
									{	
										for(j=0;j<obj.appendix.airlines;j++)
										{	if (obj.flightStatuses[i].carrierFsCode==obj.appendix.airlines[j].fs)
											{
												samik[i]=obj.appendix.equipments[j].name;
												aviacomp[i]=obj.appendix.airlines[j].name;
											}
											
										}
										responsed[i]={"type":"Отправление","numberreis":obj.flightStatuses[i].flightNumber,"aviacompany":aviacomp[i],"logo":1,"sudno":samik[i],"arrivel":obj.appendix.airports[i].name,"timedepart":obj.flightStatuses[i].departureDate.dateLocal,"timearrive":obj.flightStatuses[i].arrivalDate.dateLocal,"status":obj.flightStatuses[i].status};
									}*/
									//console.log(responsed);
								 },                                                                                  
          error: function() { console.log('Uh Oh!'); }
        });
		return ret;
		//}
		},
		foramDate=function(dat){
			D=new Date(dat);
			//console.log("//// "+D)
			dayf=D.getDate();
			//console.log(day);
			monthf=D.getMonth()+1;
			//console.log(month);
			yyearf=D.getFullYear();
			//console.log(yyear);
			Hoursf=D.getHours();
			//console.log(Hours);
			Minutesf=D.getMinutes();
			//console.log(Minutes);
		return dayf+"."+monthf+"."+yyearf+" "+Hoursf+":"+Minutesf;
			
		},
	getFInfo=function(data){
		//console.log(data);
		AirportDeparture=airportsDict[parseProperty(data, ["departureAirportFsCode"])].replace("Airport", "");
		TerminalDeparture=parseProperty(data, ["airportResources","departureTerminal"]);
		AirportArrival=airportsDict[parseProperty(data, ["arrivalAirportFsCode"])].replace("Airport", "");
		
		FactArrivalDate=foramDate(parseProperty(data, ["arrivalDate","dateLocal"]).replace("T"," "));
		FactdepartureDate=foramDate(parseProperty(data, ["departureDate","dateLocal"]).replace("T"," "));
		Status=stats[parseProperty(data, ["status"])];
		NumberRais=parseProperty(data, ["carrierFsCode"]) + parseProperty(flightStatuses[flightStatus], ["flightNumber"]);
		AviaCompany=airlinesDict[parseProperty(data, ["carrierFsCode"])];
		LogoAviaCompany=logotype[parseProperty(data, ["carrierFsCode"])];
		Airplane=equipmentsDict[parseProperty(data, ["flightEquipment", "scheduledEquipmentIataCode"])];
		
		
		 if (data.departureAirportFsCode!=airport)	{
			 
			 vremiaRasxhetPrib=parseProperty(data, ["operationalTimes", "publishedArrival", "dateLocal"]).substr(0,16).replace("T"," ");
			 s="<table>"+
					"<tr><td>Пункт отправления</td><td>"+AirportDeparture+" терминал "+TerminalDeparture+", "+FactdepartureDate+"</td></tr>"+ 
					"<tr><td>Прилет</td><td>"+AirportArrival+", "+FactArrivalDate+"</td></tr>"+
					"<tr><td>Статус</td><td>"+Status+"</td></tr>"+
					"<tr><td>Номер рейса</td><td>"+NumberRais+"</td></tr>"+
					"<tr><td>Авиа компания</td><td>"+AviaCompany+"</td></tr>"+
					"<tr><td>Самолет</td><td>"+Airplane+"</td></tr>"+
				"</table>";
		 } else {
		//parseProperty(flightStatuses[flightStatus], ["operationalTimes", "estimatedGateDeparture", "dateLocal"]).substr(0,16).replace("T"," ")); //parseProperty(flightStatuses[flightStatus], ["operationalTimes", "estimatedGateDeparture", "dateLocal"]).length-7)
		D=new Date(FactdepartureDate);

		reg=D.setHours(D.getHours() - 2);
		posadkastart=D.setMinutes(D.getMinutes() + 75);
		regEnd=D.setMinutes(D.getMinutes() + 5);
		posadka=D.setMinutes(D.getMinutes() + 10);
		posadkaEnd=D.setMinutes(D.getMinutes() + 5);
		
		//console.log(foramDate(reg)+" Начало регистрации");
		//console.log(foramDate(regEnd)+" Окончание регистрации");
		//console.log(foramDate(posadka)+" Посадка");
		// console.log(foramDate(posadkaEnd)+" Окончание посадки"); 
		 
		 s="<table>"+
					"<tr><td>Вылет</td><td>"+AirportDeparture+" терминал "+TerminalDeparture+", "+FactdepartureDate+"</td></tr>"+ 
					"<tr><td>Направление</td><td>"+AirportArrival+", "+FactArrivalDate+"</td></tr>"+
					"<tr><td>Статус</td><td>"+Status+"</td></tr>"+
					"<tr><td>Номер рейса</td><td>"+NumberRais+"</td></tr>"+
					"<tr><td>Авиа компания</td><td>"+AviaCompany+"</td></tr>"+
					"<tr><td>Самолет</td><td>"+Airplane+"</td></tr>"+
					"<tr><td>Регистрация, начало</td><td>"+foramDate(reg)+"</td></tr>"+
					"<tr><td>Регистрация, окончание</td><td>"+foramDate(regEnd)+"</td></tr>"+
					"<tr><td>Посадка, начало</td><td>"+foramDate(posadkastart)+"</td></tr>"+
					"<tr><td>Посадка, окончание</td><td>"+foramDate(posadkaEnd)+"</td></tr>"+
				"</table>";
				
		 
		 }
		 $(".modal").html("").append(s);
		 
		//console.log(foramDate(reg)+" "+regEnd+" "+posadka+" "+posadkaEnd);
	
	},
	init = function(){
		///////////loadData(ttypes);
		//jj=loadData.run("dep");
		//console.log(jj);
		loadData(ttypes[1]);
		$("input[type=checkbox]").on('click',function(e){
			if ($(this).prop("checked")==true)
			{
				$("input[type=checkbox]").removeAttr("checked");
				$(this).attr("checked","checked");
				//console.log(ttypes[$(this).val()]);
				loadData(ttypes[$(this).val()]);
				
			} else e.preventDefault();/*else {
			
			if (($(this).val()==0)) 
			{
				$("#checkIn").attr("checked","checked");
				$("#checkOut").removeAttr("checked");
			} else if (($(this).val()==1)) {
				$("#checkOut").attr("checked","checked");
				$("#checkIn").removeAttr("checked");
			}}*/
			//console.log(1+" "+$(this).val());
		});
		
		//console.log(url);
		
		
	};

	//console.log(typereseises);
	//console.log(year+" год "+month+" месяц "+day+" день "+hourOfDay+" часы");
	
	init();
	
$(".scrolbl td").live("mouseenter mouseleave", function(){
	//alert(1);
  //  if ($(this).parents("tr").attr("class")!="up_row") {
        var td_index=$(this).index();
        $(this).parents("tr").toggleClass("lighting_col");
        $(this).parents(".scrolbl").find("tr").each(function(){
            $("td:eq("+td_index + ")",this).toggleClass("lighting_col");
        });
        $(this).toggleClass("lighting_cell");
   // }
});
$(".scrolbl tr").live("click",function(pos){
	//console.log($(this).attr("id"));
	var findK=0;
	
	//if ($(".modal").css("display")!="none")
	//{	
		$(".modal").css({"top":pos.pageY,"left":pos.pageX});
		$(".modal").hide();
		$(".bgmod").show();
		$(".modal, .bgmod").show("slow");
		
	//} else {
	//	$(".modal").css({"top":pos.pageY,"left":pos.pageX});
	//	$(".modal").show("slow");
	//}
	//
	
	
	
	for(i=0;i<flightStatuses.length;i++)
	{	
	//console.log($(this).attr("id"));
	//console.log(flightStatuses[i]["flightId"]);
	//console.log(i);
		if (flightStatuses[i]["flightId"]==$(this).attr("id"))
			findK=i;
	}
	//console.log(findK);
	getFInfo(flightStatuses[findK]);
});
$(window).on('scroll',function(){
	if ($(window).scrollTop()!=0)
	{
		$('.tblhead').css("top","0");
	} else $('.tblhead').css("top","30px");
});
$(".bgmod").live("click",function(){
	$(".modal, .bgmod").hide();
});



