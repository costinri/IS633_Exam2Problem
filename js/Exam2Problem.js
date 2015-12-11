function SelectArea(selectList){
    if (selectList.value == "productCategoryList") {
        document.getElementById("sectionOne").style.visibility = "visible";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "hidden";
        document.getElementById("sectionFour").style.visibility = "hidden";
        document.getElementById("sectionFive").style.visibility = "hidden";
        document.getElementById("sectionOneResult").innerHTML = "";
        ProductCategoryListRequest();
    }//end if
    else if (selectList.value == "addProductCategory"){
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "visible";
        document.getElementById("sectionThree").style.visibility = "hidden";
        document.getElementById("sectionFour").style.visibility = "hidden";
        document.getElementById("sectionFive").style.visibility = "hidden";
        document.getElementById("sectionTwoResult").innerHTML = "";
        document.getElementById("secTwoProductCategoryName").value = "";
        document.getElementById("secTwoProductCategoryDescription").value = "";
        document.getElementById("secTwoProductCategoryName").focus();

    }//end if else
    else if (selectList.value == "changeProductCategory"){
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "visible";
        document.getElementById("sectionFour").style.visibility = "hidden";
        document.getElementById("sectionFive").style.visibility = "hidden";
        document.getElementById("sectionThreeResult").innerHTML = "";
        document.getElementById("secThreeCategoryID").value = "";
        document.getElementById("secThreeCategoryID").focus();
        document.getElementById("secThreeCategoryDescription").value = "";

    }//end if else
    else if (selectList.value == "deleteProductCategory"){
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "hidden";
        document.getElementById("sectionFour").style.visibility = "visible";
        document.getElementById("sectionFive").style.visibility = "hidden";
        document.getElementById("sectionFourResult").innerHTML = "";
        document.getElementById("secFourCategoryID").value = "";
        document.getElementById("secFourCategoryID").focus();

    }//end if else
    else if (selectList.value == "about"){
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "hidden";
        document.getElementById("sectionFour").style.visibility = "hidden";
        document.getElementById("sectionFive").style.visibility = "visible";
        document.getElementById("sectionFiveResult").innerHTML = "";

    }//end if else
    else {
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "hidden";
        document.getElementById("sectionFour").style.visibility = "hidden";
        document.getElementById("sectionFive").style.visibility = "hidden";
    }//end else
    
}//end SelectArea

////////////////////////////// All Product Categories //////////////////////////////

function ProductCategoryListRequest() {
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objReq.onreadystatechange = function() {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var test1 = objReq.responseText;
            var output = JSON.parse(objReq.responseText);
            ProductCategoryListOutput(output);
        }//end if
        if (objReq.readyState == 4 && objReq.status != 200) {
            alert("There was an error processing the request!  readyState = " +
                   objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
        }
    }//end onreadystatechange function
    
    objReq.open("GET", url, true);
    objReq.send();
    document.getElementById("sectionOneResult").innerHTML = "Retrieving Product Categories...";
}//end ProductCategoryListRequest


function ProductCategoryListOutput(outputResult) {
    //code
    var displayText = "<table><caption>Product Category List</caption>" +
                      "<tr><th>ID</th><th>Name</th><th>Description</th></tr>";
    var appendData = "";
    for (var i = 0; i < outputResult.GetAllCategoriesResult.length; i++) {
        appendData = "<tr><td>" + outputResult.GetAllCategoriesResult[i].CID +
                     "</td><td>" + outputResult.GetAllCategoriesResult[i].CName +
                     "</td><td>" + outputResult.GetAllCategoriesResult[i].CDescription +
                     "</td></tr>"
        displayText += appendData;
    }//end for
    
    displayText += "</table>"
    
    document.getElementById("sectionOneResult").innerHTML = displayText;
}//end function AllCustomersOutput


function isUpperCase(checkString) {
    //return (checkString == checkString.toUpperCase());
    var regEx = new RegExp("[A-Z][A-Z][A-Z][A-Z][A-Z]")
    return regEx.test(checkString);
}

/////////////////////////////    AddProductCategory   //////////////////////////////////////////////
function AddProductCategory() {
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    var productCategoryName = document.getElementById("secTwoProductCategoryName").value;
    var productCategoryDescription = document.getElementById("secTwoProductCategoryDescription").value;
      
    if (productCategoryName == "") {
        alert("Please enter a Product Category Name!")
        document.getElementById("secTwoProductCategoryName").focus();
        return;
    }
    if (productCategoryDescription == "") {
        alert("Please enter a Product Category Description!")
        document.getElementById("secTwoProductCategoryDescription").focus();
        return;
    }
    
    var productCategoryParameters = '{"CName":"' + productCategoryName + 
                             '","CDescription":"' + productCategoryDescription +'"}';
    
    objReq.onreadystatechange = function() {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var test1 = objReq.responseText;
            var output = JSON.parse(objReq.responseText);
            AddProductCategoryOutput(output);
        }//end if
        if (objReq.readyState == 4 && objReq.status != 200) {
            alert("There was an error sending the request!  readyState = " +
                   objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
        }
    }//end onreadystatechange function
    
    objReq.open("POST", url, true);
    objReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objReq.send(productCategoryParameters);
}//end AddProductCategory

///////////////////////   AddProductCategoryOutput  //////////////////////////////////////////
function AddProductCategoryOutput(outputResult) {
    //code
    var displayText = "";
    
    if (outputResult.WasSuccessful == 1) {
        displayText = "The product category was added successfully!";
        document.getElementById("secTwoProductCategoryName").value = "";
        document.getElementById("secTwoProductCategoryDescription").value = "";
        document.getElementById("secTwoProductCategoryName").focus();
    }
    else
    {
        displayText = "There was an error adding the product category.<br>Error Message: " + outputResult.Exception;
        document.getElementById("secTwoProductCategoryName").focus();
    }
    
    document.getElementById("sectionTwoResult").innerHTML = displayText;
}//end function AddProductCategoryOutput

/////////////////////////////    EditProductCategoryDescription   //////////////////////////////////////////////
function EditProductCategoryDescription() {
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    var categoryID = Number(document.getElementById("secThreeCategoryID").value);
    var categoryDescription = document.getElementById("secThreeCategoryDescription").value;

    
    if (isNaN(categoryID)) {
        alert("Please enter a number for the Category ID.");
        document.getElementById("secThreeCategoryID").focus();
        return;
    }
    if ((categoryDescription == "")) {
        alert("Please enter a category description!")
        document.getElementById("secThreeCategoryDescription").focus();
        return;
    }
    
    var updateCategoryParameters = '{"CID":"' + categoryID + 
                                   '","CDescription":"' + categoryDescription +'"}';
    
    objReq.onreadystatechange = function() {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var test1 = objReq.responseText;
            var output = JSON.parse(objReq.responseText);
            EditProductCategoryDescriptionOutput(output);
        }//end if
        if (objReq.readyState == 4 && objReq.status != 200) {
            alert("There was an error sending the request!  readyState = " +
                   objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
        }
    }//end onreadystatechange function
    
    objReq.open("POST", url, true);
    objReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objReq.send(updateCategoryParameters);
}//end EditProductCategoryDescription

///////////////////////   EditProductCategoryDescriptionOutput  //////////////////////////////////////////
function EditProductCategoryDescriptionOutput(outputResult) {
    //code
    var displayText = "";
    
    switch(outputResult.WasSuccessful) {
        case 1:
            displayText = "The operation completed successfully!";
            document.getElementById("secThreeCategoryID").value = "";
            document.getElementById("secThreeCategoryID").focus();
            document.getElementById("secThreeCategoryDescription").value = "";
            break;
        case 0:
            displayText = "The operation failed with an unspecified error!";
            document.getElementById("secThreeCategoryID").focus();
            break;
        case -2:
            displayText = "The operation failed because the data string supplied could not be deserialized into the service object!";
            document.getElementById("secThreeCategoryID").focus();
            break;
        case -3:
            displayText = "The operation failed because a record with the supplied Order ID could not be found!";
            document.getElementById("secThreeCategoryID").focus();
            break;
        default:
            displayText = "No Output result was returned!";
            document.getElementById("secThreeCategoryID").focus();
            break;
    }//end switch

    document.getElementById("sectionThreeResult").innerHTML = displayText;
}//end function EditAddressOutput

////////////////////////////   DeleteProductCategory    ///////////////////////////////
function DeleteProductCategory() {
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    
    var categoryID4 = Number(document.getElementById("secFourCategoryID").value);
       
    if (isNaN(categoryID4)) {
        alert("Please enter a number for the Category ID.");
        document.getElementById("secFourCategoryID").focus();
        return;
    }
    
    url += categoryID4;

    var r = confirm("Do you want to delete this product category ID?\nProduct Category ID:  " + categoryID4);
    
    if (r) {
      
        objReq.onreadystatechange = function() {
            if (objReq.readyState == 4 && objReq.status == 200) {
                var test1 = objReq.responseText;
                var output = JSON.parse(objReq.responseText);
                DeleteProductCategoryOutput(output);
            }//end if
            if (objReq.readyState == 4 && objReq.status != 200) {
                alert("There was an error sending the request!  readyState = " +
                    objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
            }
        }//end onreadystatechange function
    
    
        objReq.open("GET", url, true);
        objReq.send();
    } //end if
}//end DeleteProductCategory

///////////////////////    DeleteProductCategoryOutput /////////////////////////////////////////////////
function DeleteProductCategoryOutput(outputResult) {
    //code
    var displayText = "";
    
    if (outputResult.DeleteCategoryResult.WasSuccessful == 1) {
        displayText = "The product category was deleted successfully!";
        document.getElementById("secFourCategoryID").value = "";
        document.getElementById("secFourCategoryID").focus();
    }
    else
    {
        displayText = "There was an error deleting the product category.<br>Error Message: " + outputResult.DeleteCategoryResult.Exception;
        document.getElementById("secFourCategoryID").focus();
    }
    
    document.getElementById("sectionFourResult").innerHTML = displayText;
}//end function DeleteProductCategoryOutput

