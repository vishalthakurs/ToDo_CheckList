import React, { useEffect, useRef, useState } from 'react'
import './style.css';
const getLocalData=()=>{
    const lists=localStorage.getItem("todolist");
    if(lists)
    {
    return JSON.parse(lists)
    }
    else
    {
        return []
    }
}
const Todo = () => {
    const [data,setData]=useState('')
    const [item,setItems] =useState(getLocalData()); 
    const [isEdited,setIsEdited]=useState();
    const [toggleButton,setToggleButton]=useState(false)
    let inputRef=useRef(null)
    //Adding Data in  item Array
    const addItem = ()=>{
        if(!data){
            alert('plz fill the data')
        }
        else if(data && toggleButton)
        {
            setItems(
                item.map((element,id)=>{
                    if(element.id===isEdited)
                    {
                        console.log({...element,name:data})
                    return {...element,name:data}
                    }
                    return element;
                })  
            )
            setData("");
            setToggleButton(false);
            setIsEdited(null);
        }
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:data,
            }
            setItems([...item, myNewInputData])
            setData('')
            inputRef.current.focus();
            
        }
    }
    

    //Delete the item from Array
    const deleteItem=(index)=>{
        const updatedItem=item.filter((element)=>{
            return element.id!=index;
        })
        setItems(updatedItem)

    }
    //Update the list
    const editItem=(index)=>{
        const item_todo_edited=item.find((e)=>{
            return e.id===index;
        })
        setData(item_todo_edited.name);
        setIsEdited(index);
        setToggleButton(true);
        inputRef.current.focus()
    }
    //Adding items in local storage
    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(item))
    },[item])
  return (
    <>
    <div className='main-div'>
      <div className="child-div">
        <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add your List here ✌️</figcaption>
        </figure>
        <div className='addItems'>
            <input type='text' placeholder='✍️ Enter Your Item' className='form-control' value={data} onChange={(e)=>setData(e.target.value)} ref={inputRef}></input>
            {toggleButton?<i className='far fa-edit add-btn' onClick={()=>{addItem()}}></i>:<i className="fa fa-plus add-btn" onClick={()=>{addItem()}}></i>}
            {/* {show our items} */}

            <div className="showItems">
                {
                    item.map((element)=>
                    <div className='eachItem' key={element.id}>
                        <h3>{element.name}</h3>
                        <div className="todo-btn">
                            <i className='far fa-edit add-btn' onClick={()=>{editItem(element.id)}}></i>
                            <i className='far fa-trash-alt' onClick={()=>{deleteItem(element.id)}}></i>
                        </div>

                    </div>)
                }
                
                </div>
            </div>
            {/* {Delete our items} */}
            <div className="showItems">
            <button className='btn effect04' data-sm-link-text='Remove All' onClick={()=>setItems([])}><span>Checklist</span></button>
        </div>
            
        </div>
        
      </div>
    
    </>
  )
}

export default Todo
