import React, { useState,useCallback } from "react";
import {TextField} from '@shopify/polaris';
import "./Modal.css";


export const Modal = ({id,title,metakey,onEdit}) => {
    const [newtitle, setNewtitle] = useState(title);
    const modalid = "my_modal_"+metakey;
    const input__id = "input"+modalid;

    const handletitleChange = e => {
        setNewtitle(e.target.value);
        console.log('changes',e);
    }
   
    // const handletitleChange = useCallback(
    //     (newValue) => {
    //         console.log("newValu,e",newValue)
    //         setNewtitle(newValue);
    //     },
    //     []
    //   );
    const handleClosemodal = () =>{
        document.getElementById("editor_modal").hide();
    }
    const handleEdit = (event) => {
        // const tring = event.target.parentNode.previousElementSibling.children.find(el => el.id === input__id).value;               
        console.log("new title is",newtitle)
        // console.log("new title2 is",tring)
        // onEdit(id,newtitle)
    }

        // const inter = setInterval(function(){
        //     console.log('value',newtitle)
        // },1500)

        // setTimeout(function(){
        //     clearInterval(inter);
        // },60000)
    const [value, setValue] = useState('Jaded Pixel');

                    const handleChange = useCallback(
                        (newValue) => {setValue(newValue)

                            console.log('changedddddd',newValue)
                        },
                        [],
                    );
    return (
    <div className="modal">
        <ui-modal id="editor_modal" variant="large" >
            <div className="modal-form">

                <TextField label="Field name" value={metakey} disabled autoComplete="off" />
                <TextField 
                    label="Field Title" 
                    value={newtitle} 
                    onChange={handletitleChange}
                    helpText="The filter name that will be displayed in the filter panel."
                    autoComplete="off" 
                />
                
                    
                    

                    
                        
            </div>
            {/* <p>id:{id} title:{title} meta:{metakey}</p> */}
            <ui-title-bar title="Filter Settings">
                <button variant="primary" onClick={handleClosemodal}>Cancel</button>
                <button onClick={handleEdit}>Submit</button>
            </ui-title-bar>
        </ui-modal>
    </div>
    )
}; 