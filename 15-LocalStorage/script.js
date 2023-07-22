const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const clearButton=document.querySelector('.clear-btn');
const checkAndUncheckAll=document.querySelector('.check-uncheck-btn');

function addItem(e) {
  e.preventDefault();
  const text=this.querySelector('[name=item]').value;
  const item={
      text,
      done:false,
  }
  items.push(item);
  populateList(items,itemsList);
  localStorage.setItem('items',JSON.stringify(items));
  this.reset();
 // console.log(item);
}

//write the plates with helper function inside of html 
//this loop part easy with angular or react.

function populateList(plates=[],platesList) {
  platesList.innerHTML= plates.map((plate,i) => {
      return `
      <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
      <label for="item${i}">${plate.text}</label>
      </li>
      `;
  }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip this code unless it is an input.
    const el=e.target;
    const index=el.dataset.index;
    items[index].done= !items[index].done;
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items,itemsList);
}
function deleteAll(){

    items.splice(0,items.length);
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items,itemsList);
}
function checkUncheckAll(e){
   const allChecked=items.every(item => item.done);

   if(allChecked){
    items.forEach(item => item.done=false);
   }
   
   else {
    items.forEach(item => item.done=true);
   }
    
    


    localStorage.setItem('items',JSON.stringify(items));
    populateList(items,itemsList);
}

addItems.addEventListener('submit',addItem);
itemsList.addEventListener('click',toggleDone);
clearButton.addEventListener('click',deleteAll);
checkAndUncheckAll.addEventListener('click',checkUncheckAll);


populateList(items,itemsList);


//further challenge
//1-make a button both
//for clear all
//and for check and uncheck all