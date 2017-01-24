// Controls the Category Buttons to display only their specific products
$(document).ready(function(){
  if($(".orders.new").length > 0) {
  	var categoryButtons = document.getElementsByClassName('category-buttons');
  	var checkBoxes = document.getElementsByClassName('products-hidden');
  	
  	Array.prototype.forEach.call(categoryButtons, function(buttonPressed) {
  		buttonPressed.addEventListener('click', function() {
  			Array.prototype.forEach.call(checkBoxes, function(groupByCategory) {
  				if(groupByCategory.classList.contains(buttonPressed.id)) {
  					groupByCategory.style.display = 'block';
  				} else {
  					groupByCategory.style.display = "";
  				}
  			});	
  		});
  	});	
    console.log('Order JS Loaded');
  }
});


// All the functionality to create the product details "screen" and calculator
$(document).ready(function(){
  if($(".orders.new").length > 0) {
  	var input = document.createElement('input');
    	var tableBody = document.getElementById('table-body');
    	var checkBoxes = document.getElementsByClassName('checkboxes');
    	var selectOpt = document.getElementsByClassName('selectOpt');
    	var subTotal = document.getElementsByClassName('subTotal');

    	function orderProductFunc(row, index, value) {
    		var inner = '<input value=' + value + ' type="text" name="order[order_details_attributes][' + index + '][product]" id="order_order_details_attributes_' + index + '_product">';
    		return row.appendChild(document.createElement('td')).innerHTML = inner; 
    	}
    	function getId(checkbox) {
  		return parseInt(checkbox.nextSibling.nextSibling.innerText);
    	}

      function orderProductIdFunc(row, index, id) {        
        var input = document.createElement('input');
        input.value = id;
        input.type = 'hidden';
        input.name = "order[order_details_attributes][" + index + "][product_id]";
        input.id = "order_order_details_attributes_" + index + "_product_id";
        return document.getElementById('new_order').appendChild(input);
      }

    	function orderCommentFunc(row, index) {
    		var inner = '<input type="text" name="order[order_details_attributes][' + index + '][comments]" class="comments-input" id="order_order_details_attributes_' + index + '_comments">';
    		return row.appendChild(document.createElement('td')).innerHTML = inner; 
    	}

  	  function orderQuantityFunc(row, index) {
    		var inner = '<select class="selectOpt" type="text" name="order[order_details_attributes][' + index + '][quantity]" id="order_order_details_attributes_' + index + '_quantity">' +
    						'<option>1</option>' +
    						'<option>2</option>' +
    						'<option>3</option>' +
    						'<option>4</option>' +
    						'<option>5</option>' +
    						'<option>6</option>' +
    						'<option>7</option>' +
    						'<option>8</option>' +
    						'<option>9</option>' +
    					'</select>';
    		row.appendChild(document.createElement('td')).innerHTML = inner; 
    	}

      function orderSubTotalFunc(row, index, price) {      
        var tableData = document.createElement('td');
        var input = document.createElement('input');
        input.classList.add("subTotal");
        input.classList.add("sub-total-column");
        input.value = price;
        input.type = "text";
        input.name = "order[order_details_attributes][" + index + "][sub_total]";
        input.id = "order_order_details_attributes_" + index + "_sub_total";        
        tableData.appendChild(input);
        return row.appendChild(tableData);
      }
    	
     //  function orderSubTotalFunc(row, index, price) {      
    	// 	var inner = '<input class="subTotal" value=' + price + ' type="text" name="order[order_details_attributes][' + index + '][sub_total]" id="order_order_details_attributes_' + index + '_sub_total">';
    	// 	return row.appendChild(document.createElement('td')).innerHTML = inner; 
    	// }

    	function checkAmountOfRows() {
    		return tableBody.childNodes.length - 1;
    	}

    	function getSubTotalNumbers() {
    		return Array.prototype.map.call(subTotal, function(each) {
    			return parseInt(each.value);
    		})
    	}

      var calcularButton = document.getElementById('calcular-button');

      function calculateVuelto() {
        var total = parseInt(document.getElementById('order_total').value);
        var paymentMethod = parseInt(document.getElementById('order_payment_value').value);
        console.log('i am called');
        if(isNaN(paymentMethod)) {
          return 'No necesita Vuelto';
        } else {
          return paymentMethod - total;
        }
      }

      function setVueltoAmount() {
        document.getElementById('vuelto-amount').innerText = '$' + calculateVuelto();
      }

    	function calculateTotal() {
    		var totalAmount = document.getElementById('order_total');
    		return totalAmount.value = Array.prototype.reduce.call(getSubTotalNumbers(), function(prev, eachSubTotal) {
    			return prev + eachSubTotal;
    		})
    	}

    	function createAndDeleteRow(checkbox) {
    		var index = checkAmountOfRows();
    		var subPrice = document.getElementById(checkbox.id + '-price').innerText;
    		var newRow = tableBody.appendChild(document.createElement('tr'));

    		if(checkbox.checked === true) {
    			newRow.id = checkbox.id.split(' ').join('-') + '-row';
    			orderProductIdFunc(newRow, index, getId(checkbox));
    			orderProductFunc(newRow, index, checkbox.id);
    			orderCommentFunc(newRow, index); 
    			orderQuantityFunc(newRow, index);
    			orderSubTotalFunc(newRow, index, subPrice);
    		} else {
    			document.getElementById(checkbox.id.split(' ').join('-') + '-row').remove();
    		}

    		Array.prototype.forEach.call(selectOpt, function(select) {
    			var sub = select.parentNode.nextSibling.childNodes[0];
          var unitPrice = document.getElementById(select.parentNode.parentNode.childNodes[0].firstChild.value + '-price').innerText;
    			select.addEventListener('change', function() {
    				sub.value = parseInt(select.value) * parseInt(unitPrice);
    				calculateTotal();
            setVueltoAmount();
    			});
    		})

    		calculateTotal();
        	setVueltoAmount();
    	}

      document.getElementById('order_payment_value').addEventListener('input', function() {
        document.getElementById('vuelto-amount').innerText = calculateVuelto();
      });

    	Array.prototype.forEach.call(checkBoxes, function(checkbox) {
    		checkbox.addEventListener('change', function() {
    			createAndDeleteRow(checkbox);
    		});  		
    	})
      console.log('Order 2 JS Loaded');
  }
});