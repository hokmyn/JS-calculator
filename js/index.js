$(document).ready(function() {
      var clear;
			// handler to div#buttons
			$("#buttons").on("click", function(event) {
				
				var content  = $("#entry").text(),
					  lastChar = content.slice(-1),
            ops      = $("#result").text(),
            target   = event.target.value;
        
        if(content.length > 14) {
          $("#entry").removeClass("normal").addClass("smaller");
        } else if($("#entry").hasClass("smaller")) {
          $("#entry").removeClass("smaller").addClass("normal");
        }
						
				//if clickled number button
				if(/[1-9]/.test(target) && content.length < 21) {
          if(clear) {
            $("#entry").text("");
            clear = false;
          }
					if(content == "0") {
						$("#entry").text(target);
					} else {					
						$("#entry").append(target);
					}
				}
				//other buttons clicked
				else if(content != "0") {
					switch(target) {										
					case "+/-":
						if(content[0] == "-") {
							$("#entry").text(function() {
								return content.slice(1);
							});
						} else {
							$("#entry").prepend("-");
						}
						break;				
					case "<-":
            if(content.length > 1) {
						  $("#entry").text(function() {
								  return content.slice(0, -1);
							  });
            } else {
              $("#entry").text("0");
            }
						break;
					case "=":
						if (!/[\/\+\-\*\.]/.test(lastChar)) {              
							var result = eval(ops + content);							
							if(result.toString().length > 15) {
								result = result.toExponential(8);
							} 
							$("#entry").text(result);
              $("#result").text("");
              clear = true;
						}
						break;
					case "0":
						if(content.length < 21 && !/[\/\+\-\*]/.test(lastChar)) {
							$("#entry").append("0");
						}
						break;					
					case "+":
					case "*":
					case "/":
					case "-":
						if(!/[\/\+\-\*\.]/.test(lastChar)) {
              $("#result").append(content + target); 
							$("#entry").html("0");
						}
						break;
					default:
						break;
					};
				}
        //treatment clicking "AC"
        if(target == "AC"){
						$("#entry").text("0");
            $("#result").text("");
            $("#entry").removeClass("smaller").addClass("normal");
        }
				//treatment clicking "."
				if(target == "."){
          if(clear) {
            $("#entry").text("0");
            clear = false;
          }
					if(/[\/\+\-\*]/.test(lastChar) && content.length < 21){
						$("#entry").append("0.");
					} else {
					var arrMatch = content.match(/\d+\.?\d*[\/\+\-\*\.]?/g);			
					if(!arrMatch[arrMatch.length - 1].includes(".") && content.length < 21) {
						$("#entry").append(".");
					}
					}					
				}				
			});
		});
