//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

let clicks = true;
let records = 1;

// Adjust the createRow function to accept a parameter that controls the alert display.
function createRow(showAlert = true) {
  var table = document.getElementById("myTable");
  var row = table.insertRow(-1);
  
  
  var item1 = row.insertCell(0);
  var item2 = row.insertCell(1);
  var item3 = row.insertCell(2);
  var item4 = row.insertCell(3);
  var item5 = row.insertCell(4);
  var item6 = row.insertCell(5);
  var item7 = row.insertCell(6);
  var item8 = row.insertCell(7);
  item1.innerHTML = `<td><input type="checkbox" class="verifychecked" onclick="changeBack(this);selectChange();updateRow(this);" /><br /><br /><img src="down.png" onclick="dropDown(this)" width="25px" /></td>`;
  item2.innerHTML = "Student " + records;
  item3.innerHTML = "Teacher " + records;
  item4.innerHTML = "Approved";
  item5.innerHTML = "Fall";
  item6.innerHTML = "TA";
  item7.innerHTML = "12345";
  item8.innerHTML = "100%";
  if (showAlert) {
    alert("Student " + records + " record added successfully.");
  }
  records += 1;
}
let deletedStudentNumbers = [];


// Call createRow with showAlert as false when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  createRow(false); // This will add a row without showing an alert.
});

// Proceed with the rest of your JavaScript code here...

function changeBack(checkbox) {
  var rowCheck = checkbox.parentNode.parentNode;
  if (checkbox.checked) {
    rowCheck.style.backgroundColor = "yellow";
  } else {
    rowCheck.style.backgroundColor = "white";
  }
}
function selectChange() {
  var checkboxes = document.querySelectorAll(".verifychecked");
  var selectbutton = document.getElementById("button");
  var checkSelectedRows = Array.from(checkboxes).some(function (checkbox) {
    return checkbox.checked;
  });

  // Toggle button background color based on checkbox check
  if (checkSelectedRows) {
    selectbutton.style.backgroundColor = "orange";
    // Show delete and edit columns
    toggleDeleteEditColumns(true);
  } else {
    selectbutton.style.backgroundColor = "";
    // Hide delete and edit columns
    toggleDeleteEditColumns(false);
  }
}

function toggleDeleteEditColumns(show) {
  // Find delete and edit column headers and toggle their visibility
  var deleteHeaders = document.querySelectorAll('.delete-header');
  var editHeaders = document.querySelectorAll('.edit-header');
  var displayStyle = show ? "" : "none"; // Decide whether to show or hide
  
  deleteHeaders.forEach(header => {
    header.style.display = displayStyle;
  });

  editHeaders.forEach(header => {
    header.style.display = displayStyle;
  });

  // Apply the same for every delete and edit button in all rows
  var allRows = document.querySelectorAll("#myTable tr");
  allRows.forEach(row => {
    var deleteCell = row.querySelector('.find-button'); // Assuming this class is for delete cell
    var editCell = row.querySelector('.find-button1'); // Assuming this class is for edit cell
    if (deleteCell) deleteCell.style.display = displayStyle;
    if (editCell) editCell.style.display = displayStyle;
  });
}


function updateRow(checkbox) {
  var rowCheck = checkbox.parentNode.parentNode;
  var findButton = rowCheck.querySelector(".find-button");
  var findButton1 = rowCheck.querySelector(".find-button1");
  var table = document.getElementById("myTable");
  if (checkbox.checked) {
    if (!findButton) {
      findButton = document.createElement("td");
      findButton.className = "find-button";
      var deletebtn = document.createElement("button");
      deletebtn.textContent = "delete";
      var findButton1 = document.createElement("td");
      findButton1.className = "find-button1";
      var editbtn = document.createElement("button");
      editbtn.textContent = "edit";
      deletebtn.onclick = function () {
        if (!clicks) {
          table.rows[rowCheck.sectionRowIndex + 1].remove();
        }
        alert(rowCheck.cells[1].innerHTML + " record deleted successfully.");
        rowCheck.remove();
        console.log(clicks);
        console.log(rowCheck.sectionRowIndex);
        selectChange();
      };
      editbtn.onclick = function () {
        if (confirm("Edit student details") == true) {
          alert(rowCheck.cells[1].innerHTML + " data edited successfully");
        }
      };
      findButton.appendChild(deletebtn);
      rowCheck.appendChild(findButton);
      findButton1.appendChild(editbtn);
      rowCheck.appendChild(findButton1);
    }
  } else {
    if (findButton1) {
      findButton1.remove();
    }
    if (findButton) {
      findButton.remove();
    }
  
  }
  console.log(findButton);
  console.log(findButton1);
}

function dropDown(checkbox) {
  var rowCheck = checkbox.parentNode.parentNode;
  var table = document.getElementById("myTable");
  if (clicks) {
    var row1 = table.insertRow(rowCheck.sectionRowIndex + 1);
    // var itemExpand = row1.insertCell(0);
    row1.innerHTML = `<tr id="dropDownTextArea"><td  colspan="10">
    Advisor:<br /><br />
    Award Details<br />
    Summer 1-2014(TA)<br />
    Budget Number: <br />
    Tuition Number: <br />
    Comments:<br /><br /><br />
    Award Status:<br /><br /><br />
  </td></tr>`;
  } else {
    table.rows[rowCheck.sectionRowIndex + 1].remove();
  }
  clicks = !clicks;
}
var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("CONNECT WITH ME!");
