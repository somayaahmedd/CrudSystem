var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var productCategoryInput = document.getElementById("productCategory")
var productDescriptionInput = document.getElementById("productDescription")
var searchinput = document.getElementById("searchinput")
var productList;
var currentIndex;
if (localStorage.getItem("productlist") != null) {
    productList = JSON.parse(localStorage.getItem("productlist"))
    displayProduct()
}
else {
    productList = []
}
function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescriptionInput.value,
    }
    productList.push(product) //[{}]
    localStorage.setItem("productlist", JSON.stringify(productList))
    displayProduct()
}
function displayProduct() {
    var temp = ""
    for (var i = 0; i < productList.length; i++) {
        temp += `<tr>
        <td>`+ i + `</td>
        <td>`+ productList[i].name + `</td>
        <td>`+ productList[i].price + `</td>
        <td>`+ productList[i].category + `</td>
        <td>`+ productList[i].desc + `</td>
        <td>
            <button class="btn btn-outline-warning"onclick="updateProduct(`+ i + `)" >update</button>
        </td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(`+ i + `)" >delete</button></td>
    </tr>`
    }
    document.getElementById("myTable").innerHTML = temp
}


// [{1},{2}]

function deleteProduct(x) {
    console.log(x);
    productList.splice(x, 1)
    localStorage.setItem("productlist", JSON.stringify(productList))
    displayProduct()
}





function clearForm() {


    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productDescriptionInput.value = ""
}




function search() {
    var searchvalue = searchinput.value.toLowerCase()


    var temp = ""
    for (var i = 0; i < productList.length; i++) {

        if (productList[i].category.toLowerCase().includes(searchvalue) == true ||
            productList[i].name.toLowerCase().includes(searchvalue) == true
        )
            temp += `<tr>
        <td>`+ i + `</td>
        <td>`+ productList[i].name.toLowerCase().replace(searchvalue, "<span class='text-danger'>" + searchvalue + "</span>") + `</td>
        <td>`+ productList[i].price + `</td>
        <td>`+ productList[i].category + `</td>
        <td>`+ productList[i].desc + `</td>
        <td>
            <button class="btn btn-outline-warning" onclick="updateProduct(`+ i + `)">update</button>
        </td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(`+ i + `)" >delete</button></td>
    </tr>`
    }

    document.getElementById("myTable").innerHTML = temp

}




function updateProduct(index) {
    currentIndex=index
    productNameInput.value = productList[index].name
    productPriceInput.value = productList[index].price
    productCategoryInput.value = productList[index].category
    productDescriptionInput.value = productList[index].desc
    document.getElementById("btn-add").style.display = "none"
    document.getElementById("btn-edit").style.display = "inline-block"
    console.log(productList[index]);

}

function addEdit(){
    productList[currentIndex].name = productNameInput.value
    productList[currentIndex].price = productPriceInput.value
    productList[currentIndex].category = productCategoryInput.value
    productList[currentIndex].desc = productDescriptionInput.value
    displayProduct()
    localStorage.setItem("productlist", JSON.stringify(productList))
    document.getElementById("btn-add").style.display = "inline-block"
    document.getElementById("btn-edit").style.display = "none"
    clearForm()
}



