/*	var firebaseConfig = {
		apiKey: "AIzaSyB1wpdKFg7F6hCjhHcaQLy2KYp8rjj9nsE",
		authDomain: "smart-pick-and-drop.firebaseapp.com",
		databaseURL: "https://smart-pick-and-drop.firebaseio.com",
		projectId: "smart-pick-and-drop",
		storageBucket: "smart-pick-and-drop.appspot.com",
		messagingSenderId: "641981555588",
		appId: "1:641981555588:web:07d934608a8a22a47933d1"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);*/
function errorData(error)
{
	console.log(""+error);
}

	function suspendUser(userKey,key){
		firebase.database()
		.ref("Users/"+userKey+"/is_account_active").set(
			false,function(error){
				if(error){alert("error");}
				else{firebase.database()
					.ref("complaints/"+key+"/status").set(
						"suspend",function(error){
							if(error){alert("error");}

						}
						);
				}
			}
			);
	}





	function removeComplain(key) {
		firebase.database()
		.ref().child("complaints").child(key).child("status").set(
			"completed",function(error){
				if(error){
					alert("error");
				}
				else{
				}
			}
			);

	}

	function showComplaints() {
		firebase.database()
		.ref().on('value',gotData,errorData);
		function gotData(data)
		{
			var content=document.getElementById("content");
			content.innerHTML="";
			var complaints=data.val()["complaints"];
			var keys=Object.keys(complaints);
			for(var i=0;i<keys.length;i++)
			{
				if(complaints[keys[i]].status=="pending"){
					var date=complaints[keys[i]].complaints_date;
					var cmp=complaints[keys[i]].complaint_msg;
					var complaintOf=complaints[keys[i]].complaint_of;
					var complaintBy=complaints[keys[i]].complaint_by;
					var cmplnrRollNo=data.child("Users").child(complaintBy).child(
						"PersonalInformation").val()["rollNumber"];
					var cmplnrPhone=data.child("Users").child(complaintBy).child(
						"PersonalInformation").val()["phoneNo"];
					var cmplneeRollNo=data.child("Users").child(complaintOf).child(
						"PersonalInformation").val()["rollNumber"];
					var cmplneePhone=data.child("Users").child(complaintOf).child(
						"PersonalInformation").val()["phoneNo"];
					var key=keys[i]+"";
					var sspndkey="suspend"+i;
					var rmvkey="remove"+i;

					content.innerHTML+='<div class="card" style="margin:10px">'+
					'<div class="card-header">'+date+'</div><div class="card-body">'+
					'<h5>Complainee</h5><p>Reg#'+cmplneeRollNo+'<br>Phone#'+cmplneePhone+
					'<div class="row"><div class="col-md-3"></p><h5>Complainant</h5><p>Roll#'+cmplnrRollNo+'<br>Roll#'+cmplnrPhone+
					'</p></div><div class="col-md-9">'+
					'<div class="h3">Complain</div><div class="p">'+cmp+'</div>'+
					'<button id="'+sspndkey+'" style="margin-top:10px;color:white;padding:3px;margin-right:20px;background-color:#4CAF50">Suspend Complainee</button>'+
					'<button style="color:white;padding:3px;margin-top:10px;background-color:#4CAF50" id="'+rmvkey+'">Remove Complain</button></div></div></div></div>';

					
					document.getElementById(sspndkey).setAttribute("onclick",
						'suspendUser("'+complaintOf+'","'+key+'")');

					document.getElementById(rmvkey).setAttribute("onclick",
						'removeComplain("'+key+'")');

		}
	}
}
}





function restoreUser(userKey,key) {
	firebase.database()
	.ref("Users/"+userKey+"/is_account_active").set(
		true,function(error){
			if(error){
				alert("error");
			}
			else{
				firebase.database()
				.ref("complaints/"+key+"/status").set(
					"completed",function(error){
						if(error){
							alert("error");
						}
						else{
						}
					}
					);
			}
		}
		);


}







function showSuspendedUsers() {
		firebase.database()
		.ref().on('value',gotData,errorData);
		function gotData(data)
		{
			var content=document.getElementById("content");
			content.innerHTML="";
			var complaints=data.val()["complaints"];
			var keys=Object.keys(complaints);
			for(var i=0;i<keys.length;i++)
			{
				if(complaints[keys[i]].status=="suspend"){
					var date=complaints[keys[i]].complaints_date;
					var cmp=complaints[keys[i]].complaint_msg;
					var complaintOf=complaints[keys[i]].complaint_of;
					var complaintBy=complaints[keys[i]].complaint_by;
					var cmplnrRollNo=data.child("Users").child(complaintBy).child(
						"PersonalInformation").val()["rollNumber"];
					var cmplnrPhone=data.child("Users").child(complaintBy).child(
						"PersonalInformation").val()["phoneNo"];
					var cmplneeRollNo=data.child("Users").child(complaintOf).child(
						"PersonalInformation").val()["rollNumber"];
					var cmplneePhone=data.child("Users").child(complaintOf).child(
						"PersonalInformation").val()["phoneNo"];

					var key=keys[i]+"";
					var restore="restore"+i;
					
					content.innerHTML+='<div class="card" style="margin:10px">'+
					'<div class="card-header">'+date+'</div><div class="card-body">'+
					'<h5>Complainee</h5><p>Reg#'+cmplneeRollNo+'<br>Phone#'+cmplneePhone+
					'<div class="row"><div class="col-md-3"></p><h5>Complainant</h5><p>Roll#'+cmplnrRollNo+'<br>Roll#'+cmplnrPhone+
					'</p></div><div class="col-md-9">'+
					'<div class="h3">Complain</div><div class="p">'+cmp+'</div>'+
					'<button id="'+restore+'" style="color:white;padding:3px;margin-top:10px;background-color:#4CAF50">Restore</button>'+
					'</div></div></div></div>';
					document.getElementById(restore).setAttribute("onclick",
						'restoreUser("'+complaintOf+'","'+key+'")');
				
		}
	}
}
}



