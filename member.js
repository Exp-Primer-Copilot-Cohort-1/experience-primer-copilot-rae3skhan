function skillMember() {
    var member = document.getElementById("member");
    var memberValue = member.options[member.selectedIndex].value;
    var memberText = member.options[member.selectedIndex].text;
    var memberValue = member.options[member.selectedIndex].value;
    var memberText = member.options[member.selectedIndex].text;
    if (memberValue == "1") {
        document.getElementById("member").style.color = "#000000";
        document.getElementById("member").style.backgroundColor = "#ffffff";
        document.getElementById("member").style.borderColor = "#000000";
    } else {
        document.getElementById("member").style.color = "#ffffff";
        document.getElementById("member").style.backgroundColor = "#000000";
        document.getElementById("member").style.borderColor = "#ffffff";
    }
}